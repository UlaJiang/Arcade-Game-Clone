
class Game {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

/**
* @description Enemy类
* @constructor
* @param {number} x - 敌人位置横坐标
* @param {number} x - 敌人位置纵坐标
*/
class Enemy extends Game{
    
    constructor (x, y) {
        this.x = -10;
        this.y = 60 + 85 * Math.floor(Math.random() * 3);
        this.speed = (Math.random()+1) * 150;
    // 敌人的图片
        this.sprite = 'images/enemy-bug.png';
    }

    // 更新敌人的位置，dt：时间间隙
    update(dt) {
    // 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
        this.x += this.speed * dt;
    //判断allEnemies数组里面是否有enemy已经爬到最右，如果是的话就从数组中删除
        for(var i = 0; i < allEnemies.length; i++){
            if(allEnemies[i].x >= 502){
                allEnemies.splice(i, 1);
                break;
            }
        }
    //处理碰撞 
        for(var i = 0; i < allEnemies.length; i++){
            if ((Math.abs(allEnemies[i].y - player.y) < 40) && (Math.abs(allEnemies[i].x - player.x) < 60)){
                player.reset();
            }
        }
    }

    //在屏幕上画出敌人，
    render() {
        super.render();
    }
}

/**
* @description Player
* @constructor
* @param {number} x - 玩家位置横坐标
* @param {number} x - 玩家位置纵坐标
*/
class Player extends Game{
    constructor(x, y) {
        this.x = 200;
        this.y = 410;
    // 玩家的图片
        this.sprite = 'images/char-boy.png';
    }

    update() {
        //判断游戏什么时候成功
        if (this.y < 70) {
            alert('Congratulations, you win the game!');
            this.reset();
    
        //控制玩家在指定的范围内移动，超出范围都会重置游戏
        if( this.x > 400 || this.x < 0 || this.y > 410){
            this.reset();
        }
    }

    render() {
        super.render();
    }
    
    const CELL_WIDTH = 100;
    const CELL_HEIGHT = 83;
    //处理玩家按上下左右键的时候位置移动
    handleInput(num) {
        if (num === 'up'){
            //this.update();
            this.y = this.y - CELL_HEIGHT; 
        }
        else if (num === 'down') {
            //this.update();
            this.y = this.y + CELL_HEIGHT;
        }
        else if (num === 'left') {
            //this.update();
            this.x = this.x - CELL_WIDTH;
        }
        else if (num === 'right') {
            //this.update();
            this.x = this.x + CELL_WIDTH;
        }
    }

    //重置游戏，及重置玩家位置至初始状态
    reset() {
        this.x = 200;
        this.y = 410;
    }

}



// 实例化所有Enemy对象
var allEnemies = new Array();

//每隔一秒生成一个新的enemy对象，把该对象都放进一个叫 allEnemies 的数组里面
setInterval(function(){
        var enemy = new Enemy();
        allEnemies.push(enemy);
}, 1000);

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
