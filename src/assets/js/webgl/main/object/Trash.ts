import BasicObject3D from '../../core/BasicObject3D'

export default class Trash extends BasicObject3D {
  getScale(): number {
      return 1
  }
  getEnvMapIntensity () {
    return 3
  }
}