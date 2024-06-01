import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import { Context } from '../../../index';
import styles from './OrganizationItem.module.css';

import { ORGANIZATION_ROUTER, CONFIRM_ROUTER } from '../../../utils/const';
import Button from "../../../components/Button";

const OrganizationItem = observer(() => {


    const { user } = useContext(Context);
    const navigate = useNavigate();

     // для выбора услуги
    // console.log(user.selectedOrganization)
    
    const handleSelectService = (service) => {

        if (user.selectedServices.find(s => s.type_id === service.type_id)) {
            user.removeSelectedServices(service.type_id);
        } else {
            user.addSelectedServices(service);
        }
    };


    // Проверка, выбрана ли услуга
    const isServiceSelected = (service) => {
        return user.selectedServices.some(s => s.type_id === service.type_id);
    };


    const filteredServices = user.carServices.filter(service => service.type_code === user.selectedService.type_code);

 


    useEffect(() => {
        console.log('selectedOrganization changed:', user.selectedOrganization);
    }, [user.selectedOrganization]);


    const handleClick= () => {
        console.log(user.getSelectedServices());

        navigate(CONFIRM_ROUTER);
    };


    return (
        <div className={styles.services__container}>
            <h2>{user.selectedOrganization.subject_name}</h2>
            <div>
                <h2>{user.selectedService.type_name}</h2>
            </div>
            <div className={styles.services__list}>
                {filteredServices.map(service => (
                        <div key={service.type_id} className={styles.service__item}>
                            <input
                                type="checkbox"
                                id={`service-${service.type_id}`}
                                checked={isServiceSelected(service)}
                                onChange={() => handleSelectService(service)}
                            />
                            <label htmlFor={`service-${service.type_id}`}>
                                {service.type_name} - {service.price} руб, {service.duration} мин
                            </label>  
                        </div>
                ))}

            </div>

            <Button text={"Выбрать услугу"} onClick={handleClick}  className={styles.next__button}/>
                        
                    
        </div> 
    );
});

export default OrganizationItem;