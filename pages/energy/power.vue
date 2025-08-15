<script setup>
useHead({
    title: 'Definition of Power',
    meta: [
        { name: 'description', content: 'Explore the concept of power in physics, including its definition and applications.' }
    ]
})

import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Power

watch(page, () => window.scrollTo(0,0))
watch(level, () => {if (!lessonShowing.value) nextTick(() => window.MathJax?.typeset())})

const results = reactive([[0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false,false], [false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "You carry a heavy weight up a flight of stairs. Does the work depend on how fast you carry it? Does the power?",
                answers: [
                    ["Yes, Yes", 0, false],
                    ["Yes, No", 0, false],
                    ["No, Yes", 1, false],
                    ["No, No", 0, false]
                ],
                explain: "The work done only depends on the displacement of the object, which doesn't depend on your speed. However, the power does depend on how fast you carry it, as power is defined as the rate of work done over time."
            },
            {
                number: 1,
                question: "What does a kilowatt-hour measure?",
                answers: [
                    ["Power", 0, false],
                    ["Energy", 1, false],
                    ["Heat", 0, false],
                    ["Time", 0, false]
                ],
                explain: "The kilowatt-hour is actually a measure of <i>energy</i>. The first part of the unit, the kilowatt, is a measure of power, and the second part is a measure of time. When you multiply the two together (power by time), you get energy."
            },
            {
                number: 2,
                question: "What does a higher power engine do for a car?",
                answers: [
                    ["More acceleration", 0, false],
                    ["Less drag", 0, false],
                    ["More maneuverability", 0, false],
                    ["Higher max speed", 1, false]
                ],
                explain: "Higher power on a car allows it to reach a higher maximum speed. Power can be defined as the rate of work done, and follows the formula $ P = \\vec{F} \\cdot \\vec{v} $. A higher power means that the car can exert a greater force at a given speed in order to overcome drag and friction forces, allowing it to reach a higher maximum speed."
            },
            {
                number: 3,
                question: "As the angle of the incline increases, what happens to the power required to maintain a constant speed?",
                answers: [
                    ["Increases", 1, false],
                    ["Decreases", 0, false],
                    ["Remains Constant", 0, false],
                    ["Not applicable", 0, false]
                ],
                explain: "As the slope angle increases, the component of gravitational force acting down the incline increases, requiring more power to maintain the same speed."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "What is the power required to push a 1000 kg object along a flat surface at a constant speed of 5 m/s, assuming it has a coefficient of kinetic friction of 0.1?",
                answers: [
                    ["5000 W", 0, false],
                    ["49050 W", 0, false],
                    ["4905 W", 1, false],
                    ["50000 W", 0, false]
                ],
                explain: "The power is equivalent to $P = Fv$ for this scenario. The force of friction is given by $F = \\mu_k mg$ because on a flat surface, $F_N = mg$. Substituting in the values gives us the power: $P = Fv = 4905 ~\\textrm{W}$."
            },
            {
                number: 1,
                question: "What does a kilowatt-hour measure?",
                answers: [
                    ["Power", 0, false],
                    ["Energy", 1, false],
                    ["Heat", 0, false],
                    ["Time", 0, false]
                ],
                explain: "The kilowatt-hour is actually a measure of <i>energy</i>. The first part of the unit, the kilowatt, is a measure of power, and the second part is a measure of time. When you multiply the two together (power by time), you get energy."
            },
            {
                number: 2,
                question: "An elevator lifts a 500 kg load to a height of 20 m in 10 seconds. What is the average power output of the elevator?",
                answers: [
                    ["980 W", 0, false],
                    ["1500 W", 0, false],
                    ["1000 W", 0, false],
                    ["9810 W", 1, false]
                ],
                explain: "The work done is equal to the change in gravitational potential energy, which is $mgh$. The average power is the work divided by the time interval over which it was performed, so we have $P = \\frac{mgh}{\\Delta t} = 9810 ~\\textrm{W}$."
            },
            {
                number: 3,
                question: "The same elevator from the previous problem now lifts the same load. At one instant, the upwards acceleration of the elevator is 2.5 m/s<sup>2</sup> and the elevator is moving upwards at 2 m/s. What is the instantaneous power output of the elevator at that moment?",
                answers: [
                    ["9810 W", 0, false],
                    ["12310 W", 1, false],
                    ["2500 W", 0, false],
                    ["7310 W", 0, false]
                ],
                explain: "At the instant, the power on the elevator is due to the tension force in the cable. The acceleration is upwards, but we can't just directly use it to compute the tension force. Recall that there is also a gravitational force downwards, so the tension force is actually $F_T = mg + ma = m(g + a)$. (This is ficticious forces reasoning.) The power is then $P = F_T v = m(g + a)v$. Substituting in the values gives us $P = 12310 ~\\textrm{W}$."
            },
            {
                number: 4,
                question: "Assume that a 1500 kg car driving at 100 kph has a constant engine power. There is a constant air resistance of 500 N acting on the car. What is the minimum possible engine power required to maintain this speed?",
                answers: [
                    ["6.7 kW", 0, false],
                    ["139 kW", 0, false],
                    ["409 kW", 0, false],
                    ["13.9 kW", 1, false]
                ],
                explain: "The power is equivalent to $P = Fv$. The force is the air resistance, which is 500 N, and the velocity is 100 kph, which can be converted to 27.78 m/s. Thus, $P = 13890 ~\\textrm{W} = 13.9 ~\\textrm{kW}$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "What is the power required to push a 1000 kg object along a flat surface at a constant speed of 5 m/s, assuming it has a coefficient of kinetic friction of 0.1?",
                answers: [
                    ["5000 W", 0, false],
                    ["49050 W", 0, false],
                    ["4905 W", 1, false],
                    ["50000 W", 0, false]
                ],
                explain: "The power is equivalent to $P = Fv$ for this scenario. The force of friction is given by $F = \\mu_k mg$ because on a flat surface, $F_N = mg$. Substituting in the values gives us the power: $P = Fv = 4905 ~\\textrm{W}$."
            },
            {
                number: 1,
                question: "What does a kilowatt-hour measure?",
                answers: [
                    ["Power", 0, false],
                    ["Energy", 1, false],
                    ["Heat", 0, false],
                    ["Time", 0, false]
                ],
                explain: "The kilowatt-hour is actually a measure of <i>energy</i>. The first part of the unit, the kilowatt, is a measure of power, and the second part is a measure of time. When you multiply the two together (power by time), you get energy."
            },
            {
                number: 2,
                question: "An elevator lifts a 500 kg load to a height of 20 m in 10 seconds. What is the average power output of the elevator?",
                answers: [
                    ["980 W", 0, false],
                    ["1500 W", 0, false],
                    ["1000 W", 0, false],
                    ["9810 W", 1, false]
                ],
                explain: "The work done is equal to the change in gravitational potential energy, which is $mgh$. The average power is the work divided by the time interval over which it was performed, so we have $P = \\frac{mgh}{\\Delta t} = 9810 ~\\textrm{W}$."
            },
            {
                number: 3,
                question: "The same elevator from the previous problem now lifts the same load. At one instant, the upwards acceleration of the elevator is 2.5 m/s<sup>2</sup> and the elevator is moving upwards at 2 m/s. What is the instantaneous power output of the elevator at that moment?",
                answers: [
                    ["9810 W", 0, false],
                    ["12310 W", 1, false],
                    ["2500 W", 0, false],
                    ["7310 W", 0, false]
                ],
                explain: "At the instant, the power on the elevator is due to the tension force in the cable. The acceleration is upwards, but we can't just directly use it to compute the tension force. Recall that there is also a gravitational force downwards, so the tension force is actually $F_T = mg + ma = m(g + a)$. (This is ficticious forces reasoning.) The power is then $P = F_T v = m(g + a)v$. Substituting in the values gives us $P = 12310 ~\\textrm{W}$."
            },
            {
                number: 4,
                question: "Assume that a 1500 kg car driving at 100 kph has a constant engine power. There is a constant air resistance of 500 N acting on the car. What is the minimum possible engine power required to maintain this speed?",
                answers: [
                    ["6.7 kW", 0, false],
                    ["139 kW", 0, false],
                    ["409 kW", 0, false],
                    ["13.9 kW", 1, false]
                ],
                explain: "The power is equivalent to $P = Fv$. The force is the air resistance, which is 500 N, and the velocity is 100 kph, which can be converted to 27.78 m/s. Thus, $P = 13890 ~\\textrm{W} = 13.9 ~\\textrm{kW}$."
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[level.value][form] = 1
    else results[level.value][form] = -1
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
        <h1>Definition of Power</h1><br>
        <p>
        <div v-show="page===0" ><h4 class="text-center">Introduction</h4>
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
                <img src="/energy/Figure 59.png" style="max-width:750px">
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
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
                        <img src="/energy/Figure 60.png" style="max-width:750px">
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
                        <img src="/energy/Figure 60.png" style="max-width:750px">
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/energy/gravitational-energy">Next
                    Lesson!
                    &rarr;</NuxtLink>
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