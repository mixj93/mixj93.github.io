$(function(){
	$(".section-cont").each(function(i){
		var hueArr = ["red", "purple", "blue", "green"];
		var _this = $(this);
		var listLen = $(this).find(".section-list-item").length;
		if (listLen>0) {
			var colorArr = randomColor({hue: hueArr[i], luminosity: 'light', count: listLen});
			_this.find(".section-title").css("border-left-color", colorArr[0]);
			_this.find(".section-list-item").each(function(j){
				$(this).css("background-color", colorArr[j]);
			});
		}
	});
});