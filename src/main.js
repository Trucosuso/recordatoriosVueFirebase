import Vue from "vue"
import App from "./App.vue"

// Add bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Use bootstrap and bootstrap icons
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

// eslint-disable-next-line vue/require-name-property
new Vue({
  render: h => h(App),
}).$mount("#app")
