<template>
    <div class="ad-schedule-wrap">
        <div class="ad-schedule-con">
            <p v-if="flag && totalCount == 0" class="nodata">暂无数据</p>
            <div v-if="totalCount > 0" class='sportline'><i class='sport'></i></div>
            <ul v-if="totalCount > 0" class="adlist">
                <li v-for="item in adList">
                    <p class="time">{{item.starttime === ''? '-' : item.starttime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{item.endtime === ''? '-' : item.endtime}}</p>
                    <p class="introduction">代言品牌：{{item.brand}}</p>
                    <p class="introduction">代言产品：{{item.product}}</p>
                </li>
            </ul>
        </div>
        <p v-if="currentPage < totalPage" class="load-more" @click="getReceivedAD"><span>展开查看更多</span></p>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import api from '@/api'
    import cookie from '@/util/cookie'
    import { Indicator } from 'mint-ui';
    export default {
        name:'adSchedule',
        data () {
            return {
                adList:[],
                status: 0,
                flag: false,
                totalCount: 0,
                totalPage: 0,
                currentPage: 0,
                pageCount: 20
            }
        },
        mounted(){
            if(cookie.get('userid') && cookie.get('userid')!=''){
                this.status = cookie.get('status')
                if(this.status === 0 ){
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                    })
                }
                else if(this.status===1){
                    MessageBox.confirm('购买后才能查看相关信息,是否购买？','').then((action)=>{
                        if(action === 'confirm'){
                            this.$router.push({ name: 'payment',params:{ id: this.$route.params.id }})
                        } else{
                            return
                        }
                    })
                }
                else{
                    this.getReceivedAD()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods:{
            getReceivedAD(){
                this.currentPage ++
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getReceivedADList({
                    "starid": this.$route.params.id,
                    "page":this.currentPage,
                    "rows":this.pageCount
                })
                    .then(res=>{
                        Indicator.close();
                        this.flag = true
                        this.totalCount = res.count
                        this.totalPage = Math.ceil( res.count / this.pageCount)
                        this.adList = this.adList.concat(res.data)
                    })
            }
        }
    }
</script>

<style scoped>
    .ad-schedule-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        padding: 24px 15px;
    }
    .nodata{
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
    }
    .ad-schedule-con{
        position: relative;
        width: 100%;
    }
    .ad-schedule-con .sportline{
        position: absolute;
        left: 7px;
        width: 3px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .ad-schedule-con .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .ad-schedule-con .adlist{
        position: relative;
        box-sizing: border-box;
        width: 100%;
    }
    .ad-schedule-con .adlist::before{
        position: absolute;
        content: '';
        top: 0;
        left: 6px;
        width: 5px;
        height: 8px;
        background: #fff;
    }
    .adlist li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding-left: 30px;
        margin-bottom: 26px;
    }
    .adlist li:last-child{
        margin-bottom: 0;
    }
    .adlist li::before{
        position: absolute;
        content: '';
        /*left: -1.6px;*/
        left: -1px;
        top: 5px;
        width: 18px;
        height: 18px;
        background: url("../../../../static/img/list-ico.png") center no-repeat;
        background-size: cover;
        background-position: -39px 0;
        z-index: 2;
    }
    .adlist li:first-child::before{
        left: -4px;
        top: 2px;
        width: 25px;
        height: 25px;
        background-position: 0 0;
    }
    .ad-schedule-con .adlist li:last-child::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 6px;
        width: 5px;
        height: calc(100% - 14px);
        background: #fff;
    }
    /*.ad-schedule-con .adlist li:first-child::after{*/
        /*position: absolute;*/
        /*content: '';*/
        /*!*width: 0 !important;*!*/
    /*}*/
    .ad-schedule-con li .time{
        color: #8d72ff;
        font-size: 20px;
        font-weight: bold;
    }
    .ad-schedule-con li .introduction{
        color: #666;
        font-size: 14px;
    }
    .load-more{
        margin-top: 20px;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .load-more span{
        position: relative;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        color: #999;
        font-size: 14px;
    }
    .load-more span::before{
        position: absolute;
        content: '';
        top: 10px;
        left: -18px;
        display: inline-block;
        width: 10px;
        height: 9px;
        background: url("../../../../static/img/down-icon.png");
        background-size: cover;
    }
</style>
