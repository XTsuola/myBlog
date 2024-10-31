<template>
    <div class="recordDetail">
        <div class="content">
            <div class="detail_titleImg">

            </div>
            <div class="time">
                {{ detailData.time }}
            </div>
            <div class="cardList">
                <div class="card" v-for="item in cardList">
                    <img :src="item.img" />
                    <div class="card_time">{{ item.time }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

const detailData = reactive({
    time: ""
});
const obj = sessionStorage.getItem("recordData") ? JSON.parse(sessionStorage.getItem("recordData")) : null;
detailData.time = obj ? obj.time : "";

const cardList = ref([{
    img: "",
    time: "2024-06-01"
}, {
    img: "",
    time: "2024-06-02"
}, {
    img: "",
    time: "2024-06-03"
}, {
    img: "",
    time: "2024-06-04"
}, {
    img: "",
    time: "2024-06-05"
}, {
    img: "",
    time: "2024-06-06"
}, {
    img: "",
    time: "2024-06-07"
}]);

</script>
<style lang="less" scoped>
.recordDetail {
    width: 100vw;
    min-height: 100vh;
    padding: 30px 0;
    background: #EEEEEE;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .content {
        width: 66%;
    }

    .detail_titleImg {
        height: 500px;
        border: 1px solid red;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 768px) {
        .detail_titleImg {
            height: 200px;
        }
    }

    .time {
        margin-bottom: 10px;
    }

    .cardList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .card {
            position: relative;
            width: calc(50% - 5px);
            height: 300px;
            border: 1px solid #cacaca;
            box-shadow: 5px 5px 10px #cacaca;
            margin-bottom: 10px;
            padding: 15px;

            img {
                width: 100%;
                height: 100%;
            }

            .card_time {
                position: absolute;
                bottom: 25px;
                left: 30px;
                font-size: 12px;
                color: #cccccc;
            }
        }

        @media screen and (max-width: 768px) {
            .card {
                width: 100%;
                height: 220px;
            }
        }
    }
}
</style>