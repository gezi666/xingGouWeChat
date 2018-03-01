<template>
    <div class="register-wrapper">
        <ul class="register-list">
            <li>
                <div class="left-register-list fl">
                    <i class="phone-num-icon"></i>
                    <span class="l-title">手机号：</span>
                </div>
                <div class="right-register-list fl">
                    <input class="full-input phone-number" placeholder="请输入" v-model="user.username" @blur="checkPhone">
                </div>
            </li>
            <li>
                <div class="left-register-list fl">
                    <i class="graphic-icon"></i>
                    <span class="l-title">图形验证码：</span>
                </div>
                <div class="right-register-list fl">
                    <input class="no-full-input" v-model="user.imgcaptcha" >
                    <span class="graphic-verification-code" @click='chageimgCaptcha'>
                        <img :src="captchaimg" alt="图形验证码">
                    </span>
                </div>
            </li>
            <li>
                <div class="left-register-list fl">
                    <i class="mobile-icon"></i>
                    <span class="l-title">手机验证码：</span>
                </div>
                <div class="right-register-list fl">
                    <input class="no-full-input" v-model="user.captcha">
                    <a class="mobile-verification-code" @click="SendCaptcha" :disable="!showFlag">
                        <span v-show="showFlag">获取验证码</span>
                        <span v-show="!showFlag" class="count">重新发送({{count}})s</span>
                    </a>
                </div>
            </li>
            <li>
                <div class="left-register-list fl cf">
                    <i class="set-password-icon"></i>
                    <span class="l-title">设置密码：</span>
                </div>
                <div class="right-register-list fl">
                    <input type="password" class="full-input" placeholder="请输入" v-model="user.password" @blur="checkPassward">
                </div>
            </li>
            <li>
                <div class="left-register-list fl">
                    <i class="confirm-password-icon"></i>
                    <span class="l-title">确认密码：</span>
                </div>
                <div class="right-register-list fl">
                    <input type="password" class="full-input" placeholder="请输入" v-model="user.password2" @blur="checkRePassward">
                </div>
            </li>
        </ul>
        <div class="register-btn"><a @click="registerBtn" class="sureBtn">确  认</a></div>

    </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import { MessageBox } from 'mint-ui';
  import baseconfig from '@/assets/js/config'
  import cookie from '@/util/cookie'
  import api from '@/api'
  export default {
    name:'register',
    data () {
      return {
        showFlag: true,
        count: '',
        timer: null,
        captchaimg: '',
        num:3,
        loginUser: {
          username: '',
          password: ''
        },
        user: {
          username: '',
          password: '',
          password2: '',
          captcha: '',
          imgcaptcha: ''
        }
      }
    },
    mounted () {
      this.chageimgCaptcha();
    },
    methods:{
      closePage:function(){
        this.$router.go(-1);
      },
      checkPhone () {
        if(!(/^1[34578]\d{9}$/.test( this.user.username))){
          MessageBox.alert('手机号错误<br/>请重新输入', '');
        }else{
          return true
        }
      },
      checkPassward () {
//          if(!(/^(\w){6,20}$/.test( this.user.password))){
          if(!(/^[0-9A-Za-z]{6,12}$/.test( this.user.password))){
            MessageBox.alert('请填写6-12位数字或字母组合', '');
            return false
          } else {
            return true
          }
      },
      checkRePassward(){
        if(this.user.password){
          if(this.user.password2){
            if(this.user.password === this.user.password2){
              return true
            } else {
              MessageBox.alert('两次密码输入不一致', '');
              return false
            }
          } else {
            MessageBox.alert('请再次输入密码', '');
            return false
          }
        } else {
          MessageBox.alert('请输入密码', '');
          return false
        }
      },
      checkCaptcha(){
        if(this.user.captcha.length<=0 || this.user.captcha.length>4){
          MessageBox.alert('请输入正确图形验证码', '');
          return false;
        }else{
          return true
        }
      },
      chageimgCaptcha(){
        return this.captchaimg = baseconfig.baseURL+ "/user/imageCode?t=" + new Date()
      },
      registerBtn () {
        if(this.checkPhone() && this.checkCaptcha() && this.checkPassward() && this.checkRePassward()){
          api.Regist(this.user)
            .then(res => {
              if (res.result === "1") {
                MessageBox.alert('注册成功', '');
                let timer = setInterval(() => {
                  this.num -= 1;
                  if (this.num <= 0) {
                    clearInterval(timer);
                    this.$router.replace('/login')
                  }
                }, 1000)
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
      ...mapMutations({
        setuser:'SET_USER'
      }),
      SendCaptcha () {
        if(this.checkPhone() ){
          api.SendCaptcha(this.user)
            .then(res => {
//              console.log(res)
              if (res.result === "1") {
                const TIME_COUNT = 60;
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.showFlag = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                    } else {
                      this.showFlag = true;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000)
                }
              } else {
                MessageBox.alert(res.msg, '');
              }
            })
            .catch(err => {
            console.log(err)
          })
        } else {
          return false
        }

      }
    }
  }
</script>

<style scoped>
    .register-wrapper {
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }
    .register-list {
        padding-left: 15px;
        background: #fff;
        box-shadow: 0 0 10px 2px rgba(6,88,212,.13);
    }
    .register-list li {
        height: 50px;
        line-height: 50px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: inherit;
    }
    .left-register-list {
        width: 127px;
    }
    .right-register-list {
        width: calc(100% - 127px);
        display: flex;
        justify-content: space-between;
        align-items: inherit;
    }
    .register-list li:not(:last-child){
        border-bottom: 1px solid #e3e3e3;
    }
    .left-register-list i {
        float: left;
        width: 17px;
        height: 17px;
        margin: 16px 10px 0 0;
    }
    .left-register-list .l-title {
        width: 100px;
        font-size: 15px;
        color: #a6acbc;
    }
    .right-register-list input.full-input {
        display: inline-block;
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        width: 100%;
        text-align: right;
    }
    .phone-number {
        font-size: 15px;
    }
    .right-register-list input.no-full-input {
        width: calc(100% - 100px);
        margin-right: 10px;
        text-align: right;
    }
    .right-register-list  .mobile-verification-code {
        float: right;
        width: 90px;
        font-size: 14px;
        color: #f4bf64;
        text-align: right;
    }
    .right-register-list .graphic-verification-code {
        float: right;
        width: 62px;
        height: 34px;
        margin-top: 8px;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(6,88,212,.13);
        overflow: hidden;
    }
    .right-register-list .graphic-verification-code img {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .right-register-list .mobile-verification-code .count {
        color: #ccc;
    }
    .register-list li input::-webkit-input-placeholder {
        font-size: 15px;
        color: #d9dce4;
        text-align: right;
    }
    .register-btn {
        width: 76%;
        height: 45px;
        margin: 75px auto 0;
    }
    .register-btn a {
        display: inline-flex;
        width: 100%;
        height: 100%;
        font-size: 18px;
        border-radius: 100px;
        justify-content: center;
        align-items: center;
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .phone-num-icon {
        background: url(../../../static/img/phone-num-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .graphic-icon {
        background: url(../../../static/img/graphic-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .mobile-icon {
        background: url(../../../static/img/mobile-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .set-password-icon {
        background: url(../../../static/img/set-password-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .confirm-password-icon {
        background: url(../../../static/img/confirm-password-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .success-box{line-height: 30px;
        padding-top: 60px;
        color: #229f24;
    }
    /* 头部样式 */
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
        padding:20px;
        border-bottom: 1px solid #8c8f94;
    }
    .mint-msgbox-message {
        color: #333;
    }
    .mint-msgbox-confirm {
        font-size: 15px;
        color: #7679fe;
    }
</style>
