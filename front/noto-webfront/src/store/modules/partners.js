import { authEnrollement } from "../../api/Enrollement";

//const actions
export const GET_DYNAMIC_TOKEN = "GET_DYNAMIC_TOKEN";
export const RESET_PARTNER_DATA = "RESET_PARTNER_DATA";

//const mutations
export const SET_DYNAMIC_TOKEN = "SET_DYNAMIC_TOKEN";
export const SET_DATA_PARTNER_RESETED = "SET_DATA_PARTNER_RESETED";

const state = {
  token_dynamic: {},
};

//getters
const getters = {
  /**
   *
   * @param {*} state
   * @returns token infos with authorization to access front
   */
  displayDynamicToken: (state) => {
    return state.token_dynamic;
  },
};

//actions
const actions = {
  /**
   *
   * @param {*} commit
   * @param {*} {token, mode}
   * @returns data to authorize user to access front
   */
  async [GET_DYNAMIC_TOKEN]({ commit }, { token, mode }) {
    const auth = await authEnrollement(token, mode);

    commit("SET_DYNAMIC_TOKEN", auth);

    return auth;
  },

  /**
   *
   * @param {*} commit
   * Reset cache data store for patner
   */
  async [RESET_PARTNER_DATA]({ commit }) {
    commit(SET_DATA_PARTNER_RESETED, {});
  },
};

//mutations
const mutations = {
  [SET_DYNAMIC_TOKEN]: (state, value) => {
    state.token_dynamic = value;
  },
  [SET_DATA_PARTNER_RESETED]: (state, value) => {
    state.token_dynamic = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
