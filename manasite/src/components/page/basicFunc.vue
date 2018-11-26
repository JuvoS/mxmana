<template slot-scope="">
    <div :default-active="onRoutes" unique-opened router>
    	<el-row :gutter="20">
		  	<el-col :span="6" v-for="item in items">
				<div class="grid-content bg-purple" :index="item.index" :key="item.index">
					<i :class="item.icon"></i>
					<span slot="title">{{ item.title }}</span>
				</div>
			</el-col>
		</el-row>
    	<el-menu class="sidebar-el-menu" :default-active="onRoutes" unique-opened router>
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
    export default {
        name: 'basicFunc',
        data() {
            return {
                collapse: false,
                items: [
                	{
                        icon: 'el-icon-goods',
                        index: 'product',
                        title: '产品列表',
                        subs: [
                            {
                                index: 'productNew',
                                title: '创建产品'
                            },{
                                index: 'product',
                                title: '产品列表'
                            }
                        ]
                   },{
                        icon: 'el-icon-goods',
                        index: 'scheme',
                        title: '方案列表'
                   },{
                        icon: 'el-icon-goods',
                        index: 'product',
                        title: '供应商列表'
                   },{
                        icon: 'el-icon-goods',
                        index: 'product',
                        title: '用户列表'
                   },{
                        icon: 'el-icon-goods',
                        index: 'product',
                        title: '楼盘列表'
                   	}
                ]
            }
        },
        computed: {
        	onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted() {
        	
		}
    }

</script>
<style scoped="">
    .grid-content {
        display: flex;
        flex-direction: column;
        vertical-align: inherit;
        align-items: center;
        height: 100px;
    }
    .grid-content i {
    	height: 40px;
    	line-height: 40px;
    	margin-top: 20px;
    }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  /*.bg-white-dark {
    background: #99a9bf;
  }
  .bg-white {
    background: #FFFFFF;
  }
  .bg-white-light {
    background: #e5e9f2;
  }*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
