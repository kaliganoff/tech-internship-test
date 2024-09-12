import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/ads">Объявления</Link>
        <Link to="/orders">Заказы</Link>
      </header>
      <Outlet></Outlet>
    </div>
  );
}
