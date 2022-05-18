<template>
  <section id="draggable" class="draggable">
    <div class="container">
      <div class="draggable--percent">
        <p class="draggable--text"><span class="percent">0</span><span>%</span></p>
        
      </div>
      <div id="draggable--container">
        <div ref="draggable--element" id="draggable--element" class=""></div>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from "gsap";
import { TimelineMax, TweenLite , CSSPlugin, ScrollToPlugin, Draggable } from "gsap/all"; 

gsap.registerPlugin(Draggable);

export default defineComponent({
  name: 'DraggableElement',
  mounted () {

    const that = this
    const widthContainer = document.getElementById("draggable--container").offsetWidth;
    const widthDraggable = document.getElementById("draggable--element").offsetWidth;
    
    const positionArray = that.initPositionArray(10, ( widthContainer - widthDraggable ) / 10);
    
    Draggable.create("#draggable--element", {
      type:"x",
      inertia: true,
      bounds: document.getElementById("draggable--container"),
      onDragEnd: function() {
          let posX = that.closestNumArray(positionArray, this.x)
          gsap.to("#draggable--element", { x: posX, duration: 0.2});

          that.displayPercentX(widthContainer, widthDraggable, posX)

      }
    });
  },
  methods: {
    closestNumArray(array: number[], val: number) {
      let i = 0;
      while (i < array.length && array[i] < val) i++;
      return array[i] || array[i-1];
    },
    displayPercentX( widthContainer: number, widthDraggable: number, elementX: number) {
      let percentX = Math.round(( 100 * Math.round(elementX) ) / ( widthContainer - widthDraggable -1)) ;
      if (isNaN(percentX)) percentX = 0;
      document.querySelector("span.percent").textContent = percentX.toString();
    },
    initPositionArray(step: number, stepWidth: number) {
      let x1 = 0;
      let positionArray: number[] = new Array(step);

      for (let i = 0; i < step+1; i++) {
        positionArray[ i ] = x1;
        x1 += stepWidth;
      }
      return positionArray;
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
/* Structure  */
.container {
  display: flex; 
  align-items: baseline; 
}

/* Draggable elements */
section.draggable {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#draggable--container{
  height: 20px;
  width: 400px;
  background-color: white;
  border-radius: 10px 10px;
  position: relative;
  margin: auto 0;
}
#draggable--element {
  width: 40px;
  height: 40px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate( 0, -50%);
  border-radius: 20px 20px;
  box-shadow: rgb(0 0 0 / 35%) -4px -3px 45px 21px;
}
.draggable--percent {
  height: 100%;
}
.draggable--text {
  color: white;
  margin: 0 20px;
  font-size: 1.5em;
  font-weight: bold;
  width: 100px;
  display: flex;
  justify-content: flex-end;
}
.draggable--text span {
  color: white;
  font-size: 1.3em;
  font-weight: bold;

}
</style>
