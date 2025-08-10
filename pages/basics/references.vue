<script setup>

useHead({
    title: 'Index/Glossary',
    meta: [
        { name: 'description', content: 'A comprehensive index of useful information, frequently used math symbols, and SI units.' }
    ]
})

import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Index

watch(page, () => window.scrollTo(0,0))
</script>

<template>
    <div class="container h100 p-5">
        <h1>Index/Glossary</h1><br>
        <p>
            This is a comprehrensive index of useful physical data, frequently used math symbols and SI units that you will see a lot through physics. This is not a complete list, but it will only cover those that are most relevant to the content in this course.</p><br><br><h4 class="text-center">Frequently Used Math Symbols</h4><p>
            <span>&bull; $=$ - equal to</span><br>
            <span>&bull; $\neq$ - not equal to</span><br>
            <span>&bull; $\propto$ - proportional to</span><br>
            <span>&bull; $>$ - greater than</span><br>
            <span>&bull; $<$ - less than</span><br>
            <span>&bull; $\approx$ - approximately equal to</span><br>
            <span>&bull; $|x|$ - absolute value of $x$ (always a positive quantity)</span><br>
            <span>&bull; $\Delta$ - change in, or difference in a variable (for example, $\Delta t$, which would denote change in time)</span><br>
            <span>&bull; $\Sigma$ - sum, or net</span><br>
        </p><br><br>
        <h4 class="text-center">Frequently Used SI Units</h4>
        <p>
            <span>&bull; $\textrm{m}$ - meter, the SI unit of length</span><br>
            <span>&bull; $\textrm{kg}$ - kilogram, the SI unit of mass</span><br>
            <span>&bull; $\textrm{s}$ - second, SI unit of time</span><br>
            <span>&bull; $\textrm{K}$ - kelvin, SI unit of temperature</span><br>
            <span>&bull; $\textrm{N}=\textrm{kg}\cdot\frac{\textrm{m}}{\textrm{s}^2}$ - newton, SI unit of force</span><br>
            <span>&bull; $\textrm{J}=\textrm{kg}\cdot\frac{\textrm{m}^2}{\textrm{s}^2}$ - joule, SI unit of energy</span><br>
            <span>&bull; $\textrm{W}=\frac{\textrm{J}}{s}$ - watt, SI unit of power</span><br>
            <span>&bull; $\textrm{Pa}=\frac{\textrm{kg}}{\textrm{m} \cdot \textrm{s}^2}$ - pascal, SI unit of pressure</span><br>
          <span>&bull; $\textrm{rad}$ - radian, SI unit of plane angle measure ($\frac{180}{\pi} \cdot \textrm{radians} = \textrm{degrees}$)</span></p>
            <h4>Additional Derived Units</h4><p>
            <span>&bull; Velocity - $\dfrac{\textrm{m}}{\textrm{s}}$</span><br>
            <span>&bull; Acceleration - $\dfrac{\textrm{m}}{\textrm{s}^2}$</span><br>
            <span>&bull; Impulse/Momentum - $\textrm{N} \cdot \textrm{s} = \textrm{kg} \cdot \dfrac{\textrm{m}}{\textrm{s}}$</span><br>
            <span>&bull; Angular Velocity - $\dfrac{\textrm{rad}}{\textrm{s}}$</span><br>
            <span>&bull; Angular Acceleration - $\dfrac{\textrm{rad}}{\textrm{s}^2}$</span><br>
            <span>&bull; Torque - $\textrm{N} \cdot \textrm{m} = \textrm{kg} \cdot \dfrac{\textrm{m}^2}{\textrm{s}^2}$</span><br>
            <span>&bull; Density - $\dfrac{\textrm{kg}}{\textrm{m}^3}$</span><br>
            </p>
        <div class="btn-contain-right">
            <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/kinematics/vectors">Next
                Unit! &rarr;</NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>