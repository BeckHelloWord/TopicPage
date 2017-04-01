(function(){
	"use strict"; // 严格模式

	var serverTime = getServerTime().getTime(),
		time06 = new Date('2016/12/06 00:00:00').getTime(),
		time08 = new Date('2016/12/08 00:00:00').getTime(),
		time13 = new Date('2016/12/15 00:00:00').getTime(),
		time22 = new Date('2016/12/22 00:00:00').getTime(),
		time31 = new Date('2016/12/31 00:00:00').getTime();


	if(serverTime > time06 && serverTime < time08){
		$(".li06").addClass("on");
	}else if(serverTime >= time08 && serverTime < time13){
		$(".li08").addClass("on");
	}else if(serverTime >= time13 && serverTime < time22){
		$(".li13").addClass("on");
	}else if(serverTime >= time22 && serverTime < time31){
		$(".li22").addClass("on");
	}else if(serverTime >= time31){
		$(".li31").addClass("on");
	}

	if(serverTime >= time31){
		$(".placeLeft .li31 a").removeClass("noStart");
		$(".li31 a").addClass("start");
	}

	$(".timeLi li a,.placeLeft li a").on("click", function(e){
		if(!$(this).hasClass("start")){
			$(".timer-mask").show();
			e.preventDefault();
		}
	});

	$(".js-close").on("click", function(e){
		$(".timer-mask").hide();

		e.preventDefault();
	});
}());