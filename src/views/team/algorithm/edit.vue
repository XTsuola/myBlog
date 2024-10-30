<template>
    <div class="algorithmEdit">
        <div class="title">
            <div class="title_info">算法：</div>
            <a-input v-model:value="editData.title" />
        </div>
        <div class="content">
            <div class="content_left">
                <div class="content_title">
                    题干：
                </div>
                <Codemirror style="height: calc(100% - 30px);border: 1px solid #ccc;" v-model="editData.desc" placeholder="" :autofocus="true"
                    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
            </div>
            <div class="content_right">
                <div class="content_title">
                    题解：
                </div>
                <Codemirror style="height: calc(100% - 30px);border: 1px solid #ccc;" v-model="editData.detail" placeholder="" :autofocus="true"
                    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
            </div>
        </div>
        <div class="btn_button">
            <a-button @click="goBack">返回</a-button>
            <a-button type="primary" v-permission="'admin'" style="margin-left: 20px;" @click="edit">确定</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { algorithmEdit, getAlgorithmDetail, type AlgorithmAddType } from "@/api/algorithm";
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';

const algorithmId: number = window.sessionStorage.getItem("algorithmId") ? parseInt(window.sessionStorage.getItem("algorithmId")) : 0;
const router = useRouter();
const menuStore = useMenuStore();
menuStore.updateDetail("编辑");
const view = ref(null);
const extensions = [];
const editData = reactive<AlgorithmAddType>({
    title: "",
    desc: "",
    detail: "",
});

function handleReady(payload: any) {
    view.value = payload.view;
}

async function getDetail() {
    const res = await getAlgorithmDetail(algorithmId)
    if (res.data.code == 200) {
        editData.id = res.data.data.id;
        editData.title = res.data.data.title;
        editData.desc = res.data.data.desc;
        editData.detail = res.data.data.detail;
    }
}

async function edit() {
    let msg = "";
    if (editData.title == "") {
        msg = "请输入算法题目";
    } else if (editData.desc == "") {
        msg = "请输入题干";
    } else if (editData.detail == "") {
        msg = "请输入题解";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    const res = await algorithmEdit(editData);
    if (res.data.code == 200) {
        message.success("编辑成功");
        goList();
    }
}

function goBack() {
    router.push("/team/algorithm/detail");
}

function goList() {
    router.push("/team/algorithm/list");
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.algorithmEdit {
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

    .content {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        height: 100%;
        margin-bottom: 10px;
        
        .content_left {
            width: 42%;
            height: 100%;
        }

        .content_right {
            width: 56%;
            height: 100%;
        }
        .content_title {
            margin-bottom: 5px;
        }
    }

    .btn_button {
        display: flex;
        justify-content: flex-end;
    }
}
</style>