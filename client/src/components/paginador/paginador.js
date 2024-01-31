import "./paginador.css";

import React from "react";

const Paginado = ({ pokemons, page, viewPage, paginado }) => {
  const pageNum = Array.from({ length: Math.ceil(pokemons.length / viewPage) }, (_, i) => i + 1);
  
  const startPage = Math.max(1, page - 13);
  const endPage = Math.min(startPage + 24, pageNum.length);

  const pages = pageNum.slice(startPage - 1, endPage);

  return (
    <div className="style-page">
      {pageNum.length > 1 && (
        <div>
          <button onClick={page > 1 && (() => paginado(page - 1))} disabled={page === 1}>
            Prev
          </button>
          {pages.map(pag => (
            <button key={pag} onClick={() => paginado(pag)} disabled={page === pag}>
              {pag}
            </button>
          ))}
          <button onClick={page < pageNum.length && (() => paginado(page + 1))} disabled={page === pageNum.length}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Paginado;
