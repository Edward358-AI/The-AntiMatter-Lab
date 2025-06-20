<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Fictitious Forces</h1><br>
        <p>
            <div v-show="page===0">
                Remember the centrifugal force from earlier? Well, I said that it doesn’t exist, but it does in a mathematical sense. 
                For an observer at rest, it does not exist, but the observer actually going in a circle experiences it. If you've ever been
                on that one carnival ride that I don't know the name of, you know what I'm talking about.
                These are what are called fictitious forces and exist in non-inertial (accelerated) reference frames.
                <br><br>
                The overall idea behind these is that the $ma$ in $F_{net}=ma$ is treated as a force like any other. 
                For instance, you feel a force pushing you into the seat when you accelerate in a car. 
                This is not actually a force pushing back, but your inertia resisting the attempt to accelerate your body 
                (Newton’s first law!). It is also oppositely directed to the actual acceleration of the object. This might be 
                a bit confusing, but think of the times when you've felt a force pushing you back into the car seat when someone hits the
                gas pedal (even though the car is accelerating forward). Again, I want to emphasize that this force technically
                does not actually exist and is sometimes compared to an "invisible hand". However, when you consider your reference frame this force is very
                real (after all, you feel it!) and equal to $ma$.
                <br><br>
                 Some people have reservations against working with such forces since they do not exist, but I feel this is 
                 restrictive. After all, fictitious forces can be very helpful in some calculations, the simplest being elevator 
                 problems.
                <br><br>
                <figure>

                </figure>


            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            
            
        </p>
    </div>

</template>


<style scoped>

</style>