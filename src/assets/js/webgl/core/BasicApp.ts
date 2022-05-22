import type BasicScene from "./BasicScene";
import type Signal from "../utils/Signal";
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

    constructor (canvas: HTMLCanvasElement, signal: Signal) {
        this.canvas = canvas
        this.signal = signal // library to send event
        this.loader = new Loader(this.getAssets(), this.getAssetsBasePath(), this.signal)

        this.loader.load()

        this.onLoadComplete = this.onLoadComplete.bind(this)

        this.signal.add(this.onSignal.bind(this))
    }

    onSignal (slug: Array<string|number>) {
        switch (slug[0]) {
            case 'load-on-progress':
                break
            case 'loaded':
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

    destroy () {
        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].destroy()
        }
    }
}