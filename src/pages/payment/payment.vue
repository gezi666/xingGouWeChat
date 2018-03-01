<template>
    <!--购买支付-->
    <div class="payment-main">
        <p class="pay-img">
            <span></span>
        </p>
        <p class="text-title">本次购买{{starName}}明星数据需要消费您</p>
        <p class="text-prompt"><b>{{amountMoney}}</b>元</p>
        <p class="text-input">
            <input id="checkbox1" type="checkbox" ref="check">
            <label for="checkbox1"></label>
            您当前账户余额 <span>{{balance}}</span>元
        </p>

        <div class="btn-group">
            <a class="purchase" @click="toBuy">购&nbsp;&nbsp;买</a>
            <a class="recharge" @click="recharge">去充值</a>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import cookie from '@/util/cookie'
    import api from '@/api'
    export default {
        name: 'payment',
        data () {
            return {
                starName: 'XXX',
                amountMoney:'0.0',
                balance:'0.0',
                userid:'',
                status:0,
                buyFlag:0
            }
        },
        methods:{
            getStarMoney(){
                api.getStarMoney({
                    "starid": this.$route.params.id
                })
                    .then((res)=>{
                        if(res.result === '1'){
                            this.starName = res.data[0].name
                            this.amountMoney = res.data[0].money
                            this.buyFlag = res.data[0].buyFlag
                        } else{
                            MessageBox.alert(res.msg,'')
                        }
                    })
            },
            getBalance(){
                api.getCurrentBalance({
                    "userid": this.userid
                })
                    .then((res)=>{
                    if(res.data != ''){
                        this.balance = res.data[0].balance ? res.data[0].balance : '0.0'
                    }
                })
            },
            toBuy(){
                if(this.$refs.check.checked){
                    if(this.balance < this.amountMoney){
                        MessageBox.alert('账户余额不足，请充值','')
                        return
                    } else{
                        if(this.buyFlag == 0){
                            api.balanceBuy({
                                "userid": this.userid,
                                "starid": this.$route.params.id,
                                "type": 1,
                                "demandid":''
                            })
                                .then((res)=>{
                                    if(res.result==='1'){
                                        MessageBox.alert('购买成功','').then(()=>{
//                                            this.getBalance()
                                            this.$router.push({name:'baseInfo',params:{ id: this.$route.params.id }})
                                        })
                                    } else{
                                        MessageBox.alert('购买失败，请重新购买','')
                                        return
                                    }
                                })
                        } else{
                            MessageBox.alert('请勿重复购买','')
                        }
                    }
                } else {
                    MessageBox.alert('请勾选账户余额','')
                    return
                }
            },
            recharge(){
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4d406d12adda944f&redirect_uri=http%3a%2f%2fxingouh5.9cfcf.com%2f%23%2f&response_type=code&scope=snsapi_base&state='+ this.userid +'#wechat_redirect'
//                this.$router.push({name:'recharge'})
            },
            closePage(){
                this.$router.go(-1)
            }
        },
        mounted(){
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
                this.getStarMoney()
                this.getBalance()
            } else {
                MessageBox.alert('请登录').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .payment-main{
        width: 100vw;
        height:100vh;
        display: flex;
        flex-direction: column ;
        justify-content: flex-start;
        align-items:center;
        background-color: #f2f7ff;
    }
    .payment-main .pay-img{
        padding-top:58px;

    }
    .payment-main .pay-img span{
        width:65px;
        height:65px;
        display: inline-block;
        background: url("../../../static/img/payment.png") no-repeat center;
        background-size: 100% 100%;
    }
    .payment-main .text-title{
        font-size: 17px;
        padding:30px 0 24px;
        color: #666;
    }
    .payment-main .text-prompt{
        font-size:15px;
        color: #666666;
        padding-bottom:24px;
    }
    .payment-main .text-prompt b{
        font-size:25px;
        color:#ffa200;
        padding-right: 5px;
    }
    .payment-main .text-input{
        font-size:14px;
        color: #a5a6a7;
    }
    /*复选框*/
    .payment-main .text-input{
        position: relative;
    }
    .payment-main .text-input input{
        width: 15px;
        height: 15px;
        text-align: center;
        overflow: hidden;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: -2px;
        position: absolute;
        left: -150px;
        top: 0;
    }
    .payment-main .text-input label {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #b1b7c6;
        box-sizing: border-box;
        vertical-align: -2px;
        border-radius: 2px;
        box-shadow: 0 0 5px #e6effc;
        margin-right: 5px;
    }
    .payment-main .text-input input:checked + label {
        border: 0;
        background: url("../../../static/img/checkbox-bg.png") no-repeat center;
        background-size: 100% 100%;
    }
    .payment-main .text-input span{
        color:#ffa200;
        padding: 0 3px;
    }
    /*购买充值按钮*/
    .payment-main .btn-group {
        width: 76%;
        margin: 0 auto;
    }
    .payment-main .btn-group a {
        display: inline-flex;
        width: 100%;
        height: 45px;
        margin-top: 25px;
        border-radius: 100px;
        align-items: center;
        justify-content: center;
        font-size:18px;
        text-decoration: none;
    }
    .payment-main a.purchase {
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
    }
    .payment-main a.recharge {
        border: 1px solid #7679fe;
        color: #8f92fe;
        box-sizing: border-box;
    }
    a.purchase,a.recharge{
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
</style>
