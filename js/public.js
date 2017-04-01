/*获取服务器时间*/
function getServerTime(){
    var xmlHttp = false;
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            xmlHttp = false;
        }
    }

    if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
    }

    xmlHttp.open("GET", window.location.href.toString(), false);
    xmlHttp.setRequestHeader("Range", "bytes=-1");
    xmlHttp.send(null);

    var severtime=new Date(xmlHttp.getResponseHeader("Date"));
    return severtime
}