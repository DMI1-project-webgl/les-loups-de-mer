import { BufferAttribute, InterleavedBufferAttribute, SphereGeometry, Mesh, MeshBasicMaterial, Vector3, Group, Object3D, IcosahedronGeometry, ShaderMaterial, Sphere, DoubleSide, Color, AdditiveBlending } from 'three'
import BasicObject3D from '../../core/BasicObject3D'

import sphereFragmentShader from '../../shaders/sphere_fragment.glsl?raw'
import sphereVertexShader from '../../shaders/sphere_vertex.glsl?raw'

import pollutionFragmentShader from '../../shaders/pollution_fragment.glsl?raw'
import pollutionVertexShader from '../../shaders/pollution_vertex.glsl?raw'


function getSphereMesh() {
    let speed: number = 0.08
    let size: number = 115
    let color: number = 0.55
    let density: number = 2.5
    let strength: number = 0.02
    let offset: number = Math.PI * 2

    const vertexShader = sphereVertexShader
    const fragmentShader = sphereFragmentShader

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

function getPollutionSmog() {
    const vertexShader = pollutionVertexShader
    const fragmentShader = pollutionFragmentShader

    const geometry = new SphereGeometry(150, 80, 80)
    const material = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: { 
            attenuation: {
                value: 1.15
            },
            anglePower: {
                value: 16
            },
            spotPosition: {
                value: new Vector3(0, 0, 0)
            },
            lightColor: {
                value: new Color(0xCAC92B)
            },
        },
        side: DoubleSide,
        // Sympa pour donner un effet clair au milieu
        // blending	: AdditiveBlending,
        transparent: true,
        depthWrite: false,
    });
    const basicMaterial = new MeshBasicMaterial({
        color: 0xff0000
    })

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

    constructor() {
        super(getSphereMesh());
        
        this.add(getPollutionSmog())
    }

    // Initialization
    init() {
        this.geometry = new SphereGeometry( 5, 40, 28 );
        this.positions = this.geometry.getAttribute('position')
        this.normals = this.geometry.getAttribute('normal')
        this.material = new MeshBasicMaterial( { color: 0x919191, visible: true } );
        this.mesh = new Mesh(this.geometry,this.material);
    }

    // Memory management
    destroy() {
        this.geometry.dispose();
    }
}