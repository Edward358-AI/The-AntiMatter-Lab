<script setup>
import { ref, reactive, computed, watch, useTemplateRef, onMounted, nextTick } from 'vue'
import { useUserStore } from '~/stores/user'
import { useLessonShowingStore } from '~/stores/lessonShowing'
import { storeToRefs } from 'pinia'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const user = useUserStore()
const lessonShowing = useLessonShowingStore()

const lessonShowingState = storeToRefs(lessonShowing).lessonShowing
const theme = storeToRefs(user).theme
const difficulty = storeToRefs(user).difficulty


watch(theme, (newTheme) => {
  if (import.meta.client) {
    document.documentElement.setAttribute('data-bs-theme', newTheme)
  }
}, { immediate: true }
)

function changeScrollbarTheme() {
  if (import.meta.client) {
    const els = document.getElementsByClassName("os-scrollbar-vertical")
    for (let el of els) {
      el.classList.toggle("os-theme-light")
      el.classList.toggle("os-theme-dark")
    }
  }
}

const lessonVisibility = reactive({
  basics: true,
  kinematics: false,
  dynamics: false,
  circularGravity: false,
  energy: false,
  momentum: false,
  rotation: false,
  oscillations: false,
  fluids: false,
  electrostatics: false
})

const sectionVisibility = reactive({
  mechanics: true,
  EM: true,
  thermo: true
})

function triggerAnimation(lesson) {
  if (import.meta.client) {
    const els = document.getElementsByClassName(lesson)
    for (let el of els) {
      if (!el.style.display) el.style.display = lessonVisibility[lesson] ? 'block' : 'none'
      if (el.style.display !== 'none') {
        el.style.animation = 'dropup 0.3s ease-in-out forwards'
        setTimeout(() => {
          el.style.display = 'none'
        }, 290)
      } else {
        el.style.display = 'block'
        el.style.animation = 'dropdown 0.3s ease-in-out forwards'
      }
      el.style.transformOrigin = 'top center'

    }
  }
  lessonVisibility[lesson] = !lessonVisibility[lesson]
}

function expandBasics() {
  if (import.meta.client) {
    const els = document.getElementsByClassName("basics")
    for (let el of els) {
      if (!el.style.display) el.style.display = lessonVisibility['basics'] ? 'block' : 'none'
      if (el.style.display === 'none') {
        el.style.display = 'block'
        el.style.animation = 'dropdown 0.3s ease-in-out forwards'
        el.style.transformOrigin = 'top center'
      }

    }
  }
  lessonVisibility["basics"] = true
}

function triggerSectionAnimation(section) {
  if (import.meta.client) {
    const els = document.getElementsByClassName(section)
    for (let el of els) {
      if (!el.style.display) el.style.display = sectionVisibility[section] ? 'block' : 'none'
      if (!el.style.display) el.style.display = 'block'
      if (el.style.display !== 'none') {
        el.style.animation = 'dropup 0.3s ease-in-out forwards'
        setTimeout(() => {
          el.style.display = 'none'
        }, 290)
      } else {
        el.style.display = 'block'
        el.style.animation = 'dropdown 0.3s ease-in-out forwards'
      }
      el.style.transformOrigin = 'top center'

    }
  }
  sectionVisibility[section] = !sectionVisibility[section]
}

const lessons = reactive({
  basics: [
    { name: "About Us", path: "/basics/about" },
    { name: "Getting Started", path: "/basics/getting-started" },
    { name: "Basic Algebra", path: "/basics/algebra" },
    { name: "Metric Prefixes", path: "/basics/metric-prefix" },
    { name: "Trigonometry", path: "/basics/trig" },
    { name: "Index/Glossary", path: "/basics/references" }
  ],
  kinematics: [
    { name: "Vectors", path: "/kinematics/vectors" },
    { name: "Dimensional Analysis", path: "/kinematics/dimensional-analysis" },
    { name: "Position, Velocity, Acceleration", path: "/kinematics/position-velocity-acceleration" },
    { name: "One-Dimensional Motion/Free fall", path: "/kinematics/one-d-motion" },
    { name: "Two-Dimensional Motion/Projectile Motion", path: "/kinematics/two-d-motion" },
    { name: "Relative Velocity", path: "/kinematics/relative-velocity" }
  ],
  dynamics: [
    { name: "Newton's Laws", path: "/dynamics/newton-laws" },
    { name: "Forces", path: "/dynamics/other-forces" },
    { name: "F=ma and Free-body Diagrams", path: "/dynamics/fma-fbd" },
    { name: "Inclined Planes and Pulleys", path: "/dynamics/inclined-planes" },
    { name: "Spring Forces", path: "/dynamics/spring" }
  ],
  circularGravity: [
    { name: "Centripetal Force/Acceleration", path: "/circularGravity/centripetal" },
    { name: "Fictitious Forces", path: "/circularGravity/fictitious-forces" },
    { name: "Newton's Law of Universal Gravitation", path: "/circularGravity/gravity-laws" },
    { name: "Kepler's Laws", path: "/circularGravity/kepler" }
  ],
  energy: [
    { name: "Dot Product", path: "/energy/dot-product" },
    { name: 'Definition of "Work"', path: "/energy/work" },
    { name: "Definition of Energy and Energy Conservation", path: "/energy/energy" },
    { name: "Types of Equilibrium", path: "/energy/equilibriums" }, // Note: file is equilibriums.vue, not equilibrium-types
    { name: "Definition of Power", path: "/energy/power" },
    { name: "Universal Gravitational Potential Energy", path: "/energy/gravitational-energy" }
  ],
  momentum: [
    { name: "Impulse/Momentum Theorem", path: "/momentum/impulse" },
    { name: "Conservation of Linear Momentum", path: "/momentum/momentum-conservation" }, // Note: file is momentum-conservation.vue, not linear-momentum-conservation
    { name: "Center of Mass", path: "/momentum/center-of-mass" },
    { name: "Collisions", path: "/momentum/collisions" },
    { name: "Explosions", path: "/momentum/explosions" }
  ],
  rotation: [
    { name: "Rotational Kinematics", path: "/rotation/rotational-kinematics" },
    { name: "Torque", path: "/rotation/torque" },
    { name: "Moment of Inertia", path: "/rotation/moment-of-inertia" },
    { name: "Rotational Dynamics", path: "/rotation/rotational-dynamics" },
    { name: "Rolling Without Slipping", path: "/rotation/rolling" },
    { name: "Rotational Kinetic Energy and Angular Momentum", path: "/rotation/angular-momentum" } // Note: file is angular-momentum.vue, not angular-momentum-energy
  ],
  oscillations: [
    { name: "Simple Harmonic Motion", path: "/oscillations/simple-harmonic-motion" },
    { name: "Spring-Block Oscillators", path: "/oscillations/spring-oscillations" },
    { name: "Pendulums", path: "/oscillations/pendulum" },
    { name: "Other Oscillators", path: "/oscillations/other-oscillations" }
  ],
  fluids: [
    { name: "Properties of Fluids", path: "/fluids/fluid-intro" },
    { name: "Pressure", path: "/fluids/pressure" },
    { name: "Fluid Flow", path: "/fluids/fluid-flow" },
    { name: "Bernoulli's Principle", path: "/fluids/bernoulli" },
    { name: "Air Resistance and Drag", path: "/fluids/air-resistance" }
  ],
  electrostatics: [
    { name: "Electric Charge", path: "/electricityAndMagnetism/electrostatics/electric-charge" },
    { name: "Coloumb's Law", path: "/electricityAndMagnetism/electrostatics/coloumbs-law" },
    { name: "Electric Fields", path: "/electricityAndMagnetism/electrostatics/electric-fields" },
    { name: "Gauss's Law", path: "/electricityAndMagnetism/electrostatics/gauss-law" }
  ]
})

const searchQuery = ref("")

// Filters lessons based on search query

const filteredLessons = computed(() => {
  if (searchQuery.value.trim()) {
    const filtered = reactive({})
    for (let unit of Object.keys(lessons)) {
      filtered[unit] = lessons[unit].filter(lesson =>
        lesson.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
    return filtered
  }
  return lessons
})

function hideMobileBar() {
  if (import.meta.client) {
    if (window.innerWidth <= 768) {
      document.getElementById("closeMenu").click()
      searchQuery.value = ""
    }
  }
}

function resetScroll() {
  if (import.meta.client) window.scrollTo(0, 0)
}

if (import.meta.client) {
  window.addEventListener("dragstart", (e) => {
    if (e.target.nodeName === 'IMG') e.preventDefault()
  })
}

onMounted(() => {
  if (import.meta.client && theme.value === "dark") {
    const els = document.getElementsByClassName("os-scrollbar-vertical")
    for (let el of els) {
      el.classList.toggle("os-theme-light")
      el.classList.toggle("os-theme-dark")
    }
  }
})
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
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 align-items-center"
      style="height: 50px">
      <NuxtLink @click="resetScroll(); hideMobileBar()" class="sidebar-brand mx-auto" to="/">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
      </NuxtLink>
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
    <OverlayScrollbarsComponent class="offcanvas-body">
      <ul class="sidebar-nav">
        <li>
          <h6 class="sidebar-header big-section" @click="triggerAnimation('basics')"><b>Getting Started <CaretRight v-if="!lessonVisibility.basics" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="lesson-content mb-3 basics" style="display:block">
          <li v-for="lesson in filteredLessons.basics">
            <NuxtLink @click="resetScroll(); hideMobileBar()"
              :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
              :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                lesson.name }}
            </NuxtLink>
          </li>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('mechanics')" class="sidebar-header big-section"><b>Mechanics <CaretRight v-if="!sectionVisibility.mechanics" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>

        <span class="mechanics mb-3">
          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('kinematics')"><b>Kinematics <CaretRight v-if="!lessonVisibility.kinematics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 kinematics">
            <li v-for="lesson in filteredLessons.kinematics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>

          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('dynamics')"><b>Dynamics <CaretRight v-if="!lessonVisibility.dynamics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 dynamics">
            <li v-for="lesson in filteredLessons.dynamics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('circularGravity')"><b>Circular Motion and Gravitation <CaretRight v-if="!lessonVisibility.circularGravity" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 circularGravity">
            <li v-for="lesson in filteredLessons.circularGravity">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('energy')"><b>Energy <CaretRight v-if="!lessonVisibility.energy" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 energy">
            <li v-for="lesson in filteredLessons.energy">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('momentum')"><b>Momentum <CaretRight v-if="!lessonVisibility.momentum" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 momentum">
            <li v-for="lesson in filteredLessons.momentum">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('rotation')"><b>Rotation <CaretRight v-if="!lessonVisibility.rotation" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 rotation">
            <li v-for="lesson in filteredLessons.rotation">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('oscillations')"><b>Oscillations <CaretRight v-if="!lessonVisibility.oscillations" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 oscillations">
            <li v-for="lesson in filteredLessons.oscillations">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('fluids')"><b>Fluids <CaretRight v-if="!lessonVisibility.fluids" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 fluids">
            <li v-for="lesson in filteredLessons.fluids">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('EM')" class="sidebar-header big-section"><b>Electricity & Magnetism <CaretRight v-if="!sectionVisibility.EM" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="EM mb-3">
          <li>
            <h6 class="sidebar-header" @click="triggerAnimation('electrostatics')"><b>Electrostatics <CaretRight v-if="!lessonVisibility.electrostatics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 electrostatics">
            <li v-for="lesson in filteredLessons.electrostatics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('thermo')" class="sidebar-header big-section"><b>Thermodynamics <CaretRight v-if="!sectionVisibility.thermo" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="thermo mb-3"></span>

      </ul>
    </OverlayScrollbarsComponent>
    <div class="offcanvas-footer mb-1 pt-1 border-top border-secondary border-opacity-25">
      <div class="row justify-content-center" style="margin-bottom:1px">
        <div class="col-6">
          <h6 class="sidebar-header">Adjust Math Level</h6>
          <select style="width: 140px;" class="mx-auto p-2 my-1 form-select" id="levelSelect" v-model="difficulty"
            @change="hideMobileBar()">
            <option value="0">Conceptual</option>
            <option value="1">Algebra-Based</option>
            <option value="2">Calculus-Based</option>
          </select>
        </div>
        <div class="col-4">
          <h6 class="sidebar-header">Theme</h6>
          <select style="width: 70px;" class="mx-auto p-2 my-1 form-select" id="themeSelect" v-model="theme"
            @change="hideMobileBar()">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span style="display:inline-block;margin-bottom:3px;margin-top:2px;" class="text-secondary-emphasis">© 2024 The
        AntiMatter Lab</span><br>
      <NuxtLink @click="resetScroll(); hideMobileBar()" to="/basics/about" class="link-offset-1 info-link">About Us
      </NuxtLink>
      &emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank" class="link-offset-1 info-link"
        @click="hideMobileBar()">Github</a>
    </div>
  </div>

  <!-- START OF NORMAL SIDEBAR -->
  <div class="sidebar offcanvas-start offcanvas-md" id="menu" style="animation: slideRight 0.3s forwards">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <NuxtLink @click="resetScroll(); hideMobileBar()" class="sidebar-brand mx-auto" to="/">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
      </NuxtLink>
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
    <OverlayScrollbarsComponent class="offcanvas-body">
      <ul class="sidebar-nav">
        <li>
  <h6 class="sidebar-header big-section" @click="triggerAnimation('basics')"><b>Getting Started <CaretRight v-if="!lessonVisibility.basics" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="lesson-content mb-3 basics" style="display:block">
          <li v-for="lesson in filteredLessons.basics">
            <NuxtLink @click="resetScroll(); hideMobileBar()"
              :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
              :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                lesson.name }}
            </NuxtLink>
          </li>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('mechanics')" class="sidebar-header big-section"><b>Mechanics <CaretRight v-if="!sectionVisibility.mechanics" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>

        <span class="mechanics mb-3">
          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('kinematics')"><b>Kinematics <CaretRight v-if="!lessonVisibility.kinematics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 kinematics">
            <li v-for="lesson in filteredLessons.kinematics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>

          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('dynamics')"><b>Dynamics <CaretRight v-if="!lessonVisibility.dynamics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 dynamics">
            <li v-for="lesson in filteredLessons.dynamics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('circularGravity')"><b>Circular Motion and Gravitation <CaretRight v-if="!lessonVisibility.circularGravity" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 circularGravity">
            <li v-for="lesson in filteredLessons.circularGravity">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('energy')"><b>Energy <CaretRight v-if="!lessonVisibility.energy" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 energy">
            <li v-for="lesson in filteredLessons.energy">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('momentum')"><b>Momentum <CaretRight v-if="!lessonVisibility.momentum" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 momentum">
            <li v-for="lesson in filteredLessons.momentum">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('rotation')"><b>Rotation <CaretRight v-if="!lessonVisibility.rotation" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 rotation">
            <li v-for="lesson in filteredLessons.rotation">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('oscillations')"><b>Oscillations <CaretRight v-if="!lessonVisibility.oscillations" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 oscillations">
            <li v-for="lesson in filteredLessons.oscillations">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>


          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('fluids')"><b>Fluids <CaretRight v-if="!lessonVisibility.fluids" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 fluids">
            <li v-for="lesson in filteredLessons.fluids">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('EM')" class="sidebar-header big-section"><b>Electricity & Magnetism <CaretRight v-if="!sectionVisibility.EM" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="EM mb-3">
          <li>
  <h6 class="sidebar-header" @click="triggerAnimation('electrostatics')"><b>Electrostatics <CaretRight v-if="!lessonVisibility.electrostatics" width="14" height="14" /><CaretDown v-else width="14" height="14" /></b></h6>
          </li>
          <span class="lesson-content mb-4 electrostatics">
            <li v-for="lesson in filteredLessons.electrostatics">
              <NuxtLink @click="resetScroll(); hideMobileBar()"
                :class="$route.fullPath === lesson.path ? 'text-body-emphasis nav-link' : 'nav-link'"
                :style="$route.fullPath === lesson.path ? 'text-decoration: underline' : ''" :to="lesson.path">{{
                  lesson.name }}
              </NuxtLink>
            </li>
          </span>
        </span>

        <li>
      <h6 @click="triggerSectionAnimation('thermo')" class="sidebar-header big-section"><b>Thermodynamics <CaretRight v-if="!sectionVisibility.thermo" /><CaretDown v-else /></b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <span class="thermo mb-3"></span>

      </ul>
    </OverlayScrollbarsComponent>
    <div class="offcanvas-footer mb-2 pt-2 border-top border-secondary border-opacity-25">
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
          <select style="width: 70px;" class="mx-auto p-2 my-2 form-select" id="themeSelect" v-model="theme"
            @change="changeScrollbarTheme()">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span style="margin-bottom:5px;display:block" class="text-secondary-emphasis">© 2024 The AntiMatter Lab</span>
      <NuxtLink @click="resetScroll(); hideMobileBar()" to="/basics/about" class="link-offset-1 info-link">About Us
      </NuxtLink>
      &emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="link-offset-1 info-link">Github</a>
    </div>
  </div>
  <span id="basics-trigger" style="display:none" @click="expandBasics()">this is designed for the about link on the
    homepage to auto expand</span>
</template>

<style scoped>
.big-section {
  font-size: 1.05rem;
}

.lesson-content {
  display: none;
}

li>.sidebar-header {
  cursor: pointer;
  width: fit-content;
  margin: auto;
  margin-top: 7px;
}

li>.sidebar-header:hover {
  opacity: 0.85;
}

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