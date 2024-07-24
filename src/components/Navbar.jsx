import { Link, NavLink } from "react-router-dom";
import Login from "./Auth/Login";
import { useAuth } from "./contexts/AuthContext";

export default function Navbar() {

    const { isAuthenticated, token } = useAuth("state");

    return (
    <header>
        <nav
            className={"navbar is-fixed-top custom navbar-shadow is-primary"}
        >
            <div className="navbar-start">

                <NavLink
                    to="/"
                    className="navbar-item"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/recetas"
                    className="navbar-item"
                >
                    Recetas
                </NavLink>

                <NavLink to="/contact" className=" navbar-item">
                    Contacto
                </NavLink>
            </div>

            <div className="navbar-end">

                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        <button className="button is-dark is-rounded" style={{ padding: "0px" }}>
                            <ion-icon name="person-circle-outline" style={{ width: "40px", height: "40px" }} ></ion-icon>
                        </button>
                    </a>

                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item">
                            <NavLink class="navbar-link" to="/">
                                Mis recetas
                            </NavLink>
                        </a>
                        <div className="navbar-item">
                            <NavLink className="navbar-link" to="/recetas/new">
                                Subir una receta
                            </NavLink>
                        </div>
                        {!isAuthenticated ? (
                            <NavLink className="navbar-item" to="/login">
                                <button className="button">
                                    Iniciar sesión
                                </button>
                            </NavLink>
                        ) : (
                            <p className="navbar-item">Cerrar sesión</p>
                        )}
                    </div>

                </div>
            </div>

        </nav>
    </header>
  );
}
