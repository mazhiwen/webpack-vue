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


// import moon1024 from 'images/time.jpg';
import earthatmos2048 from './earth_atmos_2048.jpg';
import earthspecular2048 from './earth_specular_2048.jpg';

import earthnormal2048 from './earth_normal_2048.jpg';
import moon1024 from './moon_1024.jpg';
import jpg1 from './jpg1.png';
import jpg2 from './jpg2.png';
import jpg3 from './jpg3.png';
import jpg4 from './jpg4.png';
import jpg5 from './jpg5.png';
import jpg6 from './jpg6.png';
import jpg7 from './jpg7.png';
import jpg9 from './jpg9.png';
import jpg10 from './jpg10.png';
import jpg11 from './jpg11.png';
import uv_grid_opengl from './uv_grid_opengl.jpg';

export default {
  data() {
    return {
    };
  },
  created() {

  },
  mounted() {
    let gui;

    let camera; let scene; let renderer; let
      labelRenderer;
    let earth;
    const layers = {

      'Toggle Name': function () {
        camera.layers.toggle(0);
      },
      'Toggle Mass': function () {
        camera.layers.toggle(1);
      },
      'Enable All': function () {
        camera.layers.enableAll();
      },

      'Disable All': function () {
        camera.layers.disableAll();
      },

    };

    const clock = new THREE.Clock();
    const textureLoader = new THREE.TextureLoader();


    let moon;


    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    const earthAnimateStatus = 'toNear';
    function animate() {
      requestAnimationFrame(animate);

      // const elapsed = clock.getElapsedTime();

      // moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
      // camera.position.set(0, 5.5, 15);

      // 远近效果
      // if (earth.position.z >= 2) {
      //   earthAnimateStatus = 'toFar';
      // } else if (earth.position.z <= 0) {
      //   earthAnimateStatus = 'toNear';
      // }
      // earth.rotation.y -= 0.01;
      // if (earthAnimateStatus === 'toNear') {
      //   earth.position.y += 0.01;
      //   earth.position.z += 0.01;
      // } else {
      //   earth.position.y -= 0.01;
      //   earth.position.z -= 0.01;
      // }

      renderer.render(scene, camera);
      // labelRenderer.render(scene, camera);
    }

    //

    function initGui() {
      gui = new GUI();

      gui.add(layers, 'Toggle Name');
      gui.add(layers, 'Toggle Mass');
      gui.add(layers, 'Enable All');
      gui.add(layers, 'Disable All');
    }
    function render() {
      renderer.render(scene, camera);
    }
    function init() {
      const EARTH_RADIUS = 12;
      const MOON_RADIUS = 0.27;

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
      // camera.position.set(10, 5, 20);
      camera.position.set(0, 5.5, 15);
      camera.layers.enableAll();
      camera.layers.toggle(1);

      scene = new THREE.Scene();

      // 环境光
      const ambient = new THREE.AmbientLight(0xffffff);
      scene.add(ambient);
      // 摄像光
      // const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      // dirLight.position.set(0, 0, 1);
      // dirLight.layers.enableAll();
      // scene.add(dirLight);
      // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
      // 在平面物体上 x,y是以平面为准
      const axesHelper = new THREE.AxesHelper(10);
      axesHelper.layers.enableAll();
      scene.add(axesHelper);

      //

      const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 32, 0, Math.PI * 2, 0.7, Math.PI);
      const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        // map: textureLoader.load(earthatmos2048),
        map: textureLoader.load(jpg10),
        specularMap: textureLoader.load(earthspecular2048),
        normalMap: textureLoader.load(earthnormal2048),
        normalScale: new THREE.Vector2(0.85, 0.85),
      });
      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.position.set(0, -8.7, 0);
      // earth.rotateX(0.5);
      scene.add(earth);

      // const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
      // const moonMaterial = new THREE.MeshPhongMaterial({
      //   shininess: 5,
      //   map: textureLoader.load(moon1024),
      // });
      // moon = new THREE.Mesh(moonGeometry, moonMaterial);
      // scene.add(moon);

      // 盘子面

      const geometry = new THREE.CircleGeometry(7.5, 32);
      const circleMap = new THREE.TextureLoader().load(jpg11);
      // THREE.RepeatWrapping
      // THREE.ClampToEdgeWrapping
      // THREE.MirroredRepeatWrapping

      circleMap.wrapS = THREE.RepeatWrapping;
      circleMap.wrapT = THREE.RepeatWrapping;
      circleMap.anisotropy = 16;
      const material = new THREE.MeshBasicMaterial({
        // color: 0xffff00,
        map: circleMap,
      });
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(0, 9.2, 0);
      circle.rotateX(-3.14 / 2);
      earth.add(circle);

      // 盘子上的物体
      // const map = new THREE.TextureLoader().load(jpg1);
      const spriteSize = 3.5;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load(jpg1) }));
      sprite.scale.set(spriteSize, spriteSize, 0);
      sprite.position.set(0, 5, spriteSize / 2);
      circle.add(sprite);

      const sprite2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load(jpg2) }));
      sprite2.scale.set(spriteSize, spriteSize, 0);
      sprite2.position.set(5, 0, spriteSize / 2);
      circle.add(sprite2);

      const sprite3 = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load(jpg7) }));
      sprite3.scale.set(spriteSize, spriteSize, 0);
      sprite3.position.set(-5, 0, spriteSize / 2);
      circle.add(sprite3);

      const sprite4 = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load(jpg5) }));
      sprite4.scale.set(spriteSize, spriteSize, 0);
      sprite4.position.set(0, -5, spriteSize / 2);
      circle.add(sprite4);


      // /
      earth.layers.enableAll();
      // moon.layers.enableAll();

      // const earthDiv = document.createElement('div');
      // earthDiv.className = 'label';
      // earthDiv.textContent = 'Earth';
      // earthDiv.style.marginTop = '-1em';
      // const earthLabel = new CSS2DObject(earthDiv);
      // earthLabel.position.set(0, EARTH_RADIUS, 0);
      // earth.add(earthLabel);
      // earthLabel.layers.set(0);

      // const earthMassDiv = document.createElement('div');
      // earthMassDiv.className = 'label';
      // earthMassDiv.textContent = '5.97237e24 kg';
      // earthMassDiv.style.marginTop = '-1em';
      // const earthMassLabel = new CSS2DObject(earthMassDiv);
      // earthMassLabel.position.set(0, -2 * EARTH_RADIUS, 0);
      // earth.add(earthMassLabel);
      // earthMassLabel.layers.set(1);

      // const moonDiv = document.createElement('div');
      // moonDiv.className = 'label';
      // moonDiv.textContent = 'Moon';
      // moonDiv.style.marginTop = '-1em';
      // const moonLabel = new CSS2DObject(moonDiv);
      // moonLabel.position.set(0, MOON_RADIUS, 0);
      // moon.add(moonLabel);
      // moonLabel.layers.set(0);

      // const moonMassDiv = document.createElement('div');
      // moonMassDiv.className = 'label';
      // moonMassDiv.textContent = '7.342e22 kg';
      // moonMassDiv.style.marginTop = '-1em';
      // const moonMassLabel = new CSS2DObject(moonMassDiv);
      // moonMassLabel.position.set(0, -2 * MOON_RADIUS, 0);
      // moon.add(moonMassLabel);
      // moonMassLabel.layers.set(1);

      //
      const width = 1100;
      const height = 700;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 1);
      // tone mapping 色调映射
      renderer.toneMapping = THREE.NoToneMapping;
      // 纹理编码
      renderer.outputEncoding = THREE.BasicDepthPacking;
      document.getElementById('testbox').appendChild(renderer.domElement);

      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(width, height);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      document.getElementById('testbox').appendChild(labelRenderer.domElement);

      const controls = new OrbitControls(camera, labelRenderer.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 100;
      controls.addEventListener('change', render);
      // renderer.render(scene, camera);
      // window.addEventListener('resize', onWindowResize);

      // initGui();
    }
    init();
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
