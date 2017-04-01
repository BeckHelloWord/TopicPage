/**
 * Created by liuhan on 2016/7/6.
 */

(function(){
    // 获取日期
    var time = document.getElementById("time"),msg = "";
    var today = new Date();

    var y = today.getFullYear(),
        m = today.getMonth() + 1,
        d = today.getDate();

    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    msg = y + "-" + m + "-" + d;

    time.innerHTML = msg;
}());

(function(){
    var URI= 'https://g.bxwd.cc/';

    function tohtml(_num){
        var num = _num.toString(),
            arr = num.replace(/(.)(?=[^$])/g,"$1,").split(",");

        if($('#today_num .num_visit').length == 0 || $('#today_num .num_visit').length != num.length){
            $('#today_num').html(createDemo(arr));
        }

        for(var i = 0, len = arr.length; i < len; i ++){
            var position = -(parseInt(arr[i])) * 120;
            $("#today_num .num_visit").eq(i).animate({marginTop: position});
        }
    }

    function createDemo(arr){
        var html = "";
        for(var i = 0; i < arr.length; i ++){
            if(arr[i] == "."){
                html += "<div class='num_visit comma'>";
                html += "<div>,</div>";
            }else{
                html += "<div class='num_visit'>";
                for(var j = 0; j < 10; j ++){
                    html += "<span>" + j + "</span>";
                }
            }


            html += "</div>";
        }

        return html;
    }

    tohtml("1.763.236.388");

    setInterval(function(){
        $.ajax({
            type: "GET",
            async: true,
            url: URI+"ip-location/statistic",
            dataType: "json", //返回数据形式为json
            success: function (json) {
                tohtml(addComma(json.number));
            }
        });
    },10000);

    function addComma(str){
        const resultArr = [],arr = str.split("").reverse();

        for(var i = 0, len = arr.length; i < len; i++){
            resultArr.push(arr[i]);

            if(i % 3 == 2){
                resultArr.push(".");
            }
        }

        return resultArr.reverse().join("");
    }

    setTimeout(function(){
        location.reload();
    },28800000);
})();
