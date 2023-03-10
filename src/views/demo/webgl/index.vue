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

// console.log(jpg4);
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
    const geometry = new THREE.BufferGeometry(); // 声明一个空几何体对象
    // 类型数组创建顶点位置position数据
    const vertices = new Float32Array([
      0, 0, 0, // 顶点1坐标
      50, 0, 0, // 顶点2坐标
      0, 100, 0, // 顶点3坐标

      0, 0, 0, // 顶点4坐标
      0, 0, 100, // 顶点5坐标
      50, 0, 0, // 顶点6坐标

    ]);
    // 创建属性缓冲区对象
    const attribue = new THREE.BufferAttribute(vertices, 3); // 3个为一组
    // 设置几何体attributes属性的位置position属性
    geometry.attributes.position = attribue;
    const normals = new Float32Array([
      0, 0, 1, // 顶点1法向量
      0, 0, 1, // 顶点2法向量
      0, 0, 1, // 顶点3法向量

      0, 1, 0, // 顶点4法向量
      0, 1, 0, // 顶点5法向量
      0, 1, 0, // 顶点6法向量
    ]);
    // 设置几何体attributes属性的位置normal属性
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

    const material = new THREE.MeshLambertMaterial({
      morphTargets: true, // 允许变形
      color: 0x0000ff,
      // opacity: 0.7,
      // transparent: true,
      side: THREE.DoubleSide,
    }); // 材质对象
    const mesh = new THREE.Mesh(geometry, material); // 网格模型对象
    // scene.add(mesh);


    // MeshLambertMaterial
    // MeshBasicMaterial
    const geometry1 = new THREE.PlaneGeometry(204, 102);

    const textureLoader = new THREE.TextureLoader();
    // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
    textureLoader.load(jpg4, (texture) => {
      const material1 = new THREE.MeshLambertMaterial({
        morphTargets: true, // 允许变形
        // color: 0x0000ff,
        // opacity: 0.7,
        // transparent: true,
        side: THREE.DoubleSide,
        map: texture, // 设置颜色贴图属性值
      }); // 材质对象
      // geometry1.faceVertexUvs[0].forEach((elem) => {
      //   elem.forEach((Vector2) => {
      //   // 所有的UV坐标全部设置为一个值
      //     Vector2.set(0.4, 0.4);
      //   });
      // });
      const uvs = new Float32Array([
        0, 0, // 图片左下角
        1, 0, // 图片右下角
        1, 1, // 图片右上角
        0, 1, // 图片左上角
      ]);

      geometry1.attributes.uv = new THREE.BufferAttribute(uvs, 2); // 2个为一组,表示一个顶点的纹理坐标
      console.log(geometry1.attributes);
      const mesh1 = new THREE.Mesh(geometry1, material1); // 网格模型对象
      scene.add(mesh1); // 网格模型添加到场景中
    });


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
      // const time = clock.getElapsedTime();

      // line.rotation.x = time * 0.25;
      // line.rotation.y = time * 0.5;

      t += delta * 0.5;
      // mesh.morphTargetInfluences[0] = 1;
      // console.log(Math.abs(Math.sin(t)));
      // mesh.morphTargetInfluences[1] = Math.abs(Math.sin(t));


      renderer.render(scene, camera);
    }
    function animate() {
      requestAnimationFrame(animate);

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
