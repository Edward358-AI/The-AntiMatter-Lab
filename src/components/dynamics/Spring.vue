<script setup>
import Matter, { Constraint } from 'matter-js';
import { ref, vShow, onMounted, vModelDynamic } from 'vue'

defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const stiffness = ref('0.1')
const viewportMsg = ref('')


function runSpring() {
    if (window.innerWidth < 768) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }
    document.getElementById("spring").innerHTML = ""
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    // create an engine
    var engine = Engine.create();

    // create a renderer

    var width = 0.5 * window.innerWidth > 800 ? 800 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 600 / 800 * width;
    var render = Render.create({
        element: document.getElementById('spring'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#000"
        }
    });
    // run the renderer
    Render.run(render);

    var vertX = 200 / 800 * width
    var horY = 300 / 800 * width

    var block1 = Bodies.rectangle(vertX, 200 / 800 * width, 80 / 800 * width, 80 / 800 * width, { render: { fillStyle: '#f55' } })

    var securePoint1 = Bodies.rectangle(vertX, 20 / 800 * width, 120 / 800 * width, 40 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' }
    });

    var block2 = Bodies.rectangle(400 / 800 * width, horY, 80 / 800 * width, 80 / 800 * width, {
        render: { fillStyle: '#1995ff' }
    });
    var securePoint2 = Bodies.rectangle(780 / 800 * width, horY, 40 / 800 * width, 120 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' }
    })

    var ground = Bodies.rectangle(500 / 800 * width, 600 / 800 * width, 1000 / 800 * width, 60 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' }
    });

    var horBarrier = Bodies.rectangle(600 / 800 * width, 360 / 800 * width, 500 / 800 * width, 30 / 800 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' }
    })

    var topBound = Bodies.rectangle(400 / 800 * width, -50 / 800 * width, 1000 / 800 * width, 100 / 800 * width, {
        isStatic: true
    })

    var leftBound = Bodies.rectangle(-50 / 800 * width, 300 / 800 * width, 100 / 800 * width, 1000 / 800 * width,
        {
            isStatic: true
        })

    var rightBound = Bodies.rectangle(850 / 800 * width, 300 / 800 * width, 100 / 800 * width, 1000 / 800 * width,
        {
            isStatic: true
        })

    var constraint1 = Constraint.create({
        bodyA: block1,
        bodyB: securePoint1,
        stiffness: parseFloat(stiffness.value) / 10,
        length: 300 / 800 * width,
        damping: 0,
        render: { strokeStyle: '#fff', lineWidth: 3 }
    });

    var constraint2 = Constraint.create({
        bodyA: block2,
        bodyB: securePoint2,
        stiffness: parseFloat(stiffness.value) / 10,
        length: 200 / 800 * width,
        damping: 0,
        render: { strokeStyle: '#fff', lineWidth: 3 }
    })

    engine.constraintIterations = 1;

    Composite.add(engine.world, [block1, block2, securePoint2, securePoint1, constraint1, constraint2, ground, horBarrier, topBound, leftBound, rightBound])

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        })

    Composite.add(engine.world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

}

onMounted(() => {
    runSpring()
})

</script>


<template>
    <div class="container h100 p-5">
        <h1>Spring Forces</h1><br>
        <p>
        <div v-show="page === 0">
            The spring has been around for quite a while. It's used in all sorts of things like scales, shock dampeners,
            cars, etc. It's useful because it applies a larger force the more it's stretched or compressed, which gives
            it
            flexibility as well as allowing it to store energy. Engineers would tell you more, but this is a physics
            lesson and we'll
            mostly go over the physics of springs rather than the applications.
            <br><br>
            First, a few general assumptions that are true of all springs. All springs have some "natural length" when
            they are not stretched
            or compressed. They also always exert a force that is opposite to the direction they're displaced. While it
            is possible to bend a spring,
            in physics this rarely happens and the intended use of the spring is usually to compress or stretch it. We
            will only be dealing with these
            two cases. In our cases, they are also always massless.
            <br><br>
            In the demo below, you can play with a few systems of springs. These springs look good and realistic, but
            they are not
            really what we're going to deal with. Our springs are always going to be ideal and not lose energy over
            time; these springs seem like
            they lose energy as the blocks oscillate. You can easily see this on your own, which is what I'll let you
            do. It is interactive,
            after all.
            <br><br>
            <figure>
                <h3>Spring Forces Demo</h3><br>
                <div id="spring"></div>
                <button class="btn btn-outline-primary" @click="runSpring()">Reset</button><br>
                <div>
                    <label>Spring Strength: {{ stiffness }}</label><br>
                    <input type="range" class="form-range" v-model="stiffness" min="0.01" max="1" step="0.01"
                        style="width:fit-content" />
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <span v-show="level > 0">
                The most common type of spring you'll see is a Hookean spring, named after English polymath Robert
                Hooke. It involves a spring
                that exerts a force that linearly increases with the displacement of the spring from its equilibrium
                position. The formula for such a spring
                takes the form:
                <br><br>
                $$\vec{F_s} = -k \Delta \vec{x} $$
                <br>
                This does share the same notation with static friction, so we need to be careful to distinguish them.
                The relationships has been bestowed the name
                of <b>Hooke's Law</b>. The first thing you might
                notice is the negative sign. This actually just denotes the direction of the spring force, which is
                oppositely directed to the
                displacement from the natural length. This kind of force is called a <b>restoring force</b> and acts to
                attempt to return
                a system to equilibrium. The constant $k$ is called the spring constant (units $N/m$) which describes
                how strong the
                spring is.
                <br><br>
                Much like a string, a spring will exert an equal force from both ends when pulled on. It actually exerts
                this same force
                across its entire length, a result we'll use later on to deduce what happens if you put multiple springs
                together.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/spring1.png" style="max-width:750px" />
                    <figcaption>Figure 1: A spring exerting an equal force from each end when stretched or compressed.
                    </figcaption>
                </figure>
                <br><br>
                The spring is quite ubiquitous, as it can be oriented any number of ways and varied in number or
                strength in order
                to create a great variety of problems. Indeed, there are many basic dynamics and force analysis
                scenarios that can be modified just by including a spring.
            </span>
            <span v-show="level == 0">
                The spring we're going to talk about most often is one that's called Hookean, meaning that the force it
                exerts
                increases linearly with the stretch of the spring. This means the formula for such a spring is:
                <br><br>
                $$\vec{F_s} = -k \Delta \vec{x} $$
                <br><br>
                This is called <b>Hooke's Law</b>. The negative sign means that the force exerted will be in the
                opposite direction of the displacement from the spring's
                natural length, meaning that it tends to seek equilibrium. Most springs can either be compressed or
                stretched, so make sure
                to keep this in mind when figuring out the direction of the spring force.
                <br><br>
                Much like strings and tension, the spring exerts an equal spring force on both ends and at each point
                across the spring's length. This concept
                is used to determine how to deal with a combination of many springs.
                Analysis can lead to some complex results, but with proper reasoning it's not too difficult to
                understand how to get there.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/spring1.png" style="max-width:750px" />
                    <figcaption>Figure 1: A spring exerting an equal force from each end when stretched or compressed.
                    </figcaption>
                </figure>
                <br><br>
                Now, the idea of springs might seem like a random addition, but I'm going to change that by tying it
                back to something
                we've learned all about in a previous lesson. By adding a spring to an inclined plane, we can make the
                problem
                more interesting.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <div class="problem">
                <span v-show="level > 0">
                    Mr. Greenfin has the bright idea to hang a 10 kg slab of salami from the tip of his house's roof,
                    using a spring of negligible
                    natural length as a
                    support. His roof can be modelled as an inclined plane with incline angle 15° and a length of 2.5
                    meters (as measured along the
                    inclined surface). What is the
                    weakest spring that Mr. Greenfin can use such that the salami doesn't fall off the side of the roof?
                    Assume
                    there is no friction.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/springincline.png" style="max-width:750px" />
                        <figcaption>Figure 2: Mr. Greenfin's devious plan.</figcaption>
                    </figure>
                    <br><br>
                    Now, this problem is just another inclined plane problem. The spring force is merely an addition to
                    the
                    already-existing forces of the inclined plane problem. Now, we know that the condition is that
                    equilibrium is
                    achieved just as the salami is about to fall off, meaning the spring stretched $x = 2.5
                    ~\textrm{m}$.
                    <br><br>
                    We can now do simple force analysis. For the y-direction, it is just like any other inclined plane
                    problem, so we'll
                    skip over this part. Besides, we're interested in the spring and it only acts in the x-direction.
                    The x-direction equation
                    can be written as such:
                    <br><br>
                    $$mg \sin \theta = F_s$$
                    $$mg \sin \theta = k x$$
                    <br>
                    Now, we can simply solve for $k$ here.
                    <br><br>
                    $$k = \dfrac{mg \sin \theta}{x} = \bbox[3px,
                    border: 0.5px solid
                    white]{25.5 ~\textrm{N/m} }$$
                    <br>
                    This is a pretty small minimum value! Most springs have a spring constant strength in the realm of
                    $100 ~\textrm{N/m}$ to $1000 ~\textrm{N/m}$. Mr. Greenfin
                    really didn't set his sights high on this one...
                </span>
                <span v-show="level == 0">
                    Mr. Greenfin wants to hang a slab of salami of mass $m$ off the tip of his roof, for reasons he
                    refuses to
                    disclose. He uses a spring to keep the salami from falling off the roof, which is frictionless. The
                    roof can be
                    considered as an inclined plane with an incline angle of $\theta$ and a length as measured along the
                    diagonal. What is the weakest spring he can use? Assume the spring's natural length is very short.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/springincline.png" style="max-width:750px" />
                        <figcaption>Figure 2: Mr. Greenfin's devious plan.</figcaption>
                    </figure>
                    <br><br>
                    Since this is just an inclined plane with a spring throwin in, we can do simple force analysis. The
                    maximum stretch of the spring is $L$, since if it stretches more than that
                    the salami will fall off. For the y-direction, it is just like any other inclined plane problem, so
                    we'll
                    skip over this part. Besides, we're interested in the spring and it only acts in the x-direction.
                    The x-direction equation
                    can be written as such:
                    <br><br>
                    $$mg \sin \theta = F_s$$
                    $$mg \sin \theta = k x$$
                    <br><br>
                    Now, you might be wondering why I didn't have the negative sign that's present in Hooke's law. This
                    is because the negative sign is
                    only telling us direction, and we have already accounted for direction with our expression (the
                    spring force is in the opposite direction
                    as the component of gravity down the incline). Doing some algebra allows us to arrive at the answer
                    relatively simply:
                    <br><br>
                    $$k = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac{mg \sin \theta}{x}}$$
                    <br>
                    This problem was much harder than the ones at this level before! I wanted to give you a taste of
                    what actual, quantitative force analysis feels like,
                    just to see if you'd be comfortable doing it. Besides, there's not much to do conceptually with this
                    problem. If you felt comfortable doing this, I
                    reccomend moving up to our Algebra-Based level, as this analysis was very similar to the things
                    happening at that level on a regular
                    basis.
                </span>
            </div>
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
            I want to introduce the idea of combinations of springs. For any combination of springs, we can replace
            the combination with a single spring that has the same effect as the whole combination. This single spring
            must have a spring constant equal to the <b>effective spring constant</b> $k_{eff}$ of the combination. The
            manner of calculating this constant is what we'll explore here.
            <br><br>
            First, we have to define the two kinds of possible combinations. The first is a <b>parallel</b>
            combinations, which
            simply involves springs placed side-by-side. The other is the <b>series</b> combination, which involves
            springs connected
            end-to-end. The visual should help hammer home this idea.
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/springseriesparallel.png" style="max-width:750px" />
                <figcaption>Figure 3: Series versus parallel.</figcaption>
            </figure>
            <br><br>
            <span v-show="level > 0">
                To derive the formulas for the effective spring constant of springs in series or parallel, we have to
                take a
                look at what happens to the connected springs when they are stretched. The parallel case is much
                simpler, but
                I <b>will</b> be showing you both. You cannot stop me.
                <br><br>
                The parallel case involves the <b>same stretch</b> for all the springs. If you look closely at how
                parallel springs are connected (side-by-side),
                this should be obvious. (We are assuming the stretch on the rod connecting all the springs is uniform,
                meaning the rod stays perpendicular
                to all the springs.) Since the stretch is constant, the total force exerted by all the springs is:
                <br><br>
                $$F = k_1x+k_2x+k_3x+...$$
                <br>
                This is equivalent to one spring stretched $x$ with effective spring constant:
                <br><br>
                $$k_{eff} = k_1 + k_2 + k_3 +...$$
                <br>
                This leads us to conclude that <b>the effective spring constant for springs connected in parallel is the
                    sum of their
                    individual spring constants.
                </b>
                <br><br>
                Similar reasoning can be used for the case of springs in series. However, this time the stretch of each
                spring isn't the same, but
                something else is. What this constant quanitity is often isn't immediately obvious. However, consider
                that each point of the entire
                combination is in equilibrium. This means the spring force of each spring is the same, since at the
                contact points between any two
                springs equilibrium conditions must be satisfied. Therefore, we can write:
                <br><br>
                $$F_s = ~\textrm{const.}= k_1x_1 = k_2x_2 = k_3x_3 = ...$$
                <br>
                Recall that each springs individually stretches some amount, so the total stretch $x$ is their sum.
                <br><br>
                $$ x = x_1 + x_2 + x_3 + ...$$
                <br>
                $$x = \dfrac{F_s}{k_1} + \dfrac{F_s}{k_2} +\dfrac{F_s}{k_3} +...$$
                <br><br>
                Since $F_s = k_{eff} x$, we can now write:
                <br><br>
                $$\dfrac{F_s}{k_{eff}} = \dfrac{F_s}{k_1} + \dfrac{F_s}{k_2} +\dfrac{F_s}{k_3} +...$$
                <br>
                $$ \dfrac{1}{k_{eff}} = \dfrac{1}{k_1} + \dfrac{1}{k_2} +\dfrac{1}{k_3}+...$$
                <br><br>
                This tells us that the <b>reciprocal of the equivalent spring constant for springs connected in series
                    is the sum of the
                    reciprocals of the individual spring constants.
                </b> (What a mouthful!)
                <br><br>
                <div class="problem">
                    You cut a spring of spring constant $k$ in half. What is the spring constant
                    of each of the two half-springs? (Think about what this is equivalent to!)
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/springcut.png" />
                        <figcaption>Figure 4: Cutting a spring in half.</figcaption>
                    </figure>
                    <br><br>
                    Cutting a spring in half produces two identical half-springs. We can reverse this logic to conclude
                    that the
                    original spring is a series combination of two of these half-springs, which we'll say have a spring
                    constant of
                    $k_h$. Therefore:
                    <br><br>
                    $$\dfrac{1}{k} = \dfrac{1}{k_h} + \dfrac{1}{k_h}$$
                    $$\dfrac{1}{k} = \dfrac{2}{k_h}$$
                    $$\bbox[3px,
                    border: 0.5px solid
                    white]{k_h = 2k}$$
                    <br>
                    This means that cutting a spring in half doubles its effective spring constant!
                </div>
            </span>

            <span v-show="level == 0">
                Deriving the equations for how to treat combinations of springs in series or parallel requires rigorous
                logic
                and mathematical reasoning, which is a little beyond the scope of our conceptual understanding.
                Nevertheless, I will
                walk through the basics of the logic behind each result.
                <br><br>
                For springs in <b>parallel</b>,
                each spring exerts a force directly on the object because they're all directly connected to it (refer to
                the diagram above), meaning
                adding springs should make the force stronger. The exact reasoning to derive the effective spring
                constant for parallel springs uses
                the fact that all the springs stretch the same amount since they're side by side, but we won't be going
                into the math. The result we get is:
                <br><br>
                $$k_{eff} = k_1 + k_2 + k_3 +...$$
                <br>
                In other words, the <b>effective spring constant of springs in parallel is the sum of the individual
                    spring constants.</b>
                <br><br>
                The result for springs in <b>series</b> is a little more complicated. See, for springs in series only
                one spring is connected to and directly acts on the
                object. However, throughout the entire series of springs the force has to remain the same because of
                equilibrium conditions, meaning each
                spring exerts the same force.
                <br><br>
                The total stretch $x$ is the sum of <u>all</u> of the individual stretches and the effective spring
                constant is
                defined such that $k_{eff} x = F_s$, and since $x$ is large due to it being a sum $k_{eff}$ is smaller
                than any
                individual spring constant. Also, it tends to get smaller the more springs you add because that
                increases the total
                stretch $x$. The relation that we end up getting is complex, but it follows this rule.
                <br><br>
                $$ \dfrac{1}{k_{eff}} = \dfrac{1}{k_1} + \dfrac{1}{k_2} +\dfrac{1}{k_3}+...$$
                <br><br>
                This relation is complicated. It tells us that the <b>reciprocal of the equivalent spring constant for
                    springs connected in series is the sum of the
                    reciprocals of the individual spring constants.
                </b> (What a mouthful!) It's probably easier just to look at the equation than try to put it into words.
            </span>
            <br><br>
            Now, with springs fully covered, we can move on from this long (but important!) unit and finally begin to
            talk
            about something new. The second unit, which is also considered one of the hardest and most crucial units in
            all
            of mechanics, is now finally complete, but the next unit is still centered around forces, albeit very
            special
            ones. So, if you're ready, let's jump right into circular motion and gravitation!
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
        </p>
    </div>

</template>


<style scoped></style>