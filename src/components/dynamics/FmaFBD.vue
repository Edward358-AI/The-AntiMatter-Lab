<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>F=ma and Free-body Diagrams</h1><br>
        <p>
            <div v-show="page === 0">
            <p>
                Newton’s Second Law is the most important and most difficult of all his laws to master. To learn how to
                use
                force analysis to get quantitative results, we first need to understand what a net force is. The net
                force
                is simply the vector sum of all the forces acting on an object, written as $F_{net}~\textrm{or}~\Sigma
                F$,
                where $\Sigma$ indicates summation. However, it is usually more useful to have two net forces directed
                along
                two axes.<br><br>
                To represent forces on an object, we will use the free-body diagram (FBD). To construct an FBD, we
                consider
                the object as a point and draw the forces acting on it with their tails on the point. For instance,
                consider
                the case of a book on a table. Remember that forces are vectors, so their magnitude and direction matters! A free-body diagram is essentially just a diagram of a singular body, or system, and all the <i>EXTERNAL</i> forces.<br>Here is an example:
                <figure>
                    <img src="/src/assets/dynamics/Figure 32.png" width="250px" />
                    <figcaption>Figure 1: An incomplete (unlabeled) free-body diagram.</figcaption>
                </figure>
                Using the forces you know from the previous lesson, see if you can try and work out what to label. for the diagram.<br>
                Did you get it? The force down should be gravity, but the book is not moving, so there is an upward force, and that is the normal force from the table!
                <figure>
                    <img src="/src/assets/dynamics/FIgure 35.png" width="500px" />
                    <figcaption>Figure 1: A complete free-body diagram.</figcaption>
                </figure>
                There are a few things regarding this image that we will explain.<br>Now seeing after how to NOT draw an FBD, we will give you a (mostly) foolproof recipe on how to build a correct FBD that will help you solve even the most difficult of problems!
                <ul>
                    <li>First, we want to define a body or system and a reference frame to work in. Essentially, this part is isolating the body and determining what coordinate axes we want to use. For example, on a slope, we might want to use an axes parallel to the slope. You can typically use any axes, but generally go for the ones that most of the forces are aligned on or one that pertains specifically to the question.</li>
                    <li>Next, have a list of all the forces you will need to draw. You can simply go off this list and draw the forces if they exist. Gravity, friction, the normal force, drag (usually air drag), tension, and all other forces. A good rule of thumb is that if the force is not explicitly stated to exist in this scenario, assume it exists. For example, if a problem says "a wall", assume there is friction on the wall. Another key thing is to note that there are specific key words that implies something, like "a smooth wall" implies frictionless, and "from rest" means $v_0=0$. Recognizing these terms are important for doing physics problems correctly!</li>
                    <li>The final step is to draw those forces. Start by representing the body or system as a dot. Draw all the forces from the dot, taking in account their directions (forces are vectors!), and try to keep the sizes are relative as well (if the force has twice the magnitude of another make it twice as long as that one). Remember to also draw the correct orientations for your coordinate axes as well. When you're finished, your drawing should look like the one above.</li>
                </ul>
                Thus, by utilizing this knowledge, let's work through an example on the next page.
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page ===1">
            <p>
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
        </p>
    </div>

</template>


<style scoped></style>