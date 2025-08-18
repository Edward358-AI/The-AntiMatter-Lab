<script setup>
useHead({
    title: 'Conservation of Linear Momentum',
    meta: [
        { name: 'description', content: 'Explore the principle of linear momentum conservation, including its definition and applications in collisions and other interactions.' }
    ]
})
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Constraint, Mouse, MouseConstraint} from 'matter-js'
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).LinMomConsrv


watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false,false], [false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "What fundamental principle is behind the conservation of linear momentum?",
                answers: [
                    ["Conservation of energy", 0, false],
                    ["Newton's Second Law", 0, false],
                    ["Newton's Third Law", 1, false],
                    ["Impulse-momentum theorem", 0, false]
                ],
                explain: "Newton's Third Law states that you have equal and opposite force pairs, which means that you have equal and opposite impulses exerted between two objects that interact with forces. This means that the total change in momentum of the two objects as a system will be zero, which is the essence of momentum conservation."
            },
            {
                number: 1,
                question: "Can mechanical energy be conserved while linear momentum is not?",
                answers: [
                    ["Yes, because they are two different things", 0, false],
                    ["No, because the conditions for conservation overlap", 1, false],
                    ["Yes, because mechanical energy is more easily conserved", 0, false],
                    ["No, because linear momentum is not conserved in general", 0, false]
                ],
                explain: "The condition for conservation of linear momentum is that there has to be no net external force on a system, while for conservation of mechanical energy it is no net external force and no nonconservative internal forces. This means that the conditions for conservation of mechanical energy are included within those for linear momentum."
            },
            {
                number: 2,
                question: "How does a rocket engine work in the vacuum of space?",
                answers: [
                    ["It converts fuel into momentum", 0, false],
                    ["It uses energy to maintain its speed", 0, false],
                    ["It experiences no air resistance", 0, false],
                    ["It propels hot gas backwards to accelerate", 1, false]
                ],
                explain: "Rocket engines propel hot gases out the back, which according to the conservation of linear momentum will result in the rocket gaining momentum in the opposite directions. This allows them to accelerate in the vacuum of space, where there is nothing they can push against."
            },
            {
                number: 3,
                question: "Which of these best decsribes what Newton's Cradle is designed to demonstrate?",
                answers: [
                    ["Consevation of momentum", 0, false],
                    ["Conservation of energy", 0, false],
                    ["Conservation of mechanical energy", 0, false],
                    ["Both the 1st and 3rd answer choice", 1, false]
                ],
                explain: "Newton's Cradle demonstrates both the conservation of momentum and the conservation of mechanical energy, at least under ideal conditions. The balls transfer momentum to each other, but conservation of mechanical energy ensures that the number of balls that pop up is equal to the number of balls that were initially set in motion."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "A madman in a car decides to project a 30 kilogram suitcase backwards out of his 1000 kg car (that means an initial total mass of 1030 kg!), which is moving at $25~\\textrm{m/s}$. If the final speed of the car is $45~\\textrm{m/s}$ (!!), what speed was the suitcase thrown with?",
                answers: [
                    ["597 m/s", 0, false],
                    ["642 m/s", 1, false],
                    ["667 m/s", 0, false],
                    ["692 m/s", 0, false]
                ],
                explain: "The total initial momentum of the system is $p = mv = 25750 ~\\textrm{kg} \\cdot \\textrm{m/s}$. The final momentum of the car is $p = 45000 ~\\textrm{kg m/s}$. The suitcase's momentum must then be $25750 - 45000 = -19250 ~\\textrm{kg m/s}$, which means that since the suitcase has a mass of 30 kg, its speed (we drop the negative sign for speed) is $v = p/m = 19250/30 = 642 ~\\textrm{m/s}$."
            },
            {
                number: 1,
                question: "Can mechanical energy be conserved while linear momentum is not?",
                answers: [
                    ["Yes, because they are two different things", 0, false],
                    ["No, because the conditions for conservation overlap", 1, false],
                    ["Yes, because mechanical energy is more easily conserved", 0, false],
                    ["No, because linear momentum is not conserved in general", 0, false]
                ],
                explain: "The condition for conservation of linear momentum is that there has to be no net external force on a system, while for conservation of mechanical energy it is no net external force and no nonconservative internal forces. This means that the conditions for conservation of mechanical energy are included within those for linear momentum."
            },
            {
                number: 2,
                question: "A battleship fires fourteen 386 kg shells horizontally at a speed of 850 m/s. If the battleship has a mass of 31,360 metric tons (1 metric ton = 1000 kg), what is the recoil speed of the battleship?",
                answers: [
                    ["0.146 m/s", 1, false],
                    ["0.0104 m/s", 0, false],
                    ["0.172 m/s", 0, false],
                    ["0.125 m/s", 0, false]
                ],
                explain: "The momentum carried by the fourteen shells is $p = 14 \\cdot 386 \\cdot 850 = 4,600,400 ~\\textrm{kg m/s}$. The battleship's mass is $31,360,000 ~\\textrm{kg}$, and the total momentum of the shells has to equal the momentum of the ship because the initial momentum of the system is zero and there is no net external force. Therefore, the recoil speed of the battleship is $v = 0.146 ~\\textrm{m/s}$."
            },
            {
                number: 3,
                question: "A sharp 0.1 kg dart is thrown with a speed of 85 m/s at a block of wood that sits on a frictionless surface. The block has a mass of 0.5 kg, and the dart passes through the block. If the final velocity of the block is 2.5 m/s, what is the velocity of the dart after it passes through the block?",
                answers: [
                    ["18.5 m/s", 0, false],
                    ["97.5 m/s", 0, false],
                    ["12.5 m/s", 0, false],
                    ["72.5 m/s", 1, false]
                ],
                explain: "The initial momentum of the system is equal to the initial momentum of the dart, which is $p = 0.1 \\cdot 85 = 8.5 ~\\textrm{kg m/s}$. The final momentum of the system is equal to the momentum of the block plus the momentum of the dart after it passes through, and we can completely solve for the final momentum of the block. Thus, we can take the difference of the initial momentum and the final momentum of the block to find the final momentum of the dart, which lets us find its velocity. Doing the calculations gives us $v = 72.5 ~\\textrm{m/s}$."
            },
            {
                number: 4,
                question: "Find the recoil velocity of the Earth ($M_E = 5.97 \\times 10^{24}~\\textrm{kg}$) due to a 70 kg person jumping upwards with a velocity of 2 m/s.",
                answers: [
                    ["$1.17 \\times 10^{-12} ~\\textrm{m/s}$", 0, false],
                    ["$2.35 \\times 10^{-22} ~\\textrm{m/s}$", 0, false],
                    ["$2.35 \\times 10^{-23} ~\\textrm{m/s}$", 1, false],
                    ["$1.45 \\times 10^{-20} ~\\textrm{m/s}$", 0, false]
                ],
                explain: "The initial momentum of the system is zero, so we know the final momentum of the Earth and person must be equal. We can easily find the momentum of the person, which is $p = 70 \\cdot 2 = 140 ~\\textrm{kg m/s}$. The Earth has a mass of $5.97 \\times 10^{24} ~\\textrm{kg}$, so we can find its recoil velocity by dividing the momentum by the mass: $v_E = p/M_E = 2.35 \\times 10^{-23} ~\\textrm{m/s}$. This number is so low that we usually just say that it's zero."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "A madman in a car decides to project a 30 kilogram suitcase backwards out of his 1000 kg car (that means an initial total mass of 1030 kg!), which is moving at $25~\\textrm{m/s}$. If the final speed of the car is $45~\\textrm{m/s}$ (!!), what speed was the suitcase thrown with?",
                answers: [
                    ["597 m/s", 0, false],
                    ["642 m/s", 1, false],
                    ["667 m/s", 0, false],
                    ["692 m/s", 0, false]
                ],
                explain: "The total initial momentum of the system is $p = mv = 25750 ~\\textrm{kg} \\cdot \\textrm{m/s}$. The final momentum of the car is $p = 45000 ~\\textrm{kg m/s}$. The suitcase's momentum must then be $25750 - 45000 = -19250 ~\\textrm{kg m/s}$, which means that since the suitcase has a mass of 30 kg, its speed (we drop the negative sign for speed) is $v = p/m = 19250/30 = 642 ~\\textrm{m/s}$."
            },
            {
                number: 1,
                question: "Can mechanical energy be conserved while linear momentum is not?",
                answers: [
                    ["Yes, because they are two different things", 0, false],
                    ["No, because the conditions for conservation overlap", 1, false],
                    ["Yes, because mechanical energy is more easily conserved", 0, false],
                    ["No, because linear momentum is not conserved in general", 0, false]
                ],
                explain: "The condition for conservation of linear momentum is that there has to be no net external force on a system, while for conservation of mechanical energy it is no net external force and no nonconservative internal forces. This means that the conditions for conservation of mechanical energy are included within those for linear momentum."
            },
            {
                number: 2,
                question: "A battleship fires fourteen 386 kg shells horizontally at a speed of 850 m/s. If the battleship has a mass of 31,360 metric tons (1 metric ton = 1000 kg), what is the recoil speed of the battleship?",
                answers: [
                    ["0.146 m/s", 1, false],
                    ["0.0104 m/s", 0, false],
                    ["0.172 m/s", 0, false],
                    ["0.125 m/s", 0, false]
                ],
                explain: "The momentum carried by the fourteen shells is $p = 14 \\cdot 386 \\cdot 850 = 4,600,400 ~\\textrm{kg m/s}$. The battleship's mass is $31,360,000 ~\\textrm{kg}$, and the total momentum of the shells has to equal the momentum of the ship because the initial momentum of the system is zero and there is no net external force. Therefore, the recoil speed of the battleship is $v = 0.146 ~\\textrm{m/s}$."
            },
            {
                number: 3,
                question: "A sharp 0.1 kg dart is thrown with a speed of 85 m/s at a block of wood that sits on a frictionless surface. The block has a mass of 0.5 kg, and the dart passes through the block. If the final velocity of the block is 2.5 m/s, what is the velocity of the dart after it passes through the block?",
                answers: [
                    ["18.5 m/s", 0, false],
                    ["97.5 m/s", 0, false],
                    ["12.5 m/s", 0, false],
                    ["72.5 m/s", 1, false]
                ],
                explain: "The initial momentum of the system is equal to the initial momentum of the dart, which is $p = 0.1 \\cdot 85 = 8.5 ~\\textrm{kg m/s}$. The final momentum of the system is equal to the momentum of the block plus the momentum of the dart after it passes through, and we can completely solve for the final momentum of the block. Thus, we can take the difference of the initial momentum and the final momentum of the block to find the final momentum of the dart, which lets us find its velocity. Doing the calculations gives us $v = 72.5 ~\\textrm{m/s}$."
            },
            {
                number: 4,
                question: "Find the recoil velocity of the Earth ($M_E = 5.97 \\times 10^{24}~\\textrm{kg}$) due to a 70 kg person jumping upwards with a velocity of 2 m/s.",
                answers: [
                    ["$1.17 \\times 10^{-12} ~\\textrm{m/s}$", 0, false],
                    ["$2.35 \\times 10^{-22} ~\\textrm{m/s}$", 0, false],
                    ["$2.35 \\times 10^{-23} ~\\textrm{m/s}$", 1, false],
                    ["$1.45 \\times 10^{-20} ~\\textrm{m/s}$", 0, false]
                ],
                explain: "The initial momentum of the system is zero, so we know the final momentum of the Earth and person must be equal. We can easily find the momentum of the person, which is $p = 70 \\cdot 2 = 140 ~\\textrm{kg m/s}$. The Earth has a mass of $5.97 \\times 10^{24} ~\\textrm{kg}$, so we can find its recoil velocity by dividing the momentum by the mass: $v_E = p/M_E = 2.35 \\times 10^{-23} ~\\textrm{m/s}$. This number is so low that we usually just say that it's zero."
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

const inputValue = ref('1')
const viewportMsg = ref('')

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

function runNewtonsCradle() {

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
    document.getElementById("newtoncradle").innerHTML = ""

    // create engine
    var engine = Engine.create(),
        world = engine.world
    currentEngine = engine // Store reference for cleanup
    var width = 0.5 * window.innerWidth > 700 ? 700 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 400 / 700 * width
    // create renderer
    var render = Render.create({
        element: document.getElementById("newtoncradle"),
        engine: engine,
        options: {
            width: width,
            height: height,
            showVelocity: true,
            wireframes: false,
            background: "#000"
        }
    })
    currentRender = render // Store reference for cleanup
    Render.run(render)

    // create runner
    var runner = Runner.create()
    currentRunner = runner // Store reference for cleanup
    Runner.run(runner, engine)

    // allow for customization

    // see newtonsCradle function defined later in this file
    var cradle = newtonsCradle(160 / 700 * width, 100 / 700 * width, 6, 30 / 700 * width, 200 / 700 * width)
    Composite.add(world, cradle)
    Body.translate(cradle.bodies[0], { x: -150 / 700 * width, y: -100 / 700 * width })
    if (inputValue.value >= 2 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[1], { x: -145 / 700 * width, y: -90 / 700 * width })
    }
    if (inputValue.value >= 3 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[2], { x: -140 / 700 * width, y: -80 / 700 * width })
    }
    if (inputValue.value >= 4 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[3], { x: -135 / 700 * width, y: -70 / 700 * width })
    }
    if (inputValue.value >= 5 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[4], { x: -130 / 700 * width, y: -60 / 700 * width })
    }
    if (inputValue.value == 6) {
        Body.translate(cradle.bodies[5], { x: -125 / 700 * width, y: -50 / 700 * width })
    }
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

    Composite.add(world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 50 / 700 * width },
        max: { x: 600 / 700 * width, y: 400 / 700 * width }
    })
}

