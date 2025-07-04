<script setup>
// import { onMounted } from 'vue'
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])


// function runNewtonsCradle() {
//     document.getElementById("newtoncradle").innerHTML = ""
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         Body = Matter.Body,
//         Composites = Matter.Composites,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         Composite = Matter.Composite

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world

//     // create renderer
//     var render = Render.create({
//         element: document.getElementById("newtoncradle"),
//         engine: engine,
//         options: {
//             width: 600,
//             height: 400,
//             showVelocity: true,
//             wireframes: false,
//             background: "#000"
//         }
//     })

//     Render.run(render)

//     // create runner
//     var runner = Runner.create()
//     Runner.run(runner, engine)

//     // see newtonsCradle function defined later in this file
//     var cradle = newtonsCradle(180, 100, 5, 30, 200)
//     Composite.add(world, cradle)
//     Body.translate(cradle.bodies[0], { x: -150, y: -100 })

//     // add mouse control
//     var mouse = Mouse.create(render.canvas),
//         mouseConstraint = MouseConstraint.create(engine, {
//             mouse: mouse,
//             constraint: {
//                 stiffness: 0.2,
//                 render: {
//                     visible: false
//                 }
//             }
//         })

//     Composite.add(world, mouseConstraint)

//     // keep the mouse in sync with rendering
//     render.mouse = mouse

//     // fit the render viewport to the scene
//     Render.lookAt(render, {
//         min: { x: 0, y: 50 },
//         max: { x: 600, y: 400 }
//     })
// }

// onMounted(() => {
//     runNewtonsCradle()
// })

// function newtonsCradle(xx, yy, number, size, length) {
//     var Composite = Matter.Composite,
//         Constraint = Matter.Constraint,
//         Bodies = Matter.Bodies

//     var newtonsCradle = Composite.create({ label: 'Newtons Cradle' })

//     for (var i = 0; i < number; i++) {
//         var separation = 1.9,
//             circle = Bodies.circle(xx + i * (size * separation), yy + length, size,
//                 { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, slop: size * 0.02 }),
//             constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle })
//             circle.render.fillStyle = "#001166"

//         Composite.addBody(newtonsCradle, circle)
//         Composite.addConstraint(newtonsCradle, constraint)
//     }

//     return newtonsCradle
// }
</script>


<template>
    <div class="container h100 p-5">
        <h1>Conservation of Linear Momentum</h1><br>
        <!-- <div id="newtoncradle"></div><br>
        <button class="btn btn-outline-primary" @click="runNewtonsCradle()">Reset</button> -->
        <p>

        </p>
    </div>

</template>


<style scoped></style>