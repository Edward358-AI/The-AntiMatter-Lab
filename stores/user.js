import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const difficulty = ref(0)
  const theme = ref("dark")
  const Algebra = ref(0)
  const About = ref(0)
  const GettingStarted = ref(0)
  const metricPrefix = ref(0)
  const Trig = ref(0)
  const Index = ref(0)
  const Vectors = ref(0)
  const DimenAnalyz = ref(0)
  const PosVelAcc = ref(0)
  const OneDMotion = ref(0)
  const TwoDMotion = ref(0)
  const RelativeVel = ref(0)
  const FmaFBD = ref(0)
  const Spring = ref(0)
  const InclinedPlanes = ref(0)
  const OtherForces = ref(0)
  const Newton = ref(0)
  const Kepler = ref(0)
  const GravityLaws = ref(0)
  const Centripetal = ref(0)
  const Fictitious = ref(0)
  const DotProd = ref(0)
  const Energy = ref(0)
  const GravEnergy = ref(0)
  const Power = ref(0)
  const Work = ref(0)
  const EqTypes = ref(0)
  const Collisions = ref(0)
  const Impulse = ref(0)
  const LinMomConsrv = ref(0)
  const CenterOfMass = ref(0)
  const Explosions = ref(0)
  const RotationalKinematics = ref(0)
  const Torque = ref(0)
  const MomentInertia = ref(0)
  const RotationalDynamics = ref(0)
  const Rolling = ref(0)
  const AngMomentum = ref(0)
  const SHM = ref(0)
  const SpringOsc = ref(0)
  const Pendulum = ref(0)
  const OtherOsc = ref(0)
  const FluidIntro = ref(0)
  const Pressure = ref(0)
  const FluidFlow = ref(0)
  const AirResistance = ref(0)
  const Bernoulli = ref(0)
  const ElectricCharge = ref(0)
  const CoulombsLaw = ref(0)
  const ElectricFields = ref(0)
  const GaussLaw = ref(0)

  return {
    difficulty,
    theme,
    Algebra,
    About,
    GettingStarted,
    metricPrefix,
    Trig,
    Index,
    Vectors,
    DimenAnalyz,
    PosVelAcc,
    OneDMotion,
    TwoDMotion,
    RelativeVel,
    FmaFBD,
    Spring,
    InclinedPlanes,
    OtherForces,
    Newton,
    Kepler,
    GravityLaws,
    Centripetal,
    Fictitious,
    DotProd,
    Energy,
    GravEnergy,
    Power,
    Work,
    EqTypes,
    Collisions,
    Impulse,
    LinMomConsrv,
    CenterOfMass,
    Explosions,
    RotationalKinematics,
    Torque,
    MomentInertia,
    RotationalDynamics,
    Rolling,
    AngMomentum,
    SHM,
    SpringOsc,
    Pendulum,
    OtherOsc,
    FluidIntro,
    Pressure,
    FluidFlow,
    AirResistance,
    Bernoulli,
    ElectricCharge,
    CoulombsLaw,
    ElectricFields,
    GaussLaw
  }
}, { persist: true })