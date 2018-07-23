<template>
    <div class="sidebar">
    	<div class="mn-logo">
    		<img src="../../assets/x.png" />
    	</div>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#161931"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                	{
                        icon: 'iconfont icon-account',
                        index: 'main',
                        title: '系统主页'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '',
                        title: '基础功能',
                        subs: [
                            {
                                index: 'product',
                                title: '产品'
                            },
                            {
                                index: 'scheme',
                                title: '方案'
                            },
                            {
                                index: 'supplier',
                                title: '供应商'
                            },
                            {
                                index: 'user',
                                title: '用户'
                            },
                            {
                                index: 'building',
                                title: '楼盘'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: 'tab2',
                        title: '地图信息',
                        subs: [
                            {
                                index: 'form',
                                title: '供应商'
                            },
                            {
                                index: 'upload',
                                title: '楼盘'
                            },
                            {
                                index: 'editor',
                                title: '用户'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-printer',
                        index: 'basicFunc',
                        title: '制图中心'
                    },
                    {
                        icon: 'el-icon-goods',
                        index: 'tabs',
                        title: '智能家居'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height: calc(100% - 70px);
    }
    .sidebar .mn-logo {
    	width: 64px;
    	height: 70px;
    	position: relative;
    	overflow: hidden;
    	text-align: center;
    }
    .mn-logo img {
    	margin-top: 10px;
    	width: 50px;   	
    }
    .el-menu {
    	border-right: 0px;
    }
</style>
