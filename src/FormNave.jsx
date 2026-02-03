import { useState } from "react";

import "./App.css";


function FormNave({aggiungiNave}) {

  const [nome, setNome] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [stazza, setStazza] = useState("");


  const handleAggiungi = (e) => { //convenzione usare il termine handle+qualcosa
    e.preventDefault();
    const naveInput = {
      nome,tipologia,stazza
    }
    aggiungiNave(naveInput);
    setNome("");
    setTipologia("");
    setStazza("");
    
  };

  return (

    <>
    <form onSubmit={handleAggiungi} className="form-nave">
  <div className="form-group">
    <label htmlFor="nome">Nome Nave</label>
    <input
      id="nome"
      type="text"
      placeholder="Inserisci il nome"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="tipologia">Tipologia</label>
    <select
      id="tipologia"
      value={tipologia}
      onChange={(e) => setTipologia(e.target.value)}
      required
    >
      <option value="">Seleziona una tipologia</option>
      <option value="Portaerei">Portaerei</option>
      <option value="Incrociatore">Incrociatore</option>
      <option value="Cacciatorpediniere">Cacciatorpediniere</option>
      <option value="Sottomarino">Sottomarino</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="stazza">Stazza (tonnellate)</label>
    <input
      id="stazza"
      type="number"
      placeholder="Inserisci la stazza"
      value={stazza}
      onChange={(e) => setStazza(e.target.value)}
      min="0"
      required
    />
  </div>

  <button type="submit" className="btn btn-primary">
    Aggiungi Nave
  </button>
</form>
    </>
  );



}   

export default FormNave;
