<template>
    <b-container
        tag="section"
        class="login-screen"
    >
        <b-row class="mb-3">
            <b-col>
                <h2>Inicia sesión para acceder a tus notas</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col
                class="mb-3"
                cols="12"
                md="6"
            >
                <b-button
                    class="w-100"
                    size="lg"
                    @click="iniciarSesionGoogle"
                >
                    <b-icon
                        icon="google"
                        class="mr-3"
                    />Iniciar sesión con
                    Google
                </b-button>
            </b-col>
            <b-col
                class="mb-3"
                cols="12"
                md="6"
            >
                <b-button
                    class="w-100"
                    size="lg"
                    @click="iniciarSesionGithub"
                >
                    <b-icon
                        icon="github"
                        class="mr-3"
                    />Iniciar sesión con
                    Github
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Firebase from "../db.js";

export default {
    name: "LoginScreen",
    props: [],
    data() {
        return {
            user: {
                loggedIn: false,
                data: {},
            },
        };
    },
    computed: {},
    mounted() {
        Firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                this.user.loggedIn = true;
                this.user.data = user;
                if (this.$route.path != "/notas") {
                    this.$router.push("/notas");
                }
            } else {
                this.user.loggedIn = false;
                this.user.data = {};
            }
        });
    },
    methods: {
        iniciarSesionGoogle: function () {
            Firebase.login("google");
        },
        iniciarSesionGithub: function () {
            Firebase.login("github");
        }
    }
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
    .login-screen {
        max-width: 720px;
    }

    .login-screen h2 {
        text-align: center;
    }
}
</style>
