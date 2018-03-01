<template>
    <div class="forget-password2-wrapper">
        <p class="step-txt">第二步：重置密码</p>
        <ul class="forget-password2-list">
            <li>
                <div class="left-forget-password2-list cf fl">
                    <i class="set-password-icon"></i>
                    <span class="l-title">新密码：</span>
                </div>
                <div class="right-forget-password2-list fl">
                    <input type="password" placeholder="请输入"  v-model="user.newpassword">
                </div>
            </li>
            <li>
                <div class="left-forget-password2-list cf fl">
                    <i class="confirm-password-icon"></i>
                    <span class="l-title">再次输入新密码：</span>
                </div>
                <div class="right-forget-password2-list fl">
                    <input type="password" placeholder="请输入" v-model="user.renewpassword">
                </div>
            </li>
        </ul>
        <div class="forget-password-btn"><a @click="editPwd" class="sureBtn">确定</a></div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import {mapGetters} from 'vuex'
  import api from '@/api'
  export default {
    name:'forgetPassword2',
    data () {
      return {
        user:{
          phonenumber:'',
          newpassword:'',
          renewpassword:''
        }
      }
    },
    methods:{
      closePage:function(){
        this.$router.go(-1);
      },
      checkNewpas(){
        if(this.user.newpassword){
          if(!(/^(\w){6,20}$/.exec(this.user.newpassword))){
            MessageBox.alert('密码格式不正确<br/>请重新输入', '');
            return false
          } else {
            return true
          }
        } else {
          MessageBox.alert('请输入新密码', '');
          return false
        }
      },
      checkReNewpas(){
        if(this.user.renewpassword){
          if(this.user.newpassword===this.user.renewpassword){
            return true
          } else {
            MessageBox.alert('密码不一致<br/>请重新输入', '');
            return false
          }
        } else {
          MessageBox.alert('请再次输入新密码', '');
          return false
        }
      },
      editPwd(){
        if (this.checkNewpas() && this.checkReNewpas()) {
          this.user.phonenumber=this.$route.params.id
          api.resetPassword(this.user)
            .then(res=>{
              if (res.result==='1') {
                  MessageBox.alert('密码修改成功<br/>请重新登录','').then(()=>{
                      this.$router.replace({name:'login'})
                  })
              }
            })
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
    .forget-password2-wrapper {
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }
    .step-txt {
        height: 52px;
        font-size: 15px;
        color: #7679fe;
        line-height: 52px;
        text-indent: 10px;
    }
    .forget-password2-list {
        width: 100%;
        padding-left: 15px;
        background: #fff;
        box-shadow: 0 1px 7px 0 rgba(6,88,212,.13);
        border-radius: 5px;
    }
    .forget-password2-list li {
        height: 50px;
        padding-right: 25px;
        line-height: 50px;
    }
    .left-forget-password2-list {
        width: 147px;
    }
    .right-forget-password2-list {
        width: calc(100% - 147px);
    }
    .forget-password2-list li:not(:last-child){
        border-bottom: 1px solid #e3e3e3;
    }
    .left-forget-password2-list i {
        float: left;
        width: 17px;
        height: 17px;
        margin: 16px 10px 0 0;
    }
    .left-forget-password2-list .l-title {
        float: left;
        width: 120px;
        font-size: 15px;
        color: #a6acbc;
    }
    .right-forget-password2-list input {
        width: 100%;
        text-align: right;
    }

    .forget-password2-list li input::-webkit-input-placeholder {
        color: #d9dce4;
        text-align: right;
    }

    .set-password-icon {
        background: url(../../../static/img/set-password-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .confirm-password-icon {
        background: url(../../../static/img/confirm-password-icon.png) no-repeat;
        background-size: 100% 100%;
    }
    .forget-password-btn {
        width: 76%;
        height: 45px;
        margin: 50px auto 0;
    }
    .forget-password-btn a {
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
