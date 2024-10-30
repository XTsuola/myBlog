<template>
    <div class="love" @scroll="handleScroll">
        <div class="love_title">
            <div class="title_img">
                <img src="@/assets/img/life/img1.jpg" draggable="false" />
                <img src="@/assets/img/life/img2.jpg" draggable="false" />
                <img src="@/assets/img/life/img3.jpg" draggable="false" />
            </div>
            <div class="love_info">
                <div class="love_info_1">
                    <div style="transform: translate(-5px, -5px);">郑宗</div>
                    <div class="heart"></div>
                    <div style="transform: translateY(-5px);">夏美玲</div>
                </div>
                <div class="love_info_2">
                    <div class="info2_div">
                        <div>Years</div>
                        <div class="info2_title">{{ year }}</div>
                    </div>
                    <div class="info2_div">
                        <div>Months</div>
                        <div class="info2_title">{{ month }}</div>
                    </div>
                    <div class="info2_div">
                        <div>Days</div>
                        <div class="info2_title">{{ day }}</div>
                    </div>
                    <div class="info2_div">
                        <div>Hours</div>
                        <div class="info2_title">{{ hour }}</div>
                    </div>
                    <div class="info2_div">
                        <div>Minutes</div>
                        <div class="info2_title">{{ minute }}</div>
                    </div>
                    <div class="info2_div">
                        <div>Seconds</div>
                        <div class="info2_title">{{ second }}</div>
                    </div>
                </div>
                <div class="love_info_3">
                    在爱情和计数
                </div>
                <div class="love_info_4">
                    发现更多
                </div>
            </div>
        </div>
        <div id="love_menu" class="love_menu" style="margin-bottom: 60px;">
            <img class="love_menu_img" src="@/assets/img/life/logo.png" />
            <div class="love_menu_title">
                <div :class="activeClick == 1 ? 'active' : ''" @click="scrollToSection(1)">我们的爱情</div>
                <div :class="activeClick == 2 ? 'active' : ''" @click="scrollToSection(2)">我们的幸福时刻</div>
                <div :class="activeClick == 3 ? 'active' : ''" @click="scrollToSection(3)">我们的爱情瞬间</div>
                <div :class="activeClick == 4 ? 'active' : ''" @click="scrollToSection(4)">我爱你</div>
            </div>
        </div>
        <div id="section1" class="content_box" style="padding-top: 60px;">
            <div class="box_title">我们的爱情</div>
            <div class="underline"></div>
            <div class="box_text">很幸运地遇上了我的“宝宝”，从此开始了我们的爱情生活^_^</div>
            <Part1></Part1>
        </div>
        <div id="section2" class="content_box">
            <div class="box_title">我们的幸福时刻</div>
            <div class="underline"></div>
            <div class="box_text"><span style="font-weight: bold;">爱情时刻</span>是特殊的，它值得被记录下来，将永远铭记！这是我们一些重要和幸福的时刻。</div>
            <Part2></Part2>
        </div>
        <div id="section3" class="content_box">
            <div class="box_title">我们的爱情瞬间</div>
            <div class="underline"></div>
            <div class="box_text">所有美好的记忆，我都会保存下来，等我们老了，再一起回忆。</div>
            <Part3></Part3>
        </div>
        <div id="section4" class="content_box">
            <div class="box_title">我爱你</div>
            <div class="underline"></div>
            <div class="box_text">小可爱，你是我手心中的，宝贝儿。Love you forever^_^</div>
            <Part4></Part4>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import Part1 from "./part1.vue";
import Part2 from "./part2.vue";
import Part3 from "./part3.vue";
import Part4 from "./part4.vue";

const start: any = new Date('2021-8-6 00:00:00');
const year: any = ref("");
const month: any = ref("");
const day: any = ref("");
const hour: any = ref("");
const minute: any = ref("");
const second: any = ref("");
const activeClick = ref(1);
const rollActive = ref(false);

const handleScroll = (event) => {
    const section1 = document.getElementById("section1").getBoundingClientRect().top;
    const section2 = document.getElementById("section2").getBoundingClientRect().top;
    const section3 = document.getElementById("section3").getBoundingClientRect().top;
    const section4 = document.getElementById("section4").getBoundingClientRect().top;
    const menu = document.getElementById("love_menu")
    if (section1 < 0) {
        menu.style.position = "fixed";
        menu.style.top = 0;
    } else {
        menu.style.position = "absolute";
        menu.style.top = "calc(100vh - 60px)";
    }
    if (!rollActive.value) {
        if (section2 - 60 > 0) {
            activeClick.value = 1;
        } else if (section2 - 60 < 0 && section3 - 60 > 0) {
            activeClick.value = 2;
        } else if (section3 - 60 < 0 && section4 - 60 > 0) {
            activeClick.value = 3;
        } else {
            activeClick.value = 4;
        }
    }
};

