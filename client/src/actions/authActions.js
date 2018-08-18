import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Login - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {  
        // Save to localStorage
        const { token } = res.data;

        // Set token to localStorage
        localStorage.setItem('jwtToken', token);

        // Set Token to Auth Header
        setAuthToken(token);

        //Decode Token to Get User Data
        const decoded = jwt_decode(token);

        // Set Current User
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};

// Set Logged in User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future request
    setAuthToken(false);

    // Set the current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}