import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RecetaForm() {
  const { id } = useParams();

  const { isAuthenticated, token } = useAuth("state");
  // console.log("Autenticado: "+isAuthenticated)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparation_time, setPreparationTime] = useState(null);
  const [cooking_time, setCookingTime] = useState(null);
  const [servings, setServings] = useState(null);
  const [image, setImage] = useState(null);
  const [formCargado, setFormCargado]= useState(false);
  const [ingredients, setIngredients] = useState([]); //array
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  // const [locations, setLocations] = useState([]);  //array
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/reciperover/recipes/",
    {}
  );

  useEffect(() => {
    doFetch();
  }, []);
  //crear receta
  const [{ data: dataPost, isError:isErrorPost, isLoading: isLoadingPost }, doFetchPost] = useFetch(
    "https://sandbox.academiadevelopers.com/reciperover/recipes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
  }
  );
  //   modificar receta
  const [{ dataPut, isErrorPut, isLoadingPut }, doFetchPut] = useFetch(
    `https://sandbox.academiadevelopers.com/reciperover/recipes/${id}`,
    {
      method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }
  );
  // use effect para los datos del formulario
  useEffect(() => {
    if (formCargado) {
      const nuevoObjeto = {
        "title":title,
        "description":description,
        "preparation_time":preparation_time,
        "cooking_time":cooking_time,
        "servings":servings,
        "image":image,
      };
      console.log(nuevoObjeto)
      // Petición PUT
      if(window.location.pathname != "/recetas/new"){
        console.log("haciendo put...")
        doFetchPut({
          body: JSON.stringify(nuevoObjeto),
        })
      }else{
        console.log("haciendo post...")
        doFetchPost({
          body: JSON.stringify(nuevoObjeto),
        })
        console.log("Data:"+dataPost)
      }
      
    
      // console.log('Error:', isErrorPut)
      setFormCargado(false);
    }
  }, [formCargado, title, description, preparation_time, cooking_time, servings, image]);


// efecto para cuando haya algo en data
  useEffect(() => {
    if (data && window.location.pathname != "/recetas/new") {
      // console.log(window.location.pathname);
      setTitle(receta.title);
      setDescription(receta.description);
      setPreparationTime(receta.preparation_time);
      setCookingTime(receta.cooking_time);
      setServings(receta.servings);
      setImage(receta.image);
      // console.log(data)//[{…}, {…}]
    }
  }, [data]);


  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las recetas.</p>;
  if (!data) return <p>No hay recetas disponibles</p>;

  const [receta] = data.filter((receta) => receta.id === parseInt(id));

  function handleSubmit(event) {
    event.preventDefault();
    setFormCargado(true)

  }

  function handleChange(e) {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "preparation_time":
        setPreparationTime(e.target.value);
        break;
      case "cooking_time":
        setCookingTime(e.target.value);
        break;
      case "servings":
        setServings(e.target.value);
        break;
      case "image":
        setImage(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-4">
          <form onSubmit={handleSubmit}>
          <div className="card-image">
              <img
                src={
                  image
                }
                alt={title}
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
                  defaultValue={image}
                  // value={image}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="title">Nombre receta: (*)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="preparation_time">
                Tiempo Preparación (min): (*)
              </label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  rows={3}
                  id="preparation_time"
                  name="preparation_time"
                  defaultValue={preparation_time}
                  onChange={handleChange}
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
                  defaultValue={cooking_time}
                  onChange={handleChange}
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
                  defaultValue={description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
                <label className="label">Ingredientes</label>
                <div className="select is-fullwidth is-multiple">
                    <select
                        multiple
                        size="4"
                        // value={selectedCategories.map((cat) => cat.id)}
                        // onChange={handleCategoryChange}
                    >
                        {/* {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))} */}
                        <option key="1" value="1">Ingrediente 1</option>
                        <option key="2" value="2">Ingrediente 2</option>
                        <option key="3" value="3">Ingrediente 3</option>
                        <option key="4" value="4">Ingrediente 4</option>
                        <option key="5" value="5">Ingrediente 5</option>
                        <option key="6" value="6">Ingrediente 6</option>
                        <option key="7" value="7">Ingrediente 7</option>
                        <option key="8" value="8">Ingrediente 8</option>
                        <option key="9" value="9">Ingrediente 9</option>
                        <option key="10" value="10">Ingrediente 10</option>
                    </select>
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
                  defaultValue={servings}
                  onChange={handleChange}
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
                        {/* {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))} */}
                        <option key="1" value="1">categoria 1</option>
                        <option key="2" value="2">categoria 2</option>
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
