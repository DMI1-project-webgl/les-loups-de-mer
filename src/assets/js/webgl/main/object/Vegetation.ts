import { BufferAttribute, InterleavedBufferAttribute, Vector3, Object3D, InstancedMesh, BufferGeometry, BoxBufferGeometry, IcosahedronGeometry, Matrix4, Vector4, MeshMatcapMaterial, Color, Texture, MeshBasicMaterial } from 'three'
import type BasicScene from '../../core/BasicScene'
import Rock from './Rock'

export default class Vegetation {
    public instancedMesh: InstancedMesh = null
    private scene: BasicScene = null
    private positionsVegetation: Array<Vector4> = []
    private vegetationOnAnim: Array<number> = []

    public numberVegetation: number = 0

    constructor(scene: BasicScene, positionsVegetation: Array<Vector4>) {
        this.scene = scene
        this.positionsVegetation = positionsVegetation
        this.init()
    }

    // Initialization
    init() {
        let glTFGeometry: BufferGeometry
        const mesh = this.scene.loader.getAsset('SCN3_CoralBundle_v5')
        mesh.traverse((child: any) => {

            if ( child.isMesh ) {

                //Setting the buffer geometry
                glTFGeometry = child.geometry;
                
            }
        
        } );


        const dummy = new Object3D()


        // const material = new MeshMatcapMaterial()
        // material.matcap = this.scene.loader.getAsset('TEXTURE_SCN3_MatcapGrass') as Texture

        const material = new MeshBasicMaterial()
        material.map = this.scene.loader.getAsset('TEXTURE_SCN3_Color') as Texture

        this.instancedMesh = new InstancedMesh(glTFGeometry, material, this.positionsVegetation.length)
        this.scene.add(this.instancedMesh)

        for (let i = 0; i < this.positionsVegetation.length; i = i + 1) {

            const position = this.positionsVegetation[i]

            dummy.position.set(
                position.x,
                position.y,
                position.z
            )

            // dummy.scale.set(6,6,1)
            dummy.scale.set(0.82,0.07,0.82)

            dummy.lookAt(position.x * 10, position.y * 10, position.z * 10)

            dummy.rotateX(3.14 / 2)

            dummy.rotateY(6.28 * Math.random());
            
            dummy.updateMatrix()
            this.instancedMesh.setMatrixAt(i, dummy.matrix)
        }
    }

    scaleVegetation(index: number) {
        if (this.positionsVegetation[index].w >= 1) return
        this.positionsVegetation[index].w ++
        this.vegetationOnAnim.push(index);
    }

    reset() {
        this.positionsVegetation.forEach((vec, index) => {
            if (vec.w != 0) {
                vec.w = 0
                this.numberVegetation = 0
                this.scene.signal.dispatch(["number-coraux", this.numberVegetation])
                const mat4 = new Matrix4().scale(new Vector3(1,0.13,1))
                const mat42 = new Matrix4().makeTranslation(0,-60,0)
                let currentMat = new Matrix4()
                this.instancedMesh.getMatrixAt(index, currentMat)

                this.instancedMesh.setMatrixAt(index, currentMat.multiply(mat4).multiply(mat42))

                this.instancedMesh.instanceMatrix.needsUpdate = true
            }
        })
    }

    update (deltaSeconds: number) {
        this.vegetationOnAnim.forEach((index: number, i: number) => {
            const vec = this.positionsVegetation[index]
            if (vec.w >= 10) {
                this.vegetationOnAnim.splice(i, 1);
                this.numberVegetation ++
                this.scene.signal.dispatch(["number-coraux", this.numberVegetation])
            }
            vec.w ++

            // const mat4 = new Matrix4().scale(new Vector3(1,1,1.7 - vec.w * 0.07))
            const mat4 = new Matrix4().scale(new Vector3(1,1.7 - vec.w * 0.07,1))
            const mat42 = new Matrix4().makeTranslation(0,1,0)
            let currentMat = new Matrix4()
            this.instancedMesh.getMatrixAt(index, currentMat)

            this.instancedMesh.setMatrixAt(index, currentMat.multiply(mat4).multiply(mat42))

            this.instancedMesh.instanceMatrix.needsUpdate = true

        })
    }

    // Memory management
    destroy() {
        this.instancedMesh.dispose()
    }
}