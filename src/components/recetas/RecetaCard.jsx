// import "./recetaCard.css";
function RecetaCard() {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-half">
          <img
            src="https://bulma.io/assets/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">Nombre receta</p>
        <p className="subtitle is-6">@johnsmith (autor o del)</p>
      </div>
      <div className="content">
        <p>Contenido: duracion/autor</p>
      </div>
    </div>

    // <div className="card">
    //   <div className="card-image">
    //     <figure className="image is-128x128">
    //       {" "}
    //       {/* is-4by3 */}
    //       <img
    //         src="https://bulma.io/assets/images/placeholders/1280x960.png"
    //         alt="Placeholder image"
    //       />
    //     </figure>
    //   </div>
    //   <div className="card-content">
    //     <div className="media-content">
    //       <p className="title is-4">Nombre receta</p>
    //       <p className="subtitle is-6">@johnsmith (autor o del)</p>
    //     </div>
    //   </div>

    //   <div className="content">
    //     <p>Contenido: duracion/autor</p>
    //   </div>
    // </div>
  );
}
export default RecetaCard;
