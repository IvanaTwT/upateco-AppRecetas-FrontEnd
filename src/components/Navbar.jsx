import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./recetas/logo.png";
import { useAuth } from "./contexts/AuthContext";

export default function Navbar() {
    const { isAuthenticated, token } = useAuth("state");
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    const handleLogout = () => {
        actions.logout();
        setIsActive(false);
    };

    return (
        <header>
            <nav
                className="navbar is-fixed-top has-shadow custom"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={logo} alt="Recipe" />
                    </a>
                    <div
                        role="button"
                        className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={toggleNavbar}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <NavLink to="/" className="navbar-item">
                            Home
                        </NavLink>

                        <NavLink to="/recetas" className="navbar-item">
                            Recetas
                        </NavLink>

                        <NavLink to="/contact" className=" navbar-item">
                            Contacto
                        </NavLink>
                    </div>

                    <div className="navbar-end">
                        {isAuthenticated ? (
                            <div className="navbar-item has-text-white">
                                BIENVENIDA/O!
                            </div>
                        ) : (
                            <div className="navbar-item">
                                <NavLink to="/login" className="has-text-white">
                                    CONÉCTATE
                                </NavLink>
                            </div>
                        )}

                        <div className="navbar-item has-dropdown is-hoverable">
                            <div className="navbar-link">
                                <button
                                    className="button is-primary is-rounded"
                                    style={{ padding: "0px" }}
                                >
                                    <ion-icon
                                        name="person-circle-outline"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            color: "white",
                                        }}
                                    ></ion-icon>
                                </button>
                            </div>

                            <div className="navbar-dropdown is-right">
                                {/* <div className="navbar-item">
                                <NavLink className="navbar-link " to={`../profile/${user.id}`} relative="path">
                                    Mi Perfil
                                </NavLink>
                            </div> */}

                                <div className="navbar-item">
                                    <NavLink className="navbar-link " to="/">
                                        Mis recetas
                                    </NavLink>
                                </div>
                                <div className="navbar-item">
                                    <NavLink
                                        className="navbar-link"
                                        to={`../recetas/new`} relative="path"
                                    >
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
                                    <Link
                                        to="#"
                                        className="navbar-item"
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
