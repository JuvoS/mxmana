<template>
    <div>

    <el-form ref="coreConfig" :model="coreConfig" label-width="100px">
        <el-form-item label="支付宝账户"><el-input v-model="coreConfig.alipayID"></el-input></el-form-item>
        <el-form-item label="支付宝安全验证码"><el-input v-model="coreConfig.alipayVerifyCode"></el-input></el-form-item>
        <el-form-item label="QQ登录组件AppID"><el-input v-model="coreConfig.QQLoginAppID"></el-input></el-form-item>
        <el-form-item label="QQ登录组件AppKey"><el-input v-model="coreConfig.QQLoginAppKey"></el-input></el-form-item>
        <el-form-item label="微信登录组件AppID"><el-input v-model="coreConfig.WechatLoginAppID"></el-input></el-form-item>
        <el-form-item label="微信登录组件AppKey"><el-input v-model="coreConfig.WechatLoginAppKey"></el-input></el-form-item>
        <el-form-item label="微博登录组件AppID"><el-input v-model="coreConfig.sinaLoginAppID"></el-input></el-form-item>
        <el-form-item label="微博登录组件AppKey"><el-input v-model="coreConfig.sinaLoginAppKey"></el-input></el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
        name: 'main',
        data() {
            return {
                coreConfig: {
                    alipayID: '',
                    alipayVerifyCode: '',
                    QQLoginAppID: '',
                    QQLoginAppKey: '',
                    WechatLoginAppID: '',
                    WechatLoginAppKey: '',
                    sinaLoginAppID: '',
                    sinaLoginAppKey: ''
                }
            }
        },
        computed: {
            
        },
        mounted() {
        	
        },
        created() {
            this.getSiteCoreData();
        },
        methods: {
           getSiteCoreData(){
               this.$axios.get('static/base/config.json').then((res) => {
                  this.coreConfig = res.data.coreConfig;
                })
           },
           onSubmit(){

           }
        }
    }

</script>
<style scoped="">
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
