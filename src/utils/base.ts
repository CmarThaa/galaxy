import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Base {
  width: number
  height: number
  classId!: string
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  controls!: OrbitControls

  constructor(widthRatio?: number, heightRatio?: number, classId?: string) {
    this.width = widthRatio ? window.innerWidth * widthRatio : window.innerWidth
    this.height = heightRatio ? window.innerHeight * heightRatio : window.innerHeight
    this.classId = classId || ""
    this.initRenderer()
    this.initScene()
    this.initCamera()
    // this.initLight()
    this.initControls()
    this.render()
  }
  // 创建渲染器
  initRenderer() {
    const renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(this.width, this.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.domElement.className = this.classId
    const oldCanvas = document.querySelector(`canvas.${this.classId}`)
    if (oldCanvas) {
      oldCanvas.remove()
    }
    document.body.appendChild(renderer.domElement)
  }
  // 创建场景
  initScene() {
    this.scene = new THREE.Scene()
  }
  // 创建相机
  initCamera() {
    const camera = this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100)
    camera.position.set(15, 15, 15)
    camera.lookAt(0, 0, 0)
  }
  // 创建光源 - 环境光   不能用来投射阴影，因为它没有方向。
  initLight(color = 0xdccccc) {
    const ambientLight = new THREE.AmbientLight(color)
    this.scene.add(ambientLight)
  }
  // 轨道控制器
  initControls() {
    const { renderer, camera } = this
    this.controls = new OrbitControls(camera, renderer.domElement)
    this.controls.target = new THREE.Vector3(0, 0, 0)
    this.controls.enableZoom = true
    this.controls.rotateSpeed = 1  // default 1
  }
  // 渲染
  render() {
    const { renderer, scene, camera } = this
    this.controls.update()
    renderer.clear()
    renderer.render(scene, camera)
    window.requestAnimationFrame(() => {
      this.render()
    })
  }
}