import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
import "./style.css"
import { useParams, NavLink } from "react-router-dom";

export default function RecetaIngrediente() {
  
  // const { isAuthenticated, token } = useAuth("state");
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

  const [
    {
      data: dataIngredientes,
      isError: isErrorIngredientes,
      isLoading: isLoadingIngredientes,
    },
    doFetchIngredientes,
  ] = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/reciperover/ingredients/`,
    {}
  );
  const reciperIngredienteUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/reciperover/recipes/${id}/ingredients`;

  useEffect(() => {
    doFetchIngredientes();
  }, []);

  useEffect(() => {
    if (dataIngredientes) {
      fetch(reciperIngredienteUrl)
        .then((response) => response.json())
        .then((recipeIngredient) => {
          //quantity, measure, ingredient (integer) recipe (integer)
          const listIng = [];
          dataIngredientes.forEach((ingrediente) => {
            const [ing] = recipeIngredient.filter(
              (rp) => ingrediente.id === rp.ingredient
            ); //devuelve lista
            if (ing) {
              listIng.push({
                id: ingrediente.id,
                name: ingrediente.name,
                quantity: ing.quantity,
                measure: ing.measure,
              });
            }
          });
          setIngredients(listIng);
        })
        .catch((error) => console.error("Error fetching ingredients:", error));
    }
    //   fetch(recipeCategoriasUrl)
    //     .then((response) => response.json())
    //     .then((data) => setCategories(data))
    //     .catch((error) => console.error('Error fetching categories:', error));
  }, [dataIngredientes, id]);


  return (
    <div className="column is-narrow-mobile is-narrow-tablet is-3 columna-ingredients" >
        <h3 className="title is-5 has-text-centered">Ingredientes</h3>
        
        {ingredients.length > 0 ? (

        <ul className="">
           {ingredients.map((ingrediente) => (
              <li key={ingrediente.id} className="ingredient-item">
                <strong className="">{ingrediente.name}:</strong>
                <span className="ingredient-details">
                  {ingrediente.quantity}
                  {ingrediente.measure}
                </span>
                <hr />
              </li>
            ))}
          </ul> 
  
        ) : (
          <p>No hay ingredientes disponibles para esta receta</p>
        )}
    </div>
  );
}
