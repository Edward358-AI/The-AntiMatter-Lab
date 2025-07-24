<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>

<template>
    <div class="container h100 p-5">
        <h1>Simple Harmonic Motion</h1><br>
        <p>
            <div v-show="page===0">
                Simple harmonic motion (SHM) is the simplest kind of periodic motion, which is motion that repeats itself 
                over regular intervals. Although other kinds of periodic motion exist, SHM is the most basic and the 
                easiest to deal with. That doesn't mean this unit is going to be easy, though!
                <br><br>
                This unit does not introduce any new fundamental quantities unlike the previous few, but instead focuses heavily on 
                applying everything we've learned so far in order to analyze a type of complex motion. We don't just have things moving in 
                straight lines or circles anymore. They're now moving back and forth!
                <br><br>
                First, let's talk about what SHM looks like. SHM is a type of <b>oscillation</b>, which involves 
                some object moving back and forth in a regular pattern. What distinguishes SHM from other kinds of oscillation
                is that it is very "smooth" and "regular". The exact reason for this will be revealed later.
                <br><br>
                <span v-show="level>0">
                    Since we introduced the idea of periodic motion, we should also introduce the idea of <b>aperioidic</b> motion. In simple 
                    terms, this is any motion that does not repeat itself in a regular pattern. Sometimes, periodicity is used to represent that the 
                    motion repeats itself over a regular interval, while oscillatory motion refers to motion that repeats itself both in a regular 
                    pattern and interval. This usually involves something moving back and forth around a central position.
                    <br><br>
                </span>
                Why exactly do we call simple harmonic motion "harmonic"? Well, if you are a music student you might 
                have some idea. In music, a <b>harmonic</b> is a wave that is a multiple of a fundamental frequency. I'm 
                used to string instruments, so I'll explain it that way. Basically, a harmonic is a wave that covers the entire 
                string smoothly. The key thing here is that this wave is sinusoidal. If you know what a sine wave looks like, you'll 
                know that it's smooth and regular.
                <br><br>
                <figure>
                <img src="/src/assets/oscillations/Superior Sine Wave.png" style='max-width:750px'>
                <figcaption>
                    Figure 1: The amazing sine wave.
                </figcaption>
                </figure>
                Indeed, SHM is characterized by some quantity relating to the object oscillating in a sinusoidal way with 
                respect to time. Usually, this means position, velocity, acceleration, or something similar, but the exact 
                definition is more general than that! What is the exact definition? Well, it has to do with something that we've 
                touched on briefly before: the restoring force.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                The mathematical definition of simple harmonic motion is, well, pretty simple. The first condition is that the force has to be a
                restoring force that points back towards the equilibrium. The second is that in general, the acceleration has to be directly proportional 
                to the displacement from the origin and oppositely directed.
                <br><br>
                $$ a \propto - x $$
                <br>
                This means that the acceleration is always directed towards the equilibrium position, and the farther away you are from the equilibrium position, the
                greater the acceleration is. Sound familiar? It should! Something we learned about previously follows this exact relationship!
                <br><br>
                <span v-show="level==2">
                    The precise definition doesn't necessarily involve acceleration and position. Instead, it has to do with the second derivative of the 
                    quantitiy in question. We can call this arbitrary quantity $x$ for simplicity. In general, for simple harmonic motion to 
                    occurr, we need to satisfy the following condition:
                    <br><br>
                    $$ \frac{d^2x}{dt^2} \propto - x $$
                    <br><br>
                    The negative sign indicates the restoring nature of SHM.
                    <br><br>
                </span>
                The other thing that describes simple harmonic motion is the <b>angular frequency</b>, which is a measure of how fast the oscillation occurs. It 
                also takes the letter $\omega$, much like angular velocity. They even have the same units of $\textrm{rad/s}$. They are <b>not</b> the same thing, however! The angular frequency 
                describes oscillatory motion, while angular velocity describes rotational motion. That being said, they are somewhat related, which I'll get to later.
                <br><br>
                The angular frequency is different for each kind of simple harmonic oscillator, but it is always related to the period (time to complete one cycle) of the 
                motion. The period is denoted by $T$ and is related to the angular frequency by the following equation:
                <br><br>
                $$ T = \frac{2\pi}{\omega} $$
                <br>
                This relationship will be important later on when we talk about the different kinds of simple harmonic oscillators. <span v-show="level>0">
                    You should recall that we briefly talked about period earlier on, in our circular motion unit. Well, we also have frequency, which we also 
                    talked about there. It's simply the reciprocal of the period, and in this case it would take the form:
                    <br><br>
                    $$ f = \frac{1}{T} = \frac{\omega}{2\pi} $$
                    <br>
                </span>
                <span v-show="level==2">
                    With this information, we can also now finish the differential equation that describes simple harmonic motion. We can write it as:
                    <br><br>
                    $$ \frac{d^2x}{dt^2} = - \omega^2 x $$
                    <br>
                    This will be useful later on when we actually calculate things about simple harmonic oscillators. Of course, there's a simpler version as well 
                    that doesn't use differential equations:
                    <br><br>
                    $$ a = - \omega^2 x $$
                    <br>
                </span>
                <span v-show="level<2">
                    Now that we know about the angular frequency, we can now more accurately write the mathematical definition for simple harmonic motion as:
                    <br><br>
                    $$ a = - \omega^2 x $$
                    <br>
                </span>
                That's all the discussion of the math behind SHM. However, we still need to talk about why angular frequency shares the same 
                letter and unit as angular velocity. In fact, the relationship goes deeper than just the two quantities. They connect simple 
                harmonic motion and circular motion.
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
                Consider an object uniformly moving in a horizontal circle. If we look at the object, it has the same velocity throughout 
                all points in time. However, what's not the same is the distribution of that velocity into its components! 
                <br><br>
                Consider only the y-component in this case. We will look at where the y-position of the ball is at each point in time as it traverses the circle.
                <br><br>
                <figure>
                <img src="/src/assets/oscillations/Figure 96.png" style='max-width: 750px'>
                <figcaption>
                    Figure 2: The circle and the sine wave.
                </figcaption>
                </figure>
                <br>
                This simply tells us 
            </div>
        </p>
    </div>
</template>


<style scoped></style>