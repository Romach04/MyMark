import api from './api';


export const getSport = async () => {
    try {
        const response = await api.get(`/sport`);
        // console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error get sport:', error);
        throw error;
    }
}


export const getParticipants = async () => {
    try {
        const response = await api.get('/participant');
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting participants:', error);
        throw error;
    }
};

export const getParticipantById = async (id) => {
    try {
        const response = await api.get('/participant/' + id);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error get participant:', error);
        throw error;
    }

}


export const getScores = async () => {
    try{
        
        const response = await api.get('/score');
        // console.log(response.data);
        return response.data

    } catch (error) {
        console.error('Error get score:', error);
        throw error;
    }
}



export const getCriteria = async () => {
    try{
        
        const response = await api.get('/criteria');
        console.log(response.data);
        return response.data

    } catch (error) {
        console.error('Error get score:', error);
        throw error;
    }
}

export const saveScore = async (scoreData) => {
    try{
        
        const response = await api.post('/score/updateScore', scoreData);
        //console.log(response.data);
        return response.data

    } catch (error) {
        console.error('Error get score:', error);
        throw error;
    }
}


