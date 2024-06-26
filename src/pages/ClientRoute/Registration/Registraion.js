import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import {  NavLink } from "react-router-dom";
import { LOGIN_ROUTER } from '../../../utils/const';
import { registerUser } from "../../../components/http/userApi";


import styles from './Registraion.module.css'

const Registraion = observer(() => {


    const [registrationMessage, setRegistrationMessage] = useState('');
    const [registrationError, setRegistrationError] = useState('');


    const formik = useFormik({

        initialValues: {
            username: '',
            password: '',
            adminRoot: false,
        },
        validationSchema: Yup.object({
    
            username: Yup.string().min(5, "Миниум 5 символов")
            .required('Обязательное поле'),

            password: Yup.string()
            .min(5, "Миниум 5 символов")
            .required('Обязательное поле'),


        }),
        onSubmit: async (values) => {

            const roleRequest = values.adminRoot ? "ADMIN,USER": "USER"
            const userData = {
                username: values.username,
                password: values.password,
                role: roleRequest, 
            };

            try {
                const response = await registerUser(userData);

                setRegistrationMessage('Регистрация успешна!');

                values.username = '';
                values.password = '';
                values.adminRoot = false;

                setTimeout(() => {
                    setRegistrationMessage('');
                }, 3000);
                
            } catch (error) {
                console.error('Error registering user:', error);
                if(error.response.status === 400){
                    setRegistrationError('Пользователь с таким логином уже существует');
                } else {
                    setRegistrationError('Не удалось зарегистрироваться. Попробуйте еще раз.');
                }

                setTimeout(() => {
                    setRegistrationError('');
                }, 3000);
            }

        },
    });


    return (

        <div className={styles.main__container}>

            <div>
                <h2>Регистрация</h2>
            </div>

            <div className={styles.registraion}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.registraion__list}>

                        <div className={styles.registraion__item}>
                            <label>Логин</label>  
                            <input
                                type="text"
                                placeholder="Введите логин"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="username"
                                required
                            />
                            
                        </div>

                        {formik.errors.username && formik.touched.username && (
                                <div className={styles.error}>{formik.errors.username}</div>
                        )}

                        <div className={styles.registraion__item}>
                            <label>Пароль</label>  
                            <input
                                type="password"
                                placeholder="Введите пароль"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="password"
                                required
                            />
                        </div>
                

                        {formik.errors.password && formik.touched.password && (
                                <div className={styles.error}>{formik.errors.password}</div>
                        )}
                        <div className={styles.registraion__checkbox}>
                        
                            <input
                            type="checkbox"
                            checked={formik.values.adminRoot}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="adminRoot"

                            
                            />
                            <label>Права администратора</label>

                        </div>
                        <div className={styles.login_link}>
                            <NavLink to={LOGIN_ROUTER}>Войти в аккаунт</NavLink>
                        </div>
                    </div>

                    
                    
        
                    <div className={styles.info_message}>
                        
                        {registrationMessage && <div className={styles.success}>{registrationMessage}</div>}
                        {registrationError && <div className={styles.error}>{registrationError}</div>}
          
                    </div>

                    <div className={styles.registraion__button}>

                        

                        <Button type="submit"  variant="primary" disabled={!formik.isValid}>
                                Зарегистрироваться
                        </Button>
                        
                    </div>

                    
                    

                </form>
            </div>
            
        </div>

    );
});

export default Registraion;