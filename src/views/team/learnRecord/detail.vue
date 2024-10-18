<template>
    <div class="learnDetail">
        <div class="title">
            <div class="title_info">标题：</div>
            <span>{{ detailData.title }}</span>
        </div>
        <div class="time">
            <div class="title_info">时间：</div>
            <span>{{ detailData.time }}</span>
        </div>
        <Codemirror style="flex: 1;margin-bottom: 10px;border: 1px solid #ccc;" :disabled="true" v-model="detailData.detail"
            placeholder="" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
            @ready="handleReady" />
        <div class="btn_back">
            <a-button @click="goBack">返回</a-button>
            <a-button v-permission="'admin'" style="margin-left: 20px;" type="primary" @click="goEdit">编辑</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getLearnDetail } from '@/api/learn';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';

interface ListType {
    id: number
    title: string
    time: string
    detail: string
}

const menuStore = useMenuStore();
menuStore.updateDetail("详情");
const learnId: number = window.sessionStorage.getItem("learnId") ? parseInt(window.sessionStorage.getItem("learnId")) : 0;
const router = useRouter();
const view = ref(null);
const extensions = [];
const detailData = reactive<ListType>({
    id: 0,
    title: "",
    time: "",
    detail: ""
});

function handleReady(payload: any) {
    view.value = payload.view;
}

function goBack() {
    router.push("/team/learnRecord/list");
}

function goEdit() {
    router.push("/team/learnRecord/edit");
}

async function getDetail() {
    const res = await getLearnDetail(learnId);
    if (res.data.code == 200) {
        detailData.id = res.data.data.id;
        detailData.title = res.data.data.title;
        detailData.time = res.data.data.time;
        detailData.detail = res.data.data.detail;
    }
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.learnDetail {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title,
    .time {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 15px;

        .title_info {
            width: 50px;
        }
    }

    .time {
        margin-bottom: 15px;
    }

    .btn_back {
        display: flex;
        justify-content: flex-end;
    }
}
</style>