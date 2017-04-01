<div class="bx-nav-wrap nav-white">
<div class="w1200 nav-main clearfix">
<a href="/" class="img-logo fl"></a>
<ul class="nav-list fl clearfix js-nav-list">
<li><a href="/">首页</a></li>
<li><a href="/lc/invest/list.html">我要投资<em id="totalNum"></em></a></li>
<li><a href="/borrow/index.html">我要借款</a></li>
<li id="security"><a href="/topic/security/">安全保障</a></li>
<li id="guide"><a href="/topic/guide/">新手指引</a></li>
<li id="about"><a href="/topic/static/about/">信息披露</a></li>
</ul>
<div class="nav-login fr clearfix">
<a href="" class="js-login-btn">登录</a>
<a href="/secure/register.html" class="last">注册</a>
</div>
</div>
</div>
<script>var params ={isBalance:'balance',isRecommend:'recommend',isValidStatus:'validStatus',isVoucherCount:'voucherCount',isSafe:'safe',isAsset:'asset',isNotify:'notify'};var paramsStr ='?';for(var item in params){if(window[item]){paramsStr +=params[item] + "=true&";}
}
$.ajax({url:"/secure/get-login-info.html" + paramsStr,async:false,cache:false,success:function (data) {var html ="";window.loginInfo =data;var newAction =new Date().getTime();if (data &&data.isLogin) {var nCount =data &&data.nCount ?data.nCount :0;if(nCount >0){html +='<a class="nav-msg" href="/center/message/index?' + newAction + '" target="_blank"><i class="newMsg">' + nCount + '</i></a>';}else{html +='<a class="nav-msg" href="/center/message/index?' + newAction + '" target="_blank"><i  style="opacity:0;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);">' + nCount + '</i></a>';}
html +='<a href="/center/home/index">' + data.callName + '</a>';html +='<a class="last" href="/logout/logout.html">退出</a>';$(".nav-login").html(html);} else {$.get("/logout/ssoLogout.html");}
$('.nav-msg').click(function(){//点击消失 
    var $this = $(this);
    $this.find('.newMsg').css({'opacity':0,'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)'})
})
}
});(function(){var result =0;try{result =JSON.parse(localStorage['NavNum']);}catch(e){}
window.inIntNavNum =function(num){for(var i in num){try{$('#'+i).html('(<i>'+num[i]+'</i>)');}catch(e){}
}
try{localStorage['NavNum'] =JSON.stringify(num);}catch(e){}
};if(result){inIntNavNum(result);}
$.getScript("/index/get-borrow-num.html?callback=inIntNavNum");})();seajs.use(["main","validationEngine","layer"],function (main) {main.init();var loginLayer;$(".js-login-btn").on("click",function(e){loginLayer =layer.open({type:2,area:['489px','454px'],shade:[0.6,'#000'],closeBtn:true,title:false,content:"/index/login-layer.html" 
 });e.preventDefault();});});</script>
