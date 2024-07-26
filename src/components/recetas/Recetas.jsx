import BarraSearch from "../BarraSearch";
import RecetasList from "./RecetasList";
import { useAuth } from "../contexts/AuthContext";

export default function Recetas(){

    return(
        <>
            <BarraSearch/>
            <RecetasList/>
        </>
    );
}