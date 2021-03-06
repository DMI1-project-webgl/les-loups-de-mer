import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import { HalfFloatType, ShaderMaterial, WebGLRenderer,Texture, RepeatWrapping, Color, DoubleSide, Mesh, Scene, Vector3} from 'three';
import fishFragmentShader from '../../shaders/fish/fishFragmentShader.glsl?raw';
import fishVertexShader from '../../shaders/fish/fishVertexShader.glsl?raw';
import fragmentPositionShader from '../../shaders/fish/fragmentPosition.glsl?raw';
import fragmentVelocityShader from '../../shaders/fish/fragmentVelocity.glsl?raw';
import FishGeometry from './FishGeometry';
// import { GUI } from 'lil-gui'
import type ExperienceScene from '../ExperienceScene';

export interface IUniform<TValue = any> {
    value: TValue;
}

export enum FishStep {
    FIRST = 0,
    SECOND = 25,
    THIRD = 50,
    FOURTH = 75,
    FITH = 100
}

type GPUVariableDetail = {
    name: string;
    initialValueTexture: Texture;
    material: ShaderMaterial;
    dependencies: any;
    renderTargets: any[];
    wrapS: any;
    wrapT: any;
    minFilter: any;
    magFilter: any;
};

type FishUniform = {
    'color': { value: Color },
    'texturePosition': { value: any },
    'textureVelocity': { value: any },
    'time': { value: number },
    'delta': { value: number },
    'number': { value: number }
}

export default class MainFish {

    private renderer: WebGLRenderer = null
    private scene: Scene = null
    public WIDTH: number = 32 // 64
    private BOUNDS: number = 200 // 800
    private velocityVariable: GPUVariableDetail = null
    private positionVariable: GPUVariableDetail = null
    private positionUniforms: { [uniform: string]: IUniform<any>; } = null
    private velocityUniforms: { [uniform: string]: IUniform<any>; } = null
    private fishUniforms: FishUniform = null
    private last: number = performance.now();
    private gpuCompute: GPUComputationRenderer = null
    private fishGeometry: FishGeometry = null

    private fishMesh: Mesh = null;
    
    constructor(renderer: WebGLRenderer, scene: Scene) {
        this.renderer = renderer
        this.scene = scene;

        (this.scene as ExperienceScene).signal.add(this.onSignal.bind(this))

        this.fishGeometry = new FishGeometry(this.WIDTH)

        // For Vertex and Fragment
        this.fishUniforms = {
            'color': { value: new Color(0xff2200 ) },
            'texturePosition': { value: null },
            'textureVelocity': { value: null },
            'time': { value: 1.0 },
            'delta': { value: 0.0 },
            'number': { value: 0.0 }
        };

        this.initComputeRenderer()
        this.initFishes()
    }

    onSignal (slug: Array<string|number>) {
        if (slug[0] === 'numberFish') {
            switch(slug[1]) {
                case FishStep.FIRST:
                    this.fishUniforms[ 'number' ].value = Number(0) * 2
                    break
                case FishStep.SECOND:
                    this.fishUniforms[ 'number' ].value = Number(50) * 2
                    this.velocityUniforms[ 'separationDistance' ].value = 30.0
                    break
                case FishStep.THIRD:
                    this.fishUniforms[ 'number' ].value = Number(100) * 2
                    this.velocityUniforms[ 'separationDistance' ].value = 26.0
                    break
                case FishStep.FOURTH:
                    this.fishUniforms[ 'number' ].value = Number(150) * 2
                    this.velocityUniforms[ 'separationDistance' ].value = 23.0
                    break
                case FishStep.FITH:
                    this.fishUniforms[ 'number' ].value = Number(250) * 2
                    this.velocityUniforms[ 'separationDistance' ].value = 20.0
                    break
            }
        }
    }

