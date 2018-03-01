<template>
    <div class="star-show">
        <form :action="toAction" method="post"
              enctype="multipart/form-data" class="form" id="myForm">
            <input type="hidden" name="userid" value="" v-model="userid">
            <div class="add-main" v-for="(item,i) in list">
                <input type="hidden" name="id" value="" v-model="datalist.id[i]">
                <input type="hidden" name="starid" value="" v-model="user.starid">
                <div class="record-div text-name">
                    <span class="record-text">演出名称:</span>
                    <input type="text"  placeholder="请输入" v-model="datalist.performancename[i] " name="performancename" ref="performancename" @blur="performancename(i)">
                </div>
                <div class="record-div record-time">
                    <span class="record-text">演出时间:</span>
                    <p @click="open(i)">
                        <input class="input-p" disabled type="text" name="performancetime" placeholder="请选择" v-model="datalist.performancetime[i]" />
                        <i></i>
                    </p>
                    <!--演出时间-->
                    <dp
                            ref="picker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="new Date('1997')"
                            @confirm="handleChange">
                    </dp>
                </div>

                <div class="record-div text-name">
                    <span class="record-text">演出地点:</span>
                    <input type="text"  placeholder="请填写城市 + 具体场馆名称" v-model="datalist.performancelocation[i]" name="performancelocation" ref="performancelocations" @blur="performancelocations(i)"/>
                </div>

                <div class="record-div price">
                    <span class="record-text">票价:</span>
                    <div>
                        <input type="number" class="price-input" placeholder="最低票价" v-model=" datalist.lowestprice[i]" name="lowestprice" @blur="lowestprice(i)">
                        <span>元-</span>
                        <input type="number" class="price-input" placeholder="最高票价" v-model="datalist.highestprice[i]" name="highestprice" @blur="highestprice(i)">
                        <span>元</span>
                    </div>
                </div>

                <div class="record-div poster">
                    <div class="record-text">
                        <span>演出海报:</span>
                        <p>
                            <i class="updata"></i>
                            <span class="updata-text"  @click='AddImg(i)'>重新上传</span>
                        </p>
                    </div>
                    <div class="img-text">
                        <div>
                            <div ref='imgWrap' class="ibox imgbox" >
                                <img :src="imgurl[i] | imgHttp">
                            </div>
                            <div class="ibox ibox2" ref='fileWrap' >
                                <input type="hidden" name="imageurl" v-model='imgurl2[i]' >
                                <input type="file" name="imageFile" ref='file' @change='readFile(i)' class="file">
                                <p class="ibox-add">+</p>
                                <p>图片格式jpg,png,gif,文件小于500k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--增加-->
            <div class="record-div record-add" @click='add()'>
                <p>增加</p>
                <i></i>
            </div>

            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='submit( )'>
            </div>
        </form>
        <!-- </ajaxForm> -->
    </div>
</template>

