import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import RecetaCard from "./RecetaCard";
import { useAuth } from "../contexts/AuthContext";

export default function RecetasMias() {
    const { user__id } = useAuth("state");
    const [page, setPage]=useState(1)
    const [misRecetas, setMisRecetas]=useState([])
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/recipes/?page=${page}`,
        {}
    );

    useEffect(() => {
        if(user__id){
            doFetch();
        }
    }, [user__id,page]);

    useEffect(() => {        
        if(data){
            const recetas = data.results;
            const misRecipes = recetas.filter((r) => r.owner === parseInt(user__id));
            setMisRecetas((prevRecipe) => [...prevRecipe, ...misRecipes]);
            
            if (data.next) {
                setPage((prevPage) => prevPage + 1)
            }
        }
    }, [user__id, data]);

    return (
        <div className="columns is-multiline recetas m-1">
            {misRecetas.length > 0 ? (
              misRecetas.map((receta) => (
                <div
                  key={receta.id}
                  className="column is-one-quarter-tablet is-two-thirds-mobile"
                >
                  <RecetaCard receta={receta} />
                </div>
              ))
            ) : <div>No hay recetas</div>
            }
        </div>
    );
}