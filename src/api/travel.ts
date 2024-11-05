import request from "../utils/request";

// 获取打卡图片列表
export function getTravelImgList() {
    return request({
        url: '/travel/imgList',
        method: 'get'
    })
};

// 新增打卡图片
export interface TravelImgAddType {
    name: string
    time: string
    img: string
};

export function travelImgAdd(data: TravelImgAddType) {
    return request({
        url: "/travel/add",
        method: "post",
        data: data
    })
};

// 删除旅游打卡图片
export function travelImgDelete(id: number) {
    return request({
        url: '/travel/delete?id=' + id,
        method: 'get'
    })
};

// 获取旅游足迹列表数据
export function getTravelFootList() {
    return request({
        url: '/travel/travel_footList',
        method: 'get'
    })
};

// 新增旅游足迹数据
export interface FootAddType {
    name: string
    city: string
    info: string
    time: string
    friend: string
    lat: string
    lng: string 
}
export function footAdd(data: FootAddType) {
    return request({
        url: "/travel/food_add",
        method: "post",
        data: data
    })
};