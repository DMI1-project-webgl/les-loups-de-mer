import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import FioleBouillon from './object/FioleBouillon'
import PotDepices from './object/PotDepices'
import PotDhuile from './object/PotDhuile'
import { Color, Object3D } from 'three'

export default class MainScene extends BasicScene {

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

        const fioleBouillon = new FioleBouillon(this.loader.getAsset('SCN1_FioleBouillon_v1') as Object3D)
        fioleBouillon.applyMaterials(this.materials)
        fioleBouillon.position.set(0,0.9,0)
        this.add(fioleBouillon)
        this.models.push(fioleBouillon)

        const potDepices = new PotDepices(this.loader.getAsset('SCN1_PotDepices_v2') as Object3D)
        potDepices.applyMaterials(this.materials)
        potDepices.position.set(-0.7,0,0)
        this.add(potDepices)
        this.models.push(potDepices)

        const potDhuile = new PotDhuile(this.loader.getAsset('SCN1_PotDhuile_v1') as Object3D)
        potDhuile.applyMaterials(this.materials)
        potDhuile.position.set(0.7,0,0)
        this.add(potDhuile)
        this.models.push(potDhuile)
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