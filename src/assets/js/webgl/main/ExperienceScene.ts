import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { Color } from 'three'

export default class ExperienceScene extends BasicScene {

    private cursor: Cursor = { x: 0 , y: 0 }
    private materials: MaterialFactory

    constructor (app:BasicApp, canvas: HTMLCanvasElement, signal: Signal) {
        super(app, canvas, signal)

        this.materials = new MaterialFactory(this)
    
        window.addEventListener('mousemove', this.onMouseMove)
    }
    
    bind () {
        super.bind()
    
        this.onMouseMove = this.onMouseMove.bind(this)
    }

    init () {
        this.background = this.materials.getEnv('main')
        this.background = new Color(0x111111)

        
    }
    
    onMouseMove (event: MouseEvent) {
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = event.clientY / this.sizes.height - 0.5
    }
    
    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(0, 0, 3)
    }

    onSignal (slug: Array<string|number>) {
        // super.onSignal(slug) 

        switch (slug[0]) {
            case 'route-home':
                // if (!this.duck) { return }
                // this.removeObject(this.duck)
                // this.cube = new Cube(1,1,1, 0x00ff00)
                // this.addObject(this.cube)
                break
            case 'route-about':
                // if (!this.cube) { return }
                // this.removeObject(this.cube)
                // this.duck = new Duck()
                // this.addObject(this.duck)
                break
            default:
        }
    }
    
    onResize () {
        super.onResize()
    }
    
    update () {
        this.models.forEach((model) => {
          model.update(this.deltaTime)
        })
    }
    
    destroy () {
        super.destroy()
    }
}