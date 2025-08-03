<script setup>
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>

<template>
    <div class="container h100 p-5">
        <h1>About</h1><br>
        <p>This project was created originally in the summer of 2024 designed to create an interactive and in depth
            learning experience for physics. The website design and programming was done by Edward Jiang, and the
            curriculum/teachings were carefully crafted by multiple-time USAPHO qualifier Eric Niu As of currently the
            project has reached its original goal of completing most if not all the major topics covered in AP Physics
            C: Mechanics (and bonus fluids section), and regular content updates/new functionalities will likely be
            pushed out in the near future.</p><br><br>

        <h1>Our Mission</h1><br>
        <p>While our website's simple mission might be just to educate people on physics, our actual vision witht this project is much bigger. In simple terms, our vision might be best explained as this: To give the world a better understanding of what physics, specifically
            mechanics, really is (it was also originally designed to get more people to join a local physics club).
            Physics is not an easy subject to grasp, yet it is fundamental to understanding the world around us. You can
            imagine it as the law that governs our universe and our surroundings. Why do you fall back down whenever you
            jump, how does your car start, and how can a rocket propel itself into space—these are all questions that
            can be ultimately answered using physics.</p><br>
            <h3>The STEM Education Challenge</h3><br>
            <p>
            On a more critical note, if you look at it demographically, the U.S. is currently lacking domestic STEM
            students. This statistic is not fabricated—it's proven fact (search it up yourself!). According to the 2023/2024 academic year data,
            roughly 56% of all international students enrolled in STEM-related fields. <sup><a class="link-underline-secondary" href="https://opendoorsdata.org/annual-release/international-students/" target="_blank">[1]</a></sup> The percentage becomes even more
            pronounced at the graduate level: in 2019 and 2020, international students received 49% of all STEM master's
            degrees and 57% of all STEM doctorate degrees. <sup><a class="link-underline-secondary" href="https://opendoorsdata.org/annual-release/international-students/" target="_blank">[2]</a></sup><br>
            While domestic students still hold the advantage in undergraduate majors, this represents only the first
            four years of higher education. The critical insight lies in recognizing that international students
            comprise just 5% of the total U.S. population, yet over half of them pursue STEM fields and earn nearly half
            or more of all graduate STEM degrees. These statistics reveal a significant gap in domestic STEM engagement that may pose problems in the country's future development in the next several years.</p><br>
            <h3>Why Physics? The Foundation of Scientific Understanding</h3><br>
            <p>
            This poses a crucial question: Why focus specifically on physics? The answer lies in physics' fundamental
            role as the cornerstone of all scientific disciplines. Physics provides the mathematical framework and
            conceptual foundation upon which all other sciences are built. Chemistry, for instance, cannot be fully
            understood without quantum mechanics and thermodynamics. Biology increasingly relies on biophysics to
            explain cellular processes and molecular interactions. Engineering disciplines—from mechanical to electrical
            to aerospace—are direct applications of physical principles. No matter what science it may be, it always has certain roots that can be traced back to physics.<br>
            Moreover, physics develops critical thinking skills that extend far beyond scientific applications. It
            teaches students to approach complex problems systematically, to think quantitatively about cause and
            effect, and to construct logical arguments based on evidence. These skills are invaluable in our modern society, which is becoming increasingly technologically driven and many career paths require core skills and aptitudes like these.</p><br>
            <h3>Our Vision for Impact</h3><br>
            <p>
            As you may have already predicted, one of our primary missions is to intrigue more students in STEM,
            particularly inspiring domestic students to pursue careers in these critical fields. By making physics
            accessible and engaging, we aim to address the domestic STEM talent shortage while simultaneously inspiring more people learn about science in our surrounding communities.<br>
            When students understand physics, they gain more than knowledge of formulas and equations—they develop a
            lens through which to view and interpret the natural world. This understanding is crucial for innovation, whether in developing sustainable energy solutions, advancing medical technologies, or exploring
            the frontiers of space, just to name a few examples. It may all sound a bit far-fetched now, but by building and promoting better physics education today, we are actually indirectly sowing the seeds for the next generation of problem-solvers and innovators who will shape tomorrow's world!
        </p><br><br>

        <h1>Technicalities</h1><br>
        <p>This project was built using HTML, CSS and JS.<br>The use of VueJS (<a class="link-underline-secondary"
                href="https://vuejs.org" target="_blank">https://vuejs.org</a>) was incorporated to allow dynamic
            rendering and much easier
            implementation of certain functionalities over regular JS.<br>A CSS framework, Halfmoon CSS (<a
                class="link-underline-secondary" href="https://www.gethalfmoon.com"
                target="_blank">https://www.gethalfmoon.com</a>), was also used to
            effortlessly create a (somewhat) nice looking layout and website.<br>MathJax (<a
                class="link-underline-secondary" href="https://mathjax.org" target="_blank">https://mathjax.org</a>) and
            Vue-MathJax-Next (<a class="link-underline-secondary" href="https://github.com/justforuse/vue-mathjax-next"
                target="_blank">https://github.com/justforuse/vue-mathjax-next</a>) were implemented for clean looking
            equations and math symbols.<br>Matter.js (<a class="link-underline-secondary"
                href="https://brm.io/matter-js/" target="_blank">https://brm.io/matter-js</a>) is a rigid body 2d
            physics engine that runs on the web and is used to create the interactive demos found in some of our
            lessons.<br>Vite (<a class="link-underline-secondary" href="https://vitejs.dev"
                target="_blank">https://vitejs.dev</a>) was used during the development phase for convenience and is
            included in the production build as well.</p><br><br>

        <h1>Contact</h1><br>
        <p>If you have any questions, about physics or not, you can contact Edward via discord (edward.jiang_) or email
            (<a class="link-underline-secondary" href="mailto:edward456jiang@gmail.com"
                target="_blank">edward456jiang@gmail.com</a>). If the question is
            physics related, you are most likely much better off asking Eric (discord: antimatter162, email: <a
                class="link-underline-secondary" href="mailto:antimatter5175@gmail.com"
                target="_blank">antimatter5175@gmail.com</a>).</p><br><br>

        <h1>License</h1><br>
        <p class="text-center pb-5">This project is licensed under the MIT License.</p>
        <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next Page!&rarr;</button>
            </div>
    </div>
</template>

<style scoped></style>