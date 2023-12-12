import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Interns from './InternComponent';
import Sliderintern from './Internslider';


const Dashboard = () => {

    const navigate = useNavigate();
    const usernamelocal = localStorage.getItem('userName');
    const { username } = useParams();
    let currentusername = username;
    useEffect(() => {
        notloggedin();
    }, [])

    const notloggedin = () => {
        if (usernamelocal != currentusername) {
            navigate("/login/");
        }
        else {
            return null;
        }
    }

    return (
        <>
        
        <Sliderintern /> 
        <div className='content'>
            <h4 className='dash-user'> Hallo {usernamelocal}</h4>
            <Interns></Interns>
        </div>
        </>
    )
}

export default Dashboard;
