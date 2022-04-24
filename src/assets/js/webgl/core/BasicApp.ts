import type BasicScene from "./BasicScene";
import Signal from "../utils/Signal";

/**
 * @name BasicApp 
 * @description Abstract class 
 * This class is a bridge between BasicScene and the DOM
 */

export default class BasicApp {

    public scene!: BasicScene

    private canvas: HTMLCanvasElement
    public signal: Signal

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.signal = new Signal() // library to send event
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
        this.scene.destroy()
    }
}