<template>
    <div class="BasicLayout">
        <mainVue />
    </div>
</template>

<script setup lang="ts">
import mainVue from "./Main.vue";
import { ref } from "vue";

</script>

<style lang="less" scoped>
.BasicLayout {
    width: 100%;
    height: 100vh;
}
</style>