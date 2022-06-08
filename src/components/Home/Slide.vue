<script setup lang="ts">
import RoundButton from './../UI/RoundButton.vue'
</script>
<template>
  <div class="slider">
    <header class="page header">
      <div class="banner--container color--primary">
        <div class="banner--text">
          <p>Achetez notre produit et retrouvez votre vigueur d'antan - <span>CODE PROMO -2%</span> JESAUVELAPLANETE</p>
        </div>
      </div>
      <div class="banner--container color--secondary">
        <div class="header--text-upper">
          <span v-for="index in 8" :key="index">
            protégeons notre planète
          </span>
        </div>
      </div>
      <div class="header--main">
        <div class="header--logo">
          <a href="/" class="header--link">
            <img src="./../../assets/img/logo_texte.svg" alt="">
          </a>
        </div>
        <div class="header--text-container">
          <h4 class="header--text">Nos produits</h4>
        </div>
      </div>
    </header>
    <section id="slide" class="page slider color--secondary">
      <div class="container-fluid">
        <div class="row h-100">
          <div class="col-12 col-lg-4 h-lg-100">
            <div class="slider--content-container" :class="index == 0 ? 'content-active' : 'content-disable'">
              <h2 class="slider--title decoration">Les flocons</h2>
              <h3 class="slider--subtitle">Vitalité</h3>
              <p class="slider--text"> Coup de boost immédiat les flocons de cartilage réduisent la fatigue, maintiennent l'énergie dans la durée, favorisent le désir et la libido, retrouvez l'énergie et la vivacité d’un grand requin marteau !</p>
            </div>
            <div class="slider--content-container" :class="index == 1 ? 'content-active' : 'content-disable'">
              <h2 class="slider--title decoration">L'huile</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Cette huile à base d'aileron de roussette résout les problèmes de mémoire. Il la stimule en favorisant le ralentissement du vieillissemet cérébral et en augmentant les capacités de concentration et de mémorisation !</p>
            </div>
            <div class="slider--content-container" :class="index == 2 ? 'content-active' : 'content-disable'">
              <h2 class="slider--title decoration">Le bouillon</h2>
              <h3 class="slider--subtitle">Force</h3>
              <p class="slider--text">Le complexe synergique du bouillon issu de l'aileron du requin blanc permet de préserver une bonne santé osseuse. Il contribue à une bonne circulation du sang pour réduire durablement les sensations de douleurs articulaires ! </p>
            </div>
          </div>
          <div class="col-12 col-lg-7 h-lg-100">
            <div class="slider--canvas-container">
              <div class="elements-slider">
                <!-- <img v-if="index == 2" src="@/assets/img/slider/bouillon.png" class="element-slider">
                <img v-if="index == 0" src="@/assets/img/slider/epices.png" class="element-slider">
                <img v-if="index == 1" src="@/assets/img/slider/huile.png" class="element-slider"> -->
                <div id="content-slider" class="content-slider" style="height: 100%">
                  <!-- <div id="slider-slider" data-images='["./../../src/assets/img/slider/elephant.gif","./../../src/assets/img/slider/epices.png"]' data-disp="./../../src/assets/img/slider/epices.png">
                  </div> #} -->
                  <video ref="video01" loop crossOrigin="anonymous" playsinline style="display:none" class="video-slider">
                    <source src="./../../../src/assets/img/slider/epice.webm"
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                  </video>
                  <video ref="video02" loop crossOrigin="anonymous" playsinline style="display:none" class="video-slider">
                    <source src="./../../../src/assets/img/slider/huile.webm"
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                  </video>
                  <video ref="video03" loop crossOrigin="anonymous" playsinline style="display:none" class="video-slider">
                    <source src="./../../../src/assets/img/slider/bouillon.webm"
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                  </video>
                </div>
                <canvas ref="slider" style="transform: translateY(-100%); pointer-events: none"></canvas>
              </div>
              <button @click="slidePrev" id="prev" class="slider--arrow-prev slider--arrow"><img src="./../../assets/img/arrow.svg" alt=""></button>
              <button @click="slideNext" id="next" class="slider--arrow-next slider--arrow"><img src="./../../assets/img/arrow.svg" alt=""></button>
            </div>
          </div>
          <div class="col-1 slider--btn-container">
            <RoundButton link="/valeurs" text="Nos valeurs" :isClickHear="true" :isWhite="false" :isRouterLink="true" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from './Canvas.vue'
import SketchSlider from './../../assets/js/webgl/SketchSlider';
import Sketch from '../../assets/js/webgl/Sketch';

