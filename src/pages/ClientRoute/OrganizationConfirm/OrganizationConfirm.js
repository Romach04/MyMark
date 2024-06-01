import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './OrganizationConfirm.module.css';
import Button from "../../../components/Button";

const OrganizationConfirm = observer(() => {

    const { user } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    // Обработчик выбора даты
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Обработчик выбора времени
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = () => {
        // Создаем объект с нужными данными из стора
        const data = {
            phoneNumber: user.phoneNumber,
            email: user.email,
            selectedService: user.selectedService,
            selectedLocation: user.selectedLocation,
            selectedTime: selectedTime,
            selectedDate: selectedDate,
            selectedOrganization: user.selectedOrganization,
            selectedServices: user.selectedServices,
            totalCost: totalCost,
            totalTime: totalTime,
        };

        // Выводим в консоль
        console.log(JSON.stringify(data, null, 2));

        // Здесь можно добавить отправку данных на бэкенд, когда он будет готов
    };

    // Общая стоимость выбранных услуг
    const totalCost = user.selectedServices.reduce((acc, curr) => acc + curr.price, 0);

    const totalTime = user.selectedServices.reduce((acc, curr) => acc + curr.duration, 0);
    

    return (
        <div className={styles.services__container}>
            <h2>{user.selectedOrganization.subject_name}</h2>
            <div>{`ул ${user.selectedOrganization.street_name}, д ${user.selectedOrganization.house_number}`}</div>
            <h1>Услуги</h1>
            <div>
                {user.selectedServices.map((item, index) => (
                    <div key={index} className={styles.service__item}>
                        <div>{`${index + 1}. ${item.type_name} ${item.price} руб ${item.duration} мин`}</div>
                    </div>
                ))}
            </div>
            <div className={styles.total__cost}>
                <h3>Общая стоимость: {totalCost} руб</h3>
            </div>

            <div className={styles.total__cost}>
                <h3>Общее время: {totalTime} мин</h3>
            </div>

            
            <div className={styles.date__selection}>
                <h3>Выберите день оказания услуги:</h3>
                <div className={styles.date__selection__list}>
                    <div className={styles.date__selection__item}>
                        <input
                            type="radio"
                            id="today"
                            name="date"
                            value="Сегодня"
                            checked={selectedDate === 'Сегодня'}
                            onChange={handleDateChange}
                        />
                        <label htmlFor="today">Сегодня</label>
                    </div>
                    <div className={styles.date__selection__item}>
                        <input
                            type="radio"
                            id="tomorrow"
                            name="date"
                            value="Завтра"
                            checked={selectedDate === 'Завтра'}
                            onChange={handleDateChange}
                        />
                        <label htmlFor="tomorrow">Завтра</label>
                    </div>

                </div>
            </div>
            {selectedDate && (
                <div className={styles.time__selection}>
                    <h3>Выберите время:</h3>
                    <select value={selectedTime} onChange={handleTimeChange}>
                        <option value="">Выберите время</option>
                        {Array.from({ length: 13 }, (_, i) => i + 9).map((hour) => (
                            <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                        ))}
                    </select>
                </div>
            )}
            <div>

                <Button text={"Отправить"} onClick={handleSubmit}/>
            </div>
        </div>
    );
});

export default OrganizationConfirm;