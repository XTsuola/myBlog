import request from "../utils/request";

// 获取生活瞬间图片列表
export function getLifeImgList() {
    return request({
        url: '/life/imgList',
        method: 'get'
    })
};

// 新增生活瞬间图片
export interface LifeImgAddType {
    remark: string
    img: string
};

export function lifeImgAdd(data: LifeImgAddType) {
    return request({
        url: "/life/add",
        method: "post",
        data: data
    })
};

// 删除生活瞬间图片
export function lifeImgDelete(id: number) {
    return request({
        url: '/life/delete?id=' + id,
        method: 'get'
    })
};