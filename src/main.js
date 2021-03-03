import Vue from "vue"
import App from "./App.vue"

// Add bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Use bootstrap and bootstrap icons
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Add firestore from vuefire
import { firestorePlugin } from "vuefire";

// Use firestore
Vue.use(firestorePlugin);


// Add Vue Router
import VueRouter from "vue-router"

// Use Vue Router
Vue.use(VueRouter)

// Import components to use in routes
import ContenedorNotas from "./components/ContenedorNotas.vue";
Vue.component(ContenedorNotas);
import LoginScreen from "./components/LoginScreen.vue";
Vue.component(LoginScreen);

const routes = [
    { path: "/", component: LoginScreen },
    { path: "/notas", component: ContenedorNotas, meta: { requiresAuth: false } },
];

const router = new VueRouter({
    routes,
});

// Check if the user us authenticated to allow access to todos
import Firebase from "./db.js"
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Firebase.auth.currentUser) {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
})


Vue.config.productionTip = false

// eslint-disable-next-line vue/require-name-property
new Vue({
    render: h => h(App),
    router,
}).$mount("#app")
