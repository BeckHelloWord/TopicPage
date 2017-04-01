(function(){
    var isLogin = $(".js-isLogin");

    // 判断是否登录，显示投资金额
    $.ajax({
        url:'/act-year-end/game-count.html',
        success:function(json) {
            if (!json.success) {
                isLogin.html('<a href="/login/index.html?redirect=/topic/201611/dayDay/">请登录查看</a>');
                
                return false;
            }
            
            if (!json.type) {
                layer.open({
                    content: json.message
                });
                
                return false;
            }
            
            isLogin.eq(0).html(json.investAmount + '<em>元</em>');
            isLogin.eq(1).html(json.investCount-json.investUsedCount + '<em>次</em>');
        }
    });
    
//    // 倒计时
//    timer();
//
//    function timer(){
//
//        var serverTime = getServerTime().getTime(), // 服务器时间
//            endTime = new Date('2016/12/22 18:00:00').getTime(), // 结束时间
//            ts = endTime - serverTime, // 计算剩余的毫秒数
//            dd = parseInt(ts / 1000 / 60 / 60 / 24, 10), // 计算剩余的天数
//            hh = parseInt(ts / 1000 / 60 / 60 % 24, 10), // 计算剩余的小时数
//            mm = parseInt(ts / 1000 / 60 % 60, 10), // 计算剩余的分钟数
//            ss = parseInt(ts / 1000 % 60, 10); // 计算剩余的秒数  
//
//        dd = checkTime(dd);
//        hh = checkTime(hh);
//        mm = checkTime(mm);
//        ss = checkTime(ss);
//
//        var html = "<span>" + dd + "</span>天<span>" + hh + "</span>时<span>" + mm + "</span>分";
//
//        $(".js-time").html(html);
//
//        var t = setInterval(function(){ timer(); }, 1000 * 60);
//
//        if(ts <= 0){
//            clearInterval(t);
//            
//            if(timerFinish){
//                
//            }
//        }
//    };
//
//    function checkTime(i){
//        if (i < 10) {
//            i = "0" + i;
//        }
//
//        return i;
//    } 
}());