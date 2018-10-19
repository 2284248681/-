//点击头像控制注销按钮显示隐藏
var index = 0;
$("#headimg").on("click", function(){
	if (index%2 == 0) {
		$("#logout").css("display","block");
	}else {
		$("#logout").css("display","none");
	}
	index++;
});


//左菜单栏鼠标点击效果
$("#menu").on("click",function(event) {
	$(".m").each(function(i) {
		$(this).removeClass("menuhover");
	});
	event = event || window.event;
	var target = event.srcElement || event.target;
	$(target).addClass("menuhover");
});


//初始首页按钮状态
$("#firstpagebtn").addClass("menuhover");


//点击菜单栏不同按钮，显示不同的界面
var changeDisplay = function(selectorone, selectortwo, selectorthree){
	$(selectorone).on("click",function(){
		$(selectortwo).each(function(i) {
			$(this).css("display","none");
		});
		$(selectorthree).css("display","block");
	});
}

changeDisplay("#firstpagebtn", ".contentshadow", "#firstpage");
changeDisplay("#searchuserbtn", ".contentshadow", "#searchuser");
changeDisplay("#searchfoodbtn", ".contentshadow", "#searchfood");


//下拉菜单
$(".dropdown-menu").on("click",function(event){
	event = event || window.event;
	var target = event.target  || event.srcElement;
	$("#dropdownMenu1").val($(target).val());
	$("#dropdownMenu1").html($(target).text() + '&ensp;' + '<span class="caret"></span>');
});