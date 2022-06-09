<template>
  <section class="breadcrumb" data-step="{{step}}">
      <div class="breadcrumb--container">
          <div class="breadcrumb--step">
            <div class="breadcrumb--step-content">
                <p>Étape 1</p>
            </div>
          </div>
          <div class="breadcrumb--step">
            <div class="breadcrumb--step-content">
                <p>Étape 2</p>
            </div>
          </div>
          <div class="breadcrumb--step">
              <div class="breadcrumb--step-content">
                <p>Étape 3</p>
            </div>
          </div>
      </div>
      <div class="breadcrumb--title">
          <h2 ref="title">Dépollution de l’écosystème</h2>
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BreadcrumbElement',
  data() {
    return {
      texts: ['Dépollution de l’écosystème', 'Végétallisation de l’écosystème', 'Peuplement de l’écosystème']
    };
  },
  mounted() {
    this.signal.add(this.onSignal.bind(this))
  },
  methods: {
      onSignal(slug: Array<string|number>) {
          if (slug[0] == 'update-step') {
            const steps = document.querySelectorAll(".breadcrumb--step");
            if (this.$refs.title as HTMLElement && this.texts[slug[1] as number - 1]) {
                (this.$refs.title as HTMLElement).innerHTML = this.texts[slug[1] as number - 1]
            }
            if (!steps[slug[1] as number - 1]) return
            steps[slug[1] as number - 1].classList.add("is-active");
          }
      }
  },
  beforeDestroy () {
  }
})
</script>

<style scoped>
.breadcrumb {
    top: -15px;
    transform: translate(0, 50%);
}
.breadcrumb--container { 
    position: relative;
    border: 1px solid var(--color-tertiary);
    height: 2px;
    margin: 0 15%;
    position: relative;
}
.breadcrumb--step {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-primary);
    border: 1px solid var(--color-tertiary);
    position: absolute;
    top: 50%;
}
.breadcrumb--step:nth-child(1) {
    left: 0;
    transform: translate( -50% , -50% );
}
.breadcrumb--step:nth-child(2) {
    left: 50%;
    transform: translate( -50% , -50% );
}
.breadcrumb--step:nth-child(3) {
    right: 0;
    transform: translate( 50% , -50% );
}
.breadcrumb--step-content {
    color: var(--color-tertiary);
    font-size: .8em;
    text-align: center;
    white-space: nowrap;
    position: absolute;
    padding-bottom: 10px;
    bottom: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.breadcrumb--step-content img {
    height: 100%;
    width: 100%;
}

.is-active.breadcrumb--step {
    background-color: var(--color-tertiary);
}
.breadcrumb--title h2 {
    font-size: .7em;
    color: var(--color-tertiary);
    padding: 15px;
    text-align: center;
}

</style>
