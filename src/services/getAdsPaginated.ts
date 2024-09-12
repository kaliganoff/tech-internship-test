import { endpoint } from "../consts/consts";

export default async function getAdsPaginated(
  page: number,
  itemsPerPage: number,
) {
  try {
  const response = await fetch(
    `${endpoint}/advertisements?_start=${(page - 1) * itemsPerPage}&_limit=${itemsPerPage}`,
  );
  const ads = await response.json();
  return ads;
} catch(error) {
  alert(error)
}
}
