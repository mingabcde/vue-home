<template>
<div class="page-product-create">
    <h1 class="page-title">{{title}}</h1>
    <el-form label-width="200px" ref="product" :model="data" :rules="rules">
        <el-form-item label="商品名称" prop="title">
            <el-input placeholder="请输入商品名称" v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
            <el-input placeholder="请输入商品描述" v-model="data.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
            <el-input placeholder="请输入商品价格" v-model="data.price"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="originPrice">
            <el-input placeholder="请输入商品原价" v-model="data.originPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品评分" prop="evaluate">
            <el-rate :allow-half="true" :show-score="true" v-model="data.evaluate"></el-rate>
        </el-form-item>
        <el-form-item label="商品分类" prop="type">
            <el-select placeholder="请选择商品类型" v-model="data.type">
                <el-option v-for="item in types" :key="item.id" :label="item.text" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品销量" prop="sales">
            <el-input placeholder="请输入商品销量" v-model="data.sales"></el-input>
        </el-form-item>
        <el-form-item label="商品店名" prop="storeName">
            <el-input placeholder="请输入商品店名" v-model="data.storeName"></el-input>
        </el-form-item>
        <el-form-item label="商品地址" prop="storeAddress">
            <el-input placeholder="请输入商品地址" v-model="data.storeAddress"></el-input>
        </el-form-item>
        <el-form-item label="商品分店" prop="storeNum">
            <el-input placeholder="请输入商品分店" v-model="data.storeNum"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="img">
            <el-upload
                action="/admin/product/submitImg"
                :show-file-list="false"
                :on-success="submitSuccess"
                :on-error="submitError"
            >
                <el-button size="small" type="primary">上传</el-button>
                <span slot="tip" class="el-upload__tip">上传商品图片</span>
            </el-upload>
            <img :src="data.img" alt="" v-if="data.img" class="upload-img">
        </el-form-item>
        <el-form-item label="商品内容" prop="content">
            <quill-editor v-model="data.content"></quill-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="submitData">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<style lang="scss">
.page-product-create {
    .el-upload__tip {
        color: #999;
        margin-left: 10px;
    }
    .upload-img {
        max-height: 200px;
        margin-top: 10px;
    }
}
</style>
<script>
import { types } from '@t/config'
export default {
    data() {
        let rules = {};
        ['img', 'price', 'sales', 'originPrice', 'type', 'title', 'description', 'storeName', 'storeNum', 'storeAddress', 'content', 'evaluate']
                .forEach(item => {
                    rules[item] = [{ trigger: 'blur', message: '请输入内容', required: true}]
                })
        return {
            data: {},
            rules,
            types,
            title: '创建商品',
            submitUrl: '/admin/product/create',
            showMessage: '创建成功'
        }
    },
    computed: {
        dealData() {
            ['price', 'originPrice', 'sales', 'type', 'storeNum', 'evaluate'].forEach(key => {
                if (this.data[key]) {
                    this.data[key] = Number(this.data[key])
                }
            })
            return this.data
        }
    },
    methods: {
        submitSuccess(data) {
            if (data.errno === 0) {
                this.$set(this.data, 'img', data.data)
            } else {
                this.$message.error('上传失败')
            }
        },
        submitError() {
            this.$message.error('上传失败')
        },
        submitData() {
            this.$refs.product.validate(valid => {
                if (valid) {
                    this.$http.post(this.submitUrl, this.dealData)
                        .then(({ data }) => {
                            if (data.errno === 0) {
                                this.$message.success(this.showMessage)
                                if (this.showMessage === '修改成功') {
                                    setTimeout(() => { this.$router.back() }, 1000)
                                }
                            }
                        })
                } 
            })
        }   
    },
    created() {
        // console.log(this.dealData)
    }
    
}
</script>