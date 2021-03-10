import axios from 'axios';

export default() => {

    let token = localStorage.getItem('token');

    if (!token) {
        token = localStorage.setItem('token', '')
    }
    
    return axios.create({
        baseURL: 'http://localhost:3000/api/',
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}