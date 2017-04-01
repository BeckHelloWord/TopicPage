/**
 * Created by T'ingHsi on 2016/6/23.
 */
define(function (require,exports,module) {
    require("src/public.css"); //css
    require("lib/md5.js");
    //require("components/public.js");
    //require("components/menu.js"); //menu
	
	//var publicArr = module.publicArr; //公共函数
	
	//var Auth = module.Auth;

	//var API_GET = module.API_GET;
	
	

    // 路由器需要一个根组件。
    var App = Vue.extend({
		components: {
			'navigation' : {
				template: '<header class="top_nav">\
					<a v-if="showgoback" class="back v-hide" v-on:click="goback()">&lt;</a>\
					<div>理财师</div>\
					<a class="reload" onclick="location.reload()"></a>\
				</header>',
				data:function(){
					return {
						showgoback: false,
						shownav: true
					};
				},
				methods: {
					goback: function(){
						try{
							history.back();
						}catch(r){
							history.go(-1);
						}
					}
				},created: function () {
					var ua = navigator.userAgent.toLowerCase();
					
					//if(navigator.standalone == true){
					//IOS桌面版本运行
					if(ua.indexOf('baoxiang') != -1){
						//宝象APP内运行
						this.shownav = false;
					}else if(ua.indexOf('micromessenger/') != -1){
						//微信内运行
						this.shownav = false;
					}else if(ua.indexOf('qq/') != -1){
						this.shownav = false;
					}
					var me = this;
					setTimeout(function(){
						if(me.shownav == false){
							me.$el.style.display='none';
						}
					},0);
				}
			},
			'menu' : {
				template:	'<nav class="tab_bar">\
				<template v-if="path == \'/view/:id\'">\
					<template v-for="t in view">\
							<a :class="t.className" href="{{t.link}}">{{t.title}}{{t.link}}</a>\
					</template>\
				</template>\
				<template v-else>\
					<template v-for="t in list">\
							<a :class="t.className" v-link="{ path: t.link, replace: t.replace }">{{t.title}}</a>\
					</template>\
				</template>\
				</nav>',
				data:function(){
					return {
						path:'customers',
						list: [
							{title:"我的客户",link:"/customers",replace:true,className:'customers_btn'},
							{title:"即将回款",link:"/receipts",replace:true,className:'receipts_btn'},
							{title:"近期投资",link:"/invests",replace:true,className:'invests_btn'}
						],
						view: [
							{title:"短信联系",link:'sms:',replace:true,className:'sms_btn'},
							{title:"拨打电话",link:'tel:',replace:true,className:'tel_btn'}
						]
					};
				},
				methods:{
					changeMenu:function(){
						//console.log(this.$data);
						var mydata = this.$data;
						mydata.path = arguments[0];
						if(arguments[0] == '/view/:id' && arguments[1]){
							mydata.view[0].link = 'sms:' + arguments[1];
							mydata.view[1].link = 'tel:' + arguments[1];
						}
					}
				}
			},
		}
	});


	
    // 创建一个路由器实例
    var router = new VueRouter();

    // 定义路由规则
    router.map({
        '/customers': {
            component: function (resolve) {
                require.async(['customers/index.js'],resolve);
            }
        },
        '/receipts': {
            component: function (resolve) {
                require.async(['receipts/index.js'],resolve);
            }
        },
        '/invests': {
            component: function (resolve) {
                require.async(['invests/index.js'],resolve);
            }
        },
        '/view/:id': {
            component: function (resolve) {
                require.async(['view/index.js'],resolve);
            }
        }
    });
	
router.beforeEach(function (transition) {
	//console.log('将要浏览到: ' + transition.to.fullPath);
	if(transition.to.path == '/'){
		transition.redirect('/customers');
	}
	//if (transition.to.auth) {
    // 对用户身份进行验证...
	//}
	
    //if (transition.to.name === 'grouplistedit' && transition.from.name !== 'grouplist') {
	//	  transition.abort()
    //}
	transition.next()
})
/*
router.beforeEach(function (transition) {
	
	
	if (transition.to.fullPath === '/view/:id') {
		//App.changeMenu('view')
		console.log('设置menu view')
		//transition.abort()
	} else {
		//App.changeMenu('')
		console.log('设置menu 默认')
	}
	transition.next()
})
*/
//router.afterEach(function (transition) {
//  console.log('成功浏览到: ' + transition.to.path)
//})


    // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
    router.start(App, '#app');

});