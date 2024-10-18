import request from "../utils/request";

// 获取访客留言信息
export function getMsgList() {
    return request({
        url: '/msg/list',
        method: 'get'
    })
};

// 新增学习内容
export interface MsgAddType {
    id?: number
    name: string
    title: string
    time: string
    content: string
};

export function msgAdd(data: MsgAddType) {
    return request({
        url: "/msg/add",
        method: "post",
        data: data
    })
};

// 管理员回复
export function msgReply(data: any) {
    return request({
        url: '/msg/reply',
        method: 'post',
        data: data
    })
};

// 删除访客留言
export function msgDelete(id: number) {
    return request({
        url: '/msg/delete?id=' + id,
        method: 'get'
    })
};