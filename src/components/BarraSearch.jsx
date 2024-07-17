function BarraSearch() {
    return (
        <div className="field has-addons">
          <div className="control is-expanded">{/* is-expanded */}
            <input className="input is-rounded" type="text" placeholder="Buscar..." />
          </div>
          <div className="control ">
            <button className="button is-info is-medium is-rounded">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
  
    );
  }
  export default BarraSearch;