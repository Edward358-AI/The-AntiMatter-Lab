<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([0]) // update as add more questions
const questions = reactive(
    [
        {
            number: 0,
            question: "What is the proper format for a vector in component form?",
            answers: [
                ["$\\{3, 5\\}$", 0],
                ["$\\langle 3, 5 \\rangle$", 1],
                ["$(3, 5)$", 0],
                ["$[3, 5]$", 0]
            ]
        }
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[form] = 1
    else results[form] = -1
}

// remove progress on lesson change
watch(() => props.lessonShowing, () => {
    for (let i = 0; i < results.length; i++) {
        results[i] = 0
        if (props.lessonShowing == true) document.querySelectorAll(".question")[i].reset()
    }

})
import {onMounted, onUnmounted, ref} from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Mouse, Constraint, MouseConstraint} from 'matter-js'
const viewportMsg = ref('')
const redMass = ref(10)
const blueMass = ref(10)

let ball1, ball2
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null


function runDoublePendulum() {
    // Clean up previous engine if it exists
    if (currentEngine) {
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
            currentRender = null
        }
        Engine.clear(currentEngine)
        currentEngine = null
        currentRunner = null
    }

    if (window.innerWidth < 1000) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }
    document.getElementById("doublependulum").innerHTML = ""
    // create engine
    var engine = Engine.create()
    currentEngine = engine // Store reference for cleanup
    engine.gravity.y = 5

    var width = 0.5 * window.innerWidth > 800 ? 700 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 0.8 * width
    // create renderer
    var render = Render.create({
        element: document.getElementById("doublependulum"),
        engine: engine,
        options: {
            width: width,
            height: height,
            showVelocity: false,
            wireframes: false,
            background: "#000"
        }
    })
    Render.run(render)

    ball1 = Bodies.circle(0.5 * width, 0.5 * height, 0.05 * width, {
        render: {fillStyle: 'cyan'},
        frictionAir: 0,
        friction: 0,
        mass: blueMass.value
    })

    ball2 = Bodies.circle(0.5 * width, 0.8 * height, 0.05 * width, {
        render: {fillStyle: 'red'},
        frictionAir: 0,
        friction: 0,
        mass: redMass.value
    })

    var constraint1 = Constraint.create({
        bodyA: ball1,
        pointB: { x: 0.5* width, y: 0.2 * height},
        length: 0.3 * height,
        damping: 0,
        stiffness: 1,
                render: {
            lineWidth: 0.006 * width,
            strokeStyle: '#fff'
        }
    })

    var constraint2 = Constraint.create({
        bodyA: ball1,
        bodyB: ball2,
        length: 0.3 * height,
        damping: 0,
        stiffness: 1,
                render: {
            lineWidth: 0.006 * width,
            strokeStyle: '#fff'
        }
    })

    engine.constraintIterations = 10

    Composite.add(engine.world, [ball1, ball2, constraint1, constraint2])

// create runner
    var runner = Runner.create()
    Runner.run(runner, engine)

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        })

    Composite.add(engine.world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse
}

onMounted(() => {
    runDoublePendulum()
})

watch(blueMass, (newVal) => {
    if (ball1) {
        Body.setMass(ball1, Math.abs(newVal))
        Body.set(ball1, { isSleeping: false })
    }
})

watch(redMass, (newVal) => {
    if (ball2) {
        Body.setMass(ball2, Math.abs(newVal))
        Body.set(ball2, { isSleeping: false })
    }
})
</script>

