var userModel = {
	attr: {
        user_name	: String,
        user_pwd 	: String,
        user_mobile	: String,
        user_email  : String,
        manaId		: String,
        createTime	: Date,
        updateTime	: Date,
        open_flag	: String
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