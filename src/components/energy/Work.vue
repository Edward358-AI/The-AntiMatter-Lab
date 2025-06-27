<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Definition of "Work"</h1><br>
        <p>
            <div v-show="page===0">
                We've all done work before, whether it be for school, money, or just for fun. But in physics, the idea of 
                work is slightly different from what we think it is in daily life. (In fact, me typing these all words out on a
                keyboard might sound like a lot of work, but the actual amount of (physics) work done is very little!) This
                lesson is designed to teach you all about work and what it means to do work in a physics context. And no, doing
                problems actually isn't that much "work". I'll stop with the jokes now and get into the content.
                <br><br>
                <span v-show="level>0">
                Work is defined as the dot product of force and displacement. These are both vector quantities, but work itself is a
                scalar quantity. However, it's still important to realize that while work doesn't have a range of directions, it can still
                be either positive or negative. Thus, work can "cancel out" in a way, much like vectors can, but it is unltimately always going
                to be a scalar quantity. Here's a mathematical description of what I just said:
                <br><br>
                $$W = \vec{F} \cdot \vec{x}$$
                <br><br>
                </span>
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