import React, { useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';



const CreateСriteria = ({show, onHide}) => {

    const [value, setValue] = useState('')


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
          Добавить критерий
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введите критерий оценки"}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline'
            value={value}
            onChange={e => setValue(e.target.value)}
            onClick={() => console.log(value)}
            >Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateСriteria;