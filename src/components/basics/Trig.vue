<script setup>
import { reactive, watch, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Trig

watch(page, () => window.scrollTo(0,0))

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
                question: "Which trig function describes the ratio of the opposite side to the hypotenuse?",
                answers: [
                    ["Sine", 1, false],
                    ["Cosine", 0, false],
                    ["Tangent", 0, false],
                    ["Secant", 0, false]
                ],
                explain: "The sine function is defined as the ratio of the opposite side to the hypotenuse in a right triangle."
            },
            {
                number: 1,
                question: "Which one of these is equal to the tangent of $30 \\degree$?",
                answers: [
                    ["$\\frac12$", 0, false],
                    ["$\\frac{1}{\\sqrt{3}}$", 1, false],
                    ["$\\sqrt3$", 0, false],
                    ["$\\frac{\\sqrt{3}}{2}$", 0, false]
                ],
                explain: "The tangent of $30 \\degree$ is equal to $\\frac{1}{\\sqrt{3}}$."
            },
            {
                number: 2,
                question: "A right triangle has an opposite side of 12 units and an angle of $45 \\degree$. What is the length of the hypotenuse?",
                answers: [
                    ["$12\\sqrt2$", 1, false],
                    ["$\\frac{12}{\\sqrt2}$", 0, false],
                    ["$6$", 0, false],
                    ["$\\frac{6}{\\sqrt2}$", 0, false]
                ],
                explain: "We want to use the sine function here, since we have the length of the opposite side, the angle, and are looking for the hypotenuse length. Since the sine is defined as the opposite over the hypotenuse, we can find the length of the hypotenuse by dividing the length of the opposite side by the sine of the angle. Thus, we have $\\frac{12}{\\sin(45 \\degree)} = \\frac{12}{\\frac{\\sqrt2}{2}} = 12\\sqrt2$."
            },
            {
                number: 3,
                question: "A right triangle has a hypotenuse length of 15 and an adjacent side of 9. What is the angle of the triangle?",
                answers: [
                    ["$59.0\\degree$", 0, false],
                    ["$36.9\\degree$", 0, false],
                    ["$53.1\\degree$", 1, false],
                    ["$31.0 \\degree$", 0, false]
                ],
                explain: "We use the arccosine function here to solve for the angle. When we plug the value of the cosine (9/15) into the arccosine function, we get $\\arccos(9/15) = 53.1\\degree$."
            },
            {
                number: 4,
                question: "What is the maximum value of the sine function?",
                answers: [
                    ["Infinity", 0, false],
                    ["5", 0, false],
                    ["2", 0, false],
                    ["1", 1, false]
                ],
                explain: "The length of the opposite side can never be longer than the hypotenuse, so the maximum ratio of opposite to hypotenuse is 1, which occurs when the opposite side is equal to the hypotenuse. This means that the sine function has a maximum value of 1."
            },
            {
                number: 5,
                question: "What is the maximum value of the tangent function?",
                answers: [
                    ["1", 0, false],
                    ["2", 0, false],
                    ["10", 0, false],
                    ["Infinity", 1, false]
                ],
                explain: "The tangent function can approach infinity as the angle approaches $90 \\degree$, since the opposite side can be much longer than the adjacent side, making the ratio of opposite to adjacent very large. Thus, the maximum value of the tangent function is infinity. If you plug values close to $90 \\degree$ into the tangent function on your calculator, you will see that the value gets very large."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "Which trig function describes the ratio of the opposite side to the hypotenuse?",
                answers: [
                    ["Sine", 1, false],
                    ["Cosine", 0, false],
                    ["Tangent", 0, false],
                    ["Secant", 0, false]
                ],
                explain: "The sine function is defined as the ratio of the opposite side to the hypotenuse in a right triangle."
            },
            {
                number: 1,
                question: "Which one of these is equal to the tangent of $30 \\degree$?",
                answers: [
                    ["$\\frac12$", 0, false],
                    ["$\\frac{1}{\\sqrt{3}}$", 1, false],
                    ["$\\sqrt3$", 0, false],
                    ["$\\frac{\\sqrt{3}}{2}$", 0, false]
                ],
                explain: "The tangent of $30 \\degree$ is equal to $\\frac{1}{\\sqrt{3}}$."
            },
            {
                number: 2,
                question: "A right triangle has an opposite side of 12 units and an angle of $45 \\degree$. What is the length of the hypotenuse?",
                answers: [
                    ["$12\\sqrt2$", 1, false],
                    ["$\\frac{12}{\\sqrt2}$", 0, false],
                    ["$6$", 0, false],
                    ["$\\frac{6}{\\sqrt2}$", 0, false]
                ],
                explain: "We want to use the sine function here, since we have the length of the opposite side, the angle, and are looking for the hypotenuse length. Since the sine is defined as the opposite over the hypotenuse, we can find the length of the hypotenuse by dividing the length of the opposite side by the sine of the angle. Thus, we have $\\frac{12}{\\sin(45 \\degree)} = \\frac{12}{\\frac{\\sqrt2}{2}} = 12\\sqrt2$."
            },
            {
                number: 3,
                question: "A right triangle has a hypotenuse length of 15 and an adjacent side of 9. What is the angle of the triangle?",
                answers: [
                    ["$59.0\\degree$", 0, false],
                    ["$36.9\\degree$", 0, false],
                    ["$53.1\\degree$", 1, false],
                    ["$31.0 \\degree$", 0, false]
                ],
                explain: "We use the arccosine function here to solve for the angle. When we plug the value of the cosine (9/15) into the arccosine function, we get $\\arccos(9/15) = 53.1\\degree$."
            },
            {
                number: 4,
                question: "What is the maximum value of the sine function?",
                answers: [
                    ["Infinity", 0, false],
                    ["5", 0, false],
                    ["2", 0, false],
                    ["1", 1, false]
                ],
                explain: "The length of the opposite side can never be longer than the hypotenuse, so the maximum ratio of opposite to hypotenuse is 1, which occurs when the opposite side is equal to the hypotenuse. This means that the sine function has a maximum value of 1."
            },
            {
                number: 5,
                question: "What is the maximum value of the tangent function?",
                answers: [
                    ["1", 0, false],
                    ["2", 0, false],
                    ["10", 0, false],
                    ["Infinity", 1, false]
                ],
                explain: "The tangent function can approach infinity as the angle approaches $90 \\degree$, since the opposite side can be much longer than the adjacent side, making the ratio of opposite to adjacent very large. Thus, the maximum value of the tangent function is infinity. If you plug values close to $90 \\degree$ into the tangent function on your calculator, you will see that the value gets very large."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "Which trig function describes the ratio of the opposite side to the hypotenuse?",
                answers: [
                    ["Sine", 1, false],
                    ["Cosine", 0, false],
                    ["Tangent", 0, false],
                    ["Secant", 0, false]
                ],
                explain: "The sine function is defined as the ratio of the opposite side to the hypotenuse in a right triangle."
            },
            {
                number: 1,
                question: "Which one of these is equal to the tangent of $30 \\degree$?",
                answers: [
                    ["$\\frac12$", 0, false],
                    ["$\\frac{1}{\\sqrt{3}}$", 1, false],
                    ["$\\sqrt3$", 0, false],
                    ["$\\frac{\\sqrt{3}}{2}$", 0, false]
                ],
                explain: "The tangent of $30 \\degree$ is equal to $\\frac{1}{\\sqrt{3}}$."
            },
            {
                number: 2,
                question: "A right triangle has an opposite side of 12 units and an angle of $45 \\degree$. What is the length of the hypotenuse?",
                answers: [
                    ["$12\\sqrt2$", 1, false],
                    ["$\\frac{12}{\\sqrt2}$", 0, false],
                    ["$6$", 0, false],
                    ["$\\frac{6}{\\sqrt2}$", 0, false]
                ],
                explain: "We want to use the sine function here, since we have the length of the opposite side, the angle, and are looking for the hypotenuse length. Since the sine is defined as the opposite over the hypotenuse, we can find the length of the hypotenuse by dividing the length of the opposite side by the sine of the angle. Thus, we have $\\frac{12}{\\sin(45 \\degree)} = \\frac{12}{\\frac{\\sqrt2}{2}} = 12\\sqrt2$."
            },
            {
                number: 3,
                question: "A right triangle has a hypotenuse length of 15 and an adjacent side of 9. What is the angle of the triangle?",
                answers: [
                    ["$59.0\\degree$", 0, false],
                    ["$36.9\\degree$", 0, false],
                    ["$53.1\\degree$", 1, false],
                    ["$31.0 \\degree$", 0, false]
                ],
                explain: "We use the arccosine function here to solve for the angle. When we plug the value of the cosine (9/15) into the arccosine function, we get $\\arccos(9/15) = 53.1\\degree$."
            },
            {
                number: 4,
                question: "What is the maximum value of the sine function?",
                answers: [
                    ["Infinity", 0, false],
                    ["5", 0, false],
                    ["2", 0, false],
                    ["1", 1, false]
                ],
                explain: "The length of the opposite side can never be longer than the hypotenuse, so the maximum ratio of opposite to hypotenuse is 1, which occurs when the opposite side is equal to the hypotenuse. This means that the sine function has a maximum value of 1."
            },
            {
                number: 5,
                question: "What is the maximum value of the tangent function?",
                answers: [
                    ["1", 0, false],
                    ["2", 0, false],
                    ["10", 0, false],
                    ["Infinity", 1, false]
                ],
                explain: "The tangent function can approach infinity as the angle approaches $90 \\degree$, since the opposite side can be much longer than the adjacent side, making the ratio of opposite to adjacent very large. Thus, the maximum value of the tangent function is infinity. If you plug values close to $90 \\degree$ into the tangent function on your calculator, you will see that the value gets very large."
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
        <h1>Trigonometry</h1><br>
        <div v-show="page === 0">
            <h4 class="text-center">Introduction</h4>
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
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
                        padding: 20px;
                        color: #fff;
                        border-collapse: separate;
                        border-spacing: 8px;
                        font-size: 1.1rem;
                        ">
                    <thead>
                        <tr>
                            <th style="padding: 12px 16px;">Angle</th>
                            <th style="padding: 12px 16px;">sin(θ)</th>
                            <th style="padding: 12px 16px;">cos(θ)</th>
                            <th style="padding: 12px 16px;">tan(θ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">30°</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{1}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{\sqrt{3}}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{1}{\sqrt{3}}$</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">45°</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{\sqrt{2}}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{\sqrt{2}}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$1$</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; text-align: center;">60°</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{\sqrt{3}}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$\frac{1}{2}$</td>
                            <td style="padding: 12px 16px; text-align: center;">$\sqrt{3}$</td>
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
               written as $\cos^{-1}\theta$ or $\arccos\theta$ and $\tan^{-1}\theta$ or $\arctan\theta$.
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <RouterLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/index">Next
                    Lesson!
                    &rarr;</RouterLink>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Trigonometry Problems</h1><br>
        <span v-show="level > -1">A calculator might be necessary for the following problems.</span>
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