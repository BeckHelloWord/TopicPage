function toRegister(){
	/*未注册，发送验证码*/
	var InterValObj; //timer变量，控制时间
	var count = 120; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	var bol = false; //默认认为没有正在发送短息
	var btnSendCode = $(".send_code");
	var mobile = $("#mobile");
	$(".send_code").click(function () {
		//向后台发送处理数据
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "text", //数据格式:JSON
			url: "/secure/send-register-mobile.html", //目标地址
			data: {mobile: mobile.val(),needAfVerfy:true},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			},
			success: function (msg) {
			}
		});
		window.clearInterval(InterValObj);//停止计时器
		curCount = count;

		//设置button效果，开始计时
		btnSendCode.parent(".bgStyle").attr("disabled", true);
		btnSendCode.attr("disabled", true);
		$("#verifyNo").focus();
		bol = true; //正在发送状态更变
		btnSendCode.val(+curCount + "s后可再获取");
		InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		return "";
	});
//timer处理函数
	function SetRemainTime() {
		if (curCount == 0) {
			window.clearInterval(InterValObj);//停止计时器
			btnSendCode.parent(".bgStyle").attr("disabled", false);
			btnSendCode.attr("disabled", false);;//启用按钮
			bol = false; //正在发送状态更变
			btnSendCode.val("重新发送验证码");
			return "";
		}
		else {
			curCount--;
			btnSendCode.val(+curCount + "s后可再获取");
		}
	}
}