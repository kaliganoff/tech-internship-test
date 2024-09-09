import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AllAdsPage from "./pages/AllAdsPage/AllAdsPage.tsx";
import Root from "./pages/Root/Root.tsx";
import AdPage from "./pages/AdPage/AdPage.tsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"
    element={<Root />}>
      <Route path="allAds" element={<AllAdsPage />}></Route>
      <Route path="ad" element={<AdPage />}></Route>
      <Route path="orders" element={<OrdersPage />}></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
);
