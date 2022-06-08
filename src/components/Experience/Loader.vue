<template>
  <section class="Loader" ref="loader">
      <div class="Loader_Child"></div>
      <div class="Loader-circle"></div>
      <p class="Loader-title loader-text">Chargement...</p>
      <img src="../../assets/img/loader.gif" class="Loader-gif">
      <p class="Loader-number loader-text">{{ value }} %</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressElement',
  data: () => ({
      value: 0
  }),
  mounted () {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
    onSignal(slug: Array<string|number>) {
        if (slug[0] === "load-on-progress") {
           this.value = Math.floor((slug[1] as number) * 100);
        }
        if (slug[0] === "loaded") {
            this.value = 100;
            setTimeout(() => {
                if (this.$refs.loader as HTMLElement) {
                  (this.$refs.loader as HTMLElement).classList.add('Loader--disable')
                }
            }, 1000);
        }
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.Loader {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-45deg, #172d87, #061967, rgb(19, 53, 139), #0d1f66);
	background-size: 300% 300%;
	animation: gradient 15s ease infinite;
    transition: opacity 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s;
}

.Loader--disable {
    opacity: 0;
    pointer-events: none;
}

.Loader-gif {
    position: absolute;
    width: 100px;
    height: 100px;
    margin-top: -10%;
    transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s, opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
}

.Loader--disable .Loader-gif {
    transform: scale(0.8);
    opacity: 0;
}

.loader-text {
    transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s;
}

.Loader--disable .loader-text {
    opacity: 0;
}

.Loader-title {
    font-family: "frasha-regular";
    font-size: 0.9em;
    color: var(--color-tertiary);
    font-weight: 300;
    margin-top: 220px;
}

.Loader--disable .Loader-gif {
    transform: scale(0);
    opacity: 0;
}

.Loader-number {
    font-family: "frasha-regular";
    font-size: 0.7em;
    color: var(--color-tertiary);
    font-weight: 300;
    position: absolute;
    margin-left: 380px;
    margin-top: -10%;
}
.Loader-circle {
  position: absolute;
  margin-top: -10%;
  border: 3px solid rgba(164, 185, 255, 0.6);
  border-radius: 50%;
  border-top: 3px solid var(--color-tertiary);
  width: 220px;
  height: 220px;
  background: radial-gradient(rgba(164, 185, 255, 0) 50%, rgba(164, 185, 255, 0.3));
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.Loader--disable .Loader-circle {
    opacity: 0;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.Loader_Child {
    height: 100vh;
    background: radial-gradient(rgba(57, 81, 188, 0.641) 10%, rgba(10, 34, 130, 0) 70%,rgba(15, 38, 131, 0) 100%);
    background-size: 2000px 2000px;
    background-repeat: no-repeat;
    inset: 0;
    animation: point 40s ease infinite;
    position: absolute;
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
