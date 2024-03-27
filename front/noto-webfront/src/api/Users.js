import axios from "axios";
import { BASE_URL, API_KEY } from "../assets/js/constants.js";

import { addEmptyField } from "../assets/js/scripts";

/**
 * Return message to confirm if user form is valid or not
 */
export async function clientVerification(
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
) {
  let response;

  response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
      "X-LOCALE": window.navigator.language,
    },
    url: BASE_URL + `/webfront/client/form/verify`,
    data: {
      firstname,
      lastname,
      birthdate,
      email: addEmptyField(email),
      phone: addEmptyField(phone),
      emailOthers: addEmptyField(emailOthers),
      phoneOthers: addEmptyField(phoneOthers),
      checkboxUser: checkboxUser ?? false,
      checkboxMerchants: checkboxMerchants ?? false,
      mode,
    },
  });

  return {
    message: response.data.message,
    status: response.data.authorization,
    field: response.data.field ?? null,
    content: response.data.content ?? null,
  };
}

/**
 * Return url for document signing
 */
export async function signDocuments(user, list_merchants, token, mode) {
  let response;

  response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
      "X-LOCALE": window.navigator.language,
    },
    url: BASE_URL + `/webfront/enrollment/form-treatment`,

    data: {
      firstname: user.firstname,
      lastname: user.lastname,
      birthdate: user.birthdate,
      email: user.email,
      status: addEmptyField(user.status),
      emailOthers: addEmptyField(user.emailOthers),
      phone: addEmptyField(user.phone),
      phoneOthers: addEmptyField(user.phoneOthers),
      type_demand: "Demande de portabilité",
      merchant_selected: list_merchants,

      //Add token To create client
      token: token,
      mode: mode,
    },
  });

  if (response.status !== 200) {
    return response.data;
  }

  return response.data;
}

/**
 * Return status of current envelop signed
 */
export async function getEnvelopeStatus(envelopeId, accountId) {
  let response;

  response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url: BASE_URL + `/webfront/docusign/envelope-status`,
    data: {
      envelopeId,
      accountId,
    },
  });

  return response.data;
}
