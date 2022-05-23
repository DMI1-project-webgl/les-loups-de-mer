import BasicApp from "../core/BasicApp";
import type Signal from "../utils/Signal";

import HomeScene from "./HomeScene";

export default class HomeApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement, signal: Signal, container: HTMLElement) {
        super(canvas, signal)
        
        this.scene = new HomeScene(this, canvas, this.signal, container)
        this.scenes.push(this.scene)
    }

    getAssets () {
        return {
          models: [
            'SCN1_Broth_v3.gltf',
            'SCN1_Oil_v2.gltf',
            'SCN1_Spice_v3.gltf',
          ] as string[],
          textures: [
            'TEXTURE_SCN1_BouchonFioleBouillon.jpg',
            'TEXTURE_SCN1_BouchonPotDepice.jpg',
            'TEXTURE_SCN1_BouchonPotDhuile.jpg',
          ] as string[],
          envs: ['env'] as string[],
          hdr: [
          ] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}