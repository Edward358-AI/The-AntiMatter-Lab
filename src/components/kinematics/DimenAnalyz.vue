<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Dimensional Analysis</h1><br>
        <div v-show="page === 0">
            <p>

                <span v-show="level == 0">Hopefully the lesson on vectors taught you much. Now this is going to be a
                    relatively short lesson that explains a few concepts that are going to be important for the rest of
                    physics. Assuming you have been taught something similar or taken a science class that has utilized
                    this, you may simply skip over this lesson. However, if you haven't learned this before, this is
                    going
                    to be interesting for you.<br><br>Before we get into what dimensional analysis is, we must
                    understand
                    what
                    we're dealing with here. If you look at the two words separately, you get "Dimensional" and
                    "Analysis".
                    The first important thing about dimensional analysis is the dimensions part.<br><br>A dimension, is
                    much
                    like maybe what you see as a unit. If you've ever measured something, you know that you need to
                    specify
                    what units it is in. For example, if you measure length, you might use centimeters or inches, and if
                    you're measuring volume, you might use liters, or gallons.<br>Something important to note is that
                    there
                    are so many different units you can use to measure something like length, or time. In the world of
                    science, we have standardized a set of three basic units that we use to express everything. This is
                    called the International System of Units, or just the SI unit system for short. These three units
                    include meters for length, kilograms for mass, and seconds for time. Keep these in mind because we
                    will
                    be using them from now on!<br>These are all examples of dimensions, and
                    they give meaning to a number. What do we mean by this? Take the number $6$, for example. While it
                    might
                    be useful in your math class or your everyday arithmetic, in the world of science, it is utterly
                    <i>useless!</i> (well, not utterly, but you get the idea). The reason why I say this is because it
                    could
                    mean $6$ meters, $6$ seconds, $6$ meters/second, $6$ Newtons, $6$ Newton meters, and so on. See,
                    without
                    a unit, a simple "number" becomes practically meaningless, so that's why we stress the importance of
                    units.
                </span>
                <span v-show="level > 0">Hopefully the lesson on vectors taught you much. Now this is going to be a
                    relatively short lesson that explains a few concepts that are going to be important for the rest of
                    physics. Assuming you have been taught something similar or taken a science class that has utilized
                    this, you may simply skip over this lesson. However, if you haven't learned this before, this is
                    going
                    to be interesting for you.<br>Before we get into what dimensional analysis is, we must understand
                    what
                    we're dealing with here. If you look at the two words separately, you get "Dimensional" and
                    "Analysis".
                    The first important thing about dimensional analysis is the dimensions part.<br><br>A dimension, is
                    much
                    like maybe what you see as a unit. If you've ever measured something, you know that you need to
                    specify
                    what units it is in. For example, if you measure length, you might use centimeters or inches, and if
                    you're measuring volume, you might use liters, or gallons.<br>Something important to note is that
                    there
                    are so many different units you can use to measure something like length, or time. In the world of
                    science, we have standardized a set of three basic units that we use to express everything. This is
                    called the International System of Units, or just the SI unit system for short. These three units
                    include meters for length, kilograms for mass, and seconds for time. Keep these in mind because we
                    will
                    be using them from now on!<br>These are all examples of dimensions, and
                    they give meaning to a number. What do we mean by this? Take the number $6$, for example. While it
                    might
                    be useful in your math class or your everyday arithmetic, in the world of science, it is utterly
                    <i>useless!</i> (well, not utterly, but you get the idea). The reason why I say this is because it
                    could
                    mean $6$ meters, $6$ seconds, $6$ meters/second, $6$ Newtons, $6$ Newton meters, and so on. See,
                    without
                    a unit, a simple "number" becomes practically meaningless, so that's why we stress the importance of
                    units.<br><br>Another helpful thing to know about this is the concept of derived units. Derived
                    units
                    are
                    units that are usually made through a combination of multiple units. For example, the unit for
                    velocity
                    is meters per second, or $\frac{\textrm{m}}{\textrm{s}}$. What does this mean? This tells you that
                    something is traveling $1$ meter per $1$ second (when I say $1$, even though there isn't any place
                    that
                    explicitly puts a "$1$" in front of the $\textrm{m}$ and the $\textrm{s}$, it is implied, because
                    $1$
                    multiplied by anything is just itself). Another derived unit is the <i>Newton</i>, or <i>N</i>, and
                    its
                    derived form is this: $\frac{\textrm{kg} \cdot \textrm{m}}{\textrm{s}^2}$. Whew! That's a lot of
                    units,
                    right? If you break it down, though, it becomes more apparent. You'll learn this later on, but since
                    Newtons is the unit to measure <i>force</i>, it tells you that $1$ Newton is the force needed to
                    give a
                    mass of $1 ~ \textrm{kg}$ with an acceleration of $1 \frac{\textrm{m}}{\textrm{s}^2}$! Isn't that
                    cool?
                </span>
            </p>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                <span v-show="level == 0">
                    Another helpful thing to know about this is the concept of derived units. Derived units
                    are
                    units that are usually made through a combination of multiple units. For example, the unit for
                    velocity
                    is meters per second, or $\frac{\textrm{m}}{\textrm{s}}$. What does this mean? This tells you that
                    something is traveling $1$ meter per $1$ second (when I say $1$, even though there isn't any place
                    that
                    explicitly puts a "$1$" in front of the $\textrm{m}$ and the $\textrm{s}$, it is implied, because
                    $1$
                    multiplied by anything is just itself). Another derived unit is the <i>Newton</i>, or <i>N</i>, and
                    its
                    derived form is this: $\frac{\textrm{kg} \cdot \textrm{m}}{\textrm{s}^2}$. Whew! That's a lot of
                    units,
                    right? If you break it down, though, it becomes more apparent. You'll learn this later on, but since
                    Newtons is the unit to measure <i>force</i>, it tells you that $1$ Newton is the force needed to
                    give a
                    mass of $1 ~ \textrm{kg}$ with an acceleration of $1 \frac{\textrm{m}}{\textrm{s}^2}$! Isn't that
                    cool?<br><br>The second part is analysis. We won't focus too much on the analysis part, since that
                    requires
                    some more advanced mathematical knowledge. Regardless, it is important to understand that in
                    physics,
                    the unit gives meaning to a number. Throughout lessons, we will introduce to you units and derived
                    units, which are all important to know. Are you ready for some "real" physics now? Then let's get
                    going!
                </span>
                <span v-show="level > 0">
                    The second part is analysis. Analysis is a bit more interesting. When you do analysis, you
                    are
                    basically doing math that requires converting or changing units. For example, you might need to do
                    dimensional analysis to convert units, or because you're solving an equation. This is the
                    algebra-based
                    version, so we assume you know anything divided by itself is equal to one. The same goes for units.
                    So
                    if we want to convert $1 ~ \textrm{L}$ to $\textrm{mL}$, and we know $1 ~ \textrm{L} = 1000 ~
                    \textrm{mL}$, we can do something like this: $$1 ~ \cancel{\textrm{L}} ~ \cdot ~ 1000 ~
                    \frac{\textrm{mL}}{\cancel{\textrm{L}}}$$ You notice how units are able to cancel out, just like you
                    would do with variables or numbers!<br>Now let's see this in an equation. A simple equation you may
                    already know is $\textrm{speed} \cdot \textrm{time} = \textrm{distance}$. Speed is measured in
                    $\frac{\textrm{meters}}{\textrm{second}}$, and time is measured in $\textrm{seconds}$. Thus, let's
                    use
                    some arbitrary numbers and see it in action! $$3 ~ \frac{\textrm{m}}{\cancel{\textrm{s}}} ~ \cdot ~
                    9 ~
                    \cancel{\textrm{s}} = 27 ~ \textrm{m}$$ Do we see how this works? Hopefully you understand how to do
                    math with units now!<br>Now, there are many other practical uses and applications of dimensional
                    analysis. One important use is to establish a relationship between two quantities. This is going a
                    little beyond the scope of this lesson, but say we wanted to relate displacement (unit:
                    $\textrm{m}$)
                    and acceleration (unit: $\frac{\textrm{m}}{\textrm{s}^2}$). From what we already know about
                    cancelling
                    units, if we multiply acceleration by $\textrm{s}^2$, you can get our desired result.<br>IMPORTANT!
                    These letters are not referring to variables, but units! Don't forget that when you do math with
                    units!<br>Time has the dimension of $\textrm{s}$, so multiplying by time squared will give us
                    displacement!<br>Thus we craft an equation like so: ($\Delta x$ = displacement, $\Delta t$ = time,
                    $a$ =
                    acceleration) $$\Delta x \sim a \Delta t^2$$ By realizing we can create relationships between two
                    quantities via equations is a powerful tool. The funning wavy looking symbol in the middle is simply
                    used to denote that the <i>dimensions</i> are equal, minus the possibility of extra constants, or
                    coefficients. If we used an equal sign instead, it could potentially be an incorrect statement since
                    we may have missed out on some constants or coefficients. Speaking of constants,
                    some constants will have dimensions. Again, you will learn these equations much later on, but this
                    is
                    just for reference. We know the force that gravity exerts on you can be given through this equation:
                    $$F_g = mg$$ Where $g$ is a constant (its the acceleration due to gravity, again, you'll learn about
                    this later on). Since the unit for force is given by $\frac{\textrm{kg} \cdot
                    \textrm{m}}{\textrm{s}^2}$, and mass is given by $\textrm{kg}$, we can use dimensional analysis to
                    solve
                    for this constant's units: $$\frac{\frac{\cancel{\textrm{kg}} \cdot
                    \textrm{m}}{\textrm{s}^2}}{\cancel{\textrm{kg}}}$$ This leaves us with
                    $\frac{\textrm{m}}{\textrm{s}^2}$, which is the exact same as acceleration! Now you see how the
                    exact
                    same concept can be used to apply to constants because not all constants are dimensionless
                    scalars!<br><br>As you get more and more familiar or experienced with the math being done, you can
                    simply omit the units for the sake of time and space. However, when just starting out, which we
                    assume
                    you are, we highly recommend adding units, because it gives you an idea of how varying units can
                    work
                    together to produce a different unit as a result. By using units, you see what is really going on
                    when
                    you input values into an equation, and not just inputting them because you were told to do so or
                    blindly
                    doing so.<br>Now after reading that lesson, can you see why it is important to understand how the
                    unit
                    gives meaning to a number? Throughout lessons, we will introduce to you many
                    different units and derived units, which are all important to know. Are you ready for some "real"
                    physics now? Then let's get going!
                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson! &rarr;</button>
            </div>
        </div>
        <p>
        </p>
    </div>

</template>


<style scoped></style>