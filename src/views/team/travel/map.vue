<template>
    <div class="mapMain" @contextmenu="handleRightClick">
        <div class="worldMap">
            <div id="allmap"></div>
            <div class="tools">
                <a-slider id="test" v-model:value="level" :min="3" :max="21" @change="changeSize"
                    @afterChange="afterChangeSize" :step="0.5" />
            </div>
        </div>
        <div class="content">
            <div class="content_box top10 bottom18">
                <div class="content_box_head" style="display: flex;justify-content: space-between;align-items: center;">
                    <p>游玩地点统计</p><a-button v-permission="'admin'" @click="addFoot()">添加</a-button>
                </div>
                <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 2 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'name'">
                            <a>{{ record.name }}</a>
                        </template>
                        <template v-else-if="column.key === 'action'">
                            <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                                <a-button size="small" type="link" @click="goPoint(record)">查看</a-button>
                            </span>
                        </template>
                    </template>
                </a-table>
            </div>
            <div class="content_box bottom18">
                <div class="content_box_head">景点城市统计</div>
                <div class="content_box_chart" ref="myEcharts2"></div>
            </div>
            <div class="content_box bottom18">
                <div class="content_box_head">人次出行统计</div>
                <div class="content_box_chart" ref="myEcharts3"></div>
            </div>
        </div>
        <a-modal v-model:open="visible" title="添加记录" centered>
            <a-form ref="footerAddRef" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 3 }"
                autocomplete="off">
                <a-form-item label="地点" name="name" :rules="[{ required: true, message: '请输地点！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.name" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="城市" name="city" :rules="[{ required: true, message: '请输城市！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.city" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="经历" name="info" :rules="[{ required: true, message: '请输经历！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.info" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="时间" name="time" :rules="[{ required: true, message: '请输时间！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.time" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="同伴" name="friend" :rules="[{ required: true, message: '请输同伴！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.friend" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="经度" name="lng" :rules="[{ required: true, message: '请输经度！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.lng" placeholder="请输入"></a-input>
                </a-form-item>
                <a-form-item label="纬度" name="lat" :rules="[{ required: true, message: '请输纬度！', trigger: 'blur' }]">
                    <a-input v-model:value="addData.lat" placeholder="请输入"></a-input>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="addOk">确认</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive, nextTick } from "vue";
import { init } from 'echarts';
import type { ListType } from "./data";
import { footAdd, type FootAddType } from "@/api/travel";
import { getTravelFootList } from '@/api/travel';
import { getNewTravelList } from "@/utils/func";
import { useMenuStore } from '@/store/menu/menu';
// import { travelList, dataList } from "./data";

const menuStore = useMenuStore();
const menu = JSON.parse(window.sessionStorage.getItem("menu"));
let travelList = [];
let dataList = [];
if (menu.mapData) {
    travelList = menu.mapData.travelList.reverse();
    dataList = [...menu.mapData.travelList, ...menu.mapData.homeList];
}
const loading = ref(false);
const flag = ref(true);
const infoWindow = ref(null);
const map = ref(null)
let Bmap: any = window.BMapGL
const level = ref<number>(12);
let myCharts2 = null;
const myEcharts2 = ref();
let myCharts3 = null;
const myEcharts3 = ref();
const colorList = ["#5470C6", "#91CC75", "#FAC858", "#EE6666", "#73C0DE", "#3BA272", "#FC8452", "#9A60B4", "#EA7CCC", "#5470C6"];
const showFlag = ref(true);
const originalColumns = [
    {
        title: "序号",
        dataIndex: "no",
        key: "no",
        width: 90
    },
    {
        title: "地点",
        dataIndex: "name",
        key: "name",
        width: 180
    },
    {
        title: "城市",
        dataIndex: "city",
        key: "city",
        width: 120
    },
    {
        title: "操作",
        key: "action",
        width: 120
    },
];
const newColumns = [
    {
        title: "地点",
        dataIndex: "name",
        key: "name",
        width: 270
    },
    {
        title: "操作",
        key: "action",
        width: 90
    },
];
const columns = ref([])
columns.value = JSON.parse(JSON.stringify(originalColumns));
const tableData = ref([]);
const footerAddRef = ref();
const visible = ref(false);
const addData = reactive<FootAddType>({
    name: "",
    city: "",
    info: "",
    time: "",
    friend: "",
    lat: "",
    lng: ""
})

function handleResize() {
    if (window.innerWidth < 1500) {
        columns.value = JSON.parse(JSON.stringify(newColumns));
        showFlag.value = false;
    } else {
        columns.value = JSON.parse(JSON.stringify(originalColumns))
        showFlag.value = true;
    }
    setTimeout(() => {
        drawCharts();
    }, 100)
}

function initMap() {
    map.value = new Bmap.Map("allmap");
    map.value.centerAndZoom(new Bmap.Point(118.868589, 32.347434), 12);
    map.value.enableScrollWheelZoom();
    map.value.setHeading(0);   // 设置地图旋转角度
    map.value.setTilt(50);     // 设置地图的倾斜角度
    let list = ["南京", "威海", "淄博"];
    for (let i = 0; i < list.length; i++) {
        var dist = new Bmap.DistrictLayer({
            name: `(${list[i]})`,
            fillColor: '#5e8bff',
            strokeColor: '#0000ff',
            fillOpacity: 0.1,
            kind: 1
        });
        map.value.addDistrictLayer(dist);
    }
};

