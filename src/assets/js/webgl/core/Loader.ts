import { AnimationClip, CubeTexture, CubeTextureLoader, Group, LoadingManager, Object3D, Texture, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import type AssetsUrl from './InterfaceAssetsUrl'
import type Signal from "../utils/Signal"
import type Element from "./Element"

export default class Loader {
  private manifest: AssetsUrl
  private basePath: string
  private loadingManager: LoadingManager
  private assets: {
    [key: string]: Group | Texture | CubeTexture | any,
  }
  private isLoaded: Boolean
  private signal: Signal

  constructor (manifest: AssetsUrl, basePath: string, signal: Signal) {
    this.manifest = manifest
    this.basePath = basePath
    this.signal = signal
    this.loadingManager = new LoadingManager(this.onLoaded.bind(this), this.onProgress.bind(this))

    this.assets = {}
  }

  load () {
    this.isLoaded = false
    let hasAssets = false
    if (!this.isNullOrEmpty(this.manifest.models as Element[])) {
      hasAssets = true
      this.loadModels(this.manifest.models as Element[])
    }
    if (!this.isNullOrEmpty(this.manifest.textures as Element[])) {
      hasAssets = true
      this.loadTextures(this.manifest.textures as Element[])
    }

    if (!hasAssets) {
      this.onLoaded()
    }
  }

  isNullOrEmpty (arr:Array<Element>) {
    return (arr === null || arr.length === 0)
  }

  onLoaded () {
    this.isLoaded = true
    this.signal.dispatch(['loaded'])
  }

  onProgress (url:string, loaded: number, total: number) {
    const progress = loaded / total
    this.signal.dispatch(['load-on-progress', progress])
  }

  loadModels (models:Array<Element>) {
    const loader = new GLTFLoader(this.loadingManager)
    for (const model of models) {
      // const path = this.basePath + 'models/' + model
      loader.load(model.path, (gltf) => {
        this.assets[model.name] = gltf.scene
        this.assets[model.name + '-all'] = gltf
      })
    }
  }

  loadTextures (textures:Array<Element>) {
    const loader = new TextureLoader(this.loadingManager)
    for (const texture of textures) {
      // const path = this.basePath + 'textures/' + texture
      loader.load(texture.path, (tx) => {
        tx.flipY = false
        this.assets[texture.name] = tx
      })
    }
  }

  getDir (path:string) {
    return path.substring(0, path.indexOf('/'))
  }

  getName (file:string): string {
    return file.substring(0, file.lastIndexOf('.')).replace('/src/assets/js/webgl/models/', '').replace('/src/assets/js/webgl/textures/', '').replace('/assets/', '')
  }

  getAsset (name:string) {
    if (this.assets[name] != null) {
      return this.assets[name]
    }
  }

  dispose () {
    this.signal.dispose()
  }
}