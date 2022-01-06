<template>
  <div style="width: 1000px;height: 700px;margin: 0 auto" id="container"></div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
export default {
  name: "ThreeJSDom",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      model:null,
      controls:null
    };
  },
  mounted() {
    this.init();
    //this.animate();
  },
  methods: {
    init() {//初始化
      const that = this;
      let container = document.getElementById("container");
      that.scene = new THREE.Scene();//  创建场景对象Scene

      //相机
      this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
      this.camera.position.set( 5, 2, 8 );

      const loader = new GLTFLoader();
      let dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/designData/gltf/');
      loader.setDRACOLoader( dracoLoader );

      loader.load( '/designData/LittlestTokyo.glb', function ( gltf ) {
        let model = gltf.scene;
        model.position.set( 1, 1, 0 );
        model.scale.set( 0.01, 0.01, 0.01 );
        that.model = model
        that.scene.add( model );
        that.animate()
      }, undefined, function ( e ) {
        console.error('ppppppppp', e );
      } );

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true,alpha: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
      this.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.02 ).texture;
    },
    animate() {// 动画
      if (this.model){
        requestAnimationFrame(this.animate);
        /*this.model.rotation.y += 0.01;*/
        this.renderer.render(this.scene, this.camera);
      }
    }
  }
}
</script>

<style scoped>

</style>
