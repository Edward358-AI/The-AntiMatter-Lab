import { watch, nextTick } from 'vue'

export default defineNuxtPlugin(() => {
  const route = useRoute()
  
  watch(() => route.fullPath, () => {
    nextTick(() => {
      if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise()
      } else if (window.MathJax?.typeset) {
        window.MathJax.typeset()
      }
    })
  })
})