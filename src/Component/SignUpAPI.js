import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientConfig from "../client-config";

//Need a side Script Api (signup.php)
function SignUpAPI(props) {
    const [urlToLogin, setUrlToLogin] = useState('')
    const navigate = useNavigate();
    const website = clientConfig.siteUrl;

    useEffect(() => {
        if (props.APIDetailsSignUp.user.length > 0 && props.APIDetailsSignUp.email.length > 0 && props.APIDetailsSignUp.pass.length > 0) {
            let formData = new FormData()
            formData.append('user', props.APIDetailsSignUp.user)
            formData.append('email', props.APIDetailsSignUp.email)
            formData.append('pass', props.APIDetailsSignUp.pass)

            const url = website + '/wp-content/themes/Headless-theme/signup.php';
            console.log(url);
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json()) //json
                .then((data) => {
                    console.log('jab data direkt 9bl if: ' + data.success)
                    if (data['success']) {
                        localStorage.setItem('jwt', data['data']['jwt'])
                        navigate("/login");
                        // console.log(data)
                        // console.log(data['data']['jwt'])
                    }
                    else {
                        alert(data['data']['message']);
                        console.log('7na fiin');
                        console.log(data)
                        console.log(data['data']['message'])
                    }
                })
        }
    }, [props.APIDetailsSignUp])

    useEffect(() => {
        if (urlToLogin.length > 0) {
            fetch(urlToLogin, {
                method: 'GET'
            })
                .then((response) => {
                    if (response.status == '200') {
                        props.setIsLoggedIn(true)
                        props.setUsername(props.APIDetailsSignUp.user)
                    }
                    else {
                        console.log('error')
                    }
                })
        }

    }, [urlToLogin])

    return (
        <>
        </>
    )

}

export default SignUpAPI
