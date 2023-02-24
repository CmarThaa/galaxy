<script lang="ts" setup>
import Base from "@/utils/base";
import * as THREE from "three";
import bell from "@/assets/vue.svg";
// import resume from "@/assets/resume.png";
import bg1 from "@/assets/bg1.jpg";
import bg2 from "@/assets/bg2.jpg";
import bg3 from "@/assets/bg3.jpg";
// import shirtModel from "@/assets/22-t-shirt/shirt.gltf";

// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// @ts-ignore
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
class Test extends Base {
  meshGroup!: THREE.Group;
  raycaster = new THREE.Raycaster(); //这个类用于进行raycasting（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
  mouse = new THREE.Vector2(0, 0);

  constructor() {
    super(1, 1, "test");
    this.init();
    this.initEvent();
  }

  initEvent() {
    window.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("touchstart", this.onMouseDown.bind(this));
  }

  onMouseDown(e: MouseEvent | TouchEvent) {
    this.setMouseSite(e);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects([this.meshGroup]);
    console.log(
      "🚀 ~ file: App.vue:29 ~ Test ~ onMouseDown ~ intersects:",
      intersects[0]
    );
    this.meshGroup.lookAt(15, 15, 15);
  }

  setMouseSite(e: MouseEvent | TouchEvent | any) {
    const x = (e["touches"] ? e["touches"][0] : e).clientX;
    const y = (e["touches"] ? e["touches"][0] : e).clientY;
    this.mouse.x = (x / this.width - 0.5) * 2; // 坐标轴归一化
    this.mouse.y = -(y / this.height - 0.5) * 2; // 坐标轴归一化
  }

  init() {
    new RGBELoader().load("/src/assets/models/helmet/royal_esplanade_1k.hdr", (texture: THREE.Texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
    })
    // this.scene.background = new THREE.CubeTextureLoader().load([
    //   bg2,
    //   bg2,
    //   bg3,
    //   bg3,
    //   bg1,
    //   bg1,
    // ]);
    this.meshGroup = new THREE.Group();
    this.scene.add(this.meshGroup);
    const geometry = new THREE.BoxGeometry(20, 20, 1);
    const texture = new THREE.TextureLoader().load(bell);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const material = [
      new THREE.MeshBasicMaterial(),
      new THREE.MeshBasicMaterial(),
      new THREE.MeshBasicMaterial(),
      new THREE.MeshBasicMaterial(),
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshBasicMaterial({ map: texture }),
    ];

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    // this.meshGroup.add(mesh);

    const loader = new GLTFLoader();
    loader.load(
      "/src/assets/models/helmet/DamagedHelmet.gltf",
      (gltf: gltfFile) => {
        const shirt = gltf.scene;
        shirt.position.set(0, 0, 0);
        shirt.scale.set(10,10,10)
        this.meshGroup.add(shirt);
        console.log("🚀 ~ file: App.vue:80 ~ Test ~ init ~ gltf:", gltf);
        this.render()
      },
      undefined,
      function (error: any) {
        console.error(error);
      }
    );
  }
}
new Test();
</script>
<template>
  <router-view />
  <a class="cube" href="/scube">魔方游戏</a>
</template>

<style scoped>
.cube {
  position: fixed;
  right: 5%;
  top: 5%;
}
</style>
