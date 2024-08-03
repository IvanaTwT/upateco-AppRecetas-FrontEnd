import { Outlet } from "react-router-dom";
import RecetasList from "./recetas/RecetasList";
import BarraSearch from "./BarraSearch";
import HomeCategory from "./HomeCategory";

export default function Home() {
    
    return (
        <div className="container">
            <div className="columns is-multiline ">
                <div className="column is-full">
                    <div className="box">
                        <BarraSearch></BarraSearch>
                    </div>
                </div>
                <div className="column is-full">
                    <div className="box">
                        <h1 className="title">Categorias: </h1>
                        {/* <RecetasList /> */}
                        <div className="home-categories is-flex is-flex-direction-row is-flex-wrap-wrap">
                            <HomeCategory/>
                        </div>
                    </div>
                </div>
                <div className="column is-full">
                    <div className="box">
                        <h1 className="title">¿Que quieres cocinar?</h1>
                        <RecetasList algunas={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