<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Other Oscillators</h1><br>
        <p>
            <div v-show="page===0">
                The most common examples of SHM are the pendulums and spring-block oscillators, but there are others that lurk in the
                shadows, undiscussed but still important. The one that is most different from the two we've already talked about yet
                is still able to be analyzed easily is the <b>torsional pendulum</b>. This is a disk or other rigid object connected to a
                cable which exerts torque whenever it is twisted.
                <br><br>
                These torsion cables act like the rotational analogue of springs, following a relation that looks very much like Hooke's law
                but for torque. They relate torque to angular displacement from equilibrium and have a torsional strength instead of a
                spring strength.
                <br><br>
                $$ \tau = - \kappa \theta $$
                <br>
                The fancy-looking letter $\kappa$ is the Greek letter kappa, and it is the torsional strength <span v-show='level>0'>(measured in $\textrm{N} \cdot \textrm{m/rad} $)</span>. This simple harmonic oscillator system is very similar to the spring-block
                system, and can be treated similarly. We attach an object with a moment of inertia of $I$ to the cable, then give it some initial angular
                twist $\theta_0$.
                <br><br>
                $$ I \alpha = - \kappa \theta $$
                $$ \alpha = -\dfrac{\kappa}{I} \theta $$
                <br>
                This relates the angular acceleration and the angular position and follows the $\alpha = - \omega^2 \theta$ form that characterizes SHM, so
                we can conclude that the angular frequency of oscillation of the torsional pendulum is:
                <br><br>
                $$ \omega = \sqrt{\dfrac{\kappa}{I} } $$
                <br>
                I'm sure at this point you're tired of me stating the period and frequency, but here they are anyway.
                <br><br>
                $$ T = 2\pi \sqrt{\dfrac{I}{\kappa}} $$
                $$ f = \dfrac{1}{2\pi} \sqrt{\dfrac{\kappa}{I}} $$
                <br>
                <span v-show="level>0">
                    Not all materials have torsional qualities. If you've ever twisted a yoyo around a string, you'll see that it tries to spin
                    itself back around, but it doesn't do so very successfully. Typically, tougher objects like steel cable have better torsional 
                    strengths. There is actually a way to find the torsional strength of a material, but this is beyond what I want to talk about here 
                    and ventures into the realm of engineering.
                    <br><br>
                </span>
                Here's what a torsional pendulum actually looks like.
                <br><br>
                <figure>
                    <img src="/src/assets/oscillations/Figure 101.png"/>
                    <figcaption>Figure 1: The torsional pendulum.</figcaption>
                </figure>
                <br>
                The steel cable will attempt to twist the disk back to the starting equilibrium.
                <div class="btn-contain-right">
                    <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
                Simple harmonic motion forms the basis for many kinds of waves as well. We will not be talking too much in depth about 
                these today because they are a spearate topic, but if you've ever seen waves on a string you will know that they make a 
                sort of sinusoidal pattern, which is an indicator os simple harmonic motion.
                <br><br>
                <div v-show="level==2">
                    There is a second-order differential equation called the <b>wave equation</b> which I will briefly introduce here. We'll take 
                    the example of a wave that oscillates up and down in the y-direction and moves in the x-direction. These follow the relationship:
                    <br><br>
                    $$ \dfrac{\partial^2 y}{\partial t^2} = v^2 \dfrac{\partial^2 y}{\partial x^2} $$
                    <br>
                    Don't worry about the $\partial$ symbols, they just mean "partial derivative" and are used to denote that the function $y$ depends on both $x$ and $t$.
                    It's a multivariable calculus concept and you don't need to know it for now; just think of them as ordinary derivatives. I just wanted to introduce you to 
                    this equation, because it shows you how complex physics can really get. This equation is simple by many standards as well...
                    <br><br>
                </div>
                The taut string on which the waves oscillate behave similarly to springs, exerting forces if they are stretched. Anyone who plays a stringed instrument 
                would know this. We can figure out the speed of the waves on a string, but that'll be saved for later. One key difference between the SHM we talked about 
                previously and this is that the waves actually move down the string in most cases, whereas in the other cases we talked about the objects tended to return 
                to equilibrium.
                <br><br>
                Technically, <b>nothing is moving</b> on the string, which is why we still treat this as SHM. The string itself says in place, after all. It's just that the 
                waves, which are disturbances on the string, move back and forth. When certain conditions are met <span v-show="level>0">(these are the harmonics 
                in music)</span> the waves will perfectly occupy the entire string, and the wave looks as if it were staying in place. Under these conditions, each point 
                on the string undergoes SHM.
                <br><br>
                A very similar mode of SHM is waves in a column of air. This forms the basis for many wind instruments and the organ, and they function very similarly to the 
                strings I just talked about earlier. However, instead of pieces of string moving, we have the pressure and air molecules in the tube oscillating with time 
                in a SHM-like fashion.
                <br><br>
                The final "new" kind of SHM I want to talk about here is a tuning fork. The musicians are getting all the attention this lesson!
                <br><br>
                <figure>
                    <img src="/src/assets/oscillations/Figure 102.png"/>
                    <figcaption>Figure 2: The humble tuning fork.</figcaption>
                </figure>
                It's really just waves in a solid object. The length and thickness of the prongs is made such that when hit, the tuning fork oscillates with 
                one single frequency. The arms of the fork vibrate back and forth in a simple harmonic manner, which cause sound waves to be produced in the air 
                around it. Again, we won't talk too much in depth behind this, since this isn't a unit on waves.
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>

            <div v-show="page===2">
                The last type of oscillation I want to talk about is actually not simple harmonic in nature, but far more complex. It consists of two 
                simple pendulums combined together in what is called a <b>double pendulum</b>.
                <br><br>
                <figure>
                    <h3>Double Pendulum Demo</h3>
                    <br>
                    <div id="doublependulum"></div>
                    <button class="btn btn-outline-primary" @click="runDoublePendulum()">Reset</button>
                    <div class="row justify-content-center m-auto" style="max-width:700px;">
                    <div class="col"><label> Red Ball Mass: {{ redMass }} </label><br><input type="range"
                            class="form-range" v-model="redMass" min="1.0" max="50.0" step="0.5"
                            style="width:fit-content" /></div>
                    <div class="col">
                        <label> Blue Ball Mass: {{ blueMass }} </label><br>
                        <input type="range" class="form-range" v-model="blueMass" min="1.0" max="50.0" step="0.5"
                            style="width:fit-content" />
                    </div>
                    <span class="warn">{{ viewportMsg }}</span>
                </div>
                </figure>
                <br>
                    <span v-show="level>0">
                        It is not easy to describe the motion of the double pendulum, since there are two angles: the one the first object makes with the vertical ($\theta_1$), and the one the 
                        second object makes with the vertical ($\theta_2$). The exact equations governing the motion are too complex for us to discuss here, but they involve a lot of 
                        angular speeds and angular positions. We can solve for how the pendulum will behave, but we cannot come up with a comprehensive time-dependent solution.
                        <br><br>
                        You may have noticed that for some conditions, the pendulum decided to behave oddly. With some specific initial conditions, the pendulum can act like a simple harmonic 
                        oscillator, but in the vast majority of cases it is what we call <b>chaotic</b>. This means that it is aperiodic and irregular, not having regular, repeating 
                        motion unlike the simple and physical pendulums.
                        <br><br>
                        Due to limitations with Matter.js, the double pendulum demo doesn't behave as it should, but it gets the basic idea across. The motion can 
                        vary greatly depending on the initial conditions of the system, which is a key tenet of chaotic systems. However, we aren't going to get too much into 
                        chaos theory today, since that is unrelated to SHM and oscillations.
                    </span>
                    <span v-show="level==0">
                        You might have noticed how unpredictable and chaotic the pendulum could be compared to the regular, periodic cycles of a simple pendulum. This kind of system is 
                        what we call chaotic, because it is unpredictable and doesn't repeat itself. Under some conditions, this does approximate simple harmonic motion, but for the 
                        vast majority of cases the motion is chaotic.
                        <br><br>
                        The Matter.js engine doesn't convey the full picture of the chaos, but you can get the basic idea. This isn't a type of simple harmonic motion, as you can clearly 
                        see, but it is definitely still a kind of oscillation. 
                    </span>
                    <br><br>
                    This lesson wasn't as mathematical as the others, and was really just for fun. These new kinds of oscillators can be interesting, but are not 
                    fundamental to our understanding of simple harmonic motion. Still, I hope you took something away from this somewhat unconventional lesson.
                    <br><br>
                    This also wraps up our oscillations unit, where we applied our previous skills to analyzing one specific type of motion. Hopefully, you felt confident 
                    combining your skills from all the previous units to tackle simple harmonic motion.
                                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next Unit!
                    &rarr;</button>
            </div>
            </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Other Oscillator Problems</h1><br>
        <form @submit.prevent="checkAnswer(q.number)" class="question row justify-content-center" v-for="q in questions">
            <div class="w-100">
                <label class="form-label fs-5">{{ q.number+1 + ". " + q.question }}</label><br>
            </div>
            <div class="col border-end border-secondary">
                <div class="ms-auto" style="width:fit-content">
                    <div class="form-check" style="width:fit-content;" v-for="a in q.answers">
                        <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'">
                        <label class="form-check-label">
                            {{ a[0] }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column">
                <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                    :value="results[q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                <div class="me-auto mb-auto" :style="results[q.number] === 0 ? 'display:none' : ''">{{ results[q.number] === 1 ?
                    "&#x2705; Correct!" : "&#x274c; Not quite! Try again."}}</div>
            </div>
        </form><br>

    </div>
</template>


<style scoped></style>