<script setup>
defineProps(["level"])
defineEmits(["nextpage"])
</script>


<template>
    <div class="container-fluid p-5 mw-1120">
        <h1>Position, Velocity, and Acceleration</h1><br>
        <p>
            <span v-show="level == 0">
            </span>
            <br><br><a href="javascript:void(0)" @click="$emit('nextpage')" style="animation: scale 2s infinite;display:block">Next Lesson!</a>
        </p>
    </div>

</template>


<style scoped>

</style>