<script setup lang="ts">
import SquaredButton from './../components/UI/SquaredButton.vue';
import BackgroundGradient from './../components/BackgroundGradient.vue';
import Nav from './../components/Nav.vue';
import RoundButton from './../components/UI/RoundButton.vue'
</script>

<template>
<div>  
  <BackgroundGradient />
  <Nav/>
  <section class="shop page-experience">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100 position-relative">
          <div class="shop--content-container content-active" :class="index == 0 ? 'content-active' : 'content-'">
            <div class="shop--product-details">
              <h2 class="shop--product-name">Requin blanc</h2>
              <p class="shop--product-package">La version luxe</p>
              <p class="shop--product-description">Avec ce pack, aidez jusqu'à 12 requins.</p>
            </div>
            <div>
              <table class="shop--pack-composition">
                <tr>
                  <td class="shop--composition-name">huile</td>
                  <td class="shop--composition">2 L</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Épices</td>
                  <td class="shop--composition">100g</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Bouillon</td>
                  <td class="shop--composition">125g</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="shop--content-container" :class="index == 1 ? 'content-active' : 'content-disable'">
            <div class="shop--product-details">
              <h2 class="shop--product-name">Requin blanc</h2>
              <p class="shop--product-package">La version luxe</p>
              <p class="shop--product-description">Avec ce pack, aidez jusqu'à 12 requins.</p>
            </div>
            <div>
              <table class="shop--pack-composition">
                <tr>
                  <td class="shop--composition-name">huile</td>
                  <td class="shop--composition">2 L</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Épices</td>
                  <td class="shop--composition">100g</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Bouillon</td>
                  <td class="shop--composition">125g</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="shop--content-container" :class="index == 2 ? 'content-active' : 'content-disable'">
            <div class="shop--product-details">
              <h2 class="shop--product-name">Requin blanc</h2>
              <p class="shop--product-package">La version luxe</p>
              <p class="shop--product-description">Avec ce pack, aidez jusqu'à 12 requins.</p>
            </div>
            <div>
              <table class="shop--pack-composition">
                <tr>
                  <td class="shop--composition-name">huile</td>
                  <td class="shop--composition">2 L</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Épices</td>
                  <td class="shop--composition">100g</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Bouillon</td>
                  <td class="shop--composition">125g</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-6 h-100">
          <div class="shop--heading-container">
            <div class="shop--heading">
              <h1>Nos packs</h1>
              <p>Retrouvez dans nos packs composés d'une épice, d'une soupe et d'un bouillon qui révèle le meilleur de l'aileron de requin pour vous aider à lutter contre es effets du temps</p>
            </div>
            <div ref="blur" class="shop--product-video-container position-relative blur">
              <div class="shop--product-video content-active" :class="index == 0 ? 'content-active' : 'content-'">
                <video ref="video01" loop crossOrigin="anonymous" playsinline class="video-slider">
                  <source src="src/assets/img/packs/large.webm"
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                </video>
              </div>
              <div class="shop--product-video" :class="index == 1 ? 'content-active' : 'content-disable'">
                <video ref="video03" loop crossOrigin="anonymous" playsinline class="video-slider">
                  <source src="src/assets/img/packs/medium.webm"
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                </video>
              </div>
              <div class="shop--product-video" :class="index == 2 ? 'content-active' : 'content-disable'">
                <video ref="video02" loop crossOrigin="anonymous" playsinline class="video-slider">
                  <source src="src/assets/img/packs/small.webm"
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                </video>
              </div>
              <button @click="slidePrev" id="prev" class="shop--arrow-prev shop--arrow">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 33.77 40.8">
                    <path id="Tracé_4706" data-name="Tracé 4706" fill="currentColor" d="M18,40c0-.15,3.95-14.83,14.57-14.83a1.18,1.18,0,1,0,.07-2.35h-.07c-5.19,0-9.76,2.91-13.22,8.4a26.62,26.62,0,0,0-1.31,2.34V1.17a1.18,1.18,0,0,0-2.35,0V33.53c-.39-.77-.83-1.56-1.33-2.36-3.46-5.5-8-8.4-13.21-8.4a1.18,1.18,0,0,0,0,2.35c10.57,0,14.54,14.69,14.58,14.83A1.17,1.17,0,0,0,18,40" transform="translate(-0.04 -0.03)"/>
                </svg>
              </button>
              <button @click="slideNext" id="next" class="shop--arrow-next shop--arrow">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 33.77 40.8">
                    <path id="Tracé_4706" data-name="Tracé 4706" fill="currentColor" d="M18,40c0-.15,3.95-14.83,14.57-14.83a1.18,1.18,0,1,0,.07-2.35h-.07c-5.19,0-9.76,2.91-13.22,8.4a26.62,26.62,0,0,0-1.31,2.34V1.17a1.18,1.18,0,0,0-2.35,0V33.53c-.39-.77-.83-1.56-1.33-2.36-3.46-5.5-8-8.4-13.21-8.4a1.18,1.18,0,0,0,0,2.35c10.57,0,14.54,14.69,14.58,14.83A1.17,1.17,0,0,0,18,40" transform="translate(-0.04 -0.03)"/>
                </svg>
              </button>
            </div>
            <div ref="blurbtn" class="shop--blur-btn">
              <SquaredButton id="modal-btn" class="modal--btn" :isRouterLink="false" text="Découvrir" :isWhite="true" @validate="removeEffect"/>
            </div>
          </div>
        </div>
        <div class="col-3 h-100">
          <div class="shop--product">
            <div class="shop--product-price content-active" :class="index == 0 ? 'content-active' : 'content- '">
              <p>90€</p>
            </div>
            <div class="shop--product-price" :class="index == 1 ? 'content-active' : 'content-disable'">
              <p>90€</p>
            </div>
            <div class="shop--product-price" :class="index == 2 ? 'content-active' : 'content-disable'">
              <p>90€</p>
            </div>
              <RoundButton link="/shop" text="Nos valeurs" :isWhite="true" :isRouterLink="true" />
          </div>
        </div>
      </div> 
    </div>
  </section>
