<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100-fluid p-5 mw-1120">
        <h1>Definition of "Work"</h1><br>
        <p>
            
            <br><br><a href="javascript:void(0)" @click="$emit('nextlesson')" style="animation: scale 2s infinite;display:block">Next Lesson! &rarr;</a>
        </p>
    </div>

</template>


<style scoped>

</style>