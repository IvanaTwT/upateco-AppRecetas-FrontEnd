import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import RecetaCard from "./RecetaCard";

export default function RecetasList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data && data.results.length > 0) return <p>No hay recetas disponibles</p>;

    return (
        <div className="columns is-multiline recetas">
            {/* <div class="column is-half"></div> */}
            {data.results.map((receta) => (
                // is-three-quarters-mobile     is-two-thirds-tablet      is-half-desktop      is-one-third-widescreen   is-one-quarter-fullhd
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
