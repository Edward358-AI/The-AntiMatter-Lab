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
import { Engine, Render, Runner, Bodies, Composite, Mouse, Constraint, MouseConstraint} from 'matter-js'
const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const viewportMsg = ref('')
const mass = ref(25)
const gravity = ref(10)

let rod, circle, engine
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

function runPendulum() {
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
    document.getElementById("pendulum").innerHTML = ""
    // create engine
    engine = Engine.create()
    currentEngine = engine // Store reference for cleanup
    var width = 0.5 * window.innerWidth > 600 ? 1000 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 0.6 * width

    engine.gravity.y = gravity.value * width / 1000

    // create renderer
    var render = Render.create({
        element: document.getElementById("pendulum"),
        engine: engine,
        options: {
            width: width,
            height: height,
            showVelocity: false,
            wireframes: false,
            background: "#000"
        }
    })
    currentRender = render // Store reference for cleanup
    Render.run(render)

    circle = Bodies.circle(0.3 * width, 0.7 * height, 0.2 * height, {
        render: {fillStyle: 'blue'},
        mass: mass.value * width / 1000,
        frictionAir: 0,
        friction: 0
    })

    var circleConstraint = Constraint.create({
        bodyA: circle,
        pointA: { x: 0, y: - 0.2 * height },
        pointB: { x: 0.3 * width, y: 0.5 * height} ,
        length: 0,
        stiffness: 1,
        render: {
            lineWidth: 0.006 * width,
            strokeStyle: '#fff'
        }
    })

    rod = Bodies.rectangle(0.7 * width, 0.65 * height, 0.05 * width, 0.4 * height, {
        render: {fillStyle: 'red'},
        mass: mass.value * width / 1000 ,
        frictionAir: 0,
        friction: 0
    })

    var rodConstraint = Constraint.create({
        bodyA: rod,
        pointA: { x: 0, y: -0.15 * height },
        pointB: { x: 0.7 * width, y: 0.5 * height },
        length: 0,
        stiffness: 1,
                render: {
            lineWidth: 0.006 * width,
            strokeStyle: '#fff'
        }
    })

    Composite.add(engine.world, [circle, circleConstraint, rod, rodConstraint])

    // create runner
    var runner = Runner.create()
    currentRunner = runner // Store reference for cleanup
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

    engine.constraintIterations = 10

    // keep the mouse in sync with rendering
    render.mouse = mouse
}
onMounted(()=>{
    runPendulum()
})

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
        }
        Engine.clear(currentEngine)
        currentEngine = null
        currentRender = null
        currentRunner = null
    }
})

watch(gravity, (newVal) => {
    engine.gravity.y = Math.abs(newVal)
})

</script>

