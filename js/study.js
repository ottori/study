window.onload = function(){
	var tab =  document.getElementById("tab");
	var tabChild = tab.getElementsByTagName("li");
	var before = null;

	for( i=0; i < tabChild.length; i++ ){
		tabChild[i].onclick = function(){
			if( before != null ){
				before.className = "";
			}
			this.className = "on";
			before = this;
		}
	}
}