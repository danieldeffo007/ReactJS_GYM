import React, {useContext, useEffect, useState} from 'react';
import { format, parseISO } from 'date-fns';
import {Context} from "../../index";
import {clientGetALL, deleteClient} from "../../http/clientAPI";
import {observer} from "mobx-react-lite";
const ClientListObject = observer( ({updateClientList,setEditModal, client}) => {

    const {description} = useContext(Context)


    let fio = client.lastname +" "+client.name+" "+ client.patronymic
    let number_phone = client.number_phone
    let d_birth = parseISO(client.birth_date)
    d_birth = format(d_birth, 'dd.MM.yyyy');
    let login = client.login
    let pass= client.password

    const editClient = async ()=>{
        await description.setClientEdit({
            id: client.id,
            lastname: client.lastname,
            name: client.name,
            patronymic: client.patronymic,
            number_phone: client.number_phone,
            birth_date: client.birth_date,
            login: client.login,
            password: client.password,
        });
        setEditModal(true)
    }
    const DeleteClient = async ()=> {
        try {
            await deleteClient({id: client.id}).then()
            updateClientList()
        }catch (e) {
            alert(e)
        }
    }



    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className=" mt-1 d-flex justify-content-between align-items-center flex-wrap">
                <div style={{marginRight: '3rem'}}>ФИО: {fio} </div>
                <div style={{marginRight: '3rem'}}>№ телефона: {number_phone} </div>
                <div style={{marginRight: '3rem'}}>Дата рождения: {d_birth}</div>
                <div style={{marginRight: '3rem'}}>Логин: {login}</div>
                <div style={{marginRight: '3rem'}}>Пароль: {pass}</div>
            </div>
            <div style={{width: '20%'}}>
                <button onClick={editClient}  >Редактировать</button>
                <button onClick={DeleteClient} className="ms-3" > Удалить</button>
            </div>

        </div>
    );
});

export default ClientListObject;