<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([[0], [0], [0]]) // update as add more questions
const explanations = reactive([[false], [false], [false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[props.level][form] = 1
    else results[props.level][form] = -1
}

function setChecked(chek, qNum) {
    for (let i = 0; i < questions[props.level][qNum].answers.length; i++) {
        if (questions[props.level][qNum].answers[i][2] && i !== chek) {
            questions[props.level][qNum].answers[i][2] = false
        } else if (!questions[props.level][qNum].answers[i][2] && i === chek) {
            questions[props.level][qNum].answers[i][2] = true
        }
    }
}
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Forces</h1><br>
        <div v-show="page === 0">
            <p>
                We have been negligent to dive deeper into forces, despite introducing it briefly in the previous
                chapter. As a refresher, forces are simply a push or pull that may <i>change</i> motion. Again, they are
                not directly responsible for maintaining or causing motion, like we discussed in the previous
                lesson.<br><br>

                There are four fundamental forces categorized on the basis of particle exchange:
            </p>
            <ul>
                <li>
                    <p><strong><i>Gravitational Force:</i> This is a force that arises due to gravity. It is one of the
                            forces that will
                            be important to us. Gravity is a long-range force, since it requires bodies to have quite
                            large
                            masses in order to take any effect. There is a specific equation we can use to calculate it,
                            but
                            that comes later on.</strong> particle theorized to be the vector particle for the
                        gravitational
                        interaction is the graviton.</p>
                </li>
                <li>
                    <p><strong><i>Electromagnetic Forces:</i> Virtually all the forces that we experience and see in the
                            world fall under
                            this category (e.g. friction, air resistance, etc.).</strong> If you know chemistry, you
                        know there are
                        electrons around the nucleus of the atom. All these forces are caused by repulsion of the
                        electrons
                        in objects when they come into “contact” with another. Again, this isn’t important for our
                        purposes.
                        <strong>Electromagnetic forces can actually be short-range or long-range, but for right now,
                            most of them
                            will be short-range, specifically in the form of <i>contact</i> forces, so we’ll treat them
                            that
                            way.</strong> The photon is the particle responsible for the electromagnetic interaction.
                    </p>
                </li>
                <li>
                    <p><i>Strong Forces:</i> Not of too particular interest to us. It only happens at an atomic scale,
                        and it is
                        primarily responsible for holding the nucleus of an atom together. This is a short-range force,
                        since it only happens within and between protons and neutrons (protons and neutrons are actually
                        a
                        composite of three quarks bound by the strong force). You can think of it this way—it only acts
                        at
                        distances of one femtometer ($10^{-15}~\textrm m$). Its vector particle is the gluon, and unlike
                        the
                        photon it has mass and contributes most of the mass of the proton and neutron.</p>
                </li>
                <li>
                    <p><i>Weak Forces:</i> This force also doesn’t show up until much later. It is the force that is
                        behind
                        nuclear fission and radioactive decay. Interestingly, it discriminates between left-handed
                        (left-spimming) and right-handed particles. It is also a short-range atomic-level force, but
                        unlike
                        the strong force we can see it in action (for instance, in radioactive decay, which has very
                        real
                        consequences!) .It is interesting to note, however, that this force and the electromagnetic
                        force
                        become one at very high temperatures. The vector particles of this force are the $W+$, $W-$, and
                        $Z$
                        bosons.</p>
                </li>
            </ul>
            <p>
                You don’t need to remember any of this particle exchange stuff for the actual lesson, but Eric finds it
                interesting, so it’s included in here. (Note from Eric: Edward just doesn’t understand it—at least not
                yet). The bolded parts are what are actually important for you to remember for our lesson, and just
                remember that all four of these forces are the the four fundamental forces in nature.<br><br>
                IMPORTANT!! If a force does not fall under the category of any of those four forces, it does not exist
                (Note
                from Eric: sort of, but that will be taught later)!

            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                Firstly, there’s the gravitational force, but remember, that’s long range force. It is the primary long
                range interaction we will be dealing with in Newtonian mechanics. It is denoted as $F_G$ or $F_g$. Let’s
                start by considering an object in free fall, where the gravitational force is the only force acting on
                it, assuming no air resistance. Remember from kinematics that a body undergoing free-fall has
                acceleration equal to $g$, which is equal to $9.81~\textrm m /\textrm s$. $g$ is also sometimes called
                the gravitational field strength, and its units may also be denoted as $\textrm N /\textrm{kg}$. Thus,
                by Newton’s second law, the net force, or sum of all forces is equal to just $F_g$. But $F_g=ma$, and
                since we know the magnitude of acceleration to be $g$, $F_g=mg$. This is one of the primary forces that
                you will be dealing with.<br><br>

                The following are all contact forces, meaning direct contact is required for them. Since these don’t
                look like gravitational forces, what must they be? Electromagnetic forces.<br><br>

                The normal force is the contact force exerted by a surface perpendicular to itself. It is denoted by
                $F_n$ or $F_N$. On a flat tabletop, the normal force acting on an object will always be upwards, but if
                you will note, on a surface that is tilted at an angle, the normal force points perpendicularly to the
                surface, so it is not perfectly upwards in that case. There is no particular equation that we use to
                calculate the normal force, it is pretty much always calculated from other forces acting on the
                body.<br><br>

                Tension forces are stretch forces transmitted along rope or similar materials. They are denoted by $F_T$
                or sometimes just $T$ (though this letter is used to represent other quantities as well). We will assume
                that all the strings we work with are massless and inflexible (actually, in physics, a string literally
                implies masslessness, while using the word “rope” implies that there is mass). The reason for this is
                because massless means the tension is equally distributed throughout the entire string, and inflexible
                means the length of the string always remains constant (no stretching). Again, there is no specific
                equation to calculate the tension in a string, you will usually use other known values to calculate it
                in specific scenarios.<br><br>

                The last of these forces is called the frictional force, which is discussed upon in the next page.
                Remember that all these forces are not "new" fundamental forces, they are simply types of forces that
                fall under the categorization of electromagnetic forces!! For the rest of mechanics, if we introduce a
                force, and you know for sure its not gravity, then it is obviously an electromagnetic force, since it is
                not strong nor weak (we aren't dealing with those two remember).

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
        <div v-show="page === 2">
            <p>
                Frictional forces are contact forces exerted parallel to a surface. They are denoted by $F_f$ or
                sometimes simply $f$ (though, again, this is a letter used by other quantities as well). Friction is
                really quite a complex force resulting from microscopic interactions between the irregularities between
                surfaces. Even things that seem very smooth have many ridges and bumps at a microscopic level. Friction
                between surfaces is proportional to the normal force and a dimensionless constant known as the
                coefficient of friction, which varies between surfaces and for different modes of motion.<br><br>

                In general, there are two types of frictional forces: static and kinetic. Static friction acts when an
                object is still at rest relative to the surface it rests on. Kinetic friction acts when an object is in
                motion relative to the surface it rests on.<br><br>

                The coefficient of static friction is denoted as $\mu_s$ and kinetic friction $\mu_k$. Static friction
                is also sometimes written as $\mu_s^{MAX}$, and you will see why in a second. If both are
                equal, usually just $\mu$ is used for simplicity. The friction force is equal to $\mu \cdot F_N$ and is
                usually oppositely directed to any net applied force, but
                this doesn’t always hold true. The more general rule is that friction always opposes relative motion
                between two surfaces. This will become more prevalent later on when we teach free-body diagrams.<br><br>

                One really important concept that we recognize and clear out of the way for friction is how the
                frictional force actually works. Static friction is actually a force that will automatically adjust
                itself to match the applied force. However, there is a certain maximum for this. That's what $\mu_s$ is
                here for. The magnitude of the frictional force will always be $≤\mu_s F_N$, and so when you exceed that
                value, the frictional force turns into the kinetic frictional force, which is always constant value of
                $\mu_k \cdot F_N$. This means that the coefficient of static friction must be greater than the
                coefficient of kinetic friction!!<br>
                <span v-show="level == 0">There's no doubt you've definitely tried to push something across a floor at
                    some point in your life. You'll notice that it is actually harder to get the box moving at first,
                    but once it is moving, it becomes a bit smoother sailing from there. What we just explained, if you
                    think about it, perfectly matches up with this intuition!<br></span>
                <br>
                <span v-show="level > 0">
                    A graph here to show what we mean:
                    <figure>
                        <img src="/src/assets/dynamics/Figure 17.png" style="max-width:250px" />
                        <figcaption>Figure 1: A graph that shows the magnitude of frictional force over time, in
                            accordance with the applied force.</figcaption>
                    </figure>
                    You are probably wondering, is it possible for $\mu_k$ instead to be <i>greater</i> than $\mu_s$?
                    Let's take a closer look. Remember, once we apply a force $F$ that less than or equal to $\mu_s
                    F_N$, the object will not move because the static friction can counteract this force. However, once
                    the force exceeds the value of $\mu_s F_N$, the object will begin to slide. That is the standard for
                    how friction operates. When it begins sliding, it switches to kinetic friction, $\mu_k F_N$. Now if
                    $\mu_k$ is greater than $\mu_s$, then the magnitude of the kinetic frictional force will
                    automatically be greater than the static frictional force, which means as soon as it switches to
                    kinetic friction, the block will not move. But that contradicts our earlier statement of it will
                    begin to slide when the applied force exceeds $\mu_s F_N$ in magnitude. So thus, the statement that
                    $\mu_s≥\mu_k$ must hold.
                    <br><br>
                </span>


                So far, these are all the forces you will encounter. This chapter was not particularly problem-heavy,
                but more on concepts. There are most definitely more forces that we will add to our
                collection as we progress. <span v-show="level == 2">As for you calculus students, we know you're itching
                    to pull our your calculus tools. Unfortunately, this isn't your chapter just yet. Calculus will
                    begin to play a more important role with the chapters to come!</span> Remember, all these forces are
                not “new” types of forces, they all will fall
                under the category of one of the four fundamental forces in nature. We stress this importance because
                it's crucial that you realize the difference. In your journey through Newtonian mechanics, for the most
                part, if the force not is gravitational, then it must be electromagnetic.<br>But simply knowing these
                forces is
                not enough. You will learn how to use this knowledge to solve problems and draw free-body diagrams,
                which is arguably one of the most important things you will ever learn in mechanics.
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson!
                    &rarr;</button>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Introductory Forces Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
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