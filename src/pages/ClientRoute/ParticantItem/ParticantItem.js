import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {useNavigate, useParams} from 'react-router-dom';
import { Context } from '../../../index';
import styles from './ParticantItem.module.css';
import Spinner from 'react-bootstrap/Spinner';

import Button from "../../../components/Button";
import { getParticipantById } from "../../../components/http/particantApi";

const ParticantItem = observer(() => {


    const { user } = useContext(Context);
    const {particant} = useContext(Context);

    const navigate = useNavigate();
    const { id } = useParams();

    const participant = user.selectedParticipants.find(p => p.id === parseInt(id));

    const [scores, setScores] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [avarageCount, SetAvarageCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipantById = async (id) => {
            try {
                const data = await getParticipantById(id);

                particant.setParticipant(data)
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchParticipantById(id)
  
    }, [id, particant])


    // Инициализация состояния scores
    useEffect(() => {
        if (particant.participant) {
            const initialScores = {};
            particant.participant.criteriaNames.forEach(criterion => {
                initialScores[criterion] = '';  // Инициализируем оценки пустыми значениями
            });
            setScores(initialScores);
        }
    }, [particant.participant]);
    
    // Валидация формы
    useEffect(() => {
        const allFilled = particant.participant && particant.participant.criteriaNames.every(criterion => scores[criterion] !== '');
        setIsFormValid(allFilled);
    }, [scores, particant.participant]);

    // Обработка изменения значений критериев
    const handleScoreChange = (criterion, value) => {
        setScores(prevScores => ({
            ...prevScores,
            [criterion]: value
        }));
    };

    
    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        
        

        navigate(-1); 
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


    if (!particant.participant) {
        return <div>Участник не найден</div>
    }

    return (
        <div className={styles.participant__container}>
            <h2>{particant.participant.surname} {particant.participant.name} {particant.participant.middleName}</h2>
            <h3>Вид спорта: {particant.selectedSport.sportName}</h3>

            <form className={styles.criteria__form} onSubmit={handleSubmit}>
                {particant.participant.criteriaNames.map((criterion, index) => (
                    <div key={index} className={styles.criteria__item}>
                        <label>{criterion}</label>
                        <input
                            min="0"
                            type="number"
                            step="0.1"
                            value={scores[criterion] || ''}
                            onChange={(e) => handleScoreChange(criterion, e.target.value)}
                            onBlur={() => handleBlur()} 
                        />
                    </div>
                ))}

                <div className={styles.average__score}>
                    <p>Средний балл: {avarageCount.toFixed(2)}</p>
                </div> 
    

                <Button text="Оценить" type="submit" className={styles.submit__button} disabled={!isFormValid} />
                
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