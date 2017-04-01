/**
* 倒计时函数
* @param secs = 总倒计时时间（单位秒）
* @param callback = 每秒回调的函数function(当前的秒数，总秒数)
*/
window.countdown = function countdown(secs, callback){
    var countSecs = secs;
    var recursive = function(){
        callback(secs, countSecs);
        if(secs == 0){
            return;
        }
        secs --;
        setTimeout(recursive, 1000);
    }
    recursive();
}

/**
* 发送验证码 有输入支付密码（#outPassword）的时候会自动检测支付密码是否输入
* @param url = 请求发送支付密码的地址，可以使String也可以是返回String的function
*/
$.fn.sendCode = function(url, dataTemp){
    var waitSec = 120;//等待时间
    var _this = this
    this.click(function(){
        if($(this).hasClass("disable")){
            return;
        }
        ajaxUrl = (typeof(url) == 'function') ? url() : url
        if(ajaxUrl === false){
            return;
        }
        //if($(this).parents("form").find('#outPassword').size() && ($('#outPassword').validationEngine('validate') || !$('#outPassword').val())){
        //    layer.hAlert("请输入交易密码再发送验证码", 2)
        //    return;
        //}
        var sendNode = $(this);
        var data = $(this).hasClass("sendVoice") ? {voice: true} : {};
        var temp = (typeof(dataTemp) == 'function') ? dataTemp() : dataTemp;
        if(temp === false){
            return;
        }
        data = $.extend(data, temp);
        $.ajax({
            url: ajaxUrl,
            loading: true,
            data: data,
            loadingText: '验证码发送中',
            dataType: 'json',
            type: 'POST',
            error: function(data, transport) {
                if(data.responseJSON){
                    this.success(data.responseJSON)
                }else{
                    this.success(data)
                }
            },
            success: function(status){
                if(!status.responseText||(status.responseText&&status.responseText.indexOf("\"success\":true")>-1)){
                    _this.addClass("disable").css({"background-color": "#535553", "color": "white"});
                    countdown(waitSec, function(sec){
                        if(sendNode.get(0).nodeName == 'INPUT'){
                            sendNode.val(sec+"秒后可重发");
                        }else{
                            sendNode.text(sec+"秒后可重发");
                        }
                        if(!sec){
                            _this.removeClass("disable").removeAttr("style");
                            sendNode[sendNode.get(0).nodeName == 'INPUT'?'val':'text'](sendNode.hasClass("sendVoice") ? "语音验证码" : "发送验证码");
                        }
                    });;
                }else{
                    var msg=""
                    if(status.responseText) {
                        var pomes = status.responseText.indexOf("\"message\"")
                        var nextpo = status.responseText.indexOf(",\"", pomes)
                        msg = status.responseText.substring(pomes+11, nextpo-1)
                    }
                    alert(msg==""?"手机已经使用，请更换一个手机号码":msg)
                }
            }
        });
    });
}
