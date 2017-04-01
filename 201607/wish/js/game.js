(function ($) {
	$.fn.GameA = function (option) {

		var settings = $.extend({
			stage : 1,
			startStage : 1,
			nowtime : false
		}, option);

		$(this).html('<div id="play_item"></div>\
		<div class="play_center">\
		<div id="play_start_time"></div>\
		<div id="play_sponsor"></div>\
		<div id="play_name"><input type="text" placeholder="4位生日月/日" maxlength="4" pattern="([0-9]|[0-9]|[0-9])" /><p>如8月8日，输入0808</p></div>\
		<div id="play_start" class="is_start"></div>\
		</div>\
		<div id="play_light" class="pstep1"><div class="bg_light2"></div></div>\
		<div id="play_shadowA"><div class="bg_light"></div></div>\
		<div id="play_shadowB"><div class="bg_light"></div></div>');


		var TGamedom = {
			'timetext': $('#play_start_time')[0],
			'logo': $('#play_sponsor')[0],
			'name': $('#play_name')[0],
			'items': $('#play_item')[0],
			'start': $('#play_start')[0]
		};

		var stage = 1,
			startStage = 1,
			bol = true,
			nowtime = Math.round(new Date().getTime()),
			endtime = settings.main.time,
			allstep = settings.main.item.length;

		function GetRTime() {
			var http_request;
			if (nowtime === false) {
				if (window.ActiveXObject) {
					http_request = new ActiveXObject('Microsoft.XMLHTTP');
				} else if (window.XMLHttpRequest) {
					http_request = new XMLHttpRequest();
				}
				http_request.open('HEAD', '.', false);
				http_request.send(null);
				nowtime = new Date(http_request.getResponseHeader('Date')).getTime();
			} else {
				nowtime = nowtime + 1000;
			}
			if (nowtime >= endtime) {
				if (startStage <= stage) {
					TGamedom['start'].className = 'is_start';
				} else {
					TGamedom['start'].className = 'is_end';
				}
				TGamedom['start'].innerHTML = '';
			} else {
				TGamedom['start'].className = 'no_start';
				var leftsecond = parseInt((endtime - nowtime) / 1000);
				if (leftsecond < 0) {
					leftsecond = 0;
				}
				var d = parseInt(leftsecond / 3600 / 24);
				var h = parseInt((leftsecond / 3600) % 24);
				var m = parseInt((leftsecond / 60) % 60);
				var s = parseInt(leftsecond % 60);
				TGamedom['start'].innerHTML = '距离开始还有<br/>' + d + '天' + h + '小时' + m + '分' + s + '秒';
			}
			setTimeout(GetRTime, 1000);
		}
		//GetRTime();


		function TGchange() {
			var ifig = settings.main;
			if (typeof ifig == 'undefined') { return; }
			TGamedom['timetext'].innerHTML = ifig['timetext'];
			TGamedom['logo'].innerHTML = '<a href="' + ifig['logoUrl'] + '" target="_blank"><img src="' + ifig['logo'] + '" /></a>';
			//TGamedom['name'].innerHTML = ifig['name'];
			endtime = ifig['time'];
			if (nowtime >= endtime || ifig.remain == 0) {
				console.log(nowtime);
				console.log(endtime);
				console.log(ifig.remain);
				TGamedom['start'].className = 'is_end';
			} else {
				TGamedom['start'].className = 'is_start';
			}
			var items = [],
				itemlink = '',
				itempic = '';
			var itemarr = ifig['item'];
			if (typeof itemarr == 'undefined') {
				itemarr = [];
			}
			for (var i = 0, len = allstep; i < len; i++) {
				if (typeof itemarr[i] == 'undefined') {
					itemarr[i] = ['', '', ''];
				}
				itemtitle = (typeof itemarr[i][0] == 'undefined' || itemarr[i][0] == '') ? '': itemarr[i][0];
				itempic = (typeof itemarr[i][1] == 'undefined' || itemarr[i][1] == '') ? 'item/0.png': itemarr[i][1];
				itemlink = (typeof itemarr[i][2] == 'undefined' || itemarr[i][2] == '') ? 'javascript:;': itemarr[i][2] + '" target="_blank';
				items.push('<div class="pitem_' + (i + 1) + '"><img src="' + itempic + '" /><p>' + itemtitle + '</p></div>');
			}
			TGamedom['items'].innerHTML = items.join('');

			//初始化光圈
			var items = $('#play_item').find('div'),
				itemp = $('#play_item'),
				firstitem = $(items[0]);

			var itemwh = [firstitem.width(),firstitem.height()],
				itemptl = [parseInt(itemp.css("top")),parseInt(itemp.css("left"))],
				playLbw = parseInt(TGconfig['playLight'].css('borderWidth')) || 0;


			TGconfig['playLight'].css({width:itemwh[0],height:itemwh[1]});
			TGconfig['playShadowA'].css({width:itemwh[0],height:itemwh[1]});
			TGconfig['playShadowB'].css({width:itemwh[0],height:itemwh[1]});


			//var styleText = [];
			//items.each(function(){
			//	var me = $(this);
			//	var myid = this.className.match(/\_(\d+)/);
			//	console.log(me.css("top"), me.css("left"));
			//	styleText.push('.playPart .pstep'+ myid[1] + '{top:'+ (parseInt(me.css("top")) + itemptl[0] - playLbw) +'px;left:'+ (parseInt(me.css("left")) + itemptl[1] - playLbw) +'px;}')
			//});
			//$('<style>'+styleText.join('')+'</style>').appendTo($('head'));
		}


		var TGconfig = {
			"msg": $('#msg')[0],
			"msgText": $('#msg h3')[0],
			"mygold": $('#mygold')[0],
			"playLight": $('#play_light'),
			"bgLight": $('#play_light .bg_light2')[0],
			"playShadowA": $('#play_shadowA'),
			"playShadowB": $('#play_shadowB'),
			"nowstep": 1,
			"stopstep": null,
			"play": false,
			"flicker": null
		};
		function showmsg(e) {
			TGconfig["msg"].className = e;
			TGconfig["msg"].style.display = "block";
		}
		window.hide = function () {
			TGconfig["msg"].style.display = "none";
		};
		var TibooGame = {
			"src":"",
			"i": 1,
			"len": null,
			"playShadowAstep": allstep,
			"playShadowBstep": allstep - 1,
			"start": function() {
				if (TGconfig["play"] === false) {
					TGconfig["play"] = true;
					TGamedom['start'].className = 'is_playing';
					TGconfig["bgLight"].className = "bg_light1";
					//settings.url

					$.ajaxSetup({cache: false });

                    var arr = ["白羊", "金牛", "双子", "巨蟹", "天秤", "天蝎", "双鱼", "水瓶", "摩羯", "射手", "处女", "狮子"];
					var val =  $("#play_name input").val();
					var ind = arr.indexOf(getAstro(val)) + 1;

					$.ajax({
						url: settings.url,
						success: function(json){
							if(!json.success){
								window.location.href = "/login/index.html?redirect=/topic/201607/wish/";

								return false;
							}

							if(!json.type){
								showmsg("noMask");
								$("#msg .cont").eq(1).find("h3").text(json.message);
								TGamedom['start'].className = 'is_start';
								TGconfig["play"] = false;
								return false;
							}

							var data = {type:1,lang:'您现在还不能抽奖哦！',stopstep:ind,mygold:0};

							//type 提示信息 停止号码 剩余抽奖次数

							if (data["type"] > 0) {
								TGconfig["stopstep"] = parseInt(data["stopstep"]);
								TibooGame.go();
							}

							getStarCont(ind - 1);

							$("#msg .cont").eq(0).find("img").attr("src", json.logl)
						}
					});
				}
			},
			"go": function() {
				TibooGame["len"] = (26 - TGconfig["nowstep"]) + TGconfig["stopstep"] + 48;

				TibooGame["i"] = 1;
				TibooGame.gonext();
				var sloutime = 0;
				for (var i = 12, len = 1; i > len; i--) {
					sloutime = i * 50 + sloutime;
					setTimeout(TibooGame.gonext, sloutime);
				}
				for (var i = 1, len = TibooGame["len"] - 24; i < len; i++) {
					sloutime = sloutime + 60;
					setTimeout(TibooGame.gonext, sloutime);
				}
				for (var i = 1, len = 14; i < len; i++) {
					sloutime = i * 50 + sloutime;
					setTimeout(TibooGame.gonext, sloutime);
				}

			},
			"gonext": function() {
				if (TibooGame["i"] < TibooGame["len"]) {
					TibooGame["i"]++;
					TGconfig["playLight"][0].className = "pstep" + TGconfig["nowstep"];
					TibooGame.setshadow();
					if (TGconfig["nowstep"] + 1 > allstep) {
						TGconfig["nowstep"] = 1;
						TibooGame["playShadowAstep"] = allstep;
						TibooGame["playShadowBstep"] = allstep - 1;
					} else {
						TGconfig["nowstep"] = TGconfig["nowstep"] + 1;
						TibooGame["playShadowAstep"] = TGconfig["nowstep"] - 1;
						if (TGconfig["nowstep"] == 2) {
							TibooGame["playShadowBstep"] = allstep;
						} else {
							TibooGame["playShadowBstep"] = TGconfig["nowstep"] - 2;
						}
					}
				} else {
					TibooGame.stop();
				}
			},
			"stop": function() {
				var bgLightNo = 2;
				TGconfig["flicker"] = setInterval(function() {
					TGconfig["bgLight"].className = "bg_light" + bgLightNo;
					bgLightNo = (bgLightNo == 2) ? 1 : 2;
				}, 50);
				TGconfig["play"] = false;
				setTimeout(function() {
					clearInterval(TGconfig["flicker"]);
					TGconfig["bgLight"].className = "bg_light2";
					if(bol){
						showmsg("winMask");
					}else{
						showmsg("thanksMask");
					}

					TGconfig["play"] = false;
					TGamedom['start'].className = 'is_start';
				}, 650);
			},
			"setshadow": function() {
				if (TibooGame["i"] > 3) {
					TGconfig["playShadowA"].show();
					TGconfig["playShadowB"].show();
					TGconfig["playShadowA"][0].className = "pstep" + TibooGame["playShadowAstep"];
					TGconfig["playShadowB"][0].className = "pstep" + TibooGame["playShadowBstep"];
				}
				if (TibooGame["len"] - TibooGame["i"] < 1) {
					TGconfig["playShadowA"].hide();
					TGconfig["playShadowB"].hide();
				}
			}
		};

		function getAstro(str){
			var month = str.substring(0, 2);
			var day = str.substring(2, 4);
			var s="摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯";
			var arr=[20,19,21,21,21,22,23,23,23,23,22,22];

			return s.substr(month*2-(day<arr[month-1]?2:0),2);
		}

		function getStarCont(ind){
			$.ajax({
				url: "js/data.json",
				success: function(data){
					$("#msg .desc span").text(data.title[ind]);
					$("#msg .desc p").text(data.desc[ind]);
				}
			});
		}

		$(TGamedom['start']).click(function() {
			var val = $("#play_name input").val();

			if(val == ""){
				$(".errPop").show().find(".hd p").text("亲，请输入您的生日如 0808");
				return false;
			}

			if(val.length < 4 || isNaN(val) || val > 1231){
				$(".errPop").show().find(".hd p").text("亲，请按照正确的格式输入哦！");
				return false;
			}

			if (this.className != 'is_start') { return; }

			TibooGame.start();
		});

		TGchange();

		//中奖名单滚动
		function AutoScroll(obj) {
			var height = $(obj).find("ul:first li:first").height();
			$(obj).find("ul:first").animate({
				marginTop: "-" + height + "px"
			}, 'slow', function() {
				$(this).css({
					marginTop: "0px"
				}).find("li:first").appendTo(this);
			});
		}
		setInterval(function() { AutoScroll(option.lucker); },2000);

	};
})(jQuery);