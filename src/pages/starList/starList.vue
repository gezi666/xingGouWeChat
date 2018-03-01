<template>
    <div class="star-list">
        <!--列表选择-->
        <div class="list-title">
            <ul>
                <li :class="{'active':current==2}" @click="tab(2)">全部</li>
                <li :class="{'active':current==1}" @click="tab(1)">男星</li>
                <li :class="{'active':current==0}" @click="tab(0)">女星</li>
                <!--<li @click="showSearch()"></li>-->
            </ul>
             <p :class="{'searchHide':searchState}">
                 <input type="text" placeholder="请输入明星姓名">
                 <span>搜索</span>
             </p>
        </div>

        <!--明星展示列表-->
        <div class="star-content">
            <div class="content-list" v-for="(item,index) in datalist" :id="item.id" @click="getDetails(index)">
                <!--<p class="con-img"><img :src="item.imageurl"  v-lazy="item.imageurl" ></p>-->
                <!--<p class="con-img"><img src="../../../static/img/default-img.png" ref="starImg"></p>-->
                <p class="con-img"><img src="../../../static/img/default1.png" ref="starImg"></p>
                <div class="content-right">
                    <ul>
                        <li>{{item.name}}</li>
                        <li>口碑蹿升指数: <span>{{item.jumpupindex}}</span></li>
                        <li>商业价值指数: <span>{{item.logbusinessvalueindex}}</span></li>
                    </ul>
                    <p class="con-icon"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import baseconfig from '@/assets/js/config'
    import api from '@/api';
    import { Indicator } from 'mint-ui';
    export default {
        name: 'starList',
        data () {
            return {
                current:2,//默认选全部
                searchState:false,//点击搜索按钮判断条件
                datalist:[]
            }
        },
        methods:{
            showSearch(){//搜索
                this.searchState=!this.searchState
            },
            tab(i){//类型选择
                this.current = i
                if(i===2){
                    this.getList()
                }else{
                    this.getList(this.current)
                }
            },
            getList(s){//明星展示列表
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starlist({
                    "sex": s || s===0 ? s : ''
                }).then((res)=>{
                    this.datalist =res.data;
                    if(this.datalist.length > 0){
                        Indicator.close();
                        let _this = this
                        this.datalist.forEach((v,i)=>{
//                        v.imageurl=baseconfig.baseURL.substring(0,baseconfig.baseURL.length-1)+v.imageurl
                            v.imageurl=baseconfig.baseURL + v.imageurl
                            let newImg = new Image();
                            newImg.src = v.imageurl
                            newImg.onload = function (){
                                _this.$refs.starImg[i].src = newImg.src
                            }
                        })
                    }
                })
            },
            getDetails(i){
                let starID = this.datalist[i].id
                this.$router.push({name:'baseInfo',params:{ id: starID }})
            }
        },
        mounted(){
            this.getList()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .star-list{
        width: 100vw;
        height:auto;
        background: #fff;
        box-sizing: border-box;
    }
    /*类型选择*/
    .star-list .list-title{
        width:100%;
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid #e1e3e8;
        background: #f7faff;
        position: relative;
    }
    .star-list .list-title ul{
        box-sizing: border-box;
        width: 100%;
        /*padding:0 15px;*/
        padding:0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #8a8b8c;
        position: relative;
        z-index: 100;
        background-color: #f7faff
    }
    .star-list .list-title ul li.active{
        color: #9e5bfc;
        font-size:15px
    }
    /*.star-list .list-title ul li:last-child{*/
        /*width: 22px;*/
        /*height:22px;*/
        /*background: url("../../../static/img/listSearch.png") no-repeat center;*/
        /*background-size:100% 100%;*/
    /*}*/
    .star-list .list-title p{
        height:0;
        opacity: 0;
        line-height: 50px;
        padding:0 15px;
        box-shadow: 0 2px 0 #e2ecfc;
        background: #f7faff;
        margin-top: 1px;
        overflow: hidden;
        z-index: -1;
        transition: all 0.4s;
    }
    .list-title p.searchHide{
        opacity: 1;
        height:59px;
    }
    .star-list .list-title p input{
        width:82%;
        height:25px;
        font-size: 12px;
        border:1px solid #cde9ff;
        border-radius: 3px;
        color: #a8a7a7;
        padding-left: 5px;
        background: #f7faff;
        outline: none;
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    /*placeholder字体颜色*/
    .star-list .list-title p input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:#a8a7a7;
    }
    .star-list .list-title span{
        display: inline-block;
        font-size:15px ;
        color: #9e5bfc;
        padding-left: 10px;
    }

    /*明星展示列表*/
    .star-list .star-content .content-list{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:10px 15px;
    }
    .star-list .star-content .content-right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: auto;
        margin-left:20px;
    }
    .star-list .star-content .content-list:nth-child(odd){
        background: #f2f7ff;
    }
    .star-list .star-content .content-list ul{
        /*margin:0 30px 0 25px;*/
    }
    .star-list .star-content .con-img img{
        width:90px;
        height:112px;
        box-shadow: 0 2px 5px #b5c6e2;
        border-radius: 6px;
        object-fit: contain;
    }
    .star-list .star-content .con-icon{
        width: 11px;
        height:18px;
        display: inline-block;
        background: url("../../../static/img/list-right.png") no-repeat center;
        background-size:100% 100%;
        margin-top: 20px;
    }
    .star-list .content-list ul li{
        color: #919295;
        font-size: 16px;
        padding-bottom: 1px;
    }
    .star-list .content-list ul li:first-child{
        font-size: 20px;
        color: #333333;
        padding-bottom: 10px;
    }
    .star-list .content-list ul li>span{
        color: #8d72ff;
        font-weight: bold;
        font-size: 20px;
        padding-left: 2px;
    }
</style>
