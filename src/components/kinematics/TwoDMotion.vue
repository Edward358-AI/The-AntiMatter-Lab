<script setup>
import Matter, { Body } from 'matter-js';
import { onMounted, ref } from 'vue'
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const inputAngle = ref('')
const initVelocity = ref('')
const viewportMsg = ref('')

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}


function runProjMotion() {
    document.getElementById("projMotion").innerHTML = ""
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();
    var width = 0.5 * window.innerWidth > 1000 ? 1000 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 600 / 1000 * width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('projMotion'),
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

    // create bodies
    var ground = Bodies.rectangle(500 / 1000 * width, 600 / 1000 * width, 1000 / 1000 * width, 50 / 1000 * width,
        {
            isStatic: true,
            render: { fillStyle: '#929292' },
            restitution: 1
        })
    var ball = Bodies.circle(100 / 1000 * width, 570 / 1000 * width, 30 / 1000 * width, {
        render: { fillStyle: '#18e9ff' },
        restitution: 1
    })
    var wall1 = Bodies.rectangle(0, 200 / 1000 * width, 60 / 1000 * width, 1000 / 1000 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' },
        restitution: 1
    })
    var wall2 = Bodies.rectangle(1000 / 1000 * width, 200 / 1000 * width, 60 / 1000 * width, 1000 / 1000 * width, {
        isStatic: true,
        render: { fillStyle: '#929292' },
        restitution: 1
    });

    var angle = parseFloat(inputAngle.value);

    let v_x = parseFloat(initVelocity.value) * Math.cos(degreesToRadians(angle));
    if (isNaN(v_x)) {
        v_x = 14;
    }
    let v_y = parseFloat(initVelocity.value) * Math.sin(degreesToRadians(angle));
    if (isNaN(v_y)) {
        v_y = 14
    }

    setTimeout(() => {
        Body.setVelocity(ball, { x: v_x / 1000 * width, y: -v_y / 1000 * width });
    }, 500); // 500ms delay before movement


    Composite.add(engine.world, [ground, ball, wall1, wall2]);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    if (window.innerWidth < 1000) {
        viewportMsg.value = "Warning. Some demos may not work as intended/as well on smaller viewports. Consider using a larger viewing window for best results."
    } else {
        viewportMsg.value = ""
    }

}

onMounted(() => {
    runProjMotion()
})
</script>


