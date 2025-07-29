<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import { onMounted, onUnmounted, ref, watch } from 'vue'
const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const viewportMsg = ref('')

let yoyo

const inputInertia = ref(15)
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let momentInertiaUpdateHandler = null

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events


function runMoInertia() {
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
    document.getElementById("inertia").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup

    engine.gravity.y = 0

    var width = 0.5 * window.innerWidth > 600 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('inertia'),
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

    var yoyoCircle = Bodies.circle(300 / 600 * width, 300 / 600 * width, 200 / 600 * width, { render: { fillStyle: '#f39c12' } });

    var yoyoOverlay = Bodies.circle(300 / 600 * width, 300 / 600 * width, 150 / 600 * width, { render: { fillStyle: '#e67e22' } })

    var yoyoCenter = Bodies.circle(300 / 600 * width, 300 / 600 * width, 50 / 600 * width, { render: { fillStyle: '#e74f00' } });

    var spoke1 = Bodies.rectangle(300 / 600 * width, 300 / 600 * width, 400 / 600 * width, 10 / 600 * width, { render: { fillStyle: '#ff5151' } });
    var spoke2 = Bodies.rectangle(300 / 600 * width, 300 / 600 * width, 400 / 600 * width, 10 / 600 * width, { render: { fillStyle: '#ff5151' }, angle: Math.PI / 2 });

    var inertia = inputInertia.value * 1000 / 600 * width
    yoyo = Body.create({
        parts: [yoyoCircle, yoyoOverlay, spoke1, spoke2, yoyoCenter],
        mass: 2,
        frictionAir: 0.001,
        friction: 0.5,
        restitution: 0.1,
        inertia: inertia
    });

    Composite.add(engine.world, [yoyo]);

    // Define the moment of inertia update handler
    momentInertiaUpdateHandler = function () {
        // Torque pair to spin the object
        var stringForce1 = { x: 0, y: 0.0001 };
        var stringForce2 = { x: 0, y: -0.0001 };

        var offset = { x: 20 / 600 * width, y: 0 };
        var point1 = {
            x: yoyo.position.x + offset.x,
            y: yoyo.position.y + offset.y
        };
        var point2 = {
            x: yoyo.position.x - offset.x,
            y: yoyo.position.y - offset.y,
        }
        Body.applyForce(yoyo, point1, stringForce1);
        Body.applyForce(yoyo, point2, stringForce2)
    }

    Events.on(engine, 'beforeUpdate', momentInertiaUpdateHandler);

    // create runner
    var runner = Runner.create()
    currentRunner = runner // Store reference for cleanup

    Runner.run(runner, engine)
    // run the engine
    Runner.run(runner, engine);

}

