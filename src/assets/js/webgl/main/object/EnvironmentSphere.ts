import { BufferAttribute, InterleavedBufferAttribute, SphereGeometry, Mesh, MeshBasicMaterial, Vector3, Group, Object3D, IcosahedronGeometry, ShaderMaterial, Sphere, DoubleSide, Color, AdditiveBlending, Vector4 } from 'three'
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

    const geometry = new SphereGeometry(170, 80, 80)
    const material = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: { 
            anglePower: {
                value: 16
            },
            lightColor: {
                value: new Color(0x96916D) // 0x155AAA (bleu marin de gazoduc) // 0x96916D (gris moche de maelys) // 0xCAC92B (vert chicane)
            },
            attenuation: {
                value: 1
            }
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
    private smog: Mesh = null
    public positionsElements: Array<Vector4> = []
    public mesh: Mesh

    constructor() {
        const mesh = getSphereMesh()
        super(mesh);
        this.mesh = mesh
        this.initIsocahedron()
    }

    initIsocahedron() {
        const geometry = new IcosahedronGeometry( 108, 2 );
        const positions = geometry.getAttribute('position')
        const count = positions.count
       
        for (let i = 0; i < count; i = i + 1) {
            const position = this.getVertexPosition(positions, i)

            let isInclude = false

            this.positionsElements.forEach((v: Vector4) => {
                if (v.x === position.x && v.y === position.y && v.z === position.z) {
                    isInclude = true
                    return
                }
            })
            if (!isInclude) {
                this.positionsElements.push(new Vector4(position.x, position.y, position.z, 0));
            }
        }
    }

    getVertexPosition(positions: BufferAttribute | InterleavedBufferAttribute, index: number): Vector3 {
        return new Vector3(
            positions.array[index * 3 + 0],
            positions.array[index * 3 + 1],
            positions.array[index * 3 + 2],
        )
    }

    reducePollutionSmog(alpha: number) {
        if (alpha > 1) return
        ((this.smog.material as ShaderMaterial).uniforms.lightColor.value as Color).lerpColors(new Color(0x96916D), new Color(0x7799ff), alpha)
    }

    addPollutionSmog() {
        const smog = getPollutionSmog()
        this.smog = smog
        this.add(smog)
    }

    removePollutionSmog() {
        this.smog.removeFromParent();
    }
}