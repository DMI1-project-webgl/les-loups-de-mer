<script setup lang="ts">
import SquaredButton from './../../components/UI/SquaredButton.vue';
</script>
<template>
    <section id="modal" class="modal">
      <div class="modal--content-container">
        <div class="modal--content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusantium quasi dolorum rerum tempore amet deleniti, ad animi perferendis. Laborum adipisci quam at dolorum deserunt ducimus maiores tempore odio ipsa.</p>
        </div>
        <div class="modal--btn-container">
          <SquaredButton id="modal-btn" class="modal--btn" :isRouterLink="false" link="#demo-modal" text="Continuer" :isWhite="true" @validate="validateStep"/>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalElement',
  mounted () {
      document.getElementById('modal-btn').addEventListener("click", (e) => {
        document.getElementById('modal').classList.add('none')
      });
  }, 
  methods: {
    
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  max-width: 400px;
  aspect-ratio: 1/1;
  top: 50%;
  right: 0;
  transform: translate(-100px, -50%);
}
.modal--content-container {
  display: flex;
  flex-direction: column;
}
.modal--content {
  background-color: white;
  padding: 30px;
  position: relative;
  font-size: .7em;
}
.modal--btn {
  align-items: flex-start;
  padding: 5px 0;
}
.modal.none{
  max-width: 0;
  color: white;
  overflow: hidden;
  /* border-radius: 50%;
  transition: max-width .5s ease-in-out; */
}
.modal.none .modal--btn-container {
  opacity: 0;
}

</style>

