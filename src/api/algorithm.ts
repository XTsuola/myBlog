import request from "../utils/request";

// 获取算法列表
export function getAlgorithmList(data: any) {
    return request({
        url: "/algorithm/list",
        method: "get",
        params: data
    })
};

// 获取算法详情
export function getAlgorithmDetail(id: number) {
    return request({
        url: "/algorithm/detail?id=" + id,
        method: "get"
    })
};

// 新增算法
export interface AlgorithmAddType {
    id?: number
    title: string
    desc: string
    detail: string
};

export function algorithmAdd(data: AlgorithmAddType) {
    return request({
        url: "/algorithm/add",
        method: "post",
        data: data
    })
};

// 编辑算法
export function algorithmEdit(data: AlgorithmAddType) {
    return request({
        url: "/algorithm/edit",
        method: "post",
        data: data
    })
};