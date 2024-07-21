import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RecetaForm() {
  const { id } = useParams();

  const { isAuthenticated, token } = useAuth("state");
  console.log(
    "RecipeForm Autorizado: " + isAuthenticated,
    " - Token: " + token
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparation_time, setPreparationTime] = useState("");
  const [cooking_time, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [image, setImage] = useState("");
  const [formCargado, setFormCargado]= useState(false);
  // const [ingredients, setIngredients] = useState(""); array
  //   const [locations, setLocations] = useState("");  array
  //   const [categories, setCategories] = useState(""); array

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
//   modificar receta
// if(formCargado){
//   const [{ data2, isError2, isLoading2 }, doFetch2] = useFetch(
//     `https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify(nuevoObjeto)
//     }
//   );
//   useEffect(()=>{
//         doFetch2();
//       }, []);
//   console.log("Error: ",isError)
//   console.log(nuevoObjeto+"-"+token)
// }

  var nuevoObjeto ;
  function handleSubmit(event) {
    event.preventDefault();
    
    let recipeEdit = {
      title: title,
      description: description,
      preparation_time: preparation_time,
      cooking_time: cooking_time,
      image: image,
      servings: servings,
    };
    
    nuevoObjeto = Object.fromEntries(
      Object.entries(recipeEdit).filter(([clave, valor]) => valor !== "")
    );
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
            <div className="field">
              <label htmlFor="title">Nombre receta: (*)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={receta ? receta.title : title}
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
                  defaultValue={
                    receta ? receta.preparation_time : preparation_time
                  }
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
                  defaultValue={receta ? receta.cooking_time : cooking_time}
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
                  defaultValue={receta ? receta.description : description}
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
                  defaultValue={receta ? receta.servings : servings}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* {if ()} */}
            <div className="card-image">
              <img
                src={
                  receta ? (receta.image != null ? receta.image : image) : ""
                }
                alt={receta ? receta.title : title}
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
                  defaultValue={receta ? receta.image : image}
                  // value={image}
                  onChange={handleChange}
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
