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
import ExperienceStateMachine, { ExperienceStep, type DepollutionStatus } from '../utils/ExperienceStateMachine'
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
    private depollutionStatus: DepollutionStatus = {
        bottlesPicked: 0,
        cansPicked: 0,
        drinksPicked: 0,
        toothBrushesPicked: 0
    }
    private smogLerpAlpha = 0

    // 3D Objects
    private sphere: EnvironementSphere = null
    private trashes: Object3D[] = []
    private mainFish: MainFish = null
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
        window.addEventListener('click', this.onClick)
        window.addEventListener('keydown', this.onKeyboard)
    }

    get sphereMaterial(): ShaderMaterial {
        return (this.sphere.children[0] as Mesh).material as ShaderMaterial
    }
    
    bind () {
        super.bind()
    
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onKeyboard = this.onKeyboard.bind(this)
    }

    init () {
        this.background = this.materials.getEnv('main')
        this.background = new Color(0x002244);

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


        if (this.pointer) {
            if (this.pointer.x > 0.05) {
                this.angleCameraVertical -= 0.01 * Math.min(((this.pointer.x - 0.05) * 2), 0.6)
            } else if (this.pointer.x < -0.05) {
                this.angleCameraVertical += 0.01 * Math.min(((-this.pointer.x - 0.05)* 2), 0.6)
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

    onClick(event: MouseEvent) {
        if(!this.raycaster) return

        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.pointer, this.camera );

        if (this.stateMachine.currentStep == ExperienceStep.DEPOLLUTION) {
            this.smogLerpAlpha += 0.1
            this.sphere.reducePollutionSmog(this.smogLerpAlpha)
            const intersects = this.raycaster.intersectObjects(this.trashes);
            if(intersects.length > 0) {
                // TODO : Add oppacity removing animation
                const object = intersects[0].object
                const trashName = object.name
                object.parent.removeFromParent()
                switch(trashName) {
                    case  'Caps' || 'Body':
                        this.depollutionStatus.bottlesPicked++
                        break
                    case 'Can':
                        this.depollutionStatus.cansPicked++
                        break
                    case 'Drink':
                        this.depollutionStatus.drinksPicked++
                        break
                    case  'Plank' || 'Brush':
                        this.depollutionStatus.toothBrushesPicked++
                        break
                }
                const completionPercentage = this.stateMachine.updateDepollutionCompletion(this.depollutionStatus)
            }
        }
        
    }

    onKeyboard(event: KeyboardEvent) {
        if(event.key == 'j') {
            this.signal.dispatch(['validate-step'])
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

    /**
     * Receiving events from Vue componentsj
     * @param slug 
     */
    onSignal (slug: Array<string|number>) {
        super.onSignal(slug) 

        if (slug[0] == 'validate-tapped') {
            if(this.stateMachine.nextStep()) {
                this.notifyUI()
                this.setupCurrentStep()
            }
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
                for (let trash of this.trashes) {
                    trash.removeFromParent();
                }
                this.vegetation = new Vegetation(this)
                break
            }
            case ExperienceStep.FEEDING: {
                this.vegetation.destroy()
                this.vegetation = null
                this.mainFish = new MainFish(this.renderer, this)
                break
            }
            case ExperienceStep.END: {
                break
            }
        }
    }

    notifyUI() {
        this.signal.dispatch(['next-step'])
    }

    /////////////////////////////////
    // -- Instanciation methods -- //
    /////////////////////////////////

    instanceSharkAt(pos: Vector3) {
        const shark = new Shark(this.loader.getAsset('SCN0_Shark_v4') as Object3D)
        shark.applyMaterials(this.materials)
        shark.position.set(pos.x, pos.y, pos.z)
        this.add(shark)
        this.models.push(shark)
    }

    instanceTrashes() {
        this.instanceToothBrushAt(new Vector3(130, 30, 20))
        this.instanceDrinkAt(new Vector3(130, -30, 20))
    }

    instanceCanAt(pos: Vector3): void {
        const can = new Trash(this.loader.getAsset('SCN2_Can_v1') as Object3D)
        can.applyMaterials(this.materials)
        can.position.set(pos.x, pos.y, pos.z)
        this.add(can)
        this.models.push(can)
        this.trashes.push(can)
    }

    instanceDrinkAt(pos: Vector3): void {
        const drink = new Trash(this.loader.getAsset('SCN2_Drink_v3') as Object3D)
        drink.applyMaterials(this.materials)
        drink.position.set(pos.x, pos.y, pos.z)
        this.add(drink)
        this.models.push(drink)
        this.trashes.push(drink)
    }

    instanceToothBrushAt(pos: Vector3): void {
        const toothbrush = new Trash(this.loader.getAsset('SCN2_ToothBrush_v1') as Object3D)
        toothbrush.applyMaterials(this.materials)
        toothbrush.position.set(pos.x, pos.y, pos.z)
        toothbrush.rotation.set(0, 0, 30)
        this.add(toothbrush)
        this.models.push(toothbrush)
        this.trashes.push(toothbrush)
    }

    instanceBottleAt(pos: Vector3): void {
        const bottle = new Trash(this.loader.getAsset('SCN2_Bottle_v3') as Object3D)
        bottle.applyMaterials(this.materials)
        bottle.position.set(pos.x, pos.y, pos.z)
        this.add(bottle)
        this.models.push(bottle)
        this.trashes.push(bottle)
    }

    initFishes() {
        this.mainFish = new MainFish(this.renderer, this)
    }

    initVegetation() {
        this.vegetation = new Vegetation(this)
    }

    lerp (start: number, end: number, amt: number): number{
        return (1-amt)*start+amt*end
      }
    
    destroy () {
        super.destroy()
        for(let model of this.models) {
            model.destroy();
        }
    }
}