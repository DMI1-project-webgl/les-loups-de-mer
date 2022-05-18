<template>
    <section v-if="display" class="page-full actions color--secondary">
        <div class="container-fluid"> 
            <div class="row h-100">
                <div class="col-12 col-lg-6 h-lg-100">
                    <div class="actions--img-container">
                        <div class="actions--img">
                            <img src="" alt="">
                        </div>
                        <div class="actions--img">
                            <img src="" alt="">
                        </div>
                        <canvas></canvas>
                    </div>
                </div>
                <div class="col-12 col-lg-5 actions--col-content">
                    <div class="actions--title-container">
                        <h1 class="actions--title">Nos actions</h1>
                    </div>
                    <div class="actions--content-container">
                        <p class="actions--text">Découvrez nos actions sur le terrain pour protéger les requins.</p>
                        <p class="actions--text">Les vertus millénaires des grands squales marins sont des trésors à préserver. Engagés depuis une dizaine d'années dans la préservation des espaces natureks abritant les requins, Les loups de mer défendent des valeurs écologiques.</p>
                        <p class="actions--text">À chaque achat de nos produits, nous prélevons une partie du prix pour participer au parrainage d'un requin et à la défense de son milieu naturel.</p>
                    </div>
                    <div class="actions--link-container">
                        <a href="/clean" class="actions--link btn--secondary">
                            <img src="./../../assets/img/cliquer_ici.svg" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActionsPage',
  props: ['display'],
  mounted () {
      
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.actions--col-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.actions--img-container {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 20px;
    min-height: 50vh;
}

.actions--img img { 
    background: transparent;
}
.actions--img {
    border: 2px solid var(--color-primary);
    aspect-ratio: 4 / 5;
    height: 50%;
    position: absolute;
}
.actions--img:nth-child(1) {
    top: 0;
    right: 0;
}
.actions--img:nth-child(2) {
    bottom: 0;
    left: 0;
}

.actions--text {
    padding: 3% 0px;
}
.actions--quote::before {
    content: "«";
    font-size: 5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, 100%);
}
.actions--quote::after {
    content: "»";
    font-size: 5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-100%, -100%);
}
.actions--name {
    font-family:  "greatvibes-regular";
    font-size: 2em;
    font-weight: 100;
    line-height: 1.5em;
}
.actions--profession {
    font-family:  "greatvibes-regular";
    font-size: 1.3em;
    font-weight: 100;
}
.actions--img-container canvas{
    height: 100%;
    width: 100%;
    border: 1px solid green;
}

.actions--link-container {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
}
.actions--content-container {
    padding: 0 35% 0 0;
}

</style>