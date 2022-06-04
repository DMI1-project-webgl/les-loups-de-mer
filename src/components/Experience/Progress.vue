<template>
  <section class="progress no" >
      <div class="progress--container">
        <p class="progress--title">indice de pérénité de la culture</p>
        <progress id="progress--advancement" class="progress--advancement" value="0" max="100"></progress>
        <div class="progress--legend-container">
            <p class="progress--legend">faible</p>
            <p class="progress--legend">idéal</p>
        </div>
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressElement',
  mounted () {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    onSignal(slug: Array<string|number>) {
        if(slug[0] == 'update-advancement') {
            document.getElementById('progress--advancement').setAttribute("value", slug[1] as string); 
        }
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.progress {
    max-width: 250px;
}
.progress--container {
    width: 100%;
    height: 100%;
}

/* KIT PROGRESBAR  */
progress {
    /* border: 1px solid transparent; */
    background-color: #FFFFFF17;
    height: 10px;
    width: 100%;
    
}
	/* ici les styles généraux */

progress::-webkit-progress-bar { 
    background: transparent;
    height: 10px;
}
progress::-webkit-progress-value {  
    background: white;
    height: 10px;
}  
progress::-moz-progress-bar { 
    background: white;
    height: 10px;
}
.progress--title {
    color: white;
    margin-bottom: -20px;
    font-size: .5em;
}
.progress--legend-container {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    font-size: .7em;
}
.progress--legend {
    width: max-content;
    color: white;
    opacity: .4;
    transform: translateY(-10px);
}
</style>
