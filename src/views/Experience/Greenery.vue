<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
</script>

<template>
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
          this.$router.push('food')
      }
    },

    validateStep() {
      this.signal.dispatch(['validate-tapped'])
    },
    
  },
})
</script>