import axios from "axios";
import { BASE_URL, API_KEY } from "../assets/js/constants.js";

/**
 * Return status to approve access sms and email
 */
export async function checkStatusSmsAndEmail(toSms, toEmail, token, mode) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url:
      // Retirer les query params et les mettre dans le body
      BASE_URL +
      `/webfront/check/status/verification?token=${token}&mode=${mode}`,

    data: {
      toSms,
      toEmail,
    },
  });

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  return response.data;
}

/**
 * Return object for access sms and email code
 */
export async function codeVerificationSmsAndEmail(toSms, toEmail) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url: BASE_URL + `/webfront/email/verification`,

    data: {
      toSms,
      toEmail,
    },
  });

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  return response.data;
}

/**
 * Return object for access sms code
 */
export async function codeVerificationSms(toSms, toEmail) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url: BASE_URL + `/webfront/resend/sms/verification`,

    data: {
      toSms,
      toEmail,
      //Ajouter email: toEmail
    },
  });

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  return response.data;
}

/**
 * Return object for access email code
 */
export async function codeVerificationEmail(toSms, toEmail) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url: BASE_URL + `/webfront/resend/email/verification`,

    data: {
      toSms,
      toEmail,
    },
  });

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  return response.data;
}

/**
 * Return object for validate sms and email code
 */
export async function codeValidationSmsAndEmail(
  toSms,
  toEmail,
  codeSms,
  codeEmail
) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
    },
    url: BASE_URL + `/webfront/update/status/verification`,

    data: {
      toSms,
      toEmail,
      codeSms,
      codeEmail,
    },
  });

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  return response.data;
}
