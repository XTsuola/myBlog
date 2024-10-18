<template>
    <div class="learnEdit">
        <div class="title">
            <div class="title_info">标题：</div>
            <a-input v-model:value="editData.title" />
        </div>
        <Codemirror style="flex: 1;margin-bottom: 10px;border: 1px solid #ccc;" v-model="editData.detail" placeholder=""
            :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
        <div class="btn_button">
            <a-button @click="goBack">返回</a-button>
            <a-button type="primary" v-permission="'admin'" style="margin-left: 20px;" @click="edit">确定</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { learnEdit, getLearnDetail, type LearnAddType } from "@/api/learn";
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';

const learnId: number = window.sessionStorage.getItem("learnId") ? parseInt(window.sessionStorage.getItem("learnId")) : 0;
const router = useRouter();
const menuStore = useMenuStore();
menuStore.updateDetail("编辑");
const view = ref(null);
const extensions = [];
const editData = reactive<LearnAddType>({
    title: "",
    time: "",
    detail: "",
});

function handleReady(payload: any) {
    view.value = payload.view;
}

async function getDetail() {
    const res = await getLearnDetail(learnId)
    if (res.data.code == 200) {
        editData.id = res.data.data.id;
        editData.title = res.data.data.title;
        editData.time = res.data.data.time;
        editData.detail = res.data.data.detail;
    }
}

function getTime() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
    return year + "年" + month + "月" + day + "日";
}

async function edit() {
    let msg = "";
    if (editData.title == "") {
        msg = "请输入标题";
    } else if (editData.detail == "") {
        msg = "请输入内容";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    editData.time = getTime();
    const res = await learnEdit(editData);
    if(res.data.code == 200) {
        message.success("编辑成功");
        goList();
    }
}

function goBack() {
    router.push("/team/learnRecord/detail");
}

function goList() {
    router.push("/team/learnRecord/list");
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.learnEdit {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 15px 0;

        .title_info {
            width: 50px;
        }
    }

    .btn_button {
        display: flex;
        justify-content: flex-end;
    }
}
</style>