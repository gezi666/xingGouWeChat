<template>
    <div class="chartcon" :id='lechartid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入折线图组件
    require('echarts/lib/chart/line')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/legend')
    export default {
        name: 'LineLeChart',
        props:['lechartid','leoptionlist'],
        data(){
            return{
                datalist:[]
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initLine(this.lechartid)
//            })
        },
        methods:{
            initLine(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer:{
                            lineStyle:{
                                color:'#ccc'
                            }
                        },
                        backgroundColor:'rgba(255,255,255,0.9)',
                        borderColor: '#965cfc',
                        borderWidth:1,
                        textStyle:{
                            color:'#666'
                        },
                        extraCssText: 'text-align:left'
                    },
                    legend: {
                        right:'10px',
                        top:'0',
                        icon:'circle',
                        itemWidth:5,
                        textStyle:{
                            fontSize:10
                        },
                        data : this.leoptionlist.opinion
                    },
                    grid: {
                        left: 10,
                        right: 30,
                        top:30,
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            nameTextStyle:{
                                color:'#666'
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show:false
                            },
                            axisLabel:{
                                textStyle:{
                                    color:'#666'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#ccc'
                                }
                            },
                            splitLine:{
                                show: false
                            },
                            data: this.leoptionlist.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                alignWithLabel: true,
                                inside: true,
                            },
                            axisLabel:{
                                showMinLabel: false,
                                textStyle:{
                                    color:'#666'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#ccc'
                                }
                            },
                            splitLine:{
                                show: false
                            }
                        }
                    ],
                    color:['#ffcc00','#6f91fe','#51d5e6','#ba2af4','#f77bfe','#6e45be','#40edb7','#aabf52'],
                    series : this.datalist
                });
            }
        },
        watch:{
            leoptionlist(val,oldval){
                let that = this
                val.opinionData.forEach(function (item) {
                    that.datalist.push({
                        name:item.name,
                        type:'line',
                        smooth:true,
                        showSymbol: false,
                        data:item.value
                    })
                })
                this.initLine(this.lechartid)
            }
        }
    }
</script>

<style scoped>
    .chartcon{
        width: 100%;
        height: 100%;
        /*overflow: hidden;*/
    }
</style>