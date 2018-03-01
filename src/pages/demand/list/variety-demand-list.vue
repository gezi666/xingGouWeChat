<template>
    <div class="variety-demand-wrap">
        <div class="modal" v-if="showModal" @click="modal"></div>
        <div v-if="OriginalTotalCount > 0" class="filter-wrap">
            <div class="filter-item-wrap place" :class="{'active': filterFlag===1}" @click="toFilter(1)">
                <p class="filter-item-label">地点</p>
                <ul class="drop-down-box">
                    <li class="filter-item" :class="{'active': placeItemFlag===index}" v-for="(item,index) in placeList" @click.self="placeFilter(index,item)">{{item}}</li>
                </ul>
            </div>
            <div class="filter-item-wrap month" :class="{'active': filterFlag===2}" @click="toFilter(2)">
                <p class="filter-item-label">发布月份</p>
                <ul class="drop-down-box">
                    <li class="filter-item" :class="{'active': timeItemFlag===index}" v-for="(item,index) in timeList" @click.self="timeFilter(index,item)">{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="list-con">
            <p v-if="demandList.length == 0" class="nodata">{{loadResult}}</p>
            <div v-if="demandList.length > 0" class='sportline'><i class='sport'></i></div>
            <ul v-if="demandList.length > 0" class="demand-list">
                <li v-for="item in demandList">
                    <p class="time">{{item.demandtime === ''? '-' : item.demandtime}}</p>
                    <p class="introduction">{{item.demandcontent ? item.demandcontent : '暂无'}}</p>
                    <p v-if="item.status === 0" class="see contact" @click="seeContactInformation(item.id)">查看联系方式</p>
                    <p v-if="item.status === 1" class="see person">{{item.name ? item.name : '暂无'}}</p>
                    <p v-if="item.status === 1" class="see tel">{{item.phone ? item.phone : (item.email ? item.email : '暂无')}}</p>
                </li>
            </ul>
        </div>
        <p v-if="currentPage < totalPage" class="load-more" @click="loadMore"><span>展开查看更多</span></p>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import api from '@/api'
    import cookie from '@/util/cookie'
    import { Indicator } from 'mint-ui';
    export default {
        name:'varietyDemandList',
        data () {
            return {
                status: 0,
                loadResult:'',
                showModal: false,
                filterFlag: 0,
                placeItemFlag: 0,
                timeItemFlag: 0,
                placeList:[],
                timeList:[],
                currentPlace:'',
                currenttime:'',
                OriginalTotalCount: 0,
                totalCount: 0,
                totalPage: 0,
                currentPage: 0,
                pageCount: 20,
                demandList:[
//                    {
//                        "demandtime": "2017-09",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "location": "121",
//                        "id": 4,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "status": 0
//                    },
//                    {
//                        "demandtime": "2017-05",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "phone": "12152646554",
//                        "location": "北京",
//                        "id": 3,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "email": "1213@qq.com",
//                        "name": "王先生",
//                        "status": 1
//                    },
//                    {
//                        "demandtime": "2017-09",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "location": "121",
//                        "id": 4,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "status": 0
//                    },
//                    {
//                        "demandtime": "2017-05",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "phone": "",
//                        "location": "121",
//                        "id": 3,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "email": "1213@qq.com",
//                        "name": "王先生",
//                        "status": 1
//                    },
//                    {
//                        "demandtime": "2017-09",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "location": "121",
//                        "id": 4,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "status": 0
//                    },
//                    {
//                        "demandtime": "2017-05",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "phone": "1213",
//                        "location": "121",
//                        "id": 3,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "email": "1213",
//                        "name": "王先生",
//                        "status": 1
//                    },
//                    {
//                        "demandtime": "2017-09",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "location": "121",
//                        "id": 4,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "status": 0
//                    },
//                    {
//                        "demandtime": "2017-05",
//                        "demandcontent": "需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述需求信息描述",
//                        "phone": "1213",
//                        "location": "121",
//                        "id": 3,
//                        "demandtype": 2,
//                        "userid": 2,
//                        "email": "1213",
//                        "name": "王先生",
//                        "status": 1
//                    }
                ]
            }
        },
        mounted(){
            this.getDemandList({
                "demandtime": '',
                "location": ''
            })
            this.getFilterItem()
        },
        methods:{
            modal(){
                this.showModal = false
                this.filterFlag = 0
            },
            toFilter(i){
                if(this.filterFlag === i){
                    this.filterFlag = 0
                    this.showModal= false
                } else{
                    this.filterFlag = i
                    this.showModal= true
                }
            },
            placeFilter(i,name){
                this.placeItemFlag = i
                this.showModal= false
                this.currentPlace = (name==='不限'? '': name)
                this.getFilterDemandList({
                    "demandtime": this.currenttime,
                    "location": this.currentPlace
                })
            },
            timeFilter(i,time){
                this.timeItemFlag = i
                this.showModal= false
                this.currenttime = (time==='不限' ? '': time)
                this.getFilterDemandList({
                    "demandtime": this.currenttime,
                    "location": this.currentPlace
                })
            },
            seeContactInformation(i){
                if(cookie.get('userid') && cookie.get('userid')!=''){
                    MessageBox.confirm('购买后才能查看联系方式,是否购买？','').then((action)=>{
                        if(action === 'confirm'){
                            //这里需要跳到需求的购买页  注意
                            this.$router.push({ name: 'demandPayment',params:{ demandid: i }})
                        } else{
                            return
                        }
                    })
                } else {
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                    })
                }
            },
            getFilterItem(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getDemandLoactionAndTimeList({
                    "demandtype": 5
                })
                    .then((res)=>{
                        Indicator.close();
                        if(res.result === '1'){
                            this.placeList = res.data[0].locationlist
                            this.placeList.unshift('不限')
                            this.timeList = res.data[0].demandtimelist
                            this.timeList.unshift('不限')
                        } else{
                            console.log(res.msg)
                        }
                    })
            },
            getDemandList(params){
                this.currentPage ++
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getDemandList(Object.assign(params,{
                    "demandtype": 5,
                    "page": this.currentPage,
                    "rows": this.pageCount
                }))
                    .then((res=>{
                        Indicator.close();
                        if(res.result === '1'){
                            this.OriginalTotalCount = res.count
                            this.totalCount = res.data.length
                            if(this.totalCount == 0){
                                this.loadResult = '暂无数据'
                            } else{
                                this.totalPage = Math.ceil( res.count / this.pageCount)
                                this.demandList = this.demandList.concat(res.data)
                            }
                        } else{
                            console.log(res.msg)
                        }
                    }))
            },
            getFilterDemandList(params){
                this.loadResult = ''
                this.totalPage = 0
                this.currentPage = 1
                this.demandList = []
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getDemandList(Object.assign(params,{
                    "demandtype": 5,
                    "page": this.currentPage,
                    "rows": this.pageCount
                }))
                    .then((res=>{
                        Indicator.close();
                        if(res.result === '1'){
                            this.totalCount = res.data.length
                            if(this.totalCount == 0){
                                this.loadResult = '暂无数据'
                            } else{
                                this.totalPage = Math.ceil( res.count / this.pageCount)
                                this.demandList = res.data
                            }
                        } else{
                            console.log(res.msg)
                        }
                    }))
            },
            loadMore(){
                this.getDemandList({
                    "demandtime": this.currenttime,
                    "location": this.currentPlace
                })
            }
        }
    }
