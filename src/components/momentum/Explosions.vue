<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

import {onMounted, ref} from 'vue'

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

const strength = ref(1.0)

var particles = [];

function runExplosion() {
    document.getElementById("explosion").innerHTML = ""

// create an engine
var engine = Engine.create();
    engine.gravity.y = 0;

    // create a renderer
var render = Render.create({
    element: document.getElementById('explosion'),
    engine: engine,
    options: {
        width: 800,
        height: 800,
        wireframes: false,
        background: "#000"
    }
});
// run the renderer
Render.run(render);
// create runner

var walls = [
        Bodies.rectangle(-50, 400, 100, 800, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(850, 400, 100, 800, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(400, -50, 800, 100, { isStatic: true, render: { visible: true }, restitution: 1 }),
        Bodies.rectangle(400, 850, 800, 100, { isStatic: true, render: { visible: true }, restitution: 1 })
    ];

  particles.length = 0; // reset
  const cols = 10;
  const rows = 10;
  const spacing = 30;
  const startX = 400 - (cols * spacing) / 2;
  const startY = 400 - (rows * spacing) / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const circle = Bodies.circle(startX + i * spacing, startY + j * spacing, 8, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: '#f39c12'
        }
      });
      particles.push(circle);
    }
  }

Composite.add(engine.world, [...walls, ...particles])
    var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

}

function Explode() {
    const center = { x: 400, y: 400 };

    particles.forEach(body => {
      const dx = body.position.x - center.x;
      const dy = body.position.y - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const forceMagnitude = strength.value * body.mass;

      Body.applyForce(body, body.position, {
        x: (dx / (distance * distance)) * forceMagnitude,
        y: (dy / (distance * distance)) * forceMagnitude
      });
    });


  }

onMounted(()=>{
    runExplosion()
})

</script>


