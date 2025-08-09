<script setup>
import { watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

const router = useRouter()

router.afterEach((to, from) => {
  nextTick(() => {
    window.MathJax.typeset()
    document.title = to.meta.title
    window.scrollTo(0,0)
  })
})

const user = useUserStore()

watch (() => {user.theme}, () => {
  document.documentElement.setAttribute('data-theme', user.theme)
}, {
  immediate: true
})
</script>

<template>
  <Sidebar />
  <RouterView />
</template>