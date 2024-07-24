import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { formatDateTime } from "../hooks/utils";

export default function RecetaPasos({ receta }) {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/reciperover/steps/`,
        {}
    );

    const [pasos, setPasos] = useState([]);

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data && receta.id) {
            const pasosReceta = data.filter((paso) =>
                paso.recipe === receta.id
            );
            setPasos(pasosReceta.sort((a, b) => a.order - b.order));
        }
    }, [data, receta.id]);

    if (isLoading) return <p>Cargando pasos...</p>;
    if (isError) return <p>Error al cargar los pasos.</p>;

    return (
        <div className="steps">
            {pasos.length > 0 ? (
                <ol>
                    {pasos.map((paso) => (
                        <li key={paso.id}>
                            {paso.instruction}
                        </li>
                    ))}
                </ol>
            ) : (
                <p>No hay pasos disponibles para esta receta.</p>
            )}
        </div>
    );
}