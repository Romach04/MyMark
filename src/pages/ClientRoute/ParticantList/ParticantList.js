import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../../../index';
import { useNavigate } from 'react-router-dom';
import styles from './ParticantList.module.css';
import { PARTICANT_ROUTER } from '../../../utils/const';





const ParticantList = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [searchSurname, setSearchSurname] = useState('');
    const [filteredParticipants, setFilteredParticipants] = useState([]);

    useEffect(() => {
        // Фильтруем участников по выбранному виду спорта
        const filtered = user.selectedParticipants.filter(participant => 
            participant.sportEntity.sport_id === user.selectedSport.id
        );
        setFilteredParticipants(filtered);
    }, [user.selectedSport, user.selectedParticipants]);

    const handleSearch = () => {

        if(searchSurname.trim() === ''){
            const filtered = user.selectedParticipants.filter(participant => 
                participant.sportEntity.sport_id === user.selectedSport.id
            );
            setFilteredParticipants(filtered);

        } else {
            
            const filtered = user.selectedParticipants.filter(participant =>
                participant.surname.toLowerCase().includes(searchSurname.toLowerCase()) &&
                participant.sportEntity.sport_id === user.selectedSport.id
            );
            setFilteredParticipants(filtered);

        }
    };

    const handleSelectParticipant = (participant) => {
        // Обработчик выбора участника

        user.setSelectedParticipants(participant);
        user.printUserData();

        navigate(PARTICANT_ROUTER + '/' + participant.id);
    };

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
                {filteredParticipants.map(participant => (
                    <div
                        key={participant.id}
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