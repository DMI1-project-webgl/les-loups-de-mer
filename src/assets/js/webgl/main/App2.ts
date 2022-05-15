import BasicApp from "../core/BasicApp";
import Scene2 from "./Scene2";

export default class App2 extends BasicApp {
    constructor (canvas: HTMLCanvasElement) {
        super(canvas)
        
        this.scene = new Scene2(this, canvas, this.signal)
        this.scenes.push(this.scene)
    }

    getAssets () {
        return {
          models: [] as string[],
          textures: [] as string[],
          envs: ['env'] as string[],
          hdr: [
          ] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}