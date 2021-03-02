<template>
    <b-row class="nota mt-2 mb-3">
        <b-col
            cols="12"
            md="8"
        >
            <b-row
                align-v="center"
                class="mb-2"
            >
                <b-col
                    cols="10"
                    md="11"
                    order-md="1"
                >
                    <b-input
                        v-if="notaAEditar === datoNota.fechaCreacion"
                        v-model="datoNota.titulo"
                        type="text"
                        @keyup.enter="terminarEdicion"
                    />
                    <p
                        v-else
                        class="nota-texto m-0"
                        :class="{ completado: datoNota.completado }"
                        @click="cambiarCompletado"
                    >
                        {{ datoNota.titulo }}
                    </p>
                </b-col>
                <b-col
                    cols="2"
                    md="1"
                    class="text-center p-0"
                    order-md="0"
                >
                    <b-button
                        v-b-tooltip.topleft="{ variant: prioridadVariante }"
                        :title="'Prioridad ' + prioridadATexto"
                        :variant="'outline-' + prioridadVariante"
                        class="priority-icon"
                        :disabled="datoNota.completado"
                        @click="cambiarPrioridad"
                    >
                        <b-icon
                            :icon="'reception' + prioridadIcono"
                            class="align-center"
                        />
                    </b-button>
                </b-col>
            </b-row>
        </b-col>

        <b-col
            cols="12"
            md="4"
            class="d-flex justify-content-start justify-content-md-end"
        >
            <b-button
                v-if="notaAEditar === datoNota.fechaCreacion"
                @click="cancelarEdicion"
            >
                Cancelar
            </b-button>
            <b-button
                v-else
                variant="outline-dark"
                :disabled="datoNota.completado"
                @click="iniciarEdicion"
            >
                Editar
            </b-button>
            <b-button
                class="ml-2"
                variant="outline-danger"
                @click="borrarNota"
            >
                Borrar
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: "Nota",
    props: {
        datoNota: {
            type: Object,
            default: function() {
                return {
                    titulo: "",
                    prioridad: 0,
                    fechaCreacion: 0,
                    completado: false
                };
            }
        },
        notaAEditar: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tituloBackup: ""
        };
    },
    computed: {
        prioridadATexto: function() {
            switch (this.datoNota.prioridad) {
                case 0:
                    return "baja";
                case 1:
                    return "media";
                case 2:
                    return "alta";
                default:
                    return "máxima";
            }
        },
        prioridadVariante: function() {
            switch (this.datoNota.prioridad) {
                case 0:
                    return "dark";
                case 1:
                    return "success";
                case 2:
                    return "warning";
                default:
                    return "danger";
            }
        },
        prioridadIcono: function() {
            return this.datoNota.prioridad + 1;
        }
    },
    mounted() {},
    methods: {
        borrarNota: function() {
            this.$emit("borrarNota", this.datoNota.fechaCreacion);
        },
        iniciarEdicion: function() {
            this.tituloBackup = this.datoNota.titulo;
            this.$emit("iniciarEdicion", this.datoNota.fechaCreacion);
        },
        cancelarEdicion: function() {
            this.datoNota.titulo = this.tituloBackup;
            this.$emit("cancelarEdicion");
        },
        terminarEdicion: function() {
            this.$emit("terminarEdicion");
        },
        cambiarPrioridad: function() {
            if (this.datoNota.prioridad >= 3) {
                this.datoNota.prioridad = 0;
            } else {
                this.datoNota.prioridad++;
            }
            this.$emit("notaEditada");
        },
        cambiarCompletado: function() {
            this.datoNota.completado = !this.datoNota.completado;
            this.$emit("notaEditada");
        }
    }
};
</script>

<style scoped>
.nota-texto {
    padding: 0.43rem;
    cursor: pointer;
}

.completado {
    text-decoration: line-through;
}
</style>
