<template>
  <section class="scoreboard">
    <div class="scoreboard--title">
        <p>Objects à ramasser</p>
    </div>
    <div class="scoreboard--container">
          <ul>
              <li class="scoreboard--line" :class="maxBottle == depollutionStatus.bottlesPicked ? 'done' : ''">
                    <p class="scoreboard--text">Bouteilles</p>
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
    max-width: 250px;
}
.scoreboard.tuto {
    box-shadow: 0px 0px 50px 10px #FFFF00FF;
    animation: 3s linear 1s infinite alternate tuto;
    border-radius: 5px;
}
.scoreboard--container {
    width: 100%;
}
ul {
    padding: 0;
}
.scoreboard--line {
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    color: white;
    background-color: #ffffff10;
    padding: 5px 20px;
    margin: 10px 0;
    border-radius: 30px;
    font-size: .7em;
}
.scoreboard--title {
    color: white;
    font-size: .7em;
}

.scoreboard--value span {
    margin: 2px;
    color: white;
    font-family: "leaguespartan";
    font-weight: bold;
    font-size: .8em;
}

.done .scoreboard--text{
    opacity: .3;
    text-decoration:line-through;
}
.done .scoreboard--value span {
    color: #3ad12f;
}

@keyframes tuto {
    0% {
        box-shadow: 0px 0px 50px 10px #FFFF00FF;
    }
    50% {
        box-shadow: 0px 0px 50px 10px #FFFF000F;
    }
    100% {
        box-shadow: 0px 0px 50px 10px #FFFF00FF;
    }
}
</style>
