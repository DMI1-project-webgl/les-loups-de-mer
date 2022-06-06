<template>
  <div class="BackgroundGradient">
      <div class="BackgroundGradient_Child"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BackgroundGradient',
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
.BackgroundGradient {
    z-index: -1;
	background: linear-gradient(-45deg, #12205a, #000e44, rgb(28, 53, 116), #000e44);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
	inset: 0;
}

.BackgroundGradient_Child {
    height: 100vh;
    background: radial-gradient(rgba(125, 179, 255, 0.301) 10%, rgba(0, 14, 68, 0) 70%, rgba(0, 14, 68, 0) 100%);
    background-size: 2000px 2000px;
    background-repeat: no-repeat;
    animation: point 40s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@keyframes point {
	0% {
		background-position: 0% 100%;
	}
	10% {
		background-position: 20% 60%;
	}
    20% {
		background-position: 50% 80%;
	}
    30% {
		background-position: 80% 50%;
	}
    40% {
		background-position: 50% 70%;
	}
    50% {
		background-position: 60% 120%;
	}
    60% {
		background-position: 10% 100%;
	}
    70% {
		background-position: 50% 120%;
	}
    80% {
		background-position: 20% 80%;
	}
	100% {
		background-position: 0% 100%;
	}
}
</style>
