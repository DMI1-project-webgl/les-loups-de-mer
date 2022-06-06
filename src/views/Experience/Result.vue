<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
</script>

<template>
  <section class="result page-experience">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-6 h-100"></div>
        <div class="col-5 h-100">
          <div class="result--content-container">
            <div class="result--content">
              <h2>Félicitation ! </h2>
              <p>Voici votre écosystème. Il est parfait, partagez-le à vos amis.</p>
              <SquaredButton class="" :isRouterLink="false" text="Partager mon écosystème" :isWhite="true" @validate="oui"/> 
            </div>
            <div class="result--content">
              <h2>Et après ? </h2>
              <p>Pour continuer vos actions dans la vraie vie, aidez nous à financer nos actions et nos recherches. À chacun de vos achats de [XXXXXX], nous prélevons une petite partie pour aider à réaliser nos différents actions. Alors n'hésitez pas, bénéficiez des avantages de nos produits en protégeant l'environnement dès maintenant ! </p>
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
      const canvas = document.querySelector('#canvas');
      canvas.classList.add('canvas--left')
      this.signal.dispatch(["success-final"])
  },
  methods: {
    oui() {

    }
  }
})
</script>

<style scoped>
.result {
  color: white;
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
} 
.result--content {
  margin-bottom: 100px;
}
</style>