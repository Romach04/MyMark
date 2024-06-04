

import api from './api';


export const registerUser = async (userData) => {
    try {
        const response = await api.post(`/register/user`, userData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


export const loginUser = async (loginData) => {

    const formData  = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);



    try{
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST',
            body: formData,
            credentials: 'include',
          });
  


        return response.status;

    } catch(error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logOut = async () => {
    try {
        const response = await fetch("http://localhost:8080/logout", {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            return response.status;
        } else {
            throw new Error('Ошибка при выходе из системы');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}


















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