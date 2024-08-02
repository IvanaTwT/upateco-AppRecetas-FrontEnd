import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
import "./style.css";
import { useParams, NavLink } from "react-router-dom";

export default function RecetaCategoria() {
    // const { isAuthenticated, token } = useAuth("state");
    const { id } = useParams();//id de receta
    const [categories, setCategories] = useState([]);

    const [
        {
            data: dataCategories,
            isError: isErrorCateogories,
            isLoading: isLoadingCategories,
        },
        doFetchCategories,
    ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/categories/`,
        {}
    );

    const recipeCategoriesUrl = `${
        import.meta.env.VITE_API_BASE_URL
    }/reciperover/recipes/${id}/categories`;

    useEffect(() => {
        doFetchCategories();
    }, []);

    useEffect(() => {
        if (dataCategories) {
            fetch(recipeCategoriesUrl)
                .then((response) => response.json())
                .then((recipeCategories) => {
                    // console.log("Recipe Categories: ", recipeCategories.results); //lista
                    const listCat = [];
                    dataCategories.results.forEach((category) => {
                        const [cat] = recipeCategories.results.filter(
                            (rp) => category.id === rp.category
                        ); //devuelve lista
                        if (cat) {
                            listCat.push({
                                id: category.id,
                                name: category.name,
                            });
                        }
                    });
                    //console.log("Filtered Categories: ", listCat);//categorias de esta receta
                    setCategories(listCat);
                })
                .catch((error) =>
                    console.error("Error fetching categories:", error)
                );
        }
        //   fetch(recipeCategoriasUrl)
        //     .then((response) => response.json())
        //     .then((data) => setCategories(data))
        //     .catch((error) => console.error('Error fetching categories:', error));
        // console.log("Data Categories: ", dataCategories.results);
    }, [dataCategories, id]);

    return (
        <div className="column">
            <div className="tags">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <NavLink
                            to={`/`}
                            key={category.id}
                            className="tag is-link"
                        >
                            #{category.name}
                        </NavLink>
                    ))
                ) : (
                    <p>Sin especificar</p>
                )}
            </div>
        </div>
    );
}
