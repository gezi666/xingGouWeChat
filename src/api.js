import axios from 'axios'
import baseconfig from '@/assets/js/config'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseconfig.baseURL;
// axios.defaults.withCredentials = true;

export function Post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export function Get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return Get(`/user/login?username=${params.username}&password=${params.password}`)
    },
    /**
     * 退出
     */
    loginOut() {
        return Get(`/user/loginOut`)
    },
    /**
     * 用户注册
     */
    Regist(params) {
        return Post('/user/register', params)
    },
    /**
     * 发送手机验证码
     */
    SendCaptcha(params) {
        return Get(`/user/sendCaptcha?phonenumber=${params.username}&imgcode=${params.imgcaptcha}`)
    },
    /**
     * 修改密码获取验证码
     */
    getCaptcha(params) {
        return Get(`/user/getCaptcha?phonenumber=${params.username}&imgcode=${params.imgcaptcha}`)
    },
    /**
     * 修改密码验证验证码
     */
    checkCaptcha(params) {
        return Get(`/user/checkCaptcha?phonenumber=${params.username}&captcha=${params.captcha}`)
    },
    /**
     * 设置新密码
     */
    resetPassword(params) {
        return Get(`/user/resetPassword?phonenumber=${params.phonenumber}&newpassword=${params.newpassword}`)
    },
    /**
     * 用户中心-明星管理
     */
    userCenter(params){
        return Get(`/wechatusercenter/userstarinfo?userid=${params.userid}`)
    },
    /**
     * 用户中心-数据（用户名、余额、订单信息）
     */
    userallInfo(params){
        return Get(`/wechatusercenter/userallinfo?userid=${params.userid}`)
    },
    /**
     * 明星列表
     */
    starlist(params) {
        // return Get(` /wechatpersonalinfo/wechatstarlist?profession=${params.profession}&sex=${params.sex}`)
        return Get(` /wechatpersonalinfo/wechatstarlist?sex=${params.sex}`)
    },
    /**
     * 获取明星基本信息
     */
    starBaseInfo(params) {
        return Get(`/wechatpersonalinfo/wechatstarDetails?starid=${params.starid}`)
    },
    /**
     * 获取项目列表
     */
    getProjectList(params) {
        return Get(`/wechatstarproject/findstarprojectpage?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 获取-档期-影视列表
     */
    getMovieSchedule(params) {
        return Get(`/wechatmovie/findmoviepage?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 获取-档期-已接广告列表
     */
    getReceivedADList(params) {
        return Get(`/wechatstaradvertisement/findstaradvertisementpage?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 获取-档期-可接广告列表
     */
    getReceivedAD(params) {
        return Get(`/wechatstaradvertisement/getstarcanadvertisement?starid=${params.starid}`)
    },
    /**
     * 获取-档期-演出列表
     */
    getShowsSchedule(params) {
        return Get(`/wechatstarshow/findstarshowpage?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 明星详情-音乐-唱片-列表
     */
    starDetailsRecords(params) {
        return Get(`/wechatmusic/wechatmusic?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 明星详情-音乐-演出-列表
     */
    starDetailsShows(params) {
        return Get(`/wechatmusic/wechatperformanceinfo?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 明星详情-互联网-媒体关注趋势
     */
    starDetailsNetAttTrend(params) {
        return Get(`/wechatpublicopinion/wechatattentionTrend?starid=${params}`)
    },
    /**
     * 明星详情-互联网-各媒体类型关注趋势
     */
    starDetailsNetAttTrendEach(params) {
        return Get(`/wechatpublicopinion/wechatattentionTrendEach?starid=${params}`)
    },
    /**
     * 明星详情-互联网-总体好评率
     */
    starDetailsNetPraisering(params) {
        return Get(`/wechatpublicopinion/wechatpraisering?starid=${params}`)
    },
    /**
     * 明星详情-互联网-地域分布
     */
    starDetailsNetArealDistribution(params) {
        return Get(`/wechatpublicopinion/wechatarealDistribution?starid=${params}`)
    },
    /**
     * 明星详情-互联网-相关动态
     */
    starDetailsNetDynamic(params) {
        return Get(`/wechatpublicopinion/wechatrelateddynamic?starid=${params}`)
    },
    /**
     * 明星详情-影视-电视剧收视率排行
     */
    starDetailsMovieTv(params) {
        return Get(`/wechatmovieandtvseries/wechatratingsrankings?starid=${params}`)
    },
    /**
     * 明星详情-影视-电视剧在线播放量
     */
    starDetailsMovieOnline(params) {
        return Get(`/wechatmovieandtvseries/wechattvonlineranking?starid=${params}`)
    },
    /**
     * 明星详情-影视-电影票房排行
     */
    starDetailsMovieBoxOffice(params) {
        return Get(`/wechatmovieandtvseries/wechatboxofficranking?starid=${params}`)
    },
    /**
     * 明星详情-影视-电影在线播放量
     */
    starDetailsMovieOnlineMovie(params) {
        return Get(`/wechatmovieandtvseries/wechatmovieonlineranking?starid=${params}`)
    },
    /**
     * 明星详情-影视-豆瓣评分
     */
    starDetailsValveScore(params) {
        return Get(`/wechatmovieandtvseries/wechatdoubaoscore?starid=${params.starid}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 明星详情-编辑项目-项目信息查询接口
     */
    starProject(params){
        return Get(`/wechatstarproject/getproject?starid=${params.starid}`)
    },
    /**
     * 明星详情-编辑项目-项目信息编辑接口
     */
    updateoradd(params){
        return Post(`/wechatstarproject/updateoradd?starid=${params.starid}&introduce=${params.introduce}&starttime=${params.starttime}`)
    },
    /**
    * 明星详情-编辑-音乐-唱片
    */
    getMusiclist(params) {
        return Get(`/wechatschedule/musiclist?starid=${params.starid}`)
    },
    /**
     * 明星详情-编辑-演出-演出信息
     */
    getStarshow(params) {
        return Get(`/wechatschedule/performancelist?starid=${params.starid}`)
    },


    // 支付、购买
    /**
     * 购买支付-充值-向微信发起获取openid请求，请求成功后微信会将openid返给后台   --- 1   备注： 登录后查看后台返回的openid是否有值，若没有值，则向微信发送请求  (不要走接口，直接跳链接)
     */
    applyForOpenid(params) {
        let serverUrl = urlencode(baseconfig.baseURL)
        return Get(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=**yourappid**&redirect_uri=${serverUrl}/oauth/val&response_type=code&scope=snsapi_base&state=${params}#wechat_redirect`)
    },
    /**
     * 购买支付-充值-从后台获取微信返回的openid   --- 2   备注：充值时先看cookie中openid是否有值，若没有值，则从后台请求openid，请求回来也要存入cookie；然后调接口获取微信支付接口所需信息--打开支付界面进行支付
     */
    getOpenid(params) {
        // return Get(`/wechatusercenter/getOpenid?userid=${params.userid}`)
        return Get(`/oauth/openidByWeb?code=${params.code}&state=${params.userid}`)
    },
    /**
     * 购买支付-充值-从后台获取微信支付接口所需信息   --- 3
     */
    getWeChatPayInfo(params) {
        return Post('/wechatorders/recharge',params)
    },
    /**
     * 购买支付-充值-打开微信支付界面进行支付   --- 4
     */


    /**
     * 购买支付-充值-获取用户当前余额
     */
    getCurrentBalance(params) {
        return Get(`/wechatusercenter/useraccount?userid=${params.userid}`)
    },
    /**
     * 购买支付-购买-获取明星数据购买价格
     */
    getStarMoney(params) {
        return Get(`/wechatpersonalinfo/getStarMoney?starid=${params.starid}`)
    },
    /**
     * 购买支付-购买-获取需求购买价格
     */
    getDemandMoney(params) {
        return Get(`/wechatuserdemand/userdemandmoney?demandid=${params.demandid}`)
    },
    /**
     * 购买支付-购买-用账户余额购买数据
     * 参数：type -- 1=明星购买 2= 需求够买；starid -- Type为2时starid=0；demandid -- Type为2时填写
     */
    balanceBuy(params) {
            return Get(`/wechatdeal/pay?userid=${params.userid}&starid=${params.starid}&type=${params.type}&demandid=${params.demandid}`)
    },
    /**
     * 需求大厅-需求列表-获取需求地点、需求时间集合
     */
    getDemandLoactionAndTimeList(params) {
        return Get(`/wechatuserdemand/userdemandselect?demandtype=${params.demandtype}`)
    },
    /**
     * 需求大厅-需求列表-获取需求列表
     * 参数：demandtype -- 1=电影 2=电视剧 3=广告 4=演出 5=综艺节目 6=网络 7=动漫
     */
    getDemandList(params) {
        return Get(`/wechatuserdemand/userdemandinfo?demandtime=${params.demandtime}&location=${params.location}&demandtype=${params.demandtype}&page=${params.page}&rows=${params.rows}`)
    },
    /**
     * 根据明星ID获取明星名称
     * 参数：starid -- 明星ID
     */
    getNameByID(params) {
        return Get(`/wechatpersonalinfo/getStarName?starid=${params}`)
    },
    /**获取jssdk签名
     */
    getSign(params) {
        return Get(`/wechatjssdk/sign?url=${params}`)
    }
}
