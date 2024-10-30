<template>
    <div class="part1_main">
        <div class="part1_img">
            <img src="@/assets/img/life/nan.jpg" />
            <div class="border"></div>
        </div>
        <div class="symbol">&</div>
        <div class="part1_img">
            <img src="@/assets/img/life/nv.jpg" />
            <div class="border"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="less" scoped>
.part1_main {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    padding: 80px 0;

    .symbol {
        font-size: 62px;
        color: #ef6a8a;
        transform: translateY(-30px)
    }

    .part1_img {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0 0 0 16px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: 100%;
        }

        .border {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: relative;
            cursor: default;
            box-shadow: inset 0 0 0 14px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            top: calc(-100% - 5px);
        }
    }
    .part1_img:hover {
        .border {
            box-shadow: none;
        }
    }
}
</style>