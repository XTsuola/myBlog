<template>
   <a-config-provider :locale="zh_CN">
      <router-view></router-view>
   </a-config-provider>
   
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { weekList, monthList } from "@/utils/func";

const zh_CN = {
    ...zhCN
};



zh_CN.DatePicker.lang["shortWeekDays"] = weekList;
zh_CN.DatePicker.lang["shortMonths"] = monthList;

</script>

<style scoped>

</style>
