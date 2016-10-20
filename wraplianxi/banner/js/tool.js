//封装一个$函数
//封装一个$方法
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
//获取的是第一个元素节点的函数
function first(ele){
	var firstchild=ele.firstElementChild||ele.firstChild;
	if(!firstchild||firstchild.nodeType!==1){
		return null;
	}else{
		return firstchild;
	}
}
//获取最后一个元素节点的函数
function last(ele){
	var lastchild=ele.lastElementChild||ele.lastChild;
	if(!lastchild||lastchild.nodeType!==1){
		return null;
	}else{
		return lastchild;
	}
}	
//获取下一个兄弟元素节点的函数
function next(ele){
	var nextnode=ele.nextElementSibling||ele.nextSibling;
	if(!nextnode||nextnode.nodeType!==1){
		return null;
	}else{
		return nextnode;
	}
}
//获取上一个兄弟元素节点
function prev(ele){
	var prevnode=ele.previousElementSibling||ele.previousSibling;
	if(!prevnode||prevnode.nodeType!==1){
		return null;
	}else{
		return prevnode;
	}
}
//一个得到位置的函数
function getPos(obj){
	var pos={left:0,top:0};
	
	while(obj){
		pos.left +=obj.offsetLeft;
		pos.top +=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return pos;
}	


//封装一个得到样式的兼容性函数

function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}
	}
