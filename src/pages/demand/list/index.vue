<template>
    <div class="demand-list">
        <div class="nav">
            <router-link :to="{ name: 'movieDemandList'}">电影</router-link>
            <router-link :to="{ name: 'tvDemandList'}">电视剧</router-link>
            <router-link :to="{ name: 'adDemandList'}">广告</router-link>
            <router-link :to="{ name: 'showDemandList'}">演出</router-link>
            <router-link  :to="{ name: 'varietyDemandList'}">综艺节目</router-link>
            <router-link  :to="{ name: 'internetDemandList'}">网络</router-link>
            <router-link  :to="{ name: 'comicDemandList'}">动漫</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'demandListIndex',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .demand-list{
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    .demand-list .nav{
        padding: 0 8px;
        height:39px;
        width: auto;
        border-top: 2px solid #eaf1fd;
        border-bottom:1px solid #dbdbdb ;
        box-shadow: 0 3px 5px #e9f0fb;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;
    }
    .demand-list .nav a{
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        line-height: 39px;
        padding: 0 8px;
        margin-right: 22px;
        font-size: 14px;
        color: #333;
    }
    .demand-list .nav a:last-child{
        margin-right: 0;
    }
    .demand-list .nav .router-link-active{
        color: #9e5bfc !important;
        font-size: 15px;
        text-decoration: none;
        border-bottom: 1px solid #9e5bfc;
    }
</style>
