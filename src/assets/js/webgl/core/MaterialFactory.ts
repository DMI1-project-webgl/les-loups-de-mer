import { Color, CubeTexture, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PMREMGenerator, Texture, WebGLRenderTarget } from 'three'
import * as THREE from 'three'
import type BasicScene from './BasicScene'
import type Loader from './Loader'

export default class MaterialFactory {

  private loader: Loader
  private pmremGenerator: PMREMGenerator
  private materials: {
    [key: string]: MeshBasicMaterial | MeshStandardMaterial | MeshPhysicalMaterial,
  }
  private hdrCubeRenderTarget: WebGLRenderTarget

  constructor (scene: BasicScene) {
    this.loader = scene.loader
    this.pmremGenerator = new PMREMGenerator(scene.renderer)
    this.pmremGenerator.compileCubemapShader()
    // this.hdrCubeRenderTarget = null

    const defaultMat = new MeshBasicMaterial({ color: 0xFF0099 })
    this.materials = {}
    this.materials['default'] = defaultMat
  }

  getEnv (name: string) {
    let envMap: CubeTexture = null
    switch (name) {
      case 'main':
        envMap = this.loader.getAsset('env') as CubeTexture
        break

      default:
        break
    }

    if (envMap) {
      envMap.magFilter = THREE.LinearFilter
      // envMap.needUpdate = true
      this.hdrCubeRenderTarget = this.pmremGenerator.fromCubemap(envMap)
    }
    return envMap
  }

  /**
   * @param name (name of mesh in the model)
   * @returns material of the mesh
   */
  getMaterial (name:string): MeshBasicMaterial | MeshStandardMaterial | MeshPhysicalMaterial  {
    let materialName = 'default'
    console.log(name)
    switch (name) {
      case 'Bouchon':
      case 'Bouchon_epices':
        materialName = 'bouchon'
        break

      case 'Bouteille':
      case 'Bouteille_epices':
        materialName = 'glass'
        break

      case 'Texture_intérieur':
        materialName = 'epices'
        break

      case 'Can':
        materialName = 'metal'
        break

      case 'Drink':
        materialName = 'metal'
        break

      // Bottle
      case 'Body':
        materialName = 'plasticBottle'
        break

      case 'Caps':
        materialName = 'bluePlastic'
        break

      // Toothbrush
      case 'Brush':
        materialName = 'brush'
        break

      case 'Plank':
        materialName = 'plank'
        break

      // Shark
      case 'Requin':
        materialName = 'glass'
        break

      case 'Aileron_requin':
        materialName = 'sharkFin'
        break

      case 'Ceinture_requin':
        materialName = 'sharkBelt'
        break

      default:
        materialName = 'default'
        break
    }

    if (!this.hasProperty(this.materials, materialName)) {
      this.createMaterial(materialName)
    }
    return this.materials[materialName]
  }

