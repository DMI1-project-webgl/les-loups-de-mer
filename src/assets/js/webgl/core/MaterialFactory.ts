import { Color, CubeTexture, Group, Mesh, MeshBasicMaterial, MeshMatcapMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PMREMGenerator, Texture, WebGLRenderTarget } from 'three'
import * as THREE from 'three'
import type BasicScene from './BasicScene'
import type Loader from './Loader'

export default class MaterialFactory {

  private loader: Loader
  private pmremGenerator: PMREMGenerator
  private materials: {
    [key: string]: MeshBasicMaterial | MeshStandardMaterial | MeshPhysicalMaterial | MeshMatcapMaterial,
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
  getMaterial (name:string): MeshBasicMaterial | MeshStandardMaterial | MeshPhysicalMaterial | MeshMatcapMaterial  {
    let materialName = 'default'
    console.log(name)
    switch (name) {
      case 'Can':
        materialName = 'matCapMetal'
        break

      case 'Drink':
        materialName = 'matCapMetal'
        break

      // Bottle
      case 'Body':
        materialName = 'matCapPlastic'
        break

      case 'Caps':
        materialName = 'matCapPlasticBlue'
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
      case 'Ceinture_requin':
        materialName = 'MatCapSharkBody'
        break

      case 'Aileron_requin':
        materialName = 'MatCapAilerons'
        break

      case 'StarFish':
          materialName = 'starFish'
          break
      
      // Rock
      case 'Rock1':
        materialName = 'rock'
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
      case 'brush': {
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

      case 'MatCapSharkBody': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCN2_MatcapShark') as Texture
        material = m
        break
      }

      case 'MatCapAilerons': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCN0_MatAilron') as Texture
        material = m
        break
      }

      case 'rock': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCNO_Rock') as Texture
        material = m
        break
      }

      case 'matCapMetal': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCN2_MatcapMetal') as Texture
        material = m
        break
      }

      case 'matCapPlastic': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCN2_MatcapPlastic') as Texture
        material = m
        break
      }

      case 'matCapPlasticBlue': {
        const m = new MeshMatcapMaterial()
        m.matcap = this.loader.getAsset('TEXTURE_SCN2_MatPlaticBlue') as Texture
        material = m
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
