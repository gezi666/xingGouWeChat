<template>
    <div class="chartcon" :id='piechartid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/pie')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/legend')
    export default {
        name: 'PieChart',
        props:['piechartid','pieoptionlist'],
        data(){
            return{
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initLine(this.piechartid)
//            })
            if(this.pieoptionlist.opinionData && this.pieoptionlist.opinionData.length && this.pieoptionlist.opinionData.length !== 0){
                this.initLine(this.piechartid)
            }

        },
        methods:{
            initLine(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    tooltip: {
                        show: false,
                        trigger: 'item'
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: '5%',
                        bottom:'10%',
                        align: 'left',
                        textStyle:{
                            color: '#666',
                            fontFamily:'微软雅黑',
                            fontSize: 10
                        },
                        data:this.pieoptionlist.opinion
                    },
                    color:['#855efd', '#52b3fd', '#70e1f6'],
                    series: [
                        {
                            name:'评价',
                            type:'pie',
                            radius: ['60%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    formatter: "{b} \n {d}%",
                                    textStyle: {
                                        fontSize: '14',
                                        fontFamily:'微软雅黑'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.pieoptionlist.opinionData
                        }
                    ]
                });
            }
        },
        watch:{
            pieoptionlist(val,oldVal){
                if(val.length!==0){
                    this.initLine(this.piechartid)
                }
            }
        }
    }
</script>

<style scoped>
    .chartcon{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>