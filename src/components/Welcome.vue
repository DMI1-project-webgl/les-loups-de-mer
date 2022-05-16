<template>
  <section v-if="display" id="welcome" class="page welcome color--secondary">
    <div class="welcome--logo-container">
      <img src="../assets/img/logo_complet.svg" alt="">
    </div>
    <div class="welcome--arrow-container">
      <div id="go-to-discover">
        <img src="../assets/img/fleche.svg" alt="">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import HomeScene from '../assets/js/webgl/main/HomeScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WelcomePage',
  props: ['display'],
  mounted () {
      // document.getElementById('go-to-discover').addEventListener("click", this.goToDiscover() );
      // // console.log(this.$Home.Show);
  },
  methods: {
    goToDiscover() {
      console.log("discover")
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.welcome--logo-container {
  width: 50vw;
  margin: auto;
}
.welcome--arrow-container {
  height: 100px;
  width: 100px;
  border: 1px solid blue;
  border-radius: 50%;
  margin: 0 auto 30px;
}
.welcome--arrow-container img {
  transform: rotate(90deg);
}
</style>