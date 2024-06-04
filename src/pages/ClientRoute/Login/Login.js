import React, {useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';

import {useFormik} from 'formik';
import * as Yup from 'yup';


import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { SPORT_ROUTER, REGISTRATION_ROUTER } from '../../../utils/const';

import InputMask, {unmask} from 'react-input-mask';

import {Context} from '../../../index'

import styles from './Login.module.css'
import { getSport, loginUser } from "../../../components/http/userApi";

const Login = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);

    const [loginError, setLoginError] = useState('');

    async function sss() {

        const sport = await getSport();
        console.log(sport)
    }

    sss();


    const formik = useFormik({
        initialValues: {
            
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Обязательное поле'),
            password: Yup.string()
            .min(2, "Миниум 2 символа")
            .required('Обязательное поле'),
            
        }),
        onSubmit: async (values) => {
            console.log(values.username, values.password);

            try {
                const loginData = {
                    username: values.username,
                    password: values.password,
                };
                

                
                const status = await loginUser(loginData);

                console.log("Login Response Status: ", status); // Для отладки

                if (status === 200) {



                    user.setUsername(values.username);

                    user.setIsAuth(true);

                    console.log('Navigating to SPORT_ROUTER');
                    navigate(SPORT_ROUTER);
                } else {
                    setLoginError('Неверный логин или пароль');
                    setTimeout(() => {
                        setLoginError('');
                    }, 3000);
                }

            } catch (error) {
                console.error('Error logging in:', error);
                setLoginError('Неверный логин или пароль');
                setTimeout(() => {
                    setLoginError('');
                }, 3000);
            }
            
        },

        });

    return (

        <div className={styles.main__container}>

            <div>
                <h2>Авторизация</h2>
            </div>

            <div className={styles.login}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.login__list}>

                        <div className={styles.login__item}>
                            <label>Логин</label>  
                            <input
                                type="text"
                                placeholder="Логин"
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

                        <div className={styles.login__item}>
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
                            <NavLink to={REGISTRATION_ROUTER}>Зарегистрироваться</NavLink>
                        </div>
                    </div>  

                    <div className={styles.info_message}>
                        
                        {loginError && <div className={styles.errorAuth}>{loginError}</div>}
            
                    </div>

                    <div className={styles.login__button}>

                        <button type="submit" disabled={!formik.isValid}>
                                Войти
                        </button>
                    </div>

                </form>
            </div>
            
        </div>

    );
});

export default Login;