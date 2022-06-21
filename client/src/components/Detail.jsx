import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions/index";
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
                alt="alt"
                width="500px"
                height="500px"
                />

            <div className="data">
                <div className="sub_data">
                    <p className="span">Name:</p>
                    <h1>{myDog[0].name}</h1>
                </div>
                <div className="sub_data">
                    <p className="span">Lifespan:</p>
                    <p>{myDog[0].life_span}</p>
                </div>
                <div className="sub_data">
                    <p className="span">Temperaments:</p>
                    <p>
                        {myDog[0].temperament
                        ? myDog[0].temperament
                        : myDog[0].temperaments.map((temp) => temp.name.concat(" "))}
                    </p>
                </div>
                <div className="sub_data">
                    <p className="span">Height:</p>
                    <p>{myDog[0].min_height}cm</p>
                    <p>{myDog[0].max_height}cm</p>
                </div>
                <div className="sub_data">
                    <p className="span">Weight:</p>
                    <p>{myDog[0].min_weight} Minimum</p>
                    <p>{myDog[0].max_weight} Maximum</p>
                </div>
            </div>
        </div>
        )}
        <Link to='/home'>
            <button onClick={() => handleClear()}>Return</button>
        </Link>
    </div>
    )
    

}