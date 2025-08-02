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
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Definition of Power</h1><br>
        <p>
        <div v-show="page === 0">
            We say power is one of the three things people generally want, along with money and happiness. However,
            the way we think about power is more analgous to thinking about force or respect, rather than actual power.
            In fact, horses and oxen have much more "power" than humans. There's a reason why car engines are
            often measured in <i>horse</i>power and not <i>man</i>power!
            <br><br>
            Power is actually the rate at which something does work, or the rate at which it can change the energy of
            a system. Both definitions are pretty much analogous and can be referred to interchangeably. The SI unit for
            power is the watt, after the "inventor" of the steam engine, James Watt.
            <br><br>
            <figure>
                <img src="/src/assets/energy/Figure 59.png" style="max-width:750px">
                <figcaption>
                    Figure 1: Which one has more power? (Hint: A person produces around $100 ~\textrm{W}$, while the car
                    produces around $100 ~\textrm{kW}$.)
                </figcaption>
            </figure>
            <br><br>
            If we don't want to invoke calculus, we have to deal with the <b>average power</b> exerted on a system. This
            is much like
            the other average values we've dealt with before and involves the change in the energy in the system over
            the change in time.
            It's also equivalent to the amount of work done over the time interval. Most of the time, this is enough.
            <br><br>
            $$ P = \frac{\Delta E} {\Delta t} = \frac{W}{\Delta t} $$
            <br>
            <span v-show="level == 2">
                The more accurate definition of power involves a derivative. Shocking, I know. Instantaneous power is
                the
                time derivative of energy or work with respect to time.
                <br><br>
                $$ P = \frac{dE}{dt} = \frac {dW}{dt} $$
                <br>
            </span>
            Most of the time, we will be dealing with constant power, so we don't need to worry too much about
            the effects of a varying power. IAfter all, most engines and motors have a consistent power output rather
            than a varying one. Moreover, in a lot of problems we only really care about the average power, as figuring
            out the instantaneous
            power would require quite a bit of work. There is actually a formula for instantaneous power not requiring
            calculus that is really useful, however.
            <br><br>
            $$ P = \vec{F} \cdot \vec{v} $$
            <br>
            <span v-show="level < 2">
                The exact reasoning for why this is true requires a bit of calculus, but we can understand it another
                way.
                Recall that power could be defined as the rate at which work was done on something. But, work is
                equivalent to the
                dot product of force and displacement. The rate of change of displacement is equal to the velocity,
                which is how we
                get that the power is equal to the dot product of the force and velocity of an object.
            </span>
            <span v-show="level == 2">
                This can easily be shown to be true with a bit of basic calculus. Recall how power could be defined as
                $P = \frac{dW}{dt}$. Work is equal to the dot product of the force and displacement. This allows us to
                just distribute
                the derivatve inside and differentiate the displacement with respect to time.
                This gives us the aforementioned formula since the time derivative of position is velocity. Simple,
                really.
            </span>
            <br><br>
            You will find that this concept is rather simple, which is why sometimes
            problems will arbitraily add difficulty by asking about power in a roundabout way. For instance, they may
            ask
            what the rate of change of the system's energy is. However, if you have a good handle on what power is, this
            should
            be no issue.
            <br><br>
            We have already covered all the concepts behind what power is, so we can move on to a practice problem. This
            is probably
            the best way to explain what power actually is, because the actual defintion can be a bit vague and mystical
            until you
            actually apply it to a scenario.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <div class="problem">
                <span v-show="level > 0">
                    A M1 Abrams main battle tank attempts to climb a 30° slope in order to reach a target. The tank has
                    an engine with 1500 horsepower, which
                    is equivalent to around $P = 1100 ~\textrm{kW}$ of power, and has a mass of $M = 66800
                    ~\textrm{kg}$. <i>Watt</i> is the maximum speed it can climb this slope at (Edward made me put this
                    pun in)?
                    <br><br>
                    <figure>
                        <img src="/src/assets/energy/Figure 60.png" style="max-width:750px">
                        <figcaption>
                            Figure 2: Several tons of raw freedom gaining elevation.
                        </figcaption>
                    </figure>
                    <br>
                    It might not be obvious where to start with a problem like this, so let me walk you through the
                    process a bit. Begin with
                    considering that at the maximum speed, the object isn't accelerating anymore, so the forces on it
                    must be balanced. On an inclined
                    plane, the component of gravity down the incline seeks to pull the tank back down, so the force that
                    the engine provides (actually, friction
                    is what's technically providing this force, but this wouldn't be possible without an engine) must
                    be upwards and equal.
                    <br><br>
                    $$ F = Mg \sin \theta = \dfrac{Mg}{2} $$
                    <br>
                    Now that we know the force that the engine is producing, we can find the velocity. Recall our
                    formula:
                    <br><br>
                    $$ P = \vec{F} \cdot \vec{v} = Fv $$
                    <br>
                    We can drop the dot product because both the force and the velocity are directed up the incline.
                    This gives us a simple
                    equation that lets us solve for the velocity of the tank.
                    <br><br>
                    $$ v = \dfrac{P}{F} = \dfrac{2P}{Mg} = \bbox[3px,
                    border: 0.5px solid
                    white]{3.36 ~\textrm{m/s} } $$
                    <br>
                    If this number seems a bit low, remember a few things. This is still around 7.5 miles per hour,
                    which is
                    a respectable speed for a thirty-degree incline. That brings me to my second point: the incline is
                    thirty degrees.
                    This is a very steep incline and not something you'll often encounter in the real world. Moreover,
                    tanks are designed
                    with protection in mind and contain a lot of heavy armor, making their overall power-to-weight ratio
                    lower than that of
                    your average civilian car. At the end of a day, folks, it's a literal tank.
                </span>

                <span v-show="level == 0">
                    There's a classic power problem with a car going up an incline. I think it's a good problem, but I'm
                    going to up it a
                    notch by turning the car into an M1 Abrams main battle tank. We'll say this armored monstrosity has
                    a mass $M$ and its
                    engine has a power $P$. It's going up an incline with incline angle $\theta$. <i>Watt</i> is the max
                    speed it can achieve (Edward forced
                    me to write in this joke)?
                    <br><br>
                    <figure>
                        <img src="/src/assets/energy/Figure 60.png" style="max-width:750px">
                        <figcaption>
                            Figure 2: Several tons of raw freedom gaining elevation.
                        </figcaption>
                    </figure>
                    <br>
                    Notice how we're specifically asked about velocity. This should ring a bell, since one of the
                    formulas
                    I gave for power earlier had velocity in it. I'll write it again here:
                    <br><br>
                    $$ P = \vec{F} \cdot \vec{v}$$
                    <br><br>
                    We have the power, but we don't know what the force $F$ should be. We'll be forced to use old
                    force analysis techniques to figure this out. At the maximum speed, the tank no longer accelerates,
                    meaning
                    the forces on it are balanced. We don't have to deal with the vertical direction because it's the
                    same as usual, but
                    in the horizontal direction the force exerted by the engine has to equal the component of gravity
                    down the incline.
                    Thus, we write:
                    <br><br>
                    $$ F = Mg \sin \theta $$
                    <br>
                    Now, we have everything we need to solve this problem. We know the force and velocity are in the
                    same direction, so
                    the previous forumla simplifies to $P = Fv$. Now, we just need to do some substitution.
                    <br><br>
                    $$ v = \dfrac{P}{F} = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{P}{Mg \sin \theta} } $$
                    <br>
                    There we have it! Our answer is complete. That wasn't so bad (even though I did make you do some
                    actual algebra), was it? This
                    is about as hard as power problems realistically can get, since the concpet is very simple compared
                    to some others like
                    force analysis and maybe even energy conservation that we've covered in the past.
                </span>

            </div>
            <br>
            This is a short lesson because there is not too much to cover on power. You'll likely see this concept pop
            up
            again in the future whenever we have discussions of systems with changing amounts of energy, but overall
            it's
            a really simple concept that just requires understanding and applying simple formulas. The next section also
            only
            contains one concept, but that's where the similarities end. It's a bit of an abstract concept, but with
            some
            effort you'll definitely understand it. If you're ready to dive back into
            gravitation, move on to the next lesson!
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
        <h1>Power Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
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