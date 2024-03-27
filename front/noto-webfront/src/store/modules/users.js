import {
  signDocuments,
  getEnvelopeStatus,
  clientVerification,
} from "../../api/Users";
import {
  codeVerificationSmsAndEmail,
  codeVerificationSms,
  codeVerificationEmail,
  codeValidationSmsAndEmail,
  checkStatusSmsAndEmail,
} from "../../api/Confirmation";

//const actions
export const SIGN_MANDATS = "SIGN_MANDATS";
export const GET_ENVELOPE_STATUS = "GET_ENVELOPE_STATUS";
export const GET_USER_VERIFICATION = "GET_USER_VERIFICATION";

export const RESET_USER_DATA = "RESET_USER_DATA";

export const GET_SMS_AND_MAIL = "GET_SMS_AND_MAIL";
export const GET_SMS_CODE = "GET_SMS_CODE";
export const GET_EMAIL_CODE = "GET_EMAIL_CODE";
export const VALIDATE_CODES = "VALIDATE_CODES";
export const CHECK_STATUS_SMS_AND_MAIL = "CHECK_STATUS_SMS_AND_MAIL";

//const mutations
export const SET_URL_SIGN = "SET_URL_SIGN";
export const SET_USER = "SET_USER";
export const SET_ENVELOPE = "SET_ENVELOPE";
export const SET_STATUT_ENVELOPE = "SET_STATUT_ENVELOPE";
export const SET_USER_VERIFICATION = "SET_USER_VERIFICATION";

export const SET_DATA_RESETED = "SET_DATA_RESETED";
export const SET_COUNTER = "SET_COUNTER";

export const SET_SMS_AND_MAIL = "SET_SMS_AND_MAIL";
export const SET_SMS_CODE = "SET_SMS_CODE";
export const SET_EMAIL_CODE = "SET_EMAIL_CODE";
export const SET_VALIDATE_CODES = "SET_VALIDATE_CODES";
export const SET_STATUS_SMS_AND_MAIL = "SET_STATUS_SMS_AND_MAIL";

const state = {
  user: {
    firstname: "",
    lastname: "",
    birthdate: "",
    email_adress: "",
    phone: "",
    otherEmails: "",
    otherMobiles: "",
    listMerchantSelected: [],
    code_sms: "",
    code_email: "",
    status: "",
  },
  userInfo: {},
  url_sign: "",
  envelope_infos: {},
  envelope_status: "",
  info_verif: {},
  verif_info_code: {},
  validatedCode: {},
  statusSmsAndEmail: {},
  counter: 0,
};

//getters
const getters = {
  /**
   *
   * @param {*} state
   * @returns user infos when edit user has filled form of edit user
   */
  displayUser: (state) => {
    return state.user;
  },

  /**
   *
   * @param {*} state
   * @returns email info to check if field has correctly filled form edit user (non used)
   */
  displayUserByEmail: (state) => {
    return state.userInfo;
  },

  /**
   *
   * @param {*} state
   * @returns envelop docusign infos of used for onboarding complete
   */
  displayEnvelopeInfos: (state) => {
    return state.envelope_infos;
  },

  /**
   *
   * @param {*} state
   * @returns infos code sms and email for codeConfirmation
   */
  displayVerifInfoCode: (state) => {
    return state.verif_info_code;
  },

  /**
   *
   * @param {*} state
   * @returns infos status sms and email for code confirmation (non used)
   */
  displayStatusSmsAndEmail: (state) => {
    return state.verif_info_code;
  },

  /**
   *
   * @param {*} state
   * @returns data with status of code confirmation validated
   */
  displayValidatedCode: (state) => {
    return state.validatedCode;
  },
  displayCounter: (state) => {
    return state.counter;
  },
};

