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
            <br><br>
            First, a few general assumptions that are true of all springs. All springs have some "natural length" when they are not stretched 
            or compressed. They also always exert a force that is opposite to the direction they're displaced. While it is possible to bend a spring, 
            in physics this rarely happens and the intended use of the spring is usually to compress or stretch it. We will only be dealing with these 
            two cases. In our cases, they are also always massless.
            <br><br>
            <span v-show="level>0">
                The most common type of spring you'll see is a Hookean spring, named after English polymath Robert Hooke. It involves a spring 
                that exerts a force that linearly increases with the displacement of the spring from its equilibrium position. The formula for such a spring
                takes the form:
                <br><br>
                $$\vec{F_s} = -k \Delta \vec{x} $$
                <br><br>
                This does share the same notation with static friction, so we need to be careful to distinguish them. The first thing you might 
                notice is the negative sign. This actually just denotes the direction of the spring force, which is oppositely directed to the 
                displacement from the natural length. This kind of force is called a <b>restoring force</b> and acts to attempt to return 
                a system to equilibrium. The constant $k$ is called the spring constant (units $N/m$) which describes how strong the 
                spring is.
                <br><br>
                Much like a string, a spring will exert an equal force from both ends when pulled on. It actually exerts this same force
                across its entire length, a result we'll use later on to deduce what happens if you put multiple springs together.
                <br><br>
                <figure>
                <img src="/src/assets/dynamics/spring1.png" width="750px" />
                <figcaption>Figure 1: A spring exerting an equal force from each end when stretched or compressed.</figcaption>
                </figure>
                <br><br>
                The spring is quite ubiquitous, as it can be oriented any number of ways and varied in number or strength in order 
                to create a great variety of problems. Indeed, there are many basic dynamics and force analysis scenarios that can be modified just by including a spring.
            </span>
            <span v-show="level==0">
                The spring we're going to talk about most often is one that's called Hookean, meaning that the force it exerts
                increases linearly with the stretch of the spring. This means the formula for such a spring is:
                <br><br>
                $$\vec{F_s} = -k \Delta \vec{x} $$
                <br><br>
                The negative sign means that the force exerted will be in the opposite direction of the displacement from the spring's 
                natural length, meaning that it tends to seek equilibrium. Most springs can either be compressed or stretched, so make sure 
                to keep this in mind when figuring out the direction of the spring force.
                <br><br>
                Much like strings and tension, the spring exerts an equal spring force on both ends and at each point across the spring's length. This concept 
                is used to determine how to deal with a combination of many springs.
                Analysis can lead to some complex results, but with proper reasoning it's not too difficult to understand how to get there.
                <br><br>
                <figure>
                <img src="/src/assets/dynamics/spring1.png" width="750px" />
                <figcaption>Figure 1: A spring exerting an equal force from each end when stretched or compressed.</figcaption>
                </figure>
                <br><br>
                Now, the idea of springs might seem like a random addition, but I'm going to change that by tying it back to something
                we've learned all about in a previous lesson. By adding a spring to an inclined plane, we can make the problem 
                more interesting.
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