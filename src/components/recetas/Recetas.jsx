import BarraSearch from "../BarraSearch";
import RecetasList from "./RecetasList";

export default function Recetas(){
    return(
        <div className="container">
            <BarraSearch/>
            <RecetasList/>
        </div>
    );
}