    initComputeRenderer() {

        this.gpuCompute = new GPUComputationRenderer( this.WIDTH, this.WIDTH, this.renderer );

        // this.gpuCompute.setDataType( HalfFloatType );

        if ( this.renderer.capabilities.isWebGL2 === false ) {

            throw 'Error: this experience does not support GLSL2'

            // TO FIX
            // this.gpuCompute.variables.( HalfFloatType );
            this.gpuCompute.setDataType( HalfFloatType );
        } 

        const dtPosition = this.gpuCompute.createTexture();
        const dtVelocity = this.gpuCompute.createTexture();
        this.fillPositionTexture( dtPosition );
        this.fillVelocityTexture( dtVelocity );

        this.velocityVariable = this.gpuCompute.addVariable( 'textureVelocity', fragmentVelocityShader, dtVelocity );
        this.positionVariable = this.gpuCompute.addVariable( 'texturePosition', fragmentPositionShader, dtPosition );

        this.gpuCompute.setVariableDependencies( this.velocityVariable, [ this.positionVariable, this.velocityVariable ] );
        this.gpuCompute.setVariableDependencies( this.positionVariable, [ this.positionVariable, this.velocityVariable ] );

        this.positionUniforms = this.positionVariable.material.uniforms;
        this.velocityUniforms = this.velocityVariable.material.uniforms;

        this.positionUniforms[ 'time' ] = { value: 0.0 };
        this.positionUniforms[ 'delta' ] = { value: 0.0 };
        this.velocityUniforms[ 'time' ] = { value: 1.0 };
        this.velocityUniforms[ 'delta' ] = { value: 0.0 };
        this.velocityUniforms[ 'testing' ] = { value: 1.0 };
        this.velocityUniforms[ 'separationDistance' ] = { value: 1.0 };
        this.velocityUniforms[ 'alignmentDistance' ] = { value: 1.0 };
        this.velocityUniforms[ 'cohesionDistance' ] = { value: 1.0 };
        this.velocityUniforms[ 'freedomFactor' ] = { value: 1.0 };
        this.velocityUniforms[ 'predator' ] = { value: new Vector3() };
        this.velocityUniforms[ 'predator2' ] = { value: new Vector3() };
        this.velocityVariable.material.defines.BOUNDS = this.BOUNDS.toFixed( 2 );

        this.velocityVariable.wrapS = RepeatWrapping;
        this.velocityVariable.wrapT = RepeatWrapping;
        this.positionVariable.wrapS = RepeatWrapping;
        this.positionVariable.wrapT = RepeatWrapping;

        const error = this.gpuCompute.init();

        if ( error !== null ) {

            console.error( error );

        }

        // const gui = new GUI();


        const effectController = {
            separation: 30.0,
            alignment: 0.0,
            cohesion: 1.0,
            freedom: 0.75,
            number: 0.0,
        };

        const valuesChanger = () => {

            this.velocityUniforms[ 'separationDistance' ].value = effectController.separation;
            this.velocityUniforms[ 'alignmentDistance' ].value = effectController.alignment;
            this.velocityUniforms[ 'cohesionDistance' ].value = effectController.cohesion;
            this.velocityUniforms[ 'freedomFactor' ].value = effectController.freedom;
            this.fishUniforms[ 'number' ].value = effectController.number;

        };

        valuesChanger();

        // gui.add( effectController, 'separation', 0.0, 100.0, 1.0 ).onChange( valuesChanger );
        // gui.add( effectController, 'alignment', 0.0, 100, 0.001 ).onChange( valuesChanger );
        // gui.add( effectController, 'cohesion', 0.0, 100, 0.025 ).onChange( valuesChanger );
        // gui.add( effectController, 'number', 0.0, 256, 1.0 ).onChange( valuesChanger );
        // gui.close();

    }

    initFishes() {
        // For Vertex and Fragment
        this.fishUniforms = {
            'color': { value: new Color(0xff2200 ) },
            'texturePosition': { value: null },
            'textureVelocity': { value: null },
            'time': { value: 1.0 },
            'delta': { value: 0.0 },
            'number': { value: 0.0 }
        };

        // THREE.ShaderMaterial
        const material = new ShaderMaterial( {
            uniforms: this.fishUniforms,
            vertexShader: fishVertexShader,
            fragmentShader: fishFragmentShader,
            side: DoubleSide,
            transparent: true
        } );

        const fishMesh = new Mesh( this.fishGeometry, material );
        this.fishMesh = fishMesh
        fishMesh.rotation.y = Math.PI / 2;
        fishMesh.matrixAutoUpdate = false;
        fishMesh.updateMatrix();
        

        this.scene.add( fishMesh );
    }

    fillPositionTexture( texture: Texture ) {
        const theArray = texture.image.data;

        for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

            const x = Math.random() * this.BOUNDS - (this.BOUNDS * 0.5);
            const y = Math.random() * this.BOUNDS - (this.BOUNDS * 0.5);
            const z = Math.random() * this.BOUNDS - (this.BOUNDS * 0.5);

            theArray[ k + 0 ] = x;
            theArray[ k + 1 ] = y;
            theArray[ k + 2 ] = z;
            theArray[ k + 3 ] = 1;
        }
    }

    fillVelocityTexture( texture: Texture ) {
        const theArray = texture.image.data;

        for ( let k = 0, kl = theArray.length; k < kl; k += 4 ) {

            const x = Math.random() - 0.5;
            const y = Math.random() - 0.5;
            const z = Math.random() - 0.5;

            theArray[ k + 0 ] = x * 10;
            theArray[ k + 1 ] = y * 10;
            theArray[ k + 2 ] = z * 10;
            theArray[ k + 3 ] = 1;
        }
    }

    render(mouseX: number, mouseY: number) {

        const now = performance.now();
        let delta = ( now - this.last ) / 1000;

        if ( delta > 1 ) delta = 1; // safety cap on large deltas
        this.last = now;

        this.positionUniforms[ 'time' ].value = now;
        this.positionUniforms[ 'delta' ].value = delta;
        this.velocityUniforms[ 'time' ].value = now;
        this.velocityUniforms[ 'delta' ].value = delta;
        this.fishUniforms[ 'time' ].value = now;
        this.fishUniforms[ 'delta' ].value = delta;


        this.velocityUniforms[ 'predator2' ].value.set( 0.5 * 0 / (window.innerWidth * 0.5), - 0.5 * 0 / (window.innerHeight * 0.5), 0 );
        this.velocityUniforms[ 'predator' ].value.set( 0.5 * mouseX / (window.innerWidth * 0.5), - 0.5 * mouseY / (window.innerHeight * 0.5), 0 );

        // mouseX = 10000;
        // mouseY = 10000;

        this.gpuCompute.compute();

        this.fishUniforms[ 'texturePosition' ].value = this.gpuCompute.getCurrentRenderTarget( this.positionVariable ).texture;
        this.fishUniforms[ 'textureVelocity' ].value = this.gpuCompute.getCurrentRenderTarget( this.velocityVariable ).texture;
    }

    destroy() {
        this.fishMesh.clear()
    }
}