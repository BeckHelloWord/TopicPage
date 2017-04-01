/**
 * Created by T'ingHsi on 2016/6/23.
 */
define(function (require,exports,module) {
	var Module = module.constructor;

	var publicArr = {
		'IMG_SERVER' : '/',
		'SERVER_ADDRESS' : '/',
		'rejump' : 'customers',
		'debug' : false
	};
	
	Module.prototype.publicArr = publicArr;

	var Auth = {
		get: function () {
			var result = {};
			try{
				result = JSON.parse(sessionStorage['persion']);
			}catch(r){
				result = publicArr['persion'];
			}
			if("object" === typeof result && null != result){
				return result['accessToken'];
			}
			return 0;
		},
		set: function (_user) {
			try{
				sessionStorage['persion'] = JSON.stringify(_user);
			}catch(r){
				publicArr['persion'] = _user;
			}
		},
		remove: function () {
			sessionStorage.removeItem('persion');
			publicArr['persion'] = {};
		}
	};
	Module.prototype.Auth = Auth;
	
	
	var pagedata = {
		busy : false, //ajax请求中
		max : 10
	}
	Module.prototype.pagedata = pagedata;
	
	/*
		//客户详情
		customer : {
			info : {isSuccess:false, message:'加载中...',data:{realName:'',mobile:'',availableMoney:'',waitingReceiptAllMoney:''}},
			list : {isSuccess:false, message:'加载中...',data:[]}
		}
	*/
	
	var API_GET = function(config){
		var data = config['data'] || {};
		config['success'] = config['success'] || function(){};
		var cache = {url: config['url'].replace(/\//g, ''),data:JSON.stringify(data).replace(/(\:)|(\")|(\,)|(\{)|(\})/g,'')};
		if(typeof publicArr[cache['url']] == 'undefined'){ publicArr[cache['url']] = {}; }
		if(typeof publicArr[cache['url']][cache['data']] != 'undefined'){
			config['success'](JSON.parse(publicArr[cache['url']][cache['data']]));
			return;
		}
		
		
		config['fail'] = function(response){
			//console.log(response);
			if(/重新登录/.test(response.message)){
				Auth.remove();
			}
		};
		config['error'] = config['error'] || function(xhr, type){
			if(publicArr.debug && top_nav.shownav == false){
				alert('访问接口时发生意外错误：\r\n接口地址: ' + config.url + '\r\n请将此错误截图，反馈给工作人员谢谢！');
			}
			//console.log(xhr);
		};
		
		
		
		
		
		var _config = {
			'API_KEY' : Auth.get(), //不可为null
			'SECRET' : 'UYGGYG876T6759HUHI975T7GGKJO9786456EDC08'
		};
		
		var param = function(obj) {
			//console.log(_config);
			var newobj = { 'api_key' : _config['API_KEY'], 'ct' : 1, 'bt' : 2 },
				tmparr = ['api_key', 'ct', 'bt'],
				query = [], name, value, subName, querytext;

			for(name in obj) {
				tmparr.push(name);
				newobj[name] = obj[name]; //复制一个新的obj,为了不影响原有formData数据
			}
			tmparr.sort();

			for(var i = 0, len = tmparr.length; i < len; i++) {
				name = tmparr[i];
				value = newobj[name];
				if(value instanceof Array) {
					value = value.join(',');
				}else if(value instanceof Object) { //解决 select BUG
					for(subName in value) {
						value = value[subName];
						break;
					}
				}
				if(value !== undefined && value !== null){
					query.push(name + '=' + value);
					//query.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
				}
			}
			querytext = _config['SECRET'] + query.join('').split('=').join('');
			return query.join('&') + '&sign=' + MD5(querytext).toUpperCase();
		};
		
		$.ajax({
			type: 'POST',
			url: publicArr['SERVER_ADDRESS'] + config['url'],
			data: (String(data) == '[object Object]' ? param(data) : data),
			dataType: 'json',
			success: function(response){
				if(response.data == null){ response.data = []; }
				publicArr[cache['url']][cache['data']] = JSON.stringify(response);
				config['success'](response);
				/*
				if(publicArr.debug && _config.API_KEY == 0 && publicArr.path=='customers'){
					var str=prompt('是否需要改改？','');
					if(str){ setToken(str); }
				}
				*/
				if(response.isSuccess == false){
					config['fail'](response);
				//	alert('访问接口时发生意外错误：\r\n接口地址: ' + config.url + '\r\n错误信息：' + response.message);
				}
			},
			error: config['error']
		});

	};
	Module.prototype.API_GET = API_GET;
	
	var getlist = function (arr) {
			pagedata.arr = arr;
			var postData = pagedata[publicArr.path];
			API_GET({
				url : postData.url,
				data : {offset:postData.offset, max:pagedata.max},
				success : function(result){
					/*
					if(publicArr.debug && top_nav.shownav == false){
						alert(JSON.stringify(result));
					}
					*/
					if(pagedata[publicArr.path].data == result.data){ return; } //重复请求
					//postData.totalCount = result.totalCount || 1000; //同步总记录数
					
					//隐藏继续加载按钮
					//总数量 > 已经加载的数量
					//if(result.totalCount > pagedata[publicArr.path]['offset']){
					//当前取到的数量 小于 要取的数量
					if(result.data.length < pagedata.max){
						pagedata[publicArr.path]['stillMore'] = false;
					}else{
						pagedata[publicArr.path]['stillMore'] = true;
					}
					
					
					if(result.data.length == 0){ //如果没有记录
						result.data = []; //解决数据为null，遍历失败的问题
						pagedata[publicArr.path]['stillMore'] = false; //无数据，去除加载更多按钮
					}else{
						//设置下次请求的 开始值
						pagedata[publicArr.path]['offset'] += result.data.length;
					}
					
					//var newData = pagedata[publicArr.path].data.concat(result.data);
					pagedata[publicArr.path].data = result.data;
					
					var newData = arr.list.data.concat(result.data);
					result.data = newData;
					
					arr.list = result;
					
					
					

					//解除ajax请求锁
					pagedata.busy = false;
					
				}
			});

		};
	pagedata['loadMore'] = function(arr) {
		pagedata.arr = arr;
		//下拉刷新记载更多
		var postData = pagedata[publicArr.path];
		var totalCount = postData['totalCount'], //总记录数
			offset = postData['offset']; //起始记录数

		//已经获得总数量 && 将要开始取的数量 == 总数量  Mark: 应该用 == 为了容错所以用 <=
		if(totalCount !== false && totalCount <= offset){
			pagedata[publicArr.path]['stillMore'] = false;
			return;
		}
		
		//尚未发起过请求(未取得总数量) || 将要开始取的数量 < 总数量
		if(totalCount === false || offset < totalCount){
			//防止重复触发ajax请求
			if(pagedata.busy){ return false; }
			//开启ajax请求锁
			pagedata.busy = true;
			//开始请求
			getlist(arr);
		}
		
	}
	Module.prototype.loadMore = pagedata['loadMore'];
	
	
	$(window).on('scroll',function() {
		var raw = $("a.page_button[when-visibled]")
		
		raw.each(function(){
			if(publicArr.path == '/view/:id'){ return; }
			if(pagedata[publicArr.path]['stillMore'] == false){ return; }
			var me = $(this);
			var meTop = me.offset().top,
				scrollTop = $("body").scrollTop(),
				windowHeight = $(window).height();
			
			//alert((scrollTop + windowHeight * 1.5) + ' loadNextPage ' + meTop + ' = ' + (scrollTop + windowHeight * 1.5 >= meTop));
			//窗口卷出距离 + 窗口高度 * 1.5 >= 元素距离顶部的距离
			if ((scrollTop + windowHeight * 1.5 >= meTop)) {
				pagedata[publicArr.path]['stillMore'] = false;
				pagedata[this.getAttribute("when-visibled")](pagedata.arr);
			}
			
		});
	});
	
	if(publicArr.debug && !/.com/.test(location.host) && Auth.get() == 0){
		setTimeout(function(){
			var str1=prompt('请输入用户名','');
			var str2=prompt('请输入密码','');
			if(str1 && str2){
				API_GET({
					url : 'wd_api/userCenter/loginOn',
					data : { username : str1, password : str2 },
					success : function(result){
						if (result.isSuccess) {
							setToken(result.data);
							//page.setType('customers');
						}else{
							alert(result.message);
						}
					}
				});
			}
		},0);
	}
	
	window.setToken = function(accessToken){
		Auth.set({"accessToken": accessToken});
		if(publicArr.path === '/view/:id'){
			publicArr.me.getCustomer(publicArr.me.$route.params.id);
		}else{
			pagedata['loadMore'](publicArr.me);
		}
	}
	
	
});
