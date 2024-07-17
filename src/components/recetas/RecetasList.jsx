import RecetaCard from "./RecetaCard";
// import "./recetaCard.css";
export default function RecetasList(){
    //react-examples (carpeta de ejemplo)
    let array=[1,2,3,4,5]
    return(
        <div className="columns is-multiline recetas">
            {/* <div class="column is-half"></div> */}
            {array.map((n, index) => (
// is-three-quarters-mobile     is-two-thirds-tablet      is-half-desktop      is-one-third-widescreen   is-one-quarter-fullhd 
                        <div key={index} className="column is-one-quarter-tablet is-two-thirds-mobile">
                            <RecetaCard/>
                        </div>
                        
                    ))}
            
        </div>
    );
}