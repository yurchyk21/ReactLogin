import axios from 'axios';

export function userSignupRequest(userData){
    return dispatch =>{
        return axios.post('http://localhost:54730/api/users',userData);
    }
}