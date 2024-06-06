import React from 'react';
import { useState, useEffect } from "react";


import { Button, Modal, Form} from 'react-bootstrap';

import { getParticipants, getCriteria } from "../http/particantApi";
import { saveScoreAdmin } from "../http/adminApi";


const CreateScore = ({ show, onHide }) => {
    const [participants, setParticipants] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [selectedCriterion, setSelectedCriterion] = useState(null);
    const [score, setScore] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const participantsData = await getParticipants();
                const criteriaData = await getCriteria();
                setParticipants(participantsData);
                setCriteria(criteriaData);
            } catch (error) {
                console.error('Error fetching participants or criteria:', error);
            }
        };

        fetchInitialData();
    }, []);

    const addScore = async () => {
        if (!selectedParticipant || !selectedCriterion || score === '') {
            alert('Заполните все поля');
            return;
        }

        const newScore = {
            participantEntity: selectedParticipant,
            criteriaEntity: selectedCriterion,
            score: parseFloat(score)
        };

        try {
            await saveScoreAdmin(newScore);

            setScore('');
            setSelectedParticipant(null);
            setSelectedCriterion(null);
            setMessage('Оценка успешно добавлена');

            setTimeout(() => {
                setMessage('');
                onHide();
            }, 2000); // Закрыть окно через 2 секунды после успешного добавления
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    const handleClose = () => {
        setScore('');
        setSelectedParticipant(null);
        setSelectedCriterion(null);
        setMessage('');
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить оценку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <div className="alert alert-success">{message}</div>}
                <Form>
                    <Form.Label>Выберите участника</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedParticipant?.id || ''}
                        onChange={e => {
                            const selectedId = parseInt(e.target.value, 10);
                            const selectedPart = participants.find(participant => participant.id === selectedId);
                            setSelectedParticipant(selectedPart);
                        }}
                    >
                        <option value="">Выберите участника</option>
                        {participants.map(participant => (
                            <option key={participant.id} value={participant.id}>
                                {participant.surname} {participant.name} {participant.middleName} ({participant.sportEntity.sportName})
                            </option>
                        ))}
                    </Form.Control>
                </Form>
                <Form>
                    <Form.Label className="mt-3">Выберите критерий</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCriterion?.id || ''}
                        onChange={e => {
                            const selectedId = parseInt(e.target.value, 10);
                            const selectedCriterion = criteria.find(criterion => criterion.id === selectedId);
                            setSelectedCriterion(selectedCriterion);
                        }}
                    >
                        <option value="">Выберите критерий</option>
                        {criteria.map(criterion => (
                            <option key={criterion.id} value={criterion.id}>
                                {criterion.criterionName} ({criterion.sportEntity.sportName})
                            </option>
                        ))}
                    </Form.Control>
                </Form>
                <Form>
                    <Form.Label className="mt-3">Введите оценку</Form.Label>
                    <Form.Control
                        type="number"
                        value={score}
                        onChange={e => setScore(e.target.value)}
                        placeholder="Оценка"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>Закрыть</Button>
                <Button
                    variant="outline-success"
                    onClick={addScore}
                    disabled={!score || !selectedParticipant || !selectedCriterion}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateScore;