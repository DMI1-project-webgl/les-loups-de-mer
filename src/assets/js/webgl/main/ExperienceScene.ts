import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { Clock, Color, Mesh, Object3D, Raycaster, ShaderMaterial, Vector2 } from 'three'
import EnvironementSphere from './object/EnvironmentSphere'
import MainFish from './fish/MainFish'
import Vegetation from './object/Vegetation'
import Trash from './object/Trash'
import Shark from './object/Shark'

export default class ExperienceScene extends BasicScene {

    private cursor: Cursor = { x: 0 , y: 0 }
    private materials: MaterialFactory

    private sphere: EnvironementSphere = null
    private _clock: Clock = new Clock()

    private mainFish: MainFish

    private period: number
    private pointer: Vector2
    private raycaster: Raycaster
    private vegetation!: Vegetation

    constructor (app:BasicApp, canvas: HTMLCanvasElement, signal: Signal) {
        super(app, canvas, signal)

        this.materials = new MaterialFactory(this)
    
        window.addEventListener('mousemove', this.onMouseMove)
    }

    get sphereMaterial(): ShaderMaterial {
        return (this.sphere.children[0] as Mesh).material as ShaderMaterial
    }
    
    bind () {
        super.bind()
    
        this.onMouseMove = this.onMouseMove.bind(this)
    }

    init () {
        this.background = this.materials.getEnv('main')
        this.background = new Color(0x0085DE)

        const sphere = new EnvironementSphere()
        this.add(sphere)
        this.models.push(sphere)
        this.sphere = sphere

        this.mainFish = new MainFish(this.renderer, this)

        const can = new Trash(this.loader.getAsset('SCN2_Can_v1') as Object3D)
        can.applyMaterials(this.materials)
        can.position.set(0.5,0,0)
        this.add(can)
        this.models.push(can)

        const drink = new Trash(this.loader.getAsset('SCN2_Drink_v3') as Object3D)
        drink.applyMaterials(this.materials)
        drink.position.set(6,0,0)
        this.add(drink)
        this.models.push(drink)

        const toothbrush = new Trash(this.loader.getAsset('SCN2_ToothBrush_v1') as Object3D)
        toothbrush.applyMaterials(this.materials)
        toothbrush.position.set(15,0,0)
        this.add(toothbrush)
        this.models.push(toothbrush)

        const bottle = new Trash(this.loader.getAsset('SCN2_Bottle_v3') as Object3D)
        bottle.applyMaterials(this.materials)
        bottle.position.set(10,0,0)
        this.add(bottle)
        this.models.push(bottle)

        const shark = new Shark(this.loader.getAsset('SCN0_Shark_v4') as Object3D)
        shark.applyMaterials(this.materials)
        shark.position.set(20,0,0)
        this.add(shark)
        this.models.push(shark)

        this.period = 10
        this.raycaster = new Raycaster();
        this.pointer = new Vector2();
        this.vegetation = new Vegetation(this);
    }
    
    onMouseMove (event: MouseEvent) {
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = event.clientY / this.sizes.height - 0.5
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
    
    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(0, 0, 250)
        this.camera.lookAt(0, 0, 0)
    }

    onSignal (slug: Array<string|number>) {
        // super.onSignal(slug) 

        switch (slug[0]) {
            case 'route-clean':
                // ...
                break
            case 'route-greenery':
                // ...
                break
            default:
        }
    }
    
    onResize () {
        super.onResize()
    }
    
    update () {
        // Making sphere shader animation
        if (this.sphere) {
            this.sphereMaterial.uniforms.uTime.value = this._clock.getElapsedTime()
        }

        if (this.sphere) {
            this.mainFish.render(this.cursor.x,this.cursor.y)
        }

        this.models.forEach((model) => {
          model.update(this.deltaTime)
        })


        if (this.raycaster) {
            this.raycaster.setFromCamera( this.pointer, this.camera );

            const intersects = this.raycaster.intersectObjects(this.vegetation.childrensArray, false);

            for ( let i = 0; i < intersects.length; i ++ ) {
                intersects[ i ].object.scale.set(0.001, 0.001, Math.min(0.015, intersects[ i ].object.scale.z + 0.0015));

            }
        }
        
    }
    
    destroy () {
        super.destroy()
    }
}