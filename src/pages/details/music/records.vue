<template>
    <div class="records-wrap">
        <div class="records-con">
            <p v-if="flag && totalCount == 0" class="nodata">暂无数据</p>
            <div v-if="totalCount> 0" class='sportline'><i class='sport'></i></div>
            <ul  v-if="totalCount > 0" class="records-list">
                <li v-for="item in recordsList">
                    <div class="records-base">
                        <!--<img :src="item.imageurl | imgHttp" alt="唱片海报" class="poster">-->
                        <img src="../../../../static/img/default2.png" alt="唱片海报" class="poster" ref="recordsPostImg">
                        <div class="time-score">
                            <p class="records-time">{{item.publishtime ? item.publishtime.replace('年','-').replace('月','-').replace('日','') : ''}}</p>
                            <p class="records-name" :title="item.recordname">{{item.recordname | handleName}}</p>
                            <div class="score-con">
                                <span class="score-score-num">{{item.doubanscore}}</span>
                                <div class="records-score-con">
                                    <div class="records-score-star"><star :score="item.doubanscore"></star></div>
                                    <p class="records-score-people">{{item.commentcount}}人评价</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="records-info">
                        <p><span class="info-label">发行时间：</span><span class="info-value">{{item.publishtime}}</span></p>
                        <p><span class="info-label">唱片公司：</span><span class="info-value">{{item.recordcompany}}</span></p>
                        <p><span class="info-label">唱片制作人：</span><span class="info-value">{{item.producer}}</span></p>
                        <p><span class="info-label">虾米播放量：</span><span class="info-value">{{item.xiamiplayamount}}万</span></p>
                        <p><span class="info-label">获奖记录：</span><span class="info-value">{{item.winningrecord}}</span></p>
                    </div>
                </li>
            </ul>
        </div>
        <p v-if="currentPage < totalPage" class="load-more" @click="getRecodrsList"><span>展开查看更多</span></p>
    </div>
</template>

<script>
    import baseconfig from '@/assets/js/config'
    import { MessageBox } from 'mint-ui'
    import cookie from '@/util/cookie'
    import api from '@/api'
    import star from '@/components/star/star.vue'
    import { Indicator } from 'mint-ui';
    export default {
        name:'records',
        data () {
            return {
                recordsList:[],
                status: 0,
                flag: false,
                totalCount: 0,
                totalPage: 0,
                currentPage: 0,
                pageCount: 10
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
                    this.getRecodrsList()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods:{
            getRecodrsList(){
                this.currentPage ++
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starDetailsRecords({
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
                            this.recordsList = this.recordsList.concat(res.data)

                            let oldNum = (this.currentPage-1)*this.pageCount
                            if (res.data.length > 0) {
                                let _this = this
                                res.data.forEach((v, i) => {
                                    let newImg = new Image();
                                    newImg.src = this.imgHttp(v.imageurl)
                                    newImg.onload = function () {
                                        _this.$refs.recordsPostImg[oldNum+i].src = newImg.src
                                    }
                                })
                            }
                        } else{
                            console.log(res.msg)
                        }
                    })
            },
            imgHttp(value){
                if(value){
                    if(value.match('http://')){
                        return value
                    }else {
                        return baseconfig.baseURL+'/wechatpersonalinfo/readimg?imgname='+value
                    }
                }
            }
        },
        filters:{
            handleName(val){
                return val ? (val.length > 6 ? val.substring(0,5)+'...' : val) : ''
            }
        },
        components:{
            star
        }
    }
</script>

<style scoped>
    .records-wrap{
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
    .records-con{
        position: relative;
        box-sizing: border-box;
        width: 100%;
    }
    .records-con .sportline{
        position: absolute;
        left: 7px;
        width: 3px;
        height: 100%;
        background: -webkit-linear-gradient(#6e43fc,#8b9aee);
        background: -o-linear-gradient(#6e43fc,#8b9aee);
        background: -moz-linear-gradient(#6e43fc,#8b9aee);
        background: linear-gradient(#6e43fc,#8b9aee);
    }
    .records-con .sport{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../../../static/img/spot.png') center;
        background-size: 100%;
    }
    .records-con .records-list{
        box-sizing: border-box;
        width: 100%;
    }
    .records-con .records-list::before{
        position: absolute;
        content: '';
        top: 0;
        left: 6px;
        width: 5px;
        height: 10px;
        background: #fff;
    }
    .records-con .records-list li{
        position: relative;
        box-sizing: border-box;
        width: calc(100% - 33px);
        border: 1px solid #c065fb;
        border-radius: 3px;
        margin: 0 0 27px 33px;
        padding: 11px 10px;
    }
    .records-con .records-list li::before{
        position: absolute;
        content: '';
        top: 8px;
        left: -4px;
        width: 6px;
        height: 6px;
        background: #fff;
        border: 1px solid #c065fb;
        transform: skewX(-8deg) rotate(37deg);
        border-right: none;
        border-top: none;
    }
    .records-con .records-list li::after{
        position: absolute;
        content: '';
        top: 2px;
        left: -36px;
        width: 22px;
        height: 22px;
        background: url(../../../../static/img/list-ico.png) center no-repeat;
        background-size: auto;
        background-position: -63px -2px;
    }
    .records-con .records-list li:first-child::after{
        width: 26px;
        height: 26px;
        top: -1px;
        left: -38.5px;
        background-position: 0 0;
    }
    .records-list .records-base{
        box-sizing: border-box;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin-bottom: 14px;
    }
    .records-list .records-base img{
        flex: auto;
        box-sizing: border-box;
        width: 50%;
        margin-right: 13px;
        border: 1px solid #c065fb;
        border-radius: 7px;
        overflow: hidden;
    }
    .records-list .time-score{
        flex: auto;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .records-list .time-score .records-time{
        text-align: left;
        color: #8d72ff;
        font-size: 20px;
        font-weight: bold;
    }
    .records-list .time-score .records-name{
        text-align: left;
        color: #000;
        font-size: 18px;
    }
    .records-list .score-con{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .records-list .score-con .score-score-num{
        color: #8d72ff;
        font-size: 37px;
        font-weight: bold;
    }
    .records-list .score-con .records-score-con{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }
    .records-list .score-con .records-score-star{
        margin-bottom: 7px;
    }
    .records-list .score-con .records-score-people{
        flex: none;
        color: #0196f4;
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: nowrap;
    }
    .records-info p{
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .records-info p .info-label{
        color: #666;
        font-size: 14px;
        max-width: 85px;
        flex: none;
    }
    .records-info p .info-value{
        color: #333;
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
