<script setup>
import { reactive, watch, ref } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)

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
        <h1>Trigonometry</h1><br>
        <div v-show="page === 0">
            <p>
                The last thing we need to talk about before we can actually start on our physics content is trigonometry. If you're unfamiliar with what that is, 
                here's the basic breakdown: trigonometry describes the relationships between the sides of right triangles by using the angles of the triangles. Advanced 
                trigonometry can be used to describe the relationships between the sides of any triangle, but that's more of a math thing than a physics thing.
                <br><br>
                Basic trigonometry is used to find the lengths of sides of right triangles, and the angles of right triangles. The most common functions used in basic trigonometry are sine, cosine, and tangent.
                Each of these is actually a ratio of two sides on a right triangle, and they are functions of the angles of the triangle. This is why we will often write them as $\sin(\theta)$, $\cos(\theta)$, and $\tan(\theta)$, where $\theta$ is the angle of the triangle.
                <br><br>
                Enough basic explanation. What do each of these functions actually mean? Let's look at a right triangle to get started:
                <br><br>
            </p>
                <figure>
                    <img src="/src/assets/basics/right_triangle.png">
                    <figcaption>
                        Figure 1: A right triangle with the sides labeled.
                    </figcaption>
                </figure>
                <br>
                <p>
                I've labelled what I'm going to call each side, and I'll refer to them as such from now on. Let's talk about the sine function first. The sine of an angle is defined as the ratio of the opposite side to the 
                hypotenuse. In other words:
                <br><br>
                $$\sin(\theta) = \frac{\text{opposite} }{\text{hypotenuse} }$$
                <br>
                This means that if you know the angle and the length of the hypotenuse, you can find the length of the opposite side by multiplying the hypotenuse by the sine of the angle. This is pretty 
                useful for things later on. Now, let's move on to the cosine function.
                <br><br>
                The cosine of an angle is defined as the ratio of the adjacent side to the hypotenuse. In other words:
                <br><br>
                $$\cos(\theta) = \frac{\text{adjacent} }{\text{hypotenuse} }$$
                <br>
                This means that if you know the angle and the length of the hypotenuse, you can find the length of the adjacent side by multiplying the hypotenuse by the cosine of the angle. I'm 
                starting to sound like a broken record, aren't I? But this is important, so bear with me. Finally, we have the tangent function. 
                <br><br>
                The tangent of an angle is defined as the ratio of the opposite side to the adjacent side. In other words:
                <br><br>
                $$\tan(\theta) = \frac{\text{opposite} }{\text{adjacent} }$$
                <br>
                This means that if you know the angle and the length of the adjacent side, you can find the length of the opposite side by multiplying the adjacent side by the tangent of the angle.
                Final function down! Now, you're a master at the basics of trig!
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
               There are some common angles that you should know the sines and cosines of. Of course, if you have access to a calculator it's not 
               strictly essential, but I still think that these three angles are very good to know. I'm of course talking about $30°$, $45°$, and $60°$.
               <br><br>
            </p>
               <table style="
                        outline: 4px solid #ccc;
                        border-radius: 8px;
                        background: #000;
                        margin: auto;
                        padding: 12px;
                        color: #fff;
                        border-collapse: separate;
                        border-spacing: 0;
                        ">
                    <thead>
                        <tr>
                            <th>Angle</th>
                            <th>sin(θ)</th>
                            <th>cos(θ)</th>
                            <th>tan(θ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>30°</td>
                            <td>$\frac{1}{2}$</td>
                            <td>$\frac{\sqrt{3}}{2}$</td>
                            <td>$\frac{1}{\sqrt{3}}$</td>
                        </tr>
                        <tr>
                            <td>45°</td>
                            <td>$\frac{\sqrt{2}}{2}$</td>
                            <td>$\frac{\sqrt{2}}{2}$</td>
                            <td>$1$</td>
                        </tr>
                        <tr>
                            <td>60°</td>
                            <td>$\frac{\sqrt{3}}{2}$</td>
                            <td>$\frac{1}{2}$</td>
                            <td>$\sqrt{3}$</td>
                        </tr>
                    </tbody>
                </table>
               <br><br>
            <p>
               These values are worth memorizing as they come up frequently in physics problems. Notice that the sine and cosine values for 30° and 60° are swapped - this is because these angles are complementary (they add up to 90°).
               This is generally true for all complementary angles due to how the right triangle works. That's because the complementary angle of a right triangle is the third angle of the triangle (the other two are the 
               angle of interest and the right angle). This means that the sine of one angle is equal to the cosine of the other angle, and vice versa.
               <br><br>
               Now, we can also find angles when given two sides of any right triangle by using the inverse functions of sine, cosine, and tangent. The actual process is a little bit more complicated, but for this course we don't need to 
               know the intricacies of how the functions work. We just need to know that we can find the angle by using the inverse functions by plugging in the value of the trig function into the inverse function in our calculator.
               <br><br>
               So, if you have a ratio that represents the sine of an angle, you want to plug that ratio into the inverse sine function, which is usually written as $\sin^{-1}\theta$ or $\arcsin\theta$. The other two are 
               written as $\cos^{-1}\theta$ or $\arccos]\theta$ and $\tan^{-1}\theta$ or $\arctan\theta$.
               <br><br>
                This is just surface-level trigonometry, and there is a world of other topics to learn about angles and triangles and triangular angles. This is 
                good enough of an introduction for our purposes, however. Let's try a few very simple practice problems now to test your understanding of this topic.
                <br><br>
                <div class="problem">
                    If a right triangle has a hypotenuse of 10 units and an angle of 30°, what is the length of the opposite side?
                    <br>
                    <span>
                        <div v-show="show" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> We want to use the sine function here, since we know the hypotenuse and the angle and need the opposite side. The solution involves multiplying the hypotenuse by the sine of the angle:
                            <br>
                            $$10\sin(30°) = 5$$
                            So the length of the opposite side is 5 units.
                        </div>
                        <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    If a right triangle has a hypotenuse of 10 units and an angle of 60°, what is the length of the adjacent side?
                    <br>
                    <span>
                        <div v-show="show1" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> We want to use the cosine function this time, because we know the hypotenuse and the angle, but are asked for the adjacent side. We multiplying the hypotenuse by the cosine of the angle:
                            <br>
                            $$10\cos(60°) = 5$$
                            The length of the adjacent side is 5 units. This shows the complementary angles thing I talked about before!
                        </div>
                        <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    If a right triangle has an opposite side of 5 units and an adjacent side of 5 units, what is the angle of the triangle?
                    <br>
                    <span>
                        <div v-show="show2" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> This one is the reverse of the previous two problems. We want to use the arctangent function here, because we know the opposite and adjacent sides. We find the ratio 
                            of the opposite side to the adjacent side, and then plug that into the arctangent function:
                            <br>
                            $$\tan^{-1}\left(\frac{5}{5}\right) = \tan^{-1}(1) = 45°$$
                            Therefore, the angle in question on the triangle is 45°. This means that the other angle is also 45°, because the two angles must add up to 90°.
                        </div>
                        <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                </div>
                <br>
                That's all the basic trig you need to know! This also concludes the basics you need for the upcoming physics content. Are you 
                excited? I know I am! Get ready to delve into the wild world of physics, where we will strive to understand the world around us!
            </p>
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
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Metric Prefixes Problems</h1><br>
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