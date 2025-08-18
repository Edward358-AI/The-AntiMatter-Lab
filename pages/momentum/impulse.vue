<script setup>
useHead({
    title: 'Impulse-Momentum Theorem',
    meta: [
        { name: 'description', content: 'Explore the concept of impulse-momentum theorem, including its definition, mathematical formulation, and applications in real-world scenarios.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Impulse


watch(page, () => { if (import.meta.client) window.scrollTo(0,0) })
watch(level, () => { if (!lessonShowing.value && import.meta.client) nextTick(() => window.MathJax?.typeset()) })

const results = reactive([[0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "What kind of quantity is momentum?",
                answers: [
                    ["Linear", 0, false],
                    ["Directional", 0, false],
                    ["Scalar", 0, false],
                    ["Vector", 1, false]
                ],
                explain: "Momentum is the product of mass (scalar) and velocity (vector), making it a vector quantity. This is important to remember as it affects calculations involving momentum later on!"
            },
            {
                number: 1,
                question: "How does impulse relate to momentum?",
                answers: [
                    ["They are two names for the same quantity", 0, false],
                    ["Impulse is the change in momentum", 1, false],
                    ["Impulse is related to force and time", 0, false],
                    ["They are not related", 0, false]
                ],
                explain: "Impulse is defined as the change in momentum by the impulse-momentum theorem. Therefore, the second answer is correct."
            },
            {
                number: 2,
                question: "Gasoline leaks out of a car's fuel tank at a constant rate. What happens to the car's speed?",
                answers: [
                    ["Increases", 0, false],
                    ["Decreases", 0, false],
                    ["Stays the same", 1, false],
                    ["Increases, then decreases", 0, false]
                ],
                explain: "The gasoline that leaks out does not have any horizontal velocity relative to the car, so it cannot affect the car's speed. The formula $F =\\Delta p/\\Delta t$ is zero because the leaking gasoline has the same momentum when it leaks out as when it was in the car."
            },
            {
                number: 3,
                question: "Impulse is defined as the product of which two quantities?",
                answers: [
                    ["Force and time", 0, false],
                    ["Average force and time", 1, false],
                    ["Force and displacement", 0, false],
                    ["Average force and distance", 0, false]
                ],
                explain: "Impulse is defined as the product of <b>average force</b> and time. Without calculus, we have to use the average force for the most precise definition, because we cannot assume that the force will be constant in general."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "A force of 10 N acts on an object initially moving with a velocity of 2 m/s for 3 seconds. During that time period, the object's mass magically changes from 2 kg to 4 kg. What is the final speed of the object?",
                answers: [
                    ["8.5 m/s", 1, false],
                    ["17 m/s", 0, false],
                    ["9.5 m/s", 0, false],
                    ["12 m/s", 0, false]
                ],
                explain: "Impulse is defined as the change in momentum, so we use the impulse-momentum theorem. The initial momentum is nonzero, so we need to account for that. The impulse given can be found relatively easily as $30 ~\\textrm{N} \\cdot \\textrm{s}$. This means that the final momentum is the sum of the initial momentum and the impulse, so we can solve for the final velocity as $v_f = 8.5 ~\\textrm{m/s}$."
            },
            {
                number: 1,
                question: "A cargo ship is loaded with 10 containers, each weighing 2,000 kg. The containers are added with no horizontal speed relative to the water and do not slip on the deck. After the containers are added, the ship is moving at a speed of 10 m/s. If the ship's mass is 40,000 kg empty, what was the initial speed of the ship assuming no external forces act on it?",
                answers: [
                    ["10.5 m/s", 0, false],
                    ["6.67 m/s", 0, false],
                    ["15 m/s", 1, false],
                    ["9.52 m/s", 0, false]
                ],
                explain: "The final and initial momentums of the ship must be equal. The final momentum is the total mass of the ship and containers multiplied by the final speed, and this is equal to the mass of the empty ship multiplied by the initial speed. We can then solve for the initial speed as $v_i = 15 ~\\textrm{m/s}$."
            },
            {
                number: 2,
                question: "An object subjected to a varying force changes its velocity from 5 m/s to 15 m/s in 4 seconds. If the mass of the object is 3 kg, what must be the average force acting on it?",
                answers: [
                    ["15 N", 0, false],
                    ["7.5 N", 1, false],
                    ["13.3 N", 0, false],
                    ["12.5 N", 0, false]
                ],
                explain: "The change in momentum in this case is easily found as $\\Delta p = m \\Delta v$ because the mass is constant. This is equal to the average force times the time interval by the impulse-momentum theorem, so we can solve for the average force as $F_{av} = 7.5 ~\\textrm{N}$."
            },
            {
                number: 3,
                question: "A bullet of mass 0.05 kg is fired from a gun with a speed of 700 m/s. The bullet hits a wall and comes to a stop in 0.002 seconds. What is the average force exerted by the wall on the bullet?",
                answers: [
                    ["75000 N", 0, false],
                    ["1750 N", 0, false],
                    ["0.7 N", 0, false],
                    ["17500 N", 1, false]
                ],
                explain: "The bullet has a momentum of $p = mv = 35 ~\\textrm{kg} \\cdot \\textrm{m/s}$. The bullet stops when it hits the wall, so change in momentum is equal to the initial momentum since the final momentum is zero. The average force can be found by dividing the change in momentum by the time interval according to the impulse-momentum theorem, giving us $F_{av} = 17500 ~\\textrm{N}$."
            },
            {
                number: 4,
                question: "A basketball of mass 0.5 kg rebounds off the floor with a speed of 6.2 m/s after being dropped from a height of 3 m. If the basketball is in contact with the ground for 0.05 seconds, what is the average force exerted on it?",
                answers: [
                    ["200.7 N", 0, false],
                    ["138.7 N", 1, false],
                    ["153.4 N", 0, false],
                    ["124.0 N", 0, false]
                ],
                explain: "First, we need to find the initial velocity of the basketball just before it hits the ground. Using kinematics or energy, we find that it is $v = \\sqrt{2gh}$, where $h$ is the initial height. The change in momentum is then $\\Delta p = m(v_f - v_i)$, where $v_f$ is the final velocity and $v_i$ is the initial velocity. However, in this case the initial and final velocities are in opposite directions, so we <b>add</b> their magnitudes in the formula for the momentum change. The average force is then found by dividing the change in momentum by the time interval, giving us $F_{av} = 138.7 ~\\textrm{N}$."
            },
            {
                number: 5,
                question: "A force linearly increases from 25 N to 80 N over a time of 10 seconds. If this force acts on a 15 kg object from rest, what is the final speed of the object?",
                answers: [
                    ["26.7 m/s", 0, false],
                    ["25 m/s", 0, false],
                    ["35 m/s", 1, false],
                    ["18.3 m/s", 0, false]
                ],
                explain: "The average force is the average of the two force values because the force is linearly increasing. We may then multiply this average force by the time interval to find the impulse. Alternatively, we can realize that the area under the force vs. time graph is a trapezoid and use geometry to find the area, which by definition is also equal to the impulse. In any case, we find that the impulse is $J = 525 ~\\textrm{N} \\cdot \\textrm{s}$. By the impulse-momentum theorem, this is equal to the change in momentum, or $J = m \\Delta v$. We can then solve for the final speed as $v_f = 35 ~\\textrm{m/s}$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "A force of 10 N acts on an object initially moving with a velocity of 2 m/s for 3 seconds. During that time period, the object's mass magically changes from 2 kg to 4 kg. What is the final speed of the object?",
                answers: [
                    ["8.5 m/s", 1, false],
                    ["17 m/s", 0, false],
                    ["9.5 m/s", 0, false],
                    ["12 m/s", 0, false]
                ],
                explain: "Impulse is defined as the change in momentum, so we use the impulse-momentum theorem. The initial momentum is nonzero, so we need to account for that. The impulse given can be found relatively easily as $30 ~\\textrm{N} \\cdot \\textrm{s}$. This means that the final momentum is the sum of the initial momentum and the impulse, so we can solve for the final velocity as $v_f = 8.5 ~\\textrm{m/s}$."
            },
            {
                number: 1,
                question: "A cargo ship is loaded with 10 containers, each weighing 2,000 kg. The containers are added with no horizontal speed relative to the water and do not slip on the deck. After the containers are added, the ship is moving at a speed of 10 m/s. If the ship's mass is 40,000 kg empty, what was the initial speed of the ship assuming no external forces act on it?",
                answers: [
                    ["10.5 m/s", 0, false],
                    ["6.67 m/s", 0, false],
                    ["15 m/s", 1, false],
                    ["9.52 m/s", 0, false]
                ],
                explain: "The final and initial momentums of the ship must be equal. The final momentum is the total mass of the ship and containers multiplied by the final speed, and this is equal to the mass of the empty ship multiplied by the initial speed. We can then solve for the initial speed as $v_i = 15 ~\\textrm{m/s}$."
            },
            {
                number: 2,
                question: "An object subjected to a varying force changes its velocity from 5 m/s to 15 m/s in 4 seconds. If the mass of the object is 3 kg, what must be the average force acting on it?",
                answers: [
                    ["15 N", 0, false],
                    ["7.5 N", 1, false],
                    ["13.3 N", 0, false],
                    ["12.5 N", 0, false]
                ],
                explain: "The change in momentum in this case is easily found as $\\Delta p = m \\Delta v$ because the mass is constant. This is equal to the average force times the time interval by the impulse-momentum theorem, so we can solve for the average force as $F_{av} = 7.5 ~\\textrm{N}$."
            },
            {
                number: 3,
                question: "A bullet of mass 0.05 kg is fired from a gun with a speed of 700 m/s. The bullet hits a wall and comes to a stop in 0.002 seconds. What is the average force exerted by the wall on the bullet?",
                answers: [
                    ["75000 N", 0, false],
                    ["1750 N", 0, false],
                    ["0.7 N", 0, false],
                    ["17500 N", 1, false]
                ],
                explain: "The bullet has a momentum of $p = mv = 35 ~\\textrm{kg} \\cdot \\textrm{m/s}$. The bullet stops when it hits the wall, so change in momentum is equal to the initial momentum since the final momentum is zero. The average force can be found by dividing the change in momentum by the time interval according to the impulse-momentum theorem, giving us $F_{av} = 17500 ~\\textrm{N}$."
            },
            {
                number: 4,
                question: "A basketball of mass 0.5 kg rebounds off the floor with a speed of 6.2 m/s after being dropped from a height of 3 m. If the basketball is in contact with the ground for 0.05 seconds, what is the average force exerted on it?",
                answers: [
                    ["200.7 N", 0, false],
                    ["138.7 N", 1, false],
                    ["153.4 N", 0, false],
                    ["124.0 N", 0, false]
                ],
                explain: "First, we need to find the initial velocity of the basketball just before it hits the ground. Using kinematics or energy, we find that it is $v = \\sqrt{2gh}$, where $h$ is the initial height. The change in momentum is then $\\Delta p = m(v_f - v_i)$, where $v_f$ is the final velocity and $v_i$ is the initial velocity. However, in this case the initial and final velocities are in opposite directions, so we <b>add</b> their magnitudes in the formula for the momentum change. The average force is then found by dividing the change in momentum by the time interval, giving us $F_{av} = 138.7 ~\\textrm{N}$."
            },
            {
                number: 5,
                question: "A force follows the formula $F(t) = 12t^3$. If this force acts on a 15 kg object from rest for 3.5 seconds, what is the final speed of the object?",
                answers: [
                    ["29.7 m/s", 0, false],
                    ["21.6 m/s", 0, false],
                    ["30.0 m/s", 1, false],
                    ["29.4 m/s", 0, false]
                ],
                explain: "The impulse can be found as the area under the force v. time graph, which is the integral of the force vs. time function. We can easily evaluate this polynomial integral ($\\int 12t^3 = 3t^4$)to find that the impulse $ J = m \\Delta v = 450.2 ~\\textrm{N} \\cdot \\textrm{s}$. We can then use the impulse-momentum theorem to find the final speed as $v_f = 30.0 ~\\textrm{m/s}$."
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
        <h1>Impulse/Mometum Theorem</h1><br>
        <p>
        <div v-show="page === 0">
            What is momentum? Well, like energy, it doesn't really have a good definition outside of a mathematical one.
            The best definition I can think of is that momentum describes how hard an object is to stop, but there are
            several problems with this definition. Most sources just cite the mathematical definition. We will only deal
            with linear momentum for now, so here's its definition:
            <br><br>
            $$ \vec{p} = m \vec{v} $$
            <br>
            This equation is very unassuming. Now, this isn't very useful unless we can connect it to previous concepts,
            which is
            where impulse ($J$) comes in. Impulse is defined as the product of the force and the time over which it
            acts. It has a unit
            of newton-seconds ($\textrm{N}\cdot \textrm{s}$). <span v-show="level > 0">If you pay close attention, these
                units can be
                converted into $\textrm{kg~m/s}$ , which are the units of momentum. Wonder what that could mean?
            </span>
            <br><br>
            $$ J = F \Delta t $$
            <br>
            <span v-show="level == 2">
                For a varying force, the impulse can be calculated with an integral. You can probably guess that it's
                the integral of the force over the time period.
                <br><br>
                $$ J = \int_{t_1}^{t_b} F~dt $$
                <br>
                If the graph is simple enough, it may be easier just to calculate the area under the force v. time graph
                with
                geometry.
            </span>
            <span v-show="level < 2">
                For a force that changes with time, the impulse can still be found as the area under the force versus
                time graph.
            </span>
            <br><br>
            Now, this formula isn't very useful. After all, what even is impulse? What does it do? Why do we even care?
            <br><br>
            <figure>
                <img src="/momentum/minosprime.png" style="max-width:750px">
                <figcaption>
                    Figure 1: You are very cool if you get the reference.
                </figcaption>
            </figure>
            <br><br>
            Well, Minos Prime (that's the guy's name) isn't exactly correct here. You see, there's something called the
            <b>impulse-momentum theorem</b> that connects the concepts of impulse and momentum. It's actually an
            extremely simple
            relation.
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                The <b>impulse-momentum theorem</b>:
                <br>
                $$ J = \Delta p $$
            </div>
            <br>
            Yep. That's all there is to it. Impulse is merely the change in momentum. <span v-show="level > 0">Of course,
                when calculating, it is good to note that this is the impulse exerted by the net force. Also, the change
                in momentum is usually $m\Delta v$, but not always. You'll see what I mean.
            </span>
            <span v-show="level > 0">
                <br><br>
                Now we can do a short practice problem to hammer home the concept.
                <br><br>
                <div class="problem">
                    How much impulse does gravity exert on a 2.0 kg object as it slides down a 30 degree inclined plane
                    in three seconds? Using this, how much does the velocity change?
                    <br><br>
                    Hopefully, you realize that only the portion of gravity pointed down the incline is exerting an
                    impulse.
                    This gives us a force of $F = mg\sin \theta = \frac{mg}{2}$. We can now easily find the impulse.
                    <br><br>
                    $$ J = F t = \dfrac{mg}{2}t = \bbox[3px,
                    border: 0.5px solid
                    white]{29.4 ~\textrm{N} \cdot \textrm{s} }$$
                    <br>
                    After we have found this, we can use the impulse-momentum theorem to calculate the velocity change:
                    <br><br>
                    $$ J = \Delta p = m \Delta v $$
                    $$ \Delta v = \dfrac{J}{m} = \bbox[3px,
                    border: 0.5px solid
                    white] {14.7 ~\textrm{m/s} } $$
                    <br>
                    We get the same result if we use kinematics techniques, letting us know that our answer is correct.
                </div>
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            The second thing I'd like to talk about here is Newton's Second Law. You might think that was a typo or that
            I've
            completely gone insane, but that was intentional. (I'm not going to comment about insanity.) The form we
            gave for Newton's
            Second Law is a generalized form for the cases where mass is constant.
            <br><br>
            <span v-show="level == 2">
                The form of this new second-law variant involves a derivative, as well as the concept of momentum.
                <br><br>
                $$ F = \dfrac{dp}{dt} $$
                <br>
                This was actually Newton's preferred form of his second law, since it's more general and can deal with
                more
                cases. We can also write this as an average force:
                <br><br>
                $$ F_{av} = \dfrac{\Delta p}{\Delta t} $$
                <br>
            </span>
            <span v-show="level < 2">The exact form is one that uses calculus, but essentially it states that the force on
                an object
                is equal to the rate of change of its momentum. We can write this as an average value instead to avoid
                the calculus
                here:
                <br><br>
                $$ F_{av} = \dfrac{\Delta p}{\Delta t} $$
                <br>
            </span>
            <span v-show="level > 0">
                Now, think about how this translates back to the regular form of Newton's Second Law. I said that the
                form we used
                earlier assumed that mass was constant, so we can simply put this assumption back in and see if we can
                make any
                substititions. (Hint, hint: we can.)
                <br><br>
                Since mass is constant, we can rewrite $\Delta p$ as $m \Delta v$. This lets us substitute this into our
                equation for
                average force:
                <br><br>
                $$ F_{av} = \dfrac{m \Delta v}{\Delta t} $$
                <br>
                Now, something should look familiar here. The term $\Delta v / \Delta t$ is equal to the average
                acceleration!
                <br><br>
                $$ F_{av} = m a_{av} $$
                <br>
                We can drop the average symbols. The exact reasoning here is a little sketchy, but my idea is that both
                values are averages, so you
                can make them both instantaneous. In any case, the calculus version of this proof makes much more sense
                and is much more
                logically rigorous. However, this is probably good enough for a basic understanding. Now, we can go back
                to our familiar form of
                the Second Law:
                <br><br>
                $$ F = ma $$
                <br>
                <span v-show="level == 2">
                    We can prove this more rigorously using calculus, by following similar logic. We first start by
                    defining $dp = m dv$ and then
                    use identical logic to arrive back at the same result. I'll leave the exact details for you to do.
                    <br><br>
                </span>
                In any case, the result has significance in that it's not restricted to the case where mass is constant.
                This allows
                us to handle problems we previously were not able to. I'll give you one very common and illustrative
                example on the next page.
            </span>
            <span v-show="level == 0">
                This can be easily shown to be equivalent to our previous statement of Newton's Second Law. If you're
                interested in all the details of the
                math, you can see our Algebra-based level. The basic idea behind it is that if we assume that mass is
                constant, then the
                formula simplifies to the familiar $F=ma$ result. First, we can write:
                <br><br>
                $$\Delta p = m \Delta v$$
                <br>
                This is <b>only</b> true if mass is constant. The term for change in momentum can technically have both
                a change in mass
                and a change in velocity, so we have to know mass is constant in order to write it in this form. Most of
                the time, we've
                dealt solely with unchanging mass, but this can change.
                <br><br>
                After plugging this into our previous equations, we can simplifiy our result using the basic kinematics
                relation that
                $a = \Delta v/ \Delta t$ to arrive at our familiar form of Newton's Second Law:
                <br><br>
                $$F = ma $$
                <br>
                This new expression is not really all that useful for most cases since 90% of the time, mass will be
                constant. However, it
                is more versatile and allows us to tackle problems involving a changing mass.
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

        <div v-show="page == 2">
            <div class="problem">
                <span v-show="level > 0">
                    A cart of mass $m$ slides along a frictionless rail with some velocity $v$. At a certain point in
                    the track, the cart starts being
                    filled up with sand that falls vertically into the cart at a constant rate $R$, where $R$ describes
                    the mass of the sand that is added to the cart per time interval.
                    What is the force that must be exerted on the cart to keep it going at a constant velocity?
                    <br><br>
                    <figure>
                        <img src="/momentum/Figure 65.png" style="max-width:750px">
                        <figcaption>
                            Figure 2: Magic pocket sand!
                        </figcaption>
                    </figure>
                    <br>
                    Now, you might be confused why we would need to exert a force to keep the cart moving, since there's
                    no
                    friction. Doesn't Newton's First Law state that an object will remain in its state of motion if no
                    net force acts on it?
                    Therefore, we wouldn't need to exert any force...right?
                    <br><br>
                    Well, no. First off, the cart remaining at the same speed would violate the conservation of energy,
                    since the mass is increasing
                    which means the kinetic energy is increasing without anything else changing. Therefore, we would
                    need to exert a net force to maintain
                    the cart's motion. The cart also does experience a net force in the form of the sand hitting the
                    back of the cart since it falls in
                    without any horizontal velocity. We need to use the new form of Newton's Second Law to solve.
                    <br><br>
                    There is no velocity change, but there is a mass change. Therefore, we can write the change in
                    momentum as:
                    <br><br>
                    $$ \Delta p = \Delta m v$$
                    <br>
                    Now, we can use our force formula, which we don't have to take the average of because the force
                    required is constant.
                    <br><br>
                    $$ F = \dfrac{\Delta p} {\Delta t} = \dfrac{\Delta m} {\Delta t} v $$
                    <br>
                    Now, we recognize that the rate of change of mass $R$ is equal to $\Delta m/ \Delta t $, which lets
                    us write our final
                    answer:
                    <br><br>
                    $$\bbox[3px,
                    border: 0.5px solid
                    white]{F = R v} $$
                    <br>
                    There we go! The logic and reasoning required can be a bit tricky at first, but the actual
                    calculations are very easy once
                    you understand what's going on. Mass isn't always constant, and knowing this technique lets you
                    expand your horizons.
                    <br><br>
                    Here's an interesting follow-up question for you. Now, what would happen if sand was leaking from
                    the cart instead?
                    <br><br>
                    Well, you might jump to conclude that the opposite would just be true, that the cart would speed up.
                    However, this isn't the
                    case, as you might have realized by thinking of real-life examples! A car leaking oil doesn't
                    suddenly go faster.
                    <br><br>
                    The sand is
                    <b>leaking</b> from the cart, which means that it will fall out with <b>zero relative velocity</b>
                    to the cart. This means
                    it takes kinetic energy away from the cart, causing it to remain at the same speed despite its mass
                    having
                    decreased. It would just continue forward at the same speed as before.
                    <br><br>
                    That being said, it is possible for this to speed up the cart. The sand would have to be expelled
                    from the cart with some relative velocity
                    to the cart, meaning we would do something like launching it out the back. This is the principle of
                    action of rocket engines, which launch
                    hot gases at high velocities in order to propel themselves forward. Who knew we would glimpse into
                    rocket science here?
                </span>
                <span v-show="level == 0">
                    Let's keep it conceptual here. A cart slides along a frictionless rail in a straight line. At a
                    certain point, sand begins to fall
                    vertically into the box at some constant rate. What would happen to the cart?
                    <br><br>
                    <figure>
                        <img src="/momentum/Figure 65.png" style="max-width:750px">
                        <figcaption>
                            Figure 2: Magic pocket sand!
                        </figcaption>
                    </figure>
                    <br>
                    You might assume that nothing would happen, since according to Newton's First Law an object will
                    tend to remain in its state of motion
                    unless acted on by a net force, and there seems to be no obvious net force here. However, consider
                    it this way. The cart would be gaining
                    kinetic energy out of nowhere if it kept moving at the same speed, since its mass is increasing.
                    Therefore, something has to be happening.
                    <br><br>
                    The key is to analyze the following equation to see what would happen. Since all rates and such are
                    constant, we can assume the force would be
                    constant too.
                    <br><br>
                    $$ F = \dfrac{\Delta p}{\Delta t} $$
                    <br>
                    What exactly does this do? Well, it tells us that some net force is being exerted on the cart
                    because its momentum is changing. More accurately,
                    its mass is changing, which means a change in momentum. We can combine this result with the fact
                    that the total energy of the cart must remain constant
                    to conclude that the cart experiences a backward force and will slow down if nothing else is done to
                    it. This result is not entirely
                    unexpected, since if you weigh something down it's harder to move!
                    <br><br>
                    This result is quite useful. We can actually modify the problem to solve for the required force such
                    that the cart remains
                    at a constant velocity, which is what we've done in the higher difficulty levels. Knowing this
                    result helps you deal with problems
                    where mass is not constant, which admittedly are not numerous but still definitely present. And,
                    it's an interesting result!
                </span>
            </div>
            <br>
            <span v-show="level == 2">
                What happens if <b>both</b> mass and velocity change? Well, this requires some tricky calculus and isn't
                common, but can be
                dealt with. You are not strictly required to know this method, but it can come in handy if you're aiming
                to do
                physics at a higher level.
                <br><br>
                Take a look back at our new expression for Newton's Second Law.
                <br>
                $$ F = \dfrac{dP}{dt}$$
                <br>
                Where:
                <br><br>
                $$ p = mv $$
                <br>
                In all previous scenarios, either mass or velocity was constant, so we could have treated them as such
                and didn't have
                to differentiate them. However, if both are changing, then we have to write a more general form. The key
                is to use the product rule.
                <br><br>
                $$F = \dfrac{dp}{dt} = m \dfrac{dv}{dt} + \dfrac{dm}{dt} v $$
                <br>
                This might not look exactly like the product rule you're used to, but if you take a closer look you will
                find that this indeed does follow the formula. Indeed, this method can be applied generally and not just
                to
                this formula if necessary.
                <br><br>
                Now, you have a way to find the net force on any object at any point in time, provided you know
                certain pieces of information.
                <br><br>
            </span>
            This lesson was short because it was introductory. The next few lessons will cover more serious and
            difficult topics relating to
            conservation and problems involving momentum. They are really the representative lessons of momentum, and
            this one usually
            gets left in the dust as an unappealing addendum to the unit. However, this lesson is important in its own
            right, and you'll do
            well to remeber its results, especially our brand-new form of Newton's Second Law.
            <br><br>
            If you're ready to face the concept of conservation again after not talking about it for one whole lesson,
            let's move on!
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/momentum/momentum-conservation">Next
                    Lesson!
                    &rarr;</NuxtLink>
            </div>
        </div>
        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Impulse Problems</h1><br>
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