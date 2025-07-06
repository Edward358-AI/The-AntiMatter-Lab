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
                Now, this formula isn't very useful. After all, what even is impulse? What does it do? Why do we even care?
                <br><br>
                <figure>
                    <img src="/src/assets/momentum/minosprime.png" width="750px">
                    <figcaption>
                        Figure 1: You are very cool if you get the reference.
                    </figcaption>
                </figure>
                <br><br>
                Well, Minos Prime (that's the guy's name) isn't exactly correct here. You see, there's something called the 
                <b>impulse-momentum theorem</b> that connects the concepts of impulse and momentum. It's actually an extremely simple 
                relation.
                <br><br>
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    The <b>impulse-momentum theorem</b>:
                    <br>
                    $$ J = \Delta p $$
                </div>
                <br>
                Yep. That's all there is to it. Impulse is merely the change in momentum. <span v-show="level>0">Of course,
                    when calculating, it is good to note that this is the impulse exerted by the net force. Also, the change 
                    in momentum is usually $m\Delta v$, but not always. You'll see what I mean.
                </span>
                <span v-show="level>0">
                    <br><br>
                Now we can do a short practice problem to hammer home the concept.
                <br><br>
                <div class="problem">
                   How much impulse does gravity exert on a 2.0 kg object as it slides down a 30 degree inclined plane 
                   in three seconds? Using this, how much does the velocity change?
                   <br><br>
                   Hopefully, you realize that only the portion of gravity pointed down the incline is exerting an impulse.
                    This gives us a force of $F = mg\sin \theta = \frac{mg}{2}$. We can now easily find the impulse.
                    <br><br>
                    $$ J = F t = \dfrac{mg}{2}t = \bbox[3px,
                    border: 0.5px solid
                    white]{29.4 ~\textrm{N} \cdot \textrm{s} }$$
                    <br>
                    After we have found this, we can use the impulse-momentum theorem to calculate the velocity change:
                    <br><br>
                    $$ J = \Delta p = m \Delta v $$
                    $$ \Delta v = \dfrac{J}{m} = \bbox[3px,
                    border: 0.5px solid
                    white] {14.7 ~\textrm{m/s} } $$
                    <br>
                    We get the same result if we use kinematics techniques, letting us know that our answer is correct.
                </div>
                </span>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                The second thing I'd like to talk about here is Newton's Second Law. You might think that was a typo or that I've 
                completely gone insane, but that was intentional. (I'm not going to comment about insanity.) The form we gave for Newton's 
                Second Law is a generalized form for the cases where mass is constant.
                <br><br>
                <span v-show="level==2">
                    The form of this new second-law variant involves a derivative, as well as the concept of momentum.
                    <br><br>
                    $$ F = \dfrac{dp}{dt} $$
                    <br>
                    This was actually Newton's preferred form of his second law, since it's more general and can deal with more 
                    cases. We can also write this as an average force:
                    <br><br>
                    $$ F_{av} = \dfrac{\Delta p}{\Delta t} $$
                    <br>
                </span>
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
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