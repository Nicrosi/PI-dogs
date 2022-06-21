import React from "react";

export default function Card({ image, name, temperament, min_weight, max_weight }){
    return(
        <div className="card">
            <img
            className="imageCard"
            src = {image} width="200px" height="200px" 
            alt = "alt"/>
            <h4>Name: {name}</h4>
            <h5>Temperaments: {temperament}</h5>
            <h5>Minimum Weight: {min_weight}</h5>
            <h5>Maximum Weight: {max_weight}</h5>
        </div>
    )
}