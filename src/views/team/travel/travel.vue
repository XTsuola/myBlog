<template>
    <div class="travel">
        <div class="travel_container">
            <div v-for="(column, index) in columns" :key="index" class="container_column">
                <div v-for="(image, imgIndex) in column" :key="imgIndex" class="container_item">
                    <a-tooltip placement="topLeft" arrow-point-at-center>
                        <template #title>
                            <div>日期：{{ image.time }}</div>
                            <div style="display: flex;flex-wrap: wrap;">
                                <span>内容：{{ image.name }}</span>
                                <img v-permission="'admin'" @click="deleteImg(index, imgIndex)"
                                    style="transform: scaleY(0.85);margin-left: 5px;cursor: pointer;"
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
            <a-button v-if="!footLoading" type="primary" :loading="footLoading" @click="goMap">足迹</a-button>
            <a-button v-permission="'admin'" style="margin-left: 20px;" type="primary" @click="showModal">新增</a-button>
        </div>
        <a-modal v-model:open="visible2" title="新增图片" centered :maskClosable="false">
            <a-form ref="travelImgAddRef" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 3 }"
                autocomplete="off">
                <a-form-item label="内容" name="name" :rules="[{ required: true, message: '请输入内容！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.name" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="日期" name="time" :rules="[{ required: true, message: '请选择日期！', trigger: 'blur' }]">
                    <a-date-picker style="width: 100%;" v-model:value="addData.time" :locale="locale" />
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
import { getTravelImgList, travelImgAdd, travelImgDelete, getTravelFootList, type TravelImgAddType } from '@/api/travel';
import { getNewTravelList } from "@/utils/func";
import { useMenuStore } from '@/store/menu/menu';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { UploadOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const menuStore = useMenuStore();
menuStore.updateLabel("旅行打卡");
const router = useRouter();
const loading = ref(false);
const footLoading = ref(true);
const images = ref([]);
const columns = ref([]);
const columnCount = 3;
const visible1 = ref(false);
const visible2 = ref(false);
const nowId = ref(0);
const travelImgAddRef = ref();
const addData: TravelImgAddType = reactive({
    name: "",
    time: "",
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
    const res = await getTravelImgList();
    if (res.data.code == 200) {
        images.value = res.data.data.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                time: item.time,
                url: import.meta.env.VITE_APP_BASE_URL + "travel/" + item.id + ".jpg"
            }
        })
        generateColumns();
    }
}

async function travelFootList() {
    const res = await getTravelFootList();
    if (res.data.code == 200) {
        const list = getNewTravelList(res.data.data);
        menuStore.updateMapData(list);
        footLoading.value = false;
    }
}

async function deleteOk() {
    loading.value = true;
    const res = await travelImgDelete(nowId.value);
    if (res.data.code == 200) {
        visible1.value = false;
        getList();
    }
    loading.value = false;
}

function showModal() {
    visible2.value = true;
    addData.name = addData.time = addData.img = "";
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
                await travelImgAddRef.value?.validateFields("img");
            }
        })
    }
}

async function handleRemove() {
    fileList.value = [];
    addData.img = undefined;
    await travelImgAddRef.value?.validateFields("img");
}

async function addOk() {
    loading.value = true;
    try {
        await travelImgAddRef.value?.validate();
        const res = await travelImgAdd(addData);
        if (res.data.code == 201) {
            getList();
        }
        visible2.value = false;

    } catch (_) { }
    loading.value = false;
}

function goMap() {
    router.push("/team/travel_map");
}

onMounted(() => {
    getList();
    travelFootList();
})

</script>
<style lang="less" scoped>
.travel {
    position: relative;

    .travel_container {
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
        display: flex;
        justify-content: flex-start;
    }
}
</style>