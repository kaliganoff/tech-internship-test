import { Box, Image } from "@chakra-ui/react";
import { OrderItem } from "../../types/types";
import { Link } from "react-router-dom";

export default function OrderItemCard({ item } :{ item: OrderItem}) {
  const { id, name, price, views, likes, imageUrl, count } = item;

  return (
    <Link to={`/ads/${id}`}>
      <Box>
        <Image boxSize="100px" src={imageUrl} alt={name} />
        <p>{name}</p>
        <p>Цена: {price}</p>
        <p>Просмотры: {views}</p>
        <p>Лайки: {likes}</p>
        <p>Количество: {count}</p>
      </Box>
    </Link>
  );
}
