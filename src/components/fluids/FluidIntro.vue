<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
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
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
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
        <h1>Properties of Fluids</h1><br>
        <p>
        <div v-show="page===0">
            What exactly is a fluid? Well, we typically think of fluids as liquids. Take, for example, lighter fluid. It's usually some kind of 
            oil, which is obviously a liquid. While we will mainly be talking about liquids in this fluids unit, technically gases like air are 
            also kinds of fluids that obey many of the same laws as liquids. 
            <br><br>
            The Oxford Dictionary defines "fluid" as <i>a substance that has no fixed shape and yields easily to external pressure; a gas or (especially) a liquid.</i>
            This is the key characteristic of a fluid: it has no fixed shape, which is what allows it to "flow". We often think and speak of flowing water, but if you 
            think about it wind currents are just "flowing" air. There are differences between gases and liquids, however.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 103.png"/>
                <figcaption>Figure 1: A fluid inside a container, which sits inside another much larger body of fluid (the atmosphere).</figcaption>
            </figure>
            <br>
            <span v-show="level>0">
                If you have chemistry knowledge, you can probably skip over this part. Liquids are what we call <b>incompressible</b>, meaning their volume does not change 
                if you exert forces on them. If you push on water, it might deform and move, but the total volume of water cannot change very much. Liquids do have what we 
                call a <b>bulk modulus</b>, which is a physical property of the object that relates the change in the pressure of the liquid to the fractional change of its 
                volume. 
                <br><br>
                $$ B =\dfrac{\Delta P}{\Delta V/ V} $$
                <br>
                This concept isn't crucial and won't be explored in depth here, but you should just know that it exists. I also mentioned pressure in here, which we haven't 
                gone over formally. I think you should have a basic idea of what that is just from daily life, however.
                <br><br>
                Gases are also fluids, but unlike liquids they can be compressed. Most gases will compress relatively easily if you press on them, which makes some of the 
                fluid laws that work on liquids not apply to gases due to this. For the most part, however, the laws we talk about here will apply to all fluids.
            </span>
            <span v-show="level==0">
                The main difference is that liquids cannot change their volume but can change their shape, while gases can change both their volume and shape. The exact 
                term for liquids being unable to be compressed is well, that liquids are <b>incompressible</b>. This doesn't have 
                a massive effect on most of what we're going to talk about in this unit, but there are a few key counterexamples that I'll specify once we get there.
            </span>
            <br><br>
            Fluids can be thought of as a collection of a large number of individual point masses. <span v-show="level>0">These are actually just 
                approximations for the molecules that make up the fluid.
            </span> Each individual molecule interacts in accordance to the physical laws we've learned before with the particles around it, kind of 
            like a "soup" of tiny, individual objects. This is the reason why fluids can change shape: they are made up of small parts that can rearrange 
            themselves, giving the entire fluid a different shape. 
            <br><br>
            Of course, the real picture for fluids is very different, because the fluid is made up of atoms and molecules. For the most part, this model 
            gets things right, but analysis of real fluids is much more complex than this. Moreover, it is impossible to use Newton's Laws on each individual atom 
            in a fluid, because that would be ridiculously difficult and resource-intensive. Instead, we analyze the fluid as a whole, using different 
            laws.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page===1">
            The <b>density</b> of a fluid is an important factor in many calculations and laws involving them. Density isn't just restricted to fluids, but 
            rather can be applied to anything with mass and volume. It describes how much mass per unit volume an object contains, and is an intrinsic measure 
            of the object. Of course, the density of gases can change as they compress and expand, so it's not constant for those.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 104.png" style="max-width:700px"/>
                <figcaption>Figure 2: A dense person and a dense object.</figcaption>
            </figure>
            <br>
            The density of a material can be measured by dividing the mass of the material by its volume, in a relatively simple calculation.
            <br><br>
            $$ \rho = \dfrac{M}{V} $$
            <br>
            The letter that kind of looks like a $p$ is the lowercase Greek letter rho, and it represents density. This measure is very useful in dealing with fluids, because it is analogous to 
            their mass. We don't always know how much fluid we have, and in some cases like water flowing through a pipe the amount we deal with might basically be 
            infinite. Therefore, we use the fluid's density to characterize it.
            <br><br>
            Now, we should talk about the concept of the <b>ideal fluid</b>. The ideal fluid is simply one that is incompressible and flows freely without 
            any internal resistance. Because it is incompressible, the density of such a fluid remains constant, making our mathematical lives much easier.
            Unless otherwise specified, the fluids we deal with are always going to be ideal. 
            <br><br>
            <span v-show="level>0">
                The more precise definition for an ideal fluid is that it is incompressible and has no <b>viscosity</b>. Viscosity is a measure of how much 
                resistance there is to flow within a liquid. Fluids like water have very low viscosity and can be approximated as an ideal fluid, but something like 
                honey or crude oil flows very slowly and has a high viscosity. We aren't going to discuss how to deal with viscous liquids, though it is possible.
                <br><br>
                There is actually a variable for viscosity, and it is represented with the letter $\eta$. We won't be dealing with it here because it is outside the scope 
                of this lesson, however. It does come up quite frequently in advanced fluid flow, and it exists in the real world, so I think it's worth mentioning.
                <br><br>
            </span>
            The laws we are going to present in the following lessons will only apply for the ideal fluid, and they are generalizations of a more 
            general set of equations that governs fluid flow in general, called the <b>Navier-Stokes Equatiions</b>. I don't reccomend trying to understand them at this 
            point, because they contain pretty complicated calculus and actually have not been proven to have a general solution yet.
            <br><br>
            Let's wrap this lesson up with a quick practice problem to exercise our density calculations skills.
            <br><br>
            <div class="problem">
                A glass is placed on a tared scale. The scale is tared to initially read $0.00 ~\textrm{kg}$. When the glass is filled with 
                a mystery liquid, the scale reads $0.50 ~\textrm{kg}$. The glass has a volume of $250 ~\textrm{cm}^3$. What is the density of the liquid?
                <br><br>
                We want to first convert the volume into SI units, which involves converting it into cubic meters rather than cubic centimeters. Since the unit is 
                cubed, the conversion factor must be cubed as well. (This is a very common mistake that many people make.)
                <br><br>
                $$ 250 ~\textrm{cm}^3 = 250 \times 10^{-6} ~\textrm{m}^3 $$
                <br>
                Now that we have everything in the proper SI units, we can plug in the values into the density equation.
                <br><br>
                $$ \rho = \dfrac{M}{V} = \bbox[3px,
                border: 0.5px solid
                white]{2000 ~\textrm{kg/m}^3 }$$
            </div>
            <br>
            This ends our very short introduction to fluids. In our next lesson, we will start talking about the crucial concept of pressure, which is 
            analogous to force but for fluids, much like density was analogous to mass. If you're ready to explore the roaring world of fluids, click the button below and let 
            the new information cascade over you. (No more puns for this unit...probably.)
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next Lesson!
                    &rarr;</button>
            </div>
        </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Fluid Flow Problems</h1><br>
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