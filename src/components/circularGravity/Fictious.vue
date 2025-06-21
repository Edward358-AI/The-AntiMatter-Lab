<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Fictitious Forces</h1><br>
        <p>
            <div v-show="page===0">
                Remember the centrifugal force from earlier? Well, I said that it doesn’t exist, but it does in a mathematical sense. 
                For an observer at rest, it does not exist, but the observer actually going in a circle experiences it. If you've ever been
                on that one carnival ride that I don't know the name of, you know what I'm talking about.
                These are what are called fictitious forces and exist in non-inertial (accelerated) reference frames.
                <br><br>
                The overall idea behind these is that the $ma$ in $F_{net}=ma$ is treated as a force like any other. 
                For instance, you feel a force pushing you into the seat when you accelerate in a car. 
                This is not actually a force pushing back, but your inertia resisting the attempt to accelerate your body 
                (Newton’s first law!). It is also oppositely directed to the actual acceleration of the object. This might be 
                a bit confusing, but think of the times when you've felt a force pushing you back into the car seat when someone hits the
                gas pedal (even though the car is accelerating forward). Again, I want to emphasize that this force technically
                does not actually exist and is sometimes compared to an "invisible hand". However, when you consider your reference frame this force is very
                real (after all, you feel it!) and equal to $ma$.
                <br><br>
                 Some people have reservations against working with such forces since they do not exist, but I feel this is 
                 restrictive. After all, fictitious forces can be very helpful in some scenarios, the simplest being elevator 
                 problems.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 36.png" width = "500px">
                    <figcaption>Figure 1: An extremely normal and fun elevator.</figcaption>
                </figure>
                <div v-show="level>0">
                    <br><br>
                    Consider an elevator accelerating upward at $5.0~\textrm{m/s}^2$. 
                    What is the apparent gravitational acceleration inside this elevator, 
                    and how much would a scale read when a man of mass 50 kg stands on it 
                    (Hint: Scales indicate normal force.).
                    <br><br>
                    The elevator accelerates <i>upward</i>, so any object inside it experiences a <i>downward</i> fictitious 
                    force of $ma$ where $a= 5.0 ~\textrm{m/s}^2$. Doing some simple analysis, we can 
                    conclude that objects inside the elevator experience an effective gravitational acceleration of 
                    $g+a = 14.8 ~\textrm{m/s}^2$. The man’s effective weight, then, is:
                    <br>
                    $F_n=mg+ma=740 ~\textrm{N}$
                    <br><br>
                    This method can also be applied to FBDs. In our previous scenario, we had two downward forces, being the
                    gravitational and ficticious forces. Thus, the normal force (which is directed upward) must be equal to
                    these two combined. (Which is sort of what we did with the calculation.)
                    <br><br>
                    Now what if the elevator was accelerating downward? <br><br>
                    <figure>
                    <img src="/src/assets/dynamics/Figure 37.png" width = "500px">
                    <figcaption>Figure 2: Electric boogaloo. It's not called being lazy, it's called being smart with your time.<br>
                    (I'm being lazy.)</figcaption>
                    </figure>
                    <br><br>
                    Well, then the fictitious force is simply 
                    oppositely directed and we have effective gravitational acceleration $g-a = 4.8 m/s^2$. 
                    This translates to a weight of:
                    <br>
                    $F_n=mg-ma=240 ~\textrm{N}$
                    <br><br>
                    This explains why you feel a force pushing down when the elevator begins to move upward and 
                    a force upward as it slows down when you reach your floor. Note that these results are independent 
                    of the velocity of the elevator and only depend on the direction of acceleration. 
                    This means that you feel the same fictitious force when moving up and slowing down as 
                    when moving down and speeding up. (That's a bit verbose, but try to think about what I'm saying.) 
                    Next time you’re on an elevator, pay attention to this and you will find that this is true 
                    (if you don’t know this already from riding elevators). You can even use a scale to prove it to yourself.
                    Though you'll probably get weird looks if you try it on a public elevator while people are around.
                    <br><br>
                    Of course, the elevator problem can be solved without the use of fictitious forces, but the reasoning 
                    behind it is so suspiciously similar to that of the method of fictitious forces that I can’t really 
                    tell the difference between the two. I’ll still walk through the reasoning since it might help you.
                    <br><br>
                    Knowing that the elevator accelerates upwards at $a=5.0 ~\textrm{m/s}^2$
                    allows us work backwards by determining the net force with Newton’s second law:
                    <br>
                    $F_{net} = ma = 250 ~\textrm{N}$
                    <br><br>
                    We know that there are only two (real) forces acting on the system, being the gravitational and normal forces. 
                    Gravity points downwards and the normal force upward, We are going to consider the case where the elevator 
                    accelerates upwards, so we can write the expression:
                    <br>
                    $F_n - mg = F_net  = ma$
                    <br><br>
                    At this point, we can just use simple algebra to get back to this expression:<br>
                    $F_n=mg+ma=740 ~\textrm{N}$
                    <br>
                    Similar logic can be used for the downwards elevator case. 
                    <br><br>
                </div>
                <div v-show="level==0">
                    Now, consider this elevator that is accelerating upwards. Can you think of what the scale will read (not
                    as an exact value, but as just a general idea or comparison to what it would "normally" read. I'm being
                    ambiguous on purpose so I don't give anything away.)
                    <br><br>
                    This is one of those cases where actually having been in an elevator helps a lot. If you've ever been in
                    an elevator that is accelerating upwards, whether that be speeding up on the way up or slowing down on the way down, you feel
                    yourself become heavier. Your mass isn't actually increasing since that's an intrinsic property and doesn't change so easily. You're
                    actually feeling your weight, which is the percieved gravitational force, change. This is because you experience a downwards
                    ficticious force that allies itself with gravity to make you heavier (if only for a little bit). The scale will also read a
                    greater value because it needs to support that extra weight.
                    <br><br>
                    Now we should consider the obvious other case: elevator accelerating down.
                    <br><br>
                    <figure>
                    <img src="/src/assets/dynamics/Figure 37.png" width = "500px">
                    <figcaption>Figure 2: Electric boogaloo. It's not called being lazy, it's called being smart with your time.<br>
                    (I'm being lazy.)</figcaption>
                    </figure>
                    <br><br>
                    The inverse is true if you're accelerating down. The ficticious force is instead upwards and opposed to gravity, so you feel lighter.
                    There is an interesting bit to be said here. In free fall, you're essentially weightless because in your reference frame (where you fall with the
                    gravitational acceleration $g$ downwards), there is a ficticious force upwards that is equal to the gravitational force exerted on you.
                    <br><br>
                </div>
                    Now you know what fictitious forces are, but you’re probably wondering why this section is here. Well, now that I address it you either realize that I’m going to
                    explain why this is helpful or (tsk tsk) you haven’t thought that it was out of place at all.
                    <br><br>
                    Fictitious forces just so happen to be quite helpful in centripetal force problems. 
                    We can work in the accelerated reference frame of the object moving in a circle, which gives rise to a fictitious centrifugal force 
                    (it’s back!) that we can use to simplify calculations. If we treat problems in this way, they become conceptually simpler force balance problems
                    akin to those covered in the last unit. Recall our banked curve. We can add a centrifugal force to our force-vector diagram and treat it as a
                    classic force-balance problem. This might seem simpler for some of you, but you might also find the method unnecessary in that case. Well, we are next
                    going to talk about a case where using ficticious forces is very helpful.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                I'd like to start off with an xkcd comic because I find it mildly amusing and educational.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/EVIL FILE DO NOT OPEN.png" width = "300px">
                    <figcaption>Figure 3: The consequences of centrifugal force. Made by xkcd.</figcaption>
                </figure>
                <br><br>
                Hopefully you understood that. Please review this lesson if you didn't. I am no longer asking.
                <br><br>
                Now, back to our regularly scheduled program. We have a car cresting a circular hill, which can be approximated as
                a portion of a circle with radius $R$. What is the maximum velocity it can have at any point, and what happens if it
                exceeds that velocity? Assume it transits the hill with constant velocity for simplicity.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 38.png" width = "500px">
                    <figcaption> Figure 4: A truck driving over a hill. No comments about the paint job allowed.</figcaption>
                </figure>
                <div v-show="level>0">
                    Now, the first part of this question is simple to answer.
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
            
        </p>
    </div>

</template>


<style scoped>

</style>