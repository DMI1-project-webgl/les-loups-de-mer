<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Modal from '../../components/Experience/Modal.vue';
</script>

<template>
    <section class="greenery page-experience">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-1 h-100 position-relative">
            <div class="greenery--btn-container">
              <div class="greenery--btn">
                <img src="" alt="">
              </div>
              <p class="greenery--btn-text">Recommencer</p>
            </div>
          </div>
          <div class="col-10 h-100">

          </div>
          <div class="col-1 h-100">
            <div class="greenery--btn-container" @click="validateStep" >
              <div class="greenery--btn">
                <img src="" alt="">
              </div>
              <p class="greenery--btn-text">Valider</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Modal v-if="tuto1" text="a manque un peu de végétaux ici, la plupart des requins ont besoin d’un environnement bien planté. Mettons-nous au travail ! Chez les loups de mer, on prend toujours soin de sélectionner les espaces les plus riches et de les protéger. " @showoff="hidetuto1"/>
    <Modal v-if="tuto2" text="Restez appuyé en déplaçant votre souris, les végétaux se développeront sur votre écosystème. À vous maintenant. " @showoff="hidetuto2"/>
    <!-- <SquaredButton class="validate-button" :isRouterLink="false" text="Continuer" :isWhite="true" @validate="validateStep"/> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Greenery',
  data() {
    return {
      tuto1: true,
      tuto2: false,
    }
  },
  mounted() {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    onSignal(slug: Array<string|number>) {
      switch(slug[0]) {
        case 'next-step':
          this.$router.push('food')
      }
    },

    validateStep() {
      this.signal.dispatch(['validate-tapped'])
    },
    hidetuto1() {
      this.tuto1 = false;
      this.tuto2 = true;
    },
    hidetuto2() {
      this.tuto2 = false;
    }
    
  },
})
</script>

<style scoped>
.greenery {
  padding-right: 100px;
}
.greenery--btn-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.greenery--btn {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
}
.greenery--btn-text {
  color: white;
  font-size: .5em;
  padding: 5px 0;
  text-align: center;
  white-space: nowrap;
}
</style>