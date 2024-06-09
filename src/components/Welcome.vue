<script setup>
defineEmits(['show-sidebar'])
defineProps(['sidebar'])
</script>

<template>
    <div id="welcome" :style="sidebar ? '' : 'transform: translateX(-160px);'">
        <img src="/logo.png" width="40%" class="rounded" />
        <h1>Welcome to the AntiMatter Lab.</h1>
        <p style="animation: slideUp 5s forwards; animation-delay: 100ms; opacity: 0;">What is physics? It's the study
            of matter.<br>Why learn physics? Because it matters.</p>
        <button type="button" class="btn btn-primary" @click="$emit('show-sidebar')"
            :style="sidebar ? 'visibility:hidden;' : ''">Get Started</button>
        <h6 :style="sidebar ? 'animation: slideUp 5s forwards 500ms;opacity:0;' : 'opacity:0;'">Pick a lesson to get
            started!</h6>
        <p :style="sidebar ? 'animation: slideUp 5s forwards 700ms;opacity:0;' : 'opacity:0;'">Don't know where to
            go? Visit our about page!</p>
    </div>
</template>

<style scoped>

#welcome {
    margin: auto;
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

#welcome button {
    animation: slideUp 5s forwards;
    animation-delay: 300ms;
    opacity: 0;
}
</style>