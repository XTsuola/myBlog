<template>
    <div class="life">
        <div class="life_container">
            <div v-for="(column, index) in columns" :key="index" class="container_column">
                <div v-for="(image, imgIndex) in column" :key="imgIndex" class="container_item">
                    <a-tooltip placement="topLeft" arrow-point-at-center>
                        <template #title>
                            <div>内容：{{ image.remark }}
                                <img @click="deleteImg(index, imgIndex)"
                                    style="transform: translateY(3px);margin-left: 5px;cursor: pointer;"
                                    src="@/assets/img/icon/delete_red.png" />
                            </div>
                        </template>
                        <img :src="image.url" :alt="'Image ' + imgIndex" @click="showDetail(index, imgIndex)" />
                    </a-tooltip>
                </div>
            </div>
        </div>
        <a-modal v-model:open="visible1" title="删除提示" centered>
            <div>确认删除该图片吗？</div>
            <template #footer>
                <a-button key="back" @click="visible1 = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="deleteOk()">确认</a-button>
            </template>
        </a-modal>
        <div class="btn_add">
            <a-button type="primary" @click="showModal">新增</a-button>
        </div>
        <a-modal v-model:open="visible2" title="新增图片" centered :maskClosable="false">
            <a-form ref="lifeImgAddRef" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 3 }"
                autocomplete="off">
                <a-form-item label="内容" name="remark" :rules="[{ required: true, message: '请输入内容！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.remark" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="图片" name="img" :rules="[{ required: true, message: '请选择图片！', trigger: 'change' }]">
                    <a-upload v-model:file-list="fileList" v-model:value="addData.img" action=""
                        :customRequest="uploadImg" @remove="handleRemove" :maxCount="1"
                        accept="image/png, image/jpeg, image/jpg">
                        <a-button class="btn">
                            <upload-outlined></upload-outlined>
                            上传文件
                        </a-button>
                    </a-upload>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible2 = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="addOk()">确认</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { getLifeImgList, lifeImgAdd, lifeImgDelete, type LifeImgAddType } from '@/api/life';
import { useMenuStore } from '@/store/menu/menu';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const menuStore = useMenuStore();
menuStore.updateLabel("生活瞬间");
const loading = ref(false);
const images = ref([]);
const columns = ref([]);
const columnCount = 3;
const visible1 = ref(false);
const visible2 = ref(false);
const nowId = ref(0);
const lifeImgAddRef = ref();
const addData: LifeImgAddType = reactive({
    remark: "",
    img: ""
});

const fileList = ref([]);

function generateColumns() {
    columns.value = Array.from({ length: columnCount }, () => []);
    images.value.forEach(image => {
        const shortestColumn = columns.value.reduce((prev, curr) =>
            prev.length <= curr.length ? prev : curr
        )
        shortestColumn.push(image);
    })
}

function deleteImg(index: number, imgIndex: number) {
    nowId.value = columns.value[index][imgIndex].id;
    visible1.value = true;
}

function showDetail(index: number, imgIndex: number) {
    window.open(columns.value[index][imgIndex].url, '_blank');
}

async function getList() {
    const res = await getLifeImgList();
    if (res.data.code == 200) {
        images.value = res.data.data.map((item: any) => {
            return {
                id: item.id,
                remark: item.remark,
                url: import.meta.env.VITE_APP_BASE_URL + "life/" + item.id + ".jpg"
            }
        })
        generateColumns();
    }
}

async function deleteOk() {
    loading.value = true;
    const res = await lifeImgDelete(nowId.value);
    if (res.data.code == 200) {
        visible1.value = false;
        getList();
    }
    loading.value = false;
}

function showModal() {
    visible2.value = true;
    addData.remark = addData.img = "";
}

function beforeUpdateFile(file: any) {
    const suffixList = ["image/png", "image/jpeg", "image/jpg"];
    const isImg = suffixList.findIndex((item: string) => item == file.type) != -1;
    const sizeFlag = file.size / 1024 / 1024 < 50;
    if (!isImg) {
        message.error('请上传正确的图片格式!');
        handleRemove();

    } else if (!sizeFlag) {
        message.error('图片大小不能大于50MB!');
        flag.value = !flag.value;
        handleRemove();
    }
    imgType.value = isImg && sizeFlag;
    return isImg || sizeFlag;
}

async function uploadImg(file: any) {
    fileList.value = [];
    addData.img = "";
    const target = file.file;
    if (target) {
        const reader = new FileReader();
        reader.readAsDataURL(target);
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                addData.img = e.target.result as any;
                fileList.value.push({ url: addData.img, name: file.file.name });
                await lifeImgAddRef.value?.validateFields("img");
            }
        })
    }
}

async function handleRemove() {
    fileList.value = [];
    addData.img = undefined;
    await lifeImgAddRef.value?.validateFields("img");
}

async function addOk() {
    loading.value = true;
    try {
        await lifeImgAddRef.value?.validate();
        const res = await lifeImgAdd(addData);
        if(res.data.code == 201) {
            getList();
        }
        visible2.value = false;

    } catch (_) { }
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>
<style lang="less" scoped>
.life {
    position: relative;

    .life_container {
        margin-top: 10px;
        display: flex;
        gap: 16px;
    }

    .container_column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .container_item img {
        width: 100%;
        display: block;
        border-radius: 8px;
        cursor: pointer;
    }

    .btn_add {
        position: absolute;
        right: 0;
        top: -40px;
    }
}
</style>