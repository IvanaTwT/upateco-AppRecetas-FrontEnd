import { Outlet, useNavigate } from "react-router-dom";
import HomeCategory from "./HomeCategory";
import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import RecetaCard from "./recetas/RecetaCard";
import "./styles.css";

export default function Home() {
    const navigate = useNavigate();
    const [recetaDelDia, setRecetaDelDia] = useState([]);
    const [someRecipes, setSomeRecipes] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [cont, setCont] = useState(1);

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(null);
    const [recetasFiltradas, setRecetasFiltradas] = useState([]);
    //const [filters,  setFilters]=useState([])//agregas las recetas filtradas

    // let rd= Math.random() * (max - min) + min;
    const [{ data, isError, isLoadingPost }, doFetch] = useFetch(
        `${
            import.meta.env.VITE_API_BASE_URL
        }/reciperover/recipes/?page=${cont}&page_size=8`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [cont]);
    const listNumber = new Set(); //conjunto para que no haya duplicados
    useEffect(() => {
        if (data) {
            const rta = data.results;
            setRecetas((prevRecipes) => [...prevRecipes, ...rta]);

            if (data.next) {
                setCont((cont) => cont + 1);
            } else {
                while (listNumber.size < 3) {
                    let nro = Math.floor(
                        Math.random() * (recetas.length - 2) + 2
                    );
                    console.log("nro random: " + nro);
                    listNumber.add(nro);
                }
            }
        }
    }, [data]);

    useEffect(() => {
        if (recetas && listNumber.size > 0) {
            // recetas del dia
            const listNumberArray = Array.from(listNumber); //conversion a array
            const newList = recetas.filter((receta) =>
                listNumberArray.includes(receta.id)
            );
            setRecetaDelDia((prevRecipes) => [...prevRecipes, ...newList]);
            //algunas recetas
            const algunas = recetas.slice(0, 8);
            setSomeRecipes(algunas);
        }
    }, [listNumber, recetas]);

    // let rd= Math.random() * (max - min) + min;
    const fetchFilter = async () => {
        let query = new URLSearchParams({
            page: page,
            ...filters,
        }).toString();

        fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/reciperover/recipes/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setRecetasFiltradas((prev) => [...prev, ...data.results]);
                }
            })
            .catch(() => {
                console.error("Error al obtener recetas filtradas");
            });
    };

    useEffect(() => {
        if (filters) {
            fetchFilter();
        }
    }, [page, filters]);

    function handleSearch(event) {
        event.preventDefault();
        const searchForm = new FormData(event.target);
        const newFilters = {};
        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });
        setFilters(newFilters);
        setRecetasFiltradas([]);
        setPage(1);
    }
    return (
        <div className="container">
            <div className="columns is-multiline ">
                <div className="column is-full">
                    <div className="box">
                        <div className="search-container">
                            <div>
                                <img
                                    className="background-image"
                                    src="/fondo.jpg"
                                    alt=""
                                />
                            </div>

                            <div className="">
                                <div
                                    className="box search-box"
                                    style={{ width: "500px" }}
                                >
                                    <h2 className="title">
                                        ¿Qué te gustaría cocinar?
                                    </h2>
                                    <form className="" onSubmit={handleSearch}>
                                        <div className="is-flex is-align-items-center is-justify-content-center field has-addons">
                                            <div className="control is-expanded">
                                                {/* is-expanded */}
                                                <input
                                                    className="input button input-image"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Buscar..."
                                                    required
                                                />
                                            </div>
                                            <div className="control ">
                                                <button
                                                    className="button is-dark is-medium"
                                                    type="submit"
                                                >
                                                    {" "}
                                                    {/* is-rounded */}
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-full">
                    <div className="box">
                        <h1 className="title">Categorias: </h1>
                        <div className="home-categories is-flex is-flex-direction-row is-flex-wrap-wrap">
                            <HomeCategory />
                        </div>
                    </div>
                </div>
                {recetasFiltradas.length > 0 ? (
                    <div className="column is-full">
                        <div className="box">
                            <h1 className="title">Resultado de su buqueda: </h1>
                            <div className="columns m-1 is-multiline">
                                {recetasFiltradas.map((rod) => (
                                    <div key={rod.id} className="column is-one-quarter-tablet is-two-thirds-mobile">
                                        <RecetaCard receta={rod} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="column is-full">
                    <div className="box">
                        <h1 className="title">Recetas del dia:</h1>
                        {/* <Recetas algunas={true}/> */}
                        <div className="columns ml-2">
                            {recetaDelDia.length > 0 ? (
                                recetaDelDia.map((rod) => (
                                    <div key={rod.id} className="column is-4">
                                        <RecetaCard receta={rod} />
                                    </div>
                                ))
                            ) : (
                                <div>Cargando recetas...</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="column is-full">
                    <div className="box">
                        <div className="is-flex is-flex-direction-column ">
                            {/* <div className="column is-full"> */}
                            <h1 className="title">
                                Recetas que te pueden encantar:
                            </h1>
                            {/* </div> */}
                            {/* <div className="column is-full"> */}
                            <div className="columns m-1 is-multiline">
                                {someRecipes.length > 0 ? (
                                    someRecipes.map((any) => (
                                        <div
                                            key={any.id}
                                            className="column is-one-quarter-tablet is-two-thirds-mobile"
                                        >
                                            <RecetaCard receta={any} />
                                        </div>
                                    ))
                                ) : (
                                    <div>Cargando recetas...</div>
                                )}
                            </div>
                            {/* </div> */}
                            {/* <div className="column is-full"> */}
                            <button
                                className="button is-dark is-size-5"
                                onClick={() => navigate("/recetas")}
                            >
                                Ver Más
                            </button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
