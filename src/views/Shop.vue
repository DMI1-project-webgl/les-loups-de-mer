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
    <section ref="blur" class="shop page-experience blur add-blur">
      <div class="shop--heading">
        <h1>Nos packs</h1>
        <p>Retrouvez dans nos packs composés d'une épice, d'une huile et d'un bouillon qui révèlent le meilleur de l'aileron de requin pour vous aider à lutter contre les effets du temps.</p>
      </div>
      <div class="container-fluid slider-height">
        <div class="row h-100">
          <div class="col-3 h-100 position-relative">
            <div class="shop--content-container" :class="index == 0 ? 'content-active' : 'content-disable'">
              <div class="shop--product-details">
                <h2 class="shop--product-name">Pack roussette</h2>
                <p class="shop--product-package">La version mini </p>
                <p class="shop--product-description">Avec ce pack aidez jusqu’à 4 requins.</p>
              </div>
              <div>
                <table class="shop--pack-composition">
                  <tr>
                    <td class="shop--composition-name">Huile</td>
                    <td class="shop--composition">30 cl</td>
                  </tr>
                  <tr>
                    <td class="shop--composition-name">Épices</td>
                    <td class="shop--composition">15g</td>
                  </tr>
                  <tr>
                    <td class="shop--composition-name">Bouillon</td>
                    <td class="shop--composition">25g</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="shop--content-container" :class="index == 1 ? 'content-active' : 'content-disable'">
              <div class="shop--product-details">
                <h2 class="shop--product-name"> Pack requin marteau</h2>
                <p class="shop--product-package">La version medium</p>
                <p class="shop--product-description">Avec ce pack aidez jusqu’à 6 requins.</p>
              </div>
              <div>
                <table class="shop--pack-composition">
                  <tr>
                    <td class="shop--composition-name">Huile</td>
                    <td class="shop--composition">50cl</td>
                  </tr>
                  <tr>
                    <td class="shop--composition-name">Épices</td>
                    <td class="shop--composition">30g</td>
                  </tr>
                  <tr>
                    <td class="shop--composition-name">Bouillon</td>
                    <td class="shop--composition">50g</td>
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
              <div class="shop--product-video-container position-relative">
                <div ref="video1" class="shop--product-video" :class="index == 0 ? 'content-active-video' : 'content-disable-video'">
                  <video ref="video01" loop crossOrigin="anonymous" playsinline class="video-slider">
                    <source src="./../../src/assets/img/packs/small.webm"
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                  </video>
                </div>
                <div ref="video2" class="shop--product-video" :class="index == 1 ? 'content-active-video' : 'content-disable-video'">
                  <video ref="video02" loop crossOrigin="anonymous" playsinline class="video-slider">
                    <source src="./../../src/assets/img/packs/medium.webm"
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                  </video>
                </div>
                <div ref="video3" class="shop--product-video" :class="index == 2 ? 'content-active-video' : 'content-disable-video'">
                  <video ref="video03" loop crossOrigin="anonymous" playsinline class="video-slider">
                    <source src="./../../src/assets/img/packs/large.webm"
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
            </div>
          </div>
          <div class="col-3 h-100">
            <div class="shop--product">
              <div class="shop--product-price" :class="index == 0 ? 'content-active' : 'content-disable'">
                <p>40€</p>
              </div>
              <div class="shop--product-price" :class="index == 1 ? 'content-active' : 'content-disable'">
                <p>60€</p>
              </div>
              <div class="shop--product-price" :class="index == 2 ? 'content-active' : 'content-disable'">
                <p>90€</p>
              </div>
              <RoundButton link="/newsletter" text="Acheter les produits" :isWhite="true" :isRouterLink="true" />
            </div>
          </div>
        </div> 
      </div>
    </section>
    <section class="banner">
      <div class="banner--mentions-container">
        <div class="banner--mentions">
          <p>Pour continuer à profiter des bienfaits des ailerons de requin et nous aider durablement à les conserver, <a href=""> souscrivez à un abonnement mensuel.</a></p>
        </div>
      </div>
    </section>
    <div ref="blurbtn" class="shop--blur-btn">
      <div class="modal">
        <div class="modal-container">
          <h3>CODE PROMO</h3>
          <p>Achetez notre produit et retrouvez votre vigueur d'antan - CODE PROMO -2%: JESAUVELAPLANETE</p>
        </div>
        <SquaredButton id="modal-btn" class="modal--btn" :isRouterLink="false" text="Découvrir" :isWhite="true" @validate="removeEffect"/>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Shop',
  data: function () {
    return {
      index: 0,
      videos: [],
    }
  },
  mounted() {
    this.signal.dispatch(['experience-end'])
    this.videos = [this.$refs.video1, this.$refs.video2, this.$refs.video3]
    setTimeout(() => {
      (this.$refs.blurbtn as any).classList.add('add-blur');
    }, 500)
  },
  methods: {
    removeEffect() {
      (this.$refs.blur as any).classList.remove('add-blur');
      (this.$refs.blurbtn as any).classList.remove('add-blur');
    },
    slideNext() {
      this.videos[this.index].style.transition = "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
      this.videos[this.index].style.transform = "translate(-20px, -70%)"
      this.videos[this.index].style.opacity = "0"
      if (this.index == 2) {
        this.index = 0;
      } else {
        this.index += 1;
      }
      this.videos[this.index].style.transition = "none"
      this.videos[this.index].style.transform = "translate(20px, -70%)"
      this.videos[this.index].style.opacity = "0"
      setTimeout(() => {
        this.videos[this.index].style.transition = "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
        this.videos[this.index].style.transform = "translate(0, -70%)"
        this.videos[this.index].style.opacity = "1"
      }, 300)
      this.playVideo();
    },
    slidePrev() {
      this.videos[this.index].style.transition = "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
      this.videos[this.index].style.transform = "translate(20px, -70%)"
      this.videos[this.index].style.opacity = "0"
      if (this.index == 0) {
        this.index = 2;
      } else {
        this.index -= 1;
      }
      this.videos[this.index].style.transition = "none"
      this.videos[this.index].style.transform = "translate(-20px, -70%)"
      this.videos[this.index].style.opacity = "0"
      setTimeout(() => {
        this.videos[this.index].style.transition = "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
        this.videos[this.index].style.transform = "translate(0, -70%)"
        this.videos[this.index].style.opacity = "1"
      }, 300)
      this.playVideo();
    },
    playVideo() {
      switch (this.index ) {
        case 0 :
          (this.$refs.video01 as any).play();
          break;
        case 1 :
          (this.$refs.video02 as any).play();
          break;
        case 2 :
          (this.$refs.video03 as any).play();
          break;
      }
    }
  }
})
</script>

