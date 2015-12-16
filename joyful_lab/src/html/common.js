
/* =========================
	@ 2015.02.25 PAGODA script.
	@ 작성자 O eunsun
========================== */
//mp3 미디어 플레이어 재생
function audio_mp3_call(a, b){
	var myPlayer = $(a),
		myPlayerData,
		fixFlash_mp4,
		fixFlash_mp4_id,
		ignore_timeupdate,
		set_datas,
		options = {
			ready: function (event) {
				if(event.jPlayer.status.noVolume) {
					$(".jp-gui").addClass("jp-no-volume");
				}
				//커스텀 추가
				set_datas = myPlayer.attr("data-player-url");
				//커스텀 끝

				fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
				$(this).jPlayer("setMedia", {
					mp3: set_datas//,
					//m4a: "abc.m4a",
					//oga: "abc.ogg"
				});
			},
			timeupdate: function(event) {
				if(!ignore_timeupdate) {
					myControl.progress.slider("value", event.jPlayer.status.currentPercentAbsolute);
				}
			},
			volumechange: function(event) {
				if(event.jPlayer.options.muted) {
					myControl.volume.slider("value", 0);
				} else {
					myControl.volume.slider("value", event.jPlayer.options.volume);
				}
			},
			swfPath: "../js",
			supplied: "mp3, m4a, oga",
			cssSelectorAncestor: b,
			wmode: "window",
			keyEnabled: true
		},
		myControl = {
			progress: $(options.cssSelectorAncestor + " .jp-progress-slider"),
			volume: $(options.cssSelectorAncestor + " .jp-volume-slider")
		};

	myPlayer.jPlayer(options);

	myPlayerData = myPlayer.data("jPlayer");

	$('.jp-gui ul li').hover(
		function() { $(this).addClass('ui-state-hover'); },
		function() { $(this).removeClass('ui-state-hover'); }
	);

	myControl.progress.slider({
		animate: "fast",
		max: 100,
		range: "min",
		step: 0.1,
		value : 0,
		slide: function(event, ui) {
			var sp = myPlayerData.status.seekPercent;
			if(sp > 0) {
				if(fixFlash_mp4) {
					ignore_timeupdate = true;
					clearTimeout(fixFlash_mp4_id);
					fixFlash_mp4_id = setTimeout(function() {
						ignore_timeupdate = false;
					},1000);
				}
				myPlayer.jPlayer("playHead", ui.value * (100 / sp));
			} else {
				setTimeout(function() {
					myControl.progress.slider("value", 0);
				}, 0);
			}
		}
	});
};

