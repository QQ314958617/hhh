//获取id,class,标签
function $(selector,content){
	var fristChar=selector.charAt(0);
	var content=content||document;
	if(fristChar==="#"){
		return content.getElementById(selector.slice(1));
	}else if(fristChar==="."){
		var arr=[];
		var AllElements=content.getElementsByTagName("*");
		for(var i=0;i<AllElements.length;i++){
			var className=AllElements[i].className;
			var classArr=className.split(" ");
			for(var j=0;j<classArr.length;j++){
				if(selector.slice(1)===classArr[j]){
					arr.push(AllElements[i]);
					break;
				}
			}
		}
		return arr;
	}else{
		return content.getElementsByTagName(selector);
	}
}

//获取样式函数
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//缓冲函数
function startMove(obj, json, fnEnd) {
	var MAX = 18;
	//每次调用就只有一个定时器在工作(开始运动时关闭已有定时器)
	//并且关闭或者开启都是当前物体的定时器，已防止与页面上其他定时器的冲突，使每个定时器都互不干扰 
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true; // 假设：所有的值都已经到了
		
		for (var name in json) {
			var iTarget = json[name]; // 目标点
			if (name == 'opacity') {
				// *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
				var cur = Math.round(parseFloat(getStyle(obj, name)) * 100);
			} else {
				var cur = Math.round(parseFloat(getStyle(obj, name))); // cur 当前移动的数值
			}
			var speed = (iTarget - cur) / 8; // 物体运动的速度 数字越小动的越慢 /5 : 自定义的数字
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (Math.abs(speed) > MAX) speed = speed > 0 ? MAX : -MAX;
			if (name == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //IE
				obj.style.opacity = (cur + speed) / 100; //ff chrome
			} else {
				obj.style[name] = cur + speed + 'px';
			}
			// 某个值不等于目标点 
			if (cur != iTarget) bStop = false;
		}
		if (bStop) {
			clearInterval(obj.timer);
			fnEnd&&fnEnd();
		}
	}, 20);
}
