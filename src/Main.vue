<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import Welcome from './components/Welcome.vue'
import About from './components/About.vue'

import Vectors from './components/kinematics/Vectors.vue'
import PosVelAcc from './components/kinematics/PosVelAcc.vue'
import OneDMotion from './components/kinematics/OneDMotion.vue'
import TwoDMotion from './components/kinematics/TwoDMotion.vue'

import FBD from './components/dynamics/FBD.vue'
import Friction from './components/dynamics/Friction.vue'
import InclinedPlanes from './components/dynamics/InclinedPlanes.vue'
import Newton from './components/dynamics/Newton.vue'
import OtherForces from './components/dynamics/OtherForces.vue'
import Fma from './components/dynamics/Fma.vue'

import Centripetal from './components/circularGravity/Centripetal.vue'
import Fictious from './components/circularGravity/Fictious.vue'
import GravityLaws from './components/circularGravity/GravityLaws.vue'
import Kepler from './components/circularGravity/Kepler.vue'

import Collisions from './components/momentum/Collisions.vue'
import Impulse from './components/momentum/Impulse.vue'
import LinMomConsrv from './components/momentum/LinMomConsrv.vue'
import VelApproach from './components/momentum/VelApproach.vue'

import DotProd from './components/energy/DotProd.vue'
import Energy from './components/energy/Energy.vue'
import EnergyConsrv from './components/energy/EnergyConsrv.vue'
import Power from './components/energy/Power.vue'
import Work from './components/energy/Work.vue'


const htmlElement = document.documentElement
const user = reactive({ current: "landing", difficulty: 0, theme: "dark" })



if (localStorage.getItem("user")) {
  user.theme = JSON.parse(localStorage.getItem("user")).theme
  user.difficulty = JSON.parse(localStorage.getItem("user")).difficulty
}
htmlElement.setAttribute("data-bs-theme", user.theme)

function getCurrentPage() {
  if (localStorage.getItem("user")) {
    user.current = JSON.parse(localStorage.getItem("user")).current
  }
}


function updateTheme(newTheme) {
  htmlElement.setAttribute("data-bs-theme", newTheme)
  user.theme = newTheme
}

const sidebar = ref(false)

const lessons = reactive(
  {
    kinematics: [
      "Vectors", 
      "Position, Velocity, Acceleration", 
      "One-Dimensional Motion/Free fall", 
      "Two-Dimensional Motion/Projectile Motion"
    ],

    dynamics: [
      "Newton's Laws", 
      "F=ma", "Free-body Diagrams", 
      "Friction", 
      "Other forces", 
      "Inclined Planes"
    ],

    circularGravity: [
      "Centripetal Force/Acceleration", 
      "Fictious Forces", 
      "Newton's Laws of Gravitation", 
      "Kepler's Laws"
    ],

    energy: [
      "Dot Product", 
      "Definition of \"Work\"", 
      "Definition of Energy", 
      "Conservation of Energy", 
      "Definition of Power"
    ],

    momentum: [
      "Impulse/Momentum Theorem", 
      "Conservation of Linear Momentum", 
      "Collisions", 
      "Velocity of Approach"
    ]
}
)

const searchQuery = ref("")

