<template>
    <div class="myHomeDetail">
        <div class="title">
            <div class="title_info">技能描述：</div>
            <span>{{ detailData.title }}</span>
        </div>
        <div class="title" style="margin-bottom: 15px;">
            <div class="title_info">熟练程度：</div>
            <span>{{ detailData.level }}</span>
        </div>
        <Codemirror style="flex: 1;margin-bottom: 10px;border: 1px solid #ccc;" :disabled="true" v-model="detailData.info"
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
import { getHomeInfoDetail } from '@/api/home';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';
import { colorList } from "@/utils/func";

interface ListType {
    id: number
    title: string
    level: string
    info: string
}

const menuStore = useMenuStore();
menuStore.updateDetail("详情");
const myHomeId: number = window.sessionStorage.getItem("myHomeId") ? parseInt(window.sessionStorage.getItem("myHomeId")) : 0;
const router = useRouter();
const view = ref(null);
const extensions = [];
const detailData = reactive<ListType>({
    id: 0,
    title: "",
    level: undefined,
    info: ""
});

function handleReady(payload: any) {
    view.value = payload.view;
}

function goBack() {
    router.push("/team/myHome/list");
}

function goEdit() {
    router.push("/team/myHome/edit");
}

async function getDetail() {
    const res = await getHomeInfoDetail(myHomeId);
    if (res.data.code == 200) {
        detailData.id = res.data.data.id;
        detailData.title = res.data.data.title;
        detailData.level = colorList[colorList.findIndex(e => e.level == res.data.data.level)].name;
        detailData.info = res.data.data.info;
    }
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.myHomeDetail {
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
        margin-top: 15px;

        .title_info {
            width: 75px;
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