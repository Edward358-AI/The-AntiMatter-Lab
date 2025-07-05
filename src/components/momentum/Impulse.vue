<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Impulse/Mometum Theorem</h1><br>
        <p>
            <div v-show="page===0">
                What is momentum? Well, like energy, it doesn't really have a good definition outside of a mathematical one.
                The best definition I can think of is that momentum describes how hard an object is to stop, but there are 
                several problems with this definition. Most sources just cite the mathematical definition. We will only deal 
                with linear momentum for now, so here's its definition:
                <br><br>
                $$ \vec{p} = m \vec{v} $$
                <br>
                This equation is very unassuming. Now, this isn't very useful unless we can connect it to previous concepts, which is 
                where impulse ($J$) comes in. Impulse is defined as the product of the force and the time over which it acts. It has a unit 
                of newton-seconds ($\textrm{N}\cdot \textrm{s}$). <span v-show="level>0">If you pay close attention, these units can be 
                    converted into $\textrm{kg~m/s}$ , which are the units of momentum. Wonder what that could mean?
                </span>
                <br><br>
                $$ J = F \Delta t $$
                <br>
                <span v-show="level==2">
                    For a varying force, the impulse can be calculated with an integral. You can probably guess that it's 
                    the integral of the force over the time period.
                    <br><br>
                    $$ J = \int_{t_1}^{t_b} F~dt $$
                    <br>
                    If the graph is simple enough, it may be easier just to calculate the area under the force v. time graph with 
                    geometry.
                </span>
                <span v-show="level<2">
                    For a force that changes with time, the impulse can still be found as the area under the force versus time graph.
                </span>
                <br><br>
                Now, this formula isn't very useful without 
            </div>
        </p>
    </div>

</template>


<style scoped>

</style>