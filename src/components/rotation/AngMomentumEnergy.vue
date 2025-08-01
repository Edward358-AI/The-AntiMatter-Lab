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
import { ref, onMounted, onUnmounted} from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Mouse, Constraint, MouseConstraint} from 'matter-js'

const inputInertia = ref(30)
const elasticity = ref(1)
const viewportMsg = ref('')

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null


let rod, ball
let engine, render, runner

function runAngCollision() {
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
    document.getElementById("angularcollision").innerHTML = ""

    engine = Engine.create()
    currentEngine = engine // Store reference for cleanup
    engine.gravity.y = 0
    var width = 0.5 * window.innerWidth > 600 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = width;
    render = Render.create({
        element: document.getElementById("angularcollision"),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#000"
        }
    })
    currentRender = render // Store reference for cleanup

    Render.run(render)

    rod = Bodies.rectangle(300 / 600 * width, 300 / 600 * width, 50 / 600 * width, 400 / 600 * width, {
        render: { fillStyle: "#888" },
        inertia: 1000 * Math.pow(inputInertia.value, 2),
        frictionAir: 0,
        restitution: 1
    })

    const pivot = Constraint.create({
        bodyA: rod,
        pointB: { x: 300 / 600 * width, y: 300 / 600 * width },
        stiffness: 1,
        length: 0,
        damping: 0,
        render: { strokeStyle: "#fff", lineWidth: 3 }
    })

    ball = Bodies.circle(100 / 600 * width, 400 / 600 * width, 40 / 600 * width, {
        render: { fillStyle: "cyan" },
        restitution: Math.abs(elasticity.value),
        frictionAir: 0,
        mass: 30
    })

    const walls = [
        Bodies.rectangle(-50 / 600 * width, 300 / 600 * width, 100 / 600 * width, 800 / 600 * width, { isStatic: true }),
        Bodies.rectangle(650 / 600 * width, 300 / 600 * width, 100 / 600 * width, 800 / 600 * width, { isStatic: true }),
        Bodies.rectangle(300 / 600 * width, -50 / 600 * width, 800 / 600 * width, 100 / 600 * width, { isStatic: true }),
        Bodies.rectangle(300 / 600 * width, 650 / 600 * width, 800 / 600 * width, 100 / 600 * width, { isStatic: true })
    ]

    Composite.add(engine.world, [rod, pivot, ball, ...walls])

    runner = Runner.create()
    currentRunner = runner // Store reference for cleanup
    Runner.run(runner, engine)

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.01,
            damping: 0,
            render: { visible: false }
        }
    })

    Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse
}

