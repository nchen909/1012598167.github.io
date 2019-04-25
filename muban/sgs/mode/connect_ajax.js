//创建XMLHttpResquest对象
var xmlHttp = new XMLHttpRequest();

//创建一个Http请求，（method,url,async)
xmlHttp.open('POST','connect.php','true');
xmlHttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
//发送Http请求
xmlHttp.send('fname='+node.innerHTML);

//当async为false时数据处理
// document.getElementById("mydiv").innerHTML=xmlhttp.responseText;

//异步时，没有得到服务器响应的情况下，防止代码停止的方法。 （同步不需要设置此方法
//当异步时，即async为ture时数据处理，接收到服务端响应时触发
xmlHttp.onreadystatechange=function () {
    if(xmlHttp.readyState==4&&xmlHttp.status==200){
        var msg = xmlHttp.responseText;
        console.log(msg);
        return msg;
        //alert(msg);
        // var divtag = document.getElementById('result');
        // divtag.innerHTML = msg;
    }else{
        //没有响应的代码
    }
}