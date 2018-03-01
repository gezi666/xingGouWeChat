import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import register from '@/pages/login/register'
import forgetPassword1 from '@/pages/login/forget-password1'
import forgetPassword2 from '@/pages/login/forget-password2'
import artistAudit from '@/pages/artist-audit/artist-audit'
import artistAuditSuccess from '@/pages/artist-audit/artist-audit-success'
import artistAuditFail from '@/pages/artist-audit/artist-audit-fail'
import payment from '@/pages/payment/payment'     //购买支付
import demandPayment from '@/pages/payment/demand-payment'     //购买支付
import recharge from '@/pages/recharge/recharge'  //充值
import userCenter from '@/pages/userCenter/userCenter'//艺人管理中心
import starList from '@/pages/starList/starList'  //明星列表
import edit from '@/pages/edit' //明星详情-编辑
import starProject from '@/pages/edit/starProject'//明星详情-编辑-项目
import recordEditor from '@/pages/edit/recordEditor' //明星详情-编辑-唱片
import starShow from '@/pages/edit/starShow' //明星详情-编辑-演出
import scheduleEdit from '@/pages/edit/scheduleEdit' //明星详情-编辑-档期
import baseInfoEdit from '@/pages/edit/baseInfoEdit'
import details from '@/pages/details/index'
import baseInfo from '@/pages/details/base-info'
import project from '@/pages/details/project'
import schedule from '@/pages/details/schedule/index'
import movieSchedule from '@/pages/details/schedule/movieSchedule'
import adIndex from '@/pages/details/schedule/adIndex'
import adSchedule from '@/pages/details/schedule/adSchedule'
import adSelect from '@/pages/details/schedule/adSelect'
import showsSchedule from '@/pages/details/schedule/showsSchedule'
import music from '@/pages/details/music/index'
import records from '@/pages/details/music/records'
import shows from '@/pages/details/music/star-shows'
import movies from '@/pages/details/movies'
import internet from '@/pages/details/internet'
import demand from '@/pages/demand/index'
import demandListIndex from '@/pages/demand/list/index'
import movieDemandList from '@/pages/demand/list/movie-demand-list'
import tvDemandList from '@/pages/demand/list/tv-demand-list'
import adDemandList from '@/pages/demand/list/ad-demand-list'
import showDemandList from '@/pages/demand/list/show-demand-list'
import varietyDemandList from '@/pages/demand/list/variety-demand-list'
import internetDemandList from '@/pages/demand/list/internet-demand-list'
import comicDemandList from '@/pages/demand/list/comic-demand-list'

import api from '@/api'

