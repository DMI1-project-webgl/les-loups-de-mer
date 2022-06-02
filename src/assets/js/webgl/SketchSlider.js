import * as THREE from 'three';
import { gsap } from 'gsap';
import { Timeline } from 'gsap/gsap-core';

export default class SketchSlider {
    constructor(canvas, videos, opts) {
      this.videos = videos
      this.scene = new THREE.Scene();
      this.vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;
      this.fragment = opts.fragment;
      this.uniforms = opts.uniforms;
      this.renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
      this.width = canvas.offsetWidth;
      this.height = canvas.offsetHeight;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0xfef9f0, 0);
      // this.scene.background = new THREE.Color(0xfef9f0);
      this.duration = opts.duration || 1;
      this.debug = opts.debug || false
      this.easing = opts.easing || 'power2'
  
      this.clickerNext = document.querySelector(".slider--arrow-next");
      this.clickerPrevious = document.querySelector(".slider--arrow-prev");
  
  
      this.container = document.getElementById("content-slider");
      if (!this.container) return
      this.width = canvas.offsetWidth;
      this.height = canvas.offsetHeight;
  
      this.camera = new THREE.PerspectiveCamera(
        70,
        this.width / this.height,
        0.001,
        1000
      );
  
      this.camera.position.set(0, 0, 2);
      this.time = 0;
      this.current = 0;
      this.textures = [];
  
      this.paused = true;
      this.initiate()
      this.setupResize();
      this.settings();
      this.addObjects();
      this.resize();
      this.clickEvent();
      this.play();
    }
  
    initiate(){
      this.videos.forEach((video, i) => {
        // video.play()
        this.textures[i] = new THREE.VideoTexture(video)
      })
    }
  
    clickEvent(){
      this.next = this.next.bind(this)
      this.previous = this.previous.bind(this)
      this.clickerNext.addEventListener('click',this.next)
      this.clickerPrevious.addEventListener('click',this.previous)
    }
    settings() {
      let that = this;
      this.settings = {progress:0.05};
  
      Object.keys(this.uniforms).forEach((item)=> {
        this.settings[item] = this.uniforms[item].value;
      })
    }
  
    setupResize() {
      window.addEventListener("resize", this.resize.bind(this));
    }
  
    resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      
  
      // image cover
      this.imageAspect = 400/480;
      let a1; let a2;
      if(this.height/this.width>this.imageAspect) {
        a1 = (this.width/this.height) * this.imageAspect ;
        a2 = 1;
      } else{
        a1 = 1;
        a2 = (this.height/this.width) / this.imageAspect;
      }
  
      this.material.uniforms.resolution.value.x = this.width;
      this.material.uniforms.resolution.value.y = this.height;
      this.material.uniforms.resolution.value.z = a1;
      this.material.uniforms.resolution.value.w = a2;
  
      const dist  = this.camera.position.z;
      const height = 1;
      this.camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));
  
      this.plane.scale.x = this.camera.aspect;
      this.plane.scale.y = 1;
  
      this.camera.updateProjectionMatrix();
  
  
    }
  
    addObjects() {
      let that = this;
      this.material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: { type: "f", value: 0 },
          progress: { type: "f", value: 0 },
          border: { type: "f", value: 0 },
          intensity: { type: "f", value: 0 },
          scaleX: { type: "f", value: 40 },
          scaleY: { type: "f", value: 40 },
          a1: { type: "f", value: 0.25 * Math.PI },
          a2: { type: "f", value: -0.75 * Math.PI },
          transition: { type: "f", value: 40 },
          swipe: { type: "f", value: 0 },
          width: { type: "f", value: 0 },
          radius: { type: "f", value: 0 },
          texture1: { type: "f", value: this.textures[0] },
          texture2: { type: "f", value: this.textures[1] },
          displacement: { type: "f", value: new THREE.TextureLoader().load('./src/assets/img/disp1.jpg') },
          resolution: { type: "v4", value: new THREE.Vector4() },
        },
        // wireframe: true,
        vertexShader: this.vertex,
        fragmentShader: this.fragment
      });
  
      this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
  
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
    }
  
    stop() {
      this.paused = true;
    }
  
    play() {
      this.paused = false;
      this.render();
    }
  
    next(){

      this.videos.forEach((video, i) => {
        video.play()
      })

      // if(this.isRunning) return;
      this.isRunning = true;
      let len = this.textures.length;
      let nextTexture =this.textures[(this.current +1)%len];
      this.material.uniforms.texture2.value = nextTexture;
      let tl = new Timeline();
      this.material.uniforms.a1.value =  0.25 * Math.PI; 
      this.material.uniforms.a2.value =  -0.75 * Math.PI; 
      tl.to(this.material.uniforms.progress,this.duration,{
        value:1,
        ease: this.easing,
        onComplete:()=>{
          this.current = (this.current +1)%len;
          this.material.uniforms.texture1.value = nextTexture;
          this.material.uniforms.progress.value = 0;
          this.isRunning = false;

      }})
    }

    previous(){

      this.videos.forEach((video, i) => {
        video.play()
      })

      // if(this.isRunning) return;
      this.isRunning = true;
      let len = this.textures.length;
      let nextTexture =this.textures[this.current === 0 ? len - 1 : (this.current -1)%len];
      this.material.uniforms.texture2.value = nextTexture;
      let tl = new Timeline();
      this.material.uniforms.a2.value =  0.25 * Math.PI; 
      this.material.uniforms.a1.value =  -0.75 * Math.PI; 
      tl.to(this.material.uniforms.progress,this.duration,{
        value:1,
        ease: this.easing,
        onComplete:()=>{
          this.current = this.current === 0 ? len - 1 : (this.current -1)%len;
          this.material.uniforms.texture1.value = nextTexture;
          this.material.uniforms.progress.value = 0;
          this.isRunning = false;
      }})
    }

    render() {
      if (this.paused) return;
      this.time += 0.05;
      this.material.uniforms.time.value = this.time;
      // this.material.uniforms.progress.value = this.settings.progress;
  
      Object.keys(this.uniforms).forEach((item)=> {
        this.material.uniforms[item].value = this.settings[item];
      });
  
      // this.camera.position.z = 3;
      // this.plane.rotation.y = 0.4*Math.sin(this.time)
      // this.plane.rotation.x = 0.5*Math.sin(0.4*this.time)
  
      requestAnimationFrame(this.render.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }