<script setup lang="ts">
import SquaredButton from './../components/UI/SquaredButton.vue';
import BackgroundGradient from './../components/BackgroundGradient.vue';
import Nav from './../components/Nav.vue';
</script>

<template>
  <BackgroundGradient />
  <Nav />
  <section class="shop page-experience">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100">
          <div class="shop--product-details">
            <h2 class="shop--product-name">Requin blanc</h2>
            <p class="shop--product-package">La version luxe</p>
            <p class="shop--product-description">Avec ce pack, aidez jusqu'à 12 requins.</p>
          </div>
          <div>
            <table>
              <tr>
                <td>huile</td>
                <td>2 L</td>
              </tr>
              <tr>
                <td>Épices</td>
                <td>100g</td>
              </tr>
              <tr>
                <td>Bouillon</td>
                <td>125g</td>
              </tr>
            </table>
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
</style>
