import BasicApp from "../core/BasicApp";
import type Signal from "../utils/Signal";
import ExperienceScene from "./ExperienceScene";

export default class ExperienceApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement, signal: Signal, container: HTMLElement = null) {
        super(canvas, signal)
        
        this.scene = new ExperienceScene(this, canvas, this.signal, container)
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
            'SCN0_Rock1_v1.glb',
          ] as string[],
          textures: [
            'TEXTURE_SCN2_Metal_Roughness.jpg',
            'TEXTURE_SCN2_PlasticSecular.jpg',
            'TEXTURE_SCN2_PlasticColor.jpg',
            'TEXTURE_SCN2_PlasticNormal.jpg',
            'TEXTURE_SCN2_PlasticRoughness.jpg',
            'TEXTURE_SCN0_SharkBeltAlpha.jpg',
            'TEXTURE_SCN3_Starfish_Color.jpg',
            'TEXTURE_SCN2_MatcapMetal.jpg',
            'TEXTURE_SCN2_MatcapPlastic.jpg',
            'TEXTURE_SCN2_MatPlaticBlue.jpeg',
            'TEXTURE_SCN2_MatcapShark.jpg',
            'TEXTURE_SCN3_MatcapGrass.png',
            'TEXTURE_SCNO_Rock.jpeg',
          ] as string[],
          envs: ['env'] as string[],
          hdr: [] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}