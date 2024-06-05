import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../../../index';
import { useNavigate } from 'react-router-dom';
import styles from './ParticantList.module.css';
import { PARTICANT_ROUTER } from '../../../utils/const';

import { getParticipants } from "../../../components/http/particantApi";
import Spinner from 'react-bootstrap/Spinner';


const ParticantList = observer(() => {


    const {particant} = useContext(Context);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchSurname, setSearchSurname] = useState('');
    const [filteredParticipants, setFilteredParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const data = await getParticipants();
                particant.setParticipants(data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [particant]);

    useEffect(() => {


        const filterParticipants = () => {

            if(!particant.selectedSport){
                setFilteredParticipants([]);
                return;
            }

            const filtered = particant.participants.filter(participant => 
                participant.sportEntity?.sportName === particant.selectedSport.sportName &&
                (searchSurname.trim() === '' || participant.surname.toLowerCase().includes(searchSurname.toLowerCase()))
            );
            setFilteredParticipants(filtered);
        };

        filterParticipants();
    }, [searchSurname, particant.selectedSport, particant.participants]);

    const handleSearch = () => {
        const filterParticipants = () => {
            const filtered = particant.participants.filter(participant => 
                participant.sportEntity?.sportName === particant.selectedSport.sportName &&
                (searchSurname.trim() === '' || participant.surname.toLowerCase().includes(searchSurname.toLowerCase()))
            );
            setFilteredParticipants(filtered);
        };

        filterParticipants();
    };

    const handleSelectParticipant = (participant) => {
        particant.setSelectedParticipant(participant);
        navigate(PARTICANT_ROUTER + '/' + participant.id);
    };

    if (loading) {

        return (
            <div className={styles.spinner}>
                <Spinner animation="border" />
            </div>
        )   
    }

    return (
        <div className={styles.participant__container}>
            <div className={styles.form__search}>
                <input
                    className={styles.form_input}
                    type="text"
                    placeholder="Введите фамилию"
                    value={searchSurname}
                    onChange={(e) => setSearchSurname(e.target.value)}
                />
                <button onClick={handleSearch}>
                    Искать
                </button>
            </div>

            <div className={styles.participant__list}>
                {filteredParticipants.map((participant, index) => (
                    <div
                        key={index}
                        className={styles.participant__item}
                        onClick={() => handleSelectParticipant(participant)}
                    >
                        <div className={styles.participant_name}>
                            {participant.surname} {participant.name} {participant.middleName}
                        </div>
                    </div>
                ))}
                {filteredParticipants.length === 0 ? <div>Ничего не найдено</div> : null}
            </div>
        </div>
    );
});

export default ParticantList;