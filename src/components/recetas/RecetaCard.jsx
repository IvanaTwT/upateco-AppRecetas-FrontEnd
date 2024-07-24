import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import defaultImage from './logo.png';

export default function RecetaCard({receta}) {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(receta.image || defaultImage);

    const handleError = () => {
        setImageSrc(defaultImage);
    };

    return (
    <div className="card" onClick={() => navigate(`/recetas/${receta.id}`)}>
        <div className="card-image">
            <figure className="image is-half">
                <img
                    src={imageSrc}
                    alt={receta.title}
                    onError={handleError}
                />
            </figure>
        </div>
        <div className="card-content">
            <p className="title is-5">{receta.title}</p>
            <div className="is-flex is-align-items-center">
                <p className="mr-4"><ion-icon name="people"></ion-icon>{receta.view_count}</p>
                <p><ion-icon name="time"></ion-icon>{receta.preparation_time} min</p>
            </div>
        </div>
    </div>
    );
}
