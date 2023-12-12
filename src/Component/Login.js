
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Input } from "reactstrap";
import Loader from "../loader.gif";
import clientConfig from '../client-config';
import loginImg from '../images/login.jpg'
// import AppContext from "./context/AppContext";

const Login = () => {

    // const [store, setStore] = useContext();
    const navigate = useNavigate();
    const [loginFields, setLoginFields] = useState({
        username: '',
        password: '',
        userNiceName: '',
        userEmail: '',
        loading: false,
        error: '',
        token: ''
    });

    useEffect(() => {
        Redirection();
    }, []);


    const Redirection = () => {
        if (localStorage.getItem('token') && localStorage.getItem('userName')) {
            const usernamelocal = localStorage.getItem('userName');
            const tokenlocal = localStorage.getItem('token');
            setLoginFields({ ...loginFields, username: localStorage.getItem('userName') });
            console.log('usernaem from redirecion: ' + usernamelocal);
            navigate("/dashboard/" + usernamelocal);
        }
        else {
            return null;
        }
    }

    const createMarkup = (data) => ({
        __html: data
    });

    const onFormSubmit = (event) => {
        event.preventDefault();
        const website = clientConfig.siteUrl;

        // const website = 'http://localhost/wpprojekte/ebike';

        const loginData = {
            username: loginFields.username,
            password: loginFields.password,
        };

        setLoginFields({ ...loginFields, loading: true });

        axios.post(website + '/wp-json/jwt-auth/v1/token', loginData)
            .then(res => {

                if (undefined === res.data.token) {
                    setLoginFields({
                        ...loginFields,
                        error: res.data.message,
                        loading: false
                    }
                    );
                    return;
                }

                const { token, user_nicename, user_email } = res.data;

                localStorage.setItem('token', token);
                localStorage.setItem('userName', user_nicename);

                // setStore({
                //     ...store,
                //     userName: user_nicename,
                //     token: token
                // });

                setLoginFields({
                    ...loginFields,
                    loading: false,
                    token: token,
                    userNiceName: user_nicename,
                    userEmail: user_email,
                    token: token
                })
            })
            .catch(err => {
                setLoginFields({ ...loginFields, error: err.response.data.message, loading: false });
            })
    };

    const handleOnChange = (event) => {
        setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
    };


    const { username, password, userNiceName, error, loading } = loginFields;

    if (loginFields.token) {
        navigate("/dashboard/" + username);
        return null;
    } else {
        return (

            <div className="base-container">
                <div className="content">
                    <div className="imageregister">
                        <img src={loginImg} />
                    </div>
                    <form className="form" onSubmit={onFormSubmit} >
                        <div >
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input className="uk-input" type="text" name="username" id="username" placeholder="Enter your username" type="text" value={username} onChange={handleOnChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input className="uk-input" type="password" name="password" id="password" placeholder="Enter your password" type="password" className="form-control" name="password" value={password} onChange={handleOnChange} />
                            </div>
                            <div className='login-btn'>
                                <button type="submit" className="uk-button uk-button-secondary">Login</button>
                                <Link to={{ pathname: "/register" }} >
                                    <button className="uk-button uk-button-primary">Join us</button>
                                </Link>
                            </div>
                        </div>
                        {loading && <img className="loader" src={Loader} alt="Loader" />}
                    </form>
                </div>
            </div >
        )
    }
};

export default Login;
