<template>
  <section id="aileron" class="aileron">
    <div class="aileron--img">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.33 465.9">
            <path  id="b" d="M483.95,465.9H.12S-11.44,120.61,418,0c0,1.33-123.92,307.53,65.95,465.9Z" style="fill:#fff; opacity:.1;"/>
            <path v-if="step == 1" id="r" d="M484.33,465.9H.09s-4.66-52.65,144.95-37.54c117.87,11.33,290.15,37.54,339.29,37.54Z" style="fill:#fff;"/> 
            <path v-if="step == 2" id="p" d="M484.33,465.9H.09s-9.01-130.92,150.46-93.8c112.42,25.39,297.21,85.82,333.78,93.8Z" style="fill:#fff;"/>
            <path v-if="step == 3" id="n" d="M484.33,465.9H.09s-5.62-198.33,153.58-161.24c112.42,25.39,261.11,115.53,330.66,161.24Z" style="fill:#fff;"/>
            <path v-if="step == 4" id="l" d="M484.33,465.9H.09S4.15,205.51,163.26,249.67c112.42,25.39,251.53,170.52,321.08,216.23Z" style="fill:#fff;"/>    
            <path v-if="step == 5" id="j" d="M484.33,465.9H.09s-2.74-63.05,28.18-142.47c24.76-63.6,86.44-143.59,168.99-130.62,138.62,24.99,190.64,192.63,287.07,273.09Z" style="fill:#fff;"/>
            <path v-if="step == 6" id="h" d="M484.33,465.9H.09s-1.33-76.45,37.73-165.97c37.28-85.43,112.75-184.47,203.51-170.22,123.45,19.36,117.67,238.39,243,336.19Z" style="fill:#fff;"/>
            <path v-if="step == 7" id="f" d="M484.33,465.9H.09s-1.75-82.25,41.63-174.63C99.11,169.07,223.04,54.7,300.86,77.04c64.16,14.49,65.17,102.22,82.2,205.83,14.03,85.35,67.23,167.19,101.28,183.03Z" style="fill:#fff;"/>
            <path v-if="step == 8" id="d" d="M483.95,465.9H.12S-11.44,120.61,418,0c0,1.33-123.92,307.53,65.95,465.9Z" style="fill:#fff;"/>
        </svg>
    </div>
    <div class="aileron--percent">
        <p id="aileron--percent">0%</p>
    </div>
    <div class="aileron--text">
        <p>Prothèse d'aileron de requin</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AileronElement',
  props: ['step'],
  mounted () {
      console.log(this.step * 100 / 8)
      document.getElementById('aileron--percent').innerHTML = String(this.step * 100 / 8) + "%";
  },
  methods: {
    
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.aileron {
    position: relative;
}
.aileron--img {
    width: 160px;
    height: 150px;
    border-right: 2px dashed white;
    padding-right: 10px;   
}
.aileron--img svg {
    height: 100%;
    width: 100%;
}
.aileron--text {
    font-size: .7em;
}
.aileron--percent {
    position: absolute;
    top: 50%;
    left: 180px;
    transform: translate(0, -50%);
}
</style>
