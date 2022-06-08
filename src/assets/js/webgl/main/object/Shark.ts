import {AnimationClip, AnimationMixer, Object3D, Vector3 } from 'three'
import BasicObject3D from '../../core/BasicObject3D'

export default class Shark extends BasicObject3D {
  animationMixer: AnimationMixer = null
  activeAction: any = null

  constructor(object: Object3D, modelFull: any) {
    super(object)
    this.animationMixer = new AnimationMixer(object)
    const clips = modelFull.animations;
    const clip = AnimationClip.findByName( clips, 'animation_0' );
    const action = this.animationMixer.clipAction( clip );
    action.play();
  }

  getScale(): number {
      return 0.7
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
    
    this.animationMixer.update(deltaTime * 0.02)
  }
}