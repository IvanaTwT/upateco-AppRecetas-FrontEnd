import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Ingrediente from "../Ingredientes/Ingrediente";
import Category from "../Categorias/Category";

export default function RecetaForm() {
    const { id } = useParams();
    const { isAuthenticated, token } = useAuth("state");

    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        preparation_time: null,
        cooking_time: null,
        servings: null,
    });

    const [image, setImage] = useState(null);
    const [formCargado, setFormCargado] = useState(false);
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredientesOfRecipe, setIngredientesOfRecipe] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${id}`,
        {}
    );

    const [
        {
            data: dataCategorias,
            isError: isErrorCategorias,
            isLoading: isLoadingCategorias,
        },
        doFetchCategorias,
    ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/categories/`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        doFetchCategorias();

        if (data && window.location.pathname !== "/recetas/new") {
            setRecipe({
                title: data.title || "",
                description: data.description || "",
                preparation_time: data.preparation_time || "",
                cooking_time: data.cooking_time || "",
                servings: data.servings || "",
            });
            setImage(data.image);
            setIngredientesOfRecipe(data.ingredients);
            setCategorias(data.categories);
        }
    }, [data]);

    const [
        { data: dataPost, isError: isErrorPost, isLoading: isLoadingPost },
        doFetchPost,
    ] = useFetch(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`, {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    const [{ dataPut, isErrorPut, isLoadingPut }, doFetchPut] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
    // funcion para agregar ingrediente cada vez
    function addIngrediente(ingrediente) {
        setIngredientes([...ingredientes, ingrediente]);
    }
    const [ingInitial, setIngInitial]= useState([])
    // funcion para editar ingrediente, dentro de lista anidada tendra el objeto inical(ingrediente), y el otro sera el/los campo a modificar
    // [ [ {} , {} ] , [ {}, {} ] .....]   de la primera tomaremos el id y el nombre para poder realizar los cambios
    function editIngredientInitial(listIngsEdit){
      setIngInitial([...ingInitial, listIngsEdit])
      console.log(ingInitial)
    }

    useEffect(() => {
        if (formCargado) {
            const newForm = new FormData();
            newForm.append("title", recipe.title);
            newForm.append("description", recipe.description);
            newForm.append("preparation_time", recipe.preparation_time);
            newForm.append("cooking_time", recipe.cooking_time);
            newForm.append("servings", recipe.servings);

            if (image) {
                newForm.append("image", image);
            }

            if (window.location.pathname !== "/recetas/new") {
                console.log("peticion put");
                // doFetchPut({ body: newForm });
            } else {
                console.log("peticion post");
                // doFetchPost({ body: newForm });
            }

            setFormCargado(false);
        }
    }, [formCargado, recipe, image, ingredientes,categorias] );

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data) return <p>No hay recetas disponibles</p>;

    function handleSubmit(event) {
        event.preventDefault();
        setFormCargado(true);
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleRecipeChange(event) {
        setRecipe({
            ...recipe,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <section className="">
            {/* <div className="columns is-centered">
                <div className="column is-4"> */}
                    <form onSubmit={handleSubmit} className=" is-flex is-flex-direction-column box m-4 p-4 has-background-dark">
                        <div className="columns is-centered">
                            <figure className="column is-one-third">
                                <img src={image} alt={recipe.title} className="is-128x128" />
                            </figure>
                        </div>
                        <div className="field ">
                            <label className="label has-text-white">Imagen:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="title" className="label has-text-white">
                                Nombre receta: (*)
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={recipe.title}
                                    onChange={handleRecipeChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="preparation_time" className="label has-text-white">
                                Tiempo Preparación (min): (*)
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    min="0"
                                    rows={3}
                                    id="preparation_time"
                                    name="preparation_time"
                                    defaultValue={recipe.preparation_time}
                                    onChange={handleRecipeChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="cooking_time" className="label has-text-white">
                                Tiempo Cocción (min): (*)
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    min="0"
                                    rows={3}
                                    id="cooking_time"
                                    name="cooking_time"
                                    defaultValue={recipe.cooking_time}
                                    onChange={handleRecipeChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="description" className="label has-text-white">
                                Descripción:
                            </label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    id="description"
                                    name="description"
                                    defaultValue={recipe.description}
                                    onChange={handleRecipeChange}
                                />
                            </div>
                        </div>
                        <div className="ingredientes">
                            <Ingrediente
                                addIngrediente={addIngrediente}
                                editIngredientInitial={editIngredientInitial}
                            ></Ingrediente>
                        </div>
                        <div className="field">
                            <label htmlFor="servings" className="label has-text-white">
                                Raciones:
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    id="servings"
                                    min="1"
                                    name="servings"
                                    defaultValue={recipe.servings}
                                    onChange={handleRecipeChange}
                                />
                            </div>
                        </div>
                        <Category receta={...data}></Category>
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
                {/* </div>
            </div> */}
        </section>
    );
}