<template>
    <div class="container h100 p-5">
        <h1>Two-Dimensional Motion/Projectile Motion</h1><br>
        <div v-show="page === 0">
            <p>
                <span v-show="level == 0">
                    Finally, the core of kinematics. This is what many people consider to be the most useful application
                    of
                    kinematics. If you remember studying vectors, it will get very, very handy right now. Remember that
                    vectors
                    can be defined with a magnitude and angle from the positive x-axis, and so we can launch a
                    projectile at
                    with an intitial velocity, at a certain angle, and it will yield this:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 12.png" />
                        <figcaption>Figure 1: Different modes (examples) of projectile motion</figcaption>
                    </figure>
                    <br>
                    Ah yes, the beautiful, projectile motion! You may have noticed that all objects you throw will
                    follow this
                    curve. This curve is called a <i>parabola</i>, which is a fancy math term that you probably don't
                    really
                    need to worry about. We will use this term from time to time to refer to the nature of the
                    trajectory, or
                    flight path the object follows. Now, instead of a static picture, we'll put an interactive demo to
                    show
                    how this kind of motion plays out in real time.<br><br>
                </span>
                <span v-show="level > 0">
                    This is what many people consider to be the most useful application of kinematics, and many
                    interesting
                    formulas and problems arise from this as a result. Remember that vectors can be defined with a
                    magnitude and
                    angle from the positive x-axis, and so we can launch a projectile at with an intitial velocity
                    $v_0$, at a
                    certain angle $\theta$, and it will yield this:
                    <figure>
                        <img src="/src/assets/kinematics/Figure 12.png" />
                        <figcaption>Figure 1: Different modes of projectile motion</figcaption>
                    </figure>
                    Now that you've seen our diagram, it's time to experience it. Or at least, experience it the best
                    you can in an
                    online setting. We have made a projectile motion demonstration with adjustable paramenters for
                    launch speed and angle.
                    Do note that the projectile will bounce because we thought it would look better, but the thing we're
                    concerned with here is
                    the initial motion before the first bounce. Anyway, enough said.
                    Here's a demo so you can get a feel for projectile motion:
                    <br><br>
                </span>
            <figure>
                <h3>Two-Dimensional Motion Demo</h3><br>
                <div id="projMotion"></div>
                <button class="btn btn-outline-primary" @click="runProjMotion()">Reset</button><br>
                Input the velocity and angle from horizontal:
                <div class="d-flex justify-content-center">
                    <div class="input-group mb-3" style="max-width: 50px;">
                        <input v-model="initVelocity" type="number" class="form-control" placeholder=" ">
                    </div> &nbsp; at &nbsp;
                    <div class="input-group mb-3" style="max-width: 50px;">
                        <input v-model="inputAngle" type="number" class="form-control" placeholder=" ">
                    </div>&nbsp; degrees
                </div>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>

            <span v-show="level == 0">
                Look away from the demo for now and back at the picture. You may have noticed that in the drawing, there
                are two
                projectiles that
                are launched at completely different angles yield the same range. The reason for this is more
                mathemathically intense than we can handle, but conceptually, all you need to know is that if you
                shoot an
                object at an angle, say $10$ degrees, then if you shoot it at $90$ minus that angle (in degrees), it
                will also land
                at the exact same range.
                <br><br>
                So for $10\degree$, the angle $80\degree$ will yield the same range. Now,
                just by doing basic
                arithmetic, we can see that $45\degree$ does not actually have
                another counterpart angle! What does this mean? Launching it at $45\degree$ will give you the
                maximum
                range a
                projectile can go (still neglecting air resistance, in real life, this is more like $22\degree$,
                since air
                resistance exists).
                <br><br>
                However, this actually only holds for when your change in vertical displacement
                is zero. So if I threw a rock off a cliff, the maximum angle of range without air resistance is NOT
                $45\degree$. If you are curious to know, it's somewhere around $35.3\degree$. But that's going off
                topic. There are
                other important concepts to know and realize about projectile motion that await!
            </span>
            <span v-show="level > 0">
                Most likely, you have seen or are seeing the parabolic trajectory that the object follows. This has a
                very simple
                proof
                and will be explained later on. First, if you remember the formulas for total flight time, and the
                maximum
                height, you might be wondering: Can we derive some form of them here as well? Well, yes!
                <br><br>Actually,
                the idea behind
                working with kinematics in two dimensions is the fact that you can simply split up $v_0$ into its
                horizontal
                ($x$) and vertical <br>($y$) components, and we realize that the time for the horizontal component to
                travel the
                maximum range is the same time it takes for the object's vertical component to travel up and down.
                They are linked by a single quantity, time, but otherwise you can treat them as separate in their
                own respect.<br><br>IMPORTANT! This concept (above) is the key to working in kinematics in 2
                dimensions!<br><br>
                Then, we recognize that velocity is a vector that can be split into its components,
                $v_{0x}=v_0\cos \theta$ and $v_{0y}= v_0\sin \theta$.
                Considering the accelerations along each axis, we see that $v_{0x}=v_{fx}$ because the horizontal
                velocity is constant, since there is no
                acceleration in the horizontal direction (neglecting air friction, like usual). In the $y$
                direction, the acceleration $a_y$ is equal to $-g$. Thus,
                we can find the maximum height and time of flight easily by replacing $v_y$ with $v_0\sin\theta$,
                which is its equivalent in our case.
                <br><br>
                $$t_{total}=\frac{2v_{0y}}{g}=\frac{2v_0\sin \theta}{g}$$
                <br>
                $$H=\frac{v_{0y}^2}{2g}=\frac{v_0^2\sin^{2}\theta}{2g}$$
                <br>
                However, since this motion is horizontal as well, there is one more quantity that is of use: the
                range of the projectile. To find this, we first realize that the horizontal velocity is constant,
                and that we simply need to compute:
                <br><br>
                $$R=v_{0x}t_{total}$$
                <br>
                We know the horizontal velocity and total time, so we substitute that in:
                <br><br>
                $$R=v_0\cos\theta \cdot
                \frac{2v_0\sin\theta}{g}=\frac{2v_0^2\sin\theta\cos\theta}{g}=\frac{v_0^2\sin{2\theta}}{g}$$
                <br>
                ...Since $\sin{2\theta}=2\sin\theta\cos\theta$. We recognize that this is a maximum for a particular
                $v_0$ when $v_0 = 45\degree$. When this angle is achieved, the equation simplifies to just
                $R=\frac{v_0^2}{g}$
                <span v-show="level == 2">
                    <br><br>Additionally, using calculus, we can prove this is the case:<br><br>
                    Use the chain rule here:
                    <br><br>
                    $$\frac{d}{d\theta}(\sin{2\theta})=2\cos{2\theta}$$
                    <br>
                    Setting this to zero (to perform the first derivative test) yields:
                    <br><br>
                    $$2\cos{2\theta}=0$$
                    <br>
                    $$\cos{2\theta}=0$$
                    <br>
                    We recognize that the solution for $0\degree≤\theta≤90\degree$ is
                    $45\degree$!
                </span>
                <br><br>The next page will prove why the trajectory is parabolic.

            </span>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                <span v-show="level == 0">
                    There are many cool concepts about projectile motion. Firstly, if you notice, there are always going
                    to be two solutions of range, for any given height. For example, if you draw a straight line at any
                    height less than the maximum, you'll notice that it intersects two points on the parabola. This is a
                    basic concept that is important to notice and realize. However, there is only one solution for the
                    maximum height.<br><br>Another really cool thing is that remember when we said it takes half the
                    time to reach the peak and half to come back down? The same principles apply. So if we know that's
                    true for the vertical velocity, and if we add a horizontal velocity that is constant throughout the
                    trajectory (assuming no air resistance), the same rule applies: the object thrown at some velocity
                    $v$
                    will impact the ground with the same magnitude!<br><br>If you are more interested in the
                    calculations part, you can take a look at our Algebra-based level. But this is a more useful concept
                    for calculating the grand scheme of things, so you might as well. You might be thinking that
                    modeling
                    the object's trajectory must be pretty hard to do.
                    <br><br> However, we don't have to model this with a graph.
                    We can actually split up the velocity vector into its $x$ and $y$ components! And you know what
                    else? These components can be treated individually. The horizontal velocity can be used completely
                    separate from the vertical velocity. The key thing to note here is that these two components are
                    linked by the quantity time, because if you think about it, the time that it takes the horizontal
                    component to reach the final range is the same time it takes the vertical component to travel up and
                    down, as if it were on its own.<br><br>Conceptually, this is pretty much all there is to projectile
                    motion. Next up is a short and brief lesson that will talk you through some things that will be
                    helpful to know, particular for unit 2.
                </span>
                <span v-show="level > 0">
                    In order to prove that the trajectory is parabolic, we need to relate x and y. To do this, we write
                    general
                    equations for each like this:
                    <br><br>
                    $$y=v_{0y}t-\frac 1 2 gt^2$$
                    $$x=v_xt$$
                    <br>
                    Then, we solve for t to get: <br><br>
                    $$t=\frac{x}{v_x}$$
                    <br>
                    Plugging this into the equation for y, we get:
                    <br><br>
                    $$y=\frac{v_{0y}x}{v_x}-\frac{gx^2}{2v_x^2}$$
                    <br>
                    This is a quadratic equation for $y$ in terms of $x$,
                    which thus proves the trajectory is parabolic! We can actually simplify this further. Below is the
                    steps, although some are omitted for the sake of simplicity (and so that it doesn't take up the
                    entire screen).
                    <br><br>
                    $$y=\frac{v_0\sin\theta \cdot
                    x}{v_0\cos\theta}-\frac{gx^2}{2v_x^2}=x\tan\theta-\frac{gx^2}{2v_0^2cos^{2}\theta}$$
                    <br>
                    This is known
                    as the trajectory equation, and you can use it to calculate the height $y$ for a given displacement
                    $x$ it has traveled of its maximum range and vice versa. However, it is important to note, as with a
                    parabola, there are two points in the range where the height is the same. If the problem only asks
                    for one of them, use your best judgement and context to decide which is the answer. Having seen
                    this, let's work on a problem together:<br><br>
                    <div class="problem">
                        <i>Jebron Lames is shooting hoops. He throws the basketball at an angle of $60\degree$ with the
                            horizontal with an initial velocity of $5~\textrm m /\textrm s$ towards a hoop that is
                            $0.5~\textrm m$ taller than he
                            is. How far away is he from the hoop, if he made a perfect swish on that shot? (Hint: The
                            ball has to enter the hoop from above.)</i>
                        <br><br>
                        <figure>
                            <img src="/src/assets/kinematics/Figure 13.png" style="max-width:200px;" />
                            <figcaption>Figure 2: He shoots (he calculates), he scores!</figcaption>
                        </figure>
                        <br>
                        We can use the trajectory formula we just derived to solve this problem. We can use the
                        quadratic formula to obtain a general solution for $x$:
                        <br><br>
                        $$\theta=60\degree$$
                        $$v_0= 5~\textrm m /\textrm s$$
                        $$y = 0.5~\textrm m$$
                        $$y=x\tan\theta-\frac{gx^2}{2v_0^2cos^{2}\theta}$$
                        <br>
                        Using the quadratic formula gives us a huge mess, but it can be simplified to look much nicer.
                        The algebra in between is omitted for the sake of clarity. It is up to you to do the math.
                        Challenge
                        yourself and get through the algebra!
                        <br><br>
                        $$x=\frac{\tan\theta+\sqrt{\tan^{2}\theta-\frac{2gy}{v_0^2}}}{\frac{g}{v_0^2\cos^{2}\theta}}=\frac{v_0^2\sin\theta\cos\theta+v_0^2\cos\theta\sqrt{\sin^{2}\theta-\frac{2gy}{v_0^2}}}{g}$$
                        <br>
                        Now you might say the actual correct way to do it is using "$±$", but Jebron knows there is only
                        one possible answer if the ball is actually to go through the hoop. Eric was nice enough to give
                        you a hint, the
                        ball needs to enter the hoop from above. That means, the ball's vertical motion is downwards,
                        which means it is farther in the parabolic trajectory. Since it is farther, we must use only
                        "$+$". Also, as an aside, the maximum range equation can be simplified from this, as the range
                        equation is simply when $y=0$, so the square root term is reduced.
                        <br><br>
                        Eric side note here. The term where use the $-$ is actually a valid solution as well.
                        The ball will pass through the same height twice during its motion (think of what a parabola
                        looks like) but it won't
                        go through the hoop if it's moving upwards, which is what the smaller solution represents.
                        Enough rambling. Now if we plug in the values,
                        we get:
                        <br><br>
                        $$x=\frac{(5)^2\sin(60\degree)\cos60\degree+(5)^2\cos60\degree\sqrt{\sin^{2}60\degree-\frac{2(9.81)(0.5)}{(5)^2}}}{9.81}≈\bbox[3px,
                        border: 0.5px solid
                        white]{1.87~\textrm m}$$
                        <br>
                    </div><br>
                    Another interesting problem is shown below:<br>
                    <br>
                    <div class="problem">
                        <i>A ball is thrown an some initial velocity at an angle of $52\degree$ above the horizontal. It
                            reaches a max height of $7.5~\textrm m$. How high would it go if it was instead launched
                            directly upwards with the same magnitude of initial velocity?</i>
                        <br><br>
                        To solve, we can use our knowledge of the maximum height in trajectory:
                        <br><br>
                        $H_1=\frac{v_0^2sin^{2}\theta}{2g}$
                        <br>Solving for $v_0$, we obtain: $v_0=\sqrt{\frac{2gH_1}{sin^{2}\theta}}$
                        <br><br>If it was thrown straight upwards, the max height equation reduces to
                        $H_2=\frac{v_0^2}{2g}$
                        <br><br>Plugging our value for $v_0$:
                        <br><br>
                        $$H_2=\frac{(\sqrt{\frac{2gH_1}{sin^{2}\theta}})^2}{2g}=\frac{H_1}{sin^{2}\theta}=\frac{7.5}{\sin^{2}(52\degree)}≈\bbox[3px,
                        border: 0.5px solid
                        white]{12.08~\textrm m}$$
                        <br>
                    </div><br>
                    Remember, the key to solving problems like these is to identify your known values and map out your
                    problem solving strategy, then solve the equations algebraically, and then finally, last of all,
                    plug in your values and obtain the final answer. Many physics problems in the future will not be as
                    simple and straightforward as plugging in values, which is why you should try to get in the habit of
                    solving problems like this. Next up is a short and brief lesson that will prepare you for your next
                    unit!
                </span>
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

</template>


<style scoped></style>