function setPoint() {
    let list: ListType[] = dataList
    for (let i = 0; i < list.length; i++) {
        var point = new Bmap.Point(list[i].lng, list[i].lat);
        var marker = new Bmap.Marker(point);
        marker.addEventListener("click", function () {
            let aList: any = []
            for (let k = 0; k < list[i].time.length; k++) {
                aList.push(list[i].time[k], list[i].info[k], list[i].friend[k]);
            }
            const str = aList.join("<br>");
            infoWindow.value = new Bmap.InfoWindow(str, {
                width: 240,
                title: list[i].name
            })
            map.value.openInfoWindow(infoWindow.value, new Bmap.Point(list[i].lng, list[i].lat));
        })
        map.value.addOverlay(marker);
    }
}

function changeSize(e) {
    flag.value = false;
    map.value.setZoom(e);
}

function afterChangeSize(e) {
    flag.value = true;
}

function handleRightClick(e) {
    e.preventDefault();
}

function getTableData() {
    const list = travelList.reverse();
    const arr = [];
    for (let i = 0; i < list.length; i++) {
        arr.push({
            no: i + 1,
            ...list[i]
        })
    }
    return arr;
}

function getChart2Data() {
    const list = travelList;
    let arr: any = [];
    for (let i = 0; i < list.length; i++) {
        const index = arr.findIndex(item => item.name == list[i].city);
        if (index != -1) {
            arr[index].count++;
        } else {
            arr.push({
                name: list[i].city,
                count: 1
            })
        }
    }
    return arr;
}

function getChart3Data() {
    const list = travelList;
    let arr = [];
    for (let i = 0; i < list.length; i++) {
        arr = arr.concat(list[i].friend);
    }
    let brr: any = [];
    for (let i = 0; i < arr.length; i++) {
        const crr = arr[i].split("、");
        for (let j = 0; j < crr.length; j++) {
            const index = brr.findIndex(item => item.name == crr[j]);
            if (index != -1) {
                brr[index].count++;
            } else {
                brr.push({
                    name: crr[j],
                    count: 1
                })
            }
        }
    }
    return brr;
}

function getList() {
    tableData.value = getTableData();
}

function draw2() {
    const list = getChart2Data();
    const arr = list.map(item => {
        return {
            name: item.name,
            value: item.count
        }
    }).sort((a, b) => { return b.value - a.value }).slice(0, 10);
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            show: showFlag.value
        },
        series: [
            {
                name: '城市',
                type: 'pie',
                radius: '70%',
                data: arr,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (myEcharts2.value) {
        myCharts2 = init(myEcharts2.value);
        myCharts2.setOption(option);
    }
}

function draw3() {
    const list = getChart3Data();
    const arr = list.map(item => {
        return {
            name: item.name,
            value: item.count
        }
    }).sort((a, b) => { return b.value - a.value }).slice(0, 10);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: arr.map(item => item.name),
            axisLabel: {
                interval: 0
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: arr.map((item, index) => {
                    return {
                        value: item.value,
                        itemStyle: {
                            color: colorList[index]
                        }
                    }
                }),
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'black',
                                fontSize: 10
                            }
                        }
                    }
                },
                type: 'bar',
            }
        ]
    };
    if (myEcharts3.value) {
        myCharts3 = init(myEcharts3.value);
        myCharts3.setOption(option);
    }
}

function drawCharts() {
    getList();
    if (myCharts2) {
        myCharts2 = null;
    }
    if (myCharts3) {
        myCharts3 = null;
    }
    draw2();
    draw3();
}

function goPoint(record) {
    map.value.centerAndZoom(new Bmap.Point(record.lng, record.lat), 15);
}

function addFoot() {
    visible.value = true;
}

async function addOk() {
    loading.value = true;
    try {
        await footerAddRef.value?.validate();
        const res = await footAdd(addData);
        if(res.data.code == 201) {
            travelFootList();
        }
    } catch (_) { }
    loading.value = false;
}

async function travelFootList() {
    const res = await getTravelFootList();
    if (res.data.code == 200) {
        const list = getNewTravelList(res.data.data);
        menuStore.updateMapData(list);
        location.reload();
    }
}

onMounted(() => {
    drawCharts();
    nextTick(() => {
        initMap();
        setPoint();
        map.value.addEventListener("zoomend", function () {
            if (flag.value) {
                setTimeout(() => {
                    level.value = map.value.getZoom();
                }, 200);
            }
        });
    });
    window.addEventListener('resize', handleResize);
})

</script>

<style lang="less" scoped>
.mapMain {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;

    .worldMap {
        position: relative;
        flex: 1;
        height: 100%;

        #allmap {
            width: 100%;
            height: 100%;
        }

        .tools {
            z-index: 999;
            background: transparent;
            width: 100px;
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
    }

    .content {
        width: 30vw;
        min-width: 300px;
        padding: 10px;

        .content_box {
            height: calc(33.3% - 20px);
            border: 2px solid blue;
            border-radius: 8px;
            padding: 10px;
            overflow-y: auto;

            .content_box_head {
                font-weight: bold;
                height: 20px;
                margin-bottom: 10px;
            }

            .content_box_chart {
                height: calc(100% - 30px);
                width: 100%;
            }
        }
    }

    .top10 {
        margin-top: 10px;
    }

    .bottom18 {
        margin-bottom: 18px;
    }
}

@media screen and (max-width: 768px) {
    .content {
        display: none;
    }
}
</style>