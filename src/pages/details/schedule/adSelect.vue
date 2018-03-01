<template>
    <div class="ad-select-wrap">
        <p v-if="flag && selectList.length == 0" class="nodata">暂无数据</p>
        <span v-if="selectList.length > 0" class="ad-type" v-for="item in selectList">{{item}}</span>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import api from '@/api'
    import cookie from '@/util/cookie'
    import { Indicator } from 'mint-ui';
    export default {
        name:'adSelect',
        data () {
            return {
//                selectList:["美妆", "家具", "美食", "养生"]
                selectList:[],
                status: 0,
                flag: false
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
                    this.getSelectedAD()
                }
            } else {
                MessageBox.alert('请登录','').then(()=>{
                    this.$router.push({name:'login'})
                })
            }
        },
        methods:{
            getSelectedAD(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.getReceivedAD({
                    "starid": this.$route.params.id
                })
                    .then(res=>{
                        Indicator.close();
                        if(res.advertisements && res.advertisements !== ''){
//                            this.selectList = res.advertisements.split(",")
                            if(res.advertisements.split(",").length > 0){
                                res.advertisements.split(",").forEach((item)=>{
                                    if(item !=''){
                                        this.selectList.push(item)
                                    }
                                })
                            }
                        }
                        this.flag = true
                    })
            }
        }
    }
</script>

<style scoped>
    .ad-select-wrap{
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        padding: 15px 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .nodata{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
    }
    .ad-select-wrap .ad-type{
        flex: none;
        display: inline-block;
        width: 25%;
        color: #333;
        font-size: 14px;
        margin-bottom: 32px;
        text-align: center;
    }
</style>
