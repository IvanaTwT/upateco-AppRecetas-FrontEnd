import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { formatDate } from "../hooks/utils";
import { useAuth } from "../contexts/AuthContext";
import defaultImage from "./logo.png";
import { useParams, NavLink } from "react-router-dom";
import "./style.css"

export default function Profile() {

    const { id } = useParams();

    const { isAuthenticated, token } = useAuth("state");

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/profiles/`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }
    );

    useEffect(() => {
        if (isAuthenticated) {
            doFetch();
        }
    }, [isAuthenticated]);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar la información del usuario.</p>;

    const [user] = data.filter((user) => user.user__id === parseInt(id));

    return (
        <section className="section">
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-128x128 profile-image">
                                <img
                                    src={user.image ? user.image : defaultImage}
                                    alt={`${user.first_name} ${user.last_name}`}
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <h1 className="title is-3">{user.first_name} {user.last_name}</h1>
                            <p className="subtitle is-5">@{user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Bio:</strong> {user.bio || "No disponible"}</p>
                            <p><strong>Fecha de creación:</strong> {formatDate(user.created_at)}</p>
                            <p><strong>Última actualización:</strong> {formatDate(user.updated_at)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
