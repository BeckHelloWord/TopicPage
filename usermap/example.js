(function () {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var delay = getQueryString('delay') ? getQueryString('delay') : 10,URI= '/';
var placeList = [
    {name:'海门市', geoCoord:[121.15, 31.89]},
    {name:'鄂尔多斯市', geoCoord:[109.781327, 39.608266]},
    {name:'招远市', geoCoord:[120.38, 37.35]},
    {name:'舟山市', geoCoord:[122.207216, 29.985295]},
    {name:'齐齐哈尔市', geoCoord:[123.97, 47.33]},
    {name:'盐城市', geoCoord:[120.13, 33.38]},
    {name:'赤峰市', geoCoord:[118.87, 42.28]},
    {name:'青岛市', geoCoord:[120.33, 36.07]},
    {name:'乳山市', geoCoord:[121.52, 36.89]},
    {name:'金昌市', geoCoord:[102.188043, 38.520089]},
    {name:'泉州市', geoCoord:[118.58, 24.93]},
    {name:'莱西市', geoCoord:[120.53, 36.86]},
    {name:'日照市', geoCoord:[119.46, 35.42]},
    {name:'胶南市', geoCoord:[119.97, 35.88]},
    {name:'南通市', geoCoord:[121.05, 32.08]},
    {name:'拉萨市', geoCoord:[91.11, 29.97]},
    {name:'云浮市', geoCoord:[112.02, 22.93]},
    {name:'梅州市', geoCoord:[116.1, 24.55]},
    {name:'文登市', geoCoord:[122.05, 37.2]},
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'攀枝花市', geoCoord:[101.718637, 26.582347]},
    {name:'威海市', geoCoord:[122.1, 37.5]},
    {name:'承德市', geoCoord:[117.93, 40.97]},
    {name:'厦门市', geoCoord:[118.1, 24.46]},
    {name:'汕尾市', geoCoord:[115.375279, 22.786211]},
    {name:'潮州市', geoCoord:[116.63, 23.68]},
    {name:'丹东市', geoCoord:[124.37, 40.13]},
    {name:'太仓市', geoCoord:[121.1, 31.45]},
    {name:'曲靖市', geoCoord:[103.79, 25.51]},
    {name:'烟台市', geoCoord:[121.39, 37.52]},
    {name:'福州市', geoCoord:[119.3, 26.08]},
    {name:'瓦房店市', geoCoord:[121.979603, 39.627114]},
    {name:'即墨市', geoCoord:[120.45, 36.38]},
    {name:'抚顺市', geoCoord:[123.97, 41.97]},
    {name:'玉溪市', geoCoord:[102.52, 24.35]},
    {name:'张家口市', geoCoord:[114.87, 40.82]},
    {name:'阳泉市', geoCoord:[113.57, 37.85]},
    {name:'莱州市', geoCoord:[119.942327, 37.177017]},
    {name:'湖州市', geoCoord:[120.1, 30.86]},
    {name:'汕头市', geoCoord:[116.69, 23.39]},
    {name:'昆山市', geoCoord:[120.95, 31.39]},
    {name:'宁波市', geoCoord:[121.56, 29.86]},
    {name:'湛江市', geoCoord:[110.359377, 21.270708]},
    {name:'揭阳市', geoCoord:[116.35, 23.55]},
    {name:'荣成市', geoCoord:[122.41, 37.16]},
    {name:'连云港市', geoCoord:[119.16, 34.59]},
    {name:'葫芦岛市', geoCoord:[120.836932, 40.711052]},
    {name:'常熟市', geoCoord:[120.74, 31.64]},
    {name:'东莞市', geoCoord:[113.75, 23.04]},
    {name:'河源市', geoCoord:[114.68, 23.73]},
    {name:'淮安市', geoCoord:[119.15, 33.5]},
    {name:'泰州市', geoCoord:[119.9, 32.49]},
    {name:'南宁市', geoCoord:[108.33, 22.84]},
    {name:'营口市', geoCoord:[122.18, 40.65]},
    {name:'惠州市', geoCoord:[114.4, 23.09]},
    {name:'江阴市', geoCoord:[120.26, 31.91]},
    {name:'蓬莱市', geoCoord:[120.75, 37.8]},
    {name:'韶关市', geoCoord:[113.62, 24.84]},
    {name:'嘉峪关市', geoCoord:[98.289152, 39.77313]},
    {name:'广州市', geoCoord:[113.23, 23.16]},
    {name:'延安市', geoCoord:[109.47, 36.6]},
    {name:'太原市', geoCoord:[112.53, 37.87]},
    {name:'清远市', geoCoord:[113.01, 23.7]},
    {name:'中山市', geoCoord:[113.38, 22.52]},
    {name:'昆明市', geoCoord:[102.73, 25.04]},
    {name:'寿光市', geoCoord:[118.73, 36.86]},
    {name:'盘锦市', geoCoord:[122.070714, 41.119997]},
    {name:'长治市', geoCoord:[113.08, 36.18]},
    {name:'深圳市', geoCoord:[114.07, 22.62]},
    {name:'珠海市', geoCoord:[113.52, 22.3]},
    {name:'宿迁市', geoCoord:[118.3, 33.96]},
    {name:'咸阳市', geoCoord:[108.72, 34.36]},
    {name:'铜川市', geoCoord:[109.11, 35.09]},
    {name:'平度市', geoCoord:[119.97, 36.77]},
    {name:'佛山市', geoCoord:[113.11, 23.05]},
    {name:'海口市', geoCoord:[110.35, 20.02]},
    {name:'江门市', geoCoord:[113.06, 22.61]},
    {name:'章丘市', geoCoord:[117.53, 36.72]},
    {name:'肇庆市', geoCoord:[112.44, 23.05]},
    {name:'大连市', geoCoord:[121.62, 38.92]},
    {name:'临汾市', geoCoord:[111.5, 36.08]},
    {name:'吴江市', geoCoord:[120.63, 31.16]},
    {name:'石嘴山市', geoCoord:[106.39, 39.04]},
    {name:'沈阳市', geoCoord:[123.38, 41.8]},
    {name:'苏州市', geoCoord:[120.62, 31.32]},
    {name:'茂名市', geoCoord:[110.88, 21.68]},
    {name:'嘉兴市', geoCoord:[120.76, 30.77]},
    {name:'长春市', geoCoord:[125.35, 43.88]},
    {name:'胶州市', geoCoord:[120.03336, 36.264622]},
    {name:'银川市', geoCoord:[106.27, 38.47]},
    {name:'张家港市', geoCoord:[120.555821, 31.875428]},
    {name:'三门峡市', geoCoord:[111.19, 34.76]},
    {name:'锦州市', geoCoord:[121.15, 41.13]},
    {name:'南昌市', geoCoord:[115.89, 28.68]},
    {name:'柳州市', geoCoord:[109.4, 24.33]},
    {name:'三亚市', geoCoord:[109.511909, 18.252847]},
    {name:'自贡市', geoCoord:[104.778442, 29.33903]},
    {name:'吉林市', geoCoord:[126.57, 43.87]},
    {name:'阳江市', geoCoord:[111.95, 21.85]},
    {name:'泸州市', geoCoord:[105.39, 28.91]},
    {name:'西宁市', geoCoord:[101.74, 36.56]},
    {name:'宜宾市', geoCoord:[104.56, 29.77]},
    {name:'呼和浩特市', geoCoord:[111.65, 40.82]},
    {name:'成都市', geoCoord:[104.06, 30.67]},
    {name:'大同市', geoCoord:[113.3, 40.12]},
    {name:'镇江市', geoCoord:[119.44, 32.2]},
    {name:'桂林市', geoCoord:[110.28, 25.29]},
    {name:'张家界市', geoCoord:[110.479191, 29.117096]},
    {name:'宜兴市', geoCoord:[119.82, 31.36]},
    {name:'北海市', geoCoord:[109.12, 21.49]},
    {name:'西安市', geoCoord:[108.95, 34.27]},
    {name:'金坛市', geoCoord:[119.56, 31.74]},
    {name:'东营市', geoCoord:[118.49, 37.46]},
    {name:'牡丹江市', geoCoord:[129.58, 44.6]},
    {name:'遵义市', geoCoord:[106.9, 27.7]},
    {name:'绍兴市', geoCoord:[120.58, 30.01]},
    {name:'扬州市', geoCoord:[119.42, 32.39]},
    {name:'常州市', geoCoord:[119.95, 31.79]},
    {name:'潍坊市', geoCoord:[119.1, 36.62]},
    {name:'重庆市', geoCoord:[106.54, 29.59]},
    {name:'台州市', geoCoord:[121.420757, 28.656386]},
    {name:'南京市', geoCoord:[118.78, 32.04]},
    {name:'滨州市', geoCoord:[118.03, 37.36]},
    {name:'贵阳市', geoCoord:[106.71, 26.57]},
    {name:'无锡市', geoCoord:[120.29, 31.59]},
    {name:'本溪市', geoCoord:[123.73, 41.3]},
    {name:'克拉玛依市', geoCoord:[84.77, 45.59]},
    {name:'渭南市', geoCoord:[109.5, 34.52]},
    {name:'马鞍山市', geoCoord:[118.48, 31.56]},
    {name:'宝鸡市', geoCoord:[107.15, 34.38]},
    {name:'焦作市', geoCoord:[113.21, 35.24]},
    {name:'句容市', geoCoord:[119.16, 31.95]},
    {name:'北京市', geoCoord:[116.46, 39.92]},
    {name:'徐州市', geoCoord:[117.2, 34.26]},
    {name:'衡水市', geoCoord:[115.72, 37.72]},
    {name:'包头市', geoCoord:[110, 40.58]},
    {name:'绵阳市', geoCoord:[104.73, 31.48]},
    {name:'乌鲁木齐市', geoCoord:[87.68, 43.77]},
    {name:'枣庄市', geoCoord:[117.57, 34.86]},
    {name:'杭州市', geoCoord:[120.19, 30.26]},
    {name:'淄博市', geoCoord:[118.05, 36.78]},
    {name:'鞍山市', geoCoord:[122.85, 41.12]},
    {name:'溧阳市', geoCoord:[119.48, 31.43]},
    {name:'库尔勒市', geoCoord:[86.06, 41.68]},
    {name:'安阳市', geoCoord:[114.35, 36.1]},
    {name:'开封市', geoCoord:[114.35, 34.79]},
    {name:'济南市', geoCoord:[117, 36.65]},
    {name:'德阳市', geoCoord:[104.37, 31.13]},
    {name:'温州市', geoCoord:[120.65, 28.01]},
    {name:'九江市', geoCoord:[115.97, 29.71]},
    {name:'邯郸市', geoCoord:[114.47, 36.6]},
    {name:'临安市', geoCoord:[119.72, 30.23]},
    {name:'兰州市', geoCoord:[103.73, 36.03]},
    {name:'沧州市', geoCoord:[116.83, 38.33]},
    {name:'临沂市', geoCoord:[118.35, 35.05]},
    {name:'南充市', geoCoord:[106.110698, 30.837793]},
    {name:'天津市', geoCoord:[117.2, 39.13]},
    {name:'富阳市', geoCoord:[119.95, 30.07]},
    {name:'泰安市', geoCoord:[117.13, 36.18]},
    {name:'诸暨市', geoCoord:[120.23, 29.71]},
    {name:'郑州市', geoCoord:[113.65, 34.76]},
    {name:'哈尔滨市', geoCoord:[126.63, 45.75]},
    {name:'聊城市', geoCoord:[115.97, 36.45]},
    {name:'芜湖市', geoCoord:[118.38, 31.33]},
    {name:'唐山市', geoCoord:[118.02, 39.63]},
    {name:'平顶山市', geoCoord:[113.29, 33.75]},
    {name:'邢台市', geoCoord:[114.48, 37.05]},
    {name:'德州市', geoCoord:[116.29, 37.45]},
    {name:'济宁市', geoCoord:[116.59, 35.38]},
    {name:'荆州市', geoCoord:[112.239741, 30.335165]},
    {name:'宜昌市', geoCoord:[111.3, 30.7]},
    {name:'义乌市', geoCoord:[120.06, 29.32]},
    {name:'丽水市', geoCoord:[119.92, 28.45]},
    {name:'洛阳市', geoCoord:[112.44, 34.7]},
    {name:'秦皇岛市', geoCoord:[119.57, 39.95]},
    {name:'株洲市', geoCoord:[113.16, 27.83]},
    {name:'石家庄市', geoCoord:[114.48, 38.03]},
    {name:'莱芜市', geoCoord:[117.67, 36.19]},
    {name:'常德市', geoCoord:[111.69, 29.05]},
    {name:'保定市', geoCoord:[115.48, 38.85]},
    {name:'湘潭市', geoCoord:[112.91, 27.87]},
    {name:'金华市', geoCoord:[119.64, 29.12]},
    {name:'岳阳市', geoCoord:[113.09, 29.37]},
    {name:'长沙市', geoCoord:[113, 28.21]},
    {name:'衢州市', geoCoord:[118.88, 28.97]},
    {name:'廊坊市', geoCoord:[116.7, 39.53]},
    {name:'菏泽市', geoCoord:[115.480656, 35.23375]},
    {name:'合肥市', geoCoord:[117.27, 31.86]},
    {name:'武汉市', geoCoord:[114.31, 30.52]},
    {name:'大庆市', geoCoord:[125.03, 46.58]}
];
var placeList2 = [
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'泰安市', geoCoord:[117.0264,36.0516]},
    {name:'济南市', geoCoord:[117, 36.65]},
    {name:'青岛市', geoCoord:[120.33, 36.07]},
    {name:'日照市', geoCoord:[119.46, 35.42]},
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'烟台市', geoCoord:[121.39, 37.52]},
    {name:'东莞市', geoCoord:[113.75, 23.04]},
    {name:'深圳市', geoCoord:[114.07, 22.62]},
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'成都市', geoCoord:[104.06, 30.67]},
    {name:'台州市', geoCoord:[121.420757, 28.656386]},
    {name:'北京市', geoCoord:[116.46, 39.92]},
    {name:'杭州市', geoCoord:[120.19, 30.26]},
    {name:'温州市', geoCoord:[120.65, 28.01]},
    {name:'石家庄市', geoCoord:[114.48, 38.03]},
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'合肥市', geoCoord:[117.27, 31.86]},
    {name:'武汉市', geoCoord:[114.31, 30.52]},
    {name:'上海市', geoCoord:[121.48, 31.22]},
    {name:'广州市', geoCoord:[113.23, 23.16]}
];

