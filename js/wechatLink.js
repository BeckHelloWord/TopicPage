/**
 * Created by huangyexin on 2016/8/31.
 */

/*
使用范例

 var wechatShare=new WeChatShare();//创建对象
 var shareData = {//创建数据
 title: "分散测试",
 desc: "宝象金融新产品测试",
 link: location.href,
 imgUrl: "http://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1608/0ca304ef-f2f0-4a0c-aaa3-260bbf8f9f30.jpg"
 };
 var showList = {//创建显示菜单列表，默认全部关闭
 menuList: [
 'menuItem:readMode', // 阅读模式
 'menuItem:share:timeline', // 分享到朋友圈
 'menuItem:copyUrl' // 复制链接
 ]
 };
 wechatShare.init(shareData,showList);//创建分享 自定义菜单
 wechatShare.init(shareData);//创建分享默认菜单
* */
Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
function WeChatShare() {}
WeChatShare.prototype.init = function(shareConfig,showList) {
    WeChatShare.loadjs('//res.wx.qq.com/open/js/jweixin-1.0.0.js',this.share,shareConfig,showList)
}
WeChatShare.loadjs=function(src,func,shareConfig,showList)
{
    if(typeof func != 'function')
    {
        console.log('param 2 is not a function!!') ;
        return false ;
    }
    //判断这个js文件存在直接执行回调
    var scripts = document.getElementsByTagName('script') ;
    for(i in scripts)
        if(scripts[i].src == src)
            return func(shareConfig,showList) ;

    var script = document.createElement('script') ;
    script.type ='text/javascript' ;
    script.src = src ;
    var head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);
    script.onload = function(){
        func(shareConfig,showList);
    }
}

WeChatShare.prototype.share=function(shareConfig,showList){
    Object.extend(WeChatShare.shareData, shareConfig || {});
    console.log(WeChatShare.shareData)
    $.ajax({
        url: "/wechat/sign.html",
        data: {url: location.href},
        success: function (data) {
            // 微信分享事件监听
            wx.config({
                debug: false,
                appId: data.appId, // 公众号的唯一标识
                timestamp: data.timestamp, // 生成签名的时间戳
                nonceStr: data.nonceStr, // 生成签名的随机串
                signature: data.signature, // 签名
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'hideMenuItems',
                    'hideAllNonBaseMenuItem',
                    'hideOptionMenu',
                    'hideOptionMenu',
                    'showMenuItems',
                    'hideMenuItem'
                ]
            });
            wx.ready(function () {
                //全部屏蔽掉
                if(showList){
                    wx.hideOptionMenu()
                    wx.showMenuItems(showList);
                }else{
                    wx.hideOptionMenu()
                }
                
              
                //分享到朋友圈
                wx.onMenuShareTimeline(WeChatShare.shareData);
                //分享到微信好友
                wx.onMenuShareAppMessage(WeChatShare.shareData);
                wx.onMenuShareQQ(WeChatShare.shareData);
                wx.onMenuShareWeibo(WeChatShare.shareData);
            });
        }
    });

}
////默认菜单
//WeChatShare.showList = {
//    menuList: ['menuItem:copyUrl',//复制链接
//        'menuItem:delete',//删除
//        'menuItem:originPage',//原网页
//        'menuItem:readMode',//阅读模式
//        'menuItem:openWithQQBrowser',//在QQ浏览器中打开
//        'menuItem:openWithSafari',//在Safari中打开
//        'menuItem:share:email',//邮件
//        'menuItem:share:brand',//一些特殊公众号
//        'menuItem:share:qq',//分享到QQ
//        'menuItem:share:weiboApp',//分享到Weibo
//        'menuItem:favorite',//收藏
//        'menuItem:share:facebook',//分享到FB
//        'menuItem:share:QZone',//分享到 QQ 空间
//        'menuItem:editTag',//编辑标签
//        'menuItem:exposeArticle',//举报
//        'menuItem:share:timeline',//分享到朋友圈
//        'menuItem:setFont',//调整字体
//        'menuItem:share:appMessage']//发送给朋友
//};
//默认分享内容
var meta = document.getElementsByTagName('meta');
var share_desc = '';
for(i in meta){
    if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
        share_desc = meta[i].content;
    }
}
WeChatShare.shareData = {//默认值

    title: document.title?document.title:"宝象金融_专注于农牧食品业供应链金融的互联网金融平台 - 宝象金融",
    desc: share_desc?share_desc:"宝象金融(www.bxjr.com)是一家专注于农牧食品业供应链金融领域的互联网金融平台,精耕于供应链金融模式,从而为广大投资者提供高效低风险的互联网理财产品.同时,宝象金融提供包括互联网理财,投资,借款等服务.",
    link: location.href,
    imgUrl: "http://m.bawsun.com/topic/201601/newYear/images/logo.jpg"
};
