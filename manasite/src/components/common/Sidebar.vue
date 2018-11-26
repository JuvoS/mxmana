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
                        icon: 'el-icon-location',
                        index: 'siteconfig',
                        title: '网站配置',
                        subs: [
                            {
                                index: 'sitemain',
                                title: '基本设置'
                            },
                            {
                                index: 'siteseo',
                                title: 'SEO设置'
                            },
                            {
                                index: 'sitebottomjs',
                                title: '底部js设置'
                            },
                            {
                                index: 'sitecore',
                                title: '核心设置'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'page',
                        title: '页面管理',
                        subs: [
                            {
                                index: 'pageall',
                                title: '全部页面'
                            },
                            {
                                index: 'pageindex',
                                title: '主页管理'  
                            },
                            {
                                index: 'pagesingle',
                                title: '单页管理'
                            },
                            {
                                index: 'pagelist',
                                title: '列表管理'
                            },
                            {
                                index: 'pagemodel',
                                title: '页面元素'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: 'cate',
                        title: '品类管理',
                        subs: [
                            {
                                index: 'catetype',
                                title: '分类管理'
                            },
                            {
                                index: 'catelist',
                                title: '列表品类'
                            },
                            {
                                index: '',
                                title: '推荐管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'gui',
                        title: '界面管理',
                        subs: [
                            {
                                index: '',
                                title: '导航菜单'
                            },
                            {
                                index: '',
                                title: '头部信息'
                            },
                            {
                                index: '',
                                title: '底部信息'
                            },
                            {
                                index: '',
                                title: '客服信息'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'module',
                        title: '模块管理',
                        subs: [
                            {
                                index: '',
                                title: '用户管理'
                            },
                            {
                                index: '',
                                title: '广告模块'
                            },
                            {
                                index: '',
                                title: '评论模块'
                            },
                            {
                                index: '',
                                title: '留言模块'
                            },
                            {
                                index: '',
                                title: '友情链接'
                            },
                            {
                                index: '',
                                title: '投票模块'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'others',
                        title: '其他管理',
                        subs: [
                            {
                                index: 'others',
                                title: '上传管理'
                            },{
                                index: 'others',
                                title: '数据管理'
                            },{
                                index: 'others',
                                title: '日志管理'
                            },{
                                index: 'others',
                                title: '数据统计'
                            }
                        ]
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
