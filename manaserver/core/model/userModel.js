var userModel = {
	tableName: 'mn_user',
	attr: {
        user_name	: String,	//用户名
        user_pwd 	: String,	//密码
        user_mobile	: String,	//手机号
        user_email  : String,	//邮箱
        manaId		: String,	//用户manaId
        createTime	: Date,		//创建时间
        updateTime	: Date,		//更新时间
        open_flag	: String	//账号开启状态
   },
   func: {
        methods: {
            fullName: function () {
                return this.user_name;
            }
        }
    }
}
module.exports = userModel;