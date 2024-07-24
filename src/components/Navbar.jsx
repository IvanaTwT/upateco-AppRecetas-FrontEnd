import { Link, NavLink } from "react-router-dom";
import logo from "./recetas/logo.png"
import { useAuth } from "./contexts/AuthContext";

export default function Navbar() {

    const { isAuthenticated, token } = useAuth("state");

    return (
    <header>
        <nav className="navbar is-fixed-top has-shadow custom" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="/">
                    <img src={logo} alt="Recipe" />
                </div>
            </div>
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
                    <div className="navbar-link">
                        <button className="button is-dark is-rounded" style={{ padding: "0px" }}>
                            <ion-icon name="person-circle-outline" style={{ width: "40px", height: "40px" }} ></ion-icon>
                        </button>
                    </div>

                    <div className="navbar-dropdown is-right">
                        <div className="navbar-item">
                            <NavLink className="navbar-link " to="/">
                                Mis recetas
                            </NavLink>
                        </div>
                        <div className="navbar-item">
                            <NavLink className="navbar-link"  to="/recetas/new">
                                Subir una receta
                            </NavLink>
                        </div>
                        <hr className="navbar-divider" />
                        {!isAuthenticated ? (
                            <NavLink className="navbar-item" to="/login">
                                <button className="button custom">
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
