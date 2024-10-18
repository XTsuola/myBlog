
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