<script setup>
import { ref, reactive, computed, watch, onMounted, onUpdated } from 'vue'
import Welcome from './components/Welcome.vue'

import About from './components/basics/About.vue'
import Algebra from './components/basics/Algebra.vue'
import GettingStarted from './components/basics/GettingStarted.vue'
import MetricPrefix from './components/basics/MetricPrefix.vue'
import Trig from './components/basics/Trig.vue'

import Vectors from './components/kinematics/Vectors.vue'
import PosVelAcc from './components/kinematics/PosVelAcc.vue'
import DimenAnalyz from './components/kinematics/DimenAnalyz.vue'
import OneDMotion from './components/kinematics/OneDMotion.vue'
import TwoDMotion from './components/kinematics/TwoDMotion.vue'
import RelativeVel from './components/kinematics/RelativeVel.vue'

import InclinedPlanes from './components/dynamics/InclinedPlanes.vue'
import Newton from './components/dynamics/Newton.vue'
import OtherForces from './components/dynamics/OtherForces.vue'
import FmaFBD from './components/dynamics/FmaFBD.vue'
import Spring from './components/dynamics/Spring.vue'

import Centripetal from './components/circularGravity/Centripetal.vue'
import Fictious from './components/circularGravity/Fictious.vue'
import GravityLaws from './components/circularGravity/GravityLaws.vue'
import Kepler from './components/circularGravity/Kepler.vue'

import Collisions from './components/momentum/Collisions.vue'
import Impulse from './components/momentum/Impulse.vue'
import LinMomConsrv from './components/momentum/LinMomConsrv.vue'
import Explosions from './components/momentum/Explosions.vue'
import CenterOfMass from './components/momentum/CenterOfMass.vue'

import DotProd from './components/energy/DotProd.vue'
import Energy from './components/energy/Energy.vue'
import Power from './components/energy/Power.vue'
import Work from './components/energy/Work.vue'
import GravEnergy from './components/energy/GravEnergy.vue'
import EqTypes from './components/energy/EqTypes.vue'

import RotationalKinematics from './components/rotation/RotationalKinematics.vue'
import Torque from './components/rotation/Torque.vue'
import MomentInertia from './components/rotation/MomentInertia.vue'
import RotationalDynamics from './components/rotation/RotationalDynamics.vue'
import Rolling from './components/rotation/Rolling.vue'
import AngMomentum from './components/rotation/AngMomentumEnergy.vue'

import SHM from './components/oscillations/SHM.vue'
import SpringOsc from './components/oscillations/SpringOsc.vue'
import Pendulum from './components/oscillations/Pendulum.vue'
import OtherOsc from './components/oscillations/OtherOsc.vue'

import FluidIntro from './components/fluids/FluidIntro.vue'
import Pressure from './components/fluids/Pressure.vue'
import FluidFlow from './components/fluids/FluidFlow.vue'
import AirResistance from './components/fluids/AirResistance.vue'
import Bernoulli from './components/fluids/Bernoulli.vue'


