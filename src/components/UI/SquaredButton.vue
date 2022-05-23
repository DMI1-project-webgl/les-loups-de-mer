<template>
  <div v-if="isRouterLink" class="RoundButton-Container" @click="$emit('validate')">
    <div class="RoundButton" :class="isWhite ? 'RoundButton--white' : 'RoundButton--blue'">
        <p class="RoundButton-Text">{{ text }}</p>
    </div>
  </div>
  <a v-else :href="link" class="RoundButton-Container">
    <div class="RoundButton" :class="isWhite ? 'RoundButton--white' : 'RoundButton--blue'">
        <p class="RoundButton-Text">{{ text }}</p>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SquaredButton',
  props: ['link', 'text', 'isWhite', 'isRouterLink'],
  data: () => {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.RoundButton-Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 3px;
}

.RoundButton {
    width: 175px;
    height: 50px;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.RoundButton--white {
    background-color: var(--color-secondary);
}

.RoundButton-Container:hover .RoundButton {
    transform: scale(1.05);
}

.RoundButton:after {
  position: absolute;
  content: '';
  width: 182px;
  height: 182px;
  border-radius: 50%;
  transform: scale(0);
  background: #fff;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.RoundButton--white:after {
    background: var(--color-primary);
}

.RoundButton-Container:hover .RoundButton:after {
  transform: scale(1.01);
}

.RoundButton-Text {
    color: var(--color-secondary);
    font-family: "frasha-regular";
    text-align: center;
    font-size: 0.5rem;
    font-weight: 400;
    z-index: 1;
    transition: color 0.2s ease-out;
}

.RoundButton--white .RoundButton-Text {
    color: var(--color-primary);
}

.RoundButton-Container:hover .RoundButton-Text {
    color: var(--color-primary);
}

.RoundButton-Container:hover .RoundButton--white .RoundButton-Text {
    color: var(--color-secondary);
}
</style>
