<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import { ref, onMounted, watch } from 'vue'

const inputInertia = ref(30)
const elasticity = ref(1)

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

let rod, ball
let engine, render, runner

function runAngCollision() {
  document.getElementById("angularcollision").innerHTML = ""

  engine = Engine.create()
  engine.gravity.y = 0

  render = Render.create({
    element: document.getElementById("angularcollision"),
    engine: engine,
    options: {
      width: 600,
      height: 600,
      wireframes: false,
      background: "#000"
    }
  })

  Render.run(render)

  rod = Bodies.rectangle(300, 300, 50, 400, {
    render: { fillStyle: "#888" },
    inertia: 1000 * Math.pow(inputInertia.value, 2),
    frictionAir: 0
  })

  const pivot = Constraint.create({
    bodyA: rod,
    pointB: { x: 300, y: 300 },
    stiffness: 1,
    length: 0,
    damping: 0,
    render: { strokeStyle: "#fff", lineWidth: 3 }
  })

ball = Bodies.circle(100, 400, 40, {
    render: { fillStyle: "cyan" },
    restitution: Math.abs(elasticity.value),
    frictionAir: 0,
    mass: 30
  })

  const walls = [
    Bodies.rectangle(-50, 300, 100, 800, { isStatic: true }),
    Bodies.rectangle(650, 300, 100, 800, { isStatic: true }),
    Bodies.rectangle(300, -50, 800, 100, { isStatic: true }),
    Bodies.rectangle(300, 650, 800, 100, { isStatic: true })
  ]

  Composite.add(engine.world, [rod, pivot, ball, ...walls])

  runner = Runner.create()
  Runner.run(runner, engine)

  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.01,
      damping: 0,
      render: { visible: false }
    }
  })

  Composite.add(engine.world, mouseConstraint)
  render.mouse = mouse
}

onMounted(() => {
    runAngCollision()
})

// Watch inertia changes and update the body
watch(inputInertia, (newVal) => {
    if (rod) {
        const newInertia = 1000 * Math.pow(newVal, 2)
        Body.setInertia(rod, newInertia)
    }
})

watch(elasticity, (newVal) => {
    if (ball) {
        ball.restitution = Math.abs(newVal),
        Body.set(ball, { isSleeping: false })
    }
})

</script>

