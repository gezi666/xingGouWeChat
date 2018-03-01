<template>
    <div class="main-wrap">
        <div class="banner-wrap">
            <div v-if="flag">
                <p class="edits-icon" @click="editJump()"></p>
            </div>
            <div class="star-img"><img src="../../../static/img/default1.png" alt="艺人照片" ref="starImg"></div>
            <ul class="base-wrap">
                <li><span class="base-item ivalue star-name">{{starInfo.name}}</span><span class="base-item star-profession" :title="profession">{{profession}}</span></li>
                <li class="mline"><span class="base-item ivalue base-value praise-value">{{starInfo.jumpupindex}}</span><span class="base-item base-label praise-label">口碑蹿升指数</span></li>
                <li><span class="base-item ivalue base-value business-value">{{starInfo.logbusinessvalueindex}}</span><span class="base-item base-label business-label">商业价值指数</span></li>
            </ul>
        </div>
        <div class="nav">
            <router-link :to="{ name: 'baseInfo',params:{ id: this.$route.params.id }}" @click.native="chageAc"><span @click='tab(true)'>基本信息</span></router-link>
            <a :class="menuFlag ==='project'? 'active':''" @click="checkStatus1"><span @click='tab(true)'>项目</span></a>
            <a :class="menuFlag ==='schedule'? 'active':''" @click="checkStatus2('档期')"><span @click='tab(true)'>档期</span></a>
            <a :class="menuFlag ==='movies'? 'active':''" v-if="pro==='影视'" @click="checkStatus2('影视')"><span @click='tab(false)'>影视</span></a>
            <a :class="menuFlag ==='music'? 'active':''" v-if="pro==='音乐'" @click="checkStatus2('音乐')"><span @click='tab(true)'>音乐</span></a>
            <a :class="menuFlag ==='internet'? 'active':''" @click="checkStatus2('互联网')"><span @click='tab(false)'>互联网</span></a>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import config from '@/assets/js/config'
    import api from '@/api'
    import cookie from '@/util/cookie'
    export default {
        name:'details',
        data () {
            return {
                pro:'',
                starInfo:{},
                profession:'',
                status: 0,
                flag:true,
                menuFlag:'',
                userState:'',
                userStarid:[]
            }
        },
        mounted(){
            this.userStarid = cookie.get('userStarid').split(",");
            this.userState=cookie.get("userState");//状态值 0-无  1-有
            if(this.userState != 0){
                let ids = this.$route.params.id.toString();
                if(cookie.get('userStarid').split(",").indexOf(ids)>-1){
                    this.flag=true
                }else{
                    this.flag=false
                }
            }else {
                this.flag=false
            }
            this.starBaseInfo()
            if (this.$route.name==='internet') {
                this.flag=false
                this.menuFlag = 'internet'
            } else if (this.$route.name==='baseInfo'){
                this.menuFlag = 'baseInfo'
            } else if (this.$route.name==='project'){
                this.menuFlag = 'project'
            } else if (this.$route.name==='schedule'){
                this.menuFlag = 'schedule'
            }else if (this.$route.name==='movies'){
                this.menuFlag = 'movies'
            }else if (this.$route.name==='music'){
                this.menuFlag = 'music'
            }else if (this.$route.name==='internet'){
                this.menuFlag = 'internet'
            }
        },
        methods:{
            tab(flag){
                let ids = this.$route.params.id.toString()
                if(this.userState === 0|| this.userStarid.indexOf(ids)==-1 ){
                    this.flag=false
                }else {
                    if(!flag){
                        this.flag=false
                    }else {
                        this.flag=true
                    }
                }
            },
            chageAc(){
                this.menuFlag = 'baseInfo'
            },
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
                api.starBaseInfo({
                    "starid": this.$route.params.id
                })
                    .then(res=>{
                        this.status = res.data[0].status
                        cookie.set("status", this.status,60*60*1000)
                        this.pro = res.data[1].pro
                        this.starInfo = res.data[2]
                        this.starInfo.starimg = config.baseURL+this.starInfo.starimg
                        let newImg = new Image();
                        newImg.src = this.starInfo.starimg
                        let _this = this
                        newImg.onload = function (){
                            _this.$refs.starImg.src = newImg.src
                        }

                        //明星职业处理
                        if(this.starInfo.profession.match(",")){
                            this.starInfo.profession = this.starInfo.profession.split(',')

                            if(this.starInfo.profession.indexOf("其他")!= -1 && this.isContain(this.starInfo.profession)){
                                this.starInfo.profession.splice(this.starInfo.profession.indexOf('其他'),1)
                            }

                            if(this.starInfo.profession.length >0){
                                this.profession = []
                                this.starInfo.profession.forEach((item)=>{
                                    if(item !=''){
                                        this.profession.push(item)
                                    }
                                })
                                this.profession = this.profession.join(",")
                            }
                        } else {
                            this.profession = this.starInfo.profession
                        }

                    })
            },
            checkStatus1(){
                if(this.status===0){
                    MessageBox.alert('请登录','').then(()=>{
                        this.$router.push({name:'login'})
                    })
                } else {
                    this.menuFlag = 'project'
                    this.$router.push({ name: 'project',params:{ id: this.$route.params.id }})
                }
            },
            checkStatus2(menu){
                if(this.status===0){
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
                    switch (menu){
                        case '档期' :
                            this.menuFlag = 'schedule'
                            this.$router.push({ name: 'movieSchedule',params:{ id: this.$route.params.id }})
                            break
                        case '影视' :
                            this.menuFlag = 'movies'
                            this.$router.push({ name: 'movies',params:{ id: this.$route.params.id }})
                            break
                        case '音乐' :
                            this.menuFlag = 'music'
                            this.$router.push({ name: 'records',params:{ id: this.$route.params.id }})
                            break
                        case '互联网' :
                            this.menuFlag = 'internet'
                            this.$router.push({ name: 'internet',params:{ id: this.$route.params.id }})
                            break
                        default :
                            break
                    }
                }
            },
            editJump(){
                if(this.$route.name==="baseInfo"){
                    //基本信息
                    this.$router.push({name:'baseInfoEdit',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="project"){
                    //项目
                    this.$router.push({name:'starProject',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="movieSchedule"){
                    //档期--影视
                    this.$router.push({name:'scheduleEdit',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="adSelect"){
                    //档期-可接广告
                    this.$router.push({name:'scheduleEdit',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="adSchedule"){
                    //档期-已接广告
                    this.$router.push({name:'scheduleEdit',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="showsSchedule"){
                    //档期-演出
                    this.$router.push({name:'scheduleEdit',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="records"){
                    //唱片
                    this.$router.push({name:'recordEditor',params:{id:this.$route.params.id }})
                }else if(this.$route.name==="shows"){
                    //演出
                    this.$router.push({name:'starShow',params:{id:this.$route.params.id }})
                }
            }
        }
    }
</script>

<style scoped>
    .main-wrap{
        width: 100vw;
        background: #f2f7ff;
    }
    .main-wrap .banner-wrap {
        position: relative;
        width: 100%;
        height: 130px;
        background: url("../../../static/img/banner-bg.png") center no-repeat;
        background-size: 100% 100%;
    }
    .banner-wrap .star-img{
        position: absolute;
        top: calc(35px / 2);
        left: 9%;
        box-sizing: border-box;
        width: calc( 176px / 2);
        height: calc( 176px / 2);
        border: 2px solid #8a3fc7;
        border-radius: 5px;
        background: #eff5f7;
        overflow: hidden;
    }
    .banner-wrap .star-img img{
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0 0;
    }
    .banner-wrap .base-wrap{
        position: absolute;
        top: 19px;
        left: 38%;
        width: 56%;
    }
    .base-wrap li{
        height: 29px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        padding: 0;
    }
    .base-wrap li.mline{
        margin-top: 9px;
    }
    .base-wrap li .base-item{
        display: inline-block;
        width: 49%;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ivalue{
        margin-left: 2%;
    }
    .base-wrap li .star-name{
        color: #8d72ff;
        font-size: 20px;
        font-weight: 600;
    }
    .base-wrap li .star-profession{
        color: #666;
        font-size: 14px;
    }
    .base-wrap li .base-value{
        color: #fff;
        font-size: 20px;
        font-weight: 800;
    }
    .base-wrap li .base-label{
        color: #fff;
        font-size: 13px;
    }
    .nav{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        margin-top: 5px;
        background: #f7faff;
        border-bottom: 1px solid #d6dce7;
        box-shadow: 0 1px 5px 1px #e9f1fc;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .nav a{
        color: #666;
        font-size: 14px;
    }
    .nav a.active,
    .nav .router-link-active{
        color: #9e5bfc;
        /*font-size: 15px;*/
        font-weight: 600;
        text-decoration: none;
    }
    .main-wrap .edits-icon{
        width:15px;
        height:16px;
        background: url("../../../static/img/edits-icon.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        top:10px;
        right:16px;
    }
</style>
