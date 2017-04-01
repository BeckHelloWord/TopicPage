
/*公共参数*/
var turnplate = {
    restaraunts: [],				//大转盘奖品名称
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 192,			//大转盘外圆的半径
    textRadius: 155,				//大转盘奖品位置距离圆心的距离
    insideRadius: 50,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false,				//false:停止;ture:旋转
    clickNum: 5  //抽奖次数
};

$(document).ready(function () {
    //动态添加大转盘的奖品与奖品区域背景颜色
    $.ajax({
        url: "js/data.json",
        dataType: "json",
        success: function (json) {
            if (!json.success) {
                return false;
            }
            /*turnplate.restaraunts = [{name:'2000体验金',img:'gift01'},{name:'1000体验金',img:'gift02'},{name:'5枚体验金',img:'gift03'},{name:'Thank you',img:'gift04'},{name:'小米口罩',img:'gift05'},{name:'小米旅行箱',img:'gift06'},{name:'小米电饭煲',img:'gift07'},{name:'小米空气净化机',img:'gift08'}];*/
            turnplate.restaraunts = json.gifts;  //获得后台配置图片和名字
            turnplate.colors = ["#ffe511", "#fff27f", "#ffe511", "#fff27f", "#ffe511", "#fff27f", "#ffe511", "#fff27f"];
            $(".js-lotteryNum").text(turnplate.clickNum);   //抽奖次数

            // 提前获得奖品图片的宽高
            var imgW, imgH;
            turnplate.restaraunts.forEach(function (value, index) {
                imgReady(value.logo, function () {
                    imgW = Math.ceil(this.width * 0.6);
                    imgH = Math.ceil(this.height * 0.6);
                    var img = document.createElement("img");
                    img.src = turnplate.restaraunts[index].logo;
                    turnplate.restaraunts[index].width = imgW;
                    turnplate.restaraunts[index].height = imgH;
                    turnplate.restaraunts[index].img = img;
                });

            });

            var rotateTimeOut = function () {
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: 2160,
                    duration: 8000,
                    callback: function () {
                        alert('网络超时，请检查您的网络设置！');
                    }
                });
            };

            //旋转转盘 item:奖品位置; txt：提示语;
            var rotateFn = function (item, txt) {
                var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

                if (angles < 270) {
                    angles = 270 - angles;
                } else {
                    angles = 360 - angles + 270;
                }
                $('#wheelcanvas').stopRotate();
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: angles + 1800 - 22.5,
                    duration: 8000,
                    callback: function () {
                        if (txt.title.indexOf('Thank') >= 0) {
                            /*未中奖*/
                            var str = '差一点点就中奖了<br/>请再接再厉';
                            alertCon('很抱歉', str, '好的');
                        }
                        else if (txt.title.indexOf('体验金') >= 0) {
                            alertCon('恭喜您', '恭喜您成功抽到<br/>' + txt.title, '知道了');
                        } else {
                            $(".a_formBox").show();
                        }
                        turnplate.bRotate = !turnplate.bRotate;
                    }
                });
            };

            /*开始旋转*/
            $('.pointer').click(function () {
                if (turnplate.bRotate) {
                    return;
                } else {
                    $.get('http://10.0.1.247:9007/act-zxb-lottery/lottery.html', function (data) {
                        if (!data.success) {
                            alertCon('很抱歉', '您还没有登陆', '知道了')
                            return false;
                        }
                        else if (!data.hasAuth) {
                            /*没有获邀参加本活动*/
                            alertCon('很抱歉', '您没有获邀参加本活动', '知道了')
                            return false;
                        }
                        else if (turnplate.clickNum <= 0) {
                            $(".js-noChanceBox").show();
                            return false;
                        }
                        $(".js-lotteryNum").text(--turnplate.clickNum);
                        turnplate.bRotate = !turnplate.bRotate;
                        //获取随机数(奖品个数范围内)
                        var item = rnd(1, turnplate.restaraunts.length);
                        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                        rotateFn(item, turnplate.restaraunts[item - 1]);
                    })
                }

            });
        }
    });

});

function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;

}

/*弹出框*/
function alertCon(title, con, ok) {
    $('.js-formSuccessBox .js-title').text(title);
    $('.js-formSuccessBox .js-con').html(con);
    $('.js-formSuccessBox .js-ok').text(ok);
    $('.js-formSuccessBox').show();
}

//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function () {
    drawRouletteWheel();
};

/*对转盘进行渲染*/
function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422);

        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "#b95b1c";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei';
        for (var i = 0; i < turnplate.restaraunts.length; i++) {
            var angle = turnplate.startAngle + i * arc + Math.PI / 8;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();

            //----绘制奖品开始----
            ctx.fillStyle = "#E5302F";
            var text = turnplate.restaraunts[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            // if (text.name.indexOf("M") > 0) {//流量包
            // 	var texts = text.split("M");
            // 	for (var j = 0; j < texts.length; j++) {
            // 		ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
            // 		if (j == 0) {
            // 			ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
            // 		} else {
            // 			ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
            // 		}
            // 	}
            // } else if (text.name.indexOf("M") == -1 && text.name.length > 20) {//奖品名称长度超过一定范围
            // 	text = text.name.substring(0, 7) + "||" + text.name.substring(7);
            // 	var texts = text.split("||");
            // 	for (var j = 0; j < texts.length; j++) {
            // 		ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
            // 	}
            // } else {
            // 	//在画布上绘制填色的文本。文本的默认颜色是黑色
            // 	//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度

            // }
            ctx.fillText(text.title, -ctx.measureText(text.title).width / 2, 0);
            //添加对应图标
            //					var img=document.createElement("img");
            //					img.src=turnplate.imgUrl+text.img+'.png';
            //					console.log("开始绘画："+text.width+"   "+text.height);
            //                    img.onload = function () {
            //                        ctx.drawImage(text.img, -30,15,text.width,text.height);
            //                    }
            ctx.drawImage(text.img, -30, 15, text.width, text.height);
            //把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
            //----绘制奖品结束----
        }
    }
}
