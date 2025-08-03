<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]) // update as add more questions
const explanations = reactive([[false, false, false, false, false, false], [false, false, false, false, false, false], [false, false, false, false, false, false]]) // keeps track of what explanations are visible
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
        <h1>Basic Algebra</h1><br>
        <div v-show="page === 0">
            <p>
                NOTE: YOU CAN SKIP THIS LESSON IF YOU ARE ALREADY FAMILIAR WITH BASIC ALGEBRA.
                <br><br>
                This lesson is designed to help you review basic algebra concepts that are necessary for understanding
                physics. This lesson will cover the basics of algebraic operations, equations, and functions that will
                be occasionally used throughout the course, even in the conceptual difficulty.<br><br>
            <h4 class="text-center">Introduction</h4>
            To start off, let's begin by talking about what is algebra. Algebra is a branch of mathematics that deals
            with symbols and the rules for manipulating those symbols.<br><br>
            Why is this important in physics? Well, the physics equations that you are about to learn aren't just simply
            "equations". They actually describe a relationship between different physical quantities, for example, let's
            take a look at Newton's Second Law of Motion: $$F = ma$$ It may seem arbitrary now, but this equation
            actually describes the relationship between force, mass, and acceleration. In this case, the letter "F"
            represents force, "m" represents mass, and "a" represents acceleration. Thus, the equation tells us that the
            (net) force acting on an object is equivalent to the mass multiplied by the acceleration.<br><br>
            <h4 class="text-center">Variables</h4>Let's talk the very core of algebra: variables. Variables are symbols
            or letters that represent quantities, especially unknown ones. All the letters in the previous equation are
            variables, as $F$ stands for force, $m$ stands for mass, and $a$ stands for acceleration. Variables can hold
            numerical values too, like this: $a=5$. When we declare this, we are saying that $a$ is equal to $5$, so
            that means wherever we see and $a$ in an equation or expression, we can replace it with $5$. Going back to
            the previous example, if we know that $F=ma$ and we know that mass is $2$ and acceleration is $5$ (i.e.
            $m=2$ and $a=5$), then we can replace the variables with their values to get: $$F = 2 \times 5$$ And we can
            solve this to get $F=10$. Obviously we can't just randomly assign value to variables most of the time,
            usually they are given or we have to solve for them. But this is the basic idea of variables in algebra.
            They are just letters that represent quantities, and we can manipulate them to solve equations or
            expressions.
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
            <h4 class="text-center">Syntax</h4>
            Now, we will take a look at some basic algebraic operations that will help you understand how we can
            manipulate these equations and expressions of letters and symbols. Before we begin, we need to first dissect
            the way these equations are written, which may be unfamiliar to you. Here is the equation again: $$F = ma$$
            An equation of letters and symbols is no different from an equation of numbers, like $4+4=8$. They both
            indicate a relationship between multiple quantities, just that we replaced the numbers with letters.
            Furthermore, you might know that "$\times$" is the multiplication operator, but in algebra, we can actually
            use "$\cdot$" or just put two letters next to each other to indicate multiplication. In essence, the above
            equation is the same as saying, $$F = m \times a$$ We don't typically use the multiplication operator in
            algebra because it looks like the letter $x$ and can cause confusion.<br><br>
            <h4 class="text-center">Basic Algebraic Operations</h4>
            Next, we will talk about some basic algebraic operations that will help you understand how we can manipulate
            these equations and expressions to our benefit. The most basic operation is addition/subtraction. We can add
            or subtract quantities to <i>both</i> sides of the equation without changing the relationship. For example,
            going back to our original equation, $F=ma$, we can add say, $5$ or even a random variable $x$ to both sides
            of the equation like so: $$F+x=ma+x$$ ...And the equation will still hold true. Note how you have to do this
            to both sides of the equation, not just one. Otherwise, the equation won't be true anymore. Think of it with
            numbers if it doesn't make sense: If we have $2 \cdot 2 = 4$, then if we only add $5$ to one side for
            example, both sides won't be equal anymore. The principle here is the exact same, we are using variables
            instead of numbers.<br><br>
            </p>
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
            <p>
            <h4 class="text-center">Basic Algebraic Operations</h4>
            Now, we will take a look at some basic algebraic operations that will help you understand how we can
            manipulate these equations and expressions of letters and symbols. Before we begin, we need to first dissect
            the way these equations are written, which may be unfamiliar to you. Here is the equation again: $$F = ma$$
            An equation of letters and symbols is no different from an equation of numbers, like $4+4=8$. They both
            indicate a relationship between multiple quantities, just that we replaced the numbers with letters.
            Furthermore, you might know that "$\times$" is the multiplication operator, but in algebra, we can actually
            use "$\cdot$" or just put two letters next to each other to indicate multiplication. In essence, the above
            equation is the same as saying, $$F = m \times a$$ We don't typically use the multiplication operator in
            algebra because it looks like the letter $x$ and can cause confusion.<br><br>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
    </div>
    <!-- <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson! &rarr;</button>
            </div> -->

    <div v-show="!lessonShowing" class="container-fluid h100 pt-5">
        <h1>Basic Algebra Problems</h1><br>
        <span v-show="level > 0">A calculator might be necessary for the following problems.</span>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5" v-html="q.number + 1 + '. ' + q.question"></label><br>
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