//封装一个添加class的函数
function addClass(obj,className){
	if(obj.className==""){
		obj.className=className;
	}else{
		var arrClassName=obj.className.split(" ");
		var _index=arrIndex(arrClassName,className);
		if(_index==-1){
			obj.className +=" "+className;
		}
	}
}
function arrIndex(a,c){
	for(var k=0;k<a.length;k++){
		if(a[k]==c){
			return k;
		}
	}
	return -1;
}
function removeClass(obj,className){
	if(obj.className!==""){
		var arrClassName=obj.className.split(" ");
		var _index=arrIndex(arrClassName,className);
		if(_index!=-1){
			arrClassName.splice(_index,1);
			obj.className=arrClassName.join(" ");
		}
	}
}
//获取className
function getElementsByClassName(className){
	var aEls=document.getElementsByTagName("*");
	var arr=[];
	for(var i=0;i<aEls.legth;i++){
		var aClassName=aEls[i].className.split(" ");
		for(var j=0;j<aClassName.length;j++){
			if(aClassName[j]==className){
				arr.push(aEls[i]);
				break;
			}
		}
	}
	return arr;
}
//移除文本节点
function removeTextNode(nodeList){
	var arr=[];
	for(var i=0;i<nodeList.length;i++){
		if(nodeList.nodeType!=3){
			arr.push(nodeList[i]);
		}
	}
	return arr;
}
//获取样式函数
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//移动函数
function move(obj,attr,dir,target,callBack){
	var dir=parseInt(getStyle(obj,attr))>target?-dir:dir;
	clearInterval(obj.timer);
	obj.timer=setInterval(
		function(){
			var speed=parseInt(getStyle(obj,attr))+dir;
			if(speed>=target&&dir>0||speed<=target&&dir<0)speed=target;
			obj.style[attr]=speed+"px";
			if(speed==target){
				clearInterval(obj.timer);
				callBack&&callBack();
			}
		}
	,50)
}
//绑定函数
function bind(obj,evname,evFn,isCapture){
	if(obj.addEventListener){
		obj.addEventListener(evname,evFn,isCapture);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+evname,function(){
			evFn.call(obj);
		});
	}else{
		obj["on"+evname]=evFn;
	}	
}
//解绑函数
function unbind(obj,evname,evFn,isCapture){
	if(obj.detachEvent){
		obj.detachEvent("on"+evname,evFn);
	}else if(obj.removeEventListener){
		obj.removeEventListener(evname,evFn,isCapture);
	}else{
		obj["on"+evname]=null;
	}
}
function drag(obj){
	//声明两个用于存储固定距离的变量
	var disX;//水平固定
	var disY;//垂直固定
	var newObj=null;
	//在div上按下触发 
	//drag函数的封装

	obj.onmousedown=function(ev){
		for(var i=0;i<aImg.length;i++){
			aImg[i].style.transition="";
			aImg[i].style.zIndex="1";
		};
		obj.style.zIndex="999";
		var e=ev||event;//做一个事件对象的兼容
		disX=e.clientX-this.offsetLeft;//获取水平固定距离
		disY=e.clientY-this.offsetTop;//获取垂直固定距离
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		//设置全局捕获
		obj.setCapture&&obj.setCapture();
		//保存最初的obj 的位置
		var firstL=obj.offsetLeft;
		var firstT=obj.offsetTop;
		//在document上移动鼠标触发
		document.onmousemove=function(ev){
		var e=ev||event;
		var valueX=e.clientX-disX;
		var valueY=e.clientY-disY;
		var maxL=document.documentElement.clientWidth-obj.offsetWidth;
		var maxT=document.documentElement.clientHeight-obj.offsetHeight;
		//三目运算符  简化判断的代码
		valueX= valueX<0?0:valueX;
		valueX= valueX>maxL?maxL:valueX;
		valueY= valueY<0?0:valueY;
		valueY= valueY>maxT?maxT:valueY;
		//让一个实时变化的鼠标坐标减去一个固定距离，就可以得到实时刷新的div的坐标
		obj.style.left=valueX+"px";
		obj.style.top=valueY+"px";
			//碰撞检测
			newObj=null;
			var arr=[];//建立数组用于存储碰撞上的图片
			for(var i=0;i<aImg.length;i++){
				if(aImg[i]!=obj){
					if(hitTest(aImg[i],obj)){
						arr.push(aImg[i]);
					}
					
				}
				
			};
			var min=Infinity;
			//遍历数组
			for(var i=0;i<arr.length;i++){
				var a=arr[i].offsetLeft-obj.offsetLeft;
				var b=arr[i].offsetTop-obj.offsetTop;
				
				var value=a*a+b*b;//平方和
				if(min>value){
					min=value;
					newObj  = arr[i];
				}
			};
		//console.log(newObj);
		}
		//鼠标弹起的时候
		document.onmouseup=function(){
			//取消鼠标移动和鼠标弹起的事件绑定
			document.onmousemove=document.onmouseup=null;
			//释放全局捕获
			obj.releaseCapture&&obj.releaseCapture();
			if(newObj){
				obj.style.transition="0.5s";
				newObj.style.transition="0.5s";
				obj.style.left=newObj.offsetLeft+"px";
				obj.style.top=newObj.offsetTop+"px";
				newObj.style.left=firstL+"px";
				newObj.style.top=firstT+"px";	
			}else{
				obj.style.transition="0.5s"
				obj.style.left=firstL+"px";
				obj.style.top=firstT+"px";
			}
			obj.style.zIndex="1";	
		}
	}
}	
	
	
//碰撞检测函数
function hitTest(obj,obj2){
	//先把obj那一堆获取
	var objL=  obj.offsetLeft;
	var objT=  obj.offsetTop;
	var objW=obj.offsetWidth;
	var objH=obj.offsetHeight;
	//获取obj2那一堆
	var obj2L=obj2.offsetLeft;
	var obj2T=obj2.offsetTop;
	var obj2W=obj2.offsetWidth;
	var obj2H=obj2.offsetHeight;
	if(objL+objW<obj2L||objT+objH<obj2T||obj2L+obj2W<objL||obj2T+obj2H<objT){
		return false;
	}else{
		return true;
	}	
}
	
	
//cookie函数
function getCookie(key,value,time){
	var mydate=new Date();
	mydate.setDate(mydate.getDate()+time);
	document.cookie="key="+encodeURI(value)+";expires="+mydate.toGMTString()+";";
}


//ajax
function ajax(options) {
	var defaults={
		"method":options.method||"get",
		"url":options.url,
		"data":options.data||"",
		"successFn":options.successFn||null,
		"dataType":options.dataType
	}
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(defaults.method=="get"){	
		defaults.url +="?"+defaults.data;
	}
	xhr.open(defaults.method,defaults.url,true);
	if(defaults.method=="get"){
		xhr.send();
	}else{
		xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded");
		xhr.send(defaults.data);
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				var msg=xhr.responseText;
				if( defaults.dataType.toLowerCase() === "json" ){
                    msg = JSON.parse( msg );
                }
                if( defaults.dataType.toLowerCase() === "xml" ){
                   msg = xhr.responseXML;
                }
				defaults.successFn&&defaults.successFn(msg);
			}else{
				alert("错误：Error:"+xhr.status)
			}	
		}
	}
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
