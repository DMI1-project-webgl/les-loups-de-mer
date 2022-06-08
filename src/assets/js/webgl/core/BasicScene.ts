import { Scene, WebGLRenderer, PerspectiveCamera, Clock, Object3D, Color, AmbientLight } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Size } from 'src/assets/js/webgl/utils/index'
import type BasicObject3D from './BasicObject3D'
import type Signal from "../utils/Signal";
import type Loader from './Loader';
import type BasicApp from './BasicApp';
import Stats from 'three/examples/jsm/libs/stats.module';
import type MaterialFactory from './MaterialFactory';

/**
 * @name BasicScene 
 * @description Abstract class 
 * This class is a three.js Scene
 * This class instantiates camera, render and Clock of the application
 */

export default class BasicScene extends Scene {

  public sizes: Size
  public renderer: WebGLRenderer
  public camera: PerspectiveCamera
  public deltaTime: number = 0 // delta time between two tick
  public models: Array<BasicObject3D> = [] // All models of the application
  public signal: Signal
  public loader: Loader
  public materials: MaterialFactory

  private stats: Stats
  private canvas: HTMLCanvasElement
  private clock: Clock
  private controls!: OrbitControls
  private time: number // current time
  private elapsedTime: number = 0 // Keeps track of the total time that the clock has been running
  private raf: number = -1 // window animation frame
  private isRunning: Boolean
  private container: HTMLElement

  constructor (app: BasicApp, canvas: HTMLCanvasElement, signal: Signal, container: HTMLElement = null) {
    super()
    if (this.constructor === BasicScene) {
      throw new TypeError('Abstract class BasicScene cannot be instantiated directly')
    }
    this.bind()

    this.canvas = canvas
    this.signal = signal
    this.container = container
    if (container) {
      this.sizes = {
        width: container.offsetWidth,
        height: container.offsetHeight
      }
    } else {
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    this.loader = app.loader
    this.camera = new PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
    this.setCameraPosition()
    this.add(this.camera)

    var light = new AmbientLight(0xffffff);
    this.add(light)

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
    })

    //this.stats = Stats()

    // this.setupControls()

    this.clock = new Clock()

    window.addEventListener('resize', this.onResize)
    this.onResize()

    this.time = Date.now()
    this.isRunning = true
    this.tick()

    //document.body.appendChild(this.stats.dom)

    this.signal.add(this.onSignal);
  }

  /**
   * @param slug (route-home|route-about|...)
   * Listen event send by BasicApp
   */
  onSignal (slug: Array<string|number>) {
    console.log('signal : ', slug)
  }

  setCameraPosition () {
    this.camera.position.set(0, 0, 5)
  }

  bind () {
    this.start = this.start.bind(this)
    this.update = this.update.bind(this)
    this.onResize = this.onResize.bind(this)
    this.tick = this.tick.bind(this)
    this.setupControls = this.setupControls.bind(this)
    this.onSignal = this.onSignal.bind(this)
    this.removeObject = this.removeObject.bind(this)
    this.addObject = this.addObject.bind(this)
  }

  setupControls () {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
  }

  onResize () {
    if (this.container) {
      this.sizes = {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight
      }
    } else {
      this.sizes = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  /**
   * call when assets is loaded
   */
  init () {
    throw new Error('method must be implemented')
  }
  start () {
    throw new Error('method must be implemented')
  }

  stop () {
    this.isRunning = false
  }

  resume () {
    this.isRunning = true
    this.tick()
  }

  removeObject (object: BasicObject3D) {
    object.destroy()
    this.remove(object)
    this.models.slice(this.models.indexOf(object),1)
    object = null
  }
  
  addObject (object: BasicObject3D) {
    this.add(object)
    this.models.push(object)
  }

  update () {
    throw new Error('method must be implemented')
  }

  tick () {
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = (Date.now() - this.time) * 0.001
    this.time = Date.now()

    //this.stats.update()

    this.update()

    this.renderer.render(this, this.camera)

    if (this.isRunning) {
      this.raf = window.requestAnimationFrame(this.tick)
    }
  }

  destroy () {
    window.cancelAnimationFrame(this.raf)
    this.stop()
    window.removeEventListener('resize', this.onResize)
    this.renderer.clear()
    this.renderer.dispose()
    this.canvas = null
    this.signal.remove(this.onSignal);
  }
}
