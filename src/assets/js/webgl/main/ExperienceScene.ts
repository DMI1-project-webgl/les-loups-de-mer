import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { AmbientLight, Clock, Color, IcosahedronGeometry, Mesh, MeshBasicMaterial, Object3D, Raycaster, ShaderMaterial, Vector2, Vector3 } from 'three'
import EnvironementSphere from './object/EnvironmentSphere'
import MainFish from './fish/MainFish'
import Vegetation from './object/Vegetation'
import Trash from './object/Trash'
import Shark from './object/Shark'
import ExperienceStateMachine, { ExperienceStep, type DepollutionStatus } from '../utils/ExperienceStateMachine'
import type { ExperienceListener } from '../utils/ExperienceStateMachine'
import Rock from './object/Rock'

export default class ExperienceScene extends BasicScene implements ExperienceListener {

    // Screen management
    private raycaster: Raycaster = null
    private pointer: Vector2 = null
    private cursor: Cursor = { x: 0 , y: 0, xWin: 0, yWin: 0 }
    private center = {x: 0, y:0 }
    private period: number = null
    private _clock: Clock = new Clock()
    private cursorVegetation: HTMLElement = null
    private cursorVegetationChild: HTMLElement = null
    private cursorVegetationChild2: HTMLElement = null
    private cameraControl = { rayon: 450, rayonTarget: 450}
    private smogScale = { current: 1.2, target: 1.2}
    private cursorControl = { current: 0, target: 0}
    private statusTuto = true

    // State machine
    private stateMachine: ExperienceStateMachine = null
    private depollutionStatus: DepollutionStatus = {
        bottlesPicked: 0,
        cansPicked: 0,
        drinksPicked: 0,
        toothBrushesPicked: 0
    }
    private smogLerpAlpha = 0

    // 3D Objects
    private sphere: EnvironementSphere = null
    private shark: Shark = null
    private trashes: Object3D[] = []
    private mainFish: MainFish = null
    private vegetation!: Vegetation
    private angleCameraHorizontal = 0
    private angleCameraVertical = 0
    private mouseIsDown = false
    private sphereRotationCenter = { x: -0.5, y: 0 };

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
        this.stateMachine = new ExperienceStateMachine();
        this.stateMachine.register(this)

        const sphere = new EnvironementSphere()
        this.add(sphere)
        this.models.push(sphere)
        this.sphere = sphere

        this.period = 10
        this.raycaster = new Raycaster();
        this.raycaster.far = 280;
        this.pointer = new Vector2();

