import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  filterByTemperament,
  getDogs,
  orderByName,
  orderByWeight,
  getTemperaments,
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Cards";
import Pages from "./Pages";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allTemp = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [orden, setOrden] = useState("");
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    document.getElementsByClassName("container_filter").selectedIndex = 0;
    document.getElementsByClassName("container_filter").value = "Default";
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`);
    console.log(e.target.value);
  }

  function handleSortW(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`);
    console.log(e.target.value);
  }
  function handleChange(e) {
    console.log("Arrived");
    setCurrentPage(1);
  }
  
  console.log(currentDogs,"hola");
  return (
    <div>
      <header>
        <div
          className="logo"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <img src="https://previews.123rf.com/images/marcel63/marcel630707/marcel63070700039/1262490-a-cool-dog.jpg" alt="" />
          Dogs
        </div>

        <nav>
          <ul className="nav__links">
            <li>
              <div className="a__color">
                <Link to="/dog" className="button">
                  Add
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container__options">
        <div className="container__filter">
          <select onChange={(e) => handleSort(e)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select onChange={(e) => handleSortW(e)}>
            <option value="mayor">Max Weight</option>
            <option value="menor">Min Weight</option>
          </select>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">API</option>
          </select>
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option value="temperamento"> Temperaments </option>
            <option value="all"> All </option>
            {allTemp.map((t) => (
              <option key={t.id} value={t.name}>
                {" "}
                {t.name}{" "}
              </option>
            ))}
          </select>
        </div>

        <div
          className="container__input__Search"
          onChange={(e) => handleChange(e)}
        >
          <SearchBar />
        </div>
      </div>

      <div className="containerCard">
        {currentDogs !== "error" && currentDogs.length > 0 ? (
          currentDogs?.map((the) => {
            return (
              <div key={the.id} className="container__card">
                <Link to={"/home/" + the.id}>
                  <Card
                    name={the.name}
                    image={the.image ? the.image : the.img}
                    min_weight={the.min_weight}
                    max_weight={the.max_weight}
                    temperament={
                      the.temperament
                        ? the.temperament
                        : the.temperaments &&
                          the.temperaments.map((temp) => temp.name.concat(" "))
                    }
                    key={the.id}
                  />
                </Link>
              </div>
            );
          })
        ) : currentDogs.length === 0 ? (
          <div className="container__center2">
            <div className="container__details__card">
              <div>Loading</div>
            </div>
          </div>
        ) : (
          <div className="container__center">
            <div className="container__error">
              <p>No breed with that name</p>
            </div>
          </div>
        )}
      </div>
      {
        <Pages
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          currentDogs={currentDogs}
          pages={pages}
          currentPage={currentPage}
        />
      }
    </div>
  );
}
