<template>
    <div id="app">
        <TheHeader />
        <router-view />
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
    name: "App",
    components: {
        TheHeader,
        TheFooter,
    }
};
</script>

<style>
html {
    position: relative;
    min-height: 100%;
}
#app {
    margin-bottom: 5rem;
}
</style>
