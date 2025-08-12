<script setup>
useHead({
    title: 'Dot Product',
    meta: [
        { name: 'description', content: 'Explore the concept of dot product in vector mathematics, including its definition and relevance in physics.' }
    ]
})
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).DotProd

watch(page, () => window.scrollTo(0,0))
watch(level, () => {if (!lessonShowing.value) nextTick(() => window.MathJax?.typeset())})

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficulty
            {
                number: 0,
                question: "When is the dot product of two vectors equal to zero?",
                answers: [
                    ["Never", 0, false],
                    ["When the vectors are perpendicular", 1, false],
                    ["When the vectors are parallel", 0, false],
                    ["Always", 0, false]
                ],
                explain: "The dot product measures how parallel two vectors are. Two vectors are least parallel when they are perpendicular, which is when the dot product is zero. Thus, the second answer choice is correct."
            },
            {
                number: 1,
                question: "What kind of quantity is the dot product of two vectors?",
                answers: [
                    ["Vector", 0, false],
                    ["Scalar", 1, false],
                    ["Numerical", 0, false],
                    ["Directional", 0, false]
                ],
                explain: "The dot product of two vectors is actually a scalar quantity by definition. Therefore, the second answer choice is correct."
            },
            {
                number: 2,
                question: "How do you denote the dot product of two vectors?",
                answers: [
                    ["$a \\cdot b$", 0, false],
                    ["$ab$", 0, false],
                    ["$\\vec{a}\\vec{b}$", 0, false],
                    ["$\\vec{a} \\cdot \\vec{b}$", 1, false]
                ],
                explain: "The dot product is represented by a dot between the two vectors $(\\vec{a} \\cdot \\vec{b})$. The two quantities also must be vectors, so the last answer choice is the correct one."
            },
            {
                number: 3,
                question: "When is the dot product of two vectors a maximum?",
                answers: [
                    ["Never", 0, false],
                    ["When the vectors are perpendicular", 0, false],
                    ["When the vectors are parallel", 1, false],
                    ["Always", 0, false]
            ],
                explain: "The dot product measures how parallel two vectors are, so it makes sense that it would be maximum when the two vectors are parallel. Thus, the third answer choice is correct."
            },
            {
                number: 4,
                question: "what is the dot product of two vectors that point in opposite directions?",
                answers: [
                    ["Zero", 0, false],
                    ["Positive", 0, false],
                    ["Negative", 1, false],
                    ["Does not exist", 0, false]
                ],
                explain: "Recall that vectors that point in opposite directions (antiparallel) have a negative dot product. They don't actually even need to be perfectly antiparallel, they just have to point \"away\" from each other. Therefore, the third answer choice is correct."
            },
            {
                number: 5,
                question: "Find the dot product of $a = \\langle 2,-4 \\rangle $ and $b = \\langle -3, 2 \\rangle$.",
                answers: [
                    ["-14", 1, false],
                    ["-2", 0, false],
                    ["-8", 0, false],
                    ["14", 0, false]
                ],
                explain: "The algebraic formula to compute the dot product is $a_xb_x + a_yb_y$. Therefore, we compute $2(-3) + (-4)(2) = -6 - 8 = -14$. Thus, the first answer choice is correct."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "What is the dot product of a vector that points in the positive z-direction and a vector that points in the positive y-direction?",
                answers: [
                    ["Positive", 0, false],
                    ["Negative", 0, false],
                    ["Zero", 1, false],
                    ["Does not exist", 0, false]
                ],
                explain: "The positive z-direction and the positive y-direction are orthogonal to one another, meaning that the dot product of the two vectors is zero. It may be difficult to think about a 3D coordinate plane, but in general all axes are perpendicular to each other. Therefore, the third answer choice is correct."
            },
            {
                number: 1,
                question: "How many dimensions can the dot product be computed in?",
                answers: [
                    ["Two", 0, false],
                    ["Three", 0, false],
                    ["Twelve", 0, false],
                    ["Infinite", 1, false]
                ],
                explain: "The formula for the dot product can be generalized to any number of dimensions, so in theory the dot product can be computed for an infinite number of dimensions. In practice, we usually see two or three dimensions."
            },
            {
                number: 2,
                question: "Compute the dot product of two unit vectors (vectors of length $1$) that have an angle of 45 degrees between them.",
                answers: [
                    ["$\\sqrt2$", 0, false],
                    ["$\\frac{1}{\\sqrt2}$", 1, false],
                    ["$0$", 0, false],
                    ["$1$", 0, false]
                ],
                explain: "Recall that the dot product can be defined as $\\vec{a} \\cdot \\vec{b} = |a||b|\\cos\\theta$. Since the two vectors are unit vectors, their magnitudes are both $1$. Therefore, we have $1 \\cdot 1 \\cdot \\cos(45^\\circ) = \\frac{1}{\\sqrt2}$. The second answer choice is correct."
            },
            {
                number: 3,
                question: "What is the dot product of two vectors defined as such: $\\vec{a} = \\langle 1, 2, 3 \\rangle$ and $\\vec{b} = \\langle 4, 5, 12 \\rangle$?",
                answers: [
                    ["50", 1, false],
                    ["29", 0, false],
                    ["246", 0, false],
                    ["27", 0, false]
                ],
                explain: "The dot product in three dimensions is algebraically computed with the formula $\\vec{a} \\cdot \\vec{b} = a_xb_x + a_yb_y + a_zb_z$. Therefore, we compute $1(4) + 2(5) + 3(12) = 4 + 10 + 36 = 50$. We can see that the first answer choice matches this."
            },
            {
                number: 4,
                question: "Which of these vector pairs are orthogonal to each other?",
                answers: [
                    ["$\\langle 1, 2 \\rangle$ and $\\langle 2, 1 \\rangle$", 0, false],
                    ["$\\langle 1, 3 \\rangle$ and $\\langle -1, -3 \\rangle$", 0, false],
                    ["$\\langle 4, 2 \\rangle$ and $\\langle -2, 4 \\rangle$", 1, false],
                    ["$\\langle 2, 8 \\rangle$ and $\\langle 16, -1 \\rangle$", 0, false]
                ],
                explain: "Two vectors are orthogonal if their dot product computes to zero. We can then just compute the dot product of each pair, and after doing so we find that the third pair is orthogonal."
            },
            {
                number: 5,
                question: "Is this a valid notation?<br> $\\vec{a} \\cdot \\vec{b} \\cdot \\vec{c}$",
                answers: [
                    ["Yes, the dot product is valid in infinite dimensions.", 0, false],
                    ["Yes, the dot product is always valid.", 0, false],
                    ["No, the dot product only applies in two dimensions.", 0, false],
                    ["No, you cannot mathematically dot three vectors toegher.", 1, false]
                ],
                explain: "The dot product can only be used for two vectors at a time. If we interpret this as dotting the first two vectors then dotting the result with the third, the answer <b>does not make sense</b> because the first operation would give us a scalar. You <b>cannot</b> dot a scalar with a vector, so the operation is invalid. Therefore, the fourth answer choice is correct."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "What is the dot product of a vector that points in the positive z-direction and a vector that points in the positive y-direction?",
                answers: [
                    ["Positive", 0, false],
                    ["Negative", 0, false],
                    ["Zero", 1, false],
                    ["Does not exist", 0, false]
                ],
                explain: "The positive z-direction and the positive y-direction are orthogonal to one another, meaning that the dot product of the two vectors is zero. It may be difficult to think about a 3D coordinate plane, but in general all axes are perpendicular to each other. Therefore, the third answer choice is correct."
            },
            {
                number: 1,
                question: "How many dimensions can the dot product be computed in?",
                answers: [
                    ["Two", 0, false],
                    ["Three", 0, false],
                    ["Twelve", 0, false],
                    ["Infinite", 1, false]
                ],
                explain: "The formula for the dot product can be generalized to any number of dimensions, so in theory the dot product can be computed for an infinite number of dimensions. In practice, we usually see two or three dimensions."
            },
            {
                number: 2,
                question: "Compute the dot product of two unit vectors (vectors of length $1$) that have an angle of 45 degrees between them.",
                answers: [
                    ["$\\sqrt2$", 0, false],
                    ["$\\frac{1}{\\sqrt2}$", 1, false],
                    ["$0$", 0, false],
                    ["$1$", 0, false]
                ],
                explain: "Recall that the dot product can be defined as $\\vec{a} \\cdot \\vec{b} = |a||b|\\cos\\theta$. Since the two vectors are unit vectors, their magnitudes are both $1$. Therefore, we have $1 \\cdot 1 \\cdot \\cos(45^\\circ) = \\frac{1}{\\sqrt2}$. The second answer choice is correct."
            },
            {
                number: 3,
                question: "What is the dot product of two vectors defined as such: $\\vec{a} = \\langle 1, 2, 3 \\rangle$ and $\\vec{b} = \\langle 4, 5, 12 \\rangle$?",
                answers: [
                    ["50", 1, false],
                    ["29", 0, false],
                    ["246", 0, false],
                    ["27", 0, false]
                ],
                explain: "The dot product in three dimensions is algebraically computed with the formula $\\vec{a} \\cdot \\vec{b} = a_xb_x + a_yb_y + a_zb_z$. Therefore, we compute $1(4) + 2(5) + 3(12) = 4 + 10 + 36 = 50$. We can see that the first answer choice matches this."
            },
            {
                number: 4,
                question: "Which of these vector pairs are orthogonal to each other?",
                answers: [
                    ["$\\langle 1, 2 \\rangle$ and $\\langle 2, 1 \\rangle$", 0, false],
                    ["$\\langle 1, 3 \\rangle$ and $\\langle -1, -3 \\rangle$", 0, false],
                    ["$\\langle 4, 2 \\rangle$ and $\\langle -2, 4 \\rangle$", 1, false],
                    ["$\\langle 2, 8 \\rangle$ and $\\langle 16, -1 \\rangle$", 0, false]
                ],
                explain: "Two vectors are orthogonal if their dot product computes to zero. We can then just compute the dot product of each pair, and after doing so we find that the third pair is orthogonal."
            },
            {
                number: 5,
                question: "Is this a valid notation?<br> $\\vec{a} \\cdot \\vec{b} \\cdot \\vec{c}$",
                answers: [
                    ["Yes, the dot product is valid in infinite dimensions.", 0, false],
                    ["Yes, the dot product is always valid.", 0, false],
                    ["No, the dot product only applies in two dimensions.", 0, false],
                    ["No, you cannot mathematically dot three vectors toegher.", 1, false]
                ],
                explain: "The dot product can only be used for two vectors at a time. If we interpret this as dotting the first two vectors then dotting the result with the third, the answer <b>does not make sense</b> because the first operation would give us a scalar. You <b>cannot</b> dot a scalar with a vector, so the operation is invalid. Therefore, the fourth answer choice is correct."
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
        <h1>Dot Product</h1><br>
        <p>
        <div v-show="page===0" ><h4 class="text-center">Introduction</h4>
            So this isn't actually a physics lesson. Like the vectors section, it's intended to brush up on
            external concepts that will prove to be essential to the later discussion of physics concepts. This
            lesson will focus on the concept of dot product, an operator of vector algebra. It's one of the two
            ways vectors can be multiplied together. (Incidentally, the other method is also pretty widely
            used in physics, but only in rotational dynamics and electromagnetism.)
            <br><br>
            <span v-show="level > 0">
                The dot product somewhat describes the projection of one vector onto another. It's denoted with a big
                old
                dot like this: $\vec{a} \cdot \vec{b}$. More accurately, it technically better describes
                how parallel or orthogonal (perpendicular) two vectors are to one another, with a value of one meaning
                the vectors are entirely
                parallel, a value of zero meaning the vectors are orthogonal, and a value of negative one meaning the
                vectors are
                antiparallel. Notice how these values are all scalars! Indeed, the dot product takes two vectors and
                outputs a scalar
                quantity. I'll take two arbitrary vectors to show you how this operator works.
                <br><br>
                <figure>
                    <img src="/energy/Figure 49.png" />
                    <figcaption>Figure 1: Two unsuspecting vectors we'll use as our test subjects.</figcaption>
                </figure>
                <br>
                Unlike adding or subtracting vectors, with the dot product there is no real way to perform it
                graphically. (This makes
                sense, since you're outputting a scalar and we don't typically represent scalars on graphs.) The first
                way to do so
                is to use the magnitudes of the two vectors, which we'll call $\vec{a}$ and $\vec{b}$ as well as the
                angle $\theta$ between
                the two. In that case, the dot product is defined as:
                <br><br>
                $$\vec{a} \cdot \vec{b} = |\vec{a}|~|\vec{b}| \cos \theta$$
                <br>
                Let's break this down a little bit. I'm mainly just interested in the cosine part, since the two vectors
                are arbitrary. Now, we know that cosine takes a range of values $-1 ~\leq \cos \theta ~\leq 1$. The
                cosine is equal to
                one and negative one when the vectors are parallel and antiparallel, respectively. This matches up with
                what I talked about before. Additionally, if the
                angle $\theta$ is a right angle, then the cosine is zero and the dot product evaluates to zero, which
                matches the orthogonality
                condition I touched on briefly.
                <br><br>
                Any values between these will evaluate to something (with an absolute value) less than one but greater
                than zero,
                which covers all of the cases where the vectors aren't perfectly parallel or perpendicular. Vectors that
                are more parallel will
                have a smaller angle $\theta$ between them, which evaluates to a higher value of cosine and vice versa.
                So, with just a bit of analyzing a basic trig function (which you should know
                how to do), we have de-mystified the dot product.
                <br><br>
                Isn't that nice and simple? While in math this form is rarely used, it's much more
                common in physics. There's also one key takeaway from this equation. This tells us that the dot
                product is equal to the component of $\vec{a}$ on $\vec{b}$ multiplied by the magnitude of $\vec{b}$.
                You'll
                see how important this is later on.
                <br><br>
                Just presenting one form of this operator is a bit limiting, however. Therefore, I'll be showing the
                other
                algebraic way to compute the dot product even though it's less useful for physics.
            </span>
            <span v-show="level == 0">
                The dot product basically tells us how much of one vector "fits" onto another. It basically tells us
                how parallel or perpendicular the two vectors are, with a greater value meaning more parallel vectors. A
                negative
                value means the vectors are pointing in opposite directions (antiparallel). Let's use a diagram to
                illustrate the
                basic math about this operator:
                <br><br>
                <figure>
                    <img src="/energy/Figure 49.png" />
                    <figcaption>Figure 1: Two unsuspecting vectors we'll use as our test subjects.</figcaption>
                </figure>
                <br>
                Now, this part requires a bit of trig knowledge. Remember our vectors lesson, and the idea of
                components.
                To get the component of any of the two vectors on the other, the function we want to use is the cosine.
                This allows us
                to have an intuitive understanding of why the dot product formula is what it is. Enough suspense, here
                it is:
                <br><br>
                $$\vec{a} \cdot \vec{b} = |\vec{a}|~|\vec{b}| \cos \theta$$
                <br>
                The dot between the two vectors denotes the dot product. (It's called <b>dot</b> product for a reason.)
                <br><br>
                We can analyze this function by analyzing the cosine function, but this might be a bit too mathematical.
                Instead,
                we're just going to recognize that the cosine can range from negative one to one, allowing for a range
                of values for the dot
                product. Moreover, the dot product is really just equal to the product of the component of $\vec{a}$ on
                $\vec{b}$ and the
                magnitude of $\vec{b}$. This will come in handy for physics problems.
                <br><br>
                This is really enough knowledge of the dot product for physics, but for the sake of having a thorough
                lesson let's talk
                about the other way to write the dot product.
            </span>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            The other form of the dot product requires the use of vector components. While in physics you're more
            commonly
            given the angle between two vectors of interest, in math you're mostly given vectors in component form.
            Additionally,
            it's not unheard of to give vector components in physics, so it'll be good to know this second form of the
            dot product.
            <br><br>
            This form of the dot product is arguably simpler than the first. I'm going to use the standard notation for
            components
            with subscripts that designate the dimension. In a 2D form, it can be written as:
            <br><br>
            $$\vec{a} \cdot \vec{b} = a_xb_x+a_yb_y$$
            <br><br>
            In 3D, it takes a very similar form:
            <br><br>
            $$\vec{a} \cdot \vec{b} = a_xb_x+a_yb_y+a_zb_z$$
            <br><br>
            This isn't too complex, is it? This method of computing the dot product is far more convenient when you're
            given the
            components, and is widely used for problems in 3D because vectors in those cases are most often expressed in
            terms
            of their components for convenience.
            <br><br>
            <span v-show="level > 0">
                In fact, while the first method of computing the dot product would technically work here, it would only
                be convenient for vectors that were
                in a convenient plane (finding the angle would otherwise be hard). I'm not even sure if it would work in
                4D or higher, since those
                dimensions are impossible to visualize. In any case, this new form can be generalized to any number of
                dimensions:
                <br><br>
                $$\vec{a} \cdot \vec{b} = \sum a_i b_i$$
                <br><br>
                The letter $i$ denotes each individual dimension, and we simply sum the product over the total number of
                dimensions. While in
                the physical world there are only three dimensions (actually, there might be 11, but that's WAY out of
                the scope of what we're
                talking about here), using vectors can allow for mathematical shortcuts and the "extra" dimensions are
                often used in
                calculations. But we'll be sticking to three dimensions max.
                <br><br>
            </span>
            With that, let's dive into a simple example that utilizes this method.
            <br><br>
            <div class="problem">
                Find the dot product of two vectors $\vec{o} = \langle 3, 12, -1 \rangle $ and $\vec{p} = \langle -4,
                0.5, 2 \rangle$.
                <br><br>
                This is just a direct computation with the formula given before.
                <br><br>
                $$\vec{o} \cdot \vec{p} = 3(-4) + 12(0.5) + (-1)(2) = \bbox[3px,
                border: 0.5px solid
                white]{-8}$$
            </div>
            <br><br>
            This is definitely the easier of the two vector products, involving pretty straightforward calculations.
            This lesson
            was pretty short as a result, but you still need to make sure that you're clear on how the dot product
            works.
            Why? The next lesson will cover our first physics concept of this unit, which coincidentally relies on the
            dot product! I wonder
            why that is...
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/energy/work">Next
                    Lesson! &rarr;</NuxtLink>
            </div>
        </div>

        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Dot Product Problems</h1><br>
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