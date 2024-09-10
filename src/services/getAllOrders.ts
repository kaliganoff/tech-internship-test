import { endpoint } from "../consts/consts";

export default async function getAllOrders() {
  const response = await fetch(`${endpoint}/orders`);
  const orders = await response.json();
  console.log(orders);
  return orders;
}
