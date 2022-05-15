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
          models: [] as string[],
          textures: [] as string[],
          envs: ['env'] as string[],
          hdr: [] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}