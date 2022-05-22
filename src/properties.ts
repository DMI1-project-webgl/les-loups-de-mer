import type Signal from "./assets/js/webgl/utils/Signal";

declare module 'vue' {
    interface ComponentCustomProperties {
      signal: Signal
    }
}