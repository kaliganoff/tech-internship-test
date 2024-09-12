import { Box, Button, Flex } from "@chakra-ui/react";
import { Order } from "../../types/types";
import { useState } from "react";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { statusNames } from "../../consts/consts";
import finishOrder from "../../services/finishOrder";

export default function OrderCard({
  order,
  update,
}: {
  order: Order;
  update: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id, status, createdAt, items, total } = order;
  const [isHidden, setIsHidden] = useState(true);

  function HandleFinish() {
    finishOrder(id);
    update((prev) => !prev);
  }

  return (
    <Box bg={'rosybrown'} border={'1px solid black'} borderRadius={'1%'} padding={'.5em .5em'}>
      <p>Номер: {id}</p>
      <p>Количество товаров: {items.length}</p>
      <p>Стоимость: {total}</p>
      <p>Дата создания: {createdAt}</p>
      <p>Статус: {statusNames[status]}</p>
      <Flex gap={'.5em'}>
        <Button onClick={() => HandleFinish()}>Завершить</Button>
        <Button onClick={() => setIsHidden((prev) => !prev)}>
          Показать товары
        </Button>
      </Flex>
      {isHidden
        ? ""
        : items.map((item) => <OrderItemCard item={item} key={item.id} />)}
    </Box>
  );
}