</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Shop',
  props: ['index'],
  mounted() {
    this.signal.dispatch(['experience-end'])
  },
  methods: {
    slidePrev() {

    },
    slideNext() {
    },
    removeEffect() {
      (this.$refs.blur as any).classList.remove('blur');
      (this.$refs.blurbtn as any).classList.add("d-none");
      (this.$refs.video01 as any).play()
    }
  }
})
</script>

<style scoped>
.shop {
  color: white;
}
.shop--heading {
  text-align: center;
}
.shop--content-container{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.shop--product-details {
  margin-bottom: 50px;
}
.shop--product-name {
  font-size: 1.7em;
}
.shop--product-package {
  font-size: .8em;
  padding-bottom: 10px;
}
.shop--product-description, 
.shop--pack-composition { 
  font-size: .5em;
  font-family: "leaguespartan";
}
.shop--composition-name {
  font-weight: 800;
}
.shop--composition {
  padding-left: 15px ;
}
.shop--product-price {
  position: absolute;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
}
.shop--product-price p {
  position: absolute;
  color: var(--color-primary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: .8em;

}
.shop--product {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  position: relative;
}
.shop--product-video-container { 
  width: 100%;
  aspect-ratio: 1;
  transition: all .5s ease;
}
.shop--product-video {
  height: 100%;
  position: relative;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.shop--product-video video {
  height: auto;
  width: 100%;
}
.shop--heading-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.shop--arrow-prev {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid white;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.shop--arrow-prev svg {
  width: 15px;
  transform: rotate(90deg);
}
.shop--arrow-next {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  border: 1px solid white;
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.shop--arrow-next svg {
  width: 15px;
  transform: rotate(-90deg);
  color: white;
}
.shop--arrow::before {
  position: absolute;
  content: '';
  width: 50px;
  height: 50px;
  transform: scale(0);
  left: -1px;
  top: -1px;
  background: var(--color-secondary);
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.shop--arrow:hover:before {
  transform: scale(1);
}

.shop--arrow:hover svg {
  color: var(--color-primary);
}

.shop--arrow:hover {
  transform: scale(1.15) translate(0, -44%);
}
.content-active {
  pointer-events: all;
  opacity: 1;
}
.content-disable {
  pointer-events: none;
  opacity: 0;
}
.blur {
  filter: grayscale(0.5) blur(5px);
  transition: all 1s ease-out;
}
.shop--blur-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
