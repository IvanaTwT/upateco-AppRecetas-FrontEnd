import { Link, NavLink } from "react-router-dom";
import Login from "./Auth/Login";
export default function Navbar() {
  return (
    <header>
      <nav
        className={"navbar"}
        // role="navigation"
        // aria-label="main navigation"
      >
        <div className="navbar-start">
          <NavLink
            to="/"
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "has-text-primary" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" navbar-item")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/recetas"
            // style={({ isActive }) =>
            //     isActive ? { color: "red" } : {}
            // }
            className="navbar-item"
          >
            Recetas
          </NavLink>
          <NavLink to="/contact" className=" navbar-item">
            Contacto
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {/* <div className="buttons"> */}
            <NavLink
              to="/login"
              // className=" navbar-item"
            >
              {/* <Login/> */}
              <button
                className="button is-dark is-rounded "
                style={{ padding: "0px" }}
              >
                <ion-icon
                  name="person-circle-outline"
                  style={{ width: "40px", height: "40px" }}
                ></ion-icon>
              </button>
            </NavLink>
            {/* </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
