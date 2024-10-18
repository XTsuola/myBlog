<template>
    <div class="learn">
        <RouterView></RouterView>
    </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/store/menu/menu';
import List from "./list.vue";

const menuStore = useMenuStore();
menuStore.updateLabel("学习记录");

</script>
<style lang="less" scoped>
.learn {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
}
</style>