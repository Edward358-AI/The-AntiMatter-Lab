<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Definition of Power</h1><br>
        <p>
            <div v-show="page===0">
                We say power is one of the three things people generally want, along with money and happiness. However, 
                the way we think about power is more analgous to thinking about force or respect, rather than actual power. 
                In fact, horses and oxen have much more "power" than humans. There's a reason why car engines are 
                often measured in <i>horse</i>power and not <i>man</i>power!
                <br><br>
                Power is actually the rate at which something does work, or the rate at which it can change the energy of 
                a system. Both definitions are pretty much analogous and can be referred to interchangeably. 

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