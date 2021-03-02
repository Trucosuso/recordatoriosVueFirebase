<template>
    <footer class="the-footer container-fluid text-center bg-secondary">
        <span class="text-white">Creado por
            <a
                class="text-white"
                href="https://github.com/Trucosuso"
                target="_blank"
            >Trucosuso</a></span>
    </footer>
</template>

<script>
export default {
    name: "TheFooter",
    props: [],
    data() {
        return {
            datos: []
        };
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.the-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    background-color: #f5f5f5;
}
</style>
