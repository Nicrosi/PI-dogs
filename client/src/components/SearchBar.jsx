import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getDogName } from "../actions";
import '../css/SearchBar.css'

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
            Search
        </button>
      </div>
    </div>
  );
}