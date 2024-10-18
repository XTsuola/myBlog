import request from "../utils/request";

// 获取首页列表
export function getHomeInfoList() {
    return request({
        url: "/home_info/list",
        method: "get"
    })
};

// 获取学习内容详情
export function getHomeInfoDetail(id: number) {
    return request({
        url: "/home_info/detail?id=" + id,
        method: "get"
    })
};

// 新增首页列表内容
export interface HomeInfoAddType {
    id?: number
    title: string
    level: number | undefined
    info: string
};

export function homeInfoAdd(data: HomeInfoAddType) {
    return request({
        url: "/home_info/add",
        method: "post",
        data: data
    })
};

// 编辑首页列表内容
export function homeInfoEdit(data: HomeInfoAddType) {
    return request({
        url: "/home_info/edit",
        method: "post",
        data: data
    })
};