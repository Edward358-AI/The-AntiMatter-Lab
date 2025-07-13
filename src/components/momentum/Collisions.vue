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
                Play around with this one-dimensional collision demo for a bit to get a feel for what we're going to be dealing with!
                <br><br>
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
            <br>
            Now, to explain what's going on. Essentially, you have two balls that collide with each other, with many parameters 
            you can adjust. You might have noticed that changing some of the parameters can cause something different to happen. However, 
            every collision here is unified by one thing: the fact that there are no net external forces on the system, ever. (Except when 
            the balls bounce off the wall, but whatever.)
            <br><br>
            This means that we need to deal with this kind of situation as a momentum-conservation problem. The way we do that is by 
            knowing that the total momentum of the system is zero. However, just knowing that isn't enough.
            <br><br>
            <span v-show="level>0">
                There are actually three types of collisions, classfied on the basis of energy conservation. Recall that momentum 
                will be conserved regardless of whether there are nonconservative internal interactions, but mechanical energy will not.
                <br><br>
                The first kind of collision is an <b>elastic collision</b>, where <b>all</b> mechanical energy is conserved. Usually, this 
                just means that kinetic energy is conserved, since we're dealing with things that collide on a flat one-dimensional surface right now.
                <br><br>
                The next kind is an <b>inelastic collision</b>, where some mechanical energy is lost during the collision. This is 
                a pretty general case that covers every case between the two extremes.
                <br><br>
                The final extreme is the <b>totally inelastic collision</b>, where the objects <b>stick together</b> and move as one 
                after the collision. This is the case where the maximum possible amount of mechanical energy will be lost.
                <br><br>
                Not all of these are made equal. Problems wit totally inelastic collisions and elastic collisions get the majority 
                of the spotlight because they are interesting both physically and mathematically, while inelastic collisions get 
                sidelined a lot. I think this is for good reason, so I'll be perpetuating this trend. First, we'll work on the totally 
                inelastic case.
                <br><br>
                <div class="problem">
                    Two train cars are on a frictionless rail. The rear car is empty, having a mass of 700 kg. The forward car is loaded 
                    with coal and has a much larger mass of 5000 kg. Suddenly, the rear car is magically given a velocity of $v = 4.0 ~\textrm{m/s}$
                    towards the coal car. The cars couple together when they touch. What is their final velocity?
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 70.png" width="750px">
                            <figcaption>
                                Figure 1: Mild railway incident.
                            </figcaption>
                    </figure>
                    <br>
                    If you read carefully, it becomes obvious that this is a totally inelastic collision, since the two railway 
                    cars latch together after impact. This means they move with the same velocity, so we can essentially treat them as one object. With that knowledge, we can write momentum-conservation equations. This is done by 
                    setting total initial momentum equal to total final momentum.
                    <br><br>
                    $$ m_R v = (m_R + m_F) v_f $$
                    <br>
                    I have used the subscripts $R$ and $F$ to denote the rear and forward cars, respectively. This becomes a 
                    very easy problem to solve now. The algebraic manipulation and substitution should be simple, so I won't show it here.
                    <br><br>
                    $$ v_f = \bbox[3px,
                        border: 0.5px solid
                        white] { 0.491 ~\textrm{m/s} } $$
                </div>
            </span>
            <span v-show="level==0">
                There are actually three different types of collisions, classified based on energy conservation. Yes, that 
                concept's back. Both conservation concepts are united in this section!
                <br><br>
                The <b>elastic collision</b> involves mechanical energy and momentum being conserved.
                <br><br>
                The <b>totally inelastic collision</b> involves the two objects sticking together after impact. This is when the max possible amount of 
                mechanical energy is lost.
                <br><br>
                The <b>inelastic collision</b> covers all cases in between where some mechanical energy is lost.
                <br><br>
                Out of these three, only the elastic collision and totally inelastic collision are of any note. The inelastic collision is just 
                there and isn't very special, so we tend not to focus on it too much. With that said, we can first start by discussing the totally 
                inelastic collision.
                <br><br>
                The objects stick together in this kind of collision, which should tell us that we can treat them as a single object! Indeed, 
                they have to have the same velocity, so we tend to just group them together and treat them as a single object having the mass 
                of the individual objects added up. This is the general approach used to solve these inelastic collision problems, along with 
                the principle of conservation of linear momentum. 
                <br><br>
                If you want to see this case on the simulation, you can turn the "elasticity" slider all the way down to zero. 
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                The next case we're going to talk about is the <b>elastic collision</b>, where both mechanical energy 
                and momentum are going to be conserved.
                <br><br>
                <span v-show="level>0">
                    We can write the following two conditions for an elastic collision in this case:
                    <br><br>
                    $$ E = \textrm{const.} $$
                    $$ p = \textrm{const.} $$
                    <br>
                    For a system of two objects, this can be more concretely written. We'll assume we have all masses and write velocities in.
                    <br><br>
                    $$ \dfrac12 m_1 {v_{1i} }^2 + \dfrac12 m_2 {v_{2i} }^2 = \dfrac12 m_1 {v_{1f} }^2+ \dfrac12 m_2 {v_{2f} }^2$$
                    <br>
                    $$ m_1v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} $$
                    <br>
                    This does <b>NOT</b> look fun to deal with. If you're like me and are always looking for mathematical shortcuts to reduce your 
                    work, you're in luck here! You can derive a result that allows you to simplify your mathematical lives significantly. We just 
                    want to do a bit of algebraic mainpulation of the two equations above... (Disclaimer: I want to show the derivation, but I'm not expecting 
                    you to know it. Knowing the result is enough.)
                    <br><br>
                    $$  m_1 {v_{1i} }^2 -  m_1 {v_{1f} }^2 =  m_2 {v_{2f} }^2 - m_1 {v_{2i} }^2+ $$
                    <br>
                    $$ m_1v_{1i} - m_1 v_{1f} = m_2 v_{2f} - m_2 v_{2i} $$
                    <br>
                    Once we do some light algebra to both conservation equations, we can do a magical trick. I'm being sarcastic, it's just slightly tricky algebra. Remeber the difference of squares? 
                    Are you seeing the vision? We can divide the two equations to arrive at the result:
                    <br><br>
                    $$ v_{1i} + v_{1f} = v_{2f} + v_{2i} $$
                    <br>
                    There's a better form to write this in that can be more helpful when solving problems.
                    <br><br>
                    $$ v_{1i} - v_{2i} = v_{2f} - v_{1f} $$
                    <br>
                    Let's unpack this equation. After moving the terms describing initial velocities and final velocities to their 
                    respective sides, we can see that both sides of the equation are expressions of relative velocity! To be specific, 
                    the equation states that <b>the relative velocity of approach</b> is equal to <b>the relative velocity of recession</b> 
                    between two objects undergoing an elastic collision!
                    <br><br>
                    This equation is actually a consequence of the fact that the center-of-mass velocity is constant in these scenarios. We can 
                    work in the center-of-mass frame, in which the total momentum must be zero because in that frame $ v_{cm} = 0 $$, and center of mass 
                    velocity is directly related to momentum. This is a different technique for these problems and a valid one, though it's not one I 
                    tend to use or talk about often.
                    <br><br>
                    The formula talks about relative velocity, so the signs that you see there are not set in stone. Just keep in mind
                    the idea of relative velocity, and you'll be all good to use this equation for all your elastic-collision needs. Here's 
                    an exericse to test exactly that.
                    <br><br>
                    <div class="problem">
                        A tungsten bullet with a mass of 30 grams is fired at a metal cube that has a mass of 4.0 kg with a muzzle velocity 
                        of 1200 m/s. The bullet ricochets off the cube in a perfectly elastic one-dimensional collision. What are the final velocities of the bullet and cube?
                        <br><br>
                        <figure>
                        <img src="/src/assets/momentum/Figure 71.png" width="750px">
                            <figcaption>
                                Figure 2: This feels so incomprehensible without context.
                            </figcaption>
                        </figure>
                        <br>
                        This is just an elastic collision scenario. We know the initial masses and velocities of the objects, and we need 
                        to find their final velocities using our equations. First, we want to "guess" at the directions of motion of the 
                        objects after the collision. I'll say the bullet is going to the left, and the block will be going to the right.
                        With this, we now have defined directions for our momentum vectors.
                        <br><br>
                        Here is our momentum conservation equation. I've defind bullet mass as $m$, block mass as $M$, and initial bullet velocity as $v_0$.
                        <br><br>
                        $$ mv_0 = M v_{Mf} - mv_{mf} $$
                        <br>
                        Now, we can write our second equation using the relative velocity relation.
                        <br><br>
                        $$ v_0 = v_{Mf} + v_{mf} $$
                        <br>
                        We add the velocities on the right side because both objects are receding from each other, meaning their relative velocity 
                        is the sum of their speeds. Now, we just need to do some simple algebra.
                        <br><br>
                        $$ mv_0 = M (v_0 - v_{mf}) - m v_{mf} $$
                        <br>
                        $$ (m+M) v_{mf} = (M-m) v_0 $$
                        <br><br>
                        This gives us the speed of the bullet after collision:
                        <br><br>
                        $$ v_{mf} = \bbox[3px,
                        border: 0.5px solid
                        white] {1182 ~\textrm{m/s} }$$
                        <br>
                        With this, we can find the speed of the block with a minimal amount of extra effort.
                        <br><br>
                        $$ v_{Mf} = v_0 - v{mf} = \bbox[3px,
                        border: 0.5px solid
                        white]{17.9 ~\textrm{m/s} }$$
                        <br>
                        That's the general gist of it!
                    </div>
                </span>
                <span v-show="level==0">
                    If you want to strictly follow the definition, then you would set initial kinetic energies equal to 
                    final kinetic energies as well as setting 
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