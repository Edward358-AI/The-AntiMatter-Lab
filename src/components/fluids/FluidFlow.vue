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
        <h1>Fluid Flow</h1><br>
        <p>
            <div v-show="page===0">
                How exactly does fluid flow through a pipe? Well, there's actually a lot of different ways it can do so, but 
                some things must remain constant for all fluid flow. Here, we will only look at fluid that goes through a pipe 
                or other container. This means we don't consider things such as the wind.
                <br><br>
                <span v-show="level>0">
                    We are not going to consider just any type of fluid flow, however. You definitely know what turbulence is, and you 
                    know how chaotic it is. Well, flow can very easily be chaotic, as can be evidenced by turbulent flow in rivers. 
                    Whorls and eddies can form quite easily if the terrain is uneven, and these are a nightmare to deal with. In fact, they are 
                    also a chaotic system that has no definite solution.
                    <br><br>
                    The workaround to this is, well, there is none. However, there exists a type of flow that is much easier to deal with and is 
                    linear. This kind of flow involves the water moving smoothly throughout the pipe in parallel layers that do not disturb each other. 
                    We call this <b>laminar flow</b> and it is the easiest kind of water flow to deal with, albeit a bit unrealistic due to turbulence being 
                    a major factor in real-life fluid flow.
                    <br><br>
                    <figure>
                        <img src="/src/assets/fluids/Figure 109.png"/>
                        <figcaption>Figure 1: Smooth, smooth flow.</figcaption>
                    </figure>
                    <br>
                    Unless I say otherwise, you can always assume that we are talking about laminar flow. Some of the results that apply to laminar 
                    flow do not apply to fluid flow in general, so I'll be sure to point that out whenever it comes up. Many of the results are 
                    generalizations of the Navier-Stokes Equations to smooth laminar flow.
                    <br><br>
                </span>
                <span v-show="level==0">
                    Obviously, we want to simplify things as much as possible here, so we're not going to deal with any turbulence in the flow. That is way 
                    beyond the scope of our analysis because of how chaotic it is. Instead, we're going to limit our analysis to the case where the flow is 
                    smooth and linear. This is what we call <b>laminar flow</b>.
                    <br><br>
                    <figure>
                        <img src="/src/assets/fluids/Figure 109.png"/>
                        <figcaption>Figure 1: Smooth, smooth flow.</figcaption>
                    </figure>
                    <br>
                </span>
                Another thing to note is that if I say there's fluid in a pipe, you can assume that the fluid fills the entire pipe unless I specifically state
                otherwise. This is more of a housekeeping thing than something of conceptual and calculational importance, but it isn't always immediately obvious.
                <div class="btn-contain-right">
                    <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
                What exactly causes fluid flow? Well, fluids are really just collections of many small particles each obeying Newton's Laws, and what causes particles to 
                move according to Newton is a net force. Fluid flow, therefore, is caused by a pressure difference.
                <br><br>
                That is a very simplified view of things, however. Newton's Laws more specifically state that the net force causes things to accelerate, meaning the liquid 
                could remain at constant velocity when there is no pressure difference. The reason why we need to constantly pump liquid to keep it moving 
                in the real world is because real liquids have viscosity that dissipates energy and reduces the flow speed. What the pressure difference really does is cause
                the flow speed to change.
                <br><br>
                However, the flow speed can't just do whatever it wants. It's time to invoke the conservation of mass, which I'm guessing you're familiar with. In any 
                case, it states that mass cannot be created or destroyed <span v-show="level>0">(not easily, at least)</span>.
                <br><br>
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>The Law of Conservation of Mass</strong>: <i>In most cases, the total amount of mass in a system remains constant.</i>
            </div>
            <br><br>
            <span v-show="level>0">
                The caveat at the end is there because mass <b>can</b> be created and destroyed. Mass is actually equivalent to energy according to the Einstein 
                relation $E = mc^2$, and energy can be used to create mass and vice versa. It's much more complicated than that, but delving deep into this is an 
                adventure for another day. (We're bordering on my (Eric's) favorite topic!)
                <br><br>
            </span>
            What does this have to do with fluid flow? Well, the mass in the fluid pipe has to remain constant. The amount that enters has to equal the amount 
            that leaves. More specifically, the <b>rate</b> that fluid enters has to be the same as the <b>rate</b> that fluid leaves. For an incompressible liquid, this 
            means we only have to deal with the volumes of fluid entering and leaving, since we don't need to worry about changes in the fluid density.
            <br><br>
            <span v-show="level>0">
                The volumetric rate of flow of liquid into an area can be described by the cross-sectional area of the pipe $A$ and the velocity of 
                flow $v$. The units should be $\textrm{m}^3 / \textrm{s}$ or just volume per unit time, so we can use dimensional analysis to verify our 
                result. First, we'll assume constant velocity of flow. This means that the volume that flows in in a time $t$ is:
                <br><br>
                $$ V = Ax $$
                <br>
                Here, $x$ is the displacement of the fluid, which is described by $x = vt$.
                <br><br>
                $$ V = A(vt)$$
                $$ \dfrac{V}{t} = Av $$
                <br>
                This is how much volume of fluid flows through a cross-sectional area of a pipe per unit time.
                <span v-show="level==2">
                    We can get to this same result with relatively more ease using calculus, by simply differentiating the first equation 
                    with respect to time.
                    <br><br>
                    $$ \dfrac{dV}{dt} = Av$$
                    <br>
                </span>
            </span>
            <span v-show="level==0">
                The rate that volumes of liquid flow into a slice of the pipe can be given by a relatively simple equation.
                <br><br>
                $$ \dfrac{V}{t} = Av$$
                <br>
                In the equation $A$ is the cross-sectional area of the pipe at any location, and $v$ is the flow speed at that location. The reasoning 
                for this is relatively simple. If we cross-multiply, we can see that the equation becomes:
                <br><br>
                $$ V = Avt $$
                <br>
                We can then see that $vt = x$, where $x$ is the displacement of the fluid.
                <br><br>
                $$ V = Ax $$
                <br>
                This is a typical volume formula in the form of area times height.
            </span>
            <br>
            The volume flow rate must be the same at any two points on the same pipe, leading us to an important relation. This has to be true for any general 
            scenario, not just for laminar flow. Conservation of mass is a <b>very</b> fundamental law, and is actually one of the Navier-Stokes Equations. Let's say the pipe has and 
            area $A_1$ and a flow rate $v_1$ at one point, and an area $A_2$ and flow rate $v_2$ at another. Then, we have the relationship:
            <br><br>
            $$ A_1 v_1 = A_2 v_2 $$
            <br>
            This isn't groundbreaking by itself, but trust me, this is an important equation. You will be using it more frequently in the next lesson.
            <span v-show="level==0">Since this is suppoed to be conceptual, I won't test you on this just now, but you still need to remember it nevertheless! <br><br></span>
            <span v-show="level>0">
                We are still going to go over a practice problem regardless, to strengthen your hold on this new concept.
                <br><br>
                <div class="problem">
                    A fluid flows through a pipe that slowly narrows from a radius of $r_1 = 0.5~\textrm{m}$ to a radius of $r_2 = 0.1~\textrm{m}$. If the fluid leaves the pipe 
                    at a velocity of $v_2 = 3.5~\textrm{m/s}$, how fast must the fluid be entering the pipe?
                    <br><br>
                    We can just directly apply the formula that we were previously given, remembering that the area of a circle is $A = \pi r^2$. (We know it's a circular pipe 
                    because radius was specified. We don't usually talk about radius of other shapes, so...)
                    <br><br>
                    $$ A_1 v_1 = A_2 v_2 $$
                    $$ \pi {r_1}^2 v_1 = \pi {r_2}^2v_2 $$
                    $$ v_1 = \dfrac{r_2}{r_1}^2 v_2 $$
                    <br>
                    Now, we just want to plug in numbers to get our final answer.
                    <br><br>
                    $$ v_1 = \bbox[3px,
                border: 0.5px solid
                white] { 0.14 ~\textrm{m/s} } $$
                </div>
                <br>
            </span>
            Now that we know the basic, fundamental rules behind fluid flow (these apply to all kinds of fluid flow, not just 
            laminar flow) we can talk about more complicated results. If you're ready to tackle Bernoulli's principle, which is what keeps 
            planes in the air, move on to the next lesson!
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
        <h1>Properties of Fluids Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto px-5 pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
                </div>
                <div class="col border-end border-secondary">
                    <div class="ms-auto" style="width:fit-content">
                        <div class="form-check" style="width:fit-content;" v-for="(a, index) in q.answers">
                            <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'"
                                :checked="a[2]" @click="setChecked(index, q.number)">
                            <label class="form-check-label" style="font-size:0.96rem">
                                {{ a[0] }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col d-flex flex-column text-start">
                    <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                        :value="results[level][q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                    <div class="me-auto my-auto" v-show="results[level][q.number] !== 0">{{ results[level][q.number]
                        === 1 ?
                        "&#x2705; Correct!" : "&#x274c; Not quite! Try again." }}
                    </div>
                    <a href="javascript:void(0)" v-show="results[level][q.number] !== 0" class="me-auto mb-auto ms-1"
                        @click="explanations[level][q.number] = !explanations[level][q.number]">{{
                            !explanations[level][q.number] ? "Want to see an explanation? " : "Hide explanation" }}</a>
                </div>
                <span class="explained mt-3" v-show="explanations[level][q.number]">{{ q.explain }}</span>
            </form>

        </div>
    </div>
</template>