<template>
    <div class="algorithmList">
        <a-card hoverable style="width: 100%;background-color: #FAFAFA;margin: 15px 0;"
            :style="{ backgroundColor: index % 2 == 0 ? '#eee' : '' }" v-for="(item, index) in list"
            @click="showDetail(item)">
            <a-card-meta :title="item.id + '.' + item.title" :description="item.time">
            </a-card-meta>
        </a-card>
        <div style="width: 100%;text-align: right;">
            <a-pagination v-model:current="current" :pageSize="pageSize" :total="total" @change="getList" />
        </div>
        <div v-permission="'admin'" class="btn_add">
            <a-button type="primary" @click="add">新增算法</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { getAlgorithmList } from "@/api/algorithm";
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu/menu';

interface ListType {
    id: number
    title: string
    time: string
    detail: string
}

const menuStore = useMenuStore();
menuStore.updateDetail("");
const router = useRouter();
const detailFlag = ref(false);
const list = ref<ListType[]>([]);
const current = ref(1);
const total = ref(0);
const pageSize = ref(6);

async function getList() {
    const params = { pageSize: pageSize.value, current: current.value }
    const res = await getAlgorithmList(params);
    if (res.data.code == 200) {
        list.value = res.data.data;
        total.value = res.data.total;
    }
}

function showDetail(item: any) {
    router.push("/team/algorithm/detail");
    window.sessionStorage.setItem("algorithmId", item.id);
}

function add() {
    router.push("/team/algorithm/add");
}



onMounted(() => {
    getList();
})
</script>
<style lang="less" scoped>
.algorithmList {
    position: relative;

    .btn_add {
        position: absolute;
        right: 0;
        top: -42px;
    }

    .red {
        background-color: red;
    }
}
</style>