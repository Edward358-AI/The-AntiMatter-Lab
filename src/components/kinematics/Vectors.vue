<script setup>
defineProps(["level"])
</script>


<template>
    <div class="container-fluid p-5 mw-1120">
        <h1>Vectors</h1><br>
        <p>
            <span v-show="level === 0">Maybe you’ve heard somewhere that physics is heavily math based. And yes, while
                that is true, a basic understanding of simple mathematics is sufficient to learn physics conceptually.
                It’s simply that most places don’t teach good conceptual physics anymore. The first thing we must
                recognize when we learn physics is the vector. The vector looks like an arrow, but it doesn’t tell you
                where to go! There are two important things to recognize about a vector: the length (we call
                "magnitude") and its direction. Remember those two things, and you will be pretty much set for the rest
                of physics.</span>

            <span v-show="level > 0">As you probably realize, all physics is based on math, which is why we start with a
                lesson in math. Scalar quantities, which are the quantities most are familiar with from math courses,
                are prevalent in physics. These have a magnitude, which is the value of the quantity. However, in the
                real world (which is the realm physics operates in), we realize that something called "direction"
                exists. This is why we define vector quantities. They are quantities that have both magnitude and
                direction. Graphically, the direction is the direction in which the arrow representative of the vector
                points, and the magnitude is the length of the arrow.</span>

        <figure>
            <img src="/src/assets/kinematics/Figure 1.png" style="width:170px;" />
            <figcaption><i>Figure 1: A representation of a vector.</i></figcaption>
        </figure>
            <span v-show="level === 0">
                It is important to note that the position of the vector on the coordinate grid does
                NOT actually matter, so we can move them around the grid to make things more convenient. As long as we maintain the direction and magnitude, we are all good.<br>Vectors are named
                with a single letter, much like variables. A vector is typically seen and
                defined by a letter with an arrowhead across its top, like so: 𝑎⃗ 
                <br>In typed text, it is typically represented with a bold letter like this: $\textit{\textbf{a}}$<br>
                Now you're probably thinking, can you perform basic operations on vectors? Well, you can! However, it isn't as simple as $1+1=2$. There are two primary methods to adding vectors, one being algebraically and the other being graphically. We will focus on the latter since we aren't doing the algebra-based version.<br>
                Now, graphically, there are two main methods. Remember when we said the position of the vector doesn't matter? This will come in handy here. The tip to tail method involves placing the “tail” (the end without an
                arrow) of one vector to the “tip” (the arrowhead) of another, and drawing the resultant (final) vector from the
                starting point to the ending point. Perhaps a diagram will be more enlightening...
            </span>
            <span v-show="level > 0">
                It is important to note that the position of the vector on the coordinate grid does
                NOT actually matter, so we can move them around the grid to make things more convenient. As long as we maintain the direction and magnitude, we are all good.<br>On paper, vectors are named
                with a single letter, much like variables. While scalars are defined just by a single letter (like $a$), a vector is
                defined by a letter with an arrowhead across its top, like so: 𝑎⃗ 
                <br>In typed text, it is typically represented with a bold letter like this: $\textit{\textbf{a}}$
                <br>While scalar quantities can be added linearly, vector quantities require a bit more work to
                manipulate. You can either add them graphically or algebraically.<br>
                Graphically, there are two main methods. We will utilize the ability to reposition vectors anywhere on
                the coordinate grid for this. The tip to tail method involves placing the “tail” (the end without an
                arrow) of one vector to the “tip” (the arrowhead) of another, and drawing the resultant vector from the
                tail of the latter to the tip of the former. Perhaps a diagram will be more enlightening.
            </span>
            <figure>
                <img src="/src/assets/kinematics/Figure 2.png" style="width:170px;" />
                <figcaption><i>Figure 2: Tip-to-tail method </i></figcaption>
            </figure>
        </p>
    </div>
</template>


<style scoped></style>