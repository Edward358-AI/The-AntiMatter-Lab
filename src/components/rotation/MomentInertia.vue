<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import {onMounted, ref} from 'vue'

const inputInertia = ref(15)
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
    document.getElementById("inertia").innerHTML = ""

// create an engine
var engine = Engine.create();

engine.gravity.y = 0

    // create a renderer
var render = Render.create({
    element: document.getElementById('inertia'),
    engine: engine,
    options: {
        width: 600,
        height: 600,
        wireframes: false,
        background: "#000"
    }
});

// run the renderer
Render.run(render);

var yoyoCircle = Bodies.circle(300, 300, 200, {render: {fillStyle: '#f39c12'}});

var yoyoOverlay = Bodies.circle(300,300, 150, {render: {fillStyle: '#e67e22'}})

var yoyoCenter = Bodies.circle(300,300,50, {render: {fillStyle: '#e74f00'}});

var spoke1 = Bodies.rectangle(300,300, 400, 10, {render: {fillStyle: '#ff5151'}});
var spoke2 = Bodies.rectangle(300,300, 400, 10, {render: {fillStyle: '#ff5151'}, angle: Math.PI/2});

var inertia = inputInertia.value * 1000
var yoyo = Body.create({
    parts:[yoyoCircle, yoyoOverlay, spoke1, spoke2, yoyoCenter],
    mass: 2,
    frictionAir: 0.001,
    friction: 0.5,
    restitution: 0.1,
    inertia: inertia
});

Composite.add(engine.world, [yoyo]);

Events.on(engine, 'beforeUpdate', function() {
    // Torque pair to spin the object
    var stringForce1 = { x: 0, y: 0.0001 };
    var stringForce2 = { x: 0, y: -0.0001 };

    var offset = { x: 20, y: 0 };
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
});

// create runner
var runner = Runner.create()

Runner.run(runner, engine)
// run the engine
Runner.run(runner, engine);

}

onMounted(() => {
    runMoInertia()
})
</script>


<template>
    <div class="container h100 p-5">
        <h1>Moment of Inertia</h1><br>
        <p>
            <div v-show="page===0">
                What does the moment of inertia do? This demo with a virtual wheel should explain to you how it affects motion. I have it set up so there's a 
                constant torque acting on the object, and you can move the slider to simulate the body's moment of inertia changing. Be sure to reset after 
                putting the slider at a new value.
                <br><br>
                <figure>
                <div id="inertia"></div>
                <button class="btn btn-outline-primary" @click="runMoInertia()">Reset</button><br>
                <label>Moment of Inertia: {{ inputInertia }}</label>&ensp;<input type="range" v-model="inputInertia" min="1" max="500" step="1" style="outline: 4px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/>
                </figure>
                <br>
                You might have seen that the higher the moment of inertia, the harder it is to rotate the object. This makes the moment of inertia 
                much like mass in this regard, but mass isn't the only part of it! Instead, the moment of inertia is actually affected 
                both by mass itself and how that mass is distributed in a rigid body. Thus, two objects with the same mass may have different moments of inertia!
                <br><br>
                <span v-show="level>0">
                    The most technical definition for the moment of inertia is that it is the second moment mass. You probably don't remember this, but I
                    briefly mentioned that the center of mass is the first moment of mass (normalized by total mass), which may lead you 
                    to see a pattern. In any case, the formula for the moment of inertia of a point object of mass $m$ at a distance $r$ from the 
                    axis of rotation can be given by: 
                    <br><br>
                    $$ I = mr^2$$
                    <br>
                    Now, this is useful if you have objects that can be treated like point masses. However, most of the time we have rigid objects, which 
                    means we need to sum over all of the moments of inertia within. This can be written as a summation:
                    <br><br>
                    $$ T = \sum m_i {r_i}^2 $$
                    <br>
                    Let's try this technique for the simplest example. You won't actually have to do any calculation if you realize what's being 
                    asked.
                    <div class="problem">
                        What is the moment of inertia of a thin hoop (mass $m$, radius $r$) about an axis through its center of mass and perpendicular to it?
                        <br><br>
                        <figure>
                            <img src="/src/assets/rotation/Figure 83.png" width = '500px'/>
                            <figcaption>Figure 1: The hoop, a very simple object.</figcaption>
                        </figure>
                        <br>
                        We consider the hoop as infinitely thin, meaning it is just a collection of points located a distance $r$ from the center of the ring. It has 
                        no thickness, so we can consider <b>all</b> of the hoop's mass as being contained in its rim. Even if real-world objects aren't infinitely thin, we 
                        can usually approximate them to be if they are thin enough.
                        <br><br>
                        The rim is located a constant distance $r$ from the center, which allows us to conclude:
                        <br><br>
                        $$\bbox[3px,
                        border: 0.5px solid
                        white]{I = mr^2} $$
                        <br>
                        The rotating ring is equivalent to a rotating point mass! We typically don't think of them as rotating the same way, but that's because while gravity 
                        effectively acts at the center for a ring (which causes no torque), while it acts at the point mass's location in that case (which usually does cause a torque). We 
                        need a combination of many concepts to effective analyze rotation.
                    </div>
                    <span v-show='level==2'>
                        <br>
                        Of course, we can also use an integral in this case. Instead of writing a summation, we write something similar to the 
                        integral we had for center of mass:
                        <br><br>
                        $$ I = \int r^2 dm $$
                        <br>
                        A few key differences are present here as opposed to center of mass. For one, the moment of inertia doesn't care about direction and the $r$ is 
                        not treated as a vector, mainly because it's squared.Therefore, we don't have to consider position $r$ as a vector when setting up the integral. Otherwise, the 
                        approach is pretty much the same.
                    </span>
                </span>
                <span v-show="level==0">

                </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>        
        </p>
    </div>
</template>

<style scoped>

</style>