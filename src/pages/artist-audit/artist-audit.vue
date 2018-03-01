<template>
    <div class="audit-wrapper">
        <form :action="toAction" method="post" enctype="multipart/form-data" class="form" id="myForm">
            <input type="hidden" name="userid" value=""  v-model="userid">
            <template v-for="(item,i) in list">
                <ul class="audit-list">
                    <li>
                        <span class="l-title">姓名：</span>
                        <input name="starname" placeholder="请输入" v-model="auditParams.starname" @blur="checkStarName">
                    </li>
                    <li>
                        <span class="l-title">性别：</span>
                        <mt-radio
                                v-model="auditParams.sex"
                                :options="options"
                                @change="checkRadio">
                        </mt-radio>
                        <input type="hidden" name="sex"  v-model="auditParams.sex" ref='sex'>
                    </li>
                    <li>
                        <span class="l-title">身份证号：</span>
                        <input name="idcard" placeholder="请输入" v-model="auditParams.idcard" @blur="checkIdcard">
                    </li>
                    <li>
                        <div class="record-text">
                            <span>上传证件:</span>
                            <p>
                                <i class="updata"></i>
                                <span class="updata-text" @click="reupload(0)">重新上传</span>
                            </p>
                        </div>
                        <!--<span class="l-title">上传证件：</span>-->
                        <div class="upload-credentials-box">
                            <div ref='imgWrap' class="ibox"></div>
                            <div class="ibox ibox2" ref='fileWrap'>
                                <input type="file" name="idcardimg" ref='file' @change='readFile(0)' class="file">
                                <p>+</p>
                                <div class="upload-tip"><span>图片格式jpg,png,gif,文件小于500k</span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li-hidden">
                        <span class="l-title">经纪公司：</span>
                        <input name="company" placeholder="请输入" v-model="auditParams.company">
                    </li>
                    <li>
                        <div class="record-text">
                            <span>经纪公司营业执照:</span>
                            <p>
                                <i class="updata"></i>
                                <span class="updata-text" @click="reupload(1)">重新上传</span>
                            </p>
                        </div>
                        <div class="upload-credentials-box">
                            <!--<el-upload class="avatar-uploader" action='http://192.168.1.68:8090/wechatstarproject/upload' :show-file-list="false"  :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">-->
                                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                                <!--<div slot="tip" class="el-upload__tip">图片格式jpg,png,gif,文件小于500k</div>-->
                            <!--</el-upload>-->
                            <div ref='imgWrap' class="ibox"></div>
                            <div class="ibox ibox2" ref='fileWrap'>
                                <input type="file" name="companyimg" ref='file' @change='readFile(1)' class="file">
                                <p>+</p>
                                <div class="upload-tip"><span>图片格式jpg,png,gif,文件小于500k</span></div>
                            </div>
                        </div>
                    </li>
                    <li class="audit-contact-li">
                        <ul class="audit-contact-list">
                            <li>
                                <span class="l-title">联系方式：</span>
                            </li>
                            <li>
                                <span class="l-title audit-phone">手机号：</span>
                                <input name="phone"  v-model="auditParams.phone" @blur="checkPhone">
                            </li>
                            <li>
                                <span class="l-title audit-phone">邮箱：</span>
                                <input name="email"  v-model="auditParams.email" @blur="checkEmail">
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="btn-group">
                    <input class="purchase" type="button" name="" value="保存" @click='submit()'>
                </div>
            </template>
        </form>
        <div class="fail-wrapper">
            <div class="audit-fail-con">
                <div class="audit-fail-title"><i></i>审核信息提交失败</div>
                <p>审核信息提交失败，请重新上传信息。</p>
            </div>
            <div class="audit-fail-btn"><a @click="gotoArtistAudit">重新提交</a></div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
  import baseconfig from '@/assets/js/config'
  import api from '@/api';
  import { MessageBox } from 'mint-ui';
  import $ from 'jquery'
  import 'jquery-form'
  import cookie from '@/util/cookie'

  export default {
      name:'artistAudit',
      data () {
        return {
          toAction: '',
          showImgFlag: true,
          userid:'',
          list:1,
          showMask:false,
          uploadFile:{
            file:''
          },
          img1:false,
          img2:false,
          time:true,
          actionUrl:'',
          options : [
            {
              label: '女',
              value: '0'
            },
            {
                label: '男',
                value: '1'
            }
           ],
          auditParams:{
            starname:'',
            sex:'1',
            idcard:'',
            idcardimg:'',
            company:'',
            companyimg:'',
            phone:'',
            email:''
          }
        }
      },
      mounted(){
          if(cookie.get('userid') && cookie.get('userid')!=''){
              this.userid = cookie.get('userid')
              this.toAction = baseconfig.baseURL+"/wechatstar/addstar"
          } else {
              MessageBox.alert('请登录','').then(()=>{
                  this.$router.push({name:'login'})
              })
          }
      },
      methods: {
        auditSubmit () {
          this.$router.push('artistAuditSuccess')
        },
        closePage:function(){
          this.$router.go(-1);
        },
        readFile(i){
            let files = this.$refs.file[i].files;
            let imgWrap = this.$refs.imgWrap[i];
            let fileWrap = this.$refs.fileWrap[i];
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
                img.style.width='100%'
                img.style.height='100%'
                imgWrap.appendChild(img)
                imgWrap.style.display='block';
                fileWrap.style.display='none';
                if (i ===0){
                  this.img1 = true;
                }
                if (i ===1){
                  this.img2 = true;
                }
              }
            }

        },
        checkStarName () {
          if(!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(this.auditParams.starname))){
            MessageBox.alert('请输入正确的姓名', '');
            return false;
          }else {
            return true;
          }
        },
        checkIdcard () {
            if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.auditParams.idcard))) {
              MessageBox.alert('请输入正确的身份证号码', '');
              return false;
            } else {
              return true;
            }
        },
        checkRadio(){},
        checkPhone () {
          if(!(/^1[34578]\d{9}$/.test( this.auditParams.phone  ))){
            MessageBox.alert('手机号错误<br/>请重新输入', '');
            return false;
          }else{
            return true
          }
        },
        checkEmail () {
          if(!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.auditParams.email))){
            MessageBox.alert('邮箱错误<br/>请重新输入', '');
            return false;
          } else {
            return true;
          }
        },
        submit(){
          var _this = this;
          if (!this.auditParams.starname) {
            MessageBox.alert('请输入姓名', '');
          }else if(!this.auditParams.idcard){
            MessageBox.alert('请输入身份证号', '');
          }else if(!this.img1){
            MessageBox.alert('请选择身份证照片', '');
          } else if (!this.auditParams.company) {
            MessageBox.alert('请输入经济公司名称', '');
          }else if (!this.img2) {
            MessageBox.alert('请选择营业执照照片', '');
          }else if (!this.auditParams.phone) {
            MessageBox.alert('请输入手机号码', '');
          }else if (!this.auditParams.email) {
            MessageBox.alert('请输入邮箱', '');
          }else {
              let _this = this
            var form = $('#myForm').ajaxSubmit({
              success: function(res) {

                if(res["1"] = '成功') {
                    cookie.set('email',_this.auditParams.email)
                  _this.$router.push({name:'artistAuditSuccess'})
                }else {
                  var height = $('#myForm').height();
                  var dom = $('.fail-wrapper');
                  dom.css('display','block');
                  $('.mask').css({'display':'block','height':height});
                  var scroll = dom[0].scrollHeight + 60;
                  dom.css('top',scroll);
                }
              }
            });
          }
        },
        gotoArtistAudit() {
          var dom = $('.fail-wrapper');
          dom.css('display','none');
          $('.mask').css({'display':'none'});
        },
        reupload (i) {
          let imgWrap = this.$refs.imgWrap[i]
          let fileWrap = this.$refs.fileWrap[i]
          imgWrap.innerHTML='';
          imgWrap.style.display='none';
          fileWrap.style.display='block';
          $('.file').val('');
        }
      }

    }
