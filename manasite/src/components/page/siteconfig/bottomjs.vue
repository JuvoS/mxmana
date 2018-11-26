<template>
    <div>
    	<i class="iconfont icon-account"></i>
        <code>提交申请前，请仔细阅读以下说明:

1.该输入框只能输入JS代码，像通过html scripy标签提交的代码将被删除掉;不允许在JS通过document.write方式创建层，需要通过body appendchild创建层2.实例比如百度的代码为

var _hmt = . hmt II 0; (function0 { var hm = document.createElement("script"); hm.src = https://*a.bw.*w**m******* var s = document.getElementsByTagName(" script')IO)];s.parentNode.insertBefore(hm, s); )0:

3.实例比如cnzz的代码，言网复制第二个给的框架输入框 ,

var cnzz. protocol = ("https:" == document.location.protocol) ?" https://" :" http://");document.write(unescape("%3Cspan

id='cnzz_ stat icon 5935831'%3E%3C/span%3E%3Cscriptsrc="" + cnzz_ protocol + "s11.cnzz.com/stat.php%3Fid%3D5935831' type= text/javascript %3E%3C/script%3EI)); 
将红色的部分粘贴到下面的输入框</code>
    </div>
</template>

<script>
    export default {
        name: 'main',
        data() {
            return {
                
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        mounted() {
        	this.url = './static/vuetable.json';
            this.$axios.get(this.url).then((response) => {
                let _data=JSON.stringify(response.data);
		    	console.log("hello：" + _data);
            })
//          this.$axios.get('/show/mee').then((response) => {
//              let _data=JSON.stringify(response.data);
//		    	console.log("hello：" + _data);
//          })
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
