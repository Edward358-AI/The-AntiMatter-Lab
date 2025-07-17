<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Position, Velocity, Acceleration</h1><br>
        <div v-show="page === 0">

            <p>
                <span v-show="level == 0">
                    Welcome to the start of a bunch of lessons on "real" physics! Are you excited? Let's jump right in!
                    <br><br>
                    Position is defined as
                    the vector (wake up call if you were dozing off in lesson 1!) from the origin to
                    the point where an object is on a coordinate plane.
                    Its SI unit is the meter ($\textrm{m}$).
                    <br><br>
                    We can actually define the origin however we wish and
                    position will still be
                    valid, so there is no absolute way to measure position. Still confused? Let's walk through an
                    example!
                    So, let's say my friend and I were standing in a room. I could be $5$ meters from
                    a certain object in the room, but my friend standing at a different spot in the room is only $2$
                    meters
                    from the same object. The object is still in
                    the same place, so both points of view must be correct! So if position is not constant for each
                    observer, then what is the point of defining it? Well, the change in position, or
                    <i>displacement</i>,
                    is
                    constant. From my point of view, my friend is still $2$ meters from the object. This is true for ANY
                    point
                    of view in the room!
                    <br><br>
                    Position is typically defined with variables. Now if you haven't learned variables yet, don't worry!
                    We
                    got your back! Remember how vectors were defined using letters with an arrow on the top? Variables
                    are
                    just like that, except without the arrow! You can think of it as if a value/quantity was stored in
                    the
                    letter, and we wanted to refer to it without actually saying the value/quantity. The variable $x$ is
                    primarily used, though $y$ and $d$ are sometimes used.
                    <br><br>
                    Do you remember
                    when we just said that <i>displacement</i> is far more useful than just position by itself? Well,
                    given
                    your original position and your final position as two seperate points, we can draw a vector
                    connecting
                    them. That vector is what is called displacement, and how it is calculated from your
                    original and final position. We can also do this mathematically, $$\Delta x = x_f-x_0$$Hold on! If
                    you
                    didn't sign up for this complex mathematical brain torture, we won't put you through too much of it!
                    I
                    promise! Remember when I said variables store values and quantities? That's what's in play here!
                    $\Delta
                    x$ is just a math-y way to say "displacement", and $x_f$ stands for final position, while $x_0$
                    (also
                    sometimes seen as $x_i$) is initial position! You can think of them like a super
                    mathematical (and maybe nerdy) way to use abbreviations.
                    <br><br>
                    Now let's do some simple math.
                    Let's say you started at a dot on the floor, which let's call the origin (remember, we can define
                    origin
                    however we like!), and walked $10$ meters to the right. Your initial position is $0$, since you
                    started
                    from the origin, and your final position is $10$, since you are $10$ meters away from the origin
                    (and
                    that's the definition of position!). Thus, your displacement, is $10-0=10$ meters! While we did this
                    math super simply, remember that displacement is a vector, and this number is just the length, or
                    more
                    formally, the magnitude. The direction of the vector would be to the right, since you walked to the
                    right.<br><br>Having done this, now let's work through a more interesting example. Say you were to
                    start
                    at your house, which let's call the origin for this example. If you took a trip all around the
                    world,
                    and returned to your house, what was your displacement? Well, we know that displacement is final
                    position minus initial position. So if your final position is back to the origin, and you started at
                    the
                    origin... That can only mean one thing... Your displacement is $0$! Do you see why? If your final
                    position is $0$ meters from the origin, but so is your initial position, $0-0=0$!<br><br>Moving on
                    to a
                    different (but related) topic, you may also have heard of <i>distance</i>, which does actually hold
                    some
                    significance in physics, and it is defined as the the length of the path taken from one point to
                    another, represented like this: $\Delta s$ (not to be confused with the unit seconds, $\textrm{s}$
                    !!).
                    <br><br>Yet this raises one very pressing question: What's the big difference, between distance and
                    displacement and all these fancy whatnots??<br><br>
                    Well, let's work through an example! For instance, let's say I drive $50$ kilometers in one
                    direction
                    and then back
                    home, my distance
                    traveled is $100$ kilometers but my displacement is $0$ kilometers, since my final position is the
                    same
                    as my initial (and displacement is calculated from your final position to your initial position).
                    Note that displacement is a vector quantity, but distance is a scalar (simply remember this as a
                    term
                    for regular numbers, or non-vectors). These terms are not interchangeable and will come up
                    again!!</span>
                <span v-show="level > 0">
                    Welcome to the start of a bunch of lessons on "real" physics! Are you excited? Let's get right into it, shall we?
                    <br><br>
                    Position is
                    defined as
                    the vector (wake up call if you were dozing off in lesson 1!) from the origin to
                    the point where an object is on a coordinate plane.
                    Its SI unit is the meter ($\textrm{m}$).
                    <br><br>
                    We can actually define the origin however we wish and
                    position will still be
                    valid, so there is no absolute way to measure position. Still confused? Let's walk through an
                    example!
                    So, let's say my friend and I were standing in a room. I could be $5$ meters from
                    a certain object in the room, but my friend standing at a different spot in the room is only $2$
                    meters
                    from the same object. The object is still in
                    the same place, so both points of view must be correct! So if position is not constant for each
                    observer, then what is the point of defining it? 
                    <br><br>
                    Well, the change in position, or displacement, is
                    constant. From my point of view, my friend is still $2$ meters from the object. This is true for ANY
                    point
                    of view in the room! (Well, only in Newtonian mechanics, which thankfully is what we're learning
                    about
                    [you'll probably learn about this when you learn about relativity]).<br><br>
                    Position is typically defined with the variable $x$, though $y$ and $d$ are sometimes used. <span
                        v-show="level == 2">I personally
                        dislike using $d$, and any calculus student will understand why.</span> To calculate
                    displacement,
                    we use the
                    formula $x=x_f-x_i$, where $x_f$ and $x_i$ are the final and initial positions, respectively. 
                    <br><br>
                    A
                    quantity
                    called
                    distance also exists, and it is the length of the path taken from one point to another, represented
                    by
                    the variable $s$ (not to be confused with the unit seconds, $\textrm{s}$ !!). What's the big
                    difference?
                    Well, let's look at an example. For instance, if I drive $50$ kilometers in one direction and then
                    back
                    home, my distance
                    traveled is $100$ kilometers but my displacement is $0$ kilometers, since my final position is the
                    same
                    as my initial.
                    Note that displacement is a vector quantity, but distance is a scalar. These terms are not
                    interchangeable!!
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
                    Now, velocity ($v$), in its formal definition, is defined as the instantaneous rate of change of
                    position (but we won't be dealing with the formal definition).
                    The units of velocity is meters per second, $\frac{ \textrm{m} }{\textrm{s} }$
                    <br><br>
                    However, instantaneous
                    velocity is not the only way we can express velocity. Another useful definition is average velocity,
                    which is denoted by $\bar{v}$, and it is the displacement divided by the time interval in which it
                    took
                    place. So, from that, we know that: $$\bar{v} = \frac{\Delta x}{\Delta t}$$Or using the previous
                    equation from the section on displacement, we know that: $$\Delta x = x_f-x_i$$So...$$\bar{v} =
                    \frac{x_f-x_i}{\Delta t}$$The math can be a bit confusing if you are new to this, but just try to
                    read
                    and follow along.<br><br>
                    If your math is to that
                    level, you may have noticed we can directly related displacement ($\Delta x$) and average velocity
                    ($\bar{v}$). Rearranging give us: $$\bar{v} \cdot
                    \Delta t = \Delta x$$ Which tells us the average velocity multiplied by the change in time is the
                    same
                    as your displacement! It is important to remember that a $v$ will always denote instantaneous
                    velocity,
                    or velocity at a certain point in time, while $\bar{v}$ will always denote average velocity, or
                    velocity
                    over a certain period of time.
                    <br><br>
                    Do note that while your instantaneous velocity could be equal to
                    zero, but your overall average velocity is not zero! For example, if I walk to my friend's house,
                    but
                    stop temporarily at a traffic light, my average velocity is positive, since my displacement was
                    positive, but my velocity at the instant I was at the traffic light is zero!
                    <br><br>
                    Now the inverse is
                    also
                    true: my average velocity could be zero, but my instantaneous velocity could be nonzero. Let's say I
                    run
                    a lap around a park and stop at where I started from. My average velocity is zero, since if you look
                    at
                    the previous equation, $\bar{v} = \frac{x_f-x_i}{t}$, my final position and initial position are
                    zero,
                    and zero divided by any number will always result in zero. But let's take a look at my velocity at
                    the
                    instant I'm halfway
                    around the park, that is definitely not zero. I am running as fast as I can because I want to finish
                    my
                    lap!
                    <br><br>
                    All this talk about instantaneous vs average velocity is very important to remember.
                    Calculating the instantaneous velocity requires higher level math than what we expect that you have, but there
                    is
                    one equation you can use to find the initial and final velocities, involving acceleration later
                    on.<br><br>As with distance and displacment, you may have heard of speed. Speed
                    and velocity are two non interchangeable terms as well. You might be able
                    to predict, if velocity is displacement divided by time, then speed must be distance divided by
                    time!
                    Let's go back to example of me running around the park. My average velocity is zero, since my final
                    and
                    initial positions are the same, but my average speed is not zero, since my distance traveled is the
                    length of the path around the park!<br>However, unlike distance and displacement, speed can be
                    <i>more</i> confusing sometimes. Speed is often used as a word in physics texts to describe the
                    magnitude (or length) of the velocity vector (remember vectors?), so in a sense, speed is related to
                    velocity. We will occasionally use speed to refer to the magnitude of velocity. Use your best judgement and decide based on the context of the problem whether that is actually speed or just a shorthand for the magnitude of velocity. But remember, without context, speed will
                    always refer to $\frac{\Delta s}{\Delta
                    t}$ and is always a nonnegative scalar, while velocity is $\frac{\Delta x}{\Delta t}$ and a vector,
                    a
                    quantity with a magnitude and direction!
                </span>
                <span v-show="level > 0">
                    Now, velocity ($v$) is defined as the instantaneous rate of change of position. <span
                        v-show="level == 1">This typically requires calculus to calculate, so we won’t worry too much
                        about
                        that definition.</span> Another useful definition is average velocity, denoted by $\bar{v}$, the
                    displacement divided by the time interval in which it took place. We also realize that this is the
                    slope
                    of a position
                    versus time ($x\textrm{-}t$) graph ($x$ divided by $t$, which is rise over run!). 
                    <br><br>
                    From this, we
                    easily
                    derive $x=\bar{v}t$ or, if you please, $x_f=x_i+\bar{v}t$ (although we omitted the capital letter
                    delta,
                    it is important to remember that "$t$" still refers to "$\Delta t$", or change in time, and the same
                    goes for "$x$" and "$\Delta x$").
                    <br><br>It is important to remember that a $v$ will always denote
                    instantaneous velocity, or velocity at a certain point in time, while $\bar{v}$ will always denote
                    average velocity, or velocity over a certain period of time. Do note that while your instantaneous
                    velocity could be equal to zero, but your overall average velocity is positive! (can you see why?)

                    <span v-show="level == 2"><br><br>For calculus students, we realize that we decrease the time
                        interval,
                        the expression reduces to $\frac{dx}{dt}$, the time derivative of position. This result can be
                        used
                        to derive the velocity given a position
                        function, and vice versa (by integrating $dx = v~dt$). Much of the physics right now isn't
                        necessarily calculus heavy and while we can technically do all of these things with calculus, it
                        would simply be overkill. Calculus plays a much more vital role in terms of graphical
                        analysis.</span>
                    <br><br>As with distance and displacment, you may have heard of speed. Speed
                    and velocity are two non interchangeable terms, just like distance and displacement! You might be
                    able
                    to predict, if velocity is displacement divided by time, then speed must be distance divided by
                    time!
                    Let's go back to example of me running around the park. My average velocity is zero, since my final
                    and
                    initial positions are the same, but my average speed is not zero, since my distance traveled is the
                    length of the path around the park!<br><br>However, unlike distance and displacement, speed can be
                    <i>more</i> confusing sometimes. Speed is often used as a word in physics texts to describe the
                    magnitude (or length) of the velocity vector (remember vectors?), so in a sense, speed is related to
                    velocity (do not make the same mistake for distance! Distance is almost NEVER used to refer to the
                    magnitude of the displacement vector). 
                    <br><br>
                    Thus, for the remainder of this unit, we will do our best to
                    refer
                    to the magnitude of velocity as "the magnitude of velocity". There may be times though, where we
                    mess
                    up, and there may be cases where you're working on physics from a separate source! It is up to you
                    to
                    decide, using your best judgement and the context, whether "speed" in that scenario refers to its
                    actual
                    definition or just a shorthand for the magnitude of the velocity vector. 
                    <br><br>
                    However, without any context,
                    speed and velocity are two noninterchangeable terms! Speed will always refer to $\frac{\Delta
                    s}{\Delta
                    t}$ and is always a nonnegative scalar, while velocity is $\frac{\Delta x}{\Delta t}$ and a vector,
                    a
                    quantity with a magnitude and direction! Remember that from now on!
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
                <span v-show="level == 0">
                    Acceleration ($a$) is our
                    final kinematic quantity, and it is the rate of change of
                    velocity. As with velocity, there is instantaneous acceleration, and average acceleration. We will
                    deal
                    with average acceleration, since it is more of use to us!<br><br>
                    Likewise, average acceleration is equal
                    to
                    the change in velocity divided by change in time: $$a=\frac{\Delta v}{\Delta t}$$ From the
                    equation, we can see the units acceleration is equal to
                    $\frac{\frac{\textrm{m}}{\textrm{s}}}{\textrm{s}}$, or simply $\frac{\textrm{m}}{\textrm{s}^2}$, or
                    meters per second squared (for those that don't know, it just means $\frac{\textrm{m}}{\textrm{s}
                    \cdot
                    \textrm{s}}$.)<br><br>
                    An aside: Have you noticed we use the multiplication dot to denote multiplication?
                    It's because the other symbol is an x-shape, and guess what variable that looks like! We don't want
                    to
                    confuse ourselves!<br><br>
                    We can also write an equation with velocity and
                    acceleration, just like we did before with displacement and velocity, like shown: $$a \cdot \Delta t
                    =
                    \Delta v$$ But wait! Change in velocity
                    is equal to final velocity minus initial! So we can plug this equation $\Delta v = v_f-v_i$ into
                    that
                    equation to get: $a \cdot \Delta t = v_f-v_i$, and we can rearrange it to get: $$v_i + a
                    \cdot \Delta t = v_f$$ We now have means of calculating your initial and final velocity, which are
                    instantaneous velocities! However, given this equation, there is one pitfall of using this. This
                    equation is
                    only valid under the circumstance that your acceleration is constant, or you are using the average
                    acceleration. If the acceleration is not constant, you would have to use the average acceleration,
                    or
                    use more advanced calculus tools.<br><br>Now before we close off this lesson, there is something
                    conceptually that is
                    important to realize. <i>All these quantities listed are VECTOR quantities.</i> Need a refresher? A
                    vector is defined by its length and direction. Now, if a vector's length changes, then it is a
                    different
                    vector! That's what the math above was dealing with. It dealt with the <i>length</i> of those
                    vectors.
                    However, it is also important remember that if the vector's direction changes, then wouldn't it also
                    be
                    a different vector? 
                    <br><br>
                    So now let's look at an example. Let's say you have a toy car moving at a
                    constant
                    speed (not velocity!) around a circular track. Does the car have acceleration? Your intuition will
                    instantly jump to the answer, NO! The car isn't speeding up or slowing down, so it isn't
                    accelerating!
                    However, that just isn't true. Remember that the definition of acceleration is the <i>change</i> in
                    velocity, and velocity is a vector. If you are moving around a circle, your direction is changing
                    basically every instant, if you think about it! Thus, the car DOES have acceleration, since the
                    <i>direction</i> of your velocity is changing, even though it may not be speeding up or slowing
                    down!
                    This is a very important concept that you must know! (It will come up again)
                </span>
                <span v-show="level > 0">
                    Acceleration is our final kinematic quantity, and it is the instantaneous rate of change of
                    velocity.
                    Likewise, average acceleration is equal to the change in velocity over time ($a=\frac{\Delta
                    v}{\Delta
                    t}$). <span v-show="level == 2">Obviously, we realize that acceleration is the time derivative of
                        velocity from this, but also the second-order time derivative of displacement. A derivation is
                        shown at the bottom of the next page.</span> the equation, we can see the units acceleration is
                    equal to
                    $\frac{\frac{\textrm{m}}{\textrm{s}}}{\textrm{s}}$, or simply
                    $\frac{\textrm{m}}{\textrm{s}^2}$<br><br>
                    For nearly all scenarios in our study of physics, we will consider the case of constant
                    acceleration.
                    Why is this? Constant acceleration is the simplest case of Newtonian mechanics that we can learn.
                    There
                    are other ways to express nonconstant acceleration, but that requires calculus. <span
                        v-show="level == 2">Since we know calculus, you might be excited to work on nonconstant
                        acceleration. However, sadly, this will come at a much later lesson.
                        <br><br>
                        Now let's derive why the
                        acceleration is constant: We know that acceleration is the time derivative of velocity, and so
                        this is what we can do: $$a=\frac{dv}{dt}$$ $$a~dt=dv$$ $$\int_{t_0}^{t_f}a
                        \,dt=\int_{v_0}^{v_f}\,dv$$ Since $a$ is a constant, we can factor it out, and completely
                        integrating both sides yields: $$v_f-v_0=a(t_f-t_0)~\textrm{or}~v_f=v_0+at$$</span>
                    Another important thing is that the kinematics equations (that we will learn about shortly) only
                    hold true for
                    cases that deal with constant acceleration, so we must use that.
                    <br><br>
                    Since we know acceleration is
                    the slope of the velocity
                    graph, we have $\Delta v=at$ or $v_f = v_i + at$.<br><br>Now, you might think that from the previous
                    equation,
                    $x=\bar{v}t$, that
                    $x=at^2$. This is NOT true. One important thing to realize here is that $\bar{v}$ is <i>average</i>
                    acceleration, and the previous equation, $\Delta v=at$, finds <i>change in</i> velocity. To find the
                    true
                    equation, we can use one of two methods: algebra/graphical analysis, or calculus.<br><br>First,
                    let's
                    take a look at how algebra and graph analysis can lead us to the right equation. Notice that we can
                    calculate our <i>average</i> velocity using this equation (If you ever see $v_i$ and $v_0$, just
                    remember they both refer to <i>initial</i> velocity.): $$\bar{v} = \frac{v_f+v_0}{2}$$ Do you see
                    how
                    this works? Taking the average of our initial and final velocities gives us, well, average velocity!
                    <br><br>
                    But hold on! What is $v_f$? If you remember from just a few paragraphs ago, $v_f$ is equal to $v_i +
                    at$! So
                    when we plug this in, we get: 
                    <br><br>
                    $$\bar{v} = \frac{v_0 + at + v_0}{2} = \frac{2v_0 + at}{2} = v_0 +
                    \frac{1}{2}at$$ So, now we have an equation that we can plug into $x=\bar{v}t$! Plugging this in
                    will
                    give us:
                    <br><br>
                     $$x = (v_0 + \frac{1}{2}at) \cdot t = v_0 t + \frac{1}{2}at^2$$ So this is the equation
                    that
                    involves acceleration! We'll show examples of more equations later on, but this is
                    part of five equations that you MUST memorize.
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
        <div v-show="page === 3">
            <p>
                <span v-show="level == 0">
                    That's pretty much all there is to position, velocity, and acceleration. Like with the vectors
                    chapter,
                    we're going to introduce something pretty cool that is a little beyond the scope of the lesson and
                    this
                    math level, just to give you something to chew on. Warning! This section has fancy notation and
                    symbols
                    and requires algebra skills! So if you don't want that, go ahead and skip to the next lesson!
                    However, I
                    do recommend you try your best and read it and follow along. If it's not for you, great! Keep moving
                    forward. If you're interested, stic around!<br><br>Now
                    you're probably thinking, is there a way to
                    relate acceleration and displacement? Given the equations that we have, you'll see that we have
                    $\bar{v}
                    \cdot \Delta t = \Delta x$, and $a \cdot \Delta t = \Delta v$. However, we can't directly plug
                    this equation into our first one! Notice that we need $\bar{v}$, and not $\Delta v$! Let's try and
                    solve
                    this task at hand.
                    <br><br>
                     First, we need to derive an equation for average velocity, $\bar{v}$. For those
                    that
                    don't know, taking the average of some amount of quantities is to add all the quantities together,
                    and
                    divide by the number of quantities there are. There are a few ways to calculate average velocity,
                    but
                    how about we check out this one: $$\bar{v} = \frac{v_f+v_i}{2}$$ The average of your final velocity
                    and
                    your initial velocity must be, well, your average velocity! So now we have this equation, right?
                    <br><br>
                    Taking
                    an equation from the acceleration chapter, we know what $v_f$ is equal to! $v_f = v_i + a \cdot
                    \Delta t$! So if we plug this into that equation for $v_f$, we get: $$\bar{v} = \frac{v_i + v_i +
                    a \cdot \Delta t}{2} = \frac{2 \cdot v_i + a \cdot \Delta t}{2} = \frac{\cancel{2} \cdot
                    v_i}{\cancel{2}} + \frac{a \cdot \Delta t}{2} = v_i + \frac 1 2 a \cdot \Delta t$$ Wow, now
                    you can see that average velocity is equal to this! Now we can plug this into $\Delta x = \bar{v}
                    \cdot
                    \Delta t$! 
                    <br><br>
                    Substituting this heap of variables and numbers for $\bar{v}$ gives us: 
                    <br><br>
                    $$\Delta x = (v_i
                    +
                    \frac 1 2 a \cdot \Delta t) \cdot \Delta t = v_i \cdot \Delta t + \frac 1 2 a \cdot (\Delta t)^2$$<br>
                    Wow,
                    the final equation involving displacement and acceleration! Isn't that amazing?
                    Like with the previous equation, though, this is only valid under a constant acceleration. Another
                    way
                    you could have done this is by rearranging the original equation to get $v_i=v_f-at$, and this would
                    have yielded something like this:<br><br> $$\Delta x=v_f \cdot \Delta t-\frac 1 2 \cdot a \cdot (\Delta
                    t)^2$$<br>
                    Now if you haven't learned algebra yet, this could be difficult to grasp. However, I promise, for
                    the
                    next few chapters, we will focus a little less on the equations. 
                    <br><br>
                    This was just a fun experiment to
                    see
                    how we can come up with an equation for displacement and acceleration. If you genuinely are having a
                    hard time comprehending and understanding, we recommend you go to Khan Acadmey's Algebra course
                    (link <a href="https://www.khanacademy.org/math/algebra-basics/alg-basics-algebraic-expressions"
                        target="_blank">here</a>) and reviewing that lesson we just linked. After doing that, maybe come
                    back and review this lesson again!<br><br>
                    OK! Are you ready to learn more about kinematics? Then let's
                    go to
                    it!
                </span>
                <span v-show="level > 0">
                    Now let's take a look at the same thing but via
                    graphical analysis. <span v-show="level==1">We know that acceleration is the slope of the velocity versus time (v-t) graph.
                        <br><br>
                    The
                    area under the curve is displacement, since it is computed by multiplying velocity and time interval
                    (the axes) which gives the units of displacement (what is $\frac{\textrm{m}}{\textrm{s}} \cdot
                    \textrm{s}$). Don't worry! If you don't know what area under the curve is,
                        it is exactly what it sounds
                        like. You calculate the area under the line of the graph for a certain interval. The reason why
                        this
                        gives us displacement is because we just mentioned, if you look at the units for the x-axis, and
                        the
                        y-axis, if you multiply the units, you will get the units of displacement (believe it or not,
                        you are
                        learning fundamental calculus right now!).</span>
                        <br><br>
                    For the case with initial velocity $v_0$ and
                    constant
                    acceleration
                    $a$, we have a graph that looks like this:
                    <br><br>
                    <figure>
                        <img src="/src/assets/kinematics/Figure 8.png" width="500px" />
                        <figcaption>Figure 1: Graphical derivation of the position equation involving acceleration
                        </figcaption>
                    </figure>
                    <br>
                    For any $v_f$, the area is: <br><br>
                    $$x=\frac{v_0+v_f}{2} \cdot t$$<br>
                     Using the formula for the area of a
                    trapezoid (I will assume you know the trapezoid formula, if not, you can search it up). You can
                    visualize this trapezoid by drawing a vertical line from the tip of the arrow to the x-axis, which
                    you
                    will see via the dotted line is $v_f$. You can see that the two "bases" are $v_0$ and $v_f$, while
                    the
                    "height" is the change in time (because the x-axis is time, and the y-axis is velocity).
                    <br><br>
                    (Again, note that the use of $\Delta t$ is often replaced with just $t$ for convenience.)
                    <br><br>
                    You can see that this implies that $\bar{v}=\frac{v_0+v_f}{2}$<br><br>
                    But... <br>$$v_f = v_0 + at$$<br>
                    So...
                    <br>
                    $$x=\frac{2v_0+at}{2}t=v_0t+\frac{1}{2}at^2$$
                    <br>
                    Which is what we exactly just derived!! It is highly recommended (maybe almost required) that you
                    memorize these equations, because you will likely be using them a lot for the next two
                    lessons. <br><br>
                    <span v-show="level == 2">This is much easier to derive from a calculus perspective: 
                        <br><br>$$v = v_0 +
                        at$$<br>
                        $$\frac{dx}{dt} = v_0 + at$$ $$dx = (v_0 + at)dt$$ $$\int_{x_0}^{x_f}dx =
                        \int_{0}^{t}(v_0+at)dt$$
                        $$x_f-x_0 = \Delta x = v_0 t + \frac{1}{2}at^2$$</span>
                        <br><br>Another interesting thing you can do is remember when we taught you dimensional
                    analysis?
                    You can go back to the equations we mentioned and double confirm with us, are the equations also
                    <i>dimensionally</i> accurate? Just something for you to investigate upon.<br><br>
                    From this, we can graph an $x$-$t$ graph for constant acceleration scenarios. A desmos example is
                    shown
                    below (you can play around with the sliders):
                    <iframe src="https://www.desmos.com/calculator/g1suzxzrsv" width="1000" height="500" style="margin:auto;display:block;"
                        frameborder=0></iframe><br>
                    That's pretty much all there is to position, velocity, and acceleration. Usually, when we say $x$,
                    we do
                    mean displacement, but occasionally, if you see $x$ denoted with subscripts $f$ or $i$ or $0$, it
                    will
                    refer to instantaneous position. 
                    <br><br>
                    However, as we mentioned at the start of the lesson, it is vastly
                    more
                    useful and advantageous (in various different ways) to find the <i>change</i> in position, because
                    we
                    can utilize it and draw connections with it to other quantities, like velocity and acceleration. If
                    there is one key takeaway from this lesson, it would be how the three values are related. Remember:
                    velocity is the (instantaneous) rate of change of displacement, and acceleration is the
                    (instantaneous)
                    rate of change of velocity.<br><br>Are you ready to learn how to use what you just learned to do some
                    cool
                    calculations? Let's go to it!
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
    </div>

</template>


<style scoped></style>