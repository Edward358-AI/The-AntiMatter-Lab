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
             width: 700,
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
     var cradle = newtonsCradle(160, 100, 6, 30, 200)
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
        <div v-show="page===0">
            Have you ever heard of the Newton's Cradle? It's that one physics "toy" that many executives and businessmen 
            have lying on their office desks, with metal balls hitting each other. Yeah, you know what I'm talking about. Even 
            if you didn't, here's an interactive demonstration anyways. You can move the balls around, but try not to break anything. (Not that 
            it really matters if you do, there's a reset button.)
            <br><br>
        <figure>
        <div id="newtoncradle"></div><br>
        <button class="btn btn-outline-primary" @click="runNewtonsCradle()">Reset</button>
        <br>
            <span><label>Number of balls: {{ inputValue }}</label></span><br>
            <input type="range" v-model="inputValue" min="1" max="6" step="1" style="outline: 4px solid #0078d7; border-radius: 8px;
            background: #e0e0e0"/>

        </figure>
        <br>
        Now, what does this have to do with momentum? Well, notice that the number of balls set in motion initially is 
        equal to the number of balls that "pop up" after they collide. And, at least at first, the balls seem to fly 
        away with equal velocities. The physics engine isn't perfect, so eventually the behavior decomposes.
        <br><br>
        This indicates that the momentum carried by the balls coming in is the same as the momentum carried by the balls 
        leaving! This leads us to a new physics principle: the conservation of mechanical energy.
        <br><br>
        <span v-show="level>0">
            Like the conservation of energy principle, there are certain conditions that must be satisfied for momentum 
            to be conserved. The conditions are very similar, but a little less restrictive. The total linear momentum 
            of a system will be conserved if no net external force acts on the system. A key takeaway is that like energy, momentum 
            is conserved for a <b>system</b> of objects, not typically just a single object.
            <br><br>
            You might recall from our discussion of energy that mechanical energy is not conserved if there are nonconservative interactions. 
            Well, momentum simply does not care about this. Internal forces, be they conservative or not, will still result in 
            conservation of linear momentum. In fact, we'll learn about cases where momentum is conserved but mechanical energy is not.
            <br><br>
            We can use the idea of impulse to explain why internal interactions conserve momentum. According to Newton's Third Law, 
            if one object exerts an impulse on another, it will recieve an oppositely directed and equal impulse from that object. This means 
            the total change in momentum of the two objects as a system will be zero!
        </span>
        <span v-show="level==0">
            Now, we said before that mechanical energy isn't always conserved. The same is true for linear momentum! The conditions 
            for conservation of linear momentum are actually more general than the conditions for conservation of mechanical energy, if 
            you can believe it. However, the way we think of momentum conservation is slightly different than energy.
            <br><br>
            First off, what do we mean by conservation of momentum? What are the objects we're going to deal with? Well, we're almost always dealing with a <b>system</b> of objects. Think about two 
            balls hitting each other. Neither ball's momentum is individually conserved, but their sum, which is equal to the total linear momentum 
            of the system, will be conserved after the interaction.
        </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>

        </div>
        <div v-show="page===1">
            <span v-show="level>0">
                There is another key idea that is associated with conservation of linear momentum. If all of the previous 
                conditions are satisfied, we can conclude that another fact must be true. I'm going to introduce the idea of the 
                center of mass, which can be thought of as where a system will "balance" under the influence of gravity. It's really 
                the normalized form of the first moment of mass, however:
                <br><br>
                $$ x_{cm} = \dfrac{m_1 x_1 + m_2 x_2 + m_3 x_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                This can be written as a summation, and I think you could do it just by analyzing this equation. Because we're trying to 
                go over this concept for the sake of momentum, I won't write it here.
                 The center of mass velocity and acceleration are defined similarly.
                <br><br>
                $$ v_{cm} = \dfrac{m_1 v_1 + m_2 v_2 + m_3 v_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                $$ a_{cm} = \dfrac{m_1 a_1 + m_2 a_2 + m_3 a_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                For the condition of no net external force on a system, the center of mass acceleration will be zero (if you generalize 
                Newton's Second Law to entire systems, you will get this result). This means that the center of mass 
                velocity will remain constant while momentum is conserved. We will talk about the center of mass in detail in a future lesson.
                <br><br>
                The "center of mass" is really an abstract concept that isn't tangible. However, if we draw in the center of mass on a 
                diagram and calculate how it moves while bodies in a system are interacting with each other, we will see that even if the motion 
                of the bodies in the system is very chaotic, the center of mass remains moving in a straight line with constant velocity. If you don't understand 
                this now, don't worry.
                <br><br>
                With that little detour out of the way, we can finally express the Conservation of Linear Momentum in words:
            </span>
            <span v-show="level==0">
                With that, we can talk about the conditions under which linear momentum will be conserved. It's actually a very simple 
                and elegant condition: linear momentum is conserved if no net external force acts on the system. This might sound 
                very similar to the condition for mechanical energy conservation, but with one key difference.
                <br><br>
                Mechanical energy is only conserved if there are no nonconservative internal forces. In other words, if the objects in the 
                system have friction with each other, mechanical energy won't be conserved. However, momentum is always conserved as long 
                as there is no net external force. Even nonconservative internal interactions will preserve the total momentum.
                <br><br>
                Our old friend Newton's Third Law comes in here to help explain why. Newton's Third Law states that a force will have an equal an 
                opposite reaction force, which means that an impulse exerted by object A on object B will result in an equal and opposite impulse 
                exerted from object B on object A. This means the total change in momentum of the system balances out to be zero, since the two 
                impulses are equal and oppositely directed! See, the old concepts we learned such a long time ago are still coming to haunt &mdash; I mean help 
                &mdash; us!
                <br><br>
                We can finally write the sentence that codifies the conservation of linear momentum:
            </span>
            <br><br>
            <div class="problem"style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    <b>The Law of Conservation of Linear Momentum:</b> 
                    <br><i>If no net external force acts on a system, the total momentum of the system must remain constant.
                    </i>
                </div>
            <br>
            This might not seem useful right now, but in some specific scenarios it is essential to use this result in 
            order to solve problems. By itself, this conservation law actually cannot really solve problems, but given 
            just a few more initial conditions and/or constraints, we can unleash the full potential of this new conservation law.

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
            We will be talking more in-depth about the two most common types of momentum problems, but here I'm going to present 
            a very generalized problem on momentum just to get you started.
            <br><br>
        </div>
        </p>
       
    </div>

</template>


<style scoped></style>