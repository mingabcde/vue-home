<template>
    <div class="home-page">
        <ul class="type-list">
            <router-link tag="li" :to="'/list/' + item.id" v-for="item in types" :key="item.id">
                <img :src="'/static/img/ico/' + item.img" alt="">
                <p>{{item.text}}</p>
            </router-link>
        </ul>
        <ul class="ad-list">
            <router-link tag="li" :to="'/detail/' + item.product" v-for="(item, index) in ad" :key="item._id">
                <h1 :class="'color-' + index">{{item.title}}</h1>
                <p>{{item.description}}</p>
                <img :src="item.url" alt="">
            </router-link>
        </ul>
        <div class="geuss-list">
            <p>猜你喜欢</p>
        </div>
        <Product v-for="item in list" :key="item._id" :data="item"></Product>
    </div>
</template>
<style lang="scss">
.home-page {
    .type-list {
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 5px;
        text-align: center;
        li {
            width: 20%;
            margin-bottom: 5px;
            font-size: 12px;
            img {
                width: 60%;
                // margin-bottom: 10px;
            }
        } 
    }
    .ad-list {
        background-color: #fff;
        display: flex;
        text-align: center;
        margin-top: 10px;
        li {
            flex: 1;
            width: (100%/3);
            box-sizing: border-box;
            border-right: 1px solid #ccc;
            padding: 20px 0 15px;
            &:last-child {
                border-right: none;
            }
            img {
                width: 50%;
            }
            h1 {
                font-size: 14px;
                font-weight: normal;
            }
            p {
                font-size: 12px;
                padding: 10px 0;
            }
            $index: 0;
            @each $i in red, green, purple {
                .color-#{$index} {
                    color: $i
                }
                $index: $index + 1;
            }
        }
    }
    .geuss-list {
        background-color: #fff;
        margin-top: 10px;
        padding: 0 10px;
        p {
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
        }
    }
}

</style>
<script>
// 引入商品组件
import Product from '@/components/Product.vue'
export default {
    data() {
        return {
            types: [
                { id: 1, text: '美食', img: '01.png' },
                { id: 2, text: '电影', img: '02.png' },
                { id: 3, text: '酒店', img: '03.png' },
                { id: 4, text: '休闲', img: '04.png' },
                { id: 5, text: '外面', img: '05.png' },
                { id: 6, text: 'KTV', img: '06.png' },
                { id: 7, text: '丽人', img: '07.png' },
                { id: 8, text: '小吃', img: '08.png' },
                { id: 9, text: '周边游', img: '09.png' },
                { id: 10, text: '火车票', img: '10.png' },
            ],
            ad: [],
            list: []
        }
    },
    // 注册组件
    components: { Product },
    // 组件创建时请求数据
    created() {
        this.$http.get('/data/home')
            .then(({ data }) => {
                this.ad = data.ad,
                this.list = data.list
            })
    }
}
</script>