//require.config({
//    paths: {
//        echarts: '/web/js/echarts'
//    }
//});

//require(
//    [
//        'echarts',
//        'echarts/chart/map'
//    ],
    (function (echarts) {



        var option = {
            //backgroundColor: '#2b234a',
            color: [
                '#0ef1f2', '#1e90ff', 'lime'
            ],
            dataRange: {
                min : 0,
                max : 100,
                x: 'right',
                calculable : true,
                color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                textStyle:{
                    color:'#fff'
                }
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:[],
                textStyle : {
                    color: '#fff'
                }
            },
            series : [
                {
                    name: '会员',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{
                            borderColor:'#2456a6',
                            borderWidth:2.5,
                            areaStyle:{
                                color: '#1a417f'
                            }
                        }
                    },
                    data : [],
                    markPoint : {
                        symbolSize: 2,
                        large: true,
                        effect : {
                            show: true
                        },
                        data : (function(){
                            
                            var data = [];
			    
                            var len = 1;
                            var geoCoord
                            while(len--) {
                                geoCoord = placeList[len % placeList.length].geoCoord;
                                data.push({
                                    name : placeList[len % placeList.length].name,
                                    value : Math.random(),
                                    geoCoord : [
                                        geoCoord[0] + Math.random() * 2.4 - 1.2,
                                        geoCoord[1] + Math.random() * 2.2 - 1.1
                                    ]
                                })
                            }
                            
                            //console.log(data);
                            return data;
                        })()
                    }
                },
                
                {
                    name: '投资',
                    type: 'map',
                    mapType: 'china',
                    data:[],
                    geoCoord: {
'阿拉山口市': [82.5757,45.1706],  '包头市': [110.3467,41.4899],  '宝鸡市': [107.1826,34.3433],  '保定市': [115.0488,39.0948],   '北海市': [109.314,21.6211],
'北京市': [116.4075,39.9040],     '滨州市': [117.8174,37.4963],  '沧州市': [116.8286,38.2104],  '常州市': [119.4543,31.5582],   '成都市': [103.9526,30.7617],
'承德市': [117.5757,41.4075],     '大连市': [122.2229,39.4409],  '大同市': [113.7854,39.8035],  '丹东市': [124.541,40.4242],    '德州市': [116.6858,37.2107],
'东莞市': [113.8953,22.901],      '东营市': [118.7073,37.5513],  '鄂尔多斯市': [108.9734,39.2487], '佛山市': [112.8955,23.1097],'福州市': [119.4543,25.9222],
'广州市': [113.5107,23.2196],     '贵阳市': [106.6992,26.7682],  '哈尔滨市': [127.9688,45.368],    '海口市': [110.3893,19.8516],'邯郸市': [114.4775,36.535],
'杭州市': [119.5313,29.8773],     '合肥市': [117.29,32.0581],    '河源市': [114.917,23.9722],      '菏泽市': [115.6201,35.2057],'衡水市': [115.8838,37.7161],
'侯马市': [111.3720,35.6191],     '呼和浩特市': [111.4124,40.4901],'葫芦岛市': [120.1575,40.578],  '湖州市': [119.8608,30.7782],'怀化市': [109.9985,27.5550],
'淮安市': [118.927,33.4039],      '黄骅市': [117.3300,38.3714],  '惠州市': [114.6204,23.1647],  '济南市': [117.1582,36.8701],   '济宁市': [116.8286,35.3375],
'嘉兴市': [120.9155,30.6354],     '江门市': [112.6318,22.1484],  '焦作市': [113.2418,35.2159],  '金华市': [120.0037,29.1028],   '九江市': [116.0019,29.7051],
'九龙红磡市': [114.1870,22.3076], '昆明市': [102.9199,25.4663],  '拉萨市': [91.1865,30.1465],   '莱芜市': [117.6526,36.2714],   '兰州市': [103.5901,36.3043],
'廊坊市': [116.521,39.0509],      '黎塘市': [109.1363,23.2066],  '丽水市': [119.5642,28.1854],  '连云港市': [119.1248,34.552],  '聊城市': [115.9167,36.4032],
'临汾市': [111.4783,36.1615],     '临沂市': [118.3118,35.2936],  '柳州市': [109.3799,24.9774],  '龙口市': [120.4778,37.6461],   '洛阳市': [112.4540,34.6197],
'满洲里市': [117.3787,49.5978],   '南昌市': [116.0046,28.6633],  '南京市': [118.8062,31.9208],  '南宁市': [108.479,23.1152],    '南通市': [121.1023,32.1625],
'南阳市': [112.5283,32.9908],     '宁波市': [121.5440,29.8683],  '盘锦市': [121.9482,41.0449],  '启东市': [121.6574,31.8082],   '秦皇岛市': [119.2126,40.0232],
'青岛市': [120.3826,36.0671],     '清远市': [112.9175,24.3292],  '衢州市': [118.6853,28.8666],  '泉州市': [118.3228,25.1147],   '日照市': [119.2786,35.5023],
'厦门市': [118.1689,24.6478],     '汕头市': [117.1692,23.3405],  '上海市': [121.4648,31.2891],  '韶关市': [113.7964,24.7028],
'绍兴市': [120.564,29.7565],'深圳市': [114.0579,22.5431],'神木市': [110.4871,38.8610],'沈阳市': [123.1238,42.1216],
'石家庄市': [114.4995,38.1006],'苏州市': [120.6519,31.3989],'台前市': [115.8717,35.9701],'台州市': [121.1353,28.6688],
'太原市': [112.5489,37.8706],'泰安市': [117.0264,36.0516],'泰州市': [120.0586,32.5525],'汤阴市': [114.3572,35.9218],
'唐山市': [118.4766,39.6826],'天津市': [117.2010,39.0842],'铜川市': [109.0393,35.1947],'铜陵市': [117.8121,30.9454],
'瓦塘市': [109.7600,23.3161],'威海市': [121.9482,37.1393],'潍坊市': [119.0918,36.524],'渭南市': [109.7864,35.0299],
'温州市': [120.498,27.8119],'乌鲁木齐市': [87.9236,43.5883],'无锡市': [120.3442,31.5527],'武汉市': [114.3054,30.5931],
'西安市': [109.1162,34.2004],'西宁市': [101.4038,36.8207],'咸阳市': [108.4131,34.8706],'湘潭市': [112.5439,27.7075],
'新乡市': [113.9268,35.3030],'信阳市': [114.0913,32.1470],'邢台市': [114.8071,37.2821],'宿迁市': [118.5535,33.7775],
'徐州市': [117.5208,34.3268],'烟台市': [120.7397,37.5128],'延安市': [109.1052,36.4252],'盐城市': [120.2234,33.5577],
'兖州市': [116.7838,35.5531],'扬州市': [119.4653,32.8162],'阳泉市': [113.4778,38.0951],'银川市': [106.3586,38.1775],
'营口市': [122.4316,40.4297],'玉溪市': [101.9312,23.8898],'月山市': [113.0550,35.2104],'枣庄市': [117.323,34.8926],
'湛江市': [110.3594,21.2707],'张家口市': [115.1477,40.8527],'长春市': [125.8154,44.2584],'长沙市': [113.0823,28.2568],
'长治市': [113.1163,36.1954],'肇庆市': [112.1265,23.5822],'镇江市': [119.4763,31.9702],'郑州市': [113.4668,34.6234],
'中山市': [113.4229,22.478],'重庆市': [107.7539,30.1904],'舟山市': [122.2559,30.2234],'珠海市': [113.7305,22.1155],
'株洲市': [113.5327,27.0319],'淄博市': [118.0371,36.6064]
                    },
            markLine : {
                smooth:true,
                effect : {
                    show: true,
                    scaleSize: 2,
                    period: 10,
                    color: '#ffffff',
                    shadowBlur: 10
                },
                itemStyle : {
                    normal: {
                        borderColor:'#ffd52f',
                        borderWidth:2,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 20
                        },
                        color:'#fff'
                    }
                },
                data : [
			 /* [{name:'北京市'}, {name:'上海市',value:950}],
                    [{name:'广州市'}, {name:'上海市',value:800}],
                    [{name:'拉萨市'}, {name:'上海市',value:400}],
                    [{name:'包头市'}, {name:'济南市',value:300}],
                    [{name:'常州市'}, {name:'济南市',value:10000}]*/
                ]
            }
        },
                {
                    name: '操作',
                    type: 'map',
                    mapType: 'china',
                    data:[],
                    markPoint : {
                        symbol:'emptyCircle',
                        symbolSize : function (v){
                            return 10 + v/100
                        },
                        effect : {
                            show: true,
                            shadowBlur : 0
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : [
                            /*{name:'廊坊市', value: 10},
                            {name:'菏泽市', value: 20},
                            {name:'合肥市', value: 30},
                            {name:'武汉市', value: 40},
                            {name:'长沙市', value: 50},
                            {name:'东莞市', value: 60},
                            {name:'河源市', value: 70},
                            {name:'淮安市', value: 80},
                            {name:'泰州市', value: 90},
                            {name:'南宁市', value: 100},
                            {name:'营口市', value: 110},
                            {name:'唐山市', value: 120},
                            {name:'银川市', value: 130}*/
                        ]
                    }
                }
            ]
        };

        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);
	
        //拉取会员
        $.ajax({
            type: "post",
            async: true,
            url: URI+"ip-location/init-register.html",
            dataType: "json", //返回数据形式为json
            success: function (result) {
                if (result) {
                    option.series[0].markPoint.data = result;
                    myChart.setOption(option);
                }
            }
        });

        //与百度同步坐标
        $.ajax({
            type: "GET",
            async: true,
            url: URI+"ip-location/register-location.html",
            dataType: "json", //返回数据形式为json
            success: function (result) {
            }
        });


        function clearData(Dindex,Dname){
            var nowdata = myChart.getSeries();
                nowdata = nowdata[Dindex];
                nowdata = nowdata[Dname].data;

            if(Dname == 'markPoint'){
                for(var i = 0, len = nowdata.length;i < len; i++){
                    myChart.delMarkPoint(Dindex,nowdata[i].name);
                }
            }else if (Dname == 'markLine'){
                for(var i = 0, len = nowdata.length;i < len; i++){
                    myChart.delMarkLine(Dindex,nowdata[i][0].name + ' > ' +nowdata[i][1].name);
                }
            }
        }
        function getData(Dindex,Dname){
            var nowdata = myChart.getSeries();
                nowdata = nowdata[Dindex];
                nowdata = nowdata[Dname].data;
            return nowdata;
        }

        var timeTicket = setInterval(function (){
            //通过Ajax获取数据
            $.ajax({
                type: "post",
                async: true,
                url: URI+"ip-location/location.html?delay="+delay,
                dataType: "json", //返回数据形式为json
                success: function (result) {
                    if (result) {
                        //if(result.markLine.length>0){
                            //更新线
                            clearData(1,'markLine');
                            
                            var lineData = result.markLine;

                            var len = Math.floor(Math.random()*4)+1;
                            while(len--) {
                                var ct1 = placeList2[Math.floor(Math.random()*20)], ct2 = placeList2[Math.floor(Math.random()*20)];
                                lineData.push([
                                    {name:ct1.name,geoCoord:[ct1.geoCoord[0], ct1.geoCoord[1]]},
                                    {name:ct2.name,value:Math.floor(Math.random()*10000)+100,geoCoord:[ct2.geoCoord[0], ct2.geoCoord[1]]}
                                ]);
                            }
                
                            myChart.addMarkLine(1,{data:lineData});
                            updateText();
                        //}
                        //if(result.markPoint.length>0){
                            //更新点
                            clearData(2,'markPoint');
                            
                            var pointData = result.markPoint;
                            var len = Math.floor(Math.random()*10)+3;
                            var geoCoord,nowid;
                            while(len--) {
                                //nowid = len % placeList.length;
                                nowid = Math.floor(Math.random()*190);
                                geoCoord = placeList[nowid].geoCoord;
                                pointData.push({
                                    name:placeList[nowid].name,
                                    value:Math.floor(Math.random()*100)+1,
                                    geoCoord:[geoCoord[0], geoCoord[1]]
                                });
                            }
                            
                            myChart.addMarkPoint(2,{data:pointData});
                        //}
                    }
                }
            });
            
        }, 10000);

        /**/
        

        /**/
        var t = '<li>【播报】 位于 {b} 的宝象会员 将 <em>&yen;{c}</em>元 投资到 {d}</li>';
        function updateText(){
            var markLine = getData(1,'markLine'),
                ml = [];
            for(var i=0,len=markLine.length;i<len;i++){
                var newstr = t.replace('{b}',markLine[i][0]['name']);
                newstr = newstr.replace('{c}',markLine[i][1]['value']);
                newstr = newstr.replace('{d}',markLine[i][1]['name']);
                ml.push(newstr);
            }
            $('#text').html(ml.join('') + ml.join(''));
        }
        

    })(echarts);


    //投资记录
    $(".messageInfo").Slide({
        effect: "scroolTxt",
        speed: "normal",
        timer: 1600,
        steps: 1
    });

    (function(){
        
        
        function tohtml(_num,_t){
            var arr = [],
            //num = commafy(_num);
            num = _num.toString();
            for(var i=0,len=num.length;i<len;i++){
                if(num[i] == ',' || num[i] == '.' || num[i] == '-' || num[i] == ':'){
                    arr.push('<span class="sign">'+num[i]+'</span>');
                }else{
                    arr.push('<span class="num'+num[i]+'"></span>');
                }
            }
            if(_t){
                $('#today_num').html(arr.join('')).attr('data',_num);
            }else{
                $('#today_data').html(arr.join('')).attr('data',_num);
            }
        }
        
        
        
        function updatehtml(num){
            var today_num = $('#today_num').attr('data'),
                mumDom = $('#today_num span'),
                //html_num = commafy(num);
                html_num = num.toString();
            if(html_num.length - mumDom.length != 0){
                var spans = [],spanl = html_num.length - mumDom.length;
                for(var s=0;s<spanl;s++){
                    spans.push('<span></span>');
                }
                $('#today_num').prepend(spans.join(''));
                mumDom = $('#today_num span');
            }
                
            var time = 100;
            
            if(parseFloat(today_num) < parseFloat(num)){
                for(var j = 0,i=html_num.length-1;j<=i;i--){
                    if(html_num[i] == ',' || html_num[i] == '.' || html_num[i] == '-' || html_num[i] == ':'){
                        mumDom[i].className='sign';
                        continue;
                    }else{
                        //console.log(mumDom[i]);
                        mumDom[i].className = 'num' + html_num[i];
                        //mumDom[i].innerHTML = html_num[i];
                    }
                    /*
                    var tmp = parseInt(mumDom[i].innerHTML);
                    time = 100;
                    for(var k=0;k<21;k++){
                        tmp = tmp < 9 ? tmp + 1 : 0;
                        //mumDom[j].innerHTML = tmp;
                        
                        (function(){
                            var y = i,v = tmp;
                            time = time + 60;
                            setTimeout(function(){
                                 mumDom[y].innerHTML = v;
                            },time);
                        })();
                        
                        if(k>5 && tmp == html_num[i]){
                            break;
                        }
                    }
                    */
                }
            }
            //$('#today_num').html(html_num.join('')).attr('data',num);
        }
        
        
        setInterval(function(){
            var myDate = new Date(),myDay = myDate.getFullYear()+'-'+ (myDate.getMonth() + 1) +'-'+myDate.getDate();
            var aaa = localStorage[myDay] ? parseInt(localStorage[myDay]) : 0;
            
            if($('#today_data').attr('data') == myDay){
                aaa = aaa + (Math.floor(Math.random()*10)+1);
                localStorage[myDay] = aaa;
                updatehtml(aaa);
            }else{
                tohtml(myDay,false);
                tohtml(aaa,true);
            }
        },10000);
        
        
        function commafy(_num) {
            var num = parseFloat(_num);
            return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
        
        setTimeout(function(){
            location.reload();
        },28800000);
        
    })();

})();