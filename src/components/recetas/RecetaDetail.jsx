import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../hooks/utils";

export default function RecetaDetail() {
    const { id } = useParams();

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/reciperover/recipes/",
        {}
    );

    useEffect(() => {
         doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data) return <p>No hay recetas disponibles</p>;

    const [receta] = data.filter((receta) => receta.id === parseInt(id));

    return (
        <section className="section">
        <div className="container">
            <div className="card">
                <div className="card-image">
                    {receta.image && (
                        <figure className="image is-4by3">
                            <img src={receta.image} alt={receta.title} />
                        </figure>
                    )}
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="subtitle is-6">Vistas: {receta.view_count}</p>
                            <h2 className="title is-3">{receta.title}</h2>
                        </div>
                    </div>
                    <div className="content">
                        <p>{receta.description}</p>
                        <br />
                        <p><strong className="has-text-black">Locaciones:</strong> {receta.locations.join(", ")}</p>
                        <p><strong className="has-text-black">Categorías:</strong> {receta.categories.join(", ")}</p>
                        <p><strong className="has-text-black">Tiempo de preparación:</strong> {receta.preparation_time} min</p>
                        <p><strong className="has-text-black">Tiempo de cocción:</strong> {receta.cooking_time} min</p>
                        <p><strong className="has-text-black">Raciones:</strong> {receta.servings}</p>
                        <hr />
                        <h3 className="title is-5">Ingredientes</h3>
                        <ul>
                            {receta.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <hr />
                        <p><strong className="has-text-black">Creado:</strong> {formatDate(receta.created_at)}</p>
                        <p><strong className="has-text-black">Actualizado:</strong> {formatDate(receta.updated_at)}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}