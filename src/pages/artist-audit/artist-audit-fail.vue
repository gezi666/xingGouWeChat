<template>
    <div class="audit-fail-wrapper">
        <div class="audit-fail-con">
            <div class="audit-fail-title"><i></i>审核信息提交失败</div>
            <p>审核信息提交失败，请重新上传信息。</p>
        </div>
        <div class="audit-fail-btn"><a @click="gotoArtistAudit">重新提交</a></div>
    </div>
</template>

<script>
  export default {
    name:'artistAuditFail',
    data () {
      return {
        params:'',
        storeFlag:false
      }
    },
    mounted(){
      this.getParams();
    },
    methods: {
      getParams(){
        this.params = this.$router.params;
      },
      gotoArtistAudit () {
        sessionStorage.flag = !this.flag;
        this.$router.push({name:'artistAudit'});
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
</style>
