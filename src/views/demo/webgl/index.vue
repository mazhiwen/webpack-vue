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

    let earthAnimateStatus = 'toNear';
    function animate() {
      requestAnimationFrame(animate);

      // const elapsed = clock.getElapsedTime();

      // moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
      // camera.position.set(0, 5.5, 15);


      if (earth.position.z >= 2) {
        earthAnimateStatus = 'toFar';
      } else if (earth.position.z <= 0) {
        earthAnimateStatus = 'toNear';
      }
      earth.rotation.y -= 0.01;
      if (earthAnimateStatus === 'toNear') {
        earth.position.y += 0.01;
        earth.position.z += 0.01;
      } else {
        earth.position.y -= 0.01;
        earth.position.z -= 0.01;
      }

      console.log('z', earth.position.z);
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

      const axesHelper = new THREE.AxesHelper(10);
      axesHelper.layers.enableAll();
      scene.add(axesHelper);

      //

      const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 16, 0, Math.PI * 2, 0.7, Math.PI);
      const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load(earthatmos2048),
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
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(0, 0.5, 0);
      circle.rotateX(-3.14 / 2);
      scene.add(circle);

      //

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

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setClearColor(0xb9d3ff, 1);
      document.getElementById('testbox').appendChild(renderer.domElement);

      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(width, height);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      document.getElementById('testbox').appendChild(labelRenderer.domElement);

      const controls = new OrbitControls(camera, labelRenderer.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 100;

      // renderer.render(scene, camera);
      // window.addEventListener('resize', onWindowResize);

      // initGui();
    }
    init();
    // animate();
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
