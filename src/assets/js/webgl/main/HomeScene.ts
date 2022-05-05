import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import FioleBouillon from './object/FioleBouillon'
import PotDepices from './object/PotDepices'
import PotDhuile from './object/PotDhuile'
import { Color, Object3D } from 'three'

export default class HomeScene extends BasicScene {

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

        /* const fioleBouillon = new FioleBouillon(this.loader.getAsset('SCN1_FioleBouillon_v1') as Object3D)
        fioleBouillon.applyMaterials(this.materials)
        fioleBouillon.position.set(0,0.9,0)
        this.add(fioleBouillon)
        this.models.push(fioleBouillon) */

        const potDepices = new PotDepices(this.loader.getAsset('SCN1_PotDepices_v2') as Object3D)
        potDepices.applyMaterials(this.materials)
        potDepices.position.set(-5,0,0)
        this.add(potDepices)
        this.models.push(potDepices)

        const potDhuile = new PotDhuile(this.loader.getAsset('SCN2_Drink_V2') as Object3D)
        potDhuile.applyMaterials(this.materials)
        potDhuile.position.set(-2,0,0)
        this.add(potDhuile)
        this.models.push(potDhuile)

        const can = new PotDhuile(this.loader.getAsset('SCN2_Can') as Object3D)
        can.applyMaterials(this.materials)
        can.position.set(0.5,0,0)
        this.add(can)
        this.models.push(can)

        const poubelle = new PotDhuile(this.loader.getAsset('SCN2_PlasticBag_v3') as Object3D)
        poubelle.applyMaterials(this.materials)
        poubelle.position.set(6,0,0)
        this.add(poubelle)
        this.models.push(poubelle)

        const bottle = new PotDhuile(this.loader.getAsset('SCN2_Bottle_v3') as Object3D)
        bottle.applyMaterials(this.materials)
        bottle.position.set(3,0,0)
        this.add(bottle)
        this.models.push(bottle)
    }
    
    onMouseMove (event: MouseEvent) {
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = event.clientY / this.sizes.height - 0.5
    }
    
    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(0, 0, 10)
    }

    onSignal (slug: Array<string|number>) {
        // super.onSignal(slug) 

        switch (slug[0]) {
            case 'route-home':
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