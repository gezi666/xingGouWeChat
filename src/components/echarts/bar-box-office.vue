<template>
    <div class="chartcon" :id='barboxofficeid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    export default {
        name: 'BarBoxOffice',
        props:['barboxofficeid','domesticboxoffice','foreignboxoffice','maxdata'],
        data(){
            return{
                // 初始化图表配置
                opinion: ['票房排行'],
                maxData: this.maxdata
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initBar2(this.barboxofficeid,this.domesticboxoffice,this.foreignboxoffice)
//            })
            this.initBar2(this.barboxofficeid,this.domesticboxoffice,this.foreignboxoffice)
        },
        methods:{
            initBar2(chartID,domesticboxoffice,foreignboxoffice) {
                let myChart = echarts.init(document.getElementById(chartID));
                if(domesticboxoffice  && foreignboxoffice){
                    myChart.setOption({
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 5,
                            top: 6
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
                        yAxis : [
                            {
                                type : 'category',
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
                                },
                                data:this.opinion
                            }
                        ],
                        series : [
                            {
                                type:'bar',
                                name:'国内票房',
                                stack:'总量',
                                barWidth:14,
                                itemStyle:{
                                    normal:{
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#eea7fb'
                                        }, {
                                            offset: 1,
                                            color: '#b853fb'
                                        }]),
                                        borderColor:'transparent',
                                        borderWidth:2,
                                        barBorderRadius:[50,0,0,50]
                                    }
                                },
                                data:[this.domesticboxoffice]
                            },
                            {
                                type:'bar',
                                name:'海外票房',
                                stack:'总量',
                                barWidth:14,
                                itemStyle:{
                                    normal:{
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#0ec4fe'
                                        }, {
                                            offset: 1,
                                            color: '#5e77fc'
                                        }]),

                                        borderColor:'transparent',
                                        borderWidth:2,
                                        barBorderRadius:[0,50,50,0]
                                    }
                                },
                                data:[this.foreignboxoffice]
                            }
                        ]
                    });
                }else if(domesticboxoffice && !foreignboxoffice){
                    myChart.setOption({
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 5,
                            top: 6
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
                        yAxis : [
                            {
                                type : 'category',
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
                                },
                                data:this.opinion
                            }
                        ],
                        series : [
                            {
                                type:'bar',
                                name:'国内票房',
                                stack:'总量',
                                barWidth:14,
                                itemStyle:{
                                    normal:{
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#eea7fb'
                                        }, {
                                            offset: 1,
                                            color: '#b853fb'
                                        }]),
                                        borderColor:'transparent',
                                        borderWidth:2,
                                        barBorderRadius:[50]
                                    }
                                },
                                data:[this.domesticboxoffice]
                            }

                        ]
                    });
                }else if(!domesticboxoffice && foreignboxoffice){
                    myChart.setOption({
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 5,
                            top: 6
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
                        yAxis : [
                            {
                                type : 'category',
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
                                },
                                data:this.opinion
                            }
                        ],
                        series : [

                            {
                                type:'bar',
                                name:'海外票房',
                                stack:'总量',
                                barWidth:14,
                                itemStyle:{
                                    normal:{
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#0ec4fe'
                                        }, {
                                            offset: 1,
                                            color: '#5e77fc'
                                        }]),

                                        borderColor:'transparent',
                                        borderWidth:2,
                                        barBorderRadius:[50]
                                    }
                                },
                                data:[this.foreignboxoffice]
                            }
                        ]
                    });
                }
                myChart.on('mouseover',function(data){
                    let tooltipColor = data.color.colorStops[0].color;
                    let totalNum = domesticboxoffice + foreignboxoffice;
                    myChart.setOption({
                        tooltip:{
                            trigger:'item',
                            backgroundColor:'#fff',
                            borderColor:tooltipColor,
                            borderWidth:1,
                            position:'top',
                            textStyle:{
                                color:'#999'
                            },
                            padding:[0, 20],
                            formatter:function(params){
                                if(totalNum){
                                    if(params.seriesName=='海外票房'){
                                        let html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;border-color:'+ tooltipColor+'"></span><p style="background:#fff;">'+((params.value>0) ? (params.value-1000) : params.value ) + '&nbsp;万元</p></div>'
                                        return html;
                                    } else {
                                        let html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;border-color:'+ tooltipColor+'"></span><p style="background:#fff;">'+params.value + '&nbsp;万元</p></div>'
                                        return html;
                                    }

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