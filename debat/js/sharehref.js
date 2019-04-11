var userType="";
var userId="";
$(function(){
	userType=localStorage.getItem("userType");
	userId=localStorage.getItem("userId");
	linkList();
});

function linkList(){
	var index=layer.open({
    type: 2
    ,content: '加载中'
  });
	jQuery.ajax(getRemoteUrl + 'userinfo/getshortUrl?userId='+userId, {
					dataType: 'json', //服务器返回json格式数据 
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						layer.close(index);
						$(".linkList").html(str);
    				    if(data.errorCode==0){
    				    	var copyurl="";
    				    	if(data.result.length>0){
    				    		$(".copybtn").css("background","#5461EB");
    				    		$(".nodata").css("display","none");
    				    		var str="";
	    				    	for(var i=0;i<data.result.length;i++){
	    				    		str+='<li class="mui-table-view-cell">';
	    				    		str+='<p style="color:#000;font-size:16px;line-height:30px;">'+data.result[i].name+'</p>';
	    				    		str+='<p>'+data.result[i].url+'</p>';
	    				    		str+='</li>';
	    				    		copyurl+=data.result[i].name+":"+data.result[i].url;
	    				    	}
    				    		$(".linkList").html(str);
    				    		$("#link").val(copyurl);
    				    	}else{
    				    		$(".copybtn").css("background","#ccc");
    				    		$("#link").val("");
    				    		$(".nodata").css("display","block");
    				    	}
    				    	
    				    }
					},
					error: function(xhr, type, errorThrown) {
						layer.close(index);
						tipmsg("请求出错，请稍后重试");
					}
				});
}
 // 实现一键复制链接到手机剪切板的功能
       function copyShareUrl(){
       	if($(".linkList li").length<1){
       		return false; 
       	}
			mui.plusReady(function(){
			var copy_content = document.getElementById("link").value;
			console.log(copy_content);
			//判断设备是android还是ios
			if(mui.os.ios){ //ios
				var UIPasteboard = plus.ios.importClass("UIPasteboard");
			    var generalPasteboard = UIPasteboard.generalPasteboard();
			    //设置/获取文本内容:
			    generalPasteboard.plusCallMethod({
			        setValue:copy_content,
			        forPasteboardType: "public.utf8-plain-text"
			    });
			    generalPasteboard.plusCallMethod({
			        valueForPasteboardType: "public.utf8-plain-text"
			    });
				mui.toast("复制链接成功");  //自动消失提示框
			}else{  //android
				var context = plus.android.importClass("android.content.Context");
			  	var main = plus.android.runtimeMainActivity();
			  	var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
			  	plus.android.invoke(clip,"setText",copy_content);
				mui.toast("复制链接成功");  //自动消失提示框
			}
			});
		}

