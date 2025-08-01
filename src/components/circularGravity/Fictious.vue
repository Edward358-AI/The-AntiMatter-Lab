<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([0]) // update as add more questions
const questions = reactive(
    [
        {
            number: 0,
            question: "What is the proper format for a vector in component form?",
            answers: [
                ["$\\{3, 5\\}$", 0],
                ["$\\langle 3, 5 \\rangle$", 1],
                ["$(3, 5)$", 0],
                ["$[3, 5]$", 0]
            ]
        }
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[form] = 1
    else results[form] = -1
}

// remove progress on lesson change
watch(() => props.lessonShowing, () => {
    for (let i = 0; i < results.length; i++) {
        results[i] = 0
        if (props.lessonShowing == true) document.querySelectorAll(".question")[i].reset()
    }

})
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Fictitious Forces</h1><br>
        <p>
        <div v-show="page === 0">
            Remember the centrifugal force from earlier? Well, I said that it doesn’t exist, but it does in a
            mathematical sense.
            For an observer at rest, it does not exist, but the observer actually going in a circle experiences it. If
            you've ever been
            on that one carnival ride that I don't know the name of, you know what I'm talking about.
            These are what are called fictitious forces and exist in non-inertial (accelerated) reference frames.
            <br><br>
            The overall idea behind these is that the $ma$ in $F_{net}=ma$ is treated as a force like any other.
            For instance, you feel a force pushing you into the seat when you accelerate in a car.
            This is not actually a force pushing back, but your inertia resisting the attempt to accelerate your body
            (Newton’s first law!). It is also oppositely directed to the actual acceleration of the object. This might
            be
            a bit confusing, but think of the times when you've felt a force pushing you back into the car seat when
            someone hits the
            gas pedal (even though the car is accelerating forward). Again, I want to emphasize that this force
            technically
            does not actually exist and is sometimes compared to an "invisible hand". However, when you consider your
            reference frame this force is very
            real (after all, you feel it!) and equal to $ma$.
            <br><br>
            Some people have reservations against working with such forces since they do not exist, but I feel this is
            restrictive. After all, fictitious forces can be very helpful in some scenarios, the simplest being elevator
            problems.
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 36.png">
                <figcaption>Figure 1: An extremely normal and fun elevator.</figcaption>
            </figure>
            <span v-show="level > 0">
                <br><br>
                <div class="problem">
                    Consider an elevator accelerating upward at $5.0~\textrm{m/s}^2$.
                    What is the apparent gravitational acceleration inside this elevator,
                    and how much would a scale read when a man of mass 50 kg stands on it
                    (Hint: Scales indicate normal force.).
                    <br><br>
                    The elevator accelerates <i>upward</i>, so any object inside it experiences a <i>downward</i>
                    fictitious
                    force of $ma$ where $a= 5.0 ~\textrm{m/s}^2$. Doing some simple analysis, we can
                    conclude that objects inside the elevator experience an effective gravitational acceleration of
                    $g+a = 14.8 ~\textrm{m/s}^2$. The man’s effective weight, then, is:
                    <br>
                    $F_n=mg+ma=740 ~\textrm{N}$
                </div>
                <br><br>
                This method can also be applied to FBDs. In our previous scenario, we had two downward forces, being the
                gravitational and ficticious forces. Thus, the normal force (which is directed upward) must be equal to
                these two combined. (Which is sort of what we did with the calculation.)
                <br><br>
                <div class="problem">
                    Now what if the elevator was accelerating downward? <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 37.png">
                        <figcaption>Figure 2: Electric boogaloo. It's not called being lazy, it's called being smart
                            with your time.<br>
                            (I'm being lazy.)</figcaption>
                    </figure>
                    <br><br>
                    Well, then the fictitious force is simply
                    oppositely directed and we have effective gravitational acceleration $g-a = 4.8 m/s^2$.
                    This translates to a weight of:
                    <br>
                    $F_n=mg-ma=240 ~\textrm{N}$
                </div>
                <br><br>
                This explains why you feel a force pushing down when the elevator begins to move upward and
                a force upward as it slows down when you reach your floor. Note that these results are independent
                of the velocity of the elevator and only depend on the direction of acceleration.
                This means that you feel the same fictitious force when moving up and slowing down as
                when moving down and speeding up. (That's a bit verbose, but try to think about what I'm saying.)
                Next time you’re on an elevator, pay attention to this and you will find that this is true
                (if you don’t know this already from riding elevators). You can even use a scale to prove it to
                yourself.
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
                We know that there are only two (real) forces acting on the system, being the gravitational and normal
                forces.
                Gravity points downwards and the normal force upward, We are going to consider the case where the
                elevator
                accelerates upwards, so we can write the expression:
                <br>
                $F_n - mg = F_net = ma$
                <br><br>
                At this point, we can just use simple algebra to get back to this expression:<br>
                $F_n=mg+ma=740 ~\textrm{N}$
                <br>
                Similar logic can be used for the downwards elevator case.
                <br><br>
            </span>
            <span v-show="level == 0">
                <div class="problem">
                    I'll pose a little problem. Now, consider this elevator that is accelerating upwards. Can you think
                    of what the scale will read (not
                    as an exact value, but as just a general idea or comparison to what it would "normally" read. I'm
                    being
                    ambiguous on purpose so I don't give anything away.)
                    <br><br>
                    This is one of those cases where actually having been in an elevator helps a lot. If you've ever
                    been in
                    an elevator that is accelerating upwards, whether that be speeding up on the way up or slowing down
                    on the way down, you feel
                    yourself become heavier. Your mass isn't actually increasing since that's an intrinsic property and
                    doesn't change so easily. You're
                    actually feeling your weight, which is the percieved gravitational force, change. This is because
                    you experience a downwards
                    ficticious force that allies itself with gravity to make you heavier (if only for a little bit). The
                    scale will also read a
                    greater value because it needs to support that extra weight.

                    <br><br>
                    Now we should consider the obvious other case: elevator accelerating down.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 37.png">
                        <figcaption>Figure 2: Electric boogaloo. It's not called being lazy, it's called being smart
                            with your time.<br>
                            (I'm being lazy.)</figcaption>
                    </figure>
                    <br><br>
                    The inverse is true if you're accelerating down. The ficticious force is instead upwards and opposed
                    to gravity, so you feel lighter.
                    There is an interesting bit to be said here. In free fall, you're essentially weightless because in
                    your reference frame (where you fall with the
                    gravitational acceleration $g$ downwards), there is a ficticious force upwards that is equal to the
                    gravitational force exerted on you.
                </div>
                <br><br>
            </span>
            Now you know what fictitious forces are, but you’re probably wondering why this section is here. Well, now
            that I address it you either realize that I’m going to
            explain why this is helpful or (tsk tsk) you haven’t thought that it was out of place at all.
            <br><br>
            Fictitious forces just so happen to be quite helpful in centripetal force problems.
            We can work in the accelerated reference frame of the object moving in a circle, which gives rise to a
            fictitious centrifugal force
            (it’s back!) that we can use to simplify calculations. If we treat problems in this way, they become
            conceptually simpler force balance problems
            akin to those covered in the last unit. Recall our banked curve. We can add a centrifugal force to our
            force-vector diagram and treat it as a
            classic force-balance problem. This might seem simpler for some of you, but you might also find the method
            unnecessary in that case. Well, we are next
            going to talk about a case where using ficticious forces is very helpful.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            I'd like to start off with an xkcd comic because I find it mildly amusing and educational.
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/EVIL FILE DO NOT OPEN.png" style="max-width:300px">
                <figcaption>Figure 3: The consequences of centrifugal force. Made by xkcd.</figcaption>
            </figure>
            <br><br>
            Hopefully you understood that. Please review this lesson if you didn't. I am no longer asking.
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 38.png">
                <figcaption> Figure 4: A truck driving over a hill. No comments about the paint job allowed.
                </figcaption>
            </figure>
            <span v-show="level > 0">
                Now, back to our regularly scheduled program.
                <br><br>
                <div class="problem">
                    We have a car cresting a circular hill, which can be approximated as
                    a portion of a circle with radius $R$. What is the maximum velocity it can have at the top, and what
                    happens if it
                    exceeds that velocity?
                    <br><br>
                    Now, the first part of this question is a bit simpler to answer. You have a single possible velocity
                    for
                    a given acceleration. Now, it might be tricky to figure out what the centripetal force is at the
                    top, but
                    remember that hills are vertical. The normal force varies since the net force has to equal the
                    required centripetal
                    force for circular motion at a certain velocity, and it opposes gravity. At the critical point,
                    there is no more normal force and the entirety of the
                    gravitational force contributes to the centripetal force. Therefore, at the top, the maximum
                    possible centripetal
                    acceleration is $a_c = g$. Therefore, we can write:
                    <br><br>
                    $g = \dfrac{v^2}{R}$
                    <br><br>
                    This simplifies to:
                    <br><br>
                    $v = \sqrt{gR}$
                    <br><br>
                    Technically, this is a maximum value since the normal force can vary and allow for other velocities.
                    If you
                    prefer, it is more accurate to write:
                    <br><br>
                    $v \leq \sqrt{gR}$
                    <br><br>
                    Now, this part did not require any invocation of ficticious forces, but the second part of the
                    problem is easier
                    if you invoke them. Think about how the ficticious centrifugal force would be directed. In the
                    critical case, it is
                    directed upwards and exactly equal in magnitude to the gravitational force. Exceeding this "speed
                    limit" would make it
                    such that the centrifugal force is greater than the gravitational, and the car would lift off the
                    ground. This makes sense,
                    as if you travel over a bump in the road too fast you feel the car become airborne momentarily.
                </div>
                <br><br>
            </span>
            <span v-show="level == 0">
                Now, back to our regularly scheduled program.
                <br><br>
                <div class="problem">
                    We have a car cresting a circular hill, which can be approximated as
                    a portion of a circle with radius $R$. What forces are causing circular motion, and what happens if
                    it goes too fast? Consider
                    only the point where the car is at the top.
                    <br><br>
                    At the top of the hill, the radius of the hill is vertical, so we are only concerned with forces in
                    the vertical direction.
                    The only forces that can be in this direction are the gravitational and normal forces, and they are
                    oppositely directed. In
                    this scenario, $F_n < mg$ because the net force has to be downward to provide sufficient centripetal
                        force for circular motion to occur. This is yet another case where the normal force is not equal
                        to the weight of the object! For speeds low enough, the car will remain in contact with the
                        ground, but there is a critical point where the normal force is zero and the entirety of the
                        gravitational force is required to balance out the required centripetal force (or centrifugal
                        force). This gives us the equation (it's one of the only ones you'll see here, I promise!): <br>
                        <br>
                        $m\dfrac{v^2}{R} = mg$
                        <br><br>
                        Now, you can simplify this rather easily, but if you don't feel comfortable doing it, don't
                        worry!
                        You just need to know that the critical velocity where the normal force is zero is:
                        <br><br>
                        $v = \sqrt{gR}$
                        <br><br>
                        This is the maximum velocity at which circular motion is still possible. What happens if you go
                        faster than this? Well,
                        think of going over a speed bump really fast. Your car will go airborne momentarily. This
                        happens because the ficticious
                        centrifugal force upward is larger than gravity, which causes the car to lift off the ground
                        from your perspective. In reality,
                        you're really just experiencing inertia as your car fails to accelerate enough to go on its
                        previous path and goes into a free-fall state, albeit only for a few fractions of a second.
                </div>
                <br><br>
            </span>
            Next, we will go over a few difficult force-balance problems that are easier with the addition of ficticious
            forces. They
            will not be solely focused on centripetal forces, but I still believe they are good to know.
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
            <span v-show="level > 0">
                <div class="problem">
                    Consider the scenario depicted in the figure below. What must the force $F$ be to hold all the
                    blocks stationary
                    relative to each other? Assume there is no friction between all surfaces. The red circle is a
                    pulley, in case
                    it wasn't clear. (It probably wasn't, considering how it looks.)
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 39.png">
                        <figcaption> Figure 5: The cart. I tried out a new aesthetic style.</figcaption>
                    </figure>
                    <br><br>
                    This problem is not trivial. It takes significant thought to figure out why this would even be
                    possible
                    in the first place, since there is no friction. Most people see $m_3$ and conclude that it is
                    impossible
                    for it to stay in place without any frictional forces. However, with ficticious forces things begin
                    to
                    make sense.
                    <br><br>
                    The best approach to the problem is actually to start with the problematic block, $m_3$. It can
                    easily accelerate
                    horizontally from a normal force applied on it by the big cart $m_1$, but it msut remain still
                    vertically. We can actually
                    ignore this horizontal acceleration because the system moves as a whole, and it doesn't offer us any
                    particularly useful
                    information. Since the block must remain at rest vertically, the tension force $T$ must obey the
                    relation:
                    <br><br>
                    $T = m_3g$
                    <br><br>
                    Now, you might be really confused. For a normal Atwood's machine in this setup, the tension force is
                    not this! However, this
                    is the only way the third block can stay at rest. This leads us to the conclusion that this tension
                    force also acts on
                    the second block. Now is where we invoke the ficticious force. Since the cart accelerates to the
                    right due to a force
                    being exerted on it, we can assume it must have some acceleration $a$. This leads to a ficticious
                    force to the left of
                    magnitude $m_2a$ "applied" onto the second block, which must be balanced by the tension force. Thus,
                    we have:
                    <br><br>
                    $T = m_2a$
                    <br><br>
                    This allows us to write:
                    <br><br>
                    $m_2a = m_3g$
                    <br><br>
                    $a = \dfrac{m_3}{m_2}g$
                    <br><br>
                    Now, we consider the force $F$. Since we have said that the system moves as a whole without any
                    relative motion,
                    we can treat it as one body and only consider the external forces on it (which is just $F$ in this
                    scenario):
                    <br><br>
                    $F = (m_1+m_2+m_3)a$
                    <br><br>
                    Substituting in our value for $a$ gives us:
                    <br><br>
                    $F = (m_1+m_2+m_3)\dfrac{m_3}{m_2}g$
                    <br><br>
                    That was difficult, right? But it's also an interesting problem that raises some interesting
                    implications. Accelerated
                    reference frames can really mess with your usual intuitions, and postulates you held to be always
                    true might not be
                    true when working with one!
                    <br><br>
                    There is another interesting question I'd like to pose about this scenario. If all surfaces are
                    frictionless, then how
                    do the blocks affect the motion of the cart?
                    <br><br>
                    The pulley is the answer to our question. We know (or assume logically) that the pulley is attached
                    to the cart. The pulley
                    experiences tensional forces from either side as a consequence of Newton's third law, so the cart
                    experiences those forces as well.
                    This is how the blocks can affect the cart despite being unable to interact with it through
                    friction.
                </div>
                <br><br>
            </span>
            <span v-show="level == 0">
                <div class="problem">
                    We are going to consider a relatively complex arrangement of blocks, pulleys, and a cart. Everything
                    is frictionless
                    in this scenario. The red circle is a pulley.
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 39.png">
                        <figcaption> Figure 5: The cart. I tried out a new aesthetic style.</figcaption>
                    </figure>
                    <br><br>
                    We want to see if it's possible to push the cart such that none of the block slip or move relative
                    to each
                    other. In other words, we want the cart and blocks to remain in place as we push it. Now, normally
                    this
                    would seem impossible without friction, since $m_2$ cannot stop $m_3$ from sliding down because it
                    is placed
                    horizontally. However, the blocks are accelerating.
                    <br><br>
                    Since there is a net external force represented by $F$ on the system, it will tend to accelerate to
                    the right. This
                    means there will be a ficticious force to the left on each block. The only way block 3 can remain at
                    rest is if the
                    tension force is equal to its weight, so we can assume that. Next, we know that this tension force
                    is the only real
                    force acting in the horizontal direction on the second block. It is directed to the right, so we
                    know that it has to
                    balance the ficticious force on the second block. This enables us to do force balance and makes the
                    scenario physically possible.
                    <br><br>
                    The result we get from calculations is that there is only one possible acceleration where the system
                    can remain at rest
                    relative to itself, which means by Newton's second law there is only one possible force $F$ that
                    will enable this kind
                    of motion. An interesting result, to be sure.
                    <br><br>
                    We know that all three blocks accelerate together, so we can treat them as one object. But for them
                    to move together, they
                    have to interact with each other through some force. However, it is not obvious how block 2 would
                    interact with the cart. This
                    is a tricky question and requires very careful force analysis.
                    <br><br>
                    See, block 2 feels a tension force from the rope, which is constant throughout the rope. The pulley,
                    which is attached to the
                    cart, also feels this same tension force. This allows block 2 to "interact" with the cart and affect
                    its motion, which enables us
                    to explain how block 2 would even affect the cart.
                </div>
                <br><br>
            </span>
            I hope I've shown you how working in an accelerated reference frame can be useful. Next, we're going to
            pivot and begin to talk about gravity between celestial objects like the planets. This is quite different
            from the gravitational forces we've dealt with previously.
            <br><br>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson!
                    &rarr;</button>
            </div>
        </div>

        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Vectors Problems</h1><br>
        <form @submit.prevent="checkAnswer(q.number)" class="question row justify-content-center" v-for="q in questions">
            <div class="w-100">
                <label class="form-label fs-5">{{ q.number+1 + ". " + q.question }}</label><br>
            </div>
            <div class="col border-end border-secondary">
                <div class="ms-auto" style="width:fit-content">
                    <div class="form-check" style="width:fit-content;" v-for="a in q.answers">
                        <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'">
                        <label class="form-check-label">
                            {{ a[0] }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column">
                <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                    :value="results[q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                <div class="me-auto mb-auto" :style="results[q.number] === 0 ? 'display:none' : ''">{{ results[q.number] === 1 ?
                    "&#x2705; Correct!" : "&#x274c; Not quite! Try again."}}</div>
            </div>
        </form><br>

    </div>
</template>


<style scoped></style>