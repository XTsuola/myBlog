<template>
    <div class="myHomeEdit">
        <div class="title">
            <div class="title_info">技能描述：</div>
            <a-input v-model:value="editData.title" />
        </div>
        <div class="title">
            <div class="title_info">熟练程度：</div>
            <a-select ref="select" v-model:value="editData.level" style="width: 100%" @change="handleChange"
                :options="options"></a-select>
        </div>
        <Codemirror style="flex: 1;margin-bottom: 10px;border: 1px solid #ccc;" v-model="editData.info" placeholder=""
            :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
        <div class="btn_button">
            <a-button @click="goBack">返回</a-button>
            <a-button v-permission="'admin'" style="margin-left: 20px;" type="primary" @click="edit">确定</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { homeInfoEdit, getHomeInfoDetail, type HomeInfoAddType } from "@/api/home";
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';
import { colorList } from "@/utils/func";

const myHomeId: number = window.sessionStorage.getItem("myHomeId") ? parseInt(window.sessionStorage.getItem("myHomeId")) : 0;
const router = useRouter();
const menuStore = useMenuStore();
menuStore.updateDetail("编辑");
const view = ref(null);
const extensions = [];
const editData = reactive<HomeInfoAddType>({
    title: "",
    level: undefined,
    info: "",
});
const options = colorList.map(item => {
    return {
        value: item.level,
        label: item.name
    }
});

function handleReady(payload: any) {
    view.value = payload.view;
}

async function getDetail() {
    const res = await getHomeInfoDetail(myHomeId);
    if (res.data.code == 200) {
        editData.id = res.data.data.id;
        editData.title = res.data.data.title;
        editData.level = res.data.data.level;
        editData.info = res.data.data.info;
    }
}

function getTime() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
    return year + "年" + month + "月" + day + "日";
}

async function edit() {
    let msg = "";
    if (editData.title == "") {
        msg = "请输入技能描述";
    } else if (!editData.level) {
        msg = "请选择熟练等级";
    } else if (editData.info == "") {
        msg = "请输入内容";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    editData.time = getTime();
    const res = await homeInfoEdit(editData);
    if (res && res.data.code == 200) {
        message.success("编辑成功");
        goList();
    }
}

function handleChange(e: any) {
    editData.level = e;
}

function goBack() {
    router.push("/team/myHome/detail");
}

function goList() {
    router.push("/team/myHome/list");
}

onMounted(() => {
    getDetail();
})

</script>
<style lang="less" scoped>
.myHomeEdit {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 15px 0;

        .title_info {
            width: 80px;
        }
    }

    .btn_button {
        display: flex;
        justify-content: flex-end;
    }
}
</style>