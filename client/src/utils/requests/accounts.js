import axios from "axios";
import config from "../../config.json";

const BASE_URL = config.api_base.development;
const USERS = "users";

export const removeAccount = async (accId) => {
  const url = `${BASE_URL}${USERS}/${accId}`;
  try {
    const resp = await axios.delete(url);
    console.log(resp);
    return {
      success: resp.status === 204,
    };
  } catch (e) {
    return {
      success: false,
      data: e.data,
    };
  }
};
