<template>
    <div class="notfound">
        <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
            <template #extra>
                <a-button type="primary" @click="goBack()">Go Back</a-button>
            </template>
        </a-result>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
    router.go(-1);
}

</script>
<style lang="less" scoped>
.notfound {}
</style>