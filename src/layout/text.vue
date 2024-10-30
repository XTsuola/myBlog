<template>
<div>
    <h1>{{ a }}</h1>
</div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const a = ref("我是标题")

</script>
<style lang="less" scoped>
h1 {
    background-color: red;
}
</style>