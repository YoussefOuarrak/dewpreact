import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse , faPodcast ,faD ,faNewspaper , faUser } from '@fortawesome/free-solid-svg-icons'
import logo  from '../images/logo.svg';
import { useParams } from 'react-router-dom';



const Header = () => {
        const { username } = useParams();
        let currentusername = username;

        return (
            <div className="main-nav-wrapper " >
                <nav className="uk-navbar-container uk-navbar" uk-navbar="">
                    <div className="uk-navbar-center">
                        <ul className="uk-navbar-nav">
                            <li className="uk-active"><Link to={{ pathname: "/" }} ><span className='nav-ul-link'> Home </span><FontAwesomeIcon className='nav-ul-icon' icon={faHouse} /></Link></li>
                            <li className="uk-active"><Link to={{ pathname: "/posts" }} ><span className='nav-ul-link'> Posts </span><FontAwesomeIcon className='nav-ul-icon' icon={faNewspaper} /></Link></li>
                            <li className="uk-active"><Link to={{ pathname: "/posts" }} ><img className='logo' alt="" src={logo} /></Link></li>
                            <li className="uk-active"><Link to={{ pathname: "/podcasts" }} ><span className='nav-ul-link'>Podcasts</span><FontAwesomeIcon className='nav-ul-icon' icon={faPodcast} /></Link></li>
                            <li className="uk-active"><Link to={{ pathname: "/courses" }} ><span className='nav-ul-link'>Deutsch Lernen</span><FontAwesomeIcon className='nav-ul-icon' icon={faD} /></Link></li>
                            <li className="uk-active"><Link to={{ pathname: "/dashboard/" + {currentusername} }} ><span className='nav-ul-link'>my Profil</span><FontAwesomeIcon className='nav-ul-icon' icon={faUser} /></Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
}

export default Header;