<style scoped>
.modal {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-container {
  background-color: #FFF;
  text-align: center;
  padding: 30px 20px;
  color: var(--color-primary);
  margin-bottom: 10px;
  transform: scaleY(1.05) translateY(10px);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1);
}
.add-blur .modal-container {
  transform: scaleY(1) translateY(0);
  opacity: 1;
}
.modal--btn {
  transform: scale(0.9) ;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
}
.add-blur .modal--btn {
  transform: scaleY(1);
  opacity: 1;
}
.modal-container p {
  margin-top: 10px;
  font-size: 0.5rem;
}
.modal-container h3 {
  font-weight: 600;
}
.shop {
  color: var(--color-tertiary);
}
.shop--heading p {
  font-size: .5em;
  max-width: 500px;
  margin: 0 auto;
}
.shop--heading {
  text-align: center;
  padding-top: 30px;
}
.shop--content-container{
  margin-top: -15%;
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
  background-color: var(--color-tertiary);
  padding-top: 5px;
}
.shop--product-price p {
  position: absolute;
  color: var(--color-primary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: .8em;
  margin-top: 2px;

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
  border: 1px solid var(--color-tertiary);
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.shop--arrow-prev svg {
  width: 15px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50% ) rotate(90deg);
}
.shop--arrow-next {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  border: 1px solid var(--color-tertiary);
  transform: translate(0, -50%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}
.shop--arrow-next svg {
  width: 15px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50% ) rotate(-90deg);
  color: var(--color-tertiary);
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
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
}
.content-disable {
  pointer-events: none;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.content-active-video {
  pointer-events: all;
  opacity: 1;
  transform: translate(0px, -70%) scale(1);
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.content-disable-video {
  pointer-events: none;
  opacity: 0;
}

.content-active .shop--product-details {
  opacity: 1;
  transform: translateY(0px) scaleY(1);
  transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.3s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
}

.content-disable .shop--product-details {
  opacity: 0;
  transform: translateY(15px) scaleY(1.08);
  transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.blur {
  transition: filter 1s ease-out;
}

.blur.add-blur {
  filter: grayscale(0.5) blur(5px);
}
.shop--blur-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.banner--container {
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  padding: 5px 0;
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
  color: var(--color-tertiary);
  font-weight: 900;
  text-transform: uppercase;
}

@keyframes marquee {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
section.banner {
  position: fixed;
  bottom: 0;
  z-index: 1;
}

.banner--text p {
  text-align: center;
}
.banner--mentions-container {
  margin-bottom: 15px;
  color: var(--color-tertiary);
  text-align: center;  
  width: 100vw;
}
.banner--mentions p {
  font-size: .5em;
}
.banner--mentions a {
  text-decoration: underline;
  font-weight: 900;
}
.slider-height {
  height: calc(100% - 30%);
}
.shop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
