<template>
    <div class="info-wrap">
        <ul class="detail-wrap">
            <li><span class="label">职业：</span><span class="value">{{profession}}</span></li>
            <li><span class="label">籍贯：</span><span class="value">{{detailsList.birthplace}}</span></li>
            <li><span class="label">经纪公司：</span><span class="value">{{detailsList.agency}}</span></li>
            <li v-if="ifdisplay === 1"><span class="label">联系方式：</span><span class="value">{{detailsList.phone ? detailsList.phone : (detailsList.wechat ? detailsList.wechat : detailsList.email)}}</span></li>
            <li><span class="label">微博：</span><span class="value">{{detailsList.weiboname}}</span></li>
            <li><span class="label">毕业院校：</span><span class="value">{{detailsList.graduatedschool}}</span></li>
            <li><span class="label">代言广告：</span></li>
            <li class="inner-list-wrap">
                <div class='sportline'><i class='sport'></i></div>
                <ul class="inner-list">
                    <li v-for="item in newAdList"><span class="time">{{item | handleTime}}</span><span class="name ad-name">{{item | handleName}}</span></li>
                </ul>
            </li>
            <li><span class="label">获得奖项：</span></li>
            <li class="inner-list-wrap">
                <div class='sportline'><i class='sport'></i></div>
                <ul class="inner-list">
                    <li v-for="item in neRrewardList">
                           <span class="time">{{item | handleTime}}</span><span class="name reward-name">{{item | handleName}}</span>
                        <!--<p><span class="time">{{item.time}}</span><span class="name compete-name">{{item.competeName}}</span></p>-->
                        <!--<p class="name reward-name">{{item.rewardName}}<span class="reward-label">（获奖）</span></p>-->
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import api from '@/api'
    import cookie from '@/util/cookie'
    import { Indicator } from 'mint-ui';
    export default {
        name:'baseInfo',
        data () {
            return {
                ifdisplay:1,
                detailsList:{},
                profession:'',
                adList:[],
                newAdList:[],
                rewardList:[],
                neRrewardList:[]
            }
        },
        mounted(){
            this.starBaseInfo()
        },
        methods:{
            isContain(arry){
                if(arry.length >0){
                    let containFlag = 0
                    arry.forEach(item=>{
                        if(['演员', '主持',  '歌手', '导演','编剧','出品人','制片人','其他'].indexOf(item.replace(/(^\s*)|(\s*$)/g, "")) != -1){
                            containFlag = 0
                        } else{
                            containFlag = 1
                        }
                    })
                    return containFlag === 1 ? true : false
                }
            },
            starBaseInfo(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starBaseInfo({
                    "starid": this.$route.params.id
                })
                    .then(res=>{
                        Indicator.close();
                        cookie.set("status", res.data[0].status,60*60*1000)
                        this.ifdisplay = res.data[1].ifdisplay
                        this.detailsList = res.data[2]
                        this.rewardList = res.data[2].getreward!==''? res.data[2].getreward.split(";") : ''
                        this.adList = res.data[2].advertising!==''? res.data[2].advertising.split(";") : ''

                        //明星职业处理
                        if(this.detailsList.profession.match(",")){
                            this.detailsList.profession = this.detailsList.profession.split(',')

                            if(this.detailsList.profession.indexOf("其他") != -1 && this.isContain(this.detailsList.profession)){
                                this.detailsList.profession.splice(this.detailsList.profession.indexOf('其他'),1)
                            }

                            if(this.detailsList.profession.length >0){
                                this.profession = []
                                this.detailsList.profession.forEach((item)=>{
                                    if(item !=''){
                                        this.profession.push(item)
                                    }
                                })
                                this.profession = this.profession.join(",")
                            }
                        } else {
                            this.profession = this.detailsList.profession
                        }

                        if(this.rewardList.length > 0){
                            this.rewardList.forEach((item)=>{
                                if(item.replace(/(^\s+)|(\s+$)/g,"") !== "" && item.replace(/(^\s+)|(\s+$)/g,"") !== "*"){
                                    this.neRrewardList.push(item)
                                }
                            })
                        }
                        if(this.adList.length > 0) {
                            this.adList.forEach((item) => {
                                if (item.replace(/(^\s+)|(\s+$)/g, "") !== "" && item.replace(/(^\s+)|(\s+$)/g, "") !== "*") {
                                    this.newAdList.push(item)
                                }
                            })
                        }
                    })
            }
        },
        filters:{
            handleTime(val){
                if(val!==''){
                    return val.indexOf("*").toString() ? (val.substring(0,val.indexOf("*")) !==''? val.substring(0,val.indexOf("*")) : '-' ): '-'
                }
            },
            handleName(val){
                if(val!=='') {
                    if(val.indexOf("*").toString()){
                        return val.substring(val.indexOf("*")+1)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .info-wrap{
        width: 100%;
        background: #fff;
    }
    .detail-wrap{
        box-sizing: border-box;
        width: 100%;
        padding: 24px 15px;
    }
    .detail-wrap li{
        width: 100%;
        margin-bottom: 26px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .detail-wrap li span{
        display: inline-block;
        font-size: 14px;
    }
    .label{
        color: #666;
        width: 80px;
        flex: none;
    }
    .value{
        color: #000;
        flex: auto;
    }
    .inner-list-wrap{
        position: relative;
    }
    .inner-list-wrap .sportline{
        position: absolute;
        left: 7px;
        width: 2px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .inner-list-wrap .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .inner-list{
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }
    .inner-list::before{
        position: absolute;
        content: '';
        top: 0;
        left: 7px;
        width: 3px;
        height: 10px;
        background: #fff;
    }
    .inner-list li:last-child::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 6px;
        width: 3px;
        height: calc(100% - 13px);
        background: #fff;
    }
    .inner-list li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding-left: 22px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .inner-list li:last-child{
        margin-bottom: 0;
    }
    .inner-list li::before{
        position: absolute;
        content: '';
        left: -2.5px;
        top: 0;
        width: 20px;
        height: 20px;
        background: url("../../../static/img/list-ico.png") center no-repeat;
        background-position: -63px -3px;
        transform: scale(.5);
        z-index: 2;
    }
    .inner-list li:first-child::before{
        left: -5px;
        top: -3px;
        width: 26px;
        height: 26px;
        background-position: 0 0;
    }
    .inner-list li span{
        display: inline-block;
    }
    .inner-list .time{
        flex-wrap: nowrap;
        flex: none;
        color: #8d72ff;
        font-size: 14px;
        font-weight: bold;
        margin-right: 13px;
    }
    .inner-list .name{
        color: #000;
        font-size: 14px;
    }
</style>
