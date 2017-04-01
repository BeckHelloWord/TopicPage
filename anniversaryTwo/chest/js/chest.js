(function(){
    var mask = $(".mask"),
        successCont = mask.find(".success"),
        failCont = mask.find(".fail"),
        u = navigator.userAgent; // 排名;
    /*音乐*/
    var car_audio_open = document.querySelector('#car_audio_open');

    function playAudio() {
        car_audio_open.play();
    }
    function pauseAudio() {
        car_audio_open.pause();
    }

    // 礼品列表
    $.ajax({
        url: "/act-znq-box/award-list.html",
        success: function(result){
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
            
            $(".js-chest-list").html(template('chestList', result));
        }
    });
    
    // 开宝箱
    $(".js-play-btn").on("click", function(e){
        e.preventDefault();
        $.ajax({
            url: "/act-znq-box/lottery.html",
            success: function(result){
                if(!result.success){
                    location.href = "/login/index.html?redirect=" + location.href;

                    return false;
                }

                if(!result.type){
                    if(result.message && result.message == "欢乐券不足！"){
                        mask.show();
                        failCont.show().siblings(".cont").hide();
                        
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
                if(!!u.match(/AppleWebKit.*Mobile.*/) && !!u.match(/AppleWebKit/)){
                    playAudio();
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                            playAudio();
                        });
                    }, false);
                }

                mask.show();
                successCont.show().siblings(".cont").hide();
                successCont.find(".hd").text("恭喜您获得" + result.gift.name + "一份！");
                successCont.find("img").attr("src", result.gift.logo);
            }
        });
    });


    $(".js-close").on("click", function(e){
        e.preventDefault();

        mask.hide();
        if(!!u.match(/AppleWebKit.*Mobile.*/) && !!u.match(/AppleWebKit/)){
            pauseAudio();
        }
    });
}());