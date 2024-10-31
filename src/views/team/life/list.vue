<template>
    <div class="lifeList">
        <button class="heart-button" @click="goLove">
            <div>爱情</div>
        </button>
        <button class="flower-button">
            <div class="flower-title">孩子</div>
            <div class="flower-petal petal1"></div>
            <div class="flower-petal petal2"></div>
            <div class="flower-petal petal3"></div>
            <div class="flower-petal petal4"></div>
            <div class="flower-petal petal5"></div>
            <div class="flower-petal petal6"></div>
            <div class="flower-petal petal7"></div>
        </button>
        <div class="xiangce" @click="goRecord()">
            <img src="@/assets/img/life/xiangce.png" />
            <div class="xiangce_text">记录</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goLove() {
    router.push("/team/love");
}

function goRecord() {
    router.push("/team/record")
}

onMounted(() => {

})

</script>
<style lang="less" scoped>
.lifeList {
    position: relative;

    .heart-button {
        margin: 80px 0 0 80px;
        position: relative;
        width: 50px;
        height: 50px;
        background-color: #e63946;
        border: none;
        cursor: pointer;
        outline: none;
        transform: rotate(-45deg);
        transition: background-color 0.3s ease;

        div {
            position: absolute;
            z-index: 999;
            top: 50%;
            left: 50%;
            transform: rotate(45deg) translate(-60%, -40%);
            font-size: 12px;
            color: white;
            font-family: Arial, sans-serif;
        }
    }

    .heart-button::before,
    .heart-button::after {
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: #e63946;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    .heart-button::before {
        top: -25px;
        left: 0;
    }

    .heart-button::after {
        left: 25px;
        top: 0;
    }

    .heart-button:hover {
        background-color: #f01010;
        transform: scale(1.1) rotate(-45deg);
    }

    .heart-button:hover::before,
    .heart-button:hover::after {
        background-color: #f01010;
    }

    .flower-button {
        position: relative;
        margin: 0 0 0 380px;
        width: 60px;
        height: 60px;
        background-color: #ffcc00;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: Arial, sans-serif;
        color: white;
        text-align: center;
        z-index: 10;
        .flower-title {
            font-size: 12px;
        }
    }

    .flower-petal {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-radius: 50%;
        z-index: 1;
    }

    /* 花瓣样式 */
    .petal1 {
        background-color: red;
        top: -4px;
        left: -12px;
    }

    .petal2 {
        background-color: orange;
        top: 25px;
        left: -20px;
    }

    .petal3 {
        background-color: yellow;
        top: 48px;
        left: -1px;
    }

    .petal4 {
        background-color: green;
        top: 48px;
        left: 30px;
    }

    .petal5 {
        background-color: blue;
        top: 25px;
        left: 50px;
    }

    .petal6 {
        background-color: indigo;
        top: -4px;
        left: 42px;
    }

    .petal7 {
        background-color: violet;
        top: -17px;
        left: 14px;
    }

    /* 悬停效果 */
    .flower-button:hover {
        background-color: #ff9900;
    }

    .flower-button:hover .flower-petal {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }

    /* 恢复按钮的正常方向 */
    .flower-button span {
        position: relative;
        z-index: 10;
    }

    .xiangce {
        position: absolute;
        height: 66px;
        width: 66px;
        left: 150px;
        top: 210px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
        .xiangce_text {
            font-size: 12px;
            color: #ffffff;
            position: absolute;
            top: 25px;
            left: 21px;
        }
    }
    .xiangce:hover {
        transform: scale(1.2);
    }
}
</style>