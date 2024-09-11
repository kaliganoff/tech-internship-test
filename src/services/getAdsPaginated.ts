import { endpoint } from "../consts/consts";

export default async function getAdsPaginated(page: number, itemsPerPage: number) {
  const response = await fetch(`${endpoint}/advertisements?_start=${(page - 1) * itemsPerPage}&_limit=${itemsPerPage}`);
  const ads = await response.json();
  console.log(ads);
  return ads;
}