export default defineComponent({
    name: "SlidePage",
    props: ["index"],
    emits: ["slide"],
    data: () => {
      return ({
        onAnim: false,
        sketch: undefined
      })
    },
    mounted() {
      this.sketch = new SketchSlider(this.$refs.slider, [this.$refs.video01, this.$refs.video02, this.$refs.video03],{
	debug: true,
	uniforms: {
		intensity: {value: 0.4, type:'f', min:0., max:3}
	},
	fragment: `
		uniform float time;
		uniform float progress;
		uniform float intensity;
		uniform float width;
		uniform float scaleX;
		uniform float scaleY;
		uniform float transition;
		uniform float radius;
		uniform float swipe;
		uniform float a1;
		uniform float a2;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform sampler2D displacement;
		uniform vec4 resolution;
		varying vec2 vUv;
		mat2 getRotM(float angle) {
		    float s = sin(angle);
		    float c = cos(angle);
		    return mat2(c, -s, s, c);
		}
		const float PI = 3.1415;
		// const float angle1 = PI * 0.25;
		// const float angle2 = PI * -0.75;

    // const float angle1 = PI * -0.75;
		// const float angle2 = PI * 0.25;


		void main()	{
			vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

			vec4 disp = texture2D(displacement, newUV);
			vec2 dispVec = vec2(disp.r, disp.g);

			vec2 distortedPosition1 = newUV + getRotM(a1) * dispVec * intensity * progress;
			vec4 t1 = texture2D(texture1, distortedPosition1);

			vec2 distortedPosition2 = newUV + getRotM(a2) * dispVec * intensity * (1.0 - progress);
			vec4 t2 = texture2D(texture2, distortedPosition2);

			gl_FragColor = mix(t1, t2, progress);

		}

	`
});
    },
    methods: {
        slideNext() {
          if (this.onAnim) return
          this.onAnim = true
          this.sketch.next()
          this.$emit("slide", "next");
          setTimeout(() => {
            this.onAnim = false
          }, 1000)
          this.signal.dispatch(['click-general'])
        },
        slidePrev() {
          if (this.onAnim) return
          this.onAnim = true
          this.sketch.previous()
          this.$emit("slide", "prev");
          setTimeout(() => {
            this.onAnim = false
          }, 1000)
          this.signal.dispatch(['click-general'])
        }
    },
    beforeDestroy() {
    },
    components: { Canvas }
})
</script>

<style scoped>
.slider {
  position: relative;
}
.slider header {
  position: absolute;
}
.slider--content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  transition: opacity 1s cubic-bezier(0.165, 0.840, 0.440, 1.000), transform 1s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  position: absolute;
}

.banner--text {
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.banner--text span {
  letter-spacing: 2px;
}

.content-slider:after {
  content: '';
  height: 100%;
  width: 80px;
  position: absolute;
  z-index: 1;
   background: linear-gradient(90deg, rgba(254, 249, 240,1) 0%, rgba(254, 249, 240,0) 100%);
  top: 0;
  left: 0;
  pointer-events: none;
}

.content-slider:before {
  content: '';
  height: 100%;
  width: 80px;
  position: absolute;
  z-index: 1;
  background: linear-gradient(90deg, rgba(254, 249, 240,0) 0%, rgba(254, 249, 240,1) 100%);
  top: 0;
  right: 0;
  pointer-events: none;
}

.content-active {
  pointer-events: all;
}

.content-disable {
  pointer-events: none;
}

.slider--text {
  margin: 30px 0;
}

.decoration {
  position: relative;
}
.slider--title.decoration::before {
  content: "*";
  font-size: 3rem;
  position: absolute;
  left: -30px;
  top: 9px;
}

.slider--arrow-prev {
  z-index: 5;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-primary);
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.slider--arrow-prev img {
  width: 15px;
  transform: rotate(90deg);
}
.slider--arrow-next {
  z-index: 5;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  border: 1px solid var(--color-primary);
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.slider--arrow-next img {
  width: 15px;
  transform: rotate(-90deg);
}
.slider--canvas-container {
  max-width: 700px;
  height: 100%;
  width: 100%;
  margin-left: auto;
}

.slider--arrow::before {
  position: absolute;
  content: '';
  width: 50px;
  height: 50px;
  transform: scale(0);
  left: -1px;
  top: -1px;
  background: var(--color-primary);
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.slider--arrow:hover:before {
  transform: scale(1);
}

.slider--arrow:hover img {
  filter: brightness(0) invert(1);
}

.slider--arrow:hover {
  transform: scale(1.15) translate(0, -44%);
}
canvas {
  height: 100%;
  width: 100%;
}
/* HEADER */
header {
  pointer-events: none;
  z-index: 1;
}
.header--main {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 97%;
  border-right: 1px solid currentColor;
  z-index: 1;
  margin-top: 3%;
}
.header--logo {
  width: 100%;
  padding: 10px 30px 10px 10px;
  position: absolute;
  right: 0;
  transform: translate(100%, 0);
}
.header--text-container {
  white-space: nowrap;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(31%, 100%) rotate(-90deg);
}
.banner--container {
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  border-bottom: 2px solid currentColor;
  padding: 5px 0;
}
.header--text {
  font-size: .5em;
}
.header--text-upper {
  text-transform: uppercase;
  white-space: nowrap;
}
.header--link {
  width: 100%; 
  height: 100%;
  pointer-events: all;
}
.elements-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.element-slider {
  width: 120%;
  height: 100%;
  position: absolute;
  inset: 0;
  left: -10%;
  object-fit: contain;
}


.banner--container {
  border-top: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding: 6px 0 4px 0;
  width: 100%;
  overflow: hidden;
}
.header--text-upper {
  font-family: "leaguespartan";
  font-size: 0.5em;
  font-weight: 400;
  line-height: 1em;
  width: 200%;
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
  animation: marquee 50s linear infinite;
  white-space: nowrap;
}

.header--text-upper span {
  display: block;
  width: 25%;
}

@keyframes marquee {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

.content-active .slider--title {
  opacity: 1;
  transform: translateY(0) scaleY(1);
  transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
}

.content-disable .slider--title {
  opacity: 0;
  transform-origin: bottom;
  transform: translateY(-10px) scaleY(1.08);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.content-active .slider--subtitle {
  opacity: 1;
  transform: translateY(0) scaleY(1);
  transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
}

.content-disable .slider--subtitle {
  opacity: 0;
  transform-origin: bottom;

  transform: translateY(-10px) scaleY(1.08);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.content-active .slider--text {
  opacity: 1;
  transform: translateY(0) scaleY(1);
  transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s;
}

.content-disable .slider--text {
  opacity: 0;
  transform-origin: bottom;

  transform: translateY(-10px) scaleY(1.08);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.slider--btn-container {
  position: relative;
  z-index: 4;
}
</style>
