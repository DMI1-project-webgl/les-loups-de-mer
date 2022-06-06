<template>
    <div>
      <audio ref="clickGeneral" src="./../../src/assets/sound/click-general.mp3" preload="metadata" type="audio/mp3"></audio>
      <audio ref="waste" src="./../../src/assets/sound/ramasse-dechets.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="bubble" src="./../../src/assets/sound/pop-bubble.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="coraux" src="./../../src/assets/sound/coraux.wav" preload="metadata" type="audio/mp3"></audio>
      <audio ref="success" src="./../../src/assets/sound/reussite.wav" preload="metadata" type="audio/wav"></audio>
      <audio ref="successFinal" src="./../../src/assets/sound/reussite-finale.wav" preload="metadata" type="audio/wav"></audio>

      <audio ref="piano" src="./../../src/assets/sound/melodie_piano.wav" preload="metadata" autoplay loop type="audio/wav"></audio>

      <div ref="audioControl" class="audio-control audio-control--disable" @click="toggleSound">
          <img class="volume" ref="volume" src="../assets/img/volume.png">
          <img class="mute" ref="mute" src="../assets/img/mute.png">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AudioController',
  data: () => ({
      loop: {current: 0, target: 0, coef: 0.005},
      soundStatus: true
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
                setTimeout(() => {(this.$refs.success as HTMLAudioElement).play()}, 650)
                setTimeout(() => {
                    this.loop.coef = 0.005
                    this.loop.target = 0.6
                    this.update()
                }, 3400)
            break
            case "success-final":
                this.loop.coef = 0.01
                this.loop.target = 0
                this.update()
                setTimeout(() => {(this.$refs.successFinal as HTMLAudioElement).play()}, 650)
                setTimeout(() => {
                    this.loop.coef = 0.005
                    this.loop.target = 0.6
                    this.update()
                }, 4000)
            break
            case "experience-start":
                this.loop.target = 0.6;
                (this.$refs.piano as HTMLAudioElement).pause()
                if (!(this.$refs.piano as HTMLAudioElement).paused) {
                    this.loopPlay()
                }
                break
            case "experience-end":
                this.loop.target = -0.09
                this.loop.coef = 0.1;
                (this.$refs.audioControl as HTMLElement).classList.add('audio-control--disable')
                this.update()
        }
    },
    loopPlay() {
        console.log('yoooooo', (this.$refs.piano as HTMLAudioElement).paused)
        if (!(this.$refs.piano as HTMLAudioElement).paused) return
        console.log('yooooooaaa', (this.$refs.piano as HTMLAudioElement).paused);
        (this.$refs.piano as HTMLAudioElement).play()
        if (this.loop.target = 0.6) {
            (this.$refs.audioControl as HTMLElement).classList.remove('audio-control--disable');
        }
        this.loop.coef = 0.005
        this.update()
    },
    lerp (start: number, end: number, amt: number): number {
        return (1-amt)*start+amt*end
    },
    transitionSong() {

    },
    update() {
        if (this.loop.current < this.loop.target + 0.1 && this.loop.current > this.loop.target - 0.2) return
        this.loop.current = Math.max(this.lerp(this.loop.current, this.loop.target, this.loop.coef), 0);
        (this.$refs.piano as HTMLAudioElement).volume = this.loop.current
        setTimeout(this.update, 10)
    },
    toggleSound() {
        if (this.soundStatus) {
            this.soundStatus = false;
            (this.$refs.volume as HTMLElement).style.display = 'block';
            (this.$refs.mute as HTMLElement).style.display = 'none';
            this.loop.target = -0.09
            this.loop.coef = 0.1
            this.update()
        } else {
            this.soundStatus = true;
            (this.$refs.volume as HTMLElement).style.display = 'none';
            (this.$refs.mute as HTMLElement).style.display = 'block';
            this.loop.coef = 0.01
            this.loop.target = 0.6
            this.update()
        }
    }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.audio-control {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 5;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    padding: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
    transition: opacity 0.4s ease-out;
    cursor: pointer;
}

.audio-control--disable {
    pointer-events: none;
    opacity: 0;
}

.volume {
    display: none;
}
</style>