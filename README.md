# 像素鸟游戏简介

整个游戏主要运用定时器 setInterval 和动画原理实现游戏的主要功能,整个游戏的元素非常简单,涉及到的素材有小鸟的飞行图 背景图和管道素材。游戏中，玩家可以通过鼠标点击背景图，实现小鸟向上运动，这时背景图向右运动而管道会左运动，视觉上形成小鸟向前运动跨越各种不同长度管道组成的障碍。当小鸟碰到管道或者上下边界的时候，游戏结束。

## 动画原理的说明

动画原理公式：leader=leader+step

解释：

1. leader 表示盒子当前位置
2. step 表示步长
3. box.style.left=box.offsetleft+'px';
4. 让 setInterval 不断执行某个函数修改盒子的位置属性最后就实现了动画的效果

## 在线访问

https://zoescat.github.io/Flappy-Bird/

## TODO

整个游戏有很多需要完善的地方，比如每次开始游戏是都需要重新刷新，操作不方便，影响游戏体验，后期可以设计游戏的开始界面；游戏的难度单一，可以设置游戏关卡易、中、难三个等级体验会更好。



