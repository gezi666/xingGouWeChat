<template>
    <div class="music-wrap">
        <div class="nav">
            <router-link class="records" :to="{ name: 'records',params:{ id: this.$route.params.id }}" @click.native="adShowFlag = false">唱片</router-link>
            <router-link class="shows" :to="{ name: 'shows',params:{ id: this.$route.params.id }}" @click.native="adShowFlag = false">演出</router-link>
        </div>
        <div class="music-details">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name:'music',
        data () {
            return {
            }
        },
        mounted(){
//            this.$router.push({name:'records',params:{ id: this.$route.params.id }})
        },
        methods:{
        }
    }
</script>

<style scoped>
    .music-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #f2f7ff;
        padding-bottom: 36px;
    }
    .music-details{
        /*min-height: calc(100vh - 268px);*/
        min-height: calc(100vh - 261px);
        background: #fff;
    }
    .music-wrap .nav{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 18px 15px 18px 34px;
        background: #fff;
    }
    .music-wrap .nav a{
        position: relative;
        display: inline-block;
        height: 14px;
        line-height: 14px;
        color: #999;
        font-size: 14px;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .music-wrap .nav a::before{
        position: absolute;
        display: inline-block;
        content: '';
        top: 0;
        left: -18px;
        width: 13px;
        height: 13px;
    }
    .music-wrap .nav a.router-link-active{
        color: #9e5bfc;
    }
    .music-wrap .nav a.records{
        margin-right: 111px;
    }
    .music-wrap .nav a.records::before{
        background: url("../../../../static/img/record-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .music-wrap .nav a.router-link-active.records::before{
        background: url("../../../../static/img/record-ico-ac.png") center no-repeat;
        background-size: 100% 100%;
    }
    .music-wrap .nav a.shows::before{
        background: url("../../../../static/img/schedule-shows-ico.png") center no-repeat;
        background-size: 100% 100%;
    }
    .music-wrap .nav a.router-link-active.shows::before{
        background: url("../../../../static/img/schedule-shows-ico-ac.png") center no-repeat;
        background-size: 100% 100%;
    }
</style>
