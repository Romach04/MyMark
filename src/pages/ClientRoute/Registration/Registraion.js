import React, {useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';

import {useFormik} from 'formik';
import * as Yup from 'yup';


import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { SERVICES_ROUTER, LOGIN_ROUTER } from '../../../utils/const';

import InputMask from 'react-input-mask';

import {Context} from '../../../index'

import styles from './Registraion.module.css'

const Registraion = observer(() => {


    const location = useLocation();

    const navigate = useNavigate();


    const { user } = useContext(Context);

    const formik = useFormik({

        initialValues: {
            phoneNumber: '',
            email: '',
            password: '',
            terms: false,
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
            .test('full-number', 'Введите полный номер телефона', (value) => {

                const phoneNumberWithoutSeparators = value ? value.replace(/\D/g, '') : '';
                return phoneNumberWithoutSeparators.length >= 11;
            })
            .required('Обязательное поле'),
            email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
            password: Yup.string()
            .min(5, "Миниум 5 символов")
            .required('Обязательное поле'),

        }),
        onSubmit: (values) => {

            let unmaskedPhoneNumber = values.phoneNumber.replace(/\D/g, '');

            unmaskedPhoneNumber = Number(unmaskedPhoneNumber)

            user.setPhoneNumber(unmaskedPhoneNumber);
            user.setEmail(values.email);
            user.setPassword(values.password);

            navigate(SERVICES_ROUTER);
        },
    });


    return (

        <div className={styles.main__container}>

            <div>
                <h2>Регистрация</h2>
            </div>

            <div className={styles.registraion}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.registraion__list}>
                        <div className={styles.registraion__item} >
                            <label>Номер телефона</label>
                            <InputMask
                                mask="8 (999) 999-99-99"
                                maskChar="_"
                                type="tel"
                                placeholder="Номер телефона"

                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="phoneNumber"
                                required
                            />
                            
                            
                        </div>

                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className={styles.error}>{formik.errors.phoneNumber}</div>
                        )}

                        <div className={styles.registraion__item}>
                            <label>Email</label>  
                            <input
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="email"
                                required
                            />
                            
                        </div>

                        {formik.errors.email && formik.touched.email && (
                                <div className={styles.error}>{formik.errors.email}</div>
                        )}

                        <div className={styles.registraion__item}>
                            <label>Введите пароль</label>  
                            <input
                                type="password"
                                placeholder="Пароль"
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
                        <div className={styles.login_link}>
                            <NavLink to={LOGIN_ROUTER}>Войти в аккаунт</NavLink>
                        </div>
                    </div>
                    
                  

                    <div className={styles.registraion__button}>

                        <button type="submit" disabled={!formik.isValid}>
                                Зарегистрироваться
                        </button>
                        
                    </div>

                    
                    

                </form>
            </div>
            
        </div>

    );
});

export default Registraion;