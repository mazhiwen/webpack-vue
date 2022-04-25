<template>
  <div class="map_wrap">
    <!-- <div style="height:200px;position:relative;">
      <svg
        id="svgtest"
        width="256"
        height="112"
        viewBox="0 0 256 112"
      >
        <path
          id="pathid"
          fill="pink"
          stroke="black"
          d="M8,56 C8,33.90861 25.90861,16 48,16 C70.09139,16 88,33.90861 88,56 C88,78.09139 105.90861,92 128,92 C150.09139,92 160,72 160,56 C160,40 148,24 128,24 C108,24 96,40 96,56 C96,72 105.90861,92 128,92 C154,93 168,78 168,56 C168,33.90861 185.90861,16 208,16 C230.09139,16 248,33.90861 248,56 C248,78.09139 230.09139,96 208,96 L48,96 C25.90861,96 8,78.09139 8,56 Z"
        />
      </svg>
      <div id="green" />
    </div> -->

    <!-- <div id="test3d">
      <div>Normal</div>
      <div class="rotated">
        Rotated
      </div>
    </div> -->

    <canvas id="meteor" />
    <canvas id="star" />
    <canvas id="moon" />
  </div>
</template>

<script>
import { copy } from 'utils';
import timeJPG from 'images/time.jpg';
import {
  getGradientColorsByValues,
  getLightDarkColor,
} from 'utils/color';

import anime from 'animejs/lib/anime.es';
// import PDFJS from 'pdfjs-dist/legacy/build/pdf.min';
import PDFJS from 'pdfjs-dist';
// PDFJS.disableWorker = true;

console.log(11, PDFJS);
// .getDocument('./1.pdf')
const loadingTask = PDFJS.getDocument('./1.pdf');


console.log(loadingTask);

export default {
  data() {
    return {
      timeJPG,
      colors: [],
      DOMMap: {
        Hebei: {
          style: {
            fill: 'rgb(255,0,0)',
          },
        },
        Henan: {
          style: {
            fill: 'rgb(255,0,0)',
          },
        },
      },
    };
  },
  created() {

  },
  mounted() {
    //


    // const path = anime.path('#pathid');

    // console.log(path);
    // anime({
    //   targets: '#green',
    //   translateX: path('x'),
    //   translateY: path('y'),
    //   rotate: path('angle'),
    //   duration: 3000,
    //   loop: true,
    //   easing: 'linear',
    // });

    // anime({
    //   targets: '#pathid',
    //   opacity: 0,
    //   duration: 6000,
    //   loop: true,
    //   direction: 'alternate',
    //   easing: 'easeInOutExpo',
    // });
    (function () {
      let context;// 画布上下文
      let boundaryHeight;// 画布高，边界值
      let boundaryWidth;// 画布宽，边界值
      let meteorArr = [];
      const METEOR_COUNT = 1;// 流星数，常量
      const METEOR_SEPARATE = 300; // 流星之间间隔，常量
      const meteorCoordinateArr = [];// 存所有流星的坐标数组
      let playMeteorTimeout;

      // 初始化画布及context
      function init() {
        meteorArr = [];

        const canvas = document.getElementById('moon');

        canvas.width = 1000;
        canvas.height = 500;

        boundaryHeight = canvas.height;
        boundaryWidth = canvas.width;

        // 获取context
        context = canvas.getContext('2d');
        context.fillStyle = 'black';

        // 画流星
        for (let j = 0; j < METEOR_COUNT; j++) {
          const rain = new MeteorRain();
          rain.init(j);
          rain.draw();
          meteorArr.push(rain);
        }

        playMeteor();// 流星动起来
      }

      // 创建一个星星对象


      // 创建一个流星对象
      var MeteorRain = function () {
        this.x = -1;// 流星的横坐标
        this.y = -1;// 流星的纵坐标
        this.length = -1;// 流星的长度
        this.angle = 30; // 倾斜角度
        this.width = -1;// 流星所占宽度，及矩形的宽度
        this.height = -1;// 流星所占高度，及矩形的高度
        this.speed = 1;// 速度
        this.offset_x = -1;// 横轴移动偏移量
        this.offset_y = -1;// 纵轴移动偏移量
        this.alpha = 1; // 透明度
      };

      MeteorRain.prototype = {
        constructor: MeteorRain,
        // 初始化
        init: function (i) {
          this.alpha = 1;// 透明度
          this.angle = 30; // 流星倾斜角
          this.speed = Math.ceil(Math.random() + 0.5); // 流星的速度

          const x = Math.random() * 80 + 180;
          const cos = Math.cos(this.angle * 3.14 / 180);
          const sin = Math.sin(this.angle * 3.14 / 180);

          this.length = Math.ceil(x);// 流星长度

          this.width = this.length * cos; // 流星所占宽度，及矩形的宽度
          this.height = this.length * sin; // 流星所占高度，及矩形的高度
          this.offset_x = this.speed * cos * 3.5;
          this.offset_y = this.speed * sin * 3.5;

          this.getPos(i);
        },
        // 计算流星坐标
        countPos: function () {
          // 往左下移动,x减少，y增加
          this.x = this.x - this.offset_x;
          this.y = this.y + this.offset_y;
        },
        // 获取随机坐标
        getPos: function (i) {
          const _this = this;

          function getCoordinate() {
            _this.x = Math.random() * boundaryWidth; // x坐标

            for (let k = 0; k < meteorCoordinateArr.length; k++) {
              if (Math.abs(_this.x - meteorCoordinateArr[k]) < METEOR_SEPARATE) { // 这里如果流星之间距离过小，会把其他流星隔断，严重影响效果。
                return getCoordinate();
              }
            }

            meteorCoordinateArr[i] = _this.x;
          }

          getCoordinate();

          this.y = 0.2 * boundaryHeight; // y坐标
        },
        // 画流星
        draw: function () {
          context.save();
          context.beginPath();
          context.lineWidth = 12.5; // 宽度
          context.globalAlpha = this.alpha; // 设置透明度

          // 创建横向渐变颜色,起点坐标至终点坐标
          const line = context.createLinearGradient(this.x, this.y, this.x + this.width, this.y - this.height);

          // 分段设置颜色
          line.addColorStop(0, 'rgba(255, 0, 0, 1)');
          line.addColorStop(0.5, 'rgba(0, 255,0 , 0)');
          line.addColorStop(1, 'rgba(255, 0,0 , 1)');

          if (this.alpha < 0) {
            this.alpha = -this.alpha;
          }
          // 填充
          context.strokeStyle = line;
          // 起点
          context.moveTo(this.x, this.y);
          // 终点
          context.lineTo(this.x + this.width, this.y - this.height);

          context.closePath();
          context.stroke();
          context.restore();
        },
        move: function () {
          const x = this.x + this.width - this.offset_x;
          const y = this.y - this.height;

          this.alpha -= 0.002;

          // 重新计算位置，往左下移动
          this.countPos();

          if (this.alpha <= 0) {
            this.alpha = 0;
          } else if (this.alpha > 1) {
            this.alpha = 1;
          }

          // 画一个矩形去清空流星
          context.clearRect(this.x - this.offset_x, y, this.width + this.offset_x, this.height);
          // 重绘
          this.draw();
        },
      };
      // 流星动起来
      function playMeteor() {
        for (let n = 0; n < METEOR_COUNT; n++) {
          const rain = meteorArr[n];

          rain.move();// 移动

          if (rain.y > boundaryHeight + 100) { // 超出界限后重来
            context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
            meteorCoordinateArr[n] = 0;// 清空坐标数组具体流星的坐标
            meteorArr[n] = new MeteorRain(n);
            meteorArr[n].init(n);
          }
        }
        // console.log(METEOR_COUNT);
        // clearTimeout(playMeteorTimeout);
        // playMeteorTimeout = setTimeout(playMeteor, 5);
      }

      // 初始化
      init();
    }());
  },
};
</script>

