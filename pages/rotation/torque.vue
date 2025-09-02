<script setup>
useHead({
    title: 'Torque',
    meta: [
        { name: 'description', content: 'Explore the concept of torque, its mathematical formulation, and its applications in rotational dynamics.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Torque

watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "Torque uses which of the following operators?",
                answers: [
                    ["Cross product", 1, false],
                    ["Dot product", 0, false],
                    ["Scalar multiplication", 0, false],
                    ["Vector addition", 0, false]
                ],
                explain: "Torque is defined as the cross product between the position vector measured to a pivot point and the force vector."
            },
            {
                number: 1,
                question: "What is the SI unit of torque?",
                answers: [
                    ["Pascal", 0, false],
                    ["Newton meter", 1, false],
                    ["Joule", 0, false],
                    ["Watt", 0, false]
                ],
                explain: "The SI unit of torque is the Newton meter (N·m). This is dimensionally identical to the joule (J), but we <b>never</b> use joules to describe torque. It is reserved for energy so that we do not confuse the two very different quantities."
            },
            {
                number: 2,
                question: "Given a force $F$ applied at a position $r$ from a pivot point, under what conditions is torque maximized?",
                answers: [
                    ["When $F$ is applied perpendicular to $r$", 1, false],
                    ["When $F$ is applied parallel to $r$", 0, false],
                    ["When $F$ is applied at an angle of 45 degrees to $r$", 0, false],
                    ["When $F$ is applied at an angle of 90 degrees to $r$", 0, false]
                ],
                explain: "The cross product is maximized when the two vectors it is operating on are perpendicular. Therefore, when $F$ and $r$ are perpendicular the torque is a maximum."
            },
            {
                number: 3,
                question: "The lever arm is defined as the perpendicular distance between the force and what?",
                answers: [
                    ["The pivot point", 0, false],
                    ["The position vector", 0, false],
                    ["The line of action", 1, false],
                    ["None of the above", 0, false]
                ],
                explain: "The lever arm is a mathematical convenience that allows us to simplify the calculation of torque. It is the perpendicular distance from the line of action of the force to the pivot point."
            },
            {
                number: 4,
                question: "How do you find the torque given the lever arm and force?",
                answers: [
                    ["Take the cross product", 0, false],
                    ["Take the dot product", 0, false],
                    ["Sum them", 0, false],
                    ["Multiply them", 1, false]
                ],
                explain: "The lever arm is already the perpendicular component of the position vector, so we can simply take the product of it and the force in order to find the torque."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "What is the torque due to the gravitational force on a sphere of radius 0.5 m and mass 2.5 kg in free fall?",
                answers: [
                    ["12.3 N·m", 0, false],
                    ["9.81 N·m", 0, false],
                    ["4.9 N·m", 0, false],
                    ["0 N·m", 1, false]
                ],
                explain: "The gravitational force acts at the center of the sphere, meaning that the lever arm for this scenario is zero. The torque is also then zero. Note that we could have reasoned this, as an object in free fall does not rotate."
            },
            {
                number: 1,
                question: "You push on a 0.6 meter long stick lodged into the ground with a force of 600 N directly downwards. The stick is stuck at an angle of 35 degrees to the vertical. What is the torque that you are exerting?",
                answers: [
                    ["206.5 N·m", 1, false],
                    ["294.9 N·m", 0, false],
                    ["360.0 N·m", 0, false],
                    ["344.1 N·m", 0, false]
                ],
                explain: "The lever arm in this case is $L \\sin(35\\degree)$, where $L$ is the length of the stick. With this information, we can find the torque to be $206.5~\\textrm{N·m}$."
            },
            {
                number: 2,
                question: "A 0.25 meter long stake will break if the torque on it exceeds 250 N·m. You hit the stake with a hammer at an angle of 8 degrees from the vertical. What is the maximum force you can apply?",
                answers: [
                    ["449.1 N", 0, false],
                    ["7185 N", 1, false],
                    ["1009 N", 0, false],
                    ["2000 N", 0, false]
                ],
                explain: "The lever arm in this situation would be $0.0348~\\textrm{m}$. With this information, we can write the formula $\\tau = h \\cdot F$, where $h$ represents the lever arm. Solving for $F$ gives us a maximum force of $7185~\\textrm{N}$."
            },
            {
                number: 3,
                question: "Is it possible for the net force on an object to be zero, but for it to still experience torque?",
                answers: [
                    ["No, the two are connected.", 0, false],
                    ["Yes, rotation and translation are independent", 1, false],
                    ["Only if there is no friction", 0, false],
                    ["Only if there are more than two forces", 0, false]
                ],
                explain: "You can have a net force of zero but some net torque, because rotating objects have different definitions of direction. For instance, you can apply forces in opposite directions to the top and bottom of the wheel, which would cause it to rotate but have zero net force."
            },
            {
                number: 4,
                question: "How can you push on a uniform horizontal disk such that it does not rotate?",
                answers: [
                    ["Apply a force at the edge", 0, false],
                    ["Apply a force downwards", 0, false],
                    ["Apply a force at the middle", 1, false],
                    ["Apply a force at an angle", 0, false]
                ],
                explain: "To prevent rotation, the force applied must pass through the center of the horizontal disk, meaning you have to push at the middle of the disk."
            },
            {
                number: 5,
                question: "What is the torque due to gravity on a rod of mass $M$ and length $L$ pivoted at its end when it is at an angle $\\theta$ below the horizontal?",
                answers: [
                    ["$MgL\\sin\\theta$", 0, false],
                    ["$MgL\\cos\\theta$", 0, false],
                    ["$\\frac12 MgL\\sin\\theta$", 0, false],
                    ["$\\frac12 MgL\\cos\\theta$", 1, false]
                ],
                explain: "The gravitational force is applied at the center of mass of the object, which means we only take half of the rod into consideration when solving for the lever arm. If we do some geometry, we can find that the lever arm for a general angle $\\theta$ is $\\frac12 L \\cos \\theta$. Therefore, the torque is $\\frac12 MgL\\cos\\theta$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "What is the torque due to the gravitational force on a sphere of radius 0.5 m and mass 2.5 kg in free fall?",
                answers: [
                    ["12.3 N·m", 0, false],
                    ["9.81 N·m", 0, false],
                    ["4.9 N·m", 0, false],
                    ["0 N·m", 1, false]
                ],
                explain: "The gravitational force acts at the center of the sphere, meaning that the lever arm for this scenario is zero. The torque is also then zero. Note that we could have reasoned this, as an object in free fall does not rotate."
            },
            {
                number: 1,
                question: "You push on a 0.6 meter long stick lodged into the ground with a force of 600 N directly downwards. The stick is stuck at an angle of 35 degrees to the vertical. What is the torque that you are exerting?",
                answers: [
                    ["206.5 N·m", 1, false],
                    ["294.9 N·m", 0, false],
                    ["360.0 N·m", 0, false],
                    ["344.1 N·m", 0, false]
                ],
                explain: "The lever arm in this case is $L \\sin(35\\degree)$, where $L$ is the length of the stick. With this information, we can find the torque to be $206.5~\\textrm{N·m}$."
            },
            {
                number: 2,
                question: "A 0.25 meter long stake will break if the torque on it exceeds 250 N·m. You hit the stake with a hammer at an angle of 8 degrees from the vertical. What is the maximum force you can apply?",
                answers: [
                    ["449.1 N", 0, false],
                    ["7185 N", 1, false],
                    ["1009 N", 0, false],
                    ["2000 N", 0, false]
                ],
                explain: "The lever arm in this situation would be $0.0348~\\textrm{m}$. With this information, we can write the formula $\\tau = h \\cdot F$, where $h$ represents the lever arm. Solving for $F$ gives us a maximum force of $7185~\\textrm{N}$."
            },
            {
                number: 3,
                question: "Is it possible for the net force on an object to be zero, but for it to still experience torque?",
                answers: [
                    ["No, the two are connected.", 0, false],
                    ["Yes, rotation and translation are independent", 1, false],
                    ["Only if there is no friction", 0, false],
                    ["Only if there are more than two forces", 0, false]
                ],
                explain: "You can have a net force of zero but some net torque, because rotating objects have different definitions of direction. For instance, you can apply forces in opposite directions to the top and bottom of the wheel, which would cause it to rotate but have zero net force."
            },
            {
                number: 4,
                question: "How can you push on a uniform horizontal disk such that it does not rotate?",
                answers: [
                    ["Apply a force at the edge", 0, false],
                    ["Apply a force downwards", 0, false],
                    ["Apply a force at the middle", 1, false],
                    ["Apply a force at an angle", 0, false]
                ],
                explain: "To prevent rotation, the force applied must pass through the center of the horizontal disk, meaning you have to push at the middle of the disk."
            },
            {
                number: 5,
                question: "What is the torque due to gravity on a rod of mass $M$ and length $L$ pivoted at its end when it is at an angle $\\theta$ below the horizontal?",
                answers: [
                    ["$MgL\\sin\\theta$", 0, false],
                    ["$MgL\\cos\\theta$", 0, false],
                    ["$\\frac12 MgL\\sin\\theta$", 0, false],
                    ["$\\frac12 MgL\\cos\\theta$", 1, false]
                ],
                explain: "The gravitational force is applied at the center of mass of the object, which means we only take half of the rod into consideration when solving for the lever arm. If we do some geometry, we can find that the lever arm for a general angle $\\theta$ is $\\frac12 L \\cos \\theta$. Therefore, the torque is $\\frac12 MgL\\cos\\theta$."
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
import { Engine, Render, Runner, Bodies, Body, Composite, Mouse, Constraint, MouseConstraint, Events} from 'matter-js'
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let torqueUpdateHandler = null

const viewportMsg = ref('')
function runWrench() {
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
    document.getElementById("wrench").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup

    engine.gravity.y = 0;
    var width = 0.5 * window.innerWidth > 600 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('wrench'),
        engine: engine,
        options: {
            width: width,
            height: width,
            wireframes: false,
            background: "#000"
        }
    });
    currentRender = render // Store reference for cleanup

    // run the renderer
    Render.run(render);

    var wrenchBody = Bodies.rectangle(400 / 600 * width, 300 / 600 * width, 200 / 600 * width, 30 / 600 * width, {
        render: { fillStyle: 'cyan' }
    })

    var wrenchHead = Bodies.rectangle(300 / 600 * width, 300 / 600 * width, 50 / 600 * width, 50 / 600 * width, {
        render: { fillStyle: 'cyan' },
    })

    var wrench = Body.create({
        parts: [wrenchBody, wrenchHead],
        frictionAir: 0.05,
        mass: 6 / 600 * width
    })
    var pivot = Bodies.circle(300 / 600 * width, 300 / 600 * width, 10 / 600 * width, {
        render: { visible: false },
        isStatic: true,
        collisionFilter: {
            mask: 0
        }
    })

    var hand = Bodies.rectangle(500 / 600 * width, 400 / 600 * width, 40 / 600 * width, 40 / 600 * width,
        {
            render: { fillStyle: 'red' },
            mass: 0.1
        }
    )


    var constraint1 = Constraint.create({
        bodyA: wrench,
        pointA: { x: -70 / 600 * width, y: 0 },
        bodyB: pivot,
        stiffness: 1,
        length: 0,
        damping: 1.2 / 600 * width,
        render: { strokeStyle: '#fff', lineWidth: 3 }
    });

    var constraint2 = Constraint.create({
        bodyB: hand,
        bodyA: wrench,
        pointA: { x: 100 / 600 * width, y: 0 },
        stiffness: 0.5,
        length: 100 / 600 * width,
        damping: 0,
        render: { strokeStyle: '#fff', lineWidth: 3 }
    })

    Composite.add(engine.world, [wrench, pivot, hand, constraint1, constraint2])

    // Define the torque update handler
    torqueUpdateHandler = () => {
        Body.applyForce(wrench, wrench.position, {
            x: 0,
            y: 0.005 * wrench.mass / 600 * width
        });
    }

    //only wrench feels gravity
    Events.on(engine, 'beforeUpdate', torqueUpdateHandler);

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
    runWrench()
})

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Remove event listeners
        if (torqueUpdateHandler) {
            Events.off(currentEngine, 'beforeUpdate', torqueUpdateHandler)
            torqueUpdateHandler = null
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

</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Torque</h1><br>
        <p>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            You might have heard the term "torque" when talking about engines, alongside horsepower. The second is just
            a
            measure of power, which we know how to deal with. But torque, on the other hand, determines how powerful the
            initial acceleration of the car is. Engines that can produce a higher torque can accelerate much faster,
            usually
            at the expense of having a lower top speed. In simple terms, it's rotational force.
            <br><br>
            The idea of torque is more simple than the concepts behind it. First, I want to introduce a new vector
            operator
            that is required to understand torque and many other parts of this chapter, the cross product.
            <br><br>
            <h4 class="text-center">Cross Product</h4>
            <span v-show="level > 0">
                The cross product is represented with a multiplication sign, written as $ \vec{a}\times\vec{b}$. It
                measures
                orthogonality as opposed to how the dot product measures how parallel vectors are. It's kind of the
                opposite
                of the dot product in that sense, but it's more nuanced than that.
                <br><br>
                <span v-show="level == 2">
                    This concept is actually vector calculus, involving complex topics such as the determinant of a
                    three-dimensional
                    matrix. You can explore these definitions on your own, but this level of understanding is
                    unnecessary for
                    this level of physics.
                    <br><br>
                </span>
                The cross product is geometrically defined as the area made by the parallelogram that has the two
                vectors as the two
                different legs. This is its magnitude, but unlike the dot product <b>it is also a vector.</b> This means
                that we have to
                account for the direction, which is defined as perpendicular to both vectors being operated on. How is
                that possible? In
                three dimesions, that's how.
                <br><br>
                Now is a good time to introduce the mathematical definition of the cross product. It considers two
                vectors with an angle $\theta$ between them.
                <br><br>
                $$ \vec{a} \times \vec{b} = |\vec{a}||\vec{b}| \sin \theta$$
                <br>
                Of course, I've left out the direction, but it's perpendicular to both vectors. Now's the proper time to
                show you what that actually means.
                <figure>
                    <img src="/rotation/Figure 79.png" />
                    <figcaption>Figure 1: The cross product in green.</figcaption>
                </figure>
                There is a plane at the bottom of the page to indicate perspective. You see now that the cross product
                is inherently three-dimensional
                in nature. This formula is enough for our torque purposes, but if you plan on going on into more
                advanced topics
                a more thorough discussion of this topic would be required.
                <br><br>
                Essentially, what's happening with the formula is we are taking the perpendicular component of either
                vector and multiplying it with the
                magnitude of the other. Thus, in order to calculate the cross product given two vectors we want to find
                the component of one that is perpendicular
                to the other. This is what we will do for torque, and this is what the vast majority of physics problems
                that involve the cross product expect
                you to do.
                <br><br>
                While an algebraic technique exists as well, this is the technqiue far more commonly seen in physics,
                and it's the one I'll use
                to explain torque. The algebraic formula is also exceedingly long and difficult to memorize, unless you
                have familiarity with
                three-dimensional matrices.
            </span>
            <span v-show="level == 0">
                The cross product is kind of the opposite of the dot product. Instead of measuring how parallel two
                vectors are, it measures
                how perpendicular they are. This is starting to make the cross product look just like the dot product,
                but there's one key difference.
                <br><br>
                The result of a dot product is a scalar quantity. But the result of a cross product is a <b>vector</b>!
                The direction of this vector
                is defined such that it is perpendicular to both of the vectors in the operation. But wait, you might be
                saying, how is that
                possible? In three, dimensions, of course!
                <br><br>
                <figure>
                    <img src="/rotation/Figure 79.png" />
                    <figcaption>Figure 1: The cross product in green.</figcaption>
                </figure>
                <br>
                The grey rectangle is a plane that provides perspective for the illustration, which is in three
                dimensions. Now do you
                see what I'm talking about? The magnitude of the cross product is equivalent to the area enclosed by the
                parallelogram defined
                by the two vectors. The math definition is as follows, and looks similar to the one for the dot product.
                However, keep in mind
                that this one produces a vector!
                <br><br>
                $$ \vec{a} \times \vec{b} = |\vec{a}||\vec{b}| \sin \theta$$
                <br>
                You don't see the direction here because there's no good way to represent it with algebraic symbols.
                <br><br>
                This is what we're going to be using to evaluate torque. More specifically, the formula states that the
                cross product is equal to the product
                of one vector's magnitude and the magnitude of the component of the other vector <b>perpendicular</b> to
                the first. The order doesn't matter.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1"><h4 class="text-center">Definition</h4>
            Now, we can actually begin our discussion of torque. As you probably have guessed, the definition of torque
            contains a
            cross product.
            <br><br>
            $$ \vec{\tau} = \vec{r} \times \vec{F} $$
            <br>
            That's the Greek letter tau. Now, this just simply represents torque as the cross product of the radius
            vector and force. But what
            does it actually mean, and why do we care about any of this at all?
            <br><br>
            The radius vector $\vec{r}$ is measured from the axis of rotation (where the object rotates) to the point
            where the force is
            applied. It points from the axis of rotation to the point of force application, and comes <b>first</b> in
            the cross product.
            <br><br>
            <figure>
                <img src="/rotation/Figure 80.png" />
                <figcaption>Figure 2: The components of torque on a wrench.</figcaption>
            </figure>
            <br>
            The wrench is a commonly-used tool to demonstrate how torque works. Think about why we always push on the
            end of the
            wrench furthest from the wrench's head. It makes it easier to turn the bolt, right? Well, this is because
            the radius
            vector $\vec{r}$ is greatest at that point! And, it should go without saying that if we push harder the bolt
            will turn
            faster, since force is the other part of torque.
            <br><br>
            Here's a simple demonstration of the wrench made in Matter.js for you to play with and to get a feel of how
            it works. The red
            square is for you to pull on and see how pulling at an angle affects the rotation of the virtual wrench.
            This is
            important for building intuition if you don't handle wrenches often, and you can come back to this to verify
            the results I'm
            presenting later.
            <br><br>
            <figure>
                <h3>Torque Demo</h3><br>
                <div id="wrench"></div>
                <button class="btn btn-outline-primary" @click="runWrench()">Reset</button><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            <span v-show="level > 0">
                What if we push at an angle instead of directly downwards? Well, if you've worked with a wrench (if not
                in real life, at least
                with the simulation) you know that we
                don't tend to do this. But why? A problem that hinges on the definition of the cross product should
                explain this.
                <br><br>
                <div class="problem">
                    A man pushes on a wrench of length 0.7 meters at an angle of 30° left of the vertical while it is
                    horizontal at the end of the wrench.
                    How much torque is being exerted on the bolt if the man pushes with a force of 100 N?
                    <br><br>
                    <figure>
                        <img src="/rotation/Figure 81.png" />
                        <figcaption>Figure 3: Pushing at an angle.</figcaption>
                    </figure>
                    <br>
                    Recall that torque is defined as a cross product. This means that we cannot simply multiply the two
                    vectors, but rather have
                    to account for the angle in between them. If we just strictly follow the formula, we will get:
                    <br><br>
                    $$ \tau = \vec{r} \cross \vec{F} = |\vec{r}||\vec{F}|\sin 30° = \bbox[3px,
                    border: 0.5px solid
                    white]{35 ~\textrm{N} \cdot \textrm{m} }$$
                    <br>
                    But what's the reason we do this? Well, only the component of the force that is perpendicular to the
                    radius actually has an effect on the torque.
                    The parallel component doesn't contribute because pushing along the length of a wrench won't make it
                    turn. What's really happening here is we're multiplying the
                    radius by the component of the force that is perpendicular to it, because that's the only part that
                    causes a torque!
                </div>
                <br>
                You might have noticed something back there. I wrote my answer with the unit of $\textrm{N} \cdot
                \textrm{m}$, but this is
                dimensionally equivalent to joules! (Think back to the definition of work.) However, torque and energy
                are obviously not the same thing, so this
                is a case where dimensionality does not mean equality! In other words, just because two quantities are
                dimensionally equivalent
                does <b>not</b> mean they are the same thing.
                <br><br>
                Always use the unit of joules ($\textrm{J}$) for work and energy, and always use the unit of
                Newton-meters ($\textrm{N} \cdot \textrm{m}$) for torque. Dimensional
                analysis can break down a little bit here because of this, but most of the time it should still be a
                good way of checking your answers. Another
                thing to note about this unit is that the radian is technically dimensionless, only being written
                because we don't want to leave
                one part of our unit empty. (Imagine if rad/s was just /s!)
            </span>
            <span v-show="level == 0">
                If you've ever used a wrench, you know that pushing at an angle tends to be less effective than pushing
                perpendicular
                to the arm. The definition of torque helps explain why this is. Consider that we're now pushing on that
                same wrench, but
                at an angle of 30° to the vertical.
                <br><br>
                <figure>
                    <img src="/rotation/Figure 81.png" />
                    <figcaption>Figure 3: Pushing at an angle.</figcaption>
                </figure>
                <br>
                If you've ever tried this, you know it's not as good as just pushing straight down. Part of that is
                certainly
                due to how it's easier to exert force downwards since gravity helps you, but even if the force were the
                same
                the torque would be less. Recall the definition of torque as a cross product:
                <br><br>
                $$ \tau = \vec{r} \times \vec{F} = rF\sin\theta $$
                <br>
                Do you see the $\sin \theta$? If you know trigonometry, you know that the sine function is a maximum at
                an angle of
                90°, which is when you're pushing perpendicular! Any angle less than that produces a suboptimal amount
                of torque.
                <br><br>
                There's another, less mathematical way to think about this. Only the component of the force that's
                perpendicular to the wrench
                has any effect on the torque, because the component that's along the length of the wrench can't cause it
                to turn. Therefore, when
                we tilt the force at an angle, less of the force can contribute to the torque.
                <br><br>
                The unit of torque is Newton-meters ($\textrm{N} \cdot \textrm{m}$), which is dimensionally the same as
                energy but shouldn't be
                interchanged with it! They are <b>not</b> the same thing under any circumstances. This is why we use the
                unit of joules ($\textrm{J}$)
                for energy at all times: we don't want to confuse the two.
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
            Force and radius being perpendicular is certainly nice and happens decently often, but we can't forgo those
            numerous cases
            where they aren't. Here, I'll present a general method that's used to compute torque for more complex cases,
            as well as explain a
            few tips for this topic. It's complex!
            <br><br>
            <h4 class="text-center">Lever Arm Method</h4>
            The most common method you'll see involves using a <b>lever arm</b>, which is the component of the radius
            vector that is
            perpendicular to the force. There's a good graphical method of finding it, which involves an imaginary line
            called the
            <b>line of action</b>.
            <br><br>
            Wait! Didn't I explain for an entire paragraph about how only the perpendicular <b>force</b> causes a
            torque? Why are we now
            manipulating radius? Well, the reason is simple. We can do either, because the cross product doesn't care
            which vector you
            make perpendicular to the other. Thus, we usually just do whatever's convenient in any given scenario,
            whether that be manipulating
            force or displacement.
            <br><br>
            Okay, now I'll show you the lever arm and line of action method with a labelled diagram to help with my
            explanation.
            <br><br>
            <figure>
                <img src="/rotation/Figure 82.png" />
                <figcaption> Figure 4: Contrary to popular belief, the lever arm is not the arm of a lever.
                    <br>
                    Oh, and the device in the picture is called a torque wrench. It's a pretty neat tool.
                </figcaption>
            </figure>
            <br>
            The <b>line of action</b> is found simply by drawing a (dotted) line through the point of rotation parallel
            to the
            direction of the force in question. It is <b>not</b> drawn along the direction of the radius vector, nor is
            it drawn exactly
            horizontal or vertical. Those are somewhat common misconceptions I see with this concept.
            <br><br>
            Once you've established the correct line of action, we can find the <b>lever arm</b> as the
            <b>perpendicular</b> distance
            between the line of action and the line that represents the force. You can also draw an imaginary line that
            extends along the force
            vector and sits on top of it if that helps. <b>This line of action is perpendicular to both lines!</b>
            Hopefully you can see that
            from the diagram.
            <br><br>
            This method of finding the torque should serve you well for most problems involving torque in some extent.
            It's a very generalized method
            that is designed to work in a lot of cases, which is why it is useful. <span v-show="level > 0">If you feel
                your skills are
                up to the task, you can also forgo this method and instead manipulate either force or radius in order to
                get the torque depending on what's
                easier for the situation. However, if you want the comfort of a single method that works, stick with the
                line of action and lever arm.
            </span>
            <br><br>
            <h4 class="text-center">Conclusion</h4>
            This concludes our discussion of torque. Right now, there's not much we can do with it because it's just a
            small piece in a grander puzzle called
            rotational dynamics, but we'll definitely make good use of this quantity in the future. For now, make sure
            you know how to calculate torque, and you'll be
            set for this concept.
            <br><br>
            The next concept is one that is often quite foreign and new to people, because it's a rotational equivalent
            of ...mass? But, if you're ready we should move on to talking about
            the moment of inertia, the second key piece in our puzzle that takes the name of rotational dynamics.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/rotation/moment-of-inertia">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Torque Problems</h1><br>
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