Vue.use(Router)
const router= new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'index',
        //     meta: {
        //         title: '登录'
        //     },
        //     component: login
        // },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: login
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                title: '注册'
            },
            component: register
        },
        {
            path: '/forgetPassword1',
            name: 'forgetPassword1',
            meta: {
                title: '找回密码'
            },
            component: forgetPassword1
        },
        {
            path: '/forgetPassword2/:id',
            name: 'forgetPassword2',
            meta: {
                title: '找回密码'
            },
            component: forgetPassword2
        },
        {
            path: '/artistAudit',
            name: 'artistAudit',
            meta: {
                title: '艺人审核'
            },
            component: artistAudit
        },
        {
            path: '/artistAuditSuccess',
            name: 'artistAuditSuccess',
            meta: {
                title: '艺人审核'
            },
            component: artistAuditSuccess
        },
        {
            path: '/artistAuditFail',
            name: 'artistAuditFail',
            meta: {
                title: '艺人审核'
            },
            component: artistAuditFail
        },{
            path: '/payment/:id',
            name: 'payment',
            meta: {
                title: '购买'
            },
            component: payment
        },{
            path: '/demandPayment/:demandid',
            name: 'demandPayment',
            meta: {
                title: '购买'
            },
            component: demandPayment
        },
        {
            // path: '/recharge',
            path: '/',
            name: 'recharge',
            meta: {
                title: '充值'
            },
            component: recharge
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            meta: {
                title: '用户中心'
            },
            component: userCenter
        },
        {
            path: '/starList',
            name: 'starList',
            meta: {
                title: '明星列表'
            },
            component: starList
        },
        {
            path: '/details/:id',
            name: 'details',
            meta: {
                title: '明星详情'
            },
            component: details,
            children:[
                {
                    path: '/details/:id/baseInfo',
                    name: 'baseInfo',
                    meta: {
                        title: '明星详情'
                    },
                    component: baseInfo
                },
                {
                    path: '/details/:id/project',
                    name: 'project',
                    meta: {
                        title: '明星详情'
                    },
                    component: project
                },
                {
                    path: '/details/:id/schedule',
                    name: 'schedule',
                    meta: {
                        title: '明星详情'
                    },
                    component: schedule,
                    children:[
                        {
                            path: '/details/:id/schedule/movieSchedule',
                            name: 'movieSchedule',
                            meta: {
                                title: '明星详情'
                            },
                            component: movieSchedule
                        },{
                            path: '/details/:id/schedule/adIndex',
                            name: 'adIndex',
                            component: adIndex,
                            children:[
                                {
                                    path: '/details/:id/schedule/adIndex/adSchedule',
                                    name: 'adSchedule',
                                    meta: {
                                        title: '明星详情'
                                    },
                                    component: adSchedule
                                },
                                {
                                    path: '/details/:id/schedule/adIndex/adSelect',
                                    name: 'adSelect',
                                    meta: {
                                        title: '明星详情'
                                    },
                                    component: adSelect
                                }
                            ]
                        },{
                            path: '/details/:id/schedule/showsSchedule',
                            name: 'showsSchedule',
                            meta: {
                                title: '明星详情'
                            },
                            component: showsSchedule
                        }
                    ]
                },
                {
                    path: '/details/:id/movies',
                    name: 'movies',
                    meta: {
                        title: '明星详情'
                    },
                    component: movies
                },
                {
                    path: '/details/:id/music',
                    name: 'music',
                    meta: {
                        title: '明星详情'
                    },
                    component: music,
                    children:[
                        {
                            path: '/details/:id/music/records',
                            name: 'records',
                            meta: {
                                title: '明星详情'
                            },
                            component: records
                        },
                        {
                            path: '/details/:id/music/shows',
                            name: 'shows',
                            meta: {
                                title: '明星详情'
                            },
                            component: shows
                        }
                    ]
                },
                {
                    path: '/details/:id/internet',
                    name: 'internet',
                    meta: {
                        title: '明星详情'
                    },
                    component: internet
                }
            ]
        },
        {
            path: '/edit/:id',
            name: 'edit',
            meta: {
                title: '编辑'
            },
            component: edit,
            children:[
                {
                    path: '/edit/:id/baseInfoEdit',
                    name: 'baseInfoEdit',
                    meta: {
                        title: '编辑-基本信息'
                    },
                    component: baseInfoEdit
                },
                {
                    path: '/edit/:id/recordEditor',
                    name: 'recordEditor',
                    meta: {
                        title: '编辑-唱片'
                    },
                    component: recordEditor
                },
                {
                    path: '/edit/:id/starProject',
                    name: 'starProject',
                    meta: {
                        title: '编辑-项目'
                    },
                    component: starProject
                },
                {
                    path: '/edit/:id/starShow',
                    name: 'starShow',
                    meta: {
                        title: '编辑-演出'
                    },
                    component: starShow
                },
                {
                    path: '/edit/:id/scheduleEdit',
                    name: 'scheduleEdit',
                    meta: {
                        title: '编辑-档期'
                    },
                    component: scheduleEdit
                }
            ]
        },
        {
            path: '/demand/index',
            name: 'demand',
            meta: {
                title: '需求上传'
            },
            component: demand
        },
        {
            path: '/demand/list/index',
            name: 'demandListIndex',
            meta: {
                title: '需求信息'
            },
            component: demandListIndex,
            children:[
                {
                    path: '/demand/list/movieDemandList',
                    name: 'movieDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: movieDemandList
                },
                {
                    path: '/demand/list/tvDemandList',
                    name: 'tvDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: tvDemandList
                },
                {
                    path: '/demand/list/adDemandList',
                    name: 'adDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: adDemandList
                },
                {
                    path: '/demand/list/showDemandList',
                    name: 'showDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: showDemandList
                },
                {
                    path: '/demand/list/varietyDemandList',
                    name: 'varietyDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: varietyDemandList
                },
                {
                    path: '/demand/list/internetDemandList',
                    name: 'internetDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: internetDemandList
                },
                {
                    path: '/demand/list/comicDemandList',
                    name: 'comicDemandList',
                    meta: {
                        title: '需求信息'
                    },
                    component: comicDemandList
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title      //动态切换文档标题

    //微信分享自定义设置
    api.getSign(encodeURIComponent(location.href.split('#')[0]))    //访问接口获取以下需要的参数
        .then((res) => {
            if(res.result == '1'){
                wx.config({
                    debug: false,
                    appId: res.data[0].appid, // 必填，公众号的唯一标识
                    timestamp: res.data[0].timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data[0].nonceStr, // 必填，生成签名的随机串
                    signature: res.data[0].signature,// 必填，签名
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    let sharedParams = {            //分享参数(朋友圈除外)
                        title: '', // 分享标题
                        desc: '星购云经纪平台', // 分享描述
                        link: location.href, // 分享链接
                        imgUrl:  'http://xingouh5.9cfcf.com/static/img/sharedLogo.jpg' // 分享图标
                    }

                    if(to.meta.title == '明星详情'){
                        let starName = ''
                        api.getNameByID(to.params.id)
                            .then((res) =>{
                                if(res.result == '1'){
                                    starName = res.data[0].name
                                    sharedParams.title = starName+'星数据'    //如：葛优星数据
                                } else{
                                    sharedParams.title = '星数据'
                                }
                                //分享到朋友圈
                                wx.onMenuShareTimeline(sharedParams);
                                //分享给朋友
                                wx.onMenuShareAppMessage(sharedParams);
                                //分享到QQ
                                wx.onMenuShareQQ(sharedParams);
                                //分享到腾讯微博
                                wx.onMenuShareWeibo(sharedParams);
                                //分享到QQ空间
                                wx.onMenuShareQZone(sharedParams);
                            })
                    } else{
                        sharedParams.title = to.meta.title
                        //分享到朋友圈
                        wx.onMenuShareTimeline(sharedParams);
                        //分享给朋友
                        wx.onMenuShareAppMessage(sharedParams);
                        //分享到QQ
                        wx.onMenuShareQQ(sharedParams);
                        //分享到腾讯微博
                        wx.onMenuShareWeibo(sharedParams);
                        //分享到QQ空间
                        wx.onMenuShareQZone(sharedParams);
                    }
                });
            }
        })

    next()
})

export default router