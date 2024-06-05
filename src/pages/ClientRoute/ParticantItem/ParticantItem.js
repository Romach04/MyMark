import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {useNavigate, useParams} from 'react-router-dom';
import { Context } from '../../../index';
import styles from './ParticantItem.module.css';
import Spinner from 'react-bootstrap/Spinner';

import Button from "../../../components/Button";
import { getParticipantById, getScores, saveScore } from "../../../components/http/particantApi";

const ParticantItem = observer(() => {
    const { particant } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [scores, setScores] = useState({});
    const [inputScores, setInputScores] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [averageCount, setAverageCount] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchParticipantData = async (id) => {
            try {
                const data = await getParticipantById(id);
                const scoresData = await getScores();

                particant.setParticipantItem(data);
                particant.setScores(scoresData);

                // Инициализируем оценки и считаем среднее значение только при загрузке данных
                const initialScores = {};
                data.criteriaNames.forEach(criterion => {
                    const scoreObj = scoresData.find(
                        score => score.participantEntity?.id === parseInt(id) && score.criteriaEntity?.criterionName === criterion
                    );
                    initialScores[criterion] = scoreObj ? scoreObj.score : 0;
                });
                setScores(initialScores);
                countAverage(initialScores);

            } catch (error) {
                console.error("Failed to fetch participant or scores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipantData(id);
    }, [id, particant]);

    const countAverage = (scores) => {
        const scoreValues = Object.values(scores).map(Number);
        const totalScore = scoreValues.reduce((acc, score) => acc + score, 0);
        const average = totalScore / scoreValues.length;
        setAverageCount(average);
    };

    useEffect(() => {
        const allFilled = particant._particantItem && particant._particantItem.criteriaNames.every(criterion => inputScores[criterion] !== '');
        setIsFormValid(allFilled);
    }, [inputScores, particant._particantItem]);

    const handleScoreChange = (criterion, value) => {
        setInputScores(prevScores => ({
            ...prevScores,
            [criterion]: value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const promises = particant._particantItem.criteriaNames.map(async (criterion) => {
                const score = parseFloat(inputScores[criterion]);
                if (!isNaN(score)) {
                    await saveScore({
                        participantId: parseInt(id),
                        criterionName: criterion,
                        score: score
                    });
                    setScores(prevScores => ({
                        ...prevScores,
                        [criterion]: score
                    }));
                }
            });

            await Promise.all(promises);
            countAverage({
                ...scores,
                ...inputScores
            });
            setInputScores({}); 
        } catch (error) {
            console.error("Failed to save scores:", error);
        }
    };

    if (loading) {
        return (
            <div className={styles.spinner}>
                <Spinner animation="border" />
            </div>
        );
    }

    if (!particant._particantItem) {
        return <div>Участник не найден</div>;
    }

    return (
        <div className={styles.participant__container}>
            <h2>{particant._particantItem.surname} {particant._particantItem.name} {particant._particantItem.middleName}</h2>
            <h3>Вид спорта: {particant.selectedSport?.sportName}</h3>

            <form className={styles.criteria__form} onSubmit={handleSubmit}>
                {particant._particantItem.criteriaNames.map((criterion, index) => (
                    <div key={index} className={styles.criteria__item}>
                        <label>{criterion}</label>
                        <span>Текущая оценка: {scores[criterion]}</span>
                        <input
                            min="0"
                            type="number"
                            step="0.1"
                            value={inputScores[criterion] || ''}
                            onChange={(e) => handleScoreChange(criterion, e.target.value)}

                        />
                    </div>
                ))}

                <div className={styles.average__score}>
                    <p>Средний балл: {averageCount.toFixed(2)}</p>
                </div>

                <Button text={"Оценить"} type="submit" className={styles.submit__button} disabled={!isFormValid || loading} />
            </form>
        </div>
    );
});

export default ParticantItem;

