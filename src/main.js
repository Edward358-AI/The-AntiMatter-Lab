import { createApp, onMounted, watch } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { createWebHistory, createRouter } from 'vue-router'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import Sidebar from './components/Sidebar.vue'
import Home from './components/Home.vue'
import Main from './Main.vue'
import NotFound from './components/NotFound.vue'

import About from './components/basics/About.vue'
import Algebra from './components/basics/Algebra.vue'
import GettingStarted from './components/basics/GettingStarted.vue'
import MetricPrefix from './components/basics/MetricPrefix.vue'
import Trig from './components/basics/Trig.vue'
import Index from './components/basics/Index.vue'

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
import AngMomentum from './components/rotation/AngMomentum.vue'

import SHM from './components/oscillations/SHM.vue'
import SpringOsc from './components/oscillations/SpringOsc.vue'
import Pendulum from './components/oscillations/Pendulum.vue'
import OtherOsc from './components/oscillations/OtherOsc.vue'

import FluidIntro from './components/fluids/FluidIntro.vue'
import Pressure from './components/fluids/Pressure.vue'
import FluidFlow from './components/fluids/FluidFlow.vue'
import AirResistance from './components/fluids/AirResistance.vue'
import Bernoulli from './components/fluids/Bernoulli.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'The AntiMatter Lab' }, name: "Home" },
  { path: '/about', component: About, meta: { title: 'About Us' }, name: "About Us" },
  { path: '/algebra', component: Algebra, meta: { title: 'Basic Algebra' }, name: "Basic Algebra" },
  { path: '/getting-started', component: GettingStarted, meta: { title: 'Getting Started' }, name: "Getting Started" },
  { path: '/metric-prefix', component: MetricPrefix, meta: { title: 'Metric Prefixes' }, name: "Metric Prefixes" },
  { path: '/trig', component: Trig, meta: { title: 'Trigonometry' }, name: "Trigonometry" },
  { path: '/index', component: Index, meta: { title: 'Index/Glossary' }, name: "Index/Glossary" },
  { path: '/vectors', component: Vectors, meta: { title: 'Vectors' }, name: "Vectors" },
  { path: '/position-velocity-acceleration', component: PosVelAcc, meta: { title: 'Position, Velocity, Acceleration' }, name: "Position, Velocity, Acceleration" },
  { path: '/dimensional-analysis', component: DimenAnalyz, meta: { title: 'Dimensional Analysis' }, name: "Dimensional Analysis" },
  { path: '/one-dimensional-motion', component: OneDMotion, meta: { title: 'One-Dimensional Motion/Free fall' }, name: "One-Dimensional Motion/Free fall" },
  { path: '/two-dimensional-motion', component: TwoDMotion, meta: { title: 'Two-Dimensional Motion/Projectile Motion' }, name: "Two-Dimensional Motion/Projectile Motion" },
  { path: '/relative-velocity', component: RelativeVel, meta: { title: 'Relative Velocity' }, name: "Relative Velocity" },
  { path: '/inclined-planes', component: InclinedPlanes, meta: { title: 'Inclined Planes and Pulleys' }, name: "Inclined Planes and Pulleys" },
  { path: '/newton-laws', component: Newton, meta: { title: "Newton's Laws" }, name: "Newton's Laws" },
  { path: '/other-forces', component: OtherForces, meta: { title: 'Forces' }, name: "Forces" },
  { path: '/fma-fbd', component: FmaFBD, meta: { title: 'F=ma and Free-body Diagrams' }, name: "F=ma and Free-body Diagrams" },
  { path: '/spring', component: Spring, meta: { title: 'Spring Forces' }, name: "Spring Forces" },
  { path: '/centripetal', component: Centripetal, meta: { title: 'Centripetal Force/Acceleration' }, name: "Centripetal Force/Acceleration" },
  { path: '/fictious-forces', component: Fictious, meta: { title: 'Fictitious Forces' }, name: "Fictitious Forces" },
  { path: '/gravity-laws', component: GravityLaws, meta: { title: "Newton's Law of Universal Gravitation" }, name: "Newton's Law of Universal Gravitation" },
  { path: '/kepler', component: Kepler, meta: { title: "Kepler's Laws" }, name: "Kepler's Laws" },
  { path: '/collisions', component: Collisions, meta: { title: 'Collisions' }, name: "Collisions" },
  { path: '/impulse', component: Impulse, meta: { title: 'Impulse/Momentum Theorem' }, name: "Impulse/Momentum Theorem" },
  { path: '/linear-momentum-conservation', component: LinMomConsrv, meta: { title: 'Conservation of Linear Momentum' }, name: "Conservation of Linear Momentum" },
  { path: '/explosions', component: Explosions, meta: { title: 'Explosions' }, name: "Explosions" },
  { path: '/center-of-mass', component: CenterOfMass, meta: { title: 'Center of Mass' }, name: "Center of Mass" },
  { path: '/dot-product', component: DotProd, meta: { title: 'Dot Product' }, name: "Dot Product" },
  { path: '/energy', component: Energy, meta: { title: 'Definition of Energy and Energy Conservation' }, name: "Definition of Energy and Energy Conservation" },
  { path: '/power', component: Power, meta: { title: 'Definition of Power' }, name: "Definition of Power" },
  { path: '/work', component: Work, meta: { title: 'Definition of "Work"' }, name: 'Definition of "Work"' },
  { path: '/gravitational-energy', component: GravEnergy, meta: { title: 'Universal Gravitational Potential Energy' }, name: "Universal Gravitational Potential Energy" },
  { path: '/equilibrium-types', component: EqTypes, meta: { title: 'Types of Equilibrium' }, name: "Types of Equilibrium" },
  { path: '/rotational-kinematics', component: RotationalKinematics, meta: { title: 'Rotational Kinematics' }, name: "Rotational Kinematics" },
  { path: '/torque', component: Torque, meta: { title: 'Torque' }, name: "Torque" },
  { path: '/moment-of-inertia', component: MomentInertia, meta: { title: 'Moment of Inertia' }, name: "Moment of Inertia" },
  { path: '/rotational-dynamics', component: RotationalDynamics, meta: { title: 'Rotational Dynamics' }, name: "Rotational Dynamics" },
  { path: '/rolling', component: Rolling, meta: { title: 'Rolling Without Slipping' }, name: "Rolling Without Slipping" },
  { path: '/angular-momentum-energy', component: AngMomentum, meta: { title: 'Rotational Kinetic Energy and Angular Momentum' }, name: "Rotational Kinetic Energy and Angular Momentum" },
  { path: '/simple-harmonic-motion', component: SHM, meta: { title: 'Simple Harmonic Motion' }, name: "Simple Harmonic Motion" },
  { path: '/spring-oscillations', component: SpringOsc, meta: { title: 'Spring-Block Oscillators' }, name: "Spring-Block Oscillators" },
  { path: '/pendulum', component: Pendulum, meta: { title: 'Pendulums' }, name: "Pendulums" },
  { path: '/other-oscillations', component: OtherOsc, meta: { title: 'Other Oscillators' }, name: "Other Oscillators" },
  { path: '/fluidintro', component: FluidIntro, meta: { title: 'Properties of Fluids' }, name: "Properties of Fluids" },
  { path: '/pressure', component: Pressure, meta: { title: 'Pressure' }, name: "Pressure" },
  { path: '/flow', component: FluidFlow, meta: { title: 'Fluid Flow' }, name: "Fluid Flow" },
  { path: '/air-resistance', component: AirResistance, meta: { title: 'Air Resistance and Drag' }, name: "Air Resistance and Drag" },
  { path: '/bernoulli', component: Bernoulli, meta: { title: "Bernoulli's Principle" }, name: "Bernoulli's Principle" },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: '404 - Not Found' } } // Redirect to NotFound component for unmatched routes
]

const pinia = createPinia()
pinia.use(createPersistedState())

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(Main)
app.component('Sidebar', Sidebar)
app.use(router)
app.use(pinia)
app.mount('#app')

// Prevent dragging of images
window.addEventListener('dragstart', (e) => {
  if (e.target.nodeName === 'IMG') e.preventDefault()
})