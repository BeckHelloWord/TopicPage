/**
 * Created by T'ingHsi on 2016/6/23.
 */
// 最近投资

define(function (require,exports,module) {
    require("components/public.js");
    var sTpl = require("invests/index.html");
    //require("lib/layer/layer.js");
    //require("lib/layer/need/layer.css");
    
    var Auth = module.Auth;
    var publicArr = module.publicArr;
    var pagedata = module.pagedata;
    var loadMore = module.loadMore;
    
    var invests_extend = Vue.extend({
        template: sTpl,
        methods:{
            loadMore:function(){
                //layer.open({
                //    content: '我是Foo页面',
                //    style: 'background-color:#09C1FF; color:#fff; border:none;',
                //    time: 2
                //});
            }
        },
        data:function(){
            return {
                list: {isSuccess:'', message:'', data : [] },
                stillMore: false,
                pagenavClass: this.$parent.$children[0].shownav == false ? '' : 'pageNav'
            };
        },
        created: function () {
			//设置返回键
			this.$parent.$children[0].showgoback = false;
            //设置底部菜单
            publicArr.path = this.$route.fullPath;
            this.$parent.$children[1].changeMenu(publicArr.path);
			pagedata[publicArr.path] = {totalCount: false, offset: 0, stillMore: false, data:[], url: 'wd_api/financialPlanner/getRecommendMemberInvest'};
            
            //拉取数据
            var me = this;
            if(Auth.get() != 0){
                loadMore(me);
            }else{
				publicArr.me = me;
			}
            /*
            return {
                list : {
                    "data":[
                        {"investorId":17328,"realName":"杭飞云","mobile":"15021987832","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17334,"realName":"李可","mobile":"15021619668","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17342,"realName":"胡斌","mobile":"13816377910","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17362,"realName":"","mobile":"18916792135","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17389,"realName":"","mobile":"18964812901","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17407,"realName":"乐曼青","mobile":"13661654968","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17439,"realName":"洪盛琦","mobile":"18616505307","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17491,"realName":"王玮","mobile":"15002139171","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17585,"realName":"沈宏","mobile":"18918359986","investAmount":0.00,"dateCreated":'2016-06-23'},
                        {"investorId":17671,"realName":"郭玉娥","mobile":"13205171543","investAmount":0.00,"dateCreated":'2016-06-23'}
                    ],
                    "isSuccess":true,"message":"","page":1,"size":5,"status":200,"totalCount":0
                }
            };
            */
        }
    });

    module.exports = invests_extend;
});