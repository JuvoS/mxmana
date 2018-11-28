<template>
    <div>
        <el-row>
        <el-col :span="24">
            <div style="margin-top: 20px; margin-bottom: 20px;padding-left: 100px; font-size: 13px; line-height: 24px;"><p>提交申请前，请仔细阅读以下说明：</p><p style="color: red;">1. 该输入框只能输入JS代码，像通过html scripy标签提交的代码将被删除掉；不允许在JS通过document.write方式创建层，需要通过body appendchild创建层</p><p>2. 实例比如百度的代码 为  <br><span style="color: red;">var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?************"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();</span></p><p>3. 实例比如cnzz的代码，官网复制第二个给的框架输入框，<br>&lt;script type="text/javascript"&gt;<span style="color: red;">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_5935831'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/stat.php%3Fid%3D5935831' type='text/javascript'%3E%3C/script%3E"));</span>&lt;/script&gt;<br><span style="color: blue;">将红色的部分粘贴到下面的输入框</span></p></div>

        </el-col>
        </el-row>
    	<el-row>
            <el-col :span="24">
    <el-form ref="bottomjsConfig" :model="bottomjsConfig" label-width="100px">
       <el-form-item label="JS代码">
            <el-input type="textarea" v-model="bottomjsConfig.content"></el-input></el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: 'bottomjsSiteConfig',
        data() {
            return {
                bottomjsConfig: {
                    content: ''
                }
            }
        },
        computed: {
            
        },
        mounted() {
        	
        },
        created() {
            this.getSiteData();
        },
        methods: {
           getSiteData(){
               this.$axios.get('static/base/config.json').then((res) => {
                  this.bottomjsConfig = res.data.bottomjsConfig;
                })
           },
           onSubmit(){

           }
        }
    }

</script>
<style scoped="">
  
</style>
