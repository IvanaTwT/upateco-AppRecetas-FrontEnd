import { Outlet } from "react-router-dom";
import RecetasList from "./recetas/RecetasList"

export default function Home() {
    return (
        <div className="container">
            <div className="box for-dia">
                <h1 className="title">Recetas del dia:</h1>
                <RecetasList />
            </div>
            <div className="box">
                <h1 className="title">Categorias:</h1>
                <RecetasList/>
            </div>
            
        </div>
    );
}
