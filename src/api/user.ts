import request from "../utils/request";

// 获取用户信息
export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
};

// 登录
export function login(data: any) {
    return request({
        url: '/user/login',
        method: 'get',
        params: data
    })
};

// 退出
export function logout(id: number) {
    return request({
        url: '/user/logout?id=' + id,
        method: 'get'
    })
};