const filteredLessons = computed(() => {
  if (searchQuery.value) {
    let filteredLessons = reactive({})
    for (let unit of Object.keys(lessons)) {
      filteredLessons[unit] = lessons[unit].filter(lesson => lesson.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
    return filteredLessons
  } else {
    return lessons
  }
  
})

watch(user, () => {
  localStorage.setItem("user", JSON.stringify(user))
  updateTheme(user.theme)
})

onMounted(() => {
    window.MathJax.typeset()
})
</script>

<template>
  <div class="sidebar offcanvas-start offcanvas-md" id="menu"
    :style="sidebar ? 'animation: slideRight 0.3s forwards' : ''">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <a class="sidebar-brand mx-auto" href="javascript:void(0);" @click="user.current = 'landing'">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
      </a>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Type here to find a lesson...">
    </div>
    <div class="offcanvas-body">
      <ul class="sidebar-nav">
        <li>
          <h6 class="sidebar-header">Kinematics</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.kinematics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'" :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Dynamics</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'" :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Circular Motion and Gravitation</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'" :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Energy</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'" :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Momentum</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'" :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{ lesson }}</a>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-2 border-top border-secondary border-opacity-25">
      <h6 class="sidebar-header">Adjust Math Level</h6>
      <select style="width: 140px;" class="mx-auto p-2 my-2 form-select" id="levelSelect" v-model="user.difficulty">
        <option value="0">Conceptual</option>
        <option value="1">Algebra-Based</option>
        <option value="2">Calculus-Based</option>
      </select>
      <h6 class="sidebar-header">Theme</h6>
      <select style="width: 70px;" class="mx-auto p-2 my-2 form-select" id="themeSelect" v-model="user.theme">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <p class="text-secondary-emphasis">Made by Edward Jiang and Eric Niu</p>
      <a href="javascript:void(0);" @click="user.current = 'about'" class="text-decoration-none">About</a>&nbsp;&nbsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="text-decoration-none">Github</a>
    </div>
  </div>

  <Welcome v-show="user.current === 'landing'" :sidebar="sidebar" @show-sidebar="sidebar = true;getCurrentPage()" />
  <About v-show="user.current === 'about'" />
  
  <Vectors v-show="user.current === lessons.kinematics[0]" :level="user.difficulty" @nextpage="user.current = lessons.kinematics[1]" />
  <PosVelAcc v-show="user.current === lessons.kinematics[1]" :level="user.difficulty" @nextpage="user.current = lessons.kinematics[2]" />
  <OneDMotion v-show="user.current === lessons.kinematics[2]" :level="user.difficulty" @nextpage="user.current = lessons.kinematics[3]" />
  <TwoDMotion v-show="user.current === lessons.kinematics[3]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[0]" />

  <Newton v-show="user.current === lessons.dynamics[0]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[1]" />
  <Fma v-show="user.current === lessons.dynamics[1]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[2]" />
  <FBD v-show="user.current === lessons.dynamics[2]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[3]" />
  <Friction v-show="user.current === lessons.dynamics[3]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[4]" />
  <OtherForces v-show="user.current === lessons.dynamics[4]" :level="user.difficulty" @nextpage="user.current = lessons.dynamics[5]" />
  <InclinedPlanes v-show="user.current === lessons.dynamics[5]" :level="user.difficulty" @nextpage="user.current = lessons.circularGravity[0]" />

  <Centripetal v-show="user.current === lessons.circularGravity[0]" :level="user.difficulty" @nextpage="user.current = lessons.circularGravity[1]" />
  <Fictious v-show="user.current === lessons.circularGravity[1]" :level="user.difficulty" @nextpage="user.current = lessons.circularGravity[2]" />
  <GravityLaws v-show="user.current === lessons.circularGravity[2]" :level="user.difficulty" @nextpage="user.current = lessons.circularGravity[3]" />
  <Kepler v-show="user.current === lessons.circularGravity[3]" :level="user.difficulty" @nextpage="user.current = lessons.energy[0]" />

  <DotProd v-show="user.current === lessons.energy[0]" :level="user.difficulty" @nextpage="user.current = lessons.energy[1]" />
  <Work v-show="user.current === lessons.energy[1]" :level="user.difficulty" @nextpage="user.current = lessons.energy[2]" />
  <Energy v-show="user.current === lessons.energy[2]" :level="user.difficulty" @nextpage="user.current = lessons.energy[3]" />
  <EnergyConsrv v-show="user.current === lessons.energy[3]" :level="user.difficulty" @nextpage="user.current = lessons.energy[4]" />
  <Power v-show="user.current === lessons.energy[4]" :level="user.difficulty" @nextpage="user.current = lessons.momentum[0]" />

  <Impulse v-show="user.current === lessons.momentum[0]" :level="user.difficulty" @nextpage="user.current = lessons.momentum[1]" />
  <LinMomConsrv v-show="user.current === lessons.momentum[1]" :level="user.difficulty" @nextpage="user.current = lessons.momentum[2]" />
  <Collisions v-show="user.current === lessons.momentum[2]" :level="user.difficulty" @nextpage="user.current = lessons.momentum[3]" />
  <VelApproach v-show="user.current === lessons.momentum[3]" :level="user.difficulty" @nextpage="user.current = 'landing'" />
</template>



<style scoped>
#menu {
  left: -100%;
}
</style>