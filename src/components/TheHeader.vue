<template>
    <b-jumbotron
        class="the-header"
        tag="header"
        fluid
        header="Recordatorios"
        lead="Anota tus recordatorios y asignales importancia. Haz click sobre el texto para marcarlo como completado"
        bg-variant="dark"
        text-variant="light"
    />
</template>

<script>
export default {
    name: "TheHeader",
    props: [],
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.the-header h1 {
    word-wrap: break-word;
}
</style>
