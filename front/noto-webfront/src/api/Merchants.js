import axios from "axios";
import { BASE_URL, API_KEY } from "../assets/js/constants.js";
import { parsingArrayForAccordion } from "../assets/js/scripts";

/**
 * Return list merchants
 */
export async function merchants(token) {
  let merchants;

  merchants = await axios({
    method: "get",
    headers: {
      Authorization: API_KEY,
      "used-token": token,
    },
    url: BASE_URL + `/merchant/all`,
  });

  return parsingArrayForAccordion(merchants.data);
}
