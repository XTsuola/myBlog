<template>
    <div class="learnRecord">
        <a-card hoverable style="width: 32%;background-color: #FAFAFA;" v-for="item in list" @click="showDetail(item)">
            <a-card-meta :title="item.title" :description="item.time">
            </a-card-meta>
        </a-card>
        <div v-permission="'admin'" class="btn_add">
            <a-button type="primary" @click="add">新增内容</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { getLearnList } from "@/api/learn";
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu/menu';

interface ListType {
    id: number
    title: string
    time: string
    detail: string
}

// window.sessionStorage.setItem("learnId", "")
const menuStore = useMenuStore();
menuStore.updateDetail("");
const router = useRouter();
const detailFlag = ref(false);
const list = ref<ListType[]>([]);

async function getList() {
    const res = await getLearnList();
    if (res.data.code == 200) {
        list.value = res.data.data;
    }
}

function showDetail(item: any) {
    router.push("/team/learnRecord/detail");
    window.sessionStorage.setItem("learnId", item.id);
}

function add() {
    router.push("/team/learnRecord/add");
}

onMounted(() => {
    getList();
})

</script>
<style lang="less" scoped>
.learnRecord {
    position: relative;
    display: flex;
    padding-top: 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 1.5%;
    row-gap: 15px;

    .btn_add {
        position: absolute;
        right: 0;
        top: -25px;
    }
}
</style>