function setTurntable(initial) {
    /*公共参数*/
    var turnplate = {
        restaraunts: [],				//大转盘奖品名称
        colors: [],					//大转盘奖品区块对应背景颜色
        outsideRadius: 192,			//大转盘外圆的半径
        textRadius: 155,				//大转盘奖品位置距离圆心的距离
        insideRadius: 50,			//大转盘内圆的半径
        startAngle: 0,				//开始角度
        bRotate: false				//false:停止;ture:旋转
    };

    turnplate.restaraunts = initial.gifts;
    console.log(turnplate.restaraunts)
    //动态添加大转盘的奖品与奖品区域背景颜色
    turnplate.colors = ["#ffe511", "#fff27f", "#ffe511", "#fff27f", "#ffe511", "#fff27f", "#ffe511", "#fff27f"];
    $(".js-lotteryNum").text(initial.count);   //抽奖次数

    // 提前获得奖品图片的宽高
    var imgW, imgH,i=0;
    turnplate.restaraunts.forEach(function (value, index) {
        imgReady(value.logo, function () {
            imgW = Math.ceil(this.width * 0.6);
            imgH = Math.ceil(this.height * 0.6);
            var img = document.createElement("img");
            img.src = turnplate.restaraunts[index].logo;
            turnplate.restaraunts[index].width = imgW;
            turnplate.restaraunts[index].height = imgH;
            turnplate.restaraunts[index].img = img
            // ++i;
            if(++i==8){
                drawRouletteWheel();
            }
        });

    });

    // 页面所有元素加载完毕后再绘制
    // if (!initial.success) {
    //     window.onload = function () {
    //         console.log('未登陆')
    //         drawRouletteWheel();
    //     }
    // } else {
    //     console.log('已登陆')
    //     drawRouletteWheel();
    // }


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
    var rotateFn = function (item, txt, winning) {
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
                if (!winning.type) {
                    /*未中奖*/
                    var str = '差一点点就中奖了<br/>请再接再厉';
                    alertCon('很抱歉', str, '好的');
                }
                else if (winning.type == 'integral' || winning.type == 'voucher') {
                    alertCon('恭喜您', '恭喜您成功抽到<br/>' + txt.title, '知道了');
                } else {
                    setAddress(winning.name, winning.username, winning.mobile, winning.address)
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

            $.ajax({
                url: "http://10.0.1.247:9007/act-zxb-lottery/lottery.html",
                data: "",
                success: function (json) {
                    if (!json.type) {
                        layer.open({
                            content: json.message
                        });
                        return false;
                    } else {
                        // var winning = { 'mobile': 15168250191, 'username':'啊啊啊啊', 'type': 'abc', 'name': '小米旅行箱',address:'杭州市多多多多所所' }
                        // rotateFn(7, '小米旅行箱', winning);
                        if (!json.success) {
                            alertCon('很抱歉', '您还未登陆', '知道了');
                            return false;
                        }
                        else if (!json.hasAuth) {
                            /*没有获邀参加本活动*/
                            alertCon('很抱歉', '您没有获邀参加本活动', '知道了');
                            return false;
                        }
                        else if (!json.hasChance) {
                            $(".js-noChanceBox").show();
                            return false;
                        } else {
                            $(".js-lotteryNum").text(json.count);
                            turnplate.bRotate = !turnplate.bRotate;
                            //获取随机数(奖品个数范围内)
                            // var item = rnd(1, turnplate.restaraunts.length);
                            initial.gifts.forEach(function (value, index) {
                                if (value.giftId == json.giftId) {
                                    var winning = { 'mobile': json.mobile, 'username': json.userName, 'type': json.giftType, 'name': value.title, 'address': json.address }
                                    rotateFn(index + 1, turnplate.restaraunts[index], winning);
                                }
                            })
                            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]

                        }

                    }
                }
            });

        }

    });

    function rnd(n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;

    }

    /*控制弹出框*/
    function alertCon(title, con, ok) {
        $('.js-formSuccessBox .js-title').text(title);
        $('.js-formSuccessBox .js-con').html(con);
        $('.js-formSuccessBox .js-ok').text(ok);
        $('.js-formSuccessBox').show();
    }


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

                ctx.fillText(text.title, -ctx.measureText(text.title).width / 2, 0);
                //添加对应图标
                ctx.drawImage(text.img, -30, 15, text.width, text.height);
                //把当前画布返回（调整）到上一个save()状态之前
                ctx.restore();
                //----绘制奖品结束----
            }
        }
    }
}
