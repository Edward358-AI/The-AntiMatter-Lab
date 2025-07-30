<script setup>
defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Kepler's Laws</h1><br>
        <p>
        <div v-show="page === 0">
            Johannes Kepler was a German astronomer who actually lived before Newton formulated his Law of Universal
            Gravitation, figuring out his three laws of planetary motion from astronomical data. There's a bit of
            interesting
            history behind Kepler's story, but since this page isn't a science history site I won't be covering it. The
            general
            gist of how Kepler came to his discovery was that he noticed that a circle didn't exactly fit the
            astronomical
            figures, while an elliptical shape fit it much better. This leads us to Kepler's First Law:
            <br><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Kepler's First Law:</strong> <i> Planetary orbits are elliptical in shape, not circular.</i>
            </div>
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 46.png">
                <figcaption> Figure 1: (Exaggerated for effect) An elliptical orbit around a star. But while it looks
                    right, it's actually not.</figcaption>
            </figure>
            <br><br>
            This was revolutionary at the time, as people thought circles were the perfect shape and the cosmos
            must be perfect. However, most planetary orbits are very close to circular, which is why most of the time
            they are approximated as circles for simplicity. But now it's commonly accepted fact, so we won't be
            disputing this law today. Instead,
            we should think about how it affects our conceptions of planetary motion.
            <br><br>
            <span v-show="level > 0">
                Obviously, since the orbit is no longer a circle, the orbital radius is no longer constant. This means
                that the speed at any given point in the orbit will no longer remain constant, instead changing. In the
                diagram,
                it looks like the sun is at the center of the ellipse. This, however, is not correct; in fact, it should
                be located at one of the
                foci of the ellipse. (I put it at the center more for aesthetic feel and to prove that what most people
                immediately
                think isn't true.) Here's an updated and correct diagram:
            </span>
            <span v-show="level == 0">
                The orbit is no longer a circle, so the radius is no longer constant. Intuitively, if this distance is
                changing the oribiting speed is also changing. Additionally, the star shouldn't actually be at the
                center of the
                ellipse, but rather slightly off to one side. If you've learned about ellipses, this is called the focus
                of the ellipse, but
                if you haven't, just know that it's slightly off to one side. It would be good to read up on ellipses
                though, since
                most references to these orbits use that terminology.
            </span>
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 47.png">
                <figcaption> Figure 2: The updated diagram of elliptical orbits.</figcaption>
            </figure>

            <br><br>
            There are some terms associated with the elliptical orbit. The <b>perihelion</b> is the point where the
            planet is closest
            to the star, while the <b>aphelion</b> is the point where it is furthest. Sometimes, the terms
            <b>perigee</b> and <b>apogee</b>
            are used instead. They have the same meaning.
            <span v-show="level > 0">
                <br><br>
                I (Eric) want to talk about a new quantity that describes ellipses, the eccentricity. The eccentricity
                of an ellipse is the
                ratio of its focal length $c$ to its semimajor axis length $a$. In mathematical terms, this means:
                <br><br>
                $e = \dfrac{c}{a}$
                <br><br>
                A circle, which has a focal length of zero, therefore has zero eccentricity. An ellipse will always have
                an eccentricity
                less than one but greater than zero, with a higher eccentricity indicating a more flattened shape. When
                eccentricity is equal to
                exactly one, we have a parabola. When it exceeds one, we have a hyperbola. The latter two are also valid
                paths for celestial
                objects under the influence of gravity, though they are both open paths that end with the object going
                off to infinity.
                <br><br>
                This concept is more of a math concept, but I think it links together the possible orbits quite nicely.
                By connecting
                the four conic sections with a single quantity $e$, it is shown how all the possible planetary orbits
                are indeed connected. I
                wanted to go on and talk about the polar form for conic sections which can be tweaked to include all
                four, but that is
                bordering too far into the scary realm of pure math.
            </span>
            <br><br>
            While it is possible to use this law for calculations, it's not easy to do so without an understanding of
            energy. We will come
            back to gravitation after we learn about energy and use it to derive many more interesting results. However,
            for now we're stuck with a
            conceptual understanding of this topic.
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Kepler's Second Law:</strong> <i> The imaginary line connecting the planet and the star sweeps
                    out equal areas in equal times as the planet orbits.</i>
            </div>
            <br><br>
            This law is a bit unorthodox, to say the least. Imaginary line? Areas? It all seems so abstract, but I
            promsise
            it is anything but. It's certainly a bit verbose and can be hard to understand without
            a visual guide. Here is a basic visual to explain what I'm talking about:
            <br><br>
            <figure>
                <img src="/src/assets/dynamics/Figure 48.png">
                <figcaption> Figure 3: A visual guide for Kepler's Second Law.</figcaption>
            </figure>
            <br><br>
            In the visual, the red and blue areas are (approximately, I made this by hand don't judge me) equal. The
            time it takes
            the planet to travel through those distances is also equal. This is what the law means by "equal areas in
            equal times". What
            this also tells us is that the planet must be moving faster as it nears the star and slower when it is
            futher away, because the
            distance travelled in the red area is much greater than for the blue area. This also makes sense, as you
            would expect
            something to get faster as it "fell" closer towards a massive object.
            <span v-show="level == 2">
                <br><br>
                In calculus terms, this law can be expressed in terms of a derivative. The wording "equal areas in equal
                times" can be translated
                to mean that the rate of change of the area with respect to time is constant. In mathematical terms,
                this can be
                written as:
                <br><br>
                $\dfrac{dA}{dt} = \textrm{const.}$
                <br><br>
                When deriving this law later on, it is sufficient to prove this condition. However, the derivation of
                this
                law requires a number of concepts like energy and angular momentum which we have not covered, so it
                won't be
                coming anytime soon.
            </span>
            <br><br>
            This law is honestly not particularly useful, as applications of its findings are few and far between. The
            only
            real application of this law is to realize that the speed of orbit is fastest when at the perihelion and
            slowest at
            the aphelion, but this is rather intuitive and can be shown with other methods as well. The same cannot be
            said for
            Kepler's Third Law, which is actually a mathematical relation.
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
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Kepler's Third Law:</strong> <i> For any orbit, the cube of the semimajor axis of orbit is
                    directly proportional to the square of the orbital period.</i>
            </div>
            <br><br>
            This final law is heavily mathematical and can be used to great effect in finding orbital periods. When you
            know the length of the semimajor
            axis of orbit, it is easy to find the orbital period, either by direct computation or by using a method of
            ratios with another planet
            whose radius and orbital period are known. This law leaves little to be desired, really. It also reinforces
            the idea that there is
            only one possible orbital velocity (and therefore one orbital period) for each radius.
            <span v-show="level == 0">
                <br><br>
                While Kepler's Third Law does technically exist as a mathematical equation, at a conceptual level
                it is sufficient to know it as a proportionality. This makes the relation a lot less messy and much
                less daunting. In its most basic terms, Kepler's Third Law states:
                <br><br>
                $$T^2 \propto a^3$$
                <br><br>
                Here, $a$ is the length of the semimajor axis of orbit. In the cases where the orbit is circular, we can
                simply
                replace $a$ with the orbital radius $r$. The mass of the star is also a factor that isn't seen here, but
                that doesn't matter
                most of the time since we deal with the solar system or planets around the same star most of the time.
                However, it's stil
                important to remember. (I think it's not in the proportionality because we didn't know about other star
                systems at the time of Kepler.)
                <br><br>
                This simple proportionality actually does allow us to directly compute the exact orbital periods of
                planets by setting up a ratio. I will actually challenge you to do so with this practice problem.
                <br><br>
            </span>
            <span v-show="level > 0">
                <br><br>
                Kepler's Third Law can be written as a proportionality, but it also has an equation form. The
                proportionality
                form is as follows:
                <br><br>
                $T^2 \propto a^3$
                <br><br>
                However, the exact form takes into account the mass of the star around which the planet is orbiting.
                This makes
                sense, as the only two factors that orbital period depends on are the orbital radius and the mass of
                whatever's keeping
                the object in orbit. We'll actually do the relatively simple derivation for Kepler's Third Law for a
                circular orbit, but the
                generalized form that applies to elliptical orbits is much harder to derive.
                <br><br>
                From a previous section, we know that the orbital velocity of an object circling a star of mass $M_s$ at
                a radius of $R$ is equal
                to:
                <br><br>
                $v = \sqrt{G\dfrac{M_s}{R}}$
                <br><br>
                The orbital period is defined as the total distance travelled over the speed of travel, so we can write:
                <br><br>
                $ T = \dfrac{2\pi R}{v}$
                <br><br>
                Substituting in $v$ gives us:
                <br><br>
                $ T = \dfrac{2 \pi R^{3/2}} {\sqrt{GM_s}}$
                <br><br>
                This form is more useful for finding the actual orbital period, but admittedly it doesn't look exactly
                like the proportionality. To
                restore the resemblance, we can simply square both sides:
                <br><br>
                $T^2 = \dfrac{4 \pi^2}{GM_s} R^3$
                <br><br>
                And in the generalized form, $R$ is replaced with the semimajor axis length $a$:
                <br><br>
                $$T^2 = \dfrac{4 \pi^2}{GM_s} a^3$$
                <br><br>
                With the mathematical results established, let's try a simple practice problem.
                <br><br>
            </span>
            <div class="problem">
                Jupiter orbits at 5.20 AU (astronomical units, where the Earth's orbital radius around the sun is 1 AU)
                from
                the sun. What must its orbital period be?
                <br><br>
                Now, we know that the Earth has an orbital period of one year and an orbital radius of 1 AU. Knowing
                this
                enables us to simply use proportions rather than having to directly compute things. Kepler's Third Law
                can be set up as a proportionality in this case, leading us to the equation:
                <br><br>
                $\left(\dfrac{T_J}{T_E} \right)^2= \left(\dfrac{R_J}{R_E}\right)^3$
                <br><br>
                The subscripts $J$ and $E$ denote Jupiter and Earth, respectively. Now, we can simply plug in known
                values and
                solve for $T_J$ to arrive at the result:
                <br><br>
                $T_J = T_E \left(\dfrac{R_J}{R_E}\right)^{3/2} = 11.86 ~\textrm{yr}$
                <br><br>
                This matches the actual orbital period. See, you don't have to actually use the full equation to
                do problems invloving this law, as long as you're clever and recognize things about the problem. Note
                that
                the proportionality method wouldn't work if you had two planets orbiting two different stars, since the
                law is also
                dependent on the mass of the star.
            </div>
            <br><br>
            Kepler's Third Law might seem challenging at first, but it really isn't all too bad once you can understand
            it. After all,
            at its core it just says that planets that orbit further away will take longer to complete their orbits,
            while planets that orbit closer to a
            star will take less time to complete a full orbit. This is not exactly groundbreaking news to us, so if
            you're struggling with this
            law just remember that at its core, it's a statement of the obvious, albeit a mathematical one.
            <br><br>
            Next, we're going to completely pivot and talk about a new fundamental concept, that of energy. This will
            enable us to
            solve many problems with ease, as long as we're careful about setting them up.
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Unit!
                    &rarr;</button>
            </div>

        </div>
        </p>
    </div>

</template>


<style scoped></style>