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
  const [ingredients, setIngredients] = useState(""); //array
  const [locations, setLocations] = useState("");  //array
  const [categories, setCategories] = useState(""); //array

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/reciperover/recipes/",
    {}
  );

  useEffect(() => {
    doFetch();
  }, []);


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
      doFetchPut({
        body: JSON.stringify(nuevoObjeto),
      })
      // console.log("Data:"+dataPut)
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
            </div>
            {/* {if ()} */}


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
