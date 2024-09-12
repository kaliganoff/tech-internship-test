import { endpoint } from "../consts/consts";

export default async function getAllOrders(
  status: string,
  sortByPrice: string,
) {
  const response = await fetch(
    `${endpoint}/orders?status=${status}&_sort=${sortByPrice}`,
  );
  const orders = await response.json();
  console.log(orders);
  return orders;
}