//테이블에서 TR별 미디어 플레이어 재생
var media_ctrl_table1 = {
	init : function(a){
		var that = this;
		this.obj = $(a);
		this.medialist = $(".jp_container", this.obj);
		this.playlist = $(".enabled_play", this.obj);
		this.pauselist = $(".enabled_pause", this.obj);
		this.disabled_playlist = $(".disabled_play", this.obj);
		this.disabled_download = $(".disabled_download", this.obj);
		this.beforelist = null;
		this.toggleSpeed = 200;

		var my_tr, next_tr, h;

		this.disabled_playlist.click(function(e){
			e.preventDefault();
		});
		this.playlist.click(function(e){
			my_tr = $(this).parents("tr");
			next_tr = my_tr.next();
			var thistr = $(this).parents("tr")
			$("tr.media_viewer").not(thistr).removeClass("open");
			var thistr = thistr.next("tr").addClass("open");
			if(my_tr.hasClass("media_on")){
				that.beforelist = next_tr;
				that.beforelist.find("li.jp-pause a.jp-pause").click();
			}else{
				if(that.beforelist != null){
					that.beforelist.find("li.jp-pause a.jp-pause").click();
					that.beforelist.removeClass("on").find(".media_wrapper").animate({"height" : 0}, that.toggleSpeed);
					that.beforelist.prev().removeClass("media_on");
					that.beforelist.prev().find(".enabled_play").removeClass("enabled_pause");
					that.beforelist = null;
				}
			}
			if(next_tr.hasClass("on")){
				h = 0;
				$(this).removeClass("enabled_pause");
				my_tr.removeClass("media_on");
				next_tr.removeClass("on");
			}else{
				h = 78;
				$(this).addClass("enabled_pause");
				my_tr.addClass("media_on");
				next_tr.addClass("on");
				next_tr.find("li.jp-play a.jp-play").click();
			}
			next_tr.find(".media_wrapper").animate({"height" : h + "px"}, that.toggleSpeed);
			that.beforelist = next_tr;
			return false;
		});
	}
}
$(function(){
	ES = {
		Conts : function(){
			//띠배너 (PC버전)
				var esmotion = {
					eslide : function(){
						var banner = $(".es-slide").size();
						
						for( var i=0; i< banner; i++ ){
							esSlide("#es-slider" + i);
						}
						function esSlide(proto){
							var visual  = proto;
							var sul = $(".es-slide-wrap > ul", visual);
							var li = $("> li", sul);
							var prev = $(".es-prev", visual);
							var next = $(".es-next", visual);
							var power = "off";
							var section = $("section").width();

							li.addClass("loaded");

							function resizing(){
								section = $("section").width();
								sul.css("width",  section * li.size() + "px");
								li.css("width", section + "px");
							}
							resizing();

							$(window).resize(function(){
								resizing();
							});

							prev.click(function(e){
								var me = sul;
								if(power == "on") return false;
								power = "on";

								me.find("li").eq(-1).insertBefore(me.find("li").eq(0));
								sul.css("left",-me.find("li").eq(0).width() + "px");
								sul.animate({
									"left" : 0 + "px"
								},{
									complete : function(){
										power = "off";
									}
								});
								e.preventDefault();
							});

							next.click(function(e){
								var me = sul;
								if(power == "on") return false;
								power = "on";
								sul.animate({
									"left" : -me.find("li").eq(0).width() + "px"
								},{
									complete : function(){
										power = "off";
										$(this).css("left",0);
										me.find("li").eq(0).appendTo(sul);
									}
								});
								e.preventDefault();
							});
						};
					}
			};
			esmotion.eslide();
			
			//그래프
			function Donut(el){
				this.obj = null;
			};
			Donut.prototype.init = function(el, i){
				var that = this;
				console.log(that)
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
			var gnum = 3; // 그래프 갯수
			for( i =1; i<gnum +1; i++){
				new Donut().init("donut" + i, 5);
			}

			//예약하기 과목 선택
			$(".tabcontents a").click(function(){
				$(".tabcontents a").removeClass("on")
				$(this).addClass("on")
			});
			$(".titleArea").attr("class","titleArea")
			var nuts = $("#content")
				, tv = $(".util").parents().attr("class")

			for( i = 1; i < 10; i ++){
				var tvs = $(".util").parents(".topvisual" + i).attr("class")
				if( tv == tvs ){
					nuts.addClass("area" + i)
					break;
				}
			};
			$(window).scroll(function(){
				var lays = $(window).scrollTop() + $(window).height();
				if( lays >= $(document).height() - $(".footer").height() + 130 ){
					//alert("more")
					var data = $(".jsdataload ul");
					data.clone().appendTo(".jsdataload");
				};
			});

			//수강등록 유의사항
			$(".notice .check input").click(function(){
				var agreeBox  = $(".agreeguide")
				if( agreeBox.css("display")  != "block" ){
					$(".agreeguide").slideDown();
				}else{
					$(".agreeguide").slideUp();
				}
			});
			
			//별점
			$(".touch").each(function(){
				var starico = $(this).find(".starClick")
				starico.click(function(e){
					var idxtar = $(this).index();
					starico.removeClass("on")
					for( var i =0; i<= idxtar; i++){
						starico.eq(i).addClass("on")
					}
					e.preventDefault();
				});
			});

			//checkbox
			$(".check").click(function(){
				$(this).toggleClass("on")
			});
			//radio
			$(".jsr input").click(function(){
				$(this).parents(".jsr").find(".radioBox2").removeClass("on")
				$(this).parents(".radioBox2").addClass("on")
			});
			//그룹수업 리스팅
			$(".reserveM5 a").click(function(e){
				$(".open-reserve").toggleClass("on")
				e.preventDefault();
			});

			//말줄임 (pc 1줄, tablet 이하 2줄)
			function ellips(){
				if( $(window).width() > 640 ){
					$(".tit a").removeClass("ellips");
				}else{
					$(".tit a").each(function(){
						if( $(this).height() > 55 ){
							$(this).addClass("ellips");
						};
					});
				};
			};
			ellips();
			$(window).resize(function(){ellips();});

			$(".btn_grouptop").click(function(){ $(".groupbody").toggleClass("on"); });

			//영어,중국어,일본어
			var tabbody = $(".tabbody");
			var converse_before = null

			$(".jsPaging").click(function(e){
				var thishead = $(this).parents(".tabhead")
					, totalE = $(".econverse")

				if( converse_before == null ){//첫번째
					thishead.addClass("on");
					$(this).parents("li").find(".tabbody").show();
					$(".econverse").addClass("on");

				}else{//그 이후

					if( thishead.is(".on") ){
						thishead.add(totalE).removeClass("on")
						tabbody.hide();
					}else{
						$(".tabhead").removeClass("on");
						thishead.addClass("on");
						tabbody.hide();
						$(this).parents("li").find(".tabbody").show();
						$(".econverse").addClass("on");
					}
				}
				converse_before = $(this);
				e.preventDefault();
			});

			top();
			$(window).resize(function(){
				top();
			});
			function top(){
				$(".jsPaging").click(function(e){
					if( $(window).width() < 640 ){
						if( $(".tat2").size() > 0 ){
							$(document).scrollTop(450)
						}else{
							$(document).scrollTop(550)
						};
					};
				});
			};

			//레벨 레이어 토글
			$(".levelcheck").click(function(e){
				$(this).toggleClass("on");
				$(".view1").toggleClass("on");
				e.preventDefault();
			});
			$(".reserveMobile .tableStyle8 a").click(function(e){
				e.preventDefault();
				$(".tableStyle8 a").removeClass("on");
				$(this).addClass("on");
			});
			//그룹수업 달력
			$(".reserveMobile .tableCalender label").click(function(){
				$(this).parents("td").toggleClass("on")
			});
		},
		Gnb : function(){
			//해상도 체크
			function size(){
				var w = $(window).width()
					, w2 = w + 17
					, d = $(document).width()
					, t = w + "px , " + w2 + "px, " + d + "px"
				$("#size").text( t )
			}
			size();
			$(window).resize(function(){size();});

			//GNB
			var header = $(".header")
				, menu = $(".totalMenu")
				, gtitle = $(".gnbTitle")
				, close = $(".closeGnb")
				, navi = $("nav")
				, nav = $(".nav")
				, dl = $("dl", nav)
				, dt = $("dt", nav)
				, dtlink = $("a", dt)
				, dd = $("dd", nav)
				, li = $("li", dd)
				, lii = $(".gnb > ul > li")
				, link = $("a", li)
				, dim = $(".dim")

			function unbind(){
				dtlink.unbind("click");
				link.unbind("click");
				menu.unbind("click");
				$(".closeGnb, .dim").unbind("click");
				gtitle.unbind("mouseenter");
				header.unbind("mouseleave");
			}
			//$(".gnb li:last-child").attr("class","grnt")
			function renav(){
					if( $(window).width() < 851 ){
							if( $(".over").size() > 0 ){
							}else{
								nav.css({
									"right": "-250px",
									"height": "100%"
								});
								dim.removeClass("on");
							}
							dtlink.click(function(e){
								if( $(this).parents("dt").is(".nodepth") ){
								}else{
									var dls = $(this).parents("dl")
									, tdd = $("dd", dls)
									, hdd= dls.find("ul").height()

									if( dls.is(".on") ){
										dls.removeClass("on");
										tdd.animate({"height":0},180);
										
									}else{
										dl.not(dls).removeClass("on")
										dls.addClass("on").find("dd").animate({
											"height" : hdd
										},180);
										dd.not(tdd).animate({
											"height" : 0
										});
									};
									li.removeClass("on");
									e.preventDefault();
								};
								
							});

							link.click(function(){
								li.removeClass("on")
								$(this).parents("li").addClass("on")
							});

							menu.click(function(){
								$(".util").addClass("zidx");
								nav.css("height","100%");
								nav.animate({
									"right" : 0
								}, 200);
								dim.addClass("on").animate({
									"opacity" : 1
								}, 200);
								$("body").addClass("over");
								$(".reserveMobile").addClass("on")
							});

							$(".closeGnb, .dim").click(function(){
								$(".util").removeClass("zidx");
								nav.animate({
									"right" : "-250px"
								},200);
								dim.animate({
									"opacity" : 0
								}, function(){
									$(this).removeClass("on");
									$(".reserveMobile").removeClass("on")
								});
								$("body").removeClass("over");
								dl.removeClass("on");
								dd.css("height",0);
							});

					}else if( $(window).width() > 850 ){ 
						$("body").removeClass("over");
						var nhdd = navi.height();
						nav.css({
							"right": 0,
							"height":0
						});

						dim.removeClass("on");

						gtitle.bind("click mouseenter focusin", function(){
							$(".txtVisual").fadeOut();
							nav.stop().addClass("on").animate({
								"height" : nhdd
							},100);
						});
						header.mouseleave(function(){
							nav.stop().removeClass("on").animate({
								"height" : 0
							},50);
							$(".txtVisual").fadeIn();
						});
					};
				};
			renav();
			$(window).resize(function(){
				unbind();
				renav();
			});

		},
		Common : function(){
			var jsuitab = $(".jsuitab")
				,jsclo = $(".jsbtn")
			
			jsclo.click(function(e){
				$(this).parents("li").find(".tabbody").toggleClass("on");
				
				if( $(this).is(".uiClo") ){
					$(this).removeClass("uiClo").find("span").text("자세히 보기");
				}else{
					$(this).addClass("uiClo").find("span").text("닫기");
				}
				e.preventDefault();
			});

			var table = $(".jsCell")
				, th = $("thead th", table)
				, tr = $("tbody tr", table)
				, td = $("tbody td", table)
				, faq = $("#jsfaq li")
				, faqlink = $(".faqQ a", faq)
				, faqA = $(".faqA", faq)
			
			//FAQ 탭
			faqlink.click(function(e){
				var ans = $(this).parents("li").find(".faqA")
				if( ans.css("display") == "none" ){
					ans.slideDown("fast");
				}else{
					ans.slideUp();
				}
				faqA.not(ans).slideUp();
				e.preventDefault();
			});

			//Placeholder
			$(".jshold input").on("focus click", function(){
				$(this).parents("span").addClass("hold")
			});
			$(".jshold input").on("focusout", function(){
				if( $(this).val() == "" ){
					$(this).parents("span").removeClass("hold")
				}else{
					
				}
			});
			var textarea = $(".daily-key textarea")
			var hd = {
				txt : textarea,
				holder : function(){
					hd.txt.bind("click", function(){
						$(this).next("label").hide();
					});
					
					hd.txt.bind("focusout", function(){
						if($(this).val() == "" ){
							$(this).next("label").show();
						}else{
						};
					});
				}
			}
			hd.holder();
			//select after 클릭시 select 클릭

			//그룹수업예약 레이어
			var dims2 = document.createElement("div")
				dims2.className = "dims2"
				$(dims2).appendTo(".reserveMobile")

			$(".selstyle label").click(function(){$(this).parents(".tog").toggleClass("on");});
			$(".g_layer").click(function(e){
				$(".rm").removeClass("on")
				$(this).parents(".rm").addClass("on")
				$(".dims2").show();
				e.preventDefault();
			});
			$(".close-gbox").click(function(e){
				$(this).parents(".rm").removeClass("on");
				$(".dims2").hide();
				e.preventDefault();
			});

			//반응형 테이블
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

			var select = $(".jsSelect")
				, selectBox = $("ul", select)
				, option = $("li", selectBox)
				, obj = $("a", option)

			$(".jst a").on("click", function(){
				var li = $(this).parents(".jst").find("li")
					, thisA = $(this).parents("li")

					if( $(this).parents(".reserveM4-1").size() > 0 ){
						thisA.toggleClass("on");
					}else{
						li.removeClass("on");
						thisA.addClass("on");
					}
			});

			$(".jsSelect li label, .jsSelect li a").click(function(e){
				var txt = $(this).text()
					, ns = $(this).parents(".jsSelect")
				ns.find(".txt").html(txt);
				ns.find("ul").removeClass("on");
				//e.preventDefault();
			});
			

			$(".optionBtn").on("click", function(e){
				var target = e.target;
				var sb = $(this).parents(".jsSelect").find(".jsOpt")
				$(".jsOpt").not($(this).parents(".jsSelect").find("ul")).removeClass("on");
				if( $(target).parents().is(".jsSelect")){
					var Ulselect = $(this).parents(".jsSelect").find(".jsOpt");
					Ulselect.toggleClass("on");
				}else{
				};
			});

			$(".familyBtn").click(function(e){
				$(".familySite ul").toggleClass("on");
				e.preventDefault();
			});
			$(document.documentElement || document.body ).bind("click touchstart",function(e){
				var event = e || window.event;
				var target = event.target || event.srcElement;
				if( $(target).parents().is(".familySite") || $(target).parents().is(".jsSelect")){
					clear();
				}else if( $(target).parents().is(".header") ){
					//clear();
				}else{
					clear();
					closeLayer();
					closeNavi();
				}
				function clear(){
					if( event.stopPropagation ) {
						event.stopPropagation();
					}else{
						event.cancleBubble = true;
					};
				};
				function closeLayer(){
					
					$(".familySite ul, .jsOpt").removeClass("on");
				};
				function closeNavi(){
					$(".nav").removeClass("on").animate({
						"height" : 0
					},50);
				};
			});
			//라디오 버튼
			$(".jsRadio .radioBox").click(function(){
				var che = this.childNodes[0].checked;
				
				if( che == true ){
				}else if( che == false ){
					che = true;
					this.childNodes[0].checked = true;
				}
				$(this).parents(".jsRadio").find(".radioBox").removeClass("on");
				$(this).addClass("on");
			});

			//tableStyle2 col 조정
			function colResize(){
				if( $(window).width() < 640){
					$(".jsCol table col:first-child").css("width", "100px");
				}else{
					$(".jsCol table col:first-child").css("width", "14%");
				};
			};
			colResize();
			$(window).resize(function(){
				colResize();
			});

			//토글 버튼. 어떤 버튼이든 toggle 클래스 추가시 해당 요소에 on 토글
			$(".toggle").click(function(){
				
				var layercheck = $(this).parents(".layer");
				if( layercheck.size() > 0 ){
					layercheck.find(".checkred").removeClass("on")
					$(this).addClass("on")
				}else{
					$(this).toggleClass("on");
				}
			});

			//레이어
			var dims = document.createElement("div")
				dims.className = "dims"
				$(dims).appendTo("body")

			function resize2(){
				$(".btn-layer-open").click(function(){
					$(".layer").hide();
					$(this).next(".layer").show();
					$(this).next(".layer").parents("td").addClass("position")
					$(".dims").show();
					$("html").addClass("fix");

					classAction();
					$(window).resize(function(){classAction();});
					
					function classAction(){
						if( $(window).width() < 851){
							$("body").addClass("dimm");
						}else{
							$("body").removeClass("dimm");
						};
					};
				});

				$(".btn-layer-close").click(function(){
					$(this).parents(".layer").hide();
					$(".dims").hide();
					$("body").removeClass("dimm");
					$(this).parents("td").removeClass("position")
					$("html").removeClass("fix");
				});
			
			};
			resize2();
			$(window).resize(function(){resize2();});


			
		}
	};
	ES.Conts();
	ES.Gnb();
	ES.Common();
});

