<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])


const results = reactive([[0,0,0,0], [0,0,0,0], [0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false], [false,false,false,false], [false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "Consider being inside a car on a freeway. In which of these cases would you see another car moving at zero relative velocity?",
                answers: [
                    ["The other car is not moving.", 0, false],
                    ["The other car moves with the same speed.", 0, false],
                    ["The other car moves with the same velocity.", 1, false],
                    ["You crash into a pole because you were too busy looking at the other car.", 0, false]
                ],
                explain: "The correct option is the third choice. If the other car is moving with the same velocity, it means it moves alongside you at the same speed in the same direction, and you don't appear to see it move."
            },
            {
                number: 1,
                question: "In which of these cases would two cars have the greatest relative velocity?",
                answers: [
                    ["They move in the same direction", 0, false],
                    ["They are head-on to each other", 1, false],
                    ["They approach an intersection from right angles", 0, false],
                    ["They all have the same relative velocity", 0, false]
                ],
                explain: "When the two cars are head-on, their relative velocity is the sum of their two velocities. The first choice means you take the difference of their velocities, and the third requires you to use the Pythagorean Theorem, which gives a smaller result than just adding them."
            },
            {
                number: 2,
                question: "Alex approaches an intersection at 15 m/s in his car. Bob comes from the other road at 17 m/s. What is their relative velocity? (Assume the intersection is shaped like a plus sign.)",
                answers: [
                    ["32 m/s", 0, false],
                    ["2 m/s", 0, false],
                    ["22.7 m/s", 1, false],
                    ["8 m/s", 0, false]
                ],
                explain: "Since the two are at right angles, we have to use the Pythagorean theorem to find their relative velocity, or $v_{ab} = \\sqrt{{v_a}^2 +{v_b}^2}$. This gives us the third answer choice." 
            },
            {
                number: 3,
                question: "What is an inertial reference frame?",
                answers: [
                    ["One where you don't move", 0, false],
                    ["One where your velocity is zero", 0, false],
                    ["One where gravity is the only force on you", 0, false],
                    ["One where you do not accelerate", 1, false]
                ],
                explain: "An inertial reference frame is characterized by there being no acceleration."
            },
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "Consider being inside a car on a freeway. In which of these cases would you see another car moving at zero relative velocity?",
                answers: [
                    ["The other car is not moving.", 0, false],
                    ["The other car moves with the same speed.", 0, false],
                    ["The other car moves with the same velocity.", 1, false],
                    ["You crash into a pole because you were too busy looking at the other car.", 0, false]
                ],
                explain: "The correct option is the third choice. If the other car is moving with the same velocity, it means it moves alongside you at the same speed in the same direction, and you don't appear to see it move."
            },
            {
                number: 1,
                question: "In which of these cases would two cars have the greatest relative velocity?",
                answers: [
                    ["They move in the same direction", 0, false],
                    ["They are head-on to each other", 1, false],
                    ["They approach an intersection from right angles", 0, false],
                    ["They all have the same relative velocity", 0, false]
                ],
                explain: "When the two cars are head-on, their relative velocity is the sum of their two velocities. The first choice means you take the difference of their velocities, and the third requires you to use the Pythagorean Theorem, which gives a smaller result than just adding them."
            },
            {
                number: 2,
                question: "If two objects have some relative velocity, is it possible to tell which one is moving?",
                answers: [
                    ["Yes", 0, false],
                    ["No", 1, false],
                    ["Sometimes", 0, false],
                    ["Only if you are in an inertial reference frame", 0, false]
                ],
                explain: "Velocity depends on the reference frame of the observer. There is no absolute reference frame, so it is impossible to absolutely tell whether one object or another is moving."
            },
            {
                number: 3,
                question: "A boat moves downstream in a river at 30 km/h. At some point, it passes a log. It them travels downstream for 5 kilometers, then returns to the log. How long is the time between seeing the kog for the first time and seeing it for the second time?",
                answers: [
                    ["20 min", 1, false],
                    ["10 min", 0, false],
                    ["40 min", 0, false],
                    ["60 min", 0, false]
                ],
                explain: "You can use brute-force kinematics to get the answer, but there's a clever trick. The relative velocity between the boat and river is constant and the log drifts downstream at a constant rate, so can just take the round-trip distance and divide it by the speed. Simple!"
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "Consider being inside a car on a freeway. In which of these cases would you see another car moving at zero relative velocity?",
                answers: [
                    ["The other car is not moving.", 0, false],
                    ["The other car moves with the same speed.", 0, false],
                    ["The other car moves with the same velocity.", 1, false],
                    ["You crash into a pole because you were too busy looking at the other car.", 0, false]
                ],
                explain: "The correct option is the third choice. If the other car is moving with the same velocity, it means it moves alongside you at the same speed in the same direction, and you don't appear to see it move."
            },
            {
                number: 1,
                question: "In which of these cases would two cars have the greatest relative velocity?",
                answers: [
                    ["They move in the same direction", 0, false],
                    ["They are head-on to each other", 1, false],
                    ["They approach an intersection from right angles", 0, false],
                    ["They all have the same relative velocity", 0, false]
                ],
                explain: "When the two cars are head-on, their relative velocity is the sum of their two velocities. The first choice means you take the difference of their velocities, and the third requires you to use the Pythagorean Theorem, which gives a smaller result than just adding them."
            },
            {
                number: 2,
                question: "If two objects have some relative velocity, is it possible to tell which one is moving?",
                answers: [
                    ["Yes", 0, false],
                    ["No", 1, false],
                    ["Sometimes", 0, false],
                    ["Only if you are in an inertial reference frame", 0, false]
                ],
                explain: "Velocity depends on the reference frame of the observer. There is no absolute reference frame, so it is impossible to absolutely tell whether one object or another is moving."
            },
            {
                number: 3,
                question: "A boat moves downstream in a river at 30 km/h. At some point, it passes a log. It them travels downstream for 5 kilometers, then returns to the log. How long is the time between seeing the kog for the first time and seeing it for the second time?",
                answers: [
                    ["20 min", 1, false],
                    ["10 min", 0, false],
                    ["40 min", 0, false],
                    ["60 min", 0, false]
                ],
                explain: "You can use brute-force kinematics to get the answer, but there's a clever trick. The relative velocity between the boat and river is constant and the log drifts downstream at a constant rate, so can just take the round-trip distance and divide it by the speed. Simple!"
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
        <h1>Relative Velocity (and reference frames)</h1><br>
        <div v-show="page === 0">
            <p>
                Relative velocity will be a rather short lesson, as there are mostly just concepts that we need to go
                over.<br><br>In actuality, it is not a huge topic to tackle. The easiest way to teach this is by
                example. A common example used is a person in a train and an onlooker at a station or the side of the
                tracks. To someone else in the train with me, it does not look like I am moving. However, to the
                onlooker on the outside, I am zooming past them. Why is this? Well, the key here is the idea of a
                reference frame.<br><br>A <i>reference frame</i> is nothing too complex, it is exactly what it sounds
                like. It
                is a frame in which you conduct your calculations and view everything happen. The key thing here is
                though, a reference frame could be inertial or non inertial. Pretty much all of the reference frames we
                work inside will always be inertial, unless otherwise stated.
                <br><br>
                Noninertial reference frames don't serve a
                purpose until much later—so don't worry too much about them for now. We will soon explain why we prefer
                inertial reference frames! For now, just understand the concept of it, since reference frames will come
                up again later on!!
                <br><br>So for someone in the
                train, since they are moving at the same velocity I am, they don't see me move <i>relative to their
                    point of view</i>. The same applies to the observer, since he is not moving, while I am, it looks to
                him as if I am moving.
                <br><br>
                Let's say I wanted to find what my velocity was relative to the observer. From
                that we can derive an equation:
                <br><br>
                $$\vec{v_{PO}}=\vec{v_{PT}}+\vec{v_{TO}}$$
                <br>The subscripts and symbols
                might be a bit confusing at first, but essentially what they mean is that my velocity relative to the
                observer ($v_{PO}$) is equal to the <i>vector</i> sum of my velocity relative to the train ($v_{PT}$)
                and the velocity of the train relative to the observer ($v_{TO}$). We notice that this is a vector sum,
                which means it works in multiple dimensions.
                <br><br>
                Furthermore, you might see that the middle two subscripts
                are equal. That means to find the velocity of A relative to B, we can find the relative velocity of A to
                another point C, and the velocity of C relative to point B. Adding those will actually give us the
                velocity of A, relative to B! That's how vectors work to help us. Let's work through a minimal example
                on the next page.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </p>
        </div>
        <div v-show="page === 1">
            <p>
            <div class="problem">
                <i>A boat is traveling North at a speed of $12~\textrm m /\textrm s$ across a river with a current
                    flowing
                    East at a speed of $5~\textrm m /\textrm s$. What is the boat's velocity relative to an observer on
                    the
                    Southern shore in component form? Assume North and East are the positive directions.</i><br><br>
                Perhaps a diagram will help us solve this problem:
                <br><br>
                <figure>
                    <img src="/src/assets/kinematics/Figure 14.png" />
                    <figcaption>Figure 1: A boat traveling across a river, with vectors labeled.</figcaption>
                </figure>
                <br>
                Obviously we have the boat and the observer, but we need a third point of reference to go about. There
                are
                many options that we can choose, but we want to make our math as simple as possible. When the boat is
                traveling North, it is also being pushed downstream with the water. Thus from the water's perspective,
                the
                boat is not moving at all (Think back to the train example: To you, someone else on the train isn't
                moving
                because you are both moving at the same speed the train is)!
                <br><br>
                Now let's try and relate the water and the
                observer on the shore. The observer on the shore is not moving, so the water is moving relative to the
                shore. Thus, when we do a vector sum, splitting the two vectors into components (North-South is the
                vertical
                component, East-West is the horizontal component):
                <br><br>$$v_{BO} = v_{BW} + v_{WO}$$ $$\langle v_{BO_x},
                v_{BO_y}
                \rangle = \langle 0,12 \rangle + \langle
                5,0 \rangle=\bbox[3px,
                border: 0.5px solid
                white]{\langle 5,12 \rangle}$$
                <br>
                The boat's velocity relative to the water only has a vertical component, Northbound at $12~\textrm m
                /\textrm s$. That's why its horizontal component is zero. Relative to the observer on the shore, the
                water
                is moving East with a speed of $5~\textrm m /\textrm s$, and not moving North or South. That's why its
                vertical component is zero.
                <span v-show="level > 0">Since we know how to find the magnitude, we can do this relatively easily using
                    Pythagorean theorem:
                    <br><br>
                    $$|v_{BO}|=\sqrt{(5)^2+(12)^2}=\bbox[3px,
                    border: 0.5px solid
                    white]{13~\textrm m /\textrm s}$$
                    <br></span>
            </div>
            <br>
            Sometimes, it may be easier to shorthand the equation like so, especially when $C$ is not needed:
            <br><br>$$v_{AB} = v_A-v_B$$<br>
            And vice versa. Essentially, what this equation states is that the velocity of A relative to B is the
            velocity of A minus the velocity of B. However use this only when the velocity of A and B are given to be
            relative to the same reference frame C.
            <br>
            <br>
            Congratulations! You finished the first unit in your physics journey. But, don't give up now, because a
            whole world of physics awaits! You have only scratched the surface of it. Next unit is probably the one of
            the most important, if not THE most important lesson in all of Newtonian mechanics. Onwards!
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 1s infinite;" @click="$emit('nextlesson')">Next
                    Unit!!
                    &rarr;</button>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Relative Velocity Problems</h1><br>
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