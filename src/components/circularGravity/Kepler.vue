<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Kepler's Laws</h1><br>
        <p>
            <div v-show="page===0">
                Johannes Kepler was a German astronomer who actually lived before Newton formulated his Law of Universal
                Gravitation, figuring out his three laws of planetary motion from astronomical data. There's a bit of interesting
                history behind Kepler's story, but since this page isn't a science history site I won't be covering it. The general
                gist of how Kepler came to his discovery was that he noticed that a circle didn't exactly fit the astronomical
                figures, while an elliptical shape fit it much better. This leads us to Kepler's First Law:
                <br><br>
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    <strong>Kepler's First Law:</strong> <i> Planetary orbits are elliptical in shape, not circular.</i>
                </div>
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 46.png" width = "500px">
                    <figcaption> Figure 1: (Exaggerated for effect) An elliptical orbit around a star. But while it looks right, it's actually not.</figcaption>
                </figure>
                <br><br>
                This was revolutionary at the time, as people thought circles were the perfect shape and the cosmos
                must be perfect. However, most planetary orbits are very close to circular, which is why most of the time
                they are approximated as circles for simplicity. But now it's commonly accepted fact, so we won't be disputing this law today. Instead,
                we should think about how it affects our conceptions of planetary motion.
                <br><br>
                <span v-show="level>0">
                Obviously, since the orbit is no longer a circle, the orbital radius is no longer constant. This means
                that the speed at any given point in the orbit will no longer remain constant, instead changing. In the diagram,
                it looks like the sun is at the center of the ellipse. This, however, is not correct; in fact, it should be located at one of the
                foci of the ellipse. (I put it at the center more for aesthetic feel and to prove that what most people immediately
                think isn't true.) Here's an updated and correct diagram:
                </span>
                <span v-show="level==0">
                The orbit is no longer a circle, so the radius is no longer constant. Intuitively, if this distance is
                changing the oribiting speed is also changing. Additionally, the star shouldn't actually be at the center of the
                ellipse, but rather slightly off to one side. If you've learned about ellipses, this is called the focus of the ellipse, but
                if you haven't, just know that it's slightly off to one side. It would be good to read up on ellipses though, since 
                most references to these orbits use that terminology.
                </span>
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 47.png" width = "500px">
                    <figcaption> Figure 2: The updated diagram of elliptical orbits.</figcaption>
                </figure>
                
                <br><br>
                There are some terms associated with the elliptical orbit. The <b>perihelion</b> is the point where the planet is closest
                to the star, while the <b>aphelion</b> is the point where it is furthest. Sometimes, the terms <b>perigee</b> and <b>apogee</b>
                are used instead. They have the same meaning.
                <span v-show="level>0">
                    <br><br>
                    I (Eric) want to talk about a new quantity that describes ellipses, the eccentricity. The eccentricity of an ellipse is the 
                    ratio of its focal length $c$ to its semimajor axis length $a$. In mathematical terms, this means:
                    <br><br>
                    $e = \dfrac{c}{a}$
                    <br><br>
                    A circle, which has a focal length of zero, therefore has zero eccentricity. An ellipse will always have an eccentricity
                    less than one but greater than zero, with a higher eccentricity indicating a more flattened shape. When eccentricity is equal to
                    exactly one, we have a parabola. When it exceeds one, we have a hyperbola. The latter two are also valid paths for celestial
                    objects under the influence of gravity, though they are both open paths that end with the object going off to infinity.
                    <br><br>
                    This concept is more of a math concept, but I think it links together the possible orbits quite nicely. By connecting
                    the four conic sections with a single quantity $e$, it is shown how all the possible planetary orbits are indeed connected. I
                    wanted to go on and talk about the polar form for conic sections which can be tweaked to include all four, but that is
                    bordering too far into the scary realm of pure math.
                </span>
                <br><br>
                While it is possible to use this law for calculations, it's not easy to do so without an understanding of energy. We will come
                back to gravitation after we learn about energy and use it to derive many more interesting results. However, for now we're stuck with a
                conceptual understanding of this topic.
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    <strong>Kepler's Second Law:</strong> <i> The imaginary line connecting the planet and the star sweeps out equal areas in equal times as the planet orbits.</i>
                </div>
                <br><br>
                This law is a bit unorthodox, to say the least. It's certainly a bit verbose and can be hard to understand without 
                a v
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