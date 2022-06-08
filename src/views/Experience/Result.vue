<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import RoundButton from '../../components/UI/RoundButton.vue';
</script>

<template>
  <section ref="result" class="result page-experience">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-6 h-100"></div>
        <div class="col-4 h-100 puta">
          <div class="result--content-container">
            <div class="result--content">
              <h2>Félicitation ! </h2>
              <p class="result-text">Voici votre écosystème. Il est parfait, partagez-le à vos amis.</p>
              <SquaredButton class="" :isRouterLink="false" text="Partager mon écosystème" :isWhite="true" @validate="downloadImg()"/> 
            </div>
            <div class="result--content">
              <h2>Et après ? </h2>
              <p class="result-text">Pour continuer vos actions dans la vraie vie, aidez nous à financer nos actions et nos recherches. À chacun de vos achats de [XXXXXX], nous prélevons une petite partie pour aider à réaliser nos différents actions. Alors n'hésitez pas, bénéficiez des avantages de nos produits en protégeant l'environnement dès maintenant ! </p>
            </div>
            <div class="result--btn">
              <RoundButton link="/shop" text="Acheter les produits" :isWhite="true" :isRouterLink="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => {
    return {
    }
  },
  mounted () {
      const canvas: HTMLCanvasElement = document.querySelector('#canvas');
      canvas.classList.add('canvas--left')
      this.signal.dispatch(["success-final"])
      this.signal.dispatch(['experience-end'])

      setTimeout(() => {
        (this.$refs.result as HTMLElement).classList.add("result-show")
      }, 2000)
  },
  methods: {
    downloadImg() {
      this.signal.dispatch(['download-ecosystem'])
    }
  }
})
</script>

<style scoped>
.result {
  color: var(--color-tertiary);
  opacity: 0;
  transform-origin: top;
  transform: translateY(5px) scaleY(1.08);
  transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.puta {
  padding-right: 5%;
}

.result-text {
  font-size: 0.45em !important;
}

.result--content h2 {
  font-size: 1.3em;
}

.result-show {
  opacity: 1;
  transform: translate(0,0) scale(1);
}
.result--content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.result .SquaredButton-Container {
  align-items: start;
  margin-top: 20px;
  opacity: 0;
  transform: scale(1) translateY(20px);
  transform-origin: center;
  transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.6s cubic-bezier(0.19, 1, 0.22, 1);
} 
.result--content {
  margin-bottom: 45px;
}

.result--btn {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 5%;
  margin-left: auto;
  opacity: 0;
  transform: scale(0.5);
  transform-origin: center;
  transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, transform 1.6s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
}
.result-show .result--btn, .result-show .SquaredButton-Container {
  opacity: 1;
  transform: translate(0,0) scale(1);
}
</style>