<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Rotational Kinematics</h1><br>
        <p>
            <div v-show="page===0">
                This unit might feel familiar, and that's because it will be! We are essentially taking in all the concepts we've covered previously 
                and turning them into their <b>angular</b> (rotational) analogues. We've mostly dealt with linear motion before, but this unit is 
                dedicated to things that rotate.
                <br><br>
                First, there's one important term that needs to be defined. The idea of a <b>rigid body</b> is one that rotates evenly. While a rigid body that 
                rotates is moving with a different speed at each point on the object, the shape of the object needs to be preserved for it to be a rigid body.
                This rotation unit only deals with rigid bodies, and the results we'll find don't really apply to non-rigid bodies.
                <br><br>
                With that said, we can jump into rotational kinematics. This is just like regular kinematics, but for rotating objects. At the beginning 
                of this course, we talked about position, velocity, and acceleration. Now, we have angular counterparts to those, being angular position $\theta$, 
                angular velocity $\omega$ (lowercase omega), and angular acceleration $\alpha$ (lowercase alpha). A lot of quantities in this unit will use 
                Greek letters.
                <br><br>
                <figure>
                    <img src="/src/assets/rotation/Figure 77.png" width="500px"/>
                    <figcaption>A representation of angular position and angular velocity.</figcaption>
                </figure>
                <br>
                Angular position is basically the angle we're used to, but it doesn't reset after a full revolution! You just keep counting. Angular 
                velocity describes how fast something is spinning, and angular acceleration describes how angular velocity changes. They are 
                all vector quantities. <span v-show="level>0">
                    You might be wondering how directions for these are defined for a circle, which is curved. Well, my answer is clockwise versus counterclockwise for now, but there are 
                    actually concrete, linear directions for all of these quantities. But more on that later.
                </span>
                <span v-show="level==0">At this level, it's good enough to know that the directions of the quantities are either clockwise or counterclockwise.</span>
                In any case, we usually treat any counterclockwise rotation as "positive" and counterclockwise as "negative".
                <br><br>
                The definitions of these rotational kinematics quantities are virtually identical to those of regular kinematics. I'll put them here for you to see:
                <br><br>
                $$ \omega = \dfrac{\Delta \theta}{t} $$
                $$ \alpha = \dfrac{\Delta \omega}{t} $$
                <br>
                <span v-show="level==2">
                    Of course, we can't forget about the calculus definitions here! They're just as you would probably expect.
                    <br><br>
                    $$ \omega =\dfrac{d\theta}{dt} $$
                    $$ \alpha = \dfrac{d\omega}{dt} = \dfrac{d^2\theta}{dt^2}$$
                    <br>
                </span>
                Do you see how similar this is to regular kinematics? It'll be no surprise, then, that the essential equations behind rotational kinematics 
                are analogous in form to the kinematics equations we've learned previously! Here they are in their not-so-new forms for angular quantities:
                <br><br>
                $$\underline{\textrm{\#1:}~~\omega_f=\omega_0+\alpha t}$$ 
                $$\underline{\textrm{\#2:}~~\theta=\omega_0t+\frac12 \alpha t^2}$$
                $$\underline{\textrm{\#3:}~~{\omega_f}^2-{\omega_0}^2 = 2\alpha \theta} $$
                <span v-show="level>0">
                $$\underline{\textrm{\#4:}~~ \theta = \dfrac{\omega_0+\omega_f}{2} \cdot t} $$
                $$\underline{\textrm{\#5:}~~\theta=\omega_f t-\frac12 \alpha t^2}$$
                </span>
                <br>
                These equations are all you need! As long as you recognize what's being asked of you, this is really just kinematics all over 
                again. I promise you, there are no tricks here. It's really as simple as that, but this unit is required just like kinematics so 
                we can talk about more complex things later.
                <br><br>
                With that, let's work through a few problems on the next page. Just apply these formulas, and you'll be fine!
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
                <span v-show="level>0">
                    
                </span>
            </div>
        </p>
    </div>
</template>

<style scoped>

</style>