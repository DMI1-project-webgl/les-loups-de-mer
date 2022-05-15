import type BasicScene from "./BasicScene";
import Signal from "../utils/Signal";
import Loader from "./Loader";
import type AssetsUrl from "./InterfaceAssetsUrl";
/**
 * @name BasicApp 
 * @description Abstract class 
 * This class is a bridge between BasicScene and the DOM
 */

export default class BasicApp {

    public scene!: BasicScene
    public scenes: Array<BasicScene> = []

    private canvas: HTMLCanvasElement
    public signal: Signal
    public loader: Loader

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.signal = new Signal() // library to send event
        this.loader = new Loader(this.getAssets(), this.getAssetsBasePath(), this.signal)

        this.loader.load()

        this.onLoadComplete = this.onLoadComplete.bind(this)

        this.signal.add(this.onSignal.bind(this))
    }

    onSignal (slug: Array<string|number>) {
        switch (slug[0]) {
            case 'load-on-progress':
                console.log('load is in progress', slug[1])
                // this.onLoadProgress(slug[1] as number)
                break
            case 'is-loaded':
                console.log('is loaded')
                this.onLoadComplete()
                break
            default:
        }
    }

    getAssets (): AssetsUrl {
        return {
            models: [],
            textures: [],
            envs: [],
            hdr: []
        }
    }

    getAssetsBasePath (): string {
        return './'
    }

    onLoadProgress (progress: number) {
        // this.dispatchProgress(progress)
    }

    onLoadComplete () {
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i]
            scene.init()
        }
        // this.dispatchReady()
    }

    /**
     * @param slug (route-home|route-about|...)
     * Dispatch DOM event to BasicScene
     */
    changeState(slug: String) {
        // console.log('change state app : ', slug)
        this.signal.dispatch(slug)
    }

    destroy () {
        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].destroy()
        }
    }
}