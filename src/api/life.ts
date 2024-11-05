import request from "../utils/request";

// 获取生活瞬间图片列表
export function getRecordList() {
    return request({
        url: '/life/recordList',
        method: 'get'
    })
};
