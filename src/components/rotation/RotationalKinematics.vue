<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Rotational Kinematics</h1><br>
        <p>
            <div v-show="page===0">
                This unit might feel familiar, and that's because it will be! We are essentially taking in all the concepts we've covered previously 
                and turning them into their <b>angular</b> (rotational) analogues. We've mostly dealt with linear motion before, but this unit is 
                dedicated to things that rotate.
                <br><br>
                First, there's one important term that needs to be defined. The idea of a <b>rigid body</b> is one that rotates evenly. While a rigid body that 
                rotates is moving with a different speed at each point on the object, the shape of the object needs to be preserved for it to be a rigid body.
                This rotation unit only deals with rigid bodies, and the results we'll find don't really apply to non-rigid bodies.
                <br><br>
                With that said, we can jump into rotational kinematics. This is just like regular kinematics, but for rotating objects. At the beginning 
                of this course, we talked about position, velocity, and acceleration.
            </div>
        </p>
    </div>
</template>

<style scoped>

</style>