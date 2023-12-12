import React, { useState } from 'react';
import '../style/Registerform.css'
import SignUpAPI from './SignUpAPI';
import loginImg from '../images/register.jpg'
import {  Link } from "react-router-dom";


function Register(props) {
    const [APIDetailsSignUp, setAPIDetailsSignUp] = useState({
        user: '',
        email: '',
        pass: '',
    })
    const [signUpDetails, setSignUpDetails] = useState({
        user: '',
        email: '',
        pass: '',
    })
    console.log(signUpDetails)

    function handleChange(e) {
        const { name, value } = e.target
        setSignUpDetails(prev => {
            return (
                { ...prev, [name]: value }
            )
        })
    }

    function handleSubmit() {
        setAPIDetailsSignUp({ ...signUpDetails })
    }

    return (
        <>
            <p>{props.serverMessage}</p>
            <div className="base-container" >
                <div className="content">
                    <div className="imageregister">
                        <img src={loginImg} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <input type="text" placeholder="User Name" name="user" value={signUpDetails.user} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Adress" name="email" value={signUpDetails.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" name="pass" value={signUpDetails.pass} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" className="uk-button uk-button-primary" onClick={handleSubmit}>
                        Register
                    </button>
                    <Link to={{ pathname: "/login" }} >
                        <button className="uk-button uk-button-secondary" onClick={handleSubmit}>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <SignUpAPI APIDetailsSignUp={APIDetailsSignUp} setUsername={props.setUsername} setIsLoggedIn={props.setIsLoggedIn} />
        </>
    )


}

export default Register
