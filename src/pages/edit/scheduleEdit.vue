<template>
    <div class="schedule-edit">
        <form method="post" enctype="multipart/form-data" class="form" id="myForm">
            <input type="hidden" name="userid" value="" v-model="userid">
            <input type="hidden" name="starid" value="starid">
            <!--档期类型-->
            <div>
                <div class="add-main" v-for="(item,i) in list1">
                    <div class="record-div">
                        <span class="title-label"><i></i>档期类型</span>
                        <span>影视</span>
                    </div>
                    <div class="record-div record-time">
                        <span class="record-text">开始日期:</span>
                        <p @click="open(i)">
                            <input type="text" disabled placeholder="请选择开始日期" v-model="record[i].starttime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <!--开始日期-->
                        <my-date-picker
                                ref="picker"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                @confirm="handleChange1_1">
                        </my-date-picker>
                    </div>

                    <div class="record-div record-time">
                        <span class="record-text">结束日期:</span>
                        <p @click="open_1(i)">
                            <input type="text" disabled placeholder="请选择结束日期" v-model="record[i].endtime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <!--结束日期-->
                        <my-date-picker
                                ref="picker_1"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate1"
                                @confirm="handleChange1_2">
                        </my-date-picker>
                    </div>

                    <div class="record-div">
                        <span class="record-text prize">影视介绍:</span>
                        <textarea placeholder="请填写参与影视的名称及介绍" v-model="record[i].introduce"
                                  name="winningrecord" ref="records" @blur="records(i)"></textarea>
                    </div>
                </div>

                <div class="record-div record-add" @click='add1()'>
                    <p>增加</p>
                    <i></i>
                </div>
            </div>

            <!--档期类型-->
            <div class="main-box adver-box">
                <div class="add-main" v-for="(item,i) in list2">
                    <div class="record-div">
                        <span class="title-label"><i></i>档期类型</span>
                        <span>广告</span>
                    </div>
                    <div class="record-div record-time">
                        <span class="record-text">开始日期:</span>
                        <p @click="open2(i)">
                            <input type="text" disabled placeholder="请选择开始日期" v-model="ad[i].starttime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <my-date-picker
                                ref="picker2"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                @confirm="handleChange2_1">
                        </my-date-picker>
                    </div>
                    <div class="record-div record-time">
                        <span class="record-text">结束日期:</span>
                        <p @click="open2_1(i)">
                            <input type="text" disabled placeholder="请选择结束日期" v-model="ad[i].endtime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <my-date-picker
                                ref="picker2_1"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate2"
                                @confirm="handleChange2_2">
                        </my-date-picker>
                    </div>
                    <div class="record-div">
                        <span class="record-text">代言品牌:</span>
                        <input type="text" placeholder="请输入" v-model="ad[i].brand"  ref="adBrand" @blur="adBrand(i)"/>
                    </div>
                    <div class="record-div">
                        <span class="record-text">代言产品:</span>
                        <input type="text" placeholder="请输入" v-model="ad[i].product"  ref="adProduct" @blur="adProduct(i)"/>
                    </div>
                </div>
                <div class="record-div record-add" @click='add2()'>
                    <p>增加广告代言</p>
                    <i></i>
                </div>
            </div>

            <!--可接广告类型-->
            <div class="main-box advertise">
                <div class="add-main">
                    <div class="record-div adv-div">
                        <span class="title-label"><i></i>可接广告类型</span>
                    </div>

                    <div class="record-div">
                        <mt-checklist
                                v-model="value"
                                :options="options">
                        </mt-checklist>
                    </div>
                </div>
            </div>

            <!--档期类型-->
            <div class="main-box">
                <div class="add-main" v-for="(item,i) in list3">
                    <div class="record-div">
                        <span class="title-label"><i></i>档期类型</span>
                        <span>演出</span>
                    </div>

                    <div class="record-div record-time">
                        <span class="record-text">开始日期:</span>
                        <p @click="open3(i)">
                            <input type="text" disabled placeholder="请选择开始日期" v-model="yc[i].starttime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <my-date-picker
                                ref="picker3"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                @confirm="handleChange3_1">
                        </my-date-picker>
                    </div>

                    <div class="record-div record-time">
                        <span class="record-text">结束日期:</span>
                        <p @click="open3_1(i)">
                            <input type="text" disabled placeholder="请选择结束日期" v-model="yc[i].endtime"
                                   name="publishtime"/>
                            <i></i>
                        </p>
                        <my-date-picker
                                ref="picker3_1"
                                type="date"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate3"
                                @confirm="handleChange3_2">
                        </my-date-picker>
                    </div>
                    <div class="record-div">
                        <span class="record-text prize">演出说明:</span>
                        <textarea placeholder="请填写参与演出名称及介绍" v-model="yc[i].introduce"
                                  name="winningrecord" ref="ycIntroduce" @blur="ycIntroduce(i)"></textarea>
                    </div>
                </div>
                <div class="record-div record-add" @click='add3()'>
                    <p>增加</p>
                    <i></i>
                </div>
            </div>

            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='submit()'>
            </div>
        </form>
        <!-- </ajaxForm> -->
    </div>
