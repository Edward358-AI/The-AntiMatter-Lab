<script setup>
import { ref, vShow, onMounted, onUnmounted } from 'vue'
import { Engine, Render, Runner, Bodies, Composite, Body, Events} from 'matter-js'
import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).InclinedPlanes

watch(page, () => window.scrollTo(0,0))

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What is the theoretical maximum possible acceleration on a frictionless inclined plane?",
                answers: [
                    ["4.91 $~\\textrm{m/s}^2$", 0, false],
                    ["9.81 $~\\textrm{m/s}^2$", 1, false],
                    ["There is no limit", 0, false],
                    ["The limit cannot be calculated", 0, false]
                ],
                explain: "The acceleration of a block on an inclined plane only depends on the incline angle. The maximum acceleration happens when the incline angle is 90 degrees, because in that case the object is in free fall. This gives us the second answer choice as the correct one."
            },
            {
                number: 1,
                question: "Which of these does not affect the acceleration down an inclined plane?",
                answers: [
                    ["Friction", 0, false],
                    ["Gravity", 0, false],
                    ["Incline Angle", 0, false],
                    ["Mass", 1, false]
                ],
                explain: "The acceleration down an incline does not depend on the mass of the object, much like free fall. In our force equations, mass cancels out at the end."
            },
            {
                number: 2,
                question: "Which one of these would not be an ideal pulley?",
                answers: [
                    ["A massless, frictionless wheel", 0, false],
                    ["A massive, frictionless wheel", 0, false],
                    ["A massless wheel with friction", 0, false],
                    ["A massive wheel with friction", 1, false]
                ],
                explain: "The ideal pulley allows the string to pass over it without friction and does not affect the motion of the system as a whole. The first two would be ideal because the string passes over them with friction, but the third would also be ideal because the motion of a massless object wouldn't affect anything, even if it did have friction. Thus the correct answer is the fourth one."
            },
            {
                number: 3,
                question: "What happens if you have two equal weights on either side of an Atwood's machine and slightly pull one of the blocks downwards?",
                answers: [
                    ["The block accelerates down", 0, false],
                    ["The block accelerates up", 0, false],
                    ["The block moves at constant velocity", 1, false],
                    ["The block stops", 0, false]
                ],
                explain: "Because the machine has two identical weights on either side, there is zero acceleration of the system as a whole. Therefore, the block that is pulled downwards will continue at constant velocity."
            },
            {
                number: 4,
                question: "Consider the pulley of an ideal Atwood's machine, where the string has a tension $T$. What is force on the pulley due to the string?",
                answers: [
                    ["$2T$", 1, false],
                    ["$T$", 0, false],
                    ["$0$", 0, false],
                    ["$T/2$", 0, false]
                ],
                explain: "There is a downward force of $T$ on both sides of the pulley due to the string, meaning the total force on the pulley by the string wrapped around it is $2T$."
            },
            {
                number: 5,
                question: "Changing the size of the pulley in a basic Atwood's machine changes the:",
                answers: [
                    ["Acceleration", 0, false],
                    ["Mass", 0, false],
                    ["Direction of motion", 0, false],
                    ["None of the above ", 1, false]
                ],
                explain: "Changing the pulley's size does not change anything about the Atwood's machine. Only changing the two masses would have any effect on the system."
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the theoretical maximum possible acceleration on a frictionless inclined plane?",
                answers: [
                    ["4.91 $~\\textrm{m/s}^2$", 0, false],
                    ["9.81 $~\\textrm{m/s}^2$", 1, false],
                    ["There is no limit", 0, false],
                    ["The limit cannot be calculated", 0, false]
                ],
                explain: "The acceleration of a block on an inclined plane only depends on the incline angle. The maximum acceleration happens when the incline angle is 90 degrees, because in that case the object is in free fall. This gives us the second answer choice as the correct one."
            },
            {
                number: 1,
                question: "How long does it take to slide from rest down a $15 \\degree$ frictionless incline that is 4 meters tall?",
                answers: [
                    ["3.49 s", 1, false],
                    ["2.47 s", 0, false],
                    ["1.78 s", 0, false],
                    ["1.58 s", 0, false]
                ],
                explain: "The acceleration down the incline is equal to $g \\sin 15 \\degree$. We use this information, along with the fact that the diagonal length of the incline is $4 / \\sin 15 \\degree$, along with the kinematics formula $x = \\dfrac12 at^2$ to solve the problem, yielding a time of 3.49 seconds."
            },
            {
                number: 2,
                question: "What is the minimum force required to push a 30 kilogram box up a $25 \\degree$ incline if the box has a coefficient of kinetic friction of $\\mu_k = 0.4$ with the incline?",
                answers: [
                    ["124.4 N", 0, false],
                    ["176.9 N", 0, false],
                    ["231.1 N", 1, false],
                    ["294.3 N", 0, false]
                ],
                explain: "Both the component of gravity down the incline and the friction act against you when you attempt to push the box upwards. The component of gravity is equal to $mg \\sin 25 \\degree$, and the friction is equal to $\\mu_k F_N$, where $F_N = mg \\cos 25 \\degree$. Doing a bit of algebra, we arrive at the answer that the minimum force required is 231.1 N."
            },
            {
                number: 3,
                question: "The maximum possible tension in a string used for an Atwood's machine is 150 N. Which pair of masses is a possible option if we don't want the string to break?",
                answers: [
                    ["20 kg, 25 kg", 0, false],
                    ["10 kg, 30 kg", 1, false],
                    ["15 kg, 25 kg", 0, false],
                    ["5 kg, 65 kg", 0, false]
                ],
                explain: "If we solve for the general form of the tension in the string using the two equations describing the motion of the two blocks, we get that $T = \\frac{2m_1m_2g}{m_1+m_2}$. Plugging in values lets us conclude that only option 2 satisfies the condition of a tension force less than 150 N."
            },
            {
                number: 4,
                question: "Consider the pulley of an ideal Atwood's machine, where the string has a tension $T$. What is force on the pulley due to the string?",
                answers: [
                    ["$2T$", 1, false],
                    ["$T$", 0, false],
                    ["$0$", 0, false],
                    ["$T/2$", 0, false]
                ],
                explain: "There is a downward force of $T$ on both sides of the pulley due to the string, meaning the total force on the pulley by the string wrapped around it is $2T$."
            },
            {
                number: 5,
                question: "Consider a modified Atwood's Machine as shown. The incline angle is $30 \\degree$, and the masses are $m_1 = 30~\\textrm{kg}$ and $m_2 = 18~\\textrm{kg}$, respectively. What is the acceleration of both bodies?<br><img style='max-width: 200px;' src='/dynamics/Problem 6.png' class='rounded'/>",
                answers: [
                    ["$2.45~\\textrm{m/s}^2$", 0, false],
                    ["$1.63~\\textrm{m/s}^2$", 0, false],
                    ["$0.89~\\textrm{m/s}^2$", 0, false],
                    ["$0.61~\\textrm{m/s}^2$", 1, false]
                ],
                explain: "For the right block, we have the equation $m_2 g - F_T = m_2 a$ as usual. However, for the left block, we need to deal with the incline, which means that the force-analysis equation is $F_T \\sin \\theta - m_1 g = m_1 a$. Solving for $a$ with these two equations gives us the fourth answer choice."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the theoretical maximum possible acceleration on a frictionless inclined plane?",
                answers: [
                    ["4.91 $~\\textrm{m/s}^2$", 0, false],
                    ["9.81 $~\\textrm{m/s}^2$", 1, false],
                    ["There is no limit", 0, false],
                    ["The limit cannot be calculated", 0, false]
                ],
                explain: "The acceleration of a block on an inclined plane only depends on the incline angle. The maximum acceleration happens when the incline angle is 90 degrees, because in that case the object is in free fall. This gives us the second answer choice as the correct one."
            },
            {
                number: 1,
                question: "How long does it take to slide from rest down a $15 \\degree$ frictionless incline that is 4 meters tall?",
                answers: [
                    ["3.49 s", 1, false],
                    ["2.47 s", 0, false],
                    ["1.78 s", 0, false],
                    ["1.58 s", 0, false]
                ],
                explain: "The acceleration down the incline is equal to $g \\sin 15 \\degree$. We use this information, along with the fact that the diagonal length of the incline is $4 / \\sin 15 \\degree$, along with the kinematics formula $x = \\dfrac12 at^2$ to solve the problem, yielding a time of 3.49 seconds."
            },
            {
                number: 2,
                question: "What is the minimum force required to push a 30 kilogram box up a $25 \\degree$ incline if the box has a coefficient of kinetic friction of $\\mu_k = 0.4$ with the incline?",
                answers: [
                    ["124.4 N", 0, false],
                    ["176.9 N", 0, false],
                    ["231.1 N", 1, false],
                    ["294.3 N", 0, false]
                ],
                explain: "Both the component of gravity down the incline and the friction act against you when you attempt to push the box upwards. The component of gravity is equal to $mg \\sin 25 \\degree$, and the friction is equal to $\\mu_k F_N$, where $F_N = mg \\cos 25 \\degree$. Doing a bit of algebra, we arrive at the answer that the minimum force required is 231.1 N."
            },
            {
                number: 3,
                question: "The maximum possible tension in a string used for an Atwood's machine is 150 N. Which pair of masses is a possible option if we don't want the string to break?",
                answers: [
                    ["20 kg, 25 kg", 0, false],
                    ["10 kg, 30 kg", 1, false],
                    ["15 kg, 25 kg", 0, false],
                    ["5 kg, 65 kg", 0, false]
                ],
                explain: "If we solve for the general form of the tension in the string using the two equations describing the motion of the two blocks, we get that $T = \\frac{2m_1m_2g}{m_1+m_2}$. Plugging in values lets us conclude that only option 2 satisfies the condition of a tension force less than 150 N."
            },
            {
                number: 4,
                question: "Consider the pulley of an ideal Atwood's machine, where the string has a tension $T$. What is force on the pulley due to the string?",
                answers: [
                    ["$2T$", 1, false],
                    ["$T$", 0, false],
                    ["$0$", 0, false],
                    ["$T/2$", 0, false]
                ],
                explain: "There is a downward force of $T$ on both sides of the pulley due to the string, meaning the total force on the pulley by the string wrapped around it is $2T$."
            },
            {
                number: 5,
                question: "Consider a modified Atwood's Machine as shown. The incline angle is $30 \\degree$, and the masses are $m_1 = 30~\\textrm{kg}$ and $m_2 = 18~\\textrm{kg}$, respectively. What is the acceleration of both bodies?<br><img style='max-width: 200px;' src='/dynamics/Problem 6.png' class='rounded'/>",
                answers: [
                    ["$2.45~\\textrm{m/s}^2$", 0, false],
                    ["$1.63~\\textrm{m/s}^2$", 0, false],
                    ["$0.89~\\textrm{m/s}^2$", 0, false],
                    ["$0.61~\\textrm{m/s}^2$", 1, false]
                ],
                explain: "For the right block, we have the equation $m_2 g - F_T = m_2 a$ as usual. However, for the left block, we need to deal with the incline, which means that the force-analysis equation is $F_T \\sin \\theta - m_1 g = m_1 a$. Solving for $a$ with these two equations gives us the fourth answer choice."
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

const inputAngle = ref(30)
const friction = ref(0.05)
const viewportMsg = ref('')

// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let inclineUpdateHandler = null

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function runInclinedPlane() {
    // Clean up previous engine if it exists
    if (currentEngine) {
        if (currentRunner) {
            Runner.stop(currentRunner)
        }
        if (currentRender) {
            Render.stop(currentRender)
            currentRender.canvas.remove()
            currentRender.canvas = null
            currentRender.context = null
            currentRender = null
        }
        Engine.clear(currentEngine)
        currentEngine = null
        currentRunner = null
    }

    if (window.innerWidth < 1000) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }
    document.getElementById("inclined").innerHTML = ""
    // module aliases

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup

    var width = 0.5 * window.innerWidth > 800 ? 800 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;

    var height = 550 / 800 * width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('inclined'),
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

    // create an inclined plane using a rectangle and rotate it
    var angle = degreesToRadians(parseFloat(inputAngle.value))
    if (isNaN(angle)) {
        angle = Math.PI / 6 // defaults to 30 degrees for invalid values
        errorMessage.value = ''
    }
    else if (angle > Math.PI / 2) {
        angle = Math.PI / 6
    }

    // Position the block horizontally so it starts above the plane for most angles.
    // For steeper inclines (angle >= 55 degrees), move the block left to prevent it from missing the plane visually.
    // 55 degrees was chosen based on visual testing; 600 and 400 are x-coordinates that keep the block on the plane in the Matter.js canvas.
    var rectPosX = 600 / 800 * width;
    if (parseFloat(inputAngle.value) >= 55 / 800 * width) {
        rectPosX = 400 / 800 * width;
    }

    var valFriction = parseFloat(friction.value)
    if (isNaN(valFriction)) {
        valFriction = 0.05 / 800 * width
    }

    var plane = Bodies.rectangle(400 / 800 * width, 300 / 800 * width, 1200 / 800 * width, 20 / 800 * width, {
        isStatic: true,
        angle: -angle,
        render: { fillStyle: '#888' }
    });

    // add a block on the plane
    var block = Bodies.rectangle(rectPosX, 0, 80 / 800 * width, 80 / 800 * width, {
        angle: -angle,
        friction: valFriction,
        restitution: 0,
        frictionStatic: 1.15 * valFriction / 800 * width,
        render: { fillStyle: '#f55' }
    });

    // Define the incline update handler
    inclineUpdateHandler = function () {
        Body.setAngularSpeed(block, 0)
    }

    // Prevent block from rotating by resetting angular speed every tick
    Events.on(engine, 'beforeUpdate', inclineUpdateHandler)

    Composite.add(engine.world, [block, plane]);

    // create runner
    var runner = Runner.create();
    currentRunner = runner // Store reference for cleanup

    // run the engine
    Runner.run(runner, engine);

}

