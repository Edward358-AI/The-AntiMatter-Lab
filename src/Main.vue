<script setup>
import { ref, reactive, computed } from 'vue'
import Welcome from './components/Welcome.vue'
import About from './components/About.vue'

import Vectors from './components/kinematics/Vectors.vue'
import ProjMotion from './components/kinematics/ProjMotion.vue'
import PosVelAcc from './components/kinematics/PosVelAcc.vue'
import Freefall from './components/kinematics/Freefall.vue'
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

function getTheme() {
  if (localStorage.getItem("theme")) {
    htmlElement.setAttribute("data-bs-theme", localStorage.getItem("theme"))
  } else {
    htmlElement.setAttribute("data-bs-theme", "dark")
  }
}
getTheme()

function updateTheme(newTheme) {
  htmlElement.setAttribute("data-bs-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

const user = reactive({ current: "landing", difficulty: 0 })

const sidebar = ref(false)

const lessons = reactive({ kinematics: ["Vectors", "Position, Velocity, Acceleration", "One-Dimensional Motion with Constant Acceleration", "Free Fall", "Two-Dimensional Motion with Constant Acceleration", "Projectile Motion"], dynamics: ["Newton's Laws", "F=ma", "Free-body Diagrams", "Friction", "Other forces", "Inclined Planes"], circularGravity: ["Centripetal Force/Acceleration", "Fictious Forces", "Newton's Laws of Gravitation", "Kepler's Laws"], energy: ["Dot Product", "Definition of \"Work\"", "Definition of Energy", "Conservation of Energy", "Definition of Power"], momentum: ["Impulse/Momentum Theorem", "Conservation of Linear Momentum", "Collisions", "Velocity of Approach"] })

const searchQuery = ref("")

const filteredLessons = computed(() => {
  if (searchQuery.value) {
    let filteredLessons = reactive({})
    for (let unit of Object.keys(lessons)) {
      filteredLessons[unit] = lessons[unit].filter(lesson => lesson.toLowerCase().includes(searchQuery.value))
    }
    return filteredLessons
  } else {
    return lessons
  }
  
})
</script>

<template>
  <div class="sidebar offcanvas-start offcanvas-md" id="menu"
    :style="sidebar ? 'animation: slideRight 1.5s forwards' : ''">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <a class="sidebar-brand mx-auto" href="javascript:void(0);" @click="user.current = 'landing'">
        <img src="/public/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded">
        The AntiMatter Lab
      </a>
    </div>
    <div class="offcanvas-header">
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
          <a href="javascript:void(0);" class="nav-link" @click="user.current = lesson.toLowerCase()">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Dynamics</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <a href="javascript:void(0);" class="nav-link" @click="user.current = lesson.toLowerCase()">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Circular Motion and Gravitation</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <a href="javascript:void(0);" class="nav-link" @click="user.current = lesson.toLowerCase()">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Energy</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <a href="javascript:void(0);" class="nav-link" @click="user.current = lesson.toLowerCase()">{{ lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Momentum</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <a href="javascript:void(0);" class="nav-link" @click="user.current = lesson.toLowerCase()">{{ lesson }}</a>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-2">
      <h6 class="sidebar-header">Adjust Math Level</h6>
      <select style="width: 140px;" class="mx-auto p-2 my-2 form-select">
        <option default @click="user.difficulty = 0">Conceptual</option>
        <option @click="user.difficulty = 1">Algebra-Based</option>
        <option @click="user.difficulty = 2">Calculus-Based</option>
      </select>
      <h6 class="sidebar-header">Theme</h6>
      <select style="width: 70px;" class="mx-auto p-2 my-2 form-select">
        <option default @click="updateTheme('dark')">Dark</option>
        <option @click="updateTheme('light')">Light</option>
      </select>
      <hr class="sidebar-divider opacity-50">
      <p class="text-secondary-emphasis">Made by Edward Jiang and Eric Niu</p>
      <a href="javascript:void(0);" @click="user.current = 'about'" class="text-decoration-none">About</a>&nbsp;&nbsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="text-decoration-none">Github</a>
    </div>
  </div>

  <Welcome v-show="user.current === 'landing'" :sidebar="sidebar" @show-sidebar="sidebar = true" />
  <About v-show="user.current === 'about'" />
  

</template>



<style scoped>
#menu {
  left: -100%;
}
</style>