//actions
const actions = {
  /**
   *
   * @param {*} commit, state, rootState
   * @param {*} list_merchants, token, mode
   * @returns infos (url) to sign document
   */
  async [SIGN_MANDATS](
    { commit, state, rootState },
    { list_merchants, token, mode }
  ) {
    state.user.listMerchantSelected = rootState.merchants.merchantsSelected;

    state.user.status = state.validatedCode.status;
    state.user.code_sms = state.validatedCode.code_sms;
    state.user.code_email = state.validatedCode.code_email;

    const { urlSign, envelopeId, accountId, authorization, message } =
      await signDocuments(state.user, list_merchants, token, mode);

    commit(SET_URL_SIGN, urlSign);

    commit(SET_ENVELOPE, { envelopeId, accountId });

    return { urlSign, status: authorization, message };
  },

  /**
   *
   * @param {*} commit
   * @param {*} envelopeId, accountId
   * @returns infos envelopes
   */
  async [GET_ENVELOPE_STATUS]({ commit }, { envelopeId, accountId }) {
    const { statusEnvelope } = await getEnvelopeStatus(envelopeId, accountId);

    commit(SET_STATUT_ENVELOPE, statusEnvelope);

    return statusEnvelope;
  },

  /**
   * 
   * @param {*} commit 
   * @param {*} {firstname,
      lastname,
      birthdate,
      email,
      phone,
      emailOthers,
      phoneOthers,
      checkboxUser,
      checkboxMerchants,
      mode,} 
   * Verify information form editUser 
   */
  async [GET_USER_VERIFICATION](
    { commit },
    {
      firstname,
      lastname,
      birthdate,
      email,
      phone,
      emailOthers,
      phoneOthers,
      checkboxUser,
      checkboxMerchants,
      mode,
    }
  ) {
    const { message, status, field, content } = await clientVerification(
      firstname,
      lastname,
      birthdate,
      email,
      phone,
      emailOthers,
      phoneOthers,
      checkboxUser,
      checkboxMerchants,
      mode
    );

    commit(SET_USER_VERIFICATION, { message, status, field, content });

    return { message, status, field, content };
  },

  /**
   *
   * @param {*} commit
   * @param {*} toSms, toEmail
   * @returns infos code confirmation (code sms, code email)
   */
  async [GET_SMS_AND_MAIL]({ commit }, { toSms, toEmail }) {
    const response = await codeVerificationSmsAndEmail(toSms, toEmail);

    commit(SET_SMS_AND_MAIL, response);

    return response;
  },

  /**
   *
   * @param {*} commit
   * @param {*} toSms, toEmail
   * @returns information code sms
   */
  async [GET_SMS_CODE]({ commit }, { toSms, toEmail }) {
    const response = await codeVerificationSms(toSms, toEmail);

    commit(SET_SMS_CODE, response);

    return response;
  },

  /**
   *
   * @param {*} commit
   * @param {*} toSms, toEmail
   * @returns information code email
   */
  async [GET_EMAIL_CODE]({ commit }, { toSms, toEmail }) {
    const response = await codeVerificationEmail(toSms, toEmail);

    commit(SET_EMAIL_CODE, response);

    return response;
  },

  /**
   *
   * @param {*} commit
   * @param {*} toSms, toEmail
   * Validate code confirmation
   */
  async [VALIDATE_CODES]({ commit }, { toSms, toEmail, codeSms, codeEmail }) {
    const response = await codeValidationSmsAndEmail(
      toSms,
      toEmail,
      codeSms,
      codeEmail
    );

    commit(SET_VALIDATE_CODES, response);

    return response;
  },

  /**
   *
   * @param {*} commit
   * @param {*} {toSms, toEmail, token, mode}
   * @returns status of infos user (if email and phone are verified or not)
   */
  async [CHECK_STATUS_SMS_AND_MAIL](
    { commit },
    { toSms, toEmail, token, mode }
  ) {
    const response = await checkStatusSmsAndEmail(toSms, toEmail, token, mode);

    commit(SET_STATUS_SMS_AND_MAIL, response);

    return response;
  },

  /**
   *
   * @param {*} commit
   * Reset cache data for edit user form
   */
  async [RESET_USER_DATA]({ commit }) {
    commit(SET_DATA_RESETED, {});
  },
};

//mutations
const mutations = {
  [SET_USER]: (state, value) => {
    state.user = value;
  },

  [SET_URL_SIGN]: (state, value) => {
    state.url_sign = value;
  },

  [SET_ENVELOPE]: (state, value) => {
    state.envelope_infos = value;
  },
  [SET_STATUT_ENVELOPE]: (state, value) => {
    state.envelope_status = value;
  },
  [SET_USER_VERIFICATION]: (state, value) => {
    state.info_verif = value;
  },

  [SET_SMS_AND_MAIL]: (state, value) => {
    state.verif_info_code = value;
  },

  [SET_SMS_CODE]: (state, value) => {
    state.verif_info_code.CodeSms = value;
  },

  [SET_EMAIL_CODE]: (state, value) => {
    state.verif_info_code.CodeEmail = value;
  },

  [SET_VALIDATE_CODES]: (state, value) => {
    state.validatedCode = value;
  },

  [SET_STATUS_SMS_AND_MAIL]: (state, value) => {
    state.statusSmsAndEmail = value;
  },

  [SET_DATA_RESETED]: (state, value) => {
    state.user = value;
  },

  [SET_COUNTER]: (state, value) => {
    state.counter = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
