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

export const getItem = (id) => ({
  title: "Bicycle",
  price: 100.29,
  desc:
    "Newly worked-on, mint bike!!!11!!11! Super awesome deal right here omg",
  lngLat: [-120.45, 35.38],
  imgUrl:
    "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
  id: "asdbcs",
});
