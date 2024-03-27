/**
 * API MODE
 */

const MODE_API = 1; //mode = 1
const MODE_API_NO_EXPENSE = 2; // mode = 2
const MODE_STANDALONE = 0;

/**
 * URL API
 */
const BASE_URL = process.env.VUE_APP_URL;

/**
 * URL DOCUMENT
 */
const URL_DOCUMENT = process.env.VUE_APP_URL_DOCUMENT;

/**
 * API KEY
 */
const API_KEY = process.env.VUE_APP_APIKEY;

export {
  MODE_API,
  MODE_API_NO_EXPENSE,
  MODE_STANDALONE,
  BASE_URL,
  URL_DOCUMENT,
  API_KEY,
};