<style lang="less">
.map_wrap{
  width: 800px;
  height: 600px;
  position: relative;
  // svg{
  //   width: 100%;
  //   height: 100%;
  // }

  >canvas{
    position: absolute;
    left: 0;
  }
  #green {
    /* Keyword values */
    // transform: none;

    // transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
    // transform: translate(12px, 50%);
    // transform: translateX(2em);
    // transform: translateY(3in);
    // transform: scale(2, 0.5);
    // transform: scaleX(2);
    // transform: scaleY(0.5);
    // transform: rotate(0.5turn);
    // transform: skew(30deg, 20deg);
    // transform: skewX(30deg);
    // transform: skewY(1.07rad);
    // transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
    // transform: translate3d(12px, 50%, 3em);
    // transform: translateZ(2px);
    // transform: scale3d(2.5, 1.2, 0.3);
    // transform: scaleZ(0.3);
    // transform: rotate3d(1, 2.0, 3.0, 10deg);
    // transform: rotateX(10deg);
    // transform: rotateY(10deg);
    // transform: rotateZ(10deg);
    // transform: perspective(17px);

    // transform: translateX(10px) rotate(10deg) translateY(5px);

    // transform: inherit;
    // transform: initial;
    // transform: unset;


    position: absolute;

    width: 2rem;
    height: 2rem;
    background: green;
  }
  #svgtest{
    position: absolute;
    left: 0;
    top:0;
  }
  #test3d{
    perspective: 800px;
    >div{
      width: 80px;
      height: 80px;
      background-color: skyblue;
    }
    .rotated {
      transform: rotate3d(0, 1, 0, 60deg);
      background-color: pink;
    }
  }
}

/* Shorthand classes for different perspective values */
.pers250 {
  perspective: 250px;
}

.pers350 {
  perspective: 350px;
}

.pers500 {
  perspective: 500px;
}

.pers650 {
  perspective: 650px;
}

/* Define the container div, the cube div, and a generic face */
.container {
  width: 200px;
  height: 200px;
  margin: 75px 0 0 75px;
  border: none;
}

.cube {
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  perspective-origin: 150% 150%;
  transform-style: preserve-3d;
}

.face {
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  border: none;
  line-height: 100px;
  font-family: sans-serif;
  font-size: 60px;
  color: white;
  text-align: center;
}

/* Define each face based on direction */
.front {
  background: rgba(0, 0, 0, 0.3);
  transform: translateZ(50px);
}

.back {
  background: rgba(0, 255, 0, 1);
  color: black;
  transform: rotateY(180deg) translateZ(50px);
}

.right {
  background: rgba(196, 0, 0, 0.7);
  transform: rotateY(90deg) translateZ(50px);
}

.left {
  background: rgba(0, 0, 196, 0.7);
  transform: rotateY(-90deg) translateZ(50px);
}

.top {
  background: rgba(196, 196, 0, 0.7);
  transform: rotateX(90deg) translateZ(50px);
}

.bottom {
  background: rgba(196, 0, 196, 0.7);
  transform: rotateX(-90deg) translateZ(50px);
}

/* Make the table a little nicer */
th, p, td {
  background-color: #EEEEEE;
  padding: 10px;
  font-family: sans-serif;
  text-align: left;
}

</style>
