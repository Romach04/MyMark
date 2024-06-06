import React, { useState, useEffect } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

import { getSport } from "../http/particantApi";
import { saveParticipant } from "../http/adminApi";



const CreatePatricant = ({show, onHide}) => {
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middle, setMiddle] = useState('');
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [message, setMessage] = useState('');

      
    

    useEffect(() => {
      const fetchSports = async () => {
          try {
              const data = await getSport();
              setSports(data);
          } catch (error) {
              console.error('Error fetching sports:', error);
          }
      };

      fetchSports();
  }, []);


    const addParticipant = async () => {
      const participantData = {
          surname,
          name,
          middleName: middle,
          sportEntity: selectedSport
      };
      
      console.log(participantData);
      try {
        await saveParticipant(participantData);
        setName('');
        setSurname('');
        setMiddle('');
        setSelectedSport(null);

        setMessage('Оценка успешно добавлена');

        setTimeout(() => {
            setMessage('');
            onHide();
        }, 2000); 

      } catch (error) {
          if (error.response && error.response.status === 403) {
              alert('Недостаточно прав для выполнения этого действия');
              onHide();
          } else {
              console.error('Error adding participant:', error);
        }
      }
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
        {message && <div className="alert alert-success">{message}</div>}

        <Form>
          <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={"Введите имя"}
          />
      </Form>
      <Form>
          <Form.Control
              className="mt-3"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder={"Введите фамилию"}
          />
      </Form>
      <Form>
          <Form.Control
              className="mt-3"
              value={middle}
              onChange={e => setMiddle(e.target.value)}
              placeholder={"Введите отчество"}
          />
      </Form>
          <Form >
            <Form.Control
                className="mt-3"
                as="select"
                value={selectedSport?.id || ''}
                onChange={e => {
                    const selectedId = parseInt(e.target.value, 10);
                    const selectedSport = sports.find(sport => sport.id === selectedId);
                    setSelectedSport(selectedSport);
                }}
              >
                <option  value="">Выберите вид спорта</option>
                {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>
                        {sport.sportName}
                    </option>
                ))}
            </Form.Control>
            </Form>

      </Modal.Body>
      <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant="outline-success" onClick={addParticipant}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreatePatricant;