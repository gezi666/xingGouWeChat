<template>
    <!--媒体关注趋势-->
    <div class="internet-wrap">
        <div class="internet-list">
            <div class="title-line">
                <span class="title-label media"><i></i>媒体关注趋势</span>
            </div>
            <div class="chart-box">
                <LineChart chartid= "trend1" :optionlist="linedatalist" />
            </div>
        </div>

        <!--各媒体类型关注趋势-->
        <div class="internet-list">
            <div class="title-line">
                <span class="title-label follow"><i></i>各媒体类型关注趋势</span>
            </div>
            <div class="chart-box">
                <LineLeChart lechartid= "trend2" :leoptionlist="legenddatalist" />
            </div>
        </div>

        <!--总体好评率-->
        <div class="internet-list">
            <div class="title-line">
                <span class="title-label rraise"><i></i>总体好评率</span>
            </div>
            <div class="chart-box">
                <PieChart piechartid= "evaluate1"  :pieoptionlist="piedatalist" />
            </div>
        </div>

        <!--媒体关注地域分布-->
        <div class="internet-list">
            <div class="title-line">
                <span class="title-label region"><i></i>媒体关注地域分布</span>
            </div>
            <div class="chart-box">
                <MapChart mapid= "mapchart" :mapoptionlist="mapdatalist"/>
            </div>
        </div>

        <!--相关动态-->
        <div class="internet-list">
            <div class="title-line">
                <span class="title-label dynamic"><i></i>相关动态</span>
            </div>
            <div class="movie-content">
                <div class=" dynamic-list">
                    <div class='sportline'><i class='sport'></i></div>
                    <ul class="movie-list">
                        <li v-for="item in dynamicList">
                            <p class="time">{{item.publishtime}}</p>
                            <p class="introduction">{{item.title}}</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import api from '@/api'
    import cookie from '@/util/cookie'
    import LineChart from '@/components/echarts/line.vue'
    import LineLeChart from '@/components/echarts/line-legend.vue'
    import PieChart from '@/components/echarts/pie.vue'
    import MapChart from '@/components/echarts/map.vue'
    import { Indicator } from 'mint-ui';
    export default {
        name:'internet',
        data () {
            return {
                status: 0,
                linedatalist:{},
                legenddatalist:{},
                piedatalist:{},
                mapdatalist:[],
                dynamicList:[]
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
                    this.loadinfo()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods:{
            loadinfo(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                //媒体关注趋势
                api.starDetailsNetAttTrend(this.$route.params.id)
                    .then(res=>{
                        this.linedatalist =res.data[0]
                    })

                //各媒体类型关注趋势
                api.starDetailsNetAttTrendEach(this.$route.params.id)
                    .then(res=>{
                        this.legenddatalist =res.data[0]
                    })

                //总体好评率
                api.starDetailsNetPraisering(this.$route.params.id)
                    .then(res=>{
                        this.piedatalist = res.data[0]
                        this.piedatalist.opinion = ['好评', '差评']
                        this.piedatalist.opinionData = [
                            {
                                name: '好评',
                                value: this.piedatalist.praise
                            },{
                                name: '差评',
                                value: this.piedatalist.badreview
                            }
                        ]
                    })

                //区域分布
                api.starDetailsNetArealDistribution(this.$route.params.id)
                    .then(res=>{
                        this.mapdatalist = res.data
                        this.mapdatalist.forEach(function (item) {
                            item.name = item.area
                            item.value = item.count
                        })
                    })

                //相关动态
                api.starDetailsNetDynamic(this.$route.params.id)
                    .then(res=>{
                        Indicator.close();
                        this.dynamicList = res.data
                    })
            }
        },
        components:{
            LineChart,
            LineLeChart,
            PieChart,
            MapChart
        }
    }
</script>

<style scoped>
    .internet-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #f2f7ff;
    }
    .internet-wrap .internet-list{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 15px;
        padding-bottom:10px;
    }
    .internet-wrap .internet-list:not(:last-child){
        box-shadow: 0 0 5px #e1ebfc;
    }
    .internet-wrap .internet-list .title-line{
        width: 100%;
        height: 45px;
        box-sizing: border-box;
        padding: 0 15px;
        border-bottom: 1px solid #e9e8e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .internet-wrap .internet-list .title-label{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .internet-wrap .internet-list .title-label i{
        width: 18px;
        height: 15px;
        margin-right: 6px;
    }
    .internet-wrap .internet-list .media i{
        background: url(../../../static/img/media-icon.png) center no-repeat;
        background-size: 100% 100%;
    }
    .internet-wrap .internet-list .follow i{
        background: url(../../../static/img/follow-icon.png) center no-repeat;
        background-size: 100% 100%;
    }
    .internet-wrap .internet-list .rraise i{
        background: url(../../../static/img/rraise-icon.png) center no-repeat;
        background-size: 100% 100%;
    }
    .internet-wrap .internet-list .region i{
        background: url(../../../static/img/region-icon.png) center no-repeat;
        background-size: 100% 100%;
    }
    .internet-wrap .internet-list .dynamic i{
        background: url(../../../static/img/dynamic-icon.png) center no-repeat;
        background-size: 100% 100%;
    }
    .internet-wrap .internet-list .chart-box{
        box-sizing: border-box;
        width: 100%;
        margin: 10px auto;
    }
    .internet-wrap .internet-list:nth-child(1) .chart-box{
        height:165px;
    }
    .internet-wrap .internet-list:nth-child(2) .chart-box{
        height:165px;
    }
    .internet-wrap .internet-list:nth-child(3) .chart-box{
        height:220px;
    }
    .internet-wrap .internet-list:nth-child(4) .chart-box{
        height:260px;
    }
    .internet-wrap  .movie-content{
        padding:15px;
    }
    .internet-wrap  .dynamic-list{
        position: relative;
    }
    .internet-wrap  .dynamic-list .sportline{
        position: absolute;
        left: 7px;
        width: 3px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .internet-wrap  .dynamic-list .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .internet-wrap  .dynamic-list .movie-list{
        position: relative;
        box-sizing: border-box;
        width: 100%;
    }
    .internet-wrap  .dynamic-list .movie-list::before{
        position: absolute;
        content: '';
        top: 0;
        left: 6px;
        width: 5px;
        height: 8px;
        background: #fff;
    }
    .internet-wrap  .movie-list li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding-left: 30px;
        margin-bottom: 26px;
    }
    .internet-wrap  .movie-list li:last-child{
        margin-bottom: 0;
    }
    .internet-wrap  .movie-list li::before{
        position: absolute;
        content: '';
        left: -1.4px;
        top: 5px;
        width: 18px;
        height: 18px;
        background: url("../../../static/img/list-ico.png") center no-repeat;
        background-size: cover;
        background-position: -39px 0;
        z-index: 2;
    }
    .internet-wrap  .movie-list li:first-child::before{
        left: -4px;
        top: 2px;
        width: 25px;
        height: 25px;
        background-position: 0 0;
    }
    .internet-wrap  .movie-list li:last-child::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 6px;
        width: 5px;
        height: calc(100% - 14px);
        background: #fff;
    }
    .internet-wrap   .movie-list li .time{
        color: #8d72ff;
        font-size: 20px;
        font-weight: bold;
    }
    .internet-wrap  .movie-list li .introduction{
        color: #666;
        font-size: 14px;
    }
</style>