<script>
    import $ from 'jquery'
    import 'jquery-form'
    import { MessageBox } from 'mint-ui';
    import baseconfig from '@/assets/js/config'
    import api from '@/api';
    import cookie from '@/util/cookie'
    import dp from '@/components/datePicker'
    import { Indicator } from 'mint-ui';
    export default {
        name: 'starShow',
        data () {
            return {
                toAction: '',
                value: null,
                date: '',
                userid:'',
                imgShow:true,
                startDate: new Date('2000'),//开始时间
                endDate: new Date(),//结束时间
                list: 1,
                flag: false,
                current: 0,
                imgurl:[],
                imgurl2:[],
                user:{
                    starid:""
                },
                datalist: {
                    id:[],
                    performancename: [],
                    performancetime: [],
                    performancelocation: [],
                    lowestprice: [],
                    highestprice: [],
                }
            }
        },
        components:{
            dp
        },
        mounted(){
            this.toAction = baseconfig.baseURL+"/wechatschedule/updateperformancelist"
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
                this.user.starid=this.$route.params.id
                this.getStarshow();
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods: {
            //演出名称
            performancename(i){
                let regStr1 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name1=this.datalist.performancename[i]
                this.$refs.performancename[i].value = name1.replace(regStr1, "")
                this.datalist.performancename[i]=this.$refs.performancename[i].value
            },
            //演出地点
            performancelocations(i){
                let regStr2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name2=this.datalist.performancelocation[i]
                this.$refs.performancelocations[i].value = name2.replace(regStr2, "")
                this.datalist.performancelocation[i]=this.$refs.performancelocations[i].value
            },
            //票价金额判断
            lowestprice(i){
                if(!(/^\+?[1-9][0-9]*$/.test(this.datalist.lowestprice[i]))||(this.datalist.lowestprice[i]=='')){
                    MessageBox.alert('请输入数字', '')
                    this.$set(this.datalist.lowestprice, i, '')
                }else if((parseInt(this.datalist.lowestprice[i])>=parseInt(this.datalist.highestprice[i]))){
                    MessageBox.alert('最低票价不能高于最高票价','');
                }else{
                    return true
                }
            },
            highestprice(i){
                if(!(/^\+?[1-9][0-9]*$/.test(this.datalist.highestprice[i]))||(this.datalist.highestprice[i]=='')){
                    MessageBox.alert('请输入数字', '').then(()=> {
                        this.$set(this.datalist.highestprice,i,'')
                    })
                }else if((parseInt(this.datalist.highestprice[i])<=parseInt(this.datalist.lowestprice[i]))){
                    MessageBox.alert('最高票价不能低于最低票价','');
                }else{
                    return true
                }
            },
            open(i) {
                this.current = i;
                this.$refs.picker[i].open();
            },
            handleChange(value) {
                this.$set(this.datalist.performancetime, this.current, this.getLocalTime(new Date(value).getTime()))
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
            add(){
                this.list++;
                this.$set(this.datalist.id,this.list.length-1, '')
            },
            submit( ){
                let that=this;
                let form = $('#myForm').ajaxSubmit({
                    success: function (res) {
                        that.$router.push({ name: 'shows',params: { id: that.$route.params.id }})
                    }
                });
            },
            AddImg(i){
                this.$refs.imgWrap[i].style.display='none';
                this.$refs.fileWrap[i].style.display='block';
                this.imgurl[i]=''
            },
            readFile(i,imageurl){
                let imgWrap = this.$refs.imgWrap[i];
                let fileWrap = this.$refs.fileWrap[i];
                if (!imageurl) {
                    let files = this.$refs.file[i].files;
                    const isJPG = files[0].type === 'image/jpeg';
                    const isPNG = files[0].type === 'image/png';
                    const isGIF = files[0].type === 'image/gif';
                    const isLt2M = files[0].size / 1024 / 1024 < 0.48;
                    if (!(isJPG || isPNG || isGIF)){
                        MessageBox.alert('上传图片只能是<br/>jpg、png、gif 格式!', '');
                    }
                    if (!isLt2M) {
                        MessageBox.alert('上传头像图片大小不能超过 500K!', '');
                    }
                    this.imgurl[i]='';
                    const that=this;
                    if((isJPG  || isPNG || isGIF) && isLt2M) {
                        let img = new Image();
                        if(window.URL){
                            //File API
                            img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
                            img.onload = function(e) {
                                window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                            };
                           that.$set(that.imgurl2,i,'');
                           that.$set(that.imgurl,i,img.src);
                           imgWrap.style.display='block';
                           fileWrap.style.display='none';
                        }
                    }
                }
            } ,
            getStarshow () {
                const that=this;
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getStarshow (this.user)
                    .then(res => {
                        Indicator.close();
                        if (res.result === '1') {
                            if(res.data.length>0){
                                this.list = res.data.length;
//                                that.datalist.id=[]
                                res.data.forEach(function (item,index) {
                                    that.imgurl2[index] = item.imageurl;
//                                    that.$set(that.imgurl,index,baseconfig.baseURL+'/wechatpersonalinfo/readimg?imgname='+item.imageurl)
                                    that.imgurl[index]=item.imageurl
                                    that.$set(that.datalist.performancename,index,item.performancename);
                                    that.$set(that.datalist.performancetime,index,item.performancetime);
                                    that.$set(that.datalist.performancelocation,index,item.performancelocation);
                                    that.$set(that.datalist.lowestprice,index,item.lowestprice);
                                    that.$set(that.datalist.highestprice,index,item.highestprice);
                                    that.$set(that.datalist.id,index,item.id)
                                });
                            }
                        }
                        return res;
                    }).then((res)=>{
                        if(res.data.length>0){
                            that.$refs.imgWrap.forEach(v=>{
                                v.style.display='block'
                            });
                            that.$refs.fileWrap.forEach(v=>{
                                v.style.display='none'
                            })
                        }
                    })
            }
        },
        filters:{
            imgHttp(value){
               if(value){
                   if(value.match('http://')){
                       return value
                   }else {
                       return baseconfig.baseURL+'/wechatpersonalinfo/readimg?imgname='+value
                   }
               }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .star-show {
        width: 100vw;
        height: 100vh;
        background: #f2f7ff;
    }
    .star-show .form {
        background: #fff;
    }
    .star-show .add-main {
        border-bottom: 1px solid #e3e3e3;
    }
    .star-show .form .record-div:not(:last-child) {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: inherit;
        padding: 0 15px;
        border-bottom: 1px solid #e3e3e3;
    }

    .star-show .form .record-text {
        color: #a6acbc;
        font-size: 15px;
    }
    .star-show .form input:not(.price-input) {
        width: 80px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        flex: auto;
        border: none;
        padding-left: 10px;
        text-align: right;
        color:#333;
        -webkit-appearance: none;
        font-size: 14px;
        opacity: 1;
    }

    /*演出时间*/
    .star-show .record-time p {
        text-align: right;
        flex: auto;
    }
    .star-show .record-time p input.input-p {
        height:48px;
        font-size: 14px;
        background: #fff;
    }
    .star-show .record-time p input::-webkit-input-placeholder {
        font-size: 14px;
        color: #a6acbc;
    }
    .star-show .record-time i {
        width: 9px;
        height: 14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat bottom;
        background-size: 9px 14px;
        vertical-align: -2px;
    }

    /*placeholder字体颜色*/
    .star-show ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        color: #d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
        line-height: 14px;
    }
    .price-input::-webkit-input-placeholder{
        line-height:25px;
    }
    .star-show .poster {
        flex-direction: column;
        padding-bottom: 15px;
    }
    .star-show .poster .record-text {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .star-show .poster .record-text p .updata{
        width:10px;
        height:10px;
        display: inline-block;
        background: url("../../../static/img/upload-icon.png") no-repeat center;
        background-size: 100% 100%;
    }
    .star-show .poster .record-text p .updata-text{
        color: #7679fe;
        font-size:12px ;
    }
    .star-show .poster .img-text {
        height: 130px;
        margin: 0 15px;
        border: 1px dashed #7679fe;
        margin-bottom: 15px;
        text-align: center;
    }
    .star-show .poster .img-text div {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        cursor: pointer
    }
    .star-show .poster .img-text .ibox {
        width: 100%;
        height: 100%;
        padding-top: 0;
        display: none;
    }
    .star-show .poster .img-text .ibox2 {
        display: block;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .star-show .ibox img {
        width: 100%;
        height: 100%;
    }
    .star-show .ibox2  p:first-child {
        height: 15px;
        line-height: 15px;
    }
    .star-show .poster .img-text .ibox  p.ibox-add{
        width: 15px;
        font-size: 26px;
        color: #7837ff;
        font-weight: bold;
        margin: 0 auto 5px;
    }
    .star-show .poster .img-text div p:last-child {
        width:120px;
        margin: 0 auto;
        color: #f4bf64;
        font-size: 11px;
    }
    .file {
        opacity: 0 !important;
        width: 100%!important;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
    }
    .star-show .price input.price-input{
        width: 65px;
        height:25px;
        font-size: 14px;
        line-height: 25px;
        color: #333;
        border:1px solid #e6e6e6;
        text-align: center;
        margin:0 4px;
        padding:2px 3px;
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    .star-show .price span{
        color: #333;
    }
    .star-show .price .price-input::-webkit-input-placeholder {
        text-align: center;
        color: #a6acbc;
    }

    /*按钮*/
    .star-show .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .star-show .btn-group input.purchase {
        width: 100%;
        height: 45px;
        color: #fff;
        text-align: center;
        margin-top: 25px;
        border-radius: 100px;
        font-size:18px;
        text-decoration: none;
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    /*增加*/
    .star-show .record-add {
        height: 25px;
        background: #fff;
        text-align: right;
        padding: 15px;
        justify-content: flex-end !important;
    }

    .star-show form .record-add p {
        font-size: 14px;
        color: #9e5bfc;
    }

    .star-show .record-add p:after {
        content: '';
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("../../../static/img/add-icon.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -6px;
        margin-left: 5px;
    }

</style>
