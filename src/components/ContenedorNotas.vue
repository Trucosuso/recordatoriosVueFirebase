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
                :key="nota.id"
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
import { db } from "../db.js";
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
            notaAEditar: "",
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
    mounted() {},
    methods: {
        anadirNota: function() {
            db.collection("notas").add({
                titulo: this.nuevaNota,
                prioridad: 0,
                fechaCreacion: Date.now(),
                completado: false
            });
            this.nuevaNota = "";
        },
        borrarNota: function(id) {
            db.collection("notas").doc(id).delete();
        },
        iniciarEdicion: function(id) {
            this.notaAEditar = id;
        },
        cancelarEdicion: function() {
            this.notaAEditar = "";
        },
        terminarEdicion: function(nota) {
            this.cancelarEdicion();
            this.notaEditada(nota);
        },
        notaEditada: function(nota) {
            db.collection("notas")
                .doc(nota.id)
                .update({
                    titulo: nota.titulo,
                    prioridad: nota.prioridad,
                    completado: nota.completado
                })
                .then(() => {
                    console.log("Nota actualizada a " + nota.titulo + "con prioridad " + nota.prioridad);
                });
        }
    },
    firestore: {
        listaNotas: db.collection("notas"),
    },
};
</script>

<style scoped>
.contenedor-notas {
    margin: 1rem;
}
</style>
