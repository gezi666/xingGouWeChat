<template>
    <div class="edit-main">
        <div class="nav">
            <router-link :to="{ name: 'baseInfoEdit',params:{ id: this.$route.params.id }}">基本信息</router-link>
            <router-link :to="{ name: 'starProject',params:{ id: this.$route.params.id }}">项目</router-link>
            <router-link :to="{ name: 'scheduleEdit',params:{ id: this.$route.params.id }}">档期</router-link>
            <router-link v-if="profession=='音乐'" :to="{ name: 'recordEditor',params:{ id: this.$route.params.id }}">唱片</router-link>
            <router-link v-if="profession=='音乐'" :to="{ name: 'starShow',params:{ id: this.$route.params.id }}">演出</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: 'editIndex',
        data () {
            return {
                profession:''
            }
        },
        mounted(){
            this.starBaseInfo()
//            this.$router.replace({ name: 'baseInfoEdit',params:{ id: this.$route.params.id }})
        },
        methods:{
            starBaseInfo(){
                api.starBaseInfo({
                    "starid": this.$route.params.id
                })
                    .then((res)=>{
                        if(res.data.length > 0 && res.data[1] && res.data[1].pro){
                            this.profession = res.data[1].pro
                        }
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .edit-main .nav{
        height:40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom:1px solid #dbdbdb ;
        box-shadow: 0 3px 5px #e9f0fb;
    }
    .edit-main .nav a{
        font-size: 14px;
        color: #333;
        padding:9px 7px ;
        box-sizing: border-box;
    }
    .edit-main .nav .router-link-active{
        color: #9e5bfc !important;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        border-bottom: 1px solid #9e5bfc;
    }
</style>