onMounted(() => {
    runInclinedPlane()
})

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Remove event listeners
        if (inclineUpdateHandler) {
            Events.off(currentEngine, 'beforeUpdate', inclineUpdateHandler)
            inclineUpdateHandler = null
        }
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
})
</script>

<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Inclined Planes and Pulleys</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>

            <p>
                It is said that Galileo dropped massive (that is, having mass) balls off of the Leaning Tower of Pisa to
                prove that the gravitational acceleration was constant for objects of different masses. This is a myth,
                but what he did do is roll balls down inclined planes of varying steepness.
                In this section, I hope to teach how to solve these types of problems. We&apos;re also going to talk
                about pulleys, but I don&apos;t think there&apos;s a good story about that.

                <br><br><h4 class="text-center">The Inclined Plane</h4>
                <span v-show="level > 0">
                    First, we consider the quintessential object on an inclined plane with incline angle $\theta$.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 18.png" />
                        <figcaption>Figure 1: The inclined plane.</figcaption>
                    </figure>
                    This diagram is visually simple, but it is not very useful for force analysis purposes. Thus, we
                    should make an FBD of this diagram (ignoring friction for now). For simplicity and better
                    visualizing, I have attached the vectors directly to the illustration. This kind of
                    diagram is called a <em>force-vector diagram</em>.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 19.png" />
                        <figcaption>Figure 2: A force-vector diagram of the scenario.</figcaption>
                    </figure>
                    <br><br>
                    Notice how the normal force $F_n$ is NOT oppositely directed and equal to $mg$ in this case!
                    It will be directed perpendicular to the incline. Now, this diagram is technically accurate, but not
                    very useful.<br><br><h4 class="text-center">Determining Axes</h4>
                    Drawing axes will be helpful to tell us how to resolve the forces into components and solve the
                    problem with
                    Newton&apos;s second law.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 20.png" />
                        <figcaption>Figure 3: A force-vector diagram with axes. But are these the right axes to use?
                        </figcaption>
                    </figure>
                    <br><br>
                    This technically works, but there’s a much better way to solve these kinds of problems.
                    See, in this case you’d have to find the acceleration in both the horizontal and vertical
                    directions, and the trigonometry gets quite messy and unnecessarily repetitive.
                    Instead, think of it this way. The block is constrained to move down the incline.
                    It cannot move perpendicular to the incline (since it can’t move into the incline or rise off of it,
                    at least for this scenario).
                    We can instead define axes perpendicular to and along the incline then:
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 21.png" />
                        <figcaption>Figure 4: A force-vector diagram with axes that are aligned with the incline. Much
                            better.</figcaption>
                    </figure>
                    <br><br>
                    Now the key is to split the gravitational force into its components along the axes.
                    There are many ways to obtain the angle, but my intuition is that the angle between $mg$ and the
                    axis parallel to the plane is the same as the angle at the top of the plane, so the angle between
                    $mg$ and the vertical axis is simply $\theta$ due to how right triangles Worker.
                    If you need further clarification on why this is, the angle at the top is $\frac{\pi}{2}-\theta$ and
                    the angle of $mg$ with the parallel axis and that with the perpendicular axis are complementary.
                    Again, the exact process by which you get this intuition is not important, but it is very important
                    to know that that angle is $\theta$.
                    <br><br><h4 class="text-center">Analysis</h4>
                    Now, the challenge is to find the value of $F_n$ and the acceleration of the block down the incline
                    in terms of $m$, $\theta$, and any constants (hint: the only one we’ll need is $g$).
                    <br><br>
                    By doing some force analysis, we come to the conclusion that since there is no acceleration
                    perpendicular to the plane, we have the condition: <br>
                    $F_n = mg\cos(\theta)$.
                    <br><br>
                    Down the incline, we have only the component of the gravitational force directed in that direction,
                    so: <br>
                    $F_{net}=ma=mg\sin\theta$
                    <br><br>
                    From this, we easily obtain the result:<br>
                    $a=g\sin\theta$
                    <br><br>
                    That was the most simple inclined plane problem possible, but you can see it still required
                    trigonometry.
                    This fact is common to pretty much all force analysis. If your trigonometry is not great, now would
                    be a
                    good time to brush up on it. We will now add friction into the mix, which will make things a bit
                    more complicated.
                    <br><br>
                </span>
                <span v-show="level == 0">
                    We will consider a quintessential inclined plane, a wedge-shaped object that has an incline angle
                    $\theta$.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 18.png" />
                        <figcaption>Figure 1: The inclined plane.</figcaption>
                    </figure>
                    <br><br>
                    While this diagram may look nice and simple, it is unfortunatly not very useful for force analysis
                    purposed, even
                    at a conceptual level. Thus, we should make a free-body diagram of the scenario. Technically, I made
                    a force-vector diagram (which places the vectors
                    on an illustration or representation of the scenario)
                    since it would be more visually appealing and connect better to the previous figure.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 19.png" />
                        <figcaption>Figure 2: A force-vector diagram of the scenario.</figcaption>
                    </figure>
                    <br><br>
                    Now, there is a common misconception that the normal force $F_n$ is directed oppositely to the
                    gravitational force $mg$ and equal to it.
                    This is not true! The normal force is always directed perpendicular to the incline, not vertically.
                    The gravitational force, on the
                    other hand, is always directed vertically downwards. This is very important to keep in mind, as it
                    is a very common error that people
                    make when analyzing inclined planes.
                    <br><br><h4 class="text-center">Determining Axes</h4>
                    Now, this diagram is technically accurate, but not very useful. Drawing axes will be helpful to tell
                    us how to look at the forces.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 20.png" />
                        <figcaption>Figure 3: A force-vector diagram with axes. But are these the right axes to use?
                        </figcaption>
                    </figure>
                    <br><br>
                    While these axes technically are correct and can be used, they aren't very helpful. See, in this
                    case you’d have to find the acceleration in both the horizontal and vertical directions, and the
                    trigonometry gets quite messy and unnecessarily repetitive.
                    To see why another choice of axes would be better, consider the following. The block is forced to
                    move down the incline. It cannot move perpendicular to the incline (since it can’t move into the
                    incline or rise off of it, at least for this scenario).
                    We should then look at the motion of the block along the incline and perpendicular to it, and define
                    our axes that way instead.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 21.png" />
                        <figcaption>Figure 4: A force-vector diagram with axes that are aligned with the incline. Much
                            better.</figcaption>
                    </figure>
                    <br><br>
                    Now, we see that the normal force is along one of the axes, so we just need to split the
                    gravitational force along the axes. Qualitatively,
                    we can see that the normal force should equal the component of gravity perpendicular to the incline,
                    and the component of gravity parallel to the incline should be the only force acting down the
                    incline,
                    pulling the block downwards.
                    <br><br>
                    To find the exact values of the forces, we need to know the angle $\theta$ of the incline. But since
                    this is conceptual, we won't be doing
                    the problem-solving behind this problem here. Just knowing the results and general idea behind the
                    solution is enough for now.
                    <br><br>
                    The normal force is given by the equation: <br>
                    $F_n = mg\cos(\theta)$.
                    <br><br>
                    The acceleration of the block down the incline is given by: <br>
                    $a=g\sin\theta$.
                    <br><br>
                    This was the most simple inclined plane problem possible, but you might notice trigonometric
                    functions in the solutions.
                    This is why at a conceptual level, it is difficult to resolve problems without getting too bogged
                    down in the math. If you
                    believe your trigonometry skills are up to the task, you can see the full solution in our higher
                    difficulties. In any case,
                    we will now consider the same scenario, but with friction.
                    <br><br>
                </span>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page++">Next&rarr;
                </button>
            </div>
        </div>
        <div v-show="page === 1">

            <p>
                <span v-show="level > 0">
                    <h4 class="text-center">Inclined Plane (with friction)</h4>
                    Consider the same scenario, but with friction. Now there’s going to be a frictional force directed
                    parallel to the plane.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 22.png" />
                        <figcaption>Figure 5: Friction can no longer be neglected. This is not a drill.</figcaption>
                    </figure>
                    <br><br>
                    <div class="problem">
                        Now here’s a simple problem: if we assume the coefficient of friction (static and kinetic) is
                        $\mu$, what is the frictional force $F_f$?
                        <br><br>
                        You might think it’s $\mu mg$. After all, that was its value for all previous examples. However,
                        this is an incorrect hasty generalization!
                        Recall the formal definition of the frictional force. It wasn’t $\mu mg$, but rather $\mu F_n$!
                        It was merely that $mg=F_n$ held for all of our previous problems. Now that we have that common
                        misconception cleared up, we can now write the value of the frictional force: <br>
                        $f=\mu F_n=\mu mg\cos\theta$ <br>

                        where we established that $F_n=mg\cos\theta$ for an inclined plane.
                    </div>
                    <br><br>
                    <div class="problem">
                        Now, I will pose a slightly more difficult problem. What is the minimum coefficient of (static)
                        friction such that the block will remain at rest on the plane when placed there?
                        Try to solve it yourself before looking at the solution. Keep the assumption that the incline
                        has an angle $\theta$ and the mass of the block is $m$. (And that
                        we're still on Earth, so $g$ is the gravitational acceleration.)
                        <br><br>
                        For the block to remain at rest, there must be zero net force parallel to the plane. We can
                        ignore the perpendicular direction since we know the forces along that axis must be in
                        equilibrium (we don’t see the block levitate or sink into the plane). From this, we write: <br>
                        $mg\sin\theta=F_s$ where <br>
                        $F_s=\mu mg\cos\theta$ <br><br>
                        This simplifies to: <br>
                        $\sin\theta=\mu \cos\theta$
                        <br><br>
                        Dividing both sides by $\cos\theta$ gives us (remember your trig identities!): <br>
                        $\mu=\tan\theta$ <br>
                        <br>
                        This is the minimum coefficient of static friction required to keep the block at rest on the
                        incline. This is a neat result, and it’s quite useful at times as well. To top it off, the
                        derivation isn’t too complex either (you’ll see some very messy derivations later on). T
                        hat’s about it for inclined planes right now. It’s really just force analysis transposed onto a
                        sloped surface.
                    </div>
                    <br><br>
                    <div v-show="level == 2">
                        Now, this is a special part for you calculus students. Calculus can be used to break a curved
                        plane down into infinitesimally small inclined planes by finding the slope of the plane at each
                        point; however, this
                        generally isn’t very useful and rarely used. I will still give a problem though:
                        <br><br>
                        <div class="problem">
                            Consider a surface defined as $y=Cx^2$. Assume the block remains in contact with the
                            surface. Find the equivalent incline
                            angle at each value of $x$, and the magnitude of the acceleration as a function of $x$.
                            <br><br>
                            <figure>
                                <img src="/src/assets/dynamics/Figure 23.png" />
                                <figcaption>Figure 6: A curved incline. This one's parabolic.</figcaption>
                            </figure>
                            <br><br>
                            The incline angle at each point is related to the slope of the curve at each point. You
                            calculus students
                            should be jumping to realize that this is the derivative of the function at each point. (If
                            you're not, you should be! This is one of the
                            very first things you learn in calculus.) The slope of the curve at each point is given by
                            the derivative of the function, which is: <br>
                            $\dfrac{dy}{dx}=2Cx$
                            <br><br>
                            Now, what does the slope exactly have to do with the incline angle? Well, the slope is
                            (instantaneous) rise over run,
                            which astute observers will realize is the exact definition of the tangent of the angle of
                            the incline.
                            Thus, we can write: <br>
                            $\tan\theta=2Cx$ <br>
                            <br>
                            This means that the incline angle at each point is given by: <br>
                            $\theta=\arctan(2Cx)$ <br>
                            <br>
                            Now, we can find the acceleration of the block at each point. The acceleration is given by
                            the component of gravity down the incline, which we have derived before. If you don't
                            remember this, review the earlier parts of the lesson.<br>
                            $a=g\sin\theta$ <br>
                            <br>
                            Now, here comes the trigonometry. Since we know the tangent, we can find the sine by drawing
                            an arbitrary triangle where the tangent is equal to $2Cx$.
                            This is a common trigonometric technique and I assume you know it if you know calculus.
                            <br><br>
                            <figure>
                                <img src="/src/assets/dynamics/Figure 24.png" />
                                <figcaption>Figure 7: A triangle with a tangent of $2Cx$, solving for the sine. (Note
                                    from Eric: I had to manually construct that square root symbol out of lines. If it
                                    looks slightly awkward, blame Canva for not having mathprint.)</figcaption>
                            </figure>
                            From this, we see that the sine is equal to <br>
                            $\sin\theta=\dfrac{2Cx}{\sqrt{(2Cx)^2+1}}$
                            <br><br>
                            Now, we can plug this into the equation for acceleration to get: <br>
                            $a=g\sin\theta=g\dfrac{2Cx}{\sqrt{(2Cx)^2+1}}$
                            <br><br>
                            This looks like a final answer, but the last step is to add a negative sign. The
                            acceleration is negative (toward the origin) when displacement is positive and positive when
                            displacement is negative. So this result actually works on both halves of the parabola!
                            <br><br>
                            $a=-g\dfrac{2Cx}{\sqrt{(2Cx)^2+1}}$
                            <br><br>
                            Couldn't be simpler. (That was sarcasm.) This is certainly a result, but it is not very
                            useful in practice.
                            It is very difficult to solve problems with this, and it is generally not worth the effort.
                            You might think
                            that you can integrate this to find the velocity and position of the block, but that is
                            actually not entirely true.
                            Since the incline is curved, the direction of the acceleration will always be changing, so
                            if you want to integrate
                            this you need to take into account the changing direction of the acceleration. This is far
                            beyond the scope of this lesson, and it is not worth the effort because
                            we will show that there is a much easier way to solve for velocity at any point with energy
                            conservation. But that's later on.
                        </div>
                        <br><br>
                    </div>
                    Now, we'll start to talk about pulleys. Pulleys are a bit more complex, but they’re not too bad once
                    you get the hang of them. Their complexity
                    only really arises if they configuration of pulleys is very complex or messy, which isn't all too
                    common. But before we do that, let's have an
                    interactive element!
                </span>
                <span v-show="level == 0"><h4 class="text-center">Inclined Planes (with friction)</h4>
                    Consider the exact same scenario, but now with friction thrown in. The force-vector diagram now
                    looks like this:
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 22.png" />
                        <figcaption>Figure 5: Friction can no longer be neglected. This is not a drill.</figcaption>
                    </figure>
                    <br><br>
                    You want to first notice that friction is parallel to the incline and not just horizontal. Most
                    people have an
                    easier time understanding this than the previous note about the normal force, but it is still
                    important to keep in mind.
                    <br><br>
                    If you've ever placed something on an incline, you know that normally it'll just slide down the
                    incline. However, if
                    the friction is enough and the incline is not too steep, the object will remain at rest on the
                    incline. You can try this yourself with a book on
                    a tilted surface like a plank of wood.
                    <br><br>
                    There is a mathematical derivation of the minimum coefficient of static friction required to keep
                    the block at rest on the incline, but I will not be going over it here.
                    It is not too complex, but it is a bit messy and requires some trig identities. If you want to see
                    it, you can check out the higher difficulties. The general idea
                    is that the frictional force must equal the component of gravity parallel to the incline, and the
                    normal force is still $F_n=mg\cos\theta$.
                    <br><br>
                    The result is that the minimum static friction is dependent on nothing but the angle of the incline,
                    which may be a shockingly simple result.
                    However, if you think about it, it makes sense. The steeper the incline is, the rougher it needs to
                    be to keep an object
                    at rest on it. A rough plank of cut wood will easily keep a book at rest on it, but a smoother
                    marble or tile slab will not, even
                    at the same angle. The exact mathematical minimum condition is:
                    <br><br>
                    $\mu=\tan\theta$.
                    <br><br>
                    In any case, this is all there really is to inclined planes. It’s just force analysis on a sloped
                    surface, and it’s not too complex once you get the hang of it.
                    Now, we'll move on to pulleys, which are a bit more complex but still not horrible. But first,
                    something interactive.
                    <br><br>
                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page--">&larr;Previous</button>
            </div>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page++">Next&rarr;</button>
            </div>
        </div>
        <div v-show="page === 2">
            <p>
                We've already talked about the inclined plane with and without friction, which covers most of the cases
                that we need to know.
                Therefore, now would be a good time to get some "hands-on" experience with how inclined planes work, in
                order to build
                intuition and confidence in our results. Here's an inclined plane demo you can play around with. See if
                you can reproduce all the results and behaviors
                we've talked about previously!<br><br>
            <figure>
                <h3>Inclined Plane Demo</h3><br>
                <div id="inclined"></div>
                <button class="btn btn-outline-primary" @click="runInclinedPlane()">Reset</button><br>
                <div class="row justify-content-center m-auto" style="max-width:700px;">
                    <div class="col">
                        <label>Incline Angle: {{ inputAngle }}</label><br>
                        <input type="range" class="form-range mx-auto" v-model="inputAngle" min="0" max="90" step="1"
                            style="width:fit-content;" />
                    </div>
                    <div class="col">
                        <label>Friction Coefficient: {{ friction }}</label><br>
                        <input type="range" class="form-range" v-model="friction" min="0" max="1" step="0.01"
                            style="width:fit-content" />
                    </div>
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure><br>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page--">&larr;Previous</button>
            </div>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page++">Next&rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            <p>
                The pulley is a simple device often used to lift heavy objects. It dates back from ancient times, being
                one of the early simple machines.
                But since this is a physics lesson and not a history or engineering lesson, we don't care about that.
                I'm here to show you
                how to analyze the forces behind pulleys and how to solve problems involving them.
                <br><br><h4 class="text-center">The Pulley</h4>
                For now, we only consider massless, frictionless pulleys and massless strings. Let’s use a simple
                one-pulley system to demonstrate the mechanics behind the pulley.
                <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 25.png" />
                <figcaption>Figure 8: A simple one-pulley system, with a very enthusiastic stick figure.</figcaption>
            </figure>
            <br><br>
            Suppose the stick figure pulls down with force F. Then we draw some forces directly onto the diagram:
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 26.png" />
                <figcaption>Figure 9: A simple force-vector diagram of the pulley system. The stick figure has been
                    executed for his-I mean omitted for clarity.</figcaption>
            </figure>
            <br><br>
            Now to find the tension force $T$, all we have to do is to realize that the tension in a string is constant
            throughout its length.
            Note that this isn’t necessarily true for a massive (having mass) rope. Then, seeing as the force applied to
            the string is $F$, we conclude that $F=T$ for the scenario.
            Intuitively, if you pull down with a force equal in magnitude to the block’s weight, it will remain at rest
            in the air.
            You can then do all sorts of force analysis.
            <br><br><h4 class="text-center">Atwood Machines</h4>
            Now I’d like to consider the Atwood machine where two differently-massed objects hang from either side of a
            pulley.
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 27.png" />
                <figcaption>Figure 10: The quintessential Atwood's machine.</figcaption>
            </figure>
            <span v-show="level > 0">
                We will assume $m_2 > m_1$ for this problem. We want to think intuitively about how the block will move
                once released.
                <br><br>
                From experience, you should know that the more massive block will move downward and the
                less massive one will rise. This is useful to keep in mind. Even if you assume the directions
                of acceleration incorrectly, the answer will be correct except for a sign error
                (which is often not important in physics) provided you keep the same assumptions throughout your
                calculations.
                <br><br>
                We will do quantitative force analysis on this scenario now.
                <br><br>
                <div class="problem">
                    Find the acceleration of each block.
                    <br><br>
                    To do this problem, we set the tension at an arbitrary value $T$ since we cannot gauge it directly
                    from the diagram.
                    For the first block, we know that $T>m_1g$ since the block accelerates upward. Therefore, we write:
                    <br>
                    $T-m_1g=m_1a_1$
                    <br><br>
                    Following by similar logic,
                    $m_2g-T=m_2a_2$
                    <br><br>
                    Now, we need to relate the accelerations of the two blocks. The key is to recongize that they
                    are connected by a string, so they must have the same magnitude of acceleration.
                    We can then write $a_1=a_2=a$.
                    <br><br>
                    Now, we can add the two equations together to eliminate $T$:
                    <br>
                    $m_2g-m_1g=(m_1+m_2)a$
                    <br><br>
                    This gives us the acceleration of the blocks:
                    <br>
                    $a=\dfrac{(m_2-m_1)g}{(m_1+m_2)}$
                    <br><br>
                    We can also then find the tension force by plugging this value for $a$ into one of our two
                    previously derived equations:
                    <br>
                    $T=m_1a+m_1g$
                    <br>
                    $T=m_1g(\frac{m_2-m_1}{m_1+m_2}+1)$
                    <br>
                    $T=\frac{2m_1m_2g}{m_1+m_2}$
                    <br><br>
                    You can verify this result by plugging into the other equation and seeing that
                    it comes up with an equivalent result, or by eliminating $a$ in the initial system of
                    equations to solve for $T$.
                </div>
                <br><br>
                Now you may wonder what the force on the pulley is. Well, if we look at the pulley, there is a force $T$
                pulling downward on each side, so it is simply $2T$.
                We didn’t consider this in the above scenario since the pulley was fixed, but this has some very useful
                implications later on.
                <br><br>
                Next, we will consider a system of many pulleys, often used to lift heavy objects.
            </span>
            <span v-show="level == 0">
                Since we are dealing with things conceptually here, we will not do a full mathematical force analysis of
                the scenario. Instead, we will try to develop our intuition for these kinds of problems. From our
                everyday
                experience, we know that the system will tend to accelerate in the direction of the heavier object. That
                is,
                the heavier block will move down while the lighter one moves up.
                <br><br>
                In this scenario, we will assume that $m_2 > m_1$ for simplicity. Since we are not concerned with the
                mathematics of the problem, we can analyze the scenario qualitatively. First, we should note that the
                two
                masses must move together since they are connected by a string. This means the acceleration of both
                blocks is the same!
                <br><br>
                There's not much more to qualitatively analyze about the scenario, so if you want the actual results you
                can
                check out our higher difficulties.
                <br><br>
                Now, we will move on to talk about a more complex system of pulleys, often used to lift heavy objects.
            </span>

            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page--">&larr;Previous</button>
            </div>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page++">Next&rarr;</button>
            </div>
        </div>
        <div v-show="page === 4">
            <h4 class="text-center">More Complex Pulley Systems</h4>
            <p>
                Something more interesting happens when there is more than one pulley involved, specifically when that
                second pulley is allowed to move. For instance, take this scenario:
                <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 28.png" />
                <figcaption>Figure 11: A two-pulley system.</figcaption>
            </figure>
            <br><br>
            This kind of device is called a block and tackle, and it is often used to lift heavy objects. Take a good
            look at
            the diagram and see if you can figure out why it is so useful.
            <br><br>
            <span v-show="level > 0">
                The top left pulley is not allowed to move, but the bottom right one is allowed to move vertically. What
                is the force needed to lift the block of mass $m$?
                <br><br>
                This problem introduces the concept of conservation of string. If one pulls the string down a small
                length $l$, how far does the pulley rise?
                Well, the pulley is not directly attached to a string, but rather has two segments of string around it.
                So, if a length $l$ is pulled downwards, the pulley only rises by $l/2$.
                This, in turn, means that the acceleration of the pulley upward is half of the “acceleration” of the
                string. If you look
                closely, the pulley is actually acted upon by two tension forces, one from each side of the string.
                Thus an applied force of only $mg/2$ is needed.
                <br><br>
                <div class="problem">
                    Now suppose we attach a second block of mass $M$ to the free end of the string, where $M>m$. What is
                    the acceleration of each block? Suppose all strings are vertical (I know it doesn’t look like that
                    on the diagram).
                    <br><br>
                    Mass $m$ is connected to the pulley, so we can essentially treat them as one object and write:
                    <br>
                    $2T-mg=ma_1$ (Remember that the $2T$ term arises because both segments of string on the pulley apply
                    a force of $T$ upward.)
                    <br><br>
                    As for mass $M$, we can simply write:
                    <br>
                    $Mg-T=Ma_2$
                    <br><br>
                    Now we need to use the result from conservation of string to reason that $a_1=a_2/2$, relating the
                    two accelerations.
                    I’ll set $a_1=a$ for convenience.
                    <br><br>
                    $2T-mg=ma$
                    <br>
                    $Mg-T=2Ma$
                    <br><br>
                    Now we need to eliminate $T$, so we’ll do a little algebraic manipulation to derive the result:
                    <br>
                    $(2M-m)g=(4M+m)a$
                    <br><br>
                    This gives us the acceleration of the first block:
                    <br>
                    $a=a_1=\frac{2M-m}{4M+m}g$
                    <br><br>
                    And the acceleration of the second block is simply half of this:
                    <br>
                    $a_2=\frac {2M-m}{2M+m/2}g$
                    <br><br>
                    Solving for $a_2$ first is also a completely valid way to solve this problem, and you should arrive
                    at the same answer.
                </div>
                <br><h4 class="text-center">Conclusion</h4>
                This is one of the more difficult scenarios involving pulleys and is not entirely too common, but it is
                the entire reason why pulleys are so useful in the real world. Additionally (Eric speaking), you should
                be
                prepared to do difficult problems if you are interested in physics. This subject is very demanding, and
                I expect
                nothing less than the best from you. It doesn't matter if you get the answer wrong, as long as you try
                your best and learn from your mistakes.
                Effort is practically required for this course.
                <br><br>
                With that little rant out of the way, we will now move onto adding more complexity to this scenario with
                the introduction
                of a new force that can change, the spring force! This is our first variable force and will expand our
                horizons for force analysis significantly.
            </span>
            <span v-show="level == 0">
                The astute observer will notice that the pulley on the right is not fixed, but rather is allowed to move
                vertically.
                This is a very important distinction, as it allows us to lift heavy objects with a much smaller force
                than the weight of the object.
                Take a close look at the exact setup of the pulley. It has two segments of string on either side of it,
                meaning experiences
                double the force that is exerted on the free end of the string. This lets us lift heavier objects with
                smaller forces.
                <br><br>
                Now is also a good time to introduce the concept of conservation of string. If one pulls the string down
                a small length $l$, how far does the pulley rise?
                Well, the pulley is not directly attached to a string, but rather has two segments of string around it.
                So, if a length $l$ is pulled downwards, the pulley only rises by $l/2$. This may be difficult to
                visualize, but if you keep
                thinking about the physical setup of the pulley, it should make sense.
                This, in turn, means that the acceleration of the pulley upward is half of the “acceleration” of the
                string.
                <br><br><h4 class="text-center">Conclusion</h4>
                That's pretty much all there is to say about this scenario without getting into the mathematics of it.
                There are many similar
                machines that involve pulleys that are allowed to move, but they all follow the same principles. At a
                conceptual level, it is sufficient
                to know where the forces are acting and qualitatively how the objects move.
                <br><br>
                Now that we have discussed the two most common types of setups in physics, we can add another kind of
                force to it: that from a spring, which is a
                coil of metal that is bouncy. (But you already knew that.)
                You're almost at the end of this unit, so let's keep going!
                <br><br>
            </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;"
                    @click="page--">&larr;Previous</button>
            </div>

            <div class="btn-contain-right">
                <RouterLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/spring">Next
                    Lesson!&rarr;</RouterLink>
            </div>
        </div>
    </div>
    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Inclined Plane Problems</h1><br>
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