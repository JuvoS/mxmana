<template>
    <div>
        <div class="container">
            others
        </div>

    </div>
</template>

<script>
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
        created() {
            this.getData();
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                
//              this.url = '/pattern/all';
//              this.$axios.get(this.url, {
//                  page: this.cur_page
//              }).then((res) => {
//                  console.log(res);
//              })
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