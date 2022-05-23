<template>
  <div v-if="isRouterLink" class="RoundButton-Container" :class="isClickHear ? 'RoundButton-Container--click-hear' : ''" @click="$emit('validate')">
    <div class="RoundButton" :class="isWhite ? 'RoundButton--white' : 'RoundButton--blue'">
        <p class="RoundButton-Text">{{ text }}</p>
    </div>
  </div>
  <a v-else :href="link" class="RoundButton-Container" :class="isClickHear ? 'RoundButton-Container--click-hear' : ''">
    <div class="RoundButton" :class="isWhite ? 'RoundButton--white' : 'RoundButton--blue'">
        <p class="RoundButton-Text">{{ text }}</p>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SquaredButton',
  props: ['link', 'text', 'isWhite', 'isClickHear', 'isRouterLink'],
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
    transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.RoundButton-Container--click-hear {
    background: url('./../../assets/img/cliquer_ici_text.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.RoundButton {
    width: 175px;
    height: 50px;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.RoundButton--white {
    background-color: var(--color-secondary);
}

.RoundButton-Container:hover .RoundButton {
    transform: scale(1.4);
}

.RoundButton-Container:hover {
    transform: scale(0.8);
}

.RoundButton:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
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
