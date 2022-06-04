<script setup lang="ts">
import SquaredButton from './../components/UI/SquaredButton.vue';
import BackgroundGradient from './../components/BackgroundGradient.vue';
import Nav from './../components/Nav.vue';
import RoundButton from './../components/UI/RoundButton.vue'
</script>

<template>
  <BackgroundGradient />
  <Nav />
  <section class="shop page-experience">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100">
          <div class="shop--content-container">
            <div class="shop--product-details">
              <h2 class="shop--product-name">Requin blanc</h2>
              <p class="shop--product-package">La version luxe</p>
              <p class="shop--product-description">Avec ce pack, aidez jusqu'à 12 requins.</p>
            </div>
            <div>
              <table class="shop--pack-composition">
                <tr>
                  <td class="shop--composition-name">huile</td>
                  <td class="shop--composition">2 L</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Épices</td>
                  <td class="shop--composition">100g</td>
                </tr>
                <tr>
                  <td class="shop--composition-name">Bouillon</td>
                  <td class="shop--composition">125g</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-6 h-100">
          <div class="shop--heading">
            <h1>Nos packs</h1>
            <p>Retrouvez dans nos packs composés d'une épice, d'une soupe et d'un bouillon qui révèle le meilleur de l'aileron de requin pour vous aider à lutter contre es effets du temps</p>
          </div>
          <div class="shop--product-contaier">
            <div class="shop--products"></div>
          </div>
        </div>
        <div class="col-3 h-100">
          <div class="shop--product-buy">
            <div class="shop--product">
              <div class="shop--product-price">
                <p>90e</p>
              </div>
               <RoundButton link="/valeurs" text="Nos valeurs" :isWhite="true" :isRouterLink="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Shop',
  mounted() {
  },
  methods: {
    
  }
})
</script>

<style scoped>
.shop {
  color: white;
}
.shop--heading {
  text-align: center;
}
.shop--content-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.shop--product-details {
  margin-bottom: 50px;
}
.shop--product-name {
  font-size: 1.7em;
}
.shop--product-package {
  font-size: .8em;
  padding-bottom: 10px;
}
.shop--product-description, 
.shop--pack-composition { 
  font-size: .5em;
  font-family: "leaguespartan";
}
.shop--composition-name {
  font-weight: 800;
}
.shop--composition {
  padding-left: 15px ;
}
.shop--product-price {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
}
.shop--product-price p {
  position: absolute;
  color: var(--color-primary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: .8em;

}
</style>