function scrollToSection(id) {
    rollActive.value = true;
    activeClick.value = id;
    const sectionId = "section" + id;
    let section = null;
    if (id == 1) {
        section = document.getElementById(sectionId).offsetTop;
    } else {
        section = document.getElementById(sectionId).offsetTop - 60;
    }
    if (section) {
        window.scrollTo({
            top: section,
            behavior: 'smooth'
        });
    }
    setTimeout(() => {
        rollActive.value = false;
    }, 1000);
}

onMounted(() => {
    document.addEventListener('scroll', handleScroll);
    setInterval(() => {
        const now: any = new Date();
        const diffInMilliseconds = now - start;
        const diffDate = new Date(diffInMilliseconds);
        year.value = diffDate.getUTCFullYear() - 1970;
        month.value = diffDate.getUTCMonth();
        day.value = diffDate.getUTCDate() - 1;
        hour.value = diffDate.getUTCHours();
        minute.value = diffDate.getUTCMinutes();
        second.value = diffDate.getUTCSeconds();
    }, 1000);
})

onUnmounted(() => {
    document.removeEventListener('scroll', handleScroll);
});

</script>
<style lang="less" scoped>
.love {
    .love_title {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        overflow: hidden;

        .title_img {
            width: 100%;
            height: calc(100vh - 60px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            column-gap: 40px;
            background-color: #DDE5EA;

            img {
                height: 100%;
                user-select: none;
            }
        }

        .love_info {
            position: absolute;
            top: 28%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            .love_info_1 {
                font-size: 70px;
                color: #ffffff;
                font-weight: bold;
                margin-bottom: 36px;
                display: flex;
                justify-content: center;
                align-items: center;

                .heart {
                    width: 30px;
                    height: 30px;
                    margin: 0 30px;
                    background-color: #F04C74;
                    position: relative;
                    animation: beat .6s infinite ease-in;
                }

                .heart:before,
                .heart:after {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: #F04C74;
                    border-radius: 50%;
                }

                .heart:before {
                    left: 15px;
                }

                .heart:after {
                    top: -15px;
                }

                /* 定义beat动画 */
                @keyframes beat {
                    0% {
                        transform: scale(1) rotate(-45deg);
                    }

                    40% {
                        transform: scale(1) rotate(-45deg);
                    }

                    55% {
                        transform: scale(1.3) rotate(-30deg);
                    }

                    70% {
                        transform: scale(1) rotate(-45deg);
                    }

                    85% {
                        transform: scale(1.3) rotate(-60deg);
                    }

                    100% {
                        transform: scale(1) rotate(-45deg);
                    }
                }
            }



            .love_info_2 {
                font-size: 22px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;

                .info2_div {
                    margin: 0 12px;
                    text-align: center;

                    .info2_title {
                        font-weight: bold;
                    }
                }
            }

            .love_info_3 {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                font-size: 18px;
                margin-top: 40px;
            }

            .love_info_4 {
                width: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                font-size: 18px;
                margin-top: 30px;
                border: 2px solid #F04C74;
                padding: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .love_info_4:hover {
                border: 2px solid #ffffff;
                border-radius: 15px;
            }

            @media screen and (max-width: 768px) {
                .love_info_1 {
                    font-size: 20px;

                    .heart {
                        width: 15px;
                        height: 15px;
                        margin: 0 15px;
                    }

                    .heart:before,
                    .heart:after {
                        width: 15px;
                        height: 15px;
                    }

                    .heart:before {
                        left: 7.5px;
                    }

                    .heart::after {
                        top: -7.5px;
                    }
                }

                .love_info_2 {
                    font-size: 14px;

                    .info2_div {
                        margin: 0 4px;
                    }
                }

                .love_info_3,
                .love_info_4 {
                    display: none;
                }
            }
        }
    }

    .love_menu {
        position: absolute;
        height: 60px;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #cccccc;
        z-index: 999;

        .love_menu_img {
            height: 40px;
            margin-top: 10px;
            margin-left: 20%;
        }

        .love_menu_title {
            position: absolute;
            top: 10px;
            left: 58%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 30px;
            font-size: 14px;
            cursor: pointer;

            div:hover {
                color: #F04C74;
            }
        }
    }

    .content_box {
        width: 60%;
        margin-left: 20%;
        text-align: center;

        .box_title {
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Great Vibes', cursive;
            font-size: 30px;
            font-weight: 300;
        }

        .underline {
            position: relative;
            height: 1px;
            background-color: #eeeeee;
        }

        .underline:after {
            content: "";
            height: 3px;
            position: absolute;
            width: 100px;
            background: #ef6a8a;
            margin: 0 auto;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .box_text {
            padding: 40px 0;
        }
    }

    .active {
        color: #F04C74;
    }
}
</style>