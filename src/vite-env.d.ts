/// <reference types="vite/client" />
declare module "@types/three"

declare interface gltfFile {
  animations: []
  asset: object
  cameras: []
  parser: any
  scene: THREE.Object3D
}