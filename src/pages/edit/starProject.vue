<template>
    <div class="star-project">
        <form method="post" enctype="multipart/form-data" class="form" id="myForm">
            <input type="hidden" name="userid" value="" v-model="userid">
            <input type="hidden" name="starid" value="" v-model="starid">
            <div class="pro-add" v-for="(item,i) in list">
                <input type="hidden" name="id" value="" id="inInput" v-model="datalist[i].id">
                <div class="project-div project-time">
                    <span class="project-text">时间:</span>
                    <p @click="open(i)">
                        <input type="text" disabled placeholder="请输入时间" v-model="datalist[i].starttime"
                               name="starttime"/> <i></i>
                    </p>
                    <!--时间-->
                    <dp
                         ref="picker"
                         type="date"
                         year-format="{value} 年"
                         month-format="{value} 月"
                         date-format="{value} 日"
                         :startDate="new Date('1997')"
                         @confirm="handleChange">
                    </dp>
                </div>
                <!--项目介绍-->
                <div class="project-div">
                    <span class="project-text prize">项目介绍:</span>
                    <textarea placeholder="请填写项目介绍内容" name="introduce" v-model="datalist[i].introduce" ref="introduce" @blur="introduces(i)"></textarea>
                </div>
            </div>

            <!--增加-->
            <div class="project-div project-add" @click='add()'>
                <p>增加</p>
                <i></i>
            </div>

            <div class="btn-group">
                <input class="purchase" type="button" name="" value="保存" @click='updateoradd()'>
            </div>
        </form>
    </div>
</template>

<script>
    import {Post} from '@/api';
    import api from '@/api';
    import cookie from '@/util/cookie'
    import {MessageBox} from 'mint-ui';
    import dp from '@/components/datePicker'
    import { Indicator } from 'mint-ui';

    export default {
        name: 'starProject',
        data () {
            return {
                value: null,
                date: '',
                list: 1,
                starid: '',
                userid: '',
                current: 0,
                datalist: [{
                    id: '',
                    starttime: '',//时间
                    introduce: '',//项目说明
                }]
            }
        },
        components:{
            dp
        },
        methods: {
            //项目介绍-表情过滤
            introduces(i){
                let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                let name=this.datalist[i].introduce
                this.$refs.introduce[i].value = name.replace(regStr, "")
                this.datalist[i].introduce=this.$refs.introduce[i].value
            },
            open(i) {
                this.current = i
                this.$refs.picker[i].open();
            },
            add(){
                this.list++
                this.datalist.push({
                    id: '',
                    starttime: '',//时间
                    introduce: '',//项目说明
                })
            },
            handleChange(value) {
                this.datalist[this.current].starttime = this.getLocalTime(new Date(value).getTime())
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
            starProject(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                api.starProject({
                    "starid": this.$route.params.id,
                })
                    .then((res) => {
                        Indicator.close();
                        this.starid = this.$route.params.id
                        if (res.result === '1') {
                            if (res.data.length > 0) {
                                this.datalist = res.data
                                this.list = res.data.length;
                                let _this = this;
                                res.data.forEach(function (item, index) {
                                    _this.datalist[index].id = item.id;
                                    _this.datalist[index].starttime = item.starttime;
                                    _this.datalist[index].introduce = item.introduce;
                                });
                            }
                        }
                    })
            },
            updateoradd(){
                this.datalist.forEach(v => {
                    v.starid = this.$route.params.id
                })
                Post('/wechatstarproject/updateoradd', this.datalist).then((res) => {
                    this.$router.push({name: 'project', params: {id: this.$route.params.id}})
                })
            }
        },
        mounted(){
            if (cookie.get('userid') && cookie.get('userid') != '') {
                this.userid = cookie.get('userid')
                this.starProject()
            } else {
                MessageBox.alert('请登录','').then(() => {
                    this.$router.push({name: 'login'})
                })
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .star-project {
        width: 100vw;
        height: 100vh;
        background: #f2f7ff;
        box-sizing: border-box;
    }

    .star-project form {
        background: #fff;
        box-shadow: 0 0 5px #e1ebfc;
    }

    .star-project .pro-add .project-div {
        min-height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: inherit;
        padding: 0 15px;
        border-bottom: 1px solid #e3e3e3;
    }

    .star-project form .pro-add .project-text {
        color: #a6acbc;
        font-size: 15px;
    }

    .star-project form .pro-add input {
        width: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 14px;
        text-align: right;
        flex: auto;
        background: #fff;
        border: none;
        padding-left: 10px;
        color: #333;
        opacity: 1;
    }

    /*时间*/
    .star-project .pro-add .project-time p {
        text-align: right;
        flex: auto;
    }

    .star-project .pro-add .project-time span {
        font-size: 14px;
        color: #a6acbc;
    }

    .star-project .pro-add .project-time i {
        width: 9px;
        height: 14px;
        display: inline-block;
        background: url("../../../static/img/input-right.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -2px;
    }

    /*placeholder字体颜色*/
    .star-project ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        color: #d9dce4;
        text-align: right;
        font-family: "Microsoft YaHei";
    }

    .project-time input::-webkit-input-placeholder {
        font-size: 14px;
        color: #a6acbc;
    }

    /*项目介绍文本域*/
    .star-project form textarea {
        min-height: 90px;
        font-size: 14px;
        flex: auto;
        resize: none;
        padding: 15px 5px;
        border: none;
        color: #333;
        font-family: "Microsoft YaHei";
    }

    .star-project input:focus, textarea:focus {
        outline: none;
    }

    /*增加*/
    .star-project .project-add {
        height: 25px;
        background: #fff;
        text-align: right;
        padding: 15px;
    }

    .star-project form .project-add p {
        font-size: 14px;
        color: #9e5bfc;
    }

    .star-project .project-add p:after {
        content: '';
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("../../../static/img/add-icon.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: -6px;
        margin-left: 5px;
    }

    /*按钮*/
    .star-project .btn-group {
        width: 76%;
        margin: 0 auto;
        padding-bottom: 50px;
    }

    .star-project .btn-group input.purchase {
        width: 100%;
        height: 45px;
        color: #fff;
        text-align: center;
        margin-top: 20px;
        border-radius: 100px;
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
</style>
