<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([0]) // update as add more questions
const explanations = reactive([false]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ]
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
import { onMounted, onUnmounted, ref} from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Mouse, Constraint, MouseConstraint, Events} from 'matter-js'
const viewportMsg = ref('')
const springConst = ref(2.0)
const inputMass = ref(30)
// Add a reactive ref for platform visibility
const showPlatform = ref(true)

let block
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let springUpdateHandler = null

// Store engine reference so toggleGravity can access it
let springEngine = null

function runSpringOsc() {
    // Clean up previous engine if it exists
    if (currentEngine) {
        // Stop the runner
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        // Stop and clear the render
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
            currentRender = null
        }
        // Clear the engine
        Engine.clear(currentEngine)
        currentEngine = null
        currentRunner = null
    }

    if (window.innerWidth < 1000) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }
    document.getElementById("springOsc").innerHTML = ""
    // create engine
    var engine = Engine.create()
    currentEngine = engine // Store reference for cleanup
    springEngine = engine // Save reference for gravity toggling
    engine.gravity.y = 1
    var width = 0.5 * window.innerWidth > 800 ? 700 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 0.8 * width
    // create renderer
    var render = Render.create({
        element: document.getElementById("springOsc"),
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

    block = Bodies.rectangle(0.6 * width, 0.5 * height, 80 / 800 * width, 80 / 800 * width,
        {
            render: { fillStyle: '#f55' },
            friction: 0,
            frictionAir: 0,
            inertia: Infinity,
            mass: Math.abs(inputMass.value) * 100
        })

    var walls = [
        Bodies.rectangle(-0.1 * width, 0.5 * height, 0.2 * width, height, { render: { visible: false }, isStatic: true }),
        Bodies.rectangle(1.1 * width, 0.5 * height, 0.2 * width, height, { render: { visible: false }, isStatic: true }),
        Bodies.rectangle(0.5 * width, -0.1 * height, width, 0.2 * height, { render: { visible: false }, isStatic: true }),
        Bodies.rectangle(0.5 * width, 1.1 * height, width, 0.2 * height, { render: { visible: false }, isStatic: true })
    ]

    var pivot = Bodies.circle(0.5 * width, 0.5 * height, 10 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#fff' },
    })

    var spring = Constraint.create({
        bodyA: pivot,
        bodyB: block,
        stiffness: 0.0000000000000001,
        damping: 0,
        length: 0.25 * width,
        render: {
            lineWidth: 2,
            strokeStyle: '#fff'
        }
    })

    // Conditionally create platform
    var platform = showPlatform.value
        ? Bodies.rectangle(0.5 * width, 0.60 * height, width, 0.08 * height, {
            isStatic: true,
            render: { fillStyle: '#888' }
        })
        : null
    // Hooke's Law parameters
    const springLength = 0.25 * width // equilibrium length of the spring

    // Define the spring update handler
    springUpdateHandler = function () {
        // Calculate displacement from equilibrium
        const anchor = { x: 0.5 * width, y: 0.5 * height }
        const blockPos = block.position
        const dx = anchor.x - blockPos.x
        const dy = anchor.y - blockPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const extension = dist - springLength

        // Direction from block to anchor
        let dirX = 0, dirY = 0
        if (dist !== 0) {
            dirX = dx / dist
            dirY = dy / dist
        }

        // Hooke's Law: F = -k * x
        // Scale down the force to prevent excessive oscillations
        const forceMag = springConst.value * extension * 0.1 // Reduced force scaling
        const force = { x: forceMag * dirX, y: forceMag * dirY }
        Body.applyForce(block, block.position, force)
    }

    Events.on(engine, 'beforeUpdate', springUpdateHandler)

    // Add platform only if it exists
    const bodiesToAdd = platform ? [block, ...walls, pivot, spring, platform] : [block, ...walls, pivot, spring];
    Composite.add(engine.world, bodiesToAdd)

    Body.setVelocity(block, { x: 0, y: 0 })

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

    // keep the mouse in sync with rendering
    render.mouse = mouse
}

