// 时间格式化
export function formatDate(date: string, type?: string) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
    const day = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
    const hour = newDate.getHours() > 9 ? newDate.getHours() : "0" + newDate.getHours();
    const minute = newDate.getMinutes() > 9 ? newDate.getMinutes() : "0" + newDate.getMinutes();
    const second = newDate.getSeconds() > 9 ? newDate.getSeconds() : "0" + newDate.getSeconds();
    if (type) {
        return year + type + month + type + day + " " + hour + ":" + minute + ":" + second;
    } else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }
}

const xingzuoList = [{
    name: "白羊座",
    start: 3.21,
    end: 4.19,
}, {
    name: "金牛座",
    start: 4.20,
    end: 5.20,
}, {
    name: "双子座",
    start: 5.21,
    end: 6.21,
}, {
    name: "巨蟹座",
    start: 6.22,
    end: 7.22,
}, {
    name: "狮子座",
    start: 7.23,
    end: 8.22,
}, {
    name: "处女座",
    start: 8.23,
    end: 9.22,
}, {
    name: "天秤座",
    start: 9.23,
    end: 10.23,
}, {
    name: "天蝎座",
    start: 10.24,
    end: 11.22,
}, {
    name: "射手座",
    start: 11.23,
    end: 12.21,
}, {
    name: "摩羯座",
    start: 12.22,
    end: 1.19,
}, {
    name: "水瓶座",
    start: 1.20,
    end: 2.18,
}, {
    name: "双鱼座",
    start: 2.19,
    end: 3.20,
}];

// 计算年龄和星座
export function getAge(date: string) {
    const list = date.split("-");
    const newDate = new Date();
    const nowYear = newDate.getFullYear();
    const nowMonth = newDate.getMonth() + 1;
    const nowDay = newDate.getDate();
    const a = parseInt(nowYear) - parseInt(list[0]);
    const b = parseInt(nowMonth) - parseInt(list[1]);
    let d = 0;
    if(b < 0) {
        d = a - 1;
    } else {
        const c = parseInt(nowDay) - parseInt(list[2]);
        if(c < 0) {
            d = a -1;
        } else {
            d = a;
        }
    }
    let xingzuo = "";
    const myBirthDay = parseInt(list[1]) * 100 + parseInt(list[2]);
    for(let i = 0; i < xingzuoList.length; i++) {
        if((myBirthDay >= xingzuoList[i].start * 100) && (myBirthDay <= xingzuoList[i].end * 100)) {
            xingzuo = xingzuoList[i].name;
            break;
        }
    }
    if(!xingzuo) {
        xingzuo = "摩羯座";
    }
    return { age: d, xingzuo: xingzuo };
};

export const colorList = [{
    level: 4,
    name: "精通",
    color: "error",
}, {
    level: 3,
    name: "熟练",
    color: "warning",
}, {
    level: 2,
    name: "入门",
    color: "success",
}, {
    level: 1,
    name: "了解",
    color: "processing",
}]


export const weekList = ["一", "二", "三", "四", "五", "六", "日"];
export const monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",];

export function getNewTravelList(list: any) {
    let arr = [];
    for(let i = 0; i < list.length; i++) {
        const index = arr.findIndex(item => item.name == list[i].name);
        if(index == -1) {
            arr.push({
                name: list[i].name,
                lng: list[i].lng,
                lat: list[i].lat,
                city: list[i].city,
                info: [list[i].info],
                time: [list[i].time],
                friend: [list[i].friend],
                isHome: list[i].isHome
            })
        } else {
            arr[index].info.push(list[i].info);
            arr[index].time.push(list[i].time);
            arr[index].friend.push(list[i].friend);
        }
    }
    const homeList = [];
    const travelList = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].isHome) {
            homeList.push(arr[i]);
        } else {
            travelList.push(arr[i]);
        }
    }
    return {
        homeList,
        travelList
    }
}