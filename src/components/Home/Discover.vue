<template>
  <section id="discover" class="discover page color--secondary background--secondary">
    <div class="container-fluid discover--container px-0">
      <div class="row h-lg-100 mx-5">
          <div class="col-6">
              <div class="discover--logo-container">
                  <img src="./../../assets/img/logo_simple.svg" alt="">
              </div>
          </div>
          <div class="col-6 position-relative">
              <div class="discover--shark-container right">
                  <img src="./../../assets/img/requin.png" alt="">
              </div>
          </div>
          <div class="col-12">
              <div class="discover--title-container">
                  <h1 class="discover--title">Découvrez notre nouvelle gamme</h1>
                  <p class="discover--subtitle">Produits français, naturels et surtout rajeunissants</p>
              </div>
          </div>
          <div class="col-6 position-relative">
              <div class="discover--shark-container left">
                  <img src="./../../assets/img/requin.png" alt="">
              </div>
          </div>
          <div class="col-6 position-relative">
            <div class="discover--link-container">
              <RoundButton text="Découvrir" :isClickHear="true" @click="goTo" />
            </div>
          </div>
      </div>
      <div class="row px-0">
        <div class="col-12 px-0">
          <div class="discover--banner-container">
            <p class="discover--banner">
              <span v-for="index in 4" :key="index">
                EFFICACE ET FIABLE
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoundButton from '../UI/RoundButton.vue'

export default defineComponent({
    name: "DiscoverPage",
    props: ['scrollBar'],
    mounted() {
    },
    methods: {
      goTo () {
        this.scrollBar.scrollTo(0, window.innerHeight * 2, 1000);
      }
    },
    beforeDestroy() {
    },
    components: { RoundButton }
})
</script>

<style scoped>
.discover {
    position: relative;
    overflow: hidden;
    background-image: url(@/assets/img/bg_discover.jpg);
}
.discover .discover--container {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.discover--logo-container {
  height: 30vh;
  width: fit-content;
}
.discover--shark-container img { 
  filter: drop-shadow(5px 20px 10px rgba(0,0,0,0.4));
}
.discover--shark-container {
  height: 25vh;
  aspect-ratio: 3/2 ;
  position: absolute;
}
.discover--shark-container.right {
  right: 0;
  top: 50%;
  transform: translate(0,-50%) rotate(45deg) ;
}
.discover--shark-container.left {
  left: 0;
  top: 50%;
  transform: translate(0,-50%) rotate(-45deg) ;
}
.discover--title-container {
  padding: 3% 0 0 0;
}

.discover--link-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
}
.discover--subtitle {
  font-size: .54em;
  color: var(--light-blue);
  font-weight: 400;
}
.discover--banner-container {
  border-top: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding: 6px 0 4px 0;
  width: 100%;
  overflow: hidden;
}
.discover--banner {
  width: 200%;
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
  animation: marquee 50s linear infinite;
  white-space: nowrap;
}

.discover--banner span {
  display: block;
  line-height: 1;
  margin: 5px 0 -5px 0;
  font-size: 3.2em;
  font-weight: 400;
  width: 50%;
}

.discover--banner span:nth-of-type(2n) {
  color: rgba(0,0,0,0);
  -webkit-text-stroke: 1px var(--color-primary);
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}


</style>

