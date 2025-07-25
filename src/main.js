import { createApp, onMounted } from 'vue'
import './style.css'
import VueMathjax from 'vue-mathjax-next'
import Main from './Main.vue'

const app = createApp(Main)
app.use(VueMathjax)
app.mount('#app')

// Prevent dragging of images
window.addEventListener('dragstart',(e) => {
  if (e.target.nodeName === 'IMG') e.preventDefault()
})

window.MathJax.typeset()