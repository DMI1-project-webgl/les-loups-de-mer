<template>
  <section id="welcome" class="page welcome color--secondary">
    <div class="welcome--logo-container">
      <img src="./../../assets/img/logo_complet.svg" alt="">
    </div>
    <div class="welcome--arrow-container">
      <a href="#discover" id="go-to-discover" class="welcome--arrow">
        <img src="./../../assets/img/arrow.svg" alt="">
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WelcomePage',
  mounted () {
    
  },
  methods: {
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.welcome--logo-container {
  width: 50vw;
  margin: auto;
}
.welcome--arrow-container {
  height: 110px;
  width: 110px;
  margin: 0 auto 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.welcome--arrow-container:hover {
  transform: scale(1.1);
}

.welcome--arrow-container:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-image: url('./../../assets/img/text-button-discover.svg');
  background-repeat: no-repeat;
  -webkit-animation: rotating 60s linear infinite;
  -moz-animation: rotating 60s linear infinite;
  -ms-animation: rotating 60s linear infinite;
  -o-animation: rotating 60s linear infinite;
  animation: rotating 60s linear infinite;
}

.welcome--arrow-container img {
  transform: scale(0.8);
}

.welcome--arrow-container:hover img {
  z-index: 10;
  transform: scale(0.6);
  filter: brightness(0) invert(1);
  -webkit-animation: translate 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
  -moz-animation: translate 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
  -ms-animation: translate 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
  -o-animation: translate 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
  animation: translate 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000);
}

.welcome--arrow {
  border-radius: 50%;
  width: calc(100% - 25px);
  height: calc(100% - 25px);
  display: block;
  padding: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome--arrow:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
}

.welcome--arrow:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  transform: scale(0);
  background: var(--color-primary);
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

.welcome--arrow-container:hover .welcome--arrow:after {
  transform: scale(1);
}


@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes translate /* Safari and Chrome */ {
  0% {
    -webkit-transform: translateY(0) scale(0.8);
    -o-transform: translateY(0) scale(0.8);
    transform: translateY(0) scale(0.8);
  }
  10% {
    -webkit-transform: translateY(110px);
    -o-transform: translateY(110px);
    transform: translateY(110px);
    opacity: 1;
  }
  11% {
    -webkit-transform: translateY(110px);
    -o-transform: translateY(110px);
    transform: translateY(110px);
    opacity: 0;
  }
  12% {
    -webkit-transform: translateY(-110px);
    -o-transform: translateY(-110px);
    transform: translateY(-110px);
    opacity: 0;
  }
  13% {
    -webkit-transform: translateY(-110px);
    -o-transform: translateY(-110px);
    transform: translateY(-110px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(0) scale(0.6);
    -o-transform: translateY(0) scale(0.6);
    transform: translateY(0) scale(0.6);
  }
}
@keyframes translate {
  0% {
    -ms-transform: translateY(0) scale(0.8);
    -moz-transform: translateY(0) scale(0.8);
    -webkit-transform: translateY(0) scale(0.8);
    -o-transform: translateY(0) scale(0.8);
    transform: translateY(0) scale(0.8);
  }
  10% {
    -ms-transform: translateY(110px);
    -moz-transform: translateY(110px);
    -webkit-transform: translateY(110px);
    -o-transform: translateY(110px);
    transform: translateY(110px);
    opacity: 1;
  }
  11% {
    -ms-transform: translateY(110px);
    -moz-transform: translateY(110px);
    -webkit-transform: translateY(110px);
    -o-transform: translateY(110px);
    transform: translateY(110px);
    opacity: 0;
  }
  12% {
    -ms-transform: translateY(-110px);
    -moz-transform: translateY(-110px);
    -webkit-transform: translateY(-110px);
    -o-transform: translateY(-110px);
    transform: translateY(-110px);
    opacity: 0;
  }
  13% {
    -ms-transform: translateY(-110px);
    -moz-transform: translateY(-110px);
    -webkit-transform: translateY(-110px);
    -o-transform: translateY(-110px);
    transform: translateY(-110px);
    opacity: 1;
  }
  100% {
    -ms-transform: translateY(0) scale(0.6);
    -moz-transform: translateY(0)  scale(0.6);
    -webkit-transform: translateY(0)  scale(0.6);
    -o-transform: translateY(0)  scale(0.6);
    transform: translateY(0)  scale(0.6);
  }
}
</style>