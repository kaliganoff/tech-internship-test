import { useEffect, useState } from "react";
import getAllOrders from "../../services/getAllOrders";
import { Box, Select, SimpleGrid, Spinner } from "@chakra-ui/react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { Order } from "../../types/types";
import { statusNames } from "../../consts/consts";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortStatus, setSortStatus] = useState<string>("");
  const [needUpdate, setNeedUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function setAllOrders() {
      const allOrders = await getAllOrders(filterStatus, sortStatus);
      setOrders(allOrders);
      setIsLoading(false);
    }
    setAllOrders();
  }, [filterStatus, sortStatus, needUpdate]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Box padding={"1em 1em"}>
      <Select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="">Без фильтра</option>
        {statusNames.map((name) => (
          <option
            value={statusNames.indexOf(name)}
            key={statusNames.indexOf(name)}
          >
            {name}
          </option>
        ))}
      </Select>
      <Select onChange={(e) => setSortStatus(e.target.value)}>
        <option value="">Без сортировки</option>
        <option value="total">Стоимость ↑</option>
        <option value="-total">Стоимость ↓</option>
      </Select>
      <SimpleGrid gap={"0.5em"}>
        {orders.map((order: Order) => (
          <OrderCard order={order} update={setNeedUpdate} key={order.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
