export default defineNuxtPlugin(() => {
  window.onload = () => {
    document.getElementById("__nuxt").style.opacity = 1
    document.body.style.opacity = 1
    document.documentElement.style.opacity = 1
  }
})