<script setup>
useHead({
    title: 'Rolling Motion',
    meta: [
        { name: 'description', content: 'Explore the principles of rolling motion, including the relationship between linear and angular velocity of a rolling object.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Rolling


watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "Rolling without slipping requires:",
                answers: [
                    ["Static friction", 1, false],
                    ["Kinetic friction", 0, false],
                    ["No friction", 0, false],
                    ["Air resistance", 0, false]
                ],
                explain: "Rolling without slipping requires that theire is a force of static friction between the rolling object and the surface at the point of contact."
            },
            {
                number: 1,
                question: "When an object rolls without slipping, it rotates about:",
                answers: [
                    ["Its center of mass", 0, false],
                    ["The point of contact with the surface", 1, false],
                    ["The geometric center", 0, false],
                    ["None of the above", 0, false]
                ],
                explain: "As discussed in the lesson, the actual point of rotation of an object that rolls without slipping is its contact point with the ground, since there is no other point it can feasibly rotate about."
            },
            {
                number: 2,
                question: "Rolling objects move ______ than objects that slide without friction.",
                answers: [
                    ["Faster", 0, false],
                    ["Slower", 1, false],
                    ["At the same speed", 0, false],
                    ["Depends on the object", 0, false]
                ],
                explain: "Rolling objects move slower than objects that slide without friction because some of the gravitational potential energy is converted into rotational kinetic energy. You can also think of it as friction slowing the object down."
            },
            {
                number: 3,
                question: "A hoop and a disk are both rolled down the same slope. Which one reaches the bottom first?",
                answers: [
                    ["Disk", 1, false],
                    ["Hoop", 0, false],
                    ["Same time", 0, false],
                    ["Depends on mass", 0, false]
                ],
                explain: "The disk has a lower moment of inertia, which means less gravitational potential energy goes into"
            },
            {
                number: 4,
                question: "These objects are all rolled down a frictionless incline. Which one reaches the bottom first?",
                answers: [
                    ["Solid sphere", 0, false],
                    ["Hollow sphere", 0, false],
                    ["Solid cylinder", 0, false],
                    ["All of them reach the bottom at the same time", 1, false]
                ],
                explain: "Since the incline is frictionless, rolling does not occur and all the objects are subject to the same acceleration. They reach the bottom of the incline at the same time."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "What is the acceleration of a solid sphere down an arbitrary incline with angle $\\theta$ if it rolls without slipping?",
                answers: [
                    ["$\\frac75 g \\sin \\theta$", 0, false],
                    ["$\\frac{2}{5} g \\sin \\theta$", 0, false],
                    ["$\\frac{1}{2} g \\sin \\theta$", 0, false],
                    ["$\\frac{5}{7}g \\sin \\theta$", 1, false]
                ],
                explain: "If we use the method where we consider the sphere as spinning around its point of contact with the ground, we can more easily find the acceleration. The torque about that point is $mg \\sin \\theta \\cdot R = I \\alpha$. The moment of inertia about that point is $I = \\frac{2}{5}mR^2 + mR^2 = \\frac{7}{5}mR^2$. Therefore, we have $mg \\sin \\theta \\cdot R = \\frac{7}{5}mR^2 \\alpha$. Using the rolling without slipping condition $a = \\alpha R$, we can solve for $a$ to get $a = \\frac{5}{7}g \\sin \\theta$."
            },
            {
                number: 1,
                question: "A cue ball is hit sharply so that it begins to slide without rolling with a linear velocity of $5.0~\\textrm{m/s}$. If the coefficient of kinetic friction between the ball and the table is $\\mu_k=0.2$, how long does it take for the ball to start rolling without slipping?",
                answers: [
                    ["1.02 s", 0, false],
                    ["0.728 s", 1, false],
                    ["1.82 s", 0, false],
                    ["The ball stops before rolling", 0, false]
                ],
                explain: "The linear acceleration of the ball is equal to $\\mu_k g$. The angular acceleration can be found by analyzing the torque due to friction around the center of mass, which gives us the equation $\\mu_k mg R = \\frac25 mR^2 \\alpha$. We get the result that $\\alpha = \\frac{5}{2} \\frac{\\mu_k g}{R}$. The ball starts rolling without slipping when $v = \\omega R$. This lets us set up the following two equations: $v = v_0 - \\mu_k g t$ and $\\omega = \\alpha t$. Setting $v = \\omega R$ and substituting the required values into the equations gives us $t = 0.728~\\textrm{s}$."
            },
            {
                number: 2,
                question: "A solid sphere, a solid cylinder, and a hoop all roll without slipping down an incline of height $h$ and angle $\\theta$. Which one reaches the bottom first?",
                answers: [
                    ["Hoop", 0, false],
                    ["Solid sphere", 1, false],
                    ["Solid cylinder", 0, false],
                    ["Same time", 0, false]
                ],
                explain: "The solid sphere has the lowest moment of inertia (per unit mass and radius) of all the objects, which means that less of the gravitational potential energy goes into rotating the object. This means it accelerates faster and thus reaches the bottom of the slope first."
            },
            {
                number: 3,
                question: "A hollow sphere is set to roll without slipping down an incline of 15 degrees. On another slope, a solid cylinder is set to roll without slipping. What must the incline angle be if the acceleration of the cylinder is to be the same as that of the hollow sphere?",
                answers: [
                    ["$13.5\\degree$", 1, false],
                    ["$51.3\\degree$", 0, false],
                    ["$76.5 \\degree$", 0, false],
                    ["Not possible", 0, false]
                ],
                explain: "The accelerations of the two objects can be found using the formula $a = \\frac{g \\sin \\theta}{1 + \\frac{I}{mR^2}}$, which can be derived by employing the same technique that we used in problem 1. This gives us the accelerations of the two objects, and we can divide them to get the missing angle. Setting the accelerations equal to each other and solving for the angle gives us $\\theta = \\sin^{-1} \\left( \\frac{\\frac35 g}{\\frac23 g}} \\sin 15\\degree \\right) = 13.5\\degree$."
            },
            {
                number: 4,
                question: "What is the maximum possible angle that a solid sphere can roll down a slope?",
                answers: [
                    ["$19.6 \\degree$", 0, false],
                    ["$60.3 \\degree$", 0, false],
                    ["$74.1 \\degree$", 1, false],
                    ["There is no upper limit", 0, false]
                ],
                explain: "In general, we can solve for the required friction by seeing the conditions where the formula $a = \\alpha R$ is satisfied. First, we can solve for the linear acceleration in terms of $\\theta$, which gives us $a = g(\\sin \\theta - \\mu\\cos\\theta)$. The angular acceleration can be found by analyzing the torque about the point of contact, which gives us the equation $mg \\sin \\theta R = \\frac75 mR^2 \\alpha$, which gives us the equation $a = \\frac57 g \\sin \\theta$. Setting these two equations equal to each other and solving for $\\theta$ gives us $\\tan \\theta = \\frac{7\\mu}{2}$. Since we want the maximum possible angle, we take $\\mu = 1$ (the highest possible value of the coefficient of static friction) and get $\\theta = 74.1\\degree$."
            },
            {
                number: 5,
                question: "A spool can be modelled as an object with an outer radius $R$ and an inner radius $r$. A light string is wound around the inner radius and pulled. What must be the angle $\\theta$ that the string makes with the horizontal if the spool translates without rotating? <br><img src=\"/rotation/Problem 11.png\" style=\"max-width:250px\" class='rounded'/>",
                answers: [
                    ["$0\\degree$", 0, false],
                    ["$\\arccos \\left( \\frac{r}{R} \\right)$", 1, false],
                    ["$\\arctan \\left( \\frac{r}{R} \\right)$", 0, false],
                    ["Not possible", 0, false]
                ],
                explain: "The tension force in the string must run directly through the point of contact of the spool with the ground in order to prevent rotation. This means that the angle $\\theta$ must satisfy $\\cos \\theta = \\frac{r}{R}$, which gives us $\\theta = \\arccos \\left( \\frac{r}{R} \\right)$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "What is the acceleration of a solid sphere down an arbitrary incline with angle $\\theta$ if it rolls without slipping?",
                answers: [
                    ["$\\frac75 g \\sin \\theta$", 0, false],
                    ["$\\frac{2}{5} g \\sin \\theta$", 0, false],
                    ["$\\frac{1}{2} g \\sin \\theta$", 0, false],
                    ["$\\frac{5}{7}g \\sin \\theta$", 1, false]
                ],
                explain: "If we use the method where we consider the sphere as spinning around its point of contact with the ground, we can more easily find the acceleration. The torque about that point is $mg \\sin \\theta \\cdot R = I \\alpha$. The moment of inertia about that point is $I = \\frac{2}{5}mR^2 + mR^2 = \\frac{7}{5}mR^2$. Therefore, we have $mg \\sin \\theta \\cdot R = \\frac{7}{5}mR^2 \\alpha$. Using the rolling without slipping condition $a = \\alpha R$, we can solve for $a$ to get $a = \\frac{5}{7}g \\sin \\theta$."
            },
            {
                number: 1,
                question: "A cue ball is hit sharply so that it begins to slide without rolling with a linear velocity of $5.0~\\textrm{m/s}$. If the coefficient of kinetic friction between the ball and the table is $\\mu_k=0.2$, how long does it take for the ball to start rolling without slipping?",
                answers: [
                    ["1.02 s", 0, false],
                    ["0.728 s", 1, false],
                    ["1.82 s", 0, false],
                    ["The ball stops before rolling", 0, false]
                ],
                explain: "The linear acceleration of the ball is equal to $\\mu_k g$. The angular acceleration can be found by analyzing the torque due to friction around the center of mass, which gives us the equation $\\mu_k mg R = \\frac25 mR^2 \\alpha$. We get the result that $\\alpha = \\frac{5}{2} \\frac{\\mu_k g}{R}$. The ball starts rolling without slipping when $v = \\omega R$. This lets us set up the following two equations: $v = v_0 - \\mu_k g t$ and $\\omega = \\alpha t$. Setting $v = \\omega R$ and substituting the required values into the equations gives us $t = 0.728~\\textrm{s}$."
            },
            {
                number: 2,
                question: "A solid sphere, a solid cylinder, and a hoop all roll without slipping down an incline of height $h$ and angle $\\theta$. Which one reaches the bottom first?",
                answers: [
                    ["Hoop", 0, false],
                    ["Solid sphere", 1, false],
                    ["Solid cylinder", 0, false],
                    ["Same time", 0, false]
                ],
                explain: "The solid sphere has the lowest moment of inertia (per unit mass and radius) of all the objects, which means that less of the gravitational potential energy goes into rotating the object. This means it accelerates faster and thus reaches the bottom of the slope first."
            },
            {
                number: 3,
                question: "A hollow sphere is set to roll without slipping down an incline of 15 degrees. On another slope, a solid cylinder is set to roll without slipping. What must the incline angle be if the acceleration of the cylinder is to be the same as that of the hollow sphere?",
                answers: [
                    ["$13.5\\degree$", 1, false],
                    ["$51.3\\degree$", 0, false],
                    ["$76.5 \\degree$", 0, false],
                    ["Not possible", 0, false]
                ],
                explain: "The accelerations of the two objects can be found using the formula $a = \\frac{g \\sin \\theta}{1 + \\frac{I}{mR^2}}$, which can be derived by employing the same technique that we used in problem 1. This gives us the accelerations of the two objects, and we can divide them to get the missing angle. Setting the accelerations equal to each other and solving for the angle gives us $\\theta = \\sin^{-1} \\left( \\frac{\\frac35 g}{\\frac23 g}} \\sin 15\\degree \\right) = 13.5\\degree$."
            },
            {
                number: 4,
                question: "What is the maximum possible angle that a solid sphere can roll down a slope?",
                answers: [
                    ["$19.6 \\degree$", 0, false],
                    ["$60.3 \\degree$", 0, false],
                    ["$74.1 \\degree$", 1, false],
                    ["There is no upper limit", 0, false]
                ],
                explain: "In general, we can solve for the required friction by seeing the conditions where the formula $a = \\alpha R$ is satisfied. First, we can solve for the linear acceleration in terms of $\\theta$, which gives us $a = g(\\sin \\theta - \\mu\\cos\\theta)$. The angular acceleration can be found by analyzing the torque about the point of contact, which gives us the equation $mg \\sin \\theta R = \\frac75 mR^2 \\alpha$, which gives us the equation $a = \\frac57 g \\sin \\theta$. Setting these two equations equal to each other and solving for $\\theta$ gives us $\\tan \\theta = \\frac{7\\mu}{2}$. Since we want the maximum possible angle, we take $\\mu = 1$ (the highest possible value of the coefficient of static friction) and get $\\theta = 74.1\\degree$."
            },
            {
                number: 5,
                question: "A spool can be modelled as an object with an outer radius $R$ and an inner radius $r$. A light string is wound around the inner radius and pulled. What must be the angle $\\theta$ that the string makes with the horizontal if the spool translates without rotating? <br><img src=\"/rotation/Problem 11.png\" style=\"max-width:250px\" class='rounded'/>",
                answers: [
                    ["$0\\degree$", 0, false],
                    ["$\\arccos \\left( \\frac{r}{R} \\right)$", 1, false],
                    ["$\\arctan \\left( \\frac{r}{R} \\right)$", 0, false],
                    ["Not possible", 0, false]
                ],
                explain: "The tension force in the string must run directly through the point of contact of the spool with the ground in order to prevent rotation. This means that the angle $\\theta$ must satisfy $\\cos \\theta = \\frac{r}{R}$, which gives us $\\theta = \\arccos \\left( \\frac{r}{R} \\right)$."
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
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Mouse, MouseConstraint} from 'matter-js'
const inputFriction = ref(0.05)
const inputInertia = ref(20)
const viewportMsg = ref('')
let wheelRef = null
let currentWidth = 0

watch([inputFriction, inputInertia], () => {
    if (wheelRef) {
        // Update friction for all parts of the compound body
        wheelRef.parts.forEach(part => {
            part.friction = inputFriction.value
            part.frictionStatic = inputFriction.value * 15
        })
        
        // Update inertia with proper width scaling
        Body.setInertia(wheelRef, 3000 * Math.pow(10, inputInertia.value / 20) / 1000 * currentWidth)
    }
})

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

function runRolling() {
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
    document.getElementById("roll").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup

    var width = 0.5 * window.innerWidth > 1000 ? 1000 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 600 / 1000 * width
    currentWidth = width  // Store width for inertia calculations

    // create a renderer
    var render = Render.create({
        element: document.getElementById('roll'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#000"
        }
    });
    currentRender = render // Store reference for cleanup

    // run the renderer
    Render.run(render);

    var wheelrim = Bodies.circle(500 / 1000 * width, 450 / 1000 * width, 50 / 1000 * width, {
        render: { fillStyle: 'cyan' }
    });
    var wheelcenter = Bodies.circle(500 / 1000 * width, 450 / 1000 * width, 45 / 1000 * width, {
        render: { fillStyle: 'black' }
    });
    var spokes = [
        Bodies.rectangle(500 / 1000 * width, 450 / 1000 * width, 100 / 1000 * width, 5 / 1000 * width, { render: { fillStyle: 'cyan' } }),
        Bodies.rectangle(500 / 1000 * width, 450 / 1000 * width, 5 / 1000 * width, 100 / 1000 * width, { render: { fillStyle: 'cyan' } }),
    ]

    wheelRef = Body.create({
        parts: [wheelrim, wheelcenter, ...spokes],
        restitution: 0.5,
        frictionAir: 0,
        friction: inputFriction.value,
        frictionStatic: inputFriction.value * 15,
        inertia: 3000 * Math.pow(10, inputInertia.value / 20) / 1000 * width
    })

    var walls = [
        Bodies.rectangle(-100 / 1000 * width, 300 / 1000 * width, 200 / 1000 * width, 600 / 1000 * width, { render: { isVisible: false }, isStatic: true }),
        Bodies.rectangle(1100 / 1000 * width, 300 / 1000 * width, 200 / 1000 * width, 600 / 1000 * width, { render: { isVisible: false }, isStatic: true }),
        Bodies.rectangle(500 / 1000 * width, -100 / 1000 * width, 1000 / 1000 * width, 200 / 1000 * width, { render: { isVisible: false }, isStatic: true }),
        Bodies.rectangle(500 / 1000 * width, 700 / 1000 * width, 1000 / 1000 * width, 200 / 1000 * width, { render: { isVisible: false }, isStatic: true })
    ]

    var ground = Bodies.rectangle(500 / 1000 * width, 600 / 1000 * width, 1000 / 1000 * width, 100 / 1000 * width, { render: { fillStyle: '#888' }, isStatic: true })
    var leftramp = Bodies.polygon(0, 400 / 1000 * width, 3, 300 / 1000 * width, { render: { fillStyle: '#888' }, isStatic: true, angle: -Math.PI / 6 })
    var rightramp = Bodies.polygon(1000 / 1000 * width, 550 / 1000 * width, 3, 350 / 1000 * width, { render: { fillStyle: '#888' }, isStatic: true, angle: 2 * Math.PI / 3 })

    Composite.add(engine.world, [wheelRef, ...walls, ground, leftramp, rightramp])
    // create runner
    var runner = Runner.create()
    currentRunner = runner // Store reference for cleanup

    Runner.run(runner, engine)
    // run the engine
    Runner.run(runner, engine);

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
    runRolling()
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

</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Rolling Without Slipping</h1><br>
        <p>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            What exactly causes something to roll? Well, with this demo we'll explore that. Go and put the wheel on the
            different surfaces
            and try to get it to start rolling. Change the slider parameters to see what happens. Hopefully you get an
            understanding of
            what the factors that affect rolling are.
            <br><br>
            <figure>
                <h3>Rolling Motion Demo</h3><br>
                <div id="roll"></div>
                <button class="btn btn-outline-primary" @click="runRolling()">Reset</button><br>

                <div class="row justify-content-center m-auto" style="max-width:700px;">
                    <div class="col"><label>Moment of Inertia: {{ inputInertia }}</label><br><input type="range"
                            class="form-range" v-model="inputInertia" min="20" max="75" step="1"
                            style="width:fit-content" /></div>

                    <div class="col"><label>Coefficient of Friction: {{ inputFriction
                            }}</label><br><input type="range" class="form-range" v-model="inputFriction" min="0" max="1"
                            step=".01" style="width:fit-content" /></div>
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            You might have noticed that sometimes the wheel rolled very smoothly, while at other times it would slip
            while rotating. There is an obvious
            difference between these two kinds of motion. The first is what we call <b>rolling without slipping</b>, and
            the second is rolling with
            slipping. The first case is much more interesting, as it satisfies a number of interesting conditions.
            <br><br>
            <h4 class="text-center">Characteristics of Rolling</h4>
            <span v-show="level > 0">
                The rolling without slipping case involves smooth motion of the ball. It almost seems as if the
                rotational and translational
                motions are in lock-step. In fact, that's exactly what's happening. The rotational and linear motions of
                the ball are connected
                when this conditions is satisfied.
                <br><br>
                Because the rolling object does not slip, the distance travelled on the ground is related to the number
                of revolutions the object has
                gone through. Specifically, the distance that has been travelled is equal to the radius of the object
                times the angle it has rotated through. This is
                satisfied because there is no slipping between the two surfaces. It's kind of like unravelling a spool
                of string on the
                ground: the length of the string on the ground is related to how many times the spool has spun.
                <br><br>
                <figure>
                    <img src="/rotation/Figure 91.png" style="max-width:750px" />
                    <figcaption>Figure 1: The distance traced along the ground is the same as the arc length.
                    </figcaption>
                </figure>
                <br>
                The red length is the same on the circle as on the ground. This is in part due to the fact that at each
                instant, the point
                in contact with the ground is stationary relative to it. (That's why there's no slipping!) You can think
                of the object as "imprinting" itself
                on the ground as it rolls.
                <br><br>
                Also, rolling without slipping is impossible without friction. You might have noticed this from the
                demo, but even in real life you can't roll something
                on a low-friction surface like ice. This is because <b>static</b> friction (yes, static!) is required to
                keep the lowermost point of the rotating object from
                slipping with respect to the ground, and is also responsible for keeping it in place so the parts of the
                object around that point can
                "roll" around it.
                <br><br>
                However, this kind of friction doesn't cause the ball to lose any mechanical energy because it is
                static. Rather, it actually still maintains a state of
                energy conservation, as all it does is allow the object to roll. Typically, only kinetic friction causes
                a loss in mechanical energy.
                This is all probably very confusing to you right now, but I promise I'll talk more on this later. We
                need some more ground rules first.
                <br><br>
                <h4 class="text-center">Connecting Linear and Rotational Aspects of Rolling</h4>
                Anyway, this lets us write an equation that relates displacement $x$ of the object's center to the angle
                it has rolled through.
                <br><br>
                $$ x = R \theta $$
                <br>
                This might look a bit familiar to the equations we used to relate linear and angular quantities, but
                this time the linear quantites describe the center of mass
                rather than just the point we're looking at. Knowing equation also lets us write two others for velocity
                and acceleration, since they
                are related to position. Recall that these are all quantities describing the motion of the center of the
                rolling object, not the edge.
                <br><br>
                $$ v = \omega R$$
                $$ a = \alpha R $$
                <br>
                These three equations can describe the kinematics of a rolling object. However, we need to do a bit more
                in order to find the general
                method governing these rolling objects. This will require us to employ rotational dynamics techniques
                while the three equations above
                hold.
            </span>
            <span v-show="level == 0">
                Because the object rolls smoothly and doesn't slip, we can conclude a few things. The rotational and
                linear motion of the object must
                be related somehow because of the smooth rolling. In fact, they're related in that the distance the ball
                travels (technically the distance
                the center of the ball travels) is the same as the distance traced out along the surface of the ball
                while it rolls. Here's a diagram to
                explain what that means:
                <br><br>
                <figure>
                    <img src="/rotation/Figure 91.png" style="max-width:750px" />
                    <figcaption>Figure 1: The distance traced along the ground is the same as the arc length.
                    </figcaption>
                </figure>
                <br>
                <h4 class="text-center">Connecting Linear and Rotational Aspects of Rolling</h4>
                This is an essential part of rolling without slipping and only applies if that condition is satisfied.
                Now that we know this
                information, we can write a few things about the center of the object. These look like the equations
                we've seen before in rotational
                kinematics, but they
                describe the motion of the object's <b>center</b>, not one of the points on it.
                <br><br>
                $$ x = R \theta $$
                $$ v = \omega R $$
                $$ a = \alpha R $$
                <br>
                Also, note that without friction rolling is impossible. If you've ever tried to roll something on ice,
                you'll know that it begins
                slipping very easily. This is because friction plays a key role in forcing the object to start rolling.
                <br><br>
                Kinematics isn't enough to get us a thorough analysis of the situation, however. We need to consider the
                forces on the ball with
                an application of rotational dynamics in order to solve the problem. Buckle up, because we're heading
                into the harder stuff!
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1"><h4 class="text-center">The Axis of Rotation</h4>
            First, I want to pose an important question. How exactly does the ball roll? Which point does it rotate
            around? The answer is not
            what you might think at first, and is very deceptive. However, it's also the key to understanding rolling!
            <br><br>
            Let's take a look at a ball rolling down an incline. This is a pretty simple case that you've all probably
            seen before in the
            real world, so it should be familiar to you.
            <br><br>
            <figure>
                <img src="/rotation/Figure 92.png" style="max-width:500px" />
                <figcaption>Figure 2: So the ball rolls.</figcaption>
            </figure>
            <br>
            It might seem like the ball rotates around its center while rotating. <span v-show="level > 0">In fact,
                mathematically
                we can actually treat it as if the ball is rotating around the center, but this isn't what happens in
                reality! Many people
                still use this technique because it makes more sense to them, but I believe using the correct rotational
                axis actually makes
                the math easier.
            </span> Where it's actually rotating around might seem surprising, but will make sense later.
            <br><br>
            First of all, let's talk about the "easier" method of dealing with rolling. This involves splitting it up
            into rotational and translational
            motion, and considers the object as rotating around its center while the center has some speed. This just
            involves using those
            three kinematics relations we got earlier and can be helpful, but really is not the full picture.
            <br><br>
            The problem can actually be broken down into pure rotation about the axis where <b>the ball contacts the
                surface</b>. This is
            the only possible axis through which the object can rotate, because it's the only point of contact! We can
            break this down
            into a superposition of linear and rotational motion as I explained above, or (my personal preferred method)
            just use this axis and
            deal with it.
            <br><br>
            <figure>
                <img src="/rotation/Figure 93.png" style="max-width:500px" />
                <figcaption>Figure 3: It's really spinning. Really.</figcaption>
            </figure>
            <br>
            Of course, the point that contacts the ground changes as the ball rolls, which is why it's labelled an
            instantaneous
            pivot point. However, because objects that roll tend to have very high symmetry (because they're circular),
            the pivot point/pivot
            axis has the same moment of inertia at all times. It's always going to be at the edge of a circle, which is
            practically the same point
            no matter how the circle rotates.
            <br><br>
            <span v-show="level > 0">
                Of course, non-circular objects can also "roll", but their motion is much more complex and not uniform.
                If you've rolled a
                hexagonal pencil, you'll know that it rolls somewhat smoothly, but its motion is much less uniform than
                that of a cylindrical
                pencil. For squares, the result is even more extreme. The reason for this is because the object's center
                of mass has to lift a certain distance
                in order to actually be able to roll over onto its next side, which means its speed will change. You'll
                know this if you've ever tried to
                roll a square or rectangular object.
                <br><br>
                Anyway, back to the regularly scheduled discussion of rolling with circular objects.
                <br><br>
            </span>
            This means that the effective moment of inertia of the object is not the inertia about its center, but
            rather the inertia
            of a parallel axis a distance of one radius $R$ from the center. That means the moment of inertia has
            changed to be $MR^2$ more
            than the usual, according to the parallel-axis theorem. This is important to keep in mind when using this
            method of
            solving objects that are rolling.
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
            <h4 class="text-center">Practice Problems</h4>
            <div class="problem">
                What is the speed at the top of a cylinder that rolls along the ground with a center-of-mass
                velocity equal to $v$?
                <br><br>
                This one can be tricky, but is much easier if you apply what I talked about previously with the axis of
                rotation.
                <br><br>
                Hopefully, you could figure out how to do it. Essentially, we already know we have the equation:
                <br><br>
                $$ v = \omega R $$
                <br>
                Since we know the bottom of the cylinder is where the instantaneous axis of rotation is located, the
                center is going to be
                a distance $R$ from that point. Do we see something emerge now? The equation we got previously for the
                center (which is a distance $R$ from the axis of rotation) is really the
                same formula we got in rotational kinematics, only applied to the real axis of rotation at the point of
                contact!
                <br><br>
                Once we understand this, we realize that the top of the cylinder is one diameter away from the axis of
                rotation, or a distance
                of $2R$ from it. This lets us write the velocity at the top of the cylinder $v_t$ using the same
                kinematics relation:
                <br><br>
                $$ v_t = \omega (2R) = \bbox[3px,
                border: 0.5px solid
                white]{2 v} $$
                <br>
                Here's a diagram to sum things up nicely:
                <br><br>
                <figure>
                    <img src="/rotation/Figure 94.png" style="max-width:750px" />
                    <figcaption>Figure 4: Double the radius, double the speed!</figcaption>
                </figure>
            </div>
            <br>
            <span v-show="level > 0">
                That was a good simple problem, but not really a "true" rotation problem by algebra standards. Now,
                let's tackle a much
                more challenging problem by actually applying the idea that friction is required for rolling to our
                calculations.
                <br><br>
                <div class="problem">
                    What is the minimum coefficient of friction required for a solid ball to be able to roll down a ramp
                    inclined at $\theta = 30 \degree$?
                    <br><br>
                    This problem sounds simple, but is really not as simple as you might expect! It's hard to see what
                    the proper
                    approach to this problem should be, but I'm here to show you my preferred method for tackling these
                    problems.
                    <br><br>
                    First, we can consider the forces on the ball. We've got gravity, the normal force, and the
                    frictional force. Gravity is
                    pointed straight downwards at the center of mass, and the two other forces are located at the point
                    of contact. We'll do our
                    basic force analysis first, then deal with the torques on the object.
                    <br><br>
                    The forces on this are no different than a regular object moving down an incline plane in the
                    presence of
                    friction. In the y-direction (remembering to tilt our axes) we have a component of gravity and the
                    normal
                    force.
                    <br><br>
                    $$ mg \cos 30 \degree = F_N $$
                    <br>
                    In the x-direction, we have a component of gravity and the frictional force. They are not going to
                    be equal, since we know the
                    ball moves down the incline. Thus, we can use the Second Law:
                    $$ mg \sin 30\degree - \mu F_N = m a $$
                    <br>
                    We can combine the two force-balance equations to solve for the acceleration. You should be familar
                    with this by now, so I'm going to omit
                    most of the algebra. Look back at our inclined plane unit if you need a refresher.
                    <br><br>
                    $$ a = g\left( \dfrac{1-\mu \sqrt3}{2} \right)$$
                    <br>
                    Now, we want to deal with torques. Again, we have gravity at the center of mass and the two other
                    forces at the point of
                    contact. It's beneficial for us, then, to work with the point of contact as our axis of rotation,
                    since we can ignore the
                    two forces placed there in that context. Do you see why I prefer this method now?
                    <br><br>
                    Only the component of gravity parallel to the incline has any torque around the contact point, which
                    means that the total
                    torque is just equal to $\tau = mg \sin 30 \degree \cdot r $. This allows us to write Newton's
                    Second Law in rotational form:
                    <br><br>
                    $$ mg \sin 30 \degree \cdot r = I \alpha $$
                    <br>
                    Keep in mind that we're dealing with the axis that <b>goes through the point of contact</b> for a
                    solid sphere, which means that
                    the moment of inertia here is $I = \frac{2}{5}mr^2 + mr^2 = \frac{7}{5} mr^2 $. Therefore, we finish
                    the equation:
                    <br><br>
                    $$ \dfrac{mgr}{2}= \dfrac75 mr^2 \alpha $$
                    <br>
                    For rolling without slipping, $a = \alpha r$. We can therefore rewrite the previous equation,
                    simplifying as we do so:
                    <br><br>
                    $$ \dfrac{mg}{2}= \dfrac75 m a $$
                    $$ a = \dfrac{5}{14}g $$
                    <br>
                    This acceleration has to be the same as the acceleration we calculated using force analysis.
                    $$ \dfrac{5}{14} g = g\left( \dfrac{1-\mu \sqrt3}{2} \right)$$
                    $$ \dfrac57 = 1- \mu \sqrt3 $$
                    $$ \mu = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{2}{7 \sqrt 3} }$$
                    <br>
                    Phew!
                </div>
                <br>
            </span>
            <h4 class="text-center">Conclusion</h4>
            That's it for this special case of rotational dynamics! Rolling is a very common type of motion, so it only
            makes sense
            that we analyzed it extensively here. If you prefer, you can treat the rotational axis as being at the
            center of mass, but I
            personally prefer setting it where it actually is. At the end of the day, one might be easier to understand,
            but the other makes
            your mathematical life much easier.
            <br><br>
            We're moving on to talking about a few new topics in the next lesson that are pretty foundational. They are
            related to the concepts of
            energy and momentum which we learned earlier, but in rotational form. (You might be seeing a pattern...)
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/rotation/angular-momentum">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Rolling Problems</h1><br>
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