<template>
    <div class="myHomeAdd">
        <div class="title">
            <div class="title_info">技能描述：</div>
            <a-input v-model:value="addData.title" />
        </div>
        <div class="title">
            <div class="title_info">熟练程度：</div>
            <a-select ref="select" v-model:value="addData.level" style="width: 100%" @change="handleChange"
                :options="options"></a-select>
        </div>
        <Codemirror style="flex: 1;margin: 15px 0;border: 1px solid #ccc;" v-model="addData.info" placeholder=""
            :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
        <div class="btn_button">
            <a-button @click="goBack" style="margin-right: 15px;">返回</a-button>
            <a-button v-permission="'admin'" type="primary" @click="add">确定</a-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { homeInfoAdd, type HomeInfoAddType } from "@/api/home";
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { useMenuStore } from '@/store/menu/menu';
import { colorList } from "@/utils/func";

const router = useRouter();
const menuStore = useMenuStore();
menuStore.updateDetail("新增");
const view = ref(null);
const extensions = [];
const addData = reactive<HomeInfoAddType>({
    title: "",
    level: undefined,
    info: ""
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

function getTime() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
    return year + "年" + month + "月" + day + "日";
}

async function add() {
    let msg = "";
    if (addData.title == "") {
        msg = "请输入技能描述";
    } else if (!addData.level) {
        msg = "请选择熟练等级";
    } else if (addData.info == "") {
        msg = "请输入内容";
    }
    if (msg) {
        message.error(msg);
        return false;
    }
    addData.time = getTime();
    const res = await homeInfoAdd(addData);
    if (res && res.data.code == 201) {
        message.success("新增成功");
        goBack();
    }
}

function handleChange(e: any) {
    addData.level = e;
}

function goBack() {
    router.push("/team/myHome/list");
}

</script>
<style lang="less" scoped>
.myHomeAdd {
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
        margin-top: 15px;

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