<template>
  <section class="breadcrumb" data-step="{{step}}">
      <div class="breadcrumb--container">
          <div class="breadcrumb--step">
            <div class="breadcrumb--step-content">
                <img src="https://placekitten.com/50/50" alt="">
            </div>
          </div>
          <div class="breadcrumb--step">
            <div class="breadcrumb--step-content">
                <img src="https://placekitten.com/50/50" alt="">
            </div>
          </div>
          <div class="breadcrumb--step">
              <div class="breadcrumb--step-content">
                <img src="https://placekitten.com/50/50" alt="">
            </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts">
import HomeScene from '../assets/js/webgl/main/HomeScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BreadcrumbElement',
  props: ['step'],
  mounted () {
      console.log(this.step)
      const steps = document.querySelectorAll(".breadcrumb--step");
      steps[this.step-1].classList.add("is-active");
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.breadcrumb {
    /* pointer-events: none; */
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, 0);
}
.breadcrumb--container { 
    position: relative;
    border: 1px solid white;
    height: 2px;
    width: 400px;
    position: relative;
}
.breadcrumb--step {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 50%;
}
.breadcrumb--step:nth-child(1) {
    left: 0;
    transform: translate( -50% , -50% );
}
.breadcrumb--step:nth-child(2) {
    left: 50%;
    transform: translate( -50% , -50% );
}
.breadcrumb--step:nth-child(3) {
    right: 0;
    transform: translate( 50% , -50% );
}
.breadcrumb--step-content {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid white;
    overflow: hidden;
    position: absolute;
    bottom: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.breadcrumb--step-content img {
    height: 100%;
    width: 100%;
}
.breadcrumb--step::after {
    position: absolute;
    content: "";
    height: 10px;
    width: 2px;
    background-color: white;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
}
.is-active.breadcrumb--step {
    width: 15px;
    height: 15px;
}
.is-active .breadcrumb--step-content {
    border: 3px solid white;
    width: 70px;
    height: 70px;
}
.is-active.breadcrumb--step::after {
    width: 3px;
    height: 15px;
}

</style>
