import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {Context} from '../../../index'
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

import { ORGANIZATION_ROUTER } from '../../../utils/const';

import styles from './ParticipantSelect.module.css';

const ParticipantSelect = observer(() => {

    const navigate = useNavigate();

    const { user } = useContext(Context);

    const [selectedSport, setSelectedSport] = useState(null);




    const handleNext = () => {
        user.setSelectedSport(selectedSport);
        // user.printUserData();

        navigate(ORGANIZATION_ROUTER);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };



    return (
        <div className={styles.main__container}>
            <form  className={styles.services_form} onSubmit={handleSubmit}>
                <div>
                    <h2>Список участников</h2>
                </div>
                <div className={styles.services}>
                    {user.typeSport.map(item => (
                        
                        <div key={item.id} className={styles.service__item}>
                            <input
                                className={styles.services__checkbox}
                                type="checkbox"
                                id={item.id}
                                checked={selectedSport?.id === item.id}
                                onChange={() => setSelectedSport(item)}
                            />
                            <label htmlFor={item.id}>{item.sport_name}</label>
                        </div>
                        
                    ))}

                </div>
                <div className={styles.button__container}>
                    <Button text={"Выбрать"} onClick={handleSubmit} disabled={!selectedSport} className={styles.next__button}>
                        
                    </Button>
                </div>



            </form>
        </div>
    );
});

export default ParticipantSelect;
















/* <div className={styles.service__item}>
    <input
        className={styles.services__checkbox}
        type="checkbox"
        id="carWash"
        checked={selectedService === 1}
        onChange={() => setService(1)}
    />
    <label htmlFor="carWash">Автомойка</label>
</div>
<div className={styles.service__item}>
    <input
        className={styles.services__checkbox}
        type="checkbox"
        id="tireService"
        checked={selectedService === 2}
        onChange={() => setService(2)}
    />
    <label htmlFor="tireService">Шиномонтаж</label>
</div> */
