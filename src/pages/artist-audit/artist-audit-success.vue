<template>
    <div class="audit-success-wrapper">
        <div class="audit-success-con">
            <div class="audit-success-title"><i></i>审核信息提交成功</div>
            <p v-if="!emailFlag">我们将会在两个工作日内对您的信息进行审核，审核结果会通过邮件形式发送到您的邮箱，请注意查收。</p>
            <p v-if="emailFlag">我们将会在两个工作日内对您的信息进行审核，审核结果会通过邮件形式发送到“<span>{{email}}</span>”，请注意查收。</p>
        </div>
    </div>
</template>

<script>
    import cookie from '@/util/cookie'
    export default {
      name:'artistAuditSuccess',
      data () {
        return {
            email:'',
            emailFlag: true
        }
      },
        mounted(){
          if(cookie.get('email') && cookie.get('email')!=''){
              this.emailFlag = true
              this.email = cookie.get('email')
          } else {
              this.emailFlag = false
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
    .audit-success-wrapper {
        width: 100%;
        height: 100%;
    }
    .audit-success-con {
        padding: 45px 33px 0 33px;
    }
    .audit-success-title {
        display: flex;
        justify-content: center;
        font-size: 18px;
        color: #7679fe;
    }
    .audit-success-title i {
        display:inline-block;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background: url(../../../static/img/audit-success-icon.png) no-repeat;
    }
    .audit-success-con p {
        margin-top: 25px;
        font-size: 15px;
        color: #a6acbc;
        line-height: 26px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .audit-success-con p span {
        color: #f4bf64;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>