onMounted(() => {
    runAngCollision()
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

// Watch inertia changes and update the body
watch(inputInertia, (newVal) => {
    if (rod) {
        const newInertia = 1000 * Math.pow(newVal, 2)
        Body.setInertia(rod, newInertia)
    }
})

watch(elasticity, (newVal) => {
    if (ball) {
        ball.restitution = Math.abs(newVal),
            Body.set(ball, { isSleeping: false })
    }
})

</script>

<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Rotational Kinetic Energy and Angular Momentum</h1><br>
        <p>
        <div v-show="page === 0">
            Believe it or not, rotating objects have kinetic energy as well. This is the rotating counterpart to
            translational kinetic energy
            ($K = \frac12 mv^2$) <span v-show='level > 0'>and arises due to the kinetic energy of each individual point
                on
                a rotating object. This is
                often hard to calculate however, so we just use a catch-all formula to describe the kinetic energy of
                rotation.
            </span> Something can have
            both translational and rotational kinetic energy, as you might have expected. The basic equation for
            rotational
            kinetic energy is very simple:
            <br><br>
            $$ K = \dfrac12 I \omega^2 $$
            <br>
            Another case where the rotational quantity is analogous to the linear one. Of course, we can't talk about
            energy without also
            talking about work. Torque can do work as well, which often is converted into rotational kinetic energy. The
            formula is:
            <br><br>
            $$W = \tau \Delta \theta $$
            <br>
            <span v-show="level == 2">
                There's an integral form of this as well, as you probably guessed.
                <br><br>
                $$ W = \int_{\theta_i}^{\theta_f} \tau ~d\theta $$
                <br>
            </span>
            Of course, we can't forget about power. I bet you could have guessed this formula without me showing it.
            <br><br>
            $$ P = \tau \omega $$
            <br>
            <b>None of these are new quantities!</b> They are <b>not</b> the rotational analogues of what we already
            know. Kinetic energy is still just energy,
            and work is the same work described by the formula $W = F \cdot x$. These are simply new ways of calculating
            these quantities
            when rotation is involved.
            <br><br>
            This is all pretty elementary stuff that only builds off of what we already know, so I won't go too much
            into depth about it. These ideas are important, but not difficult or lengthy enough to
            warrant their own section, so I've grouped them in with angular momentum. Speaking of that, the next concept
            (angular momentum) is much more complex and interesting.
            <span v-show="level > 0">
                <br><br>
                Before we move on, though, let's try a short practice problem.
                <br><br>
                <div class="problem">
                    What is the total kinetic energy of a hollow ball of mass $m$ and radius $R$ that rolls with some
                    speed $v$ without slipping?
                    <br><br>
                    This hearkens back to our last lesson, so I hope you were paying attention there. There are two ways
                    to go about this. The first
                    is to consider both the linear motion of the ball and treat the rotational motion as if it were
                    around the center of the object.
                    In this case, the linear speed of the ball is $v$ and the angular velocity of the ball is $\omega =
                    v/r$.
                    <br><br>
                    $$ K = \dfrac12 mv^2 + \dfrac12 \left( \dfrac{2}{3} m r^2\right) \left( v/r \right)^2$$
                    $$ K = \dfrac12 mv^2 + \dfrac13 m v^2 = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{5}{6} mv^2} $$
                    <br>
                    The other method is the one I like better. Consider the motion as just pure rotation around the
                    point of contact with the ground.
                    We can the write the kinetic energy as just one term: the rotational kinetic energy around that
                    point.
                    <br><br>
                    $$ K = \dfrac12 \left( \dfrac{5}{3} mr^2 \right) \left( v/r \right)^2 $$
                    $$ K = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{5}{6} mv^2} $$
                </div>
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            Angular momentum is a kind of momentum of rotating objects. Unlike the energy concepts we covered
            previously, it is
            separate from linear momentum and follows its own rules. We also have a conservation law for angular
            momentum, but the
            criterion for the conservation of angular momentum is slightly different.
            <br><br>
            As you might guess, the angular momentum hinges on the idea of moment of inertia and angular velocity. The
            general formula
            for an object is:
            <br><br>
            $$ L = I \omega$$
            <br>
            Angular momentum is conserved whenever there is no net external torque on the system, as you might have
            guessed.
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>The Law of Conservation of Angular Momentum:</strong><br><i>Angular momentum is conserved about
                    an axis when
                    there is no net external torque about that axis.
                </i>
            </div>
            <br>
            So far, this mirrors the conditions and
            definitions for plain old regular momentum, which we covered in depth in our last section. The only thing
            is, we have to consider torque
            about a specific axis, since angular momentum is measured around a particular axis.
            <br><br>
            But here's where it gets interesting! You can actually have angular momentum for objects moving in a line!
            Here's a demo to show
            that off. The ball moves in a line, but can give the rod some angular momentum (by causing it to spin) when
            it
            collides with it! Try throwing the ball at the rod to see what happens.
            <br><br>
            <figure>
                <h3>Angular Momentum Demo</h3><br>
                <div id="angularcollision"></div>
                <button class="btn btn-outline-primary" @click="runAngCollision()">Reset</button><br>

                <div class="row justify-content-center"> <label>Moment of Inertia: {{ inputInertia }}</label><br><input
                        type="range" class="form-range" v-model="inputInertia" min="1" max="100" step="1"
                        style="width:fit-content;" /></div>

                <div class="row justify-content-center"><label>Elasticity: {{ elasticity }}</label><br><input
                        type="range" class="form-range" v-model="elasticity" min="0" max="1" step="0.1"
                        style="width:fit-content;" /></div>
                <span class="warn">{{ viewportMsg }}</span>

            </figure>
            <br>
            You're also able to dynamically change the moment of inertia, but that can lead to some wacky results (as
            would be expected, since
            you can't just change the moment of inertia all willy-nilly in the real world).
            <br><br>
            The rod obviously gains some angular momentum after the ball collides with it! This means that the ball
            transferred angular momentum
            to the rod, <b>despite only having moved in a straight line!</b> Indeed, any object has angular momentum as
            long as it's
            moving. This angular momentum is defined relative to the axis of rotation:
            <br><br>
            $$ L = \vec{p} \cross \vec{r} = mvh $$
            <br>
            I've defined $h$ as the "height" that the ball is from the center of rotation. Of course, we aren't always
            going to be dealing
            with the y-direction, but it's just a more concrete way of visualizing the cross product. This essentialy
            states that the angular momentum
            is equal to angular momentum that the ball would have at the point of impact, if it were to rotate about
            that particular axis.
            <br><br>
            The cross product definition above is technically the more general form of angular momentum, but our $L = I
            \omega$ works better
            for rigid objects. The above formula really only works well for point objects, as we would have to apply
            that formula to each point
            in a rigid body to find the total angular momentum. And that takes calculus, not to mention a whole lot of
            work.
            <br><br>
            <span v-show='level > 0'>
                Note that we can choose any reference point for angular momentum of a ball moving in a line. We are
                almost always
                going to just choose the point where the system would rotate around, but keep in mind that the choice of
                rotational axis
                is arbitrary. Moreover, we also sometimes need to choose the axis around which there is zero net
                external torque such that
                angular momentum is actually conserved.
                <br><br>
            </span>
            Well, regular momentum has a direction, so angular momentum should have one as well, right? Well, yes, but
            it's not in the direction
            that you might expect! Instead of being in the plane of rotation, it points <b>out</b> of the plane of
            rotation!
            <br><br>
            <figure>
                <img src='/src/assets/rotation/Figure 95.png' style="max-width:700px" />
                <figcaption>Figure 1: The direction of angular momentum.</figcaption>
            </figure>
            <br>
            <span v-show="level == 0">
                The exact reason for all the directions requires a pretty lengthy explanation, so just know this. A
                counterclockwise rotation means
                that the angular velocity vector is upwards, out of the plane of the page, and a clockwise rotation
                means the vector is into the page.
                Since angular momentum is directly proportional to angular velocity, the angular momentum is in the same
                direction as the
                angular velocity vector.
            </span>
            <span v-show="level > 0">
                Why is this? Well, it has to do with the cross product. We have something called the <b>right-hand
                    rule</b> for evaluating
                the direction of quantities that have to do with cross products as well as angular quantities in
                general. You might have
                noticed that angular velocity points out of the plane of rotation. This means it either points out of
                the page or into the
                page.
                <br><br>
                The way we figure out the direction of angular angular velocity is actually a cross product (the strict
                definition is $v = \omega \times r$), but
                it can be simplified because of the nature of rotation. To find the direction of the angular velocity,
                we simply curl our right hand
                around the axis of rotation, making sure our fingers curl in the direction of rotation. The direction
                that our thumb
                points in is the direction of the angular velocity vector. Simple! Just don't use your left hand,
                because that'll give you the wrong direction. Sorry if
                you're left handed!
                <br><br>
                Since angular momentum is related to angular velocity as $ L = I \omega$, the direction of angular
                momentum is the
                same as the direction of angular velocity. Remember this right-hand rule, because there will be more in
                the future...
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
        <div v-show="page === 2">
            Let's test our knowledge of angular momentum with a few practice problems. The concept can seem pretty
            abstract until
            we actually apply it. We start off by actually analyzing the situation we saw in the demo earlier.
            <br><br>
            <div class="problem">
                A blob of clay with a mass of 0.5 kg is launched at a rigid rod that is free to rotate around its center
                with a
                velocity of 3.5 m/s. The rod has a mass of 2.0 kg and a length of 1.0 meters. If the blob impacts at a
                distance of
                0.3 meters from the center of the rod, what is the angular velocity of the blob-rod system after the
                collision?
                <br><br>
                If we analyze the system's angular velocity around the pivot point, there is no net external torque.
                However, if we use any other
                point as a reference, there <b>will</b> be some net external torque because the pivot point has to exert
                some force to keep the
                rod in place. Pivots can't exert torque about themselves, but they do exert quite a significant amount
                of force. (Think about it
                this way: if the pivot weren't there, the blob and rod would move off together to the right.)
                <br><br>
                With this realization in place, we can calculate the amount of initial angular momentum around the
                pivot. We are calling the clay's
                mass $m$, the distance it hits at $h$, and its initial velocity $v$. We will also define the rod's mass
                to be $M$ and its length
                as $L$.
                <br><br>
                $$ L = mvh$$
                <br>
                This should equal the total final momentum. This involves not only the rod rotating around the pivot,
                but also the clay stuck to the rod's
                rotation. This means that we have the rod's moment of inertia, along with the moment of inertia of the
                clay rotating a distance $h$ from the pivot
                point. You can assume this collision is inelastic because clay tends to stick to things.
                <br><br>
                $$ L = \left( \dfrac{1}{12}ML^2 + mh^2 \right) \omega = mvh $$
                <br>
                Now, we solve for $\omega$. You can plug in every known value beforehand so you don't have to deal with
                so many variables.
                <br><br>
                $$ \omega = \bbox[3px,
                border: 0.5px solid
                white] {2.48~\textrm{rad/s} } $$
            </div>
            <br>
            I also want to talk about a famous angular momentum example: the ice skater. Conjure in your mind the image
            of an ice skater spinning with their
            arms extended on an ice rink. When they pull their arms inward, their angular velocity increases. Why is
            this? Well, angular momentum
            provides us with the answer.
            <br><br>
            The ice skater's total angular momentum cannot change, because there is no net external torque. Recall that
            angular momentum is
            defined as $L = I \omega$. If they pull their arms
            inwards, their moment of inertia decreases ($r$ decreases), so their angular velocity must increase to
            compensate.
            <span v-show="level > 0">
                <br><br>
                Sometimes, there is no obvious axis of rotation, which can allow us to conclude that the angular
                momentum will be conserved in
                all interactions. In these cases, we can actually neglect to define a singular axis of rotation and
                instead compute the
                angular momentum about the center of mass. It's difficult to explain this with words, so I'll use an
                example.
                <br><br>
                <div class="problem">
                    A disk of mass $m$ and radius $r$ spins with some angular velocity $\omega_0$. A point object of
                    mass $m$ is placed
                    on the edge of the disk and eventually comes to rest relative to the disk. What is the final angular
                    velocity of the
                    system, in terms of $omega$?
                    <br><br>
                    Did you say $\omega_0 / 3$? If so, you fell into a very common pitfall! See, the disk isn't
                    constrained to rotate around its center. It can
                    rotate any way it wants! If the disk and mass spin together, <b>they will spin around their center
                        of mass</b>! The moment of inertia
                    must then be calculated relative to that point, not the center of the disk.
                    <br><br>
                    The center of mass is located $r/2$ from the center of the disk. Thus, we can write the moments of
                    inertia of the disk and point mass:
                    <br><br>
                    $$ I_{disk} = \dfrac 12 mr^2 + m \left( \dfrac{r}{2} \right)^2 = \dfrac34 mr^2 $$
                    $$ I_{mass} = m \left( \dfrac{r}{2} \right)^2 = \dfrac14 mr^2 $$
                    <br>
                    Therefore, the total moment of inertia is:
                    <br><br>
                    $$ I = mr^2 $$
                    <br>
                    We can then write our conservation of angular momentum. We <b>still</b> calculate initial angular
                    momentum of the disk
                    in the normal way, because it rotates around its center initially. We can change the axis of
                    reference later on because there is
                    no net external torque anywhere, and we've chosen the system such that angular momentum will be
                    conserved.
                    <br><br>
                    $$ \dfrac 12 mr^2 \omega_0 = mr^2 \omega_f $$
                    $$ \omega_f = \bbox[3px,
                    border: 0.5px solid
                    white] {\omega_0 /2} $$
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
        <div v-show="page === 3">
            One more short concept to talk about, then we're done with this lesson. You might recall that when we talked
            about
            linear momentum, we also talked about impulse. Well, there is such a thing as angular impulse, but it is
            rather
            less commonly discussed.
            <br><br>
            Angular impulse is defined as the change in angular momentum, and is calculated by multiplying (average)
            torque
            by time. <span v-show="level == 2">The precise definition involves an integral.</span>
            <br><br>
            $$ \tau_{av} \cdot t = \Delta L $$
            <br>
            <span v-show="level == 2">
                $$ \int_{t_0}^{t_f} \tau ~dt = \Delta L $$
            </span>
            Angular impulse isn't important enough to get its own letter. It's not a concept that is explored very
            often, because it is
            so similar to regular impulse (which was already unimpressive, in my eyes). It even takes an analogous form.
            <br><br>
            One last thing before I end this lesson. Angular impulse can be found as the area under the torque versus
            time graph, just like
            impulse could be found as the area under the force versus time graph.
            <br><br>
            I wish there was more to say about this topic, but this is really it. Angular impulse is a concept you
            should know, but it isn't
            radically different from regular impulse. If it ever appears, you should be able to deal with it in the same
            way you dealt with impulse in the past. Conservation of angular momentum is a much more interesting and
            nuanced
            topic.
            <br><br>
            That concludes our lesson on angular momentum (and rotational kinetic energy, I guess). This concept is
            actually a bit different
            from regular momentum and is a separate idea. Conservation of angular momentum is definitely more nuanced
            and difficult at times
            than conservation of linear momentum, but it can still definitely be conquered.
            <br><br>
            This is also the end of our rotation unit. We now have the framework to deal with rotating objects, which
            expands our problem-solving
            capability greatly. We're going to put everything we've learned so far to use in the next unit.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Unit!
                    &rarr;</button>
            </div>
        </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Vectors Problems</h1><br>
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
                <a href="javascript:void(0)" v-show="results[q.number] !== 0" class="me-auto mb-auto ms-1"
                    @click="explanations[q.number] = !explanations[q.number]">{{ !explanations[q.number] ? "Want to see an explanation ? " : "Hide explanation" }}</a>
            </div>
            <span class="mt-3" style="padding: 0% 25%" v-show="explanations[q.number]">{{ q.explain }}</span>
        </form>
    <br><br>
    </div>
</template>

<style scoped></style>