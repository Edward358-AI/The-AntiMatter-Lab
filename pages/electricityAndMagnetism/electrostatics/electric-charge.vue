  <script setup>
useHead({
    title: 'Electric Charge',
    meta: [
        { name: 'description', content: 'Learn about electric charge, its properties, and fundamental principles of electrostatics.' }
    ]
})

import { reactive, watch } from 'vue'
import { useUserStore } from '../../../stores/user'
import { useLessonShowingStore } from '../../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).ElectricCharge

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
        <h1>Electric Charge</h1><br>
        <p>
        <div v-show="page===0">
            <h4 class="text-center">Introduction</h4>
            We're officially done with mechanics (well, that is assuming that you did everything in order). Now, we're diving into the wild world of electricity and magnetism.
            A fair word of warning here: this topic is much less intuitive than mechanics, because it's not possible to visualize many of the effects we talk about in this 
            section. Nevertheless, this is a fundamental topic in physics and one that is very crucial to understand if you have a geunine interest in physics.
            <br><br>
            <h4 class="text-center">Definition</h4>
            <span v-show="level>0">
                First, we'll start with defining the most fundamental part of electricity: electric charge. It is something that is very hard to visualize, much like mass. However, 
                unlike mass, which we can "feel" through the weight of objects, there is no way for us to "feel" electric charge (unless you count getting electrocuted). Much like mass, it 
                is a fundamental physical property of matter.
                <br><br>
                As a fundamental quantity, charge is always conserved. Like energy,  we can say that charge can never be created or destroyed, in a law we call the <b>conservation of electric charge</b>.
            </span>
            <span v-show="level==0">
                The first thing we need to know is that electricity and magnetism deals with something called <b>electric charge</b>. It's hard to pin a definition on what it is, but I 
                assume that you've had some exposure to it before. It is fundamental, and can never be created or destroyed. Thus, we can write the <b>law of conservation of electric charge</b>.
            </span>
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <b>The Law of Conservation of Electric Charge:</b>
                <br><i>Electric charge can never be created or destroyed.
                </i>
            </div>
            <br>
            This is an extremely simple definition, but it catches the essence of the concept pretty well. As you're probably aware, electric charge 
            has a few nuances to it. You've probably heard of positive and negative charge. Well, those are the two kinds of electric charge, and the sign of the  
            charge determines the behavior of the charged particles.
            <br><br>
            <figure>
                    <img src="/electrostatics/Figure 114.png" />
                    <figcaption>Figure 1: The two types of electric charge.</figcaption>
                </figure>
            <span v-show="level>0">
                Mass only has one sign (as far as we're concerned): positive. Under gravitation, objects with mass interact through attraction; however, electric charge 
                has slightly different behavior. Charges of the same sign will <b>repel</b> each other, and charges of opposite signs will <b>attract</b>. You have probably 
                heard of this rule before, and it is referenced in the adage "opposite attract". This might seem like an extremely simple statement, but it is very helpful when 
                you are analyzing other concepts.
            </span>
            <span v-show="level==0">
                I'm going to say something that you've probably heard in your elementary school classes: Like charges repel, and opposite charges attract. It is really that simple. Keep this in mind, because it is 
                very useful conceptually. It's not exactly the hardest thing in the world, but it does matter.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next &rarr;</button>
            </div>
        </div>

        <div v-show="page===1">
            <h4 class="text-center">Insulators and Conductors</h4>
            Before we talk about charge any further, we have to talk very briefly about material science. There are two main kinds of materials 
            that we talk about in electricity and magnetism: conductors and insulators. They are classified based on how easily charge can move around 
            within them.
            <br><br>
            A <b>conductor</b> is a material that allows the charges within it (these are the electrons of the material) to move around 
            completely freely. These materials are usually used in wires in order to transfer electric current, but that's a discussion topic 
            for later. The key characteristic that you need to know for now is that conductors allow charge to move and distribute freely. We will 
            talk more about what this means later.
            <br><br>
            An <b>insulator</b> is a material that holds on to its electrons more tightly. The electrons can still move around to some extent, but they 
            are heavily restricted in their movement when compared to conductors. The main thing to know for now is that insulators do not let 
            charge move around freely within them.
            <br><br>
            Here's a very short table listing typical conductors and insulators. This is by no means comprehensive, but should give you a good idea of what is a
            conductor and what is an insulator. As a general rule of thumb, if a problem mentions metals, you can assume that it is talking about conductors, and if it mentions
            things like rubber, you can assume that it is talking about an insulator.
            <br><br>
               <table style="
                        text-align: center;
                        outline: 4px solid #ccc;
                        border-radius: 8px;
                        background: #000;
                        margin: auto;
                        padding: 20px;
                        color: #fff;
                        border-collapse: separate;
                        border-spacing: 8px;
                        font-size: 1.1rem;
                        ">
                    <tr>
                        <th style="text-decoration:underline">Conductor</th>
                        <th style="text-decoration:underline">Insulator</th>
                    </tr>
                    <tr>
                        <td>Copper</td>
                        <td>Rubber</td>
                    </tr>
                    <tr>
                        <td>Aluminum</td>
                        <td>Glass</td>
                    </tr>
                    <tr>
                        <td>Gold</td>
                        <td>Oil</td>
                    </tr>
                    <tr>
                        <td>Salt Water</td>
                        <td>Paper</td>
                    </tr>
                    <tr>
                        <td>Graphite</td>
                        <td>Diamond</td>
                    </tr>
               </table>
            <br><br>
            <h4 class="text-center">Charging</h4>
            If you remember from chemistry, all objects theoretically have equal numbers of protons and electrons, so they have zero <b>net charge</b>. Net charge is 
            simply the sum of all the charges on an object. Charging is the process of giving objects a net electric charge. There are two primary methods of charging:
            by conduction or by induction.
            <br><br>
            <span v-show="level>0">
                Charging by conduction is exactly what it sounds like: charging objects by contact. This is the more familiar of the two types of 
                charging, and the more intuitive one. There are actually two sub-categories to this, involving conductors and insulators. Charging a 
                conductor is simple: you just bring another charged object in contact with it, and some of the charge is transferred to the conductor.
                <br><br>
                Charging an insulator is slightly more complex. You can rub two insulating materials, like rubber and fabric, against each other to separate 
                charges  by friction. In the case of a rubber rod rubbed onto a piece of fabric, the rubber gains a negative net charge and the fabric loses electrons 
                to gain a positive net charge. This works with electically neutral conductors  as well, so you can rub a steel rod on fabric for a similar effect.
                The exact hierarchy for what material will gain electrons depends on something called the <b>triboelectric 
                    series
                </b>, a list of materials from most negative (likely to gain electrons) to most positive (likely to give electrons).
                <br><br>
                <br>
               <h4 class="text-center">Triboelectric Series</h4>
               <table style="
                        outline: 4px solid #ccc;
                        border-radius: 8px;
                        background: #000;
                        margin: auto;
                        padding: 20px;
                        color: #fff;
                        border-collapse: separate;
                        border-spacing: 8px;
                        font-size: 1.1rem;
                        ">
                    <thead>
                        <tr>
                            <th style="padding: 12px 16px;">Material (Positive to negative)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Glass</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Wool</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Silk</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Paper</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Cotton</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Rubber</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">Teflon</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                This is by no means a comprehensive table, and it isn't mentioned very much. However, it's pretty interesting and relevant, so I decided to include it.
            </span>
            <span v-show="level==0">
                Charging by conduction just involves direct contact. It should be the simpler of the two kinds, though it still depends on the kind of material in use. Normally, if we have just 
                a conductor, we can touch a charged object to it and some of the charge will transfer over. However, we can actually use friction to separate charges from two object, giving both of them 
                a net charge. For instance, if we rub a rubber rob on a piece of fabric, the rod will gain a net negative charge and the fabric a net positive charge. There is more nuance to this, but 
                this is enough information for a conceptual level.
            </span>
            <br><br>
            The next concept of charging by induction is much more complex, so we will talk about it on the next page.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr; Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next &rarr;</button>
            </div>
        </div>
        <div v-show="page===2">
            <h4 class="text-center">Charging by Induction</h4>
            Charging by induction is a kind of charging that <b>doesn't</b> involve direct contact. That sounds odd and unintuitive, but I promise you when
            I explain it will make a lot more sense. However, in order to explain this concept, we need to explain the idea of an electrical ground.
            <br><br>
            <span v-show="level>0">
                The electrical ground is a hypothetical charge sink that can take in an infinte amount of charge and essentially distribute it such that it has no effect. In practice, nothing can take 
                an infinite amount of charge, but we consider the Earth to be so large that it is can take in any amount of charge we redirect into it. (Hence the name.)
            </span>
            <span v-show='level==0'>
                An electrical ground is basically a place that can soak up a lot of charge. In practice, we consider the Earth as our ground, hence the name.
            </span>
            <br><br>
            The process of charging by induction involves several steps. First, we take a neutral conducting object and a charged rod. We want to bring the charged rod close 
            to the conducting object, which has the effect of causing the charges to separate. For simplicity, let's just say that the rod has a positive charge. Since the charges 
            on the conductor can move freely, we will see electrons tend to flow to the side closer to the positive charge because of electrostatic attraction. This leads to half of the object being 
            negative, and the other half being positive. We call this <b>polarization</b>, but the net charge is still zero.
            <br><br>
            Our next step is to connect the conductor to the ground while keeping the rod close. This allows more electrons to come up from the ground, which basically eliminates the net positive charge of the 
            side of the object that was further from the rod. We then disconnect the ground and take the rod away, leaving a net negative charge on the conductor. We've just charged an object 
            without contacting it! That's the essence of charging by induction.
            <br><br>
            Here's a diagram that basically summarizes what I was saying:
            <br><br>
            <figure>
                <img src="/electrostatics/Figure 115.png" style='max-width: 750px;'/>
                <figcaption>Figure 2: The process of charging by induction.</figcaption>
            </figure>
            <br>
            We need to keep in mind that charging by induction only works with conductors. Since insulators don't let charge flow freely, the charges can't separate in the first place, making this 
            process impossible. Additionally, note that the final charge on the object is opposite to the charge of the rod. If we had a negative rod, the object would end up with a net positive charge.
            Just visualize the process again in your head and it should make sense.
            <br><br>
            With that, let's consider a problem that involves the idea of charging by conduction. I hope you've been paying attention, because this is a bit more complex than the 
            basic example I gave earlier but works on the same principle.
            <br><br>
            <div class="problem">
                Two metal spheres are placed on pedestals and put into contact with each other. A negatively charged rod is brought near the left sphere, and the spheres are separated <b>while the rod is 
                    held in place
                </b>. Then, the rod is removed. What are the signs of the charge on each sphere?
                <br><br>
                We want to think about this in the same way. When we bring the rod close, the charges separate. However, in this case, the two spheres are in contact, so the charges can move between them. The negatively-charged 
                electrons are repelled by the rod, which causes them to move to the other sphere. This means that the polarization isn't even across each sphere, so when we separate them the sphere on the left 
                will have a net positive charge, while the sphere on the right will have a net negative charge.
            </div>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr; Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next &rarr;</button>
            </div>
            
        </div>
        <div v-show="page===3">
            <h4 class="text-center">The Fundamental Charge</h4>
            Charge is actually not infinitely divisible. There is a <b>fundamental charge</b> that every other charge has to be a multiple of. This just so happens to be 
            equal to the charge of an electron or proton, and we call it $e$.
            <br><br>
            $$ e = 1.602 \times 10^{-19}~\textrm{C} $$
            <br><br>
            The unit of charge there is called the coulomb, named after Charles-Augustin de Coulomb who studied electric forces. One coulomb of charge is a very large amount, so 
            we usually deal with microcoulombs or nanocoulombs. On the topic of the fundamental charge again, every possible charge has to be an integer mutliple of this 
            fundamental charge.
            <br><br>
            
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr; Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/electricityAndMagnetism/electrostatics/coulombs-law">Next Unit! &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Electric Charge Problems</h1><br>
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
