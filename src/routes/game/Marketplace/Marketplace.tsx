import { NavLink, Outlet } from "react-router-dom";


export default function Marketplace() {

  const classNames = ({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""

  return (
    <div>
      <NavLink to="/game/marketplace" className={classNames}> All Orders </NavLink>•
      <NavLink to="/game/marketplace/create" className={classNames}> Create </NavLink>
      <hr/>

      <Outlet/>
    </div>
  );
}

