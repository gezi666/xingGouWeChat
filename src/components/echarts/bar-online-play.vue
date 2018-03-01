<template>
    <div class="chartcon" :id='baronlineplayid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    export default {
        name: 'BarOnlinePlay',
        props:['baronlineplayid','onlineplayback','tvseriesname','maxdata'],
        data(){
            return {
                yAxisData:[this.maxdata],
                maxData: this.maxdata,
                seriesdata:[this.onlineplayback]
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initBar1(this.baronlineplayid)
//            })
            this.initBar1(this.baronlineplayid)
        },
        methods:{
            initBar1(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    grid: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    },
                    xAxis : [
                        {
                            type : 'value',
                            max: this.maxData,
                            axisTick: {
                                show:false
                            },
                            axisLabel:{
                                show:false
                            },
                            axisLine:{
                                show:false
                            },
                            splitLine:{
                                show: false
                            }
                        }
                    ],
                    yAxis :{
                        type : 'category',
                        axisLabel: {
                            show:false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLine: {
                            show: false
                        },
                        data:this.yAxisData
                    },

                    series : [
                        {
                            type: 'bar',
                            data: this.seriesdata,
                            barWidth: 12,
                            label: {
                                normal: {
                                    show:false
                                }
                            },
                            itemStyle:{
                                normal:{
//                                    color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                        offset: 0,
//                                        color: '#1fb3ff'
//                                    }, {
//                                        offset: 1,
//                                        color: '#ca58fd'
//                                    }]),
                                    color: '#d583fd',
                                    borderColor:'transparent',
                                    borderWidth:2,
                                    barBorderRadius:[50,50,50,50]
                                }
                            }
                        }
                    ]
                });
                myChart.on('mouseover',function(data){
                    myChart.setOption({
                        tooltip:{
                            trigger:'item',
                            backgroundColor:'#fff',
                            borderColor:'#bf5dfd',
                            borderWidth:1,
                            position:'top',
                            textStyle:{
                                color:'#999'
                            },
                            padding:[0, 20],
                            formatter:function(params){
                                var html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;"></span><p style="background:#fff;">'+params.value + '&nbsp;万次</p></div>'
                                return html;
                            }
                        },
                        series:{
                            itemStyle:{
                                normal:{
                                    borderColor:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: '#69dcfc'
                                    }, {
                                        offset: 1,
                                        color: '#f8a1ff'
                                    }])
                                }
                            }
                        }
                    })
                });
                myChart.on('mouseout',function(data){
                    myChart.setOption({
                        series:{
                            itemStyle:{
                                normal:{
                                    borderColor:'transparent'
                                }
                            }
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .chartcon{
        width: 100%;
        height: 100%;
    }
    .chart-tooltip{
        position:relative;
        width:70px;
        height:20px;
        background:#fff;
        color:#999;
        line-height:20px;
        font-size:14px;
        text-align:center;
    }
    .chart-tooltip span{
        position:absolute;
        bottom:0;
        left:30px;
        width:10px;
        height:10px;
        background:#fff;
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
    }
</style>