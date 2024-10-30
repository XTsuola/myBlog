<template>
    <div class="algorithm">
        <RouterView></RouterView>
    </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/store/menu/menu';

const menuStore = useMenuStore();
menuStore.updateLabel("算法学习");

</script>
<style lang="less" scoped>
.algorithm {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
}
</style>