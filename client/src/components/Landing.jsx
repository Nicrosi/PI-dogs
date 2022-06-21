import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
    return(
        <div className="landingpage">
            <div className='img_container'>
                <img src="https://previews.123rf.com/images/marcel63/marcel630707/marcel63070700039/1262490-a-cool-dog.jpg" alt="" />
                </div>
            <div className='container'>
                <div className='container_tittle'>
                <p className='container_welcome'>Hi,</p>
                <div  className='container__welcome__bg'>
                <p>Welcome</p>
                </div>
                <p>To <span className='container_span'>Dogs</span> App</p>
                </div>
                    <Link to = '/home'>
                        <button className='container_button'> 
                            GO
                        </button>
                    </Link>
                </div>
        </div>

    )
}