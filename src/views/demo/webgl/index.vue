<template>
  <div class="map_wrap">
    <div id="testbox" />
  </div>
</template>

<script>


// import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

// import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
// import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

// import { Line2 } from 'three/examples/jsm/lines/Line2';

// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
// // import noise from './a.glsl';


// import jpg4 from './jpg4.png';

// import './styles.css';
import {
  Clock,
  Color,
  PerspectiveCamera,
  ReinhardToneMapping,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tetrahedra } from './Tetrahedra';
import { Postprocessing } from './Postprocessing';


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
    const bg = {
      on: 0x321632,
      off: 0x000000,
    };
    const scene = new Scene();
    scene.background = new Color(bg.on);
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(0, 0, 100);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = ReinhardToneMapping;
    document.getElementById('testbox').appendChild(renderer.domElement);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotate = true;

    const gu = {
      globalBloom: { value: 0 },
    };

    const tetraCount = 200;
    const tetrahedra = new Tetrahedra(tetraCount, gu);
    tetrahedra.material.linewidth = 0.25;
    tetrahedra.items.forEach((t, i) => {
      t.position
        .randomDirection()
        .setLength(Math.sqrt(Math.pow(50, 2) * Math.random()));
      t.scale.setScalar(5);
      t.userData = {
        rotInit: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        },
        rotSpeed: {
          x: Math.random() * Math.PI * 0.2,
          y: Math.random() * Math.PI * 0.2,
          z: Math.random() * Math.PI * 0.2,
        },
      };
      tetrahedra.setColorAt(i, Math.random() < 0.5 ? 0xff0000 : 0x007fff);
    });
    tetrahedra.items[0].position.set(0, 0, 0);
    tetrahedra.items[0].scale.setScalar(50);
    tetrahedra.setColorAt(0, 0xff00ff);
    scene.add(tetrahedra);

    const postprocessing = new Postprocessing(scene, camera, renderer);
    window.addEventListener('resize', (event) => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      postprocessing.bloomComposer.setSize(window.innerWidth, window.innerHeight);
      postprocessing.finalComposer.setSize(window.innerWidth, window.innerHeight);
    });
    const clock = new Clock();

    renderer.setAnimationLoop((_) => {
      controls.update();
      const t = clock.getElapsedTime();
      tetrahedra.items.forEach((ti, idx) => {
        const ud = ti.userData;
        const ri = ud.rotInit;
        const rs = ud.rotSpeed;
        const dir = idx % 2 === 0 ? -1 : 1;
        ti.rotation.set(
          ri.x + rs.x * t * dir,
          ri.y + rs.y * t * dir,
          ri.z + rs.z * t * dir,
        );
      });
      tetrahedra.update();

      // postprocessing
      gu.globalBloom.value = 1;
      scene.background.set(bg.off);
      postprocessing.bloomComposer.render();
      gu.globalBloom.value = 0;
      scene.background.set(bg.on);
      postprocessing.finalComposer.render();

      // renderer.render(scene, camera);
    });
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
