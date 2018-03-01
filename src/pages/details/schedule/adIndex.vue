<template>
    <div class="ad-wrap">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:'adIndex',
        data () {
            return {
            }
        },
        mounted(){
            this.$router.push({name:'adSchedule',params:{ id: this.$route.params.id }})
        },
        beforeUpdate(){
            if(this.$router.history.current.name === "adIndex"){
                this.$router.push({name:'adSchedule',params:{ id: this.$route.params.id }})
            }
        }
    }
</script>

<style scoped>
    .ad-wrap{
        width: 100%;
    }
</style>
