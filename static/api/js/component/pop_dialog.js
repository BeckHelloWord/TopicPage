window._bd_share_main.F.module("component/pop_dialog",function(e,t){var n=e("base/tangram").T,r=e("base/class").Class,i=e("conf/const"),s=e("component/pop_base"),o={btn:""},u,a,f,l=r.create(function(){function t(t){t.keyCode==27&&e.hide()}function r(){var e=n.browser.ie==6?n(window).scrollTop():0,t=a.outerWidth(),r=a.outerHeight(),i=n(window).width(),s=n(window).height(),o=(s-r)/2+e,u=(i-t)/2;return{top:o>0?o:0,left:u>0?u:0}}function i(t,r){var i=n.extend({},e._partnerSort,r.bdDialogPartners),s=[];n.each(i,function(t,n){s[t]='<li><a href="#" onclick="return false;" class="popup_'+n+'" data-cmd="'+n+'">'+e._partners[n].name+"</a></li>"}),e._container.html(s.join(""))}var e=this;e._poptype=2,e._hide=function(){f&&f.hide(),a&&a.hide(),n("body").unbind("keydown",t)},e._show=function(s,o){i(e._container,o);var u=r();n.each([a,f],function(e,t){t.css({top:u.top,left:u.left}).show()}),n("body").bind("keydown",t),window._bd_share_main.F.use("trans/logger",function(e){e.dialog()})},e._init=function(){var t=['<iframe frameborder="0" class="bdshare_dialog_bg" style="display:none;"></iframe>'].join(""),r=['<div class="bdshare_dialog_box" style="display:none;">','<div class="bdshare_dialog_top">','<a class="bdshare_dialog_close" href="#" onclick="return false;" title="\u5173\u95ed"></a>\u5206\u4eab\u5230',"</div>",'<ul class="bdshare_dialog_list"></ul>','<div class="bdshare_dialog_bottom">','<a href="javascript:;">\u767e\u5ea6\u5206\u4eab</a>',"</div>","</div>"].join("");n("body").insertHTML("beforeEnd",t+r),e._container=n(".bdshare_dialog_list"),a=n(".bdshare_dialog_box"),f=n(".bdshare_dialog_bg"),n(".bdshare_dialog_close").click(e.hide)}},s.PopBase);t.Dialog=function(){return u||(u=new l,u.init()),u}()});