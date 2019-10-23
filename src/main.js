import Vue from "vue";
import router from "./router";
import VeeValidate from "vee-validate";
import App from "./App.vue";

import "./plugins/vuetify";
import "./registerServiceWorker";
import VueTouch from "vue-touch";
import VueMouseParallax from "vue-mouse-parallax";

Vue.use(VueTouch, { name: "v-touch" });
Vue.use(VueMouseParallax);
Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.config.performance = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
