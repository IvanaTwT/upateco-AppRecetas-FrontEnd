import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import RecetaCard from "./RecetaCard";
import { useParams } from "react-router-dom";

export default function RecetasList({algunas=false}) {
    const { id } = useParams(); // id de categoria
    console.log("of recetasList: "+id)
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
            // console.log("ID of category (RL): "+id) 
            // console.log("Algunas: "+algunas)
            let allRecipes=[];
            if(id){
                //hacer un filtrado para agregar solo las recetas que tengan esa categoria
                const recipeByCategory=data.results.filter((recipe)=> recipe.categories.includes(parseInt(id)) )
                setRecetas((prevRecipe) => [...prevRecipe, ...recipeByCategory]);
            }else {
                // Agregar todas las recetas recibidas si no hay ID de categoría
                allRecipes= data.results;
            }

            // Agregar solo 5 recetas si algunas es true
            if (algunas) {
                allRecipes = allRecipes.slice(0, 8);
            }
            setRecetas((prevRecipes) => [...prevRecipes, ...allRecipes]);

            // Si hay una siguiente página, incrementar el contador
            if (data.next && !algunas) {
                setContador((prevContador) => prevContador + 1);
            }
           
        }
    }, [data, id, algunas]);


    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las recetas.</p>;
    if (!data && data.results) return <p>No hay recetas disponibles</p>;

    return (
        <div className="columns is-multiline recetas m-1">
            {recetas.length > 0 ? (
                    recetas.map((receta) => (
                        <div
                            key={receta.id}
                            className="column is-one-quarter-tablet is-two-thirds-mobile"
                        >
                            <RecetaCard receta={receta} />
                        </div>
                    ))
                ):<div>No hay recetas en esta categoria</div>
            }
        </div>
    );
}
