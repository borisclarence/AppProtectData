import Vue from "vue";
import Vuex from "vuex";
import merchants from "./modules/merchants";
import users from "./modules/users";
import partners from "./modules/partners";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    merchants,
    users,
    partners,
  },
});
