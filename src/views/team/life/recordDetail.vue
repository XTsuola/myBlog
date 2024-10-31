<template>
    <div>
        记录详情页--{{ title }}
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";


const title = ref("");
title.value = sessionStorage.getItem("recordId") ? sessionStorage.getItem("recordId") : "";;

</script>
<style lang="less" scoped></style>