<template>
    <!--充值-->
    <div class="recharge-main">
        <!--支付金额选项-->
        <div class="recharge-div">
            <ul class="recharge-ul">
                <li v-for="(item,index) in data"  :class="{'active': current==index}" @click="activeLi(item,index)">￥{{item.replace(/(?=(?!\b)(\d{3})+$)/g, ',')}}元</li>
            </ul>
        </div>

        <div class="weixin-pay">
            <p>请选择付款方式</p>
            <div class="radio-group">
                <mt-checklist
                        v-model="value"
                        :options="options">
                </mt-checklist>
            </div>
            <p class="wx-prompt">应付:<b>{{amountMoney}}</b>元</p>
        </div>

        <!--按钮组-->
        <div class="btn-group">
            <a class="sureBtn" @click="toPay">确认购买</a>
            <a class="cancelBtn" @click="cancel">取消</a>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import api from '@/api'
    import cookie from '@/util/cookie'
    export default {
        name: 'recharge',
        data () {
            return {
                value:[],
                current:-1,
                amountMoney:'0.0',
                data:['50','100','200','500','1000','2000','5000','10000'],//支付金额data
                options : [
                    {
                        label: '微信支付',
                        value: '1'
                    }
                ],
                userid:'',
                sign:'',
                signature:'',
                appId:'',
                signType:'',
                packageName:'',
                nonce:'',
                timestamp:'',
                code:''
            }
        },
        methods:{
            activeLi(money,i){
                this.current=i
                this.amountMoney = money
            },
            cancel(){//取消
                this.$router.go(-1)
            },
            toPay(){
                if(this.value[0] && this.value[0]== 1){
                    if(this.amountMoney == '0.0' ){
                        MessageBox.alert('请选择充值金额','')
                        return
                    } else{
                        if(cookie.get('sign') && cookie.get('sign')!=''){
                            this.sign = cookie.get('sign')
                            this.getWeChatPayInfo()
                        } else {
                            api.getOpenid({
                                "code":this.code,
                                "userid": this.userid
                            })
                                .then((res)=>{
                                    if(res.result == 1){
                                        this.sign = res.data[0].openid
                                        this.getWeChatPayInfo()
                                    } else{
                                        MessageBox.alert(res.msg)
                                    }
                                })
                        }
                    }
                } else {
                    MessageBox.alert('请选择支付方式','')
                    return
                }
            },
//            从后台获取微信支付接口所需信息
            getWeChatPayInfo(){
                api.getWeChatPayInfo({
                    "userid": this.userid,
                    "rechargeamount": this.amountMoney,
                    "body":"星购互动产品充值",
                    "openid": this.sign
                })
                    .then((res)=>{
                        if(res.data[0]){
                            this.signature = res.data[0].signature
                            this.appId = res.data[0].appId
                            this.signType = res.data[0].signType
                            this.packageName = res.data[0].packageName
                            this.nonce = res.data[0].nonce
                            this.timestamp = res.data[0].timestamp
                            this.isWeChat()
                        }
                    })
            },
            isWeChat(){
                if (typeof WeixinJSBridge == "undefined"){
                    MessageBox.alert('请在微信客户端进行支付操作','')
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady())
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
                    }
                }else{
                    this.onBridgeReady()
                }
            },
            onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId":this.appId,     //公众号名称，由商户传入
                        "timeStamp":this.timestamp,         //时间戳，自1970年以来的秒数
                        "nonceStr":this.nonce, //随机串
                        "package":this.packageName,
                        "signType":this.signType,         //微信签名方式：
                        "paySign":this.signature //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            MessageBox.alert('充值成功！','')      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        } else{
                            MessageBox.alert('充值失败，请重新充值','')
                        }
                    }
                )
            }
        },
        mounted(){
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
                this.code = location.href.substring(location.href.indexOf('=')+1,location.href.indexOf('&'))
//                this.userid = location.href.substring(location.href.indexOf('#')-1,location.href.indexOf('#'))
                api.getOpenid({
                    "code":this.code,
                    "userid": this.userid
                })
                    .then((res)=>{
                        if(res.result == 1){
                            cookie.set("sign", res.data[0].openid)
                        } else{
                            MessageBox.alert(res.msg)
                        }
                    })
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*支付金额选项*/
    .recharge-main  .recharge-ul{
        margin-top: 21px;
        padding:0 22px;
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        align-items: center;
    }
    .recharge-main  .recharge-ul li{
        width:23.1%;
        height:64px;
        line-height: 64px;
        border:1px solid #a47aff;
        border-radius: 4px;
        text-align: center;
        box-sizing: border-box;
        margin-bottom:10px;
        font-size: 13px;
        color: #8147ff;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .recharge-main  .recharge-ul li:last-child{
        position: relative;
    }
    .recharge-main  .recharge-ul li:last-child:after{
        content:'';
        display: inline-block;
        position: absolute;
        right:-2px;
        top:-5px;
        width: 36px;
        height:16px;
        line-height: 15px;
        font-size:7px;
        padding:1px;
        box-sizing: border-box;
        background: url("../../../static/img/cz.png") no-repeat center;
        background-size: 100% 100%;
    }
    .recharge-main  .recharge-ul li.active{
        background: #a078ff;
        color: #fff;
        transition: all 0.2s;
    }
    .recharge-main .weixin-pay{
        margin-top: 8px;
        padding:0 32px;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
    }
    .recharge-main .weixin-pay p:first-child{
        font-size: 13px;
        color: #333;
        margin-bottom: 12px;
    }
    .weixin-pay .wx-prompt{
        text-align: center;
        font-size:15px;
        color: #666666;
        margin-bottom:35px;
        margin-top: 13px;
        align-self: center;
    }
    .weixin-pay .wx-prompt b{
        font-size:25px;
        color:#ffa200;
        padding:0 5px;
    }

    /*按钮组*/
    .recharge-main .btn-group {
        width: 76%;
        margin: 0 auto;

    }
    .recharge-main .btn-group a {
        display: inline-flex;
        width: 100%;
        height: 45px;
        margin-top: 25px;
        font-size: 18px;
        border-radius: 100px;
        justify-content: center;
        align-items: center;
    }
    .recharge-main .sureBtn {
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
    }
    .recharge-main .cancelBtn {
        border: 1px solid #7679fe;
        color: #8f92fe;
        box-sizing: border-box;
    }
    .recharge-main .sureBtn,.recharge-main .cancelBtn{
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
</style>
