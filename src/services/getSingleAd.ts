import { endpoint } from "../consts/consts";

export default async function getSingleAd(id: string | undefined) {
  const response = await fetch(`${endpoint}/advertisements/${id}`);
  const ad = await response.json();
  console.log(ad);
  return ad;
}
