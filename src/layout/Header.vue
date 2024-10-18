<template>
    <div class="headerContainer">
        <!-- <div class="headerInfo">
            <div class="touxiang">
                <img :src="prop.headerData.img" />
            </div>
            <div class="myInfo">
                <div>{{ prop.headerData.verse.split("。")[0] }}</div>
                <div>{{ prop.headerData.verse.split("。")[1] }}</div>
            </div>
        </div> -->
        <div class="headBg">
            <div class="head_title">
                <div class="head_title_cn">索拉的博客</div>
                <div class="head_title_en">Suol's Blog</div>
            </div>
        </div>
        <div class="nagivation" :id="value">
            <a-segmented style="width: 100%;background-color: transparent;" v-model:value="value"
                :options="list.map(item => item.name)" @change="changeOk" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu/menu';

interface Prop {
    headerData: any
}

const prop = defineProps<Prop>();
const router = useRouter();
const menuStore = useMenuStore();

const list = reactive([{
    id: 1,
    name: "个人首页",
    url: "/team/myHome",
    children: [{
        id: 11,
        name: "新增",
        url: "/add"
    }, {
        id: 12,
        name: "修改",
        url: "/edit"
    }, {
        id: 13,
        name: "详情",
        url: "/detail"
    }]
}, {
    id: 2,
    name: "生活瞬间",
    url: "/team/lifeMoments"
}, {
    id: 3,
    name: "学习记录",
    url: "/team/learnRecord",
    children: [{
        id: 31,
        name: "新增",
        url: "/add"
    }, {
        id: 32,
        name: "修改",
        url: "/edit"
    }, {
        id: 33,
        name: "详情",
        url: "/detail"
    }]
}, {
    id: 4,
    name: "学校生活",
    url: "/team/schoolLife"
}, {
    id: 5,
    name: "规划人生",
    url: "/team/planLife"
}, {
    id: 6,
    name: "旅行打卡",
    url: "/team/travel"
}, {
    id: 7,
    name: "访客留言",
    url: "/team/visitorMessage"
}]);
const value = ref("");
const myLabel = menuStore.label;
value.value = myLabel ? myLabel : list[0].name;

function changeOk(data) {
    menuStore.updateLabel(data);
    const url = list[list.findIndex(item => item.name == data)].url;
    router.push(url);
}

watch(menuStore, (newData, oldDaat) => {
    value.value = newData.label;
}, { deep: true })

onMounted(() => {

})

</script>
<style lang="less" scoped>
.headerContainer {
    position: relative;
    .headBg {
        position: relative;
        width: 100%;
        min-width: 768px;
        height: 280px;
        background-image: url("@/assets/img/fengjing.jpg");
        background-position: 10% 35%;
        background-size: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        .head_title {
            position: absolute;
            left: 45%;
            top: 30%;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
            .head_title_cn {
                font-size: 36px;
            }

            .head_title_en {
                font-size: 28px;
            }
        }
    }

    .headerInfo {
        display: flex;
        justify-content: center;

        .touxiang {
            border-radius: 50%;

            img {
                width: 75px;
                border-radius: 50%;
            }
        }

        .myInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            margin-left: 20px;
            row-gap: 8px;
            letter-spacing: 4px;
        }
    }

    .nagivation {
        background: #EEEEEE;
        position: absolute;
        padding: 5px 15% 0 15%;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
            color: #000000;
        }
    }

}

:deep(.ant-segmented-item) {
    width: 14.27%;
    font-weight: bold;
}
</style>