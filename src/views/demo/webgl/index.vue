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


export default {
  data() {
    return {
    };
  },
  created() {

  },
  mounted() {
    /**
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();


    /**
 * 创建网格模型，并给模型的几何体设置多个变形目标
 */
    // 创建一个几何体具有8个顶点
    const geometry = new THREE.BufferGeometry();
    geometry.attributes.position = new THREE.BufferAttribute(
      new Float32Array([
        0, 0, 0, // 顶点1坐标
        50, 0, 0, // 顶点2坐标
        0, 100, 0, // 顶点3坐标
        0, 0, 10, // 顶点4坐标
        0, 0, 100, // 顶点5坐标
        50, 0, 10, // 顶点6坐标
      ]),
      3,
    );
    // const geometry = new THREE.BufferGeometry(); // 立方体几何对象
    // console.log(box.attributes.position.array.toString());


    // geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(spherePositions, 3);
    // geometry.morphAttributes.position[0] = box1.attributes.position;

    // 为geometry提供变形目标的数据

    const material = new THREE.MeshLambertMaterial({
      morphTargets: true, // 允许变形
      color: 0x0000ff,
    }); // 材质对象
    const mesh = new THREE.Mesh(geometry, material); // 网格模型对象
    // mesh.morphTargetInfluences = [0.5, 1];
    // const Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0, 10, 20], [0, 1, 0]);
    // // 设置变形目标2对应权重随着时间的变化
    // const Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20, 30, 40], [0, 1, 0]);
    // // 创建一个剪辑clip对象，命名"default"，持续时间40
    // const clip = new THREE.AnimationClip('default', 40, [Track1, Track2]);
    // const mixer = new THREE.AnimationMixer(mesh); // 创建混合器
    // const AnimationAction = mixer.clipAction(clip); // 返回动画操作对象
    // AnimationAction.timeScale = 5; // 默认1，可以调节播放速度
    // // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    // // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
    // AnimationAction.play(); // 开始播放
    scene.add(mesh); // 网格模型添加到场景中
    /**
     * 光源设置
     */
    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 其他
     */
    scene.add(new THREE.AxesHelper(100));
    /**
     * 相机设置
     */
    const width = window.innerWidth; // 窗口宽度
    const height = window.innerHeight; // 窗口高度
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

    const clock = new THREE.Clock();
    let t = 0;
    function render() {
      const delta = clock.getDelta();
      // const time = clock.getElapsedTime();

      // line.rotation.x = time * 0.25;
      // line.rotation.y = time * 0.5;

      t += delta * 0.5;
      // mesh.morphTargetInfluences[0] = 1;
      // mesh.morphTargetInfluences[1] = Math.abs(Math.sin(t));


      renderer.render(scene, camera);
    }
    function animate() {
      requestAnimationFrame(animate);

      render();
    }
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
