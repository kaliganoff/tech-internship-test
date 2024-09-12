import { Box, Button } from "@chakra-ui/react";
import { Order } from "../../types/types";
import { useState } from "react";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { statusNames } from "../../consts/consts";

export default function OrderCard({ order }: { order: Order }) {
  const { id, status, createdAt, items, total } = order;
  const [isHidden, setIsHidden] = useState(true);

  return (
    <Box>
      <p>Номер: {id}</p>
      <p>Количество товаров: {items.length}</p>
      <p>Стоимость: {total}</p>
      <p>Дата создания: {createdAt}</p>
      <p>Статус: {statusNames[status]}</p>
      <Button>Завершить</Button>
      <Button onClick={() => setIsHidden((prev) => !prev)}>
        Показать товары
      </Button>
      {isHidden ? "" : items.map((item) => OrderItemCard(item))}
    </Box>
  );
}
