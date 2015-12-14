$(function() {
    modooHome.init();
    getWindowSize();
    $(window).resize(function() {
        getWindowSize();
    });

    function a(c, b) {
        this.count = 0;
        this.diff = 0;
        this.target_count = parseInt(b);
        this.target_frame = document.getElementById(c);
        this.timer = null;
        this.counter();
    }
    a.prototype.counter = function() {
        var b = this;
        this.diff = this.target_count - this.count;
        if (this.diff > 0) {
            b.count += Math.ceil(this.diff / 5);
        }
        this.target_frame.innerHTML = this.formatNumber(this.count);
        if (this.count < this.target_count) {
            this.timer = setTimeout(function() {
                b.counter();
            }, 25);
        } else {
            clearTimeout(this.timer);
        }
    };
    a.prototype.formatNumber = function(c) {
        c += "";
        x = c.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? "." + x[1] : "";
        var b = /(\d+)(\d\d\d)/;
        while (b.test(x1)) {
            x1 = x1.replace(b, "$1,$2");
        }
        return x1 + x2;
    };
    setTimeout(function() {
        new a("modooCountArea", $("#modooCount").val());
    }, 200);
});

function getWindowSize() {
    var a = $(window).width();
    var b = $(window).height();
    $("#RESOLUTION").html(a + "x" + b);
}
var modooHome = {
    isVideoSlide: null,
    isSection3Slide2: null,
    browserVersion: "",
    slideFromIndex: null,
    slideToIndex: null,
    init: function() {
        this._initVar();
        this._initAttachEvent();
        this.getBrowserVersion();
        this.firstLoad = true;
        var e = "<embed type='application/x-shockwave-flash' src='/application/static/script/modules/flvplayer/playerNaver.swf' allowfullscreen='true' allowscriptaccess='always' quality='high' wmode='transparent' id='player' name='player' width='100%' height='100%' align='middle' style='position:absolute;top:0;right:0;bottom:0;left:0;background:#000' flashvars='contentWidth=1280&amp;contentHeight=720&amp;moviePath=/application/static/home/mov/modoo.flv&amp;autoPlay=true&amp;volume=1&amp;hideStopBtn=false&amp;showPlayBackTimeField=false&amp;showMe2dayBtn=false&amp;showTwitterBtn=false&amp;showFacebookBtn=false&amp;showUrlBtn=false&amp;showSrcBtn=false&amp;showCafeBtn=false&amp;showBlogBtn=false&amp;hideControlBox=false&amp;hideFullScreenBtn=true&amp;showCaptionBtn=false&amp;autoShowCaption=false&amp;__flashID=player' pluginspage='http://www.macromedia.com/go/getflashplayer'>";
        if (modooHome.browserVersion == "old") {
            $("#video").hide();
        } else {
            $("#video_flash").hide();
            $("#video").on("loadedmetadata", function() {
                var g = this.videoWidth;
                var h = this.videoHeight;
                var f = g / h;
                (adjSize = function() {
                    var i = $(window).width();
                    var j = $(window).height();
                    $boxRatio = i / j;
                    $adjRatio = f / $boxRatio;
                    $(".video").css({
                        width: i + "px",
                        height: j + "px"
                    });
                    if ($boxRatio < f) {
                        ml = -(i * $adjRatio - i) / 2;
                        $vid = $("#video").css({
                            width: i * $adjRatio + "px",
                            "margin-top": "0",
                            "margin-left": ml + "px"
                        });
                    } else {
                        mt = (j * $adjRatio - j) / 2;
                        $vid = $("#video").css({
                            width: i + "px",
                            "margin-top": mt + "px",
                            "margin-left": "0"
                        });
                    }
                })();
                $(window).resize(adjSize);
            });
        }
        $(".btn_video").click(function() {
            $.fn.fullpage.moveTo(1, 1);
        });
        $("#video").on("ended", function() {
            $("#header").removeClass("thin");
            $(".section1").find(".section_footer").removeClass("hide");
            $(".fp-controlArrow").removeClass("onvideo");
        });
        $("#fullpage").fullpage({
            navigation: true,
            navigationPosition: "none",
            afterLoad: function(g, f) {
                if (f == 1 && isVideoSlide == true) {
                    if (modooHome.browserVersion != "old") {
                        modooHome.videoAction("play");
                    }
                    $("#header").addClass("thin");
                    $(".fp-controlArrow").addClass("onvideo");
                }
                if (f != 1) {
                    $("#video_flash").html("");
                }
                if (f != 3) {
                    $(".section3 .slide2").find(".img2,.img3,.img4,.img5").hide();
                }
                if (f == 3) {
                    modooHome.section3slide2Animation();
                }
            },
            onLeave: function(g, f, h) {
                if (g == 1 && h == "down") {
                    $("#header").removeClass("thin");
                    $(".fp-controlArrow").removeClass("onvideo");
                } else {
                    if (g != 1 && f == 1 && h == "up") {
                        if (isVideoSlide == true) {
                            $("#header").addClass("thin");
                            $(".section1").find(".section_footer").addClass("hide");
                            $(".fp-controlArrow").addClass("onvideo");
                            $("#video_flash").html(e);
                        } else {
                            $("#header").removeClass("thin");
                        }
                    }
                } if (h == "down") {
                    $(".section" + f + "").find(".object").addClass("parallax");
                    $(".section" + f + "").find(".section_footer").removeClass("hide");
                    $(".section" + f + "").find(".section_footer").css({
                        bottom: "-320px"
                    }).delay(300).animate({
                        bottom: "0"
                    }, 200);
                } else {
                    $(".section" + f + "").find(".object").addClass("parallax");
                    $(".section" + g + "").find(".object").removeClass("parallax");
                    $(".section_footer").css({
                        bottom: "320px"
                    }).delay(100).animate({
                        bottom: "0"
                    }, 100);
                } if (modooHome.browserVersion != "old") {
                    modooHome.videoAction("pause");
                }
            },
            afterRender: function() {
                isVideoSlide = false;
            },
            afterSlideLoad: function(g, f, i, h) {
                if (f == 1 && h == 0) {
                    isVideoSlide = false;
                    $("#video_flash").html("");
                } else {
                    if (f == 1 && h == 1) {
                        if (modooHome.browserVersion != "old") {
                            modooHome.videoAction("play");
                        }
                        isVideoSlide = true;
                    }
                } if (f == 3 && h == 1) {
                    modooHome.section3slide2Animation();
                }
            },
            onSlideLeave: function(g, f, j, i) {
                if (f == 1 && j == 1) {
                    $("#header").removeClass("thin");
                    $(".fp-controlArrow").removeClass("onvideo");
                    $(".section" + f + "").find(".section_footer").removeClass("hide");
                    if (modooHome.browserVersion != "old") {
                        modooHome.videoAction("pause");
                    }
                } else {
                    if (f == 1 && j == 0) {
                        $("#header").addClass("thin");
                        $(".fp-controlArrow").addClass("onvideo");
                        $("#video_flash").html(e);
                        $(".section" + f + "").find(".section_footer").addClass("hide");
                    }
                } if (f == 2) {
                    var h = modooHome.slideToIndex;
                    $(".section2_list").children().removeClass("active");
                    if (h === 0) {
                        $(".section2_list li.list1").addClass("active");
                    } else {
                        if (h === 1) {
                            $(".section2_list li.list2").addClass("active");
                        } else {
                            if (h === 2) {
                                $(".section2_list li.list3").addClass("active");
                            } else {
                                if (h === 3) {
                                    $(".section2_list li.list4").addClass("active");
                                }
                            }
                        }
                    }
                }
                if (f == 3) {
                    $(".section3 .slide2").find(".img2,.img3,.img4,.img5").fadeOut();
                }
            }
        });

        function d(f) {
            $(".section" + f + " .fp-prev").click(function(g) {
                clickcr(this, "hmr*" + f + ".prev", "", "", g);
            });
            $(".section" + f + " .fp-next").click(function(g) {
                clickcr(this, "hmr*" + f + ".next", "", "", g);
            });
        }

        function b() {
            $("#fp-nav").bind("click", function(h) {
                clickcr(this, "hmr.page", "", "", h);
            });
            var f = 4,
                g;
            for (g = 1; g <= f; g++) {
                d(g);
            }
        }
        b();
        var a = [];
        $(".swiper-container").each(function(f) {
            var g = $(this);
            a[f] = g.swiper({
                autoplay: 1000,
                loop: true
            });
        });
        $(".section2_list li").click(function() {
            $this = $(this);
            if ($this.hasClass("list1")) {
                $.fn.fullpage.moveTo(2, 0);
            } else {
                if ($this.hasClass("list2")) {
                    $.fn.fullpage.moveTo(2, 1);
                } else {
                    if ($this.hasClass("list3")) {
                        $.fn.fullpage.moveTo(2, 2);
                    } else {
                        if ($this.hasClass("list4")) {
                            $.fn.fullpage.moveTo(2, 3);
                        }
                    }
                }
            }
        });
        var c = new Swiper(".img_phone", {
            loop: true,
            autoplay: 1000,
            watchActiveIndex: true,
            onSlideNext: function() {
                index = c.activeIndex;
                $(".template_list li").removeClass("active");
                if (index == 8) {
                    $(".template_list li:nth-child(1)").addClass("active");
                } else {
                    $(".template_list li:nth-child(" + index + ")").addClass("active");
                }
            },
            onSlidePrev: function() {
                index = c.activeIndex;
                $(".template_list li").removeClass("active");
                if (index == 0) {
                    $(".template_list li:nth-child(7)").addClass("active");
                } else {
                    $(".template_list li:nth-child(" + index + ")").addClass("active");
                }
            }
        });
        $(".template_list li").click(function() {
            $this = $(this);
            $(".template_list li").removeClass("active");
            $this.addClass("active");
            var f = $this.attr("class");
            if (f == "sp list1 active") {
                c.swipeTo(0);
            } else {
                if (f == "sp list2 active") {
                    c.swipeTo(1);
                } else {
                    if (f == "sp list3 active") {
                        c.swipeTo(2);
                    } else {
                        if (f == "sp list4 active") {
                            c.swipeTo(3);
                        } else {
                            if (f == "sp list5 active") {
                                c.swipeTo(4);
                            } else {
                                if (f == "sp list6 active") {
                                    c.swipeTo(5);
                                } else {
                                    if (f == "sp list7 active") {
                                        c.swipeTo(6);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        $(".template_list li").mouseover(function() {
            c.stopAutoplay();
        });
        $(".template_list li").mouseout(function() {
            c.startAutoplay();
        });
    },
    section3slide2Animation: function() {
        setTimeout(function() {
            $(".section3 .slide2").find(".img2").fadeIn();
        }, 500);
        setTimeout(function() {
            $(".section3 .slide2").find(".img3").fadeIn();
        }, 1000);
        setTimeout(function() {
            $(".section3 .slide2").find(".img4").fadeIn();
        }, 1500);
        setTimeout(function() {
            $(".section3 .slide2").find(".img5").fadeIn();
        }, 2000);
    },
    videoAction: function(a) {
        switch (a) {
            case "play":
                $("#video").get(0).play();
                break;
            case "pause":
                $("#video").get(0).pause();
                break;
            default:
                break;
        }
    },
    getBrowserVersion: function() {
        var b = window.navigator.userAgent.toLowerCase();
        var d = b.indexOf("msie 8") != -1;
        var e = b.indexOf("msie 7") != -1;
        var f = b.indexOf("msie 6") != -1;
        var c = f || e || d;
        var a = b.indexOf("safari") != -1 && b.indexOf("chrome") == -1 && b.indexOf("windows") != -1;
        if (c || a) {
            this.browserVersion = "old";
        }
    },
    _initVar: function() {
        this.evtDomainLayer = $("#ev_domain");
        this.evtDomainRegisterBtn = $("._REGISTER");
        this.evtStickerLayer = $("#ev_sticker");
        this.evtCouponLayer = $("#ev_coupon");
    },
    _initAttachEvent: function() {
        this._eventDomainEvent();
        this._eventStickerEvent();
        this._eventCouponEvent();
    },
    _eventCouponEvent: function() {
        var a = this;
        this.evtCouponLayer.find("._btn_go_event").bind("click", function(b) {
            b.preventDefault();
            location.href = "/home/event";
        });
        this.evtCouponLayer.find("._btn_close_chk").bind("click", function(c) {
            c.preventDefault();
            var b = $(c.target);
            b.toggleClass("selected");
        });
        this.evtCouponLayer.find("._btn_close").bind("click", function(b) {
            b.preventDefault();
            if ($("._btn_close_chk").hasClass("selected")) {
                $.cookie("close_event_sticker3_home", "y", {
                    expires: 365,
                    path: "/",
                    domain: ".modoo.at"
                });
            }
            a.evtCouponLayer.hide();
            getPresentSiteInfo();
        });
    },
    _eventStickerEvent: function() {
        var a = this;
        this.evtStickerLayer.find(".btn_go_event").click(function(b) {
            b.preventDefault();
            location.href = "http://www.modoo.at/home/event/sticker";
        });
        this.evtStickerLayer.find(".btn_close").click(function(b) {
            b.preventDefault();
            if ($(".not_view_type label").hasClass("checked")) {
                $.cookie("close_event_sticker_pc", "y", {
                    expires: 365,
                    path: "/",
                    domain: ".modoo.at"
                });
            }
            a.evtStickerLayer.hide();
            getPresentSiteInfo();
        });
        this.evtStickerLayer.find(".not_view_type label").click(function(b) {
            $(b.currentTarget).toggleClass("checked");
        });
    },
    _eventDomainEvent: function() {
        var a = this;
        this.evtDomainLayer.find("._CLOSE").click(function() {
            a.evtDomainLayer.hide();
        });
        this.evtDomainRegisterBtn.click(function() {
            $.ajax({
                url: "http://www.modoo.at/management/site/add.json",
                type: "post",
                data: {
                    layoutMode: "horizontal_basic"
                },
                dataType: "json",
                success: function(b) {
                    if (b.retCode === 0) {
                        location.href = "http://www.modoo.at/management/site?siteId=" + b.siteId + "&popupInfo=y";
                    } else {
                        alert(b.retMsg);
                    }
                }
            });
            return false;
        });
    },
    popup_evt_sticker: function() {
        $("#ev_sticker").show();
        $("#ev_sticker").animate({
            bottom: "43px"
        }, 800);
        $("#ev_sticker .btn_close").click(function() {
            $("#ev_sticker").hide();
        });
    },
    popup_evt_coupon: function() {
        $("#ev_coupon").show();
    }
};