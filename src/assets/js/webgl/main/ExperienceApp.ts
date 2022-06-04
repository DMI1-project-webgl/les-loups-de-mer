import BasicApp from "../core/BasicApp";
import type Signal from "../utils/Signal";
import ExperienceScene from "./ExperienceScene";
import Element from "../core/Element"

import can from '@/assets/js/webgl/models/SCN2_Can_v1.gltf?url'
import drink from '@/assets/js/webgl/models/SCN2_Drink_v3.gltf?url'
import tooth from '@/assets/js/webgl/models/SCN2_ToothBrush_v1.gltf?url'
import bottle from '@/assets/js/webgl/models/SCN2_Bottle_v3.gltf?url'
import shark from '@/assets/js/webgl/models/SCN0_Shark_v4.gltf?url'
import rock from '@/assets/js/webgl/models/SCN0_Rock1_v1.glb?url'
import coral from '@/assets/js/webgl/models/SCN3_CoralBundle_v5.gltf?url'

import ailronMat from '@/assets/js/webgl/textures/TEXTURE_SCN0_MatAilron.jpg'
import rockMat from '@/assets/js/webgl/textures/TEXTURE_SCNO_Rock.jpeg'
import platicS from '@/assets/js/webgl/textures/TEXTURE_SCN2_PlasticSecular.jpg'
import plasticC from '@/assets/js/webgl/textures/TEXTURE_SCN2_PlasticColor.jpg'
import plasticN from '@/assets/js/webgl/textures/TEXTURE_SCN2_PlasticNormal.jpg'
import plasticR from '@/assets/js/webgl/textures/TEXTURE_SCN2_PlasticRoughness.jpg'
import metal from '@/assets/js/webgl/textures/TEXTURE_SCN2_MatcapMetal.jpg'
import plastic from '@/assets/js/webgl/textures/TEXTURE_SCN2_MatcapPlastic.jpg'
import plasticBlue from '@/assets/js/webgl/textures/TEXTURE_SCN2_MatPlaticBlue.jpeg'
import sharkMat from '@/assets/js/webgl/textures/TEXTURE_SCN2_MatcapShark.jpg'
import colorMat from '@/assets/js/webgl/textures/TEXTURE_SCN3_Color.jpg'

export default class ExperienceApp extends BasicApp {
    constructor (canvas: HTMLCanvasElement, signal: Signal, container: HTMLElement = null) {
        super(canvas, signal)
        
        this.scene = new ExperienceScene(this, canvas, this.signal)
        this.scenes.push(this.scene)
    }

    getAssets () {
        return {
          models: [
            new Element(can, 'SCN2_Can_v1'),
            new Element(drink, 'SCN2_Drink_v3'),
            new Element(tooth, 'SCN2_ToothBrush_v1'),
            new Element(bottle, 'SCN2_Bottle_v3'),
            new Element(shark, 'SCN0_Shark_v4'),
            new Element(rock, 'SCN0_Rock1_v1'),
            new Element(coral, 'SCN3_CoralBundle_v5'),
          ] as Element[],
          textures: [
            new Element(ailronMat, 'TEXTURE_SCN0_MatAilron'),
            new Element(rockMat, 'TEXTURE_SCNO_Rock'),
            new Element(platicS, 'TEXTURE_SCN2_PlasticSecular'),
            new Element(plasticC, 'TEXTURE_SCN2_PlasticColor'),
            new Element(plasticN, 'TEXTURE_SCN2_PlasticNormal'),
            new Element(plasticR, 'TEXTURE_SCN2_PlasticRoughness'),
            new Element(metal, 'TEXTURE_SCN2_MatcapMetal'),
            new Element(plastic, 'TEXTURE_SCN2_MatcapPlastic'),
            new Element(plasticBlue, 'TEXTURE_SCN2_MatPlaticBlue'),
            new Element(sharkMat, 'TEXTURE_SCN2_MatcapShark'),
            new Element(colorMat, 'TEXTURE_SCN3_Color'),
          ] as Element[],
          envs: [] as string[],
          hdr: [] as string[]
        }
      }
    
      getAssetsBasePath () {
        return '/src/assets/js/webgl/'
      }
}