const htmlElement = document.documentElement
const doc = document
const Window = window
const user = reactive({
  current: "landing", difficulty: 0, theme: "dark", page: { Algebra: 0, About: 0, GettingStarted: 0, metricPrefix: 0, Trig: 0,
    Vectors: 0, DimenAnalyz: 0, PosVelAcc: 0, OneDMotion: 0, TwoDMotion: 0, RelativeVel: 0,
    FmaFBD: 0, Spring: 0, InclinedPlanes: 0, OtherForces: 0, Newton: 0,
    Kepler: 0, GravityLaws: 0, Centripetal: 0, Fictious: 0,
    DotProd: 0, Energy: 0, GravEnergy: 0, Power: 0, Work: 0, EqTypes: 0,
    Collisions: 0, Impulse: 0, LinMomConsrv: 0, CenterOfMass: 0, Explosions: 0,
    RotationalKinematics: 0, Torque: 0, MomentInertia: 0, RotationalDynamics: 0, Rolling: 0, AngMomentum: 0,
    SHM: 0, SpringOsc: 0, Pendulum: 0, OtherOsc: 0,
    FluidIntro: 0, Pressure: 0, FluidFlow: 0, AirResistance: 0, Bernoulli: 0
  }
})
const lessonShowing = ref(true)

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
    basics: [
      "About Us and Our Mission", 
      "Getting Started",
      "Basic Algebra",
      "Metric Prefixes",
      "Trigonometry"
    ],
    kinematics: [
      "Vectors",
      "Dimensional Analysis",
      "Position, Velocity, Acceleration",
      "One-Dimensional Motion/Free fall",
      "Two-Dimensional Motion/Projectile Motion",
      "Relative Velocity"
    ],

    dynamics: [
      "Newton's Laws",
      "Forces",
      "F=ma and Free-body Diagrams",
      "Inclined Planes and Pulleys",
      "Spring Forces"
    ],

    circularGravity: [
      "Centripetal Force/Acceleration",
      "Fictitious Forces",
      "Newton's Law of Universal Gravitation",
      "Kepler's Laws"
    ],

    energy: [
      "Dot Product",
      "Definition of \"Work\"",
      "Definition of Energy and Energy Conservation",
      "Types of Equilibrium",
      "Definition of Power",
      "Universal Gravitational Potential Energy"
    ],

    momentum: [
      "Impulse/Momentum Theorem",
      "Conservation of Linear Momentum",
      "Center of Mass",
      "Collisions",
      "Explosions"
    ],

    rotation: [
      "Rotational Kinematics",
      "Torque",
      "Moment of Inertia",
      "Rotational Dynamics",
      "Rolling Without Slipping",
      "Rotational Kinetic Energy and Angular Momentum"
    ],

    oscillations: [
      "Simple Harmonic Motion",
      "Spring-Block Oscillators",
      "Pendulums",
      "Other Oscillators"
    ],

    fluids: [
      "Properties of Fluids",
      "Pressure",
      "Fluid Flow",
      "Bernoulli's Principle",
      "Air Resistance and Drag"
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

function hideMobileBar() {
  if (Window.innerWidth <= 768) {
    doc.getElementById("closeMenu").click()
  }
}

onUpdated(() => {
  window.MathJax.typeset()
})
</script>

<template>
  <!-- MOBILE NAVBAR -->
  <nav class="navbar" id="mobile-nav"
    :style="!sidebar ? 'display:none;' : 'z-index:1;animation:fadein 1s forwards;position:fixed;width:100%;left:0;background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);'">
    <a href="#mobile-menu" role="button" style="margin-left:15px;" data-bs-toggle="offcanvas">
      <span class="navbar-toggler-icon"></span>
    </a>

    <span style="font-size:0.98rem;margin-right:auto;margin-left:20px;">The AntiMatter Lab</span>
    <img src="/favicon.png" width="25" height="25" class="d-inline-block me-3 rounded-1">

  </nav>

  <!-- START OF MOBILE SIDEBAR -->
  <div class="sidebar offcanvas offcanvas-start" id="mobile-menu">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 align-items-center" style="height: 50px">
      <a class="sidebar-brand mx-auto" href="javascript:void(0);"
        @click="Window.scrollTo(0, 0); user.current = 'landing'; hideMobileBar()">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
      </a>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="closeMenu"></button>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 justify-content-center p-0">
      <div @click="lessonShowing = true; hideMobileBar(); Window.scrollTo(0, 0)"
        :class="lessonShowing ? 'sidebarTab col border-end border-secondary border-opacity-25 p-2 bg-secondary-subtle' : 'sidebarTab col border-end border-secondary border-opacity-25 p-2'">
        Lessons</div>
      <div @click="lessonShowing = false; hideMobileBar(); Window.scrollTo(0, 0)"
        :class="lessonShowing ? 'sidebarTab col p-2' : 'sidebarTab col p-2 bg-secondary-subtle'">Problems</div>
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
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Kinematics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.kinematics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Circular Motion and Gravitation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Energy</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Momentum</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Rotation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.rotation">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Oscillations</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.oscillations">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Fluid Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.fluids">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-1 pt-1 border-top border-secondary border-opacity-25">
      <div class="row justify-content-center" style="margin-bottom:1px">
        <div class="col-6">
          <h6 class="sidebar-header">Adjust Math Level</h6>
          <select style="width: 140px;" class="mx-auto p-2 my-1 form-select" id="levelSelect" v-model="user.difficulty" @change="hideMobileBar()">
            <option value="0">Conceptual</option>
            <option value="1">Algebra-Based</option>
            <option value="2">Calculus-Based</option>
          </select>
        </div>
        <div class="col-4">
          <h6 class="sidebar-header">Theme</h6>
          <select style="width: 70px;" class="mx-auto p-2 my-1 form-select" id="themeSelect" v-model="user.theme" @change="hideMobileBar()">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span class="text-secondary-emphasis">© 2024 The AntiMatter Lab</span><br style="margin-bottom:2px">
      <a href="javascript:void(0);" @click="Window.scrollTo(0, 0); user.current=lessons.basics[0]; hideMobileBar()"
        class="link-offset-1 info-link">About Us</a>&emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="link-offset-1 info-link" @click="hideMobileBar()">Github</a>
    </div>
  </div>

  <!-- START OF NORMAL SIDEBAR -->
  <div class="sidebar offcanvas-start offcanvas-md" id="menu"
    :style="sidebar ? 'animation: slideRight 0.3s forwards' : ''">
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25">
      <a class="sidebar-brand mx-auto" href="javascript:void(0);"
        @click="Window.scrollTo(0, 0); user.current = 'landing'">
        <img src="/favicon.png" width="24" height="24" class="d-inline-block align-text-top rounded-1">
        The AntiMatter Lab
      </a>
    </div>
    <div class="offcanvas-header border-bottom border-secondary border-opacity-25 justify-content-center p-0">
      <div @click="lessonShowing = true; Window.scrollTo(0, 0)"
        :class="lessonShowing ? 'sidebarTab col border-end border-secondary border-opacity-25 p-2 bg-secondary-subtle' : 'sidebarTab col border-end border-secondary border-opacity-25 p-2'">
        Lessons</div>
      <div @click="lessonShowing = false; Window.scrollTo(0, 0)"
        :class="lessonShowing ? 'sidebarTab col p-2' : 'sidebarTab col p-2 bg-secondary-subtle'">Problems</div>
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
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson; hideMobileBar()">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Kinematics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.kinematics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.dynamics">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Circular Motion and Gravitation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.circularGravity">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Energy</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.energy">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Momentum</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.momentum">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>


        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Rotation</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.rotation">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Oscillations</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.oscillations">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>

        <br class="mb-5">
        <li>
          <h6 class="sidebar-header"><b>Fluid Dynamics</b></h6>
        </li>
        <li>
          <hr class="sidebar-divider">
        </li>
        <li v-for="lesson in filteredLessons.fluids">
          <a href="javascript:void(0);" :class="user.current === lesson ? 'text-body-emphasis nav-link' : 'nav-link'"
            :style="user.current === lesson ? 'text-decoration: underline' : ''"
            @click="Window.scrollTo(0, 0); user.current = lesson">{{
              lesson }}</a>
        </li>

      </ul>
    </div>
    <div class="offcanvas-footer mb-3 pt-2 border-top border-secondary border-opacity-25">
      <div class="row justify-content-center mb-2">
        <div class="col-6">
          <h6 class="sidebar-header">Adjust Math Level</h6>
          <select style="width: 140px;" class="mx-auto p-2 my-2 form-select" id="levelSelect" v-model="user.difficulty">
            <option value="0">Conceptual</option>
            <option value="1">Algebra-Based</option>
            <option value="2">Calculus-Based</option>
          </select>
        </div>
        <div class="col-4">
          <h6 class="sidebar-header">Theme</h6>
          <select style="width: 70px;" class="mx-auto p-2 my-2 form-select" id="themeSelect" v-model="user.theme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <span class="text-secondary-emphasis">© 2024 The AntiMatter Lab</span><br style="margin-bottom:10px">
      <a href="javascript:void(0);" @click="Window.scrollTo(0, 0); user.current=lessons.basics[0]"
        class="link-offset-1 info-link">About Us</a>&emsp;
      <a href="https://github.com/Edward358-AI/The-AntiMatter-Lab" target="_blank"
        class="link-offset-1 info-link">Github</a>
    </div>
  </div>

  <Welcome v-if="user.current === 'landing'" :sidebar="sidebar" @show-sidebar="sidebar = true; getCurrentPage()" @show-about="user.current=lessons.basics[0]"/>

  <About v-if="user.current === lessons.basics[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.About" @nextpage="Window.scrollTo(0, 0); user.page.About++"
    @prevpage="Window.scrollTo(0, 0); user.page.About--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.basics[1]; user.page.About = 0" />
  <GettingStarted v-if="user.current === lessons.basics[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.GettingStarted" @nextpage="Window.scrollTo(0, 0); user.page.GettingStarted++"
    @prevpage="Window.scrollTo(0, 0); user.page.GettingStarted--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.basics[2]; user.page.GettingStarted = 0" />
  <Algebra v-if="user.current === lessons.basics[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Algebra" @nextpage="Window.scrollTo(0, 0); user.page.Algebra++"
    @prevpage="Window.scrollTo(0, 0); user.page.Algebra--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.basics[3]; user.page.Algebra = 0" />
  <MetricPrefix v-if="user.current === lessons.basics[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.metricPrefix" @nextpage="Window.scrollTo(0, 0); user.page.metricPrefix++"
    @prevpage="Window.scrollTo(0, 0); user.page.metricPrefix--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.basics[4]; user.page.metricPrefix = 0" />
  <Trig v-if="user.current === lessons.basics[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Trig" @nextpage="Window.scrollTo(0,0); user.page.Trig++"
    @prevpage="Window.scrollTo(0, 0); user.page.Trig--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[0]; user.page.Trig = 0" />

  <Vectors v-if="user.current === lessons.kinematics[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Vectors" @nextpage="Window.scrollTo(0, 0); user.page.Vectors++"
    @prevpage="Window.scrollTo(0, 0); user.page.Vectors--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[1]; user.page.Vectors = 0" />
  <DimenAnalyz v-if="user.current === lessons.kinematics[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.DimenAnalyz" @nextpage="Window.scrollTo(0, 0); user.page.DimenAnalyz++"
    @prevpage="Window.scrollTo(0, 0); user.page.DimenAnalyz--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[2]; user.page.DimenAnalyz = 0" />
  <PosVelAcc v-if="user.current === lessons.kinematics[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.PosVelAcc" @nextpage="Window.scrollTo(0, 0); user.page.PosVelAcc++"
    @prevpage="Window.scrollTo(0, 0); user.page.PosVelAcc--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[3]; user.page.PosVelAcc = 0" />
  <OneDMotion v-if="user.current === lessons.kinematics[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.OneDMotion" @nextpage="Window.scrollTo(0, 0); user.page.OneDMotion++"
    @prevpage="Window.scrollTo(0, 0); user.page.OneDMotion--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[4]; user.page.OneDMotion = 0" />
  <TwoDMotion v-if="user.current === lessons.kinematics[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.TwoDMotion" @nextpage="Window.scrollTo(0, 0); user.page.TwoDMotion++"
    @prevpage="Window.scrollTo(0, 0); user.page.TwoDMotion--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.kinematics[5]; user.page.TwoDMotion = 0" />
  <RelativeVel v-if="user.current === lessons.kinematics[5]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.RelativeVel" @nextpage="Window.scrollTo(0, 0); user.page.RelativeVel++"
    @prevpage="Window.scrollTo(0, 0); user.page.RelativeVel--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[0]; user.page.RelativeVel = 0" />

  <Newton v-if="user.current === lessons.dynamics[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Newton" @nextpage="Window.scrollTo(0, 0); user.page.Newton++"
    @prevpage="Window.scrollTo(0, 0); user.page.Newton--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[1]; user.page.Newton = 0" />
  <OtherForces v-if="user.current === lessons.dynamics[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.OtherForces" @nextpage="Window.scrollTo(0, 0); user.page.OtherForces++"
    @prevpage="Window.scrollTo(0, 0); user.page.OtherForces--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[2]; user.page.OtherForces = 0" />
  <FmaFBD v-if="user.current === lessons.dynamics[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.FmaFBD" @nextpage="Window.scrollTo(0, 0); user.page.FmaFBD++"
    @prevpage="Window.scrollTo(0, 0); user.page.FmaFBD--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[3]; user.page.FmaFBD = 0" />
  <InclinedPlanes v-if="user.current === lessons.dynamics[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.InclinedPlanes" @nextpage="Window.scrollTo(0, 0); user.page.InclinedPlanes++"
    @prevpage="Window.scrollTo(0, 0); user.page.InclinedPlanes--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.dynamics[4]; user.page.InclinedPlanes = 0" />
  <Spring v-if="user.current === lessons.dynamics[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Spring" @nextpage="Window.scrollTo(0, 0); user.page.Spring++"
    @prevpage="Window.scrollTo(0, 0); user.page.Spring--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[0]; user.page.Spring = 0" />

  <Centripetal v-if="user.current === lessons.circularGravity[0]" :level="user.difficulty"
    :lessonShowing="lessonShowing" :page="user.page.Centripetal"
    @nextpage="Window.scrollTo(0, 0); user.page.Centripetal++"
    @prevpage="Window.scrollTo(0, 0); user.page.Centripetal--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[1]; user.page.Centripetal = 0" />
  <Fictious v-if="user.current === lessons.circularGravity[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Fictious" @nextpage="Window.scrollTo(0, 0); user.page.Fictious++"
    @prevpage="Window.scrollTo(0, 0); user.page.Fictious--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[2]; user.page.Fictious = 0" />
  <GravityLaws v-if="user.current === lessons.circularGravity[2]" :level="user.difficulty"
    :lessonShowing="lessonShowing" :page="user.page.GravityLaws"
    @nextpage="Window.scrollTo(0, 0); user.page.GravityLaws++"
    @prevpage="Window.scrollTo(0, 0); user.page.GravityLaws--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.circularGravity[3]; user.page.GravityLaws" />
  <Kepler v-if="user.current === lessons.circularGravity[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Kepler" @nextpage="Window.scrollTo(0, 0); user.page.Kepler++"
    @prevpage="Window.scrollTo(0, 0); user.page.Kepler--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[0]; user.page.Kepler = 0" />

  <DotProd v-if="user.current === lessons.energy[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.DotProd" @nextpage="Window.scrollTo(0, 0); user.page.DotProd++"
    @prevpage="Window.scrollTo(0, 0); user.page.DotProd--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[1]; user.page.DotProd = 0" />
  <Work v-if="user.current === lessons.energy[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Work" @nextpage="Window.scrollTo(0, 0); user.page.Work++"
    @prevpage="Window.scrollTo(0, 0); user.page.Work--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[2]; user.page.Work = 0" />
  <Energy v-if="user.current === lessons.energy[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Energy" @nextpage="Window.scrollTo(0, 0); user.page.Energy++"
    @prevpage="Window.scrollTo(0, 0); user.page.Energy--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[3]; user.page.Energy = 0" />
  <EqTypes v-if="user.current === lessons.energy[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.EqTypes" @nextpage="Window.scrollTo(0, 0); user.page.EqTypes++"
    @prevpage="Window.scrollTo(0, 0); user.page.EqTypes--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[4]; user.page.EqTypes = 0" />
  <Power v-if="user.current === lessons.energy[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Power" @nextpage="Window.scrollTo(0, 0); user.page.Power++"
    @prevpage="Window.scrollTo(0, 0); user.page.Power--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.energy[5]; user.page.Power = 0" />
  <GravEnergy v-if="user.current === lessons.energy[5]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.GravEnergy" @nextpage="Window.scrollTo(0, 0); user.page.GravEnergy++"
    @prevpage="Window.scrollTo(0, 0); user.page.GravEnergy--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[0]; user.page.GravEnergy = 0" />

  <Impulse v-if="user.current === lessons.momentum[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Impulse" @nextpage="Window.scrollTo(0, 0); user.page.Impulse++"
    @prevpage="Window.scrollTo(0, 0); user.page.Impulse--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[1]; user.page.Impulse = 0" />
  <LinMomConsrv v-if="user.current === lessons.momentum[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.LinMomConsrv" @nextpage="Window.scrollTo(0, 0); user.page.LinMomConsrv++"
    @prevpage="Window.scrollTo(0, 0); user.page.LinMomConsrv--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[2]; user.page.LinMomConsrv = 0" />
  <CenterOfMass v-if="user.current === lessons.momentum[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.CenterOfMass" @nextpage="Window.scrollTo(0, 0); user.page.CenterOfMass++"
    @prevpage="Window.scrollTo(0, 0); user.page.CenterOfMass--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[3]; user.page.CenterOfMass = 0" />
  <Collisions v-if="user.current === lessons.momentum[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Collisions" @nextpage="Window.scrollTo(0, 0); user.page.Collisions++"
    @prevpage="Window.scrollTo(0, 0); user.page.Collisions--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.momentum[4]; user.page.Collisions = 0" />
  <Explosions v-if="user.current === lessons.momentum[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Explosions" @nextpage="Window.scrollTo(0, 0); user.page.Explosions++"
    @prevpage="Window.scrollTo(0, 0); user.page.Explosions--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[0]; user.page.Explosions = 0" />

  <RotationalKinematics v-if="user.current === lessons.rotation[0]" :level="user.difficulty"
    :lessonShowing="lessonShowing" :page="user.page.RotationalKinematics"
    @nextpage="Window.scrollTo(0, 0); user.page.RotationalKinematics++"
    @prevpage="Window.scrollTo(0, 0); user.page.RotationalKinematics--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[1]; user.page.RotationalKinematics = 0" />
  <Torque v-if="user.current === lessons.rotation[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Torque" @nextpage="Window.scrollTo(0, 0); user.page.Torque++"
    @prevpage="Window.scrollTo(0, 0); user.page.Torque--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[2]; user.page.Torque = 0" />
  <MomentInertia v-if="user.current === lessons.rotation[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.MomentInertia" @nextpage="Window.scrollTo(0, 0); user.page.MomentInertia++"
    @prevpage="Window.scrollTo(0, 0); user.page.MomentInertia--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[3]; user.page.MomentInertia = 0" />
  <RotationalDynamics v-if="user.current === lessons.rotation[3]" :level="user.difficulty"
    :lessonShowing="lessonShowing" :page="user.page.RotationalDynamics"
    @nextpage="Window.scrollTo(0, 0); user.page.RotationalDynamics++"
    @prevpage="Window.scrollTo(0, 0); user.page.RotationalDynamics--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[4]; user.page.RotationalDynamics = 0" />
  <Rolling v-if="user.current === lessons.rotation[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Rolling" @nextpage="Window.scrollTo(0, 0); user.page.Rolling++"
    @prevpage="Window.scrollTo(0, 0); user.page.Rolling--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.rotation[5]; user.page.Rolling = 0" />
  <AngMomentum v-if="user.current === lessons.rotation[5]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.AngMomentum" @nextpage="Window.scrollTo(0, 0); user.page.AngMomentum++"
    @prevpage="Window.scrollTo(0, 0); user.page.AngMomentum--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.oscillations[0]; user.page.AngMomentum = 0" />

  <SHM v-if="user.current === lessons.oscillations[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.SHM" @nextpage="Window.scrollTo(0, 0); user.page.SHM++"
    @prevpage="Window.scrollTo(0, 0); user.page.SHM--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.oscillations[1]; user.page.SHM = 0" />
  <SpringOsc v-if="user.current === lessons.oscillations[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.SpringOsc" @nextpage="Window.scrollTo(0, 0); user.page.SpringOsc++"
    @prevpage="Window.scrollTo(0, 0); user.page.SpringOsc--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.oscillations[2]; user.page.SpringOsc = 0" />
  <Pendulum v-if="user.current === lessons.oscillations[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Pendulum" @nextpage="Window.scrollTo(0, 0); user.page.Pendulum++"
    @prevpage="Window.scrollTo(0, 0); user.page.Pendulum--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.oscillations[3]; user.page.Pendulum = 0" />
  <OtherOsc v-if="user.current === lessons.oscillations[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.OtherOsc" @nextpage="Window.scrollTo(0, 0); user.page.OtherOsc++"
    @prevpage="Window.scrollTo(0, 0); user.page.OtherOsc--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.fluids[0]; user.page.OtherOsc = 0" />

  <FluidIntro v-if="user.current === lessons.fluids[0]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.FluidIntro" @nextpage="Window.scrollTo(0, 0); user.page.FluidIntro++"
    @prevpage="Window.scrollTo(0, 0); user.page.FluidIntro--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.fluids[1]; user.page.FluidIntro = 0" />
  <Pressure v-if="user.current === lessons.fluids[1]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Pressure" @nextpage="Window.scrollTo(0, 0); user.page.Pressure++"
    @prevpage="Window.scrollTo(0, 0); user.page.Pressure--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.fluids[2]; user.page.Pressure = 0" />
  <FluidFlow v-if="user.current === lessons.fluids[2]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.FluidFlow" @nextpage="Window.scrollTo(0, 0); user.page.FluidFlow++"
    @prevpage="Window.scrollTo(0, 0); user.page.FluidFlow--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.fluids[3]; user.page.FluidFlow = 0" />
  <Bernoulli v-if="user.current === lessons.fluids[3]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.Bernoulli" @nextpage="Window.scrollTo(0, 0); user.page.Bernoulli++"
    @prevpage="Window.scrollTo(0, 0); user.page.Bernoulli--"
    @nextlesson="Window.scrollTo(0, 0); user.current = lessons.fluids[4]; user.page.Bernoulli = 0" />
  <AirResistance v-if="user.current === lessons.fluids[4]" :level="user.difficulty" :lessonShowing="lessonShowing"
    :page="user.page.AirResistance" @nextpage="Window.scrollTo(0, 0); user.page.AirResistance++"
    @prevpage="Window.scrollTo(0, 0); user.page.AirResistance--"
    @nextlesson="Window.scrollTo(0, 0); user.current = 'landing'; user.page.AirResistance = 0" />

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