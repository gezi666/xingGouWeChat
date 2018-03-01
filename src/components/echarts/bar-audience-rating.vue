<template>
    <div class="chartcon" :id='barchartid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    export default {
        name: 'BarChart',
        props:['barchartid','highestratings','ageratings','maxdata','showpercent','optiondata'],
        data(){
            return{
                // 初始化图表配置
                opinion: this.optiondata,
                maxData: this.maxdata,
                opinionData: [{
                    value:this.ageratings,
                  label:{
                    normal:{
                      show:true,
                      position:'right',
                      color:'#999',
                      fontSize:12,
                      formatter:'{c}%'
                    },
                    emphasis:{
                      show:true,
                      color:'#5c71ff'
                    }
                  },
                    itemStyle:{
                        normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#0ec4fe'
//                            }, {
//                                offset: 1,
//                                color: '#5e77fc'
//                            }]),
                            color: '#56b6fe',
                            borderColor:'transparent',
                            borderWidth:2,
                            barBorderRadius:[50,50,50,50]
                        },
                        emphasis:{

                        }
                    }
                },
                {
                    value:this.highestratings,
                  label:{
                    normal:{
                      show:true,
                      position:'right',
                      color:'#999',
                      fontSize:12,
                      formatter:'{c}%'
                    },
                    emphasis:{
                      show:true,
                      color:'#5c71ff'
                    }
                  },
                    itemStyle:{
                        normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#eea7fb'
//                            }, {
//                                offset: 1,
//                                color: '#b853fb'
//                            }]),
                            color: '#d583fd',
                            borderColor:'transparent',
                            borderWidth:2,
                            barBorderRadius:[50,50,50,50]
                        }
                    }
                }]
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initBar(this.barchartid)
//            })
          if(this.showpercent) {
            this.opinionData=[{
              value:this.ageratings,
              label:{
                normal:{
                  show:true,
                  position:'right',
                  color:'#999',
                  fontSize:12,
                  formatter:function(params){
                      let params_s = params.value*100
                      params_s = params_s.toFixed(0)
                      return params_s+"%"
                  }
                },
                emphasis:{
                  show:true,
                  color:'#5c71ff'
                }
              },
              itemStyle:{
                normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#0ec4fe'
//                            }, {
//                                offset: 1,
//                                color: '#5e77fc'
//                            }]),
                  color: '#56b6fe',
                  borderColor:'transparent',
                  borderWidth:2,
                  barBorderRadius:[50,50,50,50]
                },
                emphasis:{

                }
              }
            },
              {
                value:this.highestratings,
                label:{
                  normal:{
                    show:true,
                    position:'right',
                    color:'#999',
                    fontSize:12,
                    formatter:function(params){
                        let params_s = params.value*100
                        params_s = params_s.toFixed(0)
                        return params_s+"%"
                    }
                  },
                  emphasis:{
                    show:true,
                    color:'#5c71ff'
                  }
                },
                itemStyle:{
                  normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#eea7fb'
//                            }, {
//                                offset: 1,
//                                color: '#b853fb'
//                            }]),
                    color: '#d583fd',
                    borderColor:'transparent',
                    borderWidth:2,
                    barBorderRadius:[50,50,50,50]
                  }
                }
              }]
          }else {
            this.opinionData=[{
              value:this.ageratings,
              label:{
                normal:{
                  show:true,
                  position:'right',
                  color:'#999',
                  fontSize:12,
                  formatter:function(params){
                    if (params.value > 0 ){
                      return params.value-3000+'万元'
                    }else {
                      return '';
                    }

                  }
                },
                emphasis:{
                  show:false
                }
              },
              itemStyle:{
                normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#0ec4fe'
//                            }, {
//                                offset: 1,
//                                color: '#5e77fc'
//                            }]),
                  color: '#56b6fe',
                  borderColor:'transparent',
                  borderWidth:2,
                  barBorderRadius:[50,50,50,50]
                },
                emphasis:{

                }
              }
            },
              {
                value:this.highestratings,
                label:{
                  normal:{
                    show:true,
                    position:'right',
                    color:'#999',
                    fontSize:12,
                    formatter:function(params){
                      if (params.value > 0) {
                        return params.value+'万元'
                      }else {
                        return '';
                      }

                    }
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
//                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//                                offset: 0,
//                                color: '#eea7fb'
//                            }, {
//                                offset: 1,
//                                color: '#b853fb'
//                            }]),
                    color: '#d583fd',
                    borderColor:'transparent',
                    borderWidth:2,
                    barBorderRadius:[50,50,50,50]
                  }
                }
              }]
          }
            this.initBar(this.barchartid)
        },
        methods:{
            initBar(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
//                        backgroundColor:'#fff',
                        textStyle:{
                            color:'#fff'
                        },
//                        borderColor:'transparent',
                        padding:[5,15],
                        formatter:function(params){
                            var html = '<div ><p>' + params.value/100 + '</p><span></span></div>';
                            return params.value/100 + '%';
                        }

                    },
                    grid: {
                        left: 20,
                        right: 65,
                        bottom: 10,
                        top: 10
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
                    color:['#21a9fb'],
                    series : [
                        {
                            name:'收视率',
                            type:'bar',
                            barWidth: 12,
                            barGap :10,

                            data:this.opinionData
                        }
                    ]
                });
                myChart.on('mouseover',function(data){
                    var tooltipColor = data.color;
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
                              if (params.value > 1){
                                if (params.name =='海外票房') {
                                  if (params.value >= 3000){
                                    var html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;border-color:'+ tooltipColor+'"></span><p style="background:#fff;">'+(params.value - 3000) + '&nbsp;万元</p></div>'
//                                    console.log(html)
                                    return html;
                                  }else {
                                    return false;
                                  }

                                }else {
                                  var html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;border-color:'+ tooltipColor+'"></span><p style="background:#fff;">'+params.value + '&nbsp;万元</p></div>'
                                  return html;
                                }

                              }else{
                                var html='<div style="position:relative;z-index:100;"><span style="position:absolute;bottom:-5px;left:30%;width:10px;height:10px;border:1px solid #bf5dfd;background:#fff;transform:rotate(45deg);z-index:-100;border-color:'+ tooltipColor+'"></span><p style="background:#fff;">'+(params.value*100).toFixed(0)+'&nbsp;%</p></div>'
                                return html;
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