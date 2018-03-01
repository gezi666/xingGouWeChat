<template>
    <div class="record-editor">
        <form :action="toAction" method="post" enctype="multipart/form-data" class="form" id="myForm">
            <div class="add-main" v-for="(item,i) in list">
                    <input type="hidden" name="starid" value=""  v-model="user.starid">
                    <input type="hidden" name="id" value="" v-model="datalist.id[i]">
                    <div class="record-div">
                        <span class="record-text">唱片名称:</span>
                        <input type="text" placeholder="请输入" v-model="datalist.recordname[i]" name="recordname" ref="recordname" @blur="recordname(i)">
                    </div>
                    <div class="record-div record-time">
                        <span class="record-text">发行时间:</span>
                        <p @click="open(i)" >
                            <input  type="text" disabled  placeholder="请输入发行时间" v-model="datalist.publishtime[i]" name="publishtime"/>
                            <i></i>
                        </p>
                        <!--发行时间-->
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

                    <div class="record-div">
                        <span class="record-text">唱片公司:</span>
                        <input type="text" placeholder="请输入" v-model="datalist.recordcompany[i]" name="recordcompany" ref="recordcompany" @blur="recordcompany(i)"/>
                    </div>

                    <div class="record-div">
                        <span class="record-text">唱片制作人:</span>
                        <input class="record-producer" type="text" placeholder="制作人为多人则以英文“，”分隔" v-model="datalist.producer[i]" name="producer" ref="producer" @blur="producer(i)"/>
                    </div>

                    <div class="record-div">
                        <span class="record-text prize">获得奖项:</span>
                        <textarea   placeholder="请输入近期获得奖项" v-model="datalist.winningrecord[i]" name="winningrecord" ref="winningrecord" @blur="winningrecord(i)"></textarea>
                    </div>

                    <div class="record-div poster">
                        <div class="record-text">
                            <span>演出海报:</span>
                            <p>
                                <i class="updata"></i>
                                <span class="updata-text" @click="reupload(i)">重新上传</span>
                            </p>
                        </div>
                        <div class="img-text">
                            <div>
                                <div ref='imgWrap' class="ibox imgbox" :id="'id'+i" v-show="datalist.imgurl[i]? true : false">
                                    <img :src="datalist.imgurl[i] | imgHttp">
                                </div>
                                <div class="ibox ibox2" ref='fileWrap' :id="'id1'+i" v-show="datalist.imgurl[i]? false : true">
                                    <input type="hidden" name="imageurl" v-model='imgurl2[i]'>
                                    <input type="file" name="imageFile" ref='file' @change='readFile(i)' class="file" >
                                    <p class="ibox-add">+</p>
                                    <p>图片格式jpg,png,gif,文件小于500k</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
            <div class="record-div record-add" @click='add()'>
                <p>增加</p>
                <i></i>
            </div>

            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='submit()'>
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
        name: 'recordEditor',
        data () {
            return {
                toAction: '',
                value: null,
                date:'',
                userid:'',
                startDate: new Date('1920'),//开始时间
                endDate: new Date(),//结束时间
                list:1,
                flag:false,
                current:0,
                user:{
                  starid:2
                },
                dataLength:0,
                imgurl2:[],
                datalist:{
                    "id":[],
                    "recordname":[],//唱片名称
                    "publishtime":[],//发行时间
                    "recordcompany":[],//唱片公司
                    "producer":[],//唱片制作人
                    "winningrecord":[],//获得奖项
                    "imgurl":[]
                }
            }
        },
        components:{
            dp
        },
        created (){
          this.$nextTick(function () {
            this.getMusiclistFun();
          })
        },
        mounted(){
            this.toAction = baseconfig.baseURL+"/wechatschedule/updatemusiclist"
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.userid = cookie.get('userid')
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods: {
            //唱片名称表情过滤
            recordname(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist.recordname[i]
                this.$refs.recordname[i].value = name.replace(regStr, "")
                this.datalist.recordname[i]=this.$refs.recordname[i].value
            },
            //唱片公司表情过滤
            recordcompany(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist.recordcompany[i]
                this.$refs.recordcompany[i].value = name.replace(regStr, "")
                this.datalist.recordcompany[i]=this.$refs.recordcompany[i].value
            },
            //唱片制作人表情过滤
            producer(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist.producer[i]
                this.$refs.producer[i].value = name.replace(regStr, "")
                this.datalist.producer[i]=this.$refs.producer[i].value
            },
            //获得奖项表情过滤
            winningrecord(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist.winningrecord[i]
                this.$refs.winningrecord[i].value = name.replace(regStr, "")
                this.datalist.winningrecord[i]=this.$refs.winningrecord[i].value
            },
            open(i) {
                this.current=i
                this.$refs.picker[i].open();
            },
            add(){
                this.list++
                this.datalist.id.push('')
                setTimeout(function(){
                  var addMain = $('.imgbox');
                  var addMain1 = $('.ibox2');
                  var last = addMain[addMain.length -1];
                  var last1 = addMain1[addMain.length -1];
                  last.style.display='none';
                  last.innerHTML='';
                  last1.style.display='block';
                },100)
            },
            handleChange(value) {
                this.$set( this.datalist.publishtime, this.current, this.getLocalTime(new Date(value).getTime()))
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
              if ( this.dataLength == 0   ) {
                $('input[name="id"]').attr('name','')
              }
              let  that=this
              var form = $('#myForm').ajaxSubmit({
                    success: function(res) {
                        that.$router.push({ name: 'records',params: { id: that.$route.params.id }})
                    }
                });
            },
            readFile(i,imageurl){
                let imgWrap = this.$refs.imgWrap[i]
                let fileWrap = this.$refs.fileWrap[i]
                imgWrap.innerHTML='';
                var _this = this;
                if (!imageurl) {
                  let files = this.$refs.file[i].files
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
                  if((isJPG  || isPNG || isGIF) && isLt2M) {
                    let img = new Image();
                    if(window.URL){
                      //File API
                      img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
                      img.onload = function(e) {
                        window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                      }
                      _this.$set(_this.imgurl2,i,'');
                      imgWrap.appendChild(img)
                      imgWrap.style.display='block';
                      fileWrap.style.display='none';
                    }
                  }
                }else {
                  let img = new Image();
                  img.src = baseconfig.baseURL.substring(0,baseconfig.baseURL.length)+imageurl;
                  imgWrap.appendChild(img)
                  imgWrap.style.display='block';
                  fileWrap.style.display='none';
                }
            } ,
            getMusiclistFun () {
              this.user.starid = this.$route.params.id;
              Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
              });
              api.getMusiclist (this.user)
                .then(res => {
                  Indicator.close();
                  if (res.result === '1') {
                    this.dataLength = res.data.length;
                      if(res.data.length>0) {
                          this.list = res.data.length;
                          var _this = this;
                          var imgurl = [], recordname = [], publishtime = [], recordcompany = [], producer = [],
                              winningrecord = [],id=[];
                          res.data.forEach(function (item, index) {
                            _this.imgurl2[index] = item.imageurl;
                              recordname.push(item.recordname);
                              if(item.publishtime){
                                publishtime.push(item.publishtime);
                              }else {
                                publishtime.push('');
                              }
                              recordcompany.push(item.recordcompany);
                              producer.push(item.producer);
                              winningrecord.push(item.winningrecord);
                              id.push(item.id);

                              if (!item.imageurl) {
                                  imgurl.push('');
                              } else {
//                                  imgurl.push(baseconfig.baseURL + '/wechatpersonalinfo/readimg?imgname=' + item.imageurl);
                                  imgurl.push(item.imageurl);
                              }

                          });

                          this.datalist.imgurl = imgurl;
                          this.datalist.recordname = recordname;
                          this.datalist.publishtime = publishtime;
                          this.datalist.recordcompany = recordcompany;
                          this.datalist.producer = producer;
                          this.datalist.winningrecord = winningrecord;
                          this.datalist.id = id;

                      }
                  }
                })
            },
            reupload (i) {
              let imgWrap = this.$refs.imgWrap[i]
              let fileWrap = this.$refs.fileWrap[i]
              imgWrap.innerHTML='';
              imgWrap.style.display='none';
              fileWrap.style.display='block';
              $('.file').val('')
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
    .record-editor{
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }
    .record-editor .form{
        background: #fff;
        box-shadow: 0 0 5px #e1ebfc;
    }
    .record-editor .add-main{
        background: #fff;
        border-bottom: 1px solid #e3e3e3;
    }
    .record-editor .form .record-div:not(:last-child){
        min-height:50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: inherit;
        padding:0 15px;
        border-bottom: 1px  solid #e3e3e3;
    }
    .record-editor .form .record-add{
        display: flex;
        justify-content: flex-end !important;
        align-items: center;
    }
    .record-editor .form .record-text{
        color: #a6acbc;
        font-size: 15px;
    }
    .record-editor .form input{
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
    }
    /*发行时间*/
    .record-editor .record-time p{
        text-align: right;
        flex: auto;
    }
    .record-editor .record-time p input{
        font-size: 14px;
        background: #fff;
    }
    .record-editor .record-time p input::-webkit-input-placeholder{
        font-size: 14px;
        color:#a6acbc;
    }
    .record-editor .record-time i{
        width:9px;
        height:14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat bottom;
        background-size:9px 14px ;
        vertical-align: -2px;
    }
    /*placeholder字体颜色*/
    .record-editor ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        line-height: 16px;
        font-size: 14px;
        color:#d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
    }
    /*获得奖项文本域*/
    .record-editor form textarea{
        min-height:90px;
        font-size: 14px;
        flex: auto;
        resize:none;
        padding:15px 5px;
        border:none;
        color:#a6acbc;
        font-family: "Microsoft YaHei";
    }
    .record-editor input:focus, textarea:focus {
        outline: none;
    }
    /*演出海报*/
    .record-editor .poster{
        flex-direction: column;
        padding-bottom: 15px;
    }
    .record-editor .poster .img-text{
        height:130px;
        margin:0 15px;
        border:1px dashed #7679fe;
        margin-bottom: 15px;
        text-align: center;
    }
    .record-editor .poster .record-text {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .record-editor .poster .record-text p .updata{
        width:10px;
        height:10px;
        display: inline-block;
        background: url("../../../static/img/upload-icon.png") no-repeat center;
        background-size: 100% 100%;
    }
    .record-editor .poster .record-text p .updata-text{
        color: #7679fe;
        font-size:12px ;
    }
    .record-editor .poster .img-text div{
        width: 100%;
        height:100%;
        position: relative;
        box-sizing: border-box;
        cursor: pointer
    }
    .record-editor .poster .img-text .ibox{
        width: 100%;
        height:100%;
        padding-top: 0;
    }
    .record-editor .poster .img-text .ibox2{
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .record-editor .ibox2  p:first-child {
        height: 15px;
        line-height: 15px;
    }
    .record-editor .poster .img-text .ibox  p.ibox-add{
        width: 15px;
        height: 35px;
        line-height: 35px;
        font-size: 26px;
        color: #7837ff;
        font-weight: bold;
        margin: 0 auto 5px;
    }
    .record-editor .poster .img-text div p:last-child {
        width:120px;
        margin: 0 auto;
        color: #f4bf64;
        font-size: 11px;
    }
    .record-editor .ibox img{
        width: 100%;
        height: 100%;
    }
    .record-editor .poster .img-text div p{
        height:15px;
        line-height: 15px;
    }
    .record-editor .poster .img-text div p:first-child{
        width:15px;
        font-size: 26px;
        color: #7837ff;
        font-weight: bold;
        margin: 0 auto 20px;
    }
    .record-editor .poster .img-text div p:last-child{
        color: #f4bf64;
        font-size:11px ;
    }
    /*增加*/
    .record-editor .record-add{
        background: #fff;
        text-align: right;
        padding: 15px;
    }
    .record-editor form .record-add p{
        font-size: 14px;
        color: #9e5bfc;
    }
    .record-editor .record-add p:after{
        width:22px;
        height:22px;
        content: '';
        display: inline-block;
        background: url("../../../static/img/add-icon.png") no-repeat;
        background-size:22px 22px ;
        vertical-align: -6px;
        margin-left: 5px;
    }
    .file{
        opacity: 0!important;
        width: 100% !important;
        position: absolute;
        left: 0;
        top:0;
        right:0;
        bottom:0;
        box-sizing: border-box;
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
    /*按钮*/
    .record-editor .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .record-editor .btn-group input.purchase {
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
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
</style>
