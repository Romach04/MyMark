import React, {useContext} from 'react';

import styles from "./Navbar.module.css"
import { Context } from '../../index';

import svgImage from '../../assets/svg/exit.svg'
import Nav from 'react-bootstrap/Nav';

import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

import { ADMIN_ROUTER, SPORT_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER } from '../../utils/const';

import {logOut} from '../http/userApi';

import { Button, Container, Image } from "react-bootstrap";

const Navbar = () => {

    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();


    const isShowUserBar =  localStorage.getItem('authorization');


    const handelLogout = async () => {
        try {
            const status = await logOut();
            
            console.log(status);
            if (status === 200) {

                user.setIsAuth(false);
                user.setUsername('');
                localStorage.removeItem('authorization');

                navigate(LOGIN_ROUTER);
            } else {
                console.error('Ошибка при выходе из системы');
            }

        } catch(error) {

        }
    }

    return (

        <div className={styles.container}>
            
                <NavLink style={{color:'white'}}  to={LOGIN_ROUTER}>Моя оценка</NavLink> 
                <Image  width={30} height={30} className='me-auto ms-2' src={logo}/>
                
                {isShowUserBar? 

                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button
                    variant='outline-light'
                    onClick={() => navigate(ADMIN_ROUTER)}
                    >Админ меню
                    </Button>

                    <Button
                    id='but'
                    variant='danger'
                    style={{marginLeft:'20px'}}
                    onClick={handelLogout}
                    >Выйти
                    </Button>
                </Nav>

                
                
                : 
                ''}
        </div>
    );
};

export default Navbar;