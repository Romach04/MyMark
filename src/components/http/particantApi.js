import api from './api';


export const getSport = async () => {
    try {
        const response = await api.get(`/sport`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error get sport:', error);
        throw error;
    }
}


export const getParticipants = async () => {
    try {
        const response = await api.get('/participant');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting participants:', error);
        throw error;
    }
};



