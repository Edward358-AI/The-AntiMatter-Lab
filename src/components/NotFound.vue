<template>
    <div id="welcome" class="px-3">
        <img src="/logo.png" style="max-width: 210px;" width="45%" class="rounded" />
        <h1>404 - Not Found</h1>
        <p>The page you are looking for could not be found. Return to our homepage: <RouterLink to="/">Home</RouterLink></p>
    </div>
</template>

<style scoped>
#welcome {
    margin: auto;
    padding-top: 55px;
    animation: fadein 1.5s;
    transition: 0.5s;
}

#welcome img {
    margin-bottom: 20px;
}
</style>
