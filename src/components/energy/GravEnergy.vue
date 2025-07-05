<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Universal Gravitational Potential Energy</h1><br>
        <p>
            <div v-show="page===0">
                This unit only really has one concept, but it's a pretty difficult one. I'm also going to 
                show a lot of examples with this one, so expect this lesson to be pretty lengthy. With that said, let's 
                actually define what we're going to deal with in this unit.
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
                        Figure 1: We typically only use this formula when talking about large, celestial objects. (Like your mother.)
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
        </p>
    </div>

</template>


<style scoped>

</style>