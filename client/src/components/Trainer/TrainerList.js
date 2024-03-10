import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, ListGroup} from "react-bootstrap";
import TrainerListObject from "./TrainerListObject";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {trainerGetALL} from "../../http/trainerAPI";
import CreateTrainerModal from "./modals/CreateTrainerModal";
import EditTrainerModal from "./modals/EditTrainerModal";

const TrainerList = observer(() => {
    const {description} = useContext(Context)
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)


    const updateTrainerList = () => {
        trainerGetALL().then(data => description.setTrainer(data));
    };

    useEffect(() => {
        trainerGetALL().then(data => description.setTrainer(data));

    }, [])

    return (
        <Container className="m-10 mx-auto">
            <h1 style={{ textAlign: 'center' }}>Тренера</h1>
            <div className="d-grid gap-2">
                <Button onClick={() => setCreateModal(true)} className="m-3" variant="primary" size="lg">
                    Добавить
                </Button>
            </div>
            <ListGroup as="ol" numbered>
                {description.TrainerGet.map(trainer_ =>
                    <ListGroup.Item key={trainer_.id} style={{border: '1px solid '}} as="li">
                        <TrainerListObject updateTrainerList={updateTrainerList} trainer={trainer_} setEditModal={setEditModal}/>
                    </ListGroup.Item>)}

            </ListGroup>
            <CreateTrainerModal updateTrainerList={updateTrainerList} show={createModal} onHide={() => setCreateModal(false)}/>
            <EditTrainerModal updateTrainerList={updateTrainerList} show={editModal} onHide={() => setEditModal(false)}/>
        </Container>
    );
});

export default TrainerList;