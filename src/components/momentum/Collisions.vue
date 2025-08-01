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
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite} from 'matter-js'

const mass1 = ref('30')
const mass2 = ref('40')
const vel1 = ref('4')
const vel2 = ref('-3')
const elasticity = ref('1')
const viewportMsg = ref('')

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

function run1dCollision() {
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
    document.getElementById("1dCollision").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup
    var width = 0.5 * window.innerWidth > 800 ? 800 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = width / 2
    // create a renderer
    var render = Render.create({
        element: document.getElementById('1dCollision'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#000"
        }
    });

    var m_1 = parseFloat(mass1.value) / 800 * width
    var m_2 = parseFloat(mass2.value) / 800 * width
    var v_1 = parseFloat(vel1.value) / 800 * width
    var v_2 = parseFloat(vel2.value) / 800 * width

    var restitution = parseFloat(elasticity.value)

    var ground = Bodies.rectangle(400 / 800 * width, 400 / 800 * width, 800 / 800 * width, 100 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#888' },
        friction: 0,
        restitution: 0
    })

    var ball1 = Bodies.circle(200 / 800 * width, 319 / 800 * width, 30 / 800 * width, {
        friction: 0,
        frictionAir: 0,
        render: { fillStyle: '#00afe2' },
        mass: m_1,
        restitution: restitution
    })

    var ball2 = Bodies.circle(600 / 800 * width, 320 / 800 * width, 30 / 800 * width, {
        friction: 0,
        frictionAir: 0,
        render: { fillStyle: "#ff4a4a" },
        mass: m_2,
        restitution: restitution
    })

    var walls = [
        Bodies.rectangle(-50 / 800 * width, 200 / 800 * width, 100 / 800 * width, 400 / 800 * width, { isStatic: true, render: { visible: false }, friction: 0, restitution: 1 }),
        Bodies.rectangle(850 / 800 * width, 200 / 800 * width, 100 / 800 * width, 400 / 800 * width, { isStatic: true, render: { visible: false }, friction: 0, restitution: 1 })
    ]

    Composite.add(engine.world, [ground, ball1, ball2, ...walls],
    )
    // run the renderer
    Render.run(render);
    // create runner

    setTimeout(() => {
        Body.setVelocity(ball1, { x: v_1, y: 0 });
    }, 500); // 500ms delay before applying the force

    setTimeout(() => {
        Body.setVelocity(ball2, { x: v_2, y: 0 });
    }, 500);

    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);


}

