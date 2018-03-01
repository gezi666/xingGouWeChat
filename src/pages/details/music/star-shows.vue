<template>
    <div class="shows-wrap">
        <div class="shows-list">
            <p v-if="flag && totalCount == 0" class="nodata">暂无数据</p>
            <div v-if="totalCount > 0" class='sportline'><i class='sport'></i></div>
            <ul v-if="totalCount > 0"  class="shows-content" v-for="(item,index) in showsList" :starid="item.starid">
                <li class="ul-li">
                    <p class="time">{{item.performancetime | handleTime}}</p>
                    <ol class="introduction">
                        <li>
                            <!--<img :src="item.imageurl | imgHttp">-->
                            <img src="../../../../static/img/default2.png" alt="演出海报" ref="showsPostImg">
                        </li>
                        <li class="shows-text">
                            <h4 :title="item.performancename">{{item.performancename | handleName}}</h4>
                            <p>地点: <b>{{item.performancelocation}}</b></p>
                            <p class="price-p">票价区间: <span><b>{{item.farerange}}</b>元</span></p>
                        </li>
                    </ol>
                </li>
                <li class="ul-li">
                    <p class="title-text">关注趋势</p>
                    <p v-if="item.linedatalist.opinionData.length == 0" class="nodata">暂无数据</p>
                    <p class="chart-box" v-if="item.linedatalist.opinionData.length > 0">
                        <LineChart :chartid= " 'trend' + index "  :optionlist="item.linedatalist"/>
                    </p>
                </li>
                <li class="ul-li">
                    <p class="title-text">评价</p>
                    <p v-if="item.piedatalist.opinionData[0].value =='' && item.piedatalist.opinionData[1].value == '' && item.piedatalist.opinionData[2].value ==''" class="nodata">暂无数据</p>
                    <p class="chart-box" v-if="item.piedatalist.opinionData[0].value !='' || item.piedatalist.opinionData[1].value != '' || item.piedatalist.opinionData[2].value !=''">
                        <PieChart :piechartid= " 'evaluate' + index "  :pieoptionlist="item.piedatalist" />
                    </p>
                </li>
            </ul>
        </div>
        <p v-if="currentPage < totalPage" class="load-more" @click="getShowsList"><span>展开查看更多</span></p>
    </div>
</template>

<script>
    import baseconfig from '@/assets/js/config'
    import { MessageBox } from 'mint-ui'
    import cookie from '@/util/cookie'
    import api from '@/api'
    import LineChart from '@/components/echarts/line.vue'
    import PieChart from '@/components/echarts/pie.vue'
    import { Indicator } from 'mint-ui';
    export default {
        name:'shows',
        data () {
            return {
                flag: false,
                status: 0,
                totalCount: 0,
                totalPage: 0,
                currentPage: 0,
                pageCount: 10,
                showsList:[
//                    {
//                        "starid": 1,
//                        "performancelocation": "首都工人体育馆",
//                        "farerange": "380-1980",
//                        "imageurl": "../../../../static/img/showStar1.png",
//                        "performancetime": "2016-10",
//                        "performancename": '"自饰"北京演唱会"',
//                        "piedatalist" :{
//                            "opinion":['精彩','一般','失望'],
//                            "opinionData":[
//                                {
//                                    "name": '精彩',
//                                    "value": 1232
//                                },{
//                                    "name": '一般',
//                                    "value": 432
//                                },{
//                                    "name": '失望',
//                                    "value": 121
//                                }]
//                        },
//                        "linedatalist":{
//                            "opinion":["2017-10-15","2017-10-15","2017-10-15","2017-10-15","2017-10-15"],
//                            "opinionData":[
//                                {
//                                    "name": '2017-10-15',
//                                    "value": 4433
//                                },{
//                                    "name": '2017-10-15',
//                                    "value": 12
//                                },{
//                                    "name": '2017-10-15',
//                                    "value": 124
//                                },{
//                                    "name": '2017-10-15',
//                                    "value": 12
//                                },{
//                                    "name": '2017-10-15',
//                                    "value": 124
//                                }]
//                        }
//                     }
                ]
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
                    this.getShowsList()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods:{
            imgHttp(value){
                if(value){
                    if(value.match('http://')){
                        return value
                    }else {
                        return baseconfig.baseURL+'/wechatpersonalinfo/readimg?imgname='+value
                    }
                }
            },
            getShowsList(){
                this.currentPage ++
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starDetailsShows({
                    "starid": this.$route.params.id,
                    "page": this.currentPage,
                    "rows": this.pageCount
                })
                    .then(res=>{
                        Indicator.close();
                        this.flag = true
                        if(res.result === '1') {
                            this.totalCount = res.count
                            this.totalPage = Math.ceil( res.count / this.pageCount)
                            this.showsList = this.showsList.concat(res.data)

                            let oldNum = (this.currentPage-1)*this.pageCount
                            if(res.data.length > 0){
                                let _this = this
                                res.data.forEach(function(item1,i){
                                    let newImg = new Image();
                                    newImg.src = _this.imgHttp(item1.imageurl)
                                    newImg.onload = function (){
                                        _this.$refs.showsPostImg[oldNum+i].src = newImg.src
                                    }

                                    item1.linedatalist = {
                                        opinion:[],
                                        opinionData:[]
                                    }
                                    item1.piedatalist = {
                                        opinion:['精彩','一般','失望'],
                                        opinionData:[
                                            {
                                                name: '精彩',
                                                value: item1.performancepraisering[0].praise
                                            },{
                                                name: '一般',
                                                value: item1.performancepraisering[0].general
                                            },{
                                                name: '失望',
                                                value: item1.performancepraisering[0].badreview
                                            }
                                        ]
                                    }
                                    item1.performanceattentiontrend.forEach(function(item2){
                                        item1.linedatalist.opinion.push(item2.publishtime)
                                        item1.linedatalist.opinionData.push({
                                            name: item2.publishtime,
                                            value: item2.count
                                        })
                                    })
                                })
                            }
                        } else{
                            console.log(res.msg)
                        }
                    })
            }
        },
        filters:{
            handleTime(val){
                return val ? val.replace('年','-').replace('月','') : ''
            },
            handleName(val){
                return val ? (val.length > 10 ? val.substring(0,9)+'...' : val) : ''
            }
        },
        components:{
            LineChart,
            PieChart
        }
    }
</script>

<style scoped>
    .shows-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        padding: 0 16px 6px;
        border-bottom: 1px solid #e9e8e9;
    }
    .nodata{
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
    }
    .shows-list{
        position: relative;
        width: 100%;
    }
    .shows-list .sportline{
        position: absolute;
        left: 7px;
        width: 3px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .shows-list .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .shows-list .shows-content{
        position: relative;
        box-sizing: border-box;
        width: 100%;
    }
    .shows-list .shows-content::before{
        position: absolute;
        content: '';
        top: 0;
        left: 6px;
        width: 5px;
        height: 8px;
        background: #fff;
    }
    .shows-content li.ul-li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        /*padding:0 0 15px 30px ;*/
        padding-left: 30px;
        margin-bottom: 27px;
    }
    .shows-content li.ul-li::before{
        position: absolute;
        content: '';
        left: -1px;
        top: 2px;
        width: 18px;
        height: 18px;
        background: url("../../../../static/img/list-ico.png") center no-repeat;
        background-size: cover;
        background-position: -39px 0;
    }
    .shows-content li.ul-li:first-child::before{
        left: -4px;
        top: -1px;
        width: 25px;
        height: 25px;
        background-position: 0 0;
    }
    .shows-list li.ul-li .time{
        color: #8d72ff;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .shows-list li.ul-li .introduction{
        color: #666;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .shows-list .introduction li>img{
        width:78px;
        height:107px;
        border:1px solid #ba5fec;
        border-radius: 6px;
    }
    .shows-list .introduction li.shows-text{
        margin-left: 8px;
    }
    .shows-list .ul-li .title-text{
        font-size: 13px;
        color:#333 ;
        font-weight: 600;
    }
    .shows-list .introduction li.shows-text h4{
        font-size: 20px;
        color: #000;
        font-weight: 600;
    }
    .shows-list .introduction li.shows-text p{
        font-size: 16px;
        color: #666666;
        margin-top:11px;
    }
    .shows-list .introduction li.shows-text p:last-child{
        margin-top:5px;
    }
    .shows-list .introduction li.shows-text p>b{
        color: #333333;
    }
    .shows-list .introduction .price-p span{
        color: #8d72ff;
    }
    .shows-list .introduction .price-p span>b{
        font-size: 20px;
    }
    .shows-list .ul-li:last-child .chart-box{
        border-bottom:1px dashed #c7c7c7;
    }
    .shows-list .ul-li .chart-box{
        box-sizing: border-box;
        width:100%;
        height:130px;
        margin:10px 0;
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
