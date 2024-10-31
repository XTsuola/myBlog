<template>
    <div class="part3_main">
       <div class="more" @click="goRecord">More</div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goRecord() {
    router.push("/team/record");
}

</script>
<style lang="less" scoped>
.part3_main {
    .more {
        font-size: 24px;
        color: #ef6a8a;
        font-weight: bold;
        padding-bottom: 20px;
        cursor: pointer;
    }
}
</style> 