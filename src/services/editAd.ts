import { endpoint } from "../consts/consts";

export default async function editAd(
  id: string | undefined,
  imageUrl: string | undefined,
  name: string,
  description: string | undefined,
  price: string,
) {
  try {
  fetch(`${endpoint}/advertisements/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description,
    }),
  });
} catch(error) {
  alert(error);
}
}
