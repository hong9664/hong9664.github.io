document.domain = "inshrd.net";
function onLoadFunc(str){
	var fa = parent.document.frmListen.log_num.value;
	parent.document.frmListen.log_num.value= fa +str + ',';
}
window.onload = function(){
	//alert(now_page);
	onLoadFunc(now_page);
}