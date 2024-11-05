<template>
    <div class="myHome">
        <div class="base_info">
            <div class="head">基本信息</div>
            <ul class="base_detail">
                <li>
                    <div class="detail_left">手机号码：</div>
                    <div class="detail_right">{{ menuStore.phone }}</div>
                </li>
                <li>
                    <div class="detail_left">邮箱地址：</div>
                    <div class="detail_right">{{ menuStore.email }}</div>
                </li>
            </ul>
        </div>
        <div class="hr"></div>
        <div class="skill_info">
            <div class="head">职业技能</div>
            <div class="skill_detail">
                <a-card class="detail_box" :title="item.title" v-for="item in list" @click="showDetail(item)">
                    <template #extra>
                        <a-tag :color="colorList[colorList.findIndex(e => e.level == item.level)].color">
                            {{ colorList[colorList.findIndex(e => e.level == item.level)].name }}
                        </a-tag>
                    </template>
                    <p>{{ item.info }}</p>
                </a-card>
            </div>
        </div>
        <div class="btn_add" v-permission="'admin'">
            <a-button type="primary" @click="add">新增</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useMenuStore } from '@/store/menu/menu';
import { getHomeInfoList } from "@/api/home";
import { colorList } from "@/utils/func";
import { useRouter } from 'vue-router';

const admin = JSON.parse(sessionStorage.getItem("menu") as any) ? JSON.parse(sessionStorage.getItem("menu") as any).isAdmin : 0;
const menuStore = useMenuStore();
menuStore.updateDetail("");
const router = useRouter();
const myHomeRef = ref();
const list = ref([]);

async function getList() {
    const res = await getHomeInfoList();
    if (res.data.code == 200) {
        list.value = res.data.data.sort((a, b) => b.level - a.level);
    }
}

function add() {
    router.push("/team/myHome/add");
}

function showDetail(item: any) {
    if (admin) {
        router.push("/team/myHome/detail");
        window.sessionStorage.setItem("myHomeId", item.id);
    }
}

onMounted(() => {
    getList();
})

</script>
<style lang="less" scoped>
.myHome {
    position: relative;

    .head {
        font-size: 16px;
        color: #b2b2b2;
        margin-bottom: 15px;
    }

    ul,
    li {
        list-style: none;
    }

    .base_info {
        margin-top: 10px;

        .base_detail {
            li {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 15px;

                .detail_left {
                    width: 80px;
                    margin-right: 10px;
                }
            }
        }
    }

    .hr {
        height: 1px;
        background-color: #eeeeee;
    }

    .skill_info {
        margin-top: 20px;
        margin-bottom: 15px;

        .skill_detail {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            row-gap: 20px;

            .detail_box {
                width: 49%;
                border: 1px solid #eeeeee;
                background-color: #FAFAFA;
            }
        }
    }

    .btn_add {
        position: absolute;
        right: 0;
        top: -25px;
    }
}
</style>