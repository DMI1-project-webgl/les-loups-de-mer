<template>
    <div>
      <audio ref="clickGeneral" src="./../../src/assets/sound/click-general.mp3" preload="metadata" type="audio/mp3"></audio>
      <audio ref="waste" src="./../../src/assets/sound/ramasse-dechets.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="bubble" src="./../../src/assets/sound/pop-bubble.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="coraux" src="./../../src/assets/sound/coraux.mp3" preload="metadata" type="audio/mp3"></audio>
      <audio ref="success" src="./../../src/assets/sound/reussite.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="successFinal" src="./../../src/assets/sound/reussite-finale.wav" preload="metadata" type="audio/wav"></audio>

      <audio ref="piano" src="./../../src/assets/sound/melodie_piano.wav" preload="metadata" autoplay loop type="audio/wav"></audio>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AudioController',
  data: () => ({
      loop: {current: 0, target: 0.6, coef: 0.005}
  }),
  mounted () {
    this.signal.add(this.onSignal.bind(this));

    (this.$refs.piano as HTMLAudioElement).volume = 0

    document.body.addEventListener("click", this.loopPlay)
  },
  methods: {
    onSignal(slug: Array<string|number>) {
        switch (slug[0]) {
            case "click-general":
                (this.$refs.clickGeneral as HTMLAudioElement).play();
            break
             case "click-waste":
                (this.$refs.waste as HTMLAudioElement).play();
            break
             case "click-coraux":
                (this.$refs.coraux as HTMLAudioElement).play();
            break
            case "click-fish":
                (this.$refs.bubble as HTMLAudioElement).play();
            break
            case "success":
                this.loop.coef = 0.01
                this.loop.target = 0
                this.update()
                setTimeout(() => {(this.$refs.success as HTMLAudioElement).play()}, 500)
                setTimeout(() => {
                    this.loop.coef = 0.005
                    this.loop.target = 0.6
                    this.update()
                }, 3000)
            break
            case "success-final":
                this.loop.coef = 0.01
                this.loop.target = 0
                this.update()
                setTimeout(() => {(this.$refs.successFinal as HTMLAudioElement).play()}, 400)
                setTimeout(() => {
                    this.loop.coef = 0.005
                    this.loop.target = 0.6
                    this.update()
                }, 3400)
            break
        }
    },
    loopPlay() {
        (this.$refs.piano as HTMLAudioElement).play()
        this.update();
    },
    lerp (start: number, end: number, amt: number): number {
        return (1-amt)*start+amt*end
    },
    transitionSong() {

    },
    update() {
        if (this.loop.current < this.loop.target + 0.1 && this.loop.current > this.loop.target - 0.1) return
        console.log('update')
        this.loop.current = this.lerp(this.loop.current, this.loop.target, this.loop.coef);
        (this.$refs.piano as HTMLAudioElement).volume = this.loop.current
        setTimeout(this.update, 10)
    }
  },
  beforeDestroy () {
  }
})
</script>