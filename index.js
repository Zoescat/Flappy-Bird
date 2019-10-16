//让小鸟飞起来  获取相应的元素
var game = document.getElementById('game');
var birdEle = document.getElementById('bird');
//初始化背景图sky的值
var sky = {
    x: 0
}
//初始化bird的值
var bird = {
    speedX: 5,
    speedY: 0,
    x: birdEle.offsetLeft,
    y: birdEle.offsetTop,
}
const birdInit = JSON.parse(JSON.stringify(bird));
// 点击开始游戏按钮,小鸟回到初始位置分析:
// 1. bird对象的坐标设置为初始坐标
// 2. 在初始坐标上把bird元素渲染出来

var score = 0;
var d;
var scoreEle = document.getElementById('score');
var start = document.getElementById('start');
start.addEventListener("click", function () {
    running = true;
    score = 0;
    bird = JSON.parse(JSON.stringify(birdInit));
    resetPipe();
    //清除Interval的定时器,传入变量名(创建Interval定时器时定义的变量名)
    clearInterval(d);
    // 按时间计分
    d = setInterval(function () {
        if (running) {
            scoreEle.innerText = score++;
        }
    }, 500)

})
//y游戏的状态
var running = false;
setInterval(function () {
    if (running) {
        //移动背景让小鸟实现水平移动
        sky.x -= 5;
        game.style.backgroundPositionX = sky.x + 'px';
        //实现小鸟的上下运动,也就是改变它y值的位置
        bird.speedY += 1;
        bird.y += bird.speedY;
        if (bird.y < 0) {
            running = false;
            bird.y = 0;
        }
        if (bird.y + birdEle.offsetHeight > 600) {
            running = false;
            bird.y = 600 - birdEle.offsetHeight;
        }
        birdEle.style.top = bird.y + 'px';
    }
}, 30)
//点击文档的时候实现小鸟向上运动
document.onclick = function () {
    bird.speedY = -10;
}

//创建管道
function createPipe(position) {
    var pipe = {};
    pipe.x = position;
    // 规定上管道的高度200-300之间
    pipe.uHeight = 200 + parseInt(Math.random() * 100); // parseInt(Math.random() * 100) 生成0-99的随机数
    pipe.dHeight = 600 - pipe.uHeight - 200;
    pipe.dTop = pipe.uHeight + 200;
    //上管道
    var uPipe = document.createElement('div'); //创建一个div标签
    uPipe.style.width = '52px';
    uPipe.style.height = pipe.uHeight + 'px';
    uPipe.style.background = 'url(./images/pipe2.png) no-repeat center bottom';
    uPipe.style.position = 'absolute';
    uPipe.className = "up";
    uPipe.style.top = 0;
    uPipe.style.left = pipe.x + 'px';
    game.appendChild(uPipe); //把uPipe挂载在相应的标签下

    //下管道
    var dPipe = document.createElement('div'); //创建一个div标签
    dPipe.style.width = '52px';
    dPipe.style.height = pipe.dHeight + 'px';
    dPipe.style.background = 'url("images/pipe1.png") no-repeat center top';
    dPipe.style.position = 'absolute';
    dPipe.className = "down";
    dPipe.style.top = pipe.dTop + 'px';
    dPipe.style.left = pipe.x + 'px';
    game.appendChild(dPipe); //把dPipe挂载在相应的标签下

    //让管道动起来
    setInterval(function () {
        if (running) {
            if (reset) {
                pipe.x = uPipe.style.left.slice(0, -2);
                reset = false;
            }
            pipe.x -= 2;
            uPipe.style.left = pipe.x + 'px';
            dPipe.style.left = pipe.x + 'px';
            console.log(pipe.x);
            if (pipe.x < -52) {
                pipe.x = 800;
            }
            var uCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 &&
                bird.y < pipe.uHeight;
            var dCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 &&
                bird.y > pipe.uHeight + 200;
            if (uCheck || dCheck) {
                running = false;
            }
        }
    }, 30)
}
var reset = false;

function resetPipe() {
    reset = true;
    // 1. 拿到四个上管道
    var upList = document.getElementsByClassName('up')
    // 2. 遍历上管道,分别设置初始坐标
    for (var i = 0; i < upList.length; i++) {
        const uP = upList[i];
        uP.style.left = (400 + 200 * i) + 'px';
        // 1 400 
        // 2 600
        // 3 800
        // 4 1000
        // x=400+


    }


}

createPipe(400);
createPipe(600);
createPipe(800);
createPipe(1000);



//背景音乐
//音乐是否正在播放
var playing = false;
setTimeout(function () {
    document.getElementById("bgMusic").play();
    playing = true;

    document.getElementById("pauseMusic").addEventListener('click', pause);
}, 500); //0.5秒后将会调用执行remind()函数

//音乐暂停
function pause() {
    if (playing) {
        document.getElementById("bgMusic").pause();
        playing = false;
        document.getElementById("pauseMusic").textContent = "播放音乐";
    } else {
        document.getElementById("bgMusic").play();
        playing = true;
        document.getElementById("pauseMusic").textContent = "暂停音乐";
    }
}