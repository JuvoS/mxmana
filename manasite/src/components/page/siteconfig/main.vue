
<template>
    <div>
        
    <el-form ref="siteConfig" :model="siteConfig" label-width="100px">
        <el-form-item label="网站名称"><el-input v-model="siteConfig.siteName"></el-input></el-form-item>
        <el-form-item label="网站地址"><el-input v-model="siteConfig.siteAddress"></el-input></el-form-item>
        <el-form-item label="网站作者"><el-input v-model="siteConfig.siteAuthor"></el-input></el-form-item>
        <el-form-item label="程序引擎"><el-input v-model="siteConfig.siteEngine"></el-input></el-form-item>
        <el-form-item label="版权信息"><el-input v-model="siteConfig.siteCopyRight"></el-input></el-form-item>
        <el-form-item label="客服热线"><el-input v-model="siteConfig.siteServeHotLine"></el-input></el-form-item>
        <el-form-item label="备案服务号"><el-input v-model="siteConfig.siteRecordNum"></el-input></el-form-item>
        <el-form-item label="站点临停"><el-switch v-model="siteConfig.siteSwitch"></el-switch></el-form-item>
        <el-form-item label="临停说明">
            <el-input type="textarea" v-model="siteConfig.siteCloseExplain"></el-input></el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>

    export default {
        name: 'mainSiteConfig',
        data: function(){
            return {
               siteConfig: {
                   siteName: '',
                   siteAddress: '',
                   siteAuthor: '',
                   siteEngine: '',
                   siteCopyRight: '',
                   siteServeHotLine: '',
                   siteRecordNum: '',
                   siteSwitch: true,
                   siteCloseExplain: ''
               }
            }
        },
        components:{

        },
        created() {
            this.getSiteData();
        },
        methods: {
           getSiteData(){
               this.$axios.get('static/base/config.json').then((res) => {
                  this.siteConfig = res.data.siteConfig;
                })
           },
           onSubmit(){

           }
        }
    }
</script>

<style scoped="">

</style>