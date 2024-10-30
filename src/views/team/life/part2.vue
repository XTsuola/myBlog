<template>
    <div class="part2_main">
        <a-timeline class="timeLine" mode="alternate">
            <a-timeline-item v-for="item in cardList">
                <template #dot>
                    &#10084;&#65039;
                </template>
                <a-card class="card">
                    <template #title>
                        <div class="card_title">{{ item.title }}</div>
                        <div class="card_time">{{ item.time }}</div>
                    </template>
                    <p class="card_text">{{ item.text }}</p>
                </a-card>
            </a-timeline-item>
        </a-timeline>
    </div>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { ref } from "vue";

const cardList = ref([{
    title: "我们初次相识",
    time: "06/08/2021",
    text: "今天晚上加了你的微信，让我遇到了这么好的你，当时怎么也不会想到这将是我一生的挚爱^_^"
}, {
    title: "第一次送我礼物",
    time: "",
    text: "今天收到了你送的第一款皮肤，正如皮肤名字一样黄金射手座，射进了我的心里。"
}, {
    title: "11/11/2023",
    time: "",
    text: "今天我们领证了，以后就是合法夫妻了，长路漫漫，请多关照。"
}, {
    title: "31/12/2023",
    time: "",
    text: "今天是我们结婚的日子，是期待已久的中式婚礼，你很美，让我看到了国泰明安的感觉。"
}])

</script>
<style lang="less" scoped>
.part2_main {
    padding: 50px 0;

    .timeLine {
        .card {
            border: 2px solid #cccccc;

            .card_title {
                padding-top: 10px;
                color: #ef6a8a;
                margin-bottom: 5px;
            }

            .card_time {
                padding-bottom: 10px;
                font-size: 12px;
                color: #b6b6b6;
            }

            .card_text {
                text-align: left;
            }
        }
    }

}
</style>