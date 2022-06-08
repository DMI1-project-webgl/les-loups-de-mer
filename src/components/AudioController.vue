<template>
    <div>
      <audio ref="clickGeneral" preload="metadata">
          <source src="./../../src/assets/sound/click-general.mp3" type="audio/mp3">
      </audio>
      <audio ref="waste" preload="metadata">
          <source src="./../../src/assets/sound/ramasse-dechets.mp3" type="audio/wav">
      </audio>
      <audio ref="bubble" preload="metadata">
          <source src="./../../src/assets/sound/pop-bubble.wav" type="audio/wav">
      </audio>
      <audio ref="coraux" preload="metadata">
          <source src="./../../src/assets/sound/coraux.wav" type="audio/wav">
      </audio>
      <audio ref="success" preload="metadata">
          <source src="./../../src/assets/sound/reussite.wav" type="audio/wav">
      </audio>
      <audio ref="successFinal" preload="metadata">
          <source src="./../../src/assets/sound/reussite-finale.wav" type="audio/wav">
      </audio>

      <audio ref="piano" preload="metadata" autoplay loop>
          <source src="./../../src/assets/sound/melodie_piano.wav" type="audio/wav">
      </audio>

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
      soundStatus: true,
      volumeglobale: 1,
      isExperience: false
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
                (this.$refs.clickGeneral as HTMLAudioElement).volume = this.volumeglobale;
            break
             case "click-waste":
                (this.$refs.waste as HTMLAudioElement).play();
                (this.$refs.waste as HTMLAudioElement).currentTime = 0;
                (this.$refs.waste as HTMLAudioElement).volume = this.volumeglobale;
            break
             case "click-coraux":
                (this.$refs.coraux as HTMLAudioElement).play();
                (this.$refs.coraux as HTMLAudioElement).volume = this.volumeglobale;
            break
            case "click-fish":
                (this.$refs.bubble as HTMLAudioElement).play();
                (this.$refs.bubble as HTMLAudioElement).volume = this.volumeglobale;
            break
            case "success":
                if (this.volumeglobale === 0) return
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
                if (this.volumeglobale === 0) return
                this.loop.coef = 0.01
                this.loop.target = 0
                this.update()
                setTimeout(() => {(this.$refs.successFinal as HTMLAudioElement).play()}, 650)
                setTimeout(() => {
                    this.loop.coef = 0.005
                    this.loop.target = 0.6
                    this.update()
                }, 4400)
            break
            case "experience-start":
                this.isExperience = true
                if (!this.soundStatus) return
                this.loop.target = 0.6;
                (this.$refs.piano as HTMLAudioElement).pause()
                break
            case "experience-end":
                this.isExperience = false
                this.loop.target = -0.09
                this.loop.coef = 0.1;
                (this.$refs.audioControl as HTMLElement).classList.add('audio-control--disable')
                this.update()
        }
    },
    loopPlay() {
        if (!this.isExperience) return
        if (!(this.$refs.piano as HTMLAudioElement).paused) return
        (this.$refs.piano as HTMLAudioElement).play();
        (this.$refs.audioControl as HTMLElement).classList.remove('audio-control--disable');
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
        if (this.loop.current < 0.05 && this.loop.target <= 0) {
            this.loop.current = 0
        }
        (this.$refs.piano as HTMLAudioElement).volume = this.loop.current
        setTimeout(this.update, 10)
    },
    toggleSound() {
        if (this.soundStatus) {
            this.soundStatus = false;
            this.volumeglobale = 0;
            (this.$refs.volume as HTMLElement).style.display = 'none';
            (this.$refs.mute as HTMLElement).style.display = 'block';
            this.loop.target = -0.09
            this.loop.coef = 0.1
            this.update()
        } else {
            this.soundStatus = true;
            this.volumeglobale = 1;
            (this.$refs.volume as HTMLElement).style.display = 'block';
            (this.$refs.mute as HTMLElement).style.display = 'none';
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
    background-color: var(--color-tertiary);
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

.mute {
    display: none;
}
</style>