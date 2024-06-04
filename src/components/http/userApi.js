import axios from 'axios';

import api from './api';



export const registerUser = async (userData) => {
    try {
        const response = await api.post(`/register/user`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const getSport = async () => {
    try {
        const response = await api.get(`/sport`);
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const loginUser = async (loginData) => {

    const formData  = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);

    // try {
    //     const response = await api.post('/login', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    //     return response.data;
    // } catch (error) {
    //     console.error('Error logging in:', error);
    //     throw error;
    // }

    try{
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST',
            body: formData
          });
  

        console.log(response)
        return response.data;

    } catch(error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


















// const API_URL = 'http://localhost:8080';

// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_URL}/register/user`, userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error registering user:', error);
//         throw error;
//     }
// };