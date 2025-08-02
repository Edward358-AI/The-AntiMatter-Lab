<script setup>
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body} from 'matter-js'
import {onMounted, ref, onUnmounted, watch, reactive} from 'vue'

const results = reactive([[0], [0], [0]]) // update as add more questions
const explanations = reactive([[false], [false], [false]]) // keeps track of what explanations are visible

const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0, false],
                    ["$\\langle 3, 5 \\rangle$", 1, false],
                    ["$(3, 5)$", 0, false],
                    ["$[3, 5]$", 0, false]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ]
    ]
)

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const viewportMsg = ref('')

// Airflow control variables
const speed = ref(8)
const particleRate = ref(10)

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null

// Function to start/restart particle generation
function startParticleGeneration(engine, width, height) {
    // Clear existing interval if it exists
    if (currentEngine && currentEngine.particleInterval) {
        clearInterval(currentEngine.particleInterval);
    }
    
    // Create new particle stream with current rate
    let particleInterval = setInterval(() => {
        // Only create particles if engine still exists
        if (!currentEngine) {
            clearInterval(particleInterval);
            return;
        }
        
        // Create a small particle on the right side
        const particle = Bodies.circle(
            width - 20, // Start from right edge
            Math.random() * (height - 100) + 50, // Random Y position
            5, // Radius
            {
                render: {
                    fillStyle: '#ff6b6b',
                    strokeStyle: '#fff',
                    lineWidth: 1
                },
                frictionAir: 0, 
                restitution: 0.8,
                collisionFilter: {
                    category: 0x0004, // Different category from walls
                    mask: 0x0004 | 0x0008 // Collide with other particles (0x0004) and cyan body (0x0008)
                }
            }
        );
        
        // Add creation timestamp for cleanup
        particle.createdAt = Date.now();
        
        // Give it leftward velocity using Body.setVelocity
        Body.setVelocity(particle, {
            x: -speed.value - (Math.random() - 0.5) * 8, // Base speed + small random variation
            y: (Math.random() - 0.5) * 2 // Slight random Y velocity
        });
        
        // Add to world
        Composite.add(engine.world, particle);
        
    }, particleRate.value); // Create new particle based on rate setting
    
    // Store interval reference for cleanup
    currentEngine.particleInterval = particleInterval;
}

function runDrag() {
    // Clean up previous engine if it exists
    if (currentEngine) {
        // Clear particle interval
        if (currentEngine.particleInterval) {
            clearInterval(currentEngine.particleInterval);
        }
        // Clear cleanup interval
        if (currentEngine.cleanupInterval) {
            clearInterval(currentEngine.cleanupInterval);
        }
        // Stop the runner
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        // Stop and clear the render
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
            currentRender = null
        }
        // Clear the engine
        Engine.clear(currentEngine)
        currentEngine = null
        currentRunner = null
    }

    if (window.innerWidth < 1000) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }
    document.getElementById("drag").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup
    engine.gravity.y = 0
    var width = 0.5 * window.innerWidth > 800 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 0.8 * width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('drag'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#000"
        }
    });


    currentRender = render // Store reference for cleanup
    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();
    currentRunner = runner // Store reference for cleanup

    // run the engine
    Runner.run(runner, engine);

    const wallThickness = 50;
    var walls = [
        // Top wall
        Bodies.rectangle(width / 2, -wallThickness / 2, width + 200, wallThickness, {
            isStatic: true,
            render: { visible: false },
            collisionFilter: {
                category: 0x0002,
                mask: 0x0008 // Can collide with the cyan body (0x0008)
            }
        }),
        // Bottom wall
        Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, {
            isStatic: true,
            render: { visible: false },
            collisionFilter: {
                category: 0x0002,
                mask: 0x0008
            }
        }),
        // Left wall
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, {
            isStatic: true,
            render: { visible: false },
            collisionFilter: {
                category: 0x0002,
                mask: 0x0008
            }
        }),
        // Right wall
        Bodies.rectangle(width + wallThickness/ 2, height / 2, wallThickness, height + 100, {
            isStatic: true,
            render: { visible: false },
            collisionFilter: {
                category: 0x0002,
                mask: 0x0008
            }
        })
    ];
    
    var body = Bodies.rectangle(0.5 * width, 0.5* height, 0.1* width, 0.1 * width, {
        render: {fillStyle: 'cyan'},
        collisionFilter: {
            category: 0x0008, // Body has its own category so particles can collide with it
            mask: 0xFFFFFFFF // Can collide with everything (default behavior)
        }
    })

    // Add walls and body to world
    Composite.add(engine.world, [...walls, body]);

    // Start particle generation
    startParticleGeneration(engine, width, height);

    // Add periodic cleanup for old particles
    let cleanupInterval = setInterval(() => {
        if (!currentEngine) {
            clearInterval(cleanupInterval);
            return;
        }
        
        // Get all bodies from the world
        const bodies = Composite.allBodies(engine.world);
        const particlesToRemove = [];
        
        // Find particles that have gone offscreen or have been around for too long
        bodies.forEach(body => {
            // Skip static bodies (walls)
            if (body.isStatic) return;
            
            const age = Date.now() - (body.createdAt || Date.now());
            
            // Remove particles that have gone offscreen or are too old
            if (body.position.x < -100 || 
                body.position.x > width + 100 || 
                body.position.y < -100 || 
                body.position.y > height + 100 || 
                age > 15000) {
                particlesToRemove.push(body);
            }
        });
        
        // Remove the identified particles
        if (particlesToRemove.length > 0) {
            Composite.remove(engine.world, particlesToRemove);
        }
        
    }, 1000); // Run cleanup every second
    
    // Store cleanup interval reference
    currentEngine.cleanupInterval = cleanupInterval;

    // add mouse control
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

}  

