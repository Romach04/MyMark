import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './Admin.module.css';
import CreateСriteria from "../../../components/modals/CreateСriteria";
import CreatePatricant from "../../../components/modals/CreatePatricant";
import { Button, Container } from "react-bootstrap";

const Admin = observer(() => {

    const { user } = useContext(Context);

    const [criteriaVis,  setCriteriaVis] = useState(false)
    const [particantVis,  setParticantVis] = useState(false)

    return (
        <div className={styles.container}>
            <Container className="d-flex flex-column mt-5 ">
                <Button
                    onClick={() => setCriteriaVis(true)}
                    variant="outline-secondary" 
                    className="mt-2"
                    >Добавить критерий оценки
                </Button>
                <Button 
                    onClick={() => setParticantVis(true)}
                    variant="outline-secondary" 
                    className="mt-2"
                    >Добавить участника
                </Button>
                <CreateСriteria show={criteriaVis} onHide={() => setCriteriaVis(false)}/>
                
                <CreatePatricant show={particantVis} onHide={() => setParticantVis(false)}/>
    

            </Container>
        </div>
    );
});

export default Admin;