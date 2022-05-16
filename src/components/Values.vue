<template>
    <section v-if="display" class="page values color--secondary">
        <div class="container-fluid"> 
            <div class="row h-100">
                <div class="col-12 col-lg-5 h-lg-100">
                    <div class="values--img-container">
                        <div class="values--img"></div>
                        <div class="values--img">
                            <img src="./../assets/img/christelle.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 values--col-content">
                    <div class="values--title-container">
                        <h1 class="values--title">Nos valeurs</h1>
                    </div>
                    <div class="values--content-container">
                        <p class="values--text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, earum nobis. Ea reprehenderit dolorum illo. Voluptate corrupti repudiandae, aspernatur harum maxime aliquid ducimus, doloribus autem vero, quas exercitationem minus nihil?</p>
                        <p class="values--quote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis fugit laboriosam molestias iure voluptatum rem ratione? Reprehenderit ducimus laboriosam labore nulla neque odio architecto perspiciatis, dolore aut aperiam blanditiis atque?</p>
                        <div class="values--name-container">
                            <p class="values--name">Christelle Deneuve</p>
                            <p class="values--profession">fondatrice de Loup de mer</p>
                        </div>
                    </div>
                    <div class="values--link-container">
                        <button @click="goTo" class="values--link btn--secondary">
                            <img src="./../assets/img/cliquer_ici.svg" alt="">
                        </button>
                    </div>
                    <div class="ws-50"></div>
                </div>
                <!-- <div class="col-1"></div> -->
            </div>
        </div> 
    </section>
</template>

<script lang="ts">
import MainScene from '../assets/js/webgl/main/MainScene'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValuesPage',
  props: ['show','display'],
  emits: ['next'],
  mounted () {
      
  },
  methods: {
    goTo() {
      this.$emit('next', 'toActions')      
    },
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.values--col-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.values--img-container {
    height: 100%;
    position: relative;
    padding: 20px;
    min-height: 50vh;
}
.values--img img { 
    background: red;
}
.values--img {
    border: 2px solid var(--color-primary);
    aspect-ratio: 4 / 5;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
}
.values--img::before {
    border: 2px solid var(--color-primary);
    border-bottom: none;
    position: absolute;
    content: "";
    width: calc(100% + 4px);
    height: 40px;
    top: -42px;
    left: -2px;
    background-color: var(--color-secondary);
}
.values--img:nth-child(1) {
    transform: translate(-50%, -50%) rotate(-9deg);
}
.values--img:nth-child(2) {
    transform: translate(-50%, -50%) rotate(5deg);
}
.values--content-container {
    margin-right: 15%;
}

.values--text {
    padding: 3% 0px 3% 40px;
}
.values--quote {
    padding: 3% 90px 3% 40px;
    position: relative;
}
.values--name-container {
    padding: 5% 0 5% 40px;
}
.values--quote::before {
    content: "«";
    font-size: 5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, 100%);
}
.values--quote::after {
    content: "»";
    font-size: 5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-100%, -100%);
}
.values--name {
    font-family:  "greatvibes-regular";
    font-size: 2em;
    font-weight: 100;
    line-height: 1.5em;
}
.values--profession {
    font-family:  "greatvibes-regular";
    font-size: 1.3em;
    font-weight: 100;
}
.values--link-container {
    display: flex;
    flex-direction: row-reverse;
    height: 100px;
    align-items: flex-end;
}

</style>