onMounted(() => {
    run1dCollision()
})
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Collisions</h1><br>
        <p>
        <div v-show="page === 0">
            Play around with this one-dimensional collision demo for a bit to get a feel for what we're going to be
            dealing with!
            <br><br>
            <figure>
                <h3>One-Dimensional Collision Demo</h3><br>
                <div id="1dCollision"></div>
                <button class="btn btn-outline-primary" @click="run1dCollision()">Reset</button><br>

                <div class="row justify-content-center m-auto" style="max-width:750px;">
                    <div class="col">
                        <label>Blue ball mass: {{ mass1 }}</label>
                        <br><input type="range" class="form-range" v-model="mass1" min="1" max="100" step="0.1"
                            style="width:fit-content" />
                    </div>
                    <div class="col">
                        <label>Red ball mass: {{ mass2 }}</label> <br><input type="range" class="form-range"
                            v-model="mass2" min="1" max="100" step="0.1" style="width:fit-content" />
                    </div>

                    <div class="w-100"></div>
                    <div class="col">
                        <label>Blue ball
                            speed: {{ vel1 }}</label><br>
                        <input type="range" class="form-range" v-model="vel1" min="-10" max="10" step="0.1"
                            style="width:fit-content" />
                    </div>
                    <div class="col">
                        <label>Red ball speed: {{ vel2 }}</label> <br><input type="range" class="form-range"
                            v-model="vel2" min="-10" max="10" step="0.1" style="width:fit-content" /><br>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                    <label>Elasticity (bounciness): {{ elasticity }}</label> <br><input type="range" class="form-range"
                        v-model="elasticity" min="0" max="1" step="0.01" style="width:fit-content" /><br>
                    </div>
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            Now, to explain what's going on. Essentially, you have two balls that collide with each other, with many
            parameters
            you can adjust. You might have noticed that changing some of the parameters can cause something different to
            happen. However,
            every collision here is unified by one thing: the fact that there are no net external forces on the system,
            ever. (Except when
            the balls bounce off the wall, but whatever.)
            <br><br>
            This means that we need to deal with this kind of situation as a momentum-conservation problem. The way we
            do that is by
            knowing that the total momentum of the system is zero. However, just knowing that isn't enough.
            <br><br>
            <span v-show="level > 0">
                There are actually three types of collisions, classified on the basis of energy conservation. Recall that
                momentum
                will be conserved regardless of whether there are nonconservative internal interactions, but mechanical
                energy will not.
                <br><br>
                The first kind of collision is an <b>elastic collision</b>, where <b>all</b> mechanical energy is
                conserved. Usually, this
                just means that kinetic energy is conserved, since we're dealing with things that collide on a flat
                one-dimensional surface right now.
                <br><br>
                The next kind is an <b>inelastic collision</b>, where some mechanical energy is lost during the
                collision. This is
                a pretty general case that covers every case between the two extremes.
                <br><br>
                The final extreme is the <b>totally inelastic collision</b>, where the objects <b>stick together</b> and
                move as one
                after the collision. This is the case where the maximum possible amount of mechanical energy will be
                lost.
                <br><br>
                Not all of these are made equal. Problems wit totally inelastic collisions and elastic collisions get
                the majority
                of the spotlight because they are interesting both physically and mathematically, while inelastic
                collisions get
                sidelined a lot. I think this is for good reason, so I'll be perpetuating this trend. First, we'll work
                on the totally
                inelastic case.
                <br><br>
                <div class="problem">
                    Two train cars are on a frictionless rail. The rear car is empty, having a mass of 700 kg. The
                    forward car is loaded
                    with coal and has a much larger mass of 5000 kg. Suddenly, the rear car is magically given a
                    velocity of $v = 4.0 ~\textrm{m/s}$
                    towards the coal car. The cars couple together when they touch. What is their final velocity?
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 70.png" style="max-width:750px">
                        <figcaption>
                            Figure 1: Mild railway incident.
                        </figcaption>
                    </figure>
                    <br>
                    If you read carefully, it becomes obvious that this is a totally inelastic collision, since the two
                    railway
                    cars latch together after impact. This means they move with the same velocity, so we can essentially
                    treat them as one object. With that knowledge, we can write momentum-conservation equations. This is
                    done by
                    setting total initial momentum equal to total final momentum.
                    <br><br>
                    $$ m_R v = (m_R + m_F) v_f $$
                    <br>
                    I have used the subscripts $R$ and $F$ to denote the rear and forward cars, respectively. This
                    becomes a
                    very easy problem to solve now. The algebraic manipulation and substitution should be simple, so I
                    won't show it here.
                    <br><br>
                    $$ v_f = \bbox[3px,
                    border: 0.5px solid
                    white] { 0.491 ~\textrm{m/s} } $$
                </div>
            </span>
            <span v-show="level == 0">
                There are actually three different types of collisions, classified based on energy conservation. Yes,
                that
                concept's back. Both conservation concepts are united in this section!
                <br><br>
                The <b>elastic collision</b> involves mechanical energy and momentum being conserved.
                <br><br>
                The <b>totally inelastic collision</b> involves the two objects sticking together after impact. This is
                when the max possible amount of
                mechanical energy is lost.
                <br><br>
                The <b>inelastic collision</b> covers all cases in between where some mechanical energy is lost.
                <br><br>
                Out of these three, only the elastic collision and totally inelastic collision are of any note. The
                inelastic collision is just
                there and isn't very special, so we tend not to focus on it too much. With that said, we can first start
                by discussing the totally
                inelastic collision.
                <br><br>
                The objects stick together in this kind of collision, which should tell us that we can treat them as a
                single object! Indeed,
                they have to have the same velocity, so we tend to just group them together and treat them as a single
                object having the mass
                of the individual objects added up. This is the general approach used to solve these inelastic collision
                problems, along with
                the principle of conservation of linear momentum.
                <br><br>
                If you want to see this case on the simulation, you can turn the "elasticity" slider all the way down to
                zero.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            The next case we're going to talk about is the <b>elastic collision</b>, where both mechanical energy
            and momentum are going to be conserved.
            <br><br>
            <span v-show="level > 0">
                We can write the following two conditions for an elastic collision in this case:
                <br><br>
                $$ E = \textrm{const.} $$
                $$ p = \textrm{const.} $$
                <br>
                For a system of two objects, this can be more concretely written. We'll assume we have all masses and
                write velocities in.
                <br><br>
                $$ \dfrac12 m_1 {v_{1i} }^2 + \dfrac12 m_2 {v_{2i} }^2 = \dfrac12 m_1 {v_{1f} }^2+ \dfrac12 m_2 {v_{2f}
                }^2$$
                <br>
                $$ m_1v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} $$
                <br>
                This does <b>NOT</b> look fun to deal with. If you're like me and are always looking for mathematical
                shortcuts to reduce your
                work, you're in luck here! You can derive a result that allows you to simplify your mathematical lives
                significantly. We just
                want to do a bit of algebraic mainpulation of the two equations above... (Disclaimer: I want to show the
                derivation, but I'm not expecting
                you to know it. Knowing the result is enough.)
                <br><br>
                $$ m_1 {v_{1i} }^2 - m_1 {v_{1f} }^2 = m_2 {v_{2f} }^2 - m_1 {v_{2i} }^2+ $$
                <br>
                $$ m_1v_{1i} - m_1 v_{1f} = m_2 v_{2f} - m_2 v_{2i} $$
                <br>
                Once we do some light algebra to both conservation equations, we can do a magical trick. I'm being
                sarcastic, it's just slightly tricky algebra. Remeber the difference of squares?
                Are you seeing the vision? We can divide the two equations to arrive at the result:
                <br><br>
                $$ v_{1i} + v_{1f} = v_{2f} + v_{2i} $$
                <br>
                There's a better form to write this in that can be more helpful when solving problems.
                <br><br>
                $$ v_{1i} - v_{2i} = v_{2f} - v_{1f} $$
                <br>
                Let's unpack this equation. After moving the terms describing initial velocities and final velocities to
                their
                respective sides, we can see that both sides of the equation are expressions of relative velocity! To be
                specific,
                the equation states that <b>the relative velocity of approach</b> is equal to <b>the relative velocity
                    of recession</b>
                between two objects undergoing an elastic collision!
                <br><br>
                This equation is actually a consequence of the fact that the center-of-mass velocity is constant in
                these scenarios. We can
                work in the center-of-mass frame, in which the total momentum must be zero because in that frame $
                v_{cm} = 0 $$, and center of mass
                velocity is directly related to momentum. This is a different technique for these problems and a valid
                one, though it's not one I
                tend to use or talk about often.
                <br><br>
                The formula talks about relative velocity, so the signs that you see there are not set in stone. Just
                keep in mind
                the idea of relative velocity, and you'll be all good to use this equation for all your
                elastic-collision needs. Here's
                an exericse to test exactly that.
                <br><br>
                <div class="problem">
                    A tungsten bullet with a mass of 30 grams is fired at a metal cube that has a mass of 4.0 kg with a
                    muzzle velocity
                    of 1200 m/s. The bullet ricochets off the cube in a perfectly elastic one-dimensional collision.
                    What are the final velocities of the bullet and cube?
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 71.png" style="max-width:750px">
                        <figcaption>
                            Figure 2: This feels so incomprehensible without context.
                        </figcaption>
                    </figure>
                    <br>
                    This is just an elastic collision scenario. We know the initial masses and velocities of the
                    objects, and we need
                    to find their final velocities using our equations. First, we want to "guess" at the directions of
                    motion of the
                    objects after the collision. I'll say the bullet is going to the left, and the block will be going
                    to the right.
                    With this, we now have defined directions for our momentum vectors.
                    <br><br>
                    Here is our momentum conservation equation. I've defind bullet mass as $m$, block mass as $M$, and
                    initial bullet velocity as $v_0$.
                    <br><br>
                    $$ mv_0 = M v_{Mf} - mv_{mf} $$
                    <br>
                    Now, we can write our second equation using the relative velocity relation.
                    <br><br>
                    $$ v_0 = v_{Mf} + v_{mf} $$
                    <br>
                    We add the velocities on the right side because both objects are receding from each other, meaning
                    their relative velocity
                    is the sum of their speeds. Now, we just need to do some simple algebra.
                    <br><br>
                    $$ mv_0 = M (v_0 - v_{mf}) - m v_{mf} $$
                    <br>
                    $$ (m+M) v_{mf} = (M-m) v_0 $$
                    <br><br>
                    This gives us the speed of the bullet after collision:
                    <br><br>
                    $$ v_{mf} = \bbox[3px,
                    border: 0.5px solid
                    white] {1182 ~\textrm{m/s} }$$
                    <br>
                    With this, we can find the speed of the block with a minimal amount of extra effort.
                    <br><br>
                    $$ v_{Mf} = v_0 - v{mf} = \bbox[3px,
                    border: 0.5px solid
                    white]{17.9 ~\textrm{m/s} }$$
                    <br>
                    That's the general gist of it!
                </div>
            </span>
            <span v-show="level == 0">
                If you want to strictly follow the definition, then you would set initial kinetic energies equal to
                final kinetic energies as well as setting final momentum equal to initial momentum. This is
                admittedly tedious, however. However, there is a easier way!
                <br><br>
                The proof of the new formula I'm about to show you requires some pretty tedious algebra, so I'll just
                display the result here.
                <br><br>
                $$ v_{1i} - v_{2i} = v_{2f} - v_{1f} $$
                <br>
                This formula looks pretty simple, but you have to be careful with it! The strict definition is that this
                states that <b>the relative velocity of approach</b> of two objects undergoing an elastic collision
                <b>is equal
                    to the relative velocity of recession
                </b> (moving apart). Now, since this is a relative velocity, the signs are not
                set in stone.
                <br><br>
                You want to choose the signs in the way that would make sense. If the objects move head-on before
                colliding, the relative velocity would be their two velocities added together. If one object is
                "chasing" another before colliding with it, it would instead be the difference of the velocities.
                <br><br>
                Sometimes, it's not immediately obvious how objects will move after a collision. That's completely
                fine, we can "guess"! As long as your guess stays consistent throughout your entire process, the final
                answer should be correct except for a sign error or you will see an obvious contradiction that tells you
                that your guess was incorrect.
                <br><br>
                Elastic collisions are definitely trickier than inelastic ones because they require much more
                calculation, but
                at the end of the day it's still just momentum balance. If you want to see a problem involving these
                formulas, you
                can bump the difficulty up to our algebra-based level and look at the example problem we've provided
                there. It is
                a bit algebraically heavy, though.
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
            I'm just going to wrap up any loose ends and special things I think should be mentioned in this unit. First
            off,
            for collisions sometimes you are given more information than is strictly necessary. In those cases (such as
            when you
            are given both initial velocities and one final velocity) do not overthink the problem, just do your
            momentum balance
            as always. <span v-show='level > 0'>I won't go over such problems
                because they are much simpler than what I've discussed previously.</span>
            <br><br>
            With that little tidbit out of the way, I want to discuss a few special cases in the wild world of
            one-dimensional collisions before we go on to
            2D. These results
            can be found with the conventional momentum-conservation methods, but I think they're quite interesting and
            worth dedicating
            a few extra words to.
            <br><br>
            <span v-show="level > 0">
                We're going to mathematically derive all of the results here, so hang tight and be ready for some
                algebra! First, we'll
                see what happens when a small object of mass $m$ moving at some speed $v$ hits a very massive object of
                mass $M >> m$. This is
                basically like something hitting a brick wall.
                <br><br>
                <figure>
                    <img src="/src/assets/momentum/Figure 72.png" style="max-width:750px">
                    <figcaption>
                        Figure 2: In actuality, when you hit the brick wall you're hitting the Earth that the wall is
                        anchored in.
                    </figcaption>
                </figure>
                <br>
                First, let's talk about the totally inelastic case. This is analogous to a blob of clay hitting the
                brick wall. Common sense
                tells us that it should just impact and stop, so let's see if the math tells us the same.
                <br><br>
                We can write our generic equations for the inelastic collison case:
                <br><br>
                $$ mv = (M+m) v_{f} $$
                <br>
                The special thing here is that $M >> m$. Keep this in mind. Now we solve for $v_f$:
                <br><br>
                $$ v_f = \dfrac{m}{M+m} v $$
                <br>
                This is the answer, but we can reduce it a little more. Since $ M >> m$, the denominator is
                much larger than the numerator. This means that we can approximate this as zero, since a very small
                number over a very large one is very close to zero!
                <br><br>
                $$ v_f \approx 0 $$
                <br>
                This is the expected result: when something hits and sticks to the brick wall, it stops moving. What
                about
                the elastic case?
                <br><br>
                In this case, we would expect the ball to rebound with the same speed, but in the opposite direction.
                Let's see
                if this is what we arrive at. We first still want to write our generic equations:
                <br><br>
                $$ mv = Mv_M - mv_m $$
                $$ v = v_M + v_m $$
                <br>
                Now, we solve this just like we've done before.
                <br><br>
                $$ mv = M (v - v_m) - m v_m $$
                $$ v_m = \dfrac{M-m}{M+m} v $$
                <br>
                Since $ M >> m$, we can see that the fraction should simplify to one. This is because the value of $m$
                has
                a negligible effect on the actual value of the fraction, since $M$ is so much larger in this case.
                Therefore, we
                can write:
                <br><br>
                $$ v_m \approx v $$
                <br>
                This is what we expected! As a bonus, we can also see that the wall will have essentially no velocity
                after the
                collision, which is also the expected result. Physics wins again! (Wins over or against what, I have no
                idea. It just wins because
                it works. No mortal dares challenge the laws of physics.)
                <br><br>
                Now, I want to talk about a similar but likely less familiar case: the brick wall moving to hit the
                ball. Now, the ball
                is at rest initially, and the brick wall comes in and slams into it. The closest analogy I can think of
                for
                this is getting hit by an 18-wheeler truck.
                <br><br>
                First, let's do this mathematically. We're only going to consider the elastic case, because the
                inelastic case
                is quite easy to see: the object sticks to and moves with the "truck", moving at the same velocity
                the truck was initialyl going at. I'll leave the details of the reasoning for you to figure out, since
                we've done similar things in the past.
                <br><br>
                $$ Mv = mv_m + Mv_M$$
                $$ v = v_m - v_M $$
                $$ v_m = \frac{2M}{M+m} v $$
                <br>
                If we take the limiting case as we did before where $ M >> m$, we see that:
                <br><br>
                $$ v_m \approx 2v $$
                <br>
                Well, we can actually do some clever frame-of-reference tricks to arrive at the answer without having to
                do math. And, it
                explains why the answer is what it is in a much more natural way than numbers and equations. Let's work
                in the
                frame of reference moving with the mass $M$.
                <br><br>
                In this reference frame, we essentially have the case of the ball elastically bouncing off the brick
                wall. This means
                the final velocity of the ball in the frame moving with the large mass is $v_m' \approx v$.
                <br><br>
                We need to transform back into the original frame now, which means we move in the opposite direction of
                the mass $M$ at
                a speed of $v$. This means we need to add $v$ to the speed of $v_m'$ due to the transformation, letting
                us
                arrive at the aforementioned result:
                <br><br>
                $$ v_m \approx 2v$$
            </span>
            <span v-show="level == 0">
                The interesting stuff happens when one object is much larger than another, sort of like a ball and a
                brick wall. That's not a perfect analogy, but it's good enough. First, we consider what happens if the
                smaller
                object is thrown at the wall.
                <br><br>
                <figure>
                    <img src="/src/assets/momentum/Figure 72.png" style="max-width:750px">
                    <figcaption>
                        Figure 2: In actuality, when you hit the brick wall you're hitting the Earth that the wall is
                        anchored in.
                    </figcaption>
                </figure>
                <br>
                There are two such cases: a totally inelastic collision with the wall, and a totally elastic one. Common
                sense
                should tell us what happens in each case, and I'll be relying more on intuition and general analysis
                rather than
                using momentum balance to prove the results. If you want to see the math, just head over to our
                algebra-based level.
                <br><br>
                In the totally inelastic case, we would expect the ball to stick to the wall and not move again. And
                that is indeed
                what momentum balance tells us would happen. The small and large objects stick together and move, but
                since the
                mass of the small object is so much less than that of the larger one, they would move so little we can
                just
                say they aren't moving.
                <br><br>
                What about the elastic case? Well, we should expect the ball to bounce off the wall with the same speed.
                This
                might not seem to conserve momentum because direction of motion is flipped, but remember that the wall
                would technically move forward with some very miniscule speed
                after the collision, which is enough to compensate for the disparity becaue mass is so large. Energy is
                also conserved
                for obvious reasons, since initial and final speeds are the same.
                <br><br>
                The most interesting case is when the large object moves and collides elastically with the small object.
                In this case, it's
                probably a better analogy to use an 18-wheeler truck as the large object. The elastic case is an
                interesting one, because
                we can see what happens just by using reference frame techniques.
                <br><br>
                If we transform into the frame where we move with the truck, which I'll say means we move to the left.
                Thus, we
                see the truck as stationary and the ball as moving to the right to hit it. Using the result from before,
                we know
                the ball will rebound with the same speed in the opposite direction. Now here comes the interesting
                part.
                <br><br>
                We transform back to the original reference frame, going from moving to the left with the truck to
                sitting "stationary". This means
                we effectively are moving to the right with some speed (the same speed as the truck), meaning we have to
                <b>add</b> that speed
                to the speed of the ball. Thus, the ball moves off with <b>twice</b> the velocity of the truck that
                approaches it
                after impact! Did you expect that?
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
        <div v-show="page == 3">
            We know how to deal with collisions in one dimension, but what if we up that to two? (Or maybe even three?)
            It's actually not as bad as you would expect. Like many times before, we simply <b>treat each dimension
                separately
            </b>. Yes, this should remind you of force analysis and projectile motion.
            <br><br>
            <span v-show="level > 0">
                There's not too much to say here. In general, for multiple dimensions, we can write the statements of
                momentum conservation
                for each dimension. It's important to remember that momentum is a vector quantity, and you can usually
                find the
                components by using trigonometry.
                <br><br>
                $$ p_x = \textrm{const.} $$
                $$ p_y = \textrm{const.} $$
                $$ p_z = \textrm{const.} $$
                <br>
                The only notable distinction that you should know is that the formula we gave for the relative
                velocities of approach and recession does not work for two-dimensional or three-dimensional collisions.
                The equation is
                a result of the center-of-mass velocity remaining constant, and in multiple dimensions the individual
                velocities typically
                do not lie in the same direction as the center-of-mass velocity.
                <br><br>
                With that, we can jump straight into a problem. For whatever reason, most of the time objects are
                represented
                with disks.
                <br><br>
                <div class="problem">
                    Two identical disks that hit each other elastically will always move off in directions that are
                    pependicular to each other.
                    Show this for the case of one disk moving off at 60° above the horizontal after the collision.
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 73.png" style="max-width:750px">
                        <figcaption>
                            Figure 3: A general sketch of the scenario.
                        </figcaption>
                    </figure>
                    <br>
                    Okay. So what do we do here? Well, first off we should define some things that aren't defined in the
                    initial problem.
                    We want to recognize that it's essentially asking for a scenario where one disk moves in with some
                    velocity $v$ to hit
                    another identical one. Afterwards, one of them (we'll call this object 1) moves off at 60° above the
                    horizontal. How does the other one (object 2) move?
                    <br><br>
                    Let's do some momentum balance. First, we'll deal with the x-direction, where initally we have a
                    momentum of $mv$ from the
                    first disk moving in. We'll use trig and the angle $\theta$ to represent the angle we don't yet
                    know.
                    <br><br>
                    $$ mv = m v_1\cos 60° + m v_2\cos \theta $$
                    <br>
                    This alone is not enough, since we have too many unknowns. But, we can also write momentum balance
                    for the y-direction. This direction
                    has zero momentum initially.
                    <br><br>
                    $$ m v_1 \sin 60° = m v_2 sin \sin \theta $$
                    <br>
                    We have three unknowns ($v_1$, $v_2$, and $\theta$) but only two equations. We just need one more!
                    Think for a moment for what the third
                    equation we need to use is. Did you say energy conservation? Well, regardless, that's what we need
                    to write!
                    <br><br>
                    $$ \dfrac 12 mv^2 = \dfrac12 m {v_1}^2 + \dfrac12 m {v_2}^2 $$
                    <br>
                    We can next divide out $m$ from each equation to arrive at our three equations.
                    <br><br>
                    $$ v = v_1\cos 60° + v_2\cos \theta $$
                    $$ v_1 \sin 60° = v_2 \sin \theta $$
                    $$ v^2 = {v_1}^2 + {v_2}^2 $$
                    <br>
                    Algebra time! You can tell I'm really excited by the way I'm repeatedly smashing my head into the
                    wall. But in all seriousness, the
                    only difficult part of multi-dimensional collisions is the math. The concepts are really similar,
                    but the algebra...
                    <br><br>
                    First, we combine the first two equations, eliminating $v_2$. You can eliminate $v_1$ as well, it
                    makes no difference. Oh, and we evaluate
                    the trig to the exact expressions. Hope you remember your common angles!
                    <br><br>
                    $$ v = \dfrac12 v_1 + \dfrac{\sqrt{3} }{2} v_1 \dfrac{1}{\tan \theta} $$
                    $$ 2v = v_1 (1 + \dfrac{\sqrt{3} }{\tan \theta}) $$
                    <br>
                    We now eliminate $v_2$ from the third equation as well, using the same method.
                    <br><br>
                    $$ v^2 = {v_1}^2 + {v_1}^2 \frac{3}{4 \sin^2 \theta} $$
                    $$ v = v_1 \sqrt{1+ \dfrac{3}{4 \sin^2 \theta} } $$
                    <br>
                    Now, we divide both equations to elminate both $v$ and $v_1$ in one fell swoop. Although, the result
                    is messy...
                    <br><br>
                    $$ 2 = \dfrac{1 + \dfrac{\sqrt{3} }{\tan \theta} }{\sqrt{1+ \dfrac{3}{4 \sin^2 \theta} } } $$
                    <br>
                    Extreme algebra up ahead! Try to follow me. We algebraically simplify by cross-multiplying, then
                    squaring both sides.
                    <br><br>
                    $$ 4 + \dfrac{3}{sin^2 \theta} = 1 + \dfrac{2\sqrt3}{\tan \theta} + \dfrac{3\cos^2 \theta} {\sin^2
                    \theta} $$
                    <br>
                    Combine like terms and divide both sides by three:
                    <br><br>
                    $$ 1 + \dfrac{1}{sin^2 \theta} = \dfrac{2}{\sqrt3 \tan \theta} + \dfrac{\cos^2 \theta} {\sin^2
                    \theta} $$
                    <br>
                    Now, there's a trick here. Combine both terms with $sin^2 \theta$ and you will see a trig identity.
                    <br><br>
                    $$ 1 = \dfrac{2}{\sqrt3 \tan \theta} + \dfrac{\cos^2 \theta - 1 } {\sin^2 \theta} $$
                    <br>
                    The latter term on the right side simplifies to $-1$ because of the Pythagorean Identitity. This
                    simplifies
                    the problem.
                    <br><br>
                    $$ 2 = \dfrac {2}{\sqrt 3 \tan \theta} $$
                    $$ \tan \theta = \dfrac{1}{\sqrt3} $$
                    <br>
                    Therefore, we can conclude that:
                    <br><br>
                    $$ \theta = \bbox[3px,
                    border: 0.5px solid
                    white]{ 30° }$$
                    <br>
                    Think back to what the problem originally asked: to show that a 2D elastic collision between two
                    identical objects resulted in their
                    final velocities being at right angles to each other. And we've just shown that, since the other
                    angle is 60°!
                    <br><br>
                    There's a way to generally prove this, but the algebra for that is probably going to overload your
                    brains after that one. So,
                    we'll refrain from proving it here. You can give it a shot, though! Just generalize the problem to
                    have $\theta_1$ and $\theta_2$
                    and try to algebraically manipulate the equations until you show they add to 90°, if you dare.
                </div>
            </span>
            <span v-show="level == 0">
                We can use the idea of vector components to split each momentum vector into its components. The total
                sum of final momenta in
                each direction must equal the initial momentum in that direction. It's much like one-dimensional
                collisions, but with an extra dimension
                or two thrown in that you need to worry about.
                <br><br>
                A word of caution. You cannot use the relative velocity formula I gave before; it only works for a
                one-dimensional elastic collision. The reason
                behind this has to do with center-of-mass velocity, which the formula depends on. In 1D, both the final
                velocities must lie on the same line as the
                direction of the center-of-mass velocity, but this constraint isn't true when we have two or more
                dimensions. The objects can move any which
                way they want, and are not constrained to a line.
                <br><br>
                With that said, I do want to emphasize that while conceptually two-dimensional and three-dimensional
                collisions are very simple,
                mathematically they can be an absolute nightmare. For an inelastic collision, things are simple as
                always, but the
                elastic collison requires you to solve a system of <b>three</b> equations, with trigonometry thrown in
                as well just for "fun".
                <br><br>
                If you want to glimpse into the maw of the beast, you can peek at our algebra-based level and look at
                the practice problem there.
                <br><br>
                One interesting result (that you don't need to derive because it's mathematically complex) is that if
                one object elastically hits an identical
                one, their final velocities will be at right angles to each other. A neat result that can be used to
                solve certain problems
                very quickly. Here's the scenario I'm talking about, drawn out:
                <br><br>
                <figure>
                    <img src="/src/assets/momentum/Figure 73.png" style="max-width:750px">
                    <figcaption>
                        Figure 3: A general sketch of the scenario.
                    </figcaption>
                </figure>
                <br>
            </span>
            <br>
            With that, a <span v-show="level > 0">long </span>lesson is concluded. Collisions are a very common type of
            momentum problem that
            you should be familiar with, as they have numerous variations on a basic archetype revolving around
            the conservation of linear momentum. The next specific scenario we'll talk about is much more
            limited in scope, but would hold a little more... appeal for some. Let's talk about explosions!
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

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Collision Problems</h1><br>
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


<style scoped></style>