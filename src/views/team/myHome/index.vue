<template>
    <div class="myHome">
        <RouterView></RouterView>
    </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/store/menu/menu';

const menuStore = useMenuStore();
menuStore.updateLabel("个人首页");

</script>
<style lang="less" scoped>
.myHome {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
}
</style>