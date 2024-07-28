import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Category({receta}) {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const [{ data: categoriesData }, doFetchCategories] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/reciperover/categories/`,
        {}
    );

    useEffect(() => {
        doFetchCategories();
    }, []);

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [categoriesData]);

    useEffect(() => {
        if (receta && categories.length > 0) {
            const selected = categories.filter(category =>
                receta.categories.includes(category.id)
            );
            setSelectedCategories(selected);
        }
    }, [receta,categories]);

    function handleCategoryChange(event) {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        setSelectedCategories(updatedSelectedCategories);
    }

    return (
        <div className="field">
            <label className="label has-text-white">Categorías</label>
            <div className="select is-fullwidth is-multiple">
                <select
                    multiple
                    size="4"
                    value={selectedCategories.map((cat) => cat.id)}
                    onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
