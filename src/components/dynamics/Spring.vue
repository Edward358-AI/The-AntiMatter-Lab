<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Spring Forces</h1><br>
        <p>
        <div v-show="page === 0">
            The spring has been around for quite a while. It's used in all sorts of things like scales, shock dampeners,
            cars, etc. It's 8seful because it applies a larger force the more it's stretched or compressed, which gives it
            flexibility as well as allowing it to store energy. Engineers would tell you more, but this is a physics lesson and we'll
            mostly go over the physics of springs rather than the applications.
            <span v-show="level>0"></span>

               <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>

            
        </div>
        </p>
    </div>

</template>


<style scoped>

</style>