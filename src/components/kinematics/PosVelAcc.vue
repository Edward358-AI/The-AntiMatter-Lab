<script setup>
defineProps(["level"])
defineEmits(["nextpage"])
</script>


<template>
    <div class="container-fluid p-5 mw-1120">
        <h1>Position, Velocity, Acceleration</h1><br>
        <p>
            <span v-show="level == 0">
                Hopefully you remembered everything (or at least, the really important stuff) from last lesson, because you're going to need it here (and in the future as well, so maybe good idea to reread the previous lesson if you fell asleep)! 
            </span>
            <br><br><a href="javascript:void(0)" @click="$emit('nextpage')" style="animation: scale 2s infinite;display:block">Next Lesson! &rarr;</a>
        </p>
    </div>

</template>


<style scoped>

</style>