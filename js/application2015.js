(function() {

    String.prototype.len = function() {
        var cArr = this.match(/[^\x00-\xff]/ig);
        return this.length + (cArr == null ? 0 : cArr.length);
    };

    /**
     * 在资源加载完毕之后，初始化封装方法
     */
    (function(){
        
        function createAjaxCallback(callback, form) {
            var options = form ? form.data("jqv") : null;
            return function(json){
                if(json && json.responseJSON){
                    json  = json.responseJSON;
                }

                // 判断是否需要弹出询问框
                if(typeof(json) === 'object' && json.link){
                    layer.open(json.message, {icon: 3}, function(){
                        location.href = json.link;
                        options.onAjaxFormComplete(false, form, json, options);
                    });
                    return;
                }

                if (typeof(json) === 'object' && json.errors instanceof Array && json.errors.length) {
                    // getting to this case doesn't necessary means that the form is invalid
                    // the server may return green or closing prompt actions
                    // this flag helps figuring it out
                    var errorInForm=false;
                    json = json.errors;
                    var isMessage = false;
                    for (var i = 0; i < json.length; i++) {
                        var value = json[i];

                        var errorFieldId = value.field;
                        var errorField = $($("#" + errorFieldId)[0]);

                        // make sure we found the element
                        if (errorField.length == 1) {

                            // promptText or selector
                            var msg = value.message;
                            // if the field is valid

                            // the field is invalid, show the red error prompt
                            errorInForm|=true;
                            if (options.allrules[msg]) {
                                var txt = options.allrules[msg].alertText;
                                if (txt)
                                    msg = txt;
                            }
                            if(options.showPrompts){
                                isMessage = true;
                                methods._showPrompt(errorField, msg, "", false, options, true);
                            }

                        }
                    }
                    if(isMessage){
                        callback(!errorInForm, form, json, options);
                        return;
                    }
                    //updateBy:TanYong 如果没有属性错误，可能是其他异常，弹窗提示
                }
                if(typeof(json) == 'object' && json != 'true' && json != true){
                    var success = (json.success != false && json.success != 'false');
                    var message = json.message;
                    if(message){
                        var me_alert =layer.alert(message, {icon: success ? 1 : 2},function(){
                            layer.close(me_alert);
                            setTimeout(function(){callback(success,  json);},0);
                        });
                    }else{
                        callback(success,  json);
                    }
                } else {
                    callback(true, json);
                }
            }
        }
        
        
        /** jquery插件 ************************************/
        /**
         * ajax提交验证表单
         * @param success = 提交完毕回调事件function(状态true:没有错误，false:有错误，form, json:后台返回的数据, option)
         * @param optionsTemp = 可空，参数
         */
        $.fn.ajaxForm = function(success, optionsTemp){
            var options = {
                promptPosition:"centerRight:3,1",
                addPromptClass:'formError-white',
                ajaxFormValidation: true,
                maxErrorsPerField: 1,
                onAjaxFormComplete: success,
                //只在提交的时候检查为空的输入项（不是框架原有的属性）
                onlySubmitValidRequired: true,
                ajaxFormValidationMethod: $(this).attr("method") || 'get',
                scroll: false
            }
            var valid = this.validationEngine($.extend(options, optionsTemp));
        };

        /**
         * 发送验证码 有输入支付密码（#outPassword）的时候会自动检测支付密码是否输入
         * @param url = 请求发送支付密码的地址，可以使String也可以是返回String的function
         */
        $.fn.sendCode = function(url,dataTemp,mobinput,_useImg,countdownCallback){
            var waitSec = 120,//等待时间
                _this = this,
            useImg = _useImg ? _useImg : false;  //默认不使用图片验证码
            var needCallback = typeof(countdownCallback) == 'function';
            this.click(function(){
                if($(this).hasClass("disable")){
                    return;
                }
                ajaxUrl = (typeof(url) == 'function') ? url() : url
                if(ajaxUrl === false){
                    return;
                }
                if($(this).parents("form").find('#outPassword').size() && ($('#outPassword').validationEngine('validate') || !$('#outPassword').val())){
                    layer.alert("请输入交易密码再发送验证码", 2)
                    return;
                }
                var sendNode = $(this);
                var data = $(this).hasClass("sendVoice") ? {voice: true} : {};
                var temp = (typeof(dataTemp) == 'function') ? dataTemp() : dataTemp;
                if(temp === false){
                    return;
                }
                data = $.extend(data, temp);

                if (useImg) {
                    //弹出框
                    var imgVerifyView = layer.open({
                        type: 1,
                        area: '400px', //宽高
                        shade: [0.6, '#000'],
                        closeBtn: false,
                        title: false,
                        content: '<div class="imgVerify" style="display:block"><div class="hd">请输入图片验证码</div><div class="imgVerifyForm" id="imgVerifyForm"><label class="clearfix"><input type="text" name="captcha" id="captcha" datatype="/^[\w\W]{4}$/" nullmsg="请输入验证码！" maxlength="4" placeholder="不区分大小写" /><span><img width="120" height="40" id="captcha-img" /></span></label><div class="MyErrorContent">验证码错误</div><p><button type="submit" class="imgVerifyBtn">确认</button><a class="imgVerifyBtn close" href="javascript:void(0);">取消</a></p></div></div>',
                        success: function () {
                            //验证码图片显示和增加事件
                            $("#captcha-img").click(function () {
                                var me = $('#captcha-img');
                                me.attr("src", window.hxb.ctx + "router/common/captcha?v=" + Math.random() + "&w=" + me.attr("width") + "&h=" + me.attr("height"));
                            }).click();
                            //取消按钮
                            $(".imgVerify .close").click(function () {
                                layer.close(imgVerifyView);
                            });
                            $(".sendMobile").blur();
                            //确定按钮
                            $(".imgVerifyBtn").eq(0).click(function () {
                                if (($("#captcha").val().length) == 4) {
                                    data.captcha = $("#captcha").val();
                                    //有语音验证码将data
                                    if (sendNode.hasClass("cookie-auto-change")) {
                                        var mo=data.mobile;
                                        var ca=data.captcha;
                                        var typeCookie = $.cookie('sendCodeType');
                                        data=(typeCookie == "voice" || typeCookie == undefined)?{mobile:mo,captcha:ca,voice: false}:{mobile:mo,captcha:ca,voice: true}
                                    }
                                    docheck(function () {
                                        layer.close(imgVerifyView);
                                        if($("#voice-verification").hasClass("hideAll")){
                                            setTimeout(function () {
                                                $("#voice-verification")[0].className = "showVerify";
                                            },10000);
                                        }
                                        var typeC = $.cookie('sendCodeType');
                                        if (sendNode.hasClass("cookie-auto-change")) {
                                            var typeCookie = $.cookie('sendCodeType');
                                            if (typeCookie == "voice" || typeCookie == undefined) {
                                                $.cookie('sendCodeType', 'code', {expires: 30 * 60 * 1000});
                                                $(".imgVoiceTip").css("display", "none");
                                            }
                                            else {
                                                $.cookie('sendCodeType', 'voice', {expires: 30 * 60 * 1000});
                                                $(".imgVoiceTip").css("display", "block");
                                            }
                                        }

                                    });
                                } else {
                                    $("#captcha").select();
                                }
                            });
                        }
                    });
                } else {
                    docheck();
                }

                function docheck(_callback) {
                    $.ajax({
                        url: ajaxUrl,
                        loading: true,
                        data: data,
                        loadingText: '验证码发送中',
                        dataType: 'json',
                        type: 'POST',
                        error: function (data, transport) {
                            if (data.responseJSON) {
                                this.success(data.responseJSON)
                            } else {
                                this.success(data)
                            }
                        },
                        success: function (status) {
                            if (status.success==true) {
                                if (sendNode.hasClass("sendVoice")) {
                                    layer.tips("请注意接听稍后的语音电话", sendNode, {guide: 0, time: 4})
                                }
                                _this.addClass("disable").css({"background-color": "#535553", "color": "white"});
                                countdown(waitSec, function (sec) {
                                    if (sendNode.get(0).nodeName == 'INPUT') {
                                        sendNode.val(sec + "秒后可重发");
                                    } else {
                                        sendNode.text(sec + "秒后可重发");
                                    }
                                    if (!sec) {
                                        $(".imgVoiceTip").css("display", "none");
                                        _this.removeClass("disable").removeAttr("style");
                                        sendNode[sendNode.get(0).nodeName == 'INPUT' ? 'val' : 'text'](sendNode.hasClass("sendVoice") ? "语音验证码" : "发送验证码");
                                    }
                                });
                                try{
                                    typeof _callback == "function" && _callback();
                                }catch(r){}
                            } else if (typeof mobinput != 'undefined') {
                                $(mobinput).focus();
                                $("#captcha-img").click();
                                $(".MyErrorContent").css("display","block")
                            }
                        }
                    });
                }
                if(needCallback){
                    countdownCallback();
                }
            });
        }

        /**
         * 发出ajax请求，可以解析后台返回的错误信息
         * @param url = 请求地址
         * @param callback = 回调函数function(status, data)status：boolean型，代表成功或失败，data：后台返回的数据
         * @param tempOptions = jquery ajax的设置参数，可空
         */
        $.ajaxValid = function(url, callback, tempOptions){
            var fun = validMethods.createAjaxCallback(callback);
            var options= {
                url: (typeof(url) == 'function') ? url() : url ,
                loading: true,
                dataType: 'json',
                success: fun,
                error: fun
            }
            $.ajax($.extend(options, tempOptions));
        }

        if(window.layer){
            /**
             * 弹出框
             * @param tit = 提示内容
             * @param ico = 图标样式 1.正确 2.错误 3.警告 4.询问
             * @param callback = 回调函数 function(true:点击了确定， false:点击了取消或关闭按钮)
             * @param isShowCancel = 是否显示取消按钮
             * @param options = 其他参数{ok: '确定按钮文字', cancel: '取消按钮文字', align: '文字对其方式center', showIco:'是否需要图标true'}
             */
            layer.hAlert = function(tit, ico, callback, isShowCancel, options){
                layer.confirm(tit, { icon: ico }, callback);
                /*
                options = $.extend({ok:'确&nbsp;&nbsp;&nbsp;&nbsp;定', cancel:'取&nbsp;&nbsp;&nbsp;&nbsp;消', align: 'center', showIco: true}, options);
                var width = tit.length * 17 + 150;
                width = width > 600 ? 600 : width;
                if(isShowCancel){width = width < 320 ? 320 : width;}
                ico = ico ? ico : 1;
                var cancelHtml = isShowCancel ? '<a class="hxb-cancel transition" href="javascript:void(0)">' + options.cancel +'</a>' : '';
                var icoHtml = options.showIco ? '<td><div class="bkImg bkImg-' + ico + '"></div></td>' : '';
                //自定义弹出框
                layer.open({
                    type: 1,
                    title: false,
                    //closeBtn: false,
                    area: ['auto', 'auto'],
                    content: '<div class="hxbAlert"  style="width:' + width + 'px"><div class="hxbtitlediv"><span class="tit">提示</span><span class="close-zz transition"><a class="hxb-close transition" href="javascript:void(0)">×</a></span></div><div class="context"><table><tr>' + icoHtml + '<td><p style="text-align: ' + options.align + ';">'+ tit +'</p></td></tr></table><div class="hxbBtns"><a href="javascript:void(0)" class="hxb-ok transition">' + options.ok + '</a>' + cancelHtml + '</div></div></div>',
                    yes:function(layero){
                        var index = layero.attr("times");
                        $(".hxb-ok").focus();
                        layero.find(".hxb-close,.hxb-ok,.hxb-cancel").click(function(){
                            if(callback){
                                if(callback($(this).hasClass('hxb-ok')) === false){
                                    return;
                                }
                            }
                            layer.close(index);
                        });
                    }

                });
                */
            }

            /**
             * 关闭弹出框，仅限弹出div框
             * @param node = 弹出框内的一个jquery元素
             */
            layer.closeWin = function(node){
                layer.close(node.parents(".xubox_layer").attr("times"));
            }

            /**
             * 询问框
             * @param tit = 提示内容
             * @param callback = function(true:点击了确定，false:点击了取消)
             */
            layer.hConfirm = function(tit, callback, options){
                layer.hAlert(tit, 3, callback, true, options);
            }

            /**
             * 在弹出框中加载一个url内容
             * @param url = 要显示内容的地址
             * @param tit = 标题提示
             */
            layer.alertUrl = function(url, tit, options){
                var optionsTemp = {
                    type: 2,
                    title: tit,
                    content: [url, 'no'],
                    area: ['500px', '300px']
                };
                
                $.extend(optionsTemp, options);
                layer.open(optionsTemp); 
            }
        }
    })();




    // ajax全局设置
    $.ajaxSetup({
        beforeSend: function () {
            //检测到loading参数则使用遮罩
            if (this.loading) {
                this.loadingIndex = layer.load(this.loadingText, 0);
            }
        },
        complete: function () {
            //如果有遮罩则关闭遮罩
            if(this.loadingIndex){
                layer.close(this.loadingIndex);
            }
        },
        cache: false
    });

    /**
     * @param overcall 倒计时结束事件
     * @param stepcall 每秒执行事件
     * @param style 输出的样式：d天h小m分钟s秒
     */
    $.fn.countdown=function(attrs){
        var sum;
        var overCall = attrs.overCall;
        var stepCall = attrs.stepCall;
        var style = attrs.style?attrs.style:"DHMS";
        var _this = $(this);
        if(_this.attr("data-time")){
            sum = parseInt(_this.attr("data-time"))
        }else{
            var starDate = new Date(_this.attr("data-start"));
            var endDate = new Date($(_this.attr("data-end")));
            sum = endDate.getTime() - starDate.getTime();
        }
        _this.attr("data-time", sum);
        refresh()
        var timersInter = setInterval(function(){
            refresh()
        },1000);
        function refresh(){
            sum = parseInt(_this.attr("data-time"));
            sum -= 1000;
            if(sum<0){
                overCall?overCall(_this):_this.text("");
                clearInterval(timersInter);
                return;
            }
            if(stepCall){
                stepCall(_this,getZeroX(sum))
            }else{
                _this.text(toText(getX(sum)))
            }
            _this.attr("data-time", sum)
        }
        function getX(sum){
            switch(style){
                case "HMS":
                    return {
                        hours: parseInt((sum/3600000)),
                        minutes: parseInt(((sum%86400000)%3600000)/60000),
                        seconds: parseInt((((sum%86400000)%3600000)%60000)/1000)
                    }
                break;
                case "MS":
                    return {
                        minutes: parseInt(sum/60000),
                        seconds: parseInt((((sum%86400000)%3600000)%60000)/1000)
                    }
                break;
                case "S":
                    return {
                        seconds:parseInt(sum/1000)
                    }
                break;
                case "DHMS":
                default :
                    return {
                        day: parseInt(sum/86400000),
                        hours: parseInt((sum%86400000)/3600000),
                        minutes: parseInt(((sum%86400000)%3600000)/60000),
                        seconds: parseInt((((sum%86400000)%3600000)%60000)/1000)
                    }
                    break;
            }

        }
        function getZeroX(sum){
            var timeArray = getX(sum)
            for(var item in timeArray){
                if(timeArray[item] < 10){
                     timeArray[item]='0'+timeArray[item]
                }
            }
            return timeArray;
        }
    }
//倒计时修改开始
    var map = {day:'天', hours:'时', minutes:'分', seconds:'秒'}
    $(".timer").each(function(){
        var sum;
        if($(this).attr("sum")){
            sum = parseInt($(this).attr("sum"))
        }else{
            var starDate = new Date($(this).attr("date"))
            var endDate = new Date($(this).attr("endDate"))
            sum = endDate.getTime() - starDate.getTime()
        }
        $(this).attr("sum", sum)
        changeTimeShow()
    })
    setInterval(function(){
        changeTimeShow()
    },1000)

    function changeTimeShow(){
        $(".timer").each(function(){
            var sum = parseInt($(this).attr("sum"))
            sum-=1000;
            if(sum<0){
                $(this).removeClass('timer').text("");
                return;
            }
            $(this).text(toText(getX(sum)))
                .attr("sum", sum)
        })
    }

    function toText(datex){
        var text = "";
        //$('.timer').css('color','#F90');
        for(var item in datex){
            if(datex[item] != 0 || item=='seconds' || item=='minutes'){
                if(datex[item]<10){ text += '0'+datex[item] + map[item]}
                else{text += datex[item] + map[item]}
            }
        }
        return text
    }
    var daySum = 24/60/60/1000;
    function getX(sum){
        return {
            day: parseInt(sum/86400000),
            hours: parseInt((sum%86400000)/3600000),
            minutes: parseInt(((sum%86400000)%3600000)/60000),
            seconds: parseInt((((sum%86400000)%3600000)%60000)/1000)
        }
    }
//倒计时修改结束



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

    // 页面加载完毕需要进行的操作
    $(function(){
        // 验证码图片显示和增加事件
        $("#captcha-img").click(function(){
            $(this).attr("src", window.hxb.ctx + "router/common/captcha?v=" + Math.random() + "&w=" + $(this).attr("width") + "&h=" + $(this).attr("height"));
        }).click();

        // 将类名为submit的元素单击事件为触发表单提交事件
        $(document).on("click", ".submit", function(){
            $(this).parents("form").submit();
        });

        // 输入框回车提交
        $(document).on("keyup", ".input-submit input", function(even){
            if($(this).parents("form").size()){
                if(even.keyCode == 13){
                    $(this).blur().parents("form").submit();
                }
            }
        });

        /**
         * 有ajaxAlert类的元素设置单击事件为弹出ajax加载出来的对话框
         */
        $(".ajaxAlert").click(function(){
            layer.alertUrl($(this).attr("href"), $(this).attr("title"));
            return false;
        });

        /**
         * class为hxb-tip的元素悬浮事件为弹出提示框
         */
        $("[data-tip]").mouseover(function(){
            var tipId = layer.tips($(this).data("tip"), $(this), { tips: [1, '#f90'] });
            $('#layui-layer'+tipId).css('margin-left','-16px')
            $(this).data("tipId", tipId)
        });

        $(".focus").focus()

        /**
         * 给需要的a链接增加过渡效果
         */
        $(".transition").addClass("transition5").each(function(){
            $(this).find("a").addClass("transition5");
        });

        /**
         * tab页切换
         */
        $("[data-tab-head]").each(function(){
            var data = $(this).data();
            data.tabEvent = data.tabEvent ? data.tabEvent : "mousemove";
            $(data.tabHead).data(data).on(data.tabEvent, function(){
                var index = $(data.tabHead).removeClass(data.tabSelect).index(this);
                $(this).addClass(data.tabSelect);
                $(data.tabShow).hide().eq(index).show();
            });
        });
    });
})();