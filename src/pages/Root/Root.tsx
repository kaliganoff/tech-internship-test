import { Outlet } from "react-router-dom";

export default function Root() {
    return (<>
    <div>Header</div>
    <Outlet></Outlet>
    <div>Footer</div>
    </>);
  }
  
  