</template>

<script>
    import {Get, Post} from '@/api'
    import {MessageBox} from 'mint-ui';
    import cookie from '@/util/cookie'
    import { Indicator } from 'mint-ui';
    import myDatePicker from '@/components/datePicker/myDatePicker'
    export default {
        name: 'scheduleEdit',
        data () {
            return {
                date: '',
                flags: [false, false, false, false],
                startDate: new Date(),//开始时间
                startDate1: new Date(),//影视开始时间
                startDate2: new Date(),//广告开始时间
                startDate3: new Date(),//演出开始时间
                list1: 1,
                list2: 1,
                list3: 1,
                flag: false,
                current: 0,
                userid: '',
                starid: '',
                nows: '',
                options: [],
                value: [],
                record: [
                    {
                        id: '',
                        introduce: '',
                        starttime: '',
                        endtime: ''
                    }
                ],
                ad: [
                    {
                        id: '',
                        product: '',
                        brand: '',
                        starttime: '',
                        endtime: ''
                    }
                ],
                yc: [
                    {
                        id: '',
                        introduce: '',
                        starttime: '',
                        endtime: ''
                    }
                ]
            }
        },
        components: {
            myDatePicker
        },
        mounted(){
            if (cookie.get('userid') && cookie.get('userid') != '') {
                this.userid = cookie.get('userid')
                this.starid = this.$route.params.id
            } else {
                MessageBox.alert('请登录', '').then(() => {
                    this.$router.push({name: 'login'})
                })
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });

            //影视
            Get('/wechatmovie/getmovie', {
                params: {
                    starid: this.$route.params.id,
                }
            })
                .then(res => {
                    if (this.userid == '') {
                        MessageBox.alert('请登录', '').then(() => {
                            this.$router.push({name: 'login'})
                        });
                        return false
                    }
                    if (res.data.length > 0) {
                        this.list1 = res.data.length
                        this.record = []
                        res.data.forEach(v => {
                            this.record.push(
                                {
                                    id: v.id,
                                    starttime: v.starttime,
                                    endtime: v.endtime,
                                    introduce: v.introduce

                                })
                        })
                    }
                })
            //可接广告类型
            const that = this
            Get('/wechatstaradvertisement/advertisementlist')
                .then(res => {
                    if(res.result === 1){
                        this.options = res.advertisementlist
                    } else{
                        console.log(res.msg)
                    }
                    //可接广告类型
                }).then(() => {
                Get('/wechatstaradvertisement/getstarcanadvertisement', {
                    params: {
                        starid: this.$route.params.id,
                    }
                })
                    .then(res2 => {
                        if(res2.result === 1){
                            this.value = res2.advertisements.split(',')
                        } else{
                            console.log(res2.msg)
                        }
                    })
            })

            //广告
            Get('/wechatstaradvertisement/getstarsdvertisement', {
                params: {
                    starid: this.$route.params.id,
                }
            })
                .then(res => {
                    if (res.data.length > 0) {
                        this.ad = []
                        this.list2 = res.data.length
                        res.data.forEach(v => {
                            this.ad.push(
                                {
                                    id: v.id,
                                    starttime: v.starttime,
                                    endtime: v.endtime,
                                    brand: v.brand,
                                    product: v.product

                                })
                        })
                    }

                })
            //广告
            Get('/wechatstarshow/getstarshow', {
                params: {
                    starid: this.$route.params.id,
                }
            })
                .then(res => {
                    Indicator.close();
                    if (res.data.length > 0) {
                        this.yc = []
                        this.list3 = res.data.length
                        res.data.forEach(v => {
                            this.yc.push(
                                {
                                    id: v.id,
                                    starttime: v.starttime,
                                    endtime: v.endtime,
                                    introduce: v.introduce
                                })
                        })
                    }
                })
        },
        methods: {
            //影视介绍表情过滤
            records(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.record[i].introduce
                this.$refs.records[i].value = name.replace(regStr, "")
                this.record[i].introduce=this.$refs.records[i].value
            },
            //广告代言品牌-表情过滤
            adBrand(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.ad[i].brand
                this.$refs.adBrand[i].value = name.replace(regStr, "")
                this.ad[i].brand=this.$refs.adBrand[i].value
            },
            //广告代言产品-表情过滤
            adProduct(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.ad[i].product
                this.$refs.adProduct[i].value = name.replace(regStr, "")
                this.ad[i].product=this.$refs.adProduct[i].value
            },
            //演出说明-表情过滤
            ycIntroduce(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.yc[i].introduce
                this.$refs.ycIntroduce[i].value = name.replace(regStr, "")
                this.yc[i].introduce=this.$refs.ycIntroduce[i].value
            },
            open(i) {
                this.current = i
                this.$refs.picker[i].open();
            },
            open_1(i) {
                this.current = i
                this.$refs.picker_1[i].open();
            },
            open2(i) {
                this.current = i
                this.$refs.picker2[i].open();
            },
            open2_1(i) {
                this.current = i
                this.$refs.picker2_1[i].open();
            },
            open3(i) {
                this.current = i
                this.$refs.picker3[i].open();
            },
            open3_1(i) {
                this.current = i
                this.$refs.picker3_1[i].open();
            },
            add1(){
                this.list1++
                this.record.push({
                    introduce: '',
                    starttime: '',
                    endtime: ''
                })
            },
            add2(){
                this.list2++
                this.ad.push({
                    product: '',
                    brand: '',
                    starttime: '',
                    endtime: ''
                })
            },
            add3(){
                this.list3++
                this.yc.push({
                    introduce: '',
                    starttime: '',
                    endtime: ''
                })
            },
            handleChange1_1(value) {
                this.record[this.current].starttime = this.getLocalTime(new Date(value).getTime())
                const startDate1=new Date(this.record[this.current].starttime.replace(/-/ig,'/'))
                this.startDate1=new Date(startDate1)
            },
            handleChange1_2(value) {
                this.record[this.current].endtime = this.getLocalTime(new Date(value).getTime())
            },
            handleChange2_1(value) {
                this.ad[this.current].starttime = this.getLocalTime(new Date(value).getTime())
                const startDate2=new Date(this.ad[this.current].starttime.replace(/-/ig,'/'))
                this.startDate2=new Date(startDate2)
            },
            handleChange2_2(value) {
                this.ad[this.current].endtime = this.getLocalTime(new Date(value).getTime())
            },
            handleChange3_1(value) {
                this.yc[this.current].starttime = this.getLocalTime(new Date(value).getTime())
                const startDate3=new Date(this.yc[this.current].starttime.replace(/-/ig,'/'))
                this.startDate3=new Date(startDate3)
            },
            handleChange3_2(value) {
                this.yc[this.current].endtime = this.getLocalTime(new Date(value).getTime())
            },
            getLocalTime(nS) { //转换时间格式
                let year=new Date(nS).getFullYear();
                let month=new Date(nS).getMonth()+1;
                let date=new Date(nS).getDate();
                if (month < 10) {
                    month = "0" + month
                }
                if (date < 10) {
                    date = "0" + date
                }
                return year+"-"+month+"-"+date
            },
            alertMsg(i){
                this.flags[i] = true;
                const flag = this.flags.every(function (v) {
                    return (v == true)
                });
                MessageBox.alert('保存成功！', '').then(() => {
                    this.$router.push({name: 'movieSchedule', params: {id: this.$route.params.id}})
                });
                return flag
            },
            submit(){
                this.record.forEach(v => {
                    v.starid = this.$route.params.id
                });
                Post('/wechatmovie/updateoradd', this.record)
                    .then(res => {
                        this.alertMsg(0);
                    });
                this.ad.forEach(v => {
                    v.starid = this.$route.params.id
                });
                Post('/wechatstaradvertisement/updateoradd', this.ad)
                    .then(res => {
                        this.alertMsg(1);
                    });
                this.yc.forEach(v => {
                    v.starid = this.$route.params.id
                });
                Post('/wechatstarshow/updateoradd', this.yc)
                    .then(res => {
                        this.alertMsg(2);
                    });
                Post('/wechatstaradvertisement/updatestarcanadvertisement', {
                    starid: this.$route.params.id,
                    advertisements: this.value.join()

                })
                    .then(res => {
                        this.alertMsg(3);
                    })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .schedule-edit {
        width: 100%;
        height: 100%;
        background: #f2f7ff;
    }

    .schedule-edit .form {
        background: #f2f7ff;
        box-shadow: 0 0 5px #e1ebfc;
    }

    .schedule-edit .add-main {
        background: #fff;
        border-bottom: 1px solid #e3e3e3;
    }

    .schedule-edit .form .record-div {
        min-height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: inherit;
        padding: 0 15px;
        border-bottom: 1px solid #e3e3e3;
    }

    .schedule-edit .form .record-div:last-child {
        border-bottom: none;
        justify-content: flex-end;
    }

    .schedule-edit .form .record-text {
        color: #a6acbc;
        font-size: 15px;
    }

    .schedule-edit .form input {
        width: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 14px;
        flex: auto;
        border: none;
        padding-left: 10px;
        color: #333;
        text-align: right;
        opacity: 1;
    }

    /*发行时间*/
    .schedule-edit .record-time p {
        text-align: right;
        flex: auto;
    }

    .schedule-edit .record-time p input {
        font-size: 14px;
        background: #fff;
    }

    .schedule-edit .record-time p input::-webkit-input-placeholder {
        font-size: 14px;
        color: #a6acbc;
        line-height: 14px;
    }

    .schedule-edit .record-time i {
        width: 9px;
        height: 14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat bottom;
        background-size: 9px 14px;
        vertical-align: -2px;
    }

    /*placeholder字体颜色*/
    .schedule-edit ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        color: #d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
        line-height: 14px;
    }

    .schedule-edit .main-box {
        margin-top: 15px;
    }

    .schedule-edit .add-main .title-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .schedule-edit .add-main .title-label i {
        width: 16px;
        height: 15px;
        margin-right: 6px;
        background: url(../../../static/img/schedule-icon1.png) center no-repeat;
        background-size: 100% 100%;
    }

    .schedule-edit .add-main .title-label span {
        font-size: 15px;
        color: #333333;
    }

    .schedule-edit .advertise .title-label i {
        width: 16px;
        height: 15px;
        margin-right: 6px;
        background: url(../../../static/img/schedule-icon2.png) center no-repeat;
        background-size: 100% 100%;
    }

    .schedule-edit div.adv-div {
        justify-content: flex-start !important;
    }

    /*文本域*/
    .schedule-edit form textarea {
        min-height: 90px;
        font-size: 14px;
        flex: auto;
        resize: none;
        padding: 15px 5px;
        border: none;
        color: #333;
        font-family: "Microsoft YaHei";
    }

    .schedule-edit input:focus, textarea:focus {
        outline: none;
    }

    /*按钮*/
    .schedule-edit .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 30px;
    }

    .schedule-edit .btn-group input.purchase {
        width: 100%;
        height: 45px;
        color: #fff;
        margin-top: 25px;
        border-radius: 100px;
        text-align: center;
        font-size: 18px;
        text-decoration: none;
        background: -webkit-linear-gradient(left, #5c86ff, #7d1aff);
        text-shadow: 0 2px 0 rgba(76, 33, 0, .14);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    /*增加*/
    .schedule-edit .record-add {
        background: #fff;
        text-align: right;
        padding: 15px;
    }

    .schedule-edit form .record-add p {
        font-size: 14px;
        color: #9e5bfc;
    }

    .schedule-edit .record-add p:after {
        width: 22px;
        height: 22px;
        content: '';
        display: inline-block;
        background: url("../../../static/img/add-icon.png") no-repeat;
        background-size: 22px 22px;
        vertical-align: -6px;
        margin-left: 5px;
    }

</style>