<template>
    <div class="container h100 p-5">
        <h1>Explosions</h1><br>
        <p>
            <div v-show="page===0">
                A fair word of warning before I dissappoint you. This section is less about the flashy part of explosions and 
                more about how the pieces of something that explodes fly apart. So, we won't be talking about massive fireballs. With 
                that being said, let's define what an explosion really is in physics.
                <br><br>
                <figure>
                    <img src="/src/assets/momentum/Figure 74.png" >
                            <figcaption>
                                Figure 1: KA-BOOOOOOM! - Tavish Finnegan DeGroot
                            </figcaption>
                </figure>
                <br>
                An explosion generally involves an object fragmenting into multiple pieces, with all of the pieces being shot 
                off at some velocity. Rather than a collision, where multiple objects converge on each other and ricochet 
                off, an explosion usually involves a single intact object that fragments.
                <br><br>
                <span v-show="level>0">
                    I said that for momentum to be conserved, there can be no external forces. Well, here I have a caveat. If something 
                    explodes in midair, obviously it will experience an external force of gravity downwards. However, we do not 
                    care. The forces involved in the explosion are many orders of magnitude larger than gravity, and thus we can treat momentum 
                    as still conserved because the effect by the external forces is very negligible.
                    <br><br>
                </span>
                In an explosion, even though energy isn't conserved momentum still is. The total momentum of all the objects 
                at the end must be the same as the initial momentum of the original object prior to explosion. We do have one-dimensional 
                explosions sometimes, but most of the time these are two-dimensional momentum conservation problems.
                <br><br>
                <span v-show="level>0">
                    Let's start with a simple, one-dimensional explosion problem that incorporates the concept of projectile motion.
                    <br><br>
                    <div class="problem">
                        A projectile is launched at 30° above the horizontal with a speed of $v_0 = 15~\textrm{m/s}$. When the 
                        projectile is at the apex of its path, it explodes instantaneous into two identical fragments. One fragment 
                        momentarily has zero velocity and falls straight down. Where does the other piece land?
                        <br><br>
                        We've mixed together two concepts into a single problem. First, we want to recognize some things about the 
                        problem itself. When the particle is at its apex, this means it has no velocity in the y-direction and all 
                        of its velocity is horizontal. This indicates that we have a one-dimensional explosion on our hands.
                        <br><br>
                        The second things is that one of the pieces falls straight down, meaning it has zero velocity after the 
                        explosion. Since momentum must be conserved, we can use this piece of information to find the velocity of the 
                        particle after the explosion. The pieces are also identical, meaning each has half the mass of the original 
                        projectile.
                        <br><br>
                        $$ Mv_x = \dfrac{M}{2}(0) + \dfrac{M}{2} v_f $$
                        $$v_f = 2v_x $$
                        <br>
                        Now, we know that the other piece moves off with twice the velocity it was moving before. Two approaches 
                        present themselves here. The first is to just use kinematics and projectile-motion techniques to solve the problem 
                        conventionally. However, the second method uses clever reasoning to skip a lot of work.
                        <br><br>
                        I'm sure you know how to brute-force this problem, so I'll show you the clever reasoning method.
                        First, we want to recognize the fact that the x-direction velocity is not affected except by the explosion, and 
                        the y-direction velocity follows the same pattern as it would if there were no explosion. What I'm trying to 
                        say is that the time of flight is the same.
                        <br><br>
                        Because the time of flight is the same, we can conclude that the distance travelled is proportional to the 
                        velocity. Normally, the whole motion happens with an x-direction velocity of $v_x$ giving us a range of $R$, but 
                        now half of the motion happens at a velocity of $2v_x$. By proportionality rules, we can conclude that the new 
                        range $R'$ is defined as such:
                        <br><br>
                        $$ R' = \dfrac32 R $$
                        <br>
                        Plug in our old formula for the range, and we're all but done!
                        <br><br>
                        $$ R' = \dfrac32 \dfrac{ {v_0}^2 sin 2\theta}{g} = \bbox[3px,
                        border: 0.5px solid
                        white] {29.8 ~\textrm{m} } $$
                    </div>
                </span>
                <span v-show="level==0">
                    Let me present to you in simple one-dimensional terms for starters. Here's an example problem.
                    <br><br>
                    <div class="problem">Suppose we have a big block of mass $M$ that slides 
                    along at some speed $v$, until suddenly it explodes into two identical pieces! One of the pieces is found to be 
                    stationary after the explosion. How fast is the other block moving?
                    <br><br>
                    With that information, we can write momentum conservation. There are no external forces on the system, as the only 
                    force acting on it would be the force from the explosion (which is internal!). Energy isn't going to be 
                    conserved here because explosions tend to release energy (well, pretty obvious statement), but we have 
                    additional information: one piece isn't moving after the explosion.
                    <br><br>
                    This tells us that after the collision, $v=0$ for one piece. Therefore, we can find the velocity of the other piece 
                    using momentum balance. But wait! What are the masses? Well, it explodes into <b>identical pieces</b>, meaning each 
                    piece has a mass $M/2$.
                    <br><br>
                    $$ Mv = \dfrac{M}{2} (0) + \dfrac{M}{2}v_f$$
                    <br>
                    After doing some algebra, we arrive at the result:
                    <br><br>
                    $$ v_f = \bbox[3px,
                        border: 0.5px solid
                        white] {2v} $$
                    <br>
                    Thus, we conclude that the second piece must be moving with double the velocity of the original piece.
                    </div>
                </span>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                I couldn't have a lesson on literal explosions without having a demo you can play with. It's not the kind 
                of flashy, loud, and bright phenomenon you're used to, but it should suffice. Have fun, and also try to get 
                some intuition for two-dimensional explosions out of this as well!
                <br><br>
                <figure>
                <button class="btn btn-outline-primary" @click="Explode">💥</button>
                <div id="explosion"></div>
                <button class="btn btn-outline-primary" @click="runExplosion()">Reset</button><br>
                <label> Explosion Strength: {{ strength }} </label>&ensp;<input type="range" v-model="strength" min="0.5" max="20" step="0.01" style="outline: 2px solid #0078d7; border-radius: 8px;
                background: #e0e0e0"/>
                </figure>
                <br>
                A few technical details for the interested here. The explosion gets weaker with the square of the distance from the 
                point of origin of the explosion (like gravity!), which happens to be the exact center of the viewport. It's also radially directed from there. The middle 
                ball never moves because it is exactly at the center, so the explosion pushes on it equally in all directions, leading to 
                force balance.
                <br><br>
                When you're done playing with this (you can trigger the explosion multiple times, by the way), just go on to the 
                next page, where we're going to discuss two-dimensional explosions. This is probably more fun, though. 
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
                Now, we bump it up to two dimensions. The approach here is very similar. You just 
                employ the conservation of linear momentum for each dimension separately. This is 
                actually much easier than doing two-dimensional collisions because the algebra works out much more 
                nicely. 
                <br><br>
                <span v-show="level>0">
                    If you have more than three objects/fragments after the explosion, 
                    the motion of the objects cannot be completely determined without additional information. Even if 
                    you know their masses, total momentum, and even the energy given to them by the explosion, there isn't enough 
                    info. You <b>must</b> know the direction of motion of at least one object. This is part of the reason 
                    why explosions are so unpredictable in the real world.
                    <br><br>
                </span>
                We're usually going to deal with more than two objects, because the case with two objects can sometimes just 
                be simplified into a 1-D problem. Think about it this way: the explosion will exert the same impulse on each object and in 
                opposite directions, so their momentum changes are along the same line. <span v-show="level>0">using 
                    center-of-mass techniques, we can make such a problem trivial. Just work in the center-of-mass frame, where 
                    nothing is moving initially. Both objects have antiparallel velocities after the explosion, and then we just 
                    transform back to the original reference frame.
                </span>
                <br><br>
                That was probably a lot of words which I'm sure you understood. It's time to solidify your 
                understanding with practice. <span v-show="level>0">Instead of testing your algebra and 
                    trigonometry (which I already did in the last lesson), I'll test your concepts with 
                    a nice conceptual question.
                </span>
                <br><br>
                <div class="problem">
                    A firework can be modelled as a single object that explodes into six different, identical 
                    pieces in the air. The explosive powder is uniform and located exactly at the center of the firework.
                    What shape do the pieces make as they fall?
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 75.png" >
                        <figcaption>
                            Figure 2: What happens after the loud boom?
                        </figcaption>
                    </figure>
                    <br>
                    First, the initial shape of the pellets can be found relatively easily. The line about the uniform explosives should tip you off 
                    that all of the pieces should have the same speed after the explosion. Because momentum has to be conserved, this allows 
                    us to draw conclusions on what the shape the pieces will make immediately after the explosion.
                    <br><br>
                    Have you realized what it is now? Well, there has to be symmetry because all the pieces are identical and have the 
                    same speed. The most symmetry six points can have is if they make up a regular hexagon! Therefore, the 
                    six fragments will comprise a regular hexagon right after explosion. But that's not what we're asked!
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 76.png" >
                        <figcaption>
                            Figure 3: This is what happens.
                        </figcaption>
                    </figure>
                    <br>
                    Alright, but the pieces will fall under gravity. How does their shape change under those conditions?
                    <br><br>
                    That was a trick question. The shape would actually not change! Each piece is accelerating at the same 
                    rate because all of them are in projectile motion. Even though their velocities will change significantly, each one's 
                    relative velocity to the others will not. This means they don't get closer or further apart, which means they 
                    hold this hexagon shape. Neat!
                    <br><br>
                    Next time you see a firework star, take a close look at the shape of the 
                    glowing dots (not the actual path they trace out, but the tips of the paths) and see if it still looks roughly circular 
                    once they fade out. They should! I bet you never noticed that.
                </div>
                <br>
                This concludes our lesson on explosions. I'll bet that was just as exciting as seeing an explosion in theaters, or 
                maybe even in the real world! (You'll never know if I'm being serious.) This is also the conclusion to our momentum unit, which 
                introduced us to a key concept of in physics. You'll see me invoke this idea in the future, just like I still invoke the concept 
                of energy conservation long after we have passed that unit.
                <div class="btn-contain-left">
                    <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
                    </div>   

                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next Unit!
                    &rarr;</button>
            </div>      
            </div>
            
        </p>
    </div>

</template>


<style scoped>

</style>