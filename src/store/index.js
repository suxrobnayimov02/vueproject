import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./app";
import auth from "./auth";

export default new Vuex.Store({
  state: {
    WishList: {}
  },
  app,
  auth
});