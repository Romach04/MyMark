import React, {useContext} from 'react';

import styles from "./Navbar.module.css"
import { Context } from '../../index';
import svgImage from '../../assets/svg/exit.svg'
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {

    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    // для перехода на предыдущую страницу 
    const goBack = () => {
        navigate(-1); 
    };


    return (

        <div className={styles.container}>
            
            <div className={styles.navbar__header}>
                {location.pathname === '/' ? (
                    <a href="/#" id="link_exit" className={styles.navbar__link}>
                        <img
                        src={svgImage}
                        alt="exit"
                        height="87px"
                        width="100px"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/')}
                        }   
                        > 
                        </img>
                    </a>
                ) : (
                    <img
                    src={svgImage}
                    alt="back"
                    height="87px"
                    width="100px"
                    onClick={goBack}
                    style={{ cursor: 'pointer' }}
                />

                )
                }
                {user.phoneNumber && <div>{user.phoneNumber}</div>}
            </div>
        </div>
    );
};

export default Navbar;