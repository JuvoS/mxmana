<template>  
    <div class="Login">
        <a href="javascript:void(0)" v-on:click = "loginbtn">登 &nbsp;  &nbsp;   录&nbsp;&nbsp;</a>
        <a href="javascript:void(0)" v-on:click = "regbtn">|&nbsp;&nbsp;注册新用户</a>
        <form @submit.prevent="submit_login" method="post" id="login_in">
            <input type="text" name="" id="" value="" placeholder="请输入用户名" v-model="loginData.username"/><label for=""></label>
            <input type="password" name="" placeholder="请输入密码" v-model="loginData.psw"/>
            <input type="submit" class="sub_btn" value="登    录"/>
        </form>
        <form @submit.prevent="submit_req" method="post" id="login_registered">
            <input type="text" name="" id="" value="" placeholder="用户名" v-model="regData.username"/><label for=""></label>
            <input type="password" name="" placeholder="密码" v-model="regData.psw"/>
            <input type="password" name="" placeholder="确认密码" v-model="regData.tpsw"/>
            <input type="submit" class="sub_btn" value="立即注册"/>
        </form>
    </div>
</template>
<script type="text/javascript">
export default{
    data() {
        return{
            loginData: {
            },
            regData: {      
            }
        } 
    },
    methods: {
        loginbtn: function(){
            document.getElementById("login_in").style.display="block";
        },
        regbtn: function(){
            document.getElementById("login_in").style.display="none";
        },
        submit_login: function(){
            console.log(this.loginData);
            var url="/api/login";
            this.$http.post(url,{
                username: this.loginData.username,
                userpsw: this.loginData.psw
            },{}).then(function(data){
                console.log("请求成攻！ ",data.body);
                var content=data.body;
                if (content.length != 0) {
                    alert("登录成功！");
                }else{
                    alert("账户密码错误！");
                }
            },function(response){
                console.log(response);
            })
        },
        submit_req: function(){
            var reg_name =  this.regData.username;
            var reg_psw = this.regData.psw;
            if(reg_psw !== this.regData.tpsw){
                alert("两次输入密码不正确！");
                this.regData.username = "";
                this.regData.psw = "";
                this.regData.tpsw = "";
            }else{
                var url="/api/addUser";


                this.$http.post(url,{
                    username: this.regData.username,
                    userpsw: this.regData.psw
                },{}).then(function(data){
                    console.log("注册请求成攻！ ",data.body);
                    if (data.body.affectedRows >0) {
                        alert("注册成攻！");
                        document.getElementById("login_in").style.display="block";
                    }
                },function(response){
                    console.log(response);
                })
            }
        }
    }
}
</script>
<style scoped>
    .Login{
        width: 70%;
        height: 70%;
        background: rgba(255,255,255,0.8);
        border: 5px solid #E23A6E;
        margin: 0 auto;
        margin-top: 5%;
    }
    .Login a{
        text-decoration: none;
        color: #E23A6E;
    }
    .Login form{
        width: 100%;
        height: 100%;
    }
    .Login input{
        width: 50%;
        height: 40px;
        margin-top: 30px;
        border: 1px solid #E23A6E;
        border-radius: 20px;
        outline: none;
        font-family: "arial rounded mt bold";
        padding-left: 10px;
        font-size: 18px;
    }
    .sub_btn{
        cursor: pointer;
        background: none;
        color: #E23A6E;
    }
    .sub_btn:hover{
        background: #E23A6E;
        color: #FFFFFF;
    }
</style>