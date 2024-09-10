import { useEffect, useState } from "react";
import getAllOrders from "../../services/getAllOrders";
import { Box } from "@chakra-ui/react";

export default function OrdersPage() {
  const [orders, setOrders] = useState({});
  useEffect(() => {
    async function setAllOrders() {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    }
    setAllOrders();
  }, []);
  return <Box>{JSON.stringify(orders)}</Box>;
}
