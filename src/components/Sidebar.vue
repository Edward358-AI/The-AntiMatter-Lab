<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useUserStore } from '../stores/user'
import { useLessonShowingStore } from '../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const lessonShowing = useLessonShowingStore()

const lessonShowingState = storeToRefs(lessonShowing).lessonShowing
const theme = storeToRefs(user).theme
const difficulty = storeToRefs(user).difficulty

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-bs-theme', newTheme)
}, { immediate: true }
)


const lessons = reactive({
  basics: [
    { name: "About Us", path: "/about" },
    { name: "Getting Started", path: "/getting-started" },
    { name: "Basic Algebra", path: "/algebra" },
    { name: "Metric Prefixes", path: "/metric-prefix" },
    { name: "Trigonometry", path: "/trig" },
    { name: "Index/Glossary", path: "/index" }
  ],
  kinematics: [
    { name: "Vectors", path: "/vectors" },
    { name: "Dimensional Analysis", path: "/dimensional-analysis" },
    { name: "Position, Velocity, Acceleration", path: "/position-velocity-acceleration" },
    { name: "One-Dimensional Motion/Free fall", path: "/one-dimensional-motion" },
    { name: "Two-Dimensional Motion/Projectile Motion", path: "/two-dimensional-motion" },
    { name: "Relative Velocity", path: "/relative-velocity" }
  ],
  dynamics: [
    { name: "Newton's Laws", path: "/newton-laws" },
    { name: "Forces", path: "/other-forces" },
    { name: "F=ma and Free-body Diagrams", path: "/fma-fbd" },
    { name: "Inclined Planes and Pulleys", path: "/inclined-planes" },
    { name: "Spring Forces", path: "/spring" }
  ],
  circularGravity: [
    { name: "Centripetal Force/Acceleration", path: "/centripetal" },
    { name: "Fictitious Forces", path: "/fictious-forces" },
    { name: "Newton's Law of Universal Gravitation", path: "/gravity-laws" },
    { name: "Kepler's Laws", path: "/kepler" }
  ],
  energy: [
    { name: "Dot Product", path: "/dot-product" },
    { name: 'Definition of "Work"', path: "/work" },
    { name: "Definition of Energy and Energy Conservation", path: "/energy" },
    { name: "Types of Equilibrium", path: "/equilibrium-types" },
    { name: "Definition of Power", path: "/power" },
    { name: "Universal Gravitational Potential Energy", path: "/gravitational-energy" }
  ],
  momentum: [
    { name: "Impulse/Momentum Theorem", path: "/impulse" },
    { name: "Conservation of Linear Momentum", path: "/linear-momentum-conservation" },
    { name: "Center of Mass", path: "/center-of-mass" },
    { name: "Collisions", path: "/collisions" },
    { name: "Explosions", path: "/explosions" }
  ],
  rotation: [
    { name: "Rotational Kinematics", path: "/rotational-kinematics" },
    { name: "Torque", path: "/torque" },
    { name: "Moment of Inertia", path: "/moment-of-inertia" },
    { name: "Rotational Dynamics", path: "/rotational-dynamics" },
    { name: "Rolling Without Slipping", path: "/rolling" },
    { name: "Rotational Kinetic Energy and Angular Momentum", path: "/angular-momentum-energy" }
  ],
  oscillations: [
    { name: "Simple Harmonic Motion", path: "/simple-harmonic-motion" },
    { name: "Spring-Block Oscillators", path: "/spring-oscillations" },
    { name: "Pendulums", path: "/pendulum" },
    { name: "Other Oscillators", path: "/other-oscillations" }
  ],
  fluids: [
    { name: "Properties of Fluids", path: "/fluidintro" },
    { name: "Pressure", path: "/pressure" },
    { name: "Fluid Flow", path: "/flow" },
    { name: "Bernoulli's Principle", path: "/bernoulli" },
    { name: "Air Resistance and Drag", path: "/air-resistance" }
  ]
})

const searchQuery = ref("")

// Filters lessons based on search query
const filteredLessons = computed(() => {
  if (searchQuery.value) {
    let filteredLessons = reactive({})
    for (let unit of Object.keys(lessons)) {
      filteredLessons[unit] = lessons[unit].filter(lesson => lesson.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
    return filteredLessons
  } else {
    return lessons
  }

})

function hideMobileBar() {
  if (window.innerWidth <= 768) {
    document.getElementById("closeMenu").click()
    searchQuery.value = ""
  }
}

function resetScroll() {
  window.scrollTo(0, 0)
}
</script>

<template>
  
  <!-- MOBILE NAVBAR -->
  <nav class="navbar" id="mobile-nav"
    style="z-index:1;animation:fadein 1s forwards;position:fixed;width:100%;left:0;background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <a href="#mobile-menu" role="button" style="margin-left:15px;" data-bs-toggle="offcanvas">
      <span class="navbar-toggler-icon"></span>
    </a>

    <span style="font-size:0.98rem;margin-right:auto;margin-left:20px;">The AntiMatter Lab</span>
    <img src="/favicon.png" width="25" height="25" class="d-inline-block me-3 rounded-1">

  </nav>

  <!-- START OF MOBILE SIDEBAR -->
  <div class="sidebar offcanvas offcanvas-start" id="mobile-menu">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 align-items-center" style="height: 50px">
      <RouterLink @click="resetScroll(); hideMobileBar()" class="sidebar-brand mx-auto" to="/">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
    </RouterLink>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="closeMenu"></button>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 justify-content-center p-0">
      <div @click="lessonShowingState = true; hideMobileBar(); resetScroll()"
        :class="lessonShowingState ? 'sidebarTab col border-end border-secondary border-opacity-25 p-2 bg-secondary-subtle' : 'sidebarTab col border-end border-secondary border-opacity-25 p-2'">
        Lessons</div>
      <div @click="lessonShowingState = false; hideMobileBar(); resetScroll()"
        :class="lessonShowingState ? 'sidebarTab col p-2' : 'sidebarTab col p-2 bg-secondary-subtle'">Problems</div>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25" style="height: 55px;">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Type here to find a lesson...">
    </div>
    <div class="offcanvas-body">
      <ul class="sidebar-nav">
        <li>
          <h6 class="sidebar-header"><b>Getting Started</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.basics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Kinematics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.kinematics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Circular Motion and Gravitation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Energy</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Momentum</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Rotation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.rotation">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Oscillations</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.oscillations">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Fluid Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.fluids">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-1 pt-1 border-top border-secondary border-opacity-25">
      <div class="row justify-content-center" style="margin-bottom:1px">
        <div class="col-6">
          <h6 class="sidebar-header">Adjust Math Level</h6>
          <select style="width: 140px;" class="mx-auto p-2 my-1 form-select" id="levelSelect" v-model="difficulty" @change="hideMobileBar()">
            <option value="0">Conceptual</option>
            <option value="1">Algebra-Based</option>
            <option value="2">Calculus-Based</option>
          </select>
        </div>
        <div class="col-4">
          <h6 class="sidebar-header">Theme</h6>
          <select style="width: 70px;" class="mx-auto p-2 my-1 form-select" id="themeSelect" v-model="theme" @change="hideMobileBar()">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span class="text-secondary-emphasis">© 2024 The AntiMatter Lab</span><br style="margin-bottom:2px">
      <RouterLink @click="resetScroll(); hideMobileBar()" to="/about" 
        class="link-offset-1 info-link">About Us</RouterLink>&emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="link-offset-1 info-link" @click="hideMobileBar()">Github</a>
    </div>
  </div>

  <!-- START OF NORMAL SIDEBAR -->
  <div class="sidebar offcanvas-start offcanvas-md" id="menu"
    style="animation: slideRight 0.3s forwards">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <RouterLink @click="resetScroll(); hideMobileBar()" class="sidebar-brand mx-auto" to="/">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
    </RouterLink>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 justify-content-center p-0">
      <div @click="lessonShowingState = true; resetScroll()"
        :class="lessonShowingState ? 'sidebarTab col border-end border-secondary border-opacity-25 p-2 bg-secondary-subtle' : 'sidebarTab col border-end border-secondary border-opacity-25 p-2'">
        Lessons</div>
      <div @click="lessonShowingState = false; resetScroll()"
        :class="lessonShowingState ? 'sidebarTab col p-2' : 'sidebarTab col p-2 bg-secondary-subtle'">Problems</div>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Type here to find a lesson...">
    </div>
    <div class="offcanvas-body">
      <ul class="sidebar-nav">
        <li>
          <h6 class="sidebar-header"><b>Getting Started</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.basics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Kinematics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.kinematics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Circular Motion and Gravitation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Energy</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Momentum</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Rotation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.rotation">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Oscillations</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.oscillations">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Fluid Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.fluids">
          <RouterLink @click="resetScroll(); hideMobileBar()" :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="$route.fullPath === lesson.path? 'text-decoration: underline' : ''"
            :to="lesson.path">{{
              lesson.name }}
          </RouterLink>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-3 pt-2 border-top border-secondary border-opacity-25">
      <div class="row justify-content-center mb-2">
        <div class="col-6">
          <h6 class="sidebar-header">Adjust Math Level</h6>
          <select style="width: 140px;" class="mx-auto p-2 my-2 form-select" id="levelSelect" v-model="difficulty">
            <option value="0">Conceptual</option>
            <option value="1">Algebra-Based</option>
            <option value="2">Calculus-Based</option>
          </select>
        </div>
        <div class="col-4">
          <h6 class="sidebar-header">Theme</h6>
          <select style="width: 70px;" class="mx-auto p-2 my-2 form-select" id="themeSelect" v-model="theme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span class="text-secondary-emphasis">© 2024 The AntiMatter Lab</span><br style="margin-bottom:10px">
      <RouterLink @click="resetScroll(); hideMobileBar()" to="/about" 
        class="link-offset-1 info-link">About Us</RouterLink>&emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="link-offset-1 info-link">Github</a>
    </div>
  </div>
  </template>

<style scoped>
#menu {
  left: -100%;
}

#mobile-nav {
  display: none;
}

#mobile-menu {
  max-width: 300px;
}

@media only screen and (min-width:768px) {
  #mobile-menu {
    display: none;
  }
}

@media only screen and (max-width:768px) {
  #mobile-nav {
    display: flex;
  }
}

.sidebarTab {
  cursor: pointer;
}

.info-link {
  opacity: 0.85;
}

.info-link:hover {
  opacity: 1;
}
</style>