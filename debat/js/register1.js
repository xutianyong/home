
$(function() {
	is_weixn();
   /*$('.code').createCode({
  		len:4
	});*/
	/*$(".agree").on("click", function() {
		layer.open({
			content: '我已同意协议',
			btn: '确定'
		});
	});*/
	$("#registerbtn").on("click", function() {
		
		var phone = $("#phoneNumber").val().trim();
		var pwd="123456";
		/*var pwd = $("#pwd").val().trim();
		var verifycode=$("#verifycode").val().trim();*/
		if (phone == "") {
			tipmsg("手机号码不能为空！");
			return false;
		}
		if (!reg_phnoe.test(phone)) {
			tipmsg("手机号码不正确！");
			return false;
		}
		/*if (pwd == "") {
			tipmsg("密码不能为空！");
			return false;
		}*/
		/*if(pwd.length > 8){
			tipmsg("请输入长度不小于8位的密码！");
			return false;
		}*/
		/*if (verifycode.toLowerCase() !== $('.code').children('input').val().toLowerCase()) {
			tipmsg("验证码不正确！");
			return false;
		}
		var ck = $("input[type='checkbox']").prop("checked");
		if (!ck) {
			tipmsg("未同意协议！");
			return false;
		}*/
		loginp(phone,pwd);
	});
});
function loginp(phone,pwd){
		jQuery.ajax({
			url: getRemoteUrl + 'userinfo/login',
			data: {
				"userPhone":phone,
				"passWord": pwd
			},
			dataType: 'json', //服务器返回json格式数据 
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(result) {
				if (result.errorCode == 0) {
					tipmsg("注册成功！");
					setTimeout(function(){
						window.location.href="http://www.ryjbb.com/apk/qyr.apk";
					},1000);
				}else{
					tipmsg(result.errorMsg);
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}
 function is_weixn(){  
        var ua = navigator.userAgent.toLowerCase();  
        if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        	$(".tipbg").css("display","block");
            return false;  
        } else {  
        	$(".tipbg").css("display","none");
            return true;  
        }  
    }  

