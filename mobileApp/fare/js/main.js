var isChinaMobile = /^1(3[4-9]|5[012789]|8[23478]|78|47)/; //移动
var isChinaUnion = /^1(3[0-2]|5[56]|8[56]|45|76)/; //联通
var isChinaTelcom = /^(18[0-1]|189|133|153|177)/; //电信
var isOtherTelphone = /^170/;//其他运营商
$(function(){
    var data = {
        url:"",//接口地址
        user:{},//用户信息
        productList:[],//产品列表
        canInvest:true,
        discount:0,
    }
    var lock = false;

    var jobInit = function(){//获取业务数据初始化页面
        var sendData1={
          balance:true
        };

        // $.when($.get('getLoginInfo.json',sendData1),$.get('index.json',sendData2)).done(function(res1,res2){
        $.when($.ajax({
            url:'/secure/get-login-info.html',
            data:sendData1,
            type:"post",
            beforeSend:function (XMLHttpRequest) {

				var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('baoxiang') > -1) {
                    if (ua.indexOf('baoxiangios') > -1) {
                        XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangiOS");                     
                    }else{
                        XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangAndroid");
                    }
				
					if(sessionStorage['persion']){
						XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(sessionStorage['persion']).accessToken);
					}else{
						XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(localStorage['persion']).accessToken);
					}
                    
                }
            }
        }),$.ajax({
            url:'/mobile-recharge/index.html',
            type:"post",
            beforeSend:function (XMLHttpRequest) {
				
				var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('baoxiang') > -1) {
                    if (ua.indexOf('baoxiangios') > -1) {
                        XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangiOS");                     
                    }else{
                        XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangAndroid");
                    }
					if(sessionStorage['persion']){
						XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(sessionStorage['persion']).accessToken);
					}else{
						XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(localStorage['persion']).accessToken);
					}
                }
			}
        })).done(function(res1,res2){
		
            if(!res1[0].isLogin){
                location.href = "/login/index.html?redirect=" + location.pathname;
            }
            data.user = {
                phone:res1[0].mobile,
                mobileShow:res1[0].mobileShow,
                money:res1[0].balance
            }
            data.discount = res2[0].discount;
            data.canInvest = res2[0].hasChance;            
		
            data.productList = res2[0].tickets.length>0?res2[0].tickets.map(function(x){
            return {price:x.mobileFare,realPrice:Math.ceil(x.mobileFare * data.discount),voucherId:x.voucherId,ticketId:x.ticketId}
            }):[];
            initDom();
            initUserInfo();
            initProductsInfo();
            domWatch();
            watchScreen();
        })
			
        var initUserInfo = function(){
            $('.fare .phone span.phoneNumber').text(data.user.phone);
			
            $.ajax({  
                url:"https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+data.user.mobileShow, 
                dataType:'jsonp',  
                data:'',  
                jsonp:'callback',  
                success:function(result) {
					if(result.carrier){
					$('.carrieroperator').text("("+result.carrier+")");
					}
                },  
                timeout:3000
            });  
            $('.footer .money').text(data.user.money.toFixed(2));
            $('.warning span strong').text(data.discount*10);
        }
       
        var initProductsInfo = function(){
            for(var i =0 ;i < data.productList.length ; i++){
                var html = '<div class="choose-body fl" voucherId="' + data.productList[i].voucherId + '" ticketId="' + data.productList[i].ticketId + '">'+
                                ' <p class="price"><span></span>元</p>'+
                                '<p class="real-price">相当于<span></span>元</p>'+
                             '</div>';
                var $html = $(html);
                $html.find('.price span').text(data.productList[i].price);
                if(Math.floor((data.productList[i].price-data.productList[i].realPrice))<=1&&data.discount!=1){
                    $html.find('.real-price span').text(data.productList[i].realPrice - 1);
                }else{
                    $html.find('.real-price span').text(data.productList[i].realPrice);
                }
                if(i%3==1){
                    $html.addClass('middle');
                }
                if(i==0){
                    $html.addClass('on');
                }
                $('.choose').append($html);
            }
            checkChance();
            $('#btn span').text(data.productList[0].price);
            $('.fare-img .money span').text(Math.floor((data.productList[0].price-data.productList[0].realPrice))<=1&&data.discount!=1?1:Math.floor((data.productList[0].price-data.productList[0].realPrice)));
        }
        //判断是否有机会
        var checkChance = function(){
            if(( data.productList[0].price <=  data.user.money)&&data.canInvest){
                $('#btn').removeAttr('disabled');
            }else{
                if(!data.canInvest){
                    $('.warning span').text("您当前无法享受话费充值权益");
                }
                else if((data.productList[0].price >  data.user.money)){
                    $('.error').text("当前余额不足，请充值后继续操作。");
                }
            }
        }
    }

    jobInit();
    var initDom = function(){//初始化加载渲染 
        var template = $('#template').html();
        $('body').html(template);
    } 

    var domWatch = function(){
        //app跳转
        if (/baoxiang/.test(navigator.userAgent)) {
            $('a.appUrl').each(function () {
                var appUrl = $(this).data().appUrl;
                if (appUrl) {
                    $(this).attr('href', appUrl);
                }
            })
        }
         //弹出规则
        $('#rule,.pay').click(function(){
            if(!$('.layer').is(":animated")){
                $('.layer').show();
                $('.layer').animate({height:"100%"},500);
            }
        })
        //关闭规则
        $('#close').click(function(){
            if(!$('.layer').is(":animated")){
                $('.layer').animate({height:"0"},500);
                $('.layer').hide(500);
            }
        })
        //选择状态切换
        $('.choose-body').each(function(i,e){
            var ele  = $(e);
            ele.click(function(){
                var $this = $(this);
                var money = Number($this.find('.price span').text())||0;
                var realMoney = Number($this.find('.real-price span').text())||0;
                $('#btn').find('span').text(money);
                $('.fare-img .money span').text(Math.floor((money-realMoney))<=1&&data.discount!=1?1:Math.floor((money-realMoney)));
                if(data.user.money<money||!data.canInvest){
                    if(data.canInvest){
                        $('.error').text("当前余额不足，请充值后继续操作。");
                    }
                    $('#btn').attr('disabled','');
                }else{
                    $('.error').text("");
                    $('#btn').removeAttr('disabled');
                }
                $this.addClass('on').siblings().removeClass('on');
            })
        })
        //充值按钮
        $('#btn').click(function(){
            var money = Number($('.choose-body.on').find('.price span').text())||0;
            var realMoney = Number($('.choose-body.on').find('.real-price span').text())||0;
            var ticketId = $('.choose-body.on').attr('ticketId');
            var voucherid = $('.choose-body.on').attr('voucherid');
            if(data.user.money<money||!data.canInvest){return;}
            if(!lock){
                lock=true;
                $.post('/mobile-recharge/mobile-recharge.html',{ticketId:ticketId}).then(function(res){
                    if(res.success){
                        if(!res.type){
                            showAlert(res.message);
                        }else{
                            data.user.money-=money;
                            $('.footer .money').text(data.user.money.toFixed(2));
                            $.ajax({
                                url:'/mobile-recharge/index.html',
                                type:"post",
                                beforeSend:function (XMLHttpRequest) {
                                    var ua = navigator.userAgent.toLowerCase();
                                    if (ua.indexOf('baoxiang') > -1) {
                                        if (ua.indexOf('baoxiangios') > -1) {
                                            XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangiOS");                     
                                        }else{
                                            XMLHttpRequest.setRequestHeader("User-Agent", "baoxiangAndroid");
                                        }
                                        if(sessionStorage['persion']){
                                            XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(sessionStorage['persion']).accessToken);
                                        }else{
                                            XMLHttpRequest.setRequestHeader("x-auth-token", JSON.parse(localStorage['persion']).accessToken);
                                        }
                                    }
                                }
                            }).then(function(res){
                                data.canInvest = res.hasChance;
                                if(!data.canInvest){
                                    $('.warning span').text("您当前无法享受话费充值权益");
                                    $('#btn').attr('disabled','');
                                }
                            });
                            showLayer(1,money,Math.floor((money-realMoney))<=1&&data.discount!=1?1:Math.floor((money-realMoney)));
                        }
                        lock = false;
                    }else{
                        location.href = "/login/index.html?redirect=" + location.pathname ;
                    }
                },function(error){
                    showAlert("服务器正忙");
                })
            }
        })
        //关闭并刷新页面
        $('.weight .btn-group a,.success').click(function(){
            closeLayer();
            // location.reload();
        })
        //充值成功提示 
        var showLayer = function(id,price,redPack){
            $('#weight' + id).find('.free span').text(price+'元');
            $('#weight' + id).find('.redPack span').text(redPack+'元');
            $('.success').show();
            $('#weight' + id).show();
        }
        //充值失败提示
        var showAlert = function(message){
             $('.alertBody p').text(message);
             $('.alertBody').show();
             setTimeout(function() {
                 $('.alertBody').hide();
             }, 2000);
        }
        //关闭蒙层 
        var closeLayer = function(){
            $(".success,.weight").hide();
            $(".alertBody").hide();
        }
    }

    var watchScreen = function(){//检测手机屏幕适配 
        //适配手机
        function isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent) ||
                    window.innerWidth < 500;
        }
        function setScale() {
            if (window.top !== window) {
                return;
            }
            var pageScale = 1;
            var width = document.documentElement.clientWidth || 320;
            var height = document.documentElement.clientHeight || 800;

            if (width / height >= 320 / 800) {
                pageScale = height / 800;
            } else {
                pageScale = width / 320;
            }
            // meta
            var content = 'width=320, initial-scale=' + pageScale + ', maximum-scale=' + pageScale + ', user-scalable=no';
            var $meta =  $('meta[name="viewport"]');
            if($meta){
                $meta.attr('content', content);
            }else{
                $meta = $('<meta name="viewport" content='+content+'/>');
                $("head").append($meta);
            }
            
        }
        if (isMobile()) {
            setScale();
        }
    }


    var wechatShare=new WeChatShare();
    var shareData ={
        shareConfig:{
            title: "[有人@你]宝象金融又搞活动啦，话费充值很便宜！真的！",
            desc: "宝象金融会员有福啦，每月可享话费优惠充值。会赚钱更会省钱！",
            link: "http://bxjr.com/lc/channel/channel/share?mark=BX_HFCZ_2016&taskId=PC",
            imgUrl: "http://bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/1701/c046647c-8698-4f4e-81a0-285c2a9e26cb.jpg"
        },
        menuList:{
            menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl', // 复制链接
                'menuItem:share:appMessage'
            ]
        },
        callback:function(){}
    };
    wechatShare.init(shareData);
})