import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function IngredientesList() {
    const { id } = useParams();
    //   console.log("List" + ingredientes);
    const [listIng, setListIng] = useState([]);

    useEffect(() => {
        // Función asincrónica para obtener los ingredientes
        async function fetchIngredients() {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/reciperover/recipes/${id}/ingredients/`
                );

                if (!response.ok) {
                    throw new Error("No se pudieron cargar los ingredientes");
                }

                const data = await response.json();

                // Obtener todos los detalles de los ingredientes en paralelo
                const ingredientPromises = data.map(async (ingR) => {
                    const response = await fetch(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/reciperover/ingredients/${ingR.ingredient}/`
                    );

                    if (!response.ok) {
                        throw new Error("No se pudo traer el ingrediente");
                    }

                    const ing = await response.json();
                    return {
                        id: ing.id,
                        name: ing.name,
                        quantity: ingR.quantity,
                        measure: ingR.measure,
                    };
                });

                // Esperar a que todas las promesas se resuelvan
                const ingredientsList = await Promise.all(ingredientPromises);
                setListIng(ingredientsList);
            } catch (error) {
                console.error("Error al realizar la petición", error);
            }
        }

        fetchIngredients();
    }, [id]);

    return (
        <div className="table-container mb-5">
            <ul>
                {listIng.map((ing, index) => (
                    <li key={index}>
                        {ing.name} {ing.quantity}
                        {ing.measure}
                    </li>
                ))}
            </ul>
        </div>
    );
}
