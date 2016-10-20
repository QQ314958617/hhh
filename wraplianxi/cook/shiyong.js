//封装一个$函数
function $(obj,content){
		var firstChar=obj.charAt(0);
		var content=content||document;
		if(firstChar=="#"){
			return content.getElementById(obj.substring(1));
		}else if(firstChar=="."){
			var arr=[];
			var aEls=content.getElementsByTagName("*");
				for(var i=0;i<aEls.length;i++){
						var aClassName=	aEls[i].className.split(" ");
							 for(var j=0;j<aClassName.length;j++){
								if(aClassName[j]==obj.slice(1)){
									arr.push(aEls[i]);
									break;
								}
								
							 }
						}
			return arr;
		}else{
			return content.getElementsByTagName(obj);
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

//一个得到位置的函数
	function getPos(obj){
			var pos={left:0,top:0};
			
			while(obj){
				pos.left +=obj.offsetLeft;
				pos.top +=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return pos;
		}	}


//封装一个得到样式的兼容性函数

function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}
	}
//封装一个添加class 函数
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
//循环遍历原来class里面的每一项，与要添加的类做比较
function arrIndex(arr,k){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==k){
			return i;//如果有相同的，返回原数组相同的那一项对应的下标
		}
	};
	return -1;
}
//移除class函数
function removeClass(obj,className){
if(obj.className!==""){
	var arrClassName=obj.className.split(" ");
	var _index=arrIndex(arrClassName,className);
	if(_index!==-1){
		arrClassName.splice(_index,1);//删除了对应的那个找到的class
		obj.className=arrClassName.join(" ");//将数组转回字符串
	}
	
}

}

//做运动的函数

function Move(obj,attr,dir,target,callBack){//（对象，"left"-"top",速度,回调函数）
				
				dir=parseInt(getStyle(obj,attr))>target?-dir:dir;
				
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var speed=parseInt(getStyle(obj,attr))+dir; //10(px)
					//&&与运算比||或运算优先级高
					if(speed>=target&&dir>0||speed<=target&&dir<0){
						speed=target;
					}
					
					obj.style[attr]=speed+"px";
					
					if(speed==target){
						clearInterval(obj.timer);
						callBack&&callBack();
						//alert(speed);
					}
					
				},30);
				
}
//绑定事件的函数
function bind(obj,evname,evfn){
	if(addEventListener){
		obj.addEventListener(evname,evfn,false)
	}
	else{
		obj.attachEvent("on"+evname,function(){evfn.call(obj)});
	}
}
//移除绑定事件
function unbind(obj,evname,evfn,isCapture){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,evfn,isCapture)
	}else if(obj,detachEvent){
		obj.detachEvent("on"+evname,evfn)
	}else{obj["on"+evname]=null}
}
//移动换位图片墙
function drag(obj){
		//声明两个用于存储固定距离的变量
		var disX;//水平固定
		var disY;//垂直固定
		var newObj=null;
		var aImg=document.getElementsByTagName("img");
		//在div上按下触发 
		//drag函数的封装
		obj.onmousedown=function(ev){
			for(var i=0;i<aImg.length;i++){
				aImg[i].style.transition="";
				aImg[i].style.zIndex="1"				
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
					
					var value=a*a+b*b;//平方和勾股定律
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
				document.onmouseup=document.onmousemove=null;
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
//设置cookie
function setCookie(key,value,time){
	var mydate=new Date();
	mydate.setDate(mydate.getDate()+time);
	document.cookie=key+"="+encodeURI(value)+";expires="+mydate.toGMTString();
}
//得到cookie
function getCookie(key){
	var str=document.cookie;
	var arr=str.split("; ")
	for(var i=0;i<arr.length;i++){
		var newArr=arr[i].split("=");
		if(newArr[0]==key){
			return decodeURI(newArr[1]);
		}
	}
}
//删除一个cookie
function removeCookie(key){
	setCookie(key,"",-1)
}
//创建正则var re=objReExp.qq;
var objReExp={
	"Email":/^\w[\w-]*@[0-9a-z]{2,5}(\.[a-z]{2,3}){1,3}$/,
	"RemoveSpace":/^\s+|\s+|\s+$/g,
	"qq":/^[1-9]\d{4,11}$/,
	"china":/[\u4e00-\u9fa5]/
}
//可多个同时运动不同属性
function startMove(obj, json,dir, fnEnd) {
	var MAX = 20;//控制移动距离最大值；保证缓冲过程。
	//每次调用就只有一个定时器在工作(开始运动时关闭已有定时器)
	//并且关闭或者开启都是当前物体的定时器，已防止与页面上其他定时器的冲突，使每个定时器都互不干扰 
	clearInterval(obj.timer);
	//console.log("a");
	obj.timer = setInterval(function() {
		var bStop = true; // 假设：所有的值都已经到了
		for (var name in json) {
			var iTarget = json[name]; // 目标点
			if (name == 'opacity') {
				// *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
				var cur = Math.round(parseFloat(getStyle(obj, name)) * 100);
			} else {
				var cur = parseInt(getStyle(obj, name)); // cur 当前移动的数值
			}
			var speed = (iTarget - cur) / dir; // 物体运动的速度 数字越小动的越慢 /5 : 自定义的数字
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (Math.abs(speed) > MAX) speed = speed > 0 ? MAX : -MAX;
			if (name == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //IE
				obj.style.opacity = (cur + speed) / 100; //ff chrome
			}if (name=='zIndex'){
				console.log("1");
				obj.style.zIndex=cur+speed
			}else {
				obj.style[name] = cur + speed + 'px';
			}
			
			// 某个值不等于目标点 
			if (cur != iTarget) {
				bStop = false;
			}
		}
		// 都达到了目标点
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) //只有传了这个函数才去调用
			{
				fnEnd();
			}
		}
	}, 20);
}
