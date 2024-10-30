<template>
  <Header :headerData="headerData"></Header>
  <div class="mainContainer">
    <div class="contianer_content">
      <div class="content_left">
        <div class="left_img">
          <img :src="userInfo.img" />
          <div class="myName">{{ userInfo.name }}</div>
          <div class="introduction">{{ userInfo.sign }}</div>
          <div class="myTag">
            <a-tag style="width: 60px;text-align: center;" color="blue">{{ userInfo.sex }}</a-tag>
            <a-tag style="width: 60px;text-align: center;" color="blue">{{ userInfo.age }}岁</a-tag>
            <a-tag style="width: 60px;text-align: center;" color="blue">{{ userInfo.xingzuo }}</a-tag>
          </div>
        </div>
        <div>
          <img class="my_img" src="@/assets/img/left_img.jpg" draggable="false" />
        </div>
      </div>
      <div class="content_right">
        <div class="title">
          <span>{{ menuStore.label ? menuStore.label : "" }}</span>
          <span v-if="detail"> > {{ detail }}</span>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
  <a-float-button-group trigger="click" type="primary" :style="{ right: '24px' }">
    <template #icon>
      <SettingOutlined />
    </template>
    <a-float-button @click="showModal()" v-if="isAdmin != 1">
      <template #icon>
        <UserOutlined />
      </template>
    </a-float-button>
    <a-float-button @click="showModal2()" v-else>
      <template #icon>
        <UserDeleteOutlined style="color: red;" />
      </template>
    </a-float-button>
    <a-float-button @click="changeYibu(true)">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path
            d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
            fill="#6B676E" p-id="1143" />
          <path
            d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
            fill="#FFEBD2" p-id="1144" />
          <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
            fill="#E9D7C3" p-id="1145" />
          <path
            d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
            fill="#FFFFFF" p-id="1146" />
          <path
            d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
            fill="#6B676E" p-id="1147" />
          <path
            d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
            fill="#464655" p-id="1148" />
          <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655"
            p-id="1149" />
          <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655"
            p-id="1150" />
        </svg>
      </template>
    </a-float-button>
  </a-float-button-group>
  <Yibu v-if="menuStore.yibu" style="transform: scale(0.4);position: fixed;right: -50px;bottom: -18px;"
    @dblclick="changeYibu(false)"></Yibu>
  <a-modal v-model:open="visible" title="登录" centered>
    <a-form ref="loginRef" style="width: 100%;" :model="loginData" name="basic" :label-col="{ span: 3 }"
      autocomplete="off">
      <a-form-item label="账号" name="account" :rules="[{ required: true, message: '请输账号！', trigger: 'blur' }]">
        <a-input v-model:value="loginData.account" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输密码！', trigger: 'blur' }]">
        <a-input-password v-model:value="loginData.password" placeholder="请输入"></a-input-password>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="visible = false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="loginOk">确认</a-button>
    </template>
  </a-modal>
  <a-modal v-model:open="visible2" title="退出提示" centered>
    <div>确认退出吗？</div>
    <template #footer>
      <a-button key="back" @click="visible2 = false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="logoutOk">确认</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import Header from "./Header.vue";
import { ref, reactive, onMounted, watch } from 'vue';
import { useMenuStore } from '@/store/menu/menu';
import { getUserInfo, login, logout } from "@/api/user";
import Yibu from "@/components/yibu.vue";
import { message } from 'ant-design-vue';
import { getAge } from "@/utils/func";
import { SettingOutlined, UserOutlined, UserDeleteOutlined } from '@ant-design/icons-vue';
import md5 from "js-md5"

const menuStore = useMenuStore();
const detail = ref("");
if (menuStore) {
  detail.value = menuStore.detail;
}
const visible = ref(false);
const visible2 = ref(false);
const loading = ref(false);
const userInfo = reactive({
  id: 0,
  name: "",
  sex: "",
  sign: "",
  age: 0,
  xingzuo: "",
});
const menu = JSON.parse(window.sessionStorage.getItem("menu"));
const isAdmin = ref(0);
if (menu) {
  isAdmin.value = menu.isAdmin;
}


const headerData = reactive({
  img: "",
  name: "",
});
const loginRef = ref()
const loginData = reactive({
  account: "",
  password: ""
})

async function getUser() {
  const res = await getUserInfo();
  if (res.data.code == 200) {
    const someInfo = getAge(res.data.data.birthday);
    const info = {
      id: res.data.data.id,
      name: res.data.data.name,
      sex: res.data.data.sex == 0 ? "男" : "女",
      age: someInfo.age,
      xingzuo: someInfo.xingzuo,
      img: res.data.data.img,
      sign: res.data.data.sign,
      phone: res.data.data.phone,
      email: res.data.data.email
    };
    userInfo.id = info.id
    userInfo.name = info.name;
    userInfo.img = import.meta.env.VITE_APP_BASE_URL + "user/" + info.img;
    userInfo.sex = info.sex;
    userInfo.sign = info.sign;
    userInfo.age = info.age;
    userInfo.xingzuo = info.xingzuo;
    headerData.img = userInfo.img;
    headerData.name = info.name;
    menuStore.updateUserInfo(info.phone, info.email);
    window.sessionStorage.setItem("userInfo", JSON.stringify(info));
  }
}

function showModal() {
  visible.value = true;
}

function showModal2() {
  visible2.value = true;
}

async function loginOk() {
  loading.value = true;
  try {
    await loginRef.value?.validate();
    const params = {
      account: loginData.account,
      password: md5(loginData.password)
    };
    const res = await login(params);
    if (res.data.code == 200) {
      menuStore.updateIsAdmin(1);
      message.success("登录成功");
      visible.value = false;
      window.sessionStorage.setItem("token", res.data.data.token);
      setTimeout(() => {
        location.reload();
      }, (800));
    } else {
      message.error("登录失败");
    }
  } catch (_) { }
  loading.value = false;
}

async function logoutOk() {
  loading.value = true;
  visible2.value = false;
  const res = await logout(userInfo.id);
  if (res.data.code == 200) {
    menuStore.updateIsAdmin(0);
    message.success("退出成功");
    setTimeout(() => {
      location.reload();
    }, (800));
  }
  loading.value = false;
}

watch(menuStore, (newData, oldDaat) => {
  detail.value = newData.detail;
}, { deep: true })

onMounted(() => {
  getUser();
})

function changeYibu(flag) {
  menuStore.updateYibu(flag);
}

</script>

<style lang="less" scoped>
.mainContainer {
  overflow: auto;
  padding: 0 15%;
  background: #EEEEEE;
  padding-bottom: 50px;
  min-height: calc(100vh - 280px);

  .contianer_content {
    font-size: 14px;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .content_left {
      padding: 20px 0;
      background: #ffffff;
      height: auto;
      min-height: calc(100vh - 340px);
      width: 240px;
      margin-right: 20px;

      .left_img {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .myName {
          font-weight: bold;
          margin-top: 10px;
        }

        .introduction {
          margin-top: 10px;
          padding: 0 15px;
          color: #9c9c9c;
        }

        .myTag {
          margin-top: 15px;
          display: flex;
          justify-content: center;
        }
      }
      .my_img {
        width: 100%;
        padding: 20px;
      }
    }

    .content_right {
      flex: 1;
      min-width: 768px;
      background: #ffffff;
      padding: 20px;
      // overflow: hidden;

      .title {
        font-weight: bold;
        text-align: left;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .content_left {
      display: none;
    }
  }
}
</style>