// Expose toggleGravity to template
function toggleGravity(enable) {
    if (springEngine) {
        springEngine.gravity.y = enable ? 1 : 0;
    }
}

// Function to toggle platform visibility
function togglePlatform() {
    showPlatform.value = !showPlatform.value
    runSpringOsc() // re-run simulation to update platform
}

onMounted(() => {
    runSpringOsc()
})

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Remove event listeners
        if (springUpdateHandler) {
            Events.off(currentEngine, 'beforeUpdate', springUpdateHandler)
            springUpdateHandler = null
        }
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

watch(springConst, () => {
    // Reset the block's velocity to prevent energy accumulation
    if (block) {
        Body.setVelocity(block, { x: 0, y: 0 })
    }
})
watch(inputMass, (newVal) => {
    if (block) {
        block.mass = Math.abs(newVal) * 100
        Body.set(block, { isSleeping: false })
    }
})
</script>

<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Spring-Block Oscillators</h1><br>
        <p>
        <div v-show="page === 0">
            You should recall our previous discussion of the spring force and Hooke's Law, as well as our previous demo
            for that lesson. If you
            have a really good memory, you would remember I said that Matter.js does not have a built-in realistic
            spring force. This demo implements a
            mathematically accurate spring force demo by forcibly implementing Hooke's Law. See how the block
            oscillates.
            <br><br>
            <figure>
                <h3>Spring-Block Oscillator Demo</h3>
                <button class="btn btn-outline-primary" @click="toggleGravity(true)">Gravity ON</button>&emsp;
                <button class="btn btn-outline-primary" @click="toggleGravity(false)">Gravity OFF</button>
                <br><br>
                <div id="springOsc"></div>
                <div class="row justify-content-center m-auto" style="max-width:700px;">
                    <div class="col"><label> Spring Constant: {{ springConst }} </label><br><input type="range"
                            class="form-range" v-model="springConst" min="0.5" max="10.0" step="0.5"
                            style="width:fit-content" /></div>
                    <div class="col">
                        <label> Mass: {{ inputMass }} </label><br>
                        <input type="range" class="form-range" v-model="inputMass" min="10" max="300" step="1"
                            style="width:fit-content" />
                    </div>
                </div>
                <button class="btn btn-outline-primary" @click="runSpringOsc()">Reset</button>&emsp;
                <button class="btn btn-outline-primary" @click="togglePlatform()">Toggle Platform</button><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            This demo uses a realistic spring force, which you can see causes the block to oscillate practically
            indefinitely. You may also see that
            it oscillates back and forth around the equilibrium position, repeating its motion over time. This
            characterizes spring-block
            oscillators.
            <br><br>
            We want to recall Hooke's Law from our previous discussion of springs. As we've stated, it is a restoring
            force that tends to pull objects
            back to equilibrium. I've put the definition here, but you remembered it, right? (Shameless guilt trip)
            <br><br>
            $$ F = -k x $$
            <br>
            We can see that this is the <b>only</b> force acting on these objects in a spring-block oscillator system.
            With a little bit of algebra, we can show
            that this satisfies the conditions for SHM and find the angular frequency of the spring-block system. Recall
            Newton's Second Law in this case:
            <br><br>
            $$ ma = -k x $$
            $$ a = -\dfrac{k}{m} x $$
            <br>
            <span v-show="level > 0">
                We also want to realize that this applies for combinations of springs as well. In reality, we should be
                using $k_{eff}$ to denote
                the effective spring constant. Of course, when springs are actually attached to a block it's no longer
                just as simple as
                parallel and series. You can attach a spring to both sides of a block! Intuition and just basic
                logic/common sense should serve you pretty well in most of these
                cases.
                <br><br>
                (Attaching it to both sides of the block effective makes the springs stronger, so you add the constants
                together as if the springs
                were in parallel. But you got to that conclusion yourself, right?)
                <br><br>
            </span>
            Now, recall that we said in general the formula for simple harmonic motion took the form:
            <br><br>
            $$ a = - \omega ^2 x $$
            <br>
            Therefore, we can conclude here that the angular frequency for a spring-block oscillator depends on the mass
            and spring constant.
            <br><br>
            $$ \omega = \sqrt{\dfrac{k}{m} } $$
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            Of course, now that we have the angular frequency, we can also write the frequency and period of oscillation
            in terms of $m$ and $k$.
            This involves nothing more than a direct substitution into the equations we've been introduced to in the
            previous chapter:
            <br><br>
            $$ T = \dfrac{2\pi}{\omega} = 2\pi \sqrt{\dfrac{m}{k} } $$
            $$ f = \dfrac{1}{T} = \dfrac{1}{2\pi} \sqrt{\dfrac{m}{k} } $$
            <br>
            These can be applied to the period or frequency of any arbitary spring-block oscillator system. However,
            this information is
            too general. We want a complete solution of the situation, where we can predict the mass's position,
            velocity, and acceleration at any
            point in time. This is where sinusoidal functions come in to save the day.
            <br><br>
            <span v-show="level==0"><b>Quick disclaimer</b>: you probably won't know everything I'm talking about here at a
                conceptual level. The information I'm about to give does rely pretty heavily on knowledge of sinusoidal
                functions and trigonometry, but is foundational enough that I had to include it. If you don't understand, feel
                free to skip over it.
                <br><br>
            </span>
            First, we need to set a few ground rules. There is a new quantity called the <b>amplitude</b>, which is
            simply the furtherst the block gets from
            the equilibrium point. We represent it with the letter $A$. We are also assuming that we start the particle
            off with no initial velocity at some distance
            from the equilibrium point. We can then describe the position, velocity, and acceleration of the function
            as:
            <br><br>
            $$ x(t) = A \cos (\omega t) $$
            $$ v(t) = - \omega A \sin (\omega t) $$
            $$ a(t) = - \omega^2 A \cos (\omega t) $$
            <br>
            If we start the particle off at the equilibrium point with some velocity, the equations look slightly
            different. If you understand sine functions well, you should
            be able to tell why and what's going on. Think about how the objects move as a guide to analyzing these
            equations.
            <br><br>
            $$ x(t) = A \sin (\omega t) $$
            $$ v(t) = \omega A \cos (\omega t) $$
            $$ a(t) = - \omega^2 A \sin (\omega t) $$
            <br>
            Here are the actual graphs in desmos. You can adjust the parameters to see what happens!
            <br><br>
            <iframe src="https://www.desmos.com/calculator/e7lc10kkfe"
                style="margin:auto;display:block;width:100%; max-width:1000px;aspect-ratio:1 / 1;max-height:500px;"
                frameborder=0> </iframe>
            <br><br>
            Recall that $\omega = k/m$. If you look closely, you'll see that both sets of equations satisfy the
            essential relation $ a = - \omega ^2 x $, which
            means they are consistent with the conditions for SHM. Moreover, we can also see that velocity is maximum
            whenever acceleration and displacement are zero, and vice
            versa. But where did these random sine functions come from?
            <br><br>
            <span v-show="level < 2">The way we derive these equations requires some pretty advanced calculus, so just
                take these for given. Besides, from looking
                at the motion of a spring it's relatively intuitive to see that these are true equations.
            </span>
            <span v-show="level == 2">Now, the gears inside your head are probably spinning as you calculate derivatives
                to verify that the positions, velocities, and
                accelerations match up properly. (Hint hint, verify this!) This is easy enough to see, but how did we
                arrive at these equations from the
                differential equation?
                <br><br>
                $$ \dfrac{d^2 x}{dt^2} = - \dfrac{k}{m} x $$
                <br>
                Well, solving this requires the use of very advanced math because it's a second-order differential
                equation. So unfortunately, I cannot explain it
                to you at this level. You will just have to take it for given. However, it's not hard to see that these
                equations are true just by looking at the
                motion of the mass attached to a spring.
            </span>
            <span v-show="level > 0">
                <br><br>
                With this information having been fed to you, we are in a good position to attempt a practice problem.
                I've decided to give you
                a multi-stage aerobic capacity test &mdash; I mean mutli-part problem that progressively gets more
                difficult as you progress.
                <br><br>
                <div class="problem">
                    A block of mass $m = 2.0 ~\textrm{kg}$ is attached to a horizontal spring of spring constant $k =
                    1520~\textrm{N/m}$. <br>
                    a) What is the period?<br>
                    b) If the maximum displacement from equilibrium is $A = 0.2 \textrm{m}$, what is the maximum spring
                    force?<br>
                    c) What is the maximum possible potential energy?<br>
                    d) What is the maximum possible kinetic energy?<br>
                    e) What is the total energy?
                    <br><br>
                    Happy solving!
                    <br><br>
                    First, we find the period with a simple substitution of numbers into the equation we got earlier.
                    <br><br>
                    $$ T =\dfrac{2\pi}{\omega} = 2\pi \sqrt{\dfrac{m}{k} }$$
                    $$ T = \bbox[3px,
                    border: 0.5px solid
                    white] {0.228~\textrm{s} }$$
                    <br>
                    That's part a) done. Now, the next part is relatively simple as well. The spring force just depends
                    on the stretch from equilibrium, so the
                    maximum possible spring force is just the spring constant times the amplitude.
                    <br><br>
                    $$ F = kA = \bbox[3px,
                    border: 0.5px solid
                    white]{304 ~\textrm{N} } $$
                    <br>
                    We don't put a direction sign here because we only care about magnitude. Next, we need to find the
                    spring potential energy. This is yet another
                    simple algebraic plug-in. Recall that the spring potential energy is defined by $U_s = \dfrac12
                    kx^2$.
                    <br><br>
                    $$ U_s = \dfrac12 kA^2 = \bbox[3px,
                    border: 0.5px solid
                    white] {30.4 ~\textrm{J} } $$
                    <br>
                    Now, what about part d)? We're not given any information on the kinetic energy! Well, there are two
                    ways to do this. I'll show
                    that they're the same. The first is to look back at our time-dependent equation for velocity and see
                    that there is a maximum velocity whenever
                    displacement is zero. Therefore, we can conclude due to the nature of sine functions that $v_{max} =
                    \omega A$.
                    <br><br>
                    $$ K = \dfrac 12 m (\omega A )^2 = \dfrac 12 m \left( \dfrac{k}{m} \right) A^2$$
                    $$ K = \dfrac k A^2 = \bbox[3px,
                    border: 0.5px solid
                    white] {30.4 ~\textrm{J} } $$
                    <br>
                    The two expressions for maximum potential and kinetic energy are equivalent! This should tell us
                    that mechanical energy is conserved in this system,
                    as we would probably expect. Spring forces are conservative, after all, and there are no dissipative
                    forces acting on the system. With this
                    revelation, we can easily do the last part of the problem.
                    <br><br>
                    $$ E = \bbox[3px,
                    border: 0.5px solid
                    white] {30.4 ~\textrm{J} }$$
                </div>
            </span>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">
                    &larr; Previous
                </button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">
                    Next &rarr;
                </button>
            </div>
        </div>
        <div v-show="page === 2">
            Of course, we need a discussion of energy in here as well. It's only going to be a very brief discussion,
            but it is important
            nonetheless.
            <br><br>
            <span v-show="level > 0">
                What kinds of energy are in this system? Well, the block moves, so we definitely have kinetic energy. We
                also have a spring, so
                we have spring potential energy. (This was in the practice problem previously!) The two can be defined
                as $K =\frac12 mv^2$ and $U_s = \frac12 kx^2$.
                Therefore, we can write the total energy at any point as:
                <br><br>
                $$ E = \dfrac12 mv^2 + \dfrac12 k x^2 $$
                <br>
                You will recall that energy is conserved, and the total energy is just equal to the spring potential
                energy at maximum stretch. We want to
                show that this is true, however. To do so, we need to use the time-dependent equations for velocity and
                position that were given to us earlier.
                <br><br>
                $$ x(t) = A \sin (\omega t) $$
                $$ v(t)= \omega A \cos (\omega t) $$
                $$ E = \dfrac12 m(\omega A)^2 + \cos ^2 (\omega t) + \dfrac12 k A^2 \sin^2 \omega t $$
                <br>
                Now, we want to recall that $\omega = \sqrt{k/m}$ and substitute this result into our equations to
                simplify them.
                <br><br>
                $$ E = \dfrac12 m (k/m) A^2 \cos^2 (\omega t) + \dfrac12 k A^2 \sin^2 \omega t $$
                $$ E = \dfrac12 k A^2 (\cos^2 (\omega t) + \sin^2 (\omega t)) $$
                <br>
                Using the Pythagorean identity, we can get rid of the trigonometric functions to be left with:
                <br><br>
                $$ E =\dfrac12 kA^2 $$
                <br>
                Using this equation and the equation for the total energy in the system as a sum of potential and
                kinetic energies, we can solve for the velocity
                of the object at any position by using basic energy conservation techniques.
            </span>
            <span v-show="level == 0">
                Now, we know that energy in this system will be conserved because the spring force is conservative and
                there are no dissipative forces
                such as friction or air resistance. This means that the total energy in the system will be equal the
                total spring potential energy of the
                spring when it is maximally stretched, or at a distance $A$ from the equilibrium.
                <br><br>
                $$ E = \dfrac12 kA^2 $$
                <br>
                Of course, at each instant in time the distribution between the different kinds of energy is different
                at each point in the motion. This is why
                we can write a more general form of the expression, combining the two kinds of energy that the block
                will have: potential and kinetic
                energy.
                <br><br>
                $$ E =\dfrac12 mv^2 + \dfrac12 kA^2 $$
                <br>
                Once we can figure out the total energy in a system, it becomes easy to use this formula to find the
                distribution of energy and the speed of
                the object at any position. What's more important, however, is understanding how the energy changes as
                the block moves.
            </span>
            <br><br>
            As the block moves, energy is converted from potential to kinetic whenever the object speeds up, and is
            converted from kinetic to potential whenever
            it slows down. The total amount of energy in the system has to stay constant, however, meaning that they
            increase and decrease regularly. This is also
            a consequence of the fact that this is a type of simple harmonic motion and thus a kind of regular and
            periodic motion.
            <br><br>
            The energy involved in the system cannot really be used for basic analysis, but can be useful for finding
            velocity at certain positions. That's
            pretty much its only use outside of conceptual ones. The fact that the total energy has to be constant
            explains why velocity and position oscillate out-of-step: because
            one is related to kinetic energy and the other to potential. Their sum is constant, so one has to increase
            when the other decreases, and vice versa.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            We have talked about horizontally oscilalting springs, but what about vertically oscillating ones? What
            changes in that case? Well,
            first off we have a force of gravity on the object which tends to pull it downwards. You might think that
            does something to affect the
            motion of the object.
            <br><br>
            The issue is, the spring force is linear. All the gravity does is offset the spring's equilibrium position
            slightly. When displaced from that equilibrium,
            the spring will still tend to oscillate just as if it were horizontally placed. The vertical spring-block
            oscillator is practically analogous to the
            horizontal one, just with an offset equilibrium position. This can still trip you up if you're not careful,
            though.
            <br><br>
            <figure>
                <img src="/src/assets/oscillations/Figure 97.png" style="max-width:750px" />
                <figcaption>Figure 1: The displaced equilibrium position.</figcaption>
            </figure>
            <br>
            <span v-show="level > 0">
                The conceptual explanation might be good enough for some of you, but you can actually mathematically
                show that this result is true
                as well. However, this takes a bit more work and requires calculus. <span v-show="level == 2">If you
                    calculus students recall, we actually
                    did show this in our types of equilibrium lesson. Go back there to see the work we did!
                </span> Essentially, what we have to do is show that this is a stable equilibrium. You don't have to
                worry too much about the math behind it.
                <br><br>
                If you want to talk energy, this kind of system can be treated as equivalent to a horizontal
                spring-block oscillator as well. Even though the
                gravitational potential energy is changing, the spring potential energy also changes. Because the
                equilibrium position is at a point of nonzero
                spring stretch, we can define the total potential energy there to be zero. This way, we can write
                energies in the same way as we did for a
                horizontal oscillator.
                <br><br>
            </span>
            I'm going to give you a problem to demonstrate exactly how the vertical spring-block oscillator works.
            <br><br>
            <div class="problem">
                A vertical spring of spring constant $k = 600 ~\textrm{N/m}$ is attached on one end to a block of mass
                $M = 3.5 ~\textrm{kg}$ and the other end is
                attached to the ceiling. The block is released from rest while the spring is at its natural length. What
                is the amplitude and angular
                frequency of the resulting oscillations?
                <br><br>
                If the spring is released from natural length, it will "fall" down past its equilibrium position before
                coming back up. Remember, we consider amplitude as measured from
                the equilibrium position for the spring, and this one starts at rest length. This means that the
                amplitude is equal to the
                height that the spring starts at above the equilibrium position, which can easily be found. The
                equilibrium position is a distance $y$ below the
                rest length of the spring, where $y$ can be found using force analysis.
                <br><br>
                $$ mg = ky $$
                $$ y =\dfrac{mg}{k} = A$$
                <br>
                This is also equal to our amplitude, as explained before. That means we've already solved the first part
                of the problem:
                <br><br>
                $$ A = \bbox[3px,
                border: 0.5px solid
                white]{5.72 ~\textrm{cm} } $$
                <br>
                Do note that I gave the answer in centimeters.
                <br><br>
                With that, we can now easily find the angular frequency. Remember, vertical and horizontal springs are
                completely analogous except for an offset
                in the equilibrium position caused by gravity, so the formula for the angular frequency is the same!
                <br><br>
                $$\omega = \sqrt{\dfrac{k}{m} } = \bbox[3px,
                border: 0.5px solid
                white]{13.1 ~\textrm{rad/s} } $$
            </div>
            <br>
            That's the end of our discussion of spring-block oscillators! It's really just an extension of our springs
            lesson and overall
            not too complex. We are now primed and ready to move on to the next type of oscillator: the pendulum! It's
            definitely more complex, but
            I think you can manage it.
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
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Spring Oscillator Problems</h1><br>
        <form @submit.prevent="checkAnswer(q.number)" class="question row justify-content-center mx-auto mt-5"
            v-for="q in questions[level]">
            <div class="w-100">
                <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
            </div>
            <div class="col border-end border-secondary">
                <div class="ms-auto" style="width:fit-content">
                    <div class="form-check" style="width:fit-content;" v-for="a in q.answers">
                        <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'">
                        <label class="form-check-label" style="font-size:0.96rem">
                            {{ a[0] }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column">
                <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                    :value="results[q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                <div class="me-auto my-auto" v-show="results[q.number] !== 0">{{ results[q.number]
                    === 1 ?
                    "&#x2705; Correct!" : "&#x274c; Not quite! Try again." }}
                </div>
                <a href="#" v-show="results[q.number] !== 0" class="me-auto mb-auto ms-1"
                    @click="explanations[q.number] = !explanations[q.number]">{{ !explanations[q.number] ? "Want to see an explanation ? " : "Hide explanation" }}</a>
            </div>
            <span class="mt-3" style="padding: 0% 25%" v-show="explanations[q.number]">{{ q.explain }}</span>
        </form>
    <br><br>
    </div>
</template>


<style scoped></style>