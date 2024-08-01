import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import IngredientesList from "./IngredienteList";

export default function Paso({addStep, paginaEdit, editStepInitial,}) {
    
    const { id } = useParams();
    const [pasoSubmit, setPasoSubmit] = useState([]);
    const [orden, setOrden]=useState(1); 
    const [paso, setPaso] = useState({order: 1, instruction: ""}); //

    const [formPaso, setFormPaso] = useState(false);

    // ediciones para los ingredientes anteriores
    const [listStep, setListStep] = useState([]);
    const [stepsEdit, setStepsEdit] = useState([]);
    
    const fetchSteps = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            const pasos = data.results;
            const stepOfRecipe = pasos.filter((step) => step.recipe === parseInt(id));
            setListStep(stepOfRecipe)
            setOrden(stepOfRecipe.length + 1)
    
            if (data.next) {
                fetchSteps(data.next);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
    
    useEffect(() => {
        if (paginaEdit) {
            fetchSteps(`${import.meta.env.VITE_API_BASE_URL}/reciperover/steps/`);
        }
    }, [id, paginaEdit]);

    function handleClick() {
        setFormPaso(!formPaso);
    }

    function handleStepChange(event) {
        setPaso({
            ...paso,
            [event.target.name]: event.target.value,
        });
    }

    // function para los NUEVOS elementos a cargar o asignar
    function handleSubmitPaso(event) {
        // event.stopPropagation();
        event.preventDefault();
        addStep(paso); // llamada desde RecetaForm
        setPasoSubmit([...pasoSubmit, paso]); //array para ir mostrando
        setPaso({ order: orden+1, instruction: "" });
        setOrden(orden + 1);//incrementamos el orden
        setFormPaso(false);
       
    }
    // funcion para modificar los pasos anteriores
    function handleStepEditChange(event) {
        setStepsEdit({
            ...stepsEdit,
            [event.target.name]: event.target.value,
        });
    }
    function onClickStepEdit(id, event) {
        // para modicar un paso debo de tener el orden del paso
        const [lista] = listStep.filter((step) => step.order === id);
        console.log(lista); //paso inicial
        console.log(stepsEdit); //campo modificado
        editStepInitial([lista, stepsEdit]);
    }
    
    return (
        <div className="container is-flex is-flex-direction-column">
            <div className="is-flex is-flex-direction-row is-justify-content-space-between mb-1">
                <label className="label has-text-white">Preparación: </label>
                <p
                    className="button custom "
                    style={{ width: "40px", heigth: "30px" }}
                    onClick={handleClick}
                >
                    +
                </p>
            </div>
            {paginaEdit ? (
            <div className="container-pasos mb-1">
                {listStep.length > 0
                        ? listStep.map((step, index) => (
                              <div
                                  key={index}
                                  className="columns m-1"
                              >                                 
                                  <input
                                      className="input mr-1 column is-narrow"
                                      type="number"
                                      name="order"
                                      value={step.order}
                                      style={{width:"5em"}}
                                    //   onChange={handleStepEditChange}
                                    //   required
                                      readOnly
                                  />
                                  <input
                                      className="input mr-1 column"
                                      type="text"
                                      name="instruction"
                                      value={step.instruction}
                                    //   defaultValue={step.instruction}
                                      onChange={handleStepEditChange}
                                      required
                                  />
                                  <p
                                      onClick={() => onClickStepEdit(step.order)}
                                      className="button is-info"
                                  >
                                      {" "}
                                      <ion-icon name="create-outline"></ion-icon>
                                  </p>
                              </div>
                          ))
                        : null
                    }
            </div>
            ): null}
            <div className="b-1">
                <h3 style={{ color: "#49ff4f" }}>Agregados: </h3>
                {pasoSubmit.length > 0 && (
                    <div className="">
                        
                        {pasoSubmit.map((p, index) => (
                            <div key={index} className="columns m-1">
                                {/* <div className=""> */}
                                    <input
                                        className="input mr-1 column is-narrow"
                                        type="number"
                                        value={p.order}
                                        readOnly
                                        style={{width:"5em"}}
                                    />
                                    <input
                                        className="input column"
                                        type="text"
                                        value={p.instruction}
                                        readOnly
                                    />
                                {/* </div> */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {formPaso ? (
                <form className="form-ingredient mb-1" >
                    <div className="columns ">
                        <div className="control column is-narrow" style={{width:"5em"}}>
                            <input
                                    className="input m-1"
                                    type="number"
                                    min="1"
                                    name="order"
                                    value={orden}
                                    readOnly
                            />
                        </div>
                        <div className="control column">
                            <input
                                className="input m-1"
                                id="instruction"
                                name="instruction"
                                value={paso.instruction}
                                // defaultValue={paso.instruction}
                                onChange={handleStepChange}
                                placeholder="instruction"
                                required
                            />
                        </div>
                        
                        
                        <div className="control column is-narrow m-1"><button
                            type="submit"
                            className="button custom"
                            onClick={handleSubmitPaso} 
                        >
                            Agregar
                        </button></div>
                    </div>
                </form>
            ) : null}
        </div>
    );
}
