import React, {useContext, useEffect, useState} from 'react';
import { format, parseISO } from 'date-fns';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteTrainer} from "../../http/trainerAPI";
import {Image} from "react-bootstrap";
const TrainerListObject = observer( ({updateTrainerList,setEditModal, trainer}) => {

    const {description} = useContext(Context)


    let fio = trainer.lastname +" "+trainer.name+" "+ trainer.patronymic
    let photo = process.env.REACT_APP_API_URL + "trainers/" + trainer.photo
    let description_trainer= trainer.description
    console.log(photo)
    const editTrainer = async ()=>{
        await description.setTrainerEdit({
            id: trainer.id,
            lastname: trainer.lastname,
            name: trainer.name,
            patronymic: trainer.patronymic,
            photo: trainer.photo,
            description: trainer.description,
        });
        setEditModal(true)
    }
    const DeleteTrainer = async ()=> {
        try {
            await deleteTrainer({id: trainer.id}).then()
            updateTrainerList()
        }catch (e) {
            alert(e)
        }
    }


    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className=" mt-1 d-flex justify-content-between align-items-center flex-wrap">
                <div style={{marginRight: '3rem'}}>
                    <Image style={{height: "100px"}} src={photo}></Image>
                </div>
                <div style={{marginRight: '3rem'}}>ФИО: {fio} </div>
                <div style={{marginRight: '3rem'}}>Описание: {description_trainer}</div>
            </div>
            <div style={{width: '20%'}}>
                <button onClick={editTrainer}>Редактировать</button>
                <button onClick={DeleteTrainer} className="ms-3" > Удалить</button>
            </div>

        </div>
    );
});

export default TrainerListObject;