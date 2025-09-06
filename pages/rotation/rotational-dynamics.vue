<script setup>
useHead({
    title: 'Rotational Dynamics',
    meta: [
        { name: 'description', content: 'Explore the principles of rotational dynamics and how it relates to rotational kinematics and torque.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).RotationalDynamics


watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "A solid disk pivoted about its edge and placed vertically rotates because:",
                answers: [
                    ["Gravity acts on it", 0, false],
                    ["It is pushed from the side", 0, false],
                    ["Gravity provides a torque", 1, false],
                    ["Gravity is not real", 0, false]
                ],
                explain: "If a disk is pivioted about its edge, then the gravitational force acting at its center of mass will provide a torque about the pivot point. This torque will cause the disk to rotate according to Newton's Second Law in rotational form ($\\tau = I\\alpha$)."
            },
            {
                number: 1,
                question: "Why will a block tip over if it is pushed too far?",
                answers: [
                    ["The center of mass moves past the support point", 1, false],
                    ["It is pushed too hard", 0, false],
                    ["Friction is not enough", 0, false],
                    ["The wall pushes it", 0, false]
                ],
                explain: "A block will tip over if the gravitational force acting at the center of mass creates a torque that will tend to pull the block over, which occurs when the center of mass passes over the corner/edge of the block that is in contact with the ground. You can try this for yourself with anything that looks like a block."
            },
            {
                number: 2,
                question: "Which of these forces is not necessarily required to be present for a ladder leaning against a wall to be in static equilibrium?",
                answers: [
                    ["the weight of the ladder", 0, false],
                    ["the frictional force from the wall", 1, false],
                    ["the normal force from the ground", 0, false],
                    ["the normal force from the wall", 0, false]
                ],
                explain: "The frictional force from the wall is not required for static equilibrium, as we discussed in the lesson. We do need a frictional force from the ground to balance the normal force from the wall, however."
            },
            {
                number: 3,
                question: "You hold on to the end of a spool of thread and let it unwind. Which force is causing the spool to rotate?",
                answers: [
                    ["the tension in the thread", 1, false],
                    ["the weight of the spool", 1, false],
                    ["the friction between the spool and the surface", 0, false],
                    ["air resistance", 0, false]
                ],
                explain: "There are actually two possible answers, both of which are entirely correct. Most will say that the tension causes the spool to rotate about the center of mass, and this is a correct interpretation. However, the more technically correct explanation is that the spool rotates around the point where it contacts the string (because the string never moves at that point) and therefore gravity is what is causing a torque."
            },
            {
                number: 4,
                question: "A hockey puck is simultaneously sliding and spinning on ice. How can you push on it to slow it down without changing its angular velocity?",
                answers: [
                    ["Push horizontally at the edge", 0, false],
                    ["Push downwards", 0, false],
                    ["Push horizontally at the middle", 1, false],
                    ["This is not possible", 0, false]
                ],
                explain: "To slow down the puck without changing its angular velocity, you need to apply a force that does not create a torque about the center of mass. Pushing horizontally at the middle achieves this, as in this case the lever arm is zero because the force passes through the center of mass."
            },
            {
                number: 5,
                question: "If no external pivot point is specified, an object will always rotate about its:",
                answers: [
                    ["edge", 0, false],
                    ["geometric center", 0, false],
                    ["center of mass", 1, false],
                    ["depends on the object", 0, false]
                ],
                explain: "If the object is not constrained to rotate a certain way, it will always tend to rotate around its center of mass."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "A spool, which can be approximated as a cylinder of mass $M$ and radius $R$ is held by a string wound around it. At some point, the spool is allowed to fall while unwinding the string. What is the linear acceleration of the center of mass of the spool as it falls?",
                answers: [
                    ["$\\frac{1}{2} g$", 0, false],
                    ["$\\frac{2}{3} g$", 1, false],
                    ["$\\frac{1}{3} g$", 0, false],
                    ["$g$", 0, false]
                ],
                explain: "To start, we write force analysis equations. We have tension pulling upwards and the gravitational force downwards, letting us write $Mg - F_T = Ma$. We then employ torque analysis about the center of mass to write $TR = \\frac12 MR^2 \\alpha$. We can relate $a$ and $\\alpha$ using $a = \\alpha R$, and then solve the system of equations to get $a = \\frac{2}{3} g$. Another method is to consider the spool as rotating around the point where it contacts the string, which is technically the more correct and easier way to do it."
            },
            {
                number: 1,
                question: "Write the torque exerted on a rod of length $L$ and mass $M$ that is pivoted about one end and located at an angle $\\theta$ from the vertical. Assume $\\theta < 90 \\degree$.",
                answers: [
                    ["$\\frac{1}{2} MgL \\sin(\\theta)$", 1, false],
                    ["$\\frac{1}{3} MgL \\sin(\\theta)$", 0, false],
                    ["$MgL \\sin(\\theta)$", 0, false],
                    ["$\\frac{2}{5} MgL \\sin(\\theta)$", 0, false]
                ],
                explain: "The center of mass of the rod is halfway along its length, so the lever arm is $\\frac{L}{2} \\sin(\\theta)$. The torque is then given by $\\tau = L F \\sin(\\theta)$ = $\\frac{1}{2} MgL \\sin(\\theta)$."
            },
            {
                number: 2,
                question: "What is the maximum distance $d$ from the edge of a table that a book of length $L$ can be placed without falling off? Assume the book is uniform.",
                answers: [
                    ["$\\frac{L}{2}$", 1, false],
                    ["$\\frac{L}{3}$", 0, false],
                    ["$\\frac{L}{4}$", 0, false],
                    ["$\\frac{L}{5}$", 0, false]
                ],
                explain: "The torque due to the gravitational force will tend to rotate the book off the table if its center of mass passes the edge of the table. Since the book is uniform, this corresponds to $d = \\frac{L}{2}$."
            },
            {
                number: 3,
                question: "A system of a pulley, which can be approximated as a solid sphere of mass $2m$ and radius $R$, and a block of mass $m$ is set up. The string does not slip on the pulley. What is the acceleration of the block as it falls?",
                answers: [
                    ["$\\frac{7}{10} g$", 0, false],
                    ["$\\frac{5}{7} g$", 0, false],
                    ["$\\frac{5}{9} g$", 1, false],
                    ["$g$", 0, false]
                ],
                explain: "The forces on the block simplify to the equation $mg - F_T = ma$. The torques on the pulley simplify to $F_T R = \\frac{2}{5} (2m) R^2 \\alpha$. We can again relate $a$ and $\\alpha$ using $a = \\alpha R$, and then simplify the second equation and solve the system of equations as usual to get $a = \\frac{5}{9} g$."
            },
            {
                number: 4,
                question: "An Atwood's Machine with two masses, $m_1$ and $m_2$ where $m_1 > m_2$, is set up with a massive pulley with a moment of inertia I. The string does not slip on the pulley. Find the acceleration of the blocks in terms of given variables and fundamental constants.",
                answers: [
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{2I}{R^2}}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 - \\frac{I}{R^2}}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{I}{R^2}}$", 1, false]
                ],
                explain: "For this case where the pulley has mass, the tensions on either side of it are not the same. We can write the force equations for the two blocks as $m_1 g - F_{T1} = m_1 a$ and $F_{T2} - m_2 g = m_2 a$. When we consider torques on the pulley, the equation for the pulley comes out to be $ (F_{T1} - F_{T2}) R = I \\alpha$. We can relate $a$ and $\\alpha$ using $a = \\alpha R$ as usual, and then solve the system of equations to get $a = \\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{I}{R^2}}$. This kind of modified Atwood's setup is a common problem type."
            },
            {
                number: 5,
                question: "Calculate the maximum speed that a large bus of height 2.5 meters, width 1.5 meters can execute a circular turn of radius 10 meters without tipping over. Assume the bus is a uniform rectangular prism.",
                answers: [
                    ["$12.0 \\, \\textrm{m/s}$", 0, false],
                    ["$7.67 \\, \\textrm{m/s}$", 1, false],
                    ["$10.8 \\, \\textrm{m/s}$", 0, false],
                    ["$12.5 \\, \\textrm{m/s}$", 0, false]
                ],
                explain: "The bus will experience a fictitious centrifugal force exerted at its center of mass, which will tend to try and tip it over. We can set up the torque equation $mg \\frac{w}{2} = m \\frac{v^2}{r} \\frac{h}{2}$, where $w$ is the width of the bus and $h$ is its height. Solving for $v$, we get $v = \\sqrt{gr\\frac{w}{h}} = 7.67 \\, \\textrm{m/s}$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "A spool, which can be approximated as a cylinder of mass $M$ and radius $R$ is held by a string wound around it. At some point, the spool is allowed to fall while unwinding the string. What is the linear acceleration of the center of mass of the spool as it falls?",
                answers: [
                    ["$\\frac{1}{2} g$", 0, false],
                    ["$\\frac{2}{3} g$", 1, false],
                    ["$\\frac{1}{3} g$", 0, false],
                    ["$g$", 0, false]
                ],
                explain: "To start, we write force analysis equations. We have tension pulling upwards and the gravitational force downwards, letting us write $Mg - F_T = Ma$. We then employ torque analysis about the center of mass to write $TR = \\frac12 MR^2 \\alpha$. We can relate $a$ and $\\alpha$ using $a = \\alpha R$, and then solve the system of equations to get $a = \\frac{2}{3} g$. Another method is to consider the spool as rotating around the point where it contacts the string, which is technically the more correct and easier way to do it."
            },
            {
                number: 1,
                question: "Write the torque exerted on a rod of length $L$ and mass $M$ that is pivoted about one end and located at an angle $\\theta$ from the vertical. Assume $\\theta < 90 \\degree$.",
                answers: [
                    ["$\\frac{1}{2} MgL \\sin(\\theta)$", 1, false],
                    ["$\\frac{1}{3} MgL \\sin(\\theta)$", 0, false],
                    ["$MgL \\sin(\\theta)$", 0, false],
                    ["$\\frac{2}{5} MgL \\sin(\\theta)$", 0, false]
                ],
                explain: "The center of mass of the rod is halfway along its length, so the lever arm is $\\frac{L}{2} \\sin(\\theta)$. The torque is then given by $\\tau = L F \\sin(\\theta)$ = $\\frac{1}{2} MgL \\sin(\\theta)$."
            },
            {
                number: 2,
                question: "What is the maximum distance $d$ from the edge of a table that a book of length $L$ can be placed without falling off? Assume the book is uniform.",
                answers: [
                    ["$\\frac{L}{2}$", 1, false],
                    ["$\\frac{L}{3}$", 0, false],
                    ["$\\frac{L}{4}$", 0, false],
                    ["$\\frac{L}{5}$", 0, false]
                ],
                explain: "The torque due to the gravitational force will tend to rotate the book off the table if its center of mass passes the edge of the table. Since the book is uniform, this corresponds to $d = \\frac{L}{2}$."
            },
            {
                number: 3,
                question: "A system of a pulley, which can be approximated as a solid sphere of mass $2m$ and radius $R$, and a block of mass $m$ is set up. The string does not slip on the pulley. What is the acceleration of the block as it falls?",
                answers: [
                    ["$\\frac{7}{10} g$", 0, false],
                    ["$\\frac{5}{7} g$", 0, false],
                    ["$\\frac{5}{9} g$", 1, false],
                    ["$g$", 0, false]
                ],
                explain: "The forces on the block simplify to the equation $mg - F_T = ma$. The torques on the pulley simplify to $F_T R = \\frac{2}{5} (2m) R^2 \\alpha$. We can again relate $a$ and $\\alpha$ using $a = \\alpha R$, and then simplify the second equation and solve the system of equations as usual to get $a = \\frac{5}{9} g$."
            },
            {
                number: 4,
                question: "An Atwood's Machine with two masses, $m_1$ and $m_2$ where $m_1 > m_2$, is set up with a massive pulley with a moment of inertia I. The string does not slip on the pulley. Find the acceleration of the blocks in terms of given variables and fundamental constants.",
                answers: [
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{2I}{R^2}}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 - \\frac{I}{R^2}}$", 0, false],
                    ["$\\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{I}{R^2}}$", 1, false]
                ],
                explain: "For this case where the pulley has mass, the tensions on either side of it are not the same. We can write the force equations for the two blocks as $m_1 g - F_{T1} = m_1 a$ and $F_{T2} - m_2 g = m_2 a$. When we consider torques on the pulley, the equation for the pulley comes out to be $ (F_{T1} - F_{T2}) R = I \\alpha$. We can relate $a$ and $\\alpha$ using $a = \\alpha R$ as usual, and then solve the system of equations to get $a = \\frac{(m_1-m_2)g}{m_1+m_2 + \\frac{I}{R^2}}$. This kind of modified Atwood's setup is a common problem type."
            },
            {
                number: 5,
                question: "Calculate the maximum speed that a large bus of height 2.5 meters, width 1.5 meters can execute a circular turn of radius 10 meters without tipping over. Assume the bus is a uniform rectangular prism.",
                answers: [
                    ["$12.0 \\, \\textrm{m/s}$", 0, false],
                    ["$7.67 \\, \\textrm{m/s}$", 1, false],
                    ["$10.8 \\, \\textrm{m/s}$", 0, false],
                    ["$12.5 \\, \\textrm{m/s}$", 0, false]
                ],
                explain: "The bus will experience a fictitious centrifugal force exerted at its center of mass, which will tend to try and tip it over. We can set up the torque equation $mg \\frac{w}{2} = m \\frac{v^2}{r} \\frac{h}{2}$, where $w$ is the width of the bus and $h$ is its height. Solving for $v$, we get $v = \\sqrt{gr\\frac{w}{h}} = 7.67 \\, \\textrm{m/s}$."
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
        <h1>Rotational Dynamics</h1><br>
        <p>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            Newton formulated some pretty cool and interesting (not to mention absolutely vital to the existence of
            physics) laws
            of motion. If you're following the new trend with rotation, you might guess that these laws can be turned
            into their rotational
            forms as well. And you'd be right! This unit focuses on Newton's Laws for rotational motion, as well as
            basic rotational
            dynamics scenarios.
            <br><br>
            <h4 class="text-center">Newton's Laws in Rotational Form</h4>
            As you might imagine, these three laws for rotational motion have to do with torque instead of force. The
            expressions of the
            three laws are analogous to their normal counterparts.
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s First Law in Rotational form:</strong> <i>An object tends to remain in its state of
                    motion unless acted on by a net torque.</i>
            </div>
            <br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s Second Law in Rotational form:</strong> <i>The net torque on an object is equal to its
                    moment of inertia times its angular acceleration.</i>
            </div>
            <br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s Third Law in Rotational form:</strong> <i>For each torque, there is an equal and
                    opposite
                    counter-torque. Sort of...
                </i>
            </div>
            <br>
            You might be wondering why I was so hesitant there. Well, it's a little bit more complicated when we deal
            with rotation. Yes,
            each torque has an equal and opposite "counter-torque" when the entire universe is considered, but we have
            to recall that
            for most scenarios we only deal with a few objects. The point of rotation can be different for different
            objects. Take the
            case where we hit a pendulum that hangs from the cieling.
            <br><br>
            <figure>
                <img src="/rotation/Figure 87.png" />
                <figcaption>Figure 1: Do we have equal and opposite torque pairs?</figcaption>
            </figure>
            <br>
            If you push on the ball, the force the ball pushes on you must be the same because of Newton's Third Law.
            However, the ball will rotate about the pivot in the
            ceiling a distance $r$ from the point of application, while you will tend to rotate about the contact point
            with the ground a
            distance $h$ from the force. This makes the two torques "different", although the reason behind this is that
            there is the external
            force of friction and of gravity keeping you from rotating freely. We simply needed to select a larger
            system to see what was going on.
            <br><br>
            <span v-show="level > 0">
                The other reason why this doesn't look like a "torque pair" is because we considered the torque by the
                two forces around two
                different points. This might seem perfectly normal, but in reality we should have considered the torque
                by the two forces
                about the same point. In that case, the torques would be equal and opposite. In reality, however, the
                objects don't rotate about these
                axes, so in practice this is rarely seen.
                <br><br>
            </span>
            So in short: yes, Newton's Third Law applies for rotation, but not in the conventional sense. In most
            problems, we don't really regard it
            as that important. It kind of comes up in the later concept of conservation of linear momentum, but we don't
            typically ask
            about torque pairs in the way that we ask about force pairs.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1"><h4 class="text-center">The Second Law in Rotational Form</h4>
            I just spent a while ironing out an idea which won't be important in calculations, but is still important to
            conceptually understand. Now, I want to go back and talk about the first two laws, which are really very
            similar
            to each other. They form the backbone of rotational dynamics problems, giving us an equation as important as
            $F_{net} = ma$.
            <br><br>
            <span v-show="level > 0">
                The first law is really just a restatement of the second one under equilibrium conditions, much like
                with
                forces. Therefore, we will look at the mathematical statememnt of the second law, which we can easily
                write:
                <br><br>
                $$ \tau_{net} = I \alpha $$
                <br>
                This equation is as important for rotational dynamics as $F_{net} = ma $$ is for translational dynamics.
                Essentially, we have the
                statement that a net torque tends to change the angular velocity of an object. Note that while torque is
                technically a vector and could
                cause rotation about several different axes (like a top precessing, or the Earth rotating around the sun
                while also spinning
                on its own axis), here we do not consider those complex examples.
                <br><br>
                In our case, rotation is always going to be in a single plane, like a disk spinning on a flat surface.
                We can deal with some more complex
                examples like the Earth, because the rotation of the Earth about its own axis (24 hour period) is so
                much faster than around the sun (365 day period).
                Thus, we deal with torqe only in a single plane, meaning we can reduce it to clockwise/counterclockwise.
                Remember, we usually
                say counterclockwise is positive whenever direction actually matters.
                <br><br>
                <div class="problem">
                    You horizontally push on a flat metal disk of mass 2.0 kg and radius 3.0 meters that lies flat on a
                    tabletop a perpendicular distance of 0.7 meters from its edge. How hard
                    must you push if the disk is to have an angular acceleration of $\alpha = 0.7 ~\textrm{rad/s}^2$?
                    <br><br>
                    The first step is find the actual radius at which the force is being applied. It's a distance of 0.7
                    meters <b>from the edge</b>, so it would be
                    $2.0 - 0.7 = 1.3 \textrm{m}$ from the center of the disk. We'll call this value $r$ for convenience.
                    <br><br>
                    Next, we set up Newton's Second Law in rotational form. We can evaluate the torque symbolically, in
                    terms of the force $F$ needed
                    to cause that angular acceleration.
                    <br><br>
                    $$ \tau = I \alpha $$
                    $$ Fr = \dfrac12 MR^2 \alpha $$
                    <br>
                    Now, just isolate $F$ and solve for it. At this point, the algebra should be a piece of cake.
                    <br><br>
                    $$ F = \bbox[3px,
                    border: 0.5px solid
                    white] {4.85~\textrm{N} } $$
                </div>
            </span>
            <span v-show="level == 0">
                We basically have an equivalent form of Newton's Second Law for rotation, which we read off of the
                statement of the law:
                <br><br>
                $$ \tau_{net} = I \alpha $$
                <br>
                The first law serves a purpose in introducing a new concept, but we will get to that later on. For now,
                let's take a look at this
                law. It essentially just states that a net torque will cause a change in angular velocity for an object.
                As always, $I$ is measured
                about the axis of rotation.
                <br><br>
                This equation takes pretty much the same function as $F_{net} = ma$, only for rotation. (If you look,
                the form of the equation
                is identical: every linear quantity is replaced with its rotational counterpart!) However, we only deal
                with the directions of
                clockwise and counterclockwise for rotation, so there is no need to do any vector algebra to get the net
                torque once we know
                how much torque each force exerts.
                <br><br>
                With that, let's try a very simple example that'll get us acclimated to this new equation.
                <br><br>
                <div class="problem">
                    You push horizontally on a solid disk's edge, a perpendicular distance $r$ from the center, with
                    some force $F$. The disk has a mass $M$ and
                    radius $R$. Write the angular acceleration of the disk.
                    <br><br>
                    First, we know the disk has a moment of inertia of $ I = \frac12 MR^2 $, so we'll keep that in mind.
                    Next, we can easily find the torque
                    that is caused by the force, because the distance $r$ is perpendicular. Thus, we have basically
                    every part we need now.
                    <br><br>
                    $$ \tau = I \alpha $$
                    $$ Fr = \dfrac12 MR^2 \alpha $$
                    <br>
                    Now, just do some algebraic manipulation of the variables, and we'll be at our final answer!
                    <br><br>
                    $$ \alpha = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{2Fr}{MR^2} } $$
                    <br>
                    Don't be intimidated by the complex-looking final result. We know how we got here, and that's the
                    most important part.
                </div>
            </span>
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
            <span v-show="level > 0"><h4 class="text-center">Rotational and Static Equilibrium</h4>
                The First Law in rotational form actually provides us plenty of insights into a new concept: rotational
                equilibrium. The condition for this is analogous to that of translational equilibrium. I'll put the two
                conditions right here:
                <br><br>
                <figure>
                    <b>Translational Equilibrium:</b>
                    <br>
                    $$ \sum F_i = 0 $$
                    <br>
                    <b>Rotational Equilibrium:</b>
                    <br>
                    $$ \sum \tau_i = 0 $$
                </figure>
                <br>
                <b>These two are not the same!</b> While an object being in translational equilibrium means that it is
                not accelerating, an object being in rotational equilibrium means that its angular velocity is not
                changing!
                These two are pretty similar conditions, but <b>linear and angular quantities are not equivalent.</b> An
                object can
                accelerate while maintaining its angular velocity, and vice versa.
                <br><br>
                This leads to an important conclusion: objects can be in one kind of equilibrium without being in the
                other. Think of a disk
                on a CD player. It cannot move around, but its angular velocity can change. The inverse is also true:
                think of a hockey puck
                that spins on the ice and is given a sharp tap by a player. If the hit was directly in the middle of the
                puck, it will accelerate
                while continuing to rotate at the same angular velocity.
                <br><br>
                That isn't to say that both cannot be true, however! There is a special name for the kind of equilibrium
                that
                arises when both torques and forces sum to zero. We call this special case <b>static equilibrium</b>,
                and it basically
                is just when both equations above are satisfied simultaneously.
            </span>
            <span v-show="level == 0"><h4 class="text-center">Rotational and Static Equilibrium</h4>
                The rotational version of the First Law leads us to conclude that whenever torques sum to zero, the
                angular
                velocity doesn't change. That sounds simple enough, but this condition is an equilibrium condition. It
                can be written mathematically.
                <br><br>
                $$\tau_{net} = 0 $$
                <br>
                You might also remember another equilibrium condition: there is no acceleration when the net force is
                zero. This is also an equation:
                <br><br>
                $$ F_{net} = 0 $$
                <br>
                Now, these look similar, but they are two different things! When torques sum to zero, we have the
                condition of <b>rotational equilibrium</b>. When
                forces sum to zero, we have <b>translational equilibrium</b>. Now, torque is not the same as force, so
                <b>these are two separate
                    conditions.
                </b> One can be satisfied without the other being satisfied. Need examples?
                <br><br>
                Think about a CD on a CD player. The disk can rotate and change its angular velocity, but will not have
                any acceleration (unless you throw the CD player).
                The other case is true. If you have a hockey puck on ice and hit it at its center, you will cause its
                velocity to change but it will keep rotating at
                the same angular velocity.
                <br><br>
                When both conditions are satisfied, we have a special case called <b>static equilibrium</b>. In this
                case, objects usually do not
                accelerate or rotate, though the strict conditions are only that there is no net force or torque.
            </span>
            <br><br>
            The most common static equilibrium case is the ladder leaning against a wall. Experience tells us that it
            will fall over in some cases, but
            physics can tell us exactly when it would begin to fall over. For the simplest case, we have no friction on
            the wall and friction between the ladder
            and the ground. However, before we can tackle a case like this, we need to talk about how to set up
            rotational dynamics problems.
            <br><br>
            In translational dynamics, the location where forces were applied did not matter to the problem. This still
            doesn't matter for the force
            balance aspect, but it certainly matters for determining torque. Thus, we should now draw <b>force-vector
                diagrams</b> where forces are drawn
            at the exact point where they are applied. This also means drawing out the object in question, as well as
            things around it if they affect the problem.
            This is what we call a <b>force-vector diagram</b>.
            <br><br>
            <figure>
                <img src="/rotation/Figure 88.png" />
                <figcaption>Figure 2: A complete force-vector diagram for a wheel being pushed along a frictionless
                    surface.</figcaption>
            </figure>
            <br>
            The diagram above should show you some of the general ideas behind the force-vector diagram. Obviously, the
            applied force is applied
            at... well, it's applied where it's applied. Other forces follow
            some general rules. The gravitational force is always applied at the center of mass, and the normal and
            frictional forces are
            applied where there is contact.
            <br><br>
            The force-vector diagram is really not too different from the free-body diagrams we are used to. We just
            need to consider the exact
            positions of the forces in order to calculate torque. It's also helpful to label known lengths and angles on
            force-vector diagrams, for
            easy torque calculations. Now, we can work on that ladder problem.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            <div class="problem">
                <span v-show="level > 0">

                    Consider a ladder of mass $m$ and length $L$ that leans against a wall, making an angle $\theta$
                    with the ground. What must be the
                    required coefficient of static friction between the ladder and floor such that it doesn't slip and
                    fall over?
                    <br><br>
                    <figure>
                        <img src="/rotation/Figure 89.png" />
                        <figcaption>Figure 3: The elusive (to solve) ladder.</figcaption>
                    </figure>
                    <br>
                    First, we want to make a force-vector diagram of the ladder. We know that it has a gravitational
                    force exerted at the center, and
                    normal and frictional forces from the ground. However, that's not all. It's easy to miss the fact
                    that there has to be a normal force from the wall as
                    well, since the ladder leans on it! Thus, we can make our force-vector diagram.
                    <br><br>
                    <figure>
                        <img src="/rotation/Figure 90.png" />
                        <figcaption>Figure 4: We have now solved the ladder by adding a whole lot of vectors.
                        </figcaption>
                    </figure>
                    <br>
                    This lets us do our force and torque analysis. Neither is enough to solve the problem on its own,
                    because this is
                    a static equilibrium case. We have to have both torque and force balance! We'll start with the
                    simpler force equation, using
                    Newton's Second Law. For this, we can ignore where the forces are and treat the entire thing like
                    one big
                    free-body diagram.
                    <br><br>
                    In the y-direction, we only have $mg$ and $F_{N,1}$, and in the x-direction we have $F_f$ and
                    $F_{N,2}$.
                    <br><br>
                    $$ mg = F_{N,1}$$
                    $$ F_f = F_{N,2} $$
                    <br>
                    We can re-write $F_f$ as $ \mu F_{N,1}$ and then simplify the second equation using the first
                    equation.
                    <br><br>
                    $$ \mu mg = F_{N,2} $$
                    <br>
                    Now, we're at a stalemate with forces. We can't find anything else out with this method. However,
                    this is
                    where torque comes to the rescue. In cases of static equilibrium where there is no rotation, we can
                    pick
                    the rotation axis to be wherever we want since torques have to be balanced around any point for
                    there to be
                    no rotation.
                    <br><br>
                    We pick the point at the bottom of the ladder, as that allows us to eliminate the two forces located
                    there from our equation. If they're located at the chosen reference point, then they have zero lever
                    arm or
                    distance from the pivot. Then, we have to find the two torques caused by gravity and $F_{N,2}$.
                    <br><br>
                    $$ mg \dfrac L2 \cos \theta = F_{N,2} L \sin \theta $$
                    <br>
                    I haven't gone into depth on how I got these as the torques, but you should be able to get them
                    using the techniques I introduced
                    earlier. This equation allows us to relate $F_{N,2}$ and $mg$, which is exactly what we needed.
                    <br><br>
                    $$ F_{N,2} = \dfrac{mg}{2\tan\theta} $$
                    $$ \mu mg = \dfrac{mg}{2 \tan \theta} $$
                    <br>
                    We finally arrive at our result:
                    <br><br>
                    $$ \bbox[3px,
                    border: 0.5px solid
                    white]{\mu = \dfrac{1}{2 \tan \theta} }$$
                    <br>
                    Let's think about what this result tells us. We know that $\tan \theta$ increases as the angle
                    increases up to
                    $90 \degree$, which is the maximum angle the ladder can make with the floor. This means that the
                    required friction actually
                    decreases as the ladder gets steeper! This is why we always place our ladders at a pretty steep
                    angle. It's not just to get
                    to higher places, there is a crucial element of safety behind it as well!
                </span>
                <span v-show="level == 0">
                    Create the force-vector diagram for a ladder of mass $m$ and length $L$ that leans against a wall
                    and makes some angle
                    $theta$ with the floor. The ladder has no friction with the wall, but has some friction with the
                    ground. (The ladder stays
                    upright stably.)
                    <br><br>
                    <figure>
                        <img src="/rotation/Figure 89.png" />
                        <figcaption>Figure 3: The elusive (to solve) ladder.</figcaption>
                    </figure>
                    <br>
                    There are a lot of forces involved in this one. We can start with listing the more obvious ones.
                    First, we definitely have a
                    gravitational force equal to $mg$. We have to put this force at the correct location since it's a
                    force-vector diagram, but this
                    isn't too difficult. The gravity always acts at the center of mass, so it goes to the center of the
                    ladder and points
                    straight down.
                    <br><br>
                    Next, we have the normal force from the ground, which I'll call $F_{N,1}$. This force is simply
                    located where the ladder
                    touches the ground and points straight upwards. It's a conventional normal force in pretty much all
                    regards.
                    <br><br>
                    We also have friction between the ground and ladder, so we have a frictional force $F_f$ at this
                    point as well. The direction of
                    this might not be clear, but it will be later. For now, just keep in mind that it's also at the same
                    point as $F_{N,1}$.
                    <br><br>
                    Finally, there is one more force that you might not have thought of. The ladder leans against the
                    wall, so there will be a normal
                    force from the wall! This force is located where the ladder contacts the wall and points directly
                    perpendicular to the wall. In other
                    words, it must point left.
                    <br><br>
                    Well, if this force points left and the ladder is stable, that means something has to balance it.
                    This "something" must be the
                    friction, since it's the only other force that points horizontally. Thus, we conclude that the
                    friction has to
                    point to the right. Here's our completed diagram:
                    <br><br>
                    <figure>
                        <img src="/rotation/Figure 90.png" />
                        <figcaption>Figure 4: We have now solved the ladder by adding a whole lot of vectors.
                        </figcaption>
                    </figure>
                    <br>
                    If you want to actually solve this problem for what the required coefficient of friction is, check
                    out our algebra-based
                    level!
                </span>
            </div>
            <br>
            <h4 class="text-center">Conclusion</h4>
            These are the basic ideas behind rotational dynamics. If you have a good handle on torque and moment of
            inertia, this topic
            should be no issue. It's really a repeat of translational dynamics with a bit more nuance thrown in, so we
            already developed the
            techniques to tackle this topic a while ago. That being said, the problems here can get quite complex, so
            make sure you're clear
            on the approach you need to take.
            <br><br>
            The next lesson will continue to talk about rotational dynamics, but instead taking a look at a specific
            genre of motion within
            rotational dynamics. Ever seen something roll? Well, now we're going to figure out the physics behind that.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/rotation/rolling">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Rotational Dynamics Problems</h1><br>
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