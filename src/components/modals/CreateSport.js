import React, { useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

import { saveSport } from "../http/adminApi";

const CreateSport = ({show, onHide}) => {

    const [value, setValue] = useState('');

    const addSport = async () => {
      try {
          await saveSport({ sportName: value });
          alert('Добавлено успешно');
          setValue('');
          onHide();
      } catch (error) {
          if (error.response && error.response.status === 401) {
              alert('Недостаточно прав для выполнения этого действия');
          } else {
              console.error('Error adding sport:', error);
          }
      }
  };


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
          Добавить Спорт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введите название спорта"}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline'
            value={value}
            onChange={e => setValue(e.target.value)}
            onClick={addSport}
            >Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateSport;