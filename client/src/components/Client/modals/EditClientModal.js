import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createClient, updateClient} from "../../../http/clientAPI";
import DatePicker from "react-datepicker";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {parseISO} from "date-fns";

const EditClientModal = observer( ({show, onHide, updateClientList, }) => {

        const {description} = useContext(Context)
        const [idClient, SetIdClient] = useState("");
        const [lastname, setLastname] = useState("");
        const [name, setName] = useState("");
        const [patronymic, setPatronymic] = useState("");
        const [number_phone, setNumber_phone] = useState("");
        const [selectedDate, setSelectedDate] = useState(null);
        const [login, setLogin] = useState("");
        const [password, setPassword] = useState("");

    useEffect(() => {
        if (show) {
            const clientEditData = description.ClientEditGet;
            SetIdClient(clientEditData.id || "");
            setLastname(clientEditData.lastname || "");
            setName(clientEditData.name || "");
            setPatronymic(clientEditData.patronymic || "");
            setNumber_phone(clientEditData.number_phone || "");
            setSelectedDate(parseISO(clientEditData.birth_date) || null);
            setLogin(clientEditData.login || "");
            setPassword(clientEditData.password || "");
        }
    }, [show]);




    const addClient = async () => {
        try {
            const formData = new FormData()
            formData.append('id', idClient)
            formData.append('lastname', lastname)
            formData.append('name', name)
            formData.append('patronymic', patronymic)
            formData.append('number_phone', number_phone)
            formData.append('birth_date', selectedDate)
            formData.append('login', login)
            formData.append('password', password)
            await updateClient(formData).then(() => onHide())
            updateClientList();
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
                        value={number_phone}
                        onChange={e => setNumber_phone(e.target.value)}
                        placeholder={"Номер телефона"}
                    />
                    <Form.Group controlId="formDate">
                        <Form.Label className="m-3">Выберите дату рождения</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </Form.Group>
                    <Form.Control
                        className="mt-3"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder={"Введите логин"}
                    />
                    <Form.Control
                        className="mt-3"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Введите  пароль"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addClient}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditClientModal;