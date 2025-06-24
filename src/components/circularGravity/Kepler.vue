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
                Obviously, since the orbit is no longer a circle, the orbital radius is no longer constant. This means
                that the speed at any given point in the orbit will no longer remain constant, instead changing. In the diagram,
                it looks like the sun is at the center of the ellipse. This, however, is not correct; in fact, it should be located at one of the
                foci of the ellipse. (I put it at the center more for aesthetic feel and to prove that what most people immediately
                think isn't true.) Here's an updated and correct diagram:
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 47.png" width = "500px">
                    <figcaption> Figure 2: The updated diagram of elliptical orbits.</figcaption>
                </figure>
                
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </p>
    </div>

</template>


<style scoped>

</style>