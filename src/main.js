import { createApp, onMounted } from 'vue'
import './style.css'
import VueMathjax from 'vue-mathjax-next'
import Main from './Main.vue'

const app = createApp(Main)
app.use(VueMathjax)
app.mount('#app')