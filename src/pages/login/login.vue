<template>
    <div class="login-wrapper">
        <ul class="login-list">
            <li>
                <i class="login-phone-num-icon"></i>
                <span>手机号：</span>
                <input class="phone-number" placeholder="请输入" id="phone" @blur="checkPhone" v-model='loginUser.username'>
            </li>
            <li>
                <i class="login-password-icon"></i>
                <span>密码：</span>
                <input type="password" id="password" v-model='loginUser.password' @blur="checkPassward">
            </li>
        </ul>
        <div class="forget-txt"><a @click="gotoForgetPassword">忘记密码？</a></div>
        <div class="login-btn-group">
            <a class="btn-login"  @click="loginBtn">登  录</a>
            <a class="btn-register"  @click="gotoRegister">注  册</a>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import baseconfig from '@/assets/js/config'
    import api from '@/api';
    import cookie from '@/util/cookie'
    export default {
        name:'login',
        data () {
            return {
                userState:'',
                userStarid:[],
                user:{
                    userid:'',
                    sign:''
                },
                loginUser: {
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
            closePage:function(){
                this.$router.go(-1);
            },
            checkPhone () {
                if(!(/^1[34578]\d{9}$/.test( this.loginUser.username  ))){
                    MessageBox.alert('手机号或密码错误<br/>请重新输入', '');
                }else{
                    return true
                }
            },
            checkPassward () {
                if(  this.loginUser.password  ){
                    if(!(/^(\w){6,20}$/.exec( this.loginUser.password  ))){
                        MessageBox.alert('手机号或密码错误<br/>请重新输入', '');
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            },
            applyForOpenid(id){
                api.applyForOpenid(id)
            },
            loginBtn () {
                if(this.checkPhone() && this.checkPassward()){
                    api.Login(this.loginUser)
                        .then(res => {
                            if (res.result === '1') {
                                cookie.set("userid", res.data[0].id,60*60*1000)
                                cookie.set("sign", res.data[0].sign)
                                MessageBox.alert('登录成功','').then(()=>{

                                    this.$router.go(-1)

                                    //通过userState判断编辑按钮是否显示 0-无数据，不显示  1-有数据,显示
                                    api.userCenter({"userid": cookie.get('userid')})
                                        .then((res) => {//明星管理
                                            if (res.data.length>0){
                                                this.userState=1
                                                this.datalist=res.data;
                                                let _this = this;
                                                res.data.forEach(function (item, index) {
                                                    _this.datalist[index].starid = item.starid;
                                                    _this.userStarid.push(item.starid)
                                                });
                                            }else{
                                                this.userState=0
                                            }
                                            cookie.set("userStarid", this.userStarid)
                                            cookie.set("userState", this.userState)//状态值 0-无数据  1-有数据
                                        });
                                })
                            }
                            else {
                                MessageBox.alert(res.msg, '');
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    return false
                }
            },
            gotoRegister () {
                this.$router.push({name:'register'});
            },
            gotoForgetPassword () {
                this.$router.replace({name:'forgetPassword1'});
            },
//    ...mapMutations({
//      setuser:'SET_USER'
//    })
        }
    }
</script>

<style scoped>
    .frame{
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
    }
    .login-wrapper {
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }
    .login-list {
        display: flex;
        flex-flow: column nowrap;
        padding-left: 15px;
        background: #fff;
        box-shadow: 0 0 10px 2px rgba(6,88,212,.13);
    }
    .login-list li {
        display: flex;
        padding-right: 15px;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }
    .login-list li:not(:last-child){
        border-bottom: 1px solid #e3e3e3;
    }
    .login-list li i {
        display: inline-flex;
        width: 17px;
        height: 17px;
        margin-right: 10px;
    }
    .login-list li span {
        display: inline-block;
        width: 70px;
        font-size: 15px;
        color: #a6acbc;
    }
    .login-list li input {
        flex: 1;
        text-align: right;
        height: 48px;
    }
    .phone-number {
        font-size: 15px;
    }
    .login-list li input::-webkit-input-placeholder {
        color: #d9dce4;
    }
    .forget-txt {
        display: flex;
        justify-content: flex-end;
        margin-top: 18px;
        padding-right: 15px;
    }
    .forget-txt a {
        font-size: 14px;
        color: #ffa200;
    }
    .login-btn-group {
        width: 76%;
        margin: 0 auto;
    }
    .login-btn-group a {
        display: inline-flex;
        width: 100%;
        height: 45px;
        margin-top: 25px;
        font-size: 18px;
        border-radius: 100px;
        justify-content: center;
        align-items: center;
    }
    .btn-login {
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
    }
    .btn-register {
        border: 1px solid #7679fe;
        color: #8f92fe;
        box-sizing: border-box;
    }
    .btn-login,.btn-register{
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .login-phone-num-icon {
        background: url(../../../static/img/phone-num-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .login-password-icon {
        background: url(../../../static/img/set-password-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    /*头部样式*/
    .mint-header {
        background: #353339;
    }
    /* 弹出框样式 */
    .mint-msgbox {
        width: 68%;
        top: 25%;
        border-radius: 10px;
    }
    .mint-msgbox-content {
        padding: 20px;
        border-bottom: 1px solid #8c8f94;
    }
    .mint-msgbox-message {
        color: #333;
    }
    .mint-msgbox-confirm {
        color: #7679fe;
    }
</style>
