
<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Scoreboard from '../../components/Experience/Scoreboard.vue';
</script>


<template>
    <Scoreboard maxBottle="3" maxCan="2" maxDrink="2"  maxToothbrush="1"/>
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
  }
})
</script>
