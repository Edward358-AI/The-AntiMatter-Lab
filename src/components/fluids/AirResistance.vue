<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Air Resistance and Drag Forces</h1><br>
        <p>
            <div v-show="page===0">
                We've ignored air resistance in all scenarios previously, so it's finally time to face it. But first, a bit of explanation as to why I put this 
                in the fluids unit. Actually, I'll let you see for yourself with the interactive demo below.
                <br><br>
                <figure>
                    <h3>Air Resistance Demo</h3>
                    <br>
                    
                    <div class="row justify-content-center m-auto" style="max-width:750px;">
                        <div class="col-md-4">
                            <label for="speed" class="form-label text-white">Speed: {{ speed }}</label>
                            <input type="range" class="form-range" id="speed" v-model.number="speed" min="2" max="20" step="1">
                        </div>
                        <div class="col-md-4">
                            <label for="particleRate" class="form-label text-white">Particle Rate: {{ particleRate }}ms</label>
                            <input type="range" class="form-range" id="particleRate" v-model.number="particleRate" min="1" max="50" step="1">
                        </div>
                    </div>
                    
                    <div id="drag"></div>
                    <button class="btn btn-outline-primary" @click="runDrag()">Reset</button><br>
                </figure>
                <br>
                You see, air resistance is really due to the collision of flowing air particles with an object! This does sound an awful lot like how air 
                pressure works. Moreover, air resistance and drag forces really only exist if the object is going through a fluid. Therefore, it makes perfect 
                sense to have air resistance here, even though it does concern itself more with forces.
                <br><br>
                <span v-show="level>0">
                    Air resistance is proportional to the relative velocity of the air and the object moving through it. In other words, the force of the wind pushing on you 
                    is air resistance, as is the wind that blows in your hair when you stick your head out of the car window. There are actually two common equations 
                    for air resistance. One is directly proportional to this relative velocity, while the other is proportional to the square of it.
                    <br><br>
                    I'll show the general forms of the equations first, with an arbitrary constant in front to indicate the strength of air resistance.
                    <br><br>
                    $$ F_d = - bv $$
                    $$ F_d = - cv^2 $$
                    <br>
                    The constants $b$ and $c$ are just arbitrary constants that describe how strongly the air resistance affects the object. The negative sign indicates that the 
                    force is in the opposite direction of the relative velocity, which makes sense as air resistance is a dissipative force. This is a good conceptual understanding, but 
                    how do we know when to use each formula?
                    <br><br>
                    There is no exact relationship, but the first formula is generally used when we have small objects moving relatively slowly through a thin medium or objects moving through 
                    a very viscous medium. The second is used when we have relatively large ojects moving at medium to high speeds through a medium. No exact formula can tell you which 
                    drag equation to use, but most of the time it should be obvious or given to you.
                    <br><br>
                    Now, I want to explore the actual drag equation. This one is a quadratic model, meaning it's closer to the second equation I gave above.
                    <br><br>
                    $$ F_d = \dfrac12 C_d A \rho v^2 $$
                    <br>
                    That's a lot of terms! Don't worry, though, I'll explain what each of these are. First, $v$ is obviously the relative velocity between the object and the 
                    air, and $\rho$ is the density of the air. The next variable $A$ represets the <b>cross-sectional</b> area of the surface moving through the air. The smaller 
                    this area, the better, which is why many airplanes have sleek airframes. Finally, $C_d$ is the drag coefficient, similar to the coefficient of friction but 
                    for objects moving in fluids. It has to be experimentally measured, and depends to some degree on what shape the object is.
                </span>
                <span v-show="level==0">
                    There are lots of models for drag, but we'll only focus the simplest one. This one is directly proportional to the relative velocity between the 
                    fluid and the object. It's relative velocity because air resistance doesn't care if you're moving or the air is moving. Think about how a breeze is essentially 
                    the same as the wind that blows when you open the window on a moving car. The simplest model uses a constant $b$ to describe air resistance.
                    <br><br>
                    $$ F_d = - b v $$
                    <br>
                    The constant $b$ is just an arbitrary constant that describes how strongly the air affects the object. This is related to things like the area of the 
                    object (larger areas mean larger air resistance, since there's more surface for air particles to hit), the density of the air (denser fluid means more 
                    particles hitting the object), and the nature and characteristics of the fluid itself. The negative sign indicates that the air resistance tends to resist relative 
                    motion, just like the other dissipative force we know about: friction.
                </span>
                <div class="btn-contain-right">
                    <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
                I want to test your conceptual understanding of how air resistance works here before we move on. There's not going to be much calculation 
                in this lesson, as air resistance is mainly a conceptual thing at the level we're approaching it. (We're not designing planes here.)
                <br><br>
                <div class="problem">
                    Which would have less air resistance: a square-shaped object or a cone-shaped object, given that they are around the same mass and 
                    size? 
                    <br>
                    <span>
                        <div v-show="show" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> The cone cone is more aerodynamic, so it has less air resistance.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    Why are fighter jets usually designed to be very thin and/or flat? (Think about what a fighter jet is designed to do!)
                    <br>
                    <span>
                        <div v-show="show1" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> It minimizes the amount of area on the plane that is contacting the air, reducing drag and letting the plane be faster.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    Why do ships always have sharp bows? (The bow of a ship is the front of it. If you don't know what that looks like, just look up an image.)
                    <br>
                    <span>
                        <div v-show="show2" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> It reduces the drag force from water by diverting water around the ship. (Drag isn't exclusive to air!)
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    How does opening a parachute slow you down?
                    <br>
                    <span>
                        <div v-show="show3" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> It increases the drag force on you by increasing the area in contact with the air significantly.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show3 = !show3">{{ show3 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                    <br><br>
                    What happens to a skydiver as they fall through the air? (Air resistance cannot be neglected!)
                    <br>
                    <span>
                        <div v-show="show4" class='answer' style="width:fit-content">
                            <strong>Answer:</strong> They accelerate under gravity, but the drag force on them increases as they get faster.
                            <br>
                        </div>
                        <button class="btn btn-outline-primary" @click="show4 = !show4">{{ show4 ? 'Hide' : 'Show' }}
                            Answer
                        </button>
                    </span>
                </div>
                <br>
                That last question leads us into our new concept: the <b>terminal velocity</b>. Basically, as something falls under gravity, it experiences an increasing 
                drag force on it as it accelerates. However, at some point the drag force will equal the gravitational force pulling the object 
                downwards, and the object will no longer accelerate. This velocity is called the <b>terminal velocity</b>.
                <br><br>
                <figure>
                    <img src="/src/assets/fluids/Figure 112.png"/>
                    <figcaption>Figure 1: Terminal velocity for an oddly panicked skydiver.</figcaption>
                </figure>
                <br>
                Your terminal velocity can change! This is what parachutes do: they increase the drag coefficient on you by making a much larger area for the air 
                to hit, which causes your terminal velocity to be less. <b>However</b>, when you reach that new terminal velocity the gravitational force is still equal to the 
                drag force! This is a common misconception and trips up countless people, because it is unintuitive at first thought.
                <span v-show="level>0">
                    <br><br>
                    We can actually calculate what the terminal velocity would be. We're going to use both simplified models, though I will say that the 
                    quadratic model would likely be more accurate for a skydiver. It's a simple matter of force balance.
                    <br><br>
                    First, we'll start with the linear model.
                    <br><br>
                    $$ mg - bv_t = 0 $$
                    $$ v_t = \dfrac{mg}{b} $$
                    <br>
                    We use the same approach for the quadratic model.
                    <br><br>
                    $$ mg - c{v_t}^2 = 0 $$
                    $$ v_t = \sqrt{\dfrac{mg}{c} } $$
                    <br>
                    Simple enough. Now, you should be able to use this general approach to calculate the terminal velocity given any model for drag.
                </span>
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===2">
                Okay, so now we know what happens at the end of the falling motion when there is drag. But what about the in-between parts? Those are 
                important as well. It is possible to get an exact formula for what happens, but this is often unnecessary and it is easier to think 
                conceptually. We start off with the moment that the object is dropped, and we consider the motion to 
                "end" when we reach the terminal velocity.
                <br><br>
                <span v-show="level==2">
                    Fortunately for you calculus students, we can actually use calculus to derive the exact equations of motion for an object that falls under 
                    air resistance. We will use the linear drag model for simplicity, and we can simply use our integration skills to get through this one.
                </span>
            </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Vectors Problems</h1><br>
        <form @submit.prevent="checkAnswer(q.number)" class="question row justify-content-center" v-for="q in questions">
            <div class="w-100">
                <label class="form-label fs-5">{{ q.number+1 + ". " + q.question }}</label><br>
            </div>
            <div class="col border-end border-secondary">
                <div class="ms-auto" style="width:fit-content">
                    <div class="form-check" style="width:fit-content;" v-for="a in q.answers">
                        <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'">
                        <label class="form-check-label">
                            {{ a[0] }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column">
                <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                    :value="results[q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                <div class="me-auto mb-auto" :style="results[q.number] === 0 ? 'display:none' : ''">{{ results[q.number] === 1 ?
                    "&#x2705; Correct!" : "&#x274c; Not quite! Try again."}}</div>
            </div>
        </form><br>

    </div>
</template>