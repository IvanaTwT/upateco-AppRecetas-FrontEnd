import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Ingrediente from "../Ingredientes/Ingrediente";
import IngredientesList from "../Ingredientes/IngredienteList";

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
  const [categories, setCategories] = useState([]);
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
      setCategories(data.categories);
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

  function addIngrediente(ingrediente) {
    setIngredientes([...ingredientes, ingrediente]);
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
  }, [formCargado, recipe, image, ingredientes]);

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
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-4">
          <form onSubmit={handleSubmit}>
            <div>
              <figure className="image">
                <img src={image} alt={recipe.title} />
              </figure>
            </div>
            <div className="field">
              <label className="label">Imagen:</label>
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
              <label htmlFor="title" className="label">Nombre receta: (*)</label>
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
              <label htmlFor="preparation_time" className="label">
                Tiempo Preparación (min): (*)
              </label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  rows={3}
                  id="preparation_time"
                  name="preparation_time"
                  defaultValue={recipe.preparation_time}
                  onChange={handleRecipeChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="cooking_time" className="label">Tiempo Cocción (min): (*)</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  rows={3}
                  id="cooking_time"
                  name="cooking_time"
                  defaultValue={recipe.cooking_time}
                  onChange={handleRecipeChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="label">Descripción:</label>
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
                
                {/* <IngredientesList></IngredientesList> */}
                <Ingrediente addIngrediente={addIngrediente}></Ingrediente>
            </div>
            
            <div className="field">
              <label htmlFor="servings" className="label">Raciones:</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  id="servings"
                  name="servings"
                  defaultValue={recipe.servings}
                  onChange={handleRecipeChange}
                />
              </div>
              <div className="field">
                <label className="label">Categorías</label>
                <div className="select is-fullwidth is-multiple">
                  <select
                    multiple
                    size="4"
                    // value={selectedCategories.map((cat) => cat.id)}
                    // onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                    {/* <option key="1" value="1">
                      categoria 1
                    </option>
                    <option key="2" value="2">
                      categoria 2
                    </option> */}
                  </select>
                </div>
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
