import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import RecetaCard from "./RecetaCard";

export default function RecetasList() {
    const [contador, setContador]=useState(1)
    const [recetas, setRecetas] = useState([]);
    
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/?page=${contador}`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [contador]); // El efecto se dispara cada vez que cambia el contador

    useEffect(() => {
        if (data) {
            // Agregar los datos recibidos a recetas
            setRecetas((prevRecipe) => [...prevRecipe, ...data.results]);

            // Si hay una siguiente página, incrementar el contador
            if (data.next) {
                setContador((prevContador) => prevContador + 1);
            }
        }
    }, [data]);


    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data && data.results.length > 0) return <p>No hay recetas disponibles</p>;

    return (
        <div className="columns is-multiline recetas">
            {recetas.map((receta) => (
                <div
                    key={receta.id}
                    className="column is-one-quarter-tablet is-two-thirds-mobile"
                >
                    <RecetaCard receta={receta} />
                </div>
            ))}
        </div>
    );
}