<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Pendulums</h1><br>
        <p>
            <div v-show="page===0">
                Do you know what a pendulum is? It's just a small object at the end of a string that oscillates back and forth due to gravity.
                As you could probably guess, this is also a sort of simple harmonic motion, though only for certain cases. The oscillatory motion of a
                pendulum is very similar to rotation, so we will be using techniques of torque rather than just force analysis.
                <br><br>
                Our first kind of pendulum is a <b>simple pendulum</b>, consisting of a small point object hung by a massless string of some length that is
                set to oscillate. As the name suggests, it is the most simple kind of pendulum we'll be talking about here.
                <br><br>
                <figure>
                    <img src="/src/assets/oscillations/Figure 98.png"/>
                    <figcaption>Figure 1: The existence of a simple pendulum implies the existence of a complex pendulum.</figcaption>
                </figure>
                <br>
                <span v-show="level>0">
                    The simple pendulum can be analyzed using forces. At each point in the pendulum's motion, the string will make some angle $\theta$
                    with the vertical. Gravity is the only force that causes a torque about the pivot point in the ceiling and causes the bob to rotate, so
                    we can figure out the torque due to gravity in terms of the bob's mass $m$, the angle $\theta$ and the string length $L$. Only the perpendicular component
                    causes a torque.
                    <br><br>
                    $$ \tau = - mg \sin \theta L $$
                    $$ mL^2 \alpha = - mg \sin \theta L $$
                    $$ \alpha = - \dfrac{g}{L} \sin \theta $$
                    <br>
                    We have angular acceleration related to angular position, but it's not in the exact form $\alpha = - \omega ^2 \theta $ needed
                    for simple harmonic motion. We next want to use an approximation technique, where we can approximate $\sin \theta \approx \theta $ for
                    small angles, typically angles less than $15 \degree$. <span v-show="level==2">If you've noticed, we are actually just taking the first term in the Taylor
                        expansion for $\sin \theta$ as an approximation.
                    </span>
                    <br><br>
                    What this means is that the pendulum is actually <b>not</b> perfectly simple harmonic in nature, but rather can deviate quite a bit from traditional simple harmonic motion if
                    the angles are large! Most of the time, we will deal with small angles, so the motion is very close to simple harmonic in nature and is just 
                    approximated as simple harmonic. After we do the approximation, we are left with the new equation:
                    <br><br>
                    $$ \alpha = - \dfrac{g}{L} \theta $$
                    <br>
                    From this, we can conclude that:
                    <br><br>
                    $$ \omega = \sqrt{\dfrac{g}{L} } $$
                    <br>
                    This result holds for a simple pendulum set to oscilalte at small angles. Of course, this lets us write the period and frequency as well.
                    <br><br>
                    $$ T = 2\pi \sqrt{\dfrac{L}{g} }$$
                    $$ f = \dfrac{1}{2\pi} \sqrt{\dfrac{g}{L} } $$
                    <br>
                    Notice that mass is nowhere to be seen. The mass of the object <b>does not</b> affect the oscillation period! The only things you can do to change it 
                    are to change the gravity (which is usually unfeasible) or to change the length of the string (which is much more feasible).
                </span>
                <span v-show="level==0">
                    The math for the pendulum is a bit more complex than for the spring-block oscillator, so I will not go through the entire derivation here. 
                    It uses rotational dynamics methods to relate angular acceleration and angular position, then determines the frequency of oscillation from 
                    there. The only things in consideration are the gravitational acceleration and the length of the string holding the pendulum bob.
                    <br><br>
                    $$ \omega = \sqrt{\dfrac{g}{L} } $$
                    <br>
                    Once we have that, we can write the period and frequency relatively easily, by folliwng the formulas we were given before.
                    <br><br>
                    $$ T = 2\pi \sqrt{\dfrac{L}{g} }$$
                    $$ f = \dfrac{1}{2\pi} \sqrt{\dfrac{g}{L} } $$
                    <br>
                    I had stated that this was a type of simple harmonic motion, but that's sort of a lie. See, this kind of motion is only very close to 
                    simple harmonic and is approximated as simple harmonic. The approximation is very good if the maximum angle that the pendulum swings up to is 
                    less than $15 \degree$, and starts to break down at larger angles. We won't be worrying about that here, though.
                </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>

            <div v-show="page===1">
                Let's see how well you understand pendulums now!
                <br><br>
                <div class="problem">
                    Would the period of oscillation of a pendulum be longer on Earth or on the Moon?
                    <span>
                        <div v-show="show" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> The oscillation period would be longer on the moon because of reduced gravity there.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How does the pendulum's period change if you increase the initial angle?
                    <span>
                        <div v-show="show1" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> The oscillation period increase due to it having to travel more distance as it swings.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    Which has a longer oscillation period: a cube of tungsten or a cube of wood of the same size on the same string?
                    <span>
                        <div v-show="show2" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> They would have the same period, as the angular frequency does not depend on mass.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    What would happen if you shortened a pendulum's string by pulling hard on the other end while it was in motion?
                    <span>
                        <div v-show="show3" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> The period decreases because the length of the string decreases. Angular momentum conservation means the bob moves faster.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show3 = !show3">{{ show3 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    What quantity is oscillating sinusoidally for a simple pendulum? (It's not position!)
                    <span>
                        <div v-show="show3" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> The angle the string makes with the vertical varies sinusoidally with time.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show4 = !show4">{{ show4 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                </div>
                <br>
                As that last question stated, what is actually oscillating sinusoidally for our simple pendulum is not the position of the bob, but 
                rather the angle. Indeed, the position of the bob changes simultaneously in two dimensions at once, since it moves both left to right as 
                well as up and down. <span v-show='level>0'>This shouldn't be too surprising, considering our derivation for the simple harmonic nature of this 
                    system related angular acceleration and angular position.
                </span> The "amplitude" for this kind of system is a maximum angle, called $\theta_0$.
                <br><br>
                I won't write the exact equations for the pendulum because they are not too important and follow the same form as the equations 
                I presented previously in the spring-block oscillator lesson.
                <br><br>
                <span v-show="level>0">
                    With that, let's try and apply our skills to an actual pendulum problem.
                    <br><br>
                    <div class="problem">
                        How long does the arm on a granfather clock have to be in order to function? (Hint: The clock records time in seconds.)
                        <br><br>
                        <figure>
                            <img src="/src/assets/oscillations/Figure 99.png"/>
                            <figcaption>Figure 2: I bet you've never seen one of these. <s>Kids these days</s></figcaption>
                        </figure>
                        <br>
                        Okay, so the key here is to realize that the clock records time whenever the bob reaches a maximum amplitude and starts to move
                        the other way. (At least, I think that's how it works. I don't own one of these.) This means that in one full oscillation cycle, it
                        "ticks" twice. That's what we're going with here. Don't question me! I probably got the mechanism wrong, but what matters is the physics, okay?
                        <br><br>
                        If the clock records time twice during an oscillation period, this means that the period of oscillation must be $T = 2.0 \textrm{s}$. We can 
                        then list out our formula for the period of oscillation of a simple pendulum:
                        <br><br>
                        $$ T = 2\pi \sqrt {\dfrac{L}{g} }$$ 
                        <br>
                        We know what $g$ is because we're (presumably) on Earth, so now all that's left is to solve for $L$ given $T$.
                        <br><br>
                        $$ L = g \left( \dfrac{T}{2\pi} \right)^2 = \bbox[3px,
                        border: 0.5px solid
                        white]{0.994 \textrm{m} }$$
                        <br>
                        Google says the pendulum length for a granfather clock is around one meter, so my guess of how the clock worked was right!
                    </div> 
                </span>
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
                What happens if we have entire objects acting as a pendulum instead of just having small bobs? Well, that sounds an awful lot like rigid bodies rotating, doesn't it?
                That's exactly what the next kind of pendulum is: the <b>physical pendulum</b>. Try out this demo to see what happens, paying special attention to the 
                moments of inertia of the objects here.
                <br><br>
            <figure>
                <h3>Physical Pendulum Demo</h3>
                <div id="pendulum"></div>
                <button class="btn btn-outline-primary" @click="runPendulum()">Reset</button>&emsp;
                <div class="row justify-content-center m-auto" style="max-width:700px;">
                    <label> Gravity: {{ gravity }} </label><br>
                    <input type="range"
                        class="form-range"
                        v-model="gravity"
                        min="0.0" max="30.0" step="0.5"
                        style="width:fit-content"
                    />
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            As you might have seen, the moment of inertia plays a role in the period of oscillation! The circle had a much greater moment of inertia 
            than the rod, so it had a longer period of rotation. The other factor that influenced it, as you may have seen, is the strength of the gravity 
            on the objects.
            <br><br>
            <span v-show="level>0">
                We can derive the equation for the angular velocity of such a system. We can say an object of mass $m$ has some arbitrary moment of inertia $I$ about an axis that is 
                a distance $d$ from the center of mass. As always, the gravitational acceleration is $g$. The gravity acts at the center of mass, so for an arbitrary rotation 
                angle $\theta$ we can do some torque analysis.
                <br><br>
                $$ - mg \sin \theta d = I \alpha $$
                $$ \alpha = - \dfrac{mgd}{I} \sin \theta $$
                <br>
                Once again, we can use the small angle approximation for $\theta$. 
                <br><br>
                $$ \alpha = - \dfrac{mgd}{I} \theta$$
                <br>
                Now, we can easily get the angular frequency for this kind of oscillator. You see that the derivation process was very similar to that for the 
                pendulum bob, just generalized to rigid bodies.
                <br><br>
                $$ \omega = \dfrac{mgd}{I} $$
                <br>
            </span>
            <span v-show="level==0">
                The derivation for the physical pendulum requires some rotational dynamics and a bit of trigonometry, so I'll skip it again. It uses much of the 
                same reasoning and methodology as the derivation for the simple pendulum, and if you're interested in seeing those two you can bump the 
                level up to algebra-based. In short, the angular frequency for a physical pendulum depends on its mass $m$, the distance $d$ the pivot is from the 
                center of mass, and the moment of inertia $I$ through that pivot. 
                <br><br>
                $$ \omega = \dfrac{mgd}{I} $$
                <br>
            </span>
            Of course, once we know the angular frequency we can't forget about our good friends, the period and frequency of oscillation.
            <br><br>
            $$ T = 2\pi \sqrt{\dfrac{I}{mgd} }$$
            $$ f = \dfrac{1}{2\pi} \sqrt{\dfrac{mgd}{I} } $$
            <br>
            Do recall that $I$ here is measured about the pivot point, not the center of mass. If you want to find this moment of inertia for one of our six common objects, 
            simply use the parallel axis theorem. You remember that, right?
            <br><br>
            With that, let's try and apply our skills to a simple physical pendulum problem.
            <br><br>
            <div class="problem">
                Find the period of oscillation of a pendulum consisting of a solid disk of mass $m = 25.0 \textrm{kg}$ and radius $R = 1.5 \textrm{m}$, with the pivot point at the edge of the disk.
                (This is like the blue disk in the pendulum demo above.)
                <br><br>
                The first step is to use the parallel axis theorem to find the moment of inertia about the pivot point. You remember what the
                moment of inertia for a solid disk is. (Certainly you do, because I told you to memorize it, right?) The edge is a distance $R$ 
                away from the center, which is what we use in our parallel axis theorem.
                <br><br>
                $$ I = I_{cm} + md^2 = \dfrac{1}{2} m R^2 + mR^2 = \dfrac{3}{2} m R^2 $$
                <br>
                We have also realized that for this problem, $d = R$. Now we can plug this into our formula for the period of oscillation.
                <br><br>
                $$ T = 2\pi \sqrt{\dfrac{I}{mgd} } $$
                $$ T = 2\pi \sqrt{\dfrac{\dfrac{3}{2} m R^2}{mgR} } = 2\pi \sqrt{\dfrac{3R}{2g} } $$
                <br>
                Now we can plug in our values for $R$ and $g$ to get the final answer.
                <br><br>
                $$ T  = \bbox[3px, border: 0.5px solid white]{ 3.01 \textrm{s} } $$
            </div>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                     &rarr;</button>
            </div>
            </div>
            <div v-show="page===3">
                We still need to talk about the energy behind the pendulum, don't we? The pendulum is a system that has gravitational potential energy 
                and kinetic energy, so it can be analyzed using conservation of energy. The pendulum bob can be said to have zero potential energy at the lowest
                point of its swing, which means it will have maximum kinetic energy there. At the highest points of the motion, all energy is potential.
                <br><br>
                We are able to write the potential energy as a function of the angle that the pendulum makes with the vertical. It's a bit more complex than 
                just using a single trig function, though. We need to find the change in height of the pendulum with respect to the lowest point.
                <br><br>
                <figure>
                    <img src="/src/assets/oscillations/Figure 100.png"/>
                    <figcaption>Figure 3: Tutorial on how to find the height change (100% WORKING, FREE).</figcaption>
                </figure>
                <br>
                We want to look for the yellow line's length. This involves subtracting $R\cos\theta$ from the entire length $R$ of the string, which 
                gives us that the height at any angle $\theta$ is $h = R (1- \cos \theta)$. This means that the potential energy at any angular 
                position is equal to:
                <br><br>
                $$ U = mgR(1-\cos \theta) $$
                <br>
                The total energy is equal to the potential energy at the maximum angular position $\theta_0$, and at any other point there is some kinetic 
                energy and some potential energy. This can be easily dealt with using familiar energy conservation techniques, so I won't reiterate too much 
                of what you've heard a million times here. If you need a refresher, look back at our energy unit.
                <br><br>
                <span v-show="level>0">
                    A very similar method can be used for physical pendulums. You want to recall that the energy of rigid objects is measured to their center of mass, so 
                    instead of $R$ we have $d$, the distance between the pivot and the center of mass. Moreover, we use the formula for rotational kinetic energy 
                    rather than translational kinetic energy. Those are the only changes; the rest of the analysis is very similar.
                    <br><br>
                </span>
                This concludes the pendulums lesson. Technically, there are more kinds of pendulums, but the ones that can be easily dealt with at our level 
                are the simple and physical pendulums we analyzed. Next, we'll go over a few more kinds of oscillators that don't fit clearly into any 
                category. If you're ready, let's move on!
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
    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Vectors Problems</h1><br>
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


<style scoped>
</style>