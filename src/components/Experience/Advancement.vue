<script setup lang="ts">
import Breadcrumb from './../../components/Experience/Breadcrumb.vue';
import Progress from './../../components/Experience/Progress.vue';
</script>

<template>  
    <section class="advencement">
        <div class="container-fluid px-0">
            <div class="row h-100">
                <div class="col-3 h-100">
                    <Progress advancement="50" />
                </div>
                <div class="col-6 h-100">
                    <Breadcrumb step="1" />
                </div>
                <div class="col-3 h-100">
                    <div class="adencement--link-container">
                        <a href="/clean" class="adencement--link">
                            <div class=" btn--tertiary">
                                <span>Acheter<br>les&nbsp;produits</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
</template>


<script lang="ts">
import HomeScene from './../../assets/js/webgl/main/HomeScene'
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
.advencement {
    margin-left: 100px;
    bottom: 0;
    position: fixed;
    width: -webkit-fill-available;
}
.advencement--link-container, .advencement--link {
    width: fit-content;
}
</style>