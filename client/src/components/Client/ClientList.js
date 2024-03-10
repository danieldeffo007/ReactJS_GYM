import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, ListGroup} from "react-bootstrap";
import ClientListObject from "./ClientListObject";
import CreateClientModal from "./modals/CreateClientModal";
import EditClientModal from "./modals/EditClientModal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {clientGetALL} from "../../http/clientAPI";

const ClientList = observer(() => {
    const {description} = useContext(Context)
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)


    const updateClientList = () => {
        clientGetALL().then(data => description.setClient(data));
    };
    // useEffect(() => {
    //     clientGetALL().then(data => description.setClient(data))
    // }, [])

    return (
        <Container className="m-10 mx-auto">
            <h1 style={{ textAlign: 'center' }}>Клиенты</h1>
            <div className="d-grid gap-2">
                <Button onClick={() => setCreateModal(true)} className="m-3" variant="primary" size="lg">
                    Добавить
                </Button>
            </div>
            <ListGroup as="ol" numbered>
                {description.ClientGet.map(client_ =>
                    <ListGroup.Item key={client_.id} style={{border: '1px solid '}} as="li">
                        <ClientListObject updateClientList={updateClientList} client={client_} setEditModal={setEditModal}/>
                    </ListGroup.Item>)}

            </ListGroup>
            <CreateClientModal updateClientList={updateClientList} show={createModal} onHide={() => setCreateModal(false)}/>
            <EditClientModal updateClientList={updateClientList} show={editModal} onHide={() => setEditModal(false)}/>
        </Container>
    );
});

export default ClientList;