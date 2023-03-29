<template>
  <div class="map_wrap">
    <div id="testbox" />
  </div>
</template>

<script>


import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

import { Line2 } from 'three/examples/jsm/lines/Line2';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
// import noise from './a.glsl';


import jpg4 from './jpg4.png';


const noise = `
//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}`;

let pointsg;
let curve3;
let matLineMaterial;

let geometryg;
const positions = [];

function getQuadraticBezierCurve3() {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(200, 0, 0),
    new THREE.Vector3(100, 120, 100),
    new THREE.Vector3(0, 0, 200),
  );

  // points.spli
  const colors = [];

  const point = new THREE.Vector3();
  const color = new THREE.Color(0xffff00);

  for (let i = 0; i < 28; i++) {
    const t = i / 28;
    curve.getPoint(i / 28, point);
    positions.push(point.x, point.y, point.z);
    // h — 色相值处于0到1之间。hue value between 0.0 and 1.0
    // s — 饱和度值处于0到1之间。
    // l — 亮度值处于0到1之间。
    // color.setStyle(255, 255, 0, t);
    // colors.push(t * color.r, t * color.g, t * color.b);
    colors.push(255, 0, 0);
  }

  geometryg = new LineGeometry();
  geometryg.setPositions(positions);
  geometryg.setColors(colors);
  // geometryg.setDrawRange(0, 10);

  const vertexShader = /* glsl */`

    // attribute float size;
    // attribute vec3 position2;
    // uniform float val;
    void main() {
      // vec3 vPos;
      // 变动的val值引导顶点位置的迁移
      // vPos.x = position.x * val + position2.x * (1. - val);
      // vPos.y = position.y * val + position2.y * (1. - val);
      // vPos.z = position.z * val + position2.z * (1. - val);
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      // gl_PointSize = 4.;
      gl_Position = projectionMatrix * mvPosition;
    }


  `;

  const fragmentShader = /* glsl */`
    uniform vec3 color;
    // uniform sampler2D texture;
    void main() 
        gl_FragColor = vec4( color, 1.0 );
        // pc_FragColor = vec4( color, 1.0 );
        // 顶点颜色应用上2D纹理
        // gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
    }
  `;


  matLineMaterial = new LineMaterial({
    vertexColors: true,
    linewidth: 10,
    // uniforms: {
    //   // resolution: {},
    //   resolution: { value: new THREE.Vector2(1366, 668) },
    //   linewidth: {
    //     value: 8,
    //   },
    //   opacity: {
    //     value: 1,
    //   },
    //   // 顶点颜色
    //   diffuse: {
    //     type: 'v3',
    //     value: new THREE.Color(0xff0000),
    //   },
    //   val: {
    //     value: 1.0,
    //   },
    // },
    // vertexShader,
    // fragmentShader,
    resolution: new THREE.Vector2(1366, 668),
    dashed: true,
    alphaToCoverage: true,
    dashScale: 0.1,
    dashSize: 40,
    gapSize: 40,
    // blending: THREE.AdditiveBlending,
    // depthTest: true,
    // depthWrite: true,
    transparent: true,
    opacity: 1,
    // side: THREE.DoubleSide,

  });
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const tex = new THREE.CanvasTexture(canvas);

  const u = {
    globalBloom: { value: 0 },
    iTime: { value: 0 },
    iTexture: { value: tex },
  };


  const line = new Line2(geometryg, matLineMaterial);
  line.computeLineDistances();
  line.scale.set(1, 1, 1);
  return line;
}


// console.log(jpg4);
export default {
  data() {
    return {
      // pointsg,
    };
  },
  created() {

  },
  mounted() {
    /**
     * 创建渲染器对象
     */
    const width = 1366; // 窗口宽度
    const height = 668; // 窗口高度
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);// 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    document.getElementById('testbox').appendChild(renderer.domElement);
    /**
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();


    curve3 = getQuadraticBezierCurve3();
    // matLineMaterial.resolution.set(width, height); // resolution of the inset viewport
    scene.add(curve3);
    /**
     * 光源设置
     */
    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(100, 150, 130); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 其他
     */
    scene.add(new THREE.AxesHelper(200));
    /**
     * 相机设置
     */

    const k = width / height; // 窗口宽高比
    const s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); // 设置相机位置
    camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

    // 执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);
    /**
     * 控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    //  定时动画
    const clock = new THREE.Clock();
    let t = 0;
    const lastt = t;
    const c = 1;
    function render() {
      const delta = clock.getDelta();
      // const time = clock.getElapsedTime();
      t += delta;
      // geometryg.setPositions(positions.slice(0, (Math.floor(Math.abs(Math.sin(t)) * 18) + 3) * 3));
      // console.log((Math.floor(Math.abs(Math.sin(t)) * 18) + 1) * 3);
      // console.log(t);
      if (matLineMaterial.dashSize >= 40) {
        matLineMaterial.dashSize -= 0.1;
      } else {
        matLineMaterial.dashSize += 0.1;
      }
      // resolution: new THREE.Vector2(1366, 668)
      // renderer.setScissorTest(true);
      renderer.clearDepth();
      renderer.render(scene, camera);
    }
    function animate() {
      // requestAnimationFrame(animate);
      // console.log(matLineMaterial.dashSize);
      render();
    }
    // 入口方法
    animate();
  },
};
</script>

<style lang="less">
.map_wrap{
  .label {
    color: #FFF;
    font-family: sans-serif;
    padding: 2px;
    background: rgba( 0, 0, 0, .6 );
  }
}
</style>
