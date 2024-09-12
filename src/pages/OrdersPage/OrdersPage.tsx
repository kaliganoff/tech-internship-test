import { useEffect, useState } from "react";
import getAllOrders from "../../services/getAllOrders";
import { Box, Select } from "@chakra-ui/react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { Order } from "../../types/types";
import { statusNames } from "../../consts/consts";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortStatus, setSortStatus] = useState<string>("");

  useEffect(() => {
    async function setAllOrders() {
      const allOrders = await getAllOrders(filterStatus, sortStatus);
      setOrders(allOrders);
    }
    setAllOrders();
  }, [filterStatus, sortStatus]);

  return (
    <Box>
      <Select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="">Без фильтра</option>
        {statusNames.map((name) => (
          <option value={statusNames.indexOf(name)}>{name}</option>
        ))}
      </Select>
      <Select onChange={(e) => setSortStatus(e.target.value)}>
        <option value="">Без сортировки</option>
        <option value="total">Стоимость ↑</option>
        <option value="-total">Стоимость ↓</option>
      </Select>
      {orders.map((order: Order) => (
        <OrderCard order={order} />
      ))}
    </Box>
  );
}
