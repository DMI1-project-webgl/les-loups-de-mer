
<script setup lang="ts">
import SquaredButton from '../../components/UI/SquaredButton.vue';
import Scoreboard from '../../components/Experience/Scoreboard.vue';
</script>


<template>
  <!-- <Scoreboard /> -->
  <section id="clean" class="page-experience clean ">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100 px-0">
          <div class="clear--data-container ">
            <Scoreboard maxBottle="3" maxCan="2" maxDrink="2"  maxToothbrush="1"/>
            <div class="clean--img-container">
              <img src="" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    <!-- <Scoreboard maxBottle="3" maxCan="2" maxDrink="2"  maxToothbrush="1"/>
    <SquaredButton class="validate-button" :isRouterLink="true" link="/greenery" text="Continuer" :isWhite="true" @validate="validateStep"/> -->
    
</template>

<style scoped>
.clear--data-container  {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 25%;
}
.clean--img-container {
  color: white;
  width: 100%;
  padding-right: 15%;
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
