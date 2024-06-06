import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './Admin.module.css';
import CreateSport from "../../../components/modals/CreateSport";
import CreatePatricant from "../../../components/modals/CreatePatricant";

import CreateCriteriaName from "../../../components/modals/CreateCriteriaName";



import { Button, Container } from "react-bootstrap";

const Admin = observer(() => {

    const { particant } = useContext(Context);

    const [sportVis,  setSportVis] = useState(false)
    const [particantVis,  setParticantVis] = useState(false)
    const [criteriaVis,  setCriteriaVis] = useState(false)

    return (
        <div className={styles.container}>
            <Container className="d-flex flex-column mt-5 ">
                <Button
                    onClick={() => setSportVis(true)}
                    variant="outline-secondary" 
                    className="mt-2"
                    >Добавить спорт
                </Button>
                <Button 
                    onClick={() => setParticantVis(true)}
                    variant="outline-secondary" 
                    className="mt-2"
                    >Добавить участника
                </Button>
                <Button 
                    onClick={() => setCriteriaVis(true)}
                    variant="outline-secondary" 
                    className="mt-2"
                    >Добавить критерий
                </Button>

                <CreateSport show={sportVis} onHide={() => setSportVis(false)}/>
                
                <CreatePatricant show={particantVis} onHide={() => setParticantVis(false)}/>

                <CreateCriteriaName show={criteriaVis} onHide={() => setCriteriaVis(false)}/>

            </Container>
        </div>
    );
});

export default Admin;