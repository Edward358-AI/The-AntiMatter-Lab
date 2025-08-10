<script setup>
useHead({
    title: 'Dimensional Analysis',
    meta: [
        { name: 'description', content: 'Explore the principles of dimensional analysis, including its applications in converting units and solving physics problems.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).DimenAnalyz

watch(page, () => window.scrollTo(0,0))
watch(level, () => {if (!lessonShowing.value) nextTick(() => window.MathJax?.typeset())})

const results = reactive([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0],  [0, 0, 0, 0, 0]]) // update as add more questions
const explanations = reactive([[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What are the units of speed, which measures how much distance is travelled in some amount of time?",
                answers: [
                    ["seconds per meter", 0, false],
                    ["meters", 0, false],
                    ["meters per second", 1, false],
                    ["seconds", 0, false]
                ],
                explain: "It is stated that speed is measured in distance per unit time. Meters is our standard unit of distance, and seconds is our standard measure of time, so the answer is meters per second."
            },
            {
               number: 1,
                question: "How many meters are in 15 kilometers?",
                answers: [
                    ["$ 150$ m", 0, false],
                    ["$1500$ m", 0, false],
                    ["$15000000$ m", 0, false],
                    ["$15000$ m", 1, false]
                ],
                explain: "There are 1000 meters per kilometer, so 15 kilometers is 15 thousand meters."
            },
            {
                number: 2,
                question: "How many milliseconds are in a second?",
                answers:[
                ['1000', 1, false],
                ['500', 0, false],
                ['100', 0, false],
                ['10', 0, false]
                ],
                explain: "The metric prefix \'milli\' represents 1/1000th of something, so a millisecond is 1/1000th of a second."
            },
            {
                number: 3,
                question: "On an alien planet, 10 glorps are equal to 3 frizzes, and 12 frizzes equal 13 slarns. How many glorps are equal to one slarn?",
                answers:[
                ['40', 0, false],
                ['13', 0, false],
                ['40/13', 1, false],
                ['13/40', 0, false]
                ],
                explain: "If 10 glorps equal 3 frizzes, then 40 glorps equal 12 frizzes, which equal 13 slarns. We need to divide by 13 because we're asked how many equal one slarn."
            },
            {
                number: 4,
                question: "The knot is a measurement of speed often used on ships. If a knot is roughly 1.8 km/h, how fast is 30 knots in km/h?",
                answers:[
                ['17 km/h', 0, false],
                ['54 km/h', 1, false],
                ['16.7 km/h', 0, false],
                ['58 km/h', 0, false]
                ],
                explain: "We can just directly multiply the number of knots by the conversion factor, which is 1.8. This gives us 54 km/h."
            }

        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What are the units of speed, which measures how much distance is travelled in some amount of time?",
                answers: [
                    ["seconds per meter", 0, false],
                    ["meters", 0, false],
                    ["meters per second", 1, false],
                    ["seconds", 0, false]
                ],
                explain: "It is stated that speed is measured in distance per unit time. Meters is our standard unit of distance, and seconds is our standard measure of time, so the answer is meters per second."
            },
            {
                number: 1,
                question: "How many meters are in 15 kilometers?",
                answers: [
                    ["$ 150$ m", 0, false],
                    ["$1500$ m", 0, false],
                    ["$15000000$ m", 0, false],
                    ["$15000$ m", 1, false]
                ],
                explain: "There are 1000 meters per kilometer, so 15 kilometers is 15 thousand meters."
            },
            {
                number: 2,
                question: "How many seconds are in a 365 day year?",
                answers:[
                ['378432000 s', 0, false],
                ['31536000 s', 1, false],
                ['8760 s', 0, false],
                ['4541184000 s', 0, false]
                ],
                explain: "There are 365 days per year, 24 hours in a day, 60 minutes in an hour, and 60 seconds in a minute. If we multiply all of those together, we get the answer."
            },
            {
                number: 3,
                question: "On an alien planet, 10 glorps are equal to 3 frizzes, and 12 frizzes equal 13 slarns. How many glorps are equal to one slarn?",
                answers:[
                ['40', 0, false],
                ['13', 0, false],
                ['40/13', 1, false],
                ['13/40', 0, false]
                ],
                explain: "If 10 glorps equal 3 frizzes, then 40 glorps equal 12 frizzes, which equal 13 slarns. We need to divide by 13 because we're asked how many equal one slarn."
            },
            {
                number: 4,
                question: "The knot is a measurement of speed often used on ships. If a knot is roughly 1.8 km/h, how fast is 30 knots in m/s?",
                answers:[
                ['194.4 m/s', 0, false],
                ['54 m/s', 0, false],
                ['15 m/s', 1, false],
                ['2.41 m/s', 0, false]
                ],
                explain: "We can first directly multiply the number of knots by the conversion factor, which is 1.8. This gives us 54 km/h, at which point we can use the conversion factors for kilometers to meters and hours to minutes then to seconds."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What are the units of speed, which measures how much distance is travelled in some amount of time?",
                answers: [
                    ["seconds per meter", 0, false],
                    ["meters", 0, false],
                    ["meters per second", 1, false],
                    ["seconds", 0, false]
                ],
                explain: "It is stated that speed is measured in distance per unit time. Meters is our standard unit of distance, and seconds is our standard measure of time, so the answer is meters per second."
            },
            {
                number: 1,
                question: "How many meters are in 15 kilometers?",
                answers: [
                    ["$ 150$ m", 0, false],
                    ["$1500$ m", 0, false],
                    ["$15000000$ m", 0, false],
                    ["$15000$ m", 1, false]
                ],
                explain: "There are 1000 meters per kilometer, so 15 kilometers is 15 thousand meters."
            },
            {
                number: 2,
                question: "How many seconds are in a 365 day year?",
                answers:[
                ['378432000 s', 0, false],
                ['31536000 s', 1, false],
                ['8760 s', 0, false],
                ['4541184000 s', 0, false]
                ],
                explain: "There are 365 days per year, 24 hours in a day, 60 minutes in an hour, and 60 seconds in a minute. If we multiply all of those together, we get the answer."
            },
            {
                number: 3,
                question: "On an alien planet, 10 glorps are equal to 3 frizzes, and 12 frizzes equal 13 slarns. How many glorps are equal to one slarn?",
                answers:[
                ['40', 0, false],
                ['13', 0, false],
                ['40/13', 1, false],
                ['13/40', 0, false]
                ],
                explain: "If 10 glorps equal 3 frizzes, then 40 glorps equal 12 frizzes, which equal 13 slarns. We need to divide by 13 because we're asked how many equal one slarn."
            },
            {
                number: 4,
                question: "The knot is a measurement of speed often used on ships. If a knot is roughly 1.8 km/h, how fast is 30 knots in m/s?",
                answers:[
                ['194.4 m/s', 0, false],
                ['54 m/s', 0, false],
                ['15 m/s', 1, false],
                ['2.41 m/s', 0, false]
                ],
                explain: "We can first directly multiply the number of knots by the conversion factor, which is 1.8. This gives us 54 km/h, at which point we can use the conversion factors for kilometers to meters and hours to minutes then to seconds."
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
        <h1>Dimensional Analysis</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            <p>

                <span v-show="level == 0">Hopefully the lesson on vectors taught you much. Now this is going to be a
                    relatively short lesson that explains a few concepts that are going to be important for the rest of
                    physics. Assuming you have been taught something similar or taken a science class that has utilized
                    this, you may simply skip over this lesson. However, if you haven't learned this before, this is
                    going
                    to be interesting for you.<br><br>Before we get into what dimensional analysis is, we must
                    understand
                    what
                    we're dealing with here. If you look at the two words separately, you get "Dimensional" and
                    "Analysis".
                    The first important thing about dimensional analysis is the dimensions part.<br><br>
            <h4 class="text-center">Dimensions</h4>A dimension, is
                    much
                    like maybe what you see as a unit. If you've ever measured something, you know that you need to
                    specify
                    what units it is in. For example, if you measure length, you might use centimeters or inches, and if
                    you're measuring volume, you might use liters, or gallons.<br><br>
                    Something important to note is that
                    there
                    are so many different units you can use to measure something like length, or time. In the world of
                    science, we have standardized a set of three basic units that we use to express everything. This is
                    called the International System of Units, or just the SI unit system for short. These three units
                    include meters for length, kilograms for mass, and seconds for time. Keep these in mind because we
                    will
                    be using them from now on!<br><br>
                    These are all examples of dimensions, and
                    they give meaning to a number. What do we mean by this? Take the number $6$, for example. While it
                    might
                    be useful in your math class or your everyday arithmetic, in the world of science, it is utterly
                    <i>useless!</i> (well, not utterly, but you get the idea). The reason why I say this is because it
                    could
                    mean $6$ meters, $6$ seconds, $6$ meters/second, $6$ Newtons, $6$ Newton meters, and so on. See,
                    without
                    a unit, a simple "number" becomes practically meaningless, so that's why we stress the importance of
                    units.
                </span>
                <span v-show="level > 0">Hopefully the lesson on vectors taught you much. Now this is going to be a
                    relatively short lesson that explains a few concepts that are going to be important for the rest of
                    physics. Assuming you have been taught something similar or taken a science class that has utilized
                    this, you may simply skip over this lesson. However, if you haven't learned this before, this is
                    going
                    to be interesting for you.<br><br>
                    Before we get into what dimensional analysis is, we must understand
                    what
                    we're dealing with here. If you look at the two words separately, you get "Dimensional" and
                    "Analysis".
                    The first important thing about dimensional analysis is the dimensions part.<br><br>
            <h4 class="text-center">Dimensions</h4>A dimension, is
                    much
                    like maybe what you see as a unit. If you've ever measured something, you know that you need to
                    specify
                    what units it is in. For example, if you measure length, you might use centimeters or inches, and if
                    you're measuring volume, you might use liters, or gallons.<br><br>
                    Something important to note is that
                    there
                    are so many different units you can use to measure something like length, or time. In the world of
                    science, we have standardized a set of three basic units that we use to express everything. This is
                    called the International System of Units, or just the SI unit system for short. These three units
                    include meters for length, kilograms for mass, and seconds for time. Keep these in mind because we
                    will
                    be using them from now on!<br><br>
                    These are all examples of dimensions, and
                    they give meaning to a number. What do we mean by this? Take the number $6$, for example. While it
                    might
                    be useful in your math class or your everyday arithmetic, in the world of science, it is utterly
                    <i>useless!</i> (well, not utterly, but you get the idea). The reason why I say this is because it
                    could
                    mean $6$ meters, $6$ seconds, $6$ meters/second, $6$ Newtons, $6$ Newton meters, and so on. See,
                    without
                    a unit, a simple "number" becomes practically meaningless, so that's why we stress the importance of
                    units.<br><br>
            <h4 class="text-center">Derived Units</h4>Another helpful thing to know about this is the concept of derived units. Derived
                    units
                    are
                    units that are usually made through a combination of multiple units. For example, the unit for
                    velocity
                    is meters per second, or $\frac{\textrm{m}}{\textrm{s}}$. What does this mean? This tells you that
                    something is traveling $1$ meter per $1$ second (when I say $1$, even though there isn't any place
                    that
                    explicitly puts a "$1$" in front of the $\textrm{m}$ and the $\textrm{s}$, it is implied, because
                    $1$
                    multiplied by anything is just itself). Another derived unit is the <i>Newton</i>, or <i>N</i>, and
                    its
                    derived form is this: $\frac{\textrm{kg} \cdot \textrm{m}}{\textrm{s}^2}$. Whew! That's a lot of
                    units,
                    right? If you break it down, though, it becomes more apparent. You'll learn this later on, but since
                    Newtons is the unit to measure <i>force</i>, it tells you that $1$ Newton is the force needed to
                    give a
                    mass of $1 ~ \textrm{kg}$ with an acceleration of $1 \frac{\textrm{m}}{\textrm{s}^2}$! Isn't that
                    cool?
                </span>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                <span v-show="level == 0">
            <h4 class="text-center">Derived Units</h4>
                    Another helpful thing to know about this is the concept of derived units. Derived units
                    are
                    units that are usually made through a combination of multiple units. For example, the unit for
                    velocity
                    is meters per second, or $\frac{\textrm{m}}{\textrm{s}}$. What does this mean?
                    <br><br>
                    This tells you that
                    something is traveling $1$ meter per $1$ second (when I say $1$, even though there isn't any place
                    that
                    explicitly puts a "$1$" in front of the $\textrm{m}$ and the $\textrm{s}$, it is implied, because
                    $1$
                    multiplied by anything is just itself). Another derived unit is the <i>Newton</i>, or <i>N</i>, and
                    its
                    derived form is this: $\frac{\textrm{kg} \cdot \textrm{m}}{\textrm{s}^2}$. Whew! That's a lot of
                    units,
                    right? If you break it down, though, it becomes more apparent. You'll learn this later on, but since
                    Newtons is the unit to measure <i>force</i>, it tells you that $1$ Newton is the force needed to
                    give a
                    mass of $1 ~ \textrm{kg}$ with an acceleration of $1 \frac{\textrm{m}}{\textrm{s}^2}$! Isn't that
                    cool?<br><br>
            <h4 class="text-center">Conclusion</h4>The second part is analysis. We won't focus too much on the analysis part, since that
                    requires
                    some more advanced mathematical knowledge. Regardless, it is important to understand that in
                    physics,
                    the unit gives meaning to a number. Throughout lessons, we will introduce to you units and derived
                    units, which are all important to know. Are you ready for some "real" physics now? Then let's get
                    going!
                </span>
                <span v-show="level > 0">
            <h4 class="text-center">Analysis</h4>
                    The second part is analysis. Analysis is a bit more interesting. When you do analysis, you
                    are
                    basically doing math that requires converting or changing units. For example, you might need to do
                    dimensional analysis to convert units, or because you're solving an equation. This is the
                    algebra-based
                    version, so we assume you know anything divided by itself is equal to one. The same goes for units.
                    <br><br>
                    So
                    if we want to convert $1 ~ \textrm{L}$ to $\textrm{mL}$, and we know $1 ~ \textrm{L} = 1000 ~
                    \textrm{mL}$, we can do something like this: $$1 ~ \cancel{\textrm{L}} ~ \cdot ~ 1000 ~
                    \frac{\textrm{mL}}{\cancel{\textrm{L}}}$$ You notice how units are able to cancel out, just like you
                    would do with variables or numbers!<br><br>Now let's see this in an equation. A simple equation you
                    may
                    already know is $\textrm{speed} \cdot \textrm{time} = \textrm{distance}$. Speed is measured in
                    $\frac{\textrm{meters}}{\textrm{second}}$, and time is measured in $\textrm{seconds}$. Thus, let's
                    use
                    some arbitrary numbers and see it in action! $$3 ~ \frac{\textrm{m}}{\cancel{\textrm{s}}} ~ \cdot ~
                    9 ~
                    \cancel{\textrm{s}} = 27 ~ \textrm{m}$$ Do we see how this works? Hopefully you understand how to do
                    math with units now!<br><br>>Now, there are many other practical uses and applications of
                    dimensional
                    analysis. One important use is to establish a relationship between two quantities. This is going a
                    little beyond the scope of this lesson, but say we wanted to relate displacement (unit:
                    $\textrm{m}$)
                    and acceleration (unit: $\frac{\textrm{m}}{\textrm{s}^2}$). From what we already know about
                    cancelling
                    units, if we multiply acceleration by $\textrm{s}^2$, you can get our desired result.<br>IMPORTANT!
                    These letters are not referring to variables, but units! Don't forget that when you do math with
                    units!<br><br>Time has the dimension of $\textrm{s}$, so multiplying by time squared will give us
                    displacement!Thus we craft an equation like so:
                    <br>($\Delta x$ = displacement, $\Delta t$ = time,
                    $a$ =
                    acceleration) <br><br>$$\Delta x \sim a \Delta t^2$$ <br>By realizing we can create relationships
                    between two
                    quantities via equations is a powerful tool. The funning wavy looking symbol in the middle is simply
                    used to denote that the <i>dimensions</i> are equal, minus the possibility of extra constants, or
                    coefficients. If we used an equal sign instead, it could potentially be an incorrect statement since
                    we may have missed out on some constants or coefficients. Speaking of constants,
                    some constants will have dimensions.
                    <br><br>Again, you will learn these equations much later on, but this
                    is
                    just for reference. We know the force that gravity exerts on you can be given through this equation:
                    $$F_g = mg$$ Where $g$ is a constant (its the acceleration due to gravity, again, you'll learn about
                    this later on). Since the unit for force is given by $\frac{\textrm{kg} \cdot
                    \textrm{m}}{\textrm{s}^2}$, and mass is given by $\textrm{kg}$, we can use dimensional analysis to
                    solve
                    for this constant's units: $$\frac{\frac{\cancel{\textrm{kg}} \cdot
                    \textrm{m}}{\textrm{s}^2}}{\cancel{\textrm{kg}}}$$ This leaves us with
                    $\frac{\textrm{m}}{\textrm{s}^2}$, which is the exact same as acceleration!
                    <br><br> Now you see how the
                    exact
                    same concept can be used to apply to constants because not all constants are dimensionless
                    scalars!<br><br>
            <h4 class="text-center">Conclusion</h4>As you get more and more familiar or experienced with the math being done, you can
                    simply omit the units for the sake of time and space. However, when just starting out, which we
                    assume
                    you are, we highly recommend adding units, because it gives you an idea of how varying units can
                    work
                    together to produce a different unit as a result. By using units, you see what is really going on
                    when
                    you input values into an equation, and not just inputting them because you were told to do so or
                    blindly
                    doing so.<br><br>Now after reading that lesson, can you see why it is important to understand how
                    the
                    unit
                    gives meaning to a number? Throughout lessons, we will introduce to you many
                    different units and derived units, which are all important to know. Are you ready for some "real"
                    physics now? Then let's get going!
                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/kinematics/position-velocity-acceleration">Next
                    Lesson! &rarr;</NuxtLink>
            </div>
        </div>
        <p>
        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Dimensional Analysis Problems</h1><br>
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