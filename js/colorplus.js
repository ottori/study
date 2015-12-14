$(function(){
	$('.color li:first-child').click(function(){
		$('body').css('background','-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(248,255,232,1)), color-stop(33%,rgba(227,245,171,1)), color-stop(100%,rgba(183,223,45,1)))');
	});
	$('.color li:eq(1)').click(function(){
		$('body').css('background','-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(63%,rgba(252,206,255,1)), color-stop(100%,rgba(221,73,255,1)))');
	});
	$('.color li:eq(2)').click(function(){
		$('body').css('background','-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(184,225,252,1)), color-stop(10%,rgba(169,210,243,1)), color-stop(25%,rgba(144,186,228,1)), color-stop(37%,rgba(144,188,234,1)), color-stop(50%,rgba(144,191,240,1)), color-stop(51%,rgba(107,168,229,1)), color-stop(83%,rgba(162,218,245,1)), color-stop(100%,rgba(189,243,253,1)))');
	});
});
