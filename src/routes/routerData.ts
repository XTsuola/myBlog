import type { RouteRecordRaw } from "vue-router"
import BlankLayout from "@/layout/BlankLayout.vue"

const newRouterDate: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layout/BasicLayout.vue"),
    children: [
      {
        path: "/team",
        meta: {
          menuType: "folder",
          key: "team",
          icon: "UserOutlined",
          label: "客缘战队"
        },
        component: BlankLayout,
        children: [
          {
            path: "myHome",
            redirect: "/team/myHome/list",
            meta: {
              menuType: "menu",
              key: "myHome",
              label: "个人首页",
            },
            component: () => import("@/views/team/myHome/index.vue"),
            children: [{
              path: "list",
              meta: {
                menuType: "menu",
                key: "myHome_list",
                label: "列表",
              },
              component: () => import("@/views/team/myHome/list.vue")
            }, {
              path: "add",
              meta: {
                menuType: "menu",
                key: "myHome_add",
                label: "新增",
              },
              component: () => import("@/views/team/myHome/add.vue")
            }, {
              path: "edit",
              meta: {
                menuType: "menu",
                key: "myHome_edit",
                label: "编辑",
              },
              component: () => import("@/views/team/myHome/edit.vue")
            }, {
              path: "detail",
              meta: {
                menuType: "menu",
                key: "myHome_detail",
                label: "详情",
              },
              component: () => import("@/views/team/myHome/detail.vue")
            }]
          },
          {
            path: "lifeMoments",
            meta: {
              menuType: "menu",
              key: "lifeMoments",
              label: "生活瞬间",
            },
            component: () => import("@/views/team/lifeMoments.vue")
          },
          {
            path: "learnRecord",
            redirect: "/team/learnRecord/list",
            meta: {
              menuType: "menu",
              key: "learnRecord",
              label: "学习记录",
            },
            component: () => import("@/views/team/learnRecord/index.vue"),
            children: [{
              path: "list",
              meta: {
                menuType: "menu",
                key: "learnRecord_list",
                label: "列表",
              },
              component: () => import("@/views/team/learnRecord/list.vue")
            }, {
              path: "add",
              meta: {
                menuType: "menu",
                key: "learnRecord_add",
                label: "新增",
              },
              component: () => import("@/views/team/learnRecord/add.vue")
            }, {
              path: "edit",
              meta: {
                menuType: "menu",
                key: "learnRecord_edit",
                label: "编辑",
              },
              component: () => import("@/views/team/learnRecord/edit.vue")
            }, {
              path: "detail",
              meta: {
                menuType: "menu",
                key: "learnRecord_detail",
                label: "详情",
              },
              component: () => import("@/views/team/learnRecord/detail.vue")
            }]
          },
          {
            path: "schoolLife",
            meta: {
              menuType: "menu",
              key: "schoolLife",
              label: "学校生活",
            },
            component: () => import("@/views/team/schoolLife.vue")
          },
          {
            path: "planLife",
            meta: {
              menuType: "menu",
              key: "planLife",
              label: "规划人生",
            },
            component: () => import("@/views/team/planLife.vue")
          },
          {
            path: "travel",
            meta: {
              menuType: "menu",
              key: "travel",
              label: "旅行打卡",
            },
            component: () => import("@/views/team/travel/travel.vue")
          },
          {
            path: "visitorMessage",
            meta: {
              menuType: "menu",
              key: "visitorMessage",
              label: "访客留言",
            },
            component: () => import("@/views/team/visitorMessage.vue")
          }
        ]
      }
    ]
  }
]

export default newRouterDate