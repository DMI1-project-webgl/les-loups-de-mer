import BasicApp from "../core/BasicApp";

import HomeScene from "./HomeScene";

export default class HomeApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement) {
        super(canvas)
        
        this.scene = new HomeScene(this, canvas, this.signal)
        this.scenes.push(this.scene)
    }

    getAssets () {
        return {
          models: [
            'SCN1_FioleBouillon_v1.gltf',
            'SCN1_PotDepices_v2.glb',
            'SCN1_PotDhuile_v1.gltf',
            'SCN2_Bottle_v3.gltf',
            'SCN2_Can.gltf',
            'SCN2_Drink_V2.gltf',
            'SCN2_PlasticBag_v3.gltf',
          ] as string[],
          textures: [
            'TEXTURE_SCN1_BouchonFioleBouillon.jpg',
            'TEXTURE_SCN1_BouchonPotDepice.jpg',
            'TEXTURE_SCN1_BouchonPotDhuile.jpg',
            'TEXTURE_SCN2_Metal_Roughness.jpg',
            'TEXTURE_SCN2_PlasticBag_Albedo.jpg',
            'TEXTURE_SCN2_PlasticBag_Displacement.jpg',
            'TEXTURE_SCN2_PlasticBag_Normal.jpg',
            'TEXTURE_SCN2_PlasticBag_Roughness.jpg',
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