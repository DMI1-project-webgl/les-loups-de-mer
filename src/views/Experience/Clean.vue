
<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Scoreboard from '../../components/Experience/Scoreboard.vue';
import Modal from '../../components/Experience/Modal.vue';
import Aileron from '../../components/Experience/Aileron.vue';
import TutoGlobal from '../../components/Experience/TutoGlobal.vue';
</script>


<template>
  <!-- <Scoreboard /> -->
  <section id="clean" class="page-experience clean no">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100 px-0">
          <div class="clear--data-container">
            <Scoreboard maxBottle="3" maxCan="2" maxDrink="2"  maxToothbrush="1" :tuto="tuto1"/>
            <div class="clean--img-container">
              <Aileron :step="step" :tuto="tuto3"/>      
            </div>
          </div>
        </div>
      </div>
    </div>
    <TutoGlobal :alreadyOpen="true" :texts="['Voici votre écosystème, malheureusement il est très pollué, à cause de l’être humain, aidez nous à le rendre plus sain pour les requins.', ' Nous allons aussi construire une prothèse d’ailerons pour remplacer celle de ce requin à l’aide des déchets ramassés. Les déchets ainsi récupérés sont triés et recyclés afin de construire des prothèses d’ailerons en plastique 100%* recyclé.']" />
  </section>
  <Modal v-if="tuto1" text="Pour commencer, regardez ici la liste des objets à recycler, ils se rayent au fur et à mesure ou vous les ramassez." @showoff="hidetuto1" :showbtn="true"/>
  <Modal v-if="tuto2" text="Pour ramasser un déchet, cliquez dessus, vous voyez cette bouteille en plastique ? Ramassez la, allez-y !" @showoff="hidetuto2" :showbtn="false"/>
  <Modal v-if="tuto3" :classlist="tuto3Class" text=" Super ! Vous voyez la pollution a diminué, vous pouvez voir ici que la jauge de construction de l’aileron a augmenté,  continuez ainsi pour la remplir."  @showoff="hidetuto3"/>
  <Modal v-if="canContinue" text=" Félicitation, c’est beaucoup mieux comme ça !" @showoff="validateStep" :showbtn="true"/>
  <!-- <SquaredButton v-show="canContinue" class="validate-button" :isRouterLink="false" text="Continuer" :isWhite="true" @validate="validateStep"/> -->

</template>

<style scoped>
.clear--data-container  {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10%;
}
.clean--img-container {
  color: white;
  width: 100%;
  padding-right: 15%;
  margin-top: 50px;
}
.clean--img-container img{ 
  aspect-ratio: 1/1;
  width: 100%;
  margin-right: 15%;
  border: 1px solid green;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Clean',
  mounted() {
    this.signal.add(this.onSignal.bind(this))
    const canvas = document.querySelector('#canvas');
      canvas.classList.remove('canvas--left')
  },
  data() {
    return {
      step: 0,
      canContinue: false,
      tuto1: false,
      tuto2: false,
      tuto3: false,
      tuto3Class: ''
    }
  },
  methods: {
    onSignal(slug: Array<string|number>) {
      switch(slug[0]) {
        case 'next-step':
          this.$router.push('greenery')
        case 'update-depollution':
          this.step = Number(slug[2])
          if (this.step >= 1 && this.tuto2 == true) {
            this.tuto1 = false;
            this.tuto2 = false;
            this.tuto3 = true;
            setTimeout(() => {
              this.hidetuto3()
            }, 8000)
          }
          if (this.step === 8) {
            this.canContinue = true;
            this.signal.dispatch(['success'])
          }
          break
        case 'begin-tuto':
          this.tuto1 = true
          break
      }
    },

    validateStep() {
      this.signal.dispatch(['validate-tapped'])
    },
    hidetuto1() {
      this.tuto1 = false;
      this.tuto2 = true;
      this.signal.dispatch(['none-tuto-modal'])
    },
    hidetuto2() {
      this.tuto2 = false;
    },
    hidetuto3() {
      this.tuto3 = false;
      this.tuto3Class = "modal-disable"
    },
  },
  beforeDestroy () {
    this.signal.dispatch(['experience-end'])
  }
})
</script>
