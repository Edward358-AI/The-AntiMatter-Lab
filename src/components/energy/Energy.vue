<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Definition of Energy and Energy Conservation</h1><br>
        <p>
            <div v-show="page===0">
                Here's a question for the ages: what is energy? We use the term all the time in our
                daily lives, yet if I asked you to give a concrete definition of what energy was I doubt you would 
                be able to do it. It's obviously something that exists, but is hard to define concisely and isn't tangible.
                 Therefore, I'll
                leave you to seek your own idea of energy.
                <br><br>
                In physics, energy is a scalar quantity that has the unit of joules. (This is the same as work for a reason, as we'll
                see later!) This does <b>not</b> indicate that energy is never negative, though we rarely think of it that way. Yes, for the
                vasy majority of cases energy will be positive, but there are some important cases where energy is more easily thought of as a 
                negative quantity.
                <br><br>
                There are many different types of energy. The first important type is kinetic energy, which is the energy that moving objects have.
                It is defined quite simply as:
                <br><br>
                $$K = \dfrac12 mv^2$$
                <br>
                <span v-show="level>0">
                    Now, recall that the velocity of any object is frame-dependent. This means that for different observers in 
                    different reference frames, the kinetic energy of an object will vary. In other words, the kinetic energy is a 
                    <b>frame-dependent quantity</b>. This kind of leads into the idea that energy is relative, but the nuances of this 
                    result aren't important at our level.
                    <br><br>
                </span>
                The formula makes a lot of sense. An object that moves faster evidently has more energy, and more massive objects also 
                intutively have more energy than smaller ones. It is important to note that this energy scales with the <b>square</b> of the 
                speed of an object, which explains why vehicle collisions become much more deadly as speeds get higher.
                <br><br>
                With this, we can present the <b>work-energy theorem</b>:
                <br><br>
                <figure>
                    The work done on an object is equivalent to its change in kinetic energy.
                    <br>
                    $$W = \Delta K$$
                </figure>
                <br>
                <span v-show="level>0">
                    With that, let's see how this new theorem compares to using our previously-used force-analysis 
                    methods.
                    <br><br>
                    <div class="problem">
                        A box of mass $m = 4.0~\textrm{kg}$is pushed from rest horizontally with a force $F = 50 ~\textrm{N}$ on a horizontal, frictionless surface 
                        over a distance of 10 meters. What is its velocity at the end of the ten meters? Use both the method of 
                        forces and the work-energy theorem.
                        <br><br>
                        For our method of force analysis, we can recognize that forces are balanced vertically, while $F$ is the only 
                        force acting in the x-direction. This tells us that it must cause some acceleration.
                        <br><br>
                        $$F = ma$$
                        $$a = \dfrac{F}{m} = 12.5 ~\textrm{m/s}^2$$
                        <br>
                        This simplifies the problem down into a kinematics one, and we can one of our key kinematics formulas to derive 
                        the velocity at the end of 10 meters. Since the initial velocity is zero, we can drop one of the terms.
                        <br><br>
                        $$ v^2 = 2ax$$
                        $$v = \bbox[3px,
                    border: 0.5px solid
                    white]{15.8 ~\textrm{m/s}}$$
                        <br>
                        Now, we want to do the same problem using the newfound technique of the work-energy theorem. The work in 
                        this case is equal to the force times the displacement since they are parallel.
                        <br><br>
                        $$W = F \cdot x = 500 \textrm{J}$$ 
                        <br>
                        This is equal to $\Delta K$, so we can write:
                        <br><br>
                        $$ W = \dfrac12 mv^2$$
                        $$ v = \sqrt{\dfrac{2W}{m}} = \bbox[3px,
                    border: 0.5px solid
                    white]{15.8 ~\textrm{m/s}}$$
                    <br>
                    Both methods yield the same answer, as they should. What nice and well-behaved formulas.
                    </div>
                    <br><br>
                </span>
                Currently, this is actually a flawed and incomplete view of work and energy. Like I said, there are a multitude of 
                different types of energy, most of which are important to a complete understanding of the topic. We need to introduce more types 
                of energy to widen the picture.
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
            The next type of energy that is important is <b>potential energy</b>.  Like the name suggests, it is energy that has 
            the potential to turn into another type of energy, usually kinetic. It arises due to the configuration of the system. I know 
            that wording sounds vague and weird, but it'll make sense soon. Generally, it is referred to as $U$.
            <br><br>
            There are actually many subcategories of potential energy, each denoted with a subscript. The first is <b>gravitational potential energy</b>, which arises from 
            positioning of an object relative to the Earth. Essentially, the higher up an object is, the more gravitational potential 
            energy it will have. However, since there is not a clearly defined "zero potential energy" point (you might be tempted to think the ground 
            has zero potential energy, but terrain exists!), we can actually define any
            point we want to have zero gravitational potential energy. We usually just pick the most convenient point.
            <br><br>
            <figure>
                <img src="/src/assets/energy/Figure 53.png" width="750px" />
                <figcaption>Figure 1: Purple Guy has more gravitational potential energy than the red guy lying down.</figcaption>
            </figure>
            <br><br>
            The exact formula for gravitational potential energy is:
            <br><br>
            $$U_g = mgh$$
            <br>
            Again, $h$ is measured vertically from a zero potential energy point of your choosing. <span v-show="level>0">
                Selecting this point is a good test of your problem-solving techniques. If you select the proper 
                point, you can end up saving yourself a lot of work and simplify the problem significantly. Most of the 
                time where to put this is obvious, but for problems that involve pulleys it is not immediately obvious.
            </span>
            It is also possible for this energy to be negative, if your position is below that of the defined zero.
            <br><br>
            <span v-show="level==0">
                With that, let's test your conceptual understanding of the concept of gravitational potential energy.
                <br><br>
                <div class="problem">
                    For each of the scenarios described below, what is the change in potential energy of the object?
                    <br><br>
                    A box is raised via a rope elevator from the first floor to the seventh floor of a building.
                    <div v-show="showAnswer">
                        <button class="btn btn-outline-primary" @click="showAnswer=!showAnswer">{{ !showAnswer ? "Show" : "Hide" }} Answer</button>
                    </div>
                </div>
            </span>
            <span v-show="level>0">
                It's more common to deal with the change in gravitational potential energy $\Delta U_g$. 
                <br><br>
                The other type of potential energy I should mention for this unit is the <b>spring potential energy</b>, the potential 
                energy stored in a compressed or stretched spring.
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