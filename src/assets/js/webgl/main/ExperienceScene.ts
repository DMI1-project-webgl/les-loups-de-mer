import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { Clock, Color, Mesh, Object3D, Raycaster, ShaderMaterial, Vector2, Vector3 } from 'three'
import EnvironementSphere from './object/EnvironmentSphere'
import MainFish from './fish/MainFish'
import Vegetation from './object/Vegetation'
import Trash from './object/Trash'
import Shark from './object/Shark'
import ExperienceStateMachine, { ExperienceStep } from '../utils/ExperienceStateMachine'
import type { ExperienceListener } from '../utils/ExperienceStateMachine'

export default class ExperienceScene extends BasicScene implements ExperienceListener {
    private materials: MaterialFactory

    // Screen management
    private raycaster: Raycaster
    private pointer: Vector2
    private cursor: Cursor = { x: 0 , y: 0 }
    private period: number
    private _clock: Clock = new Clock()

    // State machine
    private stateMachine: ExperienceStateMachine

    // 3D Objects
    private sphere: EnvironementSphere = null
    private mainFish: MainFish = null
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
        this.background = new Color(0x0085DE);

        this.stateMachine = new ExperienceStateMachine();
        this.stateMachine.register(this)

        const sphere = new EnvironementSphere()
        this.add(sphere)
        this.models.push(sphere)
        this.sphere = sphere

        this.period = 10
        this.raycaster = new Raycaster();
        this.pointer = new Vector2();

        this.setupCurrentStep()
    }

    ///////////////////////////////////
    // -- State machine callbacks -- //
    ///////////////////////////////////

    // ...

    ////////////////////////////
    // -- Events callbacks -- //
    ////////////////////////////
    
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

        if (this.raycaster && this.vegetation) {
            this.raycaster.setFromCamera( this.pointer, this.camera );
            this.vegetation.update(this.deltaTime)

            const intersects = this.raycaster.intersectObject(this.vegetation.instancedMesh, false);

            if ( intersects.length > 0 ) {
                const instanceId = intersects[ 0 ].instanceId;

                this.vegetation.scaleVegetation(instanceId)
            }
        }
    }

    onMouseMove (event: MouseEvent) {
        if(!this.cursor || !this.pointer) return
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = event.clientY / this.sizes.height - 0.5
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    onResize () {
        super.onResize()
    }

    onSignal (slug: Array<string|number>) {
        super.onSignal(slug) 

        switch (slug[0]) {
            case 'loaded':
                break
            case 'validate-depollution':
                // ...
                break
            case 'validate-vegetation':
                // ...
                break
            case 'validate-feeding':
                // ...
                break
            default:
        }
    }

    /////////////////////////
    // -- Setup methods -- //
    /////////////////////////

    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(0, 0, 250)
        this.camera.lookAt(0, 0, 0)
    }

    setupCurrentStep() {
        switch(this.stateMachine.currentStep) {
            case ExperienceStep.DEPOLLUTION: {
                this.instanceTrashes()
                this.sphere.addPollutionSmog();
                break
            }
            case ExperienceStep.VEGETATION: {
                break
            }
            case ExperienceStep.FEEDING: {
                break
            }
            case ExperienceStep.END: {
                break
            }
        }
    }

    /////////////////////////////////
    // -- Instanciation methods -- //
    /////////////////////////////////

    instanceTrashes() {
        // ...
    }

    instanceSharkAt(pos: Vector3) {
        const shark = new Shark(this.loader.getAsset('SCN0_Shark_v4') as Object3D)
        shark.applyMaterials(this.materials)
        shark.position.set(pos.x, pos.y, pos.z)
        this.add(shark)
        this.models.push(shark)
    }

    instanceCanAt(pos: Vector3): void {
        const can = new Trash(this.loader.getAsset('SCN2_Can_v1') as Object3D)
        can.applyMaterials(this.materials)
        can.position.set(pos.x, pos.y, pos.z)
        this.add(can)
        this.models.push(can)
    }

    instanceDrinkAt(pos: Vector3): void {
        const drink = new Trash(this.loader.getAsset('SCN2_Drink_v3') as Object3D)
        drink.applyMaterials(this.materials)
        drink.position.set(pos.x, pos.y, pos.z)
        this.add(drink)
        this.models.push(drink)
    }

    instanceToothBrushAt(pos: Vector3): void {
        const toothbrush = new Trash(this.loader.getAsset('SCN2_ToothBrush_v1') as Object3D)
        toothbrush.applyMaterials(this.materials)
        toothbrush.position.set(pos.x, pos.y, pos.z)
        toothbrush.rotation.set(0, 0, 30)
        this.add(toothbrush)
        this.models.push(toothbrush)
    }

    instanceBottleAt(pos: Vector3): void {
        const bottle = new Trash(this.loader.getAsset('SCN2_Bottle_v3') as Object3D)
        bottle.applyMaterials(this.materials)
        bottle.position.set(pos.x, pos.y, pos.z)
        this.add(bottle)
        this.models.push(bottle)
    }

    initFishes() {
        this.mainFish = new MainFish(this.renderer, this)
    }

    initVegetation() {
        this.vegetation = new Vegetation(this)
    }

    destroy () {
        super.destroy()
        for(let model of this.models) {
            model.destroy();
        }
    }
}