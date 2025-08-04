<script setup>
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>

<template>
    <div class="container h100 p-5">
        <h1>Why Us?</h1><br>
        <p>
            First, let's talk some logistics. Why choose us when learning physics?<br><br>While many physics resources online offer surface-level explanations, are no longer maintained as well,
            and/or are not as easy to navigate, we provide comprehensive, in-depth content that better shines light on the
            underlying principles of physics.<br><br>In addition to that, many of the physics learning resources out there expect you to know certain math up to a certain level or similar prerequisites, but we don't, because we believe that physics is for everyone. In fact, the following couple of lessons are dedicated to help those with a weaker math skillset to understand the more complex mathematics that is required of physics, which shows our dedication to make physics <i>truly</i> accessible for anyone, regardless of their background! Our conceptual difficulty truly does try to avoid the complex math as much as possible (although some is still required to show important relationships between physics quantities), while still giving you a full taste of physics through concepts.<br><br>Our platform features three distinct difficulty levels—conceptual,
            algebra-based, and calculus-based—ensuring that learners, regardless of background, can engage with material
            appropriate to their mathematical skill level. Furthermore, additional features that set us apart include
            our extensive collection of interactive demonstrations and simulations that bring abstract concepts to life,
            compensating for the limitations of online learning by providing hands-on virtual experiences that are fun
            and engaging (hopefully!). <br><br>Unlike static resources that remain unchanged for years, we are committed to
            continuous expansion and improvement, regularly adding new content and refining existing explanations. We
            don't plan to stop development on this project any time soon. Our dedication to this website and its future
            ensures that the current content you access today doesn't stay the same for long &mdash; it is ever-changing and evolving so we can 
            bring you better, more comprehensive resources!
        </p><br><br>

        <h1>Getting Started</h1><br>
        <p>If you just opened up this website or you're simply stuck on where to start, we recommend starting from the
            first lesson, unless you have something specific that you are looking for. Then you can use our handy search
            bar to find the exact lesson you want. A key feature of this website is that this is built to cover three
            different levels of physics, which makes it suitable for all different kinds of people learning
            physics.<br><br>
            <span><strong>Conceptual:</strong> Simple as possible, avoiding using complex mathematical
                calculations/representations when possible. Prior experience using basic algebra is recommended, but not
                required. If you're brave, you could jump right in, though it could be a little tougher to
                understand if you lack that background. If you need help, don't worry! Our next lesson, Basic Algebra, will teach you the basics of algebra that you will need to know to understand the rest of the content on this website without a problem.</span><br>
            <br>
            <span><strong>Algebra-Based:</strong> Takes it up a notch by using algebra-level skills, which introduces a
                lot of new things like equations and graphs. Knowledge of Algebra 1 and Geometry is required, although
                we very strongly recommend studying Algebra 2 (either previously taken or concurrently learning) as it
                will make learning orders of magnitude easier.</span><br>
            <br>
            <span><strong>Calculus-Based:</strong> The (nearly) purest form of physics, which expands on algebra-based
                physics
                with calculus concepts. Concurrent learning or previously taken AP® Calculus AB (or of similar material)
                is required for sufficient understanding.</span><br><br>

            We also have interactive examples and not just wordy explanations, which overall can greatly improve
            your learning experience. We've also sprinkled in a bit of light humor when I (Hanyu) deemed it necessary.
            Enjoy! <br><br>Note: Sometimes when you switch the difficulty, the content on a page may not change.
            This is because some content may overlap (i.e. the content is the same regardless of what math
            level).
        </p><br><br>
        <div class="btn-contain-right">
            <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                Page! &rarr;</button>
        </div>
    </div>
</template>

<style scoped></style>