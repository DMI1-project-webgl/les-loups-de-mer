import BasicApp from "../core/BasicApp";
import MainScene from "./MainScene";

export default class MainApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement) {
        super(canvas)

        this.scene = new MainScene(canvas, this.signal)
    }
}