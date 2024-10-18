<template>
    <div class="learnAdd">
        <div class="title">
            <div class="title_info">标题：</div>
            <a-input v-model:value="addData.title" />
        </div>
        <Codemirror style="flex: 1;margin-bottom: 10px;border: 1px solid #ccc;" v-model="addData.detail" placeholder=""
            :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
        <div class="btn_button">
            <a-button @click="goBack">返回</a-button>
            <a-button v-permission="'admin1'" style="margin-left: 20px;" type="primary" @click="add">确定</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { learnAdd, type LearnAddType } from "@/api/learn";
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';

const router = useRouter();
const menuStore = useMenuStore();
menuStore.updateDetail("新增");
const view = ref(null);
const extensions = [];
const addData = reactive<LearnAddType>({
    title: "",
    time: "",
    detail: "",
});

function handleReady(payload: any) {
    view.value = payload.view;
}

function getTime() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
    return year + "年" + month + "月" + day + "日";
}

async function add() {
    let msg = "";
    if (addData.title == "") {
        msg = "请输入标题";
    } else if (addData.detail == "") {
        msg = "请输入内容";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    addData.time = getTime();
    const res = await learnAdd(addData);
    if(res.data.code == 201) {
        message.success("新增成功");
        goBack();
    }
}

function goBack() {
    router.push("/team/learnRecord/list");
}

</script>
<style lang="less" scoped>
.learnAdd {
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