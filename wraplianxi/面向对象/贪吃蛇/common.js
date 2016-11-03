var Common={
	width:20,
	height:20,
	box:15,
	speed:200,
	food:null,
	snake:null,
	timer:null,
	$mainBox:$("#mainbox")
}//创建json对象，存放数据

function Snake(){//创建蛇对象
	this.$head=null,
	this.tails=[],
	this.dir="right",
	this.pos={x:0,y:0}	
}
Snake.prototype={//在蛇对象中写入方法
	//创建头部
	creat:function(){
		this.$head=$("<span class='snakehead'></span>");
		this.$head.css({
			width:Common.box,
			height:Common.box,
			left:this.pos.x,
			top:this.pos.y
		})
		Common.$mainBox.append(this.$head);
		
	},
	//移动函数
	move:function(){
		var pos={x:this.pos.x,y:this.pos.y}
		switch(this.dir){
			case "up":
				this.pos.y-=Common.box;
			break;
			case "down":
				this.pos.y+=Common.box;
			break;
			case "left":
				this.pos.x-=Common.box;
			break;
			case "right":
				this.pos.x+=Common.box;
			break;
			
		}
		this.$head.css({
			top:this.pos.y,
			left:this.pos.x
		})
		this.collideLisener()
		this.tailmove(pos)
	},
	collideLisener:function(){//监听
		if(this.pos.x<0||this.pos.x>(Common.width-1)*Common.box||this.pos.y<0||this.pos.y>(Common.height-1)*Common.box){
			this.over()
		}//撞墙
		if(this.pos.x==Common.food.pos.x&&this.pos.y==Common.food.pos.y){
			this.eat()
		}//吃到食物
		if(this.tails.length){//回头就是死
			for(var i=0;i<this.tails.length;i++){
				if(parseInt(this.tails[i].css("left"))==this.pos.x&&parseInt(this.tails[i].css("top"))==this.pos.y){
					this.over()
				}
			}
		}
//		console.log(Common.speed);
//		if(this.tails.length>0){
//			Common.speed=200
//			if(this.tails.length>5){
//				Common.speed=100
//				console.log(Common.speed);
//				if(this.tails.length>10){
//					Common.speed=10
//					console.log(Common.speed);
//				}
//			}
//		}
		
		
	},
	eat:function(){//吃
		this.addTail();
		Common.food.update()
	},
	addTail:function(){//添加蛇尾
		var tail=$("<span class='snake'></span>");
		Common.$mainBox.append(tail);
		this.tails.push(tail);
		tail.css({
			width:Common.box,
			height:Common.box
		})
	},
	tailmove:function(pos){
		if(this.tails.length){
			var las=this.tails.length-1;
			this.tails[las].css({
				top:pos.y,
				left:pos.x
			})
			this.tails.unshift(this.tails.pop())
		}
		
	},
	over:function(){//结束函数
		clearInterval(Common.timer);
		alert("Game Over!")
	}
}
function Food(){//创建食物对象
	this.$el=null,
	this.pos={x:0,y:0}
}
Food.prototype={
	creat:function(){//生成食物
		this.$el=$("<span class='food'></span>");
		this.creatPosition();
		this.$el.css({
			width:Common.box,
			height:Common.box,
			left:this.pos.x,
			top:this.pos.y
		})
		Common.$mainBox.append(this.$el);
		
	},
	update:function(){//重置食物位置
		this.creatPosition();
		this.$el.css({
			top:this.pos.y,
			left:this.pos.x
		})
	},
	creatPosition:function(){//重置坐标函数
		var x=Math.floor(Math.random()*Common.width)*Common.box;
		var y=Math.floor(Math.random()*Common.height)*Common.box;
		this.pos={x:x,y:y}
	}
}
