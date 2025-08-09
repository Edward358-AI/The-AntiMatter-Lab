<script setup>
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Vectors

watch(page, () => window.scrollTo(0,0))

const results = reactive([[0, 0, 0, 0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false, false, false, false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
        {
                number: 0,
                question: "What is the correct way to denote a vector with the letter $a$?",
                answers: [
                    ["$\\vec{a}$", 1, false],
                    ["$\\Delta a$", 0, false],
                    ["$\\bar{a}$", 0, false],
                    ["$\\overleftrightarrow{a}$", 0, false]
                ],
                explain: "As mentioned in the lesson, the typical way to denote vectors is using $\\vec{a}$, a little arrow over the letter, or bolded like $\\vectorbold{a}$. You might also see $\\hat{a}$ being used sometimes, but for our purposes we are concerned with $\\vec{a}$."
            }, 
            {
                number: 1,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            },
            {
                number: 2,
                question: "What is the result in component form of adding these two vectors, $\\vec{a}= \\langle 4,6 \\rangle$ and $\\vec{b}= \\langle 11, 2 \\rangle$?",
                answers: [
                    ["$\\langle 15, 4 \\rangle$", 0, false],
                    ["$\\langle 7, 8 \\rangle$", 0, false],
                    ["$\\langle 14, 6 \\rangle$", 0, false],
                    ["$\\langle 15, 8 \\rangle$", 1, false]
                ],
                explain: "$\\vec{a} + \\vec{b} = \\langle 4,6 \\rangle + \\langle 11, 2 \\rangle$ $ = \\langle 4+11, 6+2 \\rangle = \\langle 15, 8 \\rangle$"
            },
            {
                number: 3,
                question: "What is the name of the method of adding two vectors graphically?",
                answers: [
                    ["End-to-tail", 0, false],
                    ["Tail-to-end", 0, false],
                    ["Tip-to-tail", 1, false],
                    ["Start-to-end", 0, false]
                ],
                explain: "Recall from the lesson that the way to properly add vectors graphically is using the <i>tip-to-tail</i> method."
            }
            
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the correct way to denote a vector with the letter $a$?",
                answers: [
                    ["$\\vec{a}$", 1, false],
                    ["$\\Delta a$", 0, false],
                    ["$\\bar{a}$", 0, false],
                    ["$\\overleftrightarrow{a}$", 0, false]
                ],
                explain: "As mentioned in the lesson, the typical way to denote vectors is using $\\vec{a}$, a little arrow over the letter, or bolded like $\\vectorbold{a}$. You might also see $\\hat{a}$ being used sometimes, but for our purposes we are concerned with $\\vec{a}$."
            }, 
            {
                number: 1,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            },
            {
                number: 2,
                question: "<img style='max-width: 170px;' src='/kinematics/Problem1.png' class='rounded'><br>What is the component form of a vector with magnitude $7$ and argument (angle) of $60 \\degree$ with respect positive x-axis?",
                answers: [
                    ["$\\langle 7, 0 \\rangle$", 0, false],
                    ["$\\langle 0, 7 \\rangle$", 0, false],
                    ["$\\langle \\frac{7}{2}, \\frac{7}{2} \\sqrt{3} \\rangle$", 1, false],
                    ["$\\langle \\frac{7}{2} \\sqrt{3}, \\frac{7}{2} \\rangle$", 0, false]
                ],
                explain: "Remember that the component form of a vector, given its angle and magnitude, is going to be $\\langle |\\vec{a}|\\cos(\\theta),|\\vec{a}|\\sin(\\theta) \\rangle$. Thus we get that the component form of this vector is $\\langle 7\\cos(60\\degree),7\\sin(60\\degree) \\rangle$ $=\\langle 7\\cdot \\frac{1}{2},7 \\cdot \\frac{\\sqrt{3}}{2} \\rangle$, which would simplify to answer choice 3."
            },
            {
                number: 3,
                question: "<img style='max-width: 170px;' src='/kinematics/Problem2.png' class='rounded'><br>What is the magnitude of the resultant vector of adding the 2 blue vectors as depicted?",
                answers: [
                    ["$8.2~\\textrm{m}$", 1, false],
                    ["$8.0~\\textrm{m}$", 0, false],
                    ["$7.8~\\textrm{m}$", 0, false],
                    ["$8.5~\\textrm{m}$", 0, false]
                ],
                explain: "First, begin by converting the following vectors to component form. The first one is $\\langle 0,6 \\rangle$ and the second is $\\langle 8 \\cos(20 \\degree), -8 \\sin(20\\degree) \\rangle$ $\\approx \\langle 7.52,-2.74 \\rangle $. Then, it's as simple as adding these components together to create the components of the resultant vector: $\\langle 0+7.52,6-2.74 \\rangle$ $\\approx \\langle 7.52,3.26 \\rangle $. Then use Pythagorean Theorem to get the magnitude, which should be about $8.2~\\textrm{m}$."
            },
            {
                number: 4,
                question: "Continuing from the previous problem, what is the angle the resultant vector makes with the horizontal? (denoted by $\\theta$)",
                answers: [
                    ["$19.9 \\degree$", 0, false],
                    ["$20.1 \\degree$", 0, false],
                    ["$23.5 \\degree$", 1, false],
                    ["$21.2 \\degree$", 0, false]
                ],
                explain: "If you see the explanation for the previous question, you'll see how we got the component form of the resultant vector. To calculate the angle $\\theta$ as depicted in the image, we can take the arctangent of the vertical component over the horizontal one to get the angle: $\\arctan(\\frac{3.26}{7.52})\\approx 23.5\\degree$ (because the components and the vector form a right triangle)"
            },
            {
                number: 5,
                question: "<img style='max-width: 200px;' src='/kinematics/Problem3.png' class='rounded'><br>Find the magnitude of the resultant vector of adding these three vectors together.",
                answers: [
                    ["$8.1~\\textrm{N}$", 0, false],
                    ["$7.9~\\textrm{N}$", 0, false],
                    ["$7.5~\\textrm{N}$", 0, false],
                    ["$7.2~\\textrm{N}$", 1, false]
                ],
                explain: "Recall from the lesson that we can actually move vectors around, so we can rearrange all three vectors using the tip-to-tail method:<br><img style='max-width: 140px;' src='/kinematics/Solution1.png' class='rounded'><br>*Image may not be to scale.<br>We can now do the same method by converting all of the vectors to component form and adding their components: $\\langle -9,0 \\rangle + \\langle 11 \\cos(70 \\degree), 11 \\sin(70 \\degree) \\rangle $ $+ \\langle 8 \\cos(25\\degree), 8 \\sin(25 \\degree) \\rangle$ $\\approx \\langle 2.01, 6.96 \\rangle$. Now, using Pythagorean theorem with the components gives us the magnitude to be roughly $7.2~\\textrm{N}$."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the correct way to denote a vector with the letter $a$?",
                answers: [
                    ["$\\vec{a}$", 1, false],
                    ["$\\Delta a$", 0, false],
                    ["$\\bar{a}$", 0, false],
                    ["$\\overleftrightarrow{a}$", 0, false]
                ],
                explain: "As mentioned in the lesson, the typical way to denote vectors is using $\\vec{a}$, a little arrow over the letter, or bolded like $\\vectorbold{a}$. You might also see $\\hat{a}$ being used sometimes, but for our purposes we are concerned with $\\vec{a}$."
            }, 
            {
                number: 1,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            },
            {
                number: 2,
                question: "<img style='max-width: 170px;' src='/kinematics/Problem1.png' class='rounded'><br>What is the component form of a vector with magnitude $7$ and argument (angle) of $60 \\degree$ with respect positive x-axis?",
                answers: [
                    ["$\\langle 7, 0 \\rangle$", 0, false],
                    ["$\\langle 0, 7 \\rangle$", 0, false],
                    ["$\\langle \\frac{7}{2}, \\frac{7}{2} \\sqrt{3} \\rangle$", 1, false],
                    ["$\\langle \\frac{7}{2} \\sqrt{3}, \\frac{7}{2} \\rangle$", 0, false]
                ],
                explain: "Remember that the component form of a vector, given its angle and magnitude, is going to be $\\langle |\\vec{a}|\\cos(\\theta),|\\vec{a}|\\sin(\\theta) \\rangle$. Thus we get that the component form of this vector is $\\langle 7\\cos(60\\degree),7\\sin(60\\degree) \\rangle$ $=\\langle 7\\cdot \\frac{1}{2},7 \\cdot \\frac{\\sqrt{3}}{2} \\rangle$, which would simplify to answer choice 3."
            },
            {
                number: 3,
                question: "<img style='max-width: 170px;' src='/kinematics/Problem2.png' class='rounded'><br>What is the magnitude of the resultant vector of adding the 2 blue vectors as depicted?",
                answers: [
                    ["$8.2~\\textrm{m}$", 1, false],
                    ["$8.0~\\textrm{m}$", 0, false],
                    ["$7.8~\\textrm{m}$", 0, false],
                    ["$8.5~\\textrm{m}$", 0, false]
                ],
                explain: "First, begin by converting the following vectors to component form. The first one is $\\langle 0,6 \\rangle$ and the second is $\\langle 8 \\cos(20 \\degree), -8 \\sin(20\\degree) \\rangle$ $\\approx \\langle 7.52,-2.74 \\rangle $. Then, it's as simple as adding these components together to create the components of the resultant vector: $\\langle 0+7.52,6-2.74 \\rangle$ $\\approx \\langle 7.52,3.26 \\rangle $. Then use Pythagorean Theorem to get the magnitude, which should be about $8.2~\\textrm{m}$."
            },
            {
                number: 4,
                question: "Continuing from the previous problem, what is the angle the resultant vector makes with the horizontal? (denoted by $\\theta$)",
                answers: [
                    ["$19.9 \\degree$", 0, false],
                    ["$20.1 \\degree$", 0, false],
                    ["$23.5 \\degree$", 1, false],
                    ["$21.2 \\degree$", 0, false]
                ],
                explain: "If you see the explanation for the previous question, you'll see how we got the component form of the resultant vector. To calculate the angle $\\theta$ as depicted in the image, we can take the arctangent of the vertical component over the horizontal one to get the angle: $\\arctan(\\frac{3.26}{7.52})\\approx 23.5\\degree$ (because the components and the vector form a right triangle)"
            },
            {
                number: 5,
                question: "<img style='max-width: 200px;' src='/kinematics/Problem3.png' class='rounded'><br>Find the magnitude of the resultant vector of adding these three vectors together.",
                answers: [
                    ["$8.1~\\textrm{N}$", 0, false],
                    ["$7.9~\\textrm{N}$", 0, false],
                    ["$7.5~\\textrm{N}$", 0, false],
                    ["$7.2~\\textrm{N}$", 1, false]
                ],
                explain: "Recall from the lesson that we can actually move vectors around, so we can rearrange all three vectors using the tip-to-tail method:<br><img style='max-width: 140px;' src='/kinematics/Solution1.png' class='rounded'><br>*Image may not be to scale.<br>We can now do the same method by converting all of the vectors to component form and adding their components: $\\langle -9,0 \\rangle + \\langle 11 \\cos(70 \\degree), 11 \\sin(70 \\degree) \\rangle $ $+ \\langle 8 \\cos(25\\degree), 8 \\sin(25 \\degree) \\rangle$ $\\approx \\langle 2.01, 6.96 \\rangle$. Now, using Pythagorean theorem with the components gives us the magnitude to be roughly $7.2~\\textrm{N}$."
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[level.value][form] = 1
    else results[level.value][form] = -1
}

function setChecked(chek, qNum) {
    for (let i = 0; i < questions[level.value][qNum].answers.length; i++) {
        if (questions[level.value][qNum].answers[i][2] && i !== chek) {
            questions[level.value][qNum].answers[i][2] = false
        } else if (!questions[level.value][qNum].answers[i][2] && i === chek) {
            questions[level.value][qNum].answers[i][2] = true
        }
    }
}
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Vectors</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            <p>
                <span v-show="level == 0">Maybe you’ve heard somewhere that physics is heavily math based. And yes,
                    while
                    that is true, a basic understanding of simple mathematics is sufficient to learn physics
                    conceptually.
                    It’s simply that most places don’t teach good conceptual physics anymore.<br><br>
            <h4 class="text-center">The Vector</h4>The first thing we
                    must
                    recognize when we learn physics is the vector. The vector looks like an arrow, but it doesn’t tell
                    you
                    where to go! There are two important things to recognize about a vector: the length (we call
                    "magnitude") and its direction. Remember those two things, and you will be pretty much set for the
                    rest
                    of physics.</span>

                <span v-show="level > 0">As you probably realize, all physics is based on math, which is why we start
                    with a
                    lesson in math. Scalar quantities, which are the quantities most are familiar with from math
                    courses,
                    are prevalent in physics. These have a magnitude, which is the value of the quantity.<br><br>Scalars
                    are
                    simply just the numbers you see and use in
                    your math course. For example, $3$, is a scalar. However, in the
                    real world (which is the realm physics operates in), we realize that something called "direction"
                    exists. This is why we define vector quantities. They are quantities that have both magnitude and
                    direction. Graphically, the direction is the direction in which the arrow
                    points, and the magnitude is the length of the arrow.</span>
                <br><br>
            <figure>
                <img src="/src/assets/kinematics/Figure 1.png" />
                <figcaption>Figure 1: A representation of a vector.</figcaption>
            </figure>
            <br>
            <span v-show="level == 0">
                It is important to note that the position of the vector on the coordinate grid does
                NOT actually matter, so we can move them around the grid to make things more convenient. As long as we
                maintain the same direction and magnitude, we can move the vector around however we like.<br><br>
            <h4 class="text-center">Notation</h4>A
                vector is
                defined and named by a single letter. A vector is typically seen with an arrowhead on top, like shown:
                &nbsp;$\vec{a}$
                <br>In typed text, it is typically represented with a bold letter like this:
                &nbsp;$\vectorbold{a}$<br><br>
                We will be using the arrowhead notation since it is a bit more noticeable in the midst of the oceans of
                text
                we're pouring on you. However, we're putting both notations out there just so you know for your
                reference.</span>
            <span v-show="level > 0">
                It is important to note that the position of the vector on the coordinate grid does
                NOT actually matter, so we can move them around the grid to make things more convenient. As long as we
                maintain the direction and magnitude, we are all good.<br><br>
            <h4 class="text-center">Notation</h4>On paper, vectors are named
                with a single letter, much like variables. While scalars are defined just by a single letter (like $a$),
                a
                vector is
                defined by a letter with an arrowhead across its top, like so: &nbsp;$\vec{a}$
                <br><br>In typed text and many textbooks out there, it is typically represented with a bold letter like
                this:
                &nbsp;$\vectorbold{a}$
                <br><br>We will be using the arrowhead notation since it is a bit more noticeable in the midst of the
                oceans
                of
                text we're pouring on you. However, we're putting both notations out there just so you know for your
                reference.</span>

            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>

        </div>

        <div v-show="page === 1">
            <p>
                <span v-show="level == 0">
            <h4 class="text-center">Vector Addition</h4>
                    Now you're probably thinking, can you perform basic operations on vectors? Well, you can!
                    However, it isn't
                    as simple as $1+1=2$. There are times though, if two vectors point in the SAME direction, then you
                    can add
                    them like you would with normal numbers. (see below.)
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 11.png" />
                        <figcaption>Figure 2: Two vectors being added linearly.</figcaption>
                    </figure>
                    <br>
                    Other than that, there are two primary methods to adding vectors, one being algebraically and the
                    other
                    being graphically. We will focus on the latter since we aren't doing the algebra-based
                    version.<br><br>
                    Now, graphically, there are two main methods. Remember when we said the position of the vector
                    doesn't
                    matter? This will come in handy here. The tip to tail method involves placing the “tail” (the end
                    without an
                    arrow) of one vector to the “tip” (the arrowhead) of another, and drawing the resultant (final)
                    vector from
                    the
                    starting point to the ending point. Perhaps a diagram will be more enlightening...
                </span>
                <span v-show="level > 0">
            <h4 class="text-center">Vector Addition</h4>
                    While scalar quantities can be added linearly, vector quantities require a bit more work to
                    manipulate. There are times, however, when you can add vectors linearly. That is when they are
                    pointing in
                    the same direction, as the diagram shows:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 11.png" />
                        <figcaption>Figure 2: Two vectors being added linearly.</figcaption>
                    </figure>
                    <br>
                    Besides that, you can either add them graphically or algebraically.
                    <br><br>
            <h4 class="text-center">Graphical Methods</h4>
                    Graphically, there are two main methods, tip-to-tail and parallelogram. We will utilize the ability
                    to
                    reposition vectors anywhere on
                    the coordinate grid for this. The tip to tail method involves placing the “tail” (the end without an
                    arrow) of one vector to the “tip” (the arrowhead) of another, and drawing the resultant vector from
                    the
                    tail of the latter to the tip of the former. Perhaps a diagram will be more enlightening...
                </span>
                <br><br>
            <figure>
                <img src="/src/assets/kinematics/Figure 2.png" />
                <figcaption>Figure 3: Tip-to-tail method </figcaption>
            </figure>
            <br>
            <span v-show="level > 0">In the parallelogram method, both vectors are placed at the origin, and a
                parallelogram
                is drawn with the two vectors as adjacent sides. The resultant vector runs from the origin to the
                opposite
                vertex of the parallelogram. It is very similar to the tip-to-tail method, as you can see via the dashed
                lines.
                <br><br>
                <figure>
                    <img src="/src/assets/kinematics/Figure 3.png" />
                    <figcaption>Figure 4: Parallelogram method </figcaption>
                </figure>
                <br>
            </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>

        <div v-show="page === 2">
            <p>
                <span v-show="level == 0">
                    And that's it! That's pretty much all there is to basic vectors, since we aren't dealing with
                    algebra and
                    more advanced math. To close off the first lesson, we'll give you a
                    little sneak preview of something about vectors.<br><br>
            <h4 class="text-center">Component Form</h4>Vectors can be defined via something called
                    <i>components</i>. In a 2-dimensional plane, we have a horizontal component (a horizontal vector
                    with
                    magnitude) and a vertical component (vertical vector with magnitude). The reason why we do this is
                    because
                    horizontal and vertical vectors are super easy to add (remember we said vectors in same direction
                    can be
                    added linearly?).<br><br>A vector in component form is typically addressed like so: $\vec{a} =
                    \langle 1, 1
                    \rangle$, with the left number being the horizontal component and the vertical component. The reason
                    why
                    component form is so nice is because we can simply add and subtract the numbers in the funny
                    brackets. For
                    two vectors, $\vec{a}$ and $\vec{b}$, if $\vec{a} = \langle 4,5 \rangle$ and $\vec{n} = \langle 2,1
                    \rangle$, the resultant vector of $\vec{a} + \vec{b} = \langle 4+2,5+1 \rangle = \langle 6,6
                    \rangle$. If
                    you want a diagram, see the one below:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 6.png" />
                        <figcaption>Figure 4: Vector addition (component method)</figcaption>
                    </figure>
                    <br>
                    The diagram may be a little cluttered and difficult to understand, but you see the horizontal
                    component of
                    the RED vector plus the horizontal component of the BLUE vector is equal to the white vector's
                    horizontal
                    component (It's the three dashed vectors pointing to the right, close to the bottom of the diagram)
                    and same
                    goes for the vertical component.<br><br>The smaller, dashed white arrows show how you can move the
                    BLUE
                    vector's
                    components to make the addition work, and since components are vectors, we can move them as long as
                    we keep
                    their magnitude and direction. This diagram just proves how you can simply add vector components,
                    using what
                    we just learned: the tip-to-tail method!<br><br>
            <h4 class="text-center">Conclusion</h4>If you want to learn more about this, you can either
                    search
                    it
                    up or take a sneak peek at our Algebra-based level (if you feel confident enough). Ready to go onto
                    the next
                    lesson? Let's hit it!
                </span>

                <span v-show="level > 0">
            <h4 class="text-center">Algebraic Methods</h4>
                    This is great and all, but sometimes, graphical analysis is unavailable. In that case, algebraic
                    vector
                    addition is available. But it's not as simple as $1+1=2$! First, we will introduce the two methods
                    of
                    algebraically representing vectors. Being able to represent them algebraically is key for doing any
                    sort of
                    computation with them.
                    <br><br>
                    The first is to express a vector as a magnitude (length) and an angle,
                    usually
                    measured from the positive x-axis. The notation $|\vec{a}|$ represents the magnitude of vector
                    $\vec{a}$.
                    The angle $\theta$, or the argument of a vector, denoted as $\textrm{arg}(\vec{a}$), is the angle
                    the vector
                    makes with the positive x-axis. A figure is drawn below to show what we mean:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 4.png" />
                        <figcaption>Figure 5: A vector defined by its magnitude and argument (angle)</figcaption>
                    </figure>
                </span>
                <span v-show="level > 0"><br>
                    
            <h4 class="text-center">Component Form</h4>
                    The other method is to define a vector by its horizontal and vertical components. In this case,
                    either angle
                    brackets are used or the unit vector notation is used. The two are practically the same. In the
                    angle
                    bracket notation, a vector is represented by $\langle x,y \rangle$ where $x$ and $y$ are the lengths
                    of the
                    horizontal and vertical components of the vector, respectively.<br><br>IMPORTANT!! The horizontal
                    component
                    ALWAYS comes first when using the angle bracket notation!!<br><br>A negative value indicates the
                    component
                    is in
                    the negative direction. If you actually consider the $x$ component as a horizontal vector, and the
                    $y$
                    component as a vertical vector, they will sum up to the original vector.
                    <br><br>
                    The unit vector notation
                    directly
                    demonstrates this. A unit vector is a vector in a particular direction that has a magnitude of 1.
                    The unit
                    vector in the positive $x$ direction is represented by $\hat{i}$ and in the $y$ direction,
                    $\hat{j}$. So, if
                    we have a vector that can be written as $\langle 3,4 \rangle$, it can also be written as
                    $3\hat{i}+4\hat{j}$. The $\hat{k}$ vector is also introduced in 3D, but we won’t worry about that. A
                    diagram
                    is provided below:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 5.png" />
                        <figcaption>Figure 6: A vector defined by its horizontal and vertical components
                        </figcaption>
                    </figure>
                    <br>
                    The method I will introduce here is the addition of vector components. NOTE: You can use the Law of
                    Cosines
                    as well, but we aren't covering that because it is more intensive on the calculation side and is not
                    as
                    useful in the context of vectors.<br><br>
                    To add vectors algebraically, simply add their components. Yes, it is that simple! For instance, if
                    $\vec{a}
                    = \langle 3, 5 \rangle$ and $\vec{b} = \langle 4, 3 \rangle$ then $\vec{a} + \vec{b} = \langle
                    3+4,5+3
                    \rangle = \langle 7,8 \rangle$.<br>
                    <br>This, surprisingly, is actually nearly identical to graphically
                    adding
                    vectors,
                    and here is a diagram as proof. I have excluded the coordinate axes to make the diagram less
                    cluttered, but realize that we are still working in a coordinate plane:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 6.png" />
                        <figcaption>Figure 7: Vector addition via component method</figcaption>
                    </figure>
                    <br>
                    Now is it clear that the components add up to the resultant vector? The red components add up with
                    the blue
                    components to produce the white components, as shown on the horizontal and vertical axes. The
                    smaller,
                    dashed white arrow shows you can move the components of the blue vectors to do tip-to-tail
                    addition!<br><br>However, we may occasionally run into an issue here. How do we get the components
                    of a
                    vector
                    if we are not given them? Suppose we are given the magnitude and argument (angle), as we mentioned
                    before,
                    instead. Well, the components of a vector are $\langle
                    |\vec{a}|\cos(\theta),|\vec{a}|\sin(\theta) \rangle$ for vector $\vec{a}$ at an angle
                    $\theta$ to the positive x-axis. This is due to basic right triangle trigonometry, and if you want
                    to
                    investigate more about this, you will have to do so on your own, since it would take too much effort
                    to try
                    to explain it here.<br><br>
            <h4 class="text-center">Conclusion</h4>
                    Whew! You made it to the end of the lesson on vectors! Congratulations! Physics is not an easy
                    science to
                    grasp, but you made it through the most basic and fundamental of all of it. The rest will be more
                    concepts
                    and less math (hopefully)! Ready to move on? Let's go!

                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <RouterLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/dimensional-analysis">Next
                    Lesson! &rarr;</RouterLink>
            </div>

        </div>
    </div>
    <div v-show="!lessonShowing" class="container-fluid h100 pt-5">
        <h1>Vectors Problems</h1><br>
        <span v-show="level>0">A calculator might be necessary for the following problems.</span>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5" v-html="q.number + 1 + '. ' + q.question"></label><br>
                </div>
                <div class="col border-end border-secondary">
                    <div class="ms-auto" style="width:fit-content">
                        <div class="form-check" style="width:fit-content;" v-for="(a, index) in q.answers">
                            <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'"
                                :checked="a[2]" @click="setChecked(index, q.number)">
                            <label class="form-check-label text-start" style="font-size:0.96rem; max-width: 200px;">
                                {{ a[0] }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col d-flex flex-column text-start">
                    <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                        :value="results[level][q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                    <div class="me-auto mb-auto" v-show="results[level][q.number] !== 0">{{ results[level][q.number]
                        === 1 ?
                        "&#x2705; Correct!" : "&#x274c; Not quite! Try again." }}
                    </div>
                    <a href="javascript:void(0)" v-show="results[level][q.number] !== 0" class="me-auto mb-auto ms-1"
                        @click="explanations[level][q.number] = !explanations[level][q.number]">{{
                            !explanations[level][q.number] ? "Want to see an explanation? " : "Hide explanation" }}</a>
                </div>
                <span class="explained mt-3" v-show="explanations[level][q.number]" v-html="q.explain"></span>
            </form>

        </div>
    </div>
</template>


<style scoped></style>