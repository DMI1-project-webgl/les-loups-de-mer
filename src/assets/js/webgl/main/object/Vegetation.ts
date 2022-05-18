import { BufferAttribute, InterleavedBufferAttribute, Vector3, Group, Object3D, AnimationMixer, AnimationClip, InstancedMesh, BufferGeometry, BoxBufferGeometry, IcosahedronGeometry, MeshPhongMaterial, Matrix4, Vector4 } from 'three'
import type BasicScene from '../../core/BasicScene'

export default class Vegetation {
    public instancedMesh!: InstancedMesh
    private geometry!: IcosahedronGeometry
    private positions!: BufferAttribute | InterleavedBufferAttribute
    private scene!: BasicScene
    private positionsVegetation: Array<Vector4> = []
    private vegetationOnAnim: Array<number> = []

    constructor(scene: BasicScene) {
        this.scene = scene
        this.init()
    }

    // Initialization
    init() {
        this.geometry = new IcosahedronGeometry( 108, 3 );
        this.positions = this.geometry.getAttribute('position')

        let glTFGeometry: BufferGeometry
        this.scene.loader.getAsset('CoralTestALONE').traverse((child: any) => {

            if ( child.isMesh ) {

                //Setting the buffer geometry
                glTFGeometry = child.geometry;
                
            }
        
        } );


        const dummy = new Object3D()
        const material = new MeshPhongMaterial( { color: 0x00ee99 } )
        const count = this.getVertexCount()
       
        for (let i = 0; i < count; i = i + 1) {
            const position = this.getVertexPosition(i)

            let isInclude = false

            this.positionsVegetation.forEach((v: Vector4) => {
                if (v.x === position.x && v.y === position.y && v.z === position.z) {
                    isInclude = true
                    return
                }
            })
            if (!isInclude) {
                this.positionsVegetation.push(new Vector4(position.x, position.y, position.z, 0));
            }
        }

        this.instancedMesh = new InstancedMesh(glTFGeometry, material, this.positionsVegetation.length)
        this.scene.add(this.instancedMesh)

        for (let i = 0; i < this.positionsVegetation.length; i = i + 1) {

            const position = this.positionsVegetation[i]

            dummy.position.set(
                position.x,
                position.y,
                position.z
            )

            dummy.scale.set(5,5,1)

            dummy.lookAt(position.x * 10, position.y * 10, position.z * 10)
            
            dummy.updateMatrix()
            this.instancedMesh.setMatrixAt(i, dummy.matrix)
        }
    }

    scaleVegetation(index: number) {
        if (this.positionsVegetation[index].w >= 1) return
        this.positionsVegetation[index].w ++
        this.vegetationOnAnim.push(index);
    }

    update (deltaSeconds: number) {
        this.vegetationOnAnim.forEach((index: number, i: number) => {
            const vec = this.positionsVegetation[index]
            if (vec.w >= 10) {
                this.vegetationOnAnim.splice(i, 1);
            }
            vec.w ++

            const mat4 = new Matrix4().scale(new Vector3(1,1,1.7 - vec.w * 0.07))
            let currentMat = new Matrix4()
            this.instancedMesh.getMatrixAt(index, currentMat)

            this.instancedMesh.setMatrixAt(index, currentMat.multiply(mat4))

            this.instancedMesh.instanceMatrix.needsUpdate = true

        })
    }

    getVertexPosition(index: number): Vector3 {
        return new Vector3(
            this.positions.array[index * 3 + 0],
            this.positions.array[index * 3 + 1],
            this.positions.array[index * 3 + 2],
        )
    }

    getVertexCount() : number {
        return this.positions.count
    }

    // Memory management
    destroy() {
        this.instancedMesh.dispose()
    }
}