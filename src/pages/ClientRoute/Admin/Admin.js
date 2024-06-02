import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import styles from './Admin.module.css';
import CreateСriteria from "../../../components/modals/CreateСriteria";
import { Button, Container } from "react-bootstrap";

const Admin = observer(() => {

    const { user } = useContext(Context);

    const [criteriaVis,  setCriteriaVis] = useState(false)
    const [particantVis,  setParticantVis] = useState(false)

    return (
        <div className={styles.container}>
            <Container className="d-flex flex-column ">
            <Button
                onClick={() => setCriteriaVis(true)}
                variant="outline-success" 
                className="mt-2"
                >Добавить критерий оценки
            </Button>
            <Button 
                onClick={() => setParticantVis(true)}
                variant="outline-success" 
                className="mt-2"
                >Добавить участника
            </Button>
            <CreateСriteria show={criteriaVis} onHide={() => setCriteriaVis(false)}/>

            {/* <CreateDevice show={deviceVis} onHide={() => setDeviceVis(false)}/> */}
 

        </Container>
        </div>
    );
});

export default Admin;