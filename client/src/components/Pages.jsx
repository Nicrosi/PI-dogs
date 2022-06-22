import React from "react";
import '../css/Pages.css'

export default function Pages({
  dogsPerPage,
  allDogs,
  pages,
  currentPage,
  currentDogs,
}) {

  if (currentDogs !== "error") {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="container__pagination">
        <li>
          
          <button
            className="container__button__page"
            disabled={currentPage > 1 ? false : true}
            onClick={() => pages(currentPage - 1)}
          >
            Prev
          </button>
        </li>
        <li>
          <div className="container__page__number">{currentPage}</div>
        </li>
        <li>
          <button
            className="container__button__page"
            disabled={currentPage < pageNumbers.length ? false : true}
            onClick={() => pages(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    );
  } else {
    return null;
  }
}
