<script setup>
import { reactive, watch, ref } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

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
        <h1>Metric Prefixes</h1><br>
        <div v-show="page === 0">
            <p>
                The SI (<i>Système international d'unités</i>)system is the standard system of measurement used in science and engineering. It is a variation 
                on the metric system, which is famous for not being used in the United States. The SI system is based on a set of base units, which are defined in terms of 
                fundamental physical constants. Some of the most common base units are the meter ($\textrm{m}$) for distance, kilogram ($\textrm{kg}$) for mass, and second ($\textrm{s}$) for time.
                <br><br>
                As you progress this course, you wil learn about more SI units that are used to measure other physical quantities, such as the Newton <br>($\textrm{N}$) for force, the Joule ($\textrm{J}$) for energy, etc. But what if 
                we want to measure the distance, say, from the Earth to the sun? Or the mass of a proton? These values are so large or small that they are impractical to express in base units. This is why the SI system also includes a set 
                of metric prefixes, which are used to express these values in a more manageable way. These prefixes are used to multiply or divide the base unit by a power of ten, allowing us to express very large or very small quantities in a more convenient form.
                <br><br>
                One of the base SI units is actually expressed in terms of a metric prefix: the kilogram ($\textrm{kg}$) is defined as 1000 grams ($\textrm{g}$), where the prefix "kilo-" means "1000". This is just one example of how metric prefixes are used to express quantities in the SI system.
                The kilogram is sort of unique in that it is the only base SI unit that has a metric prefix in its name, and that's because the gram is a very small unit of mass.
                <br><br>
                The metric prefixes are expressed as an extra part of the unit, such as "kilo" in "kilogram" or "centi" in "centimeter". In the abbreviations of the unit, they are usually expressed with a 
                one or two letter abbrevation that is placed before the base unit, such as "k" for kilo (i.e. $\textrm{kg}$) or "c" for centi (i.e. $\textrm{cm}$). Here is a list of <b>all</b> metric prefixes used in the SI system:
                <br><br>
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
                            <th>Prefix</th>
                            <th>Symbol</th>
                            <th>Power of 10</th>
                            <th>Decimal Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>yotta-</strong></td>
                            <td>Y</td>
                            <td>10<sup>24</sup></td>
                            <td>1,000,000,000,000,000,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>zetta-</strong></td>
                            <td>Z</td>
                            <td>10<sup>21</sup></td>
                            <td>1,000,000,000,000,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>exa-</strong></td>
                            <td>E</td>
                            <td>10<sup>18</sup></td>
                            <td>1,000,000,000,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>peta-</strong></td>
                            <td>P</td>
                            <td>10<sup>15</sup></td>
                            <td>1,000,000,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>tera-</strong></td>
                            <td>T</td>
                            <td>10<sup>12</sup></td>
                            <td>1,000,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>giga-</strong></td>
                            <td>G</td>
                            <td>10<sup>9</sup></td>
                            <td>1,000,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>mega-</strong></td>
                            <td>M</td>
                            <td>10<sup>6</sup></td>
                            <td>1,000,000</td>
                        </tr>
                        <tr>
                            <td><strong>kilo-</strong></td>
                            <td>k</td>
                            <td>10<sup>3</sup></td>
                            <td>1,000</td>
                        </tr>
                        <tr>
                            <td><strong>hecto-</strong></td>
                            <td>h</td>
                            <td>10<sup>2</sup></td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td><strong>deka-</strong></td>
                            <td>da</td>
                            <td>10<sup>1</sup></td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td><strong>deci-</strong></td>
                            <td>d</td>
                            <td>10<sup>-1</sup></td>
                            <td>0.1</td>
                        </tr>
                        <tr>
                            <td><strong>centi-</strong></td>
                            <td>c</td>
                            <td>10<sup>-2</sup></td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td><strong>milli-</strong></td>
                            <td>m</td>
                            <td>10<sup>-3</sup></td>
                            <td>0.001</td>
                        </tr>
                        <tr>
                            <td><strong>micro-</strong></td>
                            <td>μ</td>
                            <td>10<sup>-6</sup></td>
                            <td>0.000001</td>
                        </tr>
                        <tr>
                            <td><strong>nano-</strong></td>
                            <td>n</td>
                            <td>10<sup>-9</sup></td>
                            <td>0.000000001</td>
                        </tr>
                        <tr>
                            <td><strong>pico-</strong></td>
                            <td>p</td>
                            <td>10<sup>-12</sup></td>
                            <td>0.000000000001</td>
                        </tr>
                        <tr>
                            <td><strong>femto-</strong></td>
                            <td>f</td>
                            <td>10<sup>-15</sup></td>
                            <td>0.000000000000001</td>
                        </tr>
                        <tr>
                            <td><strong>atto-</strong></td>
                            <td>a</td>
                            <td>10<sup>-18</sup></td>
                            <td>0.000000000000000001</td>
                        </tr>
                        <tr>
                            <td><strong>zepto-</strong></td>
                            <td>z</td>
                            <td>10<sup>-21</sup></td>
                            <td>0.000000000000000000001</td>
                        </tr>
                        <tr>
                            <td><strong>yocto-</strong></td>
                            <td>y</td>
                            <td>10<sup>-24</sup></td>
                            <td>0.000000000000000000000001</td>
                        </tr>
                    </tbody>
                </table>
            <p>
                <br>
                Memorize all of these. It's absolutely essential to know them, and you should sacrificing some time to do so. It should only take two or three hours of constant and agonizing repetition.
                <br><br>
                I am joking. You definitely don't need all of these. After all, who's ever used the prefix "yotta-" in their life? There are a 
                few common prefixes that you need to memorize, and that'll be it. Those are:
                <br><br>
                <table style="
                        outline: 4px solid #ccc;
                        border-radius: 8px;
                        background: #000;
                        margin: auto;
                        padding: 12px;
                        color: #fff;
                        border-collapse: separate;
                        border-spacing: 0;">
                    <thead>
                        <tr>
                            <th>Prefix</th>
                            <th>Symbol</th>
                            <th>Power of 10</th>
                            <th>Decimal Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>kilo-</strong></td>
                            <td>k</td>
                            <td>10<sup>3</sup></td>
                            <td>1,000</td>
                        </tr>
                        <tr>
                            <td><strong>centi-</strong></td>
                            <td>c</td>
                            <td>10<sup>-2</sup></td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td><strong>milli-</strong></td>
                            <td>m</td>
                            <td>10<sup>-3</sup></td>
                            <td>0.001</td>
                        </tr>
                        <tr>
                            <td><strong>micro-</strong></td>
                            <td>μ</td>
                            <td>10<sup>-6</sup></td>
                            <td>0.000001</td>
                        </tr>
                        <tr>
                            <td><strong>nano-</strong></td>
                            <td>n</td>
                            <td>10<sup>-9</sup></td>
                            <td>0.000000001</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <br>
                Isn't that just so much more manageable? You can definitely memorize this. Even within this list, the prefixes "kilo", "centi", and "milli" are seen 
                far more often than the others. These prefixes are the most commonly used in physics, and you <b>will</b> see them in the future.
                </p>
            </p>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                Now that you know the metric prefixes, let's practice using them! Below is a quick question that will test your understanding of the common metric 
                prefixes. Try to answer the question without looking at the table!
                <br><br>
                <div class="problem">
                    How many meters are in 0.5 centimeters?
                    <br>
                    <span>
                        <div v-show="show" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> There are 100 centimeters in a meter, so to convert 0.5 centimeters to meters, we divide by 100 to get 0.005 meters (m).
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How many nanometers are in 0.5 centimeters?
                    <br>
                    <span>
                        <div v-show="show1" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> There are 100 centimeters in a meter, and there are 1,000,000,000 ($10^9$) nanometers in a meter, so to convert 0.5 centimeters to nanometers, we divide by 100 to get the 
                            number of meters, which is 0.005. Then, we multiply by 1,000,000,000 to get 5,000,000 nanometers.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How many milligrams are in 0.5 kilograms?
                    <br>
                    <span>
                        <div v-show="show2" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> There are 1000 grams in a kilogram, and there are 1000 milligrams in a gram, so to convert 0.5 kilograms to milligrams, we multiply by 1000 to get the number of grams, which is 500. Then, we multiply by 1000 to get 500,000 milligrams.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How many kilometers are in 0.75 micrometers?
                    <br>
                    <span>
                        <div v-show="show3" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> There are 1,000,000 ($10^6$) micrometers in a meter, and there are 1000 meters in a kilometer, so to convert 0.75 micrometers to kilometers, we divide by 1,000,000 to get the number of meters, which is 0.00000075. Then, we divide by 1000 to get 0.00000000075 kilometers.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show3 = !show3">{{ show3 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How many milliliters are in 0.005 kiloliters?
                    <br>
                    <span>
                        <div v-show="show4" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> There are 1000 liters in a kiloliter, and there are 1000 milliliters in a liter, so to convert 0.005 kiloliters to milliliters, we multiply by 1000 to get the number of liters, which is 5. Then, we multiply by 1000 to get 5000 milliliters.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show4 = !show4">{{ show4 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                </div>
                <br>
                That's all for metric prefixes! You should now have a good understanding of how to use them and how to convert between different metric units. This should be a great help throughout the rest of 
                these lessons, as I'll be referencing these prefixes decently often. 
            </p>
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