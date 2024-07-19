import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecetaForm() {
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
            <div className="columns is-centered">
                <div className="column is-4">
                    <form>

                        <div className="field">
                            <label htmlFor="title">Nombre receta: (*)</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={receta ? receta.title : ""}
                                    //onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="preparation_time">Tiempo Preparación (min): (*)</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    rows={3}
                                    id="preparation_time"
                                    name="preparation_time"
                                    defaultValue={
                                        receta ? receta.preparation_time : ""
                                    }
                                    //onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="cooking_time">Tiempo Cocción (min): (*)</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    rows={3}
                                    id="cooking_time"
                                    name="cooking_time"
                                    defaultValue={receta ? receta.cooking_time : ""}
                                    //onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="description">Descripción:</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    id="description"
                                    name="description"
                                    defaultValue={receta ? receta.description : ""}
                                />
                            </div>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="servings">Raciones:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    id="servings"
                                    name="servings"
                                    defaultValue={receta ? receta.servings : ""}
                                />
                            </div>
                        </div>

                        <div className="card-image">
                            <img
                                src={receta ? receta.image : ""}
                                alt={receta ? receta.title : ""}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="image">Imagen URL:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    rows={3}
                                    id="image"
                                    name="image"
                                    defaultValue={receta ? receta.image : ""}
                                    //onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
}
