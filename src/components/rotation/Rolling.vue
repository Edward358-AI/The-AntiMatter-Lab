<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import {onMounted, ref} from 'vue'

const inputFriction = ref(0.05)
const inputInertia = ref(10)

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;
function runRolling() {
    document.getElementById("roll").innerHTML = ""

// create an engine
var engine = Engine.create();

    // create a renderer
var render = Render.create({
    element: document.getElementById('roll'),
    engine: engine,
    options: {
        width: 1000,
        height: 600,
        wireframes: false,
        background: "#000"
    }
});

// run the renderer
Render.run(render);

var wheelrim = Bodies.circle(500,450,50, {
    render: {fillStyle: 'cyan'}
});
var wheelcenter = Bodies.circle(500,450,45, {
    render:{fillStyle: 'black'}
});
var spokes = [
    Bodies.rectangle(500,450, 100, 5, {render: {fillStyle: 'cyan'}}),
    Bodies.rectangle(500,450, 5, 100, {render: {fillStyle: 'cyan'}}),
]

var wheel = Body.create({
    parts: [wheelrim, wheelcenter, ...spokes],
    restitution: 0.5,
    frictionAir: 0,
    friction: inputFriction.value,
    frictionStatic: InputDeviceInfo.value * 15,
    inertia: 3000 * Math.pow(10, inputInertia.value/10)
})

var walls = [
    Bodies.rectangle(-100, 300, 200, 600, {render: {isVisible: false}, isStatic:true}),
    Bodies.rectangle(1100, 300, 200, 600, {render: {isVisible: false}, isStatic: true}),
    Bodies.rectangle(500, -100, 1000, 200, {render: {isVisible: false}, isStatic: true}),
    Bodies.rectangle(500, 700, 1000, 200, {render: {isVisible: false}, isStatic: true})
]

var ground = Bodies.rectangle(500,600, 1000, 100, {render:{fillStyle: '#888'}, isStatic:true})
var leftramp = Bodies.polygon(0, 400, 3, 300, {render:{fillStyle: '#888'}, isStatic:true, angle: -Math.PI/6})
var rightramp = Bodies.polygon(1000, 550, 3, 350, {render:{fillStyle: '#888'}, isStatic:true, angle: 2*Math.PI/3})

Composite.add(engine.world, [wheel, ...walls, ground, leftramp, rightramp])
// create runner
var runner = Runner.create()

Runner.run(runner, engine)
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
onMounted(()=>{
    runRolling()
})

</script>


<template>
    <div class="container h100 p-5">
        <h1>Rolling Without Slipping</h1><br>
        <p>
            <figure>
            <div id="roll"></div>
            <button class="btn btn-outline-primary" @click="runRolling()">Reset</button><br>
            <label>Moment of Inertia: {{ inputInertia }}</label>&ensp;<input type="range" v-model="inputInertia" min="5" max="50" step="1" style="outline: 4px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/><br>
            <label>Coefficient of Friction: {{ inputFriction }}</label>&ensp;<input type="range" v-model="inputFriction" min="0" max="1" step=".01" style="outline: 4px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/>
            </figure>
        </p>
    </div>
</template>

<style scoped>

</style>