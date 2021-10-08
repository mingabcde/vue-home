<template>
    <div class="page-product-list">
        <h2 class="page-title">商品列表</h2>
       <div class="product">
           <el-card v-for="item in list" :key="item._id">
                <img :src="item.img" alt="">
                <h3>{{item.title}}</h3>
                <p class="price">
                    <span class="num">￥{{item.price}}</span>
                    <span class="type">{{getType(item.type)}}</span>
                    </p>
                <p class="sales">已销售{{item.sales}}份</p>
                <div class="btns">
                    <router-link tag="el-button" :to="'/product/edit/' + item._id" class="el-button--success el-button--mini">编辑</router-link>
                    <el-button type="danger" size="mini" @click="removeProduct(item._id, item.title)">删除</el-button>
                </div>
           </el-card>
       </div>
       <div class="btns-list">
           <router-link tag="el-button" :to="'/product/list/' + (page > 1 ? page - 1 : 1)" class="is-round el-button--mini">上一页</router-link>
           <router-link tag="el-button" :to="'/product/list/' + (page + 1)" class="is-round el-button--mini">下一页</router-link>
       </div>
    </div>
</template>
<style lang="scss">
.page-product-list {
    .btns-list {
        padding: 10px 0 15px;
        text-align: center;
        .el-button {
            margin-left: 10px;
        }
    }
    .product {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .el-card {
            width: 192px;
            margin-bottom: 10px;
            img {
                width: 150px;
                height: 70px;
            }
            h3 {
                font-size: 16px;
                text-align: center;
                padding: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p {
                font-size: 12px;
                padding: 5px 0 10px;
            }
            .price {
                display: flex;
                .num {
                    flex: 1;
                    color: #f30;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
<script>
import { types } from '@t/config'
export default {
    data() {
        return {
            list: []
        }
    },
    props: ['page'],
    methods: {
        getData() {
            let { params } = this.$route;
            this.$http.get('/admin/product/list', { params })
                .then(({ data }) => {
                    if (data.errno === 0) {
                        this.list = data.data
                        // console.log(data)
                    } else {
                        this.$message.error(data.msg)
                    }
                })
        },
        getType(id) {
            let result = types.find(item => item.id === id);
            return result ? result.text : '其他';
        },
        removeProduct(id, title) {
            this.$confirm(`确定删除"${title}商品"`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求
                this.$http.post('/admin/product/remove', { id })
                    .then(({ data }) => {
                        if (data.errno === 0) {
                            this.$message.success('删除成功')
                            setTimeout(() => {
                                this.$router.go(0)
                            }, 1000)
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
            }).catch(() => {
                this.$message.info('取消删除')
            })
        }
    },
    watch: {
        $route() {
            this.getData();
        }
    },
    created() {
        this.getData();
    }
}
</script>