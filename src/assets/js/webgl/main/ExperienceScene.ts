import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { Clock, Color, Mesh, Raycaster, ShaderMaterial, Vector2 } from 'three'
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
    private angleCameraHorizontal = 0
    private angleCameraVertical = 0
    private mouseIsDown = false

    constructor (app:BasicApp, canvas: HTMLCanvasElement, signal: Signal) {
        super(app, canvas, signal)

        this.materials = new MaterialFactory(this)
    
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('mousedown', () => this.mouseIsDown = true)
        window.addEventListener('mouseup', () => this.mouseIsDown = false)
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
        this.background = new Color(0x002244);

        const sphere = new EnvironementSphere()
        this.add(sphere)
        this.models.push(sphere)
        this.sphere = sphere

        this.mainFish = new MainFish(this.renderer, this)

        /* const can = new Trash(this.loader.getAsset('SCN2_Can_v1') as Object3D)
        can.applyMaterials(this.materials)
        can.position.set(-120,-30,0)
        this.add(can)
        this.models.push(can)

        const drink = new Trash(this.loader.getAsset('SCN2_Drink_v3') as Object3D)
        drink.applyMaterials(this.materials)
        drink.position.set(-120,30,0)
        this.add(drink)
        this.models.push(drink)

        const toothbrush = new Trash(this.loader.getAsset('SCN2_ToothBrush_v1') as Object3D)
        toothbrush.applyMaterials(this.materials)
        toothbrush.position.set(120,30,0)
        toothbrush.rotation.set(0, 0, 30)
        this.add(toothbrush)
        this.models.push(toothbrush)

        const bottle = new Trash(this.loader.getAsset('SCN2_Bottle_v3') as Object3D)
        bottle.applyMaterials(this.materials)
        bottle.position.set(120,-30,0)
        this.add(bottle)
        this.models.push(bottle)

        const shark = new Shark(this.loader.getAsset('SCN0_Shark_v4') as Object3D)
        shark.applyMaterials(this.materials)
        shark.position.set(0,0,150)
        shark.rotation.set(0, -90, 0)
        this.add(shark)
        this.models.push(shark) 

        const star = new Trash(this.loader.getAsset('SCN3_StarFish_v1') as Object3D)
        star.applyMaterials(this.materials)
        star.position.set(0,0,0)
        // star.rotation.set(0, -90, 0)
        this.add(star)
        this.models.push(star) */

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

        if (this.mainFish) {
            this.mainFish.render(this.cursor.x,this.cursor.y)
        }

        this.models.forEach((model) => {
          model.update(this.deltaTime)
        })

        if (this.pointer) {
            if (this.pointer.x > 0.1) {
                this.angleCameraVertical -= 0.01 * ((this.pointer.x - 0.1) * 2)
            } else if (this.pointer.x < -0.1) {
                this.angleCameraVertical += 0.01 * ((-this.pointer.x - 0.1)* 2)
            }

            if (this.pointer.y > 0.1) {
                this.angleCameraHorizontal += 0.01 * ((this.pointer.y - 0.1) * 2)
            } else if (this.pointer.y < -0.1) {
                this.angleCameraHorizontal -= 0.01 * ((-this.pointer.y - 0.1)* 2)
            }

            this.angleCameraHorizontal = Math.max(Math.min(this.angleCameraHorizontal, 0.5), -0.5)
            this.angleCameraHorizontal = this.lerp(this.angleCameraHorizontal, 0, 0.08)

            this.camera.position.x = Math.cos(this.angleCameraHorizontal) * Math.cos(this.angleCameraVertical) * 250;
            this.camera.position.z = Math.cos(this.angleCameraHorizontal) * Math.sin(this.angleCameraVertical) * 250;
            this.camera.position.y = Math.sin(this.angleCameraHorizontal) * 250;

            this.camera.lookAt(0,0,0)
        }
        

        if (this.raycaster && this.vegetation) {
            this.vegetation.update(this.deltaTime)

            if (!this.mouseIsDown) return

            this.raycaster.setFromCamera( this.pointer, this.camera );

            const intersects = this.raycaster.intersectObject(this.vegetation.instancedMesh, false);

            if ( intersects.length > 0 ) {

                const instanceId = intersects[ 0 ].instanceId;

                this.vegetation.scaleVegetation(instanceId)


            }
        }
        
    }

    lerp (start: number, end: number, amt: number): number{
        return (1-amt)*start+amt*end
      }
    
    destroy () {
        super.destroy()
    }
}