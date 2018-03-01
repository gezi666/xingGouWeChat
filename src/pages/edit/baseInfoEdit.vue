<template>
    <div class="base-infos">
        <div class="modal" v-if="showModal" @click="modal"></div>
        <form :action="toAction" method="post" enctype="multipart/form-data" class="form" id="myForm">
            <input type="hidden" name="userid" value="" v-model="userid">
            <input type="hidden" name="id" value="" v-model="starid">
            <template v-for="(item,i) in list">
                <div class="add-main">
                    <div class="record-div">
                        <span class="record-text">姓名:</span>
                        <input type="text" placeholder="请输入姓名"  name="name" ref='name' v-model='name'>
                    </div>
                    <div class="record-div record-time">
                        <span class="record-text">性别:</span>
                        <div class="item raidobox">
                            <mt-radio
                                    v-model="value"
                                    :options="['男', '女']">
                            </mt-radio>
                        </div>
                        <input type="hidden" name="sex"  v-model="sex" ref='sex'>
                    </div>

                    <div class="record-div zy">
                        <span class="record-text">职业:</span>
                        <div class="item ad-select-wrap">
                            <mt-checklist
                                    title="false"
                                    v-model="profession1"
                                    :options="['演员', '主持',  '歌手', '导演','编剧','出品人','制片人','其他']">
                            </mt-checklist>
                        </div>
                        <input type="text" placeholder="请输入" ref='profession' v-on:keyup="profession()">
                        <input type="hidden"  name='profession' v-model='professionValue'>
                    </div>

                    <div class="record-div">
                        <span class="record-text">出生日期:</span>
                        <p @click="open()" >
                            <input  type="text" disabled  placeholder="请输入出生日期" v-model="sr" name="birthdate" class="birth"/>
                            <i class="right-icon"></i>
                        </p>
                        <!--出生日期-->
                        <my-date-picker
                                ref="picker"
                                type="date"
                                v-model="value3"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                :endDate="endDate"
                                @confirm="handleChange">
                        </my-date-picker>
                    </div>

                    <div class="record-div">
                        <span class="record-text">籍贯:</span>
                        <p @click="open2()" >
                            <input  type="text" disabled  placeholder="请输入籍贯" v-model="jg" name="jg" class="origin"/>
                            <i class="right-icon"></i>
                        </p>
                        <input type="hidden" name="province" ref='province' v-model='province'>
                        <input type="hidden" name="city" ref='city' v-model='cityName'>
                        <mt-picker :slots="slots" :showToolbar='true' @change="handleChange2"   :class="{'active':activeflag}">
                            <div class="picker-toolbar">
                                <span class="mint-datetime-action mint-datetime-cancel" @click="close()">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="ok()">确定</span></div>
                        </mt-picker>
                    </div>

                    <div class="record-div">
                        <span class="record-text">经纪公司：</span>
                        <input type="text" placeholder="经纪公司" name='agency' ref='agency' v-model='agency' class="agency"  @blur="agencys()">
                    </div>
                    <div class="record-div">
                        <span class="record-text">联系方式：</span>
                    </div>
                    <div class="record-div sub-div">
                        <span class="record-text">微信号：</span>
                        <input type="text" name='wechat'  v-model='wechat' ref="wechat" @blur="checkWeChat1(wechat)">
                    </div>
                    <div class="record-div  sub-div">
                        <span class="record-text">手机号：</span>
                        <input type="text"  name='phone' v-model='phone' ref="phone" @blur="checkPhone(phone)">
                    </div>
                    <div class="record-div  sub-div">
                        <span class="record-text">邮箱：</span>
                        <input type="text" name='email' v-model='email' ref="email" @blur="checkEmail(email)">
                    </div>
                    <div class="record-div ">
                        <span class="record-text">微博：</span>
                        <input type="text" placeholder="请输入" name='weiboname' ref='weiboname' v-model='weiboname' @blur="weibonames()">
                    </div>
                    <div class="record-div ">
                        <span class="record-text">毕业院校：</span>
                        <input type="text" placeholder="请输入" name='graduatedschool' ref='graduatedschool' v-model='graduatedschool' @blur="graduatedschools()">
                    </div>
                    <template v-for="(v,i) in prizeList">
                        <div class="record-div  sub-div getreward-div">
                            <span class="record-text prize">获得奖项：</span>
                            <p @click="open3(i)" class="awards-p">
                                <input  type="text" disabled  placeholder="请选择日期" class="awards" v-model="prize[i].date" name="d1"/>
                                <i class="right-icon"></i>
                            </p>
                            <!--获得奖项-->
                            <dp
                                    ref="d1"
                                    type="date"
                                    v-model="d1"
                                    year-format="{value} 年"
                                    month-format="{value} 月"
                                    date-format="{value} 日"
                                    :startDate="new Date('1980')"
                                    :endDate="endDate"
                                    @confirm="handleChange3">
                            </dp>
                        </div>
                        <div class="record-div sub-div ">
                            <input type="text" placeholder="获得奖项" ref='jxContent' v-model='prize[i].content'  @blur="jxContent(i)">
                        </div>
                    </template>
                    <input type="hidden" name="getreward" ref='jx'>
                    <input type="hidden" name="advertising" ref='ad'>
                    <div class="record-div record-add" @click='add()'>
                        <p>增加</p>
                        <i ></i>
                    </div>
                    <template v-for="(v,i) in adList">
                        <div class="record-div  sub-div getreward-div">
                            <span class="record-text ad">代言广告：</span>
                            <p @click="open4(i)" class="awards-p">
                                <input  type="text" class="awards" disabled  placeholder="请选择日期" v-model="ad[i].date" name="ad"/>
                                <i class="right-icon"></i>
                            </p>
                            <!-- 代言时间 -->
                            <dp
                                    ref="adpicker"
                                    type="date"
                                    year-format="{value} 年"
                                    month-format="{value} 月"
                                    date-format="{value} 日"
                                    :startDate="new Date('1980')"
                                    :endDate="endDate"
                                    @confirm="handleChange4">
                            </dp>
                        </div>
                        <div class="record-div sub-div">
                            <input type="text" placeholder="代言广告" ref='adContent' v-model="ad[i].content" @blur="adContent(i)">
                        </div>
                    </template>
                    <div class="record-div record-add" @click='add2()'>
                        <p>增加</p>
                        <i></i>
                    </div>
                    <div class="record-div poster">
                        <div class="record-text">
                            <span>明星头像:</span>
                            <p>
                                <i class="updata"></i>
                                <span class="updata-text"  @click='AddImg( )'>重新上传</span>
                            </p>
                        </div>

                        <div class="img-text">
                            <div>
                                <div ref='imgWrap' class="ibox" v-show='imgShow'>
                                    <img :src="imgurl"/>
                                </div>
                                <div class="ibox ibox2" ref='fileWrap' v-show='!imgShow'>
                                    <input type="hidden" name="starimg" v-model='imgurl2' >
                                    <input type="file" name="starimgfile" ref='file' @change='readFile(i)' class="file">
                                    <p class="ibox-add">+</p>
                                    <p>图片格式jpg,png,gif,文件小于500k</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='submit()'>
            </div>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery'
    import 'jquery-form'
    import api from '@/api.js'
    import city from '@/assets/js/city.js'
    import baseconfig from '@/assets/js/config'
    import { MessageBox } from 'mint-ui'
    import cookie from '@/util/cookie'
    import dp from '@/components/datePicker'
    import { Indicator } from 'mint-ui'
    import myDatePicker from '@/components/datePicker/myDatePicker'

    export default {
        name: 'baseInfoEdit',
        data () {
            return {
                showModal:false,//遮罩层默认不显示
                toAction: '',
                starid:"",
                userid:'',
                name:'',
                imgShow:false,
                city:[],
                cityName:'',
                province:'',
                weiboname:'',
                timer:null,
                value: null,
                profession1: [],
                value3: null,
                value4: null,
                advalue: null,
                sr: null,
                sex: '',
                jg: '',
                d1:'',
                date:'',
                activeflag:false,
                professionValue:'',
                agency:'',
                phone:'',
                wechat:'',
                email:'',
                startDate: new Date('1950'),//开始时间
                endDate: new Date(),//结束时间
                list:1,
                flag:false,
                current:0,
                newGetrewardList:[],
                newAdList:[],
                prizeList:1,
                prizeCurrent:0,
                graduatedschool:'',
                prize:[
                    {
                        date:'' ,
                        content:''
                    }
                ],
                adList:1,
                adCurrent:0,
                ad:[
                    {
                        date:'' ,
                        content:''
                    }
                ],
                imgurl:'',
                imgurl2:'',
                datalist:{
                    "recordname":[],//唱片名称
                    "publishtime":[],//发行时间
                    "recordcompany":[],//唱片公司
                    "producer":[],//唱片制作人
                    "winningrecord":[],//获得奖项
                },
                slots: [
                    {
                        flex: 1,
                        defaultIndex: 1,
                        values: []
                    }, {
                        divider: false,
                        content: '-',
                    }, {
                        flex: 1,
                        defaultIndex: 1,
                        values: [],
                    }
                ]
            }
        },
        components:{
            dp,
            myDatePicker
        },
        mounted(){
            this.toAction = baseconfig.baseURL+"/wechatpersonalinfo/updatewechatpersonalinfo"
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
                this.starid=this.$route.params.id
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starBaseInfo({
                    'userid':this.userid,
                    'starid':this.starid
                }).
                then(res=>{
                    Indicator.close();
                    const data=res.data[2]
                    this.name=data.name
                    this.sex=data.sex
                    if (this.userid =='') {
                        MessageBox.alert('请登录','').then(() => {
                            this.$router.push({name:'login'})
                        });
                        return false
                    }
                    if (data.sex==1) {
                        this.value='男'
                    }else{
                        this.value='女'
                    }

                    //明星职业回显
                    if(data.profession.replace(/(^\s*)|(\s*$)/g, "") != ""){
                        if(data.profession.match(",")){
                            data.profession.split(',').forEach(v=>{
                                if(v.replace(/(^\s*)|(\s*$)/g, "") !=''){
                                    if(['演员', '主持',  '歌手', '导演','编剧','出品人','制片人','其他'].indexOf(v.replace(/(^\s*)|(\s*$)/g, "")) != -1){
                                        this.profession1.push(v)
                                    } else{
                                        if(data.profession.split(',').indexOf("其他") == -1){
                                            this.profession1.push('其他')
                                        }
                                        this.$refs.profession[0].value = v.replace(/(^\s*)|(\s*$)/g, "")
                                    }
                                }
                            })
                        } else{
                            if(['演员', '主持',  '歌手', '导演','编剧','出品人','制片人','其他'].indexOf(data.profession.replace(/(^\s*)|(\s*$)/g, "")) != -1){
                                this.profession1.push(data.profession.replace(/(^\s*)|(\s*$)/g, ""))
                            } else{
                                this.profession1.push('其他')
                                this.$refs.profession[0].value = data.profession.replace(/(^\s*)|(\s*$)/g, "")
                            }
                        }
                    } else {
                        this.profession1 = []
                    }

                    this.province=data.province
                    this.cityName=data.city
//                    this.jg=data.province+'-'+data.city
                    this.jg= (data.province !='' || data.city!='') ? (data.city!='' ? (data.province + '-' +data.city) : data.province) : data.birthplace
                    this.sr=data.birthdate
                    this.agency=data.agency
                    this.phone=data.phone
                    this.email=data.email
                    this.weiboname=data.weiboname
                    this.graduatedschool=data.graduatedschool
                    this.wechat=data.wechat
                    this.imgurl = baseconfig.baseURL+data.starimg
                    this.imgurl2= data.starimg

                    //获奖记录回显处理
                    data.getreward.split(';').forEach(item=>{
                        if(item.replace(/(^\s*)|(\s*$)/g, "") !="*"){
                            this.newGetrewardList.push(item)
                        }
                    })
                    this.prizeList=((this.newGetrewardList.length - 1) === 0) ? 1 : (this.newGetrewardList.length - 1)
                    this.imgShow=true
                    this.prize=[]
                    this.newGetrewardList.forEach(v=>{
                        this.prize.push({
                            date:v.split('*')[0],
                            content:v.split('*')[v.split('*').length-1]
                        })
                    })

                    //广告记录回显处理
                    data.advertising.split(';').forEach(item=>{
                        if(item.replace(/(^\s*)|(\s*$)/g, "") !="*"){
                            this.newAdList.push(item)
                        }
                    })
                    this.adList=((this.newAdList.length - 1) ===0) ? 1 : (this.newAdList.length - 1)
                    this.ad=[]
                    this.newAdList.forEach(v=>{
                        this.ad.push({
                            date:v.split('*')[0],
                            content:v.split('*')[v.split('*').length-1]
                        })
                    })
                });

                city.data.forEach(v=>{
                    this.slots[0].values.push(v.codename)
                });
                city.data[0].citylist.forEach(v=>{
                    this.slots[2].values.push(v.codename)
                })
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        watch:{
            profession1(newVal,old){
                if(this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "") != ""){
                    if(newVal.length > 0){
                        this.professionValue = newVal.join(",")+','+ this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "")
                    } else{
                        this.professionValue = this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "")
                    }
                } else{
                    this.professionValue = newVal.join(",")
                }
            }
        },
        methods: {
            //经纪公司-表情过滤
            agencys(){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.agency
                this.$refs.agency[0].value = name.replace(regStr, "")
                this.agency=this.$refs.agency[0].value
            },
            //微博-表情过滤
            weibonames(){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.weiboname
                this.$refs.weiboname[0].value = name.replace(regStr, "")
                this.weiboname=this.$refs.weiboname[0].value
            },
            //毕业院校-表情过滤
            graduatedschools( ){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.graduatedschool
                this.$refs.graduatedschool[0].value = name.replace(regStr, "")
                this.graduatedschool=this.$refs.graduatedschool[0].value
            },
            //获得奖项-表情过滤
            jxContent(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.prize[i].content
                this.$refs.jxContent[i].value = name.replace(regStr, "")
                this.prize[i].content= this.$refs.jxContent[i].value
            },
            //代言广告
            adContent(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.ad[i].content
                this.$refs.adContent[i].value = name.replace(regStr, "")
                this.ad[i].content= this.$refs.adContent[i].value
            },
            event_t(e){
                e.preventDefault()
            },
            //微信号验证
            checkWeChat1(weChat) {
                if( weChat ==''){
                    return true
                }else if(!(/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(weChat))){
                    MessageBox.alert('微信号格式错误<br/>请重新输入填写', '').then(()=>{
                        this.wechat = ''
                        this.$refs.wechat[0].focus()
                        return false
                    })
                }else{
                    return true
                }
            },
            //手机号验证
            checkPhone (tel) {
                if( tel ==''){
                    return true
                }else if(!(/^1[34578]\d{9}$/.test(tel))){
                    MessageBox.alert('手机号格式错误<br/>请重新输入填写', '').then(()=>{
                        this.phone = ''
                        this.$refs.phone[0].focus()
                        return false
                    })
                }else{
                    return true
                }
            },
            //邮箱验证
            checkEmail (email) {
                if(email ==''){
                    return true
                }else if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email))){
                    MessageBox.alert('邮箱格式错误<br/>请重新填写', '').then(()=>{
                        this.email = ''
                        this.$refs.email[0].focus()
                        return false
                    });
                }else{
                    return true
                }
            },
            modal(){
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.showModal=false
                this.activeflag=false
            },
            profession(){
                clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    if(this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "") != ""){
                        if(this.profession1.length > 0){
                            this.professionValue=this.profession1.join(",")+','+this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "")
                        } else{
                            this.professionValue= this.$refs.profession[0].value.replace(/(^\s*)|(\s*$)/g, "")
                        }
                    } else{
                        this.professionValue=this.profession1.join(",")
                    }
                },100)
            },
            open() {
                this.$refs.picker[0].open();
            },
            open2() {
                document.body.addEventListener('touchmove', this.event_t, false);
                this.showModal=true
                this.activeflag=true
            },
            open3(i) {
                this.prizeCurrent=i
                this.$refs.d1[i].open();
            },
            open4(i) {
                this.adCurrent=i
                this.$refs.adpicker[i].open();
            },
            close(){//籍贯-取消
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.activeflag=false
                this.showModal=false
            },
            ok(){//籍贯-确定
                document.body.removeEventListener('touchmove', this.event_t, false);
                this.province=this.city[0]
                this.cityName=this.city[2]
                this.jg=this.cityName ? (this.province + '-' + this.cityName) : this.province
                this.activeflag=false
                this.showModal=false
            },
            add(){
                this.prizeList++
                this.prize.push({
                    date:'' ,
                    content:''
                })
            },
            add2(){
                this.adList++
                this.ad.push({
                    date:'' ,
                    content:''
                })
            },
            handleChange(value) {
                this.sr=this.getLocalTime(new Date(value).getTime())
            },
            handleChange2(picker, values) {
                city.data.forEach(v=>{
                    if (values[0]!=undefined&& v.codename==values[0]) {
                        this.slots[2].values=[]
                        v.citylist.forEach(k=>{
                            this.slots[2].values.push(k.codename)
                        })
                    }
                });
                this.city=values
            },
            handleChange3(value) {
                this.$set(this.prize[this.prizeCurrent],'date', this.getLocalTime(new Date(value).getTime()))
                this.prize[this.prizeCurrent].date=this.getLocalTime(new Date(value).getTime())
            },
            handleChange4(value) {
                this.$set(this.ad[this.adCurrent],'date', this.getLocalTime(new Date(value).getTime()))
                this.ad[this.adCurrent].date=this.getLocalTime(new Date(value).getTime())
            },
            getLocalTime(nS) { //转换时间格式
                let year=new Date(nS).getFullYear();
                let month=new Date(nS).getMonth()+1;
                let date=new Date(nS).getDate();
                if (month < 10) {
                    month = "0" + month
                }
                if (date < 10) {
                    date = "0" + date
                }
                return year+"-"+month+"-"+date
            },
            submit(){
                if(this.checkWeChat1(this.wechat) && this.checkPhone(this.phone) && this.checkEmail(this.email)){
                    if (this.value=='男') {
                        this.sex=1
                    }else{
                        this.sex=0
                    }
                    this.$refs.jx[0].value='';
                    this.$refs.ad[0].value='';
                    this.prize.forEach(v=>{
                        if(v.date.replace(/(^\s*)|(\s*$)/g, "") !="" || v.content.replace(/(^\s*)|(\s*$)/g, "")!=""){
                            this.$refs.jx[0].value+=v.date+'*'+v.content+';'
                        }
                    });
                    this.ad.forEach(v=>{
                        if(v.date.replace(/(^\s*)|(\s*$)/g, "") !="" || v.content.replace(/(^\s*)|(\s*$)/g, "")!="") {
                            this.$refs.ad[0].value += v.date + '*' + v.content + ';'
                        }
                    });
    //               if (this.$refs.name[0].value=='') {
    //                    MessageBox.alert('请填写姓名！', '');
    //                    return false
    //               }
    //               if (this.$refs.sex[0].value=='') {
    //                    MessageBox.alert('请填写性别！', '');
    //                    return false
    //               }
    //               if (this.professionValue=='') {
    //                    MessageBox.alert('请填写职业！', '');
    //                    return false
    //               }
    //               if (this.sr=='') {
    //                    MessageBox.alert('请填写出生日期！', '');
    //                    return false
    //               }
    //               if (this.jg=='') {
    //                    MessageBox.alert('请填写籍贯！', '');
    //                    return false
    //               }
    //               if (this.agency=='') {
    //                    MessageBox.alert('请填写经纪公司！', '');
    //                    return false
    //               }
    //               if (this.wechat=='') {
    //                    MessageBox.alert('请填写微信号！', '');
    //                    return false
    //               }
    //               if (this.phone=='') {
    //                    MessageBox.alert('请填写电话号码！', '');
    //                    return false
    //               }
    //               if (this.email=='') {
    //                    MessageBox.alert('请填写邮件地址！', '');
    //                    return false
    //               }
    //               if (this.$refs.weiboname[0].value=='') {
    //                    MessageBox.alert('请填写微博名！', '');
    //                    return false
    //               }
    //               if (this.$refs.graduatedschool[0].value=='') {
    //                    MessageBox.alert('请填写毕业院校！', '');
    //                    return false
    //               }
    //               if (this.prize[0].date.length==0&&this.prize[0].content.length==0) {
    //                    MessageBox.alert('请填写获得的奖项！', '');
    //                    return false
    //               }
    //               if (this.ad[0].date.length==0&&this.ad[0].content.length==0) {
    //                    MessageBox.alert('请填写代言的广告！', '');
    //                    return false
    //               }
    //               if (this.$refs.file.value=='') {
    //                    MessageBox.alert('请上传明星的头像！', '');
    //                    return false
    //               }
                    let that=this
                    var form = $('#myForm').ajaxSubmit({
                        success: function (res) {
                            that.$router.push({ name: 'baseInfo',params: { id: that.$route.params.id }})
                        }
                    })
                }
            },
            AddImg(){
                this.imgShow=false
            },
            readFile(i){
                let files = this.$refs.file[i].files
                let imgWrap = this.$refs.imgWrap[i]
                let fileWrap = this.$refs.fileWrap[i]
                let img = new Image();
                this.imgurl=''
                const that=this
                if(window.URL){
                    //File API
                    img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
                    img.onload = function(e) {
                        window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                    }
                    that.imgurl2 = ''
                    that.imgurl=img.src
                    this.imgShow=true
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .base-infos{
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }
    .base-infos .item{
        flex: 1;
        display: flex;
    }
    .base-infos .item .mint-radiolist,.item .mint-checklist{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    .base-infos{
        background: #f2f7ff;
    }
    .base-infos .form{
        background: #fff;
    }
    .base-infos .add-main{
        background: #fff;
        border-bottom: 1px solid #e3e3e3;
    }
    .base-infos .form .record-div:not(:last-child){
        min-height:50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 15px;
        border-bottom: 1px  solid #e3e3e3;
    }
    .base-infos .form .record-text{
        color: #a6acbc;
        font-size: 15px;
    }
    .base-infos .form input{
        width: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 14px;
        flex: auto;
        border:none ;
        padding-left: 10px;
        color:#333;
        text-align: right;
        opacity: 1;
        height: 40px;
    }

    /*发行时间*/
    .base-infos .record-time p{
        text-align: right;
        flex: auto;
    }
    .base-infos .record-time p input{
        font-size: 14px;
        background: #fff;
    }
    .base-infos .record-time p input::-webkit-input-placeholder{
        font-size: 14px;
        color:#d9dce4;
    }
    .base-infos .record-div .awards-p input::-webkit-input-placeholder{
        color: #a6acbc;
    }
    .base-infos .record-time i{
        width:9px;
        height:14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat bottom;
        background-size:9px 14px ;
        vertical-align: -2px;
    }
    /*placeholder字体颜色*/
    .base-infos ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        color:#d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
    }
    /*获得奖项文本域*/
    .base-infos form textarea{
        min-height:90px;
        font-size: 14px;
        flex: auto;
        resize:none;
        padding:15px 5px;
        border:none;
        color:#a6acbc;
        font-family: "Microsoft YaHei";
    }
    .base-infos input:focus, textarea:focus {
        outline: none;
    }
    /*演出海报*/
    .base-infos .poster{
        flex-direction: column;
        padding-bottom: 15px;
    }
    .base-infos .poster .record-text{
        height: 50px;
        line-height: 50px;
        padding: 0 15px ;
    }
    .base-infos .poster .img-text{
        height:130px;
        margin:0 15px;
        border:1px dashed #7679fe;
        margin-bottom: 15px;
        text-align: center;
    }
    .base-infos .poster .img-text div{
        width: 100%;
        height:100%;
        position: relative;
        box-sizing: border-box;
        cursor: pointer
    }
    .base-infos .poster .img-text .ibox{
        width: 100%;
        height:100%;
        padding-top: 0px;
        /*display: none;*/
    }
    .base-infos .ibox img{
        width: 100%;
        height: 100%;
    }
    .ibox2  p:first-child {
        height: 15px;
        line-height: 15px;
    }
    .base-infos .poster .ibox  p.ibox-add{
        width: 15px;
        font-size: 26px;
        color: #7837ff;
        font-weight: bold;
        margin: 0 auto 5px;
        padding:20px 0 30px;
    }
    .base-infos  .poster .img-text div p:last-child {
        width:120px;
        margin: 0 auto;
        color: #f4bf64;
        font-size: 11px;
    }
    .base-infos .poster .img-text div p{
        height:15px;
        line-height: 15px;
    }
    .base-infos .poster .img-text div p:first-child{
        width:15px;
        font-size: 26px;
        color: #7837ff;
        font-weight: bold;
        margin: 0 auto 20px;
    }
    .base-infos .poster .img-text div p:last-child{
        color: #f4bf64;
        font-size:11px ;
    }
    /*增加*/
    .base-infos .record-add{
        background: #fff;
        text-align: right;
        padding: 15px;
        justify-content: flex-end!important;
    }
    .base-infos form .record-add p{
        font-size: 14px;
        color: #9e5bfc;
    }
    .base-infos .record-add p:after{
        width:22px;
        height:22px;
        content: '';
        display: inline-block;
        background: url("../../../static/img/add-icon.png") no-repeat;
        background-size:22px 22px ;
        vertical-align: -6px;
        margin-left: 5px;
    }
    .base-infos  .file{
        opacity: 0 !important;
        width: 100% !important;
        position: absolute;
        left: 0;
        top:0;
        right:0;
        bottom:0;
        box-sizing: border-box;
    }
    .base-infos  .sub-div{
        margin-left: 20px;
        padding:0 15px 0 10px!important;
    }
    .base-infos  .sub-div .record-text{
        font-size: 14px!important;
        color: #d9dce4!important;
        width: 60px;
        text-align: right;
        white-space: nowrap;
    }

    .base-infos .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .base-infos  .btn-group input.purchase {
        width: 100%;
        height: 45px;
        text-align: center;
        color: #fff ;
        margin-top: 25px;
        border-radius: 100px;
        font-size:18px;
        text-decoration: none;
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .base-infos  .zy{
        position: relative;
        padding-bottom: 30px!important;
        padding-right:0!important;
        justify-content:flex-start!important;
        align-items: inherit!important;
    }
    .base-infos .zy input{
        width: calc(100vw - 54px);
        height: 30px;
        text-align: left;
        position: absolute;
        bottom:1px;
        right:0;
        box-sizing: border-box;
        padding:0 5px;
    }
    .base-infos .zy input::placeholder{
        text-align: left!important;
    }
    .base-infos  .picker-toolbar{
        height: 40px;
        line-height: 40px;
        border-bottom: solid 1px #eaeaea
    }
    .base-infos  .picker{
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
    .base-infos  .picker.active{
        transform: translate3d(-50%, 0%, 0);
    }
    .base-infos  .poster {
        flex-direction: column;
        padding-bottom: 15px;
    }
    .base-infos  .poster .record-text {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .base-infos  .poster .record-text p .updata{
        width:10px;
        height:10px;
        display: inline-block;
        background: url("../../../static/img/upload-icon.png") no-repeat center;
        background-size: 100% 100%;
    }
    .base-infos .poster .record-text p .updata-text{
        color: #7679fe;
        font-size:12px ;
    }
    .base-infos .origin,.birth,.awards{
        background: #fff;
    }
    .base-infos  .right-icon{
        width: 9px;
        height: 14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat bottom;
        background-size: 9px 14px;
        vertical-align: -2px;
    }
    .base-infos .getreward-div{
        padding-left:0!important;
        margin-left: 14px ;
    }
    .base-infos .getreward-div span{
        color: #a6acbc !important;
        font-size: 15px !important;
    }
    .base-infos .modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 100;
    }
</style>
