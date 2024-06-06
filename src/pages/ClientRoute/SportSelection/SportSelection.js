import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {Context} from '../../../index'
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from "react-router-dom";
import { PARTICANT_ROUTER } from '../../../utils/const';
import { getSport } from "../../../components/http/particantApi";
import styles from './SportSelection.module.css';

import Button from 'react-bootstrap/Button';

const SportSelection = observer(() => {

    const navigate = useNavigate();


    const {particant} = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const data = await getSport();

                if (Array.isArray(data)) {
                    particant.setSports(data);
                } else {
                    particant.setSports([]);
                }

            } catch (error) {
                console.error('Error fetching sports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSports();
    }, [particant]);

    // const [selectedSport, setSelectedSport] = useState(null);




    const handleNext = () => {
        particant.setSelectedSport(particant.selectedSport);

        particant.printUserData();
        navigate(PARTICANT_ROUTER);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };

    const handleSportSelect = (sport) => {
        particant.setSelectedSport(sport);
    };

    if (loading) {
        return (

        <div className="spinner">
            <Spinner animation="border"/>
        </div>

        )
    }



    return (
        <div className={styles.main__container}>
            <form  className={styles.sport_form} onSubmit={handleSubmit}>
                <div>
                    <h2>Виды спорта</h2>
                </div>
                <div className={styles.sport__card}>
                    {particant.sports.map((item, index)=> (
                        
                        <div key={index} className={styles.sport__item}>
                            <input
                                className={styles.item__checkbox}
                                type="checkbox"
                                id={index}
                                checked={particant.selectedSport?.sportName === item.sportName}
                                onChange={() => handleSportSelect(item)}
                            />
                            <label htmlFor={index}>{item.sportName}</label>
                        </div>
                        
                    ))}

                </div>
                <div className={styles.button__container}>
                    <Button 
                    variant="outline-secondary"
                    onClick={handleSubmit}
                    disabled={!particant.selectedSport}
                    className={styles.next__button}
                    >
                    Выбрать
        
                    </Button>
                </div>



            </form>
        </div>
    );
});

export default SportSelection;
















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
