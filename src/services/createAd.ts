import { endpoint } from "../consts/consts";

export default async function createAd(
  imageUrl: string,
  name: string,
  description: string,
  price: string,
) {
  try {
  fetch(`${endpoint}/advertisements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      imageUrl: imageUrl,
      description: description,
    }),
  });
} catch (error) {
  alert(error);
}
}
