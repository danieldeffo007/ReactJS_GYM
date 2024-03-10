import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {createClient} from "../../../http/clientAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const CreateClientModal = observer( ({show, onHide, updateClientList}) => {

    const {description} = useContext(Context)
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [number_phone, setNumber_phone] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [UniqueLogin, setUniqueLogin] = useState(true);
    const messageUniqueLogin = "Логин не уникален"



    const clearFields = () =>{
        setLastname("")
        setName("")
        setPatronymic("")
        setNumber_phone("")
        setSelectedDate(null)
        setLogin("")
        setPassword("")
    }
    const addClient = async () => {
        try {
            const formData = new FormData()
            formData.append('lastname', lastname)
            formData.append('name', name)
            formData.append('patronymic', patronymic)
            formData.append('number_phone', number_phone)
            formData.append('birth_date', selectedDate)
            formData.append('login', login)
            formData.append('password', password)
            await createClient(formData)
            onHide()
            clearFields()
            updateClientList();
        } catch (e) {
            console.log("Ошибка:", e)
        }
    }
    const validUniqueLogin = (e)=>{
        const value = e.target.value
        setLogin(value)
        const isLoginUnique = !description.ClientGet.some(client => client.login === value);
        if(!isLoginUnique) setUniqueLogin(false)
        else setUniqueLogin(true)
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
                        <Form.Label className="m-3">Дата рождения</Form.Label>
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
                        onChange={validUniqueLogin}
                        placeholder={"Введите Логин"}
                    />
                    {!UniqueLogin && <div style={{color:"red"}}>{messageUniqueLogin}</div>}
                    <Form.Control
                        className="mt-3"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Введите  Пароль"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addClient}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateClientModal;