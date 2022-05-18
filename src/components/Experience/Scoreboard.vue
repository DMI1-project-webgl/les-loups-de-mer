<template>
  <section class="scoreboard" >
      <div class="scoreboard--container">
          <ul>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Bouteille en plastique</p>
                    <p class="scoreboard--value">
                        <span>{{nbBottle}}</span>
                        <span>/</span>
                        <span>{{maxBottle}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Sac poubelle</p>
                    <p class="scoreboard--value">
                        <span>{{nbTrash}}</span>
                        <span>/</span>
                        <span>{{maxTrash}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Canette</p>
                    <p class="scoreboard--value">
                        <span>{{nbCan}}</span>
                        <span>/</span>
                        <span>{{maxCan}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Mégots</p>
                    <p class="scoreboard--value">
                        <span>{{nbButt}}</span>
                        <span>/</span>
                        <span>{{maxButt}}</span>
                    </p>
              </li>
              <li class="scoreboard--line">
                    <p class="scoreboard--text">Sac Plastique</p>
                    <p class="scoreboard--value">
                        <span>{{nbPlastic}}</span>
                        <span>/</span>
                        <span>{{maxPlastic}}</span>
                    </p>
              </li>
          </ul>
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreboardElement',
  props: ['nbBottle', 'maxBottle', 'nbTrash', 'maxTrash', 'nbCan', 'maxCan', 'nbButt', 'maxButt', 'nbPlastic', 'maxPlastic',],
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
.scoreboard {
    /* pointer-events: none; */
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);
}
.scoreboard--container {
    width: 400px;
    border: 1px solid white;
}
ul {
    padding: 30px;
}
.scoreboard--line {
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 1.5em;
}
.scoreboard--value span {
    margin: 2px;
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
