<template>
    <div class="algorithmDetail">
        <div class="title">
            <div class="title_info">算法：</div>
            <span>{{ detailData.title }}</span>
        </div>
        <div class="content">
            <div class="content_left">
                <div class="content_title">
                    题干：
                </div>
                <Codemirror style="height: calc(100% - 30px);border: 1px solid #ccc;" :disabled="true"
                    v-model="detailData.desc" placeholder="" :autofocus="true" :indent-with-tab="true" :tab-size="2"
                    :extensions="extensions" @ready="handleReady" />
            </div>
            <div class="content_right">
                <div class="content_title">
                    题解：
                </div>
                <Codemirror style="height: calc(100% - 30px);border: 1px solid #ccc;" :disabled="true"
                    v-model="detailData.detail" placeholder="" :autofocus="true" :indent-with-tab="true" :tab-size="2"
                    :extensions="extensions" @ready="handleReady" />
            </div>
        </div>
        <div class="btn_back">
            <a-button @click="goBack">返回</a-button>
            <a-button v-permission="'admin'" style="margin-left: 20px;" type="primary" @click="goEdit">编辑</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAlgorithmDetail } from '@/api/algorithm';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';

interface ListType {
    id: number
    title: string
    desc: string
    detail: string
}

const menuStore = useMenuStore();
menuStore.updateDetail("详情");
const algorithmId: number = window.sessionStorage.getItem("algorithmId") ? parseInt(window.sessionStorage.getItem("algorithmId")) : 0;
const router = useRouter();
const view = ref(null);
const extensions = [];
const detailData = reactive<ListType>({
    id: 0,
    title: "",
    desc: "",
    detail: ""
});

function handleReady(payload: any) {
    view.value = payload.view;
}

function goBack() {
    router.push("/team/algorithm/list");
}

function goEdit() {
    router.push("/team/algorithm/edit");
}

async function getDetail() {
    const res = await getAlgorithmDetail(algorithmId);
    if (res.data.code == 200) {
        detailData.id = res.data.data.id;
        detailData.title = res.data.data.title;
        detailData.desc = res.data.data.desc;
        detailData.detail = res.data.data.detail;
    }
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.algorithmDetail {
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
        margin: 10px 0;

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

    .btn_back {
        display: flex;
        justify-content: flex-end;
    }
}
</style>