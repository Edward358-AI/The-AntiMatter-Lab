<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 4,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 5,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 4,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 5,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 1,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 2,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 3,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 4,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
            },
            {
                number: 5,
                question: "",
                answers: [
                    ["", 0, false],
                    ["", 1, false],
                    ["", 0, false],
                    ["", 0, false]
                ],
                explain: ""
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
                <img src="/src/assets/momentum/minosprime.png" style="max-width:750px">
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
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
                        <img src="/src/assets/momentum/Figure 65.png" style="max-width:750px">
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
                        <img src="/src/assets/momentum/Figure 65.png" style="max-width:750px">
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
        <h1>Impulse Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
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