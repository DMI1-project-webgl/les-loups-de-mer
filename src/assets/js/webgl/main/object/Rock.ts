import BasicObject3D from '../../core/BasicObject3D'

export default class Rock extends BasicObject3D {
  getScale(): number {
      return 10
  }
  getEnvMapIntensity () {
    return 3
  }
}