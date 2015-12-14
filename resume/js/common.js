
/* =========================
	오은선 이력서 script 
	작성자 : 본인
========================== */

$(function(){
	function Donut(el){
		this.obj = null;
	};
	Donut.prototype.init = function(el, i){
		var that = this;
		this.obj = $("#" + el);
		this.speed = i;
		this.value = Math.round(this.obj.find(".value").html() * 10);
		this.circle = this.obj.find(".mask_r");
		this.cnt = 0;
		this.maxValue = Math.ceil(parseInt(this.value) * 3.6);
		this.interval = setInterval(function(){
			if(that.maxValue > 180){
				if(that.cnt < 180){
					that.cnt += that.speed;
				}else{
					that.cnt = 0;
					that.maxValue = that.maxValue - 180;
					that.circle = that.obj.find(".mask_l");
				}
			}else{
				if(that.cnt < that.maxValue){
					that.cnt += that.speed;
				}
			}
			that.circle.find("span").eq(0).css("transform","rotate(" + that.cnt + "deg)");
		},10);
	};
	var before = null;
	$(window).scroll(function(){
		var h = $(document).scrollTop();

		if( before == null){
			console.log(h)
			if( h >= 4450 ){
				before = 1;
				console.log(2)
				for( i =1; i<9; i++){
					new Donut().init("donut" + i, 5);
				};
				
			};
		};
	});


	//반응형 테이블
	var table = $(".jsCell")
		, th = $("thead th", table)
		, tr = $("tbody tr", table)
		, td = $("tbody td", table)

	table.each(function(){
		var ttr = $(this).find("tr")
			,tth = $(this).find("thead th")
		ttr.each(function(){
			for( var i =0; i< tth.size(); i++ ){
				var txt = tth.eq(i).text();
				$(this).find("td").eq(i).attr("data-cell-td", txt);
			}
		});
	});


});