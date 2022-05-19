import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import Signal from "./assets/js/webgl/utils/Signal";

let app = createApp(App);

app.config.globalProperties.signal = new Signal() 

app.use(router).mount('#app')