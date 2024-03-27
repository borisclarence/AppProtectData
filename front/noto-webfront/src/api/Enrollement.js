import axios from "axios";
import { BASE_URL, API_KEY } from "../assets/js/constants.js";

/**
 * Return object for access partner
 */
export async function authEnrollement(token, mode) {
  let response = await axios({
    method: "post",
    headers: {
      Authorization: API_KEY,
      "X-LOCALE": window.navigator.language,
    },
    url: BASE_URL + `/webfront/enrollment/authentication`,

    data: {
      token,
      mode,
    },
  });

  if (response.status !== 200) {
    return response.data;
  }

  return response.data;
}
