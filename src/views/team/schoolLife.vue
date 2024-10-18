<template>
    <div class="school">
        <div class="school_title">
            <span>我的学校：</span>
            <span style="font-weight: bold;">南京审计大学金审学院</span>
        </div>
        <div class="school_container">
            <div v-for="(column, index) in columns" :key="index" class="container_column">
                <div v-for="(image, imgIndex) in column" :key="imgIndex" class="container_item">
                    <div style="margin-bottom: 5px">学校地图：</div>
                    <img :src="image" :alt="'Image ' + imgIndex" @click="showDetail(index, imgIndex)" />
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useMenuStore } from '@/store/menu/menu';

const menuStore = useMenuStore();
menuStore.updateLabel("学校生活");

const images = ref([
    new URL("@/assets/img/school/1.jpg", import.meta.url)
])

const columns = ref([]);
const columnCount = 3;

onMounted(() => {
    generateColumns();
})

function generateColumns() {
    columns.value = Array.from({ length: columnCount }, () => [])
    images.value.forEach(image => {
        const shortestColumn = columns.value.reduce((prev, curr) =>
            prev.length <= curr.length ? prev : curr
        )
        shortestColumn.push(image);
    })
}

function showDetail(index: number, imgIndex: number) {
    window.open(columns.value[index][imgIndex], '_blank');
}

</script>
<style lang="less" scoped>
.school {
    .school_title {
        margin-top: 10px;
    }

    .school_container {
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
}
</style>