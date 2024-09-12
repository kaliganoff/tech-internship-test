import { endpoint } from "../consts/consts";

export default async function getAllAds() {
  const response = await fetch(`${endpoint}/advertisements`);
  const ads = await response.json();
  return ads;
}
