<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import { ref, onMounted, onUnmounted, watch } from 'vue'
const viewportMsg = ref('')
const multiplier = ref(10)

var particles = []
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let pressureUpdateHandler = null

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite

function runPressure() {
    // Clean up previous engine if it exists
    if (currentEngine) {
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
    document.getElementById("pressure").innerHTML = ""

    // create an engine
    var engine = Engine.create();
    currentEngine = engine // Store reference for cleanup
    engine.gravity.y = 0
    var width = 0.5 * window.innerWidth > 800 ? 600 : window.innerWidth < 768 ? 0.65 * window.innerWidth : 0.5 * window.innerWidth;
    var height = 400 / 600 * width;
    // create a renderer
    var render = Render.create({
        element: document.getElementById('pressure'),
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

    var walls = [
        Bodies.rectangle(width / 2, 0, width, 0.2 * height, { isStatic: true, render: { fillStyle: '#888' }, restitution: 1.5, friction: 0, frictionAir: 0 }),
        Bodies.rectangle(width / 2, height, width, 0.2 * height, { isStatic: true, render: { fillStyle: '#888' }, restitution: 1.5, friction: 0, frictionAir: 0 }),
        Bodies.rectangle(0, height / 2, 0.2 * height, height, { isStatic: true, render: { fillStyle: '#888' }, restitution: 1.5, friction: 0, frictionAir: 0 }),
        Bodies.rectangle(width, height / 2, 0.2 * height, height, { isStatic: true, render: { fillStyle: '#888' }, restitution: 1.5, friction: 0, frictionAir: 0 })
    ];

    particles.length = 0; // reset
    const cols = 80;
    const rows = 40;
    const spacing = 8 / 800 * width;
    const startX = (0.5 * width - (cols * spacing) / 2);
    const startY = (0.5 * height - (rows * spacing) / 2);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = startX + i * spacing;
            const y = startY + j * spacing;
            particles.push(Bodies.circle(x, y, 2 / 800 * width, { render: { fillStyle: '#87CEEB' }, friction:0, restitution: 1.1195, frictionAir: 0 }));
        }
    }

        particles.forEach((particle) => {
                Body.setVelocity(particle, {
                    x: (Math.random() - 0.5) * multiplier.value,
                    y: (Math.random() - 0.5) * multiplier.value
                });
            });

        // Define the pressure update handler
        pressureUpdateHandler = function() {
            particles.forEach((particle) =>{
                if (particle.speed < 0.5) {
                    Body.setSpeed(particle, Math.sqrt(Math.abs((Math.random() - 0.5) * multiplier.value * (Math.random() - 0.5) * multiplier.value )))
                }
            });
        }

        Matter.Events.on(engine, 'beforeUpdate', pressureUpdateHandler);

        engine.timing.timeScale = 1

    Composite.add(engine.world, [...walls, ...particles]);
}

onMounted(() => {
    runPressure()
});

onUnmounted(() => {
    // Clean up when component is destroyed
    if (currentEngine) {
        // Remove event listeners
        if (pressureUpdateHandler) {
            Matter.Events.off(currentEngine, 'beforeUpdate', pressureUpdateHandler)
            pressureUpdateHandler = null
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
});

watch(multiplier, (newVal) => {
    particles.forEach((particle) => {
                Body.setVelocity(particle, {
                    x: (Math.random() - 0.5) * newVal,
                    y: (Math.random() - 0.5) * newVal
                });
            });
})
</script>

<template>
    <div class="container h100 p-5">
        <h1>Pressure</h1><br>
        <p>
        <div v-show="page===0">
            People often claim to feel a lot of pressure at work or at school, but the actual pressure they feel is constant throughout
            their entire lives. I'm of course talking about pressure in a physics context, which is very different from pressure used in a
            common context. Before the lesson is over, you'll understand what I meant by that quip.
            <br><br>
            <b>Pressure</b> is defined as the force over the area which it is applied. Let's say you push on something with a uniform force. If you push with an open palm,
            the area of contact is larger and thus the pressure is smaller. However, if you push with just one finger, the contact area is much less and the pressure is
            higher, assuming you can push with the same force both times. This is why punching a balloon doesn't pop it, but pressing lightly on it with a pin
            does: the pin exerts a lot more pressure.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 105.png"/>
                <figcaption>Figure 1: Two sources of pressure on a balloon.</figcaption>
            </figure>
            <br><br>
            The mathematical definition for pressure is exactly as you would expect:
            <br><br>
            $$ P = \dfrac{F}{A} $$
            <br>
            It is quite literally just the force divided by the area. The unit is called the pascal $\textrm{Pa}$ and is equal to one newton of
            force over one square meter, which is quite a small amount of pressure.
            <br><br>
            <span v-show='level>0'>With fluids, the pressure within
                them is due to the weight of the fluid, and thus their pressure depends on the gravitational field
                strength. However, with gases, the pressure is actually due to the gas particles colliding repeatedly against the
                walls of the container, which causes a pressure to be exerted on them.
                <br><br>
            </span>
            With that, I think we've proved ourselves ready for a fun practice problem!
            <br><br>
            <div class="problem">
                The Earth's atmospheric pressure is around $P_0 = 101 ~\textrm{kPa}$. Find the force exerted by this pressure on a
                spherical balloon of radius $r = 30 \textrm{cm}$ by the atmosphere.
                <br><br>
                This is a simple calculation. Since pressure is force over area, the force due to a certain pressure can
                be expressed as the pressure times the area. The area of a sphere is $ \dfrac43 \pi r^3$, in case you didn't know
                or forgot.
                <br><br>
                $$ F = PA = P_0 \left(  \dfrac43 \pi r^3 \right) $$
                $$ F = \bbox[3px,
                    border: 0.5px solid
                    white] {1.14 \times 10^4 ~\textrm {N} } $$
                <br>
                This is a <b>huge</b> force! How does the balloon (or humans, for that matter) not pop under this kind of force? Well,
                the balloon has air inside it <b>that is at the same pressure as the air outside</b>, creating a counterbalancing force
                that negates the effects of this crushing pressure. Humans also have air within them, which is why we don't get
                crushed just from existing.
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page===1">
            There is a formula that can easily be used to find the pressure due to a fluid, whether it be a liquid or gas. First, we have to
            recognize that the pressure usually is an addition on top of the regular atmospheric pressure. The pressure in this case would be due
            to the weight of the fluid, though pressure <b>does not exclusively act downwards on objects</b>.
            <br><br>
            The formula for the pressure due to a fluid some depth $h$ under it would be equal to:
            <br><br>
            $$ P = P_0 + \rho g h $$
            <br>
            This is most commonly used to find the pressure due to a liquid, though it can be used to find the pressure due to a
            gas as well. <span v-show="level>0">The reason for this is because the gas will compress under gravitational forces, changing
                its density with $h$. This makes the situation problematic to deal with.
            </span>
            <br><br>
            <span v-show="level==2">
                It is possible to deal with such difficult problems simply by using calculus. We need to find how the density
                of the gas varies with height, which can be done using the ideal gas law. However, seeing as this isn't a unit dedicated 
                to thermodynamics, we will not talk about it right now. Then, we would merely integrate this relation:
                <br><br>
                $$ dP = \rho g dh $$
                <br>
                This formula can come in handy in the future, but it's pretty tricky to come up with a problem that is both 
                simple and also requires calculus. Still, it'll be good to know this formula, because it is used in thermodynamics.
                <br><br>
            </span>
            Now, take a closer look at this formula. The parts we have are $P_0$ $g$, $\rho$, and $h$. The first three are 
            constants or intrinsic quantities, so the only quantity that actually affects pressure is the height or depth $h$
            below the surface of the fluid. 
            <br><br>
            This gives us a revelation that is called <b>Pascal's Law</b>. The pressure in a column of fluid doesn't actually depend on 
            how much fluid is physically present, but rather only on the height of the fluid in the tube!
        </div>
        <div v-show="page===2">
            <figure>
            <h3>Pressure Demo</h3>
            <br>
            <div id="pressure"></div>
            <button class="btn btn-outline-primary" @click="runPressure()">Reset</button><br>
            <label> Temperature: {{ multiplier }} </label><br><input type="range" class="form-range"
                    v-model="multiplier" min="10" max="50" step="0.5" style="width:fit-content" /><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
        </div>
        </p>
    </div>
</template>