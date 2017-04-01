(function(){
    var sign = $(".js-sign li"),
        btn = $(".js-sign-btn"),
        signTotal = $(".js-sign-total"), // 累计签到天数
        ticketNumber = $(".js-ticket-number"), // 欢乐券
        ticketNumberNo = $(".js-ticket-number-no"),
        u = navigator.userAgent; // 排名
    
    dataInit();
    
    function dataInit(){
        $.ajax({
            url: "/act-znq-center/sign-index.html",
            success: function(result){
                if(!result.type){
                    if(result.message && result.message == "用户没有登录"){
                        return false;
                    }

                    if(typeof layer.msg === "function"){
                        layer.msg(result.message);
                    }else{
                        layer.open({
                            content:result.message
                            ,skin: 'msg'
                            ,time:2
                        });
                    }

                    return false;
                }

                if(result.signToday){
                    btn.html('<img src="images/right.png" alt="" />&nbsp;&nbsp;已 签 到');
                    btn.addClass("disabled");
                }

                sign.removeClass("curr");
                signTotal.text(result.signTotal);
                ticketNumber.text(result.ticketNumber);
                ticketNumberNo.text(result.ticketNumberNo);

                for(var i = 0; i < result.signDay; i ++){
                    sign.eq(i).addClass("curr");
                }
            }
        });
    }
    
    // 签到
    btn.on("click", function(e){
        e.preventDefault();
        
        if($(this).hasClass("disabled")){
            return false;
        }
        
        $.ajax({
            url: "/act-znq-center/sign.html",
            success: function(result){
                if(!result.success){
                    location.href = "/login/index.html?redirect=/topic/anniversaryTwo/main/sign.html";

                    return false;
                }

                if(!result.type){
                    if(typeof layer.msg === "function"){
                        layer.msg(result.message);
                    }else{
                        layer.open({
                            content:result.message
                            ,skin: 'msg'
                            ,time:2
                        });
                    }

                    return false;
                }
                
                $(".js-ticket-num").text("+" + result.ticketNum);
                $(".mask").show();
                dataInit();
            }
        });
    });
    
    $(".mask .js-close").on("click", function(e){
        e.preventDefault();
        
        $(".mask").hide();
    });
    
    // 排行榜
    $.ajax({
        url: "/act-znq-center/hero-list.html",
        success: function(result){
            if(!result.type){
                layer.open({content: result.message});

                return false;
            }

            if(!!u.match(/AppleWebKit.*Mobile.*/) && !!u.match(/AppleWebKit/)){
                result.used60 = result.used60.slice(0,10);
                result.left60 = result.left60.slice(0,10);
            }

            $(".js-consume").html(template('rankConsume', result));
            $(".js-treasure").html(template('rankTreasure', result));

            if( result.used60.length > 20 ){
                if(typeof rankScrollConsume === "function"){
                    rankScrollConsume();
                }
            }
            if( result.left60.length > 20 ){
                if(typeof rankScrollTreasure === "function"){
                    rankScrollTreasure();
                }
            }

        }
    });
}());