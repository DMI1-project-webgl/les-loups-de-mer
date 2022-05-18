<template>
  <section class="progress" >
      <div class="progress--container">
          <progress id="progress--advancement" class="progress--advancement" value="0" max="100"></progress>
      </div>
  </section>
</template>

<script lang="ts">
import HomeScene from './../../assets/js/webgl/main/HomeScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressElement',
  props: ['advancement'],
  mounted () {
      console.log(this.advancement)
     document.getElementById('progress--advancement').setAttribute("value", this.advancement);
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.progress {
    /* pointer-events: none; */
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
}
.progress--container {
    width: 450px;
    height: 50px;
}

/* KIT PROGRESBAR  */
progress {
    border: 1px solid white;
    height: 100%;
    width: 100%;
    
}
	/* ici les styles généraux */

progress::-webkit-progress-bar { 
    background: transparent;
    padding: 5px;
	/* ici les styles généraux pour Webkit */
}
progress::-webkit-progress-value {  
    background: white;
	/* styles de barre d'avancement pour Webkit */
}  
progress::-moz-progress-bar { 
    background: white;
	/* styles de barre d'avancement pour Firefox */
}

</style>
