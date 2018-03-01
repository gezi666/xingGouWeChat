<template>
    <div class="chartcon" :id='mapid'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/map')
    require('echarts/map/js/china.js')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/legend')
    export default {
        name: 'MapChart',
        props:['mapid','mapoptionlist'],
        data(){
            return{
                maxvalue: 0
            }
        },
        mounted(){
//            this.$nextTick(function() {
//                this.initLine(this.mapid)
//            })
        },
        methods:{
            initLine(chartID) {
                let myChart = echarts.init(document.getElementById(chartID));
                myChart.setOption({
                    title: {
                    text: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                    },
                    tooltip: {
                        show:true,
                        trigger: 'item',
//                        backgroundColor:'#303030',
                        backgroundColor:'rgba(255,255,255,0.9)',
                        borderColor: '#965cfc',
                        borderWidth:1,
                        textStyle:{
                            color:'#666'
                        },
                        extraCssText: 'text-align:left'
                    },
                    visualMap: {
                        min: 0,
                        max: this.maxvalue,
                        itemWidth: 14,
                        itemHeight: 58,
                        right: '5%',
//                        splitList: [
//                            { start: 4, end: 4, label: '4级' },
//                            { start: 3, end: 3, label: '3级' },
//                            { start: 2, end: 2, label: '2级' },
//                            { start: 1, end: 1, label: '1级' }
//                        ],
                        color: ['#ef4bff','#c91ffc','#8b52fd ','#6e92fe'],
                        text:['高','低'],           // 文本，默认为数值文本
                        calculable : false
                    },
                    series: [
                        {
                            name: '评论数量',
                            type: 'map',
                            mapType: 'china',
                            left: '5%',
                            roam: false,
                            itemStyle: {
                                normal: { label: { show: false,textStyle:{color:'#fff'}} },
                                emphasis: {
                                    areaColor: '#42e6fc',
                                    color: '#654292',
                                    label: { show: true}
                                }
                            },
                            data: this.mapoptionlist
                        }
                    ]
                });
            }
        },
        watch:{
            mapoptionlist(val,oldval){
                let that = this
                val.forEach(function (item) {
                    if(!isNaN(item.value)){
                        that.maxvalue = (item.value > that.maxvalue ) ? item.value : that.maxvalue
                    }
                })
                that.initLine(that.mapid)
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