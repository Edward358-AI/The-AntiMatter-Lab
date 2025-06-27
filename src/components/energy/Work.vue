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
                Work is defined as the dot product of force and displacement. Therefore, it has the unit of $N\cdot m$, more commonly called joules ($J$). These are both vector quantities, but work itself is a
                scalar quantity. However, it's still important to realize that while work doesn't have a range of directions, it can still
                be either positive or negative. Thus, work can "cancel out" in a way, much like vectors can, but it is unltimately always going
                to be a scalar quantity. Here's a mathematical description of what I just said:
                <br><br>
                $$W = \vec{F} \cdot \vec{x}$$
                <br><br>
                <span v-show="level==2">
                    Now, this formula is only true if the force is constant. If we have a varying force (which we often do in
                    more complex, more realistic scenarios) we need to write this as a differential equation:
                    <br><br>
                    $$dW = \vec{F} \cdot d\vec{x}$$
                    <br><br>
                    This will come in handy, trust me.
                    <br><br>
                </span>
                <figure>
                    <img src="/src/assets/energy/Figure 50.png" width="750px" />
                    <figcaption>Figure 1: Work in daily life versus work in physics. </figcaption>
                    </figure>
                <br><br>
                This formula tells us a lot of things, but most of those I've already mentioned or are pretty obvious. However, it is
                important to note that work can either be calculated for a single force or a net force. You can have work done by any particular
                force even if it is not the net force, but the net work done (by the net force, evidently) is usually more important when
                it comes to analysis.
                <br><br>
                Do you understand now why I said typing on your keyboard does very little work? When you press on the keys,
                you cause them to displace downwards a very small amount, meaning the displacement vector and therefore the work
                done is very small. (You also don't press down on the keys very hard, so the force is small too.)
                <br><br>
                </span>
                <span v-show="level==0">
                    The definition of work takes into account the dot product from earlier. In particular, it is the dot product of
                    force and displacement (which are both vectors, but work is a scalar!). The quantity of work has the new unit of joules ($J$), which is 
                    equivalent to a newton-meter. This is a pretty simple definition, and it
                    leads to a pretty simple formula:
                    <br><br>
                    $$W = \vec{F} \cdot \vec{x}$$
                    <br><br>
                    <figure>
                    <img src="/src/assets/energy/Figure 50.png" width="750px" />
                    <figcaption>Figure 1: Work in daily life versus work in physics. </figcaption>
                    </figure>
                    Basically, the work is both dependent on the displacement of an object as well as the force exerted on it. This formula
                    calculates the work done by a single force. Let's try an example, hearkening back to the beginning of this lesson, where I stated
                    that the work done by typing on a keyboard is very little. (You should be able to understand why - the force you press on the keyboard
                    is small, as is the displacement of the keys!)
                </span>
                <div class="problem">
                    What work is done by pressing on a keyboard key? Assume the key compresses down a distance of $x = 1.5 ~\textrm{mm}$ and the force you exert on it
                    is $F = 0.5 ~\textrm{N}$ directly downwards?
                    <br><br>
                    <figure>
                    <img src="/src/assets/energy/sheldoncomputer.png" width="500px" />
                    <figcaption>Figure 2: An accurate representation of the scenario. </figcaption>
                    </figure>
                    <br><br>
                    This is a pretty simple calculation. Now we do have to consider that these two are vectors and the dot product is required, but since
                    both vectors point straight downwards the angle between them is zero and thus you just multiply their magnitudes. A common mistake is to forget
                    to convert millimeters to meters.
                    <br><br>
                    $$W = \vec{F} \cdot \vec{x} = 0.0015(0.5) = \bbox[3px,
                        border: 0.5px solid
                        white]{7.5 \times 10^{-4} ~\textrm{J}}$$
                </div>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div> 
            <div v-show="page===1">
                Technically, we have already covered the definition of work in detail. However, in practice just Knowing
                the definition isn't all too helpful in the beginning, and examples are required in order to demonstrate
                exactly how work is calculated with this definition.
            </div>   
        </p>
    </div>

</template>


<style scoped>

</style>