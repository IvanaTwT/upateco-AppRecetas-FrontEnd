import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function IngredienteReceta({ receta }) {

    const { isAuthenticated, token } = useAuth("state");
    const [{ data: ingredientesData, isError: ingredientesError, isLoading: ingredientesLoading }, fetchIngredientes] = useFetch(
        "https://sandbox.academiadevelopers.com/reciperover/ingredients/",
        {}
    );
    const [{ data: recipeIngredientsData, isError: recipeIngredientsError, isLoading: recipeIngredientsLoading }, fetchRecipeIngredients] = useFetch(
        "https://sandbox.academiadevelopers.com/reciperover/recipes/ingredients/",
        {}
    );
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        fetchIngredientes();
        fetchRecipeIngredients();
    }, [fetchIngredientes, fetchRecipeIngredients]);

    useEffect(() => {
        if (ingredientesData && recipeIngredientsData && receta.id) {
            const ingredientesReceta = recipeIngredientsData
                .filter((ri) => ri.recipe === receta.id)
                .map((ri) => {
                    const ingrediente = ingredientesData.find((i) => i.id === ri.ingredient);
                    return ingrediente ? { ...ingrediente, quantity: ri.quantity, measure: ri.measure } : null;
                })
                .filter((i) => i !== null);
            setIngredientes(ingredientesReceta);
        }
    }, [ingredientesData, recipeIngredientsData, receta.id]);

    if (ingredientesLoading || recipeIngredientsLoading) return <p>Cargando...</p>;
    if (ingredientesError || recipeIngredientsError) return <p>Error al cargar los ingredientes.</p>;

    return (
        <div>
            {ingredientes.length > 0 ? (
                <ul>
                    {ingredientes.map((ingrediente) => (
                        <li key={ingrediente.id}>
                            {ingrediente.name} {ingrediente.quantity}{ingrediente.measure}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay ingredientes especificados para esta receta.</p>
            )}
        </div>
    );
}