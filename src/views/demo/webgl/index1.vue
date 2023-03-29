<template>
  <div class="map_wrap">
    <div id="testbox" />
  </div>
</template>

<script>


import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

import jpg4 from './jpg4.png';


let pointsg;
let curve3;
let curve3geometry;
function getQuadraticBezierCurve3() {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(100, 0, 0),
    new THREE.Vector3(50, 50, 50),
    new THREE.Vector3(0, 0, 100),
  );

  pointsg = curve.getPoints(50);
  curve3geometry = new THREE.BufferGeometry().setFromPoints(pointsg);

  const material = new THREE.LineBasicMaterial({
    color: 0xffff00,
    linewidth: 15,

  });
  // Create the final object to add to the scene
  const curveObject = new THREE.Line(curve3geometry, material);
  return curveObject;
}


function getCubicBezierCurve3() {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(120, 0, 0),
    new THREE.Vector3(80, 40, 40),
    new THREE.Vector3(40, 40, 80),
    new THREE.Vector3(0, 0, 120),
  );

  pointsg = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(pointsg);

  const material = new THREE.LineBasicMaterial({ color: 0x00ffff });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(geometry, material);
  return curveObject;
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
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();


    curve3 = getQuadraticBezierCurve3();

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
    const width = 1325; // 窗口宽度
    const height = 668; // 窗口高度
    const k = width / height; // 窗口宽高比
    const s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); // 设置相机位置
    camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);// 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    document.getElementById('testbox').appendChild(renderer.domElement);
    // 执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);
    /**
     * 控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    //  定时动画
    const clock = new THREE.Clock();
    let t = 0;
    function render() {
      const delta = clock.getDelta();
      t += delta * 0.5;
      // curve3geometry.setFromPoints(pointsg.slice(0, Math.floor(Math.abs(Math.sin(t)) * 50)));


      renderer.render(scene, camera);
    }
    function animate() {
      // requestAnimationFrame(animate);

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
