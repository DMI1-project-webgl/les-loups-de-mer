
<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Scoreboard from '../../components/Experience/Scoreboard.vue';
</script>


<template>
    <Scoreboard :nbBottle="nbBottle" maxBottle="3" :nbToothbrush="nbToothbrush" maxToothbrush="1" :nbDrink="nbDrink" maxDrink="2" :nbCan="nbCan" maxCan="2"/>
    <SquaredButton class="validate-button" :isRouterLink="true" link="/greenery" text="Continuer" :isWhite="true" @validate="validateStep"/>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Clean',
  mounted() {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    onSignal(slug: Array<string|number>) {
      switch(slug[0]) {
        case 'next-step':
          this.$router.push('greenery')
      }
    },

    validateStep() {
      this.signal.dispatch(['validate-tapped'])
    }
  },
  data() {
    return {
      nbBottle: 0,
      nbToothbrush: 0,
      nbDrink: 0,
      nbCan: 0
    }
  }
})
</script>
