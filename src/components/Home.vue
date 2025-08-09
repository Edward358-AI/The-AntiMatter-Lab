<script setup>
import { onMounted, ref } from 'vue'
const windowSize = ref(window.innerWidth)

onMounted(() => {window.onresize = () => {windowSize.value = window.innerWidth}})
</script>

<template>
    <div id="welcome" class="px-3">
        <img src="/logo.png" style="max-width: 210px;" width="45%" class="rounded" />
        <h1>Welcome to the AntiMatter Lab.</h1>
        <p style="animation: slideUp 5s forwards; animation-delay: 100ms; opacity: 0;">What is physics? It's the study
            of matter.<br>Why learn physics? Because it matters.</p>
        <h6 style="animation: slideUp 5s forwards 300ms;opacity:0;">Pick a lesson to get
            started!</h6>
        <p style="animation: slideUp 5s forwards 400ms;opacity:0;">Don't know where to
            go? Visit our <RouterLink to="/about">about page!</RouterLink></p>
    <span class="warn">{{ windowSize < 1000 ? "Note: This website is NOT optimized for smaller screens/viewport widths. While the website does work, some parts are best viewed on a larger screen." : "" }}</span>
    </div>
</template>

<style scoped>
#welcome {
    margin: auto;
    padding-top: 55px;
    padding-left: 10px;
    padding-right: 10px;
    animation: fadein 1.5s;
    transition: 0.5s;
}

#welcome img {
    margin-bottom: 10px;
}

#welcome h1 {
    animation: slideUp 5s forwards;
    opacity: 0;
}
</style>
