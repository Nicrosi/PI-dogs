import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions/index";
import '../css/Detail.css'
export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  function handleClear() {
    dispatch(clearDetail());
  }
  return(
    <div>
        {myDog.length > 0 && (
            <div className="detailContainer">
                <img
                className="detailImage"
                src={myDog[0].image}
                alt=""
                width="500px"
                height="500px"
                />

            <div className="data">
                <div className="sub_data">
                    <h1>{myDog[0].name}</h1>
                </div>
                <div className="sub_data">
                    <h3 className="span">Lifespan:</h3>
                    <p>{myDog[0].life_span}</p>
                </div>
                <div className="sub_data">
                    <h3 className="span">Temperaments:</h3>
                        {myDog[0].temperament
                        ? myDog[0].temperament
                        : myDog[0].temperaments.map((temp) => temp.name.concat(" "))}
                </div>
                <div className="sub_data">
                    <h3 className="span">Height:</h3>
                    <p>Minimum - {myDog[0].min_height}cm</p>
                    <p>Maximum - {myDog[0].max_height}cm</p>
                </div>
                <div className="sub_data">
                    <h3 className="span">Weight:</h3>
                    <p>Minimum - {myDog[0].min_weight} Kg</p>
                    <p>Maximum - {myDog[0].max_weight} Kg</p>
                </div>
            </div>
        </div>
        )}
        <Link to='/home'>
            <button className="boturn" onClick={() => handleClear()}>Return</button>
        </Link>
    </div>
    )
    

}