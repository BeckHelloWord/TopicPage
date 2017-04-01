//这是一个js文件，放在主域名下
// 计算页面的实际高度，iframe自适应会用到
function calcPageHeight(doc) {
    var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
    var height = Math.max(cHeight, sHeight)
    return height+400;
}
window.onload = function () {
    var doc = document
    var height = calcPageHeight(doc)
    var myifr = doc.getElementById('myifr')
    if (myifr) {
        myifr.src = 'https://www.bxjr.com/topic/iframe/agent.html?height=' + height   
    }
};