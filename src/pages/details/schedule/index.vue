<template>
    <div class="schedule-wrap">
        <div v-show="shadowFlag" class="shadow" @click="closeShadow"></div>
        <div class="nav">
            <router-link class="change-menu movie" :to="{ name: 'movieSchedule',params:{ id: this.$route.params.id }}" @click.native="closeShadow">影视</router-link>
            <div class="change-menu ad">
                <router-link class="ad" :to="{ name: 'adIndex',params:{ id: this.$route.params.id }}" @click.native.self="closeShadow">广告</router-link>
                <i class="selece-adType" @click.self="showShadow"></i>
            </div>
            <router-link class="change-menu show" :to="{ name: 'showsSchedule',params:{ id: this.$route.params.id }}" @click.native="closeShadow">演出</router-link>
            <div :class="['switch',{'show-switch': adShowFlag}]">
                <router-link class="ad-switch" :to="{ name: 'adSchedule',params:{ id: this.$route.params.id }}" @click.native="closeShadow">已接广告</router-link>
                <router-link class="ad-switch" :to="{ name: 'adSelect',params:{ id: this.$route.params.id }}" @click.native="closeShadow">可接广告</router-link>
            </div>
        </div>
        <div class="schedule-details">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name:'schedule',
        data () {
            return {
                shadowFlag: false,
                adShowFlag: false,
                adFlag: 1
            }
        },
        methods:{
            closeShadow(){
                this.shadowFlag = false
                this.adShowFlag = false
            },
            showShadow(){
                this.shadowFlag = !this.shadowFlag
                this.adShowFlag = !this.adShowFlag
            }
        }
    }
</script>

<style scoped>
    .schedule-wrap{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-height: calc(100vh - 175px);
        background: #fff;
    }
    .schedule-wrap .shadow{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        background: transparent;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .schedule-wrap .nav{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 0 16px 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .schedule-wrap .nav .change-menu{
        z-index: 2;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .schedule-wrap .nav .switch{
        position: absolute;
        bottom: 5px;
        right: 33%;
        width: 95px;
        height: 0;
        opacity: 0;
        overflow: hidden;
        border-radius: 3px;
        box-shadow: 0 1px 10px 0 #bebfc1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        z-index: 2;
        transition: all .2s;
    }
    .schedule-wrap .nav .show-switch{
        opacity: 1;
        height: 80px;
        bottom: -75px;
    }
    .schedule-wrap .nav .switch .ad-switch{
        flex: auto;
        font-size: 14px;
        color: #333;
        background-color: #f7faff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav .switch  .ad-switch.router-link-active{
        background: #fff;
        color: #9e6bfc;
    }
    .nav .switch  .ad-switch:first-child{
        background-image: url("../../../../static/img/slide.png");
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .schedule-wrap .nav a{
        position: relative;
        display: inline-block;
        height: 14px;
        line-height: 14px;
        color: #999;
        font-size: 14px;
    }
    .schedule-wrap .nav a::before{
        position: absolute;
        display: inline-block;
        content: '';
        top: 0;
        left: -18px;
        width: 13px;
        height: 13px;
    }
    .schedule-wrap .nav a.movie::before{
        top: -1px;
        background: url("../../../../static/img/schedule-movie-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap .nav a.ad::before{
        background: url("../../../../static/img/schedule-ad-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap .nav a.show::before{
        background: url("../../../../static/img/schedule-shows-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap  .nav .router-link-active{
        color: #9e5bfc;
        text-decoration: none;
    }
    .schedule-wrap .nav a.router-link-active.movie::before{
        background: url("../../../../static/img/schedule-movie-ico-ac.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap .nav a.router-link-active.ad::before{
        background: url("../../../../static/img/schedule-ad-ico-ac.png") center no-repeat;
        background-size: 100% 100%;
    }
    .ad{
        position: relative;
    }
    .schedule-wrap .nav .ad.router-link-active + .selece-adType{
        position: absolute;
        display: inline-block;
        content: '';
        top: 5px;
        right: -22px;
        width: 15px;
        height: 8px;
        background: url("../../../../static/img/down-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap .nav a.router-link-active.show::before{
        background: url("../../../../static/img/schedule-shows-ico-ac.png") center no-repeat;
        background-size: 100% 100%;
    }
    .schedule-wrap .schedule-details{
        width: 100%;
    }
</style>