        this.instanceSharkAt(new Vector3(130, 30, 40))
        this.setupCurrentStep()

    }

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

        if (this.shark) {
            const tn = ((Date.now() * 0.001) % this.period) / this.period
            this.shark.update(tn)
        }

        if (this.pointer) {
            if (this.pointer.x+ this.center.x > this.sphereRotationCenter.x + 0.05) {
                this.angleCameraVertical -= 0.01 * Math.min(((this.pointer.x - 0.05 + this.center.x) * 2 * this.cursorControl.current), 0.6)
            } else if (this.pointer.x < this.sphereRotationCenter.x - 0.05) {
                this.angleCameraVertical += 0.01 * Math.min(((-this.pointer.x - 0.05 + this.center.x)* 2 * this.cursorControl.current), 0.6)
            }

            if (this.pointer.y  + this.center.y> this.sphereRotationCenter.y + 0.1) {
                this.angleCameraHorizontal += 0.01 * ((this.pointer.y - 0.1 + this.center.y) * 2 * this.cursorControl.current)
            } else if (this.pointer.y < this.sphereRotationCenter.y - 0.1) {
                this.angleCameraHorizontal -= 0.01 * ((-this.pointer.y - 0.1 + this.center.y)* 2 * this.cursorControl.current)
            }

            this.angleCameraHorizontal = Math.max(Math.min(this.angleCameraHorizontal, 0.5), -0.5)
            this.angleCameraHorizontal = this.lerp(this.angleCameraHorizontal, 0, 0.08)

            this.cameraControl.rayon = this.lerp(this.cameraControl.rayon, this.cameraControl.rayonTarget, 0.015);
            this.cursorControl.current = this.lerp(this.cursorControl.current, this.cursorControl.target, 0.02);

            if (this.smogScale.current !== this.smogScale.target) {
                this.smogScale.current = this.lerp(this.smogScale.current, this.smogScale.target, 0.02)
                this.sphere.scaleSmog(this.smogScale.current)
            }

            this.camera.position.x = Math.cos(this.angleCameraHorizontal) * Math.cos(this.angleCameraVertical) * this.cameraControl.rayon;
            this.camera.position.z = Math.cos(this.angleCameraHorizontal) * Math.sin(this.angleCameraVertical) * this.cameraControl.rayon;
            this.camera.position.y = Math.sin(this.angleCameraHorizontal) * this.cameraControl.rayon;

            this.camera.lookAt(0,0,0);
        }

        if (this.raycaster) {

            if (this.vegetation && this.cursorVegetation && !this.statusTuto) {
                this.cursorVegetationChild2.classList.remove("cursor-vegetation_child2--clicked")
                this.raycaster.setFromCamera( this.pointer, this.camera );

                if (this.vegetation && this.cursorVegetation) {
                    this.cursorVegetationChild2.classList.remove("cursor-vegetation_child2--clicked")

                    this.cursorVegetation.style.transform = `
                    translate(${this.cursor.xWin}px, ${this.cursor.yWin}px)
                    `

                    if (Math.pow(this.pointer.y * (this.sizes.height / this.sizes.width) , 2) + Math.pow(this.pointer.x, 2) < 0.12) {
                        this.cursorVegetationChild.style.transform = `
                        rotate3d(${this.pointer.y}, 0, 0, ${(Math.abs(this.pointer.y) + Math.abs(this.pointer.x * 0.25)) * 0.1 * this.sizes.height}deg)
                        `
                        this.cursorVegetationChild2.style.transform = `
                        rotate3d(0, ${this.pointer.x}, 0, ${(Math.abs(this.pointer.x) + Math.abs(this.pointer.y * 0.25)) * 0.1 * this.sizes.width}deg)
                        `
                        this.cursorVegetationChild2.classList.add("cursor-vegetation_child2--focus")
                        if (this.mouseIsDown) {
                            this.cursorVegetationChild2.classList.add("cursor-vegetation_child2--clicked")
                        }
                    } else {
                        this.cursorVegetationChild2.classList.remove("cursor-vegetation_child2--focus")
                        this.cursorVegetationChild.style.transform = `
                        rotate3d(0,0,0,0)
                        `
                        this.cursorVegetationChild2.style.transform = `
                        rotate3d(0,0,0,0)
                        `
                    }

                    this.vegetation.update(this.deltaTime)

                    if (!this.mouseIsDown) return
                
                    if (this.vegetation) {
                        const intersectsVegetation = this.raycaster.intersectObject(this.vegetation.instancedMesh, false); 

                        if ( intersectsVegetation.length > 0 ) {
                            this.signal.dispatch(["click-coraux"])
                            const instanceId = intersectsVegetation[ 0 ].instanceId;

                            this.vegetation.scaleVegetation(instanceId)
                            this.signal.dispatch(['add-vegetation'])
                        }

                        // Used to glow trash
                        // if (this.trashes.length > 0) {
                        //     const intersectsTrash = this.raycaster.intersectObjects(this.trashes)
                
                        //     if ( intersectsTrash.length > 0 ) {
                        //         const object = intersectsTrash[0].object;
                        //         this.getTrashParent(object).glow();
                        //     } else {
                        //         for(let trash of this.trashes) {
                        //             (trash as Trash).unglow()
                        //         }
                        //     }
                        // }
                    }
                }
            }
        }
    }

    onClick(event: MouseEvent) {
        if(!this.raycaster) return

        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.pointer, this.camera );

        if (this.stateMachine.currentStep == ExperienceStep.DEPOLLUTION && !this.statusTuto) {
            const intersects = this.raycaster.intersectObjects(this.trashes);
            if(intersects.length > 0) {
                this.signal.dispatch(['click-waste'])
                this.smogLerpAlpha += 0.1
                this.sphere.reducePollutionSmog(this.smogLerpAlpha)

                // TODO : Add oppacity for removing animation
                const object = intersects[0].object
                const trashName = object.name
                object.parent.removeFromParent()
                switch(trashName) {
                    case  'Body': case 'Caps':
                        this.depollutionStatus.bottlesPicked++
                        break
                    case 'Can':
                        this.depollutionStatus.cansPicked++
                        break
                    case 'Drink':
                        this.depollutionStatus.drinksPicked++
                        break
                    case  'Plank': case 'Brush':
                        this.depollutionStatus.toothBrushesPicked++
                        break
                }
                const completionStep = this.stateMachine.updateDepollutionCompletion(this.depollutionStatus)
                this.signal.dispatch(['update-depollution', this.depollutionStatus, completionStep])
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
        this.cursor.xWin = event.clientX
        this.cursor.yWin = event.clientY
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

        if (slug[0] == 'remove-vegetation') {
            this.vegetation.reset()
        }

        if (slug[0] == 'camera-experience-state') {
            this.cameraExperienceState()
            if (this.stateMachine.currentStep === ExperienceStep.VEGETATION) {
                this.cursorVegetation.classList.remove("cursor-vegetation--disable")
            }
        }

        if (slug[0] == 'none-tuto-modal') {
            this.cursorControl.target = 1
        }

        if (slug[0] == 'loaded') {
            this.cameraControl.rayonTarget = 300
            this.smogScale.target = 1.12
        }

        if (slug[0] == 'download-ecosystem') {
            this.renderer.render(this, this.camera);
            this.renderer.domElement.toBlob(function(blob){
                var a = document.createElement('a');
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'ecosystem.png';
                a.click();
            }, 'image/png', 1.0);
        }
    }

    initCursorVegetation () {
        this.cursorVegetation = document.createElement("div");
        this.cursorVegetationChild = document.createElement("div");
        this.cursorVegetationChild2 = document.createElement("div");
        this.cursorVegetationChild.classList.add("cursor-vegetation_child");
        this.cursorVegetationChild2.classList.add("cursor-vegetation_child2");
        this.cursorVegetation.classList.add("cursor-vegetation")
        this.cursorVegetation.classList.add("cursor-vegetation--disable")
        this.cursorVegetationChild.appendChild(this.cursorVegetationChild2);
        this.cursorVegetation.appendChild(this.cursorVegetationChild);
        document.body.appendChild(this.cursorVegetation);
    }

    /////////////////////////
    // -- Setup methods -- //
    /////////////////////////

    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(0, 0, 300)
        this.camera.lookAt(0, 0, 0)
    }

    setupCurrentStep() {
        switch(this.stateMachine.currentStep) {
            case ExperienceStep.DEPOLLUTION: {
                this.cameraControl.rayon = 450
                this.smogScale.current = 1.3
                this.cameraTutoState()
                this.instanceTrashes()
                this.instanceRocks()
                this.sphere.addPollutionSmog();
                this.initCursorVegetation();
                break
            }
            case ExperienceStep.VEGETATION: {
                for (let trash of this.trashes) {
                    trash.removeFromParent();
                }
                this.cursorControl.target = 0
                this.cameraTutoState()
                this.vegetation = new Vegetation(this, this.sphere.positionsElements)
                break
            }
            case ExperienceStep.FEEDING: {
                this.cameraTutoState()
                this.cursorVegetation.classList.add("cursor-vegetation--disable")
                this.vegetation.destroy()
                this.vegetation = null
                this.cursorControl.target = 0
                this.mainFish = new MainFish(this.renderer, this)
                break
            }
            case ExperienceStep.END: {
                this.signal.dispatch(['experience-end'])
                this.cameraControl.rayonTarget = 350;
                this.smogScale.target = 1.2;
                this.center.x = 0.5
                // this.cursorControl.target = 0.3
                break
            }
        }
        this.signal.dispatch(['update-advancement', this.stateMachine.sustainabilityIndex])
        this.signal.dispatch(['update-step', this.stateMachine.currentStep + 1])
    }

    cameraTutoState () {
        this.cameraControl.rayonTarget = 300
        this.smogScale.target = 1.12
        this.cursorControl.target = 0
        this.statusTuto = true
    }

    cameraExperienceState () {
        this.cameraControl.rayonTarget = 250
        this.smogScale.target = 1
        // this.cursorControl.target = 1
        this.statusTuto = false
    }

    notifyUI() {
        this.signal.dispatch(['next-step'])
    }

    /////////////////////////////////
    // -- Instanciation methods -- //
    /////////////////////////////////

    instanceSharkAt(pos: Vector3) {
        const shark = new Shark(this.loader.getAsset('SCN0_Shark_v4') as Object3D, this.loader.getAsset('SCN0_Shark_v4-all'))
        shark.applyMaterials(this.materials)
        shark.position.set(pos.x, pos.y, pos.z)
        this.add(shark)
        this.models.push(shark)
        this.shark = shark
    }

    instanceTrashes() {
        for(let i = 0; i < this.stateMachine.neededBottleAmount; i++) {
            const randomPos = this.randomSpherePoint()
            this.instanceBottleAt(randomPos)
        }

        for(let i = 0; i < this.stateMachine.neededToothbrushAmount; i++) {
            const randomPos = this.randomSpherePoint()
            this.instanceToothBrushAt(randomPos)
        }

        for(let i = 0; i < this.stateMachine.neededDrinkAmount; i++) {
            const randomPos = this.randomSpherePoint()
            this.instanceDrinkAt(randomPos)
        }

        for(let i = 0; i < this.stateMachine.neededCanAmount; i++) {
            const randomPos = this.randomSpherePoint()
            this.instanceCanAt(randomPos)
        }
    }

    instanceCanAt(pos: Vector3): void {
        const can = new Trash((this.loader.getAsset('SCN2_Can_v1') as Mesh).clone())
        can.applyCloneMaterial(this.materials)
        can.applyHitbox('Can')
        can.position.set(pos.x, pos.y, pos.z)
        can.rotation.set(0, 0, this.randomIntFromInterval(0, 30))
        this.add(can)
        this.models.push(can)
        this.trashes.push(can)
    }

    instanceDrinkAt(pos: Vector3): void {
        const drink = new Trash((this.loader.getAsset('SCN2_Drink_v3') as Mesh).clone())
        drink.applyCloneMaterial(this.materials)
        drink.applyHitbox('Drink')
        drink.position.set(pos.x, pos.y, pos.z)
        drink.rotation.set(0, 0, this.randomIntFromInterval(0, 30))
        this.add(drink)
        this.models.push(drink)
        this.trashes.push(drink)
    }

    instanceToothBrushAt(pos: Vector3): void {
        const toothbrush = new Trash((this.loader.getAsset('SCN2_ToothBrush_v1') as Mesh).clone())
        toothbrush.applyCloneMaterial(this.materials)
        toothbrush.applyHitbox('Plank')
        toothbrush.position.set(pos.x, pos.y, pos.z)
        toothbrush.rotation.set(0, 0, this.randomIntFromInterval(0, 30))
        this.add(toothbrush)
        this.models.push(toothbrush)
        this.trashes.push(toothbrush)
    }

    instanceBottleAt(pos: Vector3): void {
        const bottle = new Trash((this.loader.getAsset('SCN2_Bottle_v3') as Mesh).clone())
        bottle.applyCloneMaterial(this.materials)
        bottle.applyHitbox('Body')
        bottle.position.set(pos.x, pos.y, pos.z)
        bottle.rotation.set(0, 0, this.randomIntFromInterval(0, 30))
        this.add(bottle)
        this.models.push(bottle)
        this.trashes.push(bottle)
    }

    instanceRocks(): void {
        this.sphere.positionsElements.forEach((vec, i) => {
            if (vec.y > 70 || vec.y < -70) {
                const rock = new Rock(this.loader.getAsset('SCN0_Rock1_v1').clone())
                rock.applyMaterials(this.materials)
                const randomRotation = Math.random() * Math.PI * 2
                const randomX = Math.random() * 8
                const randomY = Math.random() * 8
                const pos = this.sphere.positionsElements.splice(i, 1)[0];
                rock.position.set(pos.x, pos.y, pos.z)
                rock.lookAt(0,0,0)
                rock.rotateZ(randomRotation)
                rock.scale.set(5 + randomX, 5 + randomY, 8)
                this.add(rock)
            }
        })
        const numberRock = 8 + Math.floor(Math.random() * 4) 
        for(let i = 0; i <= numberRock; i++) {
            const rock = new Rock(this.loader.getAsset('SCN0_Rock1_v1').clone())
            rock.applyMaterials(this.materials)
            const randomPosition = Math.floor(Math.random() * this.sphere.positionsElements.length)
            const randomRotation = Math.random() * Math.PI * 2
            const randomX = Math.random() * 8
            const randomY = Math.random() * 8
            const pos = this.sphere.positionsElements.splice(randomPosition, 1)[0];
            rock.position.set(pos.x, pos.y, pos.z)
            rock.lookAt(0,0,0)
            rock.rotateZ(randomRotation)
            rock.scale.set(5 + randomX, 5 + randomY, 8)
            this.add(rock)
        }
    }

    initFishes() {
        this.mainFish = new MainFish(this.renderer, this)
    }

    /////////////////
    // -- Utils -- //
    /////////////////

    getTrashParent(object: Object3D): Trash {
        let trashParent = object.parent
        while(!(trashParent instanceof Trash)) {
            trashParent = trashParent.parent
        }
        return trashParent
    }

    lerp (start: number, end: number, amt: number): number {
        return (1-amt)*start+amt*end
    }

    randomSpherePoint(): Vector3 {
        const radius = this.randomIntFromInterval(130, 140); // Random orbit
        const x0 = 0;
        const y0 = 0;
        const z0 = 0;

        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
        const y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
        const z = z0 + (radius * Math.cos(phi));

        return new Vector3(x,y,z);
    }

    randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    destroy () {
        super.destroy()
        for(let model of this.models) {
            model.destroy();
        }
        if (this.vegetation) {
            this.vegetation.destroy()
        }

        if (this.mainFish) {
            this.mainFish.destroy()
        }

        if (this.sphere) {
            this.sphere.destroy()
        }
    }
}