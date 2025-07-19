<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
import {onMounted} from 'vue'

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


function runWrench() {
    document.getElementById("wrench").innerHTML = ""

// create an engine
var engine = Engine.create();

engine.gravity.y = 0;

    // create a renderer
var render = Render.create({
    element: document.getElementById('wrench'),
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

var wrenchBody = Bodies.rectangle(400, 300, 200, 30, {
    render:{fillStyle: 'cyan'}
})

var wrenchHead = Bodies.rectangle(300,300,50,50,{
    render:{fillStyle:'cyan'},
})

var wrench = Body.create({
    parts: [wrenchBody, wrenchHead],
    frictionAir: 0.05,
    mass: 10
})
var pivot = Bodies.circle(300,300,10,{
    render:{ visible:false },
    isStatic: true,
    collisionFilter: {
        mask: 0
    }
})

var hand = Bodies.rectangle (500, 400, 40, 40,
    {
    render:{fillStyle:'red'},
    mass: 0.1
}
)


var constraint1 = Constraint.create({
    bodyA: wrench,
    pointA: {x:-70, y:0},
    bodyB: pivot,
    stiffness: 1,
    length: 0,
    damping: 1.2,
    render: { strokeStyle: '#fff', lineWidth: 3 }
});

var constraint2 = Constraint.create({
    bodyB: hand,
    bodyA: wrench,
    pointA: {x:100, y:0},
    stiffness: 0.5,
    length: 100,
    damping: 0,
    render: { strokeStyle: '#fff', lineWidth: 3 }
})

Composite.add(engine.world, [wrench, pivot, hand, constraint1, constraint2])

//only wrench feels gravity
Matter.Events.on(engine, 'beforeUpdate', () => {
Body.applyForce(wrench, wrench.position, {
    x: 0,
    y: 0.005 * wrench.mass
  });
});

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
    runWrench()
})

</script>


<template>
    <div class="container h100 p-5">
        <h1>Torque</h1><br>
        <p>
        <div v-show="page===0">
            You might have heard the term "torque" when talking about engines, alongside horsepower. The second is just a 
            measure of power, which we know how to deal with. But torque, on the other hand, determines how powerful the 
            initial acceleration of the car is. Engines that can produce a higher torque can accelerate much faster, usually 
            at the expense of having a lower top speed. In simple terms, it's rotational force.
            <br><br>
            The idea of torque is more simple than the concepts behind it. First, I want to introduce a new vector operator 
            that is required to understand torque and many other parts of this chapter, the cross product.
            <br><br>
            <span v-show="level>0">
                The cross product is represented with a multiplication sign, written as $ \vec{a}\times\vec{b}$. It measures 
                orthogonality as opposed to how the dot product measures how parallel vectors are. It's kind of the opposite 
                of the dot product in that sense, but it's more nuanced than that.
                <br><br>
                <span v-show="level==2">
                    This concept is actually vector calculus, involving complex topics such as the determinant of a three-dimensional 
                    matrix. You can explore these definitions on your own, but this level of understanding is unnecessary for 
                    this level of physics.
                    <br><br>
                </span>
                The cross product is geometrically defined as the area made by the parallelogram that has the two vectors as the two 
                different legs. This is its magnitude, but unlike the dot product <b>it is also a vector.</b> This means that we have to 
                account for the direction, which is defined as perpendicular to both vectors being operated on. How is that possible? In
                three dimesions, that's how.
                <br><br>
                Now is a good time to introduce the mathematical definition of the cross product. It considers two vectors with an angle $\theta$ between them.
                <br><br>
                $$ \vec{a} \times \vec{b} = |\vec{a}||\vec{b}| \sin \theta$$
                <br>
                Of course, I've left out the direction, but it's perpendicular to both vectors. Now's the proper time to show you what that actually means.
                <figure>
                    <img src="/src/assets/rotation/Figure 79.png" width="500px"/>
                    <figcaption>Figure 1: The cross product in green.</figcaption>
                </figure>
                There is a plane at the bottom of the page to indicate perspective. You see now that the cross product is inherently three-dimensional 
                in nature. This formula is enough for our torque purposes, but if you plan on going on into more advanced topics 
                a more thorough discussion of this topic would be required.
                <br><br>
                Essentially, what's happening with the formula is we are taking the perpendicular component of either vector and multiplying it with the 
                magnitude of the other. Thus, in order to calculate the cross product given two vectors we want to find the component of one that is perpendicular 
                to the other. This is what we will do for torque, and this is what the vast majority of physics problems that involve the cross product expect 
                you to do.
                <br><br>
                While an algebraic technique exists as well, this is the technqiue far more commonly seen in physics, and it's the one I'll use 
                to explain torque. The algebraic formula is also exceedingly long and difficult to memorize, unless you have familiarity with 
                three-dimensional matrices.
            </span>
            <span v-show="level==0">
                The cross product is kind of the opposite of the dot product. Instead of measuring how parallel two vectors are, it measures 
                how perpendicular they are. This is starting to make the cross product look just like the dot product, but there's one key difference.
                <br><br>
                The result of a dot product is a scalar quantity. But the result of a cross product is a <b>vector</b>! The direction of this vector 
                is defined such that it is perpendicular to both of the vectors in the operation. But wait, you might be saying, how is that 
                possible? In three, dimensions, of course!
                <br><br>
                <figure>
                    <img src="/src/assets/rotation/Figure 79.png" width="500px"/>
                    <figcaption>Figure 1: The cross product in green.</figcaption>
                </figure>
                <br>
                The grey rectangle is a plane that provides perspective for the illustration, which is in three dimensions. Now do you 
                see what I'm talking about? The magnitude of the cross product is equivalent to the area enclosed by the parallelogram defined 
                by the two vectors. The math definition is as follows, and looks similar to the one for the dot product. However, keep in mind 
                that this one produces a vector!
                <br><br>
                $$ \vec{a} \times \vec{b} = |\vec{a}||\vec{b}| \sin \theta$$
                <br>
                You don't see the direction here because there's no good way to represent it with algebraic symbols.
                <br><br>
                This is what we're going to be using to evaluate torque. More specifically, the formula states that the cross product is equal to the product 
                of one vector's magnitude and the magnitude of the component of the other vector <b>perpendicular</b> to the first. The order doesn't matter.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page===1">
            Now, we can actually begin our discussion of torque. As you probably have guessed, the definition of torque contains a
            cross product.
            <br><br>
            $$ \vec{\tau} = \vec{r} \times \vec{F} $$
            <br>
            That's the Greek letter tau. Now, this just simply represents torque as the cross product of the radius vector and force. But what 
            does it actually mean, and why do we care about any of this at all?
            <br><br>
            The radius vector $\vec{r}$ is measured from the axis of rotation (where the object rotates) to the point where the force is 
            applied. It points from the axis of rotation to the point of force application, and comes <b>first</b> in the cross product.
            <br><br>
            <figure>
                <img src="/src/assets/rotation/Figure 80.png" width="500px"/>
                <figcaption>Figure 2: The components of torque on a wrench.</figcaption>
            </figure>
            <br>
            The wrench is a commonly-used tool to demonstrate how torque works. Think about why we always push on the end of the 
            wrench furthest from the wrench's head. It makes it easier to turn the bolt, right? Well, this is because the radius 
            vector $\vec{r}$ is greatest at that point! And, it should go without saying that if we push harder the bolt will turn 
            faster, since force is the other part of torque.
            <br><br>
            Here's a simple demonstration of the wrench made in Matter.js for you to play wiht and to get a feel of how it works. The red 
            square is for you to pull on and see how pulling at an angle affects the rotation of the virtual wrench. This is 
            important for building intuition if you don't handle wrenches often, and you can come back to this to verify the results I'm 
            presenting later.
            <br><br>
            <figure>
                <div id="wrench"></div>
                <button class="btn btn-outline-primary" @click="runWrench()">Reset</button>
            </figure>
            <br>
            <span v-show="level>0">
                What if we push at an angle instead of directly downwards? Well, if you've worked with a wrench (if not in real life, at least 
                with the simulation) you know that we
                don't tend to do this. But why? A problem that hinges on the definition of the cross product should 
                explain this.
                <br><br>
                <div class="problem">
                    A man pushes on a wrench of length 0.7 meters at an angle of 30° left of the vertical while it is horizontal at the end of the wrench.
                    How much torque is being exerted on the bolt if the man pushes with a force of 100 N?
                    <br><br>
                    <figure>
                        <img src="/src/assets/rotation/Figure 81.png" width="500px"/>
                        <figcaption>Figure 3: Pushing at an angle.</figcaption>
                    </figure>
                    <br>
                    Recall that torque is defined as a cross product. This means that we cannot simply multiply the two vectors, but rather have 
                    to account for the angle in between them. If we just strictly follow the formula, we will get:
                    <br><br>
                    $$ \tau = \vec{r} \cross \vec{F} = |\vec{r}||\vec{F}|\sin 30° = \bbox[3px,
                        border: 0.5px solid
                        white]{35 ~\textrm{N} \cdot \textrm{m} }$$
                        <br>
                    But what's the reason we do this? Well, only the component of the force that is perpendicular to the radius actually has an effect on the torque. 
                    The parallel component doesn't contribute because pushing along the length of a wrench won't make it turn. What's really happening here is we're multiplying the 
                    radius by the component of the force that is perpendicular to it, because that's the only part that causes a torque!
                </div>
                <br>
                You might have noticed something back there. I wrote my answer with the unit of $\textrm{N} \cdot \textrm{m}$, but this is 
                dimensionally equivalent to joules! (Think back to the definition of work.) However, torque and energy are obviously not the same thing, so this 
                is a case where dimensionality does not mean equality! In other words, just because two quantities are dimensionally equivalent 
                does <b>not</b> mean they are the same thing.
                <br><br>
                Always use the unit of joules ($\textrm{J}$) for work and energy, and always use the unit of Newton-meters ($\textrm{N} \cdot \textrm{m}$) for torque. Dimensional 
                analysis can break down a little bit here because of this, but most of the time it should still be a good way of checking your answers. Another 
                thing to note about this unit is that the radian is technically dimensionless, only being written because we don't want to leave 
                one part of our unit empty. (Imagine if rad/s was just /s!)
            </span>
            <span v-show="level==0">
                If you've ever used a wrench, you know that pushing at an angle tends to be less effective than pushing perpendicular 
                to the arm. The definition of torque helps explain why this is. Consider that we're now pushing on that same wrench, but 
                at an angle of 30° to the vertical.
                <br><br>
                <figure>
                    <img src="/src/assets/rotation/Figure 81.png" width="500px"/>
                    <figcaption>Figure 3: Pushing at an angle.</figcaption>
                </figure>
                <br>
                If you've ever tried this, you know it's not as good as just pushing straight down. Part of that is certainly 
                due to how it's easier to exert force downwards since gravity helps you, but even if the force were the same
                the torque would be less. Recall the definition of torque as a cross product:
                <br><br>
                $$ \tau = \vec{r} \times \vec{F} = rF\sin\theta $$
                <br>
                Do you see the $\sin \theta$? If you know trigonometry, you know that the sine function is a maximum at an angle of
                90°, which is when you're pushing perpendicular! Any angle less than that produces a suboptimal amount of torque. 
                <br><br>
                There's another, less mathematical way to think about this. Only the component of the force that's perpendicular to the wrench 
                has any effect on the torque, because the component that's along the length of the wrench can't cause it to turn. Therefore, when 
                we tilt the force at an angle, less of the force can contribute to the torque.
                <br><br>
                The unit of torque is Newton-meters ($\textrm{N} \cdot \textrm{m}$), which is dimensionally the same as energy but shouldn't be 
                interchanged with it! They are <b>not</b> the same thing under any circumstances. This is why we use the unit of joules ($\textrm{J}$) 
                for energy at all times: we don't want to confuse the two.
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
        <div v-show="page===2">
            Force and radius being perpendicular is certainly nice and happens decently often, but we can't forgo those numerous cases 
            where they aren't. Here, I'll present a general method that's used to compute torque for more complex cases, as well as explain a 
            few tips for this topic. It's complex!
            <br><br>
            The most common method you'll see involves using a <b>lever arm</b>, which is the component of the radius vector that is 
            perpendicular to the force. There's a good graphical method of finding it, which involves an imaginary line called the 
            <b>line of action</b>.
            <br><br>
            Wait! Didn't I explain for an entire paragraph about how only the perpendicular <b>force</b> causes a torque? Why are we now 
            manipulating radius? Well, the reason is simple. We can do either, because the cross product doesn't care which vector you 
            make perpendicular to the other. Thus, we usually just do whatever's convenient in any given scenario, whether that be manipulating 
            force or displacement.
            <br><br>
            Okay, now I'll show you the lever arm and line of action method with a labelled diagram to help with my explanation.
            <br><br>
            <figure>
                <img src="/src/assets/rotation/Figure 82.png" width="500px"/>
                <figcaption> Figure 4: Contrary to popular belief, the lever arm is not the arm of a lever.
                    <br>
                    Oh, and the device in the picture is called a torque wrench. It's a pretty neat tool.
                </figcaption>
            </figure>
            <br>
            The <b>line of action</b> is found simply by drawing a (dotted) line through the point of rotation parallel to the 
            direction of the force in question. It is <b>not</b> drawn along the direction of the radius vector, nor is it drawn exactly 
            horizontal or vertical. Those are somewhat common misconceptions I see with this concept.
            <br><br>
            Once you've established the correct line of action, we can find the <b>lever arm</b> as the <b>perpendicular</b> distance 
            between the line of action and the line that represents the force. You can also draw an imaginary line that extends along the force 
            vector and sits on top of it if that helps. <b>This line of action is perpendicular to both lines!</b> Hopefully you can see that 
            from the diagram.
            <br><br>
            This method of finding the torque should serve you well for most problems involving torque in some extent. It's a very generalized method 
            that is designed to work in a lot of cases, which is why it is useful. <span v-show="level>0">If you feel your skills are 
                up to the task, you can also forgo this method and instead manipulate either force or radius in order to get the torque depending on what's 
                easier for the situation. However, if you want the comfort of a single method that works, stick with the line of action and lever arm.
            </span>
            <br><br>
            This concludes our discussion of torque. Right now, there's not much we can do with it because it's just a small piece in a grander puzzle called 
            rotational dynamics, but we'll definitely make good use of this quantity in the future. For now, make sure you know how to calculate torque, and you'll be 
            set for this concept. 
            <br><br>
            The next concept is one that is often quite foreign and new to people, because it's a rotational equivalent of ...mass? But, if you're ready we should move on to talking about 
            the moment of inertia, the second key piece in our puzzle that takes the name of rotational dynamics.
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

<style scoped>

</style>