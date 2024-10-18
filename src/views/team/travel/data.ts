export interface ListType {
    name: string
    lng: number
    lat: number
    city?: string
    info: string[]
    time: string[]
    friend: string[]
}

const homeList = [
    {
        name: "龙海骏景",
        lng: 118.868589,
        lat: 32.347434,
        info: ["我们的家——龙海骏景"],
        time: ["至今"],
        friend: ["月色、江南"]
    }, {
        name: "星悦城",
        lng: 118.701396,
        lat: 32.165192,
        info: ["以前租房子的地方——星悦城"],
        time: ["2024年4月1日退租"],
        friend: ["月色、江南"]
    }, {
        name: "柯郑村",
        lng: 118.889838,
        lat: 32.376873,
        info: ["我们的老家——柯郑村"],
        time: ["至今"],
        friend: ["月色、江南、爸爸、妈妈、奶奶"]
    }
]

export const travelList = [{
    name: "玄武湖公园",
    lng: 118.805415,
    lat: 32.07912,
    city: "南京",
    info: ["家人一起划船", "朋友一起划船", "约会划船"],
    time: ["2023年7月22日", "2022年11月27日", "2022年6月3日"],
    friend: ["月色、江南、斌斌、丈母娘", "月色、江南、王祥、杨先", "月色、江南"]
}, {
    name: "竹镇巴布洛",
    lng: 118.615913,
    lat: 32.495992,
    city: "南京",
    info: ["竹镇巴布洛看花海"],
    time: ["2022年7月17日"],
    friend: ["月色、江南、王祥、恒恒"]
}, {
    name: "南京紫金山",
    lng: 118.859446,
    lat: 32.067579,
    city: "南京",
    info: ["夜袭紫金山", "紫金山看日出"],
    time: ["2024年3月1日", "2022年9月10日"],
    friend: ["月色、江南、王祥、恒恒", "月色、江南、王祥"]
}, {
    name: "金正农庄",
    lng: 118.867358,
    lat: 32.378198,
    city: "南京",
    info: ["金正农庄钓鱼"],
    time: ["2022年11月19日"],
    friend: ["月色、江南、爸爸"]
}, {
    name: "TanGo剧本杀",
    lng: 118.799818,
    lat: 32.046897,
    city: "南京",
    info: ["TanGo剧本杀-忘川旅馆", "TanGo剧本杀-月隐于时针之隙", "TanGo剧本杀-布达佩斯大饭店2"],
    time: ["2023年8月26日", "2023年6月23日", "2022年11月26日" ],
    friend: ["月色、江南、嘉忻、王祥", "月色、江南、嘉忻、宁飞", "月色、江南、王祥、杨先、嘉忻、海棠" ]
}, {
    name: "成南九肆",
    lng: 118.788146,
    lat: 32.045605,
    city: "南京",
    info: ["城南九肆品茶"],
    time: ["2022年11月27日"],
    friend: ["月色、江南、王祥、杨先、嘉忻、海棠"]
}, {
    name: "秦淮河",
    lng: 118.795931,
    lat: 32.026238,
    city: "南京",
    info: ["秦淮河坐船"],
    time: ["2023年2月26日"],
    friend: ["月色、江南、陆月、叶欣雨"]
}, {
    name: "炬猩NEW_LIVE酒吧",
    lng: 118.791973,
    lat: 32.028703,
    city: "南京",
    info: ["酒吧狂欢"],
    time: ["2023年6月23日"],
    friend: ["月色、江南、嘉忻、宁飞"]
}, {
    name: "韩乐坊",
    lng: 122.159782,
    lat: 37.434341,
    city: "威海",
    info: ["韩乐坊打卡"],
    time: ["2023年6月29日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "九龙湾",
    lng: 122.180142,
    lat: 37.436425,
    city: "威海",
    info: ["九龙湾打卡"],
    time: ["2023年6月29日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "威海海上公园",
    lng: 122.168338,
    lat: 37.443259,
    city: "威海",
    info: ["海上公园戏水"],
    time: ["2023年6月29日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "猫头山",
    lng: 122.154538,
    lat: 37.56182,
    city: "威海",
    info: ["远眺猫头山"],
    time: ["2023年6月30日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "威海国际浴场",
    lng: 122.050447,
    lat: 37.53505,
    city: "威海",
    info: ["威海国际浴场"],
    time: ["2023年6月30日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "火炬八街",
    lng: 122.037565,
    lat: 37.532049,
    city: "威海",
    info: ["火炬八街打卡"],
    time: ["2023年6月30日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "那香海",
    lng: 122.419395,
    lat: 37.415369,
    city: "威海",
    info: ["那香海玩沙戏水看日落"],
    time: ["2023年6月30日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "伦敦蓝桥",
    lng: 122.420603,
    lat: 37.404984,
    city: "威海",
    info: ["伦敦蓝桥打卡"],
    time: ["2023年6月30日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "海源公园",
    lng: 122.158085,
    lat: 37.526496,
    city: "威海",
    info: ["海源公园打卡"],
    time: ["2023年7月1日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "淄博钟书阁",
    lng: 117.995249,
    lat: 36.847293,
    city: "淄博",
    info: ["钟书阁打卡"],
    time: ["2023年7月1日"],
    friend: ["月色、江南、王祥、湛雨"]
}, {
    name: "异次元密室",
    lng: 118.790855,
    lat: 32.045131,
    city: "南京",
    info: ["密室逃脱-林宅"],
    time: ["2023年8月26日"],
    friend: ["月色、江南、王祥、嘉忻"]
}, {
    name: "龙池湖野炊",
    lng: 118.822888,
    lat: 32.331401,
    city: "南京",
    info: ["龙池湖野炊"],
    time: ["2023年10月29日"],
    friend: ["月色、江南、王祥、严丽、刘雨婷"]
}, {
    name: "西郊农庄",
    lng: 118.818021,
    lat: 32.368877,
    city: "南京",
    info: ["西郊农庄-婚礼"],
    time: ["2023年12月31日"],
    friend: ["双方亲戚朋友"]
}, {
    name: "神盾局科技密室",
    lng: 118.793252,
    lat: 32.043065,
    city: "南京",
    info: ["密室逃脱-精绝古城"],
    time: ["2024年2月16日"],
    friend: ["月色、江南、嘉忻、嘉忻对象"]
}, {
    name: "慢时光汉服店",
    lng: 118.797402,
    lat: 32.01975,
    city: "南京",
    info: ["汉服出游"],
    time: ["2024年4月6日"],
    friend: ["月色、江南、王祥、恒恒、于敏、周国庆、嘉忻、海棠"]
}]

export const dataList = [...homeList, ...travelList ]