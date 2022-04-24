import { Scene, WebGLRenderer, PerspectiveCamera, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Size } from 'src/assets/js/webgl/utils/index'
import type BasicObject3D from './BasicObject3D'

/**
 * @name BasicScene 
 * @description Abstract class 
 * The class is a three.js Scene
 * The class instantiates camera, render and Clock of the application
 */

export default class BasicScene extends Scene {

  public sizes: Size
  public renderer: WebGLRenderer
  public camera: PerspectiveCamera
  public deltaTime: number = 0 // delta time between two tick
  public models: Array<BasicObject3D> = [] // All models of the application

  private canvas: HTMLCanvasElement
  private clock: Clock
  private controls!: OrbitControls
  private time: number // current time
  private elapsedTime: number = 0 // Keeps track of the total time that the clock has been running
  private raf: number = -1
  private isRunning: Boolean

  constructor (canvas: HTMLCanvasElement) {
    super()
    if (this.constructor === BasicScene) {
      throw new TypeError('Abstract class BasicScene cannot be instantiated directly')
    }
    this.bind()

    this.canvas = canvas
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.camera = new PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
    this.setCameraPosition()
    this.add(this.camera)

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })

    this.setupControls()

    this.clock = new Clock()

    window.addEventListener('resize', this.onResize)
    this.onResize()

    this.time = Date.now()
    this.isRunning = true
    this.tick()

    this.init()
  }

  setCameraPosition () {
    this.camera.position.set(0, 0, 5)
  }

  bind () {
    this.init = this.init.bind(this)
    this.start = this.start.bind(this)
    this.update = this.update.bind(this)
    this.onResize = this.onResize.bind(this)
    this.tick = this.tick.bind(this)
    this.setupControls = this.setupControls.bind(this)
  }

  setupControls () {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
  }

  onResize () {
    this.sizes.width = document.documentElement.clientWidth // window.innerWidth
    this.sizes.height = document.documentElement.clientHeight // window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

  /**
   * Instanciate models and lights
   */
  init () {
    throw new Error('method must be implemented')
  }

  update () {
    throw new Error('method must be implemented')
  }

  tick () {
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = (Date.now() - this.time) * 0.001
    this.time = Date.now()

    this.update()

    this.renderer.render(this, this.camera)

    if (this.isRunning) {
      window.requestAnimationFrame(this.tick)
    }
  }

  destroy () {
    window.cancelAnimationFrame(this.raf)
    this.stop()
    window.removeEventListener('resize', this.onResize)
    this.renderer.dispose()
    this.canvas = null
  }
}
