<template>
    <!--<div class="movies-list" v-if="this.user.useId || cookie">-->
    <div class="movies-list">
        <div class="item-wrap">
            <div class="title-line">
                <span class="title-label tv"><i></i>电视剧收视率排行</span>
                <div class="tv-chart-legend">
                    <span class="left-legend right-legend"><i></i>最高收视率</span>
                    <span class="left-legend"><i></i>平均收视率</span>
                </div>
            </div>
            <ul class="list-wrap tv-list">
                <li class="nodata" v-if="tvList.length==0">{{tvFlag}}</li>
                <li v-for="(item, index) in tvList" :class="{active:index === 0}">
                    <div class="chart-wrap">
                        <!--<img class="poster" :src="item.imageurl" />-->
                        <img class="poster" src="../../../static/img/default2.png" ref="tvPostImg"/>
                        <div class="chart"><BarChart :barchartid="'audiencerating'+index" :highestratings="item.highestratings" :ageratings="item.ageratings" :maxdata="item.maxdata" :showpercent="true" :optiondata="['平均收视率','最高收视率']"></BarChart></div>
                    </div>
                    <div class="rank-info">
                        <p class="rank-num">{{item.rank}}</p>
                        <p class="rank-name" :title="item.tvseriesname">{{item.tvseriesname}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item-wrap">
            <div class="title-line">
                <span class="title-label tv-online"><i></i>在线播放量排行</span>
            </div>
            <ul class="list-wrap tv-online-list">
                <li class="nodata" v-if="movieOnline.length==0">{{movieOnlineFlag}}</li>
                <li v-for="(item, index) in movieOnline">
                    <div class="chart-wrap">
                        <p class="tv-name">{{item.tvseriesname}}</p>
                        <div class="chart"><BarOnlinePlay :baronlineplayid="'tvonlineplay'+index" :onlineplayback="item.onlineplayback" :tvseriesname="item.tvseriesname" :maxdata="item.maxdata"></BarOnlinePlay></div>
                    </div>
                    <div class="rank-info">
                        <p class="onlineplay-num">{{item.onlineplayback}}万次</p>
                        <p class="rank-num">{{item.rank}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item-wrap">
            <div class="title-line">
                <span class="title-label movie"><i></i>电影票房排行</span>
                <div class="tv-chart-legend">
                    <span class="left-legend right-legend"><i></i>国内票房</span>
                    <span class="left-legend"><i></i>海外票房</span>
                </div>
            </div>
            <ul class="list-wrap tv-list movie-list">
                <li class="nodata" v-if="movieBoxOffice.length==0">{{movieBoxOfficeFlag}}</li>
                <li v-for="(item, index) in movieBoxOffice">
                    <div class="chart-wrap">
                        <!--<img class="poster" :src="item.imageurl" />-->
                        <img class="poster" src="../../../static/img/default2.png" ref="moviePostImg"/>
                        <!--<div class="chart"><BarBoxOffice :barboxofficeid="'barboxoffice'+index" :domesticboxoffice="item.domesticboxoffice" :foreignboxoffice="(item.foreignboxoffice>0)? item.foreignboxoffice+1000 : item.foreignboxoffice" :maxdata="item.maxdata"></BarBoxOffice></div>-->
                        <div class="chart"><BarChart :barchartid="'barboxoffice'+index" :highestratings="item.domesticboxoffice" :ageratings="(item.foreignboxoffice>0)? item.foreignboxoffice+3000 : item.foreignboxoffice" :maxdata="item.maxdata" :showpercent="false" :optiondata="['海外票房','国内票房']"></BarChart></div>
                    </div>
                    <div class="rank-info">
                        <p class="rank-num">{{index+1}}</p>
                        <p class="rank-name" :title="item.moviename">{{item.moviename}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item-wrap">
            <div class="title-line">
                <span class="title-label movie-online"><i></i>在线播放量排行</span>
            </div>
            <ul class="list-wrap tv-online-list movie-online-list">
                <li class="nodata" v-if="movieOnlineMovie.length==0">{{movieOnlineMovieFlag}}</li>
                <li v-for="(item, index) in movieOnlineMovie">
                    <div class="chart-wrap">
                        <p class="moviename"><span class="rank">{{index + 1}}</span><span class="name">{{item.moviename}}</span></p>
                        <div class="chart"><BarOnlinePlay :baronlineplayid="'meonlineplay'+index" :onlineplayback="item.onlineplayback" :maxdata="item.maxdata"></BarOnlinePlay></div>
                    </div>
                    <div class="rank-info">
                        <p class="rank-name">{{item.onlineplayback}}万次</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item-wrap">
            <div class="title-line">
                <span class="title-label movie-score"><i></i>影视作品豆瓣评分</span>
            </div>
            <div v-if="movielistlen > 0" class="movie-score-wrap">
                <mt-swipe :auto="0" @change="getNewList">
                    <mt-swipe-item v-for="index in movielistlen" :key="index">
                        <ul class="movie-list-con">
                            <li v-for="(item,index2) in movieList">
                                <!--<img :src="item.imageurl" />-->
                                <img class="post-img" src="../../../static/img/default2.png" ref="postImg"/>
                                <p class="movie-name">{{item.name | filterName}}</p>
                                <div class="score-con">
                                    <span class="movie-score-num">{{item.doubanscore}}</span>
                                    <div class="movie-score-con">
                                        <div class="movie-score-star"><star :score="item.doubanscore"></star></div>
                                        <p class="movie-score-people">{{item.comments}}人评价</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="nodata-douban" v-if="movielistlen==0">{{movieListFlag}}</div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import BarChart from '@/components/echarts/bar-audience-rating.vue'
    import BarOnlinePlay from '@/components/echarts/bar-online-play.vue'
//    import BarBoxOffice from '@/components/echarts/bar-box-office.vue'
    import star from '@/components/star/star.vue'
    import api from '@/api'
    import cookie from '@/util/cookie'

    export default {
        name: 'movies',
        data () {
            return {
                cookie: '',
                tvList:[
//                    {
//                        "imageurl": "http://entdata-pic.stor.vipsinaapp.com/2014051003/poster_movie_tv/thumb_140200_536d2898e7efe.jpg",
//                        "tvseriesname": "围城",
//                        "onlineplayback": "12919",
//                        "rank": 1
//                    },
//                    {
//                        "imageurl": "http://imgwx3.2345.com/dypcimg/tv/img/f/14/sup44040_223x310.jpg",
//                        "tvseriesname": "不谈爱情",
//                        "onlineplayback": "",
//                        "rank": 2
//                    },
//                    {
//                        "imageurl": "http://imgwx1.2345.com/dypcimg/tv/img/a/3/s10947_223x310.jpg",
//                        "tvseriesname": "卡拉是条狗",
//                        "onlineplayback": "",
//                        "rank": 3
//                    }
                ],
                tvFlag: '数据加载中...',
                movieOnline:[
//                    {
//                        "domesticboxoffice": "11985",
//                        "imageurl": "http://entdata-pic2.stor.sinaapp.com/2017020819/thumb_140200_589afbc517b9c111111111111111111111111111.jpg",
//                        "foreignboxoffice": "210",
//                        "moviename": "决战食神"
//                    },
//                    {
//                        "domesticboxoffice": "0",
//                        "imageurl": "http://entdata-pic2.stor.sinaapp.com/2017030707/thumb_140200_58bdf4fa9d5cbp2410379359_副本.jpg",
//                        "foreignboxoffice": "0",
//                        "moviename": "断片儿"
//                    }
                ],
                movieOnlineFlag: '数据加载中...',
                movieBoxOffice:[
//                    {
//                        "releasetime": "2017-12-29",
//                        "imageurl": "http://entdata-pic2.stor.sinaapp.com/2017030707/thumb_140200_58bdf4fa9d5cbp2410379359_副本.jpg",
//                        "onlineplayback": 12919,
//                        "moviename": "断片儿"
//                    },
//                    {
//                        "releasetime": "2017-02-10",
//                        "imageurl": "http://entdata-pic2.stor.sinaapp.com/2017020819/thumb_140200_589afbc517b9c111111111111111111111111111.jpg",
//                        "onlineplayback": 10919,
//                        "moviename": "决战食神"
//                    }
                ],
                movieBoxOfficeFlag: '数据加载中...',
                movieOnlineMovie:[],
                movieOnlineMovieFlag: '数据加载中...',
                movielistlen: 0,
                movieList:[],
                movieListFlag: '数据加载中...',
                page:1,
                rows:4,
                status: 0
            }
        },
        mounted () {
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
                    this.loadmovieinfo()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }

        },
        methods:{
            getNewList(index){
                //初始化豆瓣评分列表
                api.starDetailsValveScore({
                    "starid":this.$route.params.id,
                    "page": index+1,
                    "rows":4
                })
                    .then(res=>{
                        for(let i = 0;i < res.data.length;i++){
                            res.data[i].doubanscore=res.data[i].doubanscore ? res.data[i].doubanscore.toFixed(1) : ''
                        }
                        this.movieList = res.data;
                        if(this.movieList.length > 0){
                            this.movieList.forEach((v,i)=>{
                                let newImg = new Image()
                                newImg.src = v.imageurl
                                newImg.onload = function (){
                                    document.querySelectorAll('.mint-swipe-item.is-active .post-img')[i].src = v.imageurl
                                }
                            })
                        }
                    })
            },
            loadmovieinfo(){
                //电视剧收视率排行
                api.starDetailsMovieTv(this.$route.params.id)
                    .then(res=>{
                        if(res.data.length != 0){
                            let maxData = res.data[0].highestratings;
                            res.data.forEach(function (e) {
                                e.maxdata = maxData
                            });
                            this.tvList=res.data;
                            if(this.tvList.length > 0){
                                let _this = this
                                this.tvList.forEach((v,i)=>{
                                    let newImg = new Image();
                                    newImg.src = v.imageurl
                                    newImg.onload = function (){
                                        _this.$refs.tvPostImg[i].src = newImg.src
                                    }
                                })
                            }
                        } else{
                            this.tvFlag = this.tvList.length==0 ? '暂无数据': "数据加载中..."
                        }
                    });
                //电视剧在线播放总量
                api.starDetailsMovieOnline(this.$route.params.id)
                    .then(res=>{
                        if(res.data.length != 0){
                            let maxData = res.data[0].onlineplayback;
                            res.data.forEach(function (e) {
                                e.maxdata = maxData
                            });
                            this.movieOnline = res.data;
                        } else{
                            this.movieOnlineFlag = this.movieOnline.length==0 ? '暂无数据': "数据加载中..."
                        }
                    });
                //电影票房排行
                api.starDetailsMovieBoxOffice(this.$route.params.id)
                    .then(res=>{
                        if(res.data.length != 0){
                            let maxData = res.data[0].domesticboxoffice + res.data[0].foreignboxoffice;
                            maxData +=1000
                            res.data.forEach(function (e) {
                                e.maxdata = maxData
                            });
                            this.movieBoxOffice=res.data;
                            if(this.movieBoxOffice.length > 0){
                                let _this = this
                                this.movieBoxOffice.forEach((v,i)=>{
                                    let newImg = new Image();
                                    newImg.src = v.imageurl
                                    newImg.onload = function (){
                                        _this.$refs.moviePostImg[i].src = newImg.src
                                    }
                                })
                            }
                        } else{
                            this.movieBoxOfficeFlag = this.movieBoxOffice.length==0 ? '暂无数据': "数据加载中..."
                        }
                    });
                //电影在线播放总量
                api.starDetailsMovieOnlineMovie(this.$route.params.id)
                    .then(res=>{
                        if(res.data.length != 0){
                            let maxData = res.data[0].onlineplayback;
                            res.data.forEach(function (e) {
                                e.maxdata = maxData
                            });
                            this.movieOnlineMovie = res.data;
                        } else{
                            this.movieOnlineMovieFlag = this.movieOnlineMovie.length==0 ? '暂无数据': "数据加载中..."
                        }
                    });
                //初始化豆瓣评分列表
                api.starDetailsValveScore({
                    "starid":this.$route.params.id,
                    "page":1,
                    "rows":4
                })
                    .then(res=>{
                        if(res.count != 0){
                            this.movielistlen = Math.ceil(res.count / 4)
                            for(let i = 0;i < res.data.length;i++){
                                res.data[i].doubanscore=res.data[i].doubanscore ? res.data[i].doubanscore.toFixed(1) : ''
                            }
                            this.movieList = res.data;
                            if(this.movieList.length > 0){
                                let _this = this
                                this.movieList.forEach((v,i)=>{
                                    let newImg = new Image();
                                    newImg.src = v.imageurl
                                    newImg.onload = function (){
                                        document.querySelectorAll('.mint-swipe-item.is-active .post-img')[i].src = v.imageurl
                                    }
                                })
                            }
                        }else{
                            this.movieListFlag = this.movielistlen==0 ? '暂无数据': "数据加载中..."
                        }
                    })
            }
        },
        components:{
            BarChart,
            BarOnlinePlay,
//            BarBoxOffice,
            star
        },
        watch:{
            'user.useId'(val,oldval){
                if(val){
                    this.cookie =  cookie.get("useId")
                    this.loadmovieinfo()
                }
            }
        },
        filters:{
            filterName(val){
                if(val.length > 12){
                    return val = val.substring(0,10)+'...'
                } else{
                    return val
                }
            }
        }
    }
</script>

<style scoped>
    .movies-list{
        box-sizing: border-box;
        width: 100%;
        padding-bottom: 17px;
        margin-bottom: -17px;
        background: #f2f7ff;
        overflow: hidden;
    }
    .movies-list .item-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        margin-bottom: 15px;
    }
    .movies-list .item-wrap .title-line{
        box-sizing: border-box;
        padding: 0 15px;
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e9e8e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .item-wrap .title-label{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .item-wrap .title-label i{
        width: 13px;
        height: 13px;
        margin-right: 10px;
    }
    .item-wrap .tv i{
        background: url(../../../static/img/TVList.png) center no-repeat;
        background-size: 100% 100%;
    }
    .item-wrap .tv-chart-legend{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .item-wrap .left-legend{
        color: #666;
        font-size: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .item-wrap .right-legend{
        margin-right: 10px;
    }
    .item-wrap .left-legend i{
        width:8px;
        height:5px;
        margin-right: 5px;
        border-radius:2px;
        background: #56b7fe;
    }
    .item-wrap .right-legend i{
        background: #d583fd;
    }
    .list-wrap li{
        box-sizing: border-box;
        width: 100%;
        height: 65px;
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .list-wrap li:hover{
        background: #eff1ff;
    }
    .list-wrap li.nodata{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        font-size: 13px;
        height: 50px;
    }
    .list-wrap li .chart-wrap{
        box-sizing: border-box;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .list-wrap li .poster{
        width: 39px;
        height: 39px;
        border: 1px solid #bf6bfc;
        border-radius: 3px;
        object-fit: cover;
        object-position: 0 0;
    }
    .list-wrap li .chart{
        /*height: 39px;*/
        height: 100%;
        width: calc(100% - 45px);
        margin: 0 6px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .list-wrap li .rank-info{
        flex: none;
        height: 100%;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }
    .list-wrap li .rank-info p{
        color: #666;
        font-size: 13px;
    }
    .list-wrap li:hover .rank-info p{
        color: #333;
    }
    .tv-list li .rank-num{
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tv-list li:first-child .rank-num{
        border: 1px solid #fefe1c;
        border-radius: 100%;
        background: #ffcd00;
        box-shadow: 0 1px 10px 1px #e6e0c6;
        color: #fff !important;
    }
    .list-wrap li .rank-info .rank-name{
        width: 100%;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .tv-online i{
        background: url(../../../static/img/online-play-ico.png) center no-repeat;
        background-size: 100% 100%;
    }
    .movie i{
        background: url(../../../static/img/box-office-ico.png) center no-repeat;
        background-size: 100% 100%;
    }
    .movie-online i{
        background: url(../../../static/img/play-volume-ico.png) center no-repeat;
        background-size: 100% 100%;
    }
    .movie-score i{
        background: url(../../../static/img/movie-score-ico.png) center no-repeat;
        background-size: 100% 100%;
    }
    .tv-online-list li .chart-wrap{
        height: 39px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .tv-online-list li .chart-wrap{
        width: 70%;
    }
    .tv-online-list li .chart-wrap .tv-name{
        color: #666;
        font-size: 13px;
    }
    .tv-online-list li:hover .chart-wrap .tv-name{
        color: #333;
    }
    .tv-online-list li .chart-wrap .chart{
        flex: auto;
        height: 12px;
        width: 100%;
        margin: 0 6px 0 0;
    }
    .tv-online-list li .rank-info{
        flex: auto;
        height: 39px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .tv-online-list li .rank-info .onlineplay-num{
        color: #666;
        font-size: 12px;
        margin-right: 9px;
    }
    .tv-online-list li:hover .rank-info .onlineplay-num{
        color: #9f53ff;
    }
    .tv-online-list li .rank-info .rank-num,
    .movie-list li .rank-info .rank-num
    {
        width: 16px;
        height: 16px;
        color: #fff !important;
        border: 1px solid #ffff01;
        border-radius: 100%;
        background: #c9c9c9;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tv-online-list li:first-child .rank-info .rank-num,
    .movie-list li:first-child .rank-info .rank-num
    {
        background: #ffcd00;
    }
    .movie-online-list .moviename{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .movie-online-list .moviename .rank{
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 1px solid #ffff24;
        border-radius: 100%;
        background: #c9c9c9;
        color: #fff;
        font-size: 9px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .movie-online-list li:first-child .moviename .rank{
        background: #ffcd00;
    }
    .movie-online-list li .rank-name{
        color: #666;
        font-size: 12px;
    }
    .movie-online-list li:hover .rank-info .rank-name{
        color: #9f53ff;
    }
    .movie-score-wrap{
        box-sizing: border-box;
        width: 100%;
    }
    .movie-score-wrap .movie-list-con{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        /*padding: 15px 15px 20px;*/
        padding: 15px 15px 35px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .movie-score-wrap .mint-swipe{
        box-sizing: border-box;
        width: 100%;
        /*height: 185px;*/
        height: 200px;
    }
    .movie-score-wrap .movie-list-con li{
        flex: none;
        width: 80px;
        /*height: 110px;*/
        height: 160px;
        margin-right: calc((100% - 320px) / 3);
        overflow: hidden;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 10px 1px #edf3fc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        transition: all .3s;
    }
    .movie-score-wrap .movie-list-con li:last-child{
        margin-right: 0;
    }
    .movie-score-wrap .movie-list-con li:hover{
        transform:scale(1.1);
    }
    .movie-score-wrap .movie-list-con li img{
        width: 100%;
        /*height: 63px;*/
        height: 100px;
        /*object-fit: contain;*/
        /*object-position: 0 0;*/
    }
    .movie-score-wrap .movie-list-con .movie-name{
        text-align: center;
        color: #666;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .movie-score-wrap .movie-list-con .score-con{
        box-sizing: border-box;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .movie-score-wrap .movie-list-con .score-con .movie-score-num{
        color: #d95fff;
        font-size: 14px;
        font-weight: bold;
    }
    .movie-score-wrap .movie-list-con .score-con .movie-score-con{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .movie-score-wrap .movie-list-con .score-con .movie-score-people{
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #0093f7;
        font-size: 7px;
    }
    .nodata-douban{
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
