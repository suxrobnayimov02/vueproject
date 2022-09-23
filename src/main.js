/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import locale from "element-ui/lib/locale/lang/uz-UZ";
import VueMask from "v-mask";
import VueI18n from 'vue-i18n';
import Index from "@/mixins/index";
import "./plugins/apex-chart";
import "../src/assets/css/style.css";
import '@/assets/scss/main.scss'
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(VueI18n)
Vue.use(VueMask);
Vue.mixin(Index);

Vue.directive('eluppercase', {
  update(el) {
    el.children[0].value = el.children[0].value.toUpperCase()
  }
})
Vue.directive('uppercase', {
  update(el) {
    el.value = el.value.toUpperCase()
  }
})

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(ElementUI, { locale });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
