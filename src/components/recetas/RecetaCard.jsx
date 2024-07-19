import { useNavigate } from "react-router-dom";

export default function RecetaCard({receta}) {
    const navigate = useNavigate();
    
    return (
    <div className="card" onClick={() => navigate(`/recetas/${receta.id}`)}>
        <div className="card-image">
            <figure className="image is-half">
                <img
                    src="https://bulma.io/assets/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                />
            </figure>
        </div>
        <div className="card-content">
            <p className="title is-4">{receta.title}</p>
            <p className="subtitle is-6">Tiempo prep: {receta.preparation_time}</p>
        </div>
        <div className="content">
            <p>Contenido: duracion/autor</p>
        </div>
    </div>
    );
}
