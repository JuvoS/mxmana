
<template>
    <div>

    <el-form ref="seoConfig" :model="seoConfig" label-width="100px">
        <el-form-item label="SEO标题"><el-input v-model="seoConfig.seoTitle"></el-input></el-form-item>
        <el-form-item label="主要关键字"><el-input v-model="seoConfig.seoKeywords"></el-input></el-form-item>
        <el-form-item label="网站描述"><el-input type="textarea" v-model="seoConfig.seoDescription"></el-input></el-form-item>
        <el-form-item label="SEO标题En"><el-input v-model="seoConfig.seoTitleEn"></el-input></el-form-item>
        <el-form-item label="主要关键字En"><el-input v-model="seoConfig.seoKeywordsEn"></el-input></el-form-item>
        <el-form-item label="网站描述En"><el-input type="textarea" v-model="seoConfig.seoDescriptionEn"></el-input></el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>

    export default {
        name: 'seoSiteConfig',
        data: function(){
            return {
                seoConfig: {
                   seoTitle: '',
                   seoKeywords: '',
                   seoDescription: '',
                   seoTitleEn: '',
                   seoKeywordsEn: '',
                   seoDescriptionEn: ''
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
                  this.seoConfig = res.data.seoConfig;
                })
           },
           onSubmit(){

           }
        }
    }
</script>

<style scoped="">

</style>