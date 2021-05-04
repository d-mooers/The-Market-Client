import axios from "axios";
import config from "../../config.json";

const BASE_URL = config.api_base.development;
const ITEMS = "items";

export const getItems = async () => {
  const url = `${BASE_URL}${ITEMS}`;
  try {
    const resp = await axios.get(url);
    console.log(resp.data.listings);
    return {
      success: resp.status === 200,
      listings: resp.data.listings,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};

export const getItem = async (id) => {
  const url = `${BASE_URL}${ITEMS}/${id}`;
  try {
    const resp = await axios.get(url);
    return {
      success: resp.status === 200,
      item: resp.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};
