import React, { Component, useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import clientConfig from '../client-config';

function Intern() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("muchkilaaaa");
    const [intern, setIntern] = useState({});
    const [id, setId] = useState('');
    const { internid } = useParams();
    const navigate = useNavigate();
    const usernamelocal = localStorage.getItem('userName');

    let currentid = internid;


    useEffect(() => {
        notloggedin();
    }, [])


    const notloggedin = () => {
        if (!usernamelocal) {
            navigate("/login/");
        }
        else {
            console.log('sir 3laah');
            setLoading(true);
            const website = clientConfig.siteUrl;
            axios.get(website + '/wp-json/wp/v2/intern/' + currentid)
                .then(res => {
                    setLoading(false);
                    setError('machiiiiiiii muskil');
                    setIntern(res.data);
                }).catch(error => {
                    console.log(error);
                });
            console.log('loading changed!')
        }
    }


    const removeTags = (str) => {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '');
    }




    return (
        <div className='content'>
            {
                intern.title && (<div >{removeTags(intern.content.rendered)}</div>)
            }
        </div>
    )
}

export default Intern;
