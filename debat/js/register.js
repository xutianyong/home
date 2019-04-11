var proUrl="";
var userphone="";
var productId="";
$(function() {
	userphone=Base64.decode(getQueryString("name"));
	productId=Base64.decode(getQueryString("prodId"));
	proUrl="productInfo.html?productId="+productId;
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
	viewcount();
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
					save(phone);
				}else{
					tipmsg(result.errorMsg);
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}
function save(phone){
		jQuery.ajax(getRemoteUrl + 'share/save', {
			data:{
				"url":proUrl,//产品链接
				"prodId":productId,//产品Id
				"shareUserPhone":userphone,//业务员手机号
				"userPhone":phone//客户手机号
			},
			dataType: 'json', //服务器返回json格式数据 
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(data.errorCode==0){
					/*tipmsg("申请成功！");*/
					detail();
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}
function detail(){
		jQuery.ajax(getRemoteUrl + 'prod/info/detail?prodId='+productId, {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					contentType:"application/json",
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						if(data.errorCode==0){
							setTimeout(function(){
								window.location.href=data.result.linkUrl;//产品的第三方链接
							},500);
						}
					},
					error: function(xhr, type, errorThrown) {
						tipmsg("请求出错，请稍后重试");
					}
				});
}
//浏览数
function viewcount(){
		jQuery.ajax(getRemoteUrl + 'view/save', {
					data:{
						"url":proUrl,
						"prodId":productId,
						"shareUserId":userphone,
					},
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						if(data.errorCode==0){
						}
					},
					error: function(xhr, type, errorThrown) {
						tipmsg("请求出错，请稍后重试");
					}
				});
}
function getQueryString(name)
		{
		    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if(r!=null && r[2]!="")
		        return  unescape(r[2]);
		    return null;
		}

