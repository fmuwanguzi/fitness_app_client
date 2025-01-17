// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
import GoogleBtn from '../components/GoogleBtn'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const responseSuccess = async (response) => {
        const profile = response.profileObj
        const userData = {
            googleId: profile.googleId,
            email: profile.email
        }
        axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            // Save token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            // Set current user
            props.nowCurrentUser(decoded);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };

        axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            // Save token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            // Set current user
            props.nowCurrentUser(decoded);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    if (props.user) return <Redirect to='/profile' />

    return (
        <div className="">

                <div className="card d-flex align-items-center text-center p-5">
                    <h2 className="">
                        Login with your Google account
                    </h2>
                    <GoogleBtn responseSuccess={responseSuccess}/>
                </div>


                <div className="card-body">
                    <h2 className="py-2">Login</h2>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>

        </div>
    )
}

export default Login;