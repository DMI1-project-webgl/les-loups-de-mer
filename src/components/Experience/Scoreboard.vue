<template>
  <section class="scoreboard" >
      <div class="scoreboard--container">
          <ul>
              <li class="scoreboard--line" :class="maxBottle == depollutionStatus.bottlesPicked ? 'done' : ''">
                    <p class="scoreboard--text">Bouteilles en plastique</p>
                    <p class="scoreboard--value">
                        <span>{{depollutionStatus.bottlesPicked}}</span>
                        <span>/</span>
                        <span>{{maxBottle}}</span>
                    </p>
              </li>
              <li class="scoreboard--line" :class="maxCan == depollutionStatus.cansPicked ? 'done' : ''">
                    <p class="scoreboard--text">Conserves</p>
                    <p class="scoreboard--value">
                        <span>{{depollutionStatus.cansPicked}}</span>
                        <span>/</span>
                        <span>{{maxCan}}</span>
                    </p>
              </li>
              <li class="scoreboard--line" :class="maxDrink == depollutionStatus.drinksPicked ? 'done' : ''">
                    <p class="scoreboard--text">Canettes</p>
                    <p class="scoreboard--value">
                        <span>{{depollutionStatus.drinksPicked}}</span>
                        <span>/</span>
                        <span>{{maxDrink}}</span>
                    </p>
              </li>
              <li class="scoreboard--line" :class="maxToothbrush == depollutionStatus.toothBrushesPicked ? 'done' : ''">
                    <p class="scoreboard--text">Brosses à dents</p>
                    <p class="scoreboard--value">
                        <span>{{depollutionStatus.toothBrushesPicked}}</span>
                        <span>/</span>
                        <span>{{maxToothbrush}}</span>
                    </p>
              </li>
          </ul>
      </div>
  </section>
</template>

<script lang="ts">
import type { DepollutionStatus } from '@/assets/js/webgl/utils/ExperienceStateMachine';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreboardElement',
  props: ['maxBottle', 'maxCan','maxDrink', 'maxToothbrush'],
  mounted () {
    this.signal.add(this.onSignal.bind(this))
  },
  data() {
    return {
        depollutionStatus: {
            bottlesPicked: 0,
            cansPicked: 0,
            drinksPicked: 0,
            toothBrushesPicked: 0
        } as DepollutionStatus
    }
  },
  methods: {
      onSignal(slug: Array<string|any>) {
          if(slug[0] == 'update-depollution') {
              // Creating new object in order to keep reactivity
              this.depollutionStatus = {... slug[1] }
          }
      }
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
    left: 16%;
    transform: translate(-50%, 0);
}
.scoreboard--container {
    width: 300px;
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
    margin-bottom: 20px;
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
