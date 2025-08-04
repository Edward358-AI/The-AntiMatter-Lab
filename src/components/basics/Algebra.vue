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
                question: "Solve the equation $2x + 3 = 11$ for $x$.",
                answers: [
                    ["7", 0, false],
                    ["2.5", 0, false],
                    ["4", 1, false],
                    ["0", 0, false]
                ],
                explain: "We first subtract 3 from both sides to get $2x = 8$. Then we divide both sides by 2 to get $x = 4$."
            },
            {
                number: 1,
                question: "If $y = 3x + 2$, what is the value of $y$ when $x = 4$?",
                answers: [
                    ["20", 0, false],
                    ["14", 1, false],
                    ["10", 0, false],
                    ["18", 0, false]
                ],
                explain: "We plug in $x = 4$ into the equation: $y = 3(4) + 2 = 12 + 2 = 14$."
            },
            {
                number: 2,
                question: "If $x+y=10$ and $x-y=2$, what are the values of $x$ and $y$?",
                answers: [
                    ["6, 4", 1, false],
                    ["7, 3", 0, false],
                    ["4, 6", 0, false],
                    ["12, -2", 0, false]
                ],
                explain: "If we add the two equations, we get $2x = 12$, so $x = 6$. Then we can plug this value into either equation to find $y$: $6 + y = 10$, so $y = 4$."
            },
            {
                number: 3,
                question: "Express the formula $C_v = \\frac32nRT$ in terms of n.",
                answers: [
                    ["$n = \\frac23 C_vRT$", 0, false],
                    ["$n = \\frac32 \\frac{C_vR}{T}$", 0, false],
                    ["$n = \\frac23 \\frac{C_v}{RT}$", 1, false],
                    ["$n = \\frac32 \\frac{1}{C_vRT}$", 0, false]
                ],
                explain: "We want to isolate $n$ in the equation. We can do this by multiplying both sides by $\\dfrac{2}{3C_v}$, which gives us $n = \\frac{2C_v}{3RT}$. Then we can simplify this to get $n = \\frac23 \\frac{C_v}{RT}$."
            },
            {
                number: 4,
                question: "What is the solution to the equation $5x - 7 = 3x + 5$?",
                answers: [
                    ["12", 0, false],
                    ["4", 0, false],
                    ["2", 0, false],
                    ["6", 1, false]
                ],
                explain: "We first want to get all the $x$ terms on one side and the constant terms on the other side. We can do this by subtracting $3x$ from both sides and adding $7$ to both sides: $5x - 3x = 5 + 7$. This simplifies to $2x = 12$, so $x = 6$."
            },
            {
                number: 5,
                question: "Simplify the expression $\\frac{2x^2 + 4x}{2x} - (3x-x^2)$.",
                answers: [
                    ["$3x^2 + x$", 0, false],
                    ["$2x^2 + 2x+2$", 0, false],
                    ["$x^2 - 2x+2$", 1, false],
                    ["$x^2 - 2x$", 0, false]
                ],
                explain: "We want to simplify the expression step by step. First, we can factor out $2x$ from the first term: $\\frac{2x(x + 2)}{2x} - (3x - x^2)$. This simplifies to $x + 2 - (3x - x^2)$. Now we can distribute the negative sign in the second term: $x + 2 - 3x + x^2$. Finally, we can combine like terms to get $x^2 - 2x + 2$."
            }
        ],
        [ // algebra difficulty
            {
                number: 0,
                question: "Solve the equation $2x + 3 = 11$ for $x$.",
                answers: [
                    ["7", 0, false],
                    ["2.5", 0, false],
                    ["4", 1, false],
                    ["0", 0, false]
                ],
                explain: "We first subtract 3 from both sides to get $2x = 8$. Then we divide both sides by 2 to get $x = 4$."
            },
            {
                number: 1,
                question: "If $y = 3x + 2$, what is the value of $y$ when $x = 4$?",
                answers: [
                    ["20", 0, false],
                    ["14", 1, false],
                    ["10", 0, false],
                    ["18", 0, false]
                ],
                explain: "We plug in $x = 4$ into the equation: $y = 3(4) + 2 = 12 + 2 = 14$."
            },
            {
                number: 2,
                question: "If $x+y=10$ and $x-y=2$, what are the values of $x$ and $y$?",
                answers: [
                    ["6, 4", 1, false],
                    ["7, 3", 0, false],
                    ["4, 6", 0, false],
                    ["12, -2", 0, false]
                ],
                explain: "If we add the two equations, we get $2x = 12$, so $x = 6$. Then we can plug this value into either equation to find $y$: $6 + y = 10$, so $y = 4$."
            },
            {
                number: 3,
                question: "Express the formula $C_v = \\frac32nRT$ in terms of n.",
                answers: [
                    ["$n = \\frac23 C_vRT$", 0, false],
                    ["$n = \\frac32 \\frac{C_vR}{T}$", 0, false],
                    ["$n = \\frac23 \\frac{C_v}{RT}$", 1, false],
                    ["$n = \\frac32 \\frac{1}{C_vRT}$", 0, false]
                ],
                explain: "We want to isolate $n$ in the equation. We can do this by multiplying both sides by $\\dfrac{2}{3C_v}$, which gives us $n = \\frac{2C_v}{3RT}$. Then we can simplify this to get $n = \\frac23 \\frac{C_v}{RT}$."
            },
            {
                number: 4,
                question: "What is the solution to the equation $5x - 7 = 3x + 5$?",
                answers: [
                    ["12", 0, false],
                    ["4", 0, false],
                    ["2", 0, false],
                    ["6", 1, false]
                ],
                explain: "We first want to get all the $x$ terms on one side and the constant terms on the other side. We can do this by subtracting $3x$ from both sides and adding $7$ to both sides: $5x - 3x = 5 + 7$. This simplifies to $2x = 12$, so $x = 6$."
            },
            {
                number: 5,
                question: "Simplify the expression $\\frac{2x^2 + 4x}{2x} - (3x-x^2)$.",
                answers: [
                    ["$3x^2 + x$", 0, false],
                    ["$2x^2 + 2x+2$", 0, false],
                    ["$x^2 - 2x+2$", 1, false],
                    ["$x^2 - 2x$", 0, false]
                ],
                explain: "We want to simplify the expression step by step. First, we can factor out $2x$ from the first term: $\\frac{2x(x + 2)}{2x} - (3x - x^2)$. This simplifies to $x + 2 - (3x - x^2)$. Now we can distribute the negative sign in the second term: $x + 2 - 3x + x^2$. Finally, we can combine like terms to get $x^2 - 2x + 2$."
            }
        ],
        [ // calculus difficulty
            {
                number: 0,
                question: "Solve the equation $2x + 3 = 11$ for $x$.",
                answers: [
                    ["7", 0, false],
                    ["2.5", 0, false],
                    ["4", 1, false],
                    ["0", 0, false]
                ],
                explain: "We first subtract 3 from both sides to get $2x = 8$. Then we divide both sides by 2 to get $x = 4$."
            },
            {
                number: 1,
                question: "If $y = 3x + 2$, what is the value of $y$ when $x = 4$?",
                answers: [
                    ["20", 0, false],
                    ["14", 1, false],
                    ["10", 0, false],
                    ["18", 0, false]
                ],
                explain: "We plug in $x = 4$ into the equation: $y = 3(4) + 2 = 12 + 2 = 14$."
            },
            {
                number: 2,
                question: "If $x+y=10$ and $x-y=2$, what are the values of $x$ and $y$?",
                answers: [
                    ["6, 4", 1, false],
                    ["7, 3", 0, false],
                    ["4, 6", 0, false],
                    ["12, -2", 0, false]
                ],
                explain: "If we add the two equations, we get $2x = 12$, so $x = 6$. Then we can plug this value into either equation to find $y$: $6 + y = 10$, so $y = 4$."
            },
            {
                number: 3,
                question: "Express the formula $C_v = \\frac32nRT$ in terms of n.",
                answers: [
                    ["$n = \\frac23 C_vRT$", 0, false],
                    ["$n = \\frac32 \\frac{C_vR}{T}$", 0, false],
                    ["$n = \\frac23 \\frac{C_v}{RT}$", 1, false],
                    ["$n = \\frac32 \\frac{1}{C_vRT}$", 0, false]
                ],
                explain: "We want to isolate $n$ in the equation. We can do this by multiplying both sides by $\\dfrac{2}{3C_v}$, which gives us $n = \\frac{2C_v}{3RT}$. Then we can simplify this to get $n = \\frac23 \\frac{C_v}{RT}$."
            },
            {
                number: 4,
                question: "What is the solution to the equation $5x - 7 = 3x + 5$?",
                answers: [
                    ["12", 0, false],
                    ["4", 0, false],
                    ["2", 0, false],
                    ["6", 1, false]
                ],
                explain: "We first want to get all the $x$ terms on one side and the constant terms on the other side. We can do this by subtracting $3x$ from both sides and adding $7$ to both sides: $5x - 3x = 5 + 7$. This simplifies to $2x = 12$, so $x = 6$."
            },
            {
                number: 5,
                question: "Simplify the expression $\\frac{2x^2 + 4x}{2x} - (3x-x^2)$.",
                answers: [
                    ["$3x^2 + x$", 0, false],
                    ["$2x^2 + 2x+2$", 0, false],
                    ["$x^2 - 2x+2$", 1, false],
                    ["$x^2 - 2x$", 0, false]
                ],
                explain: "We want to simplify the expression step by step. First, we can factor out $2x$ from the first term: $\\frac{2x(x + 2)}{2x} - (3x - x^2)$. This simplifies to $x + 2 - (3x - x^2)$. Now we can distribute the negative sign in the second term: $x + 2 - 3x + x^2$. Finally, we can combine like terms to get $x^2 - 2x + 2$."
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
            <b>Note: You can skip this lesson if you are already familiar with basic algebra concepts.</b>
            <br><br>
            This lesson is designed to help you review basic algebra concepts that are necessary for understanding
            physics. This lesson will cover the basics of algebraic operations, equations, and functions that will
            be occasionally used throughout the course, even in the conceptual difficulty.</p><br><br>
            <h4 class="text-center">Introduction</h4>
            <p>
            To start off, let's begin by talking about what is algebra. Algebra is a branch of mathematics that deals
            with symbols and the rules for manipulating those symbols.<br><br>
            Why is this important in physics? Well, the physics equations that you are about to learn aren't just simply
            "equations". They actually describe a relationship between different physical quantities, for example, let's
            take a look at Newton's Second Law of Motion: $$F = ma$$ It may seem arbitrary now, but this equation
            actually describes the relationship between force, mass, and acceleration. In this case, the letter "F"
            represents force, "m" represents mass, and "a" represents acceleration. Thus, the equation tells us that the
            (net) force acting on an object is equivalent to the mass multiplied by the acceleration.</p><br><br>
            <h4 class="text-center">Variables</h4><p>Let's talk the very core of algebra: variables. Variables are symbols
            or letters that represent quantities, especially unknown ones. All the letters in the previous equation are
            variables, as $F$ stands for force, $m$ stands for mass, and $a$ stands for acceleration. Variables can hold
            numerical values too, like this: $a=5$. When we declare this, we are saying that $a$ is equal to $5$, so
            that means wherever we see and $a$ in an equation or expression, we can replace it with $5$. Going back to
            the previous example, if we know that $F=ma$ and we know that mass is $2$ and acceleration is $5$ (i.e.
            $m=2$ and $a=5$), then we can replace the variables with their values to get: $$F = 2 \times 5$$ And we can
            solve this to get $F=10$. This method is called <i>substitution</i>.<br>Obviously we can't just randomly assign value to variables most of the time,
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
            <h4 class="text-center">Syntax</h4>
            <p>
            Now, we will take a look at some basic algebraic operations that will help you understand how we can
            manipulate these equations and expressions of letters and symbols. Before we begin, we need to first dissect
            the way these equations are written, which may be unfamiliar to you. Here is the equation again: $$F = ma$$
            An equation of letters and symbols is no different from an equation of numbers, like $4+4=8$. They both
            indicate a relationship between multiple quantities, just that we replaced the numbers with letters.
            Furthermore, you might know that "$\times$" is the multiplication operator, but in algebra, we can actually
            use "$\cdot$" or just put two letters next to each other to indicate multiplication. In essence, the above
            equation is the same as saying, $$F = m \times a$$ We don't typically use the multiplication operator in
            algebra because it looks like the letter $x$ and can cause confusion.<br><br></p>
            <h4 class="text-center">Basic Algebraic Operations</h4>
            <p>
            Next, we will talk about some basic algebraic operations that will help you understand how we can manipulate
            these equations and expressions to our benefit. The most basic operation is addition/subtraction. We can add
            or subtract quantities to <i>both</i> sides of the equation without changing the relationship. For example,
            going back to our original equation, $F=ma$, we can add say, $5$ or even a random variable $x$ to both sides
            of the equation like so: $$F+x=ma+x$$ ...And the equation will still hold true. Note how you have to do this
            to both sides of the equation, not just one. Otherwise, the equation won't be true anymore. Think of it with
            numbers if it doesn't make sense: If we have $2 \cdot 2 = 4$, then if we only add $5$ to one side for
            example, both sides won't be equal anymore. The principle here is the exact same, we are using variables
            instead of numbers.<br><br>
            The same can be done with multiplication and division (as long as you don't divide by zero). We can
            multiply or divide both sides of the equation by a quantity without changing the relationship. For example, If we multiply $F=ma$ by $2$, we get: $$2F = 2ma$$ And the equation still holds true. Division works exactly the same way. If this isn't clear, again, we can see this through a numerical example: $2 \cdot 2 = 4$, multiplying both sides by $2$ gives us $2 \cdot 2 \cdot 2 = 4 \cdot 2$, which is $8=8$.<br><br>Finally, we can use these operations to our advantage when we want to <i>solve</i> for a variable. For example, we can solve for $a$ in the previous equation by dividing both sides by $m$: $$\frac{F}{m} = \frac{ma}{m}$$ $$\frac{F}{m} = \frac{m}{m} \cdot a$$ $$\frac{F}{m} = a$$ (Recall that anything divided by itself equals $1$, and $1$ multiplied by anything is itself) This is the same as saying that acceleration is equal to force divided by mass. We can do this with any variable in an equation, as long as we follow the rules of algebra and manipulate the equation correctly like we just showed you.<br><br>
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
            Let's work through an example problem together to solidify your understanding of these concepts.
            </p>
            <p>
                <div class="problem">
                    <i>Given that $F=ma$ and we know that $a=\frac{v^2}{r}$, substitute and solve the new equation for $r$.</i><br><br>
                    To first start, we have to realize that the variable $a$ is in both equations, so we can substitute what they gave us for $a$ into the first equation.<br>This gives us: $$F = m \cdot \frac{v^2}{r}$$ Now, we can multiply both sides by $r$ to get rid of the denominator: $$F \cdot r = \frac{v^2}{r} \cdot r$$ $$Fr = mv^2$$ Finally, we can divide both sides by $F$ to solve for $r$: $$\frac{Fr}{F} = \frac{mv^2}{F}$$ $$r = \frac{mv^2}{F}$$ Notice how we used the basic operations of algebra that were just previously mentioned to manipulate the equation to solve for $r$. This is the essence of algebra, and it is a powerful tool that will help you solve many problems in physics. If it's not clear to you right now, don't worry, because this will become second nature to you as you practice more problems and learn more about physics.
                </div><br>
                Now that you have a solid understanding of basic algebra, it's time to move on to your first lesson in physics! (You can check out the practice problems in this lesson if you feel like you need more practice with algebra)
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson! &rarr;</button>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container-fluid h100 pt-5">
        <h1>Basic Algebra Problems</h1><br>
        <span v-show="level > -1">A calculator might be necessary for the following problems.</span>
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