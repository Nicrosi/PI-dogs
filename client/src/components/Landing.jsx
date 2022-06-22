import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Landing.css';
import cool_dog from '../assets/cool_dog.jpg'

export default function Landing(){
    return(
        <div className="landing">
            <div className='img_container'>
                <img src={cool_dog} alt="" />
                </div>
            <div className='container'>
                <p>Hi! Welcome to Dogs App!</p>
                    <Link to = '/home'>
                        <button> 
                            GO
                        </button>
                    </Link>
                </div>
        </div>

    )
}