</script>

<style scoped>
    .variety-demand-wrap{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-height:  calc(100vh - 42px);
        background: #fff;
        padding: 10px 15px 24px;
    }
    .modal{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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
    .filter-wrap{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .filter-wrap .filter-item-wrap{
        position: relative;
        box-sizing: border-box;
        height: 100%;
        line-height: 40px;
        padding: 0 30px 0 10px;
        z-index: 2;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .filter-wrap .place{
        margin-right: 72px;
    }
    .filter-wrap .filter-item-label{
        position: relative;
        display: inline-block;
        height: 14px;
        line-height: 14px;
        color: #999;
        font-size: 14px;
    }
    .filter-wrap .filter-item-label::before{
        position: absolute;
        content: '';
        top: 3px;
        right: -20px;
        display: inline-block;
        width: 15px;
        height: 8px;
        background: url("../../../../static/img/down.png") center no-repeat;
        background-size: cover;
    }
    .filter-wrap .drop-down-box{
        position: absolute;
        top: 38px;
        left: -8px;
        width: 95px;
        max-height: 0;
        overflow: hidden;
        overflow-y: auto;
        border-radius: 3px;
        box-shadow: 0 1px 10px 0 #bebfc1;
        z-index: 2;
        transition: all .2s;
    }
    .month .drop-down-box{
        left: 3px;
    }
    .filter-wrap .drop-down-box .filter-item{
        color: #333;
        font-size: 14px;
        width: 100%;
        height: 41px;
        line-height: 41px;
        text-align: center;
        background-color: #f7faff;
        background-image: url("../../../../static/img/slide.png");
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .filter-wrap .drop-down-box .filter-item:last-child{
        background-image: none;
    }
    .filter-wrap .drop-down-box .filter-item.active{
        background-color: #fff;
        color: #9e5bfc;
    }
    .filter-wrap .filter-item-wrap.active .filter-item-label{
        color: #9e5bfc;
    }
    .filter-wrap .filter-item-wrap.active .filter-item-label::before{
        background: url("../../../../static/img/up.png") center no-repeat;
        background-size: cover;
    }
    .filter-wrap .filter-item-wrap.active .drop-down-box{
        max-height: 165px;
    }
    .nodata{
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
    }
    .list-con{
        position: relative;
        width: 100%;
        margin-top: 16px;
    }
    .list-con .sportline{
        position: absolute;
        left: 7px;
        width: 3px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .list-con .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .list-con .demand-list{
        position: relative;
        box-sizing: border-box;
        width: 100%;
    }
    .list-con .demand-list::before{
        position: absolute;
        content: '';
        top: 0;
        left: 6px;
        width: 5px;
        height: 8px;
        background: #fff;
    }
    .list-con li{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding-left: 30px;
        margin-bottom: 26px;
    }
    .list-con li:last-child{
        margin-bottom: 0;
    }
    .list-con li::before{
        position: absolute;
        content: '';
        left: -1.2px;
        top: 5px;
        width: 18px;
        height: 18px;
        background: url("../../../../static/img/list-ico.png") center no-repeat;
        background-size: cover;
        background-position: -39px 0;
        z-index: 2;
    }
    .list-con li:first-child::before{
        left: -4px;
        top: 2px;
        width: 25px;
        height: 25px;
        background-position: 0 0;
    }
    .list-con .demand-list li:last-child::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 6px;
        width: 5px;
        /*height: calc(100% - 14px);*/
        height: 25px;
        background: #fff;
    }
    .list-con li .time{
        color: #8d72ff;
        font-size: 20px;
        font-weight: bold;
    }
    .list-con li .introduction{
        color: #666;
        font-size: 14px;
    }
    .list-con li .see{
        position: relative;
        padding-left: 25px;
        margin-top: 15px;
        color: #9e5bfc;
        font-size: 14px;
    }
    .list-con li .see::before{
        position: absolute;
        top: 3px;
        left: 0;
        content: '';
        display: inline-block;
        width: 15px;
        height: 14px;
    }
    .list-con li .contact::before{
        background: url("../../../../static/img/see-contact.png");
        background-size: cover;
    }
    .list-con li .person::before{
        background: url("../../../../static/img/person.png");
        background-size: cover;
    }
    .list-con li .tel::before{
        background: url("../../../../static/img/tel.png");
        background-size: cover;
    }
    .list-con li .person{
        color: #666;
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
