<script setup>
import { ref, vShow } from 'vue'
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const showAnswer = ref(false)
const showAnswer2 = ref(false)
const showAnswer3 = ref(false)
const showAnswer4 = ref(false)
const showAnswer5 = ref(false)
</script>


<template>
    <div class="container h100 p-5">
        <h1>F=ma and Free-body Diagrams</h1><br>
        <p>
            <div v-show="page === 0">
            <p>
                Newton’s Second Law is the most important and most difficult of all his laws to master. To learn how to
                use
                force analysis to get quantitative results, we first need to understand what a net force is. The net
                force
                is simply the vector sum of all the forces acting on an object, written as $F_{net}~\textrm{or}~\Sigma
                F$,
                where $\Sigma$ indicates summation. However, it is usually more useful to have two net forces directed
                along
                two axes.<br><br>
                To represent forces on an object, we will use the free-body diagram (FBD). To construct an FBD, we
                consider
                the object as a point and draw the forces acting on it with their tails on the point. For instance,
                consider
                the case of a book on a table. Remember that forces are vectors, so their magnitude and direction matters! A free-body diagram is essentially just a diagram of a singular body, or system, and all the <i>EXTERNAL</i> forces.<br>Here is an example:
                <figure>
                    <img src="/src/assets/dynamics/Figure 32.png" width="500px" />
                    <figcaption>Figure 1: An incomplete (unlabeled) free-body diagram.</figcaption>
                </figure>
                Using the forces you know from the previous lesson, see if you can try and work out what to label. for the diagram.<br>
                Did you get it? The force down should be gravity, but the book is not moving, so there is an upward force, and that is the normal force from the table!
                <figure>
                    <img src="/src/assets/dynamics/FIgure 35.png" width="500px" />
                    <figcaption>Figure 2: A complete free-body diagram.</figcaption>
                </figure>
                There are a few things regarding this image that we will explain.<br>Now seeing after how to NOT draw an FBD, we will give you a (mostly) foolproof recipe on how to build a correct FBD that will help you solve even the most difficult of problems!
                <ul>
                    <li>First, we want to define a body or system and a reference frame to work in. Essentially, this part is isolating the body and determining what coordinate axes we want to use. For example, on a slope, we might want to use an axes parallel to the slope. You can typically use any axes, but generally go for the ones that most of the forces are aligned on or one that pertains specifically to the question.</li>
                    <li>Next, have a list of all the forces you will need to draw. You can simply go off this list and draw the forces if they exist. Gravity, friction, the normal force, drag (usually air drag), tension, and all other forces. A good rule of thumb is that if the force is not explicitly stated to exist in this scenario, assume it exists. For example, if a problem says "a wall", assume there is friction on the wall. Another key thing is to note that there are specific key words that implies something, like "a smooth wall" implies frictionless, and "from rest" means $v_0=0$. Recognizing these terms are important for doing physics problems correctly!</li>
                    <li>The final step is to draw those forces. Start by representing the body or system as a dot. Draw all the forces from the dot, taking in account their directions (forces are vectors!), and try to keep the sizes are relative as well (if the force has twice the magnitude of another make it twice as long as that one). Remember to also draw the correct orientations for your coordinate axes as well. When you're finished, your drawing should look like the one above.</li>
                </ul>
                Thus, by utilizing this knowledge, let's work through an example on the next page.
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
        <div v-show="page ===1">
            <p>
            <span v-show="level > 0">
                <div class="problem">
                Now we will analyze the following scenario. Bob pushes on a 15 kg cart horizontally with a force of 50 N. What is the cart’s acceleration?
                <br><br>
                Hopefully, we recognize that there are three forces present: the gravitational force, the normal force from the ground, and the applied force (also technically a normal force) from Bob.
                It can be easy sometimes to forget that the normal and gravitational forces are going to be present in the FBD, even though they are not mentioned in the problem.
                <br><br>
                <template v-if="showAnswer4">   
                    This, or something close to it, is the correct FBD for the problem.     
                    <figure>
                        <img src="/src/assets/dynamics/Figure 16.png" width="500px" />
                        <figcaption>Figure 3: A free-body diagram of the cart.</figcaption> 
                    </figure>
                </template>
                <template v-else>
                    <button class="btn btn-outline-primary btn-sm" @click="showAnswer4 = true">Show FBD</button>
                </template>
                <br><br>
                Now I know just talked about how the normal and gravitational forces are present, but in this case they
                are not actually important for the problem. Intuitively, we know that the cart doesn't accelerate vertically,
                so the normal and gravitational forces must be balanced. Therefore, we only need to apply Newton's Second Law in the
                horizontal direction, where only one force is present.
                <br><br>
                $F_{net,x} = F = 50~\textrm{N}$<br>

                We can now easily use algebra on Newton's Second Law to find the acceleration of the cart.
                <br>
                $m = 15~\textrm{kg}$<br>
                $a = \frac{F_{net,x}}{m} = \frac{50~\textrm{N}}{15~\textrm{kg}} = 3.33~\textrm{m/s}^2$<br><br>

                Now, I'll ask a few conceptual questions on the problem to make sure you understand the concepts. This is really commonly seen with multi-part physics problems, either in 
                textbooks, homework, or exams, so it is important to be able to answer these questions. They are also not too difficult, so you should be able to answer them even
                if you couldn't mathematically solve the main problem.
                <br><br>
                What if another person pushes the box in the same direction? Qualitatively, how will the acceleration compare? 
                <br>
                <template v-if="showAnswer3">
                    <strong>Answer:</strong> It will be greater, since the net force is greater.
                </template>
                <template v-else>
                    <button class="btn btn-outline-primary btn-sm" @click="showAnswer3 = true">Show Answer</button>
                </template>
                <br><br>
                 What about in the opposite direction? 

                <br>
                <template v-if="showAnswer2">
                    <strong>Answer:</strong> It will be less or in the opposite direction, depending on the strength of the force.
                </template>
                <template v-else>
                    <button class="btn btn-outline-primary btn-sm" @click="showAnswer2 = true">Show Answer</button>
                </template>
                <br><br>
                What is the magnitude of the normal force in the above scenario? 
                <br>
                <template v-if="showAnswer">
                    <strong>Answer:</strong> By considering forces in the y-direction, we have $F_n=mg=147 ~\textrm{N}$ since $F_{net,y}=0$. Do not assume that this is always going to be true, since there will be many scenarios where $F_n\neq mg$.
                </template>
                <template v-else>
                    <button class="btn btn-outline-primary btn-sm" @click="showAnswer = true">Show Answer</button>
                </template>
                <br><br>
                Note that there is no way for us to know the velocity of an object through force analysis, just acceleration. We have to be given the velocity at some point in time in order to solve for velocity at any other point. 
                If you want to get fancy, this principle is called Galilean Relativity, which states that it is impossible to determine absolute velocity of any given inertial reference frame. 
                Another key tenet of the idea is that the laws of physics are the exact same in all inertial reference frames, which turns out to be true. Galilean Relativity is very important in Newtonian physics, and is the reason why we can only determine acceleration through force analysis. But it also turns out to be
                incorrect in its assumption that time is independent of velocity, which is a key tenet of Einstein's Special Relativity. But that's something that's way too advanced for right now. (Eric wrote this part, so if you have any questions about it, ask him.)
                </div>
                <br><br>
            </span> 

            <span v-show="level == 0">
                    As we are more focused on concepts here, we will not be going into mathematical computation of this problem.
                    Instead, we can simply focus on the conceptual understanding of how to draw a proper free-body diagram of this problem, as well
                    as qualitative analysis of it.
                    <br><br>
                    <div class="problem">
                    Consider the following scenario: Bob pushes on a cart horizontally to the right with some applied force. Assume there is no friction.
                    How does the cart behave? Make a free-body diagram. Take a moment to think and work on it before continuing.
                    <br><br>
                    <template v-if="showAnswer4">   
                        This, or something close to it, is the correct FBD for the problem.
                        <figure>
                            <img src="/src/assets/dynamics/Figure 16.png" width="500px" />
                            <figcaption>Figure 3: A free-body diagram of the cart.</figcaption>
                        </figure>
                    </template>
                    <template v-else>
                        <button class="btn btn-outline-primary btn-sm" @click="showAnswer4 = true">Show FBD</button>
                    </template>
                    <br><br>

                    Now, conceptually we should understand why each force is present, and their relative magnitudes.
                    You may have forgotten to include the normal and gravitational forces, a common mistake when motion
                    vertically isn't mentioned or involved. However, in almost all scenarios, the gravitational force is present, and
                    the normal force is present in a large number of scenarios as well. The proper FBD needs to include these to be
                    correct even though they do not affect the motion of the cart because all forces need to be present. Now, the applied
                    force $F$ is present for obvious reasons (it's applied to the cart by Bob). Since we said no friction (which is usually
                    assumed if not explicitly stated, by the way), the only force acting on the cart in the horizontal direction is the applied force.
                    <br><br>

                    Therefore, the total net force is equal to the applied force and in the horizontal direction, since the forces in the y-direction
                    are balanced. (This is because the cart is not moving into or out of the ground, so the forces must be balanced in that direction.)
                    According to Newton's Second Law, we can therefore conclude that there will be a net acceleration horizontally, in the direction of the
                    applied force. The exact calcuation is simple, but not necessary for a good conceptual understanding of the problem.

                    <br><br>

                    Now, for a some conceptual questions. What if another person pushes the box in the same direction? Qualitatively, how will the acceleration compare?
                    <br>
                    <template v-if="showAnswer3">
                        <strong>Answer:</strong> It will be greater, since the net force is greater.
                    </template>
                    <template v-else>
                        <button class="btn btn-outline-primary btn-sm" @click="showAnswer3 = true">Show Answer</button>
                    </template>
                    <br><br>
                    What about in the opposite direction?
                    <br>
                    <template v-if="showAnswer2">
                        <strong>Answer:</strong> It will be less or in the opposite direction, depending on the strength of the force.
                    </template>
                    <template v-else>
                        <button class="btn btn-outline-primary btn-sm" @click="showAnswer2 = true">Show Answer</button>
                    </template>
                    <br><br>
                    What is the magnitude of the normal force in the above scenario? Give a conceptual answer, not a numerical one.
                    <br>
                    <template v-if="showAnswer">
                        <strong>Answer:</strong> The normal force is equal to the weight of the cart, which is equal the mass times the acceleration due to gravity. You might be
                        tempted to generalize this to say that the normal force is always equal to the weight, but this is not true in all cases. I'll illustrate this later.
                    </template>
                    <template v-else>
                        <button class="btn btn-outline-primary btn-sm" @click="showAnswer = true">Show Answer</button>
                    </template>
                    <br><br>
                    See? This unit isn't so bad, right? You can do it! Just remember to always draw the free-body diagram first, and then analyze the forces. If you feel
                    confident, you can move up to one of our more advanced levels, where we will do quantitaive analysis of this problem and many more. If you don't feel
                    prepared, don't worry! You can always come back to this lesson later when you feel ready to tackle the math.
                    </div>
            </span>
                <span v-show="level > 0">

                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 2">
            <p>
            <span v-show="level > 0">    
                Now that we have a good understanding of how to draw free-body diagrams, we can start throwing more complex things into
                the mix. Here, we will introduce an old friend all the way back from the last lesson, the frictional force. We'll start simple:
                <br><br>
                <div class="problem">
                1. What is the minimum required force to be applied to begin to move an object of mass $m$ with coefficient of static friction $\mu_s$ across a horizontal tabletop?
                <br><br>
                The key is to understand that the static frictional force will equal the applied force up until a certain
                thereshold. The maximum static frictional force is equal to $F_{s, max} = \mu_s F_n$, where $F_n$ is the normal force.
                Therefore, the applied force must be at least this large to overcome the static frictional force and begin to move the object.
                We also have to consider the normal force, but since the object is on a horizontal surface, the normal force is equal to the weight of the object, $F_n = mg$.
                <br><br>
                Therefore, our final answer is $F = \mu_s mg$. This is a pretty clean and neat result!
                </div>
                <br><br>
                <div class="problem">
                2. An object is moving at $10 ~\textrm{m/s}$ across a frictionless surface when it encounters a surface with coefficient of kinetic friction $\mu_k=0.3$. How long will it take for the object to be brought to rest, and how far does it travel?
                <br><br>
                This one is definitley slightly more complex. Seeing as this unit is about forces and mass is literally one of the three
                components of Newton's Second Law, you may think that we are missing a crucial piece of information: the mass of the object. 
                But, as it turns out, we don’t need it. We will still use the variable m to denote mass in our equations, but in the end you will find that its value is not needed.
                It's a surprise that will reveal itself later.
                <br><br>
                In this case, we can intuitively see that $mg=F_N$. But this will not always be the case in the future, particularly in the next lesson!

                Friction is the only force acting in the horizontal direction. We can then write: <br>
                $F_{net}= \mu_k mg$ <br>
                We then use the second law to write:<br>
                $ma=\mu_k mg$<br> 
                $a=\mu_k g$ <br>
                Notice how the mass has canceled out!
                <br><br>
                This time, I’ll leave the algebraic plugging in to you, or you could decide to plug these variables in for $a$ in subsequent equations (which is what I will do). From now on, you’ll notice that I begin to solve problems more generally instead of using specific values. 
                It’s good practice to solve any problem generally and disregard numbers until the end, at least for now. Why is this? Some more complicated problems can be simplified greatly by finding the value of some intermediate quantity. 
                Furthermore, it is easy to lose track of values you substituted into an equation.
                You might have noticed that with the trajectory formula back in projectile motion, where the end equation solved generally had a very generous amount of quantities to plug in.
                <br><br>
                After getting $a$, we can easily use our kinematics knowledge to find the answer:<br>
                $v_f=v_0-at$<br>
                $v_0=at$<br>
                $t=\frac{v_0}{\mu_k g} = 3.40 ~\textrm{s}$<br>
                </div>
                <br><br>
                Those two problems were simple enough. Now, we'll move on to another friction example, this time showing something that might not be immediately obvious.
            </span>
            <span v-show="level==0">
                Now we should consider a slightly more complex problem involving friction. 
                <br><br>
                <div class="problem">
                Consider an object of mass $m$ on
                a tabletop, where it has a coefficient of static friction $\mu_s$ with the table. How hard do you have
                to push on the object to get it to start to move?
                <br><br>
                Now, think about this problem in the real world. When you push lightly on a book that sits on a
                tabletop, it doesn't immediately start to move. This might help you visualize the problem more clearly.
                You should also attempt to create a free-body diagram for this scenario. Here's a little hint: the total
                number of forces acting on the body is four.
                <br><br>
                Did you get it? Think back to our last lesson, where we briefly discussed static and kinetic friction.
                You needed to remember how the key idea behind static friction in this case is that it will equal your applied force up until
                a maximum value defined by $F_{s, max} = \mu_s F_n$. This is the minimum force that you must apply
                for the object to start moving. By this logic, the force that you have to push with is:
                <br><br>
                $F = F_{s,max} = \mu_s mg$ (because the normal force is equal to the gravitational in this case)
                <br><br>
                That wasn't so difficult, was it? 
                <br><br>
                Now, what happens for an object that is already sliding against a surface? In other words, what if kinetic
                friction is at play instead?
                <br><br>
                For kinetic friction, the value is always $F_k = \mu_k F_n$. This indicates a constant force acting on whatever
                object we are interested in, opposing the direction of motion. In our scenario, there are no other forces present
                acting on the system. See if you can use this information to create a general FBD for the scenario.
                <br><br>
                This is actually just a case of constant acceleration, as you might have concluded. The force acting on the system
                in the horizontal direciton is constant because kinetic friction takes a constant value, and the mass is constant as well. 
                Therefore, according to Newton's Second Law the acceleration of the system is constant and directed in the opposite direction
                as the direction of motion, tending to slow down the object until it comes to rest relative to whatever surface it is sliding on.
                </div>
                <br><br>
                Now, what would happen if the surface it was on was also moving? This is where things get interesting.
            </span>
            </p> 
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show ="page===3">
            <p>
                <span v-show="level>0">
                We have gone over two friction examples already, but we now should consider friction for a body in motion. See, friction doesn’t always oppose motion, just relative motion between two surfaces. 
                Friction can actually cause something to start moving.We will consider the following scenario in order to have a better understanding of this.
                <br><br>
                <div class="problem">
                Consider a simple scenario of a penguin sitting on a sled, which is in turn sitting on a frozen lake.
                The penguin is on ice, so we can neglect friction between the sled and ice (since the coefficient of both static and kinetic friction are essentially zero for ice, which is why it’s difficult for your shoes to grip!). 
                We’ll take the coefficient of static friction between the penguin and sled to be $\mu_s$. 
                Now, we ask, what is the maximum acceleration of the sled such that the penguin does not slip, and (assuming masses of penguin and sled to be $m_p$ and $m_s$ respectively) 
                what acceleration does a force F pulling in front of the sled impart on the sled?
                <figure>
                    <img src="/src/assets/dynamics/Figure 34.png" width="500px" />
                    <figcaption>Figure 4: A (spherical) penguin on a sled.</figcaption> 
                </figure>
                The key here is to consider the sled and penguin as one object since the penguin doesn’t slip. 
                It is almost trivial to find the maximum acceleration if you keep this in mind. 
                By itself, the sled can accelerate at any rate provided a large enough force, but the penguin is a different story. 
                In this case, the only force acting on the penguin is the force of friction! (Think about it: there are no other possible
                forces that can be acting forward to move the penguin.)
                So, the maximum acceleration we need is really the maximum acceleration that friction can provide to the penguin.
                This is similar to the last problem, and it follows (with the same reasoning as before): <br>
                $F_{net} = F_s = \mu_s F_n$ <br>
                $F_n = mg$ <br>
                $a_{max} = \mu_sg$ <br>
                <br><br>
                Now something a lot of people, you included, might wonder is how the friction force can be pointing in the direction of motion. 
                Doesn’t friction tend to oppose motion? Well, that is correct to a certain extent, but not specific enough. 
                Friction only tends to oppose <b>relative</b> motion (since absolute motion doesn’t actually exist, according to Einstein and Galileo).
                To do that in this case, it has to accelerate the penguin at the same rate (or try to) as the sled so the two don’t move relative to each other.
                <br><br>
                Now to consider the second part of the problem. To find acceleration caused by a force $F$, we actually have to find two accelerations. 
                First, we consider the no-slip case, where $a \leq \mu_sg$. I’ll use the technique of treating each body
                individually to show that they can be treated as one body. 
                <br><br>
                For the penguin, we have: <br>
                $F_{net}=\mu_sm_pg=m_pa$
                <br><br>
                For the sled, we have: <br>
                $F_{net}=F-\mu_sm_pg=m_sa$, where we include the reaction force of the friction on the penguin (equal in magnitude and opposite in direction!)
                <br><br>
                Now, we can add the two equations: <br>
                $(m_s+m_p)a=F$ ($a$ has the same value in the two equations because there is no relative motion) <br>
                $a=\dfrac{F}{m_s+m_p}$ <br><br>
                This is the same as if we treated the two bodies as one, with a total mass of $m_s+m_p$ and ignoring
                all internal forces (forces that act between objects in the system).
                <br></br>
                Now, what if the penguin slips on the sled? In that case, friction is kinetic, and we can no longer
                treat the two objects as one because they are moving relative to each other. <br><br>
                $F_k=\mu_k m_pg$
                <br><br>
                Since the two bodies are now no longer moving together, we only consider the body we want the acceleration of: the sled. <br>
                $F_{net}=F-\mu_sm_pg=m_sa$ <br><br>
                $a=\dfrac{F-\mu_sm_pg}{m_s}$, which is a lot less elegant than the no-slip solution!
                </div>
                <br><br>
                Now that we've covered the types of force-analysis problems requiring FBDs briefly, we can 
                talk more in-depth about two common special types of force-analysis problem in the next lesson.
                </span>
            <span v-show="level==0">
                <div class="problem">
                Now, let's take a look at a more interesting example, involving our favorite Antarctic flightless avian.
                We place a penguin on top of a sled, which is sitting on a frozen lake. The penguin and sled have friction
                with each other, but the sled does not have friction with the lake (since ice is close to frictionless, as you'll
                know if you've tried to walk on it!). 
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 34.png" width="500px" />
                    <figcaption>Figure 4: A (spherical) penguin on a sled.</figcaption> 
                </figure>
                <br><br> 
                Now, we know that the penguin and sled can move together if you just pull on the sled, but what causes the penguin
                to move in this case? The pulling force is applied onto the sled and not the penguin, after all. Friction is what
                actually comes to save the day. See, friction doesn’t always oppose motion, just relative motion between two surfaces.
                Therefore, it will try to keep the penguin from sliding off the sled.
                <br><br>
                This gives rise to an interesting conclusion. If friction is keeping the penguin moving with the sled, this means that
                friction must actually act to accelerate the penguin! The frictional force on the penguin must be in the same direction
                as the applied force on the sled. This means the friction is actually causing the penguin to move,
                which can be a shocking conclusion since we typically see friction as a force that opposes motion! A side note of this is 
                that there is a maximum acceleration that the penguin can have before it slips off, because there is only so much force
                that the static frictional force can provide. This example perfectly illustrates
                how important carefully reading the exact definitions are, as they can lead to very interesting and unexpected conclusions. Physics
                is not always intuitive, and some discoveries can come as welcome surprises.
                </div>
                <br><br>
                Now, we have a good conceptual grasp on how to analyze the forces in a system. In the next lesson, we will go over two very
                common key examples and general scenarios in forces and beyond. So, without further ado, let's get to it!

            </span>
            </p>
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


<style scoped></style>