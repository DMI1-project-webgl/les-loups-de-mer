<template>
    <section class="values color--secondary row">
        <div class="values-col col-12 col-lg-6 h-lg-100">
            <div class="values--img-container">
                <div class="values--img"></div>
                <div class="values--img">
                    <img src="./../../assets/img/christelle.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="values-col col-12 col-lg-5 values--col-content">
            <div class="values--title-container"> 
                <h1 class="values--title">Nos valeurs</h1>
            </div>
            <p class="values--text">Chez les loups de mer, on est passionnés du milieu marin depuis 1987, nous sommes une équipe composée de cuisiniers, scientifiques et spécialistes de la faune et de la flore aquatique. Très soucieux du développement de cet espace naturel magique, nous travaillons à base de produits frais et sourcés avec attention. </p>
            <p class="values--quote">Nous vous proposons des produits dérivés de cette richesse naturelle destinés à vous aider à lutter contre les effets du temps sur votre corps. Vitalité, énergie, jeunesse et confort, nous travaillons ensemble pour vous aider à profiter des bienfaits des fonds marins.</p>
            <div class="values--name-container">
                <p class="values--name">Christelle Deneuve</p>
                <p class="values--profession">Fondatrice des Loups de mer</p>
            </div>
            <div ref="btn" class="values--link-container btn-round-hidden">
                <RoundButton link="/actions" text="Suivant" :isClickHear="true" :isRouterLink="true" />
            </div>
            <div class="ws-50"></div>
        </div>
        <!-- <div class="col-1"></div> -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoundButton from '../UI/RoundButton.vue'

export default defineComponent({
  name: 'ValuesPage',
  mounted () {
      setTimeout(() => {
            (this.$refs.btn as HTMLElement).classList.add('btn-round-show')
        }, 100)
  },
  beforeDestroy () {
  },
  components: { RoundButton }
})
</script>

<style scoped>

.values {
    min-height: 100vh;
    padding: 80px 0 20px 100px;
    width: 100vw;
    margin: 0;
    overflow-x: hidden;
}

.values-col {
    padding: 0;
}
.values--title-container {
    margin-bottom: 20px;
}
.values--col-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.values--img-container {
    height: 100%;
    position: relative;
    min-height: 50vh;
}
.values--img img { 
    background: var(--color-primary);
}
.values--img {
    border: 2px solid var(--color-primary);
    aspect-ratio: 4 / 5;
    height: 60%;
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
    padding: 5px 30% 20px 0px;
}
.values--quote {
    padding: 5px 30% 0px 0px;
    position: relative;
    margin-bottom: 20px;
}
.values--name-container {
    padding: 10px 0 0px 0px;
}
.values--quote::before {
    content: "«";
    font-size: 5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    line-height: .5em;
    top: 0;
    left: 0;
    transform: translate(-130%, 0%);
}

.values p {
    font-size: 0.5em;
}
.values--quote::after {
    content: "»";
    font-size: 5em;
    line-height: .5em;
    color: var(--color-primary);
    font-family: "frasha-regular";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-380%, 0%);
}
.values--name {
    font-family:  "greatvibes-regular";
    font-size: 1em !important;
    font-weight: 100;
    line-height: 1.5em;
}
.values--profession {
    font-family:  "greatvibes-regular";
    font-size: .6em !important;
    font-weight: 100;
}
.values--link-container {
    position: absolute;
    bottom: 0;
    right: -50px;
}

</style>