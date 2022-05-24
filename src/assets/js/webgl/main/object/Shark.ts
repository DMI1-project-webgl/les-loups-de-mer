import {AnimationMixer, Object3D, Vector3 } from 'three'
import BasicObject3D from '../../core/BasicObject3D'

export default class Shark extends BasicObject3D {
  animationMixer: AnimationMixer = null
  activeAction: any = null

  constructor(object: Object3D) {
    super(object)
    this.animationMixer = new AnimationMixer(object)
  }

  getScale(): number {
      return 1
  }
  getEnvMapIntensity () {
    return 3
  }

  update(deltaTime: number): void {
    const angle = (deltaTime * 2 * Math.PI + Math.PI) % (2 * Math.PI)
    const radius = 130

    this.position.set(
        3 + radius * Math.cos(angle),
        1 * Math.sin(angle),
        radius * Math.sin(angle)
    )

    this.lookAt(new Vector3(0, 0, 0))
    this.rotateY(30)
    
    // this.animationMixer.update(deltaTime)
    // this.animationMixer.clipAction(this.animations[0]).play()
  }
}