onMounted(() => {
    runDrag()
});

// Watch for particle rate changes and restart generation
watch(particleRate, () => {
    if (currentEngine) {
        // Get canvas dimensions
        const width = 0.5 * window.innerWidth > 800 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
        const height = 0.8 * width;
        startParticleGeneration(currentEngine, width, height);
    }
});

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Clear particle interval
        if (currentEngine.particleInterval) {
            clearInterval(currentEngine.particleInterval);
        }
        // Clear cleanup interval
        if (currentEngine.cleanupInterval) {
            clearInterval(currentEngine.cleanupInterval);
        }
        // Remove event listeners
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
        }
        Engine.clear(currentEngine)
        currentEngine = null
        currentRender = null
        currentRunner = null
    }
});

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
                    air resistance. We will use the linear drag model for simplicity, and we can simply use our integration skills to get through this problem. First, 
                    we want to write the forces on the falling object:
                    <br><br>
                    $$ mg - bv = ma $$
                    $$ g -\dfrac{b}{m} v = a $$
                    <br>
                    Now, we want to recall that $a = \frac{dv}{dt}$, which lets us set this up as a differential equation:
                    <br><br>
                    $$ g -\dfrac{b}{m} v = \dfrac{dv}{dt} $$
                    <br>
                    We want to separate the variables here, so we can write this as:
                    <br><br>
                    $$ \dfrac{dv}{g -\dfrac{b}{m} v} = dt $$
                    <br>
                    Now, we can integrate both sides. The left side is a bit tricky, but we can use u-substitution. I won't show it here since it's not a complex 
                    substitution, but you can use $u = g - \frac{b}{m} v$ if you have trouble.
                    <br><br>
                    $$ \int_0^v \dfrac{dv}{g -\dfrac{b}{m} v} = \int_0^t dt $$
                    $$ -\dfrac{m}{b} \ln\left|g -\dfrac{b}{m} v\right| \bigg|_0^v = t $$
                    $$ -\dfrac{m}{b} \left( \ln\left|g -\dfrac{b}{m} v\right| - \ln(g) \right) = t $$
                    <br>
                    We can use a property of logarithms to combine the two logarithms:
                    <br><br>
                    $$ -\dfrac{m}{b} \ln\left(\dfrac{g -\dfrac{b}{m} v}{g}\right) = t $$
                    $$ \dfrac{g -\dfrac{b}{m} v}{g} = e^{-\dfrac{b}{m} t} $$
                    $$ g -\dfrac{b}{m} v = g e^{-\dfrac{b}{m} t} $$
                    $$ v = -\dfrac{mg}{b} \left( e^{-\frac{b}{m} t} - 1 \right) $$
                    <br>
                    We can use this to find the position and acceleration as well, though I won't make you do that.
                    This is the exact equation of motion for an object falling under linear drag. It is a bit complicated, but it does make sense. 
                    It's easier to understand if we look at it conceptually instead of focusing on the equation.
                    <br><br>
                </span>
                When the object is initially dropped, it has very little air resistance acting on it because it is not moving very fast. THis means that the 
                initial acceleration should be roughly linear and equal to $g$. As the object falls, the acceleration will gradually decrease as the force of air 
                resistance increases.
                <br><br>
                <span v-show="level>0">
                    As the object approaches the terminal velocity, the velocity with respect to time should asymptote to a fixed value, and the acceleration should 
                    asymptote to zero. The initial slope of the velocity versus time graph would look roughly linear, and the slope would decrease with time as the 
                    acceleration decreased. With this information, we can draw a rough graph of the motion.
                </span>
                <span v-show="level==0">
                    When the object approaches the terminal velocity, the acceleration should drop to zero as the forces get balanced, and the velocity will approach the 
                    terminal velocity value. This information is enough to generate a rough graph of the motion of velocity versus time.
                </span>
                <br><br>
                Take a look at the graph below. It has all of the characteristics that the hypothetical graph we talked about above should have.
                <br><br>
                <figure>
                    <img src="\src\assets\fluids\Figure 113.png"/>
                    <figcaption>Figure 2: The velocity-time graph for an object falling under air resistance.</figcaption>
                </figure>
                <br>
                That's it for our exploration of air resistance! This topic can get pretty complex, but the introductory physics and the general concepts behind it 
                are quite simple. This is also the end of our fluids unit, and the end of mechanics. I hope you enjoyed your journey with us thus far.
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            </div>
        </p>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Air Resistance Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
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
                <span class="explained mt-3" v-show="explanations[level][q.number]">{{ q.explain }}</span>
            </form>

        </div>
    </div>
</template>