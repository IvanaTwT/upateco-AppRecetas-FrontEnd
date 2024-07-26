import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { formatDate, formatDateTime } from "../hooks/utils";
import User from "./User";
import { useParams, NavLink } from "react-router-dom";

export default function RecetaComentario({ receta }) {

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${
            import.meta.env.VITE_API_BASE_URL
          }/reciperover/comments/`,
        {}
    );

    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data && receta.id) {
            const comentariosReceta = data.filter((comentario) =>
                comentario.recipe === receta.id
            );
            setComentarios(comentariosReceta);
        }
    }, [data, receta.id]);

    if (isLoading) return <p>Cargando comentarios...</p>;
    if (isError) return <p>Error al cargar los comentarios.</p>;

    return (
        <div className="comments">
            <h3 className="title is-6">Calificaciones ({comentarios.length})</h3>
            {comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                    <div key={comentario.id} className="box">
                        <div className="media">
                            <div className="media-left">
                                <ion-icon name="person" size="large"></ion-icon>
                            </div>
                            <div className="media-content">
                                <p className="title is-6">
                                    <NavLink to={`../../profile/${receta.owner}`} relative="path">
                                        <User id={receta.owner}/>
                                    </NavLink>
                                </p>
                                <p>{comentario.content}</p>
                                <p><small className="has-text-grey-light">{formatDateTime(comentario.created_at)}</small></p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="has-text-grey">Sé el primero en dar una calificación</p>
            )}
        </div>
    );
}