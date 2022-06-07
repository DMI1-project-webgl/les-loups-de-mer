<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Modal from '../../components/Experience/Modal.vue';
import TutoGlobal from '../../components/Experience/TutoGlobal.vue';
</script>

<template>
    <section class="greenery page-experience">
      <div ref="stateVege" class="state-vegetaux state-vegetaux--error">Végétaux insuffisants</div>
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-1 h-100 position-relative">
            <div class="greenery--btn-container greenery--btn-container--valide" @click="RemoveVegetation">
              <div class="greenery--btn">
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                  <path d="M123.65,0c5.13,1.47,9.31,4.12,10.97,9.51,1.75,5.67,.25,10.54-3.92,14.71-15.82,15.8-31.63,31.63-47.44,47.45-.74,.74-1.44,1.51-2.56,2.7,1.53,.07,2.54,.16,3.56,.16,23.15,0,46.29-.05,69.44,.02,51.95,.14,96,34,109.58,84.14,15.11,55.81-16.7,115.87-71.34,134.72-9.36,3.23-18.92,5.41-28.82,6.05-.86,.06-1.7,.36-2.55,.55h-48.64c-2.16-1.41-4.79-2.42-6.4-4.31-4.24-4.98-3.92-10.95-1.78-16.58,2-5.26,6.65-6.98,12.09-6.97,13.67,.02,27.35,.19,41.01-.12,40.31-.92,74.64-30.93,81.2-70.76,7.72-46.94-24.33-91.18-71.16-98.06-4.42-.65-8.95-.84-13.42-.86-23.24-.08-46.48-.04-69.72-.03-.77,0-1.54,.07-3,.14,1,1.09,1.64,1.84,2.33,2.54,15.81,15.82,31.61,31.64,47.45,47.43,3.88,3.87,5.72,8.36,4.36,13.8-2.52,10.09-14.68,13.9-22.57,7.12-.81-.7-1.55-1.48-2.31-2.24-23.82-23.82-47.65-47.64-71.47-71.46-7.43-7.43-7.42-14.99,.01-22.42C61.61,54.14,84.7,31.1,107.72,8c3.32-3.33,6.59-6.6,11.24-8h4.69Z" style="fill:#1f3666;"/>
                </svg>
              </div>
              <p class="greenery--btn-text">Recommencer</p>
            </div>
          </div>
          <div class="col-10 h-100">

          </div>
          <div class="col-1 h-100">
            <div ref="validate" class="greenery--btn-container" @click="validateStep" >
              <div class="greenery--btn">
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                  <path d="M141,300c-5.58,0-10.82-2.85-13.84-7.64L43.8,160.09c-4.82-7.65-2.53-17.75,5.12-22.57,7.64-4.82,17.75-2.53,22.57,5.12l65.86,104.5L227.06,10.57c3.2-8.45,12.65-12.7,21.1-9.5,8.45,3.2,12.7,12.65,9.5,21.1l-101.35,267.27c-2.2,5.8-7.49,9.86-13.67,10.48-.55,.05-1.09,.08-1.64,.08Z" style="fill:#1f3666;"/>
                </svg>
              </div>
              <p class="greenery--btn-text">Valider</p>
            </div>
          </div>

        </div>
      </div>
      <TutoGlobal :alreadyOpen="false" :texts="[
        'Il manque un peu de végétaux ici, la plupart des requins ont besoin d’un environnement bien planté. Mettons-nous au travail !', 
        'Chez les loups de mer, on prend toujours soin de sélectionner les espaces les plus riches et de les protéger. '
        ]" />
    </section>
    <Modal v-if="tuto1" :classlist="tuto1Class" ref="modal1" text="Restez appuyé en déplaçant votre souris, les végétaux se développeront sur votre écosystème. À vous maintenant. " @showoff="hidetuto1" :showbtn="false"/>
    <!-- <SquaredButton class="validate-button" :isRouterLink="false" text="Continuer" :isWhite="true" @validate="validateStep"/> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Greenery',
  data() {
    return {
      tuto1: false,
      tuto1Class: '',
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
        case 'begin-tuto':
          this.tuto1 = true
          break
        case 'number-coraux':
          this.hidetuto1()
          if (slug[1] > 10 && this.$refs.stateVege) {
            // this.signal.dispatch(['validate-tapped']);
            (this.$refs.stateVege as HTMLElement).innerHTML = "Végétaux suffisant";
            (this.$refs.stateVege as HTMLElement).classList.remove("state-vegetaux--error");
            (this.$refs.stateVege as HTMLElement).classList.add("state-vegetaux--valide");
            (this.$refs.validate as HTMLElement).classList.add("greenery--btn-container--valide")
            this.signal.dispatch(['success'])
          }
      }
    },

    validateStep() {
      this.signal.dispatch(['click-general'])
      this.signal.dispatch(['validate-tapped'])
    },
    hidetuto1() {
      // this.tuto1 = false;
      this.tuto1Class = "modal-disable"
      this.signal.dispatch(['none-tuto-modal'])
    },
    RemoveVegetation() {
      this.signal.dispatch(['click-general'])
      this.signal.dispatch(['remove-vegetation']);
      (this.$refs.stateVege as HTMLElement).innerHTML = "Végétaux insuffisants";
      (this.$refs.stateVege as HTMLElement).classList.add("state-vegetaux--error");
      (this.$refs.stateVege as HTMLElement).classList.remove("state-vegetaux--valide");
      (this.$refs.validate as HTMLElement).classList.remove("greenery--btn-container--valide")
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
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease-out;
}

.greenery--btn-container--valide {
  opacity: 1;
  pointer-events: all;
}
.greenery--btn {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.greenery--btn:hover {
  cursor: pointer;
}
.greenery--btn svg {
  position: absolute;
  width: 25px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.greenery--btn-text {
  color: white;
  font-size: .5em;
  padding: 5px 0;
  text-align: center;
  white-space: nowrap;
}

.state-vegetaux {
  position: fixed;
  bottom: 0;
  left: 50px;
  margin: 40px;
  background-color: #fff;
  font-family: "leaguespartan";
  font-size: 0.5em;
  padding: 20px 30px;
}

.state-vegetaux--error {
  color: #F00;
}

.state-vegetaux--valide {
  color: #00d100;
}
</style>