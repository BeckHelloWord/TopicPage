(function(){
    "use strict"; // 严格模式
    var serverTime = getServerTime().getTime(),// 服务器时间
        t="";
    $.ajax({
        url:'/act-year-end-lucky/index.html',
        cache:false,
        success:function(json){
            if(!json.success){
                loginFun();
                return false;
            }
            if(!json.type){
                layer.open({
                    content: json.message
                });
                return false;
            }
            var html="";
            for(var i = 0,len = json.voucherList.length;i<len;i++){
                html += '<li class="clearfix">';
                html += '<i class='+ json.voucherList[i].userType +'></i>';
                html += '<span class="s1 ss">'+ json.voucherList[i].userName +'</span>';
                html +='<span class="s2 ss">'+ json.voucherList[i].investAmount +'</span>';
                html +='<span class="s3 ss">'+ json.voucherList[i].dateCreated +'</span>' ;
                html +='<span class="s4 ss">'+ json.voucherList[i].voucherAmout +'元</span></li>';
            }

            $(".noteUl").html(html);
            $(".investMoney").html(json.investMoney);
            $(".cycleDay").html(json.cycleDay);
            $(".canInvestMoney").html(json.canInvestMoney);
            $(".voucherTotal").html(json.voucherTotal);
            $(".voucherCount").html(json.voucherCount);
            $(".voucherCanUsedAmount").html(json.voucherCanUsedAmount);
            $(".canUsedMoeny").html(json.canUsedMoeny);
            $(".voucherSendCount").html(json.voucherSendCount);


            t = setInterval(function(){
                var t = new Date(serverTime);
                t.setSeconds(t.getSeconds() + 1);
                serverTime = t;

                timer(json.endTime.replace(/-/g,'/'))
            }, 1000);

            $(".btnDiv").html('<a href="/lc/invest/detail/'+ json.investId +'.html" class="h5-btnGroup t_c btnGroup appUrl" data-app-url="baoxiang://APPProjectInvesting?type=invest&investId='+ json.investId +'">立即投资</a>');
            appUrl();
            end();
        }
    });

    function timer(date){
        var endTime = new Date(date).getTime(), // 结束时间
            ts = endTime - serverTime, // 计算剩余的毫秒数
            dd = parseInt(ts / 1000 / 60 / 60 / 24, 10), // 计算剩余的天数
            hh = parseInt(ts / 1000 / 60 / 60 % 24, 10), // 计算剩余的小时数
            mm = parseInt(ts / 1000 / 60 % 60, 10), // 计算剩余的分钟数
            ss = parseInt(ts / 1000 % 60, 10); // 计算剩余的秒数

        dd = checkTime(dd);
        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);

        $("#time_d").text(dd);
        $("#time_h").text(hh);
        $("#time_m").text(mm);
        $("#time_s").text(ss);

           if(ts <= 0){
               clearInterval(t);
               $("#time_d").text("00");
               $("#time_h").text("00");
               $("#time_m").text("00");
               $("#time_s").text("00");
               $(".h5-btnGroup,.btnGroup").addClass("end");
               end();
           }

        if($(".canInvestMoney").text() == 0){
            clearInterval(t);
            $("#time_d").text("00");
            $("#time_h").text("00");
            $("#time_m").text("00");
            $("#time_s").text("00");
            $(".h5-btnGroup,.btnGroup").addClass("end");
            end();
        }
    }//倒计时


    function checkTime(i){
        if (i < 10) {
            i = "0" + i;
        }

        return i;
    }
    end();
    function end(){
        $(".end").on("click", function(e){
            e.preventDefault();
        });
    }


}());