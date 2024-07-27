import { useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import IngredientesList from "./IngredienteList";

export default function Ingrediente({ addIngrediente }) {
  const navigate = useNavigate();
  const {id}=useParams();
  const [ingSubmit, setIngSubmit]= useState([]);
  const [ingrediente, setIngrediente] = useState({
    name: "",
    quantity: "",
    measure: "",
  });
  const [formIngredient, setFormIngredient] = useState(false);

  const medidas = ["g", "kg", "lbs", "oz", "ml", "l", "cup", "tbsp", "tsp", "u", "pcs", "pkgs", "pinch", "bunch"];

  function handleClick() {
    setFormIngredient(!formIngredient);
  }

  function handleIngredientChange(event) {
    setIngrediente({
      ...ingrediente,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmitIng(event) {
    // event.stopPropagation();
    event.preventDefault();
    console.log("Click")
    if (ingrediente.name && ingrediente.quantity && ingrediente.measure) {

      addIngrediente(ingrediente); // llamada desde RecetaForm
      setIngSubmit([...ingSubmit, ingrediente])
      console.log(ingSubmit)
      setIngrediente({ name: "", quantity: "", measure: "" });
      setFormIngredient(false);
    } else {
      // Opcional: mostrar un mensaje de error si los campos no están completos
      alert("Por favor complete todos los campos.");
    }
  }

  return (
    <div className="container">
      
      <label className="label">Ingredientes</label>
      <p className="button custom" onClick={handleClick}>
        +
      </p>
      <IngredientesList></IngredientesList>
      {/* <div> */}
      <ul>Agregados:
        {ingSubmit.length > 0 &&
            ingSubmit.map((i, index) => (
              <li key={index} className="">
                {i.name} {i.quantity} {i.measure}
              </li>
            ))}
      </ul>
      {/* </div> */}
      {formIngredient && (
        <form className="form-ingredient">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                value={ingrediente.name}
                onChange={handleIngredientChange}
                placeholder="Nombre del ingrediente"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="number"
                name="quantity"
                value={ingrediente.quantity}
                onChange={handleIngredientChange}
                placeholder="Cantidad"
              />
            </div>
          </div>
          <div className="select">
            <select
              name="measure"
              value={ingrediente.measure}
              onChange={handleIngredientChange}
            >
              <option value="">Seleccione una medida</option>
              {medidas.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button" onClick={handleSubmitIng}>Agregar</button>
        </form>
      )}
    </div>
  );
}
