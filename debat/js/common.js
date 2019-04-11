//var getRemoteUrl="http://172.171.48.120:8080/hd-api/";
//var getRemoteUrl="http://test.118114sz.com.cn:8090/hd-api/";
//var getUrl="http://test.118114sz.com.cn:8090/qyr/";
var getRemoteUrl="http://www.ryjbb.com/";
var getUrl="http://www.ryjbb.com/";
//var getRemoteUrl="http://m.xuyuhan.club:8999/hd-api/";
//var getUrl="http://m.xuyuhan.club:8999/hd-api/";
var reg_phnoe = /^1\d{10}$/;//验证手机号
//弹框函数
function tipmsg(msg){
	layer.open({
		    content: msg
		    ,skin: 'msg'
		    ,time: 2 //2秒后自动关闭
  		});
}
//返回函数  
function backTo() {
	$(".backbtn").attr("href", "javascript:void(0);");
	if(/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
		window.location.href = window.document.referrer;
	} else {
		window.history.go("-1");
		//		mui.back();
	}
}