</script>

<style scoped>
    /*头部样式*/
    .mint-header {
        background: #353339;
    }
    .mint-header-title {
        font-size: 16px;
        overflow: visible;
    }
    .mint-button-text {
        font-size: 14px;
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

    .audit-wrapper {
        position:relative;
        width: 100%;
        height: 100%;
    }
    .audit-list {
        justify-content: space-between;
        flex-flow: column nowrap;
        background: #fff;
    }
    .audit-list li {
        padding: 15px;
        overflow: hidden;
    }
    .audit-list li.li-hidden input{
        width: calc(100% - 85px);
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .audit-list li.audit-contact-li {
        padding: 0;
    }
    .audit-list li:not(:last-child){
        border-bottom: 1px solid #e3e3e3;
    }
    .audit-list li .l-title {
        float: left;
        width: 85px;
        font-size: 15px;
        color: #a6acbc;
    }
    .audit-list li .business-license {
        width: 150px;
    }
    .audit-list li input {
        float: left;
        width: calc(100% - 85px);
        height: 22px;
        line-height: 22px;
        text-align: right;
        font-size: 14px;
    }
    .audit-list li input::-webkit-input-placeholder {
        color: #d9dce4;
        text-align: right;
    }
    .upload-credentials-box {
        float: left;
        display: flex;
        width: 100%;
        height: 130px;
        margin: 20px 0 10px 0;
        border: 1px dashed #7679fe;
    }
    .ibox {
        width: 100%;
        height:100%;
        padding-top: 0;
        display: none;
    }
    .ibox2 {
        position: relative;
        display: block;
    }
    .ibox img{
        width: 100%;
        height: 100%;
    }
    .upload-credentials-con {
        width: 115px;
        display: flex;
        flex-flow: column nowrap;
    }
    .ibox p {
        padding-top: 20px;
        font-size: 36px;
        color: #8d72ff;
        text-align: center;
    }
    .upload-tip {
        display: flex;
        justify-content: center;
    }
    .upload-tip span {
        display: inline-block;
        width: 123px;
        text-align: center;
        color: #f4bf64;
    }
    .audit-list li input.file{
        opacity: 0;
        background: red;
        width: 100%;
        height: 100%;
        padding:0;
        position: absolute;
        left: 0;
        top:0;
        right:0;
        bottom:0;
        box-sizing: border-box;
    }
    .audit-contact-list {
        padding-left: 15px;
    }
    .audit-contact-list li {
        padding-left: 0;
        border-bottom: 1px solid #e3e3e3;
    }
    .audit-contact-list li .l-title {
        width: 75px;
        text-align: right;
    }
    .audit-contact-list li .audit-phone {
        font-size: 14px;
        color: #d9dce4;
    }
    .audit-contact-list li input {
        width: calc(100% - 85px);
    }
    .audit-list li input.upload {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        background: transparent;
    }
    .audit-list li  input::-webkit-file-upload-button {
        display: none;
    }

    .avatar-uploader {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        width: 100%;
        height: 100%;
    }
    .el-upload {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px 0 10px 0;
    }
    .el-icon-plus:before {
        font-size: 18px;
        color: #8d72ff;
    }
    .el-upload__tip {
        width: 123px;
        text-align: center;
        color: #f4bf64;
        line-height: 20px;
    }
    .submit {
        /*width: 30px;*/
    }
    .audit-wrapper .form .record-text{
        color: #a6acbc;
        font-size: 15px;
    }
    .record-text p {
        float: right;
    }
    .record-text p .updata {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: url("../../../static/img/upload-icon.png") no-repeat center;
        background-size: 100% 100%;
    }
    .record-text p .updata-text{
        color: #7679fe;
        font-size:12px ;
    }
    /*按钮*/
    .audit-wrapper .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .audit-wrapper .btn-group input.purchase {
        width: 100%;
        height: 45px;
        color: #fff;
        margin-top: 25px;
        border-radius: 100px;
        text-align: center;
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

    .fail-wrapper {
        position:absolute;
        width: 330px;
        height: 300px;
        top: 10%;
        left: 50%;
        margin-left: -165px;
        background:#fff;
        display:none;
        z-index: 10;
    }
    .audit-fail-wrapper {
        width: 100%;
        height: 100%;
    }
    .audit-fail-con {
        padding: 45px 33px 0 33px;
    }
    .audit-fail-title {
        display: flex;
        justify-content: center;
        font-size: 18px;
        color: #7679fe;
    }
    .audit-fail-title i {
        display:inline-block;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background: url(../../../static/img/audit-fail-icon.png) no-repeat;
    }
    .audit-fail-con p {
        margin-top: 25px;
        font-size: 15px;
        color: #a6acbc;
        line-height: 26px;
        text-align: center;
    }
    .audit-fail-btn {
        width: 76%;
        margin: 60px auto 0;
    }
    .audit-fail-btn a {
        display: inline-flex;
        width: 100%;
        height: 45px;
        margin-top: 25px;
        font-size: 18px;
        border-radius: 100px;
        justify-content: center;
        align-items: center;
        background: -webkit-linear-gradient(left,#5c86ff,#7d1aff);
        color: #fff;
        text-shadow: 0 2px 0 rgba(76,33,0,.14);
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        display: none;
    }
</style>
