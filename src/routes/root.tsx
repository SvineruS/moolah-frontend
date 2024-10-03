import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Root() {
    const classNames = ({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""

    return (
      <>
          <NavLink to="/auth" className={classNames}> Auth </NavLink>•
          <NavLink to="/game/farm" className={classNames}> Game </NavLink>
          <hr/>
          <Outlet/>
      </>
    );
}
