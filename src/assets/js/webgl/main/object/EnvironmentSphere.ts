import { Scene, BufferAttribute, InterleavedBufferAttribute, SphereGeometry, Mesh, MeshBasicMaterial, Vector3, Group, Object3D, IcosahedronGeometry, ShaderMaterial } from 'three'
import type { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import BasicObject3D from '../../core/BasicObject3D'

import fragmentShader from '../../shaders/sphere_fragment.glsl?raw'
import vertexShader from '../../shaders/sphere_vertex.glsl?raw'

function getSphereMesh() {
    let speed: number = 0.08
    let size: number = 8
    let color: number = 0.55
    let density: number = 2.5
    let strength: number = 0.02
    let offset: number = Math.PI * 2

    const geometry = new IcosahedronGeometry( size, 64 );
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: speed },
            uNoiseDensity: { value: density },
            uNoiseStrength: { value: strength },
            uFreq: { value: 3 },
            uAmp: { value: 6 },
            uHue: { value: color },
            uOffset: { value: offset },
            red: { value: 0 },
            green: { value: 0 },
            blue: { value: 0 },
            uAlpha: { value: 1.0 },
        },
        defines: {
            PI: Math.PI
        },
        // wireframe: true,
        // side: THREE.DoubleSide
        transparent: true,
    });

    return new Mesh(geometry, material);
}

export default class EnvironmentSphere extends BasicObject3D {
    public mesh!: Mesh
    public childrens!: Group
    public childrensArray!: Array<Mesh | Object3D>
    private geometry!: SphereGeometry
    private material!: MeshBasicMaterial
    private positions!: BufferAttribute | InterleavedBufferAttribute
    private normals!: BufferAttribute | InterleavedBufferAttribute
    private loader!: GLTFLoader
    private scene!: Scene

    constructor() {
        super(getSphereMesh());
        //this.init()
    }

    // Initialization
    init() {
        this.geometry = new SphereGeometry( 5, 40, 28 );
        this.positions = this.geometry.getAttribute('position')
        this.normals = this.geometry.getAttribute('normal')
        this.material = new MeshBasicMaterial( { color: 0x919191, visible: true } );
        this.mesh = new Mesh(this.geometry,this.material);

        // this.childrens = new Group();
        // this.childrensArray = []
    
        // this.loader = new GLTFLoader();
        // this.loader.load('src/assets/js/webgl/models/grass2.glb', (gltf) => {
        //     const model = gltf.scene;
        //     this.initChild(model)
        // } );
    }

    initChild(model: Group) {
        for(let i = 0; i < this.getVertexCount(); i++) {
            const modelClone = model.clone() 
            const position = this.getVertexPosition(i)
            modelClone.position.set(
                position.x,
                position.y,
                position.z
            )
            modelClone.scale.set(1.5,1.5,0.1)
            const nomalEnd = this.getVertexNormal(i)

            modelClone.lookAt(nomalEnd.x * 10, nomalEnd.y * 10, nomalEnd.z * 10)

            this.childrens.add(modelClone)
            modelClone.children.forEach((child) => {
                this.childrensArray.push(child)
            })
        }

        this.add(this.childrens)
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

    getVertexNormal(index: number): Vector3 {
        return new Vector3(
            this.normals.array[index * 3 + 0],
            this.normals.array[index * 3 + 1],
            this.normals.array[index * 3 + 2],
        )
    }

    // Memory management
    destroy() {
        this.geometry.dispose();
    }
}