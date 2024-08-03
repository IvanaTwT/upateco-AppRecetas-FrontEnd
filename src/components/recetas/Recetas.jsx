import BarraSearch from "../BarraSearch";
import RecetasList from "./RecetasList";
import { useAuth } from "../contexts/AuthContext";

export default function Recetas() {
    return (
        <div className="container">
            <div className="columns is-multiline ">
                <div className="column is-full">
                    <div className="box">
                        <BarraSearch />
                    </div>
                </div>
                <div className="column is-full">
                    <div className="box">
                    <RecetasList />
                    </div>
                </div>
            </div>
        </div>
    );
}
