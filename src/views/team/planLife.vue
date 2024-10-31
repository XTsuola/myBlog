<template>
    <div class="planLife">
        <img src="@/assets/img/plan/x1.jpg" />
        <img src="@/assets/img/plan/x2.jpg" />
        <img src="@/assets/img/plan/x3.jpg" />
        <img src="@/assets/img/plan/x4.jpg" />
        <img src="@/assets/img/plan/x5.jpg" />
        <img src="@/assets/img/plan/x6.jpg" />
        <img src="@/assets/img/plan/x7.jpg" />
        <img src="@/assets/img/plan/x8.jpg" />
        <img src="@/assets/img/plan/x9.jpg" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useMenuStore } from '@/store/menu/menu';

const menuStore = useMenuStore();
menuStore.updateLabel("规划人生");

</script>
<style lang="less" scoped>
.planLife {
    height: 100%;
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 3%;
    row-gap: 30px;
    padding-bottom: 20px;
    img {
        width: 31%;
        border-radius: 4px;
    }
}
</style>