import request from "../utils/request";

// 获取学习内容列表
export function getLearnList() {
    return request({
        url: "/learn/list",
        method: "get"
    })
};

// 获取学习内容详情
export function getLearnDetail(id: number) {
    return request({
        url: "/learn/detail?id=" + id,
        method: "get"
    })
};

// 新增学习内容
export interface LearnAddType {
    id?: number
    title: string
    time: string
    detail: string
};

export function learnAdd(data: LearnAddType) {
    return request({
        url: "/learn/add",
        method: "post",
        data: data
    })
};

// 编辑学习内容
export function learnEdit(data: LearnAddType) {
    return request({
        url: "/learn/edit",
        method: "post",
        data: data
    })
};