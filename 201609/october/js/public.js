
/*活动是否结束*/
$.ajax({
    url: '/lottery-national-day/activity-is-run.html',
    success: function (json) {
        if (!json.type) {
            if (json.isEnd) {
                $("body").addClass("isEnd");

                $(".isEndBtn ").addClass("dis");
                $(".count").show();

                isEndBtnClick();
            }
        }
    }
});
function isEndBtnClick(){
    $(".isEndBtn").on("click", function (e) {
        if ($(this).hasClass("dis")) {
            return false;
        }
    });
}

/*关注*/
function attention(){
    $(".attention").css({"height": "100%"});
}
$(".attention").click(function () {
    $(this).css({height: "0"});
});

function getNewImage(url){
    var imgHostName = url.slice(0, 39), imgStr = "http://bxwd-img.img-cn-hangzhou.aliyuncs.com";
    return url.replace(imgHostName, imgStr) + "@2o_0l_400w_90q.src";
}

function shareWeChat(){
    var wechatShare=new WeChatShare();//创建对象
    var shareData = {
        title: "晒旅行照，赢护肤好礼",
        desc: "长假结束不在状态？宝象为你fresh回来！",
        link: location.href,
        imgUrl: "http://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1609/c523c83d-9773-4ecd-a145-363480cb0baa.jpg"
    };
    var showList = {//创建显示菜单列表，默认全部关闭
        menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:qq',
            'menuItem:readMode', // 阅读模式
            'menuItem:share:timeline', // 分享到朋友圈
            'menuItem:copyUrl' // 复制链接
        ]
    };
    wechatShare.init(shareData,showList);//创建分享 自定义菜单
}
    getPageId();
    function getPageId(){
        var sNum = localStorage.getItem("pageid");
        if(sNum == null || sNum == undefined || sNum == "undefined" || sNum == "null"){
            return false;
        }else if(sNum == 0){
            layer.open({
                content:"请稍等,正在跳转到投票页面..."
            });
            location.href="/topic/201609/october/list.html";
            localStorage.removeItem("pageid");
        }else{
            layer.open({
                content:"请稍等,正在跳转到投票页面..."
            });
            location.href="/topic/201609/october/vote.html?photoId=" + sNum;
            localStorage.removeItem("pageid");
        }
    }
