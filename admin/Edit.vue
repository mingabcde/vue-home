// 编辑页面直接混合创建组件
<script>
import Create from '@v/product/Create'
export default {
    mixins: [Create],
    data() {
        return {
            // 重写标题，和提交接口
            title: '编辑商品',
            submitUrl: '/admin/product/update',
            showMessage: '修改成功'
        }
    },
    methods: {
        getData() {
            let { params } = this.$route
            this.$http.get('/admin/product/detail', { params })
                .then(({ data }) => {
                    if (data.errno === 0) {
                        this.data = data.data
                    } else {
                        this.$message.error(data.msg)
                        setTimeout(() => { this.$router.back() }, 1000)
                    }
                })
        },
    },
    watch: {
        $route() {
            this.getData();
        }
    },
    created() {
        this.getData()
    }
}
</script>