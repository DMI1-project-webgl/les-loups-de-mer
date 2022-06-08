<script setup lang="ts">
import SquaredButton from './../../components/UI/SquaredButton.vue';
</script>
<template>
    <section id="modal" class="modal" ref="modal" :class="classlist">
      <div class="modal--content-container">
        <div class="modal--content">
          <p ref="modalText">{{text}}</p>
        </div>
        <div  v-if="showbtn == true" class="modal--btn-container" ref="modalButton">
          <SquaredButton id="modal-btn" class="modal--btn" :isRouterLink="false" text="Continuer" :isWhite="true" @validate="$emit('showoff')"/>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap';

export default defineComponent({
  name: 'ModalElement',
  props: ['text', 'showbtn', 'classlist'],
  mounted () {
    gsap.to((this.$refs.modal as HTMLElement), {
        opacity: 1,
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
    })
    gsap.fromTo((this.$refs.modalText as HTMLElement), {
        opacity: 0,
        x: -10
    },{
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay:0.6,
        ease: 'power2.out',
    })
    if (!this.$refs.modalButton) return
    gsap.fromTo((this.$refs.modalButton as HTMLElement), {
        opacity: 0,
        x: -10,
    },{
        opacity: 1,
        duration: 0.8,
        x: 0,
        delay: 1.2,
        ease: 'power2.out',
    })
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
  transform: translate(-100px, -50%) scaleX(0.6);
  opacity: 0;
  transform-origin: left;
  transition: opacity 0.3s ease-out;
}

.modal-disable {
  opacity: 0 !important;
  pointer-events: none;
}
.modal--content-container {
  display: flex;
  flex-direction: column;
}
.modal--content {
  background-color: var(--color-tertiary);
  padding: 30px;
  position: relative;
  font-size: .8em;
}
.modal--btn {
  align-items: flex-start;
  padding: 5px 0;
}
.modal.none{
  max-width: 0;
  color: var(--color-tertiary);
  overflow: hidden;
  /* border-radius: 50%;
  transition: max-width .5s ease-in-out; */
}
.modal.none .modal--btn-container {
  opacity: 0;
}
.shop--blur-btn .modal {
  position: absolute;
  min-width: 400px;
  left: 50%;
  aspect-ratio: unset;
}
</style>

