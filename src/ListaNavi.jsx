import { useState } from "react";
import "./App.css";

const Print = ({ navi, eliminaNave, resetNavi }) => {
  if (!navi || navi.length === 0) return <div>Nessuna Nave</div>;
  return (
 <div className="table-container">
  <table className="navi-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Stazza</th>
        <th>Tipo</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      {navi.map((nave) => (
        <tr key={nave.id}>
          <td>{nave.nome}</td>
          <td>{nave.stazza}</td>
          <td>{nave.tipologia}</td>
          <td>
            <button 
              className="btn btn-delete" 
              onClick={() => eliminaNave(nave.id)}
            >
              Elimina
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="table-actions">
    <button className="btn btn-reset" onClick={resetNavi}>
      Reset Flotta
    </button>
  </div>
</div>
  );
};

function ListaNavi({ navi, eliminaNave,resetNavi }) {  
  return (
    <>
      <h1>Lista Navi</h1>
      <Print navi={navi} eliminaNave={eliminaNave} resetNavi={resetNavi}></Print>
    </>
  );
}   

export default ListaNavi;