function loginFun(obj){
    var u = navigator.userAgent;
    
    $.ajax({
        url:'/secure/get-login-info.html',
        success:function(json){
            if(!json.isLogin){
                if(!!u.match(/AppleWebKit.*Mobile.*/) && !!u.match(/AppleWebKit/)){
                    layer.open({
                        content: '您还没有登录，马上去登录？'
                        ,btn: ['确定', '取消']
                        ,yes: function(index){
                            location.href = "/login/index.html?redirect=" + obj;
                            layer.close(index);
                        }
                    });
                }else{
                    var loginLayer;
                    loginLayer =
                        layer.open({
                        type: 2,
                        area: ['489px', '454px'],
                        shade: [0.6, '#000'],
                        closeBtn: true,
                        title:false, //不显示标题
                        content: "/index/login-layer.html" //捕获的元素
                    });
                    $(".hadLogin").hide();//入口页面欢乐券已经排名
                }
                return false;
            }
        }
    });
}

function loginSuccess(){
    location.reload();
}