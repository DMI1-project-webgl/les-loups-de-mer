import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import BasicObject3D from '../core/BasicObject3D'

export default class Duck extends BasicObject3D {

    private gltfLoader: GLTFLoader

    constructor () {
        super ()

        this.gltfLoader = new GLTFLoader()

        this.gltfLoader.load(
            'src/assets/js/webgl/models/Duck.gltf',
            (gltf) =>
            {
                console.log('success')
                console.log(gltf)
                this.add(gltf.scene.children[0])
            },
            (progress) =>
            {
                console.log('progress')
                console.log(progress)
            },
            (error) =>
            {
                console.log('error')
                console.log(error)
            }
        )

    }

    update (deltaTime: number) {
        super.update(deltaTime)

        this.rotation.y = this.time * 0.1
    }
}