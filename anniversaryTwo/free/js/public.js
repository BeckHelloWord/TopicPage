/**
 * Created by Administrator on 2017/3/23.
 */
/*加载商品*/
var u = navigator.userAgent;
index();
function index(){
    $.ajax({
        url:'/act-znq-center/mall-list.html',
        success:function (json) {
            $(".mcItem ul").html(template('tp-test',json));
            $(".pub-prompt").html(template('tp-prompt',json));
            layerGoods();
            layerYyGoods();
        }
    });
}

/*排序*/
$(".sort").on("click",function (e) {
    var data = {};
    if($(this).hasClass("sortStart")){
        data.sort = "down";
        $(this).addClass("sortUp").removeClass("sortStart");
    }else if($(this).hasClass("sortUp")){
        data.sort = "up";
        $(this).addClass("sortDown").removeClass("sortUp");
    }else if($(this).hasClass("sortDown")){
        data.sort = "down";
        $(this).addClass("sortUp").removeClass("sortDown");
    }
    $.ajax({
        url:'/act-znq-center/mall-list.html',
        type:'post',
        data: data,
        success:function (json) {
            $(".mcItem ul").html(template('tp-test',json));
            layerGoods();
            layerYyGoods();
        }
    });
    e.preventDefault();
});
/*商品弹框*/
function layerGoods() {
    $(".layerBtn").on("click",function (e) {
        var id = $(this).parents("li").attr("id");
        $.ajax({
            url:'/act-znq-center/mall-list.html',
            type:'post',
            data:{giftId: id},
            success:function(json){
                if(!json.type){
                    if(typeof layer.msg === "function"){
                        layer.msg(json.message);
                    }else{
                        layer.open({
                            content:json.message
                            ,skin: 'msg'
                            ,time:2
                        });
                    }
                    return false;
                }

                for(var i = 0, len = json.list.length; i < len; i++){
                    json.list[i].description = $(json.list[i].description).text();
                }

                $("#mask").show();
                $("#mask").html(template('tp-mask',json));

                maskBtn(id);

                /*关闭弹框*/
                $("#mask .close").on("click",function(){
                    $("#mask").hide();
                });
            }

        });
        e.preventDefault();
    });
}
function layerYyGoods() {
    $(".layerBtn-yy").on("click",function (e) {
        var id = $(this).parents("li").attr("id");
        $.ajax({
            url:'/act-znq-center/plan.html',
            type:'post',
            data:{giftId: id},
            success:function(json){
                if(!json.success){
                    pmLogin();
                    return false;
                }
                if(!json.type){
                    if(typeof layer.msg === "function"){
                        layer.msg(json.message);
                    }else{
                        layer.open({
                            content:json.message
                            ,skin: 'msg'
                            ,time:2
                        });
                    }
                    return false;
                }
                var con = "";
                if(json.isFirstPlan){
                    con = "预约成功";
                }else{
                    con = "已经预约";
                }

                if(typeof layer.msg === "function"){
                    layer.msg(con);
                }else{
                    layer.open({
                        content:con
                        ,skin: 'msg'
                        ,time:2
                    });
                }
            }

        });
        e.preventDefault();
    });
}

function maskBtn(id){
    $("#mask-p-btn").on("click",function(e){
        $.ajax({
            url:'/act-znq-center/free-get.html',
            type:'post',
            data:{giftId: id},
            success:function(json){
                if(!json.success){
                    pmLogin();
                    return false;
                }
                if(!json.type){
                    layer.open({
                        content:json.message,
                        btn: ['去投资', '知道了'],
                        yes: function(index){
                            getInvest();
                            $(".mask").hide();
                            layer.close(index);
                        }
                    });
                    return false;
                }
                if(typeof layer.msg === "function"){
                    layer.msg("白拿成功");
                }else{
                    layer.open({
                        content:"白拿成功"
                        ,skin: 'msg'
                        ,time:2
                    });
                }

                $("#mask").hide();
                index();
            }

        });
        e.preventDefault();
    })
}

function getInvest() {
    $.ajax({
        url:'/act-znq-center/go-invest.html',
        success:function (json) {
            if(!json.type) {
                if(typeof layer.msg === "function"){
                    layer.msg(json.message);
                }else{
                    layer.open({
                        content:json.message
                        ,skin: 'msg'
                        ,time:5
                    });
                }
                $("#mask").hide();
                return false;
            }
            if (/baoxiang/.test(navigator.userAgent)) {
                location.href = "baoxiang://APPProjectInvesting?type=invest&investId="+json.investId;
            }else{
                location.href = "/lc/invest/detail/"+ json.investId +".html"
            }
        }
    })
}

function pmLogin(){
    if(!!u.match(/AppleWebKit.*Mobile.*/) && !!u.match(/AppleWebKit/)){
        loginFun("/topic/anniversaryTwo/free/index_mobile.html");
    }else{
        loginFun();
    }
}