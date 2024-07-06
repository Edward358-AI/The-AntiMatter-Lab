<script setup>
defineProps(["level"])
defineEmits(["nextpage"])
</script>


<template>
    <div class="container-fluid p-5 mw-1120">
        <h1>Position, Velocity, Acceleration</h1><br>
        <p>
            <span v-show="level == 0">
                Welcome to the start of a bunch of lessons on "real" physics! Are you excited?<br>Position is defined as
                the vector (wake up call if you were dozing off in lesson 1!) from the origin to
                the point where an object is on a coordinate plane.
                Its SI unit is the meter ($\textrm{m}$).<br>We can actually define the origin however we wish and
                position will still be
                valid, so there is no absolute way to measure position. Still confused? Let's walk through an example!
                So, let's say my friend and I were standing in a room. I could be $5$ meters from
                a certain object in the room, but my friend standing at a different spot in the room is only $2$ meters
                from the same object. The object is still in
                the same place, so both points of view must be correct! So if position is not constant for each
                observer, then what is the point of defining it? Well, the change in position, or <i>displacement</i>,
                is
                constant. From my point of view, my friend is still $2$ meters from the object. This is true for ANY
                point
                of view in the room! (Well, only in Newtonian mechanics, which thankfully is what we're learning about
                [you'll probably learn about this when you learn about relativity]).<br><br>
                Position is typically defined with variables. Now if you haven't learned variables yet, don't worry! We
                got your back! Remember how vectors were defined using letters with an arrow on the top? Variables are
                just like that, except without the arrow! You can think of it as if a value/quantity was stored in the
                letter, and we wanted to refer to it without actually saying the value/quantity, which is why we use
                variables! The variable $x$ is primarily used, though $y$ and $d$ are sometimes used.<br>Do you remember
                when we just said that <i>displacement</i> is far more useful than just position by itself? Well, given
                your original position and your final position as two seperate points, guess what we can do with them:
                We can draw a vector! That vector is what is called displacement, and how it is calculated from your
                original and final position. We can also do this mathematically, $$\Delta x = x_f-x_0$$Hold on! If you
                didn't sign up for this complex mathematical brain torture, we won't put you through too much of it! I
                promise! Remember when I said variables store values and quantities? That's what's in play here! $\Delta
                x$ is just a math-y way to say "displacement", and $x_f$ stands for final position, while $x_0$ (also
                sometimes seen as $x_i$) is, you guessed it, initial position!<br><br>Now let's do some simple math.
                Let's say you started at a dot on the floor, which let's call the origin (remember, we can define origin
                however we like!), and walked $10$ meters to the right. Your initial position is $0$, since you started
                from the origin, and your final position is $10$, since you are $10$ meters away from the origin (and
                that's the definition of position!). Thus, your displacement, is $10-0=10$ meters! While we did this
                math super simply, remember that displacement is a vector, and this number is just the length, or more
                formally, the magnitude. The direction of the vector would be to the right, since you walked to the
                right.<br><br>Having done this, now let's work through a more interesting example. Say you were to start
                at your house, which let's call the origin for this example. If you took a trip all around the world,
                and returned to your house, what was your displacement? Well, we know that displacement is final
                position minus initial position. So if your final position is back to the origin, and you started at the
                origin... That can only mean one thing... Your displacement is $0$! Do you see why? If your final
                position is $0$ meters from the origin, but so is your initial position, $0-0=0$!<br><br>Moving on to a
                different (but related) topic, you may also have heard of <i>distance</i>, which does actually hold some
                significance in physics, and it is defined as the the length of the path taken from one point to
                another, represented like this: $\Delta s$ (not to be confused with the unit seconds, $\textrm{s}$ !!).
                <br>Yet this raises one very pressing question: What's the big difference, between distance and
                displacement and all these fancy whatnots??<br>
                Well, let's work through an example! For instance, let's say I drive $50$ kilometers in one direction
                and then back
                home, my distance
                traveled is $100$ kilometers but my displacement is $0$ kilometers, since my final position is the same
                as my initial (and displacement is calculated from your final position to your initial position).
                Note that displacement is a vector quantity, but distance is a scalar (simply remember this as a term
                for regular numbers, or non-vectors). These terms are not interchangeable and will come up
                again!!<br><br>

                <br>Now, velocity ($v$), in its formal definition, is defined as the instantaneous rate of change of
                position. Wait wait wait what? Don't worry about what that means. We won't worry too much about that!
                The units of velocity is meters per second, $\frac{\textrm{m}}{\textrm{s}}$<br>However, instantaneous
                velocity is not the only way we can express velocity. Another useful definition is average velocity,
                which is denoted by $\bar{v}$, and it is the displacement divided by the time interval in which it took
                place. So, from that, we know that: $$\bar{v} = \frac{\Delta x}{\Delta t}$$Or using the previous
                equation from the section on displacement, we know that: $$\Delta x = x_f-x_i$$So...$$\bar{v} =
                \frac{x_f-x_i}{\Delta t}$$Apologies if the math is killing you right now! Physics is very math heavy, it
                is hard to learn physics without some level of mathematical intervention. We will try to keep the
                equations to a minimum and use only the very basic ones where necessary.<br>If your math is to that
                level, you may have noticed we can directly related displacement ($\Delta x$) and average velocity
                ($\bar{v}$), and in that regard, you would be right! Doing a bit of rearranging, we get: $$\bar{v} \cdot
                \Delta t = \Delta x$$ Which tells us the average velocity multiplied by the change in time is the same
                as your displacement! It is important to remember that a $v$ will always denote instantaneous velocity,
                or velocity at a certain point in time, while $\bar{v}$ will always denote average velocity, or velocity
                over a certain period of time.<br><br>Do note that while your instantaneous velocity could be equal to
                zero, but your overall average velocity is not zero! For example, if I walk to my friend's house, but
                stop temporarily at a traffic light, my average velocity is positive, since my displacement was
                positive, but my velocity at the instant I was at the traffic light is zero!<br>Now the converse is also
                true: my average velocity could be zero, but my instantaneous velocity could be nonzero. Let's say I run
                a lap around a park and stop at where I started from. My average velocity is zero, since if you look at
                the previous equation, $\bar{v} = \frac{x_f-x_i}{t}$, my final position and initial position are zero,
                and zero divided by anything is zero! But let's take a look at my velocity at the instant I'm halfway
                around the park, that is definitely not zero. I am running as fast as I can because I want to finish my
                lap!<br>All this talk about instantaneous vs average velocity is very important to remember. Now if you
                were super clever, you might say, hey! We never introduced how to calculate instantaneous velocity! And
                with that, you are correct! The reason why we can't do that is because it requires higher level math. We
                will give you one equation to calculate instantaneous velocity in the next chapter, but it is very
                simple and only concerns acceleration and velocity. All the other equations require higher level
                algebra, while we are trying to skim the surface! As you can see, it isn't super easy! We've left out a
                lot of details and this is still largely simplified. Physics is hard, and you are a brave soul to try
                and learn the basics of it!<br><br>As with distance and displacment, you may have heard of speed. Speed
                and velocity are two non interchangeable terms, just like distance and displacement! You might be able
                to predict, if velocity is displacement divided by time, then speed must be distance divided by time!
                Let's go back to example of me running around the park. My average velocity is zero, since my final and
                initial positions are the same, but my average speed is not zero, since my distance traveled is the
                length of the path around the park!<br>However, unlike distance and displacement, speed can be
                <i>more</i> confusing sometimes. Speed is often used as a word in physics texts to describe the
                magnitude (or length) of the velocity vector (remember vectors?), so in a sense, speed is related to
                velocity (do not make the same mistake for distance! Distance is almost NEVER used to refer to the
                magnitude of the displacement vector). Thus, for the rest of this course, we will do our best to refer
                to the magnitude of velocity as "the magnitude of velocity". There may be times though, where we mess
                up, and there may be cases where you're working on physics from a separate source! It is up to you to
                decide, using your best judgement and the context, whether "speed" in that scenario refers to its actual
                definition or just a shorthand for the magnitude of the velocity vector. However, without any context,
                speed and velocity are two noninterchangeable terms! Speed will always refer to $\frac{\Delta s}{\Delta
                t}$ and is always a nonnegative scalar, while velocity is $\frac{\Delta x}{\Delta t}$ and a vector, a
                quantity with a magnitude and direction! Remember that from now on!<br><br><br>Acceleration ($a$) is our
                final kinematic quantity, and it is the rate of change of
                velocity. As with velocity, there is instantaneous acceleration, and average acceleration. We will deal
                with average acceleration, since it is more of use to us!<br>Likewise, average acceleration is equal to
                the change in velocity divided by change in time: $$\bar{a}=\frac{\Delta v}{\Delta t}$$ From the
                equation, we can see the units acceleration is equal to
                $\frac{\frac{\textrm{m}}{\textrm{s}}}{\textrm{s}}$, or simply $\frac{\textrm{m}}{\textrm{s}^2}$, or
                meters per second squared (for those that don't know, it just means $\frac{\textrm{m}}{\textrm{s} \cdot
                \textrm{s}}$.)<br>An aside: Have you noticed we use the multiplication dot to denote multiplication?
                It's because the other symbol is an x-shape, and guess what variable that looks like! We don't want to
                confuse ourselves!<br>Now you're probably thinking: Can we also write an equation with velocity and
                acceleration, just like we did before with displacement and velocity? Well we certainly can! Thus, we
                can get: $$\bar{a} \cdot \Delta t = \Delta v$$ But wait! Now you're probably saying, change in velocity
                is equal to final velocity minus initial! So we can plug this equation $\Delta v = v_f-v_i$ into that
                equation to get: $\bar{a} \cdot \Delta t = v_f-v_i$, and we can rearrange it to get: $$v_i + \bar{a}
                \cdot \Delta t = v_f$$ Isn't that amazing? We can now calculate instantaneous velocity using our simple
                knowledge of math! <br><br>Now before we close off this lesson, there is something conceptually that is
                important to realize. <i>All these quantities listed are VECTOR quantities.</i> Need a refresher? A
                vector is defined by its length and direction. Now, if a vector's length changes, then it is a different
                vector! That's what the math above was dealing with. It dealt with the <i>length</i> of those vectors.
                However, it is also important remember that if the vector's direction changes, then wouldn't it also be
                a different vector? So now let's look at an example. Let's say you have a toy car moving at a constant
                speed (not velocity!) around a circular track. Does the car have acceleration? Your intuition will
                instantly jump to the answer, NO! The car isn't speeding up or slowing down, so it isn't accelerating!
                However, that just isn't true. Remember that the definition of acceleration is the <i>change</i> in
                velocity, and velocity is a vector. If you are moving around a circle, your direction is changing
                basically every instant, if you think about it! Thus, the car DOES have acceleration, since the
                <i>direction</i> of your velocity is changing, even though it may not be speeding up or slowing down!
                This is a very important concept that you must know! (It will come up again)<br><br>
                That's pretty much all there is to position, velocity, and acceleration. Like with the vectors chapter,
                we're going to introduce something pretty cool that is a little beyond the scope of the lesson and this
                math level, just to give you something to chew on. Now you're probably thinking, is there a way to
                relate acceleration and displacement? Given the equations that we have, you'll see that we have $\bar{v}
                \cdot \Delta t = \Delta x$, and $\bar{a} \cdot \Delta t = \Delta v$. However, we can't directly plug
                this equation into our first one! Notice that we need $\bar{v}$, and not $\Delta v$! Let's try and solve
                this task at hand. First, we need to derive an equation for average velocity, $\bar{v}$. For those that
                don't know, taking the average of some amount of quantities is to add all the quantities together, and
                divide by the number of quantities there are. There are a few ways to calculate average velocity, but
                how about we check out this one: $$\bar{v} = \frac{v_f+v_i}{2}$$ The average of your final velocity and
                your initial velocity must be, well, your average velocity! So now we have this equation, right? Taking
                an equation from the acceleration chapter, we know what $v_f$ is equal to! $v_f = v_i + \bar{a} \cdot
                \Delta t$! So if we plug this into that equation for $v_f$, we get: $$\bar{v} = \frac{v_i + v_i +
                \bar{a} \cdot \Delta t}{2} = \frac{2 \cdot v_i + \bar{a} \cdot \Delta t}{2} = \frac{\cancel{2} \cdot
                v_i}{\cancel{2}} + \frac{\bar{a} \cdot \Delta t}{2} = v_i + \frac 1 2 \bar{a} \cdot \Delta t$$ Wow, now
                you can see that average velocity is equal to this! Now we can plug this into $\Delta x = \bar{v} \cdot
                \Delta t$! Substituting this heap of variables and numbers for $\bar{v}$ gives us: $$\Delta x = (v_i +
                \frac 1 2 \bar{a} \cdot \Delta t) \cdot \Delta t = v_i \cdot \Delta t + \frac 1 2 \bar{a} \cdot \Delta t
                \cdot \Delta t$$ Wow, the final equation involving displacement and acceleration! Isn't that amazing?
                Now if you haven't learned algebra yet, this could be difficult to grasp. However, I promise, for the
                next few chapters, we will focus a little less on the equations. This was just a fun experiment to see
                how we can come up with an equation for displacement and acceleration. If you genuinely are having a
                hard time comprehending and understanding, we recommend you go to Khan Acadmey's Algebra course (link <a
                    href="https://www.khanacademy.org/math/algebra-basics/alg-basics-algebraic-expressions"
                    target="_blank">here</a>) and reviewing that lesson we just linked. After doing that, maybe come
                back and review this lesson again!<br>OK! Are you ready to learn more about kinematics? Then let's go to
                it!
            </span>
            <span v-show="level > 0">
                Welcome to the start of a bunch of lessons on "real" physics! Are you excited?<br>Position is defined as
                the vector (wake up call if you were dozing off in lesson 1!) from the origin to
                the point where an object is on a coordinate plane.
                Its SI unit is the meter ($\textrm{m}$).<br>We can actually define the origin however we wish and
                position will still be
                valid, so there is no absolute way to measure position. Still confused? Let's walk through an example!
                So, let's say my friend and I were standing in a room. I could be $5$ meters from
                a certain object in the room, but my friend standing at a different spot in the room is only $2$ meters
                from the same object. The object is still in
                the same place, so both points of view must be correct! So if position is not constant for each
                observer, then what is the point of defining it? Well, the change in position, or displacement, is
                constant. From my point of view, my friend is still $2$ meters from the object. This is true for ANY
                point
                of view in the room! (Well, only in Newtonian mechanics, which thankfully is what we're learning about
                [you'll probably learn about this when you learn about relativity]).<br><br>
                Position is typically defined with the variable $x$, though $y$ and $d$ are sometimes used. <span
                    v-show="level == 2">I personally
                    dislike using $d$, and any calculus student will understand why.</span> To calculate displacement,
                we use the
                formula $x=x_f-x_i$, where $x_f$ and $x_i$ are the final and initial positions, respectively. A quantity
                called
                distance also exists, and it is the length of the path taken from one point to another, represented by
                the variable $s$ (not to be confused with the unit seconds, $\textrm{s}$ !!). What's the big difference?
                Well, let's look at an example. For instance, if I drive $50$ kilometers in one direction and then back
                home, my distance
                traveled is $100$ kilometers but my displacement is $0$ kilometers, since my final position is the same
                as my initial.
                Note that displacement is a vector quantity, but distance is a scalar. These terms are not
                interchangeable!!<br><br>
                Now, velocity ($v$) is defined as the instantaneous rate of change of position. <span
                    v-show="level == 1">This typically requires calculus to calculate, so we won’t worry too much about
                    that definition.</span> Another useful definition is average velocity, denoted by $\bar{v}$, the
                displacement divided by the time interval in which it took place. We also realize that this is the slope
                of a position
                versus time ($x\textrm{-}t$) graph ($x$ divided by $t$, which is rise over run!). From this, we easily
                derive $x=\bar{v}t$ or, if you please, $x_f=x_i+\bar{v}t$ (although we omitted the capital letter delta,
                it is important to remember that "$t$" still refers to "$\Delta t$", or change in time, and the same
                goes for "$x$" and "$\Delta x$").<br>It is important to remember that a $v$ will always denote
                instantaneous velocity, or velocity at a certain point in time, while $\bar{v}$ will always denote
                average velocity, or velocity over a certain period of time. Do note that while your instantaneous
                velocity could be equal to zero, but your overall average velocity is positive! (can you see why?)

                <span v-show="level == 2"><br><br>For calculus students, we realize that we decrease the time interval,
                    the expression reduces to $\frac{dx}{dt}$, the time derivative of position. This result can be used
                    to derive the velocity given a position
                    function, and vice versa (by integrating $dx = v~dt$).</span>
                <br><br>

                Acceleration is our final kinematic quantity, and it is the instantaneous rate of change of velocity.
                Likewise, average acceleration is equal to the change in velocity over time ($a=\frac{\Delta v}{\Delta
                t}$). From the equation, we can see the units acceleration is equal to
                $\frac{\frac{\textrm{m}}{\textrm{s}}}{\textrm{s}}$, or simply $\frac{\textrm{m}}{\textrm{s}^2}$<br><br>
                For nearly all scenarios in our study of physics, we will consider the case of constant acceleration.
                Why is this? Constant acceleration is the simplest case of Newtonian mechanics that we can learn. There
                are other ways to express nonconstant acceleration, but that requires more advanced calculus. Another
                important thing is that the kinematics equations (that we will learn about shortly) only hold true for
                cases that deal with constant acceleration.<br>Since we know acceleration is the slope of the velocity
                graph, we have $v=at$ or $v_f = v_i + at$.<br><br>Now, you might think that from the previous equation,
                $x=\bar{v}t$, that
                $x=at^2$. This is NOT true. One important thing to realize here is that $\bar{v}$ is <i>average</i>
                acceleration, and the previous equation, $v=at$, finds <i>instantaneous</i> velocity. To find the true
                equation, we can use one of two methods: algebra/graphical analysis, or calculus.<br><br>First, let's
                take a look at how algebra and graph analysis can lead us to the right equation. Notice that we can
                calculate our <i>average</i> velocity using this equation (If you ever see $v_i$ and $v_0$, just
                remember they both refer to <i>initial</i> velocity.): $$\bar{v} = \frac{v_f+v_0}{2}$$ Do you see how
                this works? Taking the average of our initial and final velocities gives us, well, average velocity! But
                hold on! What is $v_f$? If you remember from just a few paragraphs ago, $v_f$ is equal to $v_i + at$! So
                when we plug this in, we get: $$\bar{v} = \frac{v_0 + at + v_0}{2} = \frac{2v_0 + at}{2} = v_0 +
                \frac{1}{2}at$$ So, now we have an equation that we can plug into $x=\bar{v}t$! Plugging this in will
                give us: $$x = (v_0 + \frac{1}{2}at) \cdot t = v_0 t + \frac{1}{2}at^2$$ So this is the equation that
                involves acceleration! Now you may also have noticed that we could have plugged in the first form of
                $\bar{v}$ into this equation. That is true as well. That will give us: $$x=\frac{1}{2}(v_0+v_f)t$$ This
                is a handy equation to have as well. We'll show examples of more equations later on, but these two are
                part of five equations that you MUST memorize.<br><br>Now let's take a look at the same thing but via
                graphical analysis. We know that acceleration is the slope of the velocity versus time (v-t) graph. The
                area under the curve is displacement, since it is computed by multiplying velocity and time interval
                (the axes) which gives the units of displacement (what is $\frac{\textrm{m}}{\textrm{s}} \cdot
                \textrm{s}$). Don't worry! If you don't know what area under the curve is, it is exactly what it sounds
                like. You calculate the area under the line of the graph for a certain interval. The reason why this
                gives us displacement is because we just mentioned, if you look at the units for the x-axis, and the
                y-axis, if you multiply the units, you will get the units of displacement (believe it or not, you are
                learning fundamental calculus right now!). For the case with initial velocity $v_0$ and constant
                acceleration
                $a$, we have a graph that looks like this:
                <figure>
                    <img src="/src/assets/kinematics/Figure 8.png" width="170px" />
                    <figcaption>Figure 1: Graphical derivation of the position equation involving acceleration
                    </figcaption>
                </figure>
                For any $v_f$, the area is: $$x=\frac{v_0+v_f}{2} \cdot t$$ Using the formula for the area of a
                trapezoid (I will assume you know the trapezoid formula, if not, you can search it up). You can
                visualize this trapezoid by drawing a vertical line from the tip of the arrow to the x-axis, which you
                will see via the dotted line is $v_f$. You can see that the two "bases" are $v_0$ and $v_f$, while the
                "height" is the change in time (because the x-axis is time, and the y-axis is velocity).<br>
                (Again, note that the use of $\Delta t$ is often replaced with just $t$ for convenience.)
                <br><br>
                You can see that this implies that $\bar{v}=\frac{v_0+v_f}{2}$<br>
                But... $$v_f = v_0 + at$$
                So...
                $$x=\frac{2v_0+at}{2}t=v_0t+\frac{1}{2}at^2$$
                Which is what we exactly just derived!! It is highly recommended (maybe almost required) that you
                memorize these equations, because you will likely be using them a lot for the next two
                lessons.<br>Another interesting thing you can do is remember when we taught you dimensional analysis?
                You can go back to the equations we mentioned and double confirm with us, are the equations also
                <i>dimensionally</i> accurate? Just something for you to investigate upon.<br>
                From this, we can graph an $x$-$t$ graph for constant acceleration scenarios. A desmos example is shown
                below (you can play around with the sliders):
                <iframe src="https://www.desmos.com/calculator/g1suzxzrsv" width="1000" height="500"
                    frameborder=0></iframe><br>
                <span v-show="level == 2">For calculus students, we told you that $v = \frac{dx}{dt}$, and
                    $a=\frac{dv}{dt}$. Thus we can relate the two and get $x=\frac{dx^2}{d^2t}$. By using calculus, we
                    can turn a previously derived equation into what we're trying to derive! $$v = v_0 + at$$
                    $$\frac{dx}{dt} = v_0 + at$$ $$dx = v_0 + at~dt$$ $$\int_{x_0}^{x_f}dx = \int_{0}^{t}(v_0+at)dt$$
                    $$x = v_0 t + \frac{1}{2}at^2$$</span>
                That's pretty much all there is to position, velocity, and acceleration. Usually, when we say $x$, we do
                mean displacement, but occasionally, if you see $x$ denoted with subscripts $f$ or $i$ or $0$, it will
                refer to instantaneous position. However, as we mentioned at the start of the lesson, it is vastly more
                useful and advantageous (in various different ways) to find the <i>change</i> in position, because we
                can utilize it and draw connections with it to other quantities, like velocity and acceleration. If
                there is one key takeaway from this lesson, it would be how the three values are related. Remember:
                velocity is the (instantaneous) rate of change of displacement, and acceleration is the (instantaneous)
                rate of change of velocity.<br>Are you ready to learn how to use what you just learned to do some cool
                calculations? Let's go to it!
            </span>
            <br><br><a href="javascript:void(0)" @click="$emit('nextpage')"
                style="animation: scale 2s infinite;display:block">Next Lesson! &rarr;</a>
        </p>
    </div>

</template>


<style scoped></style>