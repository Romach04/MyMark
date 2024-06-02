import React, {useContext} from 'react';

import styles from "./Navbar.module.css"
import { Context } from '../../index';
import svgImage from '../../assets/svg/exit.svg'
import { useNavigate, useLocation } from 'react-router-dom';

import { ADMIN_ROUTER } from '../../utils/const';

// import { Button, Container, Nav } from "react-bootstrap";
const Navbar = () => {

    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();



    return (

        <div className={styles.container}>
            
            <div className={styles.navbar__header}>
                <button
                        variant='outline-light'
                        onClick={() => navigate(ADMIN_ROUTER)}
                        >Админ меню
                </button>
            </div>
        </div>
    );
};

export default Navbar;