<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import {onMounted, ref} from 'vue'

const mass1 = ref('30')
const mass2 = ref('40')
const vel1 = ref('4')
const vel2 = ref('-3')
const elasticity = ref('1')

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

function run1dCollision() {
    document.getElementById("1dCollision").innerHTML = ""

// create an engine
var engine = Engine.create();

    // create a renderer
var render = Render.create({
    element: document.getElementById('1dCollision'),
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false,
        background: "#000"
    }
});

var m_1 = parseFloat(mass1.value)
var m_2 = parseFloat(mass2.value)
var v_1 = parseFloat(vel1.value)
var v_2 = parseFloat(vel2.value)

var restitution = parseFloat(elasticity.value)

var ground = Bodies.rectangle(400, 400, 800, 100,{
    isStatic: true,
    render: {fillStyle: '#888'},
    friction: 0,
    restitution: 0
})

var ball1 = Bodies.circle(200, 319, 30, {
    friction: 0,
    frictionAir: 0,
    render: {fillStyle: '#00afe2'}, 
    mass: m_1,
    restitution: restitution
})

var ball2 = Bodies.circle(600,320, 30, {
    friction:0,
    frictionAir: 0,
    render:{fillStyle: "#ff4a4a"},
    mass: m_2,
    restitution: restitution
})

var walls = [
    Bodies.rectangle(-50, 200, 100, 400, {isStatic:true, render: {visible: false}, friction:0, restitution: 1 }),
    Bodies.rectangle(850, 200, 100, 400, {isStatic:true, render: {visible: false}, friction:0, restitution:1 })
]

Composite.add(engine.world, [ground, ball1, ball2, ...walls],
)
// run the renderer
Render.run(render);
// create runner

setTimeout(() => {
    Body.setVelocity(ball1, {x: v_1, y: 0});
}, 500); // 500ms delay before applying the force

setTimeout(() => {
    Body.setVelocity(ball2, {x: v_2, y: 0});
}, 500);

var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


}

onMounted(() => {
    run1dCollision()
})
</script>


<template>
    <div class="container h100 p-5">
        <h1>Collisions</h1><br>
        <p>
            <div v-show="page===0">
                <figure>
                    <div id="1dCollision"></div>
                    <button class="btn btn-outline-primary" @click="run1dCollision()">Reset</button><br>

                    <label>Blue ball mass: {{ mass1 }}</label>&ensp;<input type="range" v-model="mass1" min="1" max="100" step="0.1" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/> &emsp; &emsp;
                    <label>Red ball mass: {{ mass2 }}</label> &ensp;<input type="range" v-model="mass2" min="1" max="100" step="0.1" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/>
                <br>
                <label>Blue ball speed: {{ vel1 }}</label>&ensp;<input type="range" v-model="vel1" min="-10" max="10" step="0.1" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/> &emsp; &emsp;
                    <label>Red ball speed: {{ vel2 }}</label> &ensp;<input type="range" v-model="vel2" min="-10" max="10" step="0.1" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/><br>
            <label>Elasticity (bounciness): {{ elasticity }}</label> &ensp;<input type="range" v-model="elasticity" min="0" max="1" step="0.01" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/><br>
                </figure>
            </div>
        </p>
    </div>

</template>


<style scoped>

</style>