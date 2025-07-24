<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Center of Mass</h1><br>
        <p>
        <div v-show="page === 0">
            The <b>center of mass</b> is defined as the first moment of mass of an object or a collection
            of point masses. I know that definition makes about as much sense as Gen Alpha brainrot terms do to anyone
            over the
            age of 30, so I'll break it down into much simpler terms.
            <br><br>
            <figure>
                <img src="/src/assets/momentum/centerOfGravity.jpg">
                <figcaption>
                    Figure 1: A Wikipedia image that illustrates the concept of center of mass (technically center of
                    gravity).
                </figcaption>
            </figure>
            <br>
            <span v-show="level > 0">
                I talked very briefly about the center of mass earlier to just mention an interesting
                result it had with conservation of momentum, so here I'll go into what it is in detail. We've seen
                the formula before, in this form:
                <br><br>
                $$ x_{cm} = \dfrac{m_1 x_1 + m_2 x_2 + m_3 x_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                This can be generalized to three more commonly seen forms:
                <br><br>
                $$ y_{cm} = \dfrac{m_1 y_1 + m_2 y_2 + m_3 y_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                $$ z_{cm} = \dfrac{m_1 z_1 + m_2 z_2 + m_3 z_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                $$ r_{cm} = \dfrac{m_1 r_1 + m_2 r_2 + m_3 r_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                This is a bit of an "informal" definition that shows the first few terms of a clear pattern. The formal
                definition of the center
                of mass technically requires a summation over all point masses in the system:
                <br><br>
                $$ r_{cm} = \dfrac{\sum m_i r_i }{\sum m_i} $$
                <br>
                This gives us a position vector describing where the center of mass in space. We can also split this up
                into its three components in the x, y, and z directions. This can be helpful, since we don't always need
                or want to deal with three-dimensional space.
                <br><br>
                $$ x_{cm} = \dfrac{\sum m_i x_i }{\sum m_i} $$
                $$ y_{cm} = \dfrac{\sum m_i y_i }{\sum m_i} $$
                $$ z_{cm} = \dfrac{\sum m_i z_i }{\sum m_i} $$
                <br>
                Now, what exactly is the center of mass? Well, the definition is the jargon I spewed earlier. However, a
                better way to think about it is where an object would balance if you placed it on, let's say, your
                finger.
                A uniform rod's center of mass is at its middle, and thus it balances if you place that point on
                your finger. Technically this describes center of gravity, but the only difference is that center of
                mass always exists while
                center of gravity only exists where there is a gravitational field.
                <br><br>
                I want to be clear that the center of mass is not actually a tangible point, but rather a mathematical
                construct and a convenient way of dealing
                with systems of bodies. In the case where we aren't concerned with the motion of individual parts within
                a system, we can
                look towards central measures of a system, which include quantities that describe the center of mass
                like $r_{cm}$ , $v_{cm}$,
                and $a_{cm}$. More on the last two later.
                <span v-show="level == 2">
                    <br><br>
                    Now, everything I've shown above is for point masses. What about a continuous mass distribution,
                    also known
                    as a solid object with volume? Well, for that we need an integral.
                    <br><br>
                    $$ r_{cm} = \dfrac{\int r ~dm} {m} $$
                    <br>
                    Essentially, you take the previous equation and turn it into an integral, splitting the
                    object into a very large number of infinitessmally small pieces.
                    This probably doesn't make the most sense right now, so I'll solidify your understanding later with
                    an example later on.
                </span>
            </span>
            <span v-show="level == 0">
                It's best to think of the center of mass not as a mathematical definition, but as a tangible point. The
                center of
                mass of any object is essentially the point where it would balance on your finger. Think about a stick,
                for instance. You
                place it sideways and move your finger around to balance it, and at one point it does actually balance.
                That's where
                the center of mass (technically center of gravity, but the two are basically the same) is located!
                <br><br>
                With that out of the way, we must now move on to mathematically defining center of mass. I'll make this
                quick and painless, don't worry.
                <br><br>
                $$ x_{cm} = \dfrac{m_1 x_1 + m_2 x_2 + m_3 x_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                This definition essentially takes the mass of each object in question, multiplies it by the position
                vector of that
                object, and adds them together. The sum of these is then divided by the total mass of all objects we're
                looking at.
                The formula might look intimidiating, but really it's not too bad.
                <br><br>
                The formula I gave above was only for the x-dimension, but this formula can be generalized to all three
                dimensions as well:
                <br><br>
                $$ y_{cm} = \dfrac{m_1 y_1 + m_2 y_2 + m_3 y_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                $$ z_{cm} = \dfrac{m_1 z_1 + m_2 z_2 + m_3 z_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                If you prefer, you can write it in terms of the generalized position $r$, which isn't limited to any one
                dimension:
                <br><br>
                $$ r_{cm} = \dfrac{m_1 r_1 + m_2 r_2 + m_3 r_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                That's all center of mass is: a mathematical quantity (the point doesn't actually exist) that is
                convenient to use at times.
            </span>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            Let's do some practice to cement our basic understanding of the center of mass before we move on
            to center of mass velocity and acceleration. These problems are relatively simple compared to what will come
            after
            we cover those topics, so don't be fooled!
            <br><br>
            <span v-show="level > 0">
                <div class="problem">
                    Find the center of mass of three point objects located at the following locations on a coordinate
                    grid and having the following masses:
                    <br>
                    Object A at (3, 0, 4) with mass 3 kg
                    <br>
                    Object B at (4, 1, -3) with mass 4 kg
                    <br>
                    Object C at (6, -2, 2) with mass 6 kg
                    <br><br>
                    This is a pretty simple problem that just involves using the formula we gave before. The easiest way
                    to solve a problem
                    like this is to treat the $x$, $y$, and $z$ dimensions separately, finding the position of the
                    center of mass as a
                    coordinate triple.
                    <br><br>
                    The process should be simple, so here's the calculations for each dimension. I've ommitted units for
                    ease of viewing.
                    <br><br>
                    $$ x_{cm} = \dfrac{3(3) + 4(4) + 6(6)} {3+4+6} = 4.69 $$
                    $$ y_{cm} = \dfrac{3(0) + 4(1) + 6(-2)} {3+4+6} = -0.615 $$
                    $$ z_{cm} = \dfrac{3(4) + 4(-3) + 6(2)} {3+4+6} = 0.923 $$
                    <br>
                    We can put all three of these together to write the center of mass first as a coordinate triple:
                    <br><br>
                    $$ \bbox[3px,
                    border: 0.5px solid
                    white]{(4.69, -0.615, 0.923)}$$
                    <br>
                    The other way we can express this is as a position vector.
                    <br><br>
                    $$ r_{cm} = \bbox[3px,
                    border: 0.5px solid
                    white]{\langle 4.69, -0.615, 0.923 \rangle} $$
                    <br>
                    Some people may have a preference for one or the other, but they're the same in my books. See? The
                    center of mass
                    is a pretty basic concept, at least when it comes to point objects. For solid objects it's a whole
                    different beasts,
                    but only calculus students will feel that pain...
                </div>
                <span v-show="level == 2">
                    <br>
                    Now for you calculus students, here's the pain. I have an extra special problem. We're going to find
                    the center of mass
                    of a solid semicircle!
                    <br><br>
                    <div class="problem">
                        Find the center of mass of a uniform semicircle (half-circle) of radius $R$. (This isn't easy!)
                        <br><br>
                        I'm assuming you know what a semicircle looks like, so I will spare you of a diagram here. The
                        key idea
                        is that the semicircle is a continuous mass distribution because it's a solid body, so we can't
                        use the
                        same method that we applied to point masses. Now, how do we do this?
                        <br><br>
                        The thing you should do is look for symmetry. I'll say the semicircle is placed with its
                        straight edge horizontal.
                        In the case of our semicircle, it has symmetry about the y-axis, so we know the center of mass
                        lies on the y-axis ($x_{cm}=0$).
                        This saves us from having to calculate two different coordinates for our center of mass, as well
                        as reducing it down
                        to a one-dimensional problem.
                        <br><br>
                        Next, we want to recall the formula:
                        <br><br>
                        $$ r_{cm} = \dfrac{\int r ~dm} {m} $$
                        <br>
                        Which is better written in a different form for our purposes:
                        <br><br>
                        $$y_{cm} = \dfrac{\int y ~dm} {m} $$
                        <br>
                        How do we integrate this? Well, if you haven't figured it out, here's a diagram. If you have,
                        check if
                        you selected your approach correctly.
                        <br><br>
                        <figure>
                            <img src="/src/assets/momentum/Figure 67.png">
                            <figcaption>
                                Figure 2: The method.
                            </figcaption>
                        </figure>
                        <br>
                        Essentially, we integrate upwards in thin strips of thickness $dy$. Now, we have to look back at
                        the equation
                        we need to use. We need to convert the integral into a form that makes sense. Specifically, what
                        is $dm$?
                        <br><br>
                        Have you figured it out? In our case, $dm$ is simply the mass of each of the thin strips we are
                        integrating along! This means
                        that, by using the fact that the density is uniform as given, we can write $dm$ in terms of our
                        other quantities:
                        <br><br>
                        $$ dm = \dfrac{M}{ \frac{\pi R^2}{2} } 2x ~dy = \dfrac{4M}{\pi R^2} x ~dy$$
                        <br><br>
                        Now, there are two ways to go from here.
                        The first way to solve this problem
                        is by integrating using the cartesian variables and using the fact that $x^2 + y^2 =R^2$ holds
                        because
                        we are dealing with a circle to reduce everything into terms of $y$. This method takes longer to
                        integrate, but is easier
                        to set up.
                        <br><br>
                        The method I prefer is to convert everything into polar coordinates because we're dealing with a
                        semicircular object.
                        This means that we'll define an angle $ \theta$ and integrate in terms of that. We can write:
                        <br><br>
                        $$ x = R \cos \theta $$
                        $$ y = R \sin \theta $$
                        $$ dy = R \cos \theta ~ d\theta$$
                        <br>
                        This enables us to write the integral as:
                        <br><br>
                        $$ y_{cm} = \dfrac{\int{y \dfrac{4M} {\pi R^2} x ~dy } }{M} =
                        \dfrac{\int{R \sin \theta \dfrac{4M} {\pi R^2} R \cos \theta (R \cos \theta ~d\theta) } }{M}
                        $$
                        <br>
                        We can simplify this a bit to arrive at:
                        <br><br>
                        $$ y_{cm} = \dfrac{4R}{\pi} \int_0^{\frac{\pi}{2} } \cos ^2 \theta \sin \theta ~d\theta =
                        \dfrac{4R}{\pi} (\dfrac13)$$
                        <br>
                        I've left out the calculus because this is a physics course. If you're stuck on the integral, I
                        can hint to you to use u-substitution.
                        There are also some good integral calculators online that can explain how to get to the answer.
                        In any case, we get the final answer:
                        <br><br>
                        $$ y_{cm} = \bbox[3px,
                        border: 0.5px solid
                        white]{\dfrac{4}{3\pi}R}$$
                    </div>
                </span>
            </span>
            <span v-show="level == 0">
                <div class="problem">
                    What is the center of mass of the system consisting of block A of mass 5.0 kg placed at $x_A= 4.0
                    ~\textrm{m}$ and
                    block B of mass 3.0 kg placed at $x_B = -2.0 ~\textrm{m}$ ?
                    <br><br>
                    First, we want to look at the scope of the problem. We only have two objects, block A and block B.
                    We will call their masses
                    $m_A$ and $m_B$, and we're given their positions as $x_A$ and $x_B$. Now that we have the notation
                    crystal clear, we
                    can move on.
                    <br><br>
                    The center of mass is sort of like a "weighted midpoint", so it must be located somewhere in between
                    the two objects. Keep this
                    in mind, as it can help you check your answer.
                    <br><br>
                    Now, we only have two objects and they're along one dimension, so this simplifies our calculations
                    significantly. We should
                    choose the proper formula, however. Since we're going along the x-axis, we choose the formula for
                    $x_{cm}$. (All four forms are really the same,
                    but you should make sure that when solving your variables are consistent with the ones given.) For
                    two objects, this is:
                    <br><br>
                    $$ x_{cm} = \dfrac{m_A x_A + m_B x_B}{m_A + m_ B} $$
                    <br>
                    Now, just a little arithmetic gives us the result:
                    <br><br>
                    $$ x_{cm} = \dfrac{5(4) + 3(-2)}{5+3} = \bbox[3px,
                    border: 0.5px solid
                    white] {1.75 ~\textrm{m} }$$
                    <br>
                    Notice that the negative position <b>stays negative</b> when we plug it in. Position can be
                    negative, remember!
                </div>
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
            There are two more quantities that have to do with center of mass: <b>center of mass velocity</b> and
            <b>center of mass
                acceleration.</b> They are extremely similar to plain old center of mass (which is really just center of
            mass position).
            <br><br>
            <span v-show="level > 0">
                Center of mass velocity and acceleration are defined very similarly to what we saw before. Both are
                vectors. First, we have
                the center of mass velocity, which can again be defined using a summation.
                <br><br>
                $$ v_{cm} = \dfrac{\Sigma m_i v_i }{\Sigma m_i} $$
                <br>
                Do you see anything interesting about this expression? The astute will notice that the numerator is an
                expression of
                the total momentum of the system! This indicates that <b>for a system where total linear momentum is
                    conserved</b> (i.e. no
                net external force)<b>, the
                    center of mass velocity of that system is constant!
                </b> I touched on this result earlier, but here I'm going into it in much more detail.
                <br><br>
                For the special case where there is no initial center of mass velocity, we can conclude that the center
                of mass remains in the
                same position if no net external force acts on it. We can also transform to a frame where the
                center-of-mass velocity
                is zero, which can be helpful in collisions.
                <br><br>
                Center of mass acceleration is extremely similar. Again, here it is as a summation. You should be able
                to translate both this
                and the formula given before into a more usable form quite easily.
                <br><br>
                $$ a_{cm} = \dfrac{\Sigma m_i a_i }{\Sigma m_i} $$
                <br>
                There's another result that is worth talking about here. When we deal with systems and don't care about
                the individual motion of the components, we can use these quantities to describe the system as a whole.
                The reverse
                also applies: We can analyze the external forces on a system and write a corresponding expression for
                center-of-mass
                quantities.
                <br><br>
                Enough explanation, the noteworth result is yet another form of Newton's Second Law, but generalized to
                a system.
                <br><br>
                $$ F_{net, ext} = M a_{cm} $$
                <br>
                This states that the net external force on a system is equivalent to its total mass $M$ multiplied by
                the acceleration of the
                center of mass. A corollary is that if there is no net external force on a system, the center-of-mass
                velocity remains constant.
                This is another proof/re-stating of what we've talked about earlier! Arriving at the same result
                multiple times confirms its validity and importance. In fact,
                this is the proof of why momentum is conserved when there is no net external force.
                <br><br>
                With that discussion done, here is one very clever problem that I especially like which pertains to what
                we just talked about.
                <br><br>
                <div class="problem">
                    Consider a man of mass $m = 65 ~\textrm{kg}$ standing on the bow (front) of a wooden rowboat of mass
                    $ M = 140 ~\textrm{kg} $ sitting
                    in still, frictionless water. The man walks from the bow to the stern (rear) of the boat in a
                    straight line, which
                    has a length $L = 2.0 ~\textrm{m}$. How far does the boat move?
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 68.png">
                        <figcaption>
                            Figure 3: He do be walking though.
                        </figcaption>
                    </figure>
                    <br>
                    The key is that there are <b>no net external forces</b> acting on the system consisting of the
                    person and
                    boat, which means the center of mass of the system stays in the same place relative to the water.
                    First,
                    we want to find the position of the center of mass relative to where the boat's center is initially.
                    <br><br>
                    $$ x_{cm} = \dfrac{M (0) + m(L/2)}{M+m} $$
                    <br>
                    We have set where the boat's center is initially as the origin, so that's how we got our position
                    values. Next,
                    we want to realize that the boat's center moves <b>twice</b> this distance after the person is on
                    the other side.
                    A diagram could help:
                    <br><br>
                    <figure>
                        <img src="/src/assets/momentum/Figure 69.png">
                        <figcaption>
                            Figure 4: The red dot marks the center of the boat, and the cyan dot marks the center of
                            mass position. Now can you see it?
                        </figcaption>
                    </figure>
                    <br>
                    The expression for center-of-mass position <b>is</b> the distance between the red dot and cyan dot
                    (center of mass). Once we know that the boat moves twice
                    this distance which we have an expression for, the problem becomes very simple to solve. It's
                    getting to this realization that is often a challenge. Most difficult center-of-mass problems will
                    require some clever reasoning trick.
                    <br><br>
                    $$ x = \dfrac{m}{M+m} L = \bbox[3px,
                    border: 0.5px solid
                    white]{0.634 ~\textrm{m} }$$
                </div>
            </span>
            <span v-show="level == 0">
                These two quantities are really very similar to the plain old center of mass (which is really the center
                of
                mass <b>position</b>). They are defined in virtually the same way:
                <br><br>
                $$ v_{cm} = \dfrac{m_1 v_1 + m_2 v_2 + m_3 v_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                $$ a_{cm} = \dfrac{m_1 a_1 + m_2 a_2 + m_3 a_3 + ...}{m_1 + m_2 + m_3 + ...} $$
                <br>
                You want to remember that both of these are vectors, and the velocities and accelerations that are in
                the
                formula are also all vector quantities. Now, something might look familiar. In the $v_{cm}$ equation,
                the
                numerator looks an awful lot like the expression of total momentum of a system of objects! And, in fact,
                that
                is exactly what it is!
                <br><br>
                This leads us to our result that the center of mass velocity is constant whenever momentum is conserved
                (whenever
                there is no net external force on a system). This isn't just a mathematical curiosity, it can be used
                to solve problems like collisions as well.
                <br><br>
                Another result that's worth mentioning here is another expression of Newton's Second Law. We can
                describe entire systems
                with center-of-mass values if we don't care about the motion of the individual objects, and this new
                form
                of the Second Law seeks to do just that. By only considering external forces, we come up with an
                expression for the center-of-mass acceleration:
                <br><br>
                $$ F_{net,ext} = M a_{cm} $$
                <br>
                The quantity $ M $ represents the total mass of the system, which is found by summing all of the
                individual
                masses. Now, we have a formula that indicates what happens to a system when it experiences a net
                external force!
                And, as a corollary, if $ F_{net,ext} = 0$, something else happens.
                <br><br>
                Remember how we said that momentum is conserved when there is no net external force? Well, this equation
                explains why!
                When $F_{net,ext} = 0$, we have zero acceleration of the center of mass, which means the center of mass
                velocity remains
                constant!
                <br><br>
                Since center of mass velocity contains total momentum in the numerator and total mass (which is going to
                be
                constant) in the denominator, this means by extension total momentum is conserved when there is no net
                external force.
                We've proved the theorem!
            </span>
            <br><br>
            Now, you should know all you need to know about the center of mass for now. There are a few other results,
            but they
            are mathematical conveniences and not essential to know. Well, now we can apply this and the idea of
            momentum conservation
            to our next lessons, where we'll be focusing on two specific types of momentum problems. The first is going
            to be collisions. If you're
            ready, let's just move on!
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

</template>


<style scoped></style>