onMounted(() => {
    runNewtonsCradle()
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

function newtonsCradle(xx, yy, number, size, length) {

    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' })

    for (var i = 0; i < number; i++) {
        var separation = 1.9,
            circle = Bodies.circle(xx + i * (size * separation), yy + length, size,
                { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, slop: size * 0.05 }),
            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle })
        circle.render.fillStyle = "#001166"

        Composite.addBody(newtonsCradle, circle)
        Composite.addConstraint(newtonsCradle, constraint)
    }

    return newtonsCradle
}
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Conservation of Linear Momentum</h1><br>
        <p>
        <div v-show="page === 0">
            Have you ever heard of the Newton's Cradle? It's that one physics "toy" that many executives and businessmen
            have lying on their office desks, with metal balls hitting each other. Yeah, you know what I'm talking
            about. Even
            if you didn't, here's an interactive demonstration anyways. You can move the balls around, but try not to
            break anything. (Not that
            it really matters if you do, there's a reset button.)
            <br><br>
            <figure>
                <h3>Newton's Cradle Demo</h3><br>
                <div id="newtoncradle"></div>
                <button class="btn btn-outline-primary" @click="runNewtonsCradle()">Reset</button>
                <br>
                <label>Number of balls: {{ inputValue }}</label><br>
                <input type="range" class="form-range" v-model="inputValue" min="1" max="6" step="1"
                    style="width:fit-content;" /><br>
                <span class="warn">{{ viewportMsg }}
                </span>
            </figure>
            <br>
            Now, what does this have to do with momentum? Well, notice that the number of balls set in motion initially
            is
            equal to the number of balls that "pop up" after they collide. And, at least at first, the balls seem to fly
            away with equal velocities. The physics engine isn't perfect, so eventually the behavior decomposes.
            <br><br>
            This indicates that the momentum carried by the balls coming in is the same as the momentum carried by the
            balls
            leaving! This leads us to a new physics principle: the conservation of linear momentum.
            <br><br>
            <span v-show="level > 0">
                Like the conservation of energy principle, there are certain conditions that must be satisfied for
                momentum
                to be conserved. The conditions are very similar, but a little less restrictive. The total linear
                momentum
                of a system will be conserved if no net external force acts on the system. A key takeaway is that like
                energy, momentum
                is conserved for a <b>system</b> of objects, not typically just a single object.
                <br><br>
                You might recall from our discussion of energy that mechanical energy is not conserved if there are
                nonconservative interactions.
                Well, momentum simply does not care about this. Internal forces, be they conservative or not, will still
                result in
                conservation of linear momentum. In fact, we'll learn about cases where momentum is conserved but
                mechanical energy is not.
                <br><br>
                We can use the idea of impulse to explain why internal interactions conserve momentum. According to
                Newton's Third Law,
                if one object exerts an impulse on another, it will receive an oppositely directed and equal impulse
                from that object. This means
                the total change in momentum of the two objects as a system will be zero!
            </span>
            <span v-show="level == 0">
                Now, we said before that mechanical energy isn't always conserved. The same is true for linear momentum!
                The conditions
                for conservation of linear momentum are actually more general than the conditions for conservation of
                mechanical energy, if
                you can believe it. However, the way we think of momentum conservation is slightly different than
                energy.
                <br><br>
                First off, what do we mean by conservation of momentum? What are the objects we're going to deal with?
                Well, we're almost always dealing with a <b>system</b> of objects. Think about two
                balls hitting each other. Neither ball's momentum is individually conserved, but their sum, which is
                equal to the total linear momentum
                of the system, will be conserved after the interaction.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>

        </div>
        <div v-show="page === 1">
            <span v-show="level > 0">
                There is another key idea that is associated with conservation of linear momentum. If all of the
                previous
                conditions are satisfied, we can conclude that another fact must be true. I'm going to introduce the
                idea of the
                center of mass, which can be thought of as where a system will "balance" under the influence of gravity.
                It's really
                the normalized form of the first moment of mass, however:
                <br><br>
                $$ x_{cm} = \dfrac{m_1 x_1 + m_2 x_2 + m_3 x_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                This can be written as a summation, and I think you could do it just by analyzing this equation. Because
                we're trying to
                go over this concept for the sake of momentum, I won't write it here.
                The center of mass velocity and acceleration are defined similarly.
                <br><br>
                $$ v_{cm} = \dfrac{m_1 v_1 + m_2 v_2 + m_3 v_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                $$ a_{cm} = \dfrac{m_1 a_1 + m_2 a_2 + m_3 a_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                For the condition of no net external force on a system, the center of mass acceleration will be zero (if
                you generalize
                Newton's Second Law to entire systems, you will get this result). This means that the center of mass
                velocity will remain constant while momentum is conserved. We will talk about the center of mass in
                detail in a future lesson.
                <br><br>
                The "center of mass" is really an abstract concept that isn't tangible. However, if we draw in the
                center of mass on a
                diagram and calculate how it moves while bodies in a system are interacting with each other, we will see
                that even if the motion
                of the bodies in the system is very chaotic, the center of mass remains moving in a straight line with
                constant velocity. If you don't understand
                this now, don't worry.
                <br><br>
                With that little detour out of the way, we can finally express the Conservation of Linear Momentum in
                words:
            </span>
            <span v-show="level == 0">
                With that, we can talk about the conditions under which linear momentum will be conserved. It's actually
                a very simple
                and elegant condition: linear momentum is conserved if no net external force acts on the system. This
                might sound
                very similar to the condition for mechanical energy conservation, but with one key difference.
                <br><br>
                Mechanical energy is only conserved if there are no nonconservative internal forces. In other words, if
                the objects in the
                system have friction with each other, mechanical energy won't be conserved. However, momentum is always
                conserved as long
                as there is no net external force. Even nonconservative internal interactions will preserve the total
                momentum.
                <br><br>
                Our old friend Newton's Third Law comes in here to help explain why. Newton's Third Law states that a
                force will have an equal an
                opposite reaction force, which means that an impulse exerted by object A on object B will result in an
                equal and opposite impulse
                exerted from object B on object A. This means the total change in momentum of the system balances out to
                be zero, since the two
                impulses are equal and oppositely directed! See, the old concepts we learned such a long time ago are
                still coming to haunt &mdash; I mean help
                &mdash; us!
                <br><br>
                We can finally write the sentence that codifies the conservation of linear momentum:
            </span>
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <b>The Law of Conservation of Linear Momentum:</b>
                <br><i>If no net external force acts on a system, the total momentum of the system must remain constant.
                </i>
            </div>
            <br>
            This might not seem useful right now, but in some specific scenarios it is essential to use this result in
            order to solve problems. By itself, this conservation law actually cannot really solve problems, but given
            just a few more initial conditions and/or constraints, we can unleash the full potential of this new
            conservation law.

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
            We will be talking more in-depth about the two most common types of momentum problems, but here I'm going to
            present
            a very generalized problem on momentum just to get you started.
            <br><br>
            <div class="problem">
                <span v-show="level > 0">
                    An astronaut floating in outer space has a mass $ M = 60 ~\textrm{kg} $ and is carrying a box of
                    tools
                    of mass $m = 15 ~\textrm{kg}$. She has run out of propulsion power on her backpack and must return
                    to her
                    spacecraft by other means. First, how would she achieve this?
                    <br><br>
                    <figure>
                        <img src="/momentum/Figure 66.png">
                        <figcaption>
                            Figure 1: The astronaut's predicament.
                        </figcaption>
                    </figure>
                    <br>
                    Well, in the vacuum of outer space there are no forces acting on the astronaut. Therefore, the total
                    momentum of the system has to be conserved. So, if one of the bodies was to be given some momentum,
                    the other
                    one would also gain an equal amount of momentum in the other direction!
                    <br><br>
                    This is the key: she must throw
                    the box of tools away from the spacecraft such that she gains some momentum and begins to drift
                    towards her
                    spaceship. Like I mentioned in the last lesson, this is also sort of how rockets work.
                    <br><br>
                    Now that we have the mechanism of action established, let's add in a few more factors so we can make
                    this a solvable
                    problem.
                    <br><br>
                    The astronaut, unfortunately, was not conservative with her oxygen and now only has 5 minutes worth
                    of it left.
                    She is stranded a distance of 3 kilometers from the spaceship. How fast must she throw the box of
                    tools such
                    that she can make it back in time? She is stationary relative to the ship.
                    <br><br>
                    First, we can do the easy step and find the required velocity for the astronaut to just be able to
                    drift back in time. We know
                    the amount of time she has left as well as the distance to the spacecraft, so this is an easy
                    kinematics calculation.
                    <br><br>
                    $$ v_{a} = \dfrac{x}{t} = 10 ~\textrm{m/s} $$
                    <br>
                    Next, we can use this velocity along with the fact that total linear momentum must be conserved in
                    order to solve the problem.
                    <br><br>
                    $$ p_{tot} = 0 $$
                    <br>
                    $$ Mv_{a} = m v_{b} $$
                    <br>
                    The subscripts $a$ and $b$ denote the astronaut and box, respectively. We are able to write the
                    second equation because the
                    two momenta are directly oppositely directed (momentum is a vector!). With this, we can solve the
                    problem:
                    <br><br>
                    $$ v_b = \dfrac{M}{m} v_a = \bbox[3px,
                    border: 0.5px solid
                    white] {40 ~\textrm{m/s} } $$
                    <br>
                    This is around 89.4 miles per hour. We better hope our astronaut hits the gym frequently.
                </span>
                <span v-show="level == 0">
                    An astronaut is stranded in outer space after her propulsion runs out. She is only carrying a box of
                    tools and nothing else.
                    Is there any way she could return to the spacecraft before her oxygen runs out?
                    <br><br>
                    <figure>
                        <img src="/momentum/Figure 66.png">
                        <figcaption>
                            Figure 1: The astronaut's predicament.
                        </figcaption>
                    </figure>
                    <br>
                    First off, you might think that just flailing your arms around (in a methodical way) might get you
                    moving. After all, this
                    is what swimmers do, and even skydivers can somewhat control their movement and maneuver in the air
                    this way. However, space is
                    a vacuum where there is literally nothing.
                    <br><br>
                    On Earth, you can push against water or even air because they have some mass, and redirecting
                    them will cause you to move and control your movements. Swimmers push water behind them in order to
                    propel themselves forward. In the
                    vacuum of space, there is nothing for you to push against, so moving your arms won't do anything.
                    <br><br>
                    We can have one key takeaway here, however. When you push on a fluid, you are redirecting it away
                    from you, which
                    causes you to move in the opposite direction of where you pushed it. Are you seeing a connection? It
                    doesn't have to
                    be a fluid!
                    <br><br>
                    We can assume the total momentum of the combination of astronaut and toolbox is zero, and it will
                    remain zero no matter what
                    the astronaut does to the toolbox because there are no external forces in the vacuum of space.
                    Therefore, she can simply
                    throw the toolbox away from the spacecraft to propel herself towards the spacecraft.
                    <br><br>
                    The reason for this is simple. The total momentum of the system must remain zero, so her giving the
                    toolbox some
                    momentum away from the spaceship must mean that she gains an equal but oppositely directed momentum
                    (technically due to Newton's Third Law) towards the spaceship, which
                    translates to velocity directed back towards the ship!
                    <br><br>
                    How fast she moves, however, depends on how hard she can throw the tools (how much speed she can
                    impart to them), because the momentum she gives to
                    the toolbox is the same as the momentum that she gains.
                </span>
            </div>
            <br>
            Now, this lesson may not have been the longest, but its results will be the focal point of a lot of the
            later lessons in this unit. Remember
            the results we have derived here, because they will be useful later on! With that said, we can move on to
            talking about center of
            mass, which is also a key concept that leads itself well into our discussion of more specific momentum
            topics later on. Enough said, hit that
            button to move on!
            <br>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/momentum/center-of-mass">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
        </p>

    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Conservation of Momentum Problems</h1><br>
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