onMounted(() => {
    runMoInertia()
})

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Remove event listeners
        if (momentInertiaUpdateHandler) {
            Events.off(currentEngine, 'beforeUpdate', momentInertiaUpdateHandler)
            momentInertiaUpdateHandler = null
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

watch(inputInertia, (newVal) => {
    if (yoyo) {
        Body.setInertia(yoyo, Math.abs(newVal) * 1000 )
    }
})

</script>


<template>
    <div class="container h100 p-5">
        <h1>Moment of Inertia</h1><br>
        <p>
        <div v-show="page === 0">
            What does the moment of inertia do? This demo with a virtual wheel should explain to you how it affects
            motion. I have it set up so there's a
            constant torque acting on the object, and you can move the slider to simulate the body's moment of inertia
            changing. Be sure to reset after
            putting the slider at a new value.
            <br><br>
            <figure>
                <h3>Moment of Inertia Demo</h3><br>
                <div id="inertia"></div>
                <button class="btn btn-outline-primary" @click="runMoInertia()">Reset</button><br>
                <label>Moment of Inertia: {{ inputInertia }}</label><br><input type="range" v-model="inputInertia"
                    class="form-range" min="1" max="500" step="1" style="width:fit-content" /><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            You might have seen that the higher the moment of inertia, the harder it is to rotate the object. This makes
            the moment of inertia
            much like mass in this regard, but mass isn't the only part of it! Instead, the moment of inertia is
            actually affected
            both by mass itself and how that mass is distributed in a rigid body. Thus, two objects with the same mass
            may have different moments of inertia!
            <br><br>
            <span v-show="level > 0">
                The most technical definition for the moment of inertia is that it is the second moment mass. You
                probably don't remember this, but I
                briefly mentioned that the center of mass is the first moment of mass (normalized by total mass), which
                may lead you
                to see a pattern. In any case, the formula for the moment of inertia of a point object of mass $m$ at a
                distance $r$ from the
                axis of rotation can be given by:
                <br><br>
                $$ I = mr^2$$
                <br>
                Now, this is useful if you have objects that can be treated like point masses. However, most of the time
                we have rigid objects, which
                means we need to sum over all of the moments of inertia within. This can be written as a summation:
                <br><br>
                $$ I = \sum m_i {r_i}^2 $$
                <br>
                This definition is a bit clunky and difficult to understand, so I'll break it down. Essentially, you
                look at each point on the object and
                note how far it is from the center of rotation. Then, you add up each individual point object. Yes, the
                actual process inherently
                requires calculus, but this method of summations can work for a combination of many point objects.
                <br><br>
                Let's try this technique for the simplest example. You won't actually have to do any calculation if you
                realize what's being
                asked. This shape is the simplest possible in terms of moment of inertia, and for all others calculus is
                required to derive
                their moments of inertia.
                <br><br>
                <div class="problem">
                    What is the moment of inertia of a thin hoop (mass $m$, radius $r$) about an axis through its center
                    of mass and perpendicular to it?
                    <br><br>
                    <figure>
                        <img src="/src/assets/rotation/Figure 83.png" />
                        <figcaption>Figure 1: The hoop, a very simple object.</figcaption>
                    </figure>
                    <br>
                    We consider the hoop as infinitely thin, meaning it is just a collection of points located a
                    distance $r$ from the center of the ring. It has
                    no thickness, so we can consider <b>all</b> of the hoop's mass as being contained in its rim. Even
                    if real-world objects aren't infinitely thin, we
                    can usually approximate them to be if they are thin enough.
                    <br><br>
                    The rim is located a constant distance $r$ from the center, which allows us to conclude:
                    <br><br>
                    $$\bbox[3px,
                    border: 0.5px solid
                    white]{I = mr^2} $$
                    <br>
                    The rotating ring is equivalent to a rotating point mass! We typically don't think of them as
                    rotating the same way, but that's because while gravity
                    effectively acts at the center for a ring (which causes no torque), while it acts at the point
                    mass's location in that case (which usually does cause a torque). We
                    need a combination of many concepts to effective analyze rotation.
                </div>
                <span v-show='level == 2'>
                    <br>
                    Of course, we can also use an integral in this case. Instead of writing a summation, we write
                    something similar to the
                    integral we had for center of mass:
                    <br><br>
                    $$ I = \int r^2 dm $$
                    <br>
                    A few key differences are present here as opposed to center of mass. For one, the moment of inertia
                    doesn't care about direction and the $r$ is
                    not treated as a vector, mainly because it's squared. Therefore, we don't have to consider position
                    $r$ as a vector when setting up the integral. Otherwise, the
                    approach is pretty much the same.

                </span>
            </span>
            <span v-show="level == 0">
                The formula for the moment of inertia of a very small point object is very simple. It considers the mass
                $m$ of the object and
                the distance of the object from the axis of rotation $r$.
                <br><br>
                $$ I = mr^2$$
                <br>
                This definition is deceptively simple. While yes, it is very accurate, it only accounts for points. To
                find the moment of
                inertia of rigid bodies like disks, spheres, or cylinders, we need to sum over every single point in an
                object to find the
                total moment of inertia. This is no small feat and requires calculus, so for the most part we'll skip
                over this.
                <br><br>
                There is one notable example that can be done with clever reasoning, without having to invoke any
                complex math.
                <br><br>
                <div class="problem">
                    What is the moment of inertia of a very thin hoop (mass $m$, radius $r$) about an axis through its
                    center of mass and perpendicular to it? You
                    can assume the hoop is just made up of a ring of point masses.
                    <br><br>
                    <figure>
                        <img src="/src/assets/rotation/Figure 83.png" />
                        <figcaption>Figure 1: The hoop, a very simple object.</figcaption>
                    </figure>
                    <br>
                    We consider the hoop as infinitely thin, meaning it is just a collection of points located a
                    distance $r$ from the center of the ring. It has
                    no thickness, so we can consider <b>all</b> of the hoop's mass as being contained in its rim.
                    <br><br>
                    The entire rim is located a constant distance $r$ from the center, which allows us to conclude that
                    each point has the same moment of
                    inertia. Moreover, the entire mass $m$ of the object is at a distance $r$ from the axis of rotation,
                    letting us write:
                    <br><br>
                    $$\bbox[3px,
                    border: 0.5px solid
                    white]{I = mr^2} $$
                    <br>
                    The rotating ring is equivalent to a rotating point mass! We typically don't think of them as
                    rotating the same way, but that's because while gravity
                    effectively acts at the axis of rotation for a ring (which causes no torque), while it acts at the
                    point mass's location in that case (which usually does cause a torque, because
                    the point mass isn't usually at the axis of rotation!).
                    <br><br>
                    You can see that one concept isn't enough to describe the full picture. We need to combine many to
                    do meaningful analysis.
                </div>
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            Before we talk about the moments of inertia of common objects, we should establish a solid conceptual
            baseline for what affects moment of inertia. We need to know how each part of the formula functions.
            <br><br>
            <span v-show="level > 0">
                We have seen the definition of moment of inertia as being proportional to mass and radius squared. This
                is
                true in general, and for all objects the general form is followed, just with some numerical factor added
                in front. In our
                analysis, we will ignore the effect of mass on the moment of inertia since we know that adding mass
                increases it and vice
                versa. Thus, we can write:
                <br><br>
                $$ I \propto r^2 $$
                <br>
                Recall that this definition really is applied to each point mass, not just the entire object. Therefore,
                we see that moment of inertia
                is greater when more parts of the object are at a greater radius from the axis of rotation. This is what
                I meant when I said
                moment of inertia is affected by how mass is distributed within an object. Objects with more mass
                distributed closer to the edges of the
                material will tend to have a greater moment of inertia than similar objects that have a more uniform
                distribution.
                <br><br>
                As a simple example, the moment of inertia of a
                solid, thin disk is less than that of a hoop with the same mass and radius because the disk has more of
                its mass distributed closer to
                the center of rotation, while the hoop has all of it at the maximum distance $r$ from the axis.
                <br><br>
                Another somewhat unrelated idea is that liquids tend to contribute very little, which we approximate as
                nothing, to the moment of inertia
                when rotating about their center of mass. If you spin a can full of juice around its center, the can
                moves but the liquid inside tends to stay
                level, which is evidence that it isn't really rotating. However, liquids can still contribute a
                nontrivial amount of moment of inertia under
                some situations.
            </span>
            <span v-show="level == 0">
                We have seen that the formula for the moment of inertia is directly related to the distance of each
                point mass within
                a rigid object. This means that if more mass is concentrated around the outer edges of the material, the
                moment of inertia will
                be greater because more of the mass is located further away from the axis of rotation.
                <br><br>
                Even if the actual radius of the object isn't changed, the moment of inertia will increase depending on
                how mass is distributed. This is why
                a hoop has a greater moment of inertia than a solid disk of the same mass and radius, because the hoop
                has all of its mass distributed
                at its edges while the disk has it uniformly distributed, with some being closer to the axis of
                rotation.
            </span>
            <br><br>
            Now that we have an understanding of the factors outside of total mass that affect moment of inertia, I will
            propose a practice
            problem in order to test your understanding of this topic. These questions are purely conceptual and do not
            require significat calculations to solve.
            <br><br>
            <div class="problem">
                Which would have a greater moment of inertia: a thin pipe or a thick pipe of the same mass and radius?
                <br>
                <span>
                    <div v-show="show" class='answer' style="width:fit-content">
                        <strong>Answer:</strong> The thin pipe, because it has more of its mass distributed at a greater
                        distance from the center.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br>
                Which mode of rotation for a long, thin rod has a greater moment of inertia: about its center or about
                its end?
                <br>
                <span>
                    <div v-show="show1" class='answer' style="width:fit-content">
                        <strong>Answer:</strong> Spinning about its end produces a greater moment of inertia because the
                        maximum distance from the axis of rotation
                        becomes the entire length of the rod. If it was about its center, then the max distance would
                        only be half of the length.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br>
                Consider a hoop of mass $m$ and radius $r$. Now, we double the radius of the hoop but halve its mass.
                What happens?
                <br>
                <span>
                    <div v-show="show2" class='answer' style="width:fit-content">
                        <strong>Answer:</strong> The moment of inertia is doubled, since it directly depends on mass and
                        the <b>square</b> of the radius.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br>
                A fly lands on the edge of a CD player and begins to walk towards its center. How does the moment of
                inertia of the CD change?
                <br>
                <span>
                    <div v-show="show3" class='answer' style="width:fit-content">
                        <strong>Answer:</strong> It decreases, because the distance of the fly from the center is
                        steadily decreasing.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show3 = !show3">{{ show3 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br>
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
            You must memorize the moments of inertia of the common objects! They are rarely provided to you, and they
            should be common knowledge. Thankfully, these expressions are not awfully complex and can be pretty easily
            memorized
            with practice. The shapes in question are also relatively simple ones, like cylinders, rods, and spheres.
            For the later chapters,
            I <b>will not</b> provide the moments of inertia of these objects.
            <br><br>
            Let's start by diagramming the different shapes we're going to be dealing with, as well as the axes of
            rotation
            that we care about.
            <br><br>
            <figure>
                <img src="/src/assets/rotation/Figure 84.png" style="max-width:750px" />
                <figcaption>Figure 2: The most important objects for rotation.</figcaption>
            </figure>
            <br>
            We're starting from the top left and going by rows until we cover all six shapes.
            <br><br>
            <span v-show="level > 0">
                The first shape may look familiar to you. It's the hoop from earlier! We already know the formula for
                it:
                <br><br>
                $$ I = MR^2 $$
                <br>
                This actually applies to a long, hollow cylinder as well. That's because the moment of inertia formula
                accounts for distance
                from the axis of rotation, and the axis is a long line. Thus, for a cylinder the cross-sectional shape
                would be the same, and the
                moment of inertia would also be the same. The distance from the axis to the walls of the cylinder is the
                same as for a hoop.
                <br><br>
                The second shape is the solid disk. It has been talked about briefly before, but we haven't talked about
                its actual moment of inertia.
                <span v-show="level == 2">The calculus for this one is simple, so we'll do it as an example. The mass is
                    $M$, and the radius is $R$.
                    <br><br>
                    Consider integrating outwards from the center in thin rings of thickness $dr$. Each ring has some
                    mass that can be found due to the
                    fact that the disk is uniform. By using the rules of density, we find that the mass $dm$ of each
                    individual ring can be
                    written as:
                    <br><br>
                    $$dm = \dfrac{M}{\pi R^2} 2\pi r dr $$
                    <br>
                    Remembering our definition for how to find the moment of inertia, we can write:
                    <br><br>
                    $$ I = \int r^2 dm = 2 \pi \dfrac{M}{\pi R^2} \int r^3 dr $$
                    <br>
                    Now, we just integrate from $r = 0$ to $r = R$ and we will get our answer.
                    <br><br>
                    $$ I = \dfrac{2M}{R^2}\left[ \dfrac{r^4}{4}\right] |_0^R $$<br>
                </span>
                The moment of inertia of a solid disk is less than that of a thin hoop, as expected. In fact, it is
                exactly half of
                that for a hoop of the same radius and mass:
                <br><br>
                $$ I = \dfrac12 MR^2 $$
                <br>
                Like the thin ring and hollow cylinder, the thin disk and the solid cylinder share the formula above for
                the same reason. I find
                that the hollow cylinder is a little less common, but the solid cylinder is a very commonly used shape.
                It's also a shape you'll see
                often in the real world.
                <br><br>
                Our next shape is the thin rod rotated about its center. For this one, we usually use $L$ to denote the
                entire length
                of the rod. <span v-show="level == 2">It's possible to derive the formula for this one as well relatively
                    simply, but I'll
                    leave this for you to do on your own if you're interested.
                </span>
                <br><br>
                $$ I = \dfrac{1}{12} ML^2 $$
                <br>
                This result technically only works for an infinitely thin (one-dimensional, to be precise) rod, but when
                an object is thin enough we usually use this
                as a good enough approximation.
                <br><br>
                Next is the same rod, rotated about one of its ends. As you would expect, the moment of inertia is much
                greater for this
                case. It's what we explained in the question back on the previous page, after all!
                <br><br>
                $$ I = \dfrac13 ML^2 $$
                <br>
                The next two shapes see us returning to circular-ish objects. However, spheres and circles are only
                similar, not identical! First, we have the solid sphere of radius $R$ rotated about a diameter.
                The moment of inertia of this shape is equal to:
                <br><br>
                $$ I = \dfrac{2}{5} MR^2 $$
                <br>
                This is the smallest factor in front of $MR^2$ that you'll see in this list, and it's because a solid
                sphere has a lot of its mass
                concentrated closer to the center than the other shapes on this list.
                <br><br>
                Next is our spherical shell of radius $R$. It might look superficially similar to the solid sphere, but
                it is completely hollow, only
                being a very thin shell. Its moment of inertia is larger than that of the solid sphere as you would
                expect, and equal to:
                <br><br>
                $$ I = \dfrac{2}{3} MR^2 $$
                <br>

            </span>
            <span v-show="level == 0">
                The first shape may look familiar to you. It's the hoop from earlier! We already know the formula for
                it:
                <br><br>
                $$ I = MR^2 $$
                <br>
                The second shape is the solid disk. It has been talked about briefly before, but we haven't talked about
                its actual moment of inertia. It's
                actually exactly half the moment of inertia of a thin hoop of the same mass and radius:
                <br><br>
                $$ I = \dfrac12 MR^2 $$
                <br>
                Our next shape is the thin rod rotated about its center. For this one, we usually use $L$ to denote the
                entire length
                of the rod.
                <br><br>
                $$ I = \dfrac{1}{12} ML^2 $$
                <br>
                Next, the same rod is rotated about its end. You should recall that we said the moment of inertia should
                be larger.
                <br><br>
                $$ I = \dfrac13 ML^2 $$
                <br>
                Next, we have the solid sphere of radius $R$ rotated about a diameter.
                The moment of inertia of this shape is equal to:
                <br><br>
                $$ I = \dfrac{2}{5} MR^2 $$
                <br>
                This is the smallest multiplier in front of $MR^2$ that you'll see in this list, and it's because a
                solid sphere has a lot of its mass
                concentrated closer to the center than the other shapes on this list.
                <br><br>
                Finally, we have the same sphere but hollow. As with the solid disk and hoop, the hollow shell has a
                much greater moment of inertia.
                <br><br>
                $$ I = \dfrac{2}{3} MR^2 $$
                <br>
            </span>
            That's all of the shapes that you need to know the moments of inertia for! Here's a concise chart with each
            shape and its
            moment of inertia for easy reference. I know you'll probably be needing it until you memorize all of them.
            <br><br>
            <figure>
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
                            <th>Object</th>
                            <th>Moment of Inertia ($I$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ring / Hollow Cylinder</td>
                            <td>$ MR^2 $</td>
                        </tr>
                        <tr>
                            <td>Disk / Solid Cylinder</td>
                            <td>$\dfrac12 MR^2$</td>
                        </tr>
                        <tr>
                            <td>Rod (about center)</td>
                            <td>$\dfrac{1}{12}ML^2$</td>
                        </tr>
                        <tr>
                            <td>Rod (about end)</td>
                            <td>$ \dfrac{1}{3} ML^2$</td>
                        </tr>
                        <tr>
                            <td>Solid Sphere</td>
                            <td>$\dfrac{2}{5} MR^2$</td>
                        </tr>
                        <tr>
                            <td>Hollow Sphere</td>
                            <td>$\dfrac{2}{3} MR^2$</td>
                        </tr>
                    </tbody>
                </table>

            </figure>
            <br>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            We're not quite done just yet. See, we need to talk about how moment of inertia changes with a choice of
            rotation
            axis. There are a few different results that are useful for finding moment of inertia through an axis that
            isn't the
            conventional one.
            <br><br>
            <span v-show="level > 0">
                The first of these is the <b>parallel axis theorem</b>. This allows us to find the moment of inertia of
                an object about
                an axis that is parallel to the one through the center of mass. It is relatively simple. We'll define
                the center-of-mass inertia as
                $ I_{cm} $, the new moment of inertia as $ I$, the mass as $M$ and the distance that the new axis is
                from the center of mass
                as $d$.
                <br><br>
                $$ I = I_{cm} + M d^2 $$
                <br>
                <figure>
                    <img src='/src/assets/rotation/Figure 85.png' />
                    <figcaption>Figure 3: The parallel axis theorem.</figcaption>
                </figure>
                <br>
                This theorem implies that the axis through the center of mass is the axis where the moment of inertia is
                least, since
                an additional term of $Md^2$ is added for any other axis. We can then conclude that objects that are
                sent spinning without any
                constraints on their rotation will rotate about their center of mass since in that case the moment of
                inertia will be the least through
                that axis. Nature
                tends to want to minimize things (think back to potential energy), and this is no exception.
                <br><br>
                <span v-show="level == 2">
                    There is a way to derive this theorem using a bit of basic calculus combined with some clever logic.
                    We can write the moment of inertia through an arbitrary axis parallel
                    to the center-of-mass axis as an integral. We will define the distance to the axis as $r'$, distance
                    to the center of mass as $r_{cm}$, and
                    distance between the axes as $d$.
                    <br><br>
                    $$ I' = \int {r'}^2 dm $$
                    <br>
                    We can re-write $r'$ in terms of other variables. Everything is technically a vector here, but I
                    have just neglected to put
                    vector arrows on them. According to vector addition rules, $r' = r_{cm} + d$, so we put this into
                    our equation, remembering that $d$ is
                    a constant.
                    <br><br>
                    $$ I' = \int (r_{cm} + d)^2 dm = \int {r_{cm} }^2 dm + 2d\int r_{cm} dm + d^2 \int dm $$
                    <br>
                    Now, it's time for analysis. The first integral is actually just the center of mass moment of
                    inertia $I_{cm}$ if you
                    look at it, since it only accounts for distance from the center of mass. The second term is an
                    integral for center of mass, but we're
                    considering distance from the center of mass to it, which means it will inevitably evaluate to zero.
                    The final integral is just the
                    total mass of the object. Thus, we have:
                    <br><br>
                    $$ I' = I_{cm} + Md^2 $$
                    <br>
                    We just proved the result!
                    <br><br>
                </span>
                This theorem is quite commonly seen and used in quite a variety of cases. It's mostly applied to the six
                objects that we already know the
                moments of inertia of, in situations where the axis of rotation is slightly deflected off-center.
                <br><br>
            </span>
            <span v-show="level == 0">
                We first have the parallel-axis theorem, which does exactly what it sounds like. It lets us find moments
                of inertia
                through axes that are parallel to the center-of-mass rotational axis. This is actually incredibly
                useful, as it means
                we don't have to "derive" the moment of inertia for every new rotational axis.
                <br><br>
                The moment of inertia $I'$ through the new axis is expressed in terms of the center-of-mass inertia
                $I_{cm}$, the object's mass $M$, and
                the distance of the new axis from the center of mass $d$. The relation is pretty simple:
                <br><br>
                $$ I' = I_{cm} + Md^2 $$
                <br>
                <figure>
                    <img src='/src/assets/rotation/Figure 85.png' />
                    <figcaption>Figure 3: The parallel axis theorem.</figcaption>
                </figure>
                <br>
                The theorem mostly applied to the six objects that we already know the
                moments of inertia of, in situations where the axis of rotation is not where it usually is. A simple
                example is
                coming right up.
                <br><br>
            </span>
            <div class="problem">
                Show that the moment of inertia for a uniform rod of mass $M$ and length $L$ rotated about its end is $I
                = \frac{1}{3}ML^2$, given that
                the moment of inertia for the rod about its center is $I = \frac{1}{12}ML^2$. (I gave you the moments so
                you don't just write down the
                answer. You need to <b>show</b> that this is true!)
                <br><br>
                What we essentially have here is an application of the parallel-axis theorem. The distance between the
                axis through the center of mass
                and the axis through one end is half the length of the rod, $d = L/2$. We can then just plug this into
                the formula.
                <br><br>
                $$ I = \dfrac{1}{12} ML^2 + M \left( \dfrac{L}{2}\right)^2 = \dfrac{1}{12} ML^2 + \dfrac14 ML^2$$
                <br>
                $$ \bbox[3px,
                border: 0.5px solid
                white] {I = \dfrac13 ML^2} $$
                <br>
                That's all you need to do!
            </div>
            <br>

            <span v-show="level > 0">
                There is one small thing to keep in mind. If you want to find the moment of inertia about an axis not
                through the center of mass
                but are given the moment of inertia through another axis that is parallel to it but doesn't pass through
                the center of mass, then you
                need to find the center of mass inertia $I_{cm}$ <b>first</b> by using the theorem, then use the theorem
                <b>again</b> to find the new inertia. You cannot
                just directly use the distance between the two axes, because neither of them is the center-of-mass axis
                in that case.
                <br><br>
                There is another theorem, but it is a bit more advanced and much less common. It takes the name of
                <b>perpendicular axis theorem</b>, and as
                you might expect it describes axes that are perpendicular to each other.
                <br><br>
                The axis hinges on the idea of three moments of inertia about three axes: the x-direction axis $I_x$,
                y-direction axis $I_y$, and z-direction
                axis $I_z$. These directions are defined with the z-direction being perpendicular to the plane of the
                object in question, while the
                other two follow standard coordinate axis rules. The object must also be planar (flat) for us to apply
                the theorem.
                <br><br>
                The relationship between the three inertias is as follows:
                <br><br>
                $$ I_z = I_x + I_y $$
                <br>
                <figure>
                    <img src="/src/assets/rotation/Figure 86.png" />
                    <figcaption>Figure 4: The perpendicular axis theorem.</figcaption>
                </figure>
                <br>
                This theorem is relatively simple, so we'll jump straight into a short example problem to demonstrate
                how it works.
                <br><br>
                <div class="problem">
                    What is the moment of inertia of a disk through an axis that lies <b>in the plane of the disk</b>
                    and runs through its
                    center of mass?
                    <br><br>
                    This problem requires some of your imagination, as well as our old friend symmetry. The axis is in
                    the plane of the disk, meaning it runs
                    through its middle lengthwise. This makes it either $I_x$ or $I_y$ in our formula, and we know that
                    $I_z = \dfrac12 MR^2$. But which
                    one is it?
                    <br><br>
                    Symmetry comes to save the day. It can be either, because the circle has a very high degree of
                    symmetry! If we draw an axis in the same plane of the circle
                    but perpendicular to our original one, it will essentially be the same as our original axis.
                    Therefore, $I_x = I_y$, and we can write:
                    <br><br>
                    $$ I_z = \dfrac12 MR^2 = 2I_x $$
                    <br>
                    $$ I_x = \bbox[3px,
                    border: 0.5px solid
                    white]{\dfrac14MR^2} $$
                </div>
                <br>
            </span>
            The moment of inertia should not be a foreign concept to us anymore. You might not have thought of it
            before, but with some
            experimentation and explanation it becomes obvious that it does exist and affects rotation. For instance, if
            you've ever tried to swing
            a stick about its end, you know it's harder than swinging it around its middle. Now you know why!
            <br><br>
            Next, we need to unify the ideas we've learned in the past few lessons into the rotational equivalent of a
            Newton's Laws unit, where
            we convert the laws of motion into the laws of rotational motion. It's the place where everything I've
            talked about falls into place and
            we can start to actually tackle complex problems involving rotation. Without further ado, get ready to get
            rotated off your feet! (Bad joke, I know.)
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
        </p>
    </div>
</template>

<style scoped></style>