import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {useNavigate, useParams} from 'react-router-dom';
import { Context } from '../../../index';
import styles from './ParticantItem.module.css';

import { ORGANIZATION_ROUTER, CONFIRM_ROUTER } from '../../../utils/const';
import Button from "../../../components/Button";

const ParticantItem = observer(() => {


    const { user } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const participant = user.selectedParticipants.find(p => p.id === parseInt(id));

    const [avarageCount, SetAvarageCount] = useState(0);

    const [scores, setScores] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Инициализация состояния scores
    useEffect(() => {
        if (participant) {
            const initialScores = {};
            user.criteria.forEach(criterion => {
                initialScores[criterion.name] = '';
            });
            setScores(initialScores);
        }
    }, [participant, user.criteria]);

    
    // Валидация формы
    useEffect(() => {
        const allFilled = user.criteria.every(criterion => scores[criterion.name] !== '');
        setIsFormValid(allFilled);
    }, [scores, user.criteria]);

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
   

  


    if (!participant) {
        return <div>Участник не найден</div>
    }

    return (
        <div className={styles.participant__container}>
            <h2>{participant.surname} {participant.name} {participant.middleName}</h2>
            <h3>Вид спорта: {participant.sportEntity.sportName}</h3>

            <form className={styles.criteria__form} onSubmit={handleSubmit}>
                {user.criteria.map((criterion, index) => (
                    <div key={index} className={styles.criteria__item}>
                        <label>{criterion.name}</label>
                        <input
                            min="0"
                            type="number"
                            step="0.1"
                            value={scores[criterion.name] || ''}
                            onChange={(e) => handleScoreChange(criterion.name, e.target.value)}
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