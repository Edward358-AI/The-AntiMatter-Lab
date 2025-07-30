<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Engine, Render, Runner, Bodies, Body, Composite, Events} from 'matter-js'
const viewportMsg = ref('')
const multiplier = ref(10)

var particles = []
// Store engine and render references for cleanup
let currentEngine = null
let currentRender = null
let currentRunner = null
let pressureUpdateHandler = null


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
            particles.push(Bodies.circle(x, y, 2 / 800 * width, { render: { fillStyle: '#87CEEB' }, friction: 0, restitution: 1.1195, frictionAir: 0 }));
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
        particles.forEach((particle) => {
            if (particle.speed < 0.5) {
                Body.setSpeed(particle, Math.sqrt(Math.abs((Math.random() - 0.5) * multiplier.value * (Math.random() - 0.5) * multiplier.value )))
            }
        });
    }

    Events.on(engine, 'beforeUpdate', pressureUpdateHandler);

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
            Events.off(currentEngine, 'beforeUpdate', pressureUpdateHandler)
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
            <b>Pressure</b> is defined as the perpendicular force over the area which it is applied. Let's say you push on something with a uniform force. If you push with an open palm,
            the area of contact is larger and thus the pressure is smaller. However, if you push with just one finger, the contact area is much less and the pressure is
            higher, assuming you can push with the same force both times. This is why punching a balloon doesn't pop it, but pressing lightly on it with a pin
            does: the pin exerts a lot more pressure.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 106.png"/>
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
            The formula for the absolute pressure due to a fluid some depth $h$ under it would be equal to:
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
            We also have the idea of <b>gauge pressure</b>, which is simply just the absolute pressure minus the atmospheric pressure $P_0$.
            <br><br>
            $$ P_{gauge} = \rho g h $$
            <br>
            Now, take a closer look at these formulas. The parts we have are $P_0$ $g$, $\rho$, and $h$. The first three are 
            constants or intrinsic quantities, so the only quantity that actually affects pressure is the height or depth $h$
            below the surface of the fluid. 
            <br><br>
            The shape of the fluid tube does not matter in this case, as you might expect. The diagram should illustrate how this 
            principle works in better detail than words can.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 106.png"/>
                <figcaption>Figure 2: It's not about the shape, but the height.</figcaption>
            </figure>
            <br>
            This gives us a revelation that is called <b>Pascal's Law</b>. The pressure in a column of fluid doesn't actually depend on 
            how much fluid is physically present, but rather only on the height of the fluid in the tube! Technically, the law more accurately states that any pressure
            change applied to a liquid is transferred to all other points in the liquid.
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Pascal's Law:</strong> 
                <br><i>Pressure exerted on an incompressible fluid is uniformly transmitted undiminished through the 
                    fluid and to the container walls. </i>
            </div>
            <br>
            This means that the pressure exerted at one end of a fluid tube is transmitted to the other end with the same magnitude. Let's apply this 
            result to solve a real-world application problem of this principle: the hydraulic lifts you see at mechanic shops.
            <br><br>
            <span v-show="level>0">
                <div class="problem">
                    A hydraulic lift is used to lift a 3-ton ($M = 3000 ~\textrm{kg}$) weight by pressing downwards on the smaller end of the hydraulic tube. If the radius of 
                    the smaller tube is one-fifth that of the larger tube, what is the force that someone has to exert in order to hold up the weight?
                    <br><br>
                    <figure>
                        <img src="/src/assets/fluids/Figure 107.png"/>
                        <figcaption>Figure 3: A very colorful hydraulic lift.</figcaption>
                    </figure>
                    <br>
                    We can actually just set up this problem as a ratio, without needing to do too much calculation. We know that the pressure on the left side is 
                    equivalent to the exerted force divided by the area of the smaller tube $A_1$, while on the right side it is equal to the weight of the object divided by the 
                    area of the larger tube $A_2$. These two must be equal according to Pascal's Law.
                    <br><br>
                    $$ \dfrac{F}{A_1} = \dfrac{mg}{A_2} $$
                    <br>
                    Next, we need to use our proportional reasoning. We know that the radius of the smaller tube is 1/5th that of the larger one. Since area is 
                    proportional to the square of the radius, this means that the area of the smaller tube is 1/25th that of the larger one, or $A_1 = 1/25 \cdot A_2$.
                    <br><br>
                    $$ F = mg \dfrac{A_1}{A_2}  = \dfrac{1}{25} mg$$
                    $$ F = \bbox[3px,
                    border: 0.5px solid
                    white] {1177.2 ~\textrm{N} }$$
                    <br>
                    This is equivalent to counterbalancing it with a $120~\textrm{kg}$ weight.
                </div>
            </span>
            <span v-show='level==0'>
                Since I had you do a problem last time, this time I'll just keep it conceptual. Let's conjure up an image of the hydraulic lifts that 
                we're talking about here. This one is a pretty good representation of what they look like, albeit with a little bit of creative liberty on the coloring.
                <br><br>
                <figure>
                    <img src="/src/assets/fluids/Figure 107.png"/>
                    <figcaption>Figure 3: A very colorful hydraulic lift.</figcaption>
                </figure>
                <br>
                This is how the hydraulic lift works: the left tube is much narrower than the right one, meaning it has less area than the right tube. Since pressure is 
                force over area and has to be constant according to Pascal's Law, if we exert some force on the narrow tube it will be "multiplied" into a much 
                larger force on the larger tube because the total pressure has to be constant. (With a larger area, the force will be larger if the 
                pressure is to remain constant.) This is how mechanics lift large vehicles with relative ease.
            </span>
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

        <div v-show="page===2">
            What about gases? Well, they're not too special, but the way they produce pressure is slightly different from liquids. See, gas particles move around 
            much faster than liquid or solid particles, and they will collide with the walls of whatever container they are in. <span v-show='level>0'>You might think 
                that they would lose energy on collision, but won't happen because they're molecules and cannot lose energy to heat. Heat, after all, is just the random vibration of 
                many, many molecules, so you can't have heat for a single molecule.
            </span>
            <br><br>
            The hotter the gas particles are, the faster they tend to move around, and the harder they hit the walls of the container. You can see this 
            for yourself in the demo below! All the particles are given random speeds initially to simulate the real-life random motion of gas molecules.
            <br><br>
            <figure>
            <h3>Pressure Demo</h3>
            <br>
            <div id="pressure"></div>
            <button class="btn btn-outline-primary" @click="runPressure()">Reset</button><br>
            <label> Temperature: {{ multiplier }} </label><br><input type="range" class="form-range"
                    v-model="multiplier" min="10" max="50" step="0.5" style="width:fit-content" /><br>
                <span class="warn">{{ viewportMsg }}</span>
            </figure>
            <br>
            The motion of every single particle is governed by simple kinematics and collisions rules, yet the motion of the particles appears random because there is 
            such a large number of them. In fact, the system of the demo is theoretically completely describable by using the techniques we learned previously. The glaring issue 
            is that there are 3,200 particles in the demo, and many orders of magnitude more air molecules in a smiliarly-sized space. It would be pretty much 
            impossible to solve the system even if it just relied on kinematics and collisions (which it does not).
            <br><br>
            Therefore, we deal with a macroscopic model of gases rather than looking at individual particles. Because there are so many particles, the distribution is 
            relatively uniform, leading to an equal pressure on every wall of the container. Note that this kind of pressure exists regardless of whether there is 
            gravity or not. The atmospheric pressure you feel is more due to the 
            weight of the air above you compressing the air around you and leading to more collisions with your skin.
            <br><br>
            The kind of pressure that the gas exerts on the container walls is not dependent on gravity. It follows what we call the ideal gas law, which is 
            something that won't be covered in this unit, but is a very important law in thermodynamics. One of the factors that influences gas pressure 
            is the temperature, which describes how fast the particles move and therefore how often they collide with surfaces. 
            <br><br>
            In any case, while the pressure of liquids is due to the weight of the liquid, the pressure of gases is due to the collisions of gas particles with 
            surfaces. This is an important conceptual distinction to undestand.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page===3">
            I just made clear what the difference between the pressure of liquids and gases is, but now I'm going to talk about 
            something that both liquids and gases can do: exert a buoyant force on objects. This buoyancy is the reason why 
            objects can float in water, and also the reason why helium balloons will fly upwards into the sky. It all actually has to 
            do with pressure on the object.
            <br><br>
            The <b>buoyant force</b> is an upwards force that is exerted on all objects within a fluid, whether that fluid be liquid or 
            gaseous. It only exists when there is a gravitational field, otherwise there would be no weight of the object for the fluid to 
            buoy. 
            <br><br>
            <span v-show="level>0">
                The buoyant force is only related to the density of the fluid that an object is immersed in. This might seem like an odd statement because 
                what determines if something floats is its density relative to that of the fluid it's immersed in. For instance, wood floats in water 
                because it is less dense than water. However, if we follow the logic and reasoning everything works out.
                <br><br>
                The buoyant force on an object of volume $V$ in a liquid of density $\rho_0$ is defined as:
                <br><br>
                $$ F_b = \rho_0 V g $$
                <br>
                Technically, it would be more accurate to say that $V$ is <b>the amount of volume that is immersed in the fluid</b>. This is the key to 
                figuring out if something floats or not. Let's use wood as an example. Water has a density $\rho_0 = 1000 ~\textrm{kg/m^3}$, while we'll 
                say that wood has a density of $ \rho = 700~\textrm{kg/m^3} $. 
                <br><br>
                The mass of a piece of wood of volume $V_0$ is therefore $m = \rho V$. The buoyant force can counteract this weight when only 70% of the object
                is actually immersed in the water, because of how the densities are related to each other. To explain why, let's take a closer look at our previous 
                equation.
                <br><br>
                If you look closely at our expression for the buoyant force, it is actually the weight of a volume $V$ of water! This makes the previous result make 
                even more sense: a smaller volume of water has the same mass as the entire block of wood, meaning the wood floats in the water <b>with some of it 
                    above the surface of the water
                </b>, where it has no buoyant force acting on it.
            </span>
            <span v-show="level==0">
                The buoyant force is defined with the density of the fluid that an object is immersed in, as well as the volume of the object that is actually 
                immersed in the liquid. We'll call the density $\rho_0$ and the volume $V$.  
                <br><br>
                $$ F_b = \rho_0 V g $$
                <br>
                You might notice that this is actually equivalent to the weight of the water that the object displaces. This means that if an object is less 
                dense than the fluid it is immersed in, it will float. It is not because the buoyant force is greater than the weight of the object, because in that 
                case the object would accelerate upwards. Let's use the example of a wooden block in water.
                <br><br>
                Some of the wood remains above the water as it floats, and some of it is submerged. <b>Only</b> the submerged part has a buoyant force acting on it,
                but since wood is less dense than water the water displaced by the submerged part has a weight that is equal to the weight of the entire block of wood.
                This is why the block floats, and why it has some of it above the water.
            </span>
            <br><br>
            What actually causes the buoyant force, though? Well, if you've ever been in a pool and tried to push something underwater, you might have 
            felt a pressure acting on it. This is exactly what causes the buoyant force. Recall that pressure is exerted uniformly in all directions according 
            to Pascal's Law. The objects we submerge in fluids have volumes, which means that the bottom of the object is at a greater depth than the top of the object.
            <br><br>
            Recall that $P = P_0 + \rho g h$. This means that the pressure at the bottom of the object is greater than the pressure at the top of the object, which means that there is a net upwards force acting on the object.
            This is the buoyant force, and if we do some math it can be directly shown that the buoyant force is equal to the weight of the fluid displaced by the object.
            <br><br>
            <figure>
                <img src="/src/assets/fluids/Figure 108.png"/>
                <figcaption>Figure 4: How the buoyant force works.</figcaption>
            </figure>
            <span v-show="level>0">
                We're going to do the math for the buoyant force here. It's a good practice of your algebra skills, but not entirely essential to undesrtanding what 
                buoyancy is or how to apply it. I find that many derivations are left out of physics lessons, so I thought it would be a good idea to include one here.
                <br><br>
                Let's say we have some arbitrarily sized object of volume $V$ submerged in a fluid of density $\rho_0$. Since the lateral pressures will cancel out regardless of 
                how the object is shaped due to geometry, we only need to consider the top and bottom of the object. Even if the object is not a perfect rectangle, only the pressures 
                that act vertically will actually have an effect on the object. 
                <br><br>
                It's possible to prove this generally, but it would take some very complicated calculus. Let's just assume the object is rectangular, with a base area 
                of $A$ and a height of $h$. The pressure of the fluid we'll call $P_0$, and the pressure at the bottom is $P_0 + \rho_0 g h$. The forces on the top and 
                bottom are therefore:
                <br><br>
                $$ F_{top} = P_0 A $$
                $$ F_{bottom} = (P_0 + \rho_0 g h) A $$
                <br>
                We then find the net force relatively easily by subtracting the top force from the bottom force:
                <br><br>
                $$ F_b = F_{bottom} - F_{top} = (P_0 + \rho_0 g h) A - P_0 A $$
                $$ F_b = \rho_0 g h A $$
                <br>
                The volume of the rectangular prism is $V = A h$, so we can substitute that in:
                <br><br>
                $$ F_b = \rho_0 g V $$
                <br>
                We have just proven the expression for the buoyant force!
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
        <div v-show="page===4">
            We're going to do a practice problem that uses the idea of the buoyant force.
            <br><br>
            <span v-show="level>0">
                <div class="problem">
                    A mystery block floats in water ($\rho_w = 1000 ~\textrm{kg/m}^3$) with 60% of its volume submerged. Oil has a 
                    density that is $\rho_o = 800 ~\textrm{kg/m}^3$. What percentage of the block's volume is submerged in oil?
                    <br><br>
                    First off, we will assign a variable $m$ to the mass of the block, as well as $V$ to the volume of the block.
                    This lets us write the following equation for the buoyant force due to water:
                    <br><br>
                    $$ F_b = \rho_w (0.6V) g = mg$$
                    $$ \rho_w (0.6V) = m$$
                    <br>
                    We know that we will have some volume $V'$ submerged in oil when the mystery block is in equilibrium in oil. The buoyant force due to oil is:
                    <br><br>
                    $$ F_b' = \rho_o V' g = mg$$
                    $$ \rho_o V' = m$$
                    <br>
                    We can set the two equations equal to each other, since they both equal $m$:
                    <br><br>
                    $$ \rho_w (0.6V) = \rho_o V' $$
                    <br>
                    The density of oil is 80% that of water, so instead of using the actual values we just use this ratio.
                    <br><br>
                    $$ 0.6 \rho_w V = 0.8 \rho_w V' $$
                    $$ V' = \dfrac{0.6}{0.8} V = \bbox[3px,
                    border: 0.5px solid
                    white] {\dfrac34 V}$$
                    <br>
                    This means that 75% of the block's volume is will be submerged in oil.
                </div>
            </span>
            <span v-show="level==0">
                <div class="problem">
                    A boat has a total density that is $\rho = 400~\textrm{kg/m}^3$. How much of the boat 
                    would be submerged in oil with a density of $\rho_o = 800 \textrm{kg/m}^3$?
                    <br><br>
                    We can either use reasoning or math to solve this problem. Let's start with the math approach. We first give the boat an 
                    arbitrary total volume $V$ and say that a volume of $V'$ is submerged. This lets us write a force-balance expression for the 
                    boat. Recall that the mass is defined by the density times the volume, so the mass of the boat is $m = \rho V$.
                    <br><br>
                    $$ F_b = \rho_o V' g = \rho V g $$
                    $$ \rho_o V' = \rho V $$
                    $$ V' = \dfrac{\rho}{\rho_o} V = \bbox[3px,
                    border: 0.5px solid
                    white]{0.5V}$$
                    <br>
                    This means that half of the boat's volume is submerged in oil.
                    <br><br>
                    We could have reasoned this by seeing that the density of the boat is <b>exactly half</b> that of oil, meaning that half the boat would sit inside the 
                    oil and half would sit outside of it. Most of the time, brute force math is not so elegant as clever reasoning!
                </div>
            </span>
            <br>
            This ends our lesson on pressure. There was quite a bit to talk about here, but I hope you remembered all of it. The key results of pressure 
            varying with depth, Pascal's Law, and buoyancy are all very important to understand. The other things I talked about are conceptually important, but  
            definitely not as important to know as the trio I just mentioned.
            <br><br>
            Next, we're going to explore some of the rules that govern the flow of fluids. We've only been dealing with static fluids so far, so it'll be a nice 
            introduction to the dynamics part of fluid dynamics. Let's set that fluid into motion with our next lesson!
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next Lesson!
                    &rarr;</button>
            </div>
        </div>
        </p>
    </div>
</template>