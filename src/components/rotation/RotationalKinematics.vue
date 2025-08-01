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
        <h1>Rotational Kinematics</h1><br>
        <p>
        <div v-show="page === 0">
            This unit might feel familiar, and that's because it will be! We are essentially taking in all the concepts
            we've covered previously
            and turning them into their <b>angular</b> (rotational) analogues. We've mostly dealt with linear motion
            before, but this unit is
            dedicated to things that rotate.
            <br><br>
            First, there's one important term that needs to be defined. The idea of a <b>rigid body</b> is one that
            rotates evenly. While a rigid body that
            rotates is moving with a different speed at each point on the object, the shape of the object needs to be
            preserved for it to be a rigid body.
            This rotation unit only deals with rigid bodies, and the results we'll find don't really apply to non-rigid
            bodies.
            <br><br>
            With that said, we can jump into rotational kinematics. This is just like regular kinematics, but for
            rotating objects. At the beginning
            of this course, we talked about position, velocity, and acceleration. Now, we have angular counterparts to
            those, being angular position $\theta$,
            angular velocity $\omega$ (lowercase omega), and angular acceleration $\alpha$ (lowercase alpha). A lot of
            quantities in this unit will use
            Greek letters.
            <br><br>
            <figure>
                <img src="/src/assets/rotation/Figure 77.png" />
                <figcaption>Figure 1: A representation of angular position and angular velocity.</figcaption>
            </figure>
            <br>
            Angular position is basically the angle we're used to, but it doesn't reset after a full revolution! You
            just keep counting. Angular
            velocity describes how fast something is spinning, and angular acceleration describes how angular velocity
            changes. They are
            all vector quantities. <span v-show="level > 0">
                You might be wondering how directions for these are defined for a circle, which is curved. Well, my
                answer is clockwise versus counterclockwise for now, but there are
                actually concrete, linear directions for all of these quantities. But more on that later.
            </span>
            <span v-show="level == 0">At this level, it's good enough to know that the directions of the quantities are
                either clockwise or counterclockwise.</span>
            In any case, we usually treat any counterclockwise rotation as "positive" and counterclockwise as
            "negative".
            <br><br>
            The definitions of these rotational kinematics quantities are virtually identical to those of regular
            kinematics. I'll put them here for you to see:
            <br><br>
            $$ \omega = \dfrac{\Delta \theta}{t} $$
            $$ \alpha = \dfrac{\Delta \omega}{t} $$
            <br>
            <span v-show="level == 2">
                Of course, we can't forget about the calculus definitions here! They're just as you would probably
                expect.
                <br><br>
                $$ \omega =\dfrac{d\theta}{dt} $$
                $$ \alpha = \dfrac{d\omega}{dt} = \dfrac{d^2\theta}{dt^2}$$
                <br>
            </span>
            Quick side note here. Now that we've defined the basic angular quantities, we can actually mathematically
            define how a rigid body works.
            A rigid body must have the same angular velocity for all points on the body. This makes sense if you think
            about it, as every point on the object
            has to rotate the same way in order for it to maintain its shape. Keep this fact in mind. Now, back to our
            regularly scheduled lesson.
            <br><br>
            Do you see how similar this is to regular kinematics? It'll be no surprise, then, that the essential
            equations behind rotational kinematics
            are analogous in form to the kinematics equations we've learned previously! Here they are in their
            not-so-new forms for angular quantities:
            <br><br>
            $$\underline{\textrm{\#1:}~~\omega_f=\omega_0+\alpha t}$$
            $$\underline{\textrm{\#2:}~~\theta=\omega_0t+\frac12 \alpha t^2}$$
            $$\underline{\textrm{\#3:}~~{\omega_f}^2-{\omega_0}^2 = 2\alpha \theta} $$
            <span v-show="level > 0">
                $$\underline{\textrm{\#4:}~~ \theta = \dfrac{\omega_0+\omega_f}{2} \cdot t} $$
                $$\underline{\textrm{\#5:}~~\theta=\omega_f t-\frac12 \alpha t^2}$$
            </span>
            <br>
            These equations are all you need! As long as you recognize what's being asked of you, this is really just
            kinematics all over
            again. I promise you, there are no tricks here. It's really as simple as that, but this unit is required
            just like kinematics so
            we can talk about more complex things later.
            <span v-show="level > 0">
                <br><br>
                With that, let's work through a few problems on the next page. Just apply these formulas, and you'll be
                fine!
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <span v-show="level > 0">
                I should mention something here. When dealing with angular quantities, the standard SI unit for angular
                position is the
                <b>radian</b>. Angular velocity and angular acceleration are just like velocity and acceleration, having
                the units of
                $\textrm{rad/s}$ and $\textrm{rad/s}^2$. We never use degrees, but sometimes we use revolutions.
                Keep in mind that one revolution is $2\pi$ radians.
                <br><br>
                <div class="problem">
                    How long does it take for a CD on a player that can provide a maximum angular acceleration of $1.5
                    ~\textrm{rad/s}$ to spin
                    14 full revolutions if it starts from rest?
                    <br><br>
                    This is a relatively simple problem, involving just one of the rotational kinematics equations. We
                    have angular acceleration and angular
                    displacement and need to find time, so it makes sense to use this equation:
                    <br><br>
                    $$\underline{\textrm{\#2:}~~\theta=\omega_0t+\frac12 \alpha t^2}$$
                    <br>
                    Since we start at rest, $\omega_0 = 0$. This lets us write:
                    <br><br>
                    $$ \theta = \dfrac12 \alpha t^2 $$
                    <br>
                    Now, we just need to isolate $t$ and plug in the appropriate values. Notice how we're given the
                    angular displacement
                    as a number of <b>revolutions</b>, not radians. Since one revolution is $2\pi$ radians, the angular
                    displacement is
                    just $28\pi$ radians.
                    <br><br>
                    $$ t = \sqrt{\dfrac{2\theta}{\alpha} }= \bbox[3px,
                    border: 0.5px solid
                    white] {10.8 ~\textrm{s} } $$
                </div>
                <br>
                Now, angular quantities are no good if they can't be connected to anything else. However, they actually
                can! There is a way
                to connect angular and linear quantities that revolves around the geometry of a circle and the
                definition of a radian. The simplest
                is arc length.
                <br><br>
                Recall that a radian is defined such that the arc length $s$ of a circle with radius $r$ described by an
                angle $\theta$ in radians is equal to:
                <br><br>
                $$ s = r \theta $$
                <br>
                If we follow this logic, we can also find the velocity of points on the circle at a certain radius from
                the center of rotation, as well
                as the tangential acceleration of those points. This only has meaning if those points actually exist/lie
                on the object, though.
                <br><br>
                $$ v = \omega r $$
                $$ a = \alpha r $$
                <br>
                These formulas <b>do not</b> apply both ways! You don't necessarily have angular velocity or
                acceleration if there is linear velocity or
                linear acceleration. They only apply for a rigid body that is undergoing rotation. Let's use this
                newfound knowledge.
                <br><br>
                <div class="problem">
                    Recall the CD player from earlier. If a point on the edge of the disk has a velocity of $v = 15
                    ~\textrm{m/s}$ by the end of the motion,
                    what is the radius of the CD disk?
                    <br><br>
                    First, we need to know the angular velocity at the end of the motion. This is easily found, as we
                    have our time
                    that we calculated earlier. It's a simple calculation using the $ \omega = \omega_0 + \alpha t $
                    relation.
                    <br><br>
                    $$ \omega = \alpha t = 16.2~\textrm{rad/s} $$
                    <br>
                    Now that we have the angular velocity, we can use the relationship between angular and linear
                    quantities to determine what the radius of the
                    CD must be. A point on the edge of the CD is at a distance equal to the radius of the CD from its
                    center.
                    <br><br>
                    $$ \omega r = v $$
                    $$ r = \omega/v = \bbox[3px,
                    border: 0.5px solid
                    white]{1.08~\textrm{m} }$$
                    <br>
                    That's a pretty large CD disk, and an even more impressive CD player that can accomodate it!
                </div>
            </span>
            <span v-show="level == 0">
                Now, what do we use for the unit of these quantities? If you aren't too familiar with later math
                courses, you might think to use
                degrees, but that typically does not work. We use <b>radians</b> for the unit of angular displacement or
                position, because it
                fits better into later formulas. The reason for this is mathematical.
                <br><br>
                See, the arc length of a circle with radius $R$ described by an angle $\theta$ can be written more
                simply if we define $\theta$ as
                in radians rather than degrees. I won't launch into a full math explanation here because this is
                supposed to focus on physics, but it has to
                do with how radians are defined. Essentially, if we use $s$ to represent arc length, then it can be
                written simply as:
                <br><br>
                $$ s = R \theta $$
                <br>
                This is why radians reigns supreme as the unit of choice. With that detour out of the way, we can
                express the units of angular velocity
                and angular acceleration just like we do velocity and accleration, except for the part where we replace
                meters with radians. Angular velocity has
                a unit of $\textrm{rad/s}$, and angular acceleration has a unit of $\textrm{rad/s}^2$. Nothing too
                crazy.
                <br><br>
                I want you to turn your attention back to one paragraph before, where we estabished that arc length is
                related to the angular position/displacement
                and the radius. Well, all other angular quantities can be similarly related to their linear counterparts
                in the same way.
                <br><br>
                $$ v = \omega R $$
                $$ a = \alpha R $$
                <br>
                $R$ represents the distance between the center of rotation and the point of interest. Of course, the
                point has to actually be on the
                thing that's rotating, otherwise our calculations are meaningless.
                <br><br>
                It is <b>very important</b> to note that these equations are not universally applicable! Only when there
                is rotation can these be used. You don't have
                angular velocity for an object going at some velocity in a straight line.
                <br><br>
                You might wonder how these equations can be useful. Well, recall that I said earlier how all points on a
                rigid body have the same angular velocity.
                With the angular velocity of the object determined, then, you can find the velocity of any point on the
                rigid body. The same applies
                for acceleration. Since things tend to break because of linear acceleration and not necessarily angular
                acceleration, this technique can be used to calculate
                how fast something can spin before vital components break. It's a bit of a stretch, but the math does
                work.
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
        <div v-show="page === 2">
            Circles. When have we talked about circles before? Hmm...
            <br><br>
            Yes, that's right! We dedicated (half) a unit to circular motion! It's only natural that circular motion has
            a tie-in to
            this concept, because rotation is also motion in a circle. We are going to re-express our previous knowledge
            of
            circular motion with angular quantities.
            <br><br>
            <span v-show="level > 0">
                Of course, we start with centripetal acceleration. We know the formula in terms of linear quantities is
                $a_c = v^2/r$, but
                what about in terms of angular ones? Well, since we have motion in a circle, which is a form of
                rotation, we can use
                the equations that relate angular and linear quantities. Specifically, we use the one for velocity.
                <br><br>
                $$ v = \omega r $$
                $$ a_c = (\omega r)^2/r $$
                <br>
                After the algebra clears, we're left with:
                <br><br>
                $$ a_c = \omega ^2 r $$
                <br>
                Our new expression of centripetal force can tell us many things. But wait! You might be asking yourself
                where tangential
                acceleration went. Ah, but we've talked about it before! Remember this equation?
                <br><br>
                $$ a = \alpha r $$
                <br>
                Well, that's actually tangential acceleration! (We should write $a_t = \alpha r$.) Think about it.
                Angular acceleration tends to
                speed up the spinning motion of the object, which increases the speed of any point on it. Centripetal
                acceleration is present
                regardless of whether there is angular acceleration. Let's look back at its new form.
                <br><br>
                We know that $\omega$ is constant for a rigid body in rotation, so the first part of the expression is
                constant. This tells us
                that the centripetal acceleration will get stronger with distance from the center of the object, since
                the expression is
                directly proportional to $r$. This is pretty intuitive to feel, though I can't think of a good example
                that represents this in
                the real world.
                <br><br>
                There is, however, a theoretical application of this. To show you, let's do a practice problem on it!
                <br><br>
                <div class="problem">
                    A space station can be modelled as a ring that spins about an axis perpendicular to its plane and
                    passing through its
                    center in order to generate artificial gravity. If the radius of the ring is $150 ~\textrm{m}$, what
                    is the required
                    angular velocity $\omega$ for the ring to generate an effective gravity equal to $g$?
                    <br><br>
                    <figure>
                        <img src="/src/assets/rotation/Figure 78.png" />
                        <figcaption>Figure 2: The One Ring.</figcaption>
                    </figure>
                    <br>
                    There actually exists an idea called the "ringworld" which comprises a very large spinning ring
                    spinning to generate
                    artificial gravity for inhabitants on the inside of such a ringworld. The basic principle of action
                    between this and our
                    space station is the same, and isn't very complex.
                    <br><br>
                    The key idea is that the spinning of the ring causes people inside to feel a centrifugal , which is
                    essentially a simulated
                    gravity. The bigger the ring, the slower the required angular velocity. We need the centrifugal
                    acceleration to be equal to $g$, which allows
                    us to set up the following equation:
                    <br><br>
                    $$ a_c = \omega ^2 r = g $$
                    <br>
                    Now, we simply solve for $\omega$.
                    $$ \omega = \sqrt{\dfrac{g}{r} } = \bbox[3px,
                    border: 0.5px solid
                    white] {0.256 ~\textrm{rad/s} } $$
                </div>
            </span>
            <span v-show="level == 0">
                What's the thing we talked about most in our circular motion unit? That's right, it was the idea of the
                centripetal
                acceleration! Now that we have angular quantities, we cn re-write it with those instead of linear
                quantities. Circular motion satisfies
                the genre of rotational motion since it's something rotating around a circle, so we can use the formula:
                <br><br>
                $$ v = \omega R$$
                <br>
                Recall our definition for centripetal acceleration ($a_c = \frac{v^2}{r}$). If we use the previous
                equation to substitute for
                $v$, we can arrive at a new form of the equation:
                <br><br>
                $$ a_c = \dfrac{(\omega R)^2}{R} = \omega^2 R $$
                <br>
                A simple mathematical derivation, one of the simplest you'll see. What now? Well, before we break down
                this formula, let's address
                the elephant in the room. What acceleration is $a = \alpha R$ then, if this is centripetal?
                <br><br>
                Well, that describes the tendency for an object to speed up or slow down while it goes in a circle.
                Recall that centripetal acceleration is
                unable to change the speed of an object, but rather only changes its direction! This is that counterpart
                to the centripetal acceleration, that can
                change the speed, and it's the tangential acceleration.
                <br><br>
                With that explanation out of the way, let's begin in earnest our exploration of the new formula. We know
                that $\omega$ is constant for a rigid
                body, which means that the centripetal acceleration increases linearly with the distance from the center
                of rotation. This doesn't have any obvious
                real-life applications, yet I would say this conclusion feels pretty intuitive. There is one
                futururistic application of this concept, however: the
                ringworld or ring-station.
                <br><br>
                <figure>
                    <img src="/src/assets/rotation/Figure 78.png" />
                    <figcaption>Figure 2: The One Ring.</figcaption>
                </figure>
                <br>
                The ringworld or spinning space station works by generating artificial gravity through the centrifugal
                force generated by rotation. People can then live under the
                simulated gravity within the ring just like they were on Earth. The fact that the centrifugal
                acceleration is directly proportional to $R$ has
                the consequence that larger ringworlds (bigger $R$) will not need to have as much angular velocity in
                order to produce a centrifugal acceleration equal
                to $g$. Who knew we would glimpse futuristic technology in a kinematics chapter?
            </span>
            <br><br>
            This concludes our first lesson on rotation. This was basically just kinematics turned into a rotational
            form, so nothing groundbreaking
            was introduced here. However, just like linear kinematics before it, rotational kinematics forms the
            foundation for later rotational concepts, which
            rely on it in order to make sense.
            <br><br>
            We moved on from kinematics to forces before, and we're doing the same here. If you're ready to learn about
            what force is in a rotational
            context, move on to the next lesson to learn about the rotational analogue of force: torque.
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