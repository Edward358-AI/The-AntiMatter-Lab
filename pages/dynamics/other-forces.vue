<script setup>
useHead({
    title: 'Forces',
    meta: [
        { name: 'description', content: 'Explore various forces like gravity and electromagnetism and their importance in physics.' }
    ]
})

import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).OtherForces

watch(page, () => window.scrollTo(0,0))
watch(level, () => {if (!lessonShowing.value) nextTick(() => window.MathJax?.typeset())})

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What force is responsible for keeping a book still on a table?",
                answers: [
                    ["Gravitational", 0, false],
                    ["Frictional", 0, false],
                    ["Normal", 1, false],
                    ["Strong", 0, false]
                ],
                explain: "Recall that the normal force acts perpendicular to a surface, in this case the table. It holds up the book on the table, balancing out the force of gravity on it."
            },
            {
                number: 1,
                question: "Which of these most accurately describes what the frictional force does?",
                answers: [
                    ["Resists motion", 0, false],
                    ["Resists relative motion", 1, false],
                    ["Slows things down", 0, false],
                    ["Generates heat", 0, false]
                ],
                explain: "Friction is defined as tending to resist relative motion between two surfaces. The other answer choices can be true in some circumstances, but only the second one is always true."
            },
            {
                number: 2,
                question: "What force keeps the Earth in orbit around the sun?",
                answers: [
                    ["Frictional", 0, false],
                    ["Electromagnetic", 0, false],
                    ["Weak", 0, false],
                    ["Gravitational", 1, false]
                ],
                explain: "Gravity is the key force that plays into keeping planets like the Earth and moons like well, the moon, in orbit around larger celesial bodies."
            },
            {
                number: 3,
                question: "What force enables you to walk? (Think about cases where it's hard to walk!)",
                answers: [
                    ["Normal", 0, false],
                    ["Gravitational", 0, false],
                    ["Friction", 1, false],
                    ["Tension", 0, false]
                ],
                explain: "Friction is actually the force responsible for enabling you to walk forward, since it is the only force than can be exerted parallel to a surface. This can be seen: have you ever noticed how hard it is to walk on ice (very low friction)?"
            },
            {
                number: 4,
                question: "A box and the surface it sits on have a coefficient of static friction of $\\mu_s$. When you push on the box of mass $m$ with some force $F$, it does not move. What must be the force of friction opposing you?",
                answers: [
                    ["$F$", 1, false],
                    ["$0$", 0, false],
                    ["$\\mu_s mg$", 0, false],
                    ["$ \\mu_s F$", 0, false]
                ],
                explain: "Since the box is not moving because the friction is static, the frictional force must be equal to the force that is applied to the box in order to balance it. Thus, the correct choice is the first one."
            },
            {
                number: 5,
                question: "What is the most common type of force?",
                answers: [
                    ["Gravitational", 0, false],
                    ["Electromagnetic", 1, false],
                    ["Strong", 0, false],
                    ["Weak", 0, false]
                ],
                explain: "All contact forces (friction, normal force, tension) are technically electromagnetic forces, as explained in the section. Thus, the most common type of force we'll be talking about is actually electromagnetic!"
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the heaviest object you can hang from a string if it breaks when the tension in it exceeds 200 N?",
                answers: [
                    ["200 kg", 0, false],
                    ["40.8 kg", 0, false],
                    ["20.4 kg", 1, false],
                    ["4.91 kg", 0, false]
                ],
                explain: "The tensional force in the string should be equal to the gravitational force, since the string is the only thing holding the object up. Recall that $F_g = mg$, and use this formula where $F_g = F_T = 30~\\textrm{N}$ to solve for an answer."
            },
            {
                number: 1,
                question: "Which of these is a plausible value for the coefficient of friction between your shoe and concrete?",
                answers: [
                    ["0.01", 0, false],
                    ["1.24", 0, false],
                    ["0.47", 1, false],
                    ["14.5", 0, false]
                ],
                explain: "Most coefficents of friction are betweeen zero and one. Your shoe and concrete have a fairly large coefficient of friction, as can be evidenced if you go outside. Thus, the only plausible answer choice is the third option."
            },
            {
                number: 2,
                question: "Is there a maximum value for the normal force in the real world?",
                answers: [
                    ["Yes", 1, false],
                    ["No", 0, false],
                    ["Sometimes", 0, false],
                    ["Not enough information", 0, false]
                ],
                explain: "In the real world, surfaces have a breaking point. A wooden table will break if too much force is exerted on it. Therefore, the maximum value of the normal force is not unbounded but depends on the physical characteristics of surfaces."
            },
            {
                number: 3,
                question: "What force causes a ball to roll along a surface?",
                answers: [
                    ["Normal", 0, false],
                    ["Gravitational", 0, false],
                    ["Kinetic friction", 0, false],
                    ["Static friction", 1, false]
                ],
                explain: "When objects roll, they usually roll without slipping, meaning the bottom of the object is always momentarily at rest with the ground. Thus, the force that keeps them rolling is actually static friction. If you've ever seen what happens when a car drives on ice, you'll know that friction is important to rolling!"
            },
            {
                number: 4,
                question: "A box and the surface it sits on have a coefficient of static friction of $\\mu_s$. When you push on the box of mass $m$ with some force $F$, it does not move. What must be the force of friction opposing you?",
                answers: [
                    ["$F$", 1, false],
                    ["$0$", 0, false],
                    ["$\\mu_s mg$", 0, false],
                    ["$ \\mu_s F$", 0, false]
                ],
                explain: "Since the box is not moving because the friction is static, the frictional force must be equal to the force that is applied to the box in order to balance it. Thus, the correct choice is the first one."
            },
            {
                number: 5,
                question: "Which one of these forces only exists in a gravitational field?",
                answers: [
                    ["Electromagnetic", 0, false],
                    ["Normal", 0, false],
                    ["Friction", 0, false],
                    ["None of the above", 1, false]
                ],
                explain: "Gravity does not affect the presence of normal or frictional forces, because they are exerted by surfaces in contact. Even in outer space, you can feel a normal force if you press against the walls of the space capsule, and you can feel friction if you run your hands along it."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the heaviest object you can hang from a string if it breaks when the tension in it exceeds 200 N?",
                answers: [
                    ["200 kg", 0, false],
                    ["40.8 kg", 0, false],
                    ["20.4 kg", 1, false],
                    ["4.91 kg", 0, false]
                ],
                explain: "The tensional force in the string should be equal to the gravitational force, since the string is the only thing holding the object up. Recall that $F_g = mg$, and use this formula where $F_g = F_T = 30~\\textrm{N}$ to solve for an answer."
            },
            {
                number: 1,
                question: "Which of these is a plausible value for the coefficient of friction between your shoe and concrete?",
                answers: [
                    ["0.01", 0, false],
                    ["1.24", 0, false],
                    ["0.47", 1, false],
                    ["14.5", 0, false]
                ],
                explain: "Most coefficents of friction are betweeen zero and one. Your shoe and concrete have a fairly large coefficient of friction, as can be evidenced if you go outside. Thus, the only plausible answer choice is the third option."
            },
            {
                number: 2,
                question: "Is there a maximum value for the normal force in the real world?",
                answers: [
                    ["Yes", 1, false],
                    ["No", 0, false],
                    ["Sometimes", 0, false],
                    ["Not enough information", 0, false]
                ],
                explain: "In the real world, surfaces have a breaking point. A wooden table will break if too much force is exerted on it. Therefore, the maximum value of the normal force is not unbounded but depends on the physical characteristics of surfaces."
            },
            {
                number: 3,
                question: "What force causes a ball to roll along a surface?",
                answers: [
                    ["Normal", 0, false],
                    ["Gravitational", 0, false],
                    ["Kinetic friction", 0, false],
                    ["Static friction", 1, false]
                ],
                explain: "When objects roll, they usually roll without slipping, meaning the bottom of the object is always momentarily at rest with the ground. Thus, the force that keeps them rolling is actually static friction. If you've ever seen what happens when a car drives on ice, you'll know that friction is important to rolling!"
            },
            {
                number: 4,
                question: "A box and the surface it sits on have a coefficient of static friction of $\\mu_s$. When you push on the box of mass $m$ with some force $F$, it does not move. What must be the force of friction opposing you?",
                answers: [
                    ["$F$", 1, false],
                    ["$0$", 0, false],
                    ["$\\mu_s mg$", 0, false],
                    ["$ \\mu_s F$", 0, false]
                ],
                explain: "Since the box is not moving because the friction is static, the frictional force must be equal to the force that is applied to the box in order to balance it. Thus, the correct choice is the first one."
            },
            {
                number: 5,
                question: "Which one of these forces only exists in a gravitational field?",
                answers: [
                    ["Electromagnetic", 0, false],
                    ["Normal", 0, false],
                    ["Friction", 0, false],
                    ["None of the above", 1, false]
                ],
                explain: "Gravity does not affect the presence of normal or frictional forces, because they are exerted by surfaces in contact. Even in outer space, you can feel a normal force if you press against the walls of the space capsule, and you can feel friction if you run your hands along it."
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
        <h1>Forces</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            <p>
                We have been negligent to dive deeper into forces, despite introducing it briefly in the previous
                chapter. As a refresher, forces are simply a push or pull that may <i>change</i> motion. Again, they are
                not directly responsible for maintaining or causing motion, like we discussed in the previous
                lesson.<br><br><h4 class="text-center">The Four Fundamental Forces</h4>
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
                remember that all four of these forces are the four fundamental forces in nature.<br><br>
                IMPORTANT!! If a force does not fall under the category of any of those four forces, it does not exist
                (Note
                from Eric: sort of, but that will be taught later)!

            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <h4 class="text-center">The Gravitational Force</h4>
            <p>
                Firstly, there’s the gravitational force, but remember, that’s long range force. It is the primary long
                range interaction we will be dealing with in Newtonian mechanics. It is denoted as $F_G$ or $F_g$. Let’s
                start by considering an object in free fall, where the gravitational force is the only force acting on
                it, assuming no air resistance. Remember from kinematics that a body undergoing free-fall has
                acceleration equal to $g$, which is equal to $9.81~\textrm m /\textrm s$. $g$ is also sometimes called
                the gravitational field strength, and its units may also be denoted as $\textrm N /\textrm{kg}$. Thus,
                by Newton’s second law, the net force, or sum of all forces is equal to just $F_g$. But $F_g=ma$, and
                since we know the magnitude of acceleration to be $g$, $F_g=mg$. This is one of the primary forces that
                you will be dealing with.<br><br><h4 class="text-center">Electromagnetic Forces</h4>

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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 2">
            <h4 class="text-center">The Frictional Force</h4><br>
            <p> <strong>Note: Even though the title says "The Frictional Force", it's NOT a new "type" of force. Remember that frictional forces fall under the <i>Electromagnetic forces</i> category.</strong><br><br>
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
                coefficient of kinetic friction!!<br><br>
                <span v-show="level == 0">There's no doubt you've definitely tried to push something across a floor at
                    some point in your life. You'll notice that it is actually harder to get the box moving at first,
                    but once it is moving, it becomes a bit smoother sailing from there. What we just explained, if you
                    think about it, perfectly matches up with this intuition!<br><br></span>
                <span v-show="level > 0">
                    A graph here to show what we mean:
                    <br><br>
                    <figure>
                        <img src="/dynamics/Figure 17.png" />
                        <figcaption>Figure 1: A graph that shows the magnitude of frictional force over time, in
                            accordance with the applied force.</figcaption>
                    </figure>
                    <br><br>
                    You are probably wondering, is it possible for $\mu_k$ instead to be <i>greater</i> than $\mu_s$?
                    Let's take a closer look. Remember, once we apply a force $F$ that less than or equal to $\mu_s
                    F_N$, the object will not move because the static friction can counteract this force. However, once
                    the force exceeds the value of $\mu_s F_N$, the object will begin to slide. That is the standard for
                    how friction operates. 
                    <br><br>
                    When it begins sliding, it switches to kinetic friction, $\mu_k F_N$. Now if
                    $\mu_k$ is greater than $\mu_s$, then the magnitude of the kinetic frictional force will
                    automatically be greater than the static frictional force, which means as soon as it switches to
                    kinetic friction, the block will not move. But that contradicts our earlier statement of it will
                    begin to slide when the applied force exceeds $\mu_s F_N$ in magnitude. So thus, the statement that
                    $\mu_s≥\mu_k$ must hold.
                    <br><br>
                </span>

                <h4 class="text-center">Conclusion</h4>
                So far, these are all the forces you will encounter. This chapter was not particularly problem-heavy,
                but more on concepts. There are most definitely more forces that we will add to our
                collection as we progress. <span v-show="level == 2">As for you calculus students, we know you're itching
                    to pull our your calculus tools. Unfortunately, this isn't your chapter just yet. Calculus will
                    begin to play a more important role with the chapters to come!</span> Remember, all these forces are
                not “new” types of forces, they all will fall
                under the category of one of the four fundamental forces in nature. We stress this importance because
                it's crucial that you realize the difference. In your journey through Newtonian mechanics, for the most
                part, if the force not is gravitational, then it must be electromagnetic.<br><br>But simply knowing these
                forces is
                not enough. You will learn how to use this knowledge to solve problems and draw free-body diagrams,
                which is arguably one of the most important things you will ever learn in mechanics.
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/dynamics/fma-fbd">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Forces Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5" v-html=" q.number + 1 + '. ' + q.question"></label><br>
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