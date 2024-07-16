<script setup>
import { ref, reactive, computed, watch, onMounted, onUpdated } from 'vue'
import Welcome from './components/Welcome.vue'
import About from './components/About.vue'

import Vectors from './components/kinematics/Vectors.vue'
import PosVelAcc from './components/kinematics/PosVelAcc.vue'
import DimenAnalyz from './components/kinematics/DimenAnalyz.vue'
import OneDMotion from './components/kinematics/OneDMotion.vue'
import TwoDMotion from './components/kinematics/TwoDMotion.vue'

import Friction from './components/dynamics/Friction.vue'
import InclinedPlanes from './components/dynamics/InclinedPlanes.vue'
import Newton from './components/dynamics/Newton.vue'
import OtherForces from './components/dynamics/OtherForces.vue'
import FmaFBD from './components/dynamics/FmaFBD.vue'

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
const Window = window
const user = reactive({ current: "landing", difficulty: 0, theme: "dark", page: { Vectors: 0, DimenAnalyz: 0, PosVelAcc: 0, OneDMotion: 0, TwoDMotion: 0, FmaFBD: 0, Friction: 0, InclinedPlanes: 0, OtherForces: 0, Newton: 0, Kepler: 0, GravityLaws: 0, Centripetal: 0, Fictious: 0, DotProd: 0, Energy: 0, EnergyConsrv: 0, Power: 0, Work: 0, Collisions: 0, Impulse: 0, LinMomConsrv: 0, VelApproach: 0 } })

// Theme must be loaded first, but the current page is loaded later after the user clicks get started
user.theme = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).theme : user.theme
user.difficulty = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).difficulty : user.difficulty

htmlElement.setAttribute("data-bs-theme", user.theme)

// Gets the user's current page from storage (if exists)
function getCurrentPage() {
  if (localStorage.getItem("user")) {
    user.current = JSON.parse(localStorage.getItem("user")).current
    // Load specific page they were on
    let temp = JSON.parse(localStorage.getItem("user")).page
    if (typeof temp === "object") {
      for (let page of Object.keys(temp)) {
        if (Number.isInteger(temp[page]) && temp[page] >= 0) user.page[page] = temp[page]
      }
    }
  }
}

// Variable that is used to keep track of if the sidebar should be loaded
const sidebar = ref(false)

