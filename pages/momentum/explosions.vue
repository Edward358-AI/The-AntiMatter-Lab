<script setup>
useHead({
    title: 'Explosions',
    meta: [
        { name: 'description', content: 'Explore the physics of explosions, including the principles of conservation of momentum and energy transfer.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Explosions


watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false,false], [false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "An explosion does <b>not</b> conserve which of the following quantities?",
                answers: [
                    ["Linear momentum", 0, false],
                    ["Mechanical energy", 1, false],
                    ["Energy", 0, false],
                    ["None of the above", 0, false]
                ],
                explain: "Explosions never conserve mechanical energy because they always involve the release of energy from chemical potential energy. However, linear momentum and total energy are always conserved."
            },
            {
                number: 1,
                question: "Which of these can be considered an explosion in the physics sense?",
                answers: [
                    ["A gun being fired", 1, false],
                    ["A pendulum swinging", 0, false],
                    ["Two cars colliding head-on", 0, false],
                    ["A hammer falling on a piece of wood", 0, false]
                ],
                explain: "The firing of a gun ejects a small bullet at high speed in one direction, and the gun recoils backwards. This is essentially an explosion, where the total momentum is conserved but the energy is not."
            },
            {
                number: 2,
                question: "An explosion sends two pieces of a broken object that is initially at rest flying apart. If one piece flies directly off to the right, which direction does the other piece go?",
                answers: [
                    ["Right", 0, false],
                    ["Up", 0, false],
                    ["Left", 1, false],
                    ["Cannot be predicted", 0, false]
                ],
                explain: "Since the total initial momentum is zero, the total final momentum must also be zero. Therefore, if one piece goes to the right, the other piece must move to the left in order to balance the momentum."
            },
            {
                number: 3,
                question: "When a firework explodes in the air, the pieces of the firework all experience an external force from gravity. Why can we still treat momentum as conserved?",
                answers: [
                    ["Explosions are special cases", 0, false],
                    ["Mechanical energy is not conserved", 0, false],
                    ["The force of gravity is small", 0, false],
                    ["The explosive force is much greater than gravity", 1, false]
                ],
                explain: "Because the forces involved in the explosion are many orders of magnitude larger than gravity, we can treat momentum as still conserved because the effect by the external forces is very negligible."     
                
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "Blocks A and B are placed on either side of a spring (but <b>not</b> attached to it). The spring is compressed and then released, pushing the blocks apart. If block A moves off with speed $v_A$ and block B moves off with speed $v_B$, what is the ratio of their masses $\\frac{m_A}{m_B}$?",
                answers: [
                    ["$\\frac{v_A}{v_B}$", 0, false],
                    ["$v_A v_B$", 0, false],
                    ["$\\frac12\\frac{v_A}{v_B}$", 0, false],
                    ["$\\frac{v_B}{v_A}$", 1, false]
                ],
                explain: "This scenario is an explosion in a physics sense, and the initial momentum is zero. This means that the magnitudes of the final momenta of each block must be equal, so we get the equation $m_A v_A = m_B v_B$. Rearranging gives us the result $\\frac{m_A}{m_B} = \\frac{v_B}{v_A}$."
            },
            {
                number: 1,
                question: "A firework star is shot straight up into the air and explodes at the peak of its trajectory into two identical pieces, 15.8 meters above the ground. One piece reaches the ground 1.3 seconds after the explosion. Setting $t=0$ when the explosion occurs, how long does it take the other piece to reach the ground?",
                answers: [
                    ["1.30 s", 0, false],
                    ["1.18 s", 0, false],
                    ["2.48 s", 1, false],
                    ["1.89 s", 0, false]
                ],
                explain: "We know that both pieces must have the same speed after the explosion because they are identical and momentum must be conserved. We can find this speed with the fact that it takes the piece shot downwards 1.3 seconds to reach the ground, using the kinematics relation $y = v_0 t + \\frac12 a t^2$. We find that $v_0 = \\frac{y}{t}+\\frac{gt}{2} = 5.78~\\textrm{m/s}$. The other piece is shot upwards with the same speed, so we can find the time it takes to reach the ground. We can either brute force this, which would require solving a quadratic, or we can use clever reasoning. The time to fall back down to the explosion height can be found easily as $t_1 = \\frac{2v_0}{g}$. At this point, the speed is the same but downwards, which is an identical situation to the firework fragment that was ejected straight down. Thus, we add 1.3 seconds to the answer $t_1$ we get, obtaining $t = 2.48~\\textrm{s}$."
            },
            {
                number: 2,
                question: "What quantity is not conserved in an explosion?",
                answers: [
                    ["Momentum", 0, false],
                    ["Mechanical energy", 1, false],
                    ["Energy", 0, false],
                    ["None of the above", 0, false]
                ],
                explain: "The mechanical energy is not conserved, as the pieces gain kinetic energy after an explosion. This energy usually comes from chemical potential energy if it's a conventional explosion, but this is not a rule! The first problem is an explosion that uses a spring."
            },
            {
                number: 3,
                question: "A 10 kg potato cannon malfunctions and causes the potato to explode as it is being fired. The potato breaks into two pieces, one of mass 0.3 kg and the other of mass 0.2 kg. The 0.3 kg piece is found to be moving at 60 m/s directly to the right, and the 0.2 kg piece is moving at 100 m/s at an angle $\\theta = 15 \\degree$ above the horizontal. With what speed does the launcher recoil?",
                answers: [
                    ["3.73 m/s", 0, false],
                    ["0.518 m/s", 0, false],
                    ["3.77 m/s", 1, false],
                    ["4.25 m/s", 0, false]
                ],
                explain: "The momentum of the two pieces and launcher must sum to zero, as the initial momentum is zero. We can write the momentum conservation equations in both the x- and y-directions. In the x-direction, we have $m_1 v_1 + m_2 v_2 \\cos\\theta = m_L v_{Lx}$, and in the y-direction we have $m_2 v_2 \\sin\\theta  =  m_L v_{Ly}$. We then solve for the components of the launcher's velocity, which are $v_{Lx} = 3.73~\\textrm{m/s}$ and $v_{Ly} = 0.518~\\textrm{m/s}$. The magnitude of the velocity is then $v_L = \\sqrt{v_{Lx}^2 + v_{Ly}^2} = 3.77~\\textrm{m/s}$."
            },
            {
                number: 4,
                question: "A typical explosive releases 3 MJ of energy. If a 1 kg firework explodes into some number of identical pieces, what is the speed of each piece immediately after the explosion, assuming all of the energy goes into kinetic energy?",
                answers: [
                    ["2449 m/s", 1, false],
                    ["775 m/s", 0, false],
                    ["1230 m/s", 0, false],
                    ["Cannot be determined", 0, false]
                ],
                explain: "Let's say there are an arbitrary number $N$ of pieces. Each piece has a mass of $m = \\frac{M}{N}$, and the total kinetic energy is $K = 3 \\times 10^6~\\textrm{J}$. The kinetic energy of all the pieces can also be written as $K = N \\frac12 \\frac{M}{N} v^2 = \\frac12 Mv^2$. Using this, we easily find that the velocity of each piece is $v = \\sqrt{\\frac{2K}{M}} = 2449~\\textrm{m/s}$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "Blocks A and B are placed on either side of a spring (but <b>not</b> attached to it). The spring is compressed and then released, pushing the blocks apart. If block A moves off with speed $v_A$ and block B moves off with speed $v_B$, what is the ratio of their masses $\\frac{m_A}{m_B}$?",
                answers: [
                    ["$\\frac{v_A}{v_B}$", 0, false],
                    ["$v_A v_B$", 0, false],
                    ["$\\frac12\\frac{v_A}{v_B}$", 0, false],
                    ["$\\frac{v_B}{v_A}$", 1, false]
                ],
                explain: "This scenario is an explosion in a physics sense, and the initial momentum is zero. This means that the magnitudes of the final momenta of each block must be equal, so we get the equation $m_A v_A = m_B v_B$. Rearranging gives us the result $\\frac{m_A}{m_B} = \\frac{v_B}{v_A}$."
            },
            {
                number: 1,
                question: "A firework star is shot straight up into the air and explodes at the peak of its trajectory into two identical pieces, 15.8 meters above the ground. One piece reaches the ground 1.3 seconds after the explosion. Setting $t=0$ when the explosion occurs, how long does it take the other piece to reach the ground?",
                answers: [
                    ["1.30 s", 0, false],
                    ["1.18 s", 0, false],
                    ["2.48 s", 1, false],
                    ["1.89 s", 0, false]
                ],
                explain: "We know that both pieces must have the same speed after the explosion because they are identical and momentum must be conserved. We can find this speed with the fact that it takes the piece shot downwards 1.3 seconds to reach the ground, using the kinematics relation $y = v_0 t + \\frac12 a t^2$. We find that $v_0 = \\frac{y}{t}+\\frac{gt}{2} = 5.78~\\textrm{m/s}$. The other piece is shot upwards with the same speed, so we can find the time it takes to reach the ground. We can either brute force this, which would require solving a quadratic, or we can use clever reasoning. The time to fall back down to the explosion height can be found easily as $t_1 = \\frac{2v_0}{g}$. At this point, the speed is the same but downwards, which is an identical situation to the firework fragment that was ejected straight down. Thus, we add 1.3 seconds to the answer $t_1$ we get, obtaining $t = 2.48~\\textrm{s}$."
            },
            {
                number: 2,
                question: "What quantity is not conserved in an explosion?",
                answers: [
                    ["Momentum", 0, false],
                    ["Mechanical energy", 1, false],
                    ["Energy", 0, false],
                    ["None of the above", 0, false]
                ],
                explain: "The mechanical energy is not conserved, as the pieces gain kinetic energy after an explosion. This energy usually comes from chemical potential energy if it's a conventional explosion, but this is not a rule! The first problem is an explosion that uses a spring."
            },
            {
                number: 3,
                question: "A 10 kg potato cannon malfunctions and causes the potato to explode as it is being fired. The potato breaks into two pieces, one of mass 0.3 kg and the other of mass 0.2 kg. The 0.3 kg piece is found to be moving at 60 m/s directly to the right, and the 0.2 kg piece is moving at 100 m/s at an angle $\\theta = 15 \\degree$ above the horizontal. With what speed does the launcher recoil?",
                answers: [
                    ["3.73 m/s", 0, false],
                    ["0.518 m/s", 0, false],
                    ["3.77 m/s", 1, false],
                    ["4.25 m/s", 0, false]
                ],
                explain: "The momentum of the two pieces and launcher must sum to zero, as the initial momentum is zero. We can write the momentum conservation equations in both the x- and y-directions. In the x-direction, we have $m_1 v_1 + m_2 v_2 \\cos\\theta = m_L v_{Lx}$, and in the y-direction we have $m_2 v_2 \\sin\\theta  =  m_L v_{Ly}$. We then solve for the components of the launcher's velocity, which are $v_{Lx} = 3.73~\\textrm{m/s}$ and $v_{Ly} = 0.518~\\textrm{m/s}$. The magnitude of the velocity is then $v_L = \\sqrt{v_{Lx}^2 + v_{Ly}^2} = 3.77~\\textrm{m/s}$."
            },
            {
                number: 4,
                question: "A typical explosive releases 3 MJ of energy. If a 1 kg firework explodes into some number of identical pieces, what is the speed of each piece immediately after the explosion, assuming all of the energy goes into kinetic energy?",
                answers: [
                    ["2449 m/s", 1, false],
                    ["775 m/s", 0, false],
                    ["1230 m/s", 0, false],
                    ["Cannot be determined", 0, false]
                ],
                explain: "Let's say there are an arbitrary number $N$ of pieces. Each piece has a mass of $m = \\frac{M}{N}$, and the total kinetic energy is $K = 3 \\times 10^6~\\textrm{J}$. The kinetic energy of all the pieces can also be written as $K = N \\frac12 \\frac{M}{N} v^2 = \\frac12 Mv^2$. Using this, we easily find that the velocity of each piece is $v = \\sqrt{\\frac{2K}{M}} = 2449~\\textrm{m/s}$."
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
import { Engine, Render, Runner, Bodies, Body, Composite} from 'matter-js'
import { onMounted, onUnmounted, ref } from 'vue'

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

const strength = ref(1.0)
const viewportMsg = ref('')

var particles = [];

function runExplosion() {
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
    document.getElementById("explosion").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup
    engine.gravity.y = 0;
    var width = 0.5 * window.innerWidth > 800 ? 800 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('explosion'),
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
    // create runner

    var walls = [
        Bodies.rectangle(-50 / 800 * width, 400 / 800 * width, 100 / 800 * width, 800 / 800 * width, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(850 / 800 * width, 400 / 800 * width, 100 / 800 * width, 800 / 800 * width, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(400 / 800 * width, -50 / 800 * width, 800 / 800 * width, 100 / 800 * width, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(400 / 800 * width, 850 / 800 * width, 800 / 800 * width, 100 / 800 * width, { isStatic: true, render: { visible: true }, restitution: 1 })
    ];

    particles.length = 0; // reset
    const cols = 10;
    const rows = 10;
    const spacing = 30 / 800 * width;
    const startX = (400 / 800 * width - (cols * spacing) / 2);
    const startY = (400 / 800 * width - (rows * spacing) / 2);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const circle = Bodies.circle(startX + i * spacing, startY + j * spacing, 8 / 800 * width, {
                restitution: 1,
                friction: 0,
                frictionAir: 0,
                render: {
                    fillStyle: '#f39c12'
                }
            });
            particles.push(circle);
        }
    }

    Composite.add(engine.world, [...walls, ...particles])
    var runner = Runner.create();
    currentRunner = runner // Store reference for cleanup

    // run the engine
    Runner.run(runner, engine);

}

function Explode() {
    var width = 0.5 * window.innerWidth > 800 ? 800 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    const center = { x: 400 / 800 * width, y: 400 / 800 * width };

    particles.forEach(body => {
        const dx = body.position.x - center.x;
        const dy = body.position.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const forceMagnitude = strength.value * body.mass;

        Body.applyForce(body, body.position, {
            x: (dx / (distance * distance)) * forceMagnitude / 800 * width,
            y: (dy / (distance * distance)) * forceMagnitude / 800 * width
        });
    });


}

onMounted(() => {
    runExplosion()
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
        <h1>Explosions</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
        <p>
            A fair word of warning before I dissappoint you. This section is less about the flashy part of explosions
            and
            more about how the pieces of something that explodes fly apart. So, we won't be talking about massive
            fireballs. With
            that being said, let's define what an explosion really is in physics.
            <br><br>
            <figure>
                <img src="/momentum/Figure 74.png">
                <figcaption>
                    Figure 1: KA-BOOOOOOM! - Tavish Finnegan DeGroot
                </figcaption>
            </figure>
            <br><h4 class="text-center">Definition</h4>
            An explosion generally involves an object fragmenting into multiple pieces, with all of the pieces being
            shot
            off at some velocity. Rather than a collision, where multiple objects converge on each other and ricochet
            off, an explosion usually involves a single intact object that fragments.
            <br><br>
            <span v-show="level > 0">
                I said that for momentum to be conserved, there can be no external forces. Well, here I have a caveat.
                If something
                explodes in midair, obviously it will experience an external force of gravity downwards. However, we do
                not
                care. The forces involved in the explosion are many orders of magnitude larger than gravity, and thus we
                can treat momentum
                as still conserved because the effect by the external forces is very negligible.
                <br><br>
            </span>
            In an explosion, even though energy isn't conserved momentum still is. The total momentum of all the objects
            at the end must be the same as the initial momentum of the original object prior to explosion. We do have
            one-dimensional
            explosions sometimes, but most of the time these are two-dimensional momentum conservation problems.
            <br><br>
            <span v-show="level > 0">
                Let's start with a simple, one-dimensional explosion problem that incorporates the concept of projectile
                motion.
                <br><br>
                <div class="problem">
                    A projectile is launched at 30° above the horizontal with a speed of $v_0 = 15~\textrm{m/s}$. When
                    the
                    projectile is at the apex of its path, it explodes instantaneous into two identical fragments. One
                    fragment
                    momentarily has zero velocity and falls straight down. Where does the other piece land?
                    <br><br>
                    We've mixed together two concepts into a single problem. First, we want to recognize some things
                    about the
                    problem itself. When the particle is at its apex, this means it has no velocity in the y-direction
                    and all
                    of its velocity is horizontal. This indicates that we have a one-dimensional explosion on our hands.
                    <br><br>
                    The second things is that one of the pieces falls straight down, meaning it has zero velocity after
                    the
                    explosion. Since momentum must be conserved, we can use this piece of information to find the
                    velocity of the
                    particle after the explosion. The pieces are also identical, meaning each has half the mass of the
                    original
                    projectile.
                    <br><br>
                    $$ Mv_x = \dfrac{M}{2}(0) + \dfrac{M}{2} v_f $$
                    $$v_f = 2v_x $$
                    <br>
                    Now, we know that the other piece moves off with twice the velocity it was moving before. Two
                    approaches
                    present themselves here. The first is to just use kinematics and projectile-motion techniques to
                    solve the problem
                    conventionally. However, the second method uses clever reasoning to skip a lot of work.
                    <br><br>
                    I'm sure you know how to brute-force this problem, so I'll show you the clever reasoning method.
                    First, we want to recognize the fact that the x-direction velocity is not affected except by the
                    explosion, and
                    the y-direction velocity follows the same pattern as it would if there were no explosion. What I'm
                    trying to
                    say is that the time of flight is the same.
                    <br><br>
                    Because the time of flight is the same, we can conclude that the distance travelled is proportional
                    to the
                    velocity. Normally, the whole motion happens with an x-direction velocity of $v_x$ giving us a range
                    of $R$, but
                    now half of the motion happens at a velocity of $2v_x$. By proportionality rules, we can conclude
                    that the new
                    range $R'$ is defined as such:
                    <br><br>
                    $$ R' = \dfrac32 R $$
                    <br>
                    Plug in our old formula for the range, and we're all but done!
                    <br><br>
                    $$ R' = \dfrac32 \dfrac{ {v_0}^2 sin 2\theta}{g} = \bbox[3px,
                    border: 0.5px solid
                    white] {29.8 ~\textrm{m} } $$
                </div>
            </span>
            <span v-show="level == 0">
                Let me present to you in simple one-dimensional terms for starters. Here's an example problem.
                <br><br>
                <div class="problem">Suppose we have a big block of mass $M$ that slides
                    along at some speed $v$, until suddenly it explodes into two identical pieces! One of the pieces is
                    found to be
                    stationary after the explosion. How fast is the other block moving?
                    <br><br>
                    With that information, we can write momentum conservation. There are no external forces on the
                    system, as the only
                    force acting on it would be the force from the explosion (which is internal!). Energy isn't going to
                    be
                    conserved here because explosions tend to release energy (well, pretty obvious statement), but we
                    have
                    additional information: one piece isn't moving after the explosion.
                    <br><br>
                    This tells us that after the collision, $v=0$ for one piece. Therefore, we can find the velocity of
                    the other piece
                    using momentum balance. But wait! What are the masses? Well, it explodes into <b>identical
                        pieces</b>, meaning each
                    piece has a mass $M/2$.
                    <br><br>
                    $$ Mv = \dfrac{M}{2} (0) + \dfrac{M}{2}v_f$$
                    <br>
                    After doing some algebra, we arrive at the result:
                    <br><br>
                    $$ v_f = \bbox[3px,
                    border: 0.5px solid
                    white] {2v} $$
                    <br>
                    Thus, we conclude that the second piece must be moving with double the velocity of the original
                    piece.
                </div>
            </span>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
            I couldn't have a lesson on literal explosions without having a demo you can play with. It's not the kind
            of flashy, loud, and bright phenomenon you're used to, but it should suffice. Have fun, and also try to get
            some intuition for two-dimensional explosions out of this as well!
            <br><br>
            <figure>
                <h3 class="mb-4">Explosion Demo</h3>
                <button class="btn btn-outline-primary mb-3" @click="Explode">&nbsp;💥&nbsp;</button>
                <div id="explosion"></div>
                <button class="btn btn-outline-primary" @click="runExplosion()">Reset</button><br>
                <label> Explosion Strength: {{ strength }} </label><br><input type="range" class="form-range"
                    v-model="strength" min="0.5" max="20" step="0.01" style="width:fit-content" /><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            A few technical details for the interested here. The explosion gets weaker with the square of the distance
            from the
            point of origin of the explosion (like gravity!), which happens to be the exact center of the viewport. It's
            also radially directed from there. The middle
            ball never moves because it is exactly at the center, so the explosion pushes on it equally in all
            directions, leading to
            force balance.
            <br><br>
            When you're done playing with this (you can trigger the explosion multiple times, by the way), just go on to
            the
            next page, where we're going to discuss two-dimensional explosions. This is probably more fun, though.
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
        <div v-show="page === 2"><h4 class="text-center">Two-Dimensional Explosions</h4>
            <p>
            Now, we bump it up to two dimensions. The approach here is very similar. You just
            employ the conservation of linear momentum for each dimension separately. This is
            actually much easier than doing two-dimensional collisions because the algebra works out much more
            nicely.
            <br><br>
            <span v-show="level > 0">
                If you have more than three objects/fragments after the explosion,
                the motion of the objects cannot be completely determined without additional information. Even if
                you know their masses, total momentum, and even the energy given to them by the explosion, there isn't
                enough
                info. You <b>must</b> know the direction of motion of at least one object. This is part of the reason
                why explosions are so unpredictable in the real world.
                <br><br>
            </span>
            We're usually going to deal with more than two objects, because the case with two objects can sometimes just
            be simplified into a 1-D problem. Think about it this way: the explosion will exert the same impulse on each
            object and in
            opposite directions, so their momentum changes are along the same line. <span v-show="level > 0">using
                center-of-mass techniques, we can make such a problem trivial. Just work in the center-of-mass frame,
                where
                nothing is moving initially. Both objects have antiparallel velocities after the explosion, and then we
                just
                transform back to the original reference frame.
            </span>
            <br><br>
            That was probably a lot of words which I'm sure you understood. It's time to solidify your
            understanding with practice. <span v-show="level > 0">Instead of testing your algebra and
                trigonometry (which I already did in the last lesson), I'll test your concepts with
                a nice conceptual question.
            </span>
            <br><br>
            <div class="problem">
                A firework can be modelled as a single object that explodes into six different, identical
                pieces in the air. The explosive powder is uniform and located exactly at the center of the firework.
                What shape do the pieces make as they fall?
                <br><br>
                <figure>
                    <img src="/momentum/Figure 75.png">
                    <figcaption>
                        Figure 2: What happens after the loud boom?
                    </figcaption>
                </figure>
                <br>
                First, the initial shape of the pellets can be found relatively easily. The line about the uniform
                explosives should tip you off
                that all of the pieces should have the same speed after the explosion. Because momentum has to be
                conserved, this allows
                us to draw conclusions on what the shape the pieces will make immediately after the explosion.
                <br><br>
                Have you realized what it is now? Well, there has to be symmetry because all the pieces are identical
                and have the
                same speed. The most symmetry six points can have is if they make up a regular hexagon! Therefore, the
                six fragments will comprise a regular hexagon right after explosion. But that's not what we're asked!
                <br><br>
                <figure>
                    <img src="/momentum/Figure 76.png">
                    <figcaption>
                        Figure 3: This is what happens.
                    </figcaption>
                </figure>
                <br>
                Alright, but the pieces will fall under gravity. How does their shape change under those conditions?
                <br><br>
                That was a trick question. The shape would actually not change! Each piece is accelerating at the same
                rate because all of them are in projectile motion. Even though their velocities will change
                significantly, each one's
                relative velocity to the others will not. This means they don't get closer or further apart, which means
                they
                hold this hexagon shape. Neat!
                <br><br>
                Next time you see a firework star, take a close look at the shape of the
                glowing dots (not the actual path they trace out, but the tips of the paths) and see if it still looks
                roughly circular
                once they fade out. They should! I bet you never noticed that.
            </div>
            <br><h4 class="text-center">Conclusion</h4>
            This concludes our lesson on explosions. I'll bet that was just as exciting as seeing an explosion in
            theaters, or
            maybe even in the real world! (You'll never know if I'm being serious.) This is also the conclusion to our
            momentum unit, which
            introduced us to a key concept of in physics. You'll see me invoke this idea in the future, just like I
            still invoke the concept
            of energy conservation long after we have passed that unit.
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>

            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/rotation/rotational-kinematics">Next
                    Unit!
                    &rarr;</NuxtLink>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Explosion Problems</h1><br>
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