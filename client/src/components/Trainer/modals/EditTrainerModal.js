import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {parseISO} from "date-fns";
import {updateTrainer} from "../../../http/trainerAPI";

const EditTrainerModal = observer( ({show, onHide, updateTrainerList, }) => {

    const {description} = useContext(Context)
    const [idTrainer, SetIdTrainer] = useState("");
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [photo, setPhoto] = useState("");
    const [description_, setDescription] = useState(null);

    useEffect(() => {
        if (show) {
            const trainerEditData = description.TrainerEditGet;
            SetIdTrainer(trainerEditData.id || "");
            setLastname(trainerEditData.lastname || "");
            setName(trainerEditData.name || "");
            setPatronymic(trainerEditData.patronymic || "");
            setPhoto(trainerEditData.photo)
            setDescription(trainerEditData.description)
        }
    }, [show, description.TrainerEditGet]);




    const addTrainer = async () => {
        try {
            const formData = new FormData()
            formData.append('lastname', lastname)
            formData.append('name', name)
            formData.append('patronymic', patronymic)
            formData.append('photo', photo)
            formData.append('description', description_)
            await updateTrainer(formData).then(() => onHide())
            updateTrainerList();
        } catch (e) {
            console.log("Ошибка:", e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание клиента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        placeholder={"Введите фамилию"}
                    />
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите имя"}
                    />
                    <Form.Control
                        className="mt-3"
                        value={patronymic}
                        onChange={e => setPatronymic(e.target.value)}
                        placeholder={"Введите отчество"}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setPhoto(e.target.files[0])}
                        type="file"
                    />
                    <Form.Control
                        className="mt-3"
                        value={description_}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Номер телефона"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addTrainer}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditTrainerModal;