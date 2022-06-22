import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import '../css/DogCreate.css'

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.max_weight) {
    errors.max_weight = "Maximum weight is required";
  }
  if (!input.min_weight) {
    errors.min_weight = "Minimum weight is required";
  }
  if (!input.min_height) {
    errors.min_height = "Minimum height is required";
  }
  if (!input.max_height) {
    errors.max_height = "Maximum height is required";
  }
  return errors;
}

export function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [temps, setTemps] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const [input, setInput] = useState({
    name: "",
    max_height: 0,
    min_height: 0,
    max_weight: 0,
    min_weight: 0,
    life_span: 0,
    image: "",
    temperament: [], //Es un array para poder guardar multiples temperamentos
  });

  function handleChange(e) {
    if (
      e.target.name === "min_height" ||
      e.target.name === "max_height" ||
      e.target.name === "max_weight" ||
      e.target.name === "min_weight" ||
      e.target.name === "life_span"
    ) {
      if (e.target.value > 80) {
        e.target.value = 80;
        alert("Value can't surpass 80");
      }
      if (e.target.value < 0) {
        e.target.value = 0;
        alert("Value can't be negative");
      }
    }

    setInput({
      ...input,
      [e.target.name]: e.target.value, //Cada vez que la funcion se ejecute, a mi estado input ademas de lo que tiene, le agrego el target value de lo que esta modificando
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handeSelect(e) {
    if(temps.length >= 6) alert("There can only be 6 temperaments")
    else{
      if (!temps.includes(e.target.value)) {
        if (temps.length > 0) {
          setTemps([...temps, e.target.value]);
        } else {
          setTemps([e.target.value]);
        }
      
    }else{
      alert("You can't add the same temperament more than once");
    }
    }
  }
  function handleDeleted(e) {
    e.preventDefault();
    setTemps(temps.filter((t) => t !== e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    let isEmpty = Object.keys(errors).length === 0

    if(!isEmpty){
      alert("No mandatory fields can remain empty")
    }else{

      const addDog = {
        name: input.name,
        life_span: input.life_span + " years",
        min_height: input.min_height,
        max_height: input.max_height,
        min_weight: input.min_weight,
        max_weight: input.max_weight,
        image: input.image,
        temperament: temps
    }   
      dispatch(postDog(addDog));
      setInput({
        name: "",
        max_height: 0,
        min_height: 0,
        max_weight: 0,
        min_weight: 0,
        life_span: 0,
        image: "",
        temperament: [],
      });
      setTemps([])
      alert("Created correctly");
      navigate('/home')
    }
    
  

  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>New Breed</h1>
        <div className="container__input">
          <div className="container__box">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="max_height">Maximum Height:</label>
            <input
              type="number"
              value={input.max_height}
              name="max_height"
              onChange={handleChange}
              required
            />
            {errors.max_height && <p className="error">{errors.max_height}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="min_height">Minimum Height:</label>
            <input
              type="number"
              value={input.min_height}
              name="min_height"
              onChange={handleChange}
              required
            />
            {errors.min_height && <p className="error"> {errors.min_height}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="min_weight">Maximum Weight:</label>
            <input
              type="number"
              value={input.min_weight}
              name="min_weight"
              onChange={handleChange}
              required
            />
            {errors.min_weight && <p className="error">{errors.min_weight}</p>}
          </div>
          <div className="container__box">
            <label htmlFor="max_weight">Minimum Weight:</label>
            <input
              type="number"
              value={input.max_weight}
              name="max_weight"
              onChange={handleChange}
              required
            />
            {errors.max_weight && <p className="error">{errors.max_weight}</p>}
          </div>
          
          <div className="container__box">
            <label htmlFor="life_span">Lifespan:</label>
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
            />
          </div>
          <div className="container__box">
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__select">
          <label htmlFor="temp">Temperaments</label>
          <select name="temp" onChange={(e) => handeSelect(e)}>
            <option value={null}>Temperaments</option>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div className="container__temperaments">
            {temps.map((temp) => {
              return (
                <div key={temp}>
                  <div className="container__temp__box">
                    <p>{temp}</p>
                    <button
                      className="container__button"
                      value={temp}
                      onClick={(e) => handleDeleted(e)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container__form__button">
          <button type="submit">Create</button>
          <Link to="/home">
            <button>Return</button>
          </Link>
        </div>
      </form>
      <div></div>
    </div>
  );
}