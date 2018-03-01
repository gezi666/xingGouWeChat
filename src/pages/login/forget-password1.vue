<template>
    <div class="forget-password-wrapper">
        <p class="step-txt">第一步：手机验证</p>
        <ul class="forget-password-list">
            <li>
                <div class="left-forget-password-list fl">
                    <i class="graphic-icon"></i>
                    <span class="l-title">图形验证码：</span>
                </div>
                <div class="right-forget-password-list fl">
                    <input class="no-full-input" v-model="user.imgcaptcha">
                    <span class="graphic-verification-code" @click='getImfCaptcha'>
                        <img :src="captchaimg" alt="图形验证码">
                    </span>
                </div>
            </li>
            <li>
                <div class="left-forget-password-list fl cf">
                    <i class="phone-num-icon"></i>
                    <span class="l-title">手机号：</span>
                </div>
                <div class="right-forget-password-list fl">
                    <input class="full-input phone-number" placeholder="请输入" v-model='user.username'>
                </div>
            </li>
            <li>
                <div class="left-forget-password-list fl cf">
                    <i class="mobile-icon"></i>
                    <span class="l-title">输入验证码：</span>
                </div>
                <div class="right-forget-password-list fl cf">
                    <input class="no-full-input" v-model='user.captcha'>
                    <a class="mobile-verification-code" @click="getMobileVerificationCode" :disable="!showFlag">
                        <span v-show="showFlag">获取验证码</span>
                        <span v-show="!showFlag" class="count">重新发送({{count}})s</span>
                    </a>
                </div>
            </li>
        </ul>
        <div class="forget-password-btn"><a @click="gotoForgetPassword2">下一步</a></div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import baseconfig from '@/assets/js/config'
    import api from '@/api'
    export default {
        name: 'forgetPassword1',
        data () {
            return {
                showFlag: true,
                count: '',
                timer: null,
                captchaimg: '',
                user: {
                    username: '',
                    imgcaptcha: '',
                    captcha: ''
                }
            }
        },
        mounted() {
            this.getImfCaptcha()
        },
        methods: {
            closePage: function () {
                this.$router.go(-1);
            },
            checkPhone(){
                if (this.checkCaptcha()) {
                    if (!(/^1[34578]\d{9}$/.test(this.user.username))) {
                        MessageBox.alert('手机号错误<br/>请重新输入', '');
                        return false;
                    } else {
                        return true
                    }
                } else {
                    return false;
                }
            },
            checkCaptcha(){
                if (this.user.imgcaptcha.length <= 0 || this.user.imgcaptcha.length > 4) {
                    MessageBox.alert('请输入正确的图形验证码', '');
                    return false;
                } else {
                    return true
                }
            },
            getImfCaptcha(){
                return this.captchaimg = baseconfig.baseURL + "/user/imageCode?t=" + new Date()
            },
            getMobileVerificationCode () {
                if (this.checkPhone() && this.checkCaptcha()) {
//        if(this.checkPhone()){
                    api.getCaptcha(this.user)
                        .then(res => {
                            if (res.result === '1') {
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
                            } else if (res.result === '1008') {
                                MessageBox.alert('该用户未注册', '')
                            } else {
                                MessageBox.alert(res.msg, '');
                            }
                        }).catch(err => {
                        console.log(err)
                    })
                } else {
                    return false
                }

            },
            gotoForgetPassword2 () {
                api.checkCaptcha(this.user)
                    .then(res => {
                        if (res.result === '1') {
                            this.$router.replace({name: 'forgetPassword2', params: {id: this.user.username}})
                        } else {
                            MessageBox.alert(res.msg, '');
                        }
                    }).catch(err => {
                    console.log(err)
                })

            }
        }
    }
</script>

<style scoped>
    .forget-password-wrapper {
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

    .forget-password-list {
        padding-left: 15px;
        background: #fff;
        box-shadow: 0 1px 7px 0 rgba(6, 88, 212, .13);
        border-radius: 5px;
    }

    .forget-password-list li {
        height: 50px;
        line-height: 50px;
        padding-right: 15px;
    }

    .left-forget-password-list {
        width: 127px;
    }

    .right-forget-password-list {
        width: calc(100% - 127px);
    }

    .forget-password-list li:not(:last-child) {
        border-bottom: 1px solid #e3e3e3;
    }

    .left-forget-password-list i {
        float: left;
        width: 17px;
        height: 17px;
        margin: 16px 10px 0 0;
    }

    .left-forget-password-list .l-title {
        float: left;
        width: 100px;
        font-size: 15px;
        color: #a6acbc;
    }

    .right-forget-password-list input.full-input {
        width: 100%;
        text-align: right;
    }

    .phone-number {
        font-size: 15px;
    }

    .right-forget-password-list input.no-full-input {
        width: calc(100% - 110px);
        padding-right: 10px;
        text-align: right;
    }

    .right-forget-password-list .mobile-verification-code {
        float: right;
        width: 100px;
        font-size: 14px;
        color: #f4bf64;
        text-align: right;
    }

    .right-forget-password-list .mobile-verification-code .count {
        color: #ccc;
    }

    .forget-password-list li input::-webkit-input-placeholder {
        color: #d9dce4;
        text-align: right;
    }

    .phone-num-icon {
        background: url(../../../static/img/phone-num-icon.png) no-repeat;
        background-size: 100% 100%;
    }

    .mobile-icon {
        background: url(../../../static/img/mobile-icon.png) no-repeat;
        background-size: 100% 100%;
    }

    .graphic-icon {
        background: url(../../../static/img/graphic-icon.png) no-repeat;
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
        background: -webkit-linear-gradient(left, #5c86ff, #7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76, 33, 0, .14);
    }

    .right-forget-password-list .graphic-verification-code {
        float: right;
        width: 62px;
        height: 34px;
        margin-top: 8px;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(6, 88, 212, .13);
        overflow: hidden;
    }

    .right-forget-password-list .graphic-verification-code img {
        display: inline-block;
        width: 100%;
        height: 100%;
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
