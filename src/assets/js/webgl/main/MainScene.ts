import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import Cube from './Cube'
import Duck from './Duck'
import { AmbientLight } from 'three'

export default class MainScene extends BasicScene {

    private cursor: Cursor = { x: 0 , y: 0 }
    private cube!: Cube
    private duck!: Duck

    constructor (canvas: HTMLCanvasElement, signal: Signal) {
        super(canvas, signal)

        this.cube = new Cube(1,1,1, 0x00ff00)
        this.addObject(this.cube)

        const ambient = new AmbientLight(0xFFFFFF, 1000)
        this.add(ambient)
    
        window.addEventListener('mousemove', this.onMouseMove)
    }
    
    bind () {
        super.bind()
    
        this.onMouseMove = this.onMouseMove.bind(this)
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

    onSignal (slug: string) {
        // super.onSignal(slug)

        switch (slug) {
            case 'route-home':
                if (!this.duck) { return }
                this.removeObject(this.duck)
                this.cube = new Cube(1,1,1, 0x00ff00)
                this.addObject(this.cube)
                break
            case 'route-about':
                if (!this.cube) { return }
                this.removeObject(this.cube)
                this.duck = new Duck()
                this.addObject(this.duck)
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