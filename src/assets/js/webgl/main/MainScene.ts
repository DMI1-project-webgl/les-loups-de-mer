import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import Cube from './Cube'
import Duck from './Duck'
import { AmbientLight } from 'three'
import type BasicObject3D from '../core/BasicObject3D'

export default class MainScene extends BasicScene {

    private cursor: Cursor = { x: 0 , y: 0 }

    constructor (canvas: HTMLCanvasElement) {
        super(canvas)
    
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
    
    init () {
        const cube: BasicObject3D = new Cube(1,1,1, 0x00ff00)
        cube.position.set(-1, 0, 0)
        this.add(cube)
        this.models.push(cube)

        const duck: BasicObject3D = new Duck()
        duck.position.set(1, 0, 0)
        this.add(duck)
        this.models.push(duck)

        const ambient = new AmbientLight(0xFFFFFF, 1000)
        this.add(ambient)
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