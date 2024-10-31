
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import routerDate from "./routerData";
import notfound from "@/layout/notfound.vue";

const routeList = [
    {
        path: '/',
        redirect: "/team/myhome"
    },
    {
        path: "/team/travel_map",
        meta: {
          menuType: "menu",
          key: "travel_map",
          label: "足迹",
        },
        component: () => import("@/views/team/travel/map.vue")
    },
    {
        path: "/team/love",
        meta: {
          menuType: "menu",
          key: "love",
          label: "我们的爱情",
        },
        component: () => import("@/views/team/life/love.vue")
    },
    {
        path: "/team/record",
        meta: {
          menuType: "menu",
          key: "record",
          label: "记录",
        },
        component: () => import("@/views/team/life/record.vue")
    },
    {
        path: "/team/recordDetail",
        meta: {
          menuType: "menu",
          key: "recordDetail",
          label: "记录详情",
        },
        component: () => import("@/views/team/life/recordDetail.vue")
    },
    {
        path: "/:pathMatch(.*)*", // 404页面
        name: "notfound",
        component: notfound
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routeList.concat(routerDate as any)
});

// 路由拦截
router.beforeEach((to, from, next) => {
    next();
})
  

export default router;