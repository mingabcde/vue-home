<template>
    <div class="detail-page">
        <template v-if="data.title"> 
            <div class="show">
                <img :src="data.img" alt="">
                <div class="intro">
                    <h1>{{data.title}}</h1>
                    <p>{{data.description}}</p>
                </div>
            </div>
            <div class="price-list">
                <p class="price"><strong>{{data.price}}</strong><span>元</span></p>
                <p class="originPrice">门市价:{{data.originPrice}}元</p>
                <button :class="{
                    'buy-store': data.hasbuy
                }" @touchend="btnStore">{{data.hasbuy ? '取消购买' : '立即购买'}}</button>
            </div>
            <div class="sales">
                <div>支持随时退货</div>
                <div>支持立即退货</div>
                <div>销量:{{data.sales}}</div>
            </div>
            <div class="module">
                <div class="module-header">店家信息</div>
                <div class="module-body">
                    <p>{{data.storeName}}</p>
                    <p>{{data.storeAddress}}</p>
                </div>
                <div class="module-foot">查看其他{{data.storeNum}}家分店</div>
            </div>
            <div class="module">
                <div class="module-header">购买须知</div>
                <div class="module-body" v-html="data.content"></div>
            </div>
            <Shoppingcar :toBuy="toBuy"></Shoppingcar>
        </template>
        <template v-else>
            <p>没有数据</p>
        </template>
    </div>
</template>
<style lang="scss">
@import '@/base.scss';
.detail-page {
    padding-bottom: 60px;
    .show {
        position: relative;
        img {
            width: 100%;
            height: 230px;
        }
        .intro{
            position: absolute;
            left: 15px;
            bottom: 15px;
            color: white;
            h1 {
                font-size: 20px;
                line-height: 30px;
            }
            p {
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
    .price-list {
        padding: 0 15px;
        background-color: #fff;
        height: 40px;
        display: flex;
        border-bottom: 1px solid #ccc;
        .price {
            line-height: 20px;
            margin-top: 10px;
            margin-right: 15px;
            strong {
                font-size: 22px;
                color: $navColor;
            }
            span {
                margin-left: 4px;
                font-size: 14px;
                color: $navColor;
            }
        }
        .originPrice {
            margin-top: 10px;
            font-size: 14px;
            line-height: 20px;
            flex: 1;
        }
        button {
            background-color: #f30;
            font-size: 14px;
            line-height: 18px;
            height: 22px;
            padding: 2px 8px;
            color: white;
            border-radius: 3px;
            border: none;
            margin-top: 8px;
            &.buy-store {
                background-color: #ccc;
                color: #aaa;
            }
        }
    }
    .sales {
        display: flex;
        background-color: #fff;
        padding: 10px 15px;
        flex-wrap: wrap;
        div {
            padding: 5px 0;
            line-height: 20px;
            font-size: 16px;
            width: 50%;
            color: orange;
            &:last-child {
                color: black;
            }
        }
    }
    .module {
        margin-top: 10px;
        background-color: #fff;
        .module-header {
            padding: 15px 10px 10px;
            line-height: 20px;
            font-size: 20px;
            border-bottom: 1px solid #ccc;
        }
        .module-body {
            line-height: 30px;
            font-size: 16px;
            padding: 10px 10px;
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                line-height: 40px;
                color: orange;
                font-weight: normal;
                // font-size: 18px;
            }
        }
        .module-foot {
            font-size: 14px;
            color: skyblue;
            padding: 0 10px 15px;
        }
    }
}
</style>
<script>
import Shoppingcar from '@/components/Shoppingcar'
export default {
    data() {
        return {
            data: {}
        }
    },
    components: { Shoppingcar },
    watch: {
        $route() {
            this.getData();
        }
    },
    methods: {
        getData() {
            let { params } = this.$route;
            this.$http.get('/data/detail', { params })
                .then(({ data }) => {
                    if (data.title) {
                        // 判断该商品是否已经在购物车存在
                        if (this.$store.state.products.find(item => (item._id === data._id))) {
                            data.hasbuy = true
                        }
                        this.data = data
                    } else {
                        this.data = {}
                    }
                })
        },
        btnStore() {
            // 修改store里的购物车数据
            this.$store.commit(this.data.hasbuy ? 'removeStore' : 'addStore', this.data)
            if (isNaN(+this.data.price)) {
                return
            }
            this.$set(this.data, 'hasbuy', !this.data.hasbuy)
        },
        // 选好了按钮执行的方法
        toBuy() {
            if (this.$store.state.products.length) {
                this.$router.push('/buy')
            } else {
                alert('购物车空空如也，快去选购商品吧')
            }
        }
    },
    created() {
        // 请求数据
        this.getData()
    }
}
</script>