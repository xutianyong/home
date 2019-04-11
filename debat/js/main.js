var count=0;
$(function(){
	localStorage.removeItem("productId");
	//广告列表链接
	$(document).on("click","#imgList .mui-slider-item",function(){
		var phone=localStorage.getItem("phone");
		var pwd=localStorage.getItem("pwd");
		if(phone=="" || pwd==""){
			window.location.href="login.html";
			return false;
		}else if(phone==null || pwd==null){
			window.location.href="login.html";
			return false;
		}else{ 
			
		}
		var this_url=$(this).attr("data-url");
		if(this_url!="" && this_url!= null && this_url!= undefined && this_url!='null'){
			var proname=$(this).attr("proname");
			localStorage.setItem("url",this_url);
			localStorage.setItem("proName",proname);
		
			window.location.href="link.html";
		}
		
	});
	//申请
	$(document).on("click",".applybtn",function(event){
		event.stopPropagation(); 
		var phone=localStorage.getItem("phone");
		var pwd=localStorage.getItem("pwd");
		if(phone=="" || pwd==""){
			window.location.href="login.html";
			return false;
		}else if(phone==null || pwd==null){
			window.location.href="login.html";
			return false;
		}else{ 
			
		}
		
		var this_url=$(this).attr("applyUrl");
		var proname=$(this).attr("proname");
		localStorage.setItem("url",this_url);//产品的第三方链接
		localStorage.setItem("proName",proname);
		setTimeout(function(){
			window.location.href="link.html";
		},500);
	});
	//贷款列表
	$(document).on("click",".allList li,.TypeList li",function(){
		localStorage.removeItem("productId");
		var phone=localStorage.getItem("phone");
		var pwd=localStorage.getItem("pwd");
		if(phone=="" || pwd==""){
			window.location.href="login.html";
			return false;
		}else if(phone==null || pwd==null){
			//alert("未登录，请先登录！");
			window.location.href="login.html";
			return false;
		}else{
			
			if(count==0){
				loginp(phone,pwd);
			}
		}
		var proId=$(this).attr("idx");
		var this_url=$(this).attr("data-url");
		localStorage.setItem("productId",proId); 
		setTimeout(function(){
			window.location.href=this_url;//第三方链接页面
			
		},500);
		
	});
	/*$(".shouye").on("click",function(){
		$("body").css("background","#FFFFFF");
	});*/
	$(".myset").on("tap",function(){
		var phone=localStorage.getItem("phone");
		var pwd=localStorage.getItem("pwd");
		var userType=localStorage.getItem("userType");
		if(phone=="" || pwd==""){
			window.location.href="login.html";
			return false;
		}else if(phone==null || pwd==null){
			window.location.href="login.html";
			return false;
		}else{ 
			if(userType==2){
				$(".batchshare").css("display","none");
			}else{
				$(".batchshare").css("display","block");
			}
			$(".tt").text(phone);
		}
		
	});
	//贷款列表加载
	$(document).on("tap",".debatemenu",function(){
		productList();
	});
	//退出
	$(".logout").on("tap",function(){
		localStorage.clear();
		setTimeout(function(){
			window.location.href="login.html";
		},500);
	});
	//根据类型查询数据
	$(document).on("click",".menuList li .eag",function(){
		var typeId=$(this).attr("data-id");
		getTypeByList(typeId);
	});
	imgList();
	getTypeList();
	
});
//获取类型数据
function getTypeList(){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	jQuery.ajax(getRemoteUrl + 'prod/type/index', {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						$(".menuList li").html("");
    				    if(data.errorCode==0){
    				    	var str="";
    				    	for(var i=0;i<data.result.length;i++){
    				    		var temp=data.result[i];
								str+='<div class="eag" data-id="'+temp.id+'">';
								if(temp.typeImage=="" || temp.typeImage==null || temp.typeImage=='null' || temp.typeImage==undefined){
									//str+='<span class="iconfont icon-xiazai" style="background: #F77177;"></span>';
									str+='<img src="img/thumb.png">'
								}else{
									str+='<img src="'+getRemoteUrl+temp.typeImage+'">';
									
								}								
								str+='<p >'+temp.typeName+'</p>';
								str+='</div>'
    				    	}
    				    	$(".menuList li").html(str);
    				    	
    				    }
    				    getTypeByList(0);
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
//根据类型查询数据
function getTypeByList(id){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	jQuery.ajax(getRemoteUrl + 'prod/info/indexlist?type='+id, {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						$(".TypeList").html("");
    				    if(data.errorCode==0){
    				    	var str="";
    				    	for(var i=0;i<data.result.length;i++){
    				    		var temp=data.result[i];
    				    		str+='<li class="mui-table-view-cell" idx="'+temp.id+'" data-url="productInfo.html?productId='+temp.id+'"><div class="setImg">';//mui-navigate-right
								str+='<img src="'+getRemoteUrl+temp.productionImage+'">';
								str+='<div class="tb-fr">';
								str+='<div class="line-1">';
								str+='<div style="display:inline-block;width:calc(100% - 52px);"><p class="proname">'+temp.productionName+'</p><p class="line-2" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+temp.productionTitle+'</p></div>';
								str+='<div style="cursor: pointer;width:52px;display:inline-block;float:right;font-size:16px;color:#fff;background:#5461EB;padding:5px 10px;border-radius:5px;" proname="'+temp.productionName+'" applyUrl="'+temp.linkUrl+'" class="applybtn">申请</div>';
								//str+='<div class="proname">'+temp.productionName+'</div>';
								//str+='<div class="line-2">'+temp.productionTitle+'</div>';
								str+='<div class="line-3">';
								str+='<ul>';
								str+='<li class="highquato"><p>最高额度</p><p class="maxmun">'+temp.productionQuota+'</p></li>';
								str+='';
								str+='<li class="feerate"><p>日费率</p><p class="rate">'+temp.productionRate+'</p></li>';
								str+='<li class="limit"><p>借款期限</p><p class="term">'+temp.productionTimelimit+'</p></li>';
								str+='</ul></div></div></div></li>';
    				    	}
    				    	$(".TypeList").html(str);
    				    }
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
//贷款列表
function productList(){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	jQuery.ajax(getRemoteUrl + 'prod/info/list', {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						$(".allList").html("");
    				    if(data.errorCode==0){
    				    	var str="";
    				    	for(var i=0;i<data.result.length;i++){
    				    		var temp=data.result[i];
    				    		str+='<li class="mui-table-view-cell" idx="'+temp.id+'" data-url="productInfo.html?productId='+temp.id+'"><div class="setImg">';//mui-navigate-right
								str+='<img src="'+getRemoteUrl+temp.productionImage+'">';
								str+='<div class="tb-fr">';
								str+='<div class="line-1">';
								str+='<div style="display:inline-block;width:calc(100% - 52px);"><p class="proname">'+temp.productionName+'</p><p class="line-2" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+temp.productionTitle+'</p></div>';
								str+='<div style="width:52px;display:inline-block;float:right;font-size:16px;color:#fff;background:#5461EB;padding:5px 10px;border-radius:5px;" proname="'+temp.productionName+'" applyUrl="'+temp.linkUrl+'" class="applybtn">申请</div>';
								//str+='<div class="proname">'+temp.productionName+'</div>';
								//str+='<div class="line-2">'+temp.productionTitle+'</div>';
								str+='<div class="line-3">';
								str+='<ul>';
								str+='<li class="highquato"><p>最高额度</p><p class="maxmun">'+temp.productionQuota+'</p></li>';
								str+='';
								str+='<li class="feerate"><p>日费率</p><p class="rate">'+temp.productionRate+'</p></li>';
								str+='<li class="limit"><p>借款期限</p><p class="term">'+temp.productionTimelimit+'</p></li>';
								str+='</ul></div></div></div></li>';
    				    	}
    				    	$(".allList").html(str);
    				    }
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
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
					count++;
					//tipmsg("登录成功！");
					localStorage.setItem("userId", result.result.id);
					localStorage.setItem("userType", result.result.userType);
					localStorage.setItem("userphone", result.result.userPhone);
					localStorage.setItem("phone",phone);
					localStorage.setItem("pwd",pwd);
					//window.location.href = "main.html";
				}else{
					tipmsg(result.errorMsg);
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}
//我的产品链接
function shareherf(){
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
					count++;
					//tipmsg("登录成功！");
					localStorage.setItem("userphone", result.result.userPhone);
					localStorage.setItem("phone",phone);
					localStorage.setItem("pwd",pwd);
					//window.location.href = "main.html";
				}else{
					tipmsg(result.errorMsg);
				}
			},
			error: function(xhr, type, errorThrown) {
				tipmsg("请求出错，请稍后重试");
			}
		});
}
//大屏广告列表
function imgList(){
		var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	jQuery.ajax({
			url: getRemoteUrl + 'advs/list',
			dataType: 'json', //服务器返回json格式数据 
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(result) {
				layer.close(index);
				if (result.errorCode == 0) {
					var str="";
					var indicator="";
					if(result.result.length > 0){//data:image/png;base64,
						str='<div class="mui-slider-item mui-slider-item-duplicate" proname="'+result.result[result.result.length-1].name+'" data-url="'+result.result[result.result.length-1].linkUrl+'"><img src="'+getRemoteUrl+result.result[result.result.length-1].image+'"></div>';
						for(var i=0;i<result.result.length;i++){
							str+='<div class="mui-slider-item" proname="'+result.result[i].name+'" data-url="'+result.result[i].linkUrl+'"><img src="'+getRemoteUrl+result.result[i].image+'"></div>'
							if(i==0){
								indicator='<div class="mui-indicator mui-active"></div>';
							}else{
								indicator+='<div class="mui-indicator"></div>';
							}
						}
						str+='<div class="mui-slider-item mui-slider-item-duplicate" proname="'+result.result[0].name+'" data-url="'+result.result[0].linkUrl+'"><img src="'+getRemoteUrl+result.result[0].image+'"></div>';
					}
					
					$("#imgList").html(str);
					$("#imgindicator").html(indicator);
					var slider = mui("#slider");
				    slider.slider({
									interval: 5000
								});
				}
			},
			error: function(xhr, type, errorThrown) {
				layer.close(index);
				tipmsg("请求出错，请稍后重试");
			}
		});
}
