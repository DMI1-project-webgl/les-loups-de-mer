<template>
  <section class="scoreboard" >
      <div class="scoreboard--container">
          <ul>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Bouteille</p>
                    <p class="scoreboard--value">
                        <span>{{nbBottle}}</span>
                        <span>/</span>
                        <span>{{maxBottle}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Brosse à dents</p>
                    <p class="scoreboard--value">
                        <span>{{nbTrash}}</span>
                        <span>/</span>
                        <span>{{maxTrash}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Conserve</p>
                    <p class="scoreboard--value">
                        <span>{{nbCan}}</span>
                        <span>/</span>
                        <span>{{maxCan}}</span>
                    </p>
              </li>
          </ul>
      </div>
  </section>
</template>

<script lang="ts">
import HomeScene from './../../assets/js/webgl/main/HomeScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreboardElement',
  props: ['nbBottle', 'maxBottle', 'nbTrash', 'maxTrash', 'nbCan', 'maxCan'],
  mounted () {
    const props = this.$props;
    const propsArray = Object.entries(props);
    const lines = document.querySelectorAll(".scoreboard--line")

    console.log(lines)
    for(let i = 0; i < propsArray.length; i+=2 ) {
        if (propsArray[i][1] == propsArray[i+1][1]) {
            console.log("EGALLLLLL");
            lines[i/2].classList.add("done")

        }
    }
      
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.scoreboard--container {
    width: 100%;
    border: 1px solid white;
}
ul {
    padding: 30px;
}
.scoreboard--line {
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    color: white;
}
.scoreboard--value span {
    margin: 2px;
    color: white;
}
.done::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    background: white;
    top: 50%;
}
</style>