  createMaterial (name:string) {
    let material = this.materials.default
    switch (name) {
      case 'bouchon': {
        material = new MeshStandardMaterial({
          map: this.loader.getAsset('TEXTURE_SCN1_BouchonFioleBouillon') as Texture
        })
        break
      }

      case 'epices': {
        material = new MeshStandardMaterial({
          color: 0x442200
        })
        break
      }

      case 'glass': {
        const m = new MeshPhysicalMaterial()
        m.thickness = 1.5
        m.roughness = 0
        m.clearcoat = 0.1
        m.clearcoatRoughness = 0
        m.transmission = 1
        m.ior = 1.25
        m.envMapIntensity = 25
        m.envMap = this.hdrCubeRenderTarget.texture
        material = m
        break
      }

      case 'metal': {
        material = new MeshStandardMaterial({
          color: 0x666666,
          metalness: 0.9,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_Metal_Roughness') as Texture
        })
        break
      }
        
      case 'plasticBottle': {
        const m = new MeshPhysicalMaterial()
        m.thickness = 1.5
        m.roughness = 1
        m.clearcoat = 0.1
        m.clearcoatRoughness = 0
        m.transmission = 1
        m.ior = 1.25
        m.envMapIntensity = 25
        m.envMap = this.hdrCubeRenderTarget.texture
        material = m
        break
      }

      case 'bluePlastic': {
        material = new MeshStandardMaterial({
          map: this.loader.getAsset('TEXTURE_SCN2_PlasticColor') as Texture,
          normalMap: this.loader.getAsset('TEXTURE_SCN2_PlasticNormal') as Texture,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_PlasticRoughness') as Texture
        })
        break
      }

      case 'brush': {
        console.log(this.loader.getAsset('TEXTURE_SCN2_PlasticColor'))
        material = new MeshStandardMaterial({
          color: 0x555555,
          map: this.loader.getAsset('TEXTURE_SCN2_PlasticColor') as Texture,
          normalMap: this.loader.getAsset('TEXTURE_SCN2_PlasticNormal') as Texture,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_PlasticRoughness') as Texture,
          
        })
        break
      }

      case 'plank': {
        material = new MeshStandardMaterial({
          map: this.loader.getAsset('TEXTURE_SCN2_PlasticSecular') as Texture,
          normalMap: this.loader.getAsset('TEXTURE_SCN2_PlasticNormal') as Texture,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_PlasticRoughness') as Texture,
        })
        break
      }

      case 'sharkBody': {
        const m = new MeshPhysicalMaterial()
        m.thickness = 1.5
        m.roughness = 0.4
        m.clearcoat = 1
        m.clearcoatRoughness = 0
        m.transmission = 1
        m.ior = 4
        m.envMapIntensity = 25
        m.envMap = this.hdrCubeRenderTarget.texture
        material = m
        break
      }

      case 'sharkBelt': {
        console.log(this.loader.getAsset('TEXTURE_SCN2_PlasticColor'))
        material = new MeshStandardMaterial({
          color: 0x222222,
          transparent: true,
          alphaMap: this.loader.getAsset('TEXTURE_SCN0_SharkBeltAlpha') as Texture,
          map: this.loader.getAsset('TEXTURE_SCN2_PlasticSecular') as Texture,
          normalMap: this.loader.getAsset('TEXTURE_SCN2_PlasticNormal') as Texture,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_PlasticRoughness') as Texture
        })
        break
      }

      case 'sharkFin': {
        console.log(this.loader.getAsset('TEXTURE_SCN2_PlasticColor'))
        material = new MeshStandardMaterial({
          color: 0x6E7D4A,
          map: this.loader.getAsset('TEXTURE_SCN2_PlasticSecular') as Texture,
          normalMap: this.loader.getAsset('TEXTURE_SCN2_PlasticNormal') as Texture,
          roughnessMap: this.loader.getAsset('TEXTURE_SCN2_PlasticRoughness') as Texture
        })
        break
      }

      default:
        break
    }
    this.materials[name] = material
  }

  tileTexture (tex: Texture, tiling: number): Texture {
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat = new THREE.Vector2(tiling, tiling)
    tex.needsUpdate = true
    return tex
  }

  applyEnvMap (model: Group | Mesh | any, intensity = 1) {
    if (this.hdrCubeRenderTarget) {
      if (model instanceof Group) {
        model.children.forEach((child: Group | Mesh | any) => {
          this.applyEnvMap(child, intensity)
        })
      } else if (this.hasProperty(model, 'material.envMap')) {
        this.setMaterialEnvMap(model.material, intensity)
      }
    }
  }

  // Y a peu etre d'autre matériel qui peuvent prendre une env map (MeshBasicMaterial)
  setMaterialEnvMap (material: MeshStandardMaterial, intensity: number) {
    material.envMap = this.hdrCubeRenderTarget.texture
    material.envMapIntensity = intensity
    material.needsUpdate = true
  }

  /**
   * @param obj: Dictionary
   * @param prop: string
   * @returns Booleen
   */
  hasProperty (obj: {[key: string]: MeshBasicMaterial | MeshStandardMaterial} | MeshBasicMaterial | MeshStandardMaterial | any, prop: string) : Object {
    if (obj === null) {
      return false
    }

    if (prop.includes('.')) {
      const props = prop.split('.')
      const p = props.shift()
      if (this.hasProperty(obj, p)) {
        return this.hasProperty(obj[p], props.join('.'))
      }
    } else {
      return Object.prototype.hasOwnProperty.call(obj, prop.toString())
    }
  }

  destroy () {
    this.pmremGenerator.dispose()
  }
}
