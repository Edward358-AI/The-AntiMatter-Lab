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
                This does share the same notation with static friction, so we need to be careful to distinguish them. The relationships has been bestowed the name 
                of <b>Hooke's Law</b>. The first thing you might 
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
                This is called <b>Hooke's Law</b>. The negative sign means that the force exerted will be in the opposite direction of the displacement from the spring's 
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
        <div v-show="page === 1">
            <div class="problem">
                <span v-show="level>0">
                    Mr. Greenfin has the bright idea to hang a 10 kg slab of salami from the tip of his house's roof, using a spring of negligible
                    natural length as a
                    support. His roof can be modelled as an inclined plane with incline angle 15° and a length of 2.5 meters (as measured along the 
                    inclined surface). What is the 
                    weakest spring that Mr. Greenfin can use such that the salami doesn't fall off the side of the roof? Assume 
                    there is no friction.
                    <br><br>
                <figure>
                <img src="/src/assets/dynamics/springincline.png" width="750px" />
                <figcaption>Figure 2: Mr. Greenfin's devious plan.</figcaption>
                </figure>
                    <br><br>
                    Now, this problem is just another inclined plane problem. The spring force is merely an addition to the 
                    already-existing forces of the inclined plane problem. Now, we know that the condition is that equilibrium is 
                    achieved just as the salami is about to fall off, meaning the spring stretched $x = 2.5 ~\textrm{m}$.
                    <br><br>
                    We can now do simple force analysis. For the y-direction, it is just like any other inclined plane problem, so we'll 
                    skip over this part. Besides, we're interested in the spring and it only acts in the x-direction. The x-direction equation
                    can be written as such:
                    <br><br>
                    $$mg \sin \theta = F_s$$
                    $$mg \sin \theta = k x$$
                    <br>
                    Now, we can simply solve for $k$ here.
                    <br><br>
                    $$k = \dfrac{mg \sin \theta}{x} = \bbox[3px,
                    border: 0.5px solid
                    white]{25.5 ~\textrm{N/m} }$$
                    <br>
                    This is a pretty small minimum value! Most springs have a spring constant strength in the realm of $100 ~\textrm{N/m}$ to $1000 ~\textrm{N/m}$. Mr. Greenfin
                    really didn't set his sights high on this one...
                </span>
                <span v-show="level==0">
                     Mr. Greenfin wants to hang a slab of salami of mass $m$ off the tip of his roof, for reasons he refuses to 
                     disclose. He uses a spring to keep the salami from falling off the roof, which is frictionless. The roof can be 
                     considered as an inclined plane with an incline angle of $\theta$ and a length as measured along the diagonal. What is the weakest spring he can use? Assume the spring's natural length is very short.
                     <br><br>
                <figure>
                <img src="/src/assets/dynamics/springincline.png" width="750px" />
                <figcaption>Figure 2: Mr. Greenfin's devious plan.</figcaption>
                </figure>
                <br><br>
                Since this is just an inclined plane with a spring throwin in, we can do simple force analysis. The maximum stretch of the spring is $L$, since if it stretches more than that
                the salami will fall off. For the y-direction, it is just like any other inclined plane problem, so we'll 
                    skip over this part. Besides, we're interested in the spring and it only acts in the x-direction. The x-direction equation
                    can be written as such:
                    <br><br>
                    $$mg \sin \theta = F_s$$
                    $$mg \sin \theta = k x$$
                    <br><br>
                    Now, you might be wondering why I didn't have the negative sign that's present in Hooke's law. This is because the negative sign is 
                    only telling us direction, and we have already accounted for direction with our expression (the spring force is in the opposite direction 
                    as the component of gravity down the incline). Doing some algebra allows us to arrive at the answer relatively simply:
                    <br><br>
                    $$k = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{mg \sin \theta}{x}}$$
                    <br>
                    This problem was much harder than the ones at this level before! I wanted to give you a taste of what actual, quantitative force analysis feels like,
                    just to see if you'd be comfortable doing it. Besides, there's not much to do conceptually with this problem. If you felt comfortable doing this, I 
                    reccomend moving up to our Algebra-Based level, as this analysis was very similar to the things happening at that level on a regular 
                    basis.
                </span>
            </div>
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