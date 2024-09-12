import { endpoint } from "../consts/consts";

export default async function getAllOrders(
  status: string,
  sortByPrice: string,
) {
  try {
  const response = await fetch(
    `${endpoint}/orders?status=${status}&_sort=${sortByPrice}`,
  );
  const orders = await response.json();
  return orders;
} catch (error) {
  alert(error);
}
}
