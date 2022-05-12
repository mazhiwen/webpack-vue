<template>
  <div class="map_wrap">
    222
  </div>
</template>

<script>


import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';


import earthatmos2048 from './earth_atmos_2048.jpg';
import earthspecular2048 from './earth_specular_2048.jpg';

import earthnormal2048 from './earth_normal_2048.jpg';
// import earthatmos2048 from './earth_atmos_2048.jpg';

// console.log(earthatmos2048);

const testimg = 'https://github.com/mrdoob/three.js/blob/master/examples/textures/planets/earth_atmos_2048.jpg';

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

    textureLoader.load(testimg, (texture) => {
      // in this example we create the material when the texture is loaded
      console.log(11, texture);
    },

    // onProgress callback currently not supported
    undefined,

    // onError callback
    (err) => {
      console.error('An error happened.', err);
    });
    let moon;


    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }


    function animate() {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }

    //

    function initGui() {
      gui = new GUI();

      gui.add(layers, 'Toggle Name');
      gui.add(layers, 'Toggle Mass');
      gui.add(layers, 'Enable All');
      gui.add(layers, 'Disable All');
    }

    function init() {
      const EARTH_RADIUS = 1;
      const MOON_RADIUS = 0.27;

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(10, 5, 20);
      camera.layers.enableAll();
      camera.layers.toggle(1);

      scene = new THREE.Scene();

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(0, 0, 1);
      dirLight.layers.enableAll();
      scene.add(dirLight);

      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.layers.enableAll();
      scene.add(axesHelper);

      //

      const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
      const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fharmonyos.oss-cn-beijing.aliyuncs.com%2Fimages%2F202107%2F851342d26bceccf9c9c7820764a501f3cd6a29.png%3Fx-oss-process%3Dimage%2Fresize%2Cw_1158%2Ch_261&refer=http%3A%2F%2Fharmonyos.oss-cn-beijing.aliyuncs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654939482&t=74bcf34c209f74784cddb225810e58db'),
        // specularMap: textureLoader.load('./earth_specular_2048.jpg'),
        // normalMap: textureLoader.load('./earth_normal_2048.jpg'),
        specularMap: textureLoader.load(testimg),
        normalMap: textureLoader.load(testimg),
        normalScale: new THREE.Vector2(0.85, 0.85),
      });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
      const moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        // map: textureLoader.load('./moon_1024.jpg'),
        map: textureLoader.load(testimg),
      });
      moon = new THREE.Mesh(moonGeometry, moonMaterial);
      scene.add(moon);

      //

      earth.layers.enableAll();
      moon.layers.enableAll();

      const earthDiv = document.createElement('div');
      earthDiv.className = 'label';
      earthDiv.textContent = 'Earth';
      earthDiv.style.marginTop = '-1em';
      const earthLabel = new CSS2DObject(earthDiv);
      earthLabel.position.set(0, EARTH_RADIUS, 0);
      earth.add(earthLabel);
      earthLabel.layers.set(0);

      const earthMassDiv = document.createElement('div');
      earthMassDiv.className = 'label';
      earthMassDiv.textContent = '5.97237e24 kg';
      earthMassDiv.style.marginTop = '-1em';
      const earthMassLabel = new CSS2DObject(earthMassDiv);
      earthMassLabel.position.set(0, -2 * EARTH_RADIUS, 0);
      earth.add(earthMassLabel);
      earthMassLabel.layers.set(1);

      const moonDiv = document.createElement('div');
      moonDiv.className = 'label';
      moonDiv.textContent = 'Moon';
      moonDiv.style.marginTop = '-1em';
      const moonLabel = new CSS2DObject(moonDiv);
      moonLabel.position.set(0, MOON_RADIUS, 0);
      moon.add(moonLabel);
      moonLabel.layers.set(0);

      const moonMassDiv = document.createElement('div');
      moonMassDiv.className = 'label';
      moonMassDiv.textContent = '7.342e22 kg';
      moonMassDiv.style.marginTop = '-1em';
      const moonMassLabel = new CSS2DObject(moonMassDiv);
      moonMassLabel.position.set(0, -2 * MOON_RADIUS, 0);
      moon.add(moonMassLabel);
      moonMassLabel.layers.set(1);

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      document.body.appendChild(labelRenderer.domElement);

      const controls = new OrbitControls(camera, labelRenderer.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 100;

      //

      window.addEventListener('resize', onWindowResize);

      initGui();
    }
    init();
    animate();
  },
};
</script>

<style lang="less">
.map_wrap{

}
</style>
