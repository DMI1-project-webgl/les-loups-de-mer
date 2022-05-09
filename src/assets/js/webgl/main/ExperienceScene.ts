import BasicScene from '../core/BasicScene'
import type { Cursor } from 'src/assets/js/webgl/utils/index'
import type BasicApp from '../core/BasicApp'
import type Signal from '../utils/Signal'
import MaterialFactory from '../core/MaterialFactory'
import { Clock, Color, Mesh, ShaderMaterial } from 'three'
import EnvironementSphere from './object/EnvironmentSphere'

export default class ExperienceScene extends BasicScene {

    private cursor: Cursor = { x: 0 , y: 0 }
    private materials: MaterialFactory

    private sphere: EnvironementSphere = null
    private _clock: Clock = new Clock();

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
    }
    
    onMouseMove (event: MouseEvent) {
        this.cursor.x = event.clientX / this.sizes.width - 0.5
        this.cursor.y = event.clientY / this.sizes.height - 0.5
    }
    
    setupControls () {
        super.setupControls()
    }

    setCameraPosition () {
        this.camera.position.set(-10, -10, -10)
        this.camera.lookAt(0, 0, 0)
    }

    onSignal (slug: Array<string|number>) {
        // super.onSignal(slug) 

        switch (slug[0]) {
            case 'route-home':
                // ...
                break
            case 'route-about':
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

        this.models.forEach((model) => {
          model.update(this.deltaTime)
        })
    }
    
    destroy () {
        super.destroy()
    }
}