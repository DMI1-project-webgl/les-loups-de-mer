import { CubeTexture, CubeTextureLoader, Group, LoadingManager, Texture, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import type AssetsUrl from './InterfaceAssetsUrl'
import type Signal from "../utils/Signal"

export default class Loader {
  private manifest: AssetsUrl
  private basePath: string
  private loadingManager: LoadingManager
  private assets: {
    [key: string]: Group | Texture | CubeTexture,
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
    if (!this.isNullOrEmpty(this.manifest.models)) {
      hasAssets = true
      this.loadModels(this.manifest.models)
    }
    if (!this.isNullOrEmpty(this.manifest.textures)) {
      hasAssets = true
      this.loadTextures(this.manifest.textures)
    }
    if (!this.isNullOrEmpty(this.manifest.envs)) {
      hasAssets = true
      this.loadEnvs(this.manifest.envs)
    }
    if (!this.isNullOrEmpty(this.manifest.hdr)) {
      hasAssets = true
      this.loadHDREnv(this.manifest.hdr)
    }

    if (!hasAssets) {
      this.onLoaded()
    }
  }

  isNullOrEmpty (arr:Array<string>) {
    return (arr === null || arr.length === 0)
  }

  onLoaded () {
    this.isLoaded = true
    this.signal.dispatch(['is-loaded'])
  }

  onProgress (url:string, loaded: number, total: number) {
    const progress = loaded / total
    this.signal.dispatch(['load-on-progress', progress])
  }

  loadModels (models:Array<string>) {
    const loader = new GLTFLoader(this.loadingManager)
    for (const model of models) {
      const path = this.basePath + 'models/' + model
      loader.load(path, (gltf) => {
        this.assets[this.getName(model)] = gltf.scene
      })
    }
  }

  loadTextures (textures:Array<string>) {
    const loader = new TextureLoader(this.loadingManager)
    for (const texture of textures) {
      const path = this.basePath + 'textures/' + texture
      loader.load(path, (tx) => {
        tx.flipY = false
        this.assets[this.getName(texture)] = tx
      })
    }
  }

  loadHDREnv (envs:Array<string>) {
    const urls = ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr']
    const loader = new HDRCubeTextureLoader(this.loadingManager)
    for (const dir of envs) {
      loader.setPath(this.basePath + 'textures/' + dir + '/')
      loader.load(urls, (cubeTex) => {
        this.assets[dir] = cubeTex
      })
    }
  }

  loadEnvs (envs:Array<string>) {
    // const loader = new EXRLoader(this.loadingManager);
    // for(const env of envs){
    //     const path = "textures/" + env;
    //     loader.load(path, (texture)=>{
    //         this.assets[this.getName(env)] = texture;
    //     })
    // }

    
    const urls = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']
    const loader = new CubeTextureLoader(this.loadingManager)
    for (const dir of envs) {
      loader.setPath(this.basePath + 'textures/' + dir + '/')
      loader.load(urls, (cubeTex) => {
        this.assets[dir] = cubeTex
      })
    }
  }

  getDir (path:string) {
    return path.substring(0, path.indexOf('/'))
  }

  getName (file:string): string {
    return file.substring(0, file.lastIndexOf('.'))
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
