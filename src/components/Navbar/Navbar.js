import React, {useContext} from 'react';

import styles from "./Navbar.module.css"
import { Context } from '../../index';

import Nav from 'react-bootstrap/Nav';

import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.ico';
import avatar from '../../assets/avatar1.png'
import { ADMIN_ROUTER, LOGIN_ROUTER, SPORT_ROUTER } from '../../utils/const';

import {logOut} from '../http/userApi';

import { Button, Image } from "react-bootstrap";

const Navbar = () => {

    const { user } = useContext(Context);
    const navigate = useNavigate();


    const isShowUserBar =  localStorage.getItem('authorization');

    const userNameStorage = localStorage.getItem('username');


    const handelLogout = async () => {
        try {
            const status = await logOut();
            
            console.log(status);
            if (status === 200) {

                user.setIsAuth(false);
                user.setUsername('');
                localStorage.removeItem('authorization');
                localStorage.removeItem('username');

                navigate(LOGIN_ROUTER);
            } else {
                console.error('Ошибка при выходе из системы');
            }

        } catch(error) {

        }
    }

    return (

        <div className={styles.container}>
                <div className='me-auto'>
                    <NavLink style={{color:'white'}}  to={LOGIN_ROUTER}>Моя оценка</NavLink> 
                    <Image  width={30} height={30} className="ms-2" src={logo}/>
                    {isShowUserBar ?  <NavLink style={{color:'white'}} className="ms-4" to={SPORT_ROUTER}>Список спорта</NavLink> : ""}

                </div>

                {isShowUserBar? 

                <Nav className="ml-auto" style={{color:'white'}}>
                    <div className="d-flex align-items-center">
                        <div className="me-2">{userNameStorage}</div>
                        <Image  width={30} height={30} className="me-4" src={avatar}/>

                    </div>
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