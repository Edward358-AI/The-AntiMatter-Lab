<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>

<template>
    <div class="container h100 p-5">
        <h1>Simple Harmonic Motion</h1><br>
        <p>
            <div v-show="page===0">
                
            </div>
        </p>
    </div>
</template>


<style scoped></style>