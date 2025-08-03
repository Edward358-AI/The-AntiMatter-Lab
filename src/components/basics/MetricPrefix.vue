<script setup>
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>

<template>
    <div class="container h100 p-5">
        <h1>Metric Prefixes</h1>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson! &rarr;</button>
            </div>
    </div>
</template>

<style scoped></style>