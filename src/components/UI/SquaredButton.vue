<template>
  <router-link v-if="isRouterLink" :to="link" class="SquaredButton-Container" @click="$emit('validate')">
    <div class="SquaredButton" :class="isWhite ? 'SquaredButton--white' : 'SquaredButton--blue'">
        <p class="SquaredButton-Text">{{ text }}</p>
    </div>
  </router-link>
  <a v-else-if="link" :href="link" class="SquaredButton-Container" @click="$emit('validate')">
    <div class="SquaredButton" :class="isWhite ? 'SquaredButton--white' : 'SquaredButton--blue'">
        <p class="SquaredButton-Text">{{ text }}</p>
    </div>
  </a>
  <div v-else class="SquaredButton-Container" @click="$emit('validate')">
    <div class="SquaredButton" :class="isWhite ? 'SquaredButton--white' : 'SquaredButton--blue'">
        <p class="SquaredButton-Text">{{ text }}</p>
    </div>
  </div>
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
.SquaredButton-Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 3px;
}

.SquaredButton {
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

.SquaredButton--white {
    background-color: var(--color-secondary);
}

.SquaredButton-Container:hover .SquaredButton {
    transform: scale(1.05);
}

.SquaredButton:after {
  position: absolute;
  content: '';
  width: 182px;
  height: 182px;
  border-radius: 50%;
  transform: scale(0);
  background: #fff;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.SquaredButton--white:after {
    background: var(--color-primary);
}

.SquaredButton-Container:hover .SquaredButton:after {
  transform: scale(1.01);
}

.SquaredButton-Text {
    color: var(--color-secondary);
    font-family: "frasha-regular";
    text-align: center;
    font-size: 0.5rem;
    font-weight: 400;
    z-index: 1;
    transition: color 0.2s ease-out;
}

.SquaredButton--white .SquaredButton-Text {
    color: var(--color-primary);
}

.SquaredButton-Container:hover .SquaredButton-Text {
    color: var(--color-primary);
}

.SquaredButton-Container:hover .SquaredButton--white .SquaredButton-Text {
    color: var(--color-secondary);
}
.result .SquaredButton {
  width: inherit !important;
  padding: 0 30px !important;
  overflow: hidden;
}
.result .SquaredButton::after {
  width: 110%;
  border: none;
}
</style>
