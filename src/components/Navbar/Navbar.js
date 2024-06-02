import React, {useContext} from 'react';

import styles from "./Navbar.module.css"
import { Context } from '../../index';
import svgImage from '../../assets/svg/exit.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { ADMIN_ROUTER, SPORT_ROUTER } from '../../utils/const';

import { Button, Container, NavLink, Image } from "react-bootstrap";
const Navbar = () => {

    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();



    return (

        <div className={styles.container}>
            
                {/* <NavLink style={{color:'white'}} onClick={navigate(SPORT_ROUTER)}>Моя оценка</NavLink> */}
                <Image  width={30} height={30} className='me-auto ms-2' src={logo}/>
                <Button
                        variant='outline-light'
                        onClick={() => navigate(ADMIN_ROUTER)}
                        >Админ меню
                </Button>
        </div>
    );
};

export default Navbar;