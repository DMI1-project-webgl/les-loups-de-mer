import BasicObject3D from '../../core/BasicObject3D'

export default class FioleBouillon extends BasicObject3D {
  getScale(): number {
      return 0.1
  }
  getEnvMapIntensity () {
    return 3
  }
}
