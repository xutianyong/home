//alert(1);
var urls="";//产品的第三方链接
var proUrl="";
//alert("proUrl="+proUrl);
var userphone="";
//alert(userphone);
var productId="";

$(function(){
	proUrl=window.location.href;
	userphone=Base64.decode(getQueryString("name"));
	productId=Base64.decode(getQueryString("prodId"));
/*	$("#qrcode").qrcode({
					 	text: proUrl,//产品详情页地址
				        width: 150,
				        height: 150,
				        colorDark : '#000000', //前景色
				        colorLight : '#ffffff'  //背景色
 						});*/
	 $("#applySubmit").on("click",function(){
	 	layer.open({
			  anim: 'up',
			  content: ['<span style="font-size:14px;">请输入手机号码</span><br /><input id="phone" type="text" style="margin-top:10px;height:30px;line-height:30px;width:90%;border-radius:5px">'],
			  btn: ['确定', '取消'],
			  yes:function(index){
			  	save();
			  	layer.close(index);
			  }
		});
	 });
	 detail();
});
//点击申请保存申请人用户信息
function save(){
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
				"shareUserPhone":userphone,
				"userPhone":phone
			},
			dataType: 'json', //服务器返回json格式数据 
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(data.errorCode==0){
					tipmsg("申请成功！");
					//window.location.href="detail.html?prodId"+productId;
					setTimeout(function(){
						window.location.href=urls;
					},500);
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
							urls=data.result.linkUrl;
							//$("#sharecontent").val(proUrl);
							$(".topsub > img").attr("src",data.result.productionImage);
							$(".productName,.productionName").text(data.result.productionName);
							$(".productionTitle").text(data.result.productionTitle);
							//$(".productionSubTitle").text(data.result.productionSubTitle);
							/*$(".productionSubTitle").text(data.result.productionSubTitle);
							$(".productionKey").text(data.result.productionKey);*/
							//$(".isHot").text(data.result.isHot==0?"热销产品":"热销产品");
							$(".productName").text(data.result.productionName)
							$(".productionDesc").html(data.result.productionDesc);
							$(".maxmun").text(data.result.productionQuota);
							$(".rate").text(data.result.productionRate);
							$(".term").text(data.result.productionTimelimit);
							viewcount();//统计浏览数接口
							
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
						"shareUserId":userphone
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
