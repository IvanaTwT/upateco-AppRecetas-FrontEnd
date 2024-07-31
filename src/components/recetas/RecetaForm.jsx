import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Ingrediente from "../ingredientes/Ingrediente";
import Category from "../categorias/Category";
import Paso from "../pasos/Paso";

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
    const [steps, setSteps] = useState([]);
    const [ingredientesOfRecipe, setIngredientesOfRecipe] = useState([]);
    const [categorias, setCategorias] = useState([]);
    // booleano para acceder a edit o no
    const [paginaEdit, setPagEdit] = useState(false);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${id}`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);
    const [
        { data: dataPost, isError: isErrorPost, isLoading: isLoadingPost },
        doFetchPost,
    ] = useFetch(`${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`, {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    const [
        {
            data: dataIngredient,
            isError: isErrorIngredient,
            isLoading: isLoadingIngredient,
        },
        doFetchIngredient,
    ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/ingredients/`,
        {}
    );
    const [
        { data: dataPut, isError: isErrorPut, isLoading: isLoadingPut },
        doFetchPut,
    ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    useEffect(() => {
        doFetchIngredient();
        if (data && window.location.pathname !== "/recetas/new") {
            setRecipe({
                title: data.title || "",
                description: data.description || "",
                preparation_time: data.preparation_time || "",
                cooking_time: data.cooking_time || "",
                servings: data.servings || "",
            });
            setPagEdit(!paginaEdit);
            console.log("para editar " + paginaEdit);
            setImage(data.image);
            setIngredientesOfRecipe(data.ingredients);
            setCategorias(data.categories);
        }
    }, [data]);

    // INGREDIENTE - funcion para agregar ingrediente cada vez
    function addIngrediente(ingrediente) {
        setIngredientes([...ingredientes, ingrediente]);
    }
    const [ingInitial, setIngInitial] = useState([]);
    // funcion para editar ingrediente, dentro de lista anidada tendra el objeto inical(ingrediente), y el otro sera el/los campo a modificar
    // [ [ {} , {} ] , [ {}, {} ] .....]   de la primera tomaremos el id y el nombre para poder realizar los cambios
    function editIngredientInitial(listIngsEdit) {
        setIngInitial([...ingInitial, listIngsEdit]);
        console.log(ingInitial);
    }

    // PASO - funcion para agregar paso cada vez
    function addStep(step) {
        console.log("Pasos (RF)"+steps)
        setSteps([...steps, step]);
    }
    const [stepInitial, setStepInitial] = useState([]);
    // funcion para editar ingrediente, dentro de lista anidada tendra el objeto inical(ingrediente), y el otro sera el/los campo a modificar
    // [ [ {} , {} ] , [ {}, {} ] .....]   de la primera tomaremos el id y el nombre para poder realizar los cambios
    function editStepInitial(listStepsEdit) {
        setStepInitial([...stepInitial, listStepsEdit]);
        console.log(ingInitial);
    }

    function addCategorias(categoria) {
        setCategorias([...categorias, categoria]);
    }
    useEffect(() => {
        if (formCargado) {
            const newForm = new FormData();
            newForm.append("title", recipe.title);
            newForm.append("description", recipe.description);
            newForm.append("preparation_time", recipe.preparation_time);
            newForm.append("cooking_time", recipe.cooking_time);
            newForm.append("servings", recipe.servings);
            console.log("ingredientes (RF): " + ingredientes); //lista de objetos, preguntar si tiene length(tamaño)
            //objeto => {name: 'Queso', quantity: '500', measure: 'g'}
            // for (const objeto of ingredientes) {
            //     console.log(objeto)
            // }
            console.log(categorias); //array de objetos, tomar el ultimo cambio (array(N) (N=nro de elementos) )
            //datos importantes ->(id) "description: null, id:2, name: "Fáciles" , owner:  93, recipes:(2) [5, 8]
            if (image) {
                newForm.append("image", image);
            }
            if (window.location.pathname !== "/recetas/new") {
                console.log("peticion put");
                // doFetchPut({ body: newForm });
            } else {
                console.log("peticion post");

                doFetchPost({ body: newForm });
            }
            setFormCargado(false);
        }
    }, [formCargado, recipe, image, ingredientes, categorias]);

    useEffect(() => {
        
        if (dataPost) {
            console.log("Nueva receta creada con ID:", dataPost.id); // ID de la NUEVA RECETA
            setCategorias(categorias[categorias.length - 1]); //el ultimo cambio de categoria
            console.log("Categorias reset: "+categorias)            
            if (ingredientes.length > 0) {
                ingredientes.forEach((ingredient) => {
                    // Buscar ingrediente en la base de datos antes de crearlo
                    const existingIngredient = dataIngredient.results.find(
                        (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
                    );
                    console.log("Existe? "+existingIngredient);
                    if (existingIngredient) {
                        // Si el ingrediente existe, asociarlo a la receta
                        fetch(
                            `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipe-ingredients/`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                },
                                body: JSON.stringify({
                                    quantity: ingredient.quantity,
                                    measure: ingredient.measure,
                                    recipe: dataPost.id,
                                    ingredient: existingIngredient.id,
                                }),
                            }
                        )
                        .then(response => response.json())
                        .then(data => {
                            if (!data.id) {
                                console.error("Error al asociar el ingrediente existente:", data);
                            } else {
                                console.log("Ingrediente existente asociado:", data);
                            }
                        })
                        .catch(error => console.error("Error en la petición:", error));
                    } else {
                        // Si el ingrediente no existe, crearlo y luego asociarlo a la receta
                        fetch(
                            `${import.meta.env.VITE_API_BASE_URL}/reciperover/ingredients/`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                },
                                body: JSON.stringify({
                                    name: ingredient.name,
                                }),
                            }
                        )
                        .then(response => response.json())
                        .then(data => {
                            if (data.id) {
                                fetch(
                                    `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipe-ingredients/`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Token ${token}`,
                                        },
                                        body: JSON.stringify({
                                            quantity: ingredient.quantity,
                                            measure: ingredient.measure,
                                            recipe: dataPost.id,
                                            ingredient: data.id,
                                        }),
                                    }
                                )
                                .then(response => response.json())
                                .then(data => {
                                    if (!data.id) {
                                        console.error("Error al asociar el nuevo ingrediente:", data);
                                    } else {
                                        console.log("Nuevo ingrediente asociado:", data);
                                    }
                                })
                                .catch(error => console.error("Error en la petición:", error));
                            } else {
                                console.error("Error al crear el ingrediente:", data);
                            }
                        })
                        .catch(error => console.error("Error en la petición:", error));
                    }
                });
            }
            if(steps.length > 0){
                steps.forEach((paso) => {
                    fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/reciperover/steps/`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                recipe: dataPost.id,
                                order: paso.order,
                                instruction: paso.instruction
                            }),
                        }
                    ).then(response => response.json())
                    .then(data => {
                        if (!data.id) {
                            console.error("Error en la creación de la step:", data);
                        }
                    }).catch(error => console.error("Error en la petición step:", error));
                });
            }
            if (categorias.length > 0) {
                categorias.forEach((category) => {
                    fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipe-categories/`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                recipe: dataPost.id,
                                category: category.id,
                            }),
                        }
                    ).then(response => response.json())
                    .then(data => {
                        if (!data.id) {
                            console.error("Error en la creación de la categoría:", data);
                        }
                    }).catch(error => console.error("Error en la petición:", error));
                });
            }
        }
    }, [dataPost]);
    
    // if (isLoading) return <p>Cargando...</p>;
    // if (isError) return <p>Error al cargar las recetas.</p>;
    // if (!data) return <p>No hay recetas disponibles</p>;

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
    // al presionar enter
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }
    return (
        <section className="">
            {/* <div className="columns is-centered">
                <div className="column is-4"> */}
            <form
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                className=" is-flex is-flex-direction-column box m-4 p-4 has-background-dark"
            >
                <div className="columns is-centered">
                    {paginaEdit ? (
                        <figure className="column is-one-third">
                            <img
                                src={image}
                                alt={recipe.title}
                                className="is-128x128"
                            />
                        </figure>
                    ) : null}
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
                    <label
                        htmlFor="preparation_time"
                        className="label has-text-white"
                    >
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
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label
                        htmlFor="cooking_time"
                        className="label has-text-white"
                    >
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
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label
                        htmlFor="description"
                        className="label has-text-white"
                    >
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
                        paginaEdit={paginaEdit}
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
                <div className="pasos">
                <Paso addStep={addStep}
                        editStepInitial={editStepInitial}
                        paginaEdit={paginaEdit}></Paso>
                </div>
               
                <div className="categories">
                    <Category
                        receta={data}
                        addCategorias={addCategorias}
                    ></Category>
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
            {/* </div>
            </div> */}
        </section>
    );
}
