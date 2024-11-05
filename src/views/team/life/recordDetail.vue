<template>
    <div class="recordDetail">
        <div class="content">
            <div class="detail_titleImg">
                <img :src="detailData.img" />
                <div class="detail_titleImg_text">分类：{{ detailData.title }}</div>
            </div>
            <div class="time">
                {{ detailData.time }}
            </div>
            <div class="travel_container">
                <div v-for="(column, index) in columns" :key="index" class="container_column">
                    <div v-for="(image, imgIndex) in column" :key="imgIndex" class="container_item">
                        <img :src="image.img" :alt="'Image ' + imgIndex" @click="showDetail(index, imgIndex)" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal_overlay">
            <div class="modal_content">
                <img :src="nowImg" />
                <div class="close" @click="closeModal">
                    X
                </div>
                <div class="arrow_left" @click="goNext('left')" @mouseover="over('left')" @mouseleave="leave('left')">
                    <img v-if="left_active" src="@/assets/img/life/left_hover.png" />
                    <img v-else src="@/assets/img/life/left.png" />
                </div>
                <div class="arrow_right" @click="goNext('right')" @mouseover="over('right')"
                    @mouseleave="leave('right')">
                    <img v-if="right_active" style="transform: rotate(180deg);"
                        src="@/assets/img/life/left_hover.png" />
                    <img v-else style="transform: rotate(180deg);" src="@/assets/img/life/left.png" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

const detailData = reactive({
    id: 0,
    title: "",
    time: "",
    img: "",
    ids: []
});
const obj = sessionStorage.getItem("recordData") ? JSON.parse(sessionStorage.getItem("recordData")) : null;
detailData.title = obj ? obj.title : "";
detailData.time = obj ? obj.time : "";
detailData.img = obj ? obj.img : "";
detailData.id = obj ? obj.id : 0;
detailData.ids = obj ? obj.ids : [];
const left_active = ref(false);
const right_active = ref(false);
const showModal = ref(false);
const columns = ref([]);
const columnCount = 4;
const images = ref([]);
let index1 = 0;
let index2 = 0;
const nowImg = ref("");
images.value = detailData.ids.map(item => {
    return {
        img: import.meta.env.VITE_APP_BASE_URL + "life/detail/" + detailData.id + "_" + item + ".jpg"
    }
})

function generateColumns() {
    columns.value = Array.from({ length: columnCount }, () => []);
    images.value.forEach(image => {
        const shortestColumn = columns.value.reduce((prev, curr) =>
            prev.length <= curr.length ? prev : curr
        )
        shortestColumn.push(image);
    })
}

function showDetail(index: number, imgIndex: number) {
    showImg(index, imgIndex);
    index1 = index;
    index2 = imgIndex;
    showModal.value = true;
}

function showImg(ind1: number, ind2: number) {
    console.log(111)
    if (columns.value[ind1][ind2]) {
        nowImg.value = columns.value[ind1][ind2].img;
    }
}

function closeModal() {
    showModal.value = false;
}

function over(type) {
    if (type == "left") {
        left_active.value = true;
    } else {
        right_active.value = true;
    }
}

function leave(type) {
    if (type == "left") {
        left_active.value = false;
    } else {
        right_active.value = false;
    }
}

function goNext(type) {
    if (type == "left") {
        if (index2 != 0) {
            index2--;
            showImg(index1, index2);
        } else {
            if (index1 != 0) {
                index1--;
                index2 = columns.value[index1].length - 1;
                showImg(index1, index2);
            }
        }
    } else {
        console.log(columns.value[index1], 222)
        if (index2 < columns.value[index1].length - 1) {
            index2++;
            showImg(index1, index2);
        } else {
            index1++;
            index2 = 0;
            showImg(index1, index2);
        }
    }
}

onMounted(() => {
    generateColumns();
})

</script>
<style lang="less" scoped>
.recordDetail {
    min-height: 100vh;
    padding: 30px 0;
    background: #EEEEEE;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .content {
        width: 66%;
        background-color: #ffffff;
        border-radius: 8px;

        .time {
            padding-left: 12px;
        }

        .travel_container {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }

        .container_column {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 15px;
        }

        .container_item img {
            width: 100%;
            display: block;
            margin-bottom: 20px;
            cursor: pointer;
        }

        @media screen and (max-width: 768px) {
            .travel_container {
                gap: 0px;
            }

            .container_column {
                gap: 0px;
            }

            .container_item img {
                margin-bottom: 10px;
            }
        }
    }

    .detail_titleImg {
        position: relative;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            filter: brightness(0.6);
        }

        .detail_titleImg_text {
            position: absolute;
            font-size: 40px;
            font-weight: bold;
            color: #e4e4e4;
        }

        @media screen and (max-width: 768px) {
            .detail_titleImg_text {
                font-size: 20px;
            }
        }
    }

    .modal_overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal_content {
        position: relative;
        padding: 10px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        border-radius: 8px;
        text-align: center;
        max-width: 80vw;
        height: 80vh;

        img {
            height: 100%;
        }

        .close {
            color: #8b8b8b;
            position: absolute;
            width: 33px;
            height: 33px;
            right: -11px;
            top: -11px;
            cursor: pointer;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            font-weight: bold;
            font-size: 13px;
        }

        .arrow_left,
        .arrow_right {
            position: absolute;
            width: 24px;
            height: 42px;
            color: #8b8b8b;
            top: 50%;
            cursor: pointer;
            background-color: #fafafa;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            img {
                width: 70%;
            }
        }

        .arrow_left {
            left: -22px;
        }

        .arrow_right {
            right: -22px;
        }
    }
}
</style>