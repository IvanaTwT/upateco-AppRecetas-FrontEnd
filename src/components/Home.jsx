import { Outlet } from "react-router-dom";
import RecetasList from "./recetas/RecetasList"

export default function Home() {
    return (
        <div className="container">
            <div className="box">
                <h1 className="title">¿Que quieres cocinar?</h1>
                <RecetasList />
            </div>
            <div className="box">
                <h1 className="title">Categorias:</h1>
                <RecetasList/>
            </div>
            
        </div>
    );
}
