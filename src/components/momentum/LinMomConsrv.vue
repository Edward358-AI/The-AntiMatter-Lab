<script setup>
 import { onMounted, ref} from 'vue'
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])


const inputValue = ref('1')

 function runNewtonsCradle() {
     document.getElementById("newtoncradle").innerHTML = ""
     var Engine = Matter.Engine,
         Render = Matter.Render,
         Runner = Matter.Runner,
         Body = Matter.Body,
         Composites = Matter.Composites,
         MouseConstraint = Matter.MouseConstraint,
         Mouse = Matter.Mouse,
         Composite = Matter.Composite

     // create engine
     var engine = Engine.create(),
         world = engine.world

     // create renderer
     var render = Render.create({
         element: document.getElementById("newtoncradle"),
         engine: engine,
         options: {
             width: 600,
             height: 400,
             showVelocity: true,
             wireframes: false,
             background: "#000"
         }
     })
     Render.run(render)

     // create runner
     var runner = Runner.create()
     Runner.run(runner, engine)
     
     // allow for customization

     // see newtonsCradle function defined later in this file
     var cradle = newtonsCradle(180, 100, 6, 30, 200)
     Composite.add(world, cradle)
     Body.translate(cradle.bodies[0], { x: -150, y: -100 })
     if (inputValue.value >= 2 && inputValue.value <=6) {
         Body.translate(cradle.bodies[1], { x: -145, y: -90 })
     }
     if (inputValue.value >= 3 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[2], { x: -140, y: -80})
     }
     if (inputValue.value >= 4 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[3], { x: -135, y: -70})
     }
     if (inputValue.value >= 5 && inputValue.value <= 6) {
        Body.translate(cradle.bodies[4], { x: -130, y: -60})
     }
     if (inputValue.value == 6) {
        Body.translate(cradle.bodies[5], { x: -125, y: -50})
     }
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

    Composite.add(world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 50 },
        max: { x: 600, y: 400 }
    })
}

onMounted(() => {
    runNewtonsCradle()
})

function newtonsCradle(xx, yy, number, size, length) {
    var Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies

    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' })

    for (var i = 0; i < number; i++) {
        var separation = 1.9,
            circle = Bodies.circle(xx + i * (size * separation), yy + length, size,
                { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, slop: size * 0.05 }),
            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle })
        circle.render.fillStyle = "#001166"

        Composite.addBody(newtonsCradle, circle)
        Composite.addConstraint(newtonsCradle, constraint)
    }

    return newtonsCradle
}
</script>


<template>
    <div class="container h100 p-5">
        <h1>Conservation of Linear Momentum</h1><br>
        <p>
        <figure>
        <div id="newtoncradle"></div><br>
        <button class="btn btn-outline-primary" @click="runNewtonsCradle()">Reset</button>
        <br>
        
            <span><label>Number of balls: {{ inputValue }}</label></span><br>
            <input type="range" v-model="inputValue" min="1" max="6" step="1" style="outline: 4px solid #c3c3c3"/>

        </figure>

        </p>
       
    </div>

</template>


<style scoped></style>