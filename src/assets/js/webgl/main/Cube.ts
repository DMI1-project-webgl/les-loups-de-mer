import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import BasicObject3D from '../core/BasicObject3D'

export default class Cube extends BasicObject3D {

    private mesh: Mesh
    private geometry: BoxGeometry
    private material: MeshBasicMaterial

    constructor (width : number = 1, height: number = 1, depth:number = 1, color: number = 0xffffff) {
        super ()

        this.geometry = new BoxGeometry(width, height, depth)
        this.material = new MeshBasicMaterial({color})
        this.mesh = new Mesh(this.geometry, this.material)

        this.add(this.mesh)
    }

    getScale () {
        return 1.1
    }

    update (deltaTime: number) {
        super.update(deltaTime)

        this.rotation.y = - this.time * 0.1
    }
}