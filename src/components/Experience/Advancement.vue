<script setup lang="ts">
import Breadcrumb from './../../components/Experience/Breadcrumb.vue';
import Progress from './../../components/Experience/Progress.vue';
import RoundButton from '../UI/RoundButton.vue';
import RoundButton1 from '../UI/RoundButton.vue';
</script>

<template>  
    <section class="advencement">
        <div class="container-fluid px-0">
            <div class="row h-100">
                <div class="col col-3 h-100">
                    <Progress />
                </div>
                <div class="col col-6 h-100">
                    <Breadcrumb  />
                </div>
                <div class="col-3 h-100">
                    <div class="adencement--link-container">
                        <RoundButton link="/clean" text="Acheter les produits" :isWhite="true" :isRouterLink="true" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdvencementElement',
  mounted () {
      
  },
  methods: {

  },
  beforeDestroy () {
  }
})
</script>

<style scoped>

.advencement .col {
    margin-top: auto;
}
.advencement {
    margin-left: 100px;
    bottom: 20px;
    position: fixed;
    width: -webkit-fill-available;
}
.advencement--link-container, .advencement--link {
    width: fit-content;
}
</style>