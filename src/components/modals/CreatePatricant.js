import React, { useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';



const CreatePatricant = ({show, onHide}) => {
    
    const [name, setName] = useState('')
    
    const [surmame, setSurname] = useState('')
    const [middle, setMiddle] = useState('')

    const [info, setInfo] = useState([])

    const addParticant = () => {
        setInfo([name, surmame, middle])
        console.log(setInfo);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить Участника
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={"Введите имя"}/>
        </Form>
        <Form>
            <Form.Control
            className="mt-3"
            value={surmame}
            onChange={e => setSurname(e.target.value)}
            placeholder={"Введите фамилию"}/>
        </Form>
        <Form>
            <Form.Control
            className="mt-3"
            value={middle}
            onChange={e => setMiddle(e.target.value)}
            placeholder={"Введите отчество"}/>
        </Form>

      </Modal.Body>
      <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant="outline-success" onClick={addParticant}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreatePatricant;