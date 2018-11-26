<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>创建方案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="方案名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="方案描述">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="开启状态">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="功能点">
                        <div class="container">
                        	<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="基础图片">
                    	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
                    </el-form-item>
                    <el-form-item label="图片库">
                        <div class="container">
                        	<el-row :gutter="20">
							  <el-col :span="6">
							  	<div class="grid-content bg-purple">
							  		<el-upload 
									  class="pic-pool"
									  action="https://jsonplaceholder.typicode.com/posts/"
									  :show-file-list="false"
									  :on-success="handleAvatarSuccess"
									  :before-upload="beforeAvatarUpload">
									  <img v-if="imageUrl" :src="imageUrl" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
							  	</div>
							  </el-col>
							  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							</el-row>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    		<v-ability></v-ability>
    	</el-dialog>
    </div>
</template>

<script>
	import vAbility from '../ability/basic.vue';
    export default {
        name: 'baseform',
        data: function(){
            return {
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                }
            }
        },
        components:{
            vAbility
        },
        created() {
            this.getData();
        },
        methods: {
            onSubmit() {
            	this.$dialogFormVisible = false;
                this.$message.success('提交成功！');
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                
                this.url = '/pattern/all';
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    console.log(res);
                })
            },
             handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
	      	},
	      	beforeAvatarUpload(file) {
	        	const isJPG = file.type === 'image/jpeg';
	        	const isLt2M = file.size / 1024 / 1024 < 2;
	
	        	if (!isJPG) {
	        		this.$message.error('上传头像图片只能是 JPG 格式!');
        		}
	        	if (!isLt2M) {
	        		this.$message.error('上传头像图片大小不能超过 2MB!');
	        	}
	        	return isJPG && isLt2M;
	      	}

        }
    }
</script>

<style scoped="">
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .pic-pool {
  	width: 40px;
  	height: 30px;
  	overflow: hidden;
  }
</style>