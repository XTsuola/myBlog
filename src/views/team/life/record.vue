<template>
    <div class="record">
        <h2>时光回忆</h2>
        <div class="content">
            <div class="content_div" v-for="(item, index) in dataList" :key="title">
                <div class="card">
                    <div class="card_left">
                        <img :src="item.img" />
                    </div>
                    <div class="card_right">
                        <h3>{{ item.title }}</h3>
                        <div class="time">时间：{{ item.time }}</div>
                        <a-button class="btn" @click="goDetail(item)">Read More</a-button>
                    </div>
                </div>
                <div class="hr" v-if="index != dataList.length - 1"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getRecordList } from "@/api/life";
import { useRouter } from 'vue-router';

document.title = "我的微博——记录时刻";
const router = useRouter();
const dataList = ref([{
    title: "合影",
    img: import.meta.env.VITE_APP_BASE_URL + "travel/3.jpg",
    time: "2024-04-07"
}, {
    title: "摆拍",
    img: import.meta.env.VITE_APP_BASE_URL + "travel/4.jpg",
    time: "2024-04-06"
}]);

function goDetail(item: any) {
    sessionStorage.setItem("recordData", JSON.stringify(item));
    router.push("/team/recordDetail");
}

async function getList() {
    const res = await getRecordList();
    if (res.data.code == 200) {
        dataList.value = res.data.data.map((item) => {
            return {
                id: item.id,
                title: item.title,
                time: item.time,
                img: import.meta.env.VITE_APP_BASE_URL + "life/list/" + item.id + ".jpg",
                ids: item.ids
            }
        })
    }
}

onMounted(() => {
    getList();
})

</script>
<style lang="less" scoped>
.record {
    width: 100vw;
    min-height: 100vh;
    padding: 30px 0;
    background: #EEEEEE;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    h2 {
        margin-bottom: 20px;
    }

    .content {
        background-color: #ffffff;
        border-radius: 20px;
        width: 64%;
        padding: 20px;

        .content_div {
            margin-bottom: 10px;

            .card {
                height: 280px;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                margin-bottom: 10px;

                .card_left {
                    height: 100%;
                    width: 32%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .card_right {
                    width: 68%;
                    padding: 20px 20px 20px 60px;

                    h3 {
                        text-align: left;
                    }

                    .time {
                        font-size: 14px;
                        color: #aaaaaa;
                        margin-top: 10px;
                        margin-bottom: 35px;
                    }
                }

                .btn {
                    background: #ffffff;
                    color: #865FC1;
                    border: 1px solid #865FC1;
                    border-radius: 25px;

                    &:hover,
                    &:focus {
                        color: #ffffff !important;
                        background-color: #865FC1 !important;
                    }
                }
            }

            @media screen and (max-width: 768px) {
                .card {
                    width: 100%;
                    justify-content: flex-start; 
                    flex-direction: column;
                    height: 480px;
                    .card_left {
                        min-width: calc(50vw);
                        height: auto;
                    }
                }
            }

            .hr {
                height: 1px;
                background-color: #dfdfdf;
                width: calc(100% + 40px);
                transform: translateX(-20px);
            }
        }
    }
}
</style>