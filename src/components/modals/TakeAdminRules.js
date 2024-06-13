
import React from 'react';
import { useState } from "react";

import { Button, Modal, Form} from 'react-bootstrap';

import { takeAdminRules } from "../http/adminApi";


const TakeAdminRules = ({ show, onHide }) => {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const takeRules = async () => {

        const newObj= {
            username: username,
            password: password
        };

        try {
            await takeAdminRules(newObj);

            setUsername('');
            setPassword('');
            setMessage('Права были изъяты');

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
                console.error('Error take away rules:', error);
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
                    Забрать права администратора
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
                    onClick={takeRules}
                    disabled={!username || !password}
                >
                    Забрать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TakeAdminRules;