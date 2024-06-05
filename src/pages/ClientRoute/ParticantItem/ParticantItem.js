import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {useNavigate, useParams} from 'react-router-dom';
import { Context } from '../../../index';
import styles from './ParticantItem.module.css';
import Spinner from 'react-bootstrap/Spinner';

import Button from "../../../components/Button";
import { getParticipantById, getScores, saveScore } from "../../../components/http/particantApi";

const ParticantItem = observer(() => {

    const {particant} = useContext(Context);

    const navigate = useNavigate();
    const { id } = useParams();


    const [scores, setScores] = useState({});

    const [inputScores, setInputScores] = useState({});

    const [isFormValid, setIsFormValid] = useState(false);
    const [avarageCount, SetAvarageCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [disabledInputs, setDisabledInputs] = useState(false);

    useEffect(() => {
        const fetchParticipantData  = async (id) => {
            try {
                const data = await getParticipantById(id);
                const scoresData = await getScores();

                particant.setParticipantItem(data);
                particant.setScores(scoresData);


            } catch (error) {
                console.error("Failed to fetch participant or scores:", error)
            } finally {
                setLoading(false);
            }
        };

        fetchParticipantData(id)
  
    }, [id, particant])


    // Инициализация состояния scores
    useEffect(() => {
        if (particant._particantItem) {
            const initialScores = {};
            particant._particantItem.criteriaNames.forEach(criterion => {

                const scoreObj = particant.scores.find(
                    score => score.participantEntity?.id === parseInt(id) && score.criteriaEntity?.criterionName === criterion
                );
                initialScores[criterion] = scoreObj? scoreObj.score : 0;  // // Устанавливаем оценку или 0, если оценки нет
            });
            setScores(initialScores);
        }
    }, [particant._particantItem, particant.scores, id]);
    

    // Валидация формы
    useEffect(() => {
        const allFilled = particant._particantItem && particant._particantItem.criteriaNames.every(criterion => inputScores[criterion] !== '');
        setIsFormValid(allFilled);
    }, [inputScores, particant._particantItem]);


    // Обработка изменения значений критериев
    const handleScoreChange = (criterion, value) => {
        setInputScores(prevScores => ({
            ...prevScores,
            [criterion]: value
        }));


        setDisabledInputs(true);
    };

    
    // Обработка отправки формы
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {


            const promises = particant._particantItem.criteriaNames.map(async (criterion) => {
                
                const score = parseFloat(inputScores[criterion]);
       
                if (!isNaN(score)) {
                    console.log(parseInt(id), criterion, score)
                    await saveScore({
                        participantId: parseInt(id),
                        criterionName: criterion,
                        score: score
                    });
                }
            });


            await Promise.all(promises);
            // navigate(-1);
        } catch (error) {
            console.error("Failed to save scores:", error);
        }
     
    };



    const handleBlur = () => {
        countAvarage();
    }


    const countAvarage = () => {

        const scoreValues = Object.values(scores).map(Number);
        const totalScore = scoreValues.reduce((acc, score) => acc + score, 0);
        const average = totalScore / scoreValues.length;
        SetAvarageCount(average)

 
    }
   

    if (loading) {

        return (
            <div className={styles.spinner}>
                <Spinner animation="border" />
            </div>
        )   
    }


    if (!particant._particantItem) {
        return <div>Участник не найден</div>
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
                            onBlur={() => handleBlur()}
                            disabled={disabledInputs && inputScores[criterion] === ''}
                        />
                    </div>
                ))}

                <div className={styles.average__score}>
                    <p>Средний балл: {avarageCount.toFixed(2)}</p>
                </div> 
    

                <Button text={"Оценить"} type="submit" onClick={handleSubmit} className={styles.submit__button} disabled={!isFormValid} />
                
            </form>

        </div>
    );
});

export default ParticantItem;















// import React, { useContext, useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import {useNavigate} from 'react-router-dom';
// import { Context } from '../../../index';
// import styles from './OrganizationItem.module.css';

// import { ORGANIZATION_ROUTER, CONFIRM_ROUTER } from '../../../utils/const';
// import Button from "../../../components/Button";

// const OrganizationItem = observer(() => {


//     const { user } = useContext(Context);
//     const navigate = useNavigate();

//      // для выбора услуги
//     // console.log(user.selectedOrganization)
    
//     const handleSelectService = (service) => {

//         if (user.selectedServices.find(s => s.type_id === service.type_id)) {
//             user.removeSelectedServices(service.type_id);
//         } else {
//             user.addSelectedServices(service);
//         }
//     };


//     // Проверка, выбрана ли услуга
//     const isServiceSelected = (service) => {
//         return user.selectedServices.some(s => s.type_id === service.type_id);
//     };


//     const filteredServices = user.carServices.filter(service => service.type_code === user.selectedService.type_code);

 


//     useEffect(() => {
//         console.log('selectedOrganization changed:', user.selectedOrganization);
//     }, [user.selectedOrganization]);


//     const handleClick= () => {
//         console.log(user.getSelectedServices());

//         navigate(CONFIRM_ROUTER);
//     };


//     return (
//         <div className={styles.services__container}>
//             <h2>{user.selectedOrganization.subject_name}</h2>
//             <div>
//                 <h2>{user.selectedService.type_name}</h2>
//             </div>
//             <div className={styles.services__list}>
//                 {filteredServices.map(service => (
//                         <div key={service.type_id} className={styles.service__item}>
//                             <input
//                                 type="checkbox"
//                                 id={`service-${service.type_id}`}
//                                 checked={isServiceSelected(service)}
//                                 onChange={() => handleSelectService(service)}
//                             />
//                             <label htmlFor={`service-${service.type_id}`}>
//                                 {service.type_name} - {service.price} руб, {service.duration} мин
//                             </label>  
//                         </div>
//                 ))}

//             </div>

//             <Button text={"Выбрать услугу"} onClick={handleClick}  className={styles.next__button}/>
                        
                    
//         </div> 
//     );
// });

// export default OrganizationItem;