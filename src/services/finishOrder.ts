import { endpoint } from "../consts/consts";

export default async function finishOrder(id: string) {
  const response = await fetch(
    `${endpoint}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            status: 5,
            finishedAt: new Date().toISOString(),
        }),
      }
  );
  const orders = await response.json();
  console.log(orders);
  return orders;
}
