<template>
    <div class="demand-upload">
        <div class="modal" v-if="showModal" @click="modal"></div>
        <form method="post" enctype="multipart/form-data" class="form" >
            <input type="hidden" name="userid" value="" v-model="userid">
            <div class="demand-add" v-for="(item,i) in list" >
                <div class="project-div project-time">
                    <span class="project-text">需求类别:</span>
                    <p @click="open1(i)">
                        <input type="text" disabled placeholder="请选择需求类型" ref='needType' v-model="datalist[i].demandtype2">
                        <i></i>
                    </p>
                    <!--类别-->
                    <mt-picker :slots="slots1" ref="slots1" :showToolbar='true'  :class="{'active':activeflag1}" @change="handleChange1">
                        <div class="picker-toolbar">
                            <span class="mint-datetime-action mint-datetime-cancel" @click="close1(i)">取消</span>
                            <span class="mint-datetime-action mint-datetime-confirm" @click="ok1(i)">确定</span>
                        </div>
                    </mt-picker>
                </div>

                <div class="project-div project-time">
                    <span class="project-text">地&#12288;&#12288;点:</span>
                    <p @click="open2(i)" >
                        <input  type="text" disabled  placeholder="请选择需求地点" v-model="datalist[i].location" class="origin"/>
                        <i class="right-icon"></i>
                    </p>
                    <mt-picker :slots="slots" :showToolbar='true' @change="handleChange2"   :class="{'active':activeflag}">
                        <div class="picker-toolbar">
                            <span class="mint-datetime-action mint-datetime-cancel" @click="close2(i)">取消</span>
                            <span class="mint-datetime-action mint-datetime-confirm" @click="ok2(i)">确定</span>
                        </div>
                    </mt-picker>
                </div>

                <!--时间-->
                <div class="project-div project-time times">
                    <span class="project-text">需求时间:</span>
                    <p @click="open(i)">
                        <input type="text" disabled placeholder="请选择需求时间" v-model="datalist[i].demandtime"
                               name="demandtime"/> <i></i>
                    </p>
                    <!--时间-->
                    <my-date-picker
                            ref="picker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            :startDate= "new Date(new Date().getFullYear(),'0')"
                            @confirm="handleChange">
                    </my-date-picker>

                </div>

                <!--项目介绍-->
                <div class="project-div pro-textarea">
                    <span class="project-text prize">需求内容:</span>
                    <textarea placeholder="请填写详细需求描述说明" name="demandcontent" ref="textWaring" v-model="datalist[i].demandcontent" @blur="textWarings(i)"></textarea>
                </div>

                <div class="project-div project-time">
                    <span class="project-text">联&#8194;系&#8194;人:</span>
                    <input type="text" placeholder="请填写联系人" ref="checkName" v-model.trim="datalist[i].name" @blur="checkName(i)">
                </div>

                    <div class="project-div project-time">
                    <span class="project-text">联系方式:</span>
                </div>
                <div class="project-div project-time project-input">
                    <input type="text" placeholder="请填写可联系到的手机号码" ref="checkPhone" v-model.trim="datalist[i].phone" @blur="checkPhone(i)">
                </div>
                <p class="line-p">或</p>
                <div class="project-div project-time project-input">
                    <input type="text" placeholder="请填写可收件及回复邮件的邮箱地址" ref="checkEmail" v-model.trim="datalist[i].email" @blur="checkEmail(i)">
                </div>
            </div>

            <!--增加-->
            <div class="project-div project-add" @click='add()'>
                <p>增加</p>
                <i></i>
            </div>

            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='createuserdemand()'>
            </div>
        </form>
    </div>
</template>

