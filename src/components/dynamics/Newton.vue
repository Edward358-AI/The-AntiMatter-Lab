<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Newton's Laws</h1><br>
        <div v-show="page === 0">
            <p>
                This is the start of probably the most important and difficult unit to master in all of physics. First,
                introductions: Isaac Newton is a name well known in physics and mathematics for his breakthroughs and
                innovations in both fields. In this section, we will begin our study of dynamics starting with his three
                laws of motion. It is good to first define what forces are: a push or pull that may result in motion.
                However, you will see later that a force may not necessarily directly <i>cause</i> motion, but rather it
                directly <i>changes</i> motion, which is an important concept to recognize. The unit of force is the
                newton, represented by $\textrm N$. This actually a derived unit, with units $\frac{\textrm{kg} \cdot
                \textrm m}{\textrm{s}^2}$. We will show how this is derived later on. Force is a vector quantity,
                meaning it has a direction and magnitude. This will become especially important more later on, when we
                introduce the idea of a free-body diagram.
            <figure>
                <img src="/src/assets/dynamics/Figure 13.png" width="200px" />
                <figcaption>Figure 1: A force vector acting on a box.</figcaption>
            </figure>
            Thus, we begin the lesson by introducing Newton's Laws. Let's go to it!
            </p>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                Newton’s first law has to do with the idea of motion.<br><br>
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;"><strong>Newton’s First Law (Law of Inertia):</strong> <i>An object tends to remain in its state of motion.</i></div><br>
                Let’s break this down into pieces. "State of motion" refers to whether an object is moving and how it is moving. So,
                this law dictates that objects at rest will remain at rest, and objects in motion will remain in motion
                (in a straight line, since changing direction changes the velocity of an object). However, there is one small quirk that is not mentioned here. This only holds true when the <i>net</i>, total, or sum of all the external forces acting on an object is zero.<br><br>Looking at a real world example, the reason we see objects slow down as they move across surfaces is due to the frictional
                force. A good way to demonstrate this principle is to use a near-frictionless surface like ice. An
                object set into motion on ice will move in a straight line at basically constant velocity until it hits
                something.<br><br>
                The resistance an object offers to being set into motion or being set to rest is its inertia, and it is
                directly proportional to its mass. There is no numerical quantity corresponding to this, but just know
                that more massive objects have greater inertia. Often times, an object's mass is called its <i>inertial mass</i>.
                <br>
                This law is not used in calculations, but it justifies the entirety of force analysis and gives us an
                idea as to what forces do.<br><br>
                Another important idea to mention here is that Newton's First Law also implies something very, very important about physics that is not mentioned. All these things that Newton stated are <i>only</i> valid in an inertial reference frame. 
                <span v-show="level == 0">
                </span>
                <span v-show="level > 0">
                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
    </div>

</template>


<style scoped></style>