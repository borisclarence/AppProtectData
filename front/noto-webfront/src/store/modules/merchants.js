import { merchants } from "../../api/Merchants";

//const actions
export const GET_MERCHANTS = "GET_MERCHANTS";
export const CHECK_CATEGORIES = "CHECK_CATEGORIES";

//const mutations
export const SET_MERCHANTS = "SET_MERCHANTS";

export const SET_ALL_MERCHANTS_SELECTED = "SET_ALL_MERCHANTS_SELECTED";
export const SET_MERCHANTS_SELECTED = "SET_MERCHANTS_SELECTED";
export const CLEAR_MERCHANTS_SELECTED = "CLEAR_MERCHANTS_SELECTED";

export const SET_MERCHANTS_CHECKED = "SET_MERCHANTS_CHECKED";

const state = {
  listCategories: [],
  listMerchantsCategory: [],
  listMerchants: [],
  groupMerchants: [],
  merchantsSelected: [],
  keepChecked: false,
};

//getters
const getters = {
  /**
   *
   * @param {*} state
   * @returns list merchants  and keep data on store
   */
  displayMerchants: (state) => {
    return state.listMerchants;
  },

  /**
   *
   * @param {*} state
   * @returns list of category merchant (verify if is not used)
   */
  displayMerchantGroup: (state) => {
    return state.groupMerchants;
  },

  /**
   *
   * @param {*} state
   * @returns boolean of merchants (verify if is not used)
   */
  displayKeepChecked: (state) => {
    return state.keepChecked;
  },

  /**
   *
   * @param {*} state
   * @returns list of merchants selected (verify if is not used)
   */
  displayMerchantsSelected: (state) => {
    return state.merchantsSelected;
  },
};

//actions
const actions = {
  /**
   *
   * @param {*} commit
   * @param {*} token
   * @returns list of merchants
   */
  async [GET_MERCHANTS]({ commit }, { token }) {
    const allMerchants = await merchants(token);

    commit("SET_MERCHANTS", allMerchants);

    return allMerchants;
  },
};

//mutations
const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} listMerchants
   */
  [SET_MERCHANTS]: (state, listMerchants) => {
    state.listMerchants = listMerchants;
  },

  /**
   *
   * @param {*} state (verify if is not used)
   */
  [SET_ALL_MERCHANTS_SELECTED]: (state) => {
    state.merchantsSelected = [];

    state.groupMerchants.forEach((merchant) => {
      if (merchant.checked) {
        merchant.listMerchantsByGroup.forEach((merchantCategory) => {
          if (merchantCategory.checked) {
            state.merchantsSelected.push(merchantCategory.id);
          }
        });
      }
    });
  },

  /**
   *
   * @param {*} state (verify if is not used)
   */
  [CLEAR_MERCHANTS_SELECTED]: (state) => {
    state.merchantsSelected = [];
  },

  /**
   *
   * @param {*} state
   * @param {*} selected (verify if is not used)
   */
  [SET_MERCHANTS_SELECTED]: (state, selected) => {
    if (
      state.merchantsSelected.filter((merchantId) => merchantId === selected)
        .length === 0
    ) {
      state.merchantsSelected.push(selected);
    }
  },

  /**
   *
   * @param {*} state
   * @param {*} selected (verify if is not used)
   */
  [SET_MERCHANTS_CHECKED]: (state, selected) => {
    if (
      state.merchantsSelected.filter((merchantId) => merchantId === selected)
        .length === 0
    ) {
      state.merchantsSelected.push(selected);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