<script>
    import {Get,Post} from '@/api'
    import cookie from '@/util/cookie'
    import {MessageBox} from 'mint-ui'
    import myDatePicker from '@/components/datePicker/myDatePicker'
    export default {
        name: 'starProject',
        data () {
            return {
                city:[],
                showModal:false,//遮罩层默认不显示
                activeflag1:false,//需求类别 弹出框默认不显示
                activeflag:false,//地点 弹出框默认不显示
                value: null,
                list: 1,//默认显示一组
                userid: '',
                current: 0,
                proList:{ //获取省份信息参数
                    codelevel:1,
                    parentcode:0
                },
                slots1:[{//需求类别
                    flex: 1,
                    defaultIndex: 1,
                    textAlign: 'center',
                    values: []
                }],
                slots:[//地点
                    {
                        flex: 1,
                        defaultIndex: 1,
                        textAlign: 'center',
                        values: []
                    }
                ],
                datalist: [{
                    userid:'',
                    demandtype:'',
                    demandtype2:'',
                    location:'',
                    demandtime:'', //需求时间
                    demandcontent:'',//需求内容
                    name:'',
                    phone:'',
                    email:''
                }],
                currentType:'',
                flag:true
            }
        },
        methods: {
            event_t(e){
                e.preventDefault()
            },
            //需求类型
            open1(i) {
                document.body.addEventListener('touchmove', this.event_t, false);
                this.$refs.slots1[i].setSlotValues(0, ['电影','电视剧','广告','演出','综艺节目','网络','动漫']);
                this.activeflag1=true
                this.showModal=true
                this.current=i
            },
            handleChange1(picker,values) {
                this.currentType=values[0]
            },
            close1(i){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.activeflag1=false
                this.showModal=false
            },
            ok1(i){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.activeflag1=false
                this.showModal=false
                this.datalist[this.current].demandtype=this.currentType
                this.datalist[this.current].demandtype2=this.currentType
            },
            modal(){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.showModal=false
                this.activeflag1=false
                this.activeflag=false
            },

            //需求地点
            close2(i){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.activeflag=false
                this.showModal=false
            },
            ok2(i){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.datalist[this.current].location=this.city[0]
                this.activeflag=false
                this.showModal=false
            },
            open2(i) {
                document.body.addEventListener('touchmove', this.event_t, false);
                this.current=i
                this.activeflag=true
                this.showModal=true
            },
            handleChange2(picker,values) {
                this.city=values
            },
            add(){//增加
                this.proInfo()
                this.list++
                this.datalist.push({
                    userid:'',
                    demandtype:'',
                    demandtype2:'',
                    location:'',
                    demandtime:'',//需求时间
                    demandcontent:'',//需求内容
                    name:'',
                    phone:'',
                    email:'',
                })
            },
            //需求时间
            open(i) {
                this.current = i
                this.$refs.picker[i].open();
            },
            handleChange(value) {
                this.datalist[this.current].demandtime = this.getLocalTime(new Date(value).getTime())
            },
            getLocalTime(nS) { //转换时间格式
                let year = new Date(nS).getFullYear();
                let month = new Date(nS).getMonth() + 1;
                if (month < 10) {
                    month = "0" + month
                }
                return year + "-" + month;
            },

            //需求内容
            textWarings(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist[i].demandcontent
                this.$refs.textWaring[i].value = name.replace(regStr, "")
                this.datalist[i].demandcontent=this.$refs.textWaring[i].value
            },
            //姓名验证
            checkName(i){
                if(this.datalist[i].name ==''){
                    return false
                }else if(!( /^[\u4E00-\u9FA5A-Za-z]+$/.test( this.datalist[i].name))){
                    MessageBox.alert('联系人格式错误<br/>请重新输入', '').then(()=>{
                        this.datalist[i].name=''
                        this.$refs.checkName[i].focus()
                    })
                    return false;
                }else{
                    return true
                }
            },
            //手机号验证
            checkPhone (i) {
                if( this.datalist[i].phone ==''){
                    return false
                }else if(!(/^1[34578]\d{9}$/.test( this.datalist[i].phone))){
                    MessageBox.alert('手机号格式错误<br/>请重新输入填写', '').then(()=>{
                        this.datalist[i].phone=''
                        this.$refs.checkPhone[i].focus()
                    })
                    return false;
                }else{
                    return true
                }
            },
            //邮箱验证
            checkEmail (i) {
                if( this.datalist[i].email ==''){
                    return false
                }else if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test( this.datalist[i].email))){
                    MessageBox.alert('邮箱格式错误<br/>请重新填写', '').then(()=>{
                        this.datalist[i].email =''
                        this.$refs.checkEmail[i].focus()
                    });
                    return false;
                }else{
                    return true
                }
            },
            //表单提交
            createuserdemand(){
                for(let i=0;i<this.datalist.length;i++){
                    this.datalist[i].userid = cookie.get('userid')

                    //需求类别需转成数字传给后台
                    if(this.datalist[i].demandtype=='电影'){
                        this.datalist[i].demandtype=1
                    }else if(this.datalist[i].demandtype=='电视剧'){
                        this.datalist[i].demandtype=2
                    }else if(this.datalist[i].demandtype=='广告'){
                        this.datalist[i].demandtype=3
                    }else if(this.datalist[i].demandtype=='演出'){
                        this.datalist[i].demandtype=4
                    }else if(this.datalist[i].demandtype=='综艺节目'){
                        this.datalist[i].demandtype=5
                    }else if(this.datalist[i].demandtype=='网络'){
                        this.datalist[i].demandtype=6
                    }else if(this.datalist[i].demandtype=='动漫'){
                        this.datalist[i].demandtype=7
                    }

                    //验证表单各项是否为空，不为空才能提交表单
                    if (this.datalist[i].demandtype == '') {
                        MessageBox.alert('请选择需求类别', '');
                        this.flag = false
                        return false
                    } else {
                        this.flag = true
                    }
                    if (this.datalist[i].location == '') {
                        MessageBox.alert('请选择需求地点', '');
                        this.flag = false
                        return false
                    } else {
                        this.flag = true
                    }
                    if (this.datalist[i].demandtime == '') {
                        MessageBox.alert('请选择需求时间 ', '');
                        this.flag = false
                        return false
                    } else {
                        this.flag = true
                    }
                    if (this.datalist[i].demandcontent == '') {
                        MessageBox.alert('请填写需求内容 ', '');
                        this.flag = false
                        return false
                    } else {
                        this.flag = true
                    }
                    if (this.datalist[i].name == '') {
                        MessageBox.alert('请填写联系人', '');
                        this.flag = false
                        return false
                    } else {
                        this.flag = true
                    }
                    if ((this.datalist[i].phone == '') && (this.datalist[i].email == '')) {
                        MessageBox.alert('请至少填写一种联系方式', '');
                        this.flag = false
                        return false
                    }else{
                        this.flag = true
                    }
                }
                if (this.flag) {
                    Post('/wechatuserdemand/createuserdemand', this.datalist).then((res) => {
                        if(res.result === '1'){
                            MessageBox.alert('保存成功', '').then(()=>{
                                this.$router.push({name: 'movieDemandList'})
                            });
                        } else{
                            console.log(res.msg)
                        }
                    })
                }
            },

            //获取省份信息
            proInfo(){
                    Get('/wechatpersonalinfo/getArea', {params:this.proList})
                        .then((res) => {
                            res.data.forEach(v=>{
                                this.slots[0].values.push(v.codename)
                            })
                    })
            }
        },
        mounted(){
            if (cookie.get('userid') && cookie.get('userid') != '') {
                this.userid = cookie.get('userid')
                this.proInfo()
            } else {
                MessageBox.alert('请登录','').then(() => {
                    this.$router.push({name: 'login'})
                })
            }
            this.slots1[0].values.push('电影','电视剧','广告','演出','综艺节目','网络','动漫')
        },
        components:{
            myDatePicker
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .demand-upload {
        width: 100vw;
        height: 100vh;
        background: #f2f7ff;
        box-sizing: border-box;
    }
    .demand-upload form {
        background: #f2f7ff;
    }
    .demand-upload .demand-add{
        background: #fff;
    }
    .demand-upload .demand-add .project-div {
        min-height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: inherit;
        padding: 0 15px;
        margin-left: 15px;
        border-bottom: 1px solid #e3e3e3;
    }
    .demand-upload form .demand-add .project-text {
        color: #a6acbc;
        font-size: 15px;
    }
    .demand-upload form .demand-add input {
        font-size: 14px;
        text-align: right;
        flex: auto;
        background: #fff;
        border: none;
        padding-left: 10px;
        color: #333;
        opacity: 1;
    }

    /*时间*/
    .demand-upload .demand-add .project-time p {
        text-align: right;
        flex: auto;
    }
    .demand-upload .demand-add .project-time i {
        width: 9px;
        height: 14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -2px;
    }

    /*placeholder字体颜色*/
    .demand-upload .pro-textarea ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        color: #d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
    }

    .demand-upload  .project-time input::-webkit-input-placeholder {
        font-size: 14px;
        color: #a6acbc;
    }

    .demand-upload form textarea {
        min-height: 90px;
        font-size: 14px;
        flex: auto;
        resize: none;
        padding: 15px 5px;
        border: none;
        color: #333;
        font-family: "Microsoft YaHei";
    }
    .demand-upload input:focus, textarea:focus {
        outline: none;
    }
    /*增加*/
    .demand-upload .project-add {
        height: 25px;
        background: #fff;
        text-align: right;
        padding: 15px;
    }
    .demand-upload form .project-add p {
        font-size: 14px;
        color: #9e5bfc;
    }
    .demand-upload .project-add p:after {
        content: '';
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("../../../static/img/add-icon.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -6px;
        margin-left: 5px;
    }
    /*按钮*/
    .demand-upload .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 50px;
    }
    .demand-upload .btn-group input.purchase {
        width: 100%;
        height: 45px;
        color: #fff;
        text-align: center;
        margin-top: 20px;
        border-radius: 100px;
        font-size: 18px;
        text-decoration: none;
        background: -webkit-linear-gradient(left, #5c86ff, #7d1aff);
        text-shadow: 0 2px 0 rgba(76, 33, 0, .14);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .demand-upload .modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 100;
    }
    .demand-upload .picker-toolbar{
        height: 40px;
        line-height: 40px;
        border-bottom: solid 1px #eaeaea
    }
    .demand-upload .picker{
        position: fixed;
        background: #fff;
        bottom: 0;
        left: 50%;
        -webkit-transform: translate3d(-50%, 100%, 0);
        transform: translate3d(-50%, 100%, 0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s ease-out;
        transition: .2s ease-out;
        z-index: 1000;
        width: 100vw;
        box-shadow: 1px 1px 11px #ccc;
    }
    .demand-upload .picker.active{
        transform: translate3d(-50%, 0%, 0);
    }
    .demand-upload  .picker-toolbar{
        height: 40px;
        line-height: 40px;
        border-bottom: solid 1px #eaeaea
    }
    .demand-upload  .origin{
        background: #fff;
    }
    .demand-upload  .project-input{
        margin-left: 93px!important;
    }
    .line-p{
        font-size: 14px;
        margin: -15px 0 0 45px;
        color: #a6acbc;
    }
    .demand-add{
        margin-top:10px;
    }
    .demand-add:first-of-type{
        margin-top:0;
    }
</style>
