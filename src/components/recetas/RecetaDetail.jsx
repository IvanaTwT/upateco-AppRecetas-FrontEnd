import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams , NavLink} from "react-router-dom";
import { formatDate } from "../hooks/utils";
import { useAuth } from "../contexts/AuthContext";
import RecetaIngrediente from "./RecetaIngrediente";
import RecetaComentario from "./RecetaComentario";
import ComentarioForm from "./ComentarioForm";
import RecetaPasos from "./RecetaPasos";
import defaultImage from './logo.png';

export default function RecetaDetail() {
    const { id } = useParams();

    const { isAuthenticated, token } = useAuth("state");
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/reciperover/recipes/",
        {}
    );
    
    useEffect(() => {
            doFetch()
    }, [])

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data) return <p>No hay recetas disponibles</p>;

    const [receta] = data.filter((receta) => receta.id === parseInt(id));

    return (
        <section className="section">
            <div className="container">

                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-256x256">
                                    <img src={defaultImage} alt={receta.title} />
                                </figure>
                            </div>
                            <div className="media-content">

                                <div className="card-content">
                                    <h2 className="title is-3">{receta.title}</h2>

                                    { isAuthenticated ? 
                                        (
                                        <div className="media-right is-flex is-justify-content-start is-align-items-center">
                                                <div className="buttons-container is-flex">
                                                    <NavLink to={`../edit/${id}`} relative="path"><button className="button is-light"><ion-icon name="create-outline"></ion-icon></button></NavLink>
                                                    
                                                    <NavLink to={`../`} relative="path"><button className="button is-danger"><ion-icon name="trash-outline"></ion-icon></button></NavLink>
                                                </div>
                                        </div>
                                        ) : null 
                                    }

                                    <hr />
                                    <div className="is-flex is-align-items-center">
                                        <p className="mr-6"><ion-icon name="people"></ion-icon>Vistas: {receta.view_count}</p>
                                        <p className="mr-6"><ion-icon name="restaurant"></ion-icon>Preparación: {receta.preparation_time} mins</p>
                                        <p className="mr-6"><ion-icon name="time"></ion-icon>Cocción: {receta.cooking_time} mins</p>
                                    </div>
                                    <hr />
                                    <div class="content">
                                        {receta.description}
                                    </div>

                                    <p><strong>Locaciones:</strong> {receta.locations.join(", ")}</p>
                                    <p><strong>Categorías:</strong> {receta.categories.join(", ")}</p>
                                    <p><strong>Raciones:</strong> {receta.servings}</p>
                                </div>

                                <footer className="card-footer mt-auto">
                                        <div className="card-footer-item">
                                            <p><strong>Autor:</strong> {receta.owner}</p>
                                        </div>
                                        <div className="card-footer-item">
                                            <p><strong>Publicada:</strong> {formatDate(receta.created_at)}</p>
                                        </div>
                                        <div className="card-footer-item">
                                            <p><strong>Actualizada:</strong> {formatDate(receta.updated_at)}</p>
                                        </div>
                                </footer>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    
                    <div className="card-content">
                        <div className="content">
                            <h3 className="title is-5">Ingredientes</h3>
                            <RecetaIngrediente receta={receta}/> 
                            <hr />
                            <h3 className="title is-5">Preparación</h3>
                            <RecetaPasos receta={receta}/>

                         </div>
                    </div>
                </div>
            
                <div className="container">
                    <h3 className="title is-5">Califica esta receta</h3>    
                    <div className="card-content">
                        <ComentarioForm recetaId={receta.id} />
                    </div>
                    <div className="card-content">
                        <RecetaComentario receta={receta} />
                    </div>
                </div>
            </div>
        </section>
    );
}