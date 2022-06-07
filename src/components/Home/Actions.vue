<template>
    <section class="actions color--secondary">
        <div class="pute col-12 col-lg-6 h-lg-100">
            <div class="actions--img-container">
                <div class="actions--img">
                    <img src="../../assets/img/MainDroiteV2.png" alt="">
                </div>
                <div class="actions--img">
                    <img src="../../assets/img/MainGaucheV2.png" alt="">
                </div>
                <img src="../../assets/img/planet.png" alt="" class="earth">
            </div>
        </div>
        <div class="actions-left col-12 col-lg-5 actions--col-content">
            <div class="actions--title-container">
                <h1 class="actions--title">Nos actions</h1>
            </div>
            <div class="actions--content-container">
                <p class="actions--text">Découvrez nos actions sur le terrain pour protéger les requins.</p>
                <p class="actions--text">Les vertus millénaires des grands squales marins sont des trésors à préserver. Engagés depuis une dizaine d'années dans la préservation des espaces naturels abritant les requins, les Loups de mer défendent des valeurs écologiques.</p>
                <p class="actions--text">À chaque achat de nos produits, nous prélevons une partie du prix pour participer au parrainage d'un requin et à la défense de son milieu naturel.</p>
            </div>
            <div class="actions--link-container">
                <RoundButton link="/clean" text="Lancer l'expérience" :isClickHear="true" :isRouterLink="true" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoundButton from '../UI/RoundButton.vue'

export default defineComponent({
    name: "ActionsPage",
    mounted() {
    },
    methods: {},
    beforeDestroy() {
    },
    components: { RoundButton }
})
</script>

<style scoped>

.actions {
    min-height: 100vh;
    padding: 105px 0 20px 100px;
    display: flex;
    width: 100vw;
    margin: 0;
    overflow-x: hidden;
}

.pute {
    padding: 0 5%;
}
.actions--col-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    height: 70%;
    position: absolute;
    object-fit: contain;
    animation: levite 5s ease-in-out infinite;
}

.actions--img:nth-of-type(2) {
    animation: levite2 6s ease-in-out infinite;
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
    font-size: 0.5em;
}
.actions--img-container .earth{
    height: 100%;
    width: 100%;
    padding: 10%;
    object-fit: contain;
}

.actions--link-container {
    position: absolute;
    bottom: 0;
    right: -50px;
}
.actions--content-container {
    padding: 0 35% 0 0;
}

.actions-left {
    height: calc(100vh - 140px);
}

@keyframes levite {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes levite2 {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

</style>