<template>
    <section class="contenedor-notas">
        <b-container>
            <b-row>
                <b-form
                    class="w-100"
                    @submit.stop.prevent
                >
                    <b-form-group
                        id="formGroupNuevaNota"
                        label="Nueva nota:"
                        label-for="textoNuevaNota"
                        description="Introduce el texto de la nueva nota"
                    >
                        <b-form-input
                            id="textoNuevaNota"
                            v-model="nuevaNota"
                            type="text"
                            @keyup.enter="anadirNota"
                        />
                    </b-form-group>
                </b-form>
            </b-row>
            <b-row>
                <b-form
                    class="w-100"
                    @submit.stop.prevent
                >
                    <b-form-group
                        id="formGroupFiltroNota"
                        label="Filtrar notas:"
                        label-for="filtroNota"
                        description="Introduce el texto para buscar en las notas"
                    >
                        <b-form-input
                            id="filtroNota"
                            v-model="filtroNota"
                            type="text"
                        />
                    </b-form-group>
                </b-form>
            </b-row>
            <Nota
                v-for="nota in listaOrdenada"
                :key="nota.fechaCreacion.toString()"
                :dato-nota="nota"
                :nota-a-editar="notaAEditar"
                @borrarNota="borrarNota"
                @iniciarEdicion="iniciarEdicion"
                @cancelarEdicion="cancelarEdicion"
                @terminarEdicion="terminarEdicion"
                @notaEditada="notaEditada"
            />
        </b-container>
    </section>
</template>

<script>
import Nota from "./Nota.vue";

export default {
    name: "ContenedorNotas",
    components: {
        Nota
    },
    props: [],
    data() {
        return {
            listaNotas: [],
            nuevaNota: "",
            notaAEditar: null,
            filtroNota: ""
        };
    },
    computed: {
        listaFiltrada: function() {
            if (this.filtroNota) {
                return this.listaNotas.filter(nota => {
                    return nota.titulo.indexOf(this.filtroNota) != -1;
                });
            } else {
                return this.listaNotas;
            }
        },
        listaOrdenada: function() {
            let listaOrdenada = this.listaFiltrada;
            return listaOrdenada.sort((a, b) => {
                if (a.fechaCreacion < b.fechaCreacion) {
                    return 1;
                } else if (a.fechaCreacion > b.fechaCreacion) {
                    return -1;
                }
                return 0;
            });
        }
    },
    mounted() {
        if (localStorage.listaNotas) {
            this.listaNotas = JSON.parse(localStorage.listaNotas);
        }
    },
    methods: {
        actualizarLocalStorage: function() {
            localStorage.listaNotas = JSON.stringify(this.listaNotas);
        },
        anadirNota: function() {
            this.listaNotas.push({
                titulo: this.nuevaNota,
                prioridad: 0,
                fechaCreacion: Date.now(),
                completado: false
            });
            this.nuevaNota = "";
            this.actualizarLocalStorage();
        },
        borrarNota: function(fechaCreacion) {
            let posicion = this.listaNotas.findIndex(
                nota => nota.fechaCreacion == fechaCreacion
            );
            this.listaNotas.splice(posicion, 1);
            this.actualizarLocalStorage();
        },
        iniciarEdicion: function(date) {
            this.notaAEditar = date;
        },
        cancelarEdicion: function() {
            this.notaAEditar = null;
        },
        terminarEdicion: function() {
            this.cancelarEdicion();
            this.actualizarLocalStorage();
        },
        notaEditada: function() {
            this.actualizarLocalStorage();
        }
    }
};
</script>

<style scoped>
.contenedor-notas {
    margin: 1rem;
}
</style>
