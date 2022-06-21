import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getDogName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogName(name));
  }

  return (
    <div>
      <div className="searchBox">
        <input className="searchInput" type="text" name="" placeholder="Search"  onChange={(e) => handleInputChange(e)}/>
        <button className="searchButton"  onClick={(e) => handleSubmit(e)}>
            <img src="https://previews.123rf.com/images/marcel63/marcel630707/marcel63070700039/1262490-a-cool-dog.jpg" alt="icono" width="200px" height="200px" />
        </button>
      </div>
    </div>
  );
}