window.onload = function () {
    $(function(){
    //masonry plugin call
        $("#container").masonry({
	    itemSelector:".item",
    });
				
	//timeline_container add mousemove event
	$(".timeline_container").mousemove(function(e){
		var topdiv = $("#containertop").height();
		var page = e.pageY - topdiv - 26;
		$(".plus").css({
			"top": page + "px",
			"background":"url('#')",
			"margin-left": "1px"
		});
	}).mouseout(function(){
		$(".plus").css({
			"background":"url('')"
		});
	});
				
	//injecting arrow points
	function Arrow_Points(){
		var s = $("#container").find(".item");
		$.each(s,function(i,obj){
			var posLeft = $(obj).css("left");
			if(posLeft == "0px"){
				html = "<span class='rightCorner'></span>";
				$(obj).prepend(html);
			}
			else {
				html = "<span class='leftCorner'></span>";
				$(obj).prepend(html);
			}
		});
	}
	
	Arrow_Points();
	    //delete item box
	    $(".deletebox").live("click",function(){
	    	if(confirm("Are you sure?")){
	    		$(this).parent().fadeOut("slow");
	    		//remove item block
	    		$("#container").masonry("remove",$(this).parent());
	    		//remove masonry plugin
	    		$("#container").masonry("reload");
	    		//Hiding existing arrows
	    		$(".rightCorner").hide();
	    		$(".leftCorner").hide();
	    		//injecting fresh arrow
	            Arrow_Points();
	    }
	return false;
	});
				
	//Timeline navigator on click action
	$(".timeline_container").click(function(e){
		var topdiv = $("#containertop").height();
		//Current Postion
		$("#popup").css({
			"top": (e.pageY - topdiv - 33) + "px"
		});
		$("#popup").fadeIn();//Popup block show
		//textbox focus
		$("#update").focus();
	});			
	    //Mouseover no action
	    $("#popup").mouseup(function(){
	return false;
	});
				
	//outside action of the popup block
	$(document).mouseup(function(){
		$("#popup").hide();
	});
				
	//update button action
	$("#update_button").live("click",function(){
		//textbox value
		var x = $("#update").val();				
		//ajax part
		$("#container").prepend('<div class="item"><a href="#" class="deletebox">X</a>' + '<div class="inner">' + x + '</div></div>');
		//reload masnory
		$("#container").masonry("reload");
		//Hiding existing arrows
		$(".rightCorner").hide();
		$(".leftCorner").hide();
		//injecting fresh arrows
		Arrow_Points();
		//clear popup text box value
		$("#update").val("");
		//popup hide
		$("#popup").hide();
	    return false;
	    });
	});	
};