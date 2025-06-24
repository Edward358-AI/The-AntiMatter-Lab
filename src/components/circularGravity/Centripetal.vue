<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Centripetal Force/Acceleration</h1><br>
        <p>
            <div v-show="page===0">
                You often hear of centrifugal force being the force that holds you against the walls of one of those amusement park spinning rides.
                 It is actually quite amusing since centrifugal force isn't a real force (but still exists calculationally) and the real deal behind 
                 circular motion is the centripetal force. Both those names are Latin in origin and mean center-fleeing and center-seeking respectively. 
                 Finally, some English that makes sense. Note that <strong><u>this is NOT a new force</u></strong>, but really a required force for circular motion to occur. 
                 Some have suggested calling this the centripetal force requirement, but I believe that’s a mouthful.
                 <br><br>
                 Centripetal acceleration is directed inward toward the center of the circle that the object traces out as it moves.
                  At every point in its motion, the object’s velocity is tangential to the circle, which is why when you suddenly let 
                  go of a ball swinging in a circle above your head, it flies off in a straight line.
                  Newton’s first law in action! You should try it yourself! (Note: I am not responsible for any damages you may cause 
                  while attempting this activity.) You might be tempted to think that swinging it vertically would be the same, 
                  but that case is much more complicated. Here’s a little diagram to sum up this block of text:
                  <br><br>
                  <figure>
                    <img src="/src/assets/dynamics/Figure 29.png" width = "500px">
                    <figcaption>Figure 1: A labelled diagram of the simplest kind of circular motion.</figcaption>
                  </figure>
                  <br><br>
                  $r$ is the radius and $v$ is the velocity of the ball, which is constant in uniform circular motion (hence the name).
                  <br><br>
                  <div v-show="level>0">
                    There’s a good and neat proof for the formula for centripetal acceleration.
                    <div v-show="level == 2">
                        Consider an infinitesimal time interval $dt$. In that interval, the ball displaces $ds=v dt$ along the circle. But, $ds =r d\theta$ due to how circles work. (We’re using s since arc length is not displacement.)
                        <br><br>
                        So we write down:
                        <br><br>
                        $r d\theta=v dt$ (1)
                        <br><br>
                        Acceleration is defined as:
                        <br><br>
                        $a=\dfrac{dv}{dt}$
                        <br><br>
                        By the same logic as before,
                        <br><br>
                        $dv=v d\theta$ (2)
                        <br><br>
                        $a=v\dfrac{d\theta}{dt}$ (3)
                        <br><br>
                        Substituting (1) and (2) into (3), we obtain:
                        <br><br>
                        $a=\dfrac{v^2}{r}$
                    </div>
                    <div v-show="level==1">
                        Consider a small time interval $\Delta t$. In that interval, the ball roughly displaces $\Delta x=v\Delta t$ along the circle. There is also a small change in the angle $\Delta \theta$, allowing us to write $\Delta x=rsin\Delta\theta \approx r\Delta\theta$ by the small angle approximation $sin\theta \approx \theta$.
                        <br><br>
                        We can write:
                        <br><br>
                        $r \Delta \theta=v \Delta$ (1)
                        <br><br>
                        Acceleration is defined as:
                        <br><br>
                        $a= \dfrac{\Delta v}{\Delta t}$
                        <br><br>
                        By the same logic as before,
                        <br><br>
                        $\Delta =v \Delta \theta$ (2)
                        <br><br>
                        $a=v\dfrac{\Delta\theta}{\Delta t}$ (3)
                        <br><br>
                        Substituting (1) and (2) into (3), we obtain:
                        <br><br>
                        $a=\dfrac{v^2}{r}$
                        <br><br>
                    </div>
                    Centripetal acceleration is more commonly denoted $a_c$ instead of just $a$.
                    <br><br>
                    By extension, we can write the centripetal force (really the centripetal force requirement) as:
                    <br><br>
                    $F_c=m a_c=m\dfrac{v^2}{r}$
                    <br><br>
                    Now, we should analyze this formula. We see that the centripetal acceleration required
                    is higher if the speed is greater, which makes sense. (Try spinning a ball around your head at a high speed versus
                    a slower speed to see this.) We also see that it inversely depends on the radius, meaning the required acceleration
                    is less if the circle travelled is larger. You can also easily prove this to yourself. 
                    <br><br>
                    <div class="problem">
                    With that, we are ready for some very basic problems. Here is a very simple example to get us started. What is the required centripetal acceleration to move a ball 
                    at $5 ~\textrm{m/s}$ in a circle of diameter $4~\textrm{m}$?
                    <br><br>
                    This is just direct substitution. 
                    <br><br>
                    Answer:
                    $a_c=\dfrac{v^2}{r}=\dfrac{25}{2}=12.5 \textrm{m/s}^2$
                    </div>
                    <br><br>
                    Now, we are ready for more complex scenarios.
                  </div>
                <div v-show="level==0">
                    The derivation for the centripetal acceleration is too complex for a conceptual level, but I will show its
                    results Headers. The centripetal acceleration required to keep an object moving at speed $v$ in a circle of radius
                    $r$ is:
                    <br><br>
                    $a_c = \dfrac{v^2}{r}$
                    <br><br>
                    Not too complex, eh? Now, we should analyze this formula. We see that the centripetal acceleration required
                    is higher if the speed is greater, which makes sense. (Try spinning a ball around your head at a high speed versus
                    a slower speed to see this.) We also see that it inversely depends on the radius, meaning the required acceleration
                    is less if the circle travelled is larger. You can also easily prove this to yourself. 
                    <br><br>
                    The centripetal force required directly builds off of this centripetal acceleration:
                    <br><br>
                    $F_c = m\dfrac{v^2}{r}$
                    <br><br>
                    Unfortunately, the majority of uniform circular motion is calculation-based and there is not too much conceptual content.
                    Therefore, this lesson may seem short in comparison to some others, but you can check out our higher levels if you're interested 
                    in the mathematics behind circular motion. We are now going to briefly discuss some more scenarios.
                </div>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
                <div v-show="level>0">
                    <div class="problem">
                    We're going to start immediately with a few problems/scenarios that I (Eric) believe are good to introduce key knowledge about this unit.
                    <br><br>
                    Consider a bicycle going around a circular track of radius $15 ~\textrm{m}$ at $12 ~\textrm{m/s}$. The bicycle and rider have a combined mass of $70 ~\textrm{kg}$. <br>
                    a) What is the centripetal force that must be acting on the system? <br>
                    b) What force supplies this centripetal force?
                <br><br>
                Part a) is a direct calculation and is quite simple to do.
                <br>
                $F_c= m\frac{v^2}{r}=672 ~\textrm{N}$
                <br><br>
                Part b) is more conceptual. Consider the forces acting on the bicycle. The normal force and gravitational acceleration are both directed vertically, so there can be no contribution from them. The only force that can act parallel to the surface is the force of friction! In fact, static friction is what propels a wheeled vehicle forward regardless of whether it is executing a turn or not. The friction is static since the bottom of the wheel is momentarily at rest with the ground and always tends to accelerate backwards with respect to the ground, so the force of static friction is forward! Friction back at it again, doing unexpected things.
                </div>
                <br><br>
                Now, we should consder the special case of a banked curve. This isn't an easy calculation, so instead of making 
                this a problem I'll walk you through it.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 30.png" width = "500px">
                    <figcaption>Figure 2: A banked curve. The cross-section is marked in dark blue.</figcaption>
                </figure>
                <br><br>
                This is essentially just a curved inclined plane, so we can really just treat it the same way. Do note, however, that the centripetal force is directed horizontally with respect to the ground and not directed down the incline. 
                In a case like this, it is possible for UCM to occur without any frictional forces, unlike with a flat circle. 
                This is why many road engineers bank their curves to make them safe to drive across at higher speeds. (Or so I've heard, I'm not a road engineer.)
                <br><br>
                Let’s assume that the curve is banked at an arbitrary angle $\theta$ less than 90 degrees and has a radius $r$,
                measured from the center of the circle that the object traces out as it moves. 
                What is the range of speeds such that a car can safely execute the turn, assuming no frictional forces up or down the incline?
                <br><br>
                The weight of the object cannot contribute to the centripetal acceleration since it is always perpendicular to the radius of the imaginary horizontal circle the object traces out as it moves along its path. The only other force in this case, then, is $F_n$. In this scenario, it is easier to work with the horizontal and vertical axes rather than the axes along the plane since the only acceleration is in the horizontal direction.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 31.png" width = "500px">
                    <figcaption>Figure 3: A banked curve, turned into a force-vector diagram. Make sure this doesn't happen to your children.</figcaption>
                </figure>
                <br><br>
                You should recall that the angle between $mg$ and the axis perpendicular to the plane (which $F_n$ lies on) is $\theta$. By the vertical angles theorem, the angle between $F_n$ and the vertical axis is also $\theta$. See, geometry isn’t completely useless.
                <br><br>
                Since the car does not accelerate in the vertical direction, we can write $F_n \cos\theta = mg$, which is NOT the same as the result $F_n=mg\cos\theta$ 
                for an object sliding down an inclined plane (despite how physically similar the two scenarios look)! 
                Following from this, we have $F_n=mg/\cos\theta$. 
                <br><br>
                The component of $F_n$ that can contribute to the centripetal acceleration is the horizontal component, 
                or $F_nsin\theta$. Using this and the previously derived result, we can write:
                <br><br>
                $ma_c=mg\dfrac{\sin\theta}{\cos\theta}=mg \tan\theta$
                <br>
                $a_c= g\tan\theta$
                <br><br>
                And, since $a_c=v^2/r$,
                <br>
                $v=\sqrt{gr\tan\theta}$
                <br><br>
                This is a very constraining condition, only allowing for a single possible speed for a given curve. It
                is more realistic to consider friction, which would allow for a range of speeds. The frictional effects are all static if we consider a car (unless the car's tires
                are slipping, which would not be ideal), but to simplify I will define the coefficient of static and kinetic friction to be $/mu$. 
                Now, find the range of values for $v$ where the car does not move up or down the incline.
                <br><br>
                The range of values comes from the fact that friction is directed either up or down the incline, depending on $v$. Don't worry too much
                about this detail for now.
                We can simply first assume the case of friction up the incline and solve it.
                <br><br>
                The expression: <br>
                $F_s=\mu F_n$<br>
                still holds, as always. By doing force analysis, we write down a set of two 
                equations using the horizontal and vertical axes:
                <br><br>
                $F_s sin\theta +F_n \cos \theta = mg$
                <br><br>
                $m\dfrac{v^2}{r}=F_n \sin\theta - F_s \cos\theta$
                <br><br>
                We can reduce these equations to:
                <br><br>
                $F_n(\mu \sin\theta + \cos \theta) = mg$
                <br><br>
                $m\dfrac{v^2}{r}=F_n (\sin\theta - \mu \cos\theta)$
                <br><br>
                Eliminating $F_n$ gives:
                <br>
                $\dfrac {v^2}{gr}= \dfrac {\sin\theta - \mu \cos\theta}{\mu \sin\theta + \cos \theta}$
                <br><br>
                Since we assumed the friction is up the incline, this is the lower bound. The way to know this 
                is to realize that friction is attempting to keep the car from slipping down the incline if it's directed upwards,
                and this only occurs if the car is going slow. This is because less centripetal force is required if the vehicle
                is moving slower, and thus the friction force must be opposed to the component of the normal force that is providing
                the centripetal force. Therefore, we can write the first condition:
                <br>
                $v<\sqrt{gr\dfrac{\tan \theta - \mu}{\mu \tan\theta + 1}}$
                <br><br>
                This is the lower bound, and we can find the upper bound by repeating the calculation 
                with friction in the other direction. However, if you’re lazy like me, you can just reverse 
                the signs within the dimensionless term (the term with $\mu$ in it), which works because of how vectors work. 
                (If you don’t understand, I either recommend reviewing vectors or just brute forcing it to prove it to yourself.)
                What I mean is:
                <br><br>
                $\sqrt{gr\dfrac{\tan \theta - \mu}{\mu \tan\theta + 1}}< v < \sqrt{gr\dfrac{\tan \theta + \mu}{1 - \mu \tan\theta}}$
                <br><br>
                A quite complex result.
                <br><br>
                Now there is the case of non-uniform circular motion, most simply in the case of a vertical circle.
                </div>
                <div v-show="level==0">
                    Conceptually, there is one special type of circular motion scenario that is important to consider. If you've 
                    ever paid attention while driving or being driven, you'll notice that sometimes, a turn on the freeway will be tilted at an angle. This 
                    actually has a physical reason behind it, helping to keep the cars from sliding off the road and allowing them to navigate the 
                    turn at a higher speed. 
                    <br><br>
                    See, normally, it is the force of static friction that both propels cars forwards and provides the centripetal force during turns. There is an explanation 
                    for why this is. Consider a car driving in a horizontal circle. Neither the gravitational or normal force are in the right direction to provide the centripetal force.
                    The only force that can act parallel to a surface is the force of friction! There is also an explanation for how static friction propels a wheeled vehicle forward 
                    regardless of whether it is executing a turn or not. The friction is static since the bottom of the wheel is momentarily at rest with the ground (think about
                    how the wheel doesn't slip!) and that point always tends 
                    to accelerate backwards with respect to the ground, so the force of static friction is forward! Think about it more until you understsand this.
                    <br><br>
                    Now, we're going to show a diagram of the banked turn to drive home what it really is:
                    <br><br>
                    <figure>
                        <img src="/src/assets/dynamics/Figure 30.png" width = "500px">
                        <figcaption>Figure 2: A banked curve. The cross-section is marked in dark blue.</figcaption>
                    </figure>
                    This is essentially just a curved inclined plane, so we can really just treat it the same way. Do note, however, that the centripetal force is directed horizontally with respect to the ground and not directed down the plane. In a case like this, it is possible for UCM to occur without any frictional forces, unlike with a flat circle. 
                    <br><br>
                    Now, let's look at the forces involved. The weight of the object cannot contribute to the centripetal acceleration since it is always perpendicular to the 
                    radius of the imaginary horizontal circle the object traces out as it moves along its path. The only other force in this case, then, is $F_n$. In this scenario, it is easier to work with the horizontal and vertical axes rather than the axes along the plane since the only acceleration is in the horizontal direction.
                    <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 31.png" width = "500px">
                    <figcaption>Figure 3: A banked curve, turned into a force-vector diagram. Make sure this doesn't happen to your children.</figcaption>
                </figure>
                    Now, the calculations for the results of this scenario will not be carried out here, but you should be able
                    to see that in this case there is only a single speed that enables circular motion for a certain radius. First off, you
                    need to realize that the centripetal acceleration/centripetal force is constant because it is consisted of solely
                    by the normal force. Then, we can reason that
                    because the formula $a_c = v^2/r$ is an equation and not an inequality, there is only a single value of $v$ when we 
                    are given $a_c$ and $r$ that would work. However, if we add friction into the mix, we can have a range of values. Think
                    about why this is.
                    <br><br>
                    The range of values comes from the fact that friction is directed either up or down the incline, depending on $v$. The
                    way to solve problems where the direction of friction can be uncertain is to simply assume a direction first and find a result, 
                    then go back and assume friction in the other direction. Qualitatively, we know that friction be directed up the incline if the
                    speed is low, as a smaller centripetal force is needed in that case. The inverse is true as well; if speeds are high friction 
                    will be directed down the incline to provide additional centripetal force. If you've been in or driven a car (or just know how
                    a thing with wheels behaves on a slope), you might have some intuition for this.
                </div>
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


<style scoped>

</style>