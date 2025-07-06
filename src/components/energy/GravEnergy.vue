<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Universal Gravitational Potential Energy</h1><br>
        <p>
            <div v-show="page===0">
                This unit only really has one concept, but it's a pretty important one. I want to show of its full potential here, but 
                I can't due to not having covered angular momentum and torque. Regardless, this unit is quite important and 
                a little bit difficult, so be aware!
                <br><br>
                <b>Universal gravitational</b> potential energy is the potential energy between celestial bodies. Near the 
                surface of the Earth, we defined gravitational potential energy to be:
                <br><br>
                $$ U_g = mgh $$
                <br>
                This definition is only true when the distance from a particular celestial body is barely changing. The Earth has 
                a radius of $R_E = 6.37 \times 10^{6} ~\textrm{m}$, which is massive compared to the changes in elevation we 
                typically deal with. However, for universal gravitation the distances we deal with may be comparable 
                to this, so we have to use a new formula.
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 61.png" width="500px">
                    <figcaption>
                        Figure 1: We typically only use this formula when talking about large, celestial objects.
                    </figcaption>
                </figure>
                <br>
                Here's our brand-new formula for the gravitational potential energy. Our previously-used formula is actually the same 
                as this, but converted into a more handy approximation for use near the surface of planets.
                <br><br>
                $$U_g = -G\dfrac{Mm}{r} $$
                <br>
                This should remind you of our universl gravitation unit! We can see that there are two masses $M$ and $m$ separated 
                by a distance $r$. If we look closely, we 'll see that <b>this formula only accounts for two bodies!</b> The odd thing is that there's a negative sign. We typically don't think of energy as being negative, but 
                there's a good reason for this that I'll get into.
                <br><br>
                <span v-show="level==2">
                    First, however, there's a calculus reason why this value is negative. Recall our formula $ F = -\frac{dU}{dx} $ , better 
                    written as $ F = -\frac{dU}{dr} $ for this scenario. Our formula for the gravitational force exerted on two objects is:
                    <br>
                    $$ F = G \dfrac{Mm}{r^2} $$
                    <br><br>
                    If we integrate this according to the formula, we get the answer:
                    <br><br>
                    $$ U = -\int F dr = G \dfrac{Mm}{r} $$
                    <br>
                    This has the incorrect sign, but this is because of something we failed to account for. See, gravitational potential energy 
                    should increase as you get further away from the planet, which makes the direction the gravitational force points in 
                    negative in this case.
                    <br><br>
                    $$ F = -G \dfrac{Mm}{r^2} $$
                    <br>
                    Using this updated expression allows us to get the correct answer.
                    <br><br>
                    $$ U = - G \dfrac{Mm}{r} $$
                    <br> 
                </span>
                Now, why exactly is this energy negative? Well, it's more convenient to deal with it that way. Although it 
                seems a bit unconventional and odd, once you wrap your head around it, it actually makes our lives easier.
                <br><br>
                <span v-show="level>0">
                    First, I'm going to lay out a few mathematical facts that are true in order to reason through this. The larger the separation between 
                    two bodies, the greater their gravitational potential energy. This makes sense, since things have more gravitational 
                    potential energy as they get higher, which is further from Earth. The maximum separation of two bodies is technically infinity, when 
                    there is no more gravitational force on them. Of course, infinity isn't really a real value, so sometimes problems will say 
                    very far away instead of invoking infinite separation.
                    <br><br>
                    Our gravitational potential energy at infinity $U_{\infty}$ must be a maximum, then. If we look back at the formula, 
                    when $r$ approaches $\infty$ our the gravitational potential energy approaches zero. <b>This means that zero 
                        potential energy is the most potential energy possible.
                    </b> 
                    <br><br>
                    Since the energy is defined to be negative, any nonzero potential energy will be negative, and negative numbers are less 
                    than zero. This is what lets the formula work correctly. If we dropped the negative sign, that would imply that 
                    potential energy is increasing as the two bodies get closer, which is simply not true. We could set the zero anywhere else, but that would require us 
                    to add a term to our potential energy formula in order to offset this, which just complicates things unnecessarily. 
                </span>
                <span v-show="level==0">
                    It's not too difficult to understand why we say potential energy is negative in this case. First, consider that 
                    gravitational potential energy is maximized when the two bodies are very far away. Since we can set the point 
                    of zero potential energy anywhere, physicists chose to set it here for convenience.
                    <br><br>
                    This makes all other values of potential energy, which will be negative according to the formula, less 
                    than this value, which produces the correct behavior. We could set the zero anywhere else, but that would require us 
                    to add a term to our potential energy formula in order to offset this. Defining it like this makes everything 
                    much nicer and easier to deal with.
                </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page==1">
                This new universal gravitational potential energy is identical to our old gravitational potential energy, so we can 
                apply the same energy conservation techniques to it. Just remember not to drop the negative term and you're all set.
                <br><br>
                The first special thing I want to talk about is <b>escape velocity</b>. This is the minimum required velocity to completely 
                escape an object's gravitational pull. Actually, instead of talking about 
                it directly, I'll make you solve for it!
                <br><br>
                <div class="problem">
                    <span v-show="level>0">
                        Find the escape velocity required to leave a planet of mass $M$ and radius $R$, assuming you launch 
                        from the surface. Then, find the escape velocity of the Earth, which has $M_E = 5.97 \times 10^{24} ~\textrm{kg}$ 
                        and $R_E = 6.37 \times 10^6 ~\textrm{m}$. 
                        <br><br>
                        <figure>
                    <img src="/src/assets/energy/Figure 62.png" width="500px">
                    <figcaption>
                        Figure 2: Fire in the hole- I mean blastoff!
                    </figcaption>
                </figure>
                <br>
                The rocket (which is most definitely not a missile) is sent upwards with some velocity $v$. For the rocket to 
                escape the gravitational pull of the planet, $v$ must equal $v_e$, which is how we denote the escape velocity.
                Now, what does "escaping the gravitational pull of the planet" really mean? Think about what I've said earlier!
                <br><br>
                Hopefully you recognize that escaping the planet's gravity means being an "inifnite distance" away from the planet. Otherwise,
                 the planet will eventually pull the spacecraft back. We recall that at infinity, the gravitational potential energy
                 is defined to be zero. The escape velocity is the minimum required velocity, so this indicates that the final velocity at infinity 
                 should be zero.
                 <br><br>
                 Well, final gravitational potential energy has been defined to be zero, and final kinetic energy is also zero (since $v_f = 0$). 
                 This allows us to write an energy conservation relation. We're saying the rocket has mass $m$.
                 <br><br>
                 $$ \dfrac12 m{v_e}^2 - G \dfrac{Mm}{R} = 0 $$
                 <br>
                 This can be pretty easily solved using some algebra:
                 <br><br>
                 $$ v_e = \sqrt{2G \dfrac{M}{R} } $$
                 <br>
                 There we go! We've found a general expression for the escape velocity. Note that this only works if only one body exerts a significant
                gravitational pull on the object at any time. If there is more than one object in question, it still works as long as that 
                second body is far away, otherwise we'd have to account for its gravitational potential energy with the rocket as well.
                <br><br>
                Now, to find the Earth's escape velocity. Here on Earth, while we do have an entire solar system around us, our planet is still relatively far away from any others. The moon's 
                gravitational pull can also be neglected even though it is quite close, since it has a mass that is only $1.2\%$ of Earth. Thus, we can 
                use the formula we just derived.
                <br><br>
                $$v_e = \bbox[3px,
                    border: 0.5px solid
                    white]{11.2~\textrm{km/s} } $$
                    </span>
                <span v-show="level==0">
                    Find the escape velocity required to leave a planet of mass $M$ and radius $R$, assuming you launch 
                    from the surface.
                    <br><br>
                    <figure>
                    <img src="/src/assets/energy/Figure 62.png" width="500px">
                    <figcaption>
                        Figure 2: Fire in the hole- I mean blastoff!
                    </figcaption>
                </figure>
                <br>
                Instead of tackling this problem all at once, we should consider it in small steps. First, we want to figure out 
                what it exactly means to escape from a planet.
                <br><br>
                Hopefully, you realize that this means escaping the planet's gravitational pull, which can only happen when you 
                are very far away from the planet. Recall that at this point, your gravitational potential energy is zero! The escape 
                velocity is also the minimum possible velocity such that the rocket escapes, meaning that its final velocity should be zero.
                <br><br>
                With those two conditions, we now know that both the final potential and kinetic energies are going to be zero. This means the total 
                initial energy is going to be zero by energy conservation. Thus, we can write (being careful to retain the negative sign):
                <br><br>
                $$\dfrac12 m{v_e}^2 -G \dfrac{Mm}{R}= 0 $$
                <br>
                We can use some algebra to solve for $v_e$ here. It's not too complex, but at this level you don't really 
                need to worry about the intricacies of the algebra. This gives us our final answer:
                <br><br>
                $$\bbox[3px,
                    border: 0.5px solid
                    white] {v_e = \sqrt{2G \dfrac{M}{R} } }$$
                <br>
                And we're done!
                </span>
                </div>
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
                I cast unexpected practice problem! I bet you though you were done, huh? No, there's one more important concpet that we should cover now, and 
                there's no better way to do it than with a problem.
                    <br><br>
                <div class="problem">
                    A satellite of mass $m$ orbits an alien planet of mass $M$ at a distance $R$ from its center. What is its 
                    total energy? 
                    <span v-show="level>0"> What are the relations between its kinetic, potential, and total energies? </span> Assume 
                    a circular orbit.
                        <br><br>
                        <figure>
                    <img src="/src/assets/energy/Figure 64.png" width="500px">
                    <figcaption>
                        Figure 3: A labelled diagram of the scenario. Yes, I was finally nice enough to label it.
                    </figcaption>
                </figure>
                <br>
                        <span v-show="level>0">
                        We want to focus on the first part of the question, since that's the most simple to solve. We can worry about the 
                        second part later. Writing the total energy involves the kinetic and potential energies in the system at any given point. 
                        Since we're dealing with a circular orbit, the velocity at any point is the same. 
                        <br><br> 
                        We can find this orbital velocity like I showed 
                        previously. As a refresher, we know gravity has to provide the centripetal force.
                        <br><br>
                        $$ m \dfrac{v^2}{R} = G \dfrac{Mm} {R^2} $$
                        <br>
                        This lets us easily solve for the velocity:
                        <br><br>
                        $$ v = \sqrt{G \dfrac{M}{R} }$$
                        <br>
                        Now that we have the velocity, we should write an expression for the total energy of the satellite. We know it 
                        has both gravitational potential energy and kinetic energy, so we can write:
                        <br><br>
                        $$ E = \dfrac12 mv^2 - G \dfrac{Mm}{R} $$
                        <br>
                        Now we simply plug in the value of $v$ we found.
                        <br><br>
                        $$ E = \dfrac 12 G \dfrac{Mm}{R} - G \dfrac{Mm}{R} = \bbox[8px,
                    border: 0.5px solid
                    white]{- G \dfrac{Mm}{2R} }$$
                        <br>
                        What a nice result. It makes sense that this value is negative, since if it were zero or positive that means the satellite could 
                        escape to infinity. (Remember our escape velocity problem, where total energy was zero!) Now, we need to compare this value to the kinetic and potential energies. We can 
                        start by writing each, just so we're clear on what they are.
                        <br><br>
                        $$ K = \dfrac12 mv^2 = G \dfrac{Mm}{2R} $$
                        $$ U = -G\dfrac{Mm}{R} $$
                        $$ E = -G\dfrac{Mm}{2R} $$
                        <br>
                        All of these look very similar. The point of this question was to have you see similarities between these equations. I've 
                        codified them below:
                        <br><br>
                        <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                            $${ K = - \dfrac12 U }$$
                        $$ {E = \dfrac12 U = - K} $$
                        </div>
                        <br>
                        These results in general are true for a satellite in a circular orbit. In fact, the result for the total energy is also true 
                        for an elliptical orbit (after you replace $r$ with $a$), but this proof requires the use of angular momentum concepts.
                        </span>
                        <span v-show="level==0">
                            First, we should remember that for a specific radius, there is only one orbital velocity $v$ that is possible. This exact
                            value wasn't given as an equation before, so I'll give it to you here. You can just accept it as true at this level, though it 
                            can be derived.
                            <br><br>
                            $$ v = \sqrt{G \dfrac{M}{R} }$$
                            <br>
                            We can then write the expression for the total energy of the satellite in general terms:
                            <br><br>
                            $$ E = \dfrac12 mv^2 - G \dfrac{Mm}{R} $$
                            <br>
                            Then, we can simply plug in the value I gave you for $v$, resulting in a relatively simple simplification:
                            <br><br>
                            $$ E = \dfrac 12 G \dfrac{Mm}{R} - G \dfrac {Mm}{R} $$ 
                            <br>
                            These two terms are identical, so we can simplify this to our final answer.
                            <br><br>
                            $$\bbox[8px,
                            border: 0.5px solid
                            white]{E = - G \dfrac{Mm}{2R} } $$ 
                            <br>
                            This should look kind of familiar. In fact, it's exactly half of the potential energy of the satellite! This result is true 
                            in general for any body in a circular orbit around another, much larger object. It makes sense that it is negative, as we saw 
                            that a zero total energy meant that the body would be able to escape the gravitational pull of the large object.
                        </span>
                </div>
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===3">
                If you've been paying attention, you'll notice that 
                we have only been dealing with systems that have two objects. What happens when there are more than two bodies in a system?
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 63.png" width="500px">
                    <figcaption>
                        Figure 4: A system of three bodies, the inspiration for the hit 2008 Sci-Fi novel <i>The Three-Body Problem</i>.
                    </figcaption>
                </figure>
                <br>
                Our formula actually is only able to deal with two bodies at a time. Therefore, we have to sum the potential energies between 
                each pair of objects in order to get the total gravitational potential energy. We usually only analyze the system 
                at a single point in time so as to not deal with the bodies moving around. 
                <br><br>
                <span v-show="level>0">
                    In mathematical terms, what I just said translates to a summation. There's not really a neat way to write it in 
                    summation notation, but here it is as a double summation:
                    <br><br>
                    $$ U = -G \sum_{i=1}^{N} \sum_{j=i+1}^{N} \frac{m_i m_j}{r_{ij}} $$
                    <br>
                    This formula is very cluttered and difficult to understand. A concrete example of a system of three objects should help. 
                    For this system, the total gravitational potential energy can be written as:
                    <br><br>
                    $$ U = - G \dfrac{m_1 m_2 }{ {r_{12} } } - G \dfrac{m_2m_3}{ {r_{23} } } - G \dfrac{m_1m_3}{ {r_{13} } } $$
                    <br>
                    The notation uses the two numbers of the two bodies in question as subscripts. For more bodies, you simply do the same thing 
                    as this, but for each <b>unique</b> pair of bodies. You don't want to double count, since the expression is the gravitational potential 
                    energy of the whole pair!
                </span>
                <span v-show="level==0">
                    Note that we only have to deal with each unique pair once, since the formula for gravitational potential 
                    energy accounts for the energy between <b>two</b> objects. Here's an example for what the gravitational potential 
                    energy would look like if there were three objects.
                    <br><br>
                    $$ U = - G \dfrac{m_1 m_2 }{ {r_{12} } } - G \dfrac{m_2m_3}{ {r_{23} } } - G \dfrac{m_1m_3}{ {r_{13} } } $$
                    <br>
                    The notation with two subscripts denotes the separation between the two bodies mentioned in the subscripts. It's a 
                    more general way of writing things. Overall, this concept isn't too hard, as you just add together individual potential 
                    energies to find the total.
                </span>
                <br><br>
                That was the last thing I wanted to talk about for this unit! Universal gravitational potential energy is a concept 
                that many find confusing at first, but hopefully after that lesson you find that it makes a lot more sense now. Energy 
                as a whole relies more on conceptual skills than mathematical ones, so if you get the concepts down the problems should be 
                a piece of cake. 
                <br><br>
                Next, we're moving on to a mathematically heavy unit, though it also contains important concepts. Momentum is not a very 
                difficult concept to cover, but it is important nonetheless because it, like energy, is a quanitity that is conserved 
                in our universe. (It also describes car crashes and bombs.) Wondering what I'm talking about? Move on to find out!
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