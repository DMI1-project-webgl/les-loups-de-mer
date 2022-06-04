import { FrontSide, Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from 'three'
import BasicObject3D from '../../core/BasicObject3D'

function getHitbox() {
  const geometry = new SphereGeometry(30, 30, 30)
  const material = new MeshBasicMaterial({
      side: FrontSide,
      transparent: true,
      opacity: 0.0
  });
  const mesh = new Mesh(geometry, material);
  return mesh;
}

export default class Trash extends BasicObject3D {
  private model: Object3D = null

  private glowing: boolean = false

  constructor(model: Object3D) {
    super(model)
    this.model = model
  }

  // Need to be call after `applyMaterial()`
  applyHitbox() {
    this.add(getHitbox())
  } 

  glow() {
    if (this.glowing) return;

    this.glowing = true
    
    for(let child of this.model.children) {
      if (child instanceof Mesh) {
        child.material.color.setHex(0x3333AA)
      } else {
        for(let childOfGroup of child.children) {
          (childOfGroup as Mesh<any, any>).material.color.setHex(0x3333AA)
        }
      }
    }
  }

  unglow() {
    if (!this.glowing) return;

    this.glowing = false

    for(let child of this.model.children) {
      if (child instanceof Mesh) {
        child.material.color.setHex(0xFFFFFF)
      } else {
        for(let childOfGroup of child.children) {
          childOfGroup.material.color.setHex(0xFFFFFF)
        }
      }
    }
  }
}