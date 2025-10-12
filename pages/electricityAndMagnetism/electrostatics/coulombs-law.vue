<script setup>
useHead({
    title: "Coulomb's Law",
    meta: [
        { name: 'description', content: "Understand Coulomb's Law and how to calculate electric forces between charged objects." }
    ]
})

import { reactive, watch } from 'vue'
import { useUserStore } from '../../../stores/user'
import { useLessonShowingStore } from '../../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).CoulombsLaw

watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 4,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 5,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 4,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 5,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(qIndex, evt) {
  const formEl = evt?.target?.closest('form')
  if (!formEl) return
  const data = new FormData(formEl)
  results[level.value][qIndex] = data.get('question') === 'y' ? 1 : -1
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
        <h1>Coulomb's Law</h1><br>
        <p>
        <div v-show="page===0">
            <h4 class="text-center">Introduction</h4>
            Welcome to the second lesson of electricity and magnetism, starring the ripoff version of Newton's Law of Universal Gravitation. Yes, Coulomb's Law is
            practically identical to the Law of Gravitation, but with charge instead of mass. Of course, there are slight differences, but for the most part we can
            re-use the knowledge we learned from gravitation here.
            <br><br>
            <h4 class="text-center">Mathematical Statement of Coulomb's Law</h4>
            <span v-show="level>0">
                First, a bit of quick review. Remember that the law of gravity followed an inverse-square relationship. Coulomb's Law relates the electric force between two 
                charges in terms of their charge and the separation between them. The key thing to keep in mind is that while gravity always acts to pull objects together, the 
                electric force can be either attractive or repulsive, depending on the signs of the charges.
                <br><br>
                The equation of Coulomb's Law is:
                <br><br>
                $$ F_E = k \dfrac{q_1 q_2}{r^2}$$
                <br>
                In this equation, $k$ is a constant that is analogous to the Universal Gravitation Constant, called Coulomb's constant. The charges are $q_1$ and $q_2$ and the separation
                between them is $r$. Now, you can plug in positive charges as positive values and negative charges as negative values, but I reccomend just keeping in mind the <b>direction</b>
                of the force, since that's the most important thing. The sign can be neglected if you keep the direction in mind.
                <br><br>
                <h4 class="text-center">The Permittivity of Free Space</h4>
                Now, $k$ is a perfectly acceptable constant, and it is defined as $k = 8.99 \times 10^9 ~\frac{\textrm{N m}^2}{\textrm{C}^2}$. You can use this raw value if you want, 
                but $k$ can be written in terms of a more fundamental constant called the <b>permittivity of free space</b>, represented by $\epsilon_0 = 8.85 \times 10^{-12} ~\textrm{s}^4 \textrm{A}^2 / \textrm{m}^3\textrm{kg}$.
                (Don't worry about the units.) That's the greek letter epsilon, and this constant 
                is pronounced "epsilon-nought". This is also sometimes referred to as the <b>vacuum permittivity</b>.
                <br><br>
                Coulomb's constant and the permittivity are related by the equation $k = \frac{1}{4\pi \epsilon_0}$. This also means that Coulomb's Law can be written in an alternative form.
                <br><br>
                $$ F_E = \dfrac{1}{4\pi\epsilon_0} \dfrac{q_1 q_2}{r^2}$$
                <br>
                This is the form that I'll primarily be using, because the permittivity of free space is a more fundamental constant than Coulomb's constant. Working with $k$ also becomes 
                cumbersome later on as we talk about more complex topics, so this choice is also for convenience. 
                <br><br>
                I know I've been very ambiguous about what this constant actually is, but I won't talk about it immediately here. I'll go into depth later in this lesson. First, we should work on a practice problem.
                Let's begin with a very simple direct calculation problem.
                <br><br>
                <div class="problem">
                    What is the electric force within the hydrogen atom? The atom has a proton and an electron (which both have a charge of magnitude $e$, remember?) and a radius of 53 picometers.
                    <br><br>
                    This is a direct calculation using Coulomb's Law. We just have to plug in the charges and the separation to get the answer.
                    <br><br>
                    $$ F_E = \frac{1}{4\pi \epsilon_0} \frac{e^2}{r^2} $$
                    <br>
                    $$ F_E = \bbox[3px,
                    border: 0.5px solid
                    white]{8.22 \times 10^{-8}~\textrm{N}}$$
                </div>
            </span>
            <span v-show="level==0">
                Coulomb's Law follows many of the same rules as the law of gravity, with an inverse-square relationship. However, it accounts for charge and not mass, as explained before, and 
                it can be either attractive or repulsive depending on the signs of the charge. This is very important, because it's what tells us the direction of the force! With gravity, you only had 
                objects attracting each other, but now you can have them repelling each other as well! The formula looks like this:
                <br><br>
                $$ F_E = k \dfrac{q_1 q_2}{r^2}$$
                <br>
                The constant $k$ is called Coulomb's constant. We don't need to worry about its value here, but if you want to dig deeper into the formula you can head to our algebra-based or 
                calculus-based levels. $q_1$ and $q_2$ are the two charges, and $r$ is the separation.
                <br><br>
                <h4 class="text-center">The Permittivity of Free Space</h4>
                Instead of using $k$, I will mostly use a more fundamental constant: the permittivity of free space $\epsilon_0$. That's the greek letter epsilon, and this constant 
                is pronounced "epsilon-nought". It is related to $k$ by the equation $k = \frac{1}{4\pi\epsilon_0}$. I will explain what this constant is and what it determines later in this lesson.
                This relationship lets us write the electric force in another way:
                <br><br>
                $$ F_E = \dfrac{1}{4\pi\epsilon_0} \dfrac{q_1 q_2}{r^2}$$
                <br>
                Again, I wouldn't worry too much about this at a conceptual level. Electricity and magnetism has a lot of really mathematical content, but don't let it overwhelm you. I'll try to keep as little math 
                here as possible.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next &rarr;</button>
            </div>
        </div>

        <div v-show="page===1">
            <span v-show="level>0">
                Let's try a more difficult problem that hearkens back to the concepts we talked about in forces. This one will involve vectors and accounting for 
                the direction of the force, but overall it's not significantly different from the old force analysis questions we've done. I hope you still remeber your 
                old mechanics content, because it will come up a lot in this subject!
                <br><br>
                <div class="problem">
                    Consider the arrangment of the three point charges. The charges in red and blue are fixed in place, while the charge in purple is free to move. If we measure an acceleration of 
                    $a_0 = 0.5 ~\textrm{m/s}^2$ on the purple charge when the charges are in the depicted configuration, what must be the mass of the purple charge? The charges of each particle are labelled 
                    on the diagram.
                    <br><br>
                    <figure>
                        <img src="/electrostatics/ChargesProblem.png" style="max-width:1000px"/>
                    </figure>
                    <br>
                    This is certainly quite a tough problem to do, even though each part is relatively simple. It's combining all the parts to get a coherent final 
                    answer that's difficult. We can start by finding the force from each charge on the purple charge, then do some vector addition to get the net force. 
                    <br><br>
                    We will call the force from the blue charge $F_{B}$ and the force from the red charge $F_{R}$. We can find each force using Coulomb's Law.
                    <br><br>
                    $$ F_{B} = \dfrac{1}{4\pi\epsilon_0} \dfrac{(q_1)(q_3)}{ {L_1}^2} $$
                    $$ F_{R} = \dfrac{1}{4\pi\epsilon_0} \dfrac{(q_2)(q_3)}{ {L_2}^2} $$
                    <br>
                    Now, we need to do some vector addition. We split each force into its x and y components, and take the vector sums of each. But before we do that, we need to consider which 
                    direction each force is in, otherwise we'll get sign errors. Our purple charge is positive, and the blue charge is negative; this means that $F_{B}$ will point <b>toward</b> the 
                    blue charge. Both the purple and red charges are positive, so $F_{R}$ will point <b>away</b> from the red charge. With this information, we can find the net force in each direction.
                    <br><br>
                    $$F_{net, x} = F_B \sin \theta_1 + F_R \sin \theta_2$$
                    $$F_{net, y} = F_B \cos \theta_1 - F_R \cos \theta_2$$
                    <br>
                    Now, we do some numerical substitution. I won't show the dxact steps because I'm assuming you know how to plug numbers in.
                    <br><br>
                    $$F_{net, x} = 6.65 \times 10^{-7} ~\textrm{N}$$
                    $$F_{net, y} = -1.81 \times 10^{-6} ~\textrm{N}$$
                    <br>
                    This means that the overall net force is:
                    <br><br>
                    $$ F_{net} = \sqrt{ {F_{net,x}}^2+ {F_{net,y}}^2 } = 1.93 \times 10^{-6} ~\textrm{N} $$
                    <br>
                    Since $F_{net} = ma$, we can find the mass with the given value of acceleration.
                    $$ m = \frac{F_{net}}{a} = \bbox[3px,
                    border: 0.5px solid
                    white] {3.86 ~\mu \textrm{g}}$$
                    <br><br>
                    An extension of this problem would be to find the direction of the net force.
                </div>
            </span>
            <span v-show="level==0">
                Let's consider a conceptual application of Coulomb's Law.
                <br><br>
                <div class="problem">
                    Consider charges arranged in the diagram below. Approximately what direction is the net electric force on the purple charge, if the other two charges are kept in 
                    place? Don't worry too much about the values of the charges and the distances. Just keep the directions in mind.
                    <br><br>
                    <figure>
                        <img src="/electrostatics/ChargesProblem.png" style="max-width:1000px"/>
                    </figure>
                    <br>
                    This problem is pretty easy if you have a solid conceptual grasp on this. First, let's consider the force from the blue charge. Since it is the opposite sign 
                    of the purple charge, the force will be <b>attractive</b>. Conversely, because the red charge is positive, it will <b>repel</b> the purple charge. This means that the 
                    force from the blue charge $F_B$ is up and to the left, while the force from the red charge $F_R$ is down and to the left. However, just knowing this information is not enough, because the magnitudes of the 
                    forces matter as well.
                    <br><br>
                    From the graph, we can see that $L_1$ is significantly less than $L_2$. Since Coulomb's Law is an inverse square relationship, this means $F_R$ is much greater than 
                    $F_B$. This tells us that the downward component from $F_R$ is definitely larger than the upward component of $F_B$, meaning that the net force in the y-direction is 
                    downwards. In the x-direction, the net force is to the left because both charges exert a force pointing left.
                    <br><br>
                    Therefore, we conclude that the net force is down and to the left.
                </div>
            </span>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr; Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next &rarr;</button>
            </div>
        </div>

        <div v-show="page===2">
            <h4 class="text-center">Shell Theorem</h4>
            Remember the shell theorem from gravitation? Well, it should not be a surprise to hear that it applies to electric forces as well, considering how 
            similar the formulas are. The forms of the shell theorem are basically identical here, with only one little nuance.
            <br><br>
            First, let's just restate the parts of the shell theorem.
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <b>The Shell Theorem, Part One:</b>
                <br><i>A shell of charge can be treated as having all of its charge concentrated at the center.
                </i>
            </div>
            <br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <b>The Shell Theorem, Part Two:</b>
                <br><i>The force on any charged particle inside a shell of charge is zero.
                </i>
            </div>
            <br>
            Technically, this is all there is to it. However, we need to consider the differences between insulators and conductors. Let me pose it as a question. Would there be any force on a 
            charged particle embedded inside a uniform conducting sphere with some net charge? Think about it carefully.
            <br><br>
            The answer is no, because the charge on a conductor essentially forms a shell. Remember before that we said charge on a conductor only distributes itself over the surface of the 
            conductor. Therefore, the solid conductor basically acts like a shell of charge! For an insulator, things are different because you can have charge uniformly distributed over the entire 
            volume of the insulator.
            <br><br>
            That's all for Coulomb's Law! This might be shaping up to be very similar to gravitation, but I promise you there is a lot more nuance coming. Next, we're going to talk about 
            the electric field, which is not as simple here as the gravitational field was!
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr; Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/electricityAndMagnetism/electrostatics/electric-fields">Next Lesson! &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Coulomb's Law Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number, $event)" style="height:fit-content"
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
