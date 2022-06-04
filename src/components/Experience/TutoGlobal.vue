<template>
    <section class="TutoGlobal" ref="container">
        <div v-for="(text, index) in texts" :key="index" class="TutoGlobal-step" :class="'TutoGlobal-step-' + index">
            <p v-for="(textSplited, n) in splitText(text)" :key="n" class="TutoGlobal-text" :class="'TutoGlobal-text-' + n">
                <span v-for="(char, indexChar) in splitChar(textSplited)" :key="indexChar" ref="char" class="TutoGlobal-char" :class="'TutoGlobal-char-' + indexChar">
                    {{ char + (indexChar === (textSplited.length - 1) ? '&nbsp;' : '' ) }}
                </span>
            </p>
            <div class="TutoGlobal-next-container"><button @click="nextStep" ref="next" class="TutoGlobal-next">Suite</button></div>
        </div>
    </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap';

export default defineComponent({
  name: 'TutoGlobal',
  props: ['texts', 'alreadyOpen'],
  data: () => ({
      step: {current: -1, next: 0},
      elSteps: undefined
  }),
  mounted () {
    this.elSteps = document.querySelectorAll('.TutoGlobal-step')
    if (this.alreadyOpen) {
         gsap.to((this.$refs.container as HTMLElement), {
            opacity: 1,
            duration: 0,
        })
        setTimeout(this.nextStep, 3000)
    } else {
        gsap.to((this.$refs.container as HTMLElement), {
            opacity: 1,
            duration: 0.8,
            ease: 'power1.out',
        })
        setTimeout(this.nextStep, 1000)
    }
  }, 
  methods: {
    splitText(text) {
        return text.split(" ")
    },
    splitChar(text) {
        return text.split("")
    },
    nextStep() {
        const timeline = gsap.timeline();
        if (this.step.current !== -1 && this.step.current < this.elSteps.length) {
            timeline.to((this.$refs.next as HTMLElement), { 
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            })
            timeline.to(this.elSteps[this.step.current].querySelectorAll('.TutoGlobal-char'), {
                y: -50,
                rotate: 0,
                duration: 1.3,
                ease: 'expo.in',
                delay: 0,
                stagger:  0.008
            });
            timeline.to(this.elSteps[this.step.current], {
                display: 'none',
                onComplete: () => {
                    if (this.step.next - 1 >= this.elSteps.length) {
                        this.signal.dispatch(['camera-experience-state'])
                    }
                }
            })
        }
        if (this.step.next < this.elSteps.length) {
            timeline.to(this.elSteps[this.step.next], {
                display: 'flex'
            })
            timeline.to(this.elSteps[this.step.next].querySelectorAll('.TutoGlobal-char'), {
                    y: 0,
                    rotate: 0,
                    duration: 1.3,
                    ease: 'expo.out',
                    delay: 0,
                    stagger:  0.008
                });
            timeline.to((this.$refs.next as HTMLElement), {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
        } else {
            timeline.to((this.$refs.container as HTMLElement), {
                opacity: 0,
                duration: 0.8,
                ease: 'power1.out',
                display: 'none',
                onComplete: () => {
                    this.signal.dispatch(['begin-tuto'])
                }
            })
        }
        this.step.current ++
        this.step.next ++
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.TutoGlobal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  inset: 0;
  background-color: rgba(14, 14, 76, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.TutoGlobal-step {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 40%;
    display: none;
}

.TutoGlobal p {
    color: #FFF;
    text-align: center;
    font-family: "frasha-regular";
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.2;
    display: flex;
    overflow: hidden;
}

.TutoGlobal p span {
    display: block;
}

.TutoGlobal-char {
    transform: translateY(50px);
}

.TutoGlobal-next {
    width: min-content;
    height: min-content;
    display: block;
    margin: auto;
    color: #FFF;
    text-align: center;
    font-family: "frasha-regular";
    font-size: 1.2rem;
    font-weight: 300;
    transition: text-shadow 0.3s ease-out;
    opacity: 0;
}

.TutoGlobal-next:hover {
    text-shadow: #FFF 0px 0 10px;
}

.TutoGlobal-next-container {
    width: 100%;
    margin-top: 30px;
}
</style>