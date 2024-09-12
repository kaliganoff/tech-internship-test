import { endpoint } from "../consts/consts";

export default async function getAllAds() {
  try {
    const response = await fetch(`${endpoint}/advertisements`);
    const ads = await response.json();
    return ads;
  } catch (error) {
    alert(error);
  }
}
