var productId="";
var proUrl="";//产品链接
var phoneNumber="";
var urll="";
$(function(){
	localStorage.removeItem("url");
	localStorage.removeItem("proName");
	productId=localStorage.getItem("productId");
	proUrl=window.location.href;//产品链接
	phoneNumber=localStorage.getItem("userphone");
	urll=getUrl+"qyr/detail.html?prodId="+Base64.encode(productId)+"&name="+Base64.encode(phoneNumber);
	$("#qrcode").qrcode({
					 	text: urll,//产品详情页地址
				        width: 150,
				        height: 150,
				        colorDark : '#000000', //前景色
				        colorLight : '#ffffff'  //背景色
 						});
	 $("#applySubmit").on("click",function(){
	 	/*layer.open({
			  anim: 'up',
			  content: ['<span style="font-size:14px;">请输入手机号码</span><br /><input id="phone" type="text" style="margin-top:10px;height:30px;line-height:30px;width:90%;border-radius:5px">'],
			  btn: ['确定', '取消'],
			  yes:function(index){
			  	save();
			  	layer.close(index);
			  }
		});*/
		window.location.href="link.html";//第三方链接页面
	 });
	 detail();
});
//点击申请保存申请人用户信息
function save(){
		var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	var phone= $("#phone").val().trim();
	/*if(phone==""){
		tipmsg("手机号码不能为空！");
			return false;
			  layer.open(index)
	}
	if (!reg_phnoe.test(phone)) {
			tipmsg("请输入正确的手机号！");
			return false;
			  layer.open(index)
		}*/
		jQuery.ajax(getRemoteUrl + 'share/save', {
			data:{
				"url":proUrl,
				"prodId":productId,
				"shareUserPhone":localStorage.getItem("userphone"),
				"userPhone":phone
			},
			dataType: 'json', //服务器返回json格式数据 
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				layer.close(index);
				if(data.errorCode==0){
					tipmsg("申请成功！");
					setTimeout(function(){
						window.location.href="link.html";
					},500);
				}
			},
			error: function(xhr, type, errorThrown) {
				layer.close(index);
				tipmsg("请求出错，请稍后重试");
			}
		});
}

function detail(){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
		jQuery.ajax(getRemoteUrl + 'prod/info/detail?prodId='+productId, {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					contentType:"application/json",
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						if(data.errorCode==0){
							localStorage.setItem("url",data.result.linkUrl);//产品的第三方链接
							localStorage.setItem("proName",data.result.productionName);
							$("#sharecontent").val(urll);
							//$("#sharecontent").val("http://127.0.0.1:8020/debat/detail.html?prodId="+productId+"name="+phoneNumber);
							$("#proname").val(data.result.productionName);
							$("#protitle").val(data.result.productionTitle);
							$(".topsub > img").attr("src",getRemoteUrl+data.result.productionImage);
							$(".productName,.productionName").text(data.result.productionName);
							$(".productionTitle").text(data.result.productionTitle);
							/*$(".productionSubTitle").text(data.result.productionSubTitle);
							$(".productionKey").text(data.result.productionKey);*/
							/*$(".isHot").text(data.result.isHot==0?"热销产品":"热销产品");*/
							$(".productName").text(data.result.productionName)
							$(".productionDesc").html(data.result.productionDesc);
							$(".maxmun").text(data.result.productionQuota);
							$(".rate").text(data.result.productionRate);
							$(".term").text(data.result.productionTimelimit);
							viewcount();//统计浏览数接口
							
						}
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
//浏览数
function viewcount(){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
		jQuery.ajax(getRemoteUrl + 'view/save', {
					data:{
						"url":proUrl,
						"prodId":productId,
						"shareUserId":phoneNumber,
					},
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