// List of lessons organized by unit 
const lessons = reactive(
  {
    kinematics: [
      "Vectors",
      "Dimensional Analysis",
      "Position, Velocity, Acceleration",
      "One-Dimensional Motion/Free fall",
      "Two-Dimensional Motion/Projectile Motion"
    ],

    dynamics: [
      "Newton's Laws",
      "F=ma and Free-body Diagrams",
      "Friction",
      "Other forces",
      "Inclined Planes"
    ],

    circularGravity: [
      "Centripetal Force/Acceleration",
      "Fictitious Forces",
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

// Filters lessons based on search query
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


// Saves the user's selections to where they left off of, also updates theme
watch(user, () => {
  localStorage.setItem("user", JSON.stringify(user))
  htmlElement.setAttribute("data-bs-theme", user.theme)
})

// Parses MathJax after content has been loaded to ensure the math is rendered properly
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
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Dynamics</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Circular Motion and Gravitation</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Energy</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header">Momentum</h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''" @click="user.current = lesson">{{
              lesson }}</a>
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
      <span class="text-secondary-emphasis">Made by Edward Jiang and Eric Niu</span><br style="margin-bottom:10px">
      <a href="javascript:void(0);" @click="user.current = 'about'" class="text-decoration-none">About</a>&nbsp;&nbsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="text-decoration-none">Github</a>
    </div>
  </div>

  <Welcome v-show="user.current === 'landing'" :sidebar="sidebar" @show-sidebar="sidebar = true; getCurrentPage()" />
  <About v-show="user.current === 'about'" />

  <Vectors v-show="user.current === lessons.kinematics[0]" :level="user.difficulty" :page="user.page.Vectors"
    @nextpage="Window.scrollTo(0, 0); user.page.Vectors++" @prevpage="Window.scrollTo(0, 0); user.page.Vectors--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[1]" />
  <DimenAnalyz v-show="user.current === lessons.kinematics[1]" :level="user.difficulty" :page="user.page.DimenAnalyz"
    @nextpage="Window.scrollTo(0, 0); user.page.DimenAnalyz++" @prevpage="Window.scrollTo(0, 0); user.page.DimenAnalyz--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[2]" />
  <PosVelAcc v-show="user.current === lessons.kinematics[2]" :level="user.difficulty" :page="user.page.PosVelAcc"
    @nextpage="Window.scrollTo(0, 0); user.page.PosVelAcc++" @prevpage="Window.scrollTo(0, 0); user.page.PosVelAcc--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[3]" />
  <OneDMotion v-show="user.current === lessons.kinematics[3]" :level="user.difficulty" :page="user.page.OneDMotion"
    @nextpage="Window.scrollTo(0, 0); user.page.OneDMotion++" @prevpage="Window.scrollTo(0, 0); user.page.OneDMotion--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[4]" />
  <TwoDMotion v-show="user.current === lessons.kinematics[4]" :level="user.difficulty" :page="user.page.TwoDMotion"
    @nextpage="Window.scrollTo(0, 0); user.page.TwoDMotion++" @prevpage="Window.scrollTo(0, 0); user.page.TwoDMotion--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[0]" />

  <Newton v-show="user.current === lessons.dynamics[0]" :level="user.difficulty" :page="user.page.Newton"
    @nextpage="Window.scrollTo(0, 0); user.page.Newton++" @prevpage="Window.scrollTo(0, 0); user.page.Newton--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[1]" />
  <FmaFBD v-show="user.current === lessons.dynamics[1]" :level="user.difficulty" :page="user.page.FmaFBD"
    @nextpage="Window.scrollTo(0, 0); user.page.FmaFBD++" @prevpage="Window.scrollTo(0, 0); user.page.FmaFBD--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[2]" />
  <Friction v-show="user.current === lessons.dynamics[2]" :level="user.difficulty" :page="user.page.Friction"
    @nextpage="Window.scrollTo(0, 0); user.page.Friction++" @prevpage="Window.scrollTo(0, 0); user.page.Friction--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[3]" />
  <OtherForces v-show="user.current === lessons.dynamics[3]" :level="user.difficulty" :page="user.page.OtherForces"
    @nextpage="Window.scrollTo(0, 0); user.page.OtherForces++" @prevpage="Window.scrollTo(0, 0); user.page.OtherForces--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[4]" />
  <InclinedPlanes v-show="user.current === lessons.dynamics[4]" :level="user.difficulty"
    :page="user.page.InclinedPlanes" @nextpage="Window.scrollTo(0, 0); user.page.InclinedPlanes++"
    @prevpage="Window.scrollTo(0, 0); user.page.InclinedPlanes--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[0]" />

  <Centripetal v-show="user.current === lessons.circularGravity[0]" :level="user.difficulty"
    :page="user.page.Centripetal" @nextpage="Window.scrollTo(0, 0); user.page.Centripetal++"
    @prevpage="Window.scrollTo(0, 0); user.page.Centripetal--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[1]" />
  <Fictious v-show="user.current === lessons.circularGravity[1]" :level="user.difficulty" :page="user.page.Fictious"
    @nextpage="Window.scrollTo(0, 0); user.page.Fictious++" @prevpage="Window.scrollTo(0, 0); user.page.Fictious--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[2]" />
  <GravityLaws v-show="user.current === lessons.circularGravity[2]" :level="user.difficulty"
    :page="user.page.GravityLaws" @nextpage="Window.scrollTo(0, 0); user.page.GravityLaws++"
    @prevpage="Window.scrollTo(0, 0); user.page.GravityLaws--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[3]" />
  <Kepler v-show="user.current === lessons.circularGravity[3]" :level="user.difficulty" :page="user.page.Kepler"
    @nextpage="Window.scrollTo(0, 0); user.page.Kepler++" @prevpage="Window.scrollTo(0, 0); user.page.Kepler--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[0]" />

  <DotProd v-show="user.current === lessons.energy[0]" :level="user.difficulty" :page="user.page.DotProd"
    @nextpage="Window.scrollTo(0, 0); user.page.DotProd++" @prevpage="Window.scrollTo(0, 0); user.page.DotProd--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[1]" />
  <Work v-show="user.current === lessons.energy[1]" :level="user.difficulty" :page="user.page.Work"
    @nextpage="Window.scrollTo(0, 0); user.page.Work++" @prevpage="Window.scrollTo(0, 0); user.page.Work--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[2]" />
  <Energy v-show="user.current === lessons.energy[2]" :level="user.difficulty" :page="user.page.Energy"
    @nextpage="Window.scrollTo(0, 0); user.page.Energy++" @prevpage="Window.scrollTo(0, 0); user.page.Energy--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[3]" />
  <EnergyConsrv v-show="user.current === lessons.energy[3]" :level="user.difficulty" :page="user.page.EnergyConsrv"
    @nextpage="Window.scrollTo(0, 0); user.page.EnergyConsrv++" @prevpage="Window.scrollTo(0, 0); user.page.EnergyConsrv--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[4]" />
  <Power v-show="user.current === lessons.energy[4]" :level="user.difficulty" :page="user.page.Power"
    @nextpage="Window.scrollTo(0, 0); user.page.Power++" @prevpage="Window.scrollTo(0, 0); user.page.Power--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[0]" />

  <Impulse v-show="user.current === lessons.momentum[0]" :level="user.difficulty" :page="user.page.Impulse"
    @nextpage="Window.scrollTo(0, 0); user.page.Impulse++" @prevpage="Window.scrollTo(0, 0); user.page.Impulse--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[1]" />
  <LinMomConsrv v-show="user.current === lessons.momentum[1]" :level="user.difficulty" :page="user.page.LinMomConsrv"
    @nextpage="Window.scrollTo(0, 0); user.page.LinMomConsrv++" @prevpage="Window.scrollTo(0, 0); user.page.LinMomConsrv--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[2]" />
  <Collisions v-show="user.current === lessons.momentum[2]" :level="user.difficulty" :page="user.page.Collisions"
    @nextpage="Window.scrollTo(0, 0); user.page.Collisions++" @prevpage="Window.scrollTo(0, 0); user.page.Collisions--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[3]" />
  <VelApproach v-show="user.current === lessons.momentum[3]" :level="user.difficulty" :page="user.page.VelApproach"
    @nextpage="Window.scrollTo(0, 0); user.page.VelApproach++" @prevpage="Window.scrollTo(0, 0); user.page.VelApproach--"
    @nextlesson="Window.scrollTo(0, 0); user.current = 'landing'" />
</template>



<style scoped>
#menu {
  left: -100%;
}
</style>