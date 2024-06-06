import api from './api';



export const saveSport = async (sport) => {
    try{
        
        const response = await api.post('/sport/save', sport);
        console.log(response.data);
        return response.data

    } catch (error) {
        console.error('Error get score:', error);
        throw error;
    }
}


export const saveParticipant = async (participant) => {
    try {
        const response = await api.post(`/participant/save`, participant);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error saving participant:', error);
        throw error;
    }
};


export const saveCriteria = async (criteria) => {
    try {
        const response = await api.post(`criteria/save`, criteria);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error saving participant:', error);
        throw error;
    }
};


