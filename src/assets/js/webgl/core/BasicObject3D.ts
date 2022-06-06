import { Group, Mesh, Object3D } from 'three'
import type MaterialFactory from './MaterialFactory'

/**
 * @name BasicObject3D 
 * @description Abstract class 
 * This class is a three.js Group
 */

export default class BasicObject3D extends Group {

    // time of the application
    public time: number = 0

    constructor (model: Object3D) {
        super()

        this.scale.set(this.getScale(), this.getScale(), this.getScale())
        this.add(model)
    }

    getEnvMapIntensity (): number {
        return 1
    }

    applyMaterials (factory: MaterialFactory) {
        this.children.forEach((child) => {
            this.shadeObject(child, factory)
        })
        factory.applyEnvMap(this, this.getEnvMapIntensity())
    }

    shadeObject (model: Group | Mesh | any, factory: MaterialFactory) {
        if (model instanceof Group || (model instanceof Object3D && !(model instanceof Mesh))) {
          model.children.forEach((child) => {
            this.shadeObject(child, factory)
          })
        } else if (model instanceof Mesh) {
          model.material = factory.getMaterial(model.name)
          if (!model.material) return
          model.material.needsUpdate = true
        }
    }

    /**
     * Copy/paste of `applyMaterials`
     * Used to control each material independently of each instance
     * @param factory 
     */
    applyCloneMaterial(factory: MaterialFactory) {
        this.children.forEach((child) => {
            this.shadeCloneObject(child, factory)
        })
        factory.applyEnvMap(this, this.getEnvMapIntensity())
    }

    /**
     * Copy/paste of `shadeObject`
     * Work with `applyCloneMaterial`
     * @param factory 
     */
    shadeCloneObject (model: Group | Mesh | any, factory: MaterialFactory) {
        if (model instanceof Group || (model instanceof Object3D && !(model instanceof Mesh))) {
          model.children.forEach((child) => {
            this.shadeCloneObject(child, factory)
          })
        } else if (model instanceof Mesh) {
          model.material = factory.getMaterial(model.name).clone()
          if (!model.material) return
          model.material.needsUpdate = true
        }
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
