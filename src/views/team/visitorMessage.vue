<template>
    <div class="visitorMessage">
        <div class="board">
            访客在线留言板
        </div>
        <div class="content">
            <div class="content_left">
                <div class="left_div" v-for="item in list.slice((current - 1) * 3, (current - 1) * 3 + 3)">
                    <div class="left_title">
                        <span style="margin-right: 20px;">{{ item.title }}</span>
                        <span>【 {{ item.name }} / {{ item.time }} 】</span>
                        <img v-permission="'admin'" style="cursor: pointer;margin-left: auto;" src="@/assets/img/icon/delete_white.png"
                            @click="deleteInfo(item)" />
                    </div>
                    <div class="left_info">
                        <div class="left_info_div1">
                            <div class="info_title">留言内容：</div>
                            <div class="info_content">{{ item.content }}</div>
                        </div>
                        <div class="left_info_div2">
                            <div class="info_title">管理回复：</div>
                            <div class="info_content">
                                <a-textarea v-if="item.flag" v-model:value="addData.reply" />
                                <span v-else>{{ item.reply }}</span>
                                <img v-permission="'admin_inline'" @click="editReply(item.id, item.flag)" src="@/assets/img/icon/edit.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <a-pagination v-model:current="current" :total="list.length" :defaultPageSize="3" />
            </div>
            <div class="content_right">
                <a-form ref="messageRef" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
                    autocomplete="off">
                    <a-form-item>
                        <a-input v-model:value="addData.title" placeholder="留言标题"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-model:value="addData.name" placeholder="您的昵称"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-textarea v-model:value="addData.content" placeholder="留言内容"></a-textarea>
                    </a-form-item>
                    <a-form>
                        <a-button @click="addMesage()">提交留言</a-button>
                    </a-form>
                </a-form>
            </div>
        </div>
        <a-modal v-model:open="visible" title="删除提示" centered>
            <div>确认删除留言吗？</div>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="deleteOk()">确认</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { getMsgList, msgAdd, msgReply, msgDelete, type MsgAddType } from '@/api/msg';
import { useMenuStore } from '@/store/menu/menu';
import { formatDate } from "@/utils/func";


const menuStore = useMenuStore();
menuStore.updateLabel("访客留言");
const nowId = ref(0);
const visible = ref(false);
const loading = ref(false);
const messageRef = ref();
const list = ref<MsgAddType[]>([]);
const addData: MsgAddType = reactive({
    title: "",
    name: "",
    content: "",
    time: ""
});
const current = ref(1);

async function addMesage() {
    let msg = "";
    if (!addData.title) {
        msg = "请填写标题！";
    } else if (!addData.name) {
        msg = "请填写昵称！";
    } else if (!addData.content) {
        msg = "请填写内容！";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    addData.time = formatDate(new Date());
    const res = await msgAdd(addData);
    if(res.data.code == 201) {
        getList();
        addData.title = addData.name = addData.content = addData.time = "";
    }
}

let original = ""

async function editReply(id: number, flag: undefined | boolean) {
    const ind = list.value.findIndex((e: any) => e.id == id);
    if (flag) {
        list.value[ind].flag = undefined;
        if (addData.reply == original) {
            addData.reply = "";
            return false
        }
        const params = {
            id: list.value[ind].id,
            reply: addData.reply
        }
        const res = await msgReply(params);
        if (res.data.code == 200) {
            getList();
        }
        addData.reply = "";
    } else {
        list.value[ind].flag = true;
        addData.reply = list.value[ind].reply;
        original = addData.reply;
    }
}

async function getList() {
    const res = await getMsgList()
    if (res.data.code == 200) {
        list.value = res.data.data;
    }
}

function deleteInfo(item: any) {
    nowId.value = item.id;
    visible.value = true;
}

async function deleteOk() {
    loading.value = true;
    const res = await msgDelete(nowId.value);
    if (res.data.code == 200) {
        visible.value = false;
        if(current.value > 1 && (list.value.length % 3) == 1) {
            current.value--;
        }
        getList();
    }
    loading.value = false;
}

onMounted(() => {
    getList()
})

</script>
<style lang="less" scoped>
.visitorMessage {
    .board {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
        height: 100px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 15px;
        border-radius: 10px;
        background: linear-gradient(to right, rgb(97, 98, 218), rgb(10, 240, 238));
    }

    .content {
        display: flex;
        justify-content: space-between;
    }

    .content_left {
        flex: 1;
        margin-right: 40px;

        .left_div {
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
            font-size: 12px;

            .left_title {
                background-color: #55A6DD;
                color: #ffffff;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 8px 20px;
            }

            .left_info {
                background-color: #F0F0F0;
                padding: 20px;

                .left_info_div1 {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 15px;
                }

                .left_info_div2 {
                    position: relative;
                    display: flex;
                    justify-content: flex-start;
                    color: #2F6D9C;

                    img {
                        position: absolute;
                        width: 17px;
                        height: 17px;
                        margin-left: 2px;
                        cursor: pointer;
                    }
                }

                .info_title {
                    width: 64px;
                }

                .info_content {
                    flex: 1;
                }
            }
        }
    }

    .content_right {
        height: 260px;
        width: 300px;
        background-color: #F0F0F0;
        border-radius: 10px;
        padding: 20px;
    }
}
</style>