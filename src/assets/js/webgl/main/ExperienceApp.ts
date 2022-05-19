import BasicApp from "../core/BasicApp";
import ExperienceScene from "./ExperienceScene";

export default class ExperienceApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement) {
        super(canvas)
        
        this.scene = new ExperienceScene(this, canvas, this.signal)
        this.scenes.push(this.scene)
    }

    getAssets () {
        return {
          models: [
            'SCN2_Can_v1.gltf',
            'SCN2_Drink_v3.gltf',
            'SCN2_ToothBrush_v1.gltf',
            'SCN2_Bottle_v3.gltf',
            'SCN0_Shark_v4.gltf',
            'CoralTestALONE.gltf',
            'SCN3_StarFish_v1.gltf',
          ] as string[],
          textures: [
            'TEXTURE_SCN2_Metal_Roughness.jpg',
            'TEXTURE_SCN2_PlasticSecular.jpg',
            'TEXTURE_SCN2_PlasticColor.jpg',
            'TEXTURE_SCN2_PlasticNormal.jpg',
            'TEXTURE_SCN2_PlasticRoughness.jpg',
            'TEXTURE_SCN0_SharkBeltAlpha.jpg',
            'TEXTURE_SCN3_Starfish_Color.jpg',
          ] as string[],
          envs: [] as string[],
          hdr: [] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}