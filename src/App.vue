<template>
    <div id="app">
        <TheHeader />
        <ContenedorNotas />
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import ContenedorNotas from "./components/ContenedorNotas.vue";

export default {
    name: "App",
    components: {
        TheHeader,
        TheFooter,
        ContenedorNotas
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