<template>
    <div class="container h100 p-5">
        <h1>Rotational Kinetic Energy and Angular Momentum</h1><br>
        <p>
            <div v-show="page===0">
                Believe it or not, rotating objects have kinetic energy as well. This is the rotating counterpart to translational kinetic energy
                ($K = \frac12 mv^2$) <span v-show='level>0'>and arises due to the kinetic energy of each individual point on a rotating object. This is 
                    often hard to calculate however, so we just use a catch-all formula to describe the kinetic energy of rotation.
                </span> Something can have 
                both translational and rotational kinetic energy, as you might have expected. The basic equation for rotational 
                kinetic energy is very simple:
                <br><br>
                $$ K = \dfrac12 I \omega^2 $$
                <br>
                Another case where the rotational quantity is analogous to the linear one. Of course, we can't talk about energy without also 
                talking about work. Torque can do work as well, which often is converted into rotational kinetic energy. The formula is:
                <br><br>
                $$W = \tau \Delta \theta $$
                <br>
                <span v-show="level==2">
                    There's an integral form of this as well, as you probably guessed.
                    <br><br>
                    $$ W = \int_{\theta_i}^{\theta_f} \tau ~d\theta $$
                    <br>
                </span>
                Of course, we can't forget about power. I bet you could have guessed this formula without me showing it.
                <br><br>
                $$ P = \tau \omega $$
                <br>
                <b>None of these are new quantities!</b> They are <b>not</b> the rotational analogues of what we already know. Kinetic energy is still just energy, 
                and work is the same work described by the formula $W = F \cdot x$. These are simply new ways of calculating these quantities 
                when rotation is involved.
                <br><br>
                This is all pretty elementary stuff that only builds off of what we already know, so I won't go too much 
                into depth about it. These ideas are important, but not difficult or lengthy enough to 
                warrant their own section, so I've grouped them in with angular momentum. Speaking of that, the next concept (angular momentum) is much more complex and interesting.
                <span v-show="level>0">
                    <br><br>
                    Before we move on, though, let's try a short practice problem.
                    <br><br>
                    <div class="problem">
                        What is the total kinetic energy of a hollow ball of mass $m$ and radius $R$ that rolls with some speed $v$ without slipping?
                        <br><br>
                        This hearkens back to our last lesson, so I hope you were paying attention there. There are two ways to go about this. The first 
                        is to consider both the linear motion of the ball and treat the rotational motion as if it were around the center of the object.
                        In this case, the linear speed of the ball is $v$ and the angular velocity of the ball is $\omega = v/r$.
                        <br><br>
                        $$ K = \dfrac12 mv^2 + \dfrac12 \left( \dfrac{2}{3} m r^2\right) \left( v/r \right)^2$$
                        $$ K = \dfrac12 mv^2 + \dfrac13 m v^2 = \bbox[3px,
                        border: 0.5px solid
                        white]{\dfrac{5}{6} mv^2} $$
                        <br>
                        The other method is the one I like better. Consider the motion as just pure rotation around the point of contact with the ground. 
                        We can the write the kinetic energy as just one term: the rotational kinetic energy around that point.
                        <br><br>
                        $$ K = \dfrac12 \left( \dfrac{5}{3} mr^2 \right) \left( v/r \right)^2 $$
                        $$ K = \bbox[3px,
                        border: 0.5px solid
                        white]{\dfrac{5}{6} mv^2} $$
                    </div>
                </span>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                Angular momentum is a kind of momentum of rotating objects. Unlike the energy concepts we covered previously, it is 
                separate from linear momentum and follows its own rules. We also have a conservation law for angular momentum, but the 
                criterion for the conservation of angular momentum is slightly different.
                <br><br>
                As you might guess, the angular momentum hinges on the idea of moment of inertia and angular velocity. The general formula 
                for an object is:
                <br><br>
                $$ L = I \omega$$
                <br>
                Angular momentum is conserved whenever there is no net external torque on the system, as you might have guessed.
                <br><br>
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>The Law of Conservation of Angular Momentum:</strong><br><i>Angular momentum is conserved about an axis when 
                    there is no net external torque about that axis.
                </i>
                </div>
                <br>
                So far, this mirrors the conditions and 
                definitions for plain old regular momentum, which we covered in depth in our last section. The only thing is, we have to consider torque 
                about a specific axis, since angular momentum is measured around a particular axis.
                <br><br>
                But here's where it gets interesting! You can actually have angular momentum for objects moving in a line! Here's a demo to show 
                that off. The ball moves in a line, but can give the rod some angular momentum (by causing it to spin) when it 
                collides with it! Try throwing the ball at the rod to see what happens.
                <br><br>
                <figure>
                    <div id="angularcollision"></div>
                    <button class="btn btn-outline-primary" @click="runAngCollision()">Reset</button><br>
                    <label>Moment of Inertia: {{ inputInertia }}</label>&ensp;<input type="range" v-model="inputInertia" min="1" max="100" step="1" style="outline: 2px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/> &emsp; &emsp; <label>Elasticity: {{ elasticity }}</label>&ensp;<input type="range" v-model="elasticity" min="0" max="1" step="0.1" style="outline: 2px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/>
                </figure>
                <br>
                You're also able to dynamically change the moment of inertia, but that can lead to some wacky results (as would be expected, since 
                you can't just change the moment of inertia all willy-nilly in the real world). 
                <br><br>
                The rod obviously gains some angular momentum after the ball collides with it! This means that the ball transferred angular momentum 
                to the rod, <b>despite only having moved in a straight line!</b> Indeed, any object has angular momentum as long as it's 
                moving. This angular momentum is defined relative to the axis of rotation:
                <br><br>
                $$ L = \vec{p} \cross \vec{r} = mvh $$
                <br>
                I've defined $h$ as the "height" that the ball is from the center of rotation. Of course, we aren't always going to be dealing 
                with the y-direction, but it's just a more concrete way of visualizing the cross product. This essentialy states that the angular momentum 
                is equal to angular momentum that the ball would have at the point of impact, if it were to rotate about that particular axis. 
                <br><br>
                The cross product definition above is technically the more general form of angular momentum, but our $L = I \omega$ works better 
                for rigid objects. The above formula really only works well for point objects, as we would have to apply that formula to each point 
                in a rigid body to find the total angular momentum. And that takes calculus, not to mention a whole lot of work.
                <br><br>
                <span v-show='level>0'>
                    Note that we can choose any reference point for angular momentum of a ball moving in a line. We are almost always 
                    going to just choose the point where the system would rotate around, but keep in mind that the choice of rotational axis 
                    is arbitrary. Moreover, we also sometimes need to choose the axis around which there is zero net external torque such that 
                    angular momentum is actually conserved.
                    <br><br>
                </span>
                Well, regular momentum has a direction, so angular momentum should have one as well, right? Well, yes, but it's not in the direction
                that you might expect! Instead of being in the plane of rotation, it points <b>out</b> of the plane of rotation!
                <br><br>
                <figure>
                    <img src='/src/assets/rotation/Figure 95.png' width='700px'/>
                    <figcaption>Figure 1: The direction of angular momentum.</figcaption>
                </figure>
                <br>
                <span v-show="level==0">
                    The exact reason for all the directions requires a pretty lengthy explanation, so just know this. A counterclockwise rotation means 
                    that the angular velocity vector is upwards, out of the plane of the page, and a clockwise rotation means the vector is into the page. 
                    Since angular momentum is directly proportional to angular velocity, the angular momentum is in the same direction as the 
                    angular velocity vector.
                </span>
                <span v-show="level>0">
                    Why is this? Well, it has to do with the cross product. We have something called the <b>right-hand rule</b> for evaluating 
                    the direction of quantities that have to do with cross products as well as angular quantities in general. You might have 
                    noticed that angular velocity points out of the plane of rotation. This means it either points out of the page or into the 
                    page. 
                    <br><br>
                    The way we figure out the direction of angular angular velocity is actually a cross product (the strict definition is $v = \omega \times r$), but 
                    it can be simplified because of the nature of rotation. To find the direction of the angular velocity, we simply curl our right hand 
                    around the axis of rotation, making sure our fingers curl in the direction of rotation. The direction that our thumb 
                    points in is the direction of the angular velocity vector. Simple! Just don't use your left hand, because that'll give you the wrong direction. Sorry if 
                    you're left handed!
                    <br><br>
                    Since angular momentum is related to angular velocity as $ L = I \omega$, the direction of angular momentum is the 
                    same as the direction of angular velocity. Remember this right-hand rule, because there will be more in the future...
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
        </p>
    </div>
</template>

<style scoped>

</style>