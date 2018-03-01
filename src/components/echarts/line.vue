<template>
    <div class="chartcon" :id='chartid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入折线图组件
    require('echarts/lib/chart/line')
    require('echarts/lib/component/tooltip')
    export default {
        name: 'LineChart',
        props:['chartid','optionlist'],
        data(){
            return{
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initLine(this.chartid)
//            })

            if(this.optionlist.opinionData && this.optionlist.opinionData.length && this.optionlist.opinionData.length !== 0){
                this.initLine(this.chartid)
            }
        },
        methods:{
            initLine(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    tooltip : {
                        axisPointer:{
                            lineStyle:{
                                width: 0
                            }
                        },
                        trigger:'axis',
                        backgroundColor:'#fff',
                        borderColor:'#965cfc',
                        borderWidth:1,
                        position:'top',
                        textStyle:{
                            color:'#999'
                        },
                        padding:[0, 20],
                        formatter:function(params){
                            var html='<div style="position:relative;z-index:100;">' +
                                '<span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #965cfc;background:#fff;transform:rotate(45deg);z-index:-100;"></span>' +
                                '<p style="background:#fff;">'+params[0].value+'k &nbsp;&nbsp;'+params[0].axisValue+'</p ></div>'
                            return html;
                        }
                    },
                    grid: {
                        left: 10,
                        right: 30,
                        bottom: 10,
                        top: 20,
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
                                    color:'#666',
                                    align:'center'
                                },
                                margin:10
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#dfdfdf'
                                }
                            },
                            splitLine:{
                                show: false
                            },
                            data: this.optionlist.opinion,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                alignWithLabel: true,
                                inside: true
                            },
                            axisLabel:{
                                showMinLabel: false,
                                textStyle:{
                                    color:'#666'
                                },
                                formatter: function (v) {
                                    if(v == 0) {
                                        return null
                                    } else {
                                        return v+'k'
                                    }
                                },
                                margin:10
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#dfdfdf'
                                }
                            },
                            splitLine:{
                                show: false
                            }
                        }
                    ],
                    color:['#21a9fb'],
                    series : [
                        {
                            name:'',
                            type:'line',
                            showSymbol: false,
                            itemStyle:{
                                normal:{
                                    borderColor:'#3f8fff',
                                    borderWidth:2
                                }
                            },
                            smooth:true,
                            lineStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#965cfc'
                                    }, {
                                        offset: 1,
                                        color: '#79c4ff'
                                    }]),
                                }
                            },
                            areaStyle:{
                                normal:{
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#f5ebff'
                                    }, {
                                        offset: 1,
                                        color: '#f5faff'
                                    }]),
                                    opacity:1

                                }
                            },
                            data:this.optionlist.opinionData
                        }
                    ]
                });
            }
        },
        watch:{
            optionlist(){
                this.initLine(this.chartid)
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