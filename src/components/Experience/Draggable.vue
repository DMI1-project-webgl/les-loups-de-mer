<template>
  <section id="draggable" class="draggable">
    <div class="container">
      <!-- <div class="draggable--percent">
        <p class="draggable--text"><span ref="percent" class="percent">{{ value }}</span><span>%</span></p>
        
      </div> -->
      <div  ref="container" id="draggable--container">
        <div ref="element" id="draggable--element" class="draggable--element"></div>
        <p class="draggable--legend left">Minimum</p>
        <p class="draggable--legend right">Maximum</p>
        <div class="draggable--step step-1"></div>
        <div class="draggable--step step-2"></div>
        <div class="draggable--step step-3"></div>
        <div class="draggable--step step-4"></div>
        <div class="draggable--step step-5"></div>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from "gsap";
import { Draggable } from "gsap/all"; 

gsap.registerPlugin(Draggable);

export default defineComponent({
  name: 'DraggableElement',
  data: () => {
    return {
      value: 0,
    }
  },
  mounted () {

    const that = this
    const widthContainer = this.$refs.container.offsetWidth;
    const widthDraggable = this.$refs.element.offsetWidth;
    
    const positionArray = this.initPositionArray(4, ( widthContainer - widthDraggable ) / 4);
    
    Draggable.create(this.$refs.element, {
      type:"x",
      inertia: true,
      bounds: this.$refs.container,
      onDrag: function() {
        that.displayPercentX(widthContainer, widthDraggable, this.x)
      },
      onDragEnd: function() {
          let posX = that.closestNumArray(positionArray, this.x)
          gsap.to(that.$refs.element, { x: posX, duration: 0.2});

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
      this.value = percentX;
      this.$emit('valueChange', this.value)
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
  width: 40vw;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#draggable--container{
  height: 1px;
  width: 500px;
  background-color: white;
  border-radius: 7px 7px;
  position: relative;
  margin: auto 0;
}
#draggable--element {
  width: 50px;
  height: 50px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate( 0, -50%);
  border-radius: 50%;
  /* box-shadow: rgb(0 0 0 / 35%) -4px -3px 45px 21px; */
}
.draggable--percent {
  height: 100%;
}
.draggable--text {
  color: white;
  margin: 0 20px;
  font-size: 0.5em;
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
.draggable--legend {
  position: absolute;
  top: 0;
  color: white;
  opacity: .5;
  padding: 15px;
  font-size: .4em;
}
.draggable--legend.left {
  transform: translate(-100%,-50%);
  left: 0;
}
.draggable--legend.right {
  transform: translate(100%,-50%);
  right: 0;
}
.draggable--step {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  background-color: white;
}
.draggable--step.step-1 {
  left: 0;
  transform: translate(0%, -50%);
}
.draggable--step.step-2 {
  left: 25%;
  transform: translate(0%, -50%);
}
.draggable--step.step-3 {
  left: 50%;
  transform: translate(-50%, -50%);
}
.draggable--step.step-4 {
  left: 75%;
  transform: translate(-100%, -50%);
}
.draggable--step.step-5 {
  left: 100%;
  transform: translate(-100%, -50%);
}
</style>
