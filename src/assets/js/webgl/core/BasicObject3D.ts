import { Group } from 'three'

/**
 * @name BasicObject3D 
 * @description Abstract class 
 * This class is a three.js Group
 */

export default class BasicObject3D extends Group {

    // time of the application
    public time: number = 0
  
    constructor () {
        super()

        this.scale.set(this.getScale(), this.getScale(), this.getScale())
    }

    /**
     * To scale the Group
     */
    getScale () {
        return 1
    }

    /**
     * To animate the Group
     * @param deltaTime 
     */
    update (deltaTime: number) {
        this.time += deltaTime
    }

    destroy () {
        this.clear()
    }
}
