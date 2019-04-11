$(function() {
	$(".agree").on("click", function() {
		layer.open({
			content: '我已同意协议',
			btn: '确定'
		});
	});
	$("#loginbtn").on("click", function() {
		
		var phone = $("#phoneNumber").val().trim();
		var pwd = $("#pwd").val().trim();

		if (phone == "") {
			tipmsg("手机号码不能为空！");
			return false;
		}
		if (!reg_phnoe.test(phone)) {
			tipmsg("手机号码不正确！");
			return false;
		}
		if (pwd == "") {
			tipmsg("密码不能为空！");
			return false;
		}
		/*if(pwd.length > 8){
			tipmsg("请输入长度不小于8位的密码！");
			return false;
		}*/
		/*if (verifycode.toLowerCase() !== $('.code').children('input').val().toLowerCase()) {
			tipmsg("验证码不正确！");
			return false;
		}*/
		var ck = $("input[type='checkbox']").prop("checked");
		if (!ck) {
			tipmsg("未同意协议！");
			return false;
		}
		loginp(phone,pwd);
	});
	/*setTimeout(function(){
		//ad();
	},1000);*/
	//alert(localStorage.getItem("pwd"));
});
/*function ad(){
	var ph=plus.storage.getItem("phone");
	var pw=plus.storage.getItem("pwd")
	  if(ph!=null && pw!=null){
			$("#phoneNumber").val(plus.storage.getItem("phone"));
			$("#pwd").val(plus.storage.getItem("pwd"));
			 loginp(ph,pw);
		}
	 
}*/
function loginp(phone,pwd){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
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
				layer.close(index);
				if (result.errorCode == 0) {
					tipmsg("登录成功！");
					localStorage.setItem("userId", result.result.id);
					localStorage.setItem("userType", result.result.userType);
					localStorage.setItem("userphone", result.result.userPhone);
					localStorage.setItem("phone",phone);
					localStorage.setItem("pwd",pwd);
					setTimeout(function(){
						window.location.href = "main.html";
					},500);
				}else{
					tipmsg(result.errorMsg);
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}

