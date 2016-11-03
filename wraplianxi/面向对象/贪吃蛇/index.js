$(document).ready(function(){
	//重置游戏区域
	Common.$mainBox.width(Common.width*Common.box);
	Common.$mainBox.height(Common.height*Common.box);
	//重置蛇和食物
	Common.snake=new Snake();
	Common.snake.creat();
	Common.food=new Food();
	Common.food.creat();
	
	
	Common.timer=setInterval(function(){//开始运动
		Common.snake.move()
	},Common.speed)
	
	$(document).swipe({//手指滑动方向处理
		swipe:function(event,direction){
			Common.snake.dir=direction;
			Common.snake.move()
		}
	})
	
})
