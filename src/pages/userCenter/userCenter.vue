<template>
    <!--艺人管理中心-->
    <div class="user-main">
       <!--明星管理-->
        <div class="star-management" v-if="this.datalist.length>0">
            <p class="star-title"><i class="title-icon"></i>明星管理</p>
            <div class="star-details" v-for="(item,index) in datalist" :starid="item.starid">
                <p>
                    <!--<b><img  src="../../../static/img/default-img.png" ref="starImg" class="star-photo"></b>-->
                    <b><img  src="../../../static/img/default1.png" ref="starImg" class="star-photo"></b>
                    <span class="star-name" @click="toModifyInfo(index)">{{item.name}}<i></i></span>
                </p>
                <p class="star-look" @click="gerDetails(index)">查看<i></i></p>
            </div>
        </div>

        <!--账户余额-->
        <div class="balance-box">
            <p class="star-title"><i class="title-icon"></i>账户余额</p>
            <div class="balance-text">
                <p>可用金额:<span>{{infoList.balance}}</span>元</p>
                <p @click="toRecharge">充值</p>
            </div>
        </div>

        <!--账户信息-->
        <div class="account-info">
            <p class="star-title"><i class="title-icon"></i>账户信息</p>
            <div class="account-text">
                <p>账号: <span>{{infoList.username}}</span></p>
                <ul class="account-ul" v-if="!loginShow">
                    <li class="input-li">密码:
                        <input type="password" ref="passwords"  v-model="infoList.newpassword" :class="{'borderShow':borderShow}" disabled="disabled">
                    </li>
                    <li class="modify" @click="toModifyPassword" v-if="textShow">修改密码</li>
                    <li class="modify savePassword" v-if="!textShow" @click="savePassword">保存</li>
                    <li class="modify" v-if="!textShow" @click="cancelPassword">取消</li>

                </ul>
                <ul class="account-ul" v-if="loginShow">
                    <li>密码:
                        <input type="password"   disabled="disabled">
                    </li>
                </ul>
            </div>
        </div>

        <!--消费记录-->
        <div class="records-main" >
            <p class="star-title"><i class="title-icon"></i>消费记录</p>
            <div class="records-table"  v-if="this.recordList.length>0">
                <table>
                    <thead>
                    <tr>
                        <th>订单号</th>
                        <th>时间</th>
                        <th>充值(元)</th>
                        <th>支出(元)</th>
                        <th>当前余额</th>
                        <th>充值渠道</th>
                        <th>交易状态</th>
                        <th>说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in recordList" :id="item.id">
                        <td>{{item.orderno | isValue}}</td>
                        <td>{{item.createtime | isValue}}</td>
                        <td>{{item.rechargeamount | isValue}}</td>
                        <td>{{item.amountpaid | isValue}}</td>
                        <td>{{item.balance | isValue}}</td>
                        <td>{{item.rechargechannels | isValue}}</td>
                        <td v-if="item.dealstatus =='1'" class="successTrade">交易成功</td>
                        <td v-else="item.dealstatus =='0'" class="failTrade">交易失败</td>
                        <td>{{item.description | isValue}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p class="record-text nodata">{{infoList.recordText}}</p>
            </div>
            <div  v-if="this.recordList.length>0">
                <p class="tableShows" @click="tableShow" v-if="hideText">展开</p>
            </div>
        </div>

        <div class="btn-line">
            <p v-if="loginFlag" class="login-in" @click='loginIn'>登录</p>
            <p v-if="!loginFlag" class="login-out" @click='loginOut'>退出</p>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import baseconfig from '@/assets/js/config'
    import { MessageBox } from 'mint-ui'
    import cookie from '@/util/cookie'
    import api from '@/api';
    import { Indicator } from 'mint-ui';
    export default {
        name: 'userCenter',
        data () {
            return {
                userid:'',
                starid:'',
                dealstatus:'',
                loginShow:true,
                borderShow:false,
                textShow:true,
                hideText:true,
                infoList:{
                    balance:0.0,
                    username:"",
                    newpassword:"123456",
                    recordText:"暂无消费记录",
                },
                datalist:[],
                recordList:[],
                recordList1:[],
                loginFlag: false
            }
        },
        methods:{
            tableShow(){//表格展开功能
                this.hideText=!this.hideText
                this.recordList=this.recordList1
            },
            showInfo(){//明星管理
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.userCenter({"userid": this.userid})
                    .then((res) => {
                        this.datalist=res.data;
                        this.dealstatus=res.data.dealstatus;
                        this.datalist.forEach((v,i)=>{
                            let _this = this
                            v.starimg=baseconfig.baseURL+v.starimg
                            let newImg = new Image();
                            newImg.src = v.starimg
                            newImg.onload = function (){
                                _this.$refs.starImg[i].src = newImg.src
                            }
                        })
                });
                api.userallInfo({//用户中心数据（用户名，余额，订单信息）
                    "userid":this.userid
                })
                    .then((res) => {
                        Indicator.close();
                        if(res.data.length > 0){
                            this.recordList=res.data[0].orders.slice(0,3);//展开功能数据处理
                            this.recordList1=res.data[0].orders;//展开功能数据处理
                            this.infoList.username=res.data[0].username;//账号
                            if(res.data[0].account.length > 0 && res.data[0].account[0].balance){
                                this.infoList.balance=res.data[0].account[0].balance;//可用余额
                            }
                        }
                    })
            },
            toModifyInfo(index){
                this.$router.push({name:'baseInfoEdit',params:{ id: this.datalist[index].starid }})
            },
            gerDetails(index){
                this.$router.push({name:'baseInfo',params:{ id: this.datalist[index].starid }})
            },
            toRecharge(){
//                this.$router.push({name: 'recharge'})
                if(cookie.get('userid') && cookie.get('userid')!=''){
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4d406d12adda944f&redirect_uri=http%3a%2f%2fxingouh5.9cfcf.com%2f%23%2f&response_type=code&scope=snsapi_base&state='+ this.userid +'#wechat_redirect'
                } else {
                    MessageBox.alert('请登录','')
                    return
                }
            },
            toModifyPassword(){//修改密码
                if(cookie.get('userid') && cookie.get('userid')!=''){
                    this.borderShow=!this.borderShow
                    this.textShow=!this.textShow;
                    this.infoList.newpassword = ''
                    this.$refs.passwords.removeAttribute('disabled')
                    this.$refs.passwords.setAttribute("type", "text")
                } else{
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                    })
                }
            },
            cancelPassword(){//取消密码
                if(cookie.get('userid') && cookie.get('userid')!=''){
                    this.borderShow=!this.borderShow
                    this.textShow=!this.textShow
                    this.infoList.newpassword="123456"
                    this.$refs.passwords.setAttribute("type","password")
                    this.$refs.passwords.setAttribute("disabled", "disabled")
                } else{
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                        this.loginShow=!this.loginShow
                    })
                }
            },
            savePassword(){//保存密码
                if(cookie.get('userid') && cookie.get('userid')!=''){
                    if(this.infoList.newpassword === ''){
                        MessageBox.alert('密码不能为空','')
                    } else{
                        if((/^[0-9A-Za-z]{6,12}$/).test(this.infoList.newpassword)){
                            api.resetPassword({phonenumber:this.infoList.username, newpassword:this.infoList.newpassword})
                                .then((res)=>{
                                    if (res.result==='1') {
                                        MessageBox.alert('密码修改成功','').then(()=>{
                                            this.$refs.passwords.setAttribute("type", "password")
                                            this.$refs.passwords.setAttribute("disabled", "disabled")
                                            this.borderShow=!this.borderShow
                                            this.textShow=!this.textShow
                                        })
                                    }
                                    else{
                                        MessageBox.alert(res.msg,'')
                                    }
                                })
                        } else{
                            MessageBox.alert('请填写6-12位数字或字母组合','')
                        }
                    }
                } else{
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                        this.loginShow=!this.loginShow
                    })
                }
            },
            loginIn(){
                this.$router.push({name:'login'})
                this.loginShow=!this.loginShow
            },
            loginOut(){
                api.loginOut()
                    .then((res)=>{
                        if(res.result=='1'){
                            MessageBox.alert('退出成功','').then(()=>{
                                this.loginFlag = true
                                cookie.unset("route")
                                cookie.unset("userid")
                                cookie.unset("sign")
                                cookie.unset("userStarid")
                                cookie.unset("userState")
                                cookie.unset("email")
                                this.reSetInfo()
                                this.loginShow=!this.loginShow
                            })
                        } else{
                            MessageBox.alert('退出失败，请重新退出','')
                        }
                    })
            },
            reSetInfo(){
                this.userid = ''
                this.starid = ''
                this.dealstatus = ''
                this.infoList.balance = 0.0
                this.infoList.username = ''
                this.infoList.userPassword = ''
                this.datalist = []
                this.recordList = []
            }
        },
        mounted(){
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
                this.loginFlag = false
                this.showInfo()
                this.loginShow=!this.loginShow
            } else {
                this.loginFlag = true
            }
        },
        filters:{
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .user-main .tableShows{
        font-size: 14px;
        color: #333333;
        margin:5px auto 20px;
        text-align: center;
    }
    .user-main .tableShows:before{
        content: '';
        display: inline-block;
        width:10px;
        height:9px;
        margin:0 8px 0 3px;
        background: url("../../../static/img/down-icon.png") no-repeat center ;
        background-size: cover;
    }
    .user-main .borderShow{
        height: 25px;
        border:1px solid #e9e8e9;
    }
    .user-main{
        width: 100vw;
        min-height:100vh;
        display: flex;
        flex-direction: column ;
        justify-content: flex-start;
        align-items:flex-start;
        background-color: #f2f7ff;
    }
    /*明星管理*/
    .star-management{
        width: 100%;
        background: #fff;
        margin-bottom: 15px;
    }
    .star-management p.star-title,
    .balance-box  p.star-title,
    .account-info  p.star-title,
    .records-main  p.star-title,
    .records-main  p.star-title{
        height:45px;
        line-height: 45px;
        color: #333;
        font-size: 14px;
        padding:0 15px;
        border-bottom: 1px solid #e9e8e9;
    }
    .user-main i.title-icon{
        width: 14px;
        height:14px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: -2px;
    }
    .star-management i.title-icon{
        background: url("../../../static/img/star-manegment.png") no-repeat center;
        background-size: 100% 100%;
    }
    .star-management .star-details{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 15px;
        padding:10px 15px 10px 0;
        border-bottom:1px solid #e9e8e9;
    }
    .star-management  .star-details:last-child{
        border-bottom:none;
    }
    .star-management .star-details p:first-child{
        display: flex;
    }
    .star-management .star-details p:first-child b{
        width:74px;
        height:99px;
        display: inline-block;
        border-radius: 2px;
        border:1px solid #c065fb;
    }
    .star-management .star-details img{
        width:72px;
        height:97px;
        text-align: center;
        padding:1px 0 0 1px;
    }
    .star-management .star-name{
        display: inline-block;
        line-height: 96px;
        margin: 0 15px;
        color: #333333;
        font-size: 18px;
    }
    .star-management .star-name i{
        width: 13px;
        height:18px;
        display: inline-block;
        background: url("../../../static/img/pen.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -2px;
        margin-left: 15px;
    }
    .star-management .star-look{
        font-size: 14px;
        color: #adb2c1;
    }
    .star-management .star-look i{
        width: 6px;
        height:11px;
        display: inline-block;
        background: url("../../../static/img/arrow-right.png") no-repeat center;
        background-size:100% 100%;
        vertical-align: -1px;
        margin-left: 5px;
    }
    /*账户余额*/
    .balance-box{
        width: 100%;
        background: #ffffff;
    }
    .account-info, .records-main{
        width: 100%;
        margin-top: 15px;
        background: #ffffff;
    }
    .balance-box i.title-icon{
        background: url("../../../static/img/balance.png") no-repeat center;
        background-size: 100% 100%;
    }
    .balance-box .balance-text{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 15px;
        box-sizing: border-box;
    }
    .balance-box .balance-text p:first-child{
        height:75px;
        line-height: 75px;
        font-size:14px;
        color: #999999;
    }
    .balance-box .balance-text p:first-child>span{
        color: #ffa200;
        padding:0 6px 0 10px;
    }
    .balance-box .balance-text p:last-child{
        width:60px;
        height:25px;
        font-size: 12px;
        line-height: 21px;
        border:2px solid #7679fe;
        border-radius: 14px;
        text-align: center;
        color: #7679fe;
        box-sizing: border-box;
    }

    /*账户信息*/
    .account-info i.title-icon{
        background: url("../../../static/img/info-icon.png") no-repeat center;
        background-size: 100% 100%;
    }
    .account-info .account-text{
        font-size: 14px;
    }
    .account-info .account-text p{
        border-bottom: 1px solid #e9e8e9;
        margin-left: 15px;
    }
    .account-info .account-ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 15px;
    }
    .account-text>p,.account-ul li{
        height:45px;
        line-height: 45px;
        color: #999999;
    }
    .input-li{
        flex: auto;
        width: 100px;
    }
    .account-text>p>span,.account-ul li input{
        display: inline-block;
        box-sizing: border-box;
        width: 80%;
        font-size: 14px;
        color: #333333;
        padding:0 3px;
        -webkit-appearance: none;
        background: #fff;
        opacity: 1;
    }
    .account-ul li.modify{
        flex: none;
        display: inline-block;
        font-size: 14px;
        color: #7679fe;
    }
    /*.account-ul li.modify i{*/
        /*margin-left:8px;*/
    /*}*/

    /*消费记录*/
    .records-main{
        width: 100%;
        /*margin: 15px 0 100px;*/
        margin: 15px 0 50px;
        background: #ffffff;
    }
    .records-main i.title-icon{
        background: url("../../../static/img/consumption.png") no-repeat center;
        background-size: 100% 100%;
    }
    .records-main p.record-text{
        height: 61px;
        line-height: 61px;
        font-size: 14px;
        color: #707070;
        padding:0 15px;
    }
    .records-main p.nodata{
        text-align: center;
    }
    /*消费记录列表*/
    .records-main .records-table{
        /*height: 180px;*/
        margin:10px 15px 0 15px;
        display: flex;
        flex-direction: column;
        width: calc(100vw - 30px);
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .records-main .records-table table{
        margin-bottom: 20px;
    }
    .records-main .records-table thead tr{
        border:1px solid #f4f3f4;
        box-sizing: border-box;
    }
    .records-main .records-table th{
        height: 45px;
        background: #f4f3f4;
        color: #666666;
        font-size: 12px;
        min-width: 100px;
        font-weight: normal;
    }
    .records-main .records-table th:nth-child(2){
        min-width: 150px;
    }
    .records-main .records-table th:last-child{
        min-width: 130px;
    }
    .records-main .records-table tbody tr{
        border:1px solid #e9e8e9;
    }
    .records-main .records-table tbody tr td{
        height:44px;
        color: #333333;
        font-size: 12px;
        text-align: center;
        padding:0 12px;
        box-sizing: border-box;
    }
    .records-main .records-table .successTrade{
        color: #30d940;
    }
    .records-main .records-table .failTrade{
        color: #ef6161;
    }
    .btn-line{
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
    }
    .btn-line .login-out,
    .btn-line .login-in{
        display: inline-block;
        width: 76%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #fff ;
        border-radius: 100px;
        font-size:18px;
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .user-main .savePassword{
        margin-right: 20px;
    }
</style>
