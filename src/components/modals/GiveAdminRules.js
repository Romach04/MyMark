
import React from 'react';
import { useState, useEffect } from "react";


import { Button, Modal, Form} from 'react-bootstrap';

import { getParticipants } from "../http/particantApi";
import { giveAdminRules } from "../http/adminApi";


const GiveAdminRules = ({ show, onHide }) => {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const giveRules = async () => {

        const newObj= {
            username: username,
            password: password
        };

        try {
            await giveAdminRules(newObj);

            setUsername('');
            setPassword('');
            setMessage('Права были добавлены');

            setTimeout(() => {
                setMessage('');
                onHide();
                window.location.reload();
            }, 2000); 

        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert('Недостаточно прав для выполнения этого действия');
                onHide();
            } else {
                console.error('Error adding rules:', error);
          }
        }
    };

    const handleClose = () => {

        setUsername('');
        setPassword('');

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
                    Выдать права администратора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <div className="alert alert-success">{message}</div>}
                <Form>
                    <Form.Label className="mt-3">Введите логин</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="логин"
                    />
                </Form>

                <Form>
                    <Form.Label className="mt-3">Введите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="пароль"
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>Закрыть</Button>
                <Button
                    variant="outline-success"
                    onClick={giveRules}
                    disabled={!username || !password}
                >
